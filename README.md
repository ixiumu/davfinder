# WebDAV Explorer

A high-performance, modern web interface for managing your WebDAV storage. Built for speed, security, and a native-like file management experience.

[![NPM Version](https://img.shields.io/npm/v/davfinder)](https://www.npmjs.com/package/davfinder)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://davfinder.js.org/?server=https://webdav-demo.pages.dev/&username=demo&password=demo)

A high-performance, modern web interface for managing your WebDAV storage. Built for speed, security, and a native-like file management experience. Powered by Vue 3 and VueFinder.

> **🎮 [Click here to try the Live Demo!](https://davfinder.js.org/?server=https://webdav-demo.pages.dev/&username=demo&password=demo)**
> *(Read-only virtual file system. No setup required.)*

## Installation

Install `davfinder` via your preferred package manager:

```bash
npm install davfinder
# or
yarn add davfinder
# or
pnpm add davfinder
```

## Quick Start

1. Register the Plugin

In your application's entry file (e.g., main.ts or main.js), import davfinder and its CSS file, then register it with your Vue app.

```ts
import { createApp } from 'vue';
import App from './App.vue';
import DavFinder from 'davfinder';
import 'davfinder/dist/style.css';

const app = createApp(App);

app.use(DavFinder, {
  locale: 'en',
  // Optional: Dynamically load language packs if your bundler supports it
  /*
  i18n: {
    en: async () => await import('davfinder/dist/locales/en.js'),
    ...
  }
  */
});

app.mount('#app');
```

2. Use the Component

In your Vue component (e.g., `App.vue`), import the `WebDAVDriver`, initialize the connection, and pass it to the `<VueFinder>` component.

```vue
<template>
  <div style="height: 100vh; width: 100vw;">
    <VueFinder 
      v-if="driver" 
      id="webdav-finder" 
      :driver="driver" 
      :config="{
        fullScreen: true,
        theme: 'silver'
      }" 
    />
    <div v-else>
      Connecting to WebDAV server...
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted } from 'vue';
import { WebDAVDriver } from 'davfinder';

const driver = shallowRef<WebDAVDriver | null>(null);

onMounted(async () => {
  try {
    // Initialize the WebDAV driver
    const tempDriver = new WebDAVDriver({
      url: 'https://your-server.com/dav',
      username: 'your_username',
      password: 'your_password',
      storagePrefix: 'davs'
    });

    // Verify connection
    await tempDriver.list({ path: 'davs://' });

    // Render the file explorer
    driver.value = tempDriver;
  } catch (error) {
    console.error('Failed to connect to WebDAV server:', error);
  }
});
</script>

<style>
/* Ensure the body has no margin for a true fullscreen experience */
body {
  margin: 0;
  padding: 0;
}
</style>
```

## Dependencies

This project is built using the following open-source libraries:

- [Vue 3+](https://vuejs.org/)
- [vue-advanced-cropper](https://github.com/advanced-cropper/vue-advanced-cropper) : JavaScript image cropper
- [viselect](https://github.com/simonwep/viselect) : Selection utility
- [Uppy](https://github.com/transloadit/uppy) : Upload library
- [vanilla-lazyload](https://github.com/verlok/vanilla-lazyload) : lightweight and flexible lazy loading for thumbnails
- [mitt](https://github.com/developit/mitt) : Tiny 200 byte functional event emitter / pubsub
- [OverlayScrollbars](https://kingsora.github.io/OverlayScrollbars) : scrollbar plugin
- [nanostores](https://github.com/nanostores/nanostores) : A tiny state manager
- [@nanostores/i18n](https://github.com/nanostores/i18n) : Internationalization backend for nanostores
- [vue-sonner](https://github.com/wobsoriano/vue-sonner) : Toast notification component
- [@floating-ui/dom](https://floating-ui.com/) : Floating UI positioning library
- [@tanstack/vue-query](https://tanstack.com/query/v5/docs/framework/vue/overview) : fetching, caching, synchronizing and updating server state
- [vuefinder](https://github.com/n1crack/vuefinder) : UI component framework.
- [webdav](https://github.com/perry-mitchell/webdav-client) : WebDAV client for browsers and Node.js.
