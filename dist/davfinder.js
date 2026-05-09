import { inject as ht, reactive as gt, watch as ie, ref as A, computed as B, shallowRef as hn, markRaw as qn, defineComponent as te, onMounted as ve, nextTick as Re, openBlock as u, createElementBlock as _, withKeys as ct, unref as i, createElementVNode as r, withModifiers as re, renderSlot as $e, createCommentVNode as z, toDisplayString as b, createBlock as U, resolveDynamicComponent as _n, withCtx as se, createVNode as N, Fragment as ue, renderList as pe, withDirectives as fe, vModelCheckbox as wt, vModelText as ut, onUnmounted as ke, useTemplateRef as Xe, createTextVNode as ce, resolveComponent as mn, normalizeClass as ne, customRef as Gn, Teleport as yt, normalizeStyle as Ae, isRef as Wn, vModelSelect as Mt, onBeforeUnmount as gn, vModelRadio as Pt, mergeProps as Ie, toHandlers as He, vShow as Ue, normalizeProps as Ke, guardReactiveProps as je, onUpdated as Yn, useModel as wn, mergeModels as Qn, Transition as Xn, provide as Jn } from "vue";
import Zn from "mitt";
import { useStore as q } from "@nanostores/vue";
import { persistentAtom as yn } from "@nanostores/persistent";
import { toast as pt, Toaster as eo } from "vue-sonner";
import { atom as Ce, computed as Ne } from "nanostores";
import { QueryClient as to } from "@tanstack/vue-query";
import no from "@uppy/core";
import { Cropper as oo } from "vue-advanced-cropper";
import bn from "vanilla-lazyload";
import { OverlayScrollbars as st, SizeObserverPlugin as so } from "overlayscrollbars";
import { computePosition as Je, offset as it, flip as rt, shift as at, autoUpdate as Lt } from "@floating-ui/dom";
import io from "@viselect/vanilla";
import ro from "@uppy/xhr-upload";
const zt = /* @__PURE__ */ new Map(), It = /* @__PURE__ */ Symbol("ServiceContainerId");
function ao(n, e) {
  zt.set(n, e);
}
function lo(n) {
  zt.delete(n);
}
function ee(n) {
  const e = n ?? ht(It);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = zt.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function co(n) {
  const e = localStorage.getItem(n + "_storage"), t = gt(JSON.parse(e ?? "{}"));
  ie(t, o);
  function o() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function s(c, v) {
    t[c] = v;
  }
  function l(c) {
    delete t[c];
  }
  function a() {
    Object.keys(t).forEach((c) => l(c));
  }
  return { getStore: (c, v = null) => c in t ? t[c] : v, setStore: s, removeStore: l, clearStore: a };
}
function Fe(n, e = "An error occurred") {
  if (!n)
    return e;
  if (typeof n == "string")
    return n || e;
  if (n instanceof Error)
    return n.message || e;
  if (typeof n == "object" && n !== null) {
    const t = n;
    if (typeof t.message == "string" && t.message)
      return t.message;
    if (typeof t.error == "string" && t.error)
      return t.error;
  }
  return e;
}
function uo(n, e) {
  return yn(n, e, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
}
function vo(n) {
  if (!n?.config?.get)
    return !0;
  try {
    return !!n.config.get("notificationsEnabled");
  } catch {
    return !0;
  }
}
function Qe(n, e, t) {
  const o = { type: e, message: t };
  if (n?.emitter?.emit?.("vf-notify", o), !!vo(n))
    switch (e) {
      case "success":
        pt.success(t);
        break;
      case "error":
        pt.error(t);
        break;
      case "warning":
        pt.warning(t);
        break;
      default:
        pt.info(t);
        break;
    }
}
function Pe(n) {
  return {
    success(e) {
      Qe(n, "success", e);
    },
    error(e) {
      Qe(n, "error", e);
    },
    info(e) {
      Qe(n, "info", e);
    },
    warning(e) {
      Qe(n, "warning", e);
    },
    emit(e, t) {
      Qe(n, e, t);
    }
  };
}
const Dt = /* @__PURE__ */ new Map();
async function Et(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function fo(n, e, t, o, s) {
  const l = Pe({ emitter: t, config: s }), a = "vuefinder_locale", d = "global";
  let c;
  if (Dt.has(d))
    c = Dt.get(d), e && e !== c.get() && c.set(e);
  else {
    const y = localStorage.getItem(a) ? JSON.parse(localStorage.getItem(a)) : null;
    c = uo(a, e || y || "en"), Dt.set(d, c);
  }
  const v = "vuefinder_translations", p = (y) => {
    try {
      const P = localStorage.getItem(v);
      if (P)
        return JSON.parse(P)[y] || null;
    } catch {
    }
    return null;
  }, w = (y, P) => {
    try {
      const S = localStorage.getItem(v), E = S ? JSON.parse(S) : {};
      E[y] = P, localStorage.setItem(v, JSON.stringify(E));
    } catch {
    }
  }, h = q(c), x = String(h.value), C = p(x), $ = A(C || {});
  let m = !1;
  !C && Object.keys(o).length > 0 && Et(x, o).then((y) => {
    $.value = y, w(x, y);
  }).catch(() => {
  }), ie(
    h,
    async (y, P) => {
      if (P && y === P)
        return;
      if (!m) {
        m = !0;
        const E = p(String(y));
        if (E)
          $.value = E;
        else if (Object.keys(o).length > 0)
          try {
            const T = await Et(String(y), o);
            $.value = T, w(String(y), T);
          } catch {
          }
        return;
      }
      const S = p(String(y));
      if (S)
        $.value = S;
      else
        try {
          const E = await Et(String(y), o);
          $.value = E, w(String(y), E);
        } catch (E) {
          const T = Fe(E, "Locale cannot be loaded!");
          l.error(T);
          return;
        }
      Object.values(o).length > 1 && (l.success("The language is set to " + y), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const k = (y, ...P) => P.length ? k(y = y.replace("%s", String(P.shift())), ...P) : y;
  function g(y, ...P) {
    return $.value && Object.prototype.hasOwnProperty.call($.value, y) ? k($.value[y] || y, ...P) : k(y, ...P);
  }
  const f = B({
    get: () => h.value,
    set: (y) => {
      c.set(y);
    }
  });
  return gt({ t: g, locale: f, localeAtom: c });
}
const po = [
  "edit",
  "newfile",
  "newfolder",
  "preview",
  "archive",
  "unarchive",
  "search",
  "rename",
  "upload",
  "delete",
  "fullscreen",
  "download",
  "language",
  "move",
  "copy",
  "history",
  "theme",
  "pinned"
], kn = {
  simple: {
    search: !0,
    preview: !0,
    rename: !0,
    upload: !0,
    delete: !0,
    newfile: !0,
    newfolder: !0,
    download: !0
  },
  advanced: po.reduce((n, e) => (n[e] = !0, n), {})
};
function tn() {
  return kn.advanced;
}
function xn(n) {
  return n ? n === "simple" || n === "advanced" ? { ...kn[n] } : { ...tn(), ...n } : tn();
}
const ho = "1.0.2";
function Rt(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1024, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function $n(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1e3, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function _o(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!o) return 0;
  const s = parseFloat(o[1] || "0"), l = (o[2] || "").toLowerCase(), a = e[l] ?? 0;
  return Math.round(s * Math.pow(1024, a));
}
function mo(n) {
  const e = hn(null), t = A(!1), o = A(), s = A(!1);
  return { visible: t, type: e, data: o, open: (c, v = null) => {
    n.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, o.value = v;
  }, close: () => {
    n.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
  }, setEditMode: (c) => {
    s.value = c;
  }, editMode: s };
}
const _t = {
  view: "grid",
  theme: "silver",
  fullScreen: !1,
  showTreeView: !1,
  showHiddenFiles: !0,
  metricUnits: !1,
  showThumbnails: !0,
  persist: !1,
  path: "",
  pinnedFolders: [],
  notificationsEnabled: !0,
  expandTreeByDefault: !1,
  expandedTreePaths: []
}, mt = {
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: "circular",
  showMenuBar: !0,
  showToolbar: !0,
  gridItemWidth: 96,
  gridItemHeight: 80,
  gridItemGap: 8,
  gridIconSize: 48,
  listItemHeight: 32,
  listItemGap: 2,
  listIconSize: 16,
  notificationPosition: "bottom-center",
  notificationDuration: 3e3,
  notificationVisibleToasts: 4,
  notificationRichColors: !0
}, go = new Set(
  Object.keys(mt)
);
function wo(n) {
  return n || "silver";
}
function Sn(n) {
  return go.has(n);
}
function nn(n) {
  const e = {}, t = {}, o = n;
  for (const s in o)
    if (Sn(s))
      t[s] = o[s];
    else if (s in _t) {
      const l = s;
      e[l] = o[s];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function on(n, e) {
  const t = { ..._t, ...e, ...n };
  return t.theme = wo(t.theme), t;
}
function sn(n, e) {
  return { ...mt, ...e, ...n };
}
const yo = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: o, nonPersistenceConfig: s } = nn(e), l = on(
    o,
    _t
  ), a = sn(
    s,
    mt
  ), d = yn(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = Ce(a), v = Ne(
    [d, c],
    (m, k) => ({
      ...m,
      ...k
    })
  ), p = (m = {}) => {
    const k = d.get(), g = c.get(), { persistenceConfig: f, nonPersistenceConfig: y } = nn(m), P = on(f, k), S = sn(
      y,
      g
    );
    d.set(P), c.set(S);
  }, w = (m) => Sn(m) ? c.get()[m] : d.get()[m], h = () => ({
    ...d.get(),
    ...c.get()
  }), x = (m, k) => {
    const g = d.get();
    typeof m == "object" && m !== null ? d.set({ ...g, ...m }) : d.set({
      ...g,
      [m]: k
    });
  };
  return {
    // Store atom (combined)
    state: v,
    // Methods
    init: p,
    get: w,
    set: x,
    toggle: (m) => {
      const k = d.get();
      x(m, !k[m]);
    },
    all: h,
    reset: () => {
      d.set({ ..._t }), c.set({ ...mt });
    }
  };
};
function bo(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(n) || 0, o = Number(e) || 0;
  return t === o ? 0 : t < o ? -1 : 1;
}
const ko = () => {
  const n = Ce(""), e = Ce([]), t = Ce(!1), o = Ce([]), s = Ce({ active: !1, column: "", order: "" }), l = Ce({
    kind: "all",
    showHidden: !1
  }), a = Ce(/* @__PURE__ */ new Set()), d = Ce({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Ce(null), v = Ce(0), p = Ce(!1), w = Ce([]), h = Ce(-1), x = Ne([n], (H) => {
    const K = (H ?? "").trim(), Q = K.indexOf("://"), oe = Q >= 0 ? K.slice(0, Q) : "", Ee = (Q >= 0 ? K.slice(Q + 3) : K).split("/").filter(Boolean);
    let Me = "";
    const et = Ee.map((Se) => (Me = Me ? `${Me}/${Se}` : Se, {
      basename: Se,
      name: Se,
      path: oe ? `${oe}://${Me}` : Me,
      type: "dir"
    }));
    return { storage: oe, breadcrumb: et, path: K };
  }), C = Ne([o, s, l], (H, K, Q) => {
    let oe = H;
    Q.kind === "files" ? oe = oe.filter((Se) => Se.type === "file") : Q.kind === "folders" && (oe = oe.filter((Se) => Se.type === "dir")), Q.showHidden || (oe = oe.filter((Se) => !Se.basename.startsWith(".")));
    const { active: ze, column: Ee, order: Me } = K;
    if (!ze || !Ee) return oe;
    const et = Me === "asc" ? 1 : -1;
    return oe.slice().sort((Se, Ct) => bo(Se[Ee], Ct[Ee]) * et);
  }), $ = Ne([o, a], (H, K) => K.size === 0 ? [] : H.filter((Q) => K.has(Q.path))), m = (H, K) => {
    const Q = n.get();
    if ((K ?? !0) && Q !== H) {
      const oe = w.get(), ze = h.get();
      ze < oe.length - 1 && oe.splice(ze + 1), oe.length === 0 && Q && oe.push(Q), oe.push(H), w.set([...oe]), h.set(oe.length - 1);
    }
    n.set(H);
  }, k = (H) => {
    o.set(H ?? []);
  }, g = (H) => {
    e.set(H ?? []);
  }, f = (H, K) => {
    s.set({ active: !0, column: H, order: K });
  }, y = (H) => {
    const K = s.get();
    K.active && K.column === H ? s.set({
      active: K.order === "asc",
      column: H,
      order: "desc"
    }) : s.set({
      active: !0,
      column: H,
      order: "asc"
    });
  }, P = () => {
    s.set({ active: !1, column: "", order: "" });
  }, S = (H, K) => {
    l.set({ kind: H, showHidden: K });
  }, E = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, T = (H, K = "multiple") => {
    const Q = new Set(a.get());
    K === "single" && Q.clear(), Q.add(H), a.set(Q);
  }, V = (H, K = "multiple") => {
    const Q = new Set(a.get());
    K === "single" && Q.clear(), H.forEach((oe) => Q.add(oe)), a.set(Q);
  }, j = (H) => {
    const K = new Set(a.get());
    K.delete(H), a.set(K);
  }, O = (H) => a.get().has(H), G = (H, K = "multiple") => {
    const Q = new Set(a.get());
    Q.has(H) ? Q.delete(H) : (K === "single" && Q.clear(), Q.add(H)), a.set(Q);
  }, M = (H = "multiple", K) => {
    if (H === "single") {
      const Q = o.get()[0];
      if (Q) {
        const oe = Q.path;
        a.set(/* @__PURE__ */ new Set([oe])), v.set(1);
      }
    } else {
      if (K?.selectionFilterType || K?.selectionFilterMimeIncludes && K.selectionFilterMimeIncludes.length > 0) {
        const Q = o.get().filter((oe) => {
          const ze = K.selectionFilterType, Ee = K.selectionFilterMimeIncludes;
          return ze === "files" && oe.type === "dir" || ze === "dirs" && oe.type === "file" ? !1 : Ee && Array.isArray(Ee) && Ee.length > 0 && oe.type !== "dir" ? oe.mime_type ? Ee.some((Me) => oe.mime_type?.startsWith(Me)) : !1 : !0;
        }).map((oe) => oe.path);
        a.set(new Set(Q));
      } else {
        const Q = new Set(o.get().map((oe) => oe.path));
        a.set(Q);
      }
      J(a.get().size);
    }
  }, X = () => {
    a.set(/* @__PURE__ */ new Set()), v.set(0);
  }, W = (H) => {
    const K = new Set(H ?? []);
    a.set(K), v.set(K.size);
  }, J = (H) => {
    v.set(H);
  }, I = (H) => {
    p.set(!!H);
  }, D = () => p.get(), F = (H, K) => {
    const Q = o.get().filter((oe) => K.has(oe.path));
    d.set({
      type: H,
      path: x.get().path,
      items: new Set(Q)
    });
  }, L = (H) => Ne([d], (K) => K.type === "cut" && Array.from(K.items).some((Q) => Q.path === H)), R = (H) => Ne([d], (K) => K.type === "copy" && Array.from(K.items).some((Q) => Q.path === H)), Y = (H) => {
    const K = L(H);
    return q(K).value ?? !1;
  }, le = (H) => {
    const K = R(H);
    return q(K).value ?? !1;
  }, he = () => {
    d.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, xe = () => d.get(), ge = (H) => {
    c.set(H);
  }, We = () => c.get(), qe = () => {
    c.set(null);
  }, we = () => {
    const H = w.get(), K = h.get();
    if (K > 0) {
      const Q = K - 1, oe = H[Q];
      oe && (h.set(Q), m(oe, !1));
    }
  }, Z = () => {
    const H = w.get(), K = h.get();
    if (K < H.length - 1) {
      const Q = K + 1, oe = H[Q];
      oe && (h.set(Q), m(oe, !1));
    }
  }, de = Ne([h], (H) => H > 0), ae = Ne(
    [w, h],
    (H, K) => K < H.length - 1
  );
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: n,
    sort: s,
    filter: l,
    selectedKeys: a,
    selectedCount: v,
    loading: p,
    draggedItem: c,
    clipboardItems: d,
    // Computed values
    path: x,
    sortedFiles: C,
    selectedItems: $,
    // Actions
    setPath: m,
    setFiles: k,
    setStorages: g,
    setSort: f,
    toggleSort: y,
    clearSort: P,
    setFilter: S,
    clearFilter: E,
    select: T,
    selectMultiple: V,
    deselect: j,
    toggleSelect: G,
    selectAll: M,
    isSelected: O,
    clearSelection: X,
    setSelection: W,
    setSelectedCount: J,
    setLoading: I,
    isLoading: D,
    setClipboard: F,
    createIsCut: L,
    createIsCopied: R,
    isCut: Y,
    isCopied: le,
    clearClipboard: he,
    getClipboard: xe,
    setDraggedItem: ge,
    getDraggedItem: We,
    clearDraggedItem: qe,
    setReadOnly: (H) => {
      t.set(H);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (H) => t.get() ? !0 : H.read_only ?? !1,
    // Navigation
    goBack: we,
    goForward: Z,
    canGoBack: de,
    canGoForward: ae,
    navigationHistory: w,
    historyIndex: h
  };
};
class Vt {
  /**
   * Validate that required parameters are provided
   */
  validateParam(e, t) {
    if (e == null)
      throw new Error(`${t} is required`);
  }
  /**
   * Validate that a file path is provided
   */
  validatePath(e) {
    if (!e)
      throw new Error("Path must be a non-empty string");
  }
  /**
   * Extract storage and path from a combined path string
   * Format: "storage://path" or just "path"
   */
  parsePath(e) {
    if (!e)
      return {};
    if (e.includes("://")) {
      const [t, ...o] = e.split("://");
      return { storage: t, path: o.join("://") };
    }
    return { path: e };
  }
  /**
   * Combine storage and path into a single path string
   */
  combinePath(e, t) {
    return e && t ? `${e}://${t}` : t || "";
  }
}
class xo extends Vt {
  filesSource;
  defaultStorage;
  storages;
  storagesSet;
  readOnly;
  contentStore;
  constructor(e) {
    super(), this.filesSource = e.files;
    const t = e.storages && e.storages.length > 0 ? e.storages : [e.storage || "memory"];
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "memory", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.contentStore = e.contentStore || /* @__PURE__ */ new Map();
  }
  get files() {
    return Array.isArray(this.filesSource) ? this.filesSource : this.filesSource.value;
  }
  set files(e) {
    Array.isArray(this.filesSource) ? (this.filesSource.length = 0, this.filesSource.push(...e)) : this.filesSource.value = e;
  }
  ensureWritable() {
    if (this.readOnly)
      throw new Error("Driver is read-only");
  }
  ensureStorageSupported(e) {
    if (!this.storagesSet.has(e))
      throw new Error(`Unsupported storage: ${e}`);
  }
  combine(e, t = this.defaultStorage) {
    this.ensureStorageSupported(t);
    const o = e ?? "";
    return o === "" ? `${t}://` : `${t}://${o}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  normalizePath(e, t = this.defaultStorage) {
    const { storage: o, path: s } = this.split(e || ""), l = o || t;
    return this.combine(s ?? "", l);
  }
  parent(e) {
    const { storage: t, path: o } = this.split(e), s = t || this.defaultStorage;
    if (!o) return this.combine("", s);
    const l = o.replace(/\/+$/g, "").replace(/^\/+/, ""), a = l.lastIndexOf("/");
    return a <= 0 ? this.combine("", s) : this.combine(l.slice(0, a), s);
  }
  join(e, t) {
    const { storage: o, path: s } = this.split(e), l = o || this.defaultStorage, a = (s ?? "").replace(/\/$/, ""), d = a ? `${a}/${t}` : t;
    return this.combine(d, l);
  }
  getExtension(e) {
    const t = e.lastIndexOf(".");
    return t > 0 ? e.slice(t + 1) : "";
  }
  cloneEntry(e, t = {}) {
    return { ...e, ...t };
  }
  findByPath(e) {
    return this.files.find((t) => t.path === e);
  }
  listChildren(e) {
    return this.files.filter((t) => t.dir === e);
  }
  replaceAll(e) {
    this.files = e;
  }
  upsert(e) {
    const t = this.files.slice(), o = t.findIndex((s) => s.path === e.path);
    o === -1 ? t.push(e) : t[o] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((o) => o.path !== e);
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], o = [];
    for (const s of this.files)
      this.isInTree(s.path, e) ? t.push(s) : o.push(s);
    this.replaceAll(o);
    for (const s of t)
      this.contentStore.delete(s.path);
    return t;
  }
  isInTree(e, t) {
    return e === t || e.startsWith(`${t}/`);
  }
  getTree(e, t = this.files) {
    return t.filter((o) => this.isInTree(o.path, e)).sort((o, s) => o.path.length - s.path.length);
  }
  uniqueName(e, t, o) {
    if (!o.has(this.join(e, t))) return t;
    const s = t.lastIndexOf("."), l = s > 0 ? t.slice(0, s) : t, a = s > 0 ? t.slice(s) : "";
    let d = 1;
    for (; ; ) {
      const c = `${l} copy ${d}${a}`, v = this.join(e, c);
      if (!o.has(v)) return c;
      d++;
    }
  }
  topLevelSources(e, t = this.defaultStorage) {
    const o = [...new Set(e)].map((l) => this.normalizePath(l, t)).filter((l) => this.findByPath(l)).sort((l, a) => l.length - a.length), s = [];
    for (const l of o)
      s.some((a) => this.isInTree(l, a)) || s.push(l);
    return s;
  }
  makeDirEntry(e, t) {
    const o = this.join(e, t), { storage: s } = this.split(o);
    return {
      storage: s || this.defaultStorage,
      dir: e,
      basename: t,
      extension: "",
      path: o,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, t, o = 0, s = null) {
    const l = this.join(e, t), { storage: a } = this.split(l);
    return {
      storage: a || this.defaultStorage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: l,
      type: "file",
      file_size: o,
      last_modified: Date.now(),
      mime_type: s,
      visibility: "public"
    };
  }
  resultForDir(e) {
    return {
      files: this.listChildren(e),
      storages: this.storages,
      read_only: this.readOnly,
      dirname: e
    };
  }
  async list(e) {
    const t = this.normalizePath(e?.path);
    return {
      storages: this.storages,
      dirname: t,
      files: this.listChildren(t),
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.ensureWritable(), this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.path), { storage: o } = this.split(t), s = [];
    for (const a of e.items) {
      const d = this.normalizePath(a.path, o || this.defaultStorage), c = this.findByPath(d);
      c && (c.type === "dir" ? s.push(...this.removeTree(c.path)) : (this.removeExact(c.path), this.contentStore.delete(c.path), s.push(c)));
    }
    return { ...this.resultForDir(t), deleted: s };
  }
  async rename(e) {
    this.ensureWritable(), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), { storage: o } = this.split(t), s = this.normalizePath(
      e.item || e.path,
      o || this.defaultStorage
    ), l = this.findByPath(s);
    if (!l) throw new Error("Item not found");
    const a = l.dir, d = this.join(a, e.name);
    if (d !== l.path && this.findByPath(d))
      throw new Error("Target already exists");
    if (l.type === "dir") {
      const v = l.path, p = d, w = this.files.map((h) => {
        if (h.storage !== l.storage || !this.isInTree(h.path, v)) return h;
        const x = p + h.path.slice(v.length);
        return this.cloneEntry(h, {
          path: x,
          dir: this.parent(x),
          basename: h.path === v ? e.name : h.basename,
          last_modified: Date.now()
        });
      });
      for (const [h, x] of Array.from(this.contentStore.entries()))
        this.isInTree(h, v) && (this.contentStore.delete(h), this.contentStore.set(p + h.slice(v.length), x));
      this.replaceAll(w);
    } else {
      const v = this.cloneEntry(l, {
        path: d,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(v), this.removeExact(l.path);
      const p = this.contentStore.get(l.path);
      p !== void 0 && (this.contentStore.delete(l.path), this.contentStore.set(v.path, p));
    }
    const c = e.path ? this.normalizePath(e.path, l.storage || this.defaultStorage) : a;
    return this.resultForDir(c || a);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: o } = this.split(t), s = this.topLevelSources(e.sources, o || this.defaultStorage), l = new Set(this.files.map((d) => d.path)), a = [];
    for (const d of s) {
      const c = this.findByPath(d);
      if (!c) continue;
      if (c.type === "file") {
        const h = this.uniqueName(t, c.basename, l), x = this.makeFileEntry(
          t,
          h,
          c.file_size || 0,
          c.mime_type
        );
        a.push(x), l.add(x.path);
        const C = this.contentStore.get(c.path);
        C !== void 0 && this.contentStore.set(x.path, C);
        continue;
      }
      const v = this.getTree(c.path), p = this.uniqueName(t, c.basename, l), w = /* @__PURE__ */ new Map();
      w.set(c.path, this.join(t, p));
      for (const h of v) {
        const x = h.path === c.path ? w.get(c.path) : this.join(w.get(h.dir), h.basename);
        w.set(h.path, x);
        const C = h.path === c.path ? t : w.get(h.dir), $ = h.path === c.path ? p : h.basename, m = this.cloneEntry(h, {
          path: x,
          dir: C,
          basename: $,
          extension: h.type === "file" ? this.getExtension($) : "",
          last_modified: Date.now()
        });
        if (a.push(m), l.add(m.path), h.type === "file") {
          const k = this.contentStore.get(h.path);
          k !== void 0 && this.contentStore.set(m.path, k);
        }
      }
    }
    return this.replaceAll(this.files.concat(a)), this.resultForDir(t);
  }
  async move(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: o } = this.split(t), s = this.topLevelSources(e.sources, o || this.defaultStorage);
    let l = this.files.slice();
    for (const a of s) {
      const d = l.find((C) => C.path === a);
      if (!d) continue;
      if (d.type === "dir" && this.isInTree(t, d.path))
        throw new Error("Cannot move directory into itself");
      if (d.dir === t)
        continue;
      const c = this.getTree(d.path, l), v = new Set(c.map((C) => C.path)), p = new Set(l.filter((C) => !v.has(C.path)).map((C) => C.path)), w = this.uniqueName(t, d.basename, p), h = /* @__PURE__ */ new Map();
      h.set(d.path, this.join(t, w));
      const x = /* @__PURE__ */ new Map();
      for (const C of c) {
        const $ = C.path === d.path ? h.get(d.path) : this.join(h.get(C.dir), C.basename);
        h.set(C.path, $);
        const m = C.path === d.path ? t : h.get(C.dir), k = C.path === d.path ? w : C.basename;
        x.set(
          C.path,
          this.cloneEntry(C, {
            path: $,
            dir: m,
            basename: k,
            extension: C.type === "file" ? this.getExtension(k) : "",
            last_modified: Date.now()
          })
        );
      }
      l = l.map((C) => x.get(C.path) || C);
      for (const [C, $] of h.entries()) {
        if (C === $) continue;
        const m = this.contentStore.get(C);
        m !== void 0 && (this.contentStore.delete(C), this.contentStore.set($, m));
      }
    }
    return this.replaceAll(l), this.resultForDir(t);
  }
  async archive(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), o = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, s = this.makeFileEntry(t, o, 0, "application/zip");
    return this.upsert(s), this.resultForDir(t);
  }
  async unarchive(e) {
    this.ensureWritable(), this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.item), o = this.normalizePath(e.path), s = this.findByPath(t);
    if (!s) throw new Error("Archive not found");
    const l = s.basename.replace(/\.zip$/i, ""), a = this.makeDirEntry(o, l);
    return this.upsert(a), this.resultForDir(o);
  }
  async createFile(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), o = this.makeFileEntry(t, e.name, 0, null);
    return this.upsert(o), this.contentStore.set(o.path, ""), this.resultForDir(t);
  }
  async createFolder(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), o = this.makeDirEntry(t, e.name);
    return this.upsert(o), this.resultForDir(t);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = this.normalizePath(e.path), o = this.contentStore.get(t);
    if (typeof o == "string" || o === void 0)
      return {
        content: o ?? "",
        mimeType: this.findByPath(t)?.mime_type || void 0
      };
    const s = new Uint8Array(o);
    let l = "";
    for (let a = 0; a < s.length; a++) l += String.fromCharCode(s[a]);
    return {
      content: btoa(l),
      mimeType: this.findByPath(t)?.mime_type || void 0
    };
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), o = e.path ? this.normalizePath(e.path) : void 0;
    return this.files.filter((s) => {
      if (o) {
        if (e.deep) {
          if (!this.isInTree(s.path, o)) return !1;
        } else if (s.dir !== o)
          return !1;
      }
      return s.basename.toLowerCase().includes(t) || s.path.toLowerCase().includes(t);
    });
  }
  async save(e) {
    this.ensureWritable(), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.path), o = this.findByPath(t);
    if (!o) throw new Error("File not found");
    if (o.type !== "file") throw new Error("Can only save file content");
    return this.contentStore.set(t, e.content), this.upsert(
      this.cloneEntry(o, { file_size: e.content.length, last_modified: Date.now() })
    ), t;
  }
  configureUploader(e, t) {
    e && e.on("upload-success", async (o) => {
      try {
        this.ensureWritable();
        const s = this.normalizePath(t.getTargetPath()), l = o?.name || "file", a = o?.type || null, d = o?.data, c = o?.size || 0, v = this.makeFileEntry(s, l, c, a);
        if (this.upsert(v), d)
          try {
            const p = await d.arrayBuffer();
            this.contentStore.set(v.path, p);
          } catch {
            this.contentStore.set(v.path, "");
          }
        else
          this.contentStore.set(v.path, "");
      } catch {
      }
    });
  }
}
function rn(n, e, t) {
  const o = `HTTP ${e}: ${t}`;
  if (!n)
    return o;
  try {
    const s = JSON.parse(n);
    if (s.message)
      return s.message;
    if (s.error) {
      if (typeof s.error == "string")
        return s.error;
      if (s.error.message)
        return s.error.message;
    }
    if (s.errors && Array.isArray(s.errors) && s.errors.length > 0) {
      const l = s.errors.map((a) => a.message).filter((a) => !!a);
      if (l.length > 0)
        return l.join(", ");
    }
    return s.detail ? s.detail : s.title ? s.title : n;
  } catch {
    return n || o;
  }
}
class Cn extends Vt {
  config;
  /**
   * Default URL endpoints
   */
  static DEFAULT_URLS = {
    list: "",
    upload: "/upload",
    delete: "/delete",
    rename: "/rename",
    copy: "/copy",
    move: "/move",
    archive: "/archive",
    unarchive: "/unarchive",
    createFile: "/create-file",
    createFolder: "/create-folder",
    preview: "/preview",
    download: "/download",
    search: "/search",
    save: "/save"
  };
  constructor(e) {
    super();
    const t = {
      ...Cn.DEFAULT_URLS,
      ...e.url || {}
    };
    this.config = {
      ...e,
      baseURL: e.baseURL || "",
      url: t
    };
  }
  /**
   * Set or update the base URL for API requests
   */
  setBaseURL(e) {
    this.config.baseURL = e || "";
  }
  /**
   * Set or update the authentication token
   * Pass undefined to remove the token
   */
  setToken(e) {
    this.config.token = e;
  }
  configureUploader(e, t) {
    const o = this.getHeaders();
    delete o["Content-Type"], e.use(ro, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: o,
      formData: !0
    }), e.on("upload", () => {
      const s = t.getTargetPath();
      e.getFiles().forEach((a) => {
        e.setFileMeta(a.id, { path: s });
      });
    });
  }
  getHeaders() {
    const e = {
      "Content-Type": "application/json",
      ...this.config.headers
    };
    return this.config.token && (e.Authorization = `Bearer ${this.config.token}`), e;
  }
  async request(e, t = {}) {
    const o = `${this.config.baseURL}${e}`, s = await fetch(o, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!s.ok) {
      const a = await s.text(), d = rn(a, s.status, s.statusText);
      throw new Error(d);
    }
    return (s.headers.get("content-type") || "").includes("application/json") ? await s.json() : await s.text();
  }
  async list(e) {
    const t = new URLSearchParams();
    e?.path && t.append("path", e.path);
    const o = t.toString() ? `${this.config.url.list}?${t.toString()}` : this.config.url.list;
    return await this.request(o, { method: "GET" });
  }
  async delete(e) {
    return this.validateParam(e.items, "items"), this.validateParam(e.path, "path"), await this.request(this.config.url.delete, {
      method: "POST",
      body: JSON.stringify({ path: e.path, items: e.items })
    });
  }
  async rename(e) {
    return this.validateParam(e.path, "path"), this.validateParam(e.item, "item"), this.validateParam(e.name, "name"), this.validatePath(e.path), await this.request(this.config.url.rename, {
      method: "POST",
      body: JSON.stringify({ path: e.path, item: e.item, name: e.name })
    });
  }
  async copy(e) {
    return this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination"), e.path && this.validatePath(e.path), await this.request(this.config.url.copy, {
      method: "POST",
      body: JSON.stringify({
        sources: e.sources,
        destination: e.destination,
        path: e.path
      })
    });
  }
  async move(e) {
    return this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination"), e.path && this.validatePath(e.path), await this.request(this.config.url.move, {
      method: "POST",
      body: JSON.stringify({
        sources: e.sources,
        destination: e.destination,
        path: e.path
      })
    });
  }
  async archive(e) {
    return this.validateParam(e.items, "items"), this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.archive, {
      method: "POST",
      body: JSON.stringify({ items: e.items, path: e.path, name: e.name })
    });
  }
  async unarchive(e) {
    return this.validateParam(e.item, "item"), this.validateParam(e.path, "path"), await this.request(this.config.url.unarchive, {
      method: "POST",
      body: JSON.stringify({ item: e.item, path: e.path })
    });
  }
  async createFile(e) {
    return this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.createFile, {
      method: "POST",
      body: JSON.stringify({ path: e.path, name: e.name })
    });
  }
  async createFolder(e) {
    return this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.createFolder, {
      method: "POST",
      body: JSON.stringify({ path: e.path, name: e.name })
    });
  }
  getPreviewUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`;
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path }), o = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, s = await fetch(o, { headers: this.getHeaders() });
    if (!s.ok) {
      const a = await s.text(), d = rn(a, s.status, s.statusText);
      throw new Error(d);
    }
    return { content: await s.text(), mimeType: s.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, o = new URLSearchParams();
    e.path && o.set("path", e.path), e.filter && o.set("filter", e.filter), e.deep && o.set("deep", "1"), e.size && e.size !== "all" && o.set("size", e.size);
    const s = o.toString() ? `${t}?${o.toString()}` : t;
    return (await this.request(s, {
      method: "GET"
    })).files || [];
  }
  async save(e) {
    return this.validateParam(e.path, "path"), await this.request(this.config.url.save, {
      method: "POST",
      body: JSON.stringify({ path: e.path, content: e.content }),
      headers: this.getHeaders()
    });
  }
}
class Uv extends Vt {
  dbName;
  defaultStorage;
  storages;
  storagesSet;
  readOnly;
  version;
  db = null;
  dbPromise = null;
  entries = [];
  contentStore = /* @__PURE__ */ new Map();
  driver;
  readyPromise = null;
  constructor(e = {}) {
    super(), this.dbName = e.dbName || "vuefinder";
    const t = e.storages && e.storages.length > 0 ? e.storages : [e.storage || "indexeddb"];
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "indexeddb", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.version = e.version || 1, this.driver = new xo({
      files: this.entries,
      storage: this.defaultStorage,
      storages: this.storages,
      readOnly: this.readOnly,
      contentStore: this.contentStore
    }), this.readyPromise = this.loadSnapshotFromDB();
  }
  isManagedStorage(e) {
    return !!(e && this.storagesSet.has(e));
  }
  isManagedPath(e) {
    if (!e) return !1;
    const { storage: t } = this.parsePath(e);
    return this.isManagedStorage(t);
  }
  async initDB() {
    return this.dbPromise ? this.dbPromise : (this.dbPromise = new Promise((e, t) => {
      const o = indexedDB.open(this.dbName, this.version);
      o.onerror = () => t(o.error), o.onsuccess = () => {
        this.db = o.result, e(this.db);
      }, o.onupgradeneeded = (s) => {
        const l = s.target.result;
        if (!l.objectStoreNames.contains("files")) {
          const a = l.createObjectStore("files", { keyPath: "path" });
          a.createIndex("storage", "storage", { unique: !1 }), a.createIndex("dir", "dir", { unique: !1 });
        }
        l.objectStoreNames.contains("content") || l.createObjectStore("content", { keyPath: "path" });
      };
    }), this.dbPromise);
  }
  async getDB() {
    return this.db ? this.db : this.initDB();
  }
  requestToPromise(e) {
    return new Promise((t, o) => {
      e.onsuccess = () => t(e.result), e.onerror = () => o(e.error);
    });
  }
  waitTransaction(e) {
    return new Promise((t, o) => {
      e.oncomplete = () => t(), e.onerror = () => o(e.error), e.onabort = () => o(e.error);
    });
  }
  async loadSnapshotFromDB() {
    const t = (await this.getDB()).transaction(["files", "content"], "readonly"), o = t.objectStore("files"), s = t.objectStore("content"), [l, a] = await Promise.all([
      this.requestToPromise(o.getAll()),
      this.requestToPromise(s.getAll())
    ]);
    await this.waitTransaction(t), this.entries.length = 0, this.entries.push(...l.filter((d) => this.isManagedStorage(d.storage))), this.contentStore.clear();
    for (const d of a)
      this.isManagedPath(d?.path) && this.contentStore.set(d.path, d.content);
  }
  async persistSnapshot() {
    if (this.readOnly) return;
    const t = (await this.getDB()).transaction(["files", "content"], "readwrite"), o = t.objectStore("files"), s = t.objectStore("content"), l = this.requestToPromise(
      o.getAll()
    ), a = this.requestToPromise(
      s.getAll()
    ), [d, c] = await Promise.all([
      l,
      a
    ]);
    o.clear(), s.clear();
    for (const v of d)
      this.isManagedStorage(v.storage) || o.put(v);
    for (const v of c)
      this.isManagedPath(v.path) || s.put(v);
    for (const v of this.entries)
      this.isManagedStorage(v.storage) && o.put(v);
    for (const [v, p] of this.contentStore.entries())
      this.isManagedPath(v) && s.put({ path: v, content: p });
    await this.waitTransaction(t);
  }
  async ensureReady() {
    this.readyPromise || (this.readyPromise = this.loadSnapshotFromDB()), await this.readyPromise;
  }
  async list(e) {
    return await this.ensureReady(), this.driver.list(e);
  }
  async delete(e) {
    await this.ensureReady();
    const t = await this.driver.delete(e);
    return await this.persistSnapshot(), t;
  }
  async rename(e) {
    await this.ensureReady();
    const t = await this.driver.rename(e);
    return await this.persistSnapshot(), t;
  }
  async copy(e) {
    await this.ensureReady();
    const t = await this.driver.copy(e);
    return await this.persistSnapshot(), t;
  }
  async move(e) {
    await this.ensureReady();
    const t = await this.driver.move(e);
    return await this.persistSnapshot(), t;
  }
  async archive(e) {
    await this.ensureReady();
    const t = await this.driver.archive(e);
    return await this.persistSnapshot(), t;
  }
  async unarchive(e) {
    await this.ensureReady();
    const t = await this.driver.unarchive(e);
    return await this.persistSnapshot(), t;
  }
  async createFile(e) {
    await this.ensureReady();
    const t = await this.driver.createFile(e);
    return await this.persistSnapshot(), t;
  }
  async createFolder(e) {
    await this.ensureReady();
    const t = await this.driver.createFolder(e);
    return await this.persistSnapshot(), t;
  }
  getPreviewUrl(e) {
    return this.driver.getPreviewUrl(e);
  }
  async getContent(e) {
    return await this.ensureReady(), this.driver.getContent(e);
  }
  getDownloadUrl(e) {
    return this.driver.getDownloadUrl(e);
  }
  async search(e) {
    return await this.ensureReady(), this.driver.search(e);
  }
  async save(e) {
    await this.ensureReady();
    const t = await this.driver.save(e);
    return await this.persistSnapshot(), t;
  }
  configureUploader(e, t) {
    this.ensureReady(), this.driver.configureUploader?.(e, t), e && e.on("upload-success", async () => {
      try {
        await this.ensureReady(), await this.persistSnapshot();
      } catch {
      }
    });
  }
}
const an = {
  list: (n) => ["adapter", "list", n],
  search: (n, e, t, o) => ["adapter", "search", n, e, t, o],
  delete: (n) => ["adapter", "delete", n],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class $o {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new to({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: t.refetchOnWindowFocus ?? !1,
          staleTime: t.staleTime ?? 300 * 1e3,
          retry: t.retry ?? 2
        },
        mutations: {
          retry: t.retry ?? 1
        }
      }
    }), this.config = {
      queryClient: this.queryClient,
      refetchOnWindowFocus: t.refetchOnWindowFocus ?? !1,
      staleTime: t.staleTime ?? 300 * 1e3,
      cacheTime: t.cacheTime ?? 600 * 1e3,
      retry: t.retry ?? 2,
      onBeforeOpen: this.onBeforeOpen ?? (() => {
      }),
      onAfterOpen: this.onAfterOpen ?? (() => {
      })
    };
  }
  /**
   * Get the underlying driver instance
   */
  getDriver() {
    return this.driver;
  }
  /**
   * Get the query client instance
   */
  getQueryClient() {
    return this.queryClient;
  }
  /**
   * List files with caching and automatic refetching
   */
  async list(e) {
    const t = an.list(e);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: () => this.driver.list({ path: e }),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Open a path and optionally update state
   * @param path
   * @returns
   */
  async open(e) {
    this.onBeforeOpen && this.onBeforeOpen();
    const t = await this.list(e);
    return this.onAfterOpen && this.onAfterOpen(t), t;
  }
  /**
   * Delete files with optimistic updates
   */
  async delete(e) {
    const t = await this.driver.delete(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Rename a file or folder
   */
  async rename(e) {
    const t = await this.driver.rename(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Copy files to a destination
   */
  async copy(e) {
    const t = await this.driver.copy(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Move files to a destination
   */
  async move(e) {
    const t = await this.driver.move(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a zip archive
   */
  async archive(e) {
    const t = await this.driver.archive(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Extract files from a zip archive
   */
  async unarchive(e) {
    const t = await this.driver.unarchive(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a new file
   */
  async createFile(e) {
    const t = await this.driver.createFile(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a new folder
   */
  async createFolder(e) {
    const t = await this.driver.createFolder(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Get file content (cached)
   */
  async getContent(e) {
    const t = ["adapter", "content", e.path];
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: () => this.driver.getContent(e),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Get preview URL
   */
  getPreviewUrl(e) {
    return this.driver.getPreviewUrl(e);
  }
  /**
   * Get download URL
   */
  getDownloadUrl(e) {
    return this.driver.getDownloadUrl(e);
  }
  /**
   * Search files (cached per path+filter)
   */
  async search(e) {
    const t = an.search(e.path, e.filter, e.deep, e.size);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: () => this.driver.search(e),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Save content to file (and invalidate list cache)
   */
  async save(e) {
    const t = await this.driver.save(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Invalidate all list queries
   */
  invalidateListQueries() {
    this.queryClient.invalidateQueries({
      queryKey: ["adapter"],
      exact: !1
    });
  }
  invalidateListQuery(e) {
    this.queryClient.invalidateQueries({
      queryKey: ["adapter", "list", e],
      exact: !0
    });
  }
  /**
   * Clear all cached queries
   */
  clearCache() {
    this.queryClient.clear();
  }
}
function So(n) {
  const e = q(n.state);
  return {
    current: B(() => e.value.theme || "silver"),
    set: (s) => {
      n.set("theme", s);
    }
  };
}
const Co = (n, e) => {
  const t = co(n.id ?? "vf"), o = Zn(), s = e.i18n, l = n.locale ?? e.locale, a = yo(n.id ?? "vf", n.config ?? {}), d = ko();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new $o(n.driver);
  return gt({
    // app version
    version: ho,
    // config store
    config: a,
    // Theme
    theme: (() => {
      const v = So(a);
      return {
        current: v.current,
        set: v.set
      };
    })(),
    // files store
    fs: d,
    // root element
    root: null,
    // app id
    debug: n.debug ?? !1,
    // Event Bus
    emitter: o,
    // storage
    storage: t,
    // localization object
    i18n: fo(
      t,
      l,
      o,
      s,
      a
    ),
    // modal state
    modal: mo(a),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: qn(c),
    // active features
    features: xn(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: B(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: B(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: a.get("metricUnits") ? $n : Rt,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // expose custom uploader if provided
    customUploader: n.customUploader
  });
}, Fo = ["data-theme"], Po = { class: "vuefinder__modal-layout__container" }, Do = { class: "vuefinder__modal-layout__content" }, Eo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, To = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Mo = { class: "vuefinder__modal-drag-message" }, Te = /* @__PURE__ */ te({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(n) {
    const e = A(null), t = ee();
    t.config;
    const o = n;
    ve(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Re(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const a = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: a,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const s = (l) => {
      l.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (l.preventDefault(), l.stopPropagation());
    };
    return (l, a) => (u(), _("div", {
      "data-theme": i(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: a[1] || (a[1] = ct((d) => i(t).modal.close(), ["esc"]))
    }, [
      a[2] || (a[2] = r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      r("div", Po, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: s,
          onMousedown: a[0] || (a[0] = re((d) => i(t).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", Do, [
              $e(l.$slots, "default")
            ]),
            l.$slots.buttons ? (u(), _("div", Eo, [
              $e(l.$slots, "buttons")
            ])) : z("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (u(), _("div", To, [
        r("div", Mo, b(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : z("", !0)
    ], 40, Fo));
  }
}), Io = { class: "vuefinder__modal-header" }, Ao = { class: "vuefinder__modal-header__icon-container" }, Oo = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Oe = /* @__PURE__ */ te({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (u(), _("div", Io, [
      r("div", Ao, [
        (u(), U(_n(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("div", Oo, b(n.title), 1)
    ]));
  }
}), Lo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function zo(n, e) {
  return u(), _("svg", Lo, [...e[0] || (e[0] = [
    r("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Fn = { render: zo }, Ro = { class: "vuefinder__delete-modal__content" }, Vo = { class: "vuefinder__delete-modal__form" }, Bo = { class: "vuefinder__delete-modal__description" }, Uo = { class: "vuefinder__delete-modal__files vf-scrollbar" }, No = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ho = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ko = { class: "vuefinder__delete-modal__file-name" }, jo = { class: "vuefinder__delete-modal__confirmation" }, qo = { class: "vuefinder__delete-modal__confirmation-label" }, Go = { class: "vuefinder__delete-modal__confirmation-text" }, Wo = ["disabled"], bt = /* @__PURE__ */ te({
  __name: "ModalDelete",
  setup(n) {
    const e = ee(), t = Pe(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), a = A(e.modal.data.items), d = A(!1), c = () => {
      a.value.length && d.value && e.adapter.delete({
        path: l.value.path,
        items: a.value.map(({ path: v, type: p }) => ({
          path: v,
          type: p
        }))
      }).then((v) => {
        t.success(o("Files deleted.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Fe(v, o("Failed to delete files")));
      });
    };
    return (v, p) => (u(), U(Te, null, {
      buttons: se(() => [
        r("div", jo, [
          r("label", qo, [
            fe(r("input", {
              "onUpdate:modelValue": p[0] || (p[0] = (w) => d.value = w),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [wt, d.value]
            ]),
            r("span", Go, b(i(o)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !d.value,
          onClick: c
        }, b(i(o)("Yes, Delete!")), 9, Wo),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[1] || (p[1] = (w) => i(e).modal.close())
        }, b(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        r("div", null, [
          N(Oe, {
            icon: i(Fn),
            title: i(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          r("div", Ro, [
            r("div", Vo, [
              r("p", Bo, b(i(o)("Are you sure you want to delete these files?")), 1),
              r("div", Uo, [
                (u(!0), _(ue, null, pe(a.value, (w) => (u(), _("p", {
                  key: w.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  w.type === "dir" ? (u(), _("svg", No, [...p[2] || (p[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), _("svg", Ho, [...p[3] || (p[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  r("span", Ko, b(w.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Yo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Qo(n, e) {
  return u(), _("svg", Yo, [...e[0] || (e[0] = [
    r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Pn = { render: Qo }, Xo = { class: "vuefinder__rename-modal__content" }, Jo = { class: "vuefinder__rename-modal__item" }, Zo = { class: "vuefinder__rename-modal__item-info" }, es = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ts = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ns = { class: "vuefinder__rename-modal__item-name" }, kt = /* @__PURE__ */ te({
  __name: "ModalRename",
  setup(n) {
    const e = ee(), t = Pe(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), a = A(e.modal.data.items[0]), d = A(a.value.basename), c = () => {
      d.value != a.value.basename && e.adapter.rename({
        path: l.value.path,
        item: a.value.path,
        name: d.value
      }).then((v) => {
        t.success(o("%s is renamed.", d.value)), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Fe(v, o("Failed to rename")));
      });
    };
    return (v, p) => (u(), U(Te, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(i(o)("Rename")), 1),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[1] || (p[1] = (w) => i(e).modal.close())
        }, b(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        r("div", null, [
          N(Oe, {
            icon: i(Pn),
            title: i(o)("Rename")
          }, null, 8, ["icon", "title"]),
          r("div", Xo, [
            r("div", Jo, [
              r("p", Zo, [
                a.value.type === "dir" ? (u(), _("svg", es, [...p[2] || (p[2] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), _("svg", ts, [...p[3] || (p[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                r("span", ns, b(a.value.basename), 1)
              ]),
              fe(r("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (w) => d.value = w),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: ct(c, ["enter"])
              }, null, 544), [
                [ut, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Le() {
  const n = ee(), e = B(() => n.features);
  return {
    enabled: (o) => e.value[o] ?? !1
  };
}
const os = { class: "vuefinder__text-preview" }, ss = { class: "vuefinder__text-preview__header" }, is = ["title"], rs = { class: "vuefinder__text-preview__actions" }, as = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, ls = { key: 1 }, ds = /* @__PURE__ */ te({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = A(""), s = A(""), l = A(null), a = A(!1), d = ee(), c = Pe(d), { enabled: v } = Le(), { t: p } = d.i18n;
    ve(async () => {
      try {
        const x = await d.adapter.getContent({ path: d.modal.data.item.path });
        o.value = x.content, t("success");
      } catch (x) {
        Fe(x, "Failed to load text content"), t("success");
      }
    });
    const w = () => {
      a.value = !a.value, s.value = o.value, d.modal.setEditMode(a.value);
    }, h = async () => {
      try {
        const x = d.modal.data.item.path;
        await d.adapter.save({
          path: x,
          content: s.value
        }), o.value = s.value, c.success(p("Updated.")), t("success"), a.value = !a.value;
      } catch (x) {
        c.error(Fe(x, p("Failed to save file")));
      }
    };
    return (x, C) => (u(), _("div", os, [
      r("div", ss, [
        r("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: i(d).modal.data.item.path
        }, b(i(d).modal.data.item.basename), 9, is),
        r("div", rs, [
          a.value ? (u(), _("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: h
          }, b(i(p)("Save")), 1)) : z("", !0),
          i(v)("edit") ? (u(), _("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: C[0] || (C[0] = ($) => w())
          }, b(a.value ? i(p)("Cancel") : i(p)("Edit")), 1)) : z("", !0)
        ])
      ]),
      r("div", null, [
        a.value ? (u(), _("div", ls, [
          fe(r("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": C[1] || (C[1] = ($) => s.value = $),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ut, s.value]
          ])
        ])) : (u(), _("pre", as, b(o.value), 1))
      ])
    ]));
  }
}), Bt = async (n, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((o) => {
        e.file(o);
      });
      n(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), o = await new Promise((s) => {
        t.readEntries(s);
      });
      for (const s of o)
        await Bt(n, s);
    }
  }
}, me = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Dn(n) {
  const e = ee(), { t } = e.i18n, o = e.fs, s = q(o.path), l = e.config, a = A({ QUEUE_ENTRY_STATUS: me }), d = A(null), c = A(null), v = A(null), p = A(null), w = A(null), h = A([]), x = A(""), C = A(!1), $ = A(!1), m = A(null);
  let k;
  const g = (I) => {
    I.preventDefault(), I.stopPropagation(), $.value = !0;
  }, f = (I) => {
    I.preventDefault(), I.stopPropagation(), $.value = !0;
  }, y = (I) => {
    I.preventDefault(), I.stopPropagation(), (!I.relatedTarget || I.relatedTarget === document.body) && ($.value = !1);
  }, P = (I) => {
    I.preventDefault(), I.stopPropagation(), $.value = !1;
    const D = /^[/\\](.+)/, F = I.dataTransfer;
    F && (F.items && F.items.length ? Array.from(F.items).forEach((L) => {
      if (L.kind === "file") {
        const R = L.webkitGetAsEntry?.();
        if (R)
          Bt((Y, le) => {
            const he = D.exec(Y?.fullPath || "");
            E(le, he ? he[1] : le.name);
          }, R);
        else {
          const Y = L.getAsFile?.();
          Y && E(Y);
        }
      }
    }) : F.files && F.files.length && Array.from(F.files).forEach((L) => E(L)));
  }, S = (I) => h.value.findIndex((D) => D.id === I), E = (I, D) => k.addFile({ name: D || I.name, type: I.type, data: I, source: "Local" }), T = (I) => I.status === me.DONE ? "text-green-600" : I.status === me.ERROR || I.status === me.CANCELED ? "text-red-600" : "", V = (I) => I.status === me.DONE ? "✓" : I.status === me.ERROR || I.status === me.CANCELED ? "!" : "...", j = () => p.value?.click(), O = () => e.modal.close(), G = (I) => {
    if (C.value || !h.value.filter((D) => D.status !== me.DONE).length) {
      C.value || (x.value = t("Please select file to upload first."));
      return;
    }
    x.value = "", m.value = I || s.value, k.upload();
  }, M = () => {
    k.cancelAll(), h.value.forEach((I) => {
      I.status !== me.DONE && (I.status = me.CANCELED, I.statusName = t("Canceled"));
    }), C.value = !1;
  }, X = (I) => {
    C.value || (k.removeFile(I.id), h.value.splice(S(I.id), 1));
  }, W = (I) => {
    if (!C.value)
      if (k.cancelAll(), I) {
        const D = h.value.filter((F) => F.status !== me.DONE);
        h.value = [], D.forEach((F) => E(F.originalFile, F.name));
      } else
        h.value = [];
  }, J = (I) => {
    I.forEach((D) => {
      E(D);
    });
  };
  return ve(() => {
    k = new no({
      debug: e.debug,
      restrictions: { maxFileSize: _o(l.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (L, R) => {
        if (R[L.id] != null) {
          const le = S(L.id);
          h.value[le]?.status === me.PENDING && (x.value = k.i18n("noDuplicates", { fileName: L.name })), h.value = h.value.filter((he) => he.id !== L.id);
        }
        return h.value.push({
          id: L.id,
          name: L.name,
          size: e.filesize(L.size),
          status: me.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: L.data
        }), !0;
      }
    });
    const I = {
      getTargetPath: () => (m.value || s.value).path
    };
    if (n)
      n(k, I);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(k, I);
    else
      throw new Error("No uploader configured");
    k.on("restriction-failed", (L, R) => {
      const Y = h.value[S(L.id)];
      Y && X(Y), x.value = R.message;
    }), k.on("upload-start", (L) => {
      L.forEach((R) => {
        const Y = h.value[S(R.id)];
        Y && (Y.status = me.UPLOADING, Y.statusName = t("Uploading"), Y.percent = "0%");
      });
    }), k.on("upload-progress", (L, R) => {
      const Y = R.bytesTotal ?? 1, le = Math.floor(R.bytesUploaded / Y * 100), he = S(L.id);
      he !== -1 && h.value[he] && (h.value[he].percent = `${le}%`);
    }), k.on("upload-success", (L) => {
      const R = h.value[S(L.id)];
      R && (R.status = me.DONE, R.statusName = t("Done"));
    }), k.on("upload-error", (L, R) => {
      const Y = h.value[S(L.id)];
      Y && (Y.percent = null, Y.status = me.ERROR, Y.statusName = R?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : R?.message || t("Unknown Error"));
    }), k.on("error", (L) => {
      x.value = L.message, C.value = !1;
    }), k.on("complete", (L) => {
      C.value = !1;
      const R = m.value || s.value;
      e.adapter.invalidateListQuery(R.path), e.adapter.open(R.path);
      const Y = h.value.filter(
        (le) => le.status === me.DONE && L.successful.includes(le.id)
      ).map((le) => le.name);
      e.emitter.emit("vf-upload-complete", Y);
    }), p.value?.addEventListener("click", () => c.value?.click()), w.value?.addEventListener("click", () => v.value?.click());
    const D = { capture: !0 };
    document.addEventListener("dragover", g, D), document.addEventListener("dragenter", f, D), document.addEventListener("dragleave", y, D), document.addEventListener("drop", P, D);
    const F = (L) => {
      const R = L.target, Y = R.files;
      if (Y) {
        for (const le of Y) E(le);
        R.value = "";
      }
    };
    c.value?.addEventListener("change", F), v.value?.addEventListener("change", F);
  }), ke(() => {
    const I = { capture: !0 };
    document.removeEventListener("dragover", g, I), document.removeEventListener("dragenter", f, I), document.removeEventListener("dragleave", y, I), document.removeEventListener("drop", P, I);
  }), {
    container: d,
    internalFileInput: c,
    internalFolderInput: v,
    pickFiles: p,
    pickFolders: w,
    queue: h,
    message: x,
    uploading: C,
    hasFilesInDropArea: $,
    definitions: a,
    openFileSelector: j,
    upload: G,
    cancel: M,
    remove: X,
    clear: W,
    close: O,
    getClassNameForEntry: T,
    getIconForEntry: V,
    addExternalFiles: J
  };
}
const cs = { class: "vuefinder__image-preview" }, us = { class: "vuefinder__image-preview__header" }, vs = ["title"], fs = { class: "vuefinder__image-preview__actions" }, ps = { class: "vuefinder__image-preview__image-container" }, hs = ["src"], _s = /* @__PURE__ */ te({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = ee(), s = Pe(o), { enabled: l } = Le(), { t: a } = o.i18n, d = A(!1), c = A(
      o.modal.data.item.previewUrl ?? o.adapter.getPreviewUrl({ path: o.modal.data.item.path })
    ), v = A(c.value), { addExternalFiles: p, upload: w, queue: h } = Dn(o.customUploader), x = o.fs, C = q(x.path), $ = Xe("cropperRef"), m = async () => {
      d.value = !d.value, o.modal.setEditMode(d.value);
    }, k = async () => {
      const f = $.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!f) return;
      let y = f;
      if (f.width > 1200 || f.height > 1200) {
        const V = Math.min(1200 / f.width, 1200 / f.height), j = document.createElement("canvas");
        j.width = Math.floor(f.width * V), j.height = Math.floor(f.height * V);
        const O = j.getContext("2d");
        O && (O.drawImage(f, 0, 0, j.width, j.height), y = j);
      }
      const P = o.modal.data.item.basename, S = P.split(".").pop()?.toLowerCase() || "jpg", E = S === "png" ? "image/png" : S === "gif" ? "image/gif" : "image/jpeg", T = await new Promise((V) => {
        y.toBlob((j) => V(j), E);
      });
      if (!T) {
        s.error(a("Failed to save image"));
        return;
      }
      try {
        const V = new File([T], P, { type: E }), O = o.modal.data.item.path.split("/");
        O.pop();
        const M = {
          path: O.join("/") || (C.value?.path ?? "")
        };
        p([V]), await new Promise((I) => setTimeout(I, 100));
        const X = h.value.find((I) => I.name === V.name);
        if (!X)
          throw new Error("File was not added to upload queue");
        w(M);
        let W = 0;
        for (; W < 150; ) {
          await new Promise((D) => setTimeout(D, 200));
          const I = h.value.find((D) => D.id === X.id);
          if (I?.status === me.DONE) break;
          if (I?.status === me.ERROR)
            throw new Error(I.statusName || "Upload failed");
          W++;
        }
        s.success(a("Updated.")), await fetch(c.value, { cache: "reload", mode: "no-cors" });
        const J = o.root?.querySelector?.('[data-src="' + c.value + '"]');
        J && J instanceof HTMLElement && bn.resetStatus(J), o.emitter.emit("vf-refresh-thumbnails"), await m(), t("success");
      } catch (V) {
        s.error(Fe(V, a("Failed to save image")));
      }
    };
    return ve(() => {
      t("success");
    }), (g, f) => (u(), _("div", cs, [
      r("div", us, [
        r("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: i(o).modal.data.item.path
        }, b(i(o).modal.data.item.basename), 9, vs),
        r("div", fs, [
          d.value ? (u(), _("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: k
          }, b(i(a)("Crop")), 1)) : z("", !0),
          i(l)("edit") ? (u(), _("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = (y) => m())
          }, b(d.value ? i(a)("Cancel") : i(a)("Edit")), 1)) : z("", !0)
        ])
      ]),
      r("div", ps, [
        d.value ? (u(), U(i(oo), {
          key: 1,
          ref_key: "cropperRef",
          ref: $,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: v.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), _("img", {
          key: 0,
          style: {},
          src: i(o).modal.data.item.previewUrl ?? i(o).adapter.getPreviewUrl({ path: i(o).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, hs))
      ])
    ]));
  }
}), ms = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function gs(n, e) {
  return u(), _("svg", ms, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const lt = { render: gs }, ws = { class: "vuefinder__default-preview" }, ys = { class: "vuefinder__default-preview__content" }, bs = { class: "vuefinder__default-preview__header" }, ks = ["title"], xs = { class: "vuefinder__default-preview__icon-container" }, $s = ["title"], Ss = /* @__PURE__ */ te({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), o = e;
    return ve(() => {
      o("success");
    }), (s, l) => (u(), _("div", ws, [
      r("div", ys, [
        r("div", bs, [
          r("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: i(t).modal.data.item.path
          }, b(i(t).modal.data.item.basename), 9, ks)
        ]),
        r("div", xs, [
          N(i(lt), { class: "vuefinder__default-preview__file-icon" }),
          r("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: i(t).modal.data.item.path
          }, b(i(t).modal.data.item.basename), 9, $s)
        ])
      ])
    ]));
  }
}), Cs = { class: "vuefinder__video-preview" }, Fs = ["title"], Ps = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Ds = ["src"], Es = /* @__PURE__ */ te({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), o = e, s = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return ve(() => {
      o("success");
    }), (l, a) => (u(), _("div", Cs, [
      r("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: i(t).modal.data.item.path
      }, b(i(t).modal.data.item.basename), 9, Fs),
      r("div", null, [
        r("video", Ps, [
          r("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Ds),
          a[0] || (a[0] = ce(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Ts = { class: "vuefinder__audio-preview" }, Ms = ["title"], Is = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, As = ["src"], Os = /* @__PURE__ */ te({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = ee(), s = () => {
      const l = ee();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ve(() => {
      t("success");
    }), (l, a) => (u(), _("div", Ts, [
      r("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: i(o).modal.data.item.path
      }, b(i(o).modal.data.item.basename), 9, Ms),
      r("div", null, [
        r("audio", Is, [
          r("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, As),
          a[0] || (a[0] = ce(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Ls = { class: "vuefinder__pdf-preview" }, zs = ["title"], Rs = ["data"], Vs = ["src"], Bs = /* @__PURE__ */ te({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), o = e, s = () => {
      const l = ee();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ve(() => {
      o("success");
    }), (l, a) => (u(), _("div", Ls, [
      r("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: i(t).modal.data.item.path
      }, b(i(t).modal.data.item.basename), 9, zs),
      r("div", null, [
        r("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          r("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Vs)
        ], 8, Rs)
      ])
    ]));
  }
});
function Us(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Ns = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Hs = ["disabled", "title"], Ks = ["disabled", "title"], js = { class: "vuefinder__preview-modal__content" }, qs = { key: 0 }, Gs = { class: "vuefinder__preview-modal__loading" }, Ws = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Ys = { class: "vuefinder__preview-modal__details" }, Qs = { class: "font-bold" }, Xs = { class: "pl-2 font-bold" }, Js = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Zs = ["download", "href"], vt = /* @__PURE__ */ te({
  __name: "ModalPreview",
  setup(n) {
    const e = ee(), { enabled: t } = Le(), { t: o } = e.i18n, s = A(!1), l = (g) => {
      const f = (g || "").split("/").pop() || "", y = f.lastIndexOf(".");
      return y >= 0 ? f.slice(y + 1).toLowerCase() : "";
    }, a = (g, f) => {
      if (!f) return !1;
      const y = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), P = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), S = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), E = /* @__PURE__ */ new Set([
        "txt",
        "md",
        "json",
        "js",
        "ts",
        "css",
        "scss",
        "html",
        "xml",
        "csv",
        "log",
        "yml",
        "yaml"
      ]);
      return g === "image" ? y.has(f) : g === "video" ? P.has(f) : g === "audio" ? S.has(f) : g === "text" ? E.has(f) : g === "application/pdf" ? f === "pdf" : !1;
    }, d = (g) => {
      const f = e.modal.data.item.mime_type;
      if (f && typeof f == "string") return f.startsWith(g);
      const y = l(e.modal.data.item.path);
      return a(g, y);
    }, c = t("preview");
    c || (s.value = !0);
    const v = B(() => e.modal.data.item), p = q(e.fs.sortedFiles), w = B(() => p.value.filter((g) => g.type === "file")), h = B(
      () => w.value.findIndex((g) => g.path === v.value.path)
    ), x = B(() => h.value > 0), C = B(() => h.value < w.value.length - 1), $ = () => {
      if (e.modal.editMode || !x.value) return;
      const g = w.value[h.value - 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, m = () => {
      if (e.modal.editMode || !C.value) return;
      const g = w.value[h.value + 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, k = (g) => {
      if (g.key === "Escape") {
        g.preventDefault(), g.stopPropagation(), e.modal.close();
        return;
      }
      (g.key === "ArrowLeft" || g.key === "ArrowRight") && (g.preventDefault(), g.stopPropagation(), g.key === "ArrowLeft" ? $() : m());
    };
    return ve(() => {
      const g = document.querySelector(".vuefinder__preview-modal");
      g && g.focus();
    }), (g, f) => (u(), U(Te, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[6] || (f[6] = (y) => i(e).modal.close())
        }, b(i(o)("Close")), 1),
        i(t)("download") ? (u(), _("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: i(e).adapter.getDownloadUrl(i(e).modal.data.item),
          href: i(e).adapter.getDownloadUrl(i(e).modal.data.item)
        }, b(i(o)("Download")), 9, Zs)) : z("", !0)
      ]),
      default: se(() => [
        r("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: k
        }, [
          i(e).modal.editMode ? z("", !0) : (u(), _("div", Ns, [
            r("button", {
              disabled: !x.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: i(o)("Previous file"),
              onClick: $
            }, [...f[7] || (f[7] = [
              r("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                r("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Hs),
            r("button", {
              disabled: !C.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: i(o)("Next file"),
              onClick: m
            }, [...f[8] || (f[8] = [
              r("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                r("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, Ks)
          ])),
          r("div", js, [
            i(c) ? (u(), _("div", qs, [
              d("text") ? (u(), U(ds, {
                key: `text-${v.value.path}`,
                onSuccess: f[0] || (f[0] = (y) => s.value = !0)
              })) : d("image") ? (u(), U(_s, {
                key: `image-${v.value.path}`,
                onSuccess: f[1] || (f[1] = (y) => s.value = !0)
              })) : d("video") ? (u(), U(Es, {
                key: `video-${v.value.path}`,
                onSuccess: f[2] || (f[2] = (y) => s.value = !0)
              })) : d("audio") ? (u(), U(Os, {
                key: `audio-${v.value.path}`,
                onSuccess: f[3] || (f[3] = (y) => s.value = !0)
              })) : d("application/pdf") ? (u(), U(Bs, {
                key: `pdf-${v.value.path}`,
                onSuccess: f[4] || (f[4] = (y) => s.value = !0)
              })) : (u(), U(Ss, {
                key: `default-${v.value.path}`,
                onSuccess: f[5] || (f[5] = (y) => s.value = !0)
              }))
            ])) : z("", !0),
            r("div", Gs, [
              s.value === !1 ? (u(), _("div", Ws, [
                f[9] || (f[9] = r("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  r("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  r("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                r("span", null, b(i(o)("Loading")), 1)
              ])) : z("", !0)
            ])
          ])
        ], 32),
        r("div", Ys, [
          r("div", null, [
            r("span", Qs, b(i(o)("File Size")) + ": ", 1),
            ce(b(i(e).filesize(i(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", Xs, b(i(o)("Last Modified")) + ": ", 1),
            ce(" " + b(i(Us)(i(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        i(t)("download") ? (u(), _("div", Js, [
          r("span", null, b(i(o)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : z("", !0)
      ]),
      _: 1
    }));
  }
}), ei = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function ti(n, e) {
  return u(), _("svg", ei, [...e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const ni = { render: ti }, oi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function si(n, e) {
  return u(), _("svg", oi, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ut = { render: si }, ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ri(n, e) {
  return u(), _("svg", ii, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ve = { render: ri }, ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function li(n, e) {
  return u(), _("svg", ai, [...e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const xt = { render: li }, di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ci(n, e) {
  return u(), _("svg", di, [...e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const $t = { render: ci }, ui = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function vi(n, e) {
  return u(), _("svg", ui, [...e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const Nt = { render: vi }, fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function pi(n, e) {
  return u(), _("svg", fi, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const Ht = { render: pi }, hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function _i(n, e) {
  return u(), _("svg", hi, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Kt = { render: _i }, mi = { class: "vuefinder__modal-tree__folder-item" }, gi = { class: "vuefinder__modal-tree__folder-content" }, wi = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, yi = { class: "vuefinder__modal-tree__folder-text" }, bi = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, ki = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, xi = 300, $i = /* @__PURE__ */ te({
  __name: "ModalTreeFolderItem",
  props: {
    folder: {},
    storage: {},
    modelValue: {},
    expandedFolders: {},
    modalTreeData: {},
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose", "toggleFolder"],
  setup(n, { emit: e }) {
    const t = ee(), { t: o } = t.i18n, s = t.fs, l = A({}), a = n, d = e;
    q(s.path);
    const c = B(() => {
      const E = `${a.storage}:${a.folder.path}`;
      return a.expandedFolders[E] || !1;
    }), v = B(() => a.modelValue?.path === a.folder.path), p = B(() => a.currentPath?.path === a.folder.path), w = B(() => a.modalTreeData[a.folder.path] || []), h = B(() => {
      const E = w.value, T = l.value[a.folder.path] || 50;
      return E.length > T ? E.slice(0, T) : E;
    }), x = B(() => w.value.length), C = B(() => l.value[a.folder.path] || 50), $ = B(() => x.value > C.value), m = () => {
      l.value[a.folder.path] = (C.value || 50) + 50;
    }, k = B(() => w.value.length > 0 || a.folder.type === "dir"), g = () => {
      d("toggleFolder", a.storage, a.folder.path);
    }, f = () => {
      d("update:modelValue", a.folder);
    }, y = () => {
      d("update:modelValue", a.folder), d("selectAndClose", a.folder);
    };
    let P = 0;
    const S = () => {
      const E = Date.now();
      E - P < xi ? y() : f(), P = E;
    };
    return (E, T) => {
      const V = mn("ModalTreeFolderItem", !0);
      return u(), _("div", mi, [
        r("div", gi, [
          k.value ? (u(), _("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: g
          }, [
            c.value ? (u(), U(i($t), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), U(i(xt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), _("div", wi)),
          r("div", {
            class: ne(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": v.value,
              "vuefinder__modal-tree__folder-link--current": p.value
            }]),
            onClick: f,
            onDblclick: y,
            onTouchend: S
          }, [
            c.value ? (u(), U(i(Kt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), U(i(Ve), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            r("span", yi, b(n.folder.basename), 1)
          ], 34)
        ]),
        c.value && k.value ? (u(), _("div", bi, [
          (u(!0), _(ue, null, pe(h.value, (j) => (u(), U(V, {
            key: j.path,
            folder: j,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": T[0] || (T[0] = (O) => E.$emit("update:modelValue", O)),
            onSelectAndClose: T[1] || (T[1] = (O) => E.$emit("selectAndClose", O)),
            onToggleFolder: T[2] || (T[2] = (O, G) => E.$emit("toggleFolder", O, G))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          $.value ? (u(), _("div", ki, [
            r("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: m
            }, b(i(o)("load more")), 1)
          ])) : z("", !0)
        ])) : z("", !0)
      ]);
    };
  }
}), Si = { class: "vuefinder__modal-tree" }, Ci = { class: "vuefinder__modal-tree__header" }, Fi = { class: "vuefinder__modal-tree__title" }, Pi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Di = { class: "vuefinder__modal-tree__section-title" }, Ei = { class: "vuefinder__modal-tree__list" }, Ti = ["onClick", "onDblclick", "onTouchend"], Mi = { class: "vuefinder__modal-tree__text" }, Ii = { class: "vuefinder__modal-tree__text-storage" }, Ai = { class: "vuefinder__modal-tree__section-title" }, Oi = { class: "vuefinder__modal-tree__list" }, Li = { class: "vuefinder__modal-tree__storage-item" }, zi = { class: "vuefinder__modal-tree__storage-content" }, Ri = ["onClick"], Vi = ["onClick", "onDblclick", "onTouchend"], Bi = { class: "vuefinder__modal-tree__storage-text" }, Ui = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Ni = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Hi = ["onClick"], ln = 300, jt = /* @__PURE__ */ te({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = ee(), { t: o } = t.i18n, s = t.fs, l = t.config, a = e, d = q(s.sortedFiles), c = q(s.storages), v = B(() => c.value || []), p = q(s.path), w = A(null), h = A({}), x = A({}), C = A({});
    ie(d, (M) => {
      const X = M.filter((J) => J.type === "dir"), W = p.value?.path || "";
      W && (x.value[W] = X.map((J) => ({
        ...J,
        type: "dir"
      })));
    });
    const $ = (M, X) => {
      const W = `${M}:${X}`;
      h.value = {
        ...h.value,
        [W]: !h.value[W]
      }, h.value[W] && !x.value[X] && t.adapter.list(X).then((J) => {
        const D = (J.files || []).filter((F) => F.type === "dir");
        x.value[X] = D.map((F) => ({
          ...F,
          type: "dir"
        }));
      });
    }, m = (M) => x.value[M] || [], k = (M) => C.value[M] || 50, g = (M) => {
      const X = m(M), W = k(M);
      return X.length > W ? X.slice(0, W) : X;
    }, f = (M) => m(M).length, y = (M) => f(M) > k(M), P = (M) => {
      C.value[M] = k(M) + 50;
    }, S = (M) => {
      M && a("update:modelValue", M);
    }, E = (M) => {
      M && (a("update:modelValue", M), a("selectAndClose", M));
    }, T = (M) => {
      const X = {
        storage: M,
        path: M + "://",
        basename: M,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: M + "://"
      };
      a("update:modelValue", X);
    }, V = (M) => {
      const X = {
        storage: M,
        path: M + "://",
        basename: M,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: M + "://"
      };
      a("update:modelValue", X), a("selectAndClose", X);
    };
    let j = 0;
    const O = (M) => {
      if (!M) return;
      const X = Date.now();
      X - j < ln ? E(M) : S(M), j = X;
    }, G = (M) => {
      const X = Date.now();
      X - j < ln ? V(M) : T(M), j = X;
    };
    return ve(() => {
      w.value && st(w.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (M, X) => (u(), _("div", Si, [
      r("div", Ci, [
        r("div", Fi, b(i(o)("Select Target Folder")), 1)
      ]),
      r("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && i(t).features.pinned && i(l).get("pinnedFolders").length ? (u(), _("div", Pi, [
          r("div", Di, b(i(o)("Pinned Folders")), 1),
          r("div", Ei, [
            (u(!0), _(ue, null, pe(i(l).get("pinnedFolders"), (W) => (u(), _("div", {
              key: W.path,
              class: ne(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === W.path }]),
              onClick: (J) => S(W),
              onDblclick: (J) => E(W),
              onTouchend: (J) => O(W)
            }, [
              N(i(Ve), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              r("div", Mi, b(W.basename), 1),
              r("div", Ii, b(W.storage), 1),
              N(i(Nt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ti))), 128))
          ])
        ])) : z("", !0),
        r("div", Ai, b(i(o)("Storages")), 1),
        (u(!0), _(ue, null, pe(v.value, (W) => (u(), _("div", {
          key: W,
          class: "vuefinder__modal-tree__section"
        }, [
          r("div", Oi, [
            r("div", Li, [
              r("div", zi, [
                r("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: re((J) => $(W, W + "://"), ["stop"])
                }, [
                  h.value[`${W}:${W}://`] ? (u(), U(i($t), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), U(i(xt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Ri),
                r("div", {
                  class: ne(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === W + "://"
                  }]),
                  onClick: (J) => T(W),
                  onDblclick: (J) => V(W),
                  onTouchend: (J) => G(W)
                }, [
                  N(i(Ht), { class: "vuefinder__modal-tree__storage-icon" }),
                  r("span", Bi, b(W), 1)
                ], 42, Vi)
              ]),
              h.value[`${W}:${W}://`] ? (u(), _("div", Ui, [
                (u(!0), _(ue, null, pe(g(W + "://"), (J) => (u(), U($i, {
                  key: J.path,
                  folder: J,
                  storage: W,
                  "model-value": n.modelValue,
                  "expanded-folders": h.value,
                  "modal-tree-data": x.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": S,
                  onSelectAndClose: E,
                  onToggleFolder: $
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                y(W + "://") ? (u(), _("div", Ni, [
                  r("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (J) => P(W + "://")
                  }, b(i(o)("load more")), 9, Hi)
                ])) : z("", !0)
              ])) : z("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Ki = ["title"], At = /* @__PURE__ */ te({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, o = ee(), { t: s } = o.i18n, l = A(!1), a = A(null), d = A(a.value?.innerHTML);
    ie(d, () => l.value = !1);
    const c = () => {
      t("hidden"), l.value = !0;
    };
    return (v, p) => (u(), _("div", null, [
      l.value ? z("", !0) : (u(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: a,
        class: ne(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        $e(v.$slots, "default"),
        r("div", {
          class: "vuefinder__message__close",
          title: i(s)("Close"),
          onClick: c
        }, [...p[0] || (p[0] = [
          r("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            r("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, Ki)
      ], 2))
    ]));
  }
}), ji = { class: "vuefinder__move-modal__content" }, qi = { class: "vuefinder__move-modal__description" }, Gi = { class: "vuefinder__move-modal__files vf-scrollbar" }, Wi = { class: "vuefinder__move-modal__file-name" }, Yi = { class: "vuefinder__move-modal__target-title" }, Qi = { class: "vuefinder__move-modal__target-container" }, Xi = { class: "vuefinder__move-modal__target-path" }, Ji = { class: "vuefinder__move-modal__target-storage" }, Zi = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, er = { class: "vuefinder__move-modal__target-badge" }, tr = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, nr = { class: "vuefinder__move-modal__checkbox-label" }, or = { class: "vuefinder__move-modal__checkbox-text" }, sr = ["disabled"], ir = { class: "vuefinder__move-modal__selected-items" }, En = /* @__PURE__ */ te({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = ee(), t = Pe(e), { enabled: o } = Le(), { t: s } = e.i18n, l = n, a = A(e.modal.data.items.from), d = A(e.modal.data.items.to), c = A(""), v = A(l.copy || !o("move")), p = B(() => v.value ? "copy" : "move"), w = A(!1), h = q(e.fs.path), x = B(() => v.value ? s("Copy files") : s("Move files")), C = B(
      () => v.value ? s("Are you sure you want to copy these files?") : s("Are you sure you want to move these files?")
    ), $ = B(() => v.value ? s("Yes, Copy!") : s("Yes, Move!"));
    B(() => v.value ? s("Files copied.") : s("Files moved."));
    const m = (S) => {
      S && (d.value = S);
    }, k = (S) => {
      S && (d.value = S, w.value = !1);
    }, g = B(() => {
      const S = d.value;
      return S ? a.value.some((E) => !!(S.path === E.path || E.path.startsWith(S.path + "/") || E.type === "dir" && S.path.startsWith(E.path + "/"))) : !0;
    }), f = B(() => {
      if (!g.value)
        return "";
      const S = d.value;
      return S ? a.value.find((T) => S.path === T.path || T.path.startsWith(S.path + "/") || T.type === "dir" && S.path.startsWith(T.path + "/")) ? s("Cannot move/copy item to itself or its parent/child directory") : s("Invalid destination directory") : s("Please select a destination directory");
    }), y = () => {
      const S = d.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const E = S.split("://");
      return {
        storage: E[0] || "local",
        path: E[1] || ""
      };
    }, P = async () => {
      if (a.value.length)
        try {
          const { files: S } = await e.adapter[p.value]({
            path: h.value.path,
            sources: a.value.map(({ path: E }) => E),
            destination: d.value.path
          });
          e.fs.setFiles(S), e.modal.close();
        } catch (S) {
          t.error(Fe(S, s("Failed to transfer files")));
        }
    };
    return (S, E) => (u(), U(Te, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: P
        }, b($.value), 9, sr),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: E[4] || (E[4] = (T) => i(e).modal.close())
        }, b(i(s)("Cancel")), 1),
        r("div", ir, b(i(s)("%s item(s) selected.", a.value.length)), 1)
      ]),
      default: se(() => [
        r("div", null, [
          N(Oe, {
            icon: v.value ? i(Ut) : i(ni),
            title: x.value
          }, null, 8, ["icon", "title"]),
          r("div", ji, [
            r("p", qi, b(C.value), 1),
            r("div", Gi, [
              (u(!0), _(ue, null, pe(a.value, (T) => (u(), _("div", {
                key: T.path,
                class: "vuefinder__move-modal__file"
              }, [
                r("div", null, [
                  T.type === "dir" ? (u(), U(i(Ve), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), U(i(lt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                r("div", Wi, b(T.path), 1)
              ]))), 128))
            ]),
            r("h4", Yi, b(i(s)("Target Directory")), 1),
            r("div", Qi, [
              r("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: E[0] || (E[0] = (T) => w.value = !w.value)
              }, [
                r("div", Xi, [
                  r("span", Ji, b(y().storage) + "://", 1),
                  y().path ? (u(), _("span", Zi, b(y().path), 1)) : z("", !0)
                ]),
                r("span", er, b(i(s)("Browse")), 1)
              ])
            ]),
            r("div", {
              class: ne([
                "vuefinder__move-modal__tree-selector",
                w.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              N(jt, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  E[1] || (E[1] = (T) => d.value = T),
                  m
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: k
              }, null, 8, ["modelValue"])
            ], 2),
            i(o)("copy") && i(o)("move") ? (u(), _("div", tr, [
              r("label", nr, [
                fe(r("input", {
                  "onUpdate:modelValue": E[2] || (E[2] = (T) => v.value = T),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [wt, v.value]
                ]),
                r("span", or, b(i(s)("Create a copy instead of moving")), 1)
              ])
            ])) : z("", !0),
            f.value ? (u(), U(At, {
              key: 1,
              error: ""
            }, {
              default: se(() => [
                ce(b(f.value), 1)
              ]),
              _: 1
            })) : z("", !0),
            c.value.length && !f.value ? (u(), U(At, {
              key: 2,
              error: "",
              onHidden: E[3] || (E[3] = (T) => c.value = "")
            }, {
              default: se(() => [
                ce(b(c.value), 1)
              ]),
              _: 1
            })) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ze = /* @__PURE__ */ te({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (u(), U(En, { copy: !1 }));
  }
}), qt = /* @__PURE__ */ te({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (u(), U(En, { copy: !0 }));
  }
}), rr = (n, e = 0, t = !1) => {
  let o;
  return (...s) => {
    t && !o && n(...s), clearTimeout(o), o = setTimeout(() => {
      n(...s);
    }, e);
  };
}, Tn = (n, e, t) => {
  const o = A(n);
  return Gn((s, l) => ({
    get() {
      return s(), o.value;
    },
    set: rr(
      (a) => {
        o.value = a, l();
      },
      e,
      !1
    )
  }));
}, ar = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function lr(n, e) {
  return u(), _("svg", ar, [...e[0] || (e[0] = [
    r("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Gt = { render: lr }, dr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function cr(n, e) {
  return u(), _("svg", dr, [...e[0] || (e[0] = [
    r("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900"
    }, null, -1),
    r("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const St = { render: cr }, ur = { class: "vuefinder__search-modal__search-input" }, vr = ["value", "placeholder", "disabled"], fr = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, pr = /* @__PURE__ */ te({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = t, s = ee(), { t: l } = s.i18n, a = A(null), d = (v) => {
      const p = v.target;
      o("update:modelValue", p.value);
    }, c = (v) => {
      o("keydown", v);
    };
    return e({
      focus: () => {
        a.value && a.value.focus();
      }
    }), (v, p) => (u(), _("div", ur, [
      N(i(Gt), { class: "vuefinder__search-modal__search-icon" }),
      r("input", {
        ref_key: "searchInput",
        ref: a,
        value: n.modelValue,
        type: "text",
        placeholder: i(l)("Search files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: p[0] || (p[0] = re(() => {
        }, ["stop"])),
        onInput: d
      }, null, 40, vr),
      n.isSearching ? (u(), _("div", fr, [
        N(i(St), { class: "vuefinder__search-modal__loading-icon" })
      ])) : z("", !0)
    ]));
  }
}), hr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function _r(n, e) {
  return u(), _("svg", hr, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const Mn = { render: _r }, mr = ["disabled", "title"], gr = ["data-theme"], wr = { class: "vuefinder__search-modal__dropdown-content" }, yr = { class: "vuefinder__search-modal__dropdown-section" }, br = { class: "vuefinder__search-modal__dropdown-title" }, kr = { class: "vuefinder__search-modal__dropdown-options" }, xr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, $r = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Sr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Cr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Fr = /* @__PURE__ */ te({
  name: "SearchOptionsDropdown",
  __name: "SearchOptionsDropdown",
  props: {
    visible: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    sizeFilter: {},
    selectedOption: {}
  },
  emits: ["update:visible", "update:sizeFilter", "update:selectedOption", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = n, s = t, l = ee(), { t: a } = l.i18n, d = A(null), c = A(null);
    let v = null;
    const p = ($) => {
      if (s("update:selectedOption", $), $.startsWith("size-")) {
        const m = $.split("-")[1];
        s("update:sizeFilter", m);
      }
    }, w = async () => {
      o.disabled || (o.visible ? (s("update:visible", !1), v && (v(), v = null)) : (s("update:visible", !0), await Re(), await h()));
    }, h = async () => {
      if (!(!d.value || !c.value) && (await Re(), !(!d.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: $, y: m } = await Je(d.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [it(8), rt({ padding: 16 }), at({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${$}px`,
            top: `${m}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch ($) {
          console.warn("Floating UI initial positioning error:", $);
          return;
        }
        try {
          v = Lt(d.value, c.value, async () => {
            if (!(!d.value || !c.value))
              try {
                const { x: $, y: m } = await Je(
                  d.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [it(8), rt({ padding: 16 }), at({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${$}px`,
                  top: `${m}px`
                });
              } catch ($) {
                console.warn("Floating UI positioning error:", $);
              }
          });
        } catch ($) {
          console.warn("Floating UI autoUpdate setup error:", $), v = null;
        }
      }
    }, x = ($) => {
      if (!o.visible) return;
      const m = ["size-all", "size-small", "size-medium", "size-large"], k = m.findIndex((g) => g === o.selectedOption);
      if ($.key === "ArrowDown") {
        $.preventDefault();
        const g = (k + 1) % m.length;
        s("update:selectedOption", m[g] || null);
      } else if ($.key === "ArrowUp") {
        $.preventDefault();
        const g = k <= 0 ? m.length - 1 : k - 1;
        s("update:selectedOption", m[g] || null);
      } else $.key === "Enter" ? ($.preventDefault(), o.selectedOption?.startsWith("size-") && s(
        "update:sizeFilter",
        o.selectedOption.split("-")[1]
      )) : $.key === "Escape" && ($.preventDefault(), s("update:visible", !1), v && (v(), v = null));
    }, C = () => {
      v && (v(), v = null);
    };
    return ie(
      () => o.visible,
      ($) => {
        !$ && v && (v(), v = null);
      }
    ), ke(() => {
      C();
    }), e({
      cleanup: C
    }), ($, m) => (u(), _(ue, null, [
      r("button", {
        ref_key: "dropdownBtn",
        ref: d,
        class: ne(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: i(a)("Search Options"),
        onClick: re(w, ["stop"])
      }, [
        N(i(Mn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, mr),
      (u(), U(yt, { to: "body" }, [
        n.visible ? (u(), _("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": i(l).theme.current,
          tabindex: "-1",
          onClick: m[4] || (m[4] = re(() => {
          }, ["stop"])),
          onKeydown: x
        }, [
          r("div", wr, [
            r("div", yr, [
              r("div", br, b(i(a)("File Size")), 1),
              r("div", kr, [
                r("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: m[0] || (m[0] = re((k) => p("size-all"), ["stop"]))
                }, [
                  r("span", null, b(i(a)("All Files")), 1),
                  n.sizeFilter === "all" ? (u(), _("div", xr, [...m[5] || (m[5] = [
                    r("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      r("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2),
                r("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: m[1] || (m[1] = re((k) => p("size-small"), ["stop"]))
                }, [
                  r("span", null, b(i(a)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (u(), _("div", $r, [...m[6] || (m[6] = [
                    r("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      r("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2),
                r("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: m[2] || (m[2] = re((k) => p("size-medium"), ["stop"]))
                }, [
                  r("span", null, b(i(a)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (u(), _("div", Sr, [...m[7] || (m[7] = [
                    r("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      r("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2),
                r("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: m[3] || (m[3] = re((k) => p("size-large"), ["stop"]))
                }, [
                  r("span", null, b(i(a)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (u(), _("div", Cr, [...m[8] || (m[8] = [
                    r("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      r("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, gr)) : z("", !0)
      ]))
    ], 64));
  }
});
function In(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const o = t[1], s = t[2] ?? "", l = s.split("/").filter(Boolean), a = l.pop();
  if (!a) return o + s;
  let d = `${o}${l.join("/")}${l.length ? "/" : ""}${a}`;
  if (d.length <= e) return d;
  const c = a.split(/\.(?=[^\.]+$)/), v = c[0] ?? "", p = c[1] ?? "", w = v.length > 10 ? `${v.slice(0, 6)}...${v.slice(-5)}` : v, h = p ? `${w}.${p}` : w;
  return d = `${o}${l.join("/")}${l.length ? "/" : ""}${h}`, d.length > e && (d = `${o}.../${h}`), d;
}
async function An(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function dt(n) {
  await An(n);
}
async function Pr(n) {
  await An(n);
}
const Dr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Er(n, e) {
  return u(), _("svg", Dr, [...e[0] || (e[0] = [
    r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const On = { render: Er }, Tr = ["title"], Mr = { class: "vuefinder__search-modal__result-icon" }, Ir = { class: "vuefinder__search-modal__result-content" }, Ar = { class: "vuefinder__search-modal__result-name" }, Or = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Lr = ["title"], zr = ["title"], Rr = ["data-item-dropdown", "data-theme"], Vr = { class: "vuefinder__search-modal__item-dropdown-content" }, Br = /* @__PURE__ */ te({
  name: "SearchResultItem",
  __name: "SearchResultItem",
  props: {
    item: {},
    index: {},
    selectedIndex: {},
    expandedPaths: {},
    activeDropdown: {},
    selectedItemDropdownOption: {}
  },
  emits: ["select", "selectWithDropdown", "togglePathExpansion", "toggleItemDropdown", "update:selectedItemDropdownOption", "copyPath", "openContainingFolder", "preview"],
  setup(n, { emit: e }) {
    const t = n, o = e, s = ee(), { t: l } = s.i18n, a = A(null);
    let d = null, c = null, v = [], p = null;
    ie(
      () => t.activeDropdown,
      (E) => {
        d && (d(), d = null), c && (v.forEach((T) => {
          T === window ? window.removeEventListener("scroll", c, !0) : T.removeEventListener("scroll", c, !0);
        }), c = null, v = []), p && (document.removeEventListener("mousedown", p, !0), document.removeEventListener("touchstart", p, !0), p = null), E === t.item.path && a.value && Re(() => {
          k(t.item.path, a.value), h(), x();
        });
      }
    );
    const w = (E) => {
      const T = [];
      let V = E;
      for (; V && V !== document.body && V !== document.documentElement; ) {
        const j = window.getComputedStyle(V), O = j.overflow + j.overflowX + j.overflowY;
        (O.includes("scroll") || O.includes("auto")) && T.push(V), V = V.parentElement;
      }
      return T;
    }, h = () => {
      if (t.activeDropdown !== t.item.path) return;
      const E = w(a.value);
      v = [window, ...E], c = () => {
        t.activeDropdown === t.item.path && o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const T = c;
      T && v.forEach((V) => {
        V === window ? window.addEventListener("scroll", T, !0) : V.addEventListener("scroll", T, !0);
      });
    }, x = () => {
      t.activeDropdown === t.item.path && (p = (E) => {
        if (t.activeDropdown !== t.item.path) return;
        const T = E.target;
        if (!T) return;
        const V = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (V && V.contains(T) || a.value && a.value.contains(T))
          return;
        const j = s.root;
        if (j && j.contains(T)) {
          o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const O = document.querySelector(".vuefinder__modal-layout");
        if (O && O.contains(T)) {
          o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        p && (document.addEventListener("mousedown", p, !0), document.addEventListener("touchstart", p, !0));
      }, 100));
    };
    ke(() => {
      d && (d(), d = null), c && (v.forEach((E) => {
        E === window ? window.removeEventListener("scroll", c, !0) : E.removeEventListener("scroll", c, !0);
      }), c = null, v = []), p && (document.removeEventListener("mousedown", p, !0), document.removeEventListener("touchstart", p, !0), p = null);
    });
    const C = (E) => t.expandedPaths.has(E), $ = (E) => E.type === "dir" || !E.file_size ? "" : Rt(E.file_size), m = (E, T) => {
      T.stopPropagation(), o("toggleItemDropdown", E, T);
    }, k = async (E, T) => {
      const V = document.querySelector(
        `[data-item-dropdown="${E}"]`
      );
      if (!(!V || !T) && (await Re(), !(!V || !T))) {
        Object.assign(V.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: j, y: O } = await Je(T, V, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [it(8), rt({ padding: 16 }), at({ padding: 16 })]
          });
          Object.assign(V.style, {
            left: `${j}px`,
            top: `${O}px`
          }), requestAnimationFrame(() => {
            V && Object.assign(V.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (j) {
          console.warn("Floating UI initial positioning error:", j);
          return;
        }
        try {
          d = Lt(T, V, async () => {
            if (!(!T || !V))
              try {
                const { x: j, y: O } = await Je(T, V, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [it(8), rt({ padding: 16 }), at({ padding: 16 })]
                });
                Object.assign(V.style, {
                  left: `${j}px`,
                  top: `${O}px`
                });
              } catch (j) {
                console.warn("Floating UI positioning error:", j);
              }
          });
        } catch (j) {
          console.warn("Floating UI autoUpdate setup error:", j), d = null;
        }
      }
    }, g = (E) => {
      o("update:selectedItemDropdownOption", E);
    }, f = async (E) => {
      await dt(E.path), o("copyPath", E);
    }, y = (E) => {
      o("openContainingFolder", E);
    }, P = (E) => {
      o("preview", E);
    }, S = (E) => {
      if (!t.activeDropdown) return;
      const T = ["copy-path", "open-folder", "preview"], V = t.selectedItemDropdownOption, j = T.findIndex((O) => V?.includes(O));
      if (E.key === "ArrowDown") {
        E.preventDefault();
        const O = (j + 1) % T.length;
        o(
          "update:selectedItemDropdownOption",
          `${T[O] || ""}-${t.activeDropdown}`
        );
      } else if (E.key === "ArrowUp") {
        E.preventDefault();
        const O = j <= 0 ? T.length - 1 : j - 1;
        o(
          "update:selectedItemDropdownOption",
          `${T[O] || ""}-${t.activeDropdown}`
        );
      } else E.key === "Enter" ? (E.preventDefault(), V && (V.includes("copy-path") ? f(t.item) : V.includes("open-folder") ? y(t.item) : V.includes("preview") && P(t.item))) : E.key === "Escape" && (E.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (E, T) => (u(), _("div", {
      class: ne(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: T[9] || (T[9] = (V) => o("select", n.index))
    }, [
      r("div", Mr, [
        n.item.type === "dir" ? (u(), U(i(Ve), { key: 0 })) : (u(), U(i(lt), { key: 1 }))
      ]),
      r("div", Ir, [
        r("div", Ar, [
          ce(b(n.item.basename) + " ", 1),
          $(n.item) ? (u(), _("span", Or, b($(n.item)), 1)) : z("", !0)
        ]),
        r("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: T[0] || (T[0] = re((V) => {
            o("select", n.index), o("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, b(C(n.item.path) ? n.item.path : i(In)(n.item.path)), 9, Lr)
      ]),
      r("button", {
        ref_key: "buttonElementRef",
        ref: a,
        class: "vuefinder__search-modal__result-actions",
        title: i(l)("More actions"),
        onClick: T[1] || (T[1] = (V) => {
          o("selectWithDropdown", n.index), m(n.item.path, V);
        })
      }, [
        N(i(On), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, zr),
      (u(), U(yt, { to: "body" }, [
        n.activeDropdown === n.item.path ? (u(), _("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": i(s).theme.current,
          tabindex: "-1",
          onClick: T[8] || (T[8] = re(() => {
          }, ["stop"])),
          onKeydown: S
        }, [
          r("div", Vr, [
            r("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: T[2] || (T[2] = (V) => {
                g(`copy-path-${n.item.path}`), f(n.item);
              }),
              onFocus: T[3] || (T[3] = (V) => g(`copy-path-${n.item.path}`))
            }, [
              N(i(Ut), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              r("span", null, b(i(l)("Copy Path")), 1)
            ], 34),
            r("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: T[4] || (T[4] = (V) => {
                g(`open-folder-${n.item.path}`), y(n.item);
              }),
              onFocus: T[5] || (T[5] = (V) => g(`open-folder-${n.item.path}`))
            }, [
              N(i(Ve), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              r("span", null, b(i(l)("Open Containing Folder")), 1)
            ], 34),
            r("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: T[6] || (T[6] = (V) => {
                g(`preview-${n.item.path}`), P(n.item);
              }),
              onFocus: T[7] || (T[7] = (V) => g(`preview-${n.item.path}`))
            }, [
              N(i(lt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              r("span", null, b(i(l)("Preview")), 1)
            ], 34)
          ])
        ], 40, Rr)) : z("", !0)
      ]))
    ], 10, Tr));
  }
}), Ur = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Nr = { class: "vuefinder__search-modal__loading-icon" }, Hr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Kr = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, jr = { class: "vuefinder__search-modal__results-header" }, Ge = 60, dn = 5, qr = /* @__PURE__ */ te({
  name: "SearchResultsList",
  __name: "SearchResultsList",
  props: {
    searchResults: {},
    isSearching: { type: Boolean },
    selectedIndex: {},
    expandedPaths: {},
    activeDropdown: {},
    selectedItemDropdownOption: {},
    resultsEnter: { type: Boolean }
  },
  emits: ["selectResultItem", "selectResultItemWithDropdown", "togglePathExpansion", "toggleItemDropdown", "update:selectedItemDropdownOption", "copyPath", "openContainingFolder", "preview"],
  setup(n, { expose: e, emit: t }) {
    const o = n, s = t, l = ee(), { t: a } = l.i18n, d = Xe("scrollableContainer"), c = B(() => o.searchResults.length > 0), v = B(() => o.searchResults.length), p = A(0), w = A(600), h = B(() => o.searchResults.length * Ge), x = B(() => {
      const f = Math.max(0, Math.floor(p.value / Ge) - dn), y = Math.min(
        o.searchResults.length,
        Math.ceil((p.value + w.value) / Ge) + dn
      );
      return { start: f, end: y };
    }), C = B(() => {
      const { start: f, end: y } = x.value;
      return o.searchResults.slice(f, y).map((P, S) => ({
        item: P,
        index: f + S,
        top: (f + S) * Ge
      }));
    }), $ = (f) => {
      const y = f.target;
      p.value = y.scrollTop;
    }, m = () => {
      d.value && (w.value = d.value.clientHeight);
    }, k = () => {
      if (o.selectedIndex >= 0 && d.value) {
        const f = o.selectedIndex * Ge, y = f + Ge, P = d.value.scrollTop, S = d.value.clientHeight, E = P + S;
        let T = P;
        f < P ? T = f : y > E && (T = y - S), T !== P && d.value.scrollTo({
          top: T,
          behavior: "smooth"
        });
      }
    }, g = () => {
      d.value && (d.value.scrollTop = 0, p.value = 0);
    };
    return ve(() => {
      m(), window.addEventListener("resize", m);
    }), ke(() => {
      window.removeEventListener("resize", m);
    }), ie(
      () => d.value,
      () => {
        m();
      }
    ), e({
      scrollSelectedIntoView: k,
      resetScroll: g,
      getContainerHeight: () => w.value,
      scrollTop: () => p.value
    }), (f, y) => (u(), _("div", {
      class: ne(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (u(), _("div", Ur, [
        r("div", Nr, [
          N(i(St), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        r("span", null, b(i(a)("Searching...")), 1)
      ])) : c.value ? (u(), _("div", Kr, [
        r("div", jr, [
          r("span", null, b(i(a)("Found %s results", v.value)), 1)
        ]),
        r("div", {
          ref_key: "scrollableContainer",
          ref: d,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: $
        }, [
          r("div", {
            class: "vuefinder__search-modal__results-items",
            style: Ae({ height: `${h.value}px`, position: "relative" })
          }, [
            (u(!0), _(ue, null, pe(C.value, (P) => (u(), _("div", {
              key: P.item.path,
              style: Ae({
                position: "absolute",
                top: `${P.top}px`,
                left: "0",
                width: "100%",
                height: `${Ge}px`
              })
            }, [
              N(Br, {
                item: P.item,
                index: P.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: y[0] || (y[0] = (S) => s("selectResultItem", S)),
                onSelectWithDropdown: y[1] || (y[1] = (S) => s("selectResultItemWithDropdown", S)),
                onTogglePathExpansion: y[2] || (y[2] = (S) => s("togglePathExpansion", S)),
                onToggleItemDropdown: y[3] || (y[3] = (S, E) => s("toggleItemDropdown", S, E)),
                "onUpdate:selectedItemDropdownOption": y[4] || (y[4] = (S) => s("update:selectedItemDropdownOption", S)),
                onCopyPath: y[5] || (y[5] = (S) => s("copyPath", S)),
                onOpenContainingFolder: y[6] || (y[6] = (S) => s("openContainingFolder", S)),
                onPreview: y[7] || (y[7] = (S) => s("preview", S))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), _("div", Hr, [
        r("span", null, b(i(a)("No results found")), 1)
      ]))
    ], 2));
  }
}), Gr = { class: "vuefinder__search-modal" }, Wr = { class: "vuefinder__search-modal__content" }, Yr = { class: "vuefinder__search-modal__search-bar" }, Qr = { class: "vuefinder__search-modal__search-location" }, Xr = ["title"], Jr = ["disabled"], Zr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, ea = { class: "vuefinder__search-modal__folder-selector-content" }, ta = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, na = { class: "vuefinder__search-modal__instructions-text" }, Wt = /* @__PURE__ */ te({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = ee(), t = Pe(e), { t: o } = e.i18n, s = e.fs, l = A(null), a = A(null), d = A(null), c = Tn("", 300), v = A([]), p = A(!1), w = A(-1), h = A(!1), x = A(!1), C = A(null), $ = A("all"), m = A(!1), k = A(`size-${$.value}`), g = A(null), f = A(/* @__PURE__ */ new Set()), y = A(null), P = q(s.path), S = (F) => {
      f.value.has(F) ? f.value.delete(F) : f.value.add(F);
    }, E = (F, L) => {
      L && typeof L.stopPropagation == "function" && L.stopPropagation(), y.value === F ? y.value = null : y.value = F;
    }, T = () => {
      y.value = null;
    }, V = (F) => {
      try {
        const L = F.dir || `${F.storage}://`;
        e.adapter.open(L), e.modal.close(), T();
      } catch {
        t.error(o("Failed to open containing folder"));
      }
    }, j = (F) => {
      e.modal.open(vt, {
        storage: P?.value?.storage ?? "local",
        item: F
      }), T();
    }, O = (F) => {
      w.value = F, T();
    }, G = (F) => {
      w.value = F;
    }, M = async (F) => {
      await dt(F.path), T();
    };
    ie(c, async (F) => {
      F.trim() ? (await X(F.trim()), w.value = 0) : (v.value = [], p.value = !1, w.value = -1);
    }), ie($, async (F) => {
      k.value = `size-${F}`, c.value.trim() && !x.value && (await X(c.value.trim()), w.value = 0);
    }), ie(m, async () => {
      c.value.trim() && !x.value && (await X(c.value.trim()), w.value = 0);
    });
    const X = async (F) => {
      if (F) {
        p.value = !0;
        try {
          const L = C.value?.path || P?.value?.path, R = await e.adapter.search({
            path: L,
            filter: F,
            deep: m.value,
            size: $.value
          });
          v.value = R || [], p.value = !1;
        } catch (L) {
          t.error(Fe(L, o("Search failed"))), v.value = [], p.value = !1;
        }
      }
    };
    ve(() => {
      document.addEventListener("click", D), k.value = `size-${$.value}`;
    });
    const W = () => {
      x.value ? (x.value = !1, c.value.trim() && (X(c.value.trim()), w.value = 0)) : (h.value = !1, x.value = !0);
    }, J = (F) => {
      F && (C.value = F);
    }, I = (F) => {
      F && (J(F), x.value = !1, c.value.trim() && (X(c.value.trim()), w.value = 0));
    };
    ke(() => {
      document.removeEventListener("click", D), a.value && a.value.cleanup();
    });
    const D = (F) => {
      const L = F.target;
      if (h.value && (L.closest(".vuefinder__search-modal__dropdown") || (h.value = !1, Re(() => {
        l.value && l.value.focus();
      }))), y.value) {
        const R = L.closest(".vuefinder__search-modal__item-dropdown"), Y = L.closest(".vuefinder__search-modal__result-item");
        !R && !Y && T();
      }
    };
    return (F, L) => (u(), U(Te, { class: "vuefinder__search-modal-layout" }, {
      default: se(() => [
        r("div", Gr, [
          N(Oe, {
            icon: i(Gt),
            title: i(o)("Search files")
          }, null, 8, ["icon", "title"]),
          r("div", Wr, [
            r("div", Yr, [
              N(pr, {
                ref_key: "searchInputRef",
                ref: l,
                modelValue: i(c),
                "onUpdate:modelValue": L[0] || (L[0] = (R) => Wn(c) ? c.value = R : null),
                "is-searching": p.value,
                disabled: x.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              N(Fr, {
                ref_key: "searchOptionsDropdownRef",
                ref: a,
                visible: h.value,
                "onUpdate:visible": L[1] || (L[1] = (R) => h.value = R),
                "size-filter": $.value,
                "onUpdate:sizeFilter": L[2] || (L[2] = (R) => $.value = R),
                "selected-option": k.value,
                "onUpdate:selectedOption": L[3] || (L[3] = (R) => k.value = R),
                disabled: x.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            r("div", {
              class: "vuefinder__search-modal__options",
              onClick: L[7] || (L[7] = re(() => {
              }, ["stop"]))
            }, [
              r("div", Qr, [
                r("button", {
                  class: ne(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": x.value }]),
                  onClick: re(W, ["stop"])
                }, [
                  N(i(Ve), { class: "vuefinder__search-modal__location-icon" }),
                  r("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: C.value?.path || i(P).path
                  }, b(i(In)(C.value?.path || i(P).path)), 9, Xr),
                  L[10] || (L[10] = r("svg", {
                    class: "vuefinder__search-modal__location-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    r("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2)
              ]),
              r("label", {
                class: "vuefinder__search-modal__deep-search",
                onClick: L[6] || (L[6] = re(() => {
                }, ["stop"]))
              }, [
                fe(r("input", {
                  "onUpdate:modelValue": L[4] || (L[4] = (R) => m.value = R),
                  type: "checkbox",
                  disabled: x.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: L[5] || (L[5] = re(() => {
                  }, ["stop"]))
                }, null, 8, Jr), [
                  [wt, m.value]
                ]),
                r("span", null, b(i(o)("Include subfolders")), 1)
              ])
            ]),
            x.value ? (u(), _("div", Zr, [
              r("div", ea, [
                N(jt, {
                  modelValue: C.value,
                  "onUpdate:modelValue": [
                    L[8] || (L[8] = (R) => C.value = R),
                    J
                  ],
                  "show-pinned-folders": !0,
                  "current-path": i(P),
                  onSelectAndClose: I
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : z("", !0),
            !i(c).trim() && !x.value ? (u(), _("div", ta, [
              r("p", na, b(i(o)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : z("", !0),
            i(c).trim() && !x.value ? (u(), U(qr, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": v.value,
              "is-searching": p.value,
              "selected-index": w.value,
              "expanded-paths": f.value,
              "active-dropdown": y.value,
              "selected-item-dropdown-option": g.value,
              "results-enter": !0,
              onSelectResultItem: O,
              onSelectResultItemWithDropdown: G,
              onTogglePathExpansion: S,
              onToggleItemDropdown: E,
              "onUpdate:selectedItemDropdownOption": L[9] || (L[9] = (R) => g.value = R),
              onCopyPath: M,
              onOpenContainingFolder: V,
              onPreview: j
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), oa = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const o = ee(), s = A(!1), { t: l } = o.i18n;
    let a = null;
    const d = () => {
      a && clearTimeout(a), s.value = !0, a = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return ve(() => {
      o.emitter.on(n.on, d);
    }), ke(() => {
      a && clearTimeout(a);
    }), {
      shown: s,
      t: l
    };
  }
}, sa = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [o, s] of e)
    t[o] = s;
  return t;
}, ia = { key: 1 };
function ra(n, e, t, o, s, l) {
  return u(), _("div", {
    class: ne(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    n.$slots.default ? $e(n.$slots, "default", { key: 0 }) : (u(), _("span", ia, b(o.t("Saved.")), 1))
  ], 2);
}
const cn = /* @__PURE__ */ sa(oa, [["render", ra]]), aa = [
  { name: "silver", displayName: "Silver" },
  { name: "valorite", displayName: "Valorite" },
  { name: "midnight", displayName: "Midnight" },
  { name: "latte", displayName: "Latte" },
  { name: "rose", displayName: "Rose" },
  { name: "mythril", displayName: "Mythril" },
  { name: "lime", displayName: "lime" },
  { name: "sky", displayName: "Sky" },
  { name: "ocean", displayName: "Oceanic" },
  { name: "palenight", displayName: "Palenight" },
  { name: "arctic", displayName: "Arctic" },
  { name: "code", displayName: "Code" }
], la = { class: "vuefinder__settings-modal__content" }, da = { class: "vuefinder__settings-modal__main" }, ca = { class: "vuefinder__settings-modal__sections" }, ua = {
  key: 0,
  class: "vuefinder__settings-modal__section"
}, va = {
  for: "theme",
  class: "vuefinder__settings-modal__label"
}, fa = { class: "vuefinder__settings-modal__input-group" }, pa = ["value"], ha = ["value"], _a = {
  key: 1,
  class: "vuefinder__settings-modal__section"
}, ma = {
  for: "language",
  class: "vuefinder__settings-modal__label"
}, ga = { class: "vuefinder__settings-modal__input-group" }, wa = ["value"], ya = { class: "vuefinder__settings-modal__reset-section" }, ba = { class: "vuefinder__settings-modal__reset-content" }, ka = { class: "vuefinder__settings-modal__reset-title" }, xa = { class: "vuefinder__settings-modal__reset-description" }, Ln = /* @__PURE__ */ te({
  __name: "ModalSettings",
  setup(n) {
    const e = ee(), { enabled: t } = Le(), o = e.config, { clearStore: s } = e.storage, { t: l, localeAtom: a } = e.i18n, d = q(a), c = B({
      get: () => String(d.value || "en"),
      set: (m) => a.set(m || "en")
    }), v = q(o.state), p = B(() => v.value.theme || "silver"), w = async () => {
      o.reset(), s(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, h = (m) => {
      o.set("theme", m), e.emitter.emit("vf-theme-saved");
    }, { i18n: x } = ht("VueFinderOptions"), $ = Object.fromEntries(
      Object.entries({
        ar: "Arabic (العربيّة)",
        zhCN: "Chinese-Simplified (简体中文)",
        zhTW: "Chinese-Traditional (繁體中文)",
        nl: "Dutch (Nederlands)",
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        it: "Italian (Italiano)",
        ja: "Japanese (日本語)",
        fa: "Persian (فارسی)",
        pl: "Polish (Polski)",
        pt: "Portuguese (Português)",
        ru: "Russian (Pусский)",
        es: "Spanish (Español)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)"
      }).filter(([m]) => Object.keys(x).includes(m))
    );
    return (m, k) => (u(), U(Te, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[2] || (k[2] = (g) => i(e).modal.close())
        }, b(i(l)("Close")), 1)
      ]),
      default: se(() => [
        r("div", la, [
          N(Oe, {
            icon: i(Mn),
            title: i(l)("Settings")
          }, null, 8, ["icon", "title"]),
          r("div", da, [
            r("div", ca, [
              i(t)("theme") ? (u(), _("div", ua, [
                r("label", va, [
                  ce(b(i(l)("Theme")) + " ", 1),
                  N(cn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: se(() => [
                      ce(b(i(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                r("div", fa, [
                  r("select", {
                    id: "theme",
                    value: p.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: k[0] || (k[0] = (g) => h(g.target?.value))
                  }, [
                    (u(!0), _(ue, null, pe(i(aa), (g) => (u(), _("option", {
                      key: g.name,
                      value: g.name
                    }, b(g.displayName), 9, ha))), 128))
                  ], 40, pa)
                ])
              ])) : z("", !0),
              Object.keys(i($)).length > 1 ? (u(), _("div", _a, [
                r("label", ma, [
                  ce(b(i(l)("Language")) + " ", 1),
                  N(cn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: se(() => [
                      ce(b(i(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                r("div", ga, [
                  fe(r("select", {
                    id: "language",
                    "onUpdate:modelValue": k[1] || (k[1] = (g) => c.value = g),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (u(!0), _(ue, null, pe(i($), (g, f) => (u(), _("option", {
                      key: f,
                      value: f
                    }, b(g), 9, wa))), 128))
                  ], 512), [
                    [Mt, c.value]
                  ])
                ])
              ])) : z("", !0)
            ]),
            r("div", ya, [
              r("div", ba, [
                r("div", ka, b(i(l)("Reset")), 1),
                r("div", xa, b(i(l)("Reset all settings to default")), 1)
              ]),
              r("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: w
              }, b(i(l)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), De = {
  ESCAPE: "Escape",
  DELETE: "Delete",
  ENTER: "Enter",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF",
  SPACE: "Space",
  KEY_C: "KeyC",
  KEY_X: "KeyX",
  KEY_V: "KeyV",
  KEY_S: "KeyS",
  KEY_R: "KeyR"
};
function $a() {
  const n = ee(), e = Pe(n), t = n.fs, o = n.config, { enabled: s } = Le(), l = q(t.path), a = q(t.selectedItems), d = (c) => {
    if (c.code === De.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (c.metaKey && c.code === De.KEY_R && !c.shiftKey && (n.adapter.invalidateListQuery(l.value.path), n.adapter.open(l.value.path), c.preventDefault()), c.metaKey && c.shiftKey && c.code === De.KEY_R && s("rename") && a.value.length === 1 && (n.modal.open(kt, { items: a.value }), c.preventDefault()), c.code === De.DELETE && a.value.length !== 0 && n.modal.open(bt, { items: a.value }), c.metaKey && c.code === De.KEY_F && s("search") && (n.modal.open(Wt), c.preventDefault()), c.metaKey && c.code === De.KEY_E && (o.toggle("showTreeView"), c.preventDefault()), c.metaKey && c.code === De.KEY_S && (n.modal.open(Ln), c.preventDefault()), c.metaKey && c.code === De.ENTER && (o.toggle("fullScreen"), n.root.focus()), c.metaKey && c.code === De.KEY_A && (t.selectAll(n.selectionMode || "multiple", n), c.preventDefault()), c.code === De.SPACE && a.value.length === 1 && a.value[0]?.type !== "dir" && n.modal.open(vt, {
        storage: t.path.get().storage,
        item: a.value[0]
      }), c.metaKey && c.code === De.KEY_C && s("copy")) {
        if (a.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(a.value.map((v) => v.path))), e.success(
          a.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", a.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === De.KEY_X && s("copy")) {
        if (a.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(a.value.map((v) => v.path))), e.success(
          a.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", a.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === De.KEY_V && s("copy")) {
        if (t.getClipboard().items.size === 0) {
          e.error(n.i18n.t("No items in clipboard"));
          return;
        }
        if (t.getClipboard().path === t.path.get().path) {
          e.error(n.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (t.getClipboard().type === "cut") {
          n.modal.open(Ze, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          }), t.clearClipboard();
          return;
        }
        if (t.getClipboard().type === "copy") {
          n.modal.open(qt, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          });
          return;
        }
        c.preventDefault();
      }
    }
  };
  ve(async () => {
    if (await Re(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", d);
  }), gn(() => {
    n.root && n.root.removeEventListener("keydown", d);
  });
}
function Sa() {
  const n = A(!1), e = A([]);
  return {
    isDraggingExternal: n,
    externalFiles: e,
    handleDragEnter: (d) => {
      d.preventDefault(), d.stopPropagation();
      const c = d.dataTransfer?.items;
      c && Array.from(c).some((p) => p.kind === "file") && (n.value = !0, d.isExternalDrag = !0);
    },
    handleDragOver: (d) => {
      n.value && d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.preventDefault(), d.stopPropagation());
    },
    handleDragLeave: (d) => {
      d.preventDefault();
      const c = d.currentTarget.getBoundingClientRect(), v = d.clientX, p = d.clientY;
      (v < c.left || v > c.right || p < c.top || p > c.bottom) && (n.value = !1);
    },
    handleDrop: async (d) => {
      d.preventDefault(), d.stopPropagation(), n.value = !1;
      const c = d.dataTransfer?.items;
      if (c) {
        const v = Array.from(c).filter((p) => p.kind === "file");
        if (v.length > 0) {
          e.value = [];
          for (const p of v) {
            const w = p.webkitGetAsEntry?.();
            if (w)
              await Bt((h, x) => {
                e.value.push({
                  name: x.name,
                  size: x.size,
                  type: x.type,
                  lastModified: new Date(x.lastModified),
                  file: x
                });
              }, w);
            else {
              const h = p.getAsFile();
              h && e.value.push({
                name: h.name,
                size: h.size,
                type: h.type,
                lastModified: new Date(h.lastModified),
                file: h
              });
            }
          }
          return e.value;
        }
      }
      return [];
    },
    clearExternalFiles: () => {
      e.value = [];
    }
  };
}
const Ca = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Fa(n, e) {
  return u(), _("svg", Ca, [...e[0] || (e[0] = [
    r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const zn = { render: Fa }, Pa = { class: "vuefinder__new-folder-modal__content" }, Da = { class: "vuefinder__new-folder-modal__form" }, Ea = { class: "vuefinder__new-folder-modal__description" }, Ta = ["placeholder"], Yt = /* @__PURE__ */ te({
  __name: "ModalNewFolder",
  setup(n) {
    const e = ee(), t = Pe(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), a = A(""), d = () => {
      a.value !== "" && e.adapter.createFolder({
        path: l.value.path,
        name: a.value
      }).then((c) => {
        t.success(o("%s is created.", a.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Fe(c, o("Failed to create folder")));
      });
    };
    return (c, v) => (u(), U(Te, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, b(i(o)("Create")), 1),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (p) => i(e).modal.close())
        }, b(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        r("div", null, [
          N(Oe, {
            icon: i(zn),
            title: i(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          r("div", Pa, [
            r("div", Da, [
              r("p", Ea, b(i(o)("Create a new folder")), 1),
              fe(r("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (p) => a.value = p),
                class: "vuefinder__new-folder-modal__input",
                placeholder: i(o)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: ct(d, ["enter"])
              }, null, 40, Ta), [
                [ut, a.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ma = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ia(n, e) {
  return u(), _("svg", Ma, [...e[0] || (e[0] = [
    r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Rn = { render: Ia }, Aa = { class: "vuefinder__new-file-modal__content" }, Oa = { class: "vuefinder__new-file-modal__form" }, La = { class: "vuefinder__new-file-modal__description" }, za = ["placeholder"], Vn = /* @__PURE__ */ te({
  __name: "ModalNewFile",
  setup(n) {
    const e = ee(), t = Pe(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), a = A(""), d = () => {
      a.value !== "" && e.adapter.createFile({
        path: l.value.path,
        name: a.value
      }).then((c) => {
        t.success(o("%s is created.", a.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Fe(c, o("Failed to create file")));
      });
    };
    return (c, v) => (u(), U(Te, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, b(i(o)("Create")), 1),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (p) => i(e).modal.close())
        }, b(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        r("div", null, [
          N(Oe, {
            icon: i(Rn),
            title: i(o)("New File")
          }, null, 8, ["icon", "title"]),
          r("div", Aa, [
            r("div", Oa, [
              r("p", La, b(i(o)("Create a new file")), 1),
              fe(r("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (p) => a.value = p),
                class: "vuefinder__new-file-modal__input",
                placeholder: i(o)("File Name"),
                type: "text",
                onKeyup: ct(d, ["enter"])
              }, null, 40, za), [
                [ut, a.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ra = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Va(n, e) {
  return u(), _("svg", Ra, [...e[0] || (e[0] = [
    r("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Bn = { render: Va };
function Ot(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const Ba = { class: "vuefinder__upload-modal__content relative" }, Ua = { class: "vuefinder__upload-modal__target-section" }, Na = { class: "vuefinder__upload-modal__target-label" }, Ha = { class: "vuefinder__upload-modal__target-container" }, Ka = { class: "vuefinder__upload-modal__target-path" }, ja = { class: "vuefinder__upload-modal__target-storage" }, qa = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Ga = { class: "vuefinder__upload-modal__target-badge" }, Wa = { class: "vuefinder__upload-modal__drag-hint" }, Ya = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Qa = ["textContent"], Xa = { class: "vuefinder__upload-modal__file-info" }, Ja = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Za = { class: "vuefinder__upload-modal__file-name md:hidden" }, el = {
  key: 0,
  class: "ml-auto"
}, tl = ["title", "disabled", "onClick"], nl = {
  key: 0,
  class: "py-2"
}, ol = ["aria-expanded"], sl = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, il = ["disabled"], rl = ["aria-expanded"], al = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Qt = /* @__PURE__ */ te({
  __name: "ModalUpload",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = q(o.path), l = A(s.value), a = A(!1), d = () => {
      const I = l.value.path;
      if (!I) return { storage: "local", path: "" };
      if (I.endsWith("://"))
        return { storage: I.replace("://", ""), path: "" };
      const D = I.split("://");
      return {
        storage: D[0] || "local",
        path: D[1] || ""
      };
    }, c = (I) => {
      I && (l.value = I);
    }, v = (I) => {
      I && (l.value = I, a.value = !1);
    }, {
      container: p,
      internalFileInput: w,
      internalFolderInput: h,
      pickFiles: x,
      queue: C,
      message: $,
      uploading: m,
      hasFilesInDropArea: k,
      definitions: g,
      openFileSelector: f,
      upload: y,
      cancel: P,
      remove: S,
      clear: E,
      close: T,
      getClassNameForEntry: V,
      getIconForEntry: j,
      addExternalFiles: O
    } = Dn(e.customUploader), G = () => {
      y(l.value);
    };
    ve(() => {
      e.emitter.on("vf-external-files-dropped", (I) => {
        O(I);
      });
    }), ke(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const M = A(!1), X = A(null), W = A(null), J = (I) => {
      if (!M.value) return;
      const D = I.target, F = X.value?.contains(D) ?? !1, L = W.value?.contains(D) ?? !1;
      !F && !L && (M.value = !1);
    };
    return ve(() => document.addEventListener("click", J)), ke(() => document.removeEventListener("click", J)), (I, D) => (u(), U(Te, {
      "show-drag-overlay": i(k),
      "drag-overlay-text": i(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: se(() => [
        r("div", {
          ref_key: "actionsMenuMobileRef",
          ref: X,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          r("div", {
            class: ne([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              M.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            r("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: D[3] || (D[3] = (F) => i(f)())
            }, b(i(t)("Select Files")), 1),
            r("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": M.value ? "true" : "false",
              onClick: D[4] || (D[4] = re((F) => M.value = !M.value, ["stop"]))
            }, [...D[17] || (D[17] = [
              r("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                r("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, ol)
          ], 2),
          M.value ? (u(), _("div", sl, [
            r("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[5] || (D[5] = (F) => {
                i(f)(), M.value = !1;
              })
            }, b(i(t)("Select Files")), 1),
            r("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[6] || (D[6] = (F) => {
                i(h)?.click(), M.value = !1;
              })
            }, b(i(t)("Select Folders")), 1),
            D[18] || (D[18] = r("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            r("div", {
              class: ne(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[7] || (D[7] = (F) => i(m) ? null : (i(E)(!1), M.value = !1))
            }, b(i(t)("Clear all")), 3),
            r("div", {
              class: ne(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[8] || (D[8] = (F) => i(m) ? null : (i(E)(!0), M.value = !1))
            }, b(i(t)("Clear only successful")), 3)
          ])) : z("", !0)
        ], 512),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: i(m) || !i(C).length,
          onClick: re(G, ["prevent"])
        }, b(i(t)("Upload")), 9, il),
        i(m) ? (u(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[9] || (D[9] = re(
            //@ts-ignore
            (...F) => i(P) && i(P)(...F),
            ["prevent"]
          ))
        }, b(i(t)("Cancel")), 1)) : (u(), _("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[10] || (D[10] = re(
            //@ts-ignore
            (...F) => i(T) && i(T)(...F),
            ["prevent"]
          ))
        }, b(i(t)("Close")), 1)),
        r("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: W,
          class: "relative mr-auto hidden sm:block"
        }, [
          r("div", {
            class: ne(["vuefinder__upload-actions", M.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            r("button", {
              ref_key: "pickFiles",
              ref: x,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, b(i(t)("Select Files")), 513),
            r("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": M.value ? "true" : "false",
              onClick: D[11] || (D[11] = re((F) => M.value = !M.value, ["stop"]))
            }, [...D[19] || (D[19] = [
              r("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                r("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, rl)
          ], 2),
          M.value ? (u(), _("div", al, [
            r("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[12] || (D[12] = (F) => {
                i(f)(), M.value = !1;
              })
            }, b(i(t)("Select Files")), 1),
            r("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[13] || (D[13] = (F) => {
                i(h)?.click(), M.value = !1;
              })
            }, b(i(t)("Select Folders")), 1),
            D[20] || (D[20] = r("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            r("div", {
              class: ne(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[14] || (D[14] = (F) => i(m) ? null : (i(E)(!1), M.value = !1))
            }, b(i(t)("Clear all")), 3),
            r("div", {
              class: ne(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[15] || (D[15] = (F) => i(m) ? null : (i(E)(!0), M.value = !1))
            }, b(i(t)("Clear only successful")), 3)
          ])) : z("", !0)
        ], 512)
      ]),
      default: se(() => [
        r("div", null, [
          N(Oe, {
            icon: i(Bn),
            title: i(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          r("div", Ba, [
            r("div", Ua, [
              r("div", Na, b(i(t)("Target Directory")), 1),
              r("div", Ha, [
                r("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: D[0] || (D[0] = (F) => a.value = !a.value)
                }, [
                  r("div", Ka, [
                    r("span", ja, b(d().storage) + "://", 1),
                    d().path ? (u(), _("span", qa, b(d().path), 1)) : z("", !0)
                  ]),
                  r("span", Ga, b(i(t)("Browse")), 1)
                ])
              ]),
              r("div", {
                class: ne([
                  "vuefinder__upload-modal__tree-selector",
                  a.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                N(jt, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    D[1] || (D[1] = (F) => l.value = F),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: v
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            r("div", Wa, b(i(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            r("div", {
              ref_key: "container",
              ref: p,
              class: "hidden"
            }, null, 512),
            r("div", Ya, [
              (u(!0), _(ue, null, pe(i(C), (F) => (u(), _("div", {
                key: F.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                r("span", {
                  class: ne(["vuefinder__upload-modal__file-icon", i(V)(F)])
                }, [
                  r("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(i(j)(F))
                  }, null, 8, Qa)
                ], 2),
                r("div", Xa, [
                  r("div", Ja, b(i(Ot)(F.name, 40)) + " (" + b(F.size) + ") ", 1),
                  r("div", Za, b(i(Ot)(F.name, 16)) + " (" + b(F.size) + ") ", 1),
                  r("div", {
                    class: ne(["vuefinder__upload-modal__file-status", i(V)(F)])
                  }, [
                    ce(b(F.statusName) + " ", 1),
                    F.status === i(g).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), _("b", el, b(F.percent), 1)) : z("", !0)
                  ], 2)
                ]),
                r("button", {
                  type: "button",
                  class: ne(["vuefinder__upload-modal__file-remove", i(m) ? "disabled" : ""]),
                  title: i(t)("Delete"),
                  disabled: i(m),
                  onClick: (L) => i(S)(F)
                }, [...D[16] || (D[16] = [
                  r("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, tl)
              ]))), 128)),
              i(C).length ? z("", !0) : (u(), _("div", nl, b(i(t)("No files selected!")), 1))
            ]),
            i($).length ? (u(), U(At, {
              key: 0,
              error: "",
              onHidden: D[2] || (D[2] = (F) => $.value = "")
            }, {
              default: se(() => [
                ce(b(i($)), 1)
              ]),
              _: 1
            })) : z("", !0)
          ])
        ]),
        r("input", {
          ref_key: "internalFileInput",
          ref: w,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        r("input", {
          ref_key: "internalFolderInput",
          ref: h,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["show-drag-overlay", "drag-overlay-text"]));
  }
}), ll = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function dl(n, e) {
  return u(), _("svg", ll, [...e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Un = { render: dl }, cl = { class: "vuefinder__unarchive-modal__content" }, ul = { class: "vuefinder__unarchive-modal__items" }, vl = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fl = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pl = { class: "vuefinder__unarchive-modal__item-name" }, hl = { class: "vuefinder__unarchive-modal__info" }, Xt = /* @__PURE__ */ te({
  __name: "ModalUnarchive",
  setup(n) {
    const e = ee(), t = Pe(e), o = e.fs, s = q(o.path), { t: l } = e.i18n, a = A(e.modal.data.items[0]), d = A([]), c = () => {
      e.adapter.unarchive({
        item: a.value.path,
        path: s.value.path
      }).then((v) => {
        t.success(l("The file unarchived.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Fe(v, l("Failed to unarchive")));
      });
    };
    return (v, p) => (u(), U(Te, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(i(l)("Unarchive")), 1),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[0] || (p[0] = (w) => i(e).modal.close())
        }, b(i(l)("Cancel")), 1)
      ]),
      default: se(() => [
        r("div", null, [
          N(Oe, {
            icon: i(Un),
            title: i(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          r("div", cl, [
            r("div", ul, [
              (u(!0), _(ue, null, pe(d.value, (w) => (u(), _("p", {
                key: w.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                w.type === "dir" ? (u(), _("svg", vl, [...p[1] || (p[1] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), _("svg", fl, [...p[2] || (p[2] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                r("span", pl, b(w.basename), 1)
              ]))), 128)),
              r("p", hl, b(i(l)("The archive will be unarchived at")) + " (" + b(i(s).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), _l = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ml(n, e) {
  return u(), _("svg", _l, [...e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Nn = { render: ml }, gl = { class: "vuefinder__archive-modal__content" }, wl = { class: "vuefinder__archive-modal__form" }, yl = { class: "vuefinder__archive-modal__files vf-scrollbar" }, bl = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, kl = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xl = { class: "vuefinder__archive-modal__file-name" }, $l = ["placeholder"], Jt = /* @__PURE__ */ te({
  __name: "ModalArchive",
  setup(n) {
    const e = ee(), t = Pe(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), a = A(""), d = A(e.modal.data.items), c = () => {
      d.value.length && e.adapter.archive({
        path: l.value.path,
        items: d.value.map(({ path: v, type: p }) => ({
          path: v,
          type: p
        })),
        name: a.value
      }).then((v) => {
        t.success(o("The file(s) archived.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Fe(v, o("Failed to archive files")));
      });
    };
    return (v, p) => (u(), U(Te, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(i(o)("Archive")), 1),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[1] || (p[1] = (w) => i(e).modal.close())
        }, b(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        r("div", null, [
          N(Oe, {
            icon: i(Nn),
            title: i(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          r("div", gl, [
            r("div", wl, [
              r("div", yl, [
                (u(!0), _(ue, null, pe(d.value, (w) => (u(), _("p", {
                  key: w.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  w.type === "dir" ? (u(), _("svg", bl, [...p[2] || (p[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), _("svg", kl, [...p[3] || (p[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  r("span", xl, b(w.basename), 1)
                ]))), 128))
              ]),
              fe(r("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (w) => a.value = w),
                class: "vuefinder__archive-modal__input",
                placeholder: i(o)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: ct(c, ["enter"])
              }, null, 40, $l), [
                [ut, a.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Sl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Cl(n, e) {
  return u(), _("svg", Sl, [...e[0] || (e[0] = [
    r("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }, null, -1),
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 8.2h.01M10.75 11.25H12v4.5m0 0h1.25m-1.25 0h-2"
    }, null, -1)
  ])]);
}
const Fl = { render: Cl }, Pl = { class: "vuefinder__about-modal__content" }, Dl = { class: "vuefinder__about-modal__main" }, El = { class: "vuefinder__about-modal__shortcuts" }, Tl = { class: "vuefinder__about-modal__shortcut" }, Ml = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Il = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Al = { class: "vuefinder__about-modal__shortcut" }, Ol = { class: "vuefinder__about-modal__shortcut" }, Ll = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, zl = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, Rl = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, Vl = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, Bl = { class: "vuefinder__about-modal__shortcut" }, Ul = { class: "vuefinder__about-modal__shortcut" }, Nl = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, Hl = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, Kl = /* @__PURE__ */ te({
  __name: "ModalShortcuts",
  setup(n) {
    const e = ee(), { enabled: t } = Le(), { t: o } = e.i18n;
    return (s, l) => (u(), U(Te, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (a) => i(e).modal.close())
        }, b(i(o)("Close")), 1)
      ]),
      default: se(() => [
        r("div", Pl, [
          N(Oe, {
            icon: i(Fl),
            title: i(o)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          r("div", Dl, [
            r("div", El, [
              r("div", Tl, [
                r("div", null, b(i(o)("Refresh")), 1),
                l[1] || (l[1] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "R")
                ], -1))
              ]),
              i(t)("rename") ? (u(), _("div", Ml, [
                r("div", null, b(i(o)("Rename")), 1),
                l[2] || (l[2] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "Shift"),
                  ce(" + "),
                  r("kbd", null, "R")
                ], -1))
              ])) : z("", !0),
              i(t)("delete") ? (u(), _("div", Il, [
                r("div", null, b(i(o)("Delete")), 1),
                l[3] || (l[3] = r("kbd", null, "Del", -1))
              ])) : z("", !0),
              r("div", Al, [
                r("div", null, b(i(o)("Escape")), 1),
                l[4] || (l[4] = r("kbd", null, "Esc", -1))
              ]),
              r("div", Ol, [
                r("div", null, b(i(o)("Select All")), 1),
                l[5] || (l[5] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "A")
                ], -1))
              ]),
              i(t)("copy") ? (u(), _("div", Ll, [
                r("div", null, b(i(o)("Cut")), 1),
                l[6] || (l[6] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "X")
                ], -1))
              ])) : z("", !0),
              i(t)("copy") ? (u(), _("div", zl, [
                r("div", null, b(i(o)("Copy")), 1),
                l[7] || (l[7] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "C")
                ], -1))
              ])) : z("", !0),
              i(t)("copy") ? (u(), _("div", Rl, [
                r("div", null, b(i(o)("Paste")), 1),
                l[8] || (l[8] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "V")
                ], -1))
              ])) : z("", !0),
              i(t)("search") ? (u(), _("div", Vl, [
                r("div", null, b(i(o)("Search")), 1),
                l[9] || (l[9] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "F")
                ], -1))
              ])) : z("", !0),
              r("div", Bl, [
                r("div", null, b(i(o)("Toggle Sidebar")), 1),
                l[10] || (l[10] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "E")
                ], -1))
              ]),
              r("div", Ul, [
                r("div", null, b(i(o)("Open Settings")), 1),
                l[11] || (l[11] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "S")
                ], -1))
              ]),
              i(t)("fullscreen") ? (u(), _("div", Nl, [
                r("div", null, b(i(o)("Toggle Full Screen")), 1),
                l[12] || (l[12] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "Enter")
                ], -1))
              ])) : z("", !0),
              i(t)("preview") ? (u(), _("div", Hl, [
                r("div", null, b(i(o)("Preview")), 1),
                l[13] || (l[13] = r("kbd", null, "Space", -1))
              ])) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), jl = { class: "vuefinder__menubar__container" }, ql = ["onClick", "onMouseenter"], Gl = { class: "vuefinder__menubar__label" }, Wl = ["onMouseenter"], Yl = ["onClick"], Ql = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Xl = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Jl = /* @__PURE__ */ te({
  __name: "MenuBar",
  setup(n) {
    const e = ee(), t = Pe(e), { enabled: o } = Le(), { t: s } = e?.i18n || { t: (f) => f }, l = e?.fs, a = e?.config, d = q(a.state), c = q(l.selectedItems), v = q(l?.storages || []), p = A(null), w = A(!1), h = B(() => window.opener !== null || window.name !== "" || window.history.length <= 1), x = B(() => [
      {
        id: "file",
        label: s("File"),
        items: [
          {
            id: "new-folder",
            label: s("New Folder"),
            action: () => e?.modal?.open(Yt, { items: c.value }),
            hidden: () => !o("newfolder")
          },
          {
            id: "new-file",
            label: s("New File"),
            action: () => e?.modal?.open(Vn, { items: c.value }),
            hidden: () => !o("newfile")
          },
          {
            type: "separator",
            hidden: () => !o("newfolder") && !o("newfile") || !o("upload")
          },
          {
            id: "upload",
            label: s("Upload"),
            action: () => e?.modal?.open(Qt, { items: c.value }),
            hidden: () => !o("upload")
          },
          { type: "separator", hidden: () => !o("search") },
          {
            id: "search",
            label: s("Search"),
            action: () => e.modal.open(Wt),
            hidden: () => !o("search")
          },
          { type: "separator", hidden: () => !o("archive") && !o("unarchive") },
          {
            id: "archive",
            label: s("Archive"),
            action: () => {
              c.value.length > 0 && e?.modal?.open(Jt, { items: c.value });
            },
            enabled: () => c.value.length > 0,
            hidden: () => !o("archive")
          },
          {
            id: "unarchive",
            label: s("Unarchive"),
            action: () => {
              c.value.length === 1 && c.value[0]?.mime_type === "application/zip" && e?.modal?.open(Xt, { items: c.value });
            },
            enabled: () => c.value.length === 1 && c.value[0]?.mime_type === "application/zip",
            hidden: () => !o("unarchive")
          },
          { type: "separator", hidden: () => !o("preview") },
          {
            id: "preview",
            label: s("Preview"),
            action: () => {
              c.value.length === 1 && c.value[0]?.type !== "dir" && e?.modal?.open(vt, {
                storage: l?.path?.get()?.storage,
                item: c.value[0]
              });
            },
            enabled: () => c.value.length === 1 && c.value[0]?.type !== "dir",
            hidden: () => !o("preview")
          },
          // Only show exit option if we can actually close the window
          ...h.value ? [
            { type: "separator" },
            {
              id: "exit",
              label: s("Exit"),
              action: () => {
                try {
                  window.close();
                } catch {
                }
              },
              enabled: () => !0
            }
          ] : []
        ]
      },
      {
        id: "edit",
        label: s("Edit"),
        items: [
          // Only show Select All and Deselect All in multiple selection mode
          ...e?.selectionMode === "multiple" ? [
            {
              id: "select-all",
              label: s("Select All"),
              action: () => l?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: s("Deselect All"),
              action: () => l?.clearSelection(),
              enabled: () => c.value.length > 0
            },
            { type: "separator" }
          ] : [],
          ...o("copy") ? [
            {
              id: "cut",
              label: s("Cut"),
              action: () => {
                c.value.length > 0 && l?.setClipboard(
                  "cut",
                  new Set(c.value.map((f) => f.path))
                );
              },
              enabled: () => c.value.length > 0
            },
            {
              id: "copy",
              label: s("Copy"),
              action: () => {
                c.value.length > 0 && l?.setClipboard(
                  "copy",
                  new Set(c.value.map((f) => f.path))
                );
              },
              enabled: () => c.value.length > 0
            },
            {
              id: "paste",
              label: s("Paste"),
              action: () => {
                const f = l?.getClipboard();
                f?.items?.size > 0 && e?.modal?.open(f.type === "cut" ? Ze : qt, {
                  items: { from: Array.from(f.items), to: l?.path?.get() }
                });
              },
              enabled: () => l?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...o("move") ? [
            {
              id: "move",
              label: s("Move files"),
              action: () => {
                if (c.value.length > 0) {
                  const f = e?.fs, y = {
                    storage: f?.path?.get()?.storage || "",
                    path: f?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(Ze, { items: { from: c.value, to: y } });
                }
              },
              enabled: () => c.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "copy-path",
            label: s("Copy Path"),
            action: async () => {
              if (c.value.length === 1) {
                const f = c.value[0];
                await dt(f.path);
              } else {
                const f = l?.path?.get();
                f?.path && await dt(f.path);
              }
            },
            enabled: () => !0
            // Her zaman aktif
          },
          {
            id: "copy-download-url",
            label: s("Copy Download URL"),
            action: async () => {
              if (c.value.length === 1) {
                const f = c.value[0];
                l?.path?.get()?.storage;
                const y = e?.adapter?.getDownloadUrl({ path: f.path });
                y && await Pr(y);
              }
            },
            enabled: () => c.value.length === 1 && c.value[0]?.type !== "dir"
          },
          { type: "separator", hidden: () => !o("rename") && !o("delete") },
          {
            id: "rename",
            label: s("Rename"),
            action: () => {
              c.value.length === 1 && e?.modal?.open(kt, { items: c.value });
            },
            enabled: () => c.value.length === 1,
            hidden: () => !o("rename")
          },
          {
            id: "delete",
            label: s("Delete"),
            action: () => {
              c.value.length > 0 && e?.modal?.open(bt, { items: c.value });
            },
            enabled: () => c.value.length > 0,
            hidden: () => !o("delete")
          }
        ]
      },
      {
        id: "view",
        label: s("View"),
        items: [
          {
            id: "refresh",
            label: s("Refresh"),
            action: () => {
              e.adapter.invalidateListQuery(l.path.get().path), e.adapter.open(l.path.get().path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: s("Grid View"),
            action: () => a?.set("view", "grid"),
            enabled: () => !0,
            checked: () => d.value?.view === "grid"
          },
          {
            id: "list-view",
            label: s("List View"),
            action: () => a?.set("view", "list"),
            enabled: () => !0,
            checked: () => d.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: s("Tree View"),
            action: () => a?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => d.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: s("Show Thumbnails"),
            action: () => a?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => d.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: s("Show Hidden Files"),
            action: () => a?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => d.value?.showHiddenFiles
          },
          { type: "separator", hidden: () => !o("fullscreen") },
          {
            id: "fullscreen",
            label: s("Full Screen"),
            action: () => a?.toggle("fullScreen"),
            enabled: () => o("fullscreen"),
            checked: () => d.value?.fullScreen,
            hidden: () => !o("fullscreen")
          },
          { type: "separator" },
          {
            id: "persist-path",
            label: s("Persist Path"),
            action: () => {
              a?.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
            },
            enabled: () => !0,
            checked: () => d.value?.persist
          },
          {
            id: "metric-units",
            label: s("Metric Units"),
            action: () => {
              a?.toggle("metricUnits"), e.filesize = a?.get("metricUnits") ? $n : Rt, e.emitter.emit("vf-metric-units-saved");
            },
            enabled: () => !0,
            checked: () => d.value?.metricUnits
          }
        ]
      },
      {
        id: "go",
        label: s("Go"),
        items: [
          ...o("history") ? [
            {
              id: "forward",
              label: s("Forward"),
              action: () => {
                l?.goForward();
                const f = l?.path?.get();
                f?.path && e?.adapter.open(f.path);
              },
              enabled: () => l?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: s("Back"),
              action: () => {
                l?.goBack();
                const f = l?.path?.get();
                f?.path && e?.adapter.open(f.path);
              },
              enabled: () => l?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: s("Open containing folder"),
            action: () => {
              const f = l?.path?.get();
              if (f?.breadcrumb && f.breadcrumb.length > 1) {
                const P = f.breadcrumb[f.breadcrumb.length - 2]?.path ?? `${f.storage}://`;
                e?.adapter.open(P);
              }
            },
            enabled: () => {
              const f = l?.path?.get();
              return f?.breadcrumb && f.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(v.value || []).map((f) => ({
            id: `storage-${f}`,
            label: f,
            action: () => {
              const y = `${f}://`;
              e?.adapter.open(y);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: s("Go to Folder"),
            action: async () => {
              const f = prompt(s("Enter folder path:"));
              if (f) {
                if (!f.includes("://")) {
                  alert(s("Invalid path format. Path must be in format: storage://path/to/folder"));
                  return;
                }
                const y = f.indexOf("://"), P = f.slice(0, y);
                if (!v.value || !v.value.includes(P)) {
                  alert(s('Invalid storage. Storage "%s" is not available.', P));
                  return;
                }
                try {
                  await e?.adapter.open(f);
                } catch (S) {
                  const E = Fe(S, s("Failed to navigate to folder"));
                  t.error(E), e.fs.setLoading(!1);
                }
              }
            },
            enabled: () => !0
          }
        ]
      },
      {
        id: "help",
        label: s("Help"),
        items: [
          {
            id: "settings",
            label: s("Settings"),
            action: () => e?.modal?.open(Ln),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: s("Shortcuts"),
            action: () => e?.modal?.open(Kl),
            enabled: () => !0
          }
        ]
      }
    ]), C = (f) => {
      p.value === f ? m() : (p.value = f, w.value = !0);
    }, $ = (f) => {
      w.value && (p.value = f);
    }, m = () => {
      p.value = null, w.value = !1;
    }, k = (f) => {
      m(), f();
    }, g = (f) => {
      f.target.closest(".vuefinder__menubar") || m();
    };
    return ve(() => {
      document.addEventListener("click", g);
    }), ke(() => {
      document.removeEventListener("click", g);
    }), (f, y) => (u(), _("div", {
      class: "vuefinder__menubar",
      onClick: y[0] || (y[0] = re(() => {
      }, ["stop"]))
    }, [
      r("div", jl, [
        (u(!0), _(ue, null, pe(x.value, (P) => (u(), _("div", {
          key: P.id,
          class: ne(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": p.value === P.id }]),
          onClick: (S) => C(P.id),
          onMouseenter: (S) => $(P.id)
        }, [
          r("span", Gl, b(P.label), 1),
          p.value === P.id ? (u(), _("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (S) => $(P.id)
          }, [
            (u(!0), _(ue, null, pe(P.items, (S) => (u(), _("div", {
              key: S.id || S.type,
              class: ne(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": S.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": S.enabled && !S.enabled(),
                "vuefinder__menubar__dropdown__item--checked": S.checked && S.checked(),
                "vuefinder__menubar__dropdown__item--hidden": S.hidden && S.hidden()
              }]),
              onClick: re((E) => S.type !== "separator" && S.enabled && S.enabled() ? k(S.action) : null, ["stop"])
            }, [
              S.type !== "separator" ? (u(), _("span", Ql, b(S.label), 1)) : z("", !0),
              S.checked && S.checked() ? (u(), _("span", Xl, " ✓ ")) : z("", !0)
            ], 10, Yl))), 128))
          ], 40, Wl)) : z("", !0)
        ], 42, ql))), 128))
      ])
    ]));
  }
}), Zl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ed(n, e) {
  return u(), _("svg", Zl, [...e[0] || (e[0] = [
    r("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const td = { render: ed }, nd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function od(n, e) {
  return u(), _("svg", nd, [...e[0] || (e[0] = [
    r("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const sd = { render: od }, id = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function rd(n, e) {
  return u(), _("svg", id, [...e[0] || (e[0] = [
    r("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const ad = { render: rd }, ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function dd(n, e) {
  return u(), _("svg", ld, [...e[0] || (e[0] = [
    r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const cd = { render: dd }, ud = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function vd(n, e) {
  return u(), _("svg", ud, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const fd = { render: vd }, pd = { class: "vuefinder__toolbar" }, hd = { class: "vuefinder__toolbar__actions" }, _d = ["title"], md = ["title"], gd = ["title"], wd = ["title"], yd = ["title"], bd = ["title"], kd = ["title"], xd = { class: "vuefinder__toolbar__controls" }, $d = ["title"], Sd = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Cd = ["title"], Fd = { class: "relative" }, Pd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Dd = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Ed = { class: "vuefinder__toolbar__dropdown-content" }, Td = { class: "vuefinder__toolbar__dropdown-section" }, Md = { class: "vuefinder__toolbar__dropdown-label" }, Id = { class: "vuefinder__toolbar__dropdown-row" }, Ad = { value: "name" }, Od = { value: "size" }, Ld = { value: "modified" }, zd = { value: "" }, Rd = { value: "asc" }, Vd = { value: "desc" }, Bd = { class: "vuefinder__toolbar__dropdown-section" }, Ud = { class: "vuefinder__toolbar__dropdown-label" }, Nd = { class: "vuefinder__toolbar__dropdown-options" }, Hd = { class: "vuefinder__toolbar__dropdown-option" }, Kd = { class: "vuefinder__toolbar__option-text" }, jd = { class: "vuefinder__toolbar__dropdown-option" }, qd = { class: "vuefinder__toolbar__option-text" }, Gd = { class: "vuefinder__toolbar__dropdown-option" }, Wd = { class: "vuefinder__toolbar__option-text" }, Yd = { class: "vuefinder__toolbar__dropdown-toggle" }, Qd = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Xd = { class: "vuefinder__toolbar__dropdown-reset" }, Jd = ["title"], Zd = ["title"], ec = /* @__PURE__ */ te({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = ee(), { enabled: t } = Le(), { t: o } = e.i18n, s = e.fs, l = e.config, a = q(l.state), d = q(s.selectedItems), c = q(s.sort), v = q(s.filter);
    ie(
      () => a.value.fullScreen,
      () => {
        const m = document.querySelector("body");
        m && (m.style.overflow = a.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const p = A(!1), w = (m) => {
      m.target.closest(".vuefinder__toolbar__dropdown-container") || (p.value = !1);
    };
    ve(() => {
      const m = document.querySelector("body");
      m && a.value.fullScreen && setTimeout(() => m.style.overflow = "hidden"), document.addEventListener("click", w);
    }), ke(() => {
      document.removeEventListener("click", w);
    });
    const h = A({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: a.value.showHiddenFiles
      // Initialize with config store default
    });
    ie(
      () => h.value.sortBy,
      (m) => {
        if (!h.value.sortOrder) {
          s.clearSort();
          return;
        }
        m === "name" ? s.setSort("basename", h.value.sortOrder) : m === "size" ? s.setSort("file_size", h.value.sortOrder) : m === "modified" && s.setSort("last_modified", h.value.sortOrder);
      }
    ), ie(
      () => h.value.sortOrder,
      (m) => {
        if (!m) {
          s.clearSort();
          return;
        }
        h.value.sortBy === "name" ? s.setSort("basename", m) : h.value.sortBy === "size" ? s.setSort("file_size", m) : h.value.sortBy === "modified" && s.setSort("last_modified", m);
      }
    ), ie(
      c,
      (m) => {
        m.active ? (m.column === "basename" ? h.value.sortBy = "name" : m.column === "file_size" ? h.value.sortBy = "size" : m.column === "last_modified" && (h.value.sortBy = "modified"), h.value.sortOrder = m.order) : h.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ie(
      () => h.value.filterKind,
      (m) => {
        s.setFilter(m, a.value.showHiddenFiles);
      }
    ), ie(
      () => h.value.showHidden,
      (m) => {
        l.set("showHiddenFiles", m), s.setFilter(h.value.filterKind, m);
      }
    ), ie(
      v,
      (m) => {
        h.value.filterKind = m.kind;
      },
      { immediate: !0 }
    ), ie(
      () => a.value.showHiddenFiles,
      (m) => {
        h.value.showHidden = m, s.setFilter(h.value.filterKind, m);
      },
      { immediate: !0 }
    );
    const x = () => l.set("view", a.value.view === "grid" ? "list" : "grid"), C = B(() => v.value.kind !== "all" || !a.value.showHiddenFiles || c.value.active), $ = () => {
      h.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), s.clearSort(), s.clearFilter();
    };
    return (m, k) => (u(), _("div", pd, [
      r("div", hd, [
        i(t)("newfolder") ? (u(), _("div", {
          key: 0,
          class: "mx-1.5",
          title: i(o)("New Folder"),
          onClick: k[0] || (k[0] = (g) => i(e).modal.open(Yt, { items: i(d) }))
        }, [
          N(i(zn))
        ], 8, _d)) : z("", !0),
        i(t)("newfile") ? (u(), _("div", {
          key: 1,
          class: "mx-1.5",
          title: i(o)("New File"),
          onClick: k[1] || (k[1] = (g) => i(e).modal.open(Vn, { items: i(d) }))
        }, [
          N(i(Rn))
        ], 8, md)) : z("", !0),
        i(t)("rename") ? (u(), _("div", {
          key: 2,
          class: "mx-1.5",
          title: i(o)("Rename"),
          onClick: k[2] || (k[2] = (g) => i(d).length !== 1 || i(e).modal.open(kt, { items: i(d) }))
        }, [
          N(i(Pn), {
            class: ne(i(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, gd)) : z("", !0),
        i(t)("delete") ? (u(), _("div", {
          key: 3,
          class: "mx-1.5",
          title: i(o)("Delete"),
          onClick: k[3] || (k[3] = (g) => !i(d).length || i(e).modal.open(bt, { items: i(d) }))
        }, [
          N(i(Fn), {
            class: ne(i(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, wd)) : z("", !0),
        i(t)("upload") ? (u(), _("div", {
          key: 4,
          class: "mx-1.5",
          title: i(o)("Upload"),
          onClick: k[4] || (k[4] = (g) => i(e).modal.open(Qt, { items: i(d) }))
        }, [
          N(i(Bn))
        ], 8, yd)) : z("", !0),
        i(t)("unarchive") && i(d).length === 1 && i(d)[0].mime_type === "application/zip" ? (u(), _("div", {
          key: 5,
          class: "mx-1.5",
          title: i(o)("Unarchive"),
          onClick: k[5] || (k[5] = (g) => !i(d).length || i(e).modal.open(Xt, { items: i(d) }))
        }, [
          N(i(Un), {
            class: ne(i(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, bd)) : z("", !0),
        i(t)("archive") ? (u(), _("div", {
          key: 6,
          class: "mx-1.5",
          title: i(o)("Archive"),
          onClick: k[6] || (k[6] = (g) => !i(d).length || i(e).modal.open(Jt, { items: i(d) }))
        }, [
          N(i(Nn), {
            class: ne(i(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, kd)) : z("", !0)
      ]),
      r("div", xd, [
        i(t)("search") ? (u(), _("div", {
          key: 0,
          class: "mx-1.5",
          title: i(o)("Search Files"),
          onClick: k[7] || (k[7] = (g) => i(e).modal.open(Wt))
        }, [
          N(i(Gt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, $d)) : z("", !0),
        r("div", Sd, [
          r("div", {
            title: i(o)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: k[8] || (k[8] = (g) => p.value = !p.value)
          }, [
            r("div", Fd, [
              N(i(fd), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              C.value ? (u(), _("div", Pd)) : z("", !0)
            ])
          ], 8, Cd),
          p.value ? (u(), _("div", Dd, [
            r("div", Ed, [
              r("div", Td, [
                r("div", Md, b(i(o)("Sorting")), 1),
                r("div", Id, [
                  fe(r("select", {
                    "onUpdate:modelValue": k[9] || (k[9] = (g) => h.value.sortBy = g),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    r("option", Ad, b(i(o)("Name")), 1),
                    r("option", Od, b(i(o)("Size")), 1),
                    r("option", Ld, b(i(o)("Date")), 1)
                  ], 512), [
                    [Mt, h.value.sortBy]
                  ]),
                  fe(r("select", {
                    "onUpdate:modelValue": k[10] || (k[10] = (g) => h.value.sortOrder = g),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    r("option", zd, b(i(o)("None")), 1),
                    r("option", Rd, b(i(o)("Asc")), 1),
                    r("option", Vd, b(i(o)("Desc")), 1)
                  ], 512), [
                    [Mt, h.value.sortOrder]
                  ])
                ])
              ]),
              r("div", Bd, [
                r("div", Ud, b(i(o)("Show")), 1),
                r("div", Nd, [
                  r("label", Hd, [
                    fe(r("input", {
                      "onUpdate:modelValue": k[11] || (k[11] = (g) => h.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Pt, h.value.filterKind]
                    ]),
                    r("span", Kd, b(i(o)("All items")), 1)
                  ]),
                  r("label", jd, [
                    fe(r("input", {
                      "onUpdate:modelValue": k[12] || (k[12] = (g) => h.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Pt, h.value.filterKind]
                    ]),
                    r("span", qd, b(i(o)("Files only")), 1)
                  ]),
                  r("label", Gd, [
                    fe(r("input", {
                      "onUpdate:modelValue": k[13] || (k[13] = (g) => h.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Pt, h.value.filterKind]
                    ]),
                    r("span", Wd, b(i(o)("Folders only")), 1)
                  ])
                ])
              ]),
              r("div", Yd, [
                r("label", Qd, b(i(o)("Show hidden files")), 1),
                fe(r("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": k[14] || (k[14] = (g) => h.value.showHidden = g),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [wt, h.value.showHidden]
                ])
              ]),
              r("div", Xd, [
                r("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: $
                }, b(i(o)("Reset")), 1)
              ])
            ])
          ])) : z("", !0)
        ]),
        i(t)("fullscreen") ? (u(), _("div", {
          key: 1,
          class: "mx-1.5",
          title: i(o)("Toggle Full Screen"),
          onClick: k[15] || (k[15] = (g) => i(l).toggle("fullScreen"))
        }, [
          i(a).fullScreen ? (u(), U(i(sd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), U(i(td), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Jd)) : z("", !0),
        r("div", {
          class: "mx-1.5",
          title: i(o)("Change View"),
          onClick: k[16] || (k[16] = (g) => x())
        }, [
          i(a).view === "grid" ? (u(), U(i(ad), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : z("", !0),
          i(a).view === "list" ? (u(), U(i(cd), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : z("", !0)
        ], 8, Zd)
      ])
    ]));
  }
}), tc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function nc(n, e) {
  return u(), _("svg", tc, [...e[0] || (e[0] = [
    r("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const oc = { render: nc }, sc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function ic(n, e) {
  return u(), _("svg", sc, [...e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const rc = { render: ic }, ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function lc(n, e) {
  return u(), _("svg", ac, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const dc = { render: lc }, cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function uc(n, e) {
  return u(), _("svg", cc, [...e[0] || (e[0] = [
    r("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const vc = { render: uc }, fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function pc(n, e) {
  return u(), _("svg", fc, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const hc = { render: pc }, _c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function mc(n, e) {
  return u(), _("svg", _c, [...e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const gc = { render: mc }, wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function yc(n, e) {
  return u(), _("svg", wc, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const bc = { render: yc };
function ft(n, e = []) {
  const t = "vfDragEnterCounter", o = n.fs, s = q(o.selectedItems);
  function l(w, h) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(h) || s.value.some((C) => C.path === h ? !1 : !!w.path.startsWith(C.path)));
  }
  function a(w, h) {
    if (w.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const C = o.getDraggedItem();
    l(h, C) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
  }
  function d(w) {
    if (w.isExternalDrag || !(n.features?.move ?? !1))
      return;
    w.preventDefault();
    const x = w.currentTarget, C = Number(x.dataset[t] || 0);
    x.dataset[t] = String(C + 1);
  }
  function c(w) {
    if (w.isExternalDrag || !(n.features?.move ?? !1))
      return;
    w.preventDefault();
    const x = w.currentTarget, $ = Number(x.dataset[t] || 0) - 1;
    $ <= 0 ? (delete x.dataset[t], x.classList.remove(...e)) : x.dataset[t] = String($);
  }
  function v(w, h) {
    if (w.isExternalDrag || !(n.features?.move ?? !1) || !h) return;
    w.preventDefault();
    const C = w.currentTarget;
    delete C.dataset[t], C.classList.remove(...e);
    const $ = w.dataTransfer?.getData("items") || "[]", k = JSON.parse($).map(
      (g) => o.sortedFiles.get().find((f) => f.path === g)
    );
    o.clearDraggedItem(), n.modal.open(Ze, { items: { from: k, to: h } });
  }
  function p(w) {
    return {
      dragover: (h) => a(h, w),
      dragenter: d,
      dragleave: c,
      drop: (h) => v(h, w)
    };
  }
  return { events: p };
}
const kc = { class: "vuefinder__breadcrumb__container" }, xc = ["title"], $c = ["title"], Sc = ["title"], Cc = ["title"], Fc = { class: "vuefinder__breadcrumb__path-container" }, Pc = { class: "vuefinder__breadcrumb__list" }, Dc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Ec = { class: "relative" }, Tc = ["title", "onClick"], Mc = ["title"], Ic = { class: "vuefinder__breadcrumb__path-mode" }, Ac = { class: "vuefinder__breadcrumb__path-mode-content" }, Oc = ["title"], Lc = { class: "vuefinder__breadcrumb__path-text" }, zc = ["title"], Rc = ["data-theme"], Vc = ["onClick"], Bc = { class: "vuefinder__breadcrumb__hidden-item-content" }, Uc = { class: "vuefinder__breadcrumb__hidden-item-text" }, Nc = /* @__PURE__ */ te({
  __name: "Breadcrumb",
  setup(n) {
    const e = ee(), t = Pe(e), { t: o } = e.i18n, s = e.fs, l = e.config, a = q(l.state), d = q(s.path), c = q(s.loading), v = A(null), p = Tn(0, 100), w = A(5), h = A(!1), x = A(!1), C = B(() => d.value?.breadcrumb ?? []);
    function $(I, D) {
      return I.length > D ? [I.slice(-D), I.slice(0, -D)] : [I, []];
    }
    const m = B(
      () => $(C.value, w.value)[0]
    ), k = B(
      () => $(C.value, w.value)[1]
    );
    ie(p, () => {
      if (!v.value) return;
      const I = v.value.children;
      let D = 0, F = 0;
      const L = 5, R = 1;
      w.value = L, Re(() => {
        for (let Y = I.length - 1; Y >= 0; Y--) {
          const le = I[Y];
          if (D + le.offsetWidth > p.value - 40)
            break;
          D += parseInt(le.offsetWidth.toString(), 10), F++;
        }
        F < R && (F = R), F > L && (F = L), w.value = F;
      });
    });
    const g = () => {
      v.value && (p.value = v.value.offsetWidth);
    }, f = A(null);
    ve(() => {
      f.value = new ResizeObserver(g), v.value && f.value.observe(v.value);
    }), ke(() => {
      f.value && f.value.disconnect();
    });
    const y = ft(e, ["vuefinder__drag-over"]);
    function P(I = null) {
      I ??= C.value.length - 2;
      const D = {
        basename: d.value?.storage ?? "local",
        extension: "",
        path: (d.value?.storage ?? "local") + "://",
        storage: d.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return C.value[I] ?? D;
    }
    const S = () => {
      e.adapter.invalidateListQuery(d.value.path), e.adapter.open(d.value.path);
    }, E = () => {
      m.value.length > 0 && e.adapter.open(
        C.value[C.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
      );
    }, T = (I) => {
      e.adapter.open(I.path), h.value = !1;
    }, V = () => {
      h.value && (h.value = !1);
    }, j = {
      mounted(I, D) {
        I.clickOutsideEvent = function(F) {
          I === F.target || I.contains(F.target) || D.value();
        }, document.body.addEventListener("click", I.clickOutsideEvent);
      },
      beforeUnmount(I) {
        document.body.removeEventListener("click", I.clickOutsideEvent);
      }
    }, O = () => {
      l.toggle("showTreeView");
    }, G = A({
      x: 0,
      y: 0
    }), M = (I, D = null) => {
      if (I.currentTarget instanceof HTMLElement) {
        const { x: F, y: L, height: R } = I.currentTarget.getBoundingClientRect();
        G.value = { x: F, y: L + R };
      }
      h.value = D ?? !h.value;
    }, X = () => {
      x.value = !x.value;
    }, W = async () => {
      await dt(d.value?.path || ""), t.success(o("Path copied to clipboard"));
    }, J = () => {
      x.value = !1;
    };
    return (I, D) => (u(), _("div", kc, [
      r("span", {
        title: i(o)("Toggle Tree View")
      }, [
        N(i(gc), {
          class: ne(["vuefinder__breadcrumb__toggle-tree", i(a).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: O
        }, null, 8, ["class"])
      ], 8, xc),
      r("span", {
        title: i(o)("Go up a directory")
      }, [
        N(i(rc), Ie({
          class: C.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, He(C.value.length ? i(y).events(P()) : {}), { onClick: E }), null, 16, ["class"])
      ], 8, $c),
      i(s).isLoading() ? (u(), _("span", {
        key: 1,
        title: i(o)("Cancel")
      }, [
        N(i(dc), {
          onClick: D[0] || (D[0] = (F) => i(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Cc)) : (u(), _("span", {
        key: 0,
        title: i(o)("Refresh")
      }, [
        N(i(oc), { onClick: S })
      ], 8, Sc)),
      fe(r("div", Fc, [
        r("div", null, [
          N(i(vc), Ie({ class: "vuefinder__breadcrumb__home-icon" }, He(i(y).events(P(-1))), {
            onClick: D[1] || (D[1] = re((F) => i(e).adapter.open(i(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        r("div", Pc, [
          k.value.length ? fe((u(), _("div", Dc, [
            D[3] || (D[3] = r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("div", Ec, [
              r("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: D[2] || (D[2] = (F) => M(F, !0)),
                onClick: re(M, ["stop"])
              }, [
                N(i(On), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [j, V]
          ]) : z("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: v,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), _(ue, null, pe(m.value, (F, L) => (u(), _("div", { key: L }, [
            D[4] || (D[4] = r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("span", Ie({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: F.basename
            }, He(i(y).events(F), !0), {
              onClick: re((R) => i(e).adapter.open(F.path), ["stop"])
            }), b(F.name), 17, Tc)
          ]))), 128))
        ], 512),
        i(l).get("loadingIndicator") === "circular" && i(c) ? (u(), U(i(St), { key: 0 })) : z("", !0),
        r("span", {
          title: i(o)("Toggle Path Copy Mode"),
          onClick: X
        }, [
          N(i(bc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Mc)
      ], 512), [
        [Ue, !x.value]
      ]),
      fe(r("div", Ic, [
        r("div", Ac, [
          r("div", {
            title: i(o)("Copy Path")
          }, [
            N(i(Ut), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: W
            })
          ], 8, Oc),
          r("div", Lc, b(i(d).path), 1),
          r("div", {
            title: i(o)("Exit")
          }, [
            N(i(hc), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: J
            })
          ], 8, zc)
        ])
      ], 512), [
        [Ue, x.value]
      ]),
      (u(), U(yt, { to: "body" }, [
        r("div", null, [
          fe(r("div", {
            style: Ae({
              position: "absolute",
              top: G.value.y + "px",
              left: G.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": i(e).theme.current
          }, [
            (u(!0), _(ue, null, pe(k.value, (F, L) => (u(), _("div", Ie({
              key: L,
              class: "vuefinder__breadcrumb__hidden-item"
            }, He(i(y).events(F), !0), {
              onClick: (R) => T(F)
            }), [
              r("div", Bc, [
                r("span", null, [
                  N(i(Ve), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                r("span", Uc, b(F.name), 1)
              ])
            ], 16, Vc))), 128))
          ], 12, Rc), [
            [Ue, h.value]
          ])
        ])
      ]))
    ]));
  }
}), Hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Kc(n, e) {
  return u(), _("svg", Hc, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const un = { render: Kc }, jc = { class: "vuefinder__drag-item__container" }, qc = { class: "vuefinder__drag-item__count" }, Gc = /* @__PURE__ */ te({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, o) => (u(), _("div", jc, [
      e.count > 1 ? (u(), U(i(un), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : z("", !0),
      N(i(un), { class: "vuefinder__drag-item__icon" }),
      r("div", qc, b(e.count), 1)
    ]));
  }
}), Wc = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, vn = /* @__PURE__ */ te({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(n) {
    const e = n, t = ee(), o = q(t.config.state), s = B(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), l = B(() => {
      const d = s.value, c = o.value?.listIconSize, v = o.value?.gridIconSize;
      return o.value?.gridItemWidth, o.value?.gridItemHeight, e.view === "list" || d === "small" ? {
        "--vf-icon-size": `${c ?? 16}px`
      } : {
        "--vf-icon-size": `${v ?? 48}px`
      };
    }), a = {
      app: t,
      config: o.value,
      item: e.item,
      view: e.view
    };
    return (d, c) => (u(), _("div", {
      class: ne(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": s.value === "small",
        "vuefinder__item-icon--large": s.value === "large",
        "vuefinder__item-icon--grid": n.view === "grid",
        "vuefinder__item-icon--list": n.view === "list"
      }]),
      style: Ae(l.value)
    }, [
      $e(d.$slots, "icon", Ke(je(a)), () => [
        n.item.type === "dir" ? (u(), U(i(Ve), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), U(i(lt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (u(), _("div", Wc, b(n.item.extension.substring(0, 3)), 1)) : z("", !0)
      ])
    ], 6));
  }
}), Yc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Qc(n, e) {
  return u(), _("svg", Yc, [...e[0] || (e[0] = [
    r("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const fn = { render: Qc }, Xc = ["data-key", "data-row", "data-col", "draggable"], Jc = { key: 0 }, Zc = { class: "vuefinder__explorer__item-grid-content" }, eu = ["data-src", "alt"], tu = { class: "vuefinder__explorer__item-title" }, nu = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, ou = { class: "vuefinder__explorer__item-list-name" }, su = { class: "vuefinder__explorer__item-list-icon" }, iu = { class: "vuefinder__explorer__item-name" }, ru = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, au = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, lu = { key: 0 }, du = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, cu = /* @__PURE__ */ te({
  __name: "FileItem",
  props: {
    item: {},
    view: {},
    showThumbnails: { type: Boolean },
    isSelected: { type: Boolean },
    isDragging: { type: Boolean },
    rowIndex: {},
    colIndex: {},
    showPath: { type: Boolean },
    explorerId: {}
  },
  emits: ["click", "dblclick", "contextmenu", "dragstart", "dragend"],
  setup(n, { emit: e }) {
    const t = n, o = e, s = ee(), l = s.fs, a = s.config, d = B(() => {
      const O = s.selectionFilterType;
      return !O || O === "both" ? !0 : O === "files" && t.item.type === "file" || O === "dirs" && t.item.type === "dir";
    }), c = B(() => {
      const O = s.selectionFilterMimeIncludes;
      return !O || !O.length || t.item.type === "dir" ? !0 : t.item.mime_type ? O.some((G) => t.item.mime_type?.startsWith(G)) : !1;
    }), v = B(() => d.value && c.value), p = B(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      v.value ? "" : "vf-explorer-item--unselectable"
    ]), w = B(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !v.value ? 0.5 : ""
    })), h = A(null);
    let x = !1, C = null, $ = null, m = !1;
    const { enabled: k } = Le(), g = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), f = B(() => g ? !1 : k("move")), y = () => {
      C && (clearTimeout(C), C = null), $ = null;
    }, P = (O) => {
      y(), $ = O, m = !1, O.stopPropagation(), C = setTimeout(() => {
        !$ || C === null || (m = !0, $.cancelable && $.preventDefault(), $.stopPropagation(), o("contextmenu", $), y());
      }, 500);
    }, S = (O) => {
      if (m) {
        O.preventDefault(), O.stopPropagation(), y();
        return;
      }
      setTimeout(() => {
        m || (y(), j(O));
      }, 100);
    }, E = (O) => {
      if (!$) return;
      const G = $.touches[0] || $.changedTouches[0], M = O.touches[0] || O.changedTouches[0];
      if (G && M) {
        const X = Math.abs(M.clientX - G.clientX), W = Math.abs(M.clientY - G.clientY);
        (X > 15 || W > 15) && y();
      }
    }, T = (O) => {
      g && O.type !== "click" || o("click", O);
    }, V = (O) => {
      if (m)
        return O.preventDefault(), O.stopPropagation(), !1;
      o("dragstart", O);
    }, j = (O) => {
      if (!x)
        x = !0, o("click", O), h.value = setTimeout(() => {
          x = !1;
        }, 300);
      else
        return x = !1, o("dblclick", O), !1;
    };
    return (O, G) => (u(), _("div", {
      class: ne(p.value),
      style: Ae(w.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: f.value,
      onTouchstartCapture: G[1] || (G[1] = (M) => P(M)),
      onTouchendCapture: G[2] || (G[2] = (M) => S(M)),
      onTouchmoveCapture: E,
      onTouchcancelCapture: G[3] || (G[3] = () => y()),
      onClick: T,
      onDblclick: G[4] || (G[4] = (M) => o("dblclick", M)),
      onContextmenu: G[5] || (G[5] = re((M) => o("contextmenu", M), ["prevent", "stop"])),
      onDragstart: V,
      onDragend: G[6] || (G[6] = (M) => o("dragend", M))
    }, [
      n.view === "grid" ? (u(), _("div", Jc, [
        i(l).isReadOnly(n.item) ? (u(), U(i(fn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : z("", !0),
        r("div", Zc, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (u(), _("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? i(s).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: G[0] || (G[0] = (M) => M.preventDefault())
          }, null, 40, eu)) : (u(), U(vn, {
            key: 1,
            item: n.item,
            ext: !0,
            view: n.view
          }, {
            icon: se((M) => [
              $e(O.$slots, "icon", Ke(je(M)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        r("span", tu, b(i(Ot)(n.item.basename)), 1)
      ])) : (u(), _("div", nu, [
        r("div", ou, [
          r("div", su, [
            N(vn, {
              item: n.item,
              view: n.view
            }, {
              icon: se((M) => [
                $e(O.$slots, "icon", Ke(je(M)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          r("span", iu, b(n.item.basename), 1),
          r("div", null, [
            i(l).isReadOnly(n.item) ? (u(), U(i(fn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : z("", !0)
          ])
        ]),
        n.showPath ? (u(), _("div", ru, b(n.item.path), 1)) : z("", !0),
        n.showPath ? z("", !0) : (u(), _("div", au, [
          n.item.file_size ? (u(), _("div", lu, b(i(s).filesize(n.item.file_size)), 1)) : z("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (u(), _("div", du, b(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : z("", !0)
      ])),
      i(k)("pinned") && i(a).get("pinnedFolders").find((M) => M.path === n.item.path) ? (u(), U(i(Nt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : z("", !0)
    ], 46, Xc));
  }
}), uu = ["data-row"], pn = /* @__PURE__ */ te({
  __name: "FileRow",
  props: {
    rowIndex: {},
    rowHeight: {},
    view: {},
    itemsPerRow: {},
    items: {},
    showThumbnails: { type: Boolean },
    showPath: { type: Boolean },
    isDraggingItem: { type: Function },
    isSelected: { type: Function },
    dragNDropEvents: { type: Function },
    explorerId: {}
  },
  emits: ["click", "dblclick", "contextmenu", "dragstart", "dragend"],
  setup(n, { emit: e }) {
    const t = n, o = e, s = B(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), l = B(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), a = B(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (d, c) => (u(), _("div", {
      class: ne(s.value),
      "data-row": n.rowIndex,
      style: Ae(l.value)
    }, [
      r("div", {
        class: ne(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Ae(a.value)
      }, [
        (u(!0), _(ue, null, pe(n.items, (v, p) => (u(), U(cu, Ie({
          key: v.path,
          item: v,
          view: n.view,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(v.path),
          "is-dragging": n.isDraggingItem(v.path),
          "row-index": n.rowIndex,
          "col-index": p,
          "explorer-id": n.explorerId
        }, He(n.dragNDropEvents(v)), {
          onClick: c[0] || (c[0] = (w) => o("click", w)),
          onDblclick: c[1] || (c[1] = (w) => o("dblclick", w)),
          onContextmenu: c[2] || (c[2] = (w) => o("contextmenu", w)),
          onDragstart: c[3] || (c[3] = (w) => o("dragstart", w)),
          onDragend: c[4] || (c[4] = (w) => o("dragend", w))
        }), {
          icon: se((w) => [
            $e(d.$slots, "icon", Ie({ ref_for: !0 }, w))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, uu));
  }
}), vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function fu(n, e) {
  return u(), _("svg", vu, [...e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const pu = { render: fu }, hu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function _u(n, e) {
  return u(), _("svg", hu, [...e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const mu = { render: _u }, Tt = /* @__PURE__ */ te({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (u(), _("div", null, [
      n.direction === "asc" ? (u(), U(i(pu), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : z("", !0),
      n.direction === "desc" ? (u(), U(i(mu), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : z("", !0)
    ]));
  }
}), gu = { class: "vuefinder__explorer__header" }, wu = /* @__PURE__ */ te({
  __name: "ExplorerHeader",
  setup(n) {
    const e = ee(), t = e.fs, { t: o } = e.i18n, s = q(t.sort);
    return (l, a) => (u(), _("div", gu, [
      r("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: a[0] || (a[0] = (d) => i(t).toggleSort("basename"))
      }, [
        ce(b(i(o)("Name")) + " ", 1),
        fe(N(Tt, {
          direction: i(s).order
        }, null, 8, ["direction"]), [
          [Ue, i(s).active && i(s).column === "basename"]
        ])
      ]),
      r("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: a[1] || (a[1] = (d) => i(t).toggleSort("file_size"))
      }, [
        ce(b(i(o)("Size")) + " ", 1),
        fe(N(Tt, {
          direction: i(s).order
        }, null, 8, ["direction"]), [
          [Ue, i(s).active && i(s).column === "file_size"]
        ])
      ]),
      r("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: a[2] || (a[2] = (d) => i(t).toggleSort("last_modified"))
      }, [
        ce(b(i(o)("Date")) + " ", 1),
        fe(N(Tt, {
          direction: i(s).order
        }, null, 8, ["direction"]), [
          [Ue, i(s).active && i(s).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function yu(n, e) {
  const {
    scrollContainer: t,
    itemWidth: o = 100,
    rowHeight: s,
    overscan: l = 2,
    containerPadding: a = 48,
    lockItemsPerRow: d
  } = e, c = n, v = () => typeof s == "number" ? s : s.value, p = () => o ? typeof o == "number" ? o : o.value : 100, w = () => a ? typeof a == "number" ? a : a.value : 0, h = A(0), x = A(6), C = A(600);
  let $ = null;
  const m = B(() => Math.ceil(c.value.length / x.value)), k = B(() => m.value * v()), g = B(() => {
    const O = v(), G = Math.max(0, Math.floor(h.value / O) - l), M = Math.min(
      m.value,
      Math.ceil((h.value + C.value) / O) + l
    );
    return { start: G, end: M };
  }), f = B(() => {
    const { start: O, end: G } = g.value;
    return Array.from({ length: G - O }, (M, X) => O + X);
  }), y = () => C.value, P = () => typeof d == "object" ? d.value : !1, S = () => {
    if (P()) {
      x.value = 1;
      return;
    }
    if (t.value) {
      const O = w(), G = t.value.clientWidth - O, M = p();
      M > 0 && (x.value = Math.max(Math.floor(G / M), 2));
    }
  }, E = (O) => {
    const G = O.target;
    h.value = G.scrollTop;
  };
  ie(
    () => c.value.length,
    () => {
      S();
    }
  ), o && typeof o != "number" && ie(o, () => {
    S();
  }), a && typeof a != "number" && ie(a, () => {
    S();
  }), s && typeof s != "number" && ie(s, () => {
  });
  const T = (O, G) => {
    if (!O || !Array.isArray(O))
      return [];
    const M = G * x.value;
    return O.slice(M, M + x.value);
  }, V = (O, G, M, X, W) => {
    if (!O || !Array.isArray(O))
      return [];
    const J = [];
    for (let I = G; I <= M; I++)
      for (let D = X; D <= W; D++) {
        const F = I * x.value + D;
        F < O.length && O[F] && J.push(O[F]);
      }
    return J;
  }, j = (O) => ({
    row: Math.floor(O / x.value),
    col: O % x.value
  });
  return ve(async () => {
    await Re(), t.value && (C.value = t.value.clientHeight || 600), S(), window.addEventListener("resize", () => {
      t.value && (C.value = t.value.clientHeight || 600), S();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((O) => {
      const G = O[0];
      G && (C.value = Math.round(G.contentRect.height)), S();
    }), $.observe(t.value));
  }), ke(() => {
    window.removeEventListener("resize", S), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: h,
    itemsPerRow: x,
    totalRows: m,
    totalHeight: k,
    visibleRange: g,
    visibleRows: f,
    updateItemsPerRow: S,
    handleScroll: E,
    getRowItems: T,
    getItemsInRange: V,
    getItemPosition: j,
    getContainerHeight: y
  };
}
function bu(n) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: o,
    getKey: s,
    selectionObject: l,
    rowHeight: a,
    itemWidth: d,
    osInstance: c
  } = n, v = () => typeof d == "number" ? d : d.value, p = Math.floor(Math.random() * 2 ** 32).toString(), w = ee(), h = w.fs, x = q(h.selectedKeys), C = q(h.sortedFiles), $ = B(() => {
    const D = /* @__PURE__ */ new Map();
    return C.value && C.value.forEach((F) => {
      D.set(s(F), F);
    }), D;
  }), m = A(/* @__PURE__ */ new Set()), k = A(!1), g = A(!1), f = (D) => D.map((F) => F.getAttribute("data-key")).filter((F) => !!F), y = (D) => {
    D.selection.clearSelection(!0, !0);
  }, P = (D) => {
    if (x.value && x.value.size > 0) {
      const F = document.querySelectorAll(`.file-item-${p}[data-key]`), L = /* @__PURE__ */ new Map();
      F.forEach((Y) => {
        const le = Y.getAttribute("data-key");
        le && L.set(le, Y);
      });
      const R = [];
      x.value.forEach((Y) => {
        const le = L.get(Y);
        le && S(Y) && R.push(le);
      }), R.forEach((Y) => {
        D.selection.select(Y, !0);
      });
    }
  }, S = (D) => {
    const F = $.value.get(D);
    if (!F) return !1;
    const L = w.selectionFilterType, R = w.selectionFilterMimeIncludes;
    return L === "files" && F.type === "dir" || L === "dirs" && F.type === "file" ? !1 : R && Array.isArray(R) && R.length > 0 ? F.type === "dir" ? !0 : F.mime_type ? R.some((Y) => F.mime_type?.startsWith(Y)) : !1 : !0;
  }, E = (D) => {
    if (w.selectionMode === "single")
      return !1;
    k.value = !1, !D.event?.metaKey && !D.event?.ctrlKey && (g.value = !0), D.selection.resolveSelectables(), y(D), P(D);
  }, T = A(0), V = ({ event: D, selection: F }) => {
    T.value = (l.value?.getAreaLocation().y1 ?? 0) - (w.root.getBoundingClientRect().top ?? 0);
    const L = document.querySelector(
      ".selection-area-container"
    );
    if (L && (L.dataset.theme = w.theme.current), w.selectionMode === "single")
      return;
    const R = D;
    R && "type" in R && R.type === "touchend" && R.preventDefault();
    const Y = D;
    !Y?.ctrlKey && !Y?.metaKey && (h.clearSelection(), F.clearSelection(!0, !0)), m.value.clear();
  }, j = (D) => {
    if (w.selectionMode === "single")
      return;
    const F = f(D.store.changed.added), L = f(D.store.changed.removed);
    g.value = !1, k.value = !0, F.forEach((R) => {
      x.value && !x.value.has(R) && S(R) && (m.value.add(R), h.select(R, w.selectionMode || "multiple"));
    }), L.forEach((R) => {
      document.querySelector(`[data-key="${R}"]`) && $.value.has(R) && m.value.delete(R), h.deselect(R);
    }), D.selection.resolveSelectables(), P(D);
  }, O = () => {
    m.value.clear();
  }, G = (D) => {
    if (!D.event)
      return;
    const F = document.querySelector(".scroller-" + p);
    if (!F)
      return;
    const L = F.getBoundingClientRect(), R = L.left, Y = L.top;
    let le = F.scrollTop;
    if (c?.value) {
      const { viewport: Be } = c.value.elements();
      Be && (le = Be.scrollTop);
    }
    const he = l.value?.getAreaLocation();
    if (!he)
      return;
    const xe = Math.min(he.x1, he.x2), ge = le + Math.min(he.y1, he.y2), We = Math.max(he.x1, he.x2), qe = le + Math.max(he.y1, he.y2), we = 4, Z = v();
    let de = Math.floor((xe - R - we) / Z), ae = Math.floor((We - R - we) / Z);
    const ye = xe - R - we - de * Z, Ye = We - R - we - ae * Z;
    ye > Z - we && (de = de + 1), Ye < we && (ae = ae - 1);
    const Zt = Math.max(0, de), H = Math.min(e.value - 1, ae);
    let K = Math.floor((ge - Y - we) / a.value), Q = Math.floor((qe - Y - we) / a.value);
    const oe = ge - Y - we - K * a.value, ze = qe - Y - we - Q * a.value, Ee = Math.floor((t.value - we) / a.value);
    oe > a.value - we && (K = K + 1), ze < we && (Q = Q - 1);
    const Me = Math.max(0, K), et = Math.min(Q, Ee), Se = o(
      C.value,
      Me,
      et,
      Zt,
      H
    ), Ct = document.querySelectorAll(`.file-item-${p}[data-key]`), en = /* @__PURE__ */ new Map();
    Ct.forEach((Be) => {
      const tt = Be.getAttribute("data-key");
      tt && en.set(tt, Be);
    });
    const Ft = [];
    if (Se.forEach((Be) => {
      const tt = s(Be);
      en.get(tt) || Ft.push(tt);
    }), Ft.length > 0) {
      const Be = w.selectionMode || "multiple";
      h.selectMultiple(Ft, Be);
    }
  }, M = (D) => {
    G(D), y(D), P(D), h.setSelectedCount(x.value?.size || 0), k.value = !1;
  }, X = () => {
    let D = [".scroller-" + p];
    if (c?.value) {
      const { viewport: F } = c.value.elements();
      F && (D = F);
    }
    l.value = new io({
      selectables: [".file-item-" + p + ":not(.vf-explorer-item--unselectable)"],
      boundaries: D,
      selectionContainerClass: "selection-area-container",
      behaviour: {
        overlap: "invert",
        intersect: "touch",
        startThreshold: 0,
        triggers: [0],
        scrolling: {
          speedDivider: 10,
          manualSpeed: 750,
          startScrollMargins: { x: 0, y: 10 }
        }
      },
      features: {
        touch: !0,
        range: !0,
        deselectOnBlur: !0,
        singleTap: {
          allow: !1,
          intersect: "native"
        }
      }
    }), l.value.on("beforestart", E), l.value.on("start", V), l.value.on("move", j), l.value.on("stop", M);
  }, W = () => {
    l.value && (l.value.destroy(), l.value = null);
  }, J = () => {
    l.value && (Array.from(
      x.value ?? /* @__PURE__ */ new Set()
    ).forEach((F) => {
      S(F) || h.deselect(F);
    }), W(), X());
  }, I = (D) => {
    g.value && (l.value?.clearSelection(), O(), g.value = !1);
    const F = D;
    !m.value.size && !g.value && !F?.ctrlKey && !F?.metaKey && (h.clearSelection(), l.value?.clearSelection());
  };
  return ve(() => {
    const D = (F) => {
      !F.buttons && k.value && (k.value = !1);
    };
    document.addEventListener("dragleave", D), ke(() => {
      document.removeEventListener("dragleave", D);
    });
  }), {
    explorerId: p,
    isDragging: k,
    initializeSelectionArea: X,
    updateSelectionArea: J,
    handleContentClick: I
  };
}
function ku(n) {
  const e = (o) => {
    if (!o)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const s = n.selectionFilterType, l = n.selectionFilterMimeIncludes, a = !s || s === "both" || s === "files" && o.type === "file" || s === "dirs" && o.type === "dir";
    let d = !0;
    return l && Array.isArray(l) && l.length > 0 && (o.type === "dir" ? d = !0 : o.mime_type ? d = l.some((c) => o.mime_type.startsWith(c)) : d = !1), { typeAllowed: a, mimeAllowed: d };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (o) => {
      const { typeAllowed: s, mimeAllowed: l } = e(o);
      return s && l;
    }
  };
}
function xu(n) {
  const e = (o) => ({
    item: o,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (o, s, l) => {
      const a = e(o);
      if (o.type === "file" && s) {
        if (n.emitter.emit("vf-file-dclick", a), a.defaultPrevented) return;
      } else if (o.type === "dir" && l && (n.emitter.emit("vf-folder-dclick", a), a.defaultPrevented))
        return;
      const d = n.contextMenuItems?.find((c) => c.show(n, {
        items: [o],
        target: o,
        searchQuery: ""
      }));
      d && d.action(n, [o]);
    }
  };
}
function $u(n, e, t, o, s, l, a) {
  const d = n.fs, { canSelectItem: c } = ku(n), { openItem: v } = xu(n), p = (m) => {
    const k = m.target?.closest(".file-item-" + e);
    if (!k) return null;
    const g = String(k.getAttribute("data-key")), f = t.value?.find((y) => y.path === g);
    return { key: g, item: f };
  }, w = () => {
    const m = o.value;
    return t.value?.filter((k) => m?.has(k.path)) || [];
  };
  return {
    handleItemClick: (m) => {
      const k = p(m);
      if (!k) return;
      const { key: g, item: f } = k, y = m;
      if (!c(f))
        return;
      const P = n.selectionMode || "multiple";
      !y?.ctrlKey && !y?.metaKey && (m.type !== "touchstart" || !d.isSelected(g)) && (d.clearSelection(), s.value?.clearSelection(!0, !0)), s.value?.resolveSelectables(), m.type === "touchstart" && d.isSelected(g) ? d.select(g, P) : d.toggleSelect(g, P), d.setSelectedCount(o.value?.size || 0);
    },
    handleItemDblClick: (m) => {
      const k = p(m);
      if (!k) return;
      const { item: g } = k;
      c(g) && g && v(g, l, a);
    },
    handleItemContextMenu: (m) => {
      m.preventDefault(), m.stopPropagation();
      const k = p(m);
      if (!k) return;
      const { key: g, item: f } = k;
      c(f) && (o.value?.has(g) || (d.clearSelection(), d.select(g)), n.emitter.emit("vf-contextmenu-show", {
        event: m,
        items: w(),
        target: f
      }));
    },
    handleContentContextMenu: (m) => {
      m.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: m, items: w() });
    },
    getSelectedItems: w
  };
}
function Su(n, e) {
  const t = A(null);
  return ve(() => {
    if (st.plugin([so]), n.value) {
      const o = st(
        n.value,
        {
          scrollbars: { theme: "vf-scrollbars-theme" }
        },
        {
          initialized: (s) => {
            t.value = s;
            const { viewport: l } = s.elements();
            l && l.addEventListener("scroll", e);
          },
          updated: (s) => {
            const { viewport: l } = s.elements();
          }
        }
      );
      t.value = o;
    }
  }), ke(() => {
    if (t.value) {
      const { viewport: o } = t.value.elements();
      o && o.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
function Cu(n, e) {
  const t = A(null);
  return ve(() => {
    n.value && (t.value = new bn({
      elements_selector: ".lazy",
      container: n.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), Yn(() => {
    t.value && t.value.update();
  }), ke(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const Fu = { class: "vuefinder__explorer__container" }, Pu = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Du = /* @__PURE__ */ te({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = ee(), o = ft(t, ["vuefinder__drag-over"]), s = Xe("dragImage"), l = hn(null), a = Xe("scrollContainer"), d = Xe("scrollContent"), c = t.fs, v = t.config, p = q(v.state), w = q(c.sortedFiles), h = q(c.selectedKeys), x = q(c.loading), C = (Z) => h.value?.has(Z) ?? !1, $ = B(() => {
      if (p.value?.view === "grid") {
        const ye = p.value?.gridItemHeight ?? 80, Ye = p.value?.gridItemGap ?? 8;
        return ye + Ye * 2;
      }
      const de = p.value?.listItemHeight ?? 32, ae = p.value?.listItemGap ?? 2;
      return de + ae * 2;
    }), m = B(() => {
      if (p.value?.view === "grid") {
        const de = p.value?.gridItemWidth ?? 96, ae = p.value?.gridItemGap ?? 8;
        return de + ae * 2;
      }
      return 104;
    }), k = B(() => p.value?.view === "grid" ? (p.value?.gridItemGap ?? 8) * 2 : 0), { t: g } = t.i18n, {
      itemsPerRow: f,
      totalHeight: y,
      visibleRows: P,
      handleScroll: S,
      getRowItems: E,
      getItemsInRange: T,
      updateItemsPerRow: V
    } = yu(
      B(() => w.value ?? []),
      {
        scrollContainer: a,
        itemWidth: m,
        rowHeight: $,
        overscan: 2,
        containerPadding: k,
        lockItemsPerRow: B(() => p.value.view === "list")
      }
    ), { osInstance: j } = Su(a, S), { explorerId: O, isDragging: G, initializeSelectionArea: M, updateSelectionArea: X, handleContentClick: W } = bu({
      itemsPerRow: f,
      totalHeight: y,
      getItemsInRange: T,
      getKey: (Z) => Z.path,
      selectionObject: l,
      rowHeight: $,
      itemWidth: m,
      osInstance: j
    }), J = A(null), I = (Z) => {
      if (!Z || !J.value) return !1;
      const de = h.value?.has(J.value) ?? !1;
      return G.value && (de ? h.value?.has(Z) ?? !1 : Z === J.value);
    };
    ie(
      () => v.get("view"),
      (Z) => {
        Z === "list" ? f.value = 1 : V();
      },
      { immediate: !0 }
    ), ie(f, (Z) => {
      v.get("view") === "list" && Z !== 1 && (f.value = 1);
    });
    const D = (Z) => w.value?.[Z];
    Cu(a, t);
    const { handleItemClick: F, handleItemDblClick: L, handleItemContextMenu: R, handleContentContextMenu: Y } = $u(
      t,
      O,
      w,
      h,
      l,
      e.onFileDclick,
      e.onFolderDclick
    );
    ve(() => {
      const Z = () => {
        l.value || M(), l.value && l.value.on("beforestart", ({ event: de }) => {
          const ae = de?.target === d.value;
          if (!de?.metaKey && !de?.ctrlKey && !de?.altKey && !ae)
            return !1;
        });
      };
      if (j.value)
        Z();
      else {
        const de = setInterval(() => {
          j.value && (clearInterval(de), Z());
        }, 50);
        setTimeout(() => {
          clearInterval(de), l.value || Z();
        }, 500);
      }
      ie(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], X, {
        deep: !0
      });
    });
    const le = (Z) => {
      if (!(t.features?.move ?? !1) || Z.altKey || Z.ctrlKey || Z.metaKey)
        return Z.preventDefault(), !1;
      G.value = !0;
      const ae = Z.target?.closest(
        ".file-item-" + O
      );
      if (J.value = ae ? String(ae.dataset.key) : null, Z.dataTransfer && J.value) {
        Z.dataTransfer.setDragImage(s.value, 0, 15), Z.dataTransfer.effectAllowed = "all", Z.dataTransfer.dropEffect = "copy";
        const ye = h.value?.has(J.value) ? Array.from(h.value) : [J.value];
        Z.dataTransfer.setData("items", JSON.stringify(ye)), c.setDraggedItem(J.value);
      }
    }, he = () => {
      J.value = null;
    };
    let xe = null, ge = null;
    const We = (Z) => {
      Z.target?.closest(".file-item-" + O) || (ge = Z, xe && clearTimeout(xe), xe = setTimeout(() => {
        ge && (ge.cancelable && ge.preventDefault(), ge.stopPropagation(), Y(ge)), ge = null, xe = null;
      }, 500));
    }, qe = (Z) => {
      xe && (clearTimeout(xe), xe = null), ge = null;
    }, we = (Z) => {
      if (!ge) return;
      const de = ge.touches[0] || ge.changedTouches[0], ae = Z.touches[0] || Z.changedTouches[0];
      if (de && ae) {
        const ye = Math.abs(ae.clientX - de.clientX), Ye = Math.abs(ae.clientY - de.clientY);
        (ye > 15 || Ye > 15) && (xe && (clearTimeout(xe), xe = null), ge = null);
      }
    };
    return (Z, de) => (u(), _("div", Fu, [
      i(p).view === "list" ? (u(), U(wu, { key: 0 })) : z("", !0),
      r("div", {
        ref_key: "scrollContainer",
        ref: a,
        class: ne(["vuefinder__explorer__selector-area", "scroller-" + i(O)])
      }, [
        i(v).get("loadingIndicator") === "linear" && i(x) ? (u(), _("div", Pu)) : z("", !0),
        r("div", {
          ref_key: "scrollContent",
          ref: d,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Ae({ height: `${i(y)}px`, position: "relative", width: "100%" }),
          onContextmenu: de[0] || (de[0] = re(
            //@ts-ignore
            (...ae) => i(Y) && i(Y)(...ae),
            ["self", "prevent"]
          )),
          onClick: de[1] || (de[1] = re(
            //@ts-ignore
            (...ae) => i(W) && i(W)(...ae),
            ["self"]
          )),
          onTouchstartCapture: re(We, ["self"]),
          onTouchendCapture: re(qe, ["self"]),
          onTouchmoveCapture: re(we, ["self"]),
          onTouchcancelCapture: re(qe, ["self"])
        }, [
          r("div", {
            ref_key: "dragImage",
            ref: s,
            class: "vuefinder__explorer__drag-item"
          }, [
            N(Gc, {
              count: J.value && i(h).has(J.value) ? i(h).size : 1
            }, null, 8, ["count"])
          ], 512),
          i(p).view === "grid" ? (u(!0), _(ue, { key: 0 }, pe(i(P), (ae) => (u(), U(pn, {
            key: ae,
            "row-index": ae,
            "row-height": $.value,
            view: "grid",
            "items-per-row": i(f),
            items: i(E)(i(w), ae),
            "show-thumbnails": i(p).showThumbnails,
            "is-dragging-item": I,
            "is-selected": C,
            "drag-n-drop-events": (ye) => i(o).events(ye),
            "explorer-id": i(O),
            onClick: i(F),
            onDblclick: i(L),
            onContextmenu: i(R),
            onDragstart: le,
            onDragend: he
          }, {
            icon: se((ye) => [
              $e(Z.$slots, "icon", Ie({ ref_for: !0 }, ye))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), _(ue, { key: 1 }, pe(i(P), (ae) => (u(), U(pn, {
            key: ae,
            "row-index": ae,
            "row-height": $.value,
            view: "list",
            items: D(ae) ? [D(ae)] : [],
            "is-dragging-item": I,
            "is-selected": C,
            "drag-n-drop-events": (ye) => i(o).events(ye),
            "explorer-id": i(O),
            onClick: i(F),
            onDblclick: i(L),
            onContextmenu: i(R),
            onDragstart: le,
            onDragend: he
          }, {
            icon: se((ye) => [
              $e(Z.$slots, "icon", Ie({ ref_for: !0 }, ye))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), Eu = ["href", "download"], Tu = ["onClick"], Mu = /* @__PURE__ */ te({
  __name: "ContextMenu",
  setup(n) {
    const e = ee(), t = A(null), o = A([]);
    let s = null, l = null, a = null, d = [], c = null;
    const v = gt({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (x) => {
      o.value = x;
    });
    const p = (x) => x.link(e, o.value), w = (x) => {
      e.emitter.emit("vf-contextmenu-hide"), x.action(e, o.value);
    };
    e.emitter.on("vf-contextmenu-show", (x) => {
      const { event: C, items: $, target: m = null } = x || {};
      v.items = (e.contextMenuItems || []).filter((k) => k.show(e, {
        items: $,
        target: m
      })).sort((k, g) => {
        const f = k.order ?? 1 / 0, y = g.order ?? 1 / 0;
        return f - y;
      }), m ? $.length > 1 && $.some((k) => k.path === m.path) ? e.emitter.emit("vf-context-selected", $) : e.emitter.emit("vf-context-selected", [m]) : e.emitter.emit("vf-context-selected", []), h(C);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      v.active = !1, s && (s(), s = null), a && (d.forEach((x) => {
        x === window ? window.removeEventListener("scroll", a, !0) : x.removeEventListener("scroll", a, !0);
      }), a = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null, v.positions = {};
    });
    const h = async (x) => {
      s && (s(), s = null);
      const $ = ((S) => {
        if ("clientX" in S && "clientY" in S)
          return { x: S.clientX, y: S.clientY };
        const E = "touches" in S && S.touches[0] || "changedTouches" in S && S.changedTouches[0];
        return E ? { x: E.clientX, y: E.clientY } : { x: 0, y: 0 };
      })(x);
      if (l = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: $.x,
          y: $.y,
          top: $.y,
          left: $.x,
          right: $.x,
          bottom: $.y
        })
      }, v.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, v.active = !0, await Re(), !t.value || !l) return;
      await new Promise((S) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(S);
        });
      });
      const m = [
        it(8),
        rt({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        at({ padding: 16 })
      ];
      let k = 0, g = 0;
      try {
        const S = await Je(l, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: m
        });
        k = S.x, g = S.y;
      } catch (S) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", S);
        return;
      }
      v.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${k}px`,
        top: `${g}px`,
        opacity: "0",
        visibility: "visible",
        transform: "translateY(-8px)",
        transition: "opacity 150ms ease-out, transform 150ms ease-out"
      }, requestAnimationFrame(() => {
        t.value && (v.positions = {
          ...v.positions,
          opacity: "1",
          transform: "translateY(0)"
        });
      });
      const y = ((S) => {
        const E = [];
        let T = S;
        for (; T && T !== document.body && T !== document.documentElement; ) {
          const V = window.getComputedStyle(T), j = V.overflow + V.overflowX + V.overflowY;
          (j.includes("scroll") || j.includes("auto")) && E.push(T), T = T.parentElement;
        }
        return E;
      })(t.value);
      d = [window, ...y], a = () => {
        v.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const P = a;
      P && d.forEach((S) => {
        S === window ? window.addEventListener("scroll", P, !0) : S.addEventListener("scroll", P, !0);
      }), c = (S) => {
        if (!v.active) return;
        const E = S.target;
        if (!E || t.value && t.value.contains(E))
          return;
        const T = e.root;
        T && T.contains(E) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        c && (document.addEventListener("mousedown", c, !0), document.addEventListener("touchstart", c, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !l))
          try {
            s = Lt(l, t.value, async () => {
              if (!(!l || !t.value))
                try {
                  const { x: S, y: E } = await Je(l, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: m
                  });
                  v.positions = {
                    ...v.positions,
                    left: `${S}px`,
                    top: `${E}px`
                  };
                } catch (S) {
                  console.warn("Floating UI positioning error:", S);
                }
            });
          } catch (S) {
            console.warn("Floating UI autoUpdate setup error:", S), s = null;
          }
      }, 200);
    };
    return ke(() => {
      s && (s(), s = null), a && (d.forEach((x) => {
        x === window ? window.removeEventListener("scroll", a, !0) : x.removeEventListener("scroll", a, !0);
      }), a = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null;
    }), (x, C) => fe((u(), _("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: ne([{
        "vuefinder__context-menu--active": v.active,
        "vuefinder__context-menu--inactive": !v.active
      }, "vuefinder__context-menu"]),
      style: Ae(v.positions)
    }, [
      (u(!0), _(ue, null, pe(v.items, ($) => (u(), _("li", {
        key: $.title,
        class: "vuefinder__context-menu__item"
      }, [
        $.link ? (u(), _("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: p($),
          download: p($),
          onClick: C[0] || (C[0] = (m) => i(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          r("span", null, b($.title(i(e).i18n)), 1)
        ], 8, Eu)) : (u(), _("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (m) => w($)
        }, [
          r("span", null, b($.title(i(e).i18n)), 1)
        ], 8, Tu))
      ]))), 128))
    ], 6)), [
      [Ue, v.active]
    ]);
  }
}), Iu = { class: "vuefinder__status-bar__wrapper" }, Au = { class: "vuefinder__status-bar__storage" }, Ou = ["title"], Lu = { class: "vuefinder__status-bar__storage-icon" }, zu = ["value"], Ru = ["value"], Vu = { class: "vuefinder__status-bar__info space-x-2" }, Bu = { key: 0 }, Uu = { key: 1 }, Nu = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Hu = { class: "vuefinder__status-bar__actions" }, Ku = /* @__PURE__ */ te({
  __name: "Statusbar",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = q(o.sortedFiles), l = q(o.path), a = q(o.selectedCount), d = q(o.storages), c = q(o.selectedItems), v = q(o.path), p = (m) => {
      const k = m.target.value;
      e.adapter.open(k + "://");
    }, w = B(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((m, k) => m + (k.file_size || 0), 0)), h = B(() => d.value), x = B(() => s.value), C = B(() => a.value || 0), $ = B(() => c.value || []);
    return (m, k) => (u(), _("div", Iu, [
      r("div", Au, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: i(t)("Storage")
        }, [
          r("div", Lu, [
            N(i(Ht))
          ]),
          r("select", {
            name: "vuefinder-media-selector",
            value: i(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: p
          }, [
            (u(!0), _(ue, null, pe(h.value, (g) => (u(), _("option", {
              key: g,
              value: g
            }, b(g), 9, Ru))), 128))
          ], 40, zu),
          k[0] || (k[0] = r("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Ou),
        r("div", Vu, [
          C.value === 0 ? (u(), _("span", Bu, b(x.value.length) + " " + b(i(t)("items")), 1)) : (u(), _("span", Uu, [
            ce(b(C.value) + " " + b(i(t)("selected")) + " ", 1),
            w.value ? (u(), _("span", Nu, b(i(e).filesize(w.value)), 1)) : z("", !0)
          ]))
        ])
      ]),
      r("div", Hu, [
        $e(m.$slots, "actions", {
          path: i(v).path,
          count: C.value || 0,
          selected: $.value
        })
      ])
    ]));
  }
}), ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function qu(n, e) {
  return u(), _("svg", ju, [...e[0] || (e[0] = [
    r("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Gu = { render: qu };
function Hn(n, e) {
  const t = n.findIndex((o) => o.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const Wu = { class: "vuefinder__folder-loader-indicator" }, Yu = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Kn = /* @__PURE__ */ te({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Qn({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, t = ee(), o = wn(n, "modelValue"), s = A(!1);
    ie(
      () => o.value,
      () => l()
    );
    const l = async () => {
      s.value = !0;
      try {
        const d = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        Hn(t.treeViewData, { path: e.path, type: "dir", folders: d });
      } catch (a) {
        Fe(a, "Failed to fetch subfolders");
      } finally {
        s.value = !1;
      }
    };
    return (a, d) => (u(), _("div", Wu, [
      s.value ? (u(), U(i(St), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), _("div", Yu, [
        o.value ? (u(), U(i($t), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : z("", !0),
        o.value ? z("", !0) : (u(), U(i(xt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Qu = { key: 0 }, Xu = { class: "vuefinder__treesubfolderlist__no-folders" }, Ju = { class: "vuefinder__treesubfolderlist__item-content" }, Zu = ["onClick"], ev = ["title", "onDblclick", "onClick"], tv = { class: "vuefinder__treesubfolderlist__item-icon" }, nv = { class: "vuefinder__treesubfolderlist__subfolder" }, ov = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, sv = /* @__PURE__ */ te({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = ee(), t = e.fs, o = ft(e, ["vuefinder__drag-over"]), s = A({}), l = e.config, a = q(l.state), { t: d } = e.i18n, c = q(t.path), v = n, p = A(null), w = A(50);
    ve(() => {
      v.path === v.storage + "://" && p.value && st(p.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const h = B(() => {
      const f = e.treeViewData.find((y) => y.path === v.path)?.folders || [];
      return f.length > w.value ? f.slice(0, w.value) : f;
    }), x = B(() => e.treeViewData.find((f) => f.path === v.path)?.folders?.length || 0), C = B(() => x.value > w.value), $ = B(() => `${v.storage}://`), m = (g, f) => g === f || g.startsWith(`${f}/`);
    ie(
      h,
      (g) => {
        const f = a.value.expandTreeByDefault && v.path === $.value, y = a.value.expandedTreePaths || [];
        g.forEach((P) => {
          const S = y.some(
            (E) => m(E, P.path)
          );
          (f || S) && s.value[P.path] === void 0 && (s.value[P.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const k = () => {
      w.value += 50;
    };
    return (g, f) => {
      const y = mn("TreeSubfolderList", !0);
      return u(), _("ul", {
        ref_key: "parentSubfolderList",
        ref: p,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        h.value.length ? z("", !0) : (u(), _("li", Qu, [
          r("div", Xu, b(i(d)("No folders")), 1)
        ])),
        (u(!0), _(ue, null, pe(h.value, (P) => (u(), _("li", {
          key: P.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", Ju, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (S) => s.value[P.path] = !s.value[P.path]
            }, [
              N(Kn, {
                modelValue: s.value[P.path],
                "onUpdate:modelValue": (S) => s.value[P.path] = S,
                storage: n.storage,
                path: P.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, Zu),
            r("div", Ie({
              class: "vuefinder__treesubfolderlist__item-link",
              title: P.path
            }, He(
              i(o).events({
                ...P,
                dir: P.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (S) => s.value[P.path] = !s.value[P.path],
              onClick: (S) => i(e).adapter.open(P.path)
            }), [
              r("div", tv, [
                i(c)?.path === P.path ? (u(), U(i(Kt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), U(i(Ve), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              r("div", {
                class: ne(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": i(c).path === P.path
                }])
              }, b(P.basename), 3)
            ], 16, ev)
          ]),
          r("div", nv, [
            fe(N(y, {
              storage: v.storage,
              path: P.path
            }, null, 8, ["storage", "path"]), [
              [Ue, s.value[P.path]]
            ])
          ])
        ]))), 128)),
        C.value ? (u(), _("li", ov, [
          r("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: k
          }, b(i(d)("load more")), 1)
        ])) : z("", !0)
      ], 512);
    };
  }
}), iv = /* @__PURE__ */ te({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = ee(), t = e.fs, o = e.config, s = n, l = q(o.state), a = B(() => {
      const x = l.value.expandedTreePaths || [], C = `${s.storage}://`;
      return x.some(
        ($) => $ === C || $.startsWith(`${C}`)
      );
    }), d = A(l.value.expandTreeByDefault || a.value), c = ft(e, ["vuefinder__drag-over"]), v = q(t.path), p = B(() => s.storage === v.value?.storage);
    ie(
      () => ({
        expandTreeByDefault: l.value.expandTreeByDefault,
        hasExpandedPathInStorage: a.value
      }),
      (x) => {
        (x.expandTreeByDefault || x.hasExpandedPathInStorage) && (d.value = !0);
      }
    );
    const w = {
      storage: s.storage,
      path: s.storage + "://",
      dir: s.storage + "://",
      type: "dir",
      basename: s.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function h(x) {
      x === v.value?.storage ? d.value = !d.value : e.adapter.open(x + "://");
    }
    return (x, C) => (u(), _(ue, null, [
      r("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: C[2] || (C[2] = ($) => h(n.storage))
      }, [
        r("div", Ie({
          class: ["vuefinder__treestorageitem__info", p.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, He(i(c).events(w), !0)), [
          r("div", {
            class: ne(["vuefinder__treestorageitem__icon", p.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            N(i(Ht))
          ], 2),
          r("div", null, b(n.storage), 1)
        ], 16),
        r("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: C[1] || (C[1] = re(($) => d.value = !d.value, ["stop"]))
        }, [
          N(Kn, {
            modelValue: d.value,
            "onUpdate:modelValue": C[0] || (C[0] = ($) => d.value = $),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      fe(N(sv, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ue, d.value]
      ])
    ], 64));
  }
}), rv = { class: "vuefinder__folder-indicator" }, av = { class: "vuefinder__folder-indicator--icon" }, lv = /* @__PURE__ */ te({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = wn(n, "modelValue");
    return (t, o) => (u(), _("div", rv, [
      r("div", av, [
        e.value ? (u(), U(i($t), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : z("", !0),
        e.value ? z("", !0) : (u(), U(i(xt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), dv = {
  key: 0,
  class: "vuefinder__treeview__header"
}, cv = { class: "vuefinder__treeview__pinned-label" }, uv = { class: "vuefinder__treeview__pin-text text-nowrap" }, vv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, fv = ["onClick"], pv = ["title"], hv = ["onClick"], _v = { key: 0 }, mv = { class: "vuefinder__treeview__no-pinned" }, gv = /* @__PURE__ */ te({
  __name: "TreeView",
  setup(n) {
    const e = ee(), { enabled: t } = Le(), { t: o } = e.i18n, { getStore: s, setStore: l } = e.storage, a = e.fs, d = e.config, c = q(d.state), v = q(a.sortedFiles), p = q(a.storages), w = B(() => p.value || []), h = q(a.path), x = ft(e, ["vuefinder__drag-over"]), C = A(190), $ = A(s("pinned-folders-opened", !0));
    ie($, (f) => l("pinned-folders-opened", f));
    const m = (f) => {
      const y = d.get("pinnedFolders");
      d.set("pinnedFolders", y.filter((P) => P.path !== f.path));
    }, k = (f) => {
      const y = f.clientX, P = f.target.parentElement;
      if (!P) return;
      const S = P.getBoundingClientRect().width;
      P.classList.remove("transition-[width]"), P.classList.add("transition-none");
      const E = (V) => {
        C.value = S + V.clientX - y, C.value < 50 && (C.value = 0, d.set("showTreeView", !1)), C.value > 50 && d.set("showTreeView", !0);
      }, T = () => {
        const V = P.getBoundingClientRect();
        C.value = V.width, P.classList.add("transition-[width]"), P.classList.remove("transition-none"), window.removeEventListener("mousemove", E), window.removeEventListener("mouseup", T);
      };
      window.addEventListener("mousemove", E), window.addEventListener("mouseup", T);
    }, g = A(null);
    return ve(() => {
      g.value && st(g.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ie(v, (f) => {
      const y = f.filter((P) => P.type === "dir");
      Hn(e.treeViewData, {
        path: h.value.path || "",
        folders: y.map((P) => ({
          storage: P.storage,
          path: P.path,
          basename: P.basename,
          type: "dir"
        }))
      });
    }), (f, y) => (u(), _(ue, null, [
      r("div", {
        class: ne(["vuefinder__treeview__overlay", i(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: y[0] || (y[0] = (P) => i(d).toggle("showTreeView"))
      }, null, 2),
      r("div", {
        style: Ae(
          i(c).showTreeView ? "min-width:100px;max-width:75%; width: " + C.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        r("div", {
          ref_key: "treeViewScrollElement",
          ref: g,
          class: "vuefinder__treeview__scroll"
        }, [
          i(t)("pinned") ? (u(), _("div", dv, [
            r("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: y[2] || (y[2] = (P) => $.value = !$.value)
            }, [
              r("div", cv, [
                N(i(Nt), { class: "vuefinder__treeview__pin-icon" }),
                r("div", uv, b(i(o)("Pinned Folders")), 1)
              ]),
              N(lv, {
                modelValue: $.value,
                "onUpdate:modelValue": y[1] || (y[1] = (P) => $.value = P)
              }, null, 8, ["modelValue"])
            ]),
            $.value ? (u(), _("ul", vv, [
              (u(!0), _(ue, null, pe(i(c).pinnedFolders, (P) => (u(), _("li", {
                key: P.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                r("div", Ie({ class: "vuefinder__treeview__pinned-folder" }, He(i(x).events(P), !0), {
                  onClick: (S) => i(e).adapter.open(P.path)
                }), [
                  i(h).path !== P.path ? (u(), U(i(Ve), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : z("", !0),
                  i(h).path === P.path ? (u(), U(i(Kt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : z("", !0),
                  r("div", {
                    title: P.path,
                    class: ne(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": i(h).path === P.path
                    }])
                  }, b(P.basename), 11, pv)
                ], 16, fv),
                r("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (S) => m(P)
                }, [
                  N(i(Gu), { class: "vuefinder__treeview__remove-icon" })
                ], 8, hv)
              ]))), 128)),
              i(c).pinnedFolders.length ? z("", !0) : (u(), _("li", _v, [
                r("div", mv, b(i(o)("No folders pinned")), 1)
              ]))
            ])) : z("", !0)
          ])) : z("", !0),
          (u(!0), _(ue, null, pe(w.value, (P) => (u(), _("div", {
            key: P,
            class: "vuefinder__treeview__storage"
          }, [
            N(iv, { storage: P }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        r("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: k
        }, null, 32)
      ], 4)
    ], 64));
  }
}), be = {
  new_folder: "new_folder",
  selectAll: "selectAll",
  pinFolder: "pinFolder",
  unpinFolder: "unpinFolder",
  delete: "delete",
  refresh: "refresh",
  preview: "preview",
  open: "open",
  openDir: "openDir",
  download: "download",
  download_archive: "download_archive",
  archive: "archive",
  unarchive: "unarchive",
  rename: "rename",
  move: "move",
  copy: "copy",
  paste: "paste"
};
function wv(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function _e(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, o) => !(e.needsSearchQuery !== !!o.searchQuery || e.target !== void 0 && e.target !== wv(o) || e.targetType !== void 0 && e.targetType !== o.target?.type || e.mimeType !== void 0 && e.mimeType !== o.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function nt(...n) {
  return (e, t) => n.some((o) => o(e, t));
}
function ot(...n) {
  return (e, t) => n.every((o) => o(e, t));
}
const jn = [
  {
    id: be.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: _e({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: be.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: nt(_e({ target: "none" }), _e({ target: "many" })),
    order: 20
  },
  {
    id: be.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && _e({ target: "none" })(n, e),
    order: 30
  },
  {
    id: be.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(Yt),
    show: _e({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: be.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: _e({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: be.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const t = n.config, o = t.get("pinnedFolders"), s = o.concat(
        e.filter(
          (l) => o.findIndex((a) => a.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", s);
    },
    show: ot(_e({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: be.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const t = n.config, o = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        o.filter(
          (s) => !e.find((l) => l.path === s.path)
        )
      );
    },
    show: ot(_e({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: be.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(vt, { storage: e[0]?.storage, item: e[0] }),
    show: ot(
      _e({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: be.download,
    link: (n, e) => {
      if (e[0])
        return n.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: ot(
      _e({ target: "one", feature: "download" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: be.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(kt, { items: e }),
    show: _e({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: be.move,
    title: ({ t: n }) => n("Move files"),
    action: (n, e) => {
      const t = n.fs, o = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      n.modal.open(Ze, { items: { from: e, to: o } });
    },
    show: nt(
      _e({ target: "one", feature: "move" }),
      _e({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: be.copy,
    title: ({ t: n }) => n("Copy"),
    action: (n, e) => {
      e.length > 0 && n.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: nt(
      _e({ target: "one", feature: "copy" }),
      _e({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: be.paste,
    title: ({ t: n }) => n("Paste"),
    action: (n, e) => {
      const t = n.fs.getClipboard();
      if (t?.items?.size > 0) {
        const s = n.fs.path.get();
        let l = s.path, a = s.storage;
        e.length === 1 && e[0]?.type === "dir" && (l = e[0].path, a = e[0].storage);
        const d = {
          storage: a || "",
          path: l || "",
          type: "dir"
        };
        n.modal.open(t.type === "cut" ? Ze : qt, {
          items: { from: Array.from(t.items), to: d }
        });
      }
    },
    show: (n, e) => n.features?.copy ?? !1 ? n.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: be.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(Jt, { items: e }),
    show: nt(
      _e({ target: "many", feature: "archive" }),
      ot(
        _e({ target: "one", feature: "archive" }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: be.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(Xt, { items: e }),
    show: _e({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: be.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(bt, { items: e });
    },
    show: nt(
      _e({ feature: "delete", target: "one" }),
      _e({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], yv = ["data-theme"], bv = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, kv = { class: "vuefinder__external-drop-message" }, xv = { class: "vuefinder__main__content" }, $v = /* @__PURE__ */ te({
  __name: "VueFinderView",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean },
    locale: {},
    contextMenuItems: {},
    selectionMode: {},
    selectionFilterType: {},
    selectionFilterMimeIncludes: {},
    onError: { type: Function },
    onSelect: { type: Function },
    onPathChange: { type: Function },
    onUploadComplete: { type: Function },
    onDeleteComplete: { type: Function },
    onNotify: { type: Function },
    onReady: { type: Function },
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function },
    customUploader: { type: Function }
  },
  emits: [
    "select",
    "path-change",
    "upload-complete",
    "delete-complete",
    "notify",
    "error",
    "ready",
    "file-dclick",
    "folder-dclick",
    "update:locale"
  ],
  setup(n, { emit: e }) {
    const t = e, o = n, s = ee(), l = Xe("root"), a = s.config;
    ie(
      () => o.features,
      (g) => {
        const f = xn(g);
        Object.keys(s.features).forEach((y) => {
          delete s.features[y];
        }), Object.assign(s.features, f);
      },
      { deep: !0 }
    );
    const d = s.fs, c = q(s.i18n.localeAtom), v = q(a.state), p = B(() => {
      const g = v.value;
      return {
        "--vf-grid-item-width": `${g.gridItemWidth}px`,
        "--vf-grid-item-height": `${g.gridItemHeight}px`,
        "--vf-grid-item-gap": `${g.gridItemGap}px`,
        "--vf-grid-icon-size": `${g.gridIconSize}px`,
        "--vf-list-item-height": `${g.listItemHeight}px`,
        "--vf-list-item-gap": `${g.listItemGap}px`,
        "--vf-list-icon-size": `${g.listIconSize}px`
      };
    });
    $a();
    const { isDraggingExternal: w, handleDragEnter: h, handleDragOver: x, handleDragLeave: C, handleDrop: $ } = Sa();
    function m(g) {
      d.setPath(g.dirname), a.get("persist") && a.set("path", g.dirname), d.setReadOnly(g.read_only ?? !1), s.modal.close(), d.setFiles(g.files), d.clearSelection(), d.setSelectedCount(0), d.setStorages(g.storages);
    }
    s.adapter.onBeforeOpen = () => {
      d.setLoading(!0);
    }, s.adapter.onAfterOpen = (g) => {
      m(g), d.setLoading(!1);
    }, s.emitter.on("vf-upload-complete", (g) => {
      t("upload-complete", g);
    }), s.emitter.on("vf-delete-complete", (g) => {
      t("delete-complete", g);
    }), s.emitter.on("vf-notify", (g) => {
      t("notify", g);
    }), s.emitter.on("vf-file-dclick", (g) => {
      t("file-dclick", g);
    }), s.emitter.on("vf-folder-dclick", (g) => {
      t("folder-dclick", g);
    }), ie(
      () => o.config?.theme,
      (g) => {
        g && a.set("theme", i(g));
      },
      { immediate: !0 }
    ), ie(
      c,
      (g, f) => {
        g !== f && t("update:locale", String(g));
      },
      { immediate: !1 }
    ), ve(() => {
      s.root = l.value, ie(
        () => a.get("path"),
        (f) => {
          s.adapter.open(f);
        }
      );
      const g = a.get("persist") ? a.get("path") : a.get("initialPath") ?? "";
      d.setPath(g), s.adapter.open(g), d.path.listen((f) => {
        t("path-change", f.path);
      }), d.selectedItems.listen((f) => {
        t("select", f);
      }), t("ready");
    });
    const k = async (g) => {
      const f = await $(g);
      f.length > 0 && (s.modal.open(Qt), setTimeout(() => {
        s.emitter.emit(
          "vf-external-files-dropped",
          f.map((y) => y.file)
        );
      }, 100));
    };
    return (g, f) => (u(), _("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: ne(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": i(w) }]),
      "data-theme": i(s).theme.current,
      style: Ae(p.value),
      onDragenter: f[2] || (f[2] = //@ts-ignore
      (...y) => i(h) && i(h)(...y)),
      onDragover: f[3] || (f[3] = //@ts-ignore
      (...y) => i(x) && i(x)(...y)),
      onDragleave: f[4] || (f[4] = //@ts-ignore
      (...y) => i(C) && i(C)(...y)),
      onDrop: k
    }, [
      r("div", {
        class: ne(i(s).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        r("div", {
          class: ne([
            i(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: f[0] || (f[0] = (y) => i(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: f[1] || (f[1] = (y) => i(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          i(w) ? (u(), _("div", bv, [
            r("div", kv, b(i(s).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : z("", !0),
          i(v).showMenuBar ? (u(), U(Jl, { key: 1 })) : z("", !0),
          i(v).showToolbar ? (u(), U(ec, { key: 2 })) : z("", !0),
          N(Nc),
          r("div", xv, [
            N(gv),
            N(Du, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: se((y) => [
                $e(g.$slots, "icon", Ke(je(y)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          N(Ku, null, {
            actions: se((y) => [
              $e(g.$slots, "status-bar", Ke(je(y)))
            ]),
            _: 3
          })
        ], 34),
        (u(), U(yt, { to: "body" }, [
          N(Xn, { name: "fade" }, {
            default: se(() => [
              i(s).modal.visible ? (u(), U(_n(i(s).modal.type), { key: 0 })) : z("", !0)
            ]),
            _: 1
          })
        ])),
        N(Mu, { items: i(jn) }, null, 8, ["items"]),
        i(v).notificationsEnabled ? (u(), U(i(eo), {
          key: 0,
          position: i(v).notificationPosition,
          duration: i(v).notificationDuration,
          "visible-toasts": i(v).notificationVisibleToasts,
          "rich-colors": i(v).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : z("", !0)
      ], 2)
    ], 46, yv));
  }
}), Sv = /* @__PURE__ */ te({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => jn },
    selectionMode: { default: "multiple" },
    selectionFilterType: { default: "both" },
    selectionFilterMimeIncludes: { default: () => [] },
    onError: {},
    onSelect: {},
    onPathChange: {},
    onUploadComplete: {},
    onDeleteComplete: {},
    onNotify: {},
    onReady: {},
    onFileDclick: {},
    onFolderDclick: {},
    customUploader: {}
  },
  setup(n) {
    const e = n, t = e.id ?? ht(It);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const o = Co(e, ht("VueFinderOptions") || {});
    return ie(
      () => e.config,
      (s) => {
        if (s) {
          const l = {};
          for (const a in s) {
            const d = i(s[a]);
            d !== void 0 && (l[a] = d);
          }
          o.config.init(l);
        }
      },
      { deep: !0, immediate: !0 }
    ), ie(
      () => e.locale,
      (s) => {
        s && o.i18n.localeAtom && o.i18n.localeAtom.get() !== s && o.i18n.localeAtom.set(s);
      },
      { immediate: !0 }
    ), ao(t, o), Jn(It, t), gn(() => {
      lo(t);
    }), (s, l) => (u(), U($v, Ke(je(e)), {
      icon: se((a) => [
        $e(s.$slots, "icon", Ke(je(a)))
      ]),
      "status-bar": se((a) => [
        $e(s.$slots, "status-bar", Ke(je(a)))
      ]),
      _: 3
    }, 16));
  }
});
function Nv(n) {
  const e = ee(n), t = (s) => s || e.fs.path.get().path || "", o = (s) => {
    Array.isArray(s.files) && e.fs.setFiles(s.files);
  };
  return {
    async refresh() {
      const s = e.fs.path.get().path || "";
      e.adapter.invalidateListQuery(s), await e.adapter.open(s);
    },
    async open(s) {
      await e.adapter.open(s);
    },
    preview(s) {
      const l = (e.fs.files.get() || []).find((a) => a.path === s);
      !l || l.type !== "file" || e.modal.open(vt, { storage: l.storage, item: l });
    },
    notify(s, l) {
      Qe(e, s, l);
    },
    getPath() {
      return e.fs.path.get().path || "";
    },
    select(s) {
      const l = new Set((e.fs.files.get() || []).map((d) => d.path)), a = (s || []).filter((d) => l.has(d));
      e.fs.setSelection(a);
    },
    selectOne(s) {
      new Set((e.fs.files.get() || []).map((a) => a.path)).has(s) && e.fs.setSelection([s]);
    },
    clearSelection() {
      e.fs.clearSelection();
    },
    getSelectedPaths() {
      return (e.fs.selectedItems.get() || []).map((s) => s.path);
    },
    async createFolder(s, l) {
      const a = await e.adapter.createFolder({ path: t(l), name: s });
      o(a);
    },
    async createFile(s, l) {
      const a = await e.adapter.createFile({ path: t(l), name: s });
      o(a);
    },
    async delete(s, l) {
      const a = t(l), d = new Map(
        (e.fs.files.get() || []).map((p) => [p.path, p])
      ), c = (s || []).map((p) => d.get(p)).filter((p) => !!p).map((p) => ({ path: p.path, type: p.type })), v = await e.adapter.delete({ path: a, items: c });
      o(v);
    },
    async rename(s, l, a) {
      const d = await e.adapter.rename({
        path: t(a),
        item: s,
        name: l
      });
      o(d);
    },
    async copy(s, l, a) {
      const d = await e.adapter.copy({
        path: t(a),
        sources: s,
        destination: l
      });
      o(d);
    },
    async move(s, l, a) {
      const d = await e.adapter.move({
        path: t(a),
        sources: s,
        destination: l
      });
      o(d);
    },
    getFiles() {
      return e.fs.files.get() || [];
    },
    getStorages() {
      return e.fs.storages.get() || [];
    },
    isLoading() {
      return e.fs.isLoading();
    },
    isReadOnly() {
      return e.fs.getReadOnly();
    }
  };
}
const Hv = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", Sv);
  }
};
export {
  xo as ArrayDriver,
  Vt as BaseAdapter,
  be as ContextMenuIds,
  Uv as IndexedDBDriver,
  Cn as RemoteDriver,
  Sv as VueFinder,
  Hv as VueFinderPlugin,
  Sv as VueFinderProvider,
  jn as contextMenuItems,
  uo as createLocaleAtom,
  Hv as default,
  rn as parseBackendError,
  Nv as useVueFinder
};
