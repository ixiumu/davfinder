<template>
  <div class="fullscreen-container">

    <div v-if="!isLoggedIn" class="vf-login-overlay">
      <div class="vf-login-modal">
        <div class="vf-login-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4">
            </path>
          </svg>
          <span>WebDAV</span>
        </div>

        <div class="vf-login-body">
          <div class="vf-form-group">
            <label>WebDAV Server</label>
            <input v-model="form.url" type="text" placeholder="https://example.com/dav" @keyup.enter="handleLogin" />
          </div>
          <div class="vf-form-group">
            <label>Username</label>
            <input v-model="form.username" type="text" placeholder="Username" @keyup.enter="handleLogin" />
          </div>
          <div class="vf-form-group">
            <label>Password</label>
            <input v-model="form.password" type="password" placeholder="Password" @keyup.enter="handleLogin" />
          </div>

          <div v-if="loginError" class="vf-error-msg">
            {{ loginError }}
          </div>
        </div>

        <div class="vf-login-footer">
          <button class="vf-btn vf-btn-primary" @click="handleLogin" :disabled="isConnecting">
            {{ isConnecting ? 'Connecting...' : 'Login' }}
          </button>
        </div>
      </div>
    </div>

    <VueFinder v-if="isLoggedIn && driver" id="webdav-finder" :driver="driver" :locale="getBrowserLanguage()"
      :context-menu-items="contextMenu" :features="{
        archive: false,
        unarchive: false,
        history: false,
        language: false,
        pinned: false,
        fullscreen: false,
      }" :config="{
        showMenuBar: false,
        fullScreen: true,
        showToolbar: true,
        loadingIndicator: 'linear',
        showTreeView: false,
        expandTreeByDefault: false,
        maxFileSize: 500 * 1024 * 1024,
        theme,
      }" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, shallowRef } from 'vue';
import { WebDAVDriver } from '../src/adapters';
import { contextMenuItems } from '../src';

const urlParams = new URLSearchParams(window.location.search);
const paramServer = urlParams.get('server');
const paramUsername = urlParams.get('username');
const paramPassword = urlParams.get('password');
const paramAutologin = urlParams.get('autologin') === 'true';

const form = reactive({
  url: paramServer || localStorage.getItem('vf_webdav_url'),
  username: paramUsername || localStorage.getItem('vf_webdav_user') || '',
  password: paramPassword || ''
});

let initialDriver: WebDAVDriver | null = null;
if (paramAutologin && form.url) {
  initialDriver = new WebDAVDriver({
    url: form.url,
    username: form.username,
    password: form.password,
    storagePrefix: 'davs'
  });
  localStorage.setItem('vf_webdav_url', form.url);
  localStorage.setItem('vf_webdav_user', form.username);
}

const isLoggedIn = ref(initialDriver !== null);
const isConnecting = ref(false);
const loginError = ref('');
const driver = shallowRef<WebDAVDriver | null>(initialDriver);

const handleLogin = async () => {
  if (!form.url) {
    loginError.value = 'The server address cannot be empty.';
    return;
  }

  isConnecting.value = true;
  loginError.value = '';

  try {
    const tempDriver = new WebDAVDriver({
      url: form.url,
      username: form.username,
      password: form.password,
      storagePrefix: 'davs'
    });

    await tempDriver.list({ path: 'davs://' });

    localStorage.setItem('vf_webdav_url', form.url);
    localStorage.setItem('vf_webdav_user', form.username);

    driver.value = tempDriver;
    isLoggedIn.value = true;

  } catch (err: any) {
    console.error('Login Failed:', err);
    if (err.message && err.message.includes('401')) {
      loginError.value = 'Username or password incorrect (401 Unauthorized)';
    } else if (err.message && err.message.includes('404')) {
      loginError.value = 'Incorrect server address (404 Not Found)';
    } else {
      loginError.value = 'Connection failed. Please check your network and Cross-Domain (CORS) settings.';
    }
  } finally {
    isConnecting.value = false;
  }
};

const theme = ref('silver');
const updateTheme = (mediaQuery: MediaQueryList | MediaQueryListEvent) => {
  theme.value = mediaQuery.matches ? 'valorite' : 'silver';
};

let darkModeQuery: MediaQueryList;

onMounted(() => {
  darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  updateTheme(darkModeQuery);
  darkModeQuery.addEventListener('change', updateTheme);

  if (paramServer || paramUsername || paramPassword) {
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
  }
});

onUnmounted(() => {
  if (darkModeQuery) {
    darkModeQuery.removeEventListener('change', updateTheme);
  }
});

const getBrowserLanguage = (): string => {
  const lang = navigator.language.toLowerCase();
  if (lang.includes('zh-cn') || lang.includes('zh-hans')) return 'zhCN';
  return 'en';
};

const contextMenu = [
  ...contextMenuItems
];
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app,
.fullscreen-container {
  width: 100%;
  height: 100%;
}

.vuefinder-container {
  height: 100% !important;
}

.vuefinder__main__content {
  position: relative !important;
  overflow: hidden;
}

.vf-login-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vf-login-modal {
  width: 380px;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #111827;
  }

  .vf-login-modal {
    background-color: #1f2937;
    color: #f3f4f6;
  }
}

.vf-login-header {
  padding: 1rem 1.25rem;
  font-size: 1.125rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  .vf-login-header {
    border-bottom-color: #374151;
  }
}

.vf-login-body {
  padding: 1.25rem;
}

.vf-form-group {
  margin-bottom: 1rem;
}

.vf-form-group label {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.375rem;
  color: #4b5563;
}

@media (prefers-color-scheme: dark) {
  .vf-form-group label {
    color: #d1d5db;
  }
}

.vf-form-group input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  background-color: transparent;
  color: inherit;
}

@media (prefers-color-scheme: dark) {
  .vf-form-group input {
    border-color: #4b5563;
  }
}

.vf-form-group input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.vf-error-msg {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
}

.vf-login-footer {
  padding: 0.75rem 1.25rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

@media (prefers-color-scheme: dark) {
  .vf-login-footer {
    background-color: #111827;
    border-top-color: #374151;
  }
}

.vf-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 0.15s;
}

.vf-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.vf-btn-primary {
  background-color: #3b82f6;
  color: white;
}

.vf-btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
}
</style>
