import { inject as Jt, reactive as ln, watch as ie, ref as L, computed as V, shallowRef as fs, markRaw as bo, defineComponent as te, onMounted as he, nextTick as nt, openBlock as S, createElementBlock as C, withKeys as Wt, unref as f, createElementVNode as p, withModifiers as ae, renderSlot as Oe, createCommentVNode as R, toDisplayString as E, createBlock as U, resolveDynamicComponent as ps, withCtx as oe, createVNode as B, Fragment as de, renderList as ge, withDirectives as ve, vModelCheckbox as un, vModelText as qt, onUnmounted as Ie, useTemplateRef as xt, createTextVNode as ce, resolveComponent as ms, normalizeClass as ne, customRef as xo, Teleport as cn, normalizeStyle as Je, isRef as So, vModelSelect as Ln, onBeforeUnmount as vs, vModelRadio as bn, mergeProps as Qe, toHandlers as ct, vShow as it, normalizeProps as dt, guardReactiveProps as ht, onUpdated as $o, useModel as gs, mergeModels as ko, Transition as Co, provide as Po } from "vue";
import Eo from "mitt";
import { useStore as X } from "@nanostores/vue";
import { persistentAtom as _s } from "@nanostores/persistent";
import { toast as Yt, Toaster as To } from "vue-sonner";
import { atom as je, computed as lt } from "nanostores";
import { QueryClient as Ao } from "@tanstack/vue-query";
import No from "@uppy/core";
import { Cropper as Io } from "vue-advanced-cropper";
import ys from "vanilla-lazyload";
import { OverlayScrollbars as Rt, SizeObserverPlugin as Do } from "overlayscrollbars";
import { computePosition as $t, offset as jt, flip as zt, shift as Vt, autoUpdate as Xn } from "@floating-ui/dom";
import Fo from "@viselect/vanilla";
import Mo from "@uppy/xhr-upload";
const Qn = /* @__PURE__ */ new Map(), Rn = /* @__PURE__ */ Symbol("ServiceContainerId");
function Oo(n, e) {
  Qn.set(n, e);
}
function Lo(n) {
  Qn.delete(n);
}
function ee(n) {
  const e = n ?? Jt(Rn);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Qn.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function Ro(n) {
  const e = localStorage.getItem(n + "_storage"), t = ln(JSON.parse(e ?? "{}"));
  ie(t, r);
  function r() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function s(c, l) {
    t[c] = l;
  }
  function o(c) {
    delete t[c];
  }
  function i() {
    Object.keys(t).forEach((c) => o(c));
  }
  return { getStore: (c, l = null) => c in t ? t[c] : l, setStore: s, removeStore: o, clearStore: i };
}
function Ue(n, e = "An error occurred") {
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
function jo(n, e) {
  return _s(n, e, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
}
function zo(n) {
  if (!n?.config?.get)
    return !0;
  try {
    return !!n.config.get("notificationsEnabled");
  } catch {
    return !0;
  }
}
function yt(n, e, t) {
  const r = { type: e, message: t };
  if (n?.emitter?.emit?.("vf-notify", r), !!zo(n))
    switch (e) {
      case "success":
        Yt.success(t);
        break;
      case "error":
        Yt.error(t);
        break;
      case "warning":
        Yt.warning(t);
        break;
      default:
        Yt.info(t);
        break;
    }
}
function Be(n) {
  return {
    success(e) {
      yt(n, "success", e);
    },
    error(e) {
      yt(n, "error", e);
    },
    info(e) {
      yt(n, "info", e);
    },
    warning(e) {
      yt(n, "warning", e);
    },
    emit(e, t) {
      yt(n, e, t);
    }
  };
}
const xn = /* @__PURE__ */ new Map();
async function Sn(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function Vo(n, e, t, r, s) {
  const o = Be({ emitter: t, config: s }), i = "vuefinder_locale", a = "global";
  let c;
  if (xn.has(a))
    c = xn.get(a), e && e !== c.get() && c.set(e);
  else {
    const x = localStorage.getItem(i) ? JSON.parse(localStorage.getItem(i)) : null;
    c = jo(i, e || x || "en"), xn.set(a, c);
  }
  const l = "vuefinder_translations", u = (x) => {
    try {
      const $ = localStorage.getItem(l);
      if ($)
        return JSON.parse($)[x] || null;
    } catch {
    }
    return null;
  }, h = (x, $) => {
    try {
      const k = localStorage.getItem(l), P = k ? JSON.parse(k) : {};
      P[x] = $, localStorage.setItem(l, JSON.stringify(P));
    } catch {
    }
  }, d = X(c), g = String(d.value), _ = u(g), m = L(_ || {});
  let v = !1;
  !_ && Object.keys(r).length > 0 && Sn(g, r).then((x) => {
    m.value = x, h(g, x);
  }).catch(() => {
  }), ie(
    d,
    async (x, $) => {
      if ($ && x === $)
        return;
      if (!v) {
        v = !0;
        const P = u(String(x));
        if (P)
          m.value = P;
        else if (Object.keys(r).length > 0)
          try {
            const A = await Sn(String(x), r);
            m.value = A, h(String(x), A);
          } catch {
          }
        return;
      }
      const k = u(String(x));
      if (k)
        m.value = k;
      else
        try {
          const P = await Sn(String(x), r);
          m.value = P, h(String(x), P);
        } catch (P) {
          const A = Ue(P, "Locale cannot be loaded!");
          o.error(A);
          return;
        }
      Object.values(r).length > 1 && (o.success("The language is set to " + x), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const b = (x, ...$) => $.length ? b(x = x.replace("%s", String($.shift())), ...$) : x;
  function y(x, ...$) {
    return m.value && Object.prototype.hasOwnProperty.call(m.value, x) ? b(m.value[x] || x, ...$) : b(x, ...$);
  }
  const w = V({
    get: () => d.value,
    set: (x) => {
      c.set(x);
    }
  });
  return ln({ t: y, locale: w, localeAtom: c });
}
const Uo = [
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
], ws = {
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
  advanced: Uo.reduce((n, e) => (n[e] = !0, n), {})
};
function $r() {
  return ws.advanced;
}
function bs(n) {
  return n ? n === "simple" || n === "advanced" ? { ...ws[n] } : { ...$r(), ...n } : $r();
}
const Bo = "1.0.2";
function Jn(n, e, t, r, s) {
  return e = Math, t = e.log, r = 1024, s = t(n) / t(r) | 0, (n / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function xs(n, e, t, r, s) {
  return e = Math, t = e.log, r = 1e3, s = t(n) / t(r) | 0, (n / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function Ho(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!r) return 0;
  const s = parseFloat(r[1] || "0"), o = (r[2] || "").toLowerCase(), i = e[o] ?? 0;
  return Math.round(s * Math.pow(1024, i));
}
function Wo(n) {
  const e = fs(null), t = L(!1), r = L(), s = L(!1);
  return { visible: t, type: e, data: r, open: (c, l = null) => {
    n.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, r.value = l;
  }, close: () => {
    n.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
  }, setEditMode: (c) => {
    s.value = c;
  }, editMode: s };
}
const Zt = {
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
}, en = {
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
}, qo = new Set(
  Object.keys(en)
);
function Ko(n) {
  return n || "silver";
}
function Ss(n) {
  return qo.has(n);
}
function kr(n) {
  const e = {}, t = {}, r = n;
  for (const s in r)
    if (Ss(s))
      t[s] = r[s];
    else if (s in Zt) {
      const o = s;
      e[o] = r[s];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function Cr(n, e) {
  const t = { ...Zt, ...e, ...n };
  return t.theme = Ko(t.theme), t;
}
function Pr(n, e) {
  return { ...en, ...e, ...n };
}
const Go = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: r, nonPersistenceConfig: s } = kr(e), o = Cr(
    r,
    Zt
  ), i = Pr(
    s,
    en
  ), a = _s(
    t,
    o,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = je(i), l = lt(
    [a, c],
    (v, b) => ({
      ...v,
      ...b
    })
  ), u = (v = {}) => {
    const b = a.get(), y = c.get(), { persistenceConfig: w, nonPersistenceConfig: x } = kr(v), $ = Cr(w, b), k = Pr(
      x,
      y
    );
    a.set($), c.set(k);
  }, h = (v) => Ss(v) ? c.get()[v] : a.get()[v], d = () => ({
    ...a.get(),
    ...c.get()
  }), g = (v, b) => {
    const y = a.get();
    typeof v == "object" && v !== null ? a.set({ ...y, ...v }) : a.set({
      ...y,
      [v]: b
    });
  };
  return {
    // Store atom (combined)
    state: l,
    // Methods
    init: u,
    get: h,
    set: g,
    toggle: (v) => {
      const b = a.get();
      g(v, !b[v]);
    },
    all: d,
    reset: () => {
      a.set({ ...Zt }), c.set({ ...en });
    }
  };
};
function Yo(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(n) || 0, r = Number(e) || 0;
  return t === r ? 0 : t < r ? -1 : 1;
}
const Xo = () => {
  const n = je(""), e = je([]), t = je(!1), r = je([]), s = je({ active: !1, column: "", order: "" }), o = je({
    kind: "all",
    showHidden: !1
  }), i = je(/* @__PURE__ */ new Set()), a = je({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = je(null), l = je(0), u = je(!1), h = je([]), d = je(-1), g = lt([n], (H) => {
    const W = (H ?? "").trim(), J = W.indexOf("://"), re = J >= 0 ? W.slice(0, J) : "", qe = (J >= 0 ? W.slice(J + 3) : W).split("/").filter(Boolean);
    let Xe = "";
    const Et = qe.map((Le) => (Xe = Xe ? `${Xe}/${Le}` : Le, {
      basename: Le,
      name: Le,
      path: re ? `${re}://${Xe}` : Xe,
      type: "dir"
    }));
    return { storage: re, breadcrumb: Et, path: W };
  }), _ = lt([r, s, o], (H, W, J) => {
    let re = H;
    J.kind === "files" ? re = re.filter((Le) => Le.type === "file") : J.kind === "folders" && (re = re.filter((Le) => Le.type === "dir")), J.showHidden || (re = re.filter((Le) => !Le.basename.startsWith(".")));
    const { active: tt, column: qe, order: Xe } = W;
    if (!tt || !qe) return re;
    const Et = Xe === "asc" ? 1 : -1;
    return re.slice().sort((Le, yn) => Yo(Le[qe], yn[qe]) * Et);
  }), m = lt([r, i], (H, W) => W.size === 0 ? [] : H.filter((J) => W.has(J.path))), v = (H, W) => {
    const J = n.get();
    if ((W ?? !0) && J !== H) {
      const re = h.get(), tt = d.get();
      tt < re.length - 1 && re.splice(tt + 1), re.length === 0 && J && re.push(J), re.push(H), h.set([...re]), d.set(re.length - 1);
    }
    n.set(H);
  }, b = (H) => {
    r.set(H ?? []);
  }, y = (H) => {
    e.set(H ?? []);
  }, w = (H, W) => {
    s.set({ active: !0, column: H, order: W });
  }, x = (H) => {
    const W = s.get();
    W.active && W.column === H ? s.set({
      active: W.order === "asc",
      column: H,
      order: "desc"
    }) : s.set({
      active: !0,
      column: H,
      order: "asc"
    });
  }, $ = () => {
    s.set({ active: !1, column: "", order: "" });
  }, k = (H, W) => {
    o.set({ kind: H, showHidden: W });
  }, P = () => {
    o.set({ kind: "all", showHidden: !1 });
  }, A = (H, W = "multiple") => {
    const J = new Set(i.get());
    W === "single" && J.clear(), J.add(H), i.set(J);
  }, M = (H, W = "multiple") => {
    const J = new Set(i.get());
    W === "single" && J.clear(), H.forEach((re) => J.add(re)), i.set(J);
  }, j = (H) => {
    const W = new Set(i.get());
    W.delete(H), i.set(W);
  }, F = (H) => i.get().has(H), q = (H, W = "multiple") => {
    const J = new Set(i.get());
    J.has(H) ? J.delete(H) : (W === "single" && J.clear(), J.add(H)), i.set(J);
  }, T = (H = "multiple", W) => {
    if (H === "single") {
      const J = r.get()[0];
      if (J) {
        const re = J.path;
        i.set(/* @__PURE__ */ new Set([re])), l.set(1);
      }
    } else {
      if (W?.selectionFilterType || W?.selectionFilterMimeIncludes && W.selectionFilterMimeIncludes.length > 0) {
        const J = r.get().filter((re) => {
          const tt = W.selectionFilterType, qe = W.selectionFilterMimeIncludes;
          return tt === "files" && re.type === "dir" || tt === "dirs" && re.type === "file" ? !1 : qe && Array.isArray(qe) && qe.length > 0 && re.type !== "dir" ? re.mime_type ? qe.some((Xe) => re.mime_type?.startsWith(Xe)) : !1 : !0;
        }).map((re) => re.path);
        i.set(new Set(J));
      } else {
        const J = new Set(r.get().map((re) => re.path));
        i.set(J);
      }
      Q(i.get().size);
    }
  }, Y = () => {
    i.set(/* @__PURE__ */ new Set()), l.set(0);
  }, K = (H) => {
    const W = new Set(H ?? []);
    i.set(W), l.set(W.size);
  }, Q = (H) => {
    l.set(H);
  }, D = (H) => {
    u.set(!!H);
  }, I = () => u.get(), N = (H, W) => {
    const J = r.get().filter((re) => W.has(re.path));
    a.set({
      type: H,
      path: g.get().path,
      items: new Set(J)
    });
  }, O = (H) => lt([a], (W) => W.type === "cut" && Array.from(W.items).some((J) => J.path === H)), z = (H) => lt([a], (W) => W.type === "copy" && Array.from(W.items).some((J) => J.path === H)), G = (H) => {
    const W = O(H);
    return X(W).value ?? !1;
  }, se = (H) => {
    const W = z(H);
    return X(W).value ?? !1;
  }, fe = () => {
    a.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, Ce = () => a.get(), pe = (H) => {
    c.set(H);
  }, at = () => c.get(), pt = () => {
    c.set(null);
  }, Pe = () => {
    const H = h.get(), W = d.get();
    if (W > 0) {
      const J = W - 1, re = H[J];
      re && (d.set(J), v(re, !1));
    }
  }, Z = () => {
    const H = h.get(), W = d.get();
    if (W < H.length - 1) {
      const J = W + 1, re = H[J];
      re && (d.set(J), v(re, !1));
    }
  }, ue = lt([d], (H) => H > 0), le = lt(
    [h, d],
    (H, W) => W < H.length - 1
  );
  return {
    // Atoms (state)
    files: r,
    storages: e,
    currentPath: n,
    sort: s,
    filter: o,
    selectedKeys: i,
    selectedCount: l,
    loading: u,
    draggedItem: c,
    clipboardItems: a,
    // Computed values
    path: g,
    sortedFiles: _,
    selectedItems: m,
    // Actions
    setPath: v,
    setFiles: b,
    setStorages: y,
    setSort: w,
    toggleSort: x,
    clearSort: $,
    setFilter: k,
    clearFilter: P,
    select: A,
    selectMultiple: M,
    deselect: j,
    toggleSelect: q,
    selectAll: T,
    isSelected: F,
    clearSelection: Y,
    setSelection: K,
    setSelectedCount: Q,
    setLoading: D,
    isLoading: I,
    setClipboard: N,
    createIsCut: O,
    createIsCopied: z,
    isCut: G,
    isCopied: se,
    clearClipboard: fe,
    getClipboard: Ce,
    setDraggedItem: pe,
    getDraggedItem: at,
    clearDraggedItem: pt,
    setReadOnly: (H) => {
      t.set(H);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (H) => t.get() ? !0 : H.read_only ?? !1,
    // Navigation
    goBack: Pe,
    goForward: Z,
    canGoBack: ue,
    canGoForward: le,
    navigationHistory: h,
    historyIndex: d
  };
};
class dn {
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
      const [t, ...r] = e.split("://");
      return { storage: t, path: r.join("://") };
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
class Qo extends dn {
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
    const r = e ?? "";
    return r === "" ? `${t}://` : `${t}://${r}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  normalizePath(e, t = this.defaultStorage) {
    const { storage: r, path: s } = this.split(e || ""), o = r || t;
    return this.combine(s ?? "", o);
  }
  parent(e) {
    const { storage: t, path: r } = this.split(e), s = t || this.defaultStorage;
    if (!r) return this.combine("", s);
    const o = r.replace(/\/+$/g, "").replace(/^\/+/, ""), i = o.lastIndexOf("/");
    return i <= 0 ? this.combine("", s) : this.combine(o.slice(0, i), s);
  }
  join(e, t) {
    const { storage: r, path: s } = this.split(e), o = r || this.defaultStorage, i = (s ?? "").replace(/\/$/, ""), a = i ? `${i}/${t}` : t;
    return this.combine(a, o);
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
    const t = this.files.slice(), r = t.findIndex((s) => s.path === e.path);
    r === -1 ? t.push(e) : t[r] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((r) => r.path !== e);
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], r = [];
    for (const s of this.files)
      this.isInTree(s.path, e) ? t.push(s) : r.push(s);
    this.replaceAll(r);
    for (const s of t)
      this.contentStore.delete(s.path);
    return t;
  }
  isInTree(e, t) {
    return e === t || e.startsWith(`${t}/`);
  }
  getTree(e, t = this.files) {
    return t.filter((r) => this.isInTree(r.path, e)).sort((r, s) => r.path.length - s.path.length);
  }
  uniqueName(e, t, r) {
    if (!r.has(this.join(e, t))) return t;
    const s = t.lastIndexOf("."), o = s > 0 ? t.slice(0, s) : t, i = s > 0 ? t.slice(s) : "";
    let a = 1;
    for (; ; ) {
      const c = `${o} copy ${a}${i}`, l = this.join(e, c);
      if (!r.has(l)) return c;
      a++;
    }
  }
  topLevelSources(e, t = this.defaultStorage) {
    const r = [...new Set(e)].map((o) => this.normalizePath(o, t)).filter((o) => this.findByPath(o)).sort((o, i) => o.length - i.length), s = [];
    for (const o of r)
      s.some((i) => this.isInTree(o, i)) || s.push(o);
    return s;
  }
  makeDirEntry(e, t) {
    const r = this.join(e, t), { storage: s } = this.split(r);
    return {
      storage: s || this.defaultStorage,
      dir: e,
      basename: t,
      extension: "",
      path: r,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, t, r = 0, s = null) {
    const o = this.join(e, t), { storage: i } = this.split(o);
    return {
      storage: i || this.defaultStorage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: o,
      type: "file",
      file_size: r,
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
    const t = this.normalizePath(e.path), { storage: r } = this.split(t), s = [];
    for (const i of e.items) {
      const a = this.normalizePath(i.path, r || this.defaultStorage), c = this.findByPath(a);
      c && (c.type === "dir" ? s.push(...this.removeTree(c.path)) : (this.removeExact(c.path), this.contentStore.delete(c.path), s.push(c)));
    }
    return { ...this.resultForDir(t), deleted: s };
  }
  async rename(e) {
    this.ensureWritable(), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), { storage: r } = this.split(t), s = this.normalizePath(
      e.item || e.path,
      r || this.defaultStorage
    ), o = this.findByPath(s);
    if (!o) throw new Error("Item not found");
    const i = o.dir, a = this.join(i, e.name);
    if (a !== o.path && this.findByPath(a))
      throw new Error("Target already exists");
    if (o.type === "dir") {
      const l = o.path, u = a, h = this.files.map((d) => {
        if (d.storage !== o.storage || !this.isInTree(d.path, l)) return d;
        const g = u + d.path.slice(l.length);
        return this.cloneEntry(d, {
          path: g,
          dir: this.parent(g),
          basename: d.path === l ? e.name : d.basename,
          last_modified: Date.now()
        });
      });
      for (const [d, g] of Array.from(this.contentStore.entries()))
        this.isInTree(d, l) && (this.contentStore.delete(d), this.contentStore.set(u + d.slice(l.length), g));
      this.replaceAll(h);
    } else {
      const l = this.cloneEntry(o, {
        path: a,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(l), this.removeExact(o.path);
      const u = this.contentStore.get(o.path);
      u !== void 0 && (this.contentStore.delete(o.path), this.contentStore.set(l.path, u));
    }
    const c = e.path ? this.normalizePath(e.path, o.storage || this.defaultStorage) : i;
    return this.resultForDir(c || i);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: r } = this.split(t), s = this.topLevelSources(e.sources, r || this.defaultStorage), o = new Set(this.files.map((a) => a.path)), i = [];
    for (const a of s) {
      const c = this.findByPath(a);
      if (!c) continue;
      if (c.type === "file") {
        const d = this.uniqueName(t, c.basename, o), g = this.makeFileEntry(
          t,
          d,
          c.file_size || 0,
          c.mime_type
        );
        i.push(g), o.add(g.path);
        const _ = this.contentStore.get(c.path);
        _ !== void 0 && this.contentStore.set(g.path, _);
        continue;
      }
      const l = this.getTree(c.path), u = this.uniqueName(t, c.basename, o), h = /* @__PURE__ */ new Map();
      h.set(c.path, this.join(t, u));
      for (const d of l) {
        const g = d.path === c.path ? h.get(c.path) : this.join(h.get(d.dir), d.basename);
        h.set(d.path, g);
        const _ = d.path === c.path ? t : h.get(d.dir), m = d.path === c.path ? u : d.basename, v = this.cloneEntry(d, {
          path: g,
          dir: _,
          basename: m,
          extension: d.type === "file" ? this.getExtension(m) : "",
          last_modified: Date.now()
        });
        if (i.push(v), o.add(v.path), d.type === "file") {
          const b = this.contentStore.get(d.path);
          b !== void 0 && this.contentStore.set(v.path, b);
        }
      }
    }
    return this.replaceAll(this.files.concat(i)), this.resultForDir(t);
  }
  async move(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: r } = this.split(t), s = this.topLevelSources(e.sources, r || this.defaultStorage);
    let o = this.files.slice();
    for (const i of s) {
      const a = o.find((_) => _.path === i);
      if (!a) continue;
      if (a.type === "dir" && this.isInTree(t, a.path))
        throw new Error("Cannot move directory into itself");
      if (a.dir === t)
        continue;
      const c = this.getTree(a.path, o), l = new Set(c.map((_) => _.path)), u = new Set(o.filter((_) => !l.has(_.path)).map((_) => _.path)), h = this.uniqueName(t, a.basename, u), d = /* @__PURE__ */ new Map();
      d.set(a.path, this.join(t, h));
      const g = /* @__PURE__ */ new Map();
      for (const _ of c) {
        const m = _.path === a.path ? d.get(a.path) : this.join(d.get(_.dir), _.basename);
        d.set(_.path, m);
        const v = _.path === a.path ? t : d.get(_.dir), b = _.path === a.path ? h : _.basename;
        g.set(
          _.path,
          this.cloneEntry(_, {
            path: m,
            dir: v,
            basename: b,
            extension: _.type === "file" ? this.getExtension(b) : "",
            last_modified: Date.now()
          })
        );
      }
      o = o.map((_) => g.get(_.path) || _);
      for (const [_, m] of d.entries()) {
        if (_ === m) continue;
        const v = this.contentStore.get(_);
        v !== void 0 && (this.contentStore.delete(_), this.contentStore.set(m, v));
      }
    }
    return this.replaceAll(o), this.resultForDir(t);
  }
  async archive(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), r = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, s = this.makeFileEntry(t, r, 0, "application/zip");
    return this.upsert(s), this.resultForDir(t);
  }
  async unarchive(e) {
    this.ensureWritable(), this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.item), r = this.normalizePath(e.path), s = this.findByPath(t);
    if (!s) throw new Error("Archive not found");
    const o = s.basename.replace(/\.zip$/i, ""), i = this.makeDirEntry(r, o);
    return this.upsert(i), this.resultForDir(r);
  }
  async createFile(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), r = this.makeFileEntry(t, e.name, 0, null);
    return this.upsert(r), this.contentStore.set(r.path, ""), this.resultForDir(t);
  }
  async createFolder(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), r = this.makeDirEntry(t, e.name);
    return this.upsert(r), this.resultForDir(t);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = this.normalizePath(e.path), r = this.contentStore.get(t);
    if (typeof r == "string" || r === void 0)
      return {
        content: r ?? "",
        mimeType: this.findByPath(t)?.mime_type || void 0
      };
    const s = new Uint8Array(r);
    let o = "";
    for (let i = 0; i < s.length; i++) o += String.fromCharCode(s[i]);
    return {
      content: btoa(o),
      mimeType: this.findByPath(t)?.mime_type || void 0
    };
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), r = e.path ? this.normalizePath(e.path) : void 0;
    return this.files.filter((s) => {
      if (r) {
        if (e.deep) {
          if (!this.isInTree(s.path, r)) return !1;
        } else if (s.dir !== r)
          return !1;
      }
      return s.basename.toLowerCase().includes(t) || s.path.toLowerCase().includes(t);
    });
  }
  async save(e) {
    this.ensureWritable(), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.path), r = this.findByPath(t);
    if (!r) throw new Error("File not found");
    if (r.type !== "file") throw new Error("Can only save file content");
    return this.contentStore.set(t, e.content), this.upsert(
      this.cloneEntry(r, { file_size: e.content.length, last_modified: Date.now() })
    ), t;
  }
  configureUploader(e, t) {
    e && e.on("upload-success", async (r) => {
      try {
        this.ensureWritable();
        const s = this.normalizePath(t.getTargetPath()), o = r?.name || "file", i = r?.type || null, a = r?.data, c = r?.size || 0, l = this.makeFileEntry(s, o, c, i);
        if (this.upsert(l), a)
          try {
            const u = await a.arrayBuffer();
            this.contentStore.set(l.path, u);
          } catch {
            this.contentStore.set(l.path, "");
          }
        else
          this.contentStore.set(l.path, "");
      } catch {
      }
    });
  }
}
function Er(n, e, t) {
  const r = `HTTP ${e}: ${t}`;
  if (!n)
    return r;
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
      const o = s.errors.map((i) => i.message).filter((i) => !!i);
      if (o.length > 0)
        return o.join(", ");
    }
    return s.detail ? s.detail : s.title ? s.title : n;
  } catch {
    return n || r;
  }
}
class $s extends dn {
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
      ...$s.DEFAULT_URLS,
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
    const r = this.getHeaders();
    delete r["Content-Type"], e.use(Mo, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: r,
      formData: !0
    }), e.on("upload", () => {
      const s = t.getTargetPath();
      e.getFiles().forEach((i) => {
        e.setFileMeta(i.id, { path: s });
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
    const r = `${this.config.baseURL}${e}`, s = await fetch(r, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!s.ok) {
      const i = await s.text(), a = Er(i, s.status, s.statusText);
      throw new Error(a);
    }
    return (s.headers.get("content-type") || "").includes("application/json") ? await s.json() : await s.text();
  }
  async list(e) {
    const t = new URLSearchParams();
    e?.path && t.append("path", e.path);
    const r = t.toString() ? `${this.config.url.list}?${t.toString()}` : this.config.url.list;
    return await this.request(r, { method: "GET" });
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
    const t = new URLSearchParams({ path: e.path }), r = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, s = await fetch(r, { headers: this.getHeaders() });
    if (!s.ok) {
      const i = await s.text(), a = Er(i, s.status, s.statusText);
      throw new Error(a);
    }
    return { content: await s.text(), mimeType: s.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, r = new URLSearchParams();
    e.path && r.set("path", e.path), e.filter && r.set("filter", e.filter), e.deep && r.set("deep", "1"), e.size && e.size !== "all" && r.set("size", e.size);
    const s = r.toString() ? `${t}?${r.toString()}` : t;
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
var Jo = { 2(n) {
  function e(s, o, i) {
    s instanceof RegExp && (s = t(s, i)), o instanceof RegExp && (o = t(o, i));
    var a = r(s, o, i);
    return a && { start: a[0], end: a[1], pre: i.slice(0, a[0]), body: i.slice(a[0] + s.length, a[1]), post: i.slice(a[1] + o.length) };
  }
  function t(s, o) {
    var i = o.match(s);
    return i ? i[0] : null;
  }
  function r(s, o, i) {
    var a, c, l, u, h, d = i.indexOf(s), g = i.indexOf(o, d + 1), _ = d;
    if (d >= 0 && g > 0) {
      for (a = [], l = i.length; _ >= 0 && !h; ) _ == d ? (a.push(_), d = i.indexOf(s, _ + 1)) : a.length == 1 ? h = [a.pop(), g] : ((c = a.pop()) < l && (l = c, u = g), g = i.indexOf(o, _ + 1)), _ = d < g && d >= 0 ? d : g;
      a.length && (h = [l, u]);
    }
    return h;
  }
  n.exports = e, e.range = r;
}, 101(n, e, t) {
  var r;
  n = t.nmd(n), (function() {
    n && n.exports, typeof global == "object" && global;
    var s = function(l) {
      this.message = l;
    };
    (s.prototype = new Error()).name = "InvalidCharacterError";
    var o = function(l) {
      throw new s(l);
    }, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = /[\t\n\f\r ]/g, c = { encode: function(l) {
      l = String(l), /[^\0-\xFF]/.test(l) && o("The string to be encoded contains characters outside of the Latin1 range.");
      for (var u, h, d, g, _ = l.length % 3, m = "", v = -1, b = l.length - _; ++v < b; ) u = l.charCodeAt(v) << 16, h = l.charCodeAt(++v) << 8, d = l.charCodeAt(++v), m += i.charAt((g = u + h + d) >> 18 & 63) + i.charAt(g >> 12 & 63) + i.charAt(g >> 6 & 63) + i.charAt(63 & g);
      return _ == 2 ? (u = l.charCodeAt(v) << 8, h = l.charCodeAt(++v), m += i.charAt((g = u + h) >> 10) + i.charAt(g >> 4 & 63) + i.charAt(g << 2 & 63) + "=") : _ == 1 && (g = l.charCodeAt(v), m += i.charAt(g >> 2) + i.charAt(g << 4 & 63) + "=="), m;
    }, decode: function(l) {
      var u = (l = String(l).replace(a, "")).length;
      u % 4 == 0 && (u = (l = l.replace(/==?$/, "")).length), (u % 4 == 1 || /[^+a-zA-Z0-9/]/.test(l)) && o("Invalid character: the string to be decoded is not correctly encoded.");
      for (var h, d, g = 0, _ = "", m = -1; ++m < u; ) d = i.indexOf(l.charAt(m)), h = g % 4 ? 64 * h + d : d, g++ % 4 && (_ += String.fromCharCode(255 & h >> (-2 * g & 6)));
      return _;
    }, version: "1.0.0" };
    (r = (function() {
      return c;
    }).call(e, t, e, n)) === void 0 || (n.exports = r);
  })();
}, 172(n, e) {
  e.d = function(t) {
    if (!t) return 0;
    for (var r = (t = t.toString()).length, s = t.length; s--; ) {
      var o = t.charCodeAt(s);
      56320 <= o && o <= 57343 && s--, 127 < o && o <= 2047 ? r++ : 2047 < o && o <= 65535 && (r += 2);
    }
    return r;
  };
}, 526(n) {
  var e = { utf8: { stringToBytes: function(t) {
    return e.bin.stringToBytes(unescape(encodeURIComponent(t)));
  }, bytesToString: function(t) {
    return decodeURIComponent(escape(e.bin.bytesToString(t)));
  } }, bin: { stringToBytes: function(t) {
    for (var r = [], s = 0; s < t.length; s++) r.push(255 & t.charCodeAt(s));
    return r;
  }, bytesToString: function(t) {
    for (var r = [], s = 0; s < t.length; s++) r.push(String.fromCharCode(t[s]));
    return r.join("");
  } } };
  n.exports = e;
}, 298(n) {
  var e, t;
  e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = { rotl: function(r, s) {
    return r << s | r >>> 32 - s;
  }, rotr: function(r, s) {
    return r << 32 - s | r >>> s;
  }, endian: function(r) {
    if (r.constructor == Number) return 16711935 & t.rotl(r, 8) | 4278255360 & t.rotl(r, 24);
    for (var s = 0; s < r.length; s++) r[s] = t.endian(r[s]);
    return r;
  }, randomBytes: function(r) {
    for (var s = []; r > 0; r--) s.push(Math.floor(256 * Math.random()));
    return s;
  }, bytesToWords: function(r) {
    for (var s = [], o = 0, i = 0; o < r.length; o++, i += 8) s[i >>> 5] |= r[o] << 24 - i % 32;
    return s;
  }, wordsToBytes: function(r) {
    for (var s = [], o = 0; o < 32 * r.length; o += 8) s.push(r[o >>> 5] >>> 24 - o % 32 & 255);
    return s;
  }, bytesToHex: function(r) {
    for (var s = [], o = 0; o < r.length; o++) s.push((r[o] >>> 4).toString(16)), s.push((15 & r[o]).toString(16));
    return s.join("");
  }, hexToBytes: function(r) {
    for (var s = [], o = 0; o < r.length; o += 2) s.push(parseInt(r.substr(o, 2), 16));
    return s;
  }, bytesToBase64: function(r) {
    for (var s = [], o = 0; o < r.length; o += 3) for (var i = r[o] << 16 | r[o + 1] << 8 | r[o + 2], a = 0; a < 4; a++) 8 * o + 6 * a <= 8 * r.length ? s.push(e.charAt(i >>> 6 * (3 - a) & 63)) : s.push("=");
    return s.join("");
  }, base64ToBytes: function(r) {
    r = r.replace(/[^A-Z0-9+\/]/gi, "");
    for (var s = [], o = 0, i = 0; o < r.length; i = ++o % 4) i != 0 && s.push((e.indexOf(r.charAt(o - 1)) & Math.pow(2, -2 * i + 8) - 1) << 2 * i | e.indexOf(r.charAt(o)) >>> 6 - 2 * i);
    return s;
  } }, n.exports = t;
}, 135(n) {
  function e(t) {
    return !!t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
  }
  n.exports = function(t) {
    return t != null && (e(t) || (function(r) {
      return typeof r.readFloatLE == "function" && typeof r.slice == "function" && e(r.slice(0, 0));
    })(t) || !!t._isBuffer);
  };
}, 542(n, e, t) {
  (function() {
    var r = t(298), s = t(526).utf8, o = t(135), i = t(526).bin, a = function(c, l) {
      c.constructor == String ? c = l && l.encoding === "binary" ? i.stringToBytes(c) : s.stringToBytes(c) : o(c) ? c = Array.prototype.slice.call(c, 0) : Array.isArray(c) || c.constructor === Uint8Array || (c = c.toString());
      for (var u = r.bytesToWords(c), h = 8 * c.length, d = 1732584193, g = -271733879, _ = -1732584194, m = 271733878, v = 0; v < u.length; v++) u[v] = 16711935 & (u[v] << 8 | u[v] >>> 24) | 4278255360 & (u[v] << 24 | u[v] >>> 8);
      u[h >>> 5] |= 128 << h % 32, u[14 + (h + 64 >>> 9 << 4)] = h;
      var b = a._ff, y = a._gg, w = a._hh, x = a._ii;
      for (v = 0; v < u.length; v += 16) {
        var $ = d, k = g, P = _, A = m;
        d = b(d, g, _, m, u[v + 0], 7, -680876936), m = b(m, d, g, _, u[v + 1], 12, -389564586), _ = b(_, m, d, g, u[v + 2], 17, 606105819), g = b(g, _, m, d, u[v + 3], 22, -1044525330), d = b(d, g, _, m, u[v + 4], 7, -176418897), m = b(m, d, g, _, u[v + 5], 12, 1200080426), _ = b(_, m, d, g, u[v + 6], 17, -1473231341), g = b(g, _, m, d, u[v + 7], 22, -45705983), d = b(d, g, _, m, u[v + 8], 7, 1770035416), m = b(m, d, g, _, u[v + 9], 12, -1958414417), _ = b(_, m, d, g, u[v + 10], 17, -42063), g = b(g, _, m, d, u[v + 11], 22, -1990404162), d = b(d, g, _, m, u[v + 12], 7, 1804603682), m = b(m, d, g, _, u[v + 13], 12, -40341101), _ = b(_, m, d, g, u[v + 14], 17, -1502002290), d = y(d, g = b(g, _, m, d, u[v + 15], 22, 1236535329), _, m, u[v + 1], 5, -165796510), m = y(m, d, g, _, u[v + 6], 9, -1069501632), _ = y(_, m, d, g, u[v + 11], 14, 643717713), g = y(g, _, m, d, u[v + 0], 20, -373897302), d = y(d, g, _, m, u[v + 5], 5, -701558691), m = y(m, d, g, _, u[v + 10], 9, 38016083), _ = y(_, m, d, g, u[v + 15], 14, -660478335), g = y(g, _, m, d, u[v + 4], 20, -405537848), d = y(d, g, _, m, u[v + 9], 5, 568446438), m = y(m, d, g, _, u[v + 14], 9, -1019803690), _ = y(_, m, d, g, u[v + 3], 14, -187363961), g = y(g, _, m, d, u[v + 8], 20, 1163531501), d = y(d, g, _, m, u[v + 13], 5, -1444681467), m = y(m, d, g, _, u[v + 2], 9, -51403784), _ = y(_, m, d, g, u[v + 7], 14, 1735328473), d = w(d, g = y(g, _, m, d, u[v + 12], 20, -1926607734), _, m, u[v + 5], 4, -378558), m = w(m, d, g, _, u[v + 8], 11, -2022574463), _ = w(_, m, d, g, u[v + 11], 16, 1839030562), g = w(g, _, m, d, u[v + 14], 23, -35309556), d = w(d, g, _, m, u[v + 1], 4, -1530992060), m = w(m, d, g, _, u[v + 4], 11, 1272893353), _ = w(_, m, d, g, u[v + 7], 16, -155497632), g = w(g, _, m, d, u[v + 10], 23, -1094730640), d = w(d, g, _, m, u[v + 13], 4, 681279174), m = w(m, d, g, _, u[v + 0], 11, -358537222), _ = w(_, m, d, g, u[v + 3], 16, -722521979), g = w(g, _, m, d, u[v + 6], 23, 76029189), d = w(d, g, _, m, u[v + 9], 4, -640364487), m = w(m, d, g, _, u[v + 12], 11, -421815835), _ = w(_, m, d, g, u[v + 15], 16, 530742520), d = x(d, g = w(g, _, m, d, u[v + 2], 23, -995338651), _, m, u[v + 0], 6, -198630844), m = x(m, d, g, _, u[v + 7], 10, 1126891415), _ = x(_, m, d, g, u[v + 14], 15, -1416354905), g = x(g, _, m, d, u[v + 5], 21, -57434055), d = x(d, g, _, m, u[v + 12], 6, 1700485571), m = x(m, d, g, _, u[v + 3], 10, -1894986606), _ = x(_, m, d, g, u[v + 10], 15, -1051523), g = x(g, _, m, d, u[v + 1], 21, -2054922799), d = x(d, g, _, m, u[v + 8], 6, 1873313359), m = x(m, d, g, _, u[v + 15], 10, -30611744), _ = x(_, m, d, g, u[v + 6], 15, -1560198380), g = x(g, _, m, d, u[v + 13], 21, 1309151649), d = x(d, g, _, m, u[v + 4], 6, -145523070), m = x(m, d, g, _, u[v + 11], 10, -1120210379), _ = x(_, m, d, g, u[v + 2], 15, 718787259), g = x(g, _, m, d, u[v + 9], 21, -343485551), d = d + $ >>> 0, g = g + k >>> 0, _ = _ + P >>> 0, m = m + A >>> 0;
      }
      return r.endian([d, g, _, m]);
    };
    a._ff = function(c, l, u, h, d, g, _) {
      var m = c + (l & u | ~l & h) + (d >>> 0) + _;
      return (m << g | m >>> 32 - g) + l;
    }, a._gg = function(c, l, u, h, d, g, _) {
      var m = c + (l & h | u & ~h) + (d >>> 0) + _;
      return (m << g | m >>> 32 - g) + l;
    }, a._hh = function(c, l, u, h, d, g, _) {
      var m = c + (l ^ u ^ h) + (d >>> 0) + _;
      return (m << g | m >>> 32 - g) + l;
    }, a._ii = function(c, l, u, h, d, g, _) {
      var m = c + (u ^ (l | ~h)) + (d >>> 0) + _;
      return (m << g | m >>> 32 - g) + l;
    }, a._blocksize = 16, a._digestsize = 16, n.exports = function(c, l) {
      if (c == null) throw new Error("Illegal argument " + c);
      var u = r.wordsToBytes(a(c, l));
      return l && l.asBytes ? u : l && l.asString ? i.bytesToString(u) : r.bytesToHex(u);
    };
  })();
}, 285(n, e, t) {
  var r = t(2);
  n.exports = function(b, y) {
    if (!b) return [];
    var w = (y = y || {}).max == null ? 1 / 0 : y.max;
    return b.substr(0, 2) === "{}" && (b = "\\{\\}" + b.substr(2)), v((function(x) {
      return x.split("\\\\").join(s).split("\\{").join(o).split("\\}").join(i).split("\\,").join(a).split("\\.").join(c);
    })(b), w, !0).map(u);
  };
  var s = "\0SLASH" + Math.random() + "\0", o = "\0OPEN" + Math.random() + "\0", i = "\0CLOSE" + Math.random() + "\0", a = "\0COMMA" + Math.random() + "\0", c = "\0PERIOD" + Math.random() + "\0";
  function l(b) {
    return parseInt(b, 10) == b ? parseInt(b, 10) : b.charCodeAt(0);
  }
  function u(b) {
    return b.split(s).join("\\").split(o).join("{").split(i).join("}").split(a).join(",").split(c).join(".");
  }
  function h(b) {
    if (!b) return [""];
    var y = [], w = r("{", "}", b);
    if (!w) return b.split(",");
    var x = w.pre, $ = w.body, k = w.post, P = x.split(",");
    P[P.length - 1] += "{" + $ + "}";
    var A = h(k);
    return k.length && (P[P.length - 1] += A.shift(), P.push.apply(P, A)), y.push.apply(y, P), y;
  }
  function d(b) {
    return "{" + b + "}";
  }
  function g(b) {
    return /^-?0\d/.test(b);
  }
  function _(b, y) {
    return b <= y;
  }
  function m(b, y) {
    return b >= y;
  }
  function v(b, y, w) {
    var x = [], $ = r("{", "}", b);
    if (!$) return [b];
    var k = $.pre, P = $.post.length ? v($.post, y, !1) : [""];
    if (/\$$/.test($.pre)) for (var A = 0; A < P.length && A < y; A++) {
      var M = k + "{" + $.body + "}" + P[A];
      x.push(M);
    }
    else {
      var j, F, q = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test($.body), T = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test($.body), Y = q || T, K = $.body.indexOf(",") >= 0;
      if (!Y && !K) return $.post.match(/,(?!,).*\}/) ? v(b = $.pre + "{" + $.body + i + $.post, y, !0) : [b];
      if (Y) j = $.body.split(/\.\./);
      else if ((j = h($.body)).length === 1 && (j = v(j[0], y, !1).map(d)).length === 1) return P.map((function(at) {
        return $.pre + j[0] + at;
      }));
      if (Y) {
        var Q = l(j[0]), D = l(j[1]), I = Math.max(j[0].length, j[1].length), N = j.length == 3 ? Math.max(Math.abs(l(j[2])), 1) : 1, O = _;
        D < Q && (N *= -1, O = m);
        var z = j.some(g);
        F = [];
        for (var G = Q; O(G, D); G += N) {
          var se;
          if (T) (se = String.fromCharCode(G)) === "\\" && (se = "");
          else if (se = String(G), z) {
            var fe = I - se.length;
            if (fe > 0) {
              var Ce = new Array(fe + 1).join("0");
              se = G < 0 ? "-" + Ce + se.slice(1) : Ce + se;
            }
          }
          F.push(se);
        }
      } else {
        F = [];
        for (var pe = 0; pe < j.length; pe++) F.push.apply(F, v(j[pe], y, !1));
      }
      for (pe = 0; pe < F.length; pe++) for (A = 0; A < P.length && x.length < y; A++) M = k + F[pe] + P[A], (!w || Y || M) && x.push(M);
    }
    return x;
  }
}, 829(n) {
  function e(l) {
    return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(u) {
      return typeof u;
    } : function(u) {
      return u && typeof Symbol == "function" && u.constructor === Symbol && u !== Symbol.prototype ? "symbol" : typeof u;
    }, e(l);
  }
  function t(l) {
    var u = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
    return t = function(h) {
      if (h === null || (d = h, Function.toString.call(d).indexOf("[native code]") === -1)) return h;
      var d;
      if (typeof h != "function") throw new TypeError("Super expression must either be null or a function");
      if (u !== void 0) {
        if (u.has(h)) return u.get(h);
        u.set(h, g);
      }
      function g() {
        return r(h, arguments, o(this).constructor);
      }
      return g.prototype = Object.create(h.prototype, { constructor: { value: g, enumerable: !1, writable: !0, configurable: !0 } }), s(g, h);
    }, t(l);
  }
  function r(l, u, h) {
    return r = (function() {
      if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
      if (typeof Proxy == "function") return !0;
      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {
        }))), !0;
      } catch {
        return !1;
      }
    })() ? Reflect.construct : function(d, g, _) {
      var m = [null];
      m.push.apply(m, g);
      var v = new (Function.bind.apply(d, m))();
      return _ && s(v, _.prototype), v;
    }, r.apply(null, arguments);
  }
  function s(l, u) {
    return s = Object.setPrototypeOf || function(h, d) {
      return h.__proto__ = d, h;
    }, s(l, u);
  }
  function o(l) {
    return o = Object.setPrototypeOf ? Object.getPrototypeOf : function(u) {
      return u.__proto__ || Object.getPrototypeOf(u);
    }, o(l);
  }
  var i = (function(l) {
    function u(h) {
      var d;
      return (function(g, _) {
        if (!(g instanceof _)) throw new TypeError("Cannot call a class as a function");
      })(this, u), (d = (function(g, _) {
        return !_ || e(_) !== "object" && typeof _ != "function" ? (function(m) {
          if (m === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return m;
        })(g) : _;
      })(this, o(u).call(this, h))).name = "ObjectPrototypeMutationError", d;
    }
    return (function(h, d) {
      if (typeof d != "function" && d !== null) throw new TypeError("Super expression must either be null or a function");
      h.prototype = Object.create(d && d.prototype, { constructor: { value: h, writable: !0, configurable: !0 } }), d && s(h, d);
    })(u, l), u;
  })(t(Error));
  function a(l, u) {
    for (var h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
    }, d = u.split("."), g = d.length, _ = function(b) {
      var y = d[b];
      if (!l) return { v: void 0 };
      if (y === "+") {
        if (Array.isArray(l)) return { v: l.map((function(x, $) {
          var k = d.slice(b + 1);
          return k.length > 0 ? a(x, k.join("."), h) : h(l, $, d, b);
        })) };
        var w = d.slice(0, b).join(".");
        throw new Error("Object at wildcard (".concat(w, ") is not an array"));
      }
      l = h(l, y, d, b);
    }, m = 0; m < g; m++) {
      var v = _(m);
      if (e(v) === "object") return v.v;
    }
    return l;
  }
  function c(l, u) {
    return l.length === u + 1;
  }
  n.exports = { set: function(l, u, h) {
    if (e(l) != "object" || l === null || u === void 0) return l;
    if (typeof u == "number") return l[u] = h, l[u];
    try {
      return a(l, u, (function(d, g, _, m) {
        if (d === Reflect.getPrototypeOf({})) throw new i("Attempting to mutate Object.prototype");
        if (!d[g]) {
          var v = Number.isInteger(Number(_[m + 1])), b = _[m + 1] === "+";
          d[g] = v || b ? [] : {};
        }
        return c(_, m) && (d[g] = h), d[g];
      }));
    } catch (d) {
      if (d instanceof i) throw d;
      return l;
    }
  }, get: function(l, u) {
    if (e(l) != "object" || l === null || u === void 0) return l;
    if (typeof u == "number") return l[u];
    try {
      return a(l, u, (function(h, d) {
        return h[d];
      }));
    } catch {
      return l;
    }
  }, has: function(l, u) {
    var h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (e(l) != "object" || l === null || u === void 0) return !1;
    if (typeof u == "number") return u in l;
    try {
      var d = !1;
      return a(l, u, (function(g, _, m, v) {
        if (!c(m, v)) return g && g[_];
        d = h.own ? g.hasOwnProperty(_) : _ in g;
      })), d;
    } catch {
      return !1;
    }
  }, hasOwn: function(l, u, h) {
    return this.has(l, u, h || { own: !0 });
  }, isIn: function(l, u, h) {
    var d = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    if (e(l) != "object" || l === null || u === void 0) return !1;
    try {
      var g = !1, _ = !1;
      return a(l, u, (function(m, v, b, y) {
        return g = g || m === h || !!m && m[v] === h, _ = c(b, y) && e(m) === "object" && v in m, m && m[v];
      })), d.validPath ? g && _ : g;
    } catch {
      return !1;
    }
  }, ObjectPrototypeMutationError: i };
}, 47(n, e, t) {
  var r = t(410), s = function(l) {
    return typeof l == "string";
  };
  function o(l, u) {
    for (var h = [], d = 0; d < l.length; d++) {
      var g = l[d];
      g && g !== "." && (g === ".." ? h.length && h[h.length - 1] !== ".." ? h.pop() : u && h.push("..") : h.push(g));
    }
    return h;
  }
  var i = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, a = {};
  function c(l) {
    return i.exec(l).slice(1);
  }
  a.resolve = function() {
    for (var l = "", u = !1, h = arguments.length - 1; h >= -1 && !u; h--) {
      var d = h >= 0 ? arguments[h] : process.cwd();
      if (!s(d)) throw new TypeError("Arguments to path.resolve must be strings");
      d && (l = d + "/" + l, u = d.charAt(0) === "/");
    }
    return (u ? "/" : "") + (l = o(l.split("/"), !u).join("/")) || ".";
  }, a.normalize = function(l) {
    var u = a.isAbsolute(l), h = l.substr(-1) === "/";
    return (l = o(l.split("/"), !u).join("/")) || u || (l = "."), l && h && (l += "/"), (u ? "/" : "") + l;
  }, a.isAbsolute = function(l) {
    return l.charAt(0) === "/";
  }, a.join = function() {
    for (var l = "", u = 0; u < arguments.length; u++) {
      var h = arguments[u];
      if (!s(h)) throw new TypeError("Arguments to path.join must be strings");
      h && (l += l ? "/" + h : h);
    }
    return a.normalize(l);
  }, a.relative = function(l, u) {
    function h(y) {
      for (var w = 0; w < y.length && y[w] === ""; w++) ;
      for (var x = y.length - 1; x >= 0 && y[x] === ""; x--) ;
      return w > x ? [] : y.slice(w, x + 1);
    }
    l = a.resolve(l).substr(1), u = a.resolve(u).substr(1);
    for (var d = h(l.split("/")), g = h(u.split("/")), _ = Math.min(d.length, g.length), m = _, v = 0; v < _; v++) if (d[v] !== g[v]) {
      m = v;
      break;
    }
    var b = [];
    for (v = m; v < d.length; v++) b.push("..");
    return (b = b.concat(g.slice(m))).join("/");
  }, a._makeLong = function(l) {
    return l;
  }, a.dirname = function(l) {
    var u = c(l), h = u[0], d = u[1];
    return h || d ? (d && (d = d.substr(0, d.length - 1)), h + d) : ".";
  }, a.basename = function(l, u) {
    var h = c(l)[2];
    return u && h.substr(-1 * u.length) === u && (h = h.substr(0, h.length - u.length)), h;
  }, a.extname = function(l) {
    return c(l)[3];
  }, a.format = function(l) {
    if (!r.isObject(l)) throw new TypeError("Parameter 'pathObject' must be an object, not " + typeof l);
    var u = l.root || "";
    if (!s(u)) throw new TypeError("'pathObject.root' must be a string or undefined, not " + typeof l.root);
    return (l.dir ? l.dir + a.sep : "") + (l.base || "");
  }, a.parse = function(l) {
    if (!s(l)) throw new TypeError("Parameter 'pathString' must be a string, not " + typeof l);
    var u = c(l);
    if (!u || u.length !== 4) throw new TypeError("Invalid path '" + l + "'");
    return u[1] = u[1] || "", u[2] = u[2] || "", u[3] = u[3] || "", { root: u[0], dir: u[0] + u[1].slice(0, u[1].length - 1), base: u[2], ext: u[3], name: u[2].slice(0, u[2].length - u[3].length) };
  }, a.sep = "/", a.delimiter = ":", n.exports = a;
}, 647(n, e) {
  var t = Object.prototype.hasOwnProperty;
  function r(o) {
    try {
      return decodeURIComponent(o.replace(/\+/g, " "));
    } catch {
      return null;
    }
  }
  function s(o) {
    try {
      return encodeURIComponent(o);
    } catch {
      return null;
    }
  }
  e.stringify = function(o, i) {
    i = i || "";
    var a, c, l = [];
    for (c in typeof i != "string" && (i = "?"), o) if (t.call(o, c)) {
      if ((a = o[c]) || a != null && !isNaN(a) || (a = ""), c = s(c), a = s(a), c === null || a === null) continue;
      l.push(c + "=" + a);
    }
    return l.length ? i + l.join("&") : "";
  }, e.parse = function(o) {
    for (var i, a = /([^=?#&]+)=?([^&]*)/g, c = {}; i = a.exec(o); ) {
      var l = r(i[1]), u = r(i[2]);
      l === null || u === null || l in c || (c[l] = u);
    }
    return c;
  };
}, 670(n) {
  n.exports = function(e, t) {
    if (t = t.split(":")[0], !(e = +e)) return !1;
    switch (t) {
      case "http":
      case "ws":
        return e !== 80;
      case "https":
      case "wss":
        return e !== 443;
      case "ftp":
        return e !== 21;
      case "gopher":
        return e !== 70;
      case "file":
        return !1;
    }
    return e !== 0;
  };
}, 737(n, e, t) {
  var r = t(670), s = t(647), o = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, i = /[\n\r\t]/g, a = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, c = /:\d+$/, l = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, u = /^[a-zA-Z]:/;
  function h(y) {
    return (y || "").toString().replace(o, "");
  }
  var d = [["#", "hash"], ["?", "query"], function(y, w) {
    return m(w.protocol) ? y.replace(/\\/g, "/") : y;
  }, ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/:(\d*)$/, "port", void 0, 1], [NaN, "hostname", void 0, 1, 1]], g = { hash: 1, query: 1 };
  function _(y) {
    var w, x = (typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}).location || {}, $ = {}, k = typeof (y = y || x);
    if (y.protocol === "blob:") $ = new b(unescape(y.pathname), {});
    else if (k === "string") for (w in $ = new b(y, {}), g) delete $[w];
    else if (k === "object") {
      for (w in y) w in g || ($[w] = y[w]);
      $.slashes === void 0 && ($.slashes = a.test(y.href));
    }
    return $;
  }
  function m(y) {
    return y === "file:" || y === "ftp:" || y === "http:" || y === "https:" || y === "ws:" || y === "wss:";
  }
  function v(y, w) {
    y = (y = h(y)).replace(i, ""), w = w || {};
    var x, $ = l.exec(y), k = $[1] ? $[1].toLowerCase() : "", P = !!$[2], A = !!$[3], M = 0;
    return P ? A ? (x = $[2] + $[3] + $[4], M = $[2].length + $[3].length) : (x = $[2] + $[4], M = $[2].length) : A ? (x = $[3] + $[4], M = $[3].length) : x = $[4], k === "file:" ? M >= 2 && (x = x.slice(2)) : m(k) ? x = $[4] : k ? P && (x = x.slice(2)) : M >= 2 && m(w.protocol) && (x = $[4]), { protocol: k, slashes: P || m(k), slashesCount: M, rest: x };
  }
  function b(y, w, x) {
    if (y = (y = h(y)).replace(i, ""), !(this instanceof b)) return new b(y, w, x);
    var $, k, P, A, M, j, F = d.slice(), q = typeof w, T = this, Y = 0;
    for (q !== "object" && q !== "string" && (x = w, w = null), x && typeof x != "function" && (x = s.parse), $ = !(k = v(y || "", w = _(w))).protocol && !k.slashes, T.slashes = k.slashes || $ && w.slashes, T.protocol = k.protocol || w.protocol || "", y = k.rest, (k.protocol === "file:" && (k.slashesCount !== 2 || u.test(y)) || !k.slashes && (k.protocol || k.slashesCount < 2 || !m(T.protocol))) && (F[3] = [/(.*)/, "pathname"]); Y < F.length; Y++) typeof (A = F[Y]) != "function" ? (P = A[0], j = A[1], P != P ? T[j] = y : typeof P == "string" ? ~(M = P === "@" ? y.lastIndexOf(P) : y.indexOf(P)) && (typeof A[2] == "number" ? (T[j] = y.slice(0, M), y = y.slice(M + A[2])) : (T[j] = y.slice(M), y = y.slice(0, M))) : (M = P.exec(y)) && (T[j] = M[1], y = y.slice(0, M.index)), T[j] = T[j] || $ && A[3] && w[j] || "", A[4] && (T[j] = T[j].toLowerCase())) : y = A(y, T);
    x && (T.query = x(T.query)), $ && w.slashes && T.pathname.charAt(0) !== "/" && (T.pathname !== "" || w.pathname !== "") && (T.pathname = (function(K, Q) {
      if (K === "") return Q;
      for (var D = (Q || "/").split("/").slice(0, -1).concat(K.split("/")), I = D.length, N = D[I - 1], O = !1, z = 0; I--; ) D[I] === "." ? D.splice(I, 1) : D[I] === ".." ? (D.splice(I, 1), z++) : z && (I === 0 && (O = !0), D.splice(I, 1), z--);
      return O && D.unshift(""), N !== "." && N !== ".." || D.push(""), D.join("/");
    })(T.pathname, w.pathname)), T.pathname.charAt(0) !== "/" && m(T.protocol) && (T.pathname = "/" + T.pathname), r(T.port, T.protocol) || (T.host = T.hostname, T.port = ""), T.username = T.password = "", T.auth && (~(M = T.auth.indexOf(":")) ? (T.username = T.auth.slice(0, M), T.username = encodeURIComponent(decodeURIComponent(T.username)), T.password = T.auth.slice(M + 1), T.password = encodeURIComponent(decodeURIComponent(T.password))) : T.username = encodeURIComponent(decodeURIComponent(T.auth)), T.auth = T.password ? T.username + ":" + T.password : T.username), T.origin = T.protocol !== "file:" && m(T.protocol) && T.host ? T.protocol + "//" + T.host : "null", T.href = T.toString();
  }
  b.prototype = { set: function(y, w, x) {
    var $ = this;
    switch (y) {
      case "query":
        typeof w == "string" && w.length && (w = (x || s.parse)(w)), $[y] = w;
        break;
      case "port":
        $[y] = w, r(w, $.protocol) ? w && ($.host = $.hostname + ":" + w) : ($.host = $.hostname, $[y] = "");
        break;
      case "hostname":
        $[y] = w, $.port && (w += ":" + $.port), $.host = w;
        break;
      case "host":
        $[y] = w, c.test(w) ? (w = w.split(":"), $.port = w.pop(), $.hostname = w.join(":")) : ($.hostname = w, $.port = "");
        break;
      case "protocol":
        $.protocol = w.toLowerCase(), $.slashes = !x;
        break;
      case "pathname":
      case "hash":
        if (w) {
          var k = y === "pathname" ? "/" : "#";
          $[y] = w.charAt(0) !== k ? k + w : w;
        } else $[y] = w;
        break;
      case "username":
      case "password":
        $[y] = encodeURIComponent(w);
        break;
      case "auth":
        var P = w.indexOf(":");
        ~P ? ($.username = w.slice(0, P), $.username = encodeURIComponent(decodeURIComponent($.username)), $.password = w.slice(P + 1), $.password = encodeURIComponent(decodeURIComponent($.password))) : $.username = encodeURIComponent(decodeURIComponent(w));
    }
    for (var A = 0; A < d.length; A++) {
      var M = d[A];
      M[4] && ($[M[1]] = $[M[1]].toLowerCase());
    }
    return $.auth = $.password ? $.username + ":" + $.password : $.username, $.origin = $.protocol !== "file:" && m($.protocol) && $.host ? $.protocol + "//" + $.host : "null", $.href = $.toString(), $;
  }, toString: function(y) {
    y && typeof y == "function" || (y = s.stringify);
    var w, x = this, $ = x.host, k = x.protocol;
    k && k.charAt(k.length - 1) !== ":" && (k += ":");
    var P = k + (x.protocol && x.slashes || m(x.protocol) ? "//" : "");
    return x.username ? (P += x.username, x.password && (P += ":" + x.password), P += "@") : x.password ? (P += ":" + x.password, P += "@") : x.protocol !== "file:" && m(x.protocol) && !$ && x.pathname !== "/" && (P += "@"), ($[$.length - 1] === ":" || c.test(x.hostname) && !x.port) && ($ += ":"), P += $ + x.pathname, (w = typeof x.query == "object" ? y(x.query) : x.query) && (P += w.charAt(0) !== "?" ? "?" + w : w), x.hash && (P += x.hash), P;
  } }, b.extractProtocol = v, b.location = _, b.trimLeft = h, b.qs = s, n.exports = b;
}, 410() {
}, 388() {
}, 805() {
}, 345() {
}, 800() {
} }, Tr = {};
function me(n) {
  var e = Tr[n];
  if (e !== void 0) return e.exports;
  var t = Tr[n] = { id: n, loaded: !1, exports: {} };
  return Jo[n].call(t.exports, t, t.exports, me), t.loaded = !0, t.exports;
}
me.n = (n) => {
  var e = n && n.__esModule ? () => n.default : () => n;
  return me.d(e, { a: e }), e;
}, me.d = (n, e) => {
  for (var t in e) me.o(e, t) && !me.o(n, t) && Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
}, me.o = (n, e) => Object.prototype.hasOwnProperty.call(n, e), me.nmd = (n) => (n.paths = [], n.children || (n.children = []), n);
var Zo = me(737), ei = me.n(Zo);
function $n(n) {
  if (!jn(n)) throw new Error("Parameter was not an error");
}
function jn(n) {
  return !!n && typeof n == "object" && (e = n, Object.prototype.toString.call(e) === "[object Error]") || n instanceof Error;
  var e;
}
class Me extends Error {
  constructor(e, t) {
    const r = [...arguments], { options: s, shortMessage: o } = (function(a) {
      let c, l = "";
      if (a.length === 0) c = {};
      else if (jn(a[0])) c = { cause: a[0] }, l = a.slice(1).join(" ") || "";
      else if (a[0] && typeof a[0] == "object") c = Object.assign({}, a[0]), l = a.slice(1).join(" ") || "";
      else {
        if (typeof a[0] != "string") throw new Error("Invalid arguments passed to Layerr");
        c = {}, l = l = a.join(" ") || "";
      }
      return { options: c, shortMessage: l };
    })(r);
    let i = o;
    if (s.cause && (i = `${i}: ${s.cause.message}`), super(i), this.message = i, s.name && typeof s.name == "string" ? this.name = s.name : this.name = "Layerr", s.cause && Object.defineProperty(this, "_cause", { value: s.cause }), Object.defineProperty(this, "_info", { value: {} }), s.info && typeof s.info == "object" && Object.assign(this._info, s.info), Error.captureStackTrace) {
      const a = s.constructorOpt || this.constructor;
      Error.captureStackTrace(this, a);
    }
  }
  static cause(e) {
    return $n(e), e._cause && jn(e._cause) ? e._cause : null;
  }
  static fullStack(e) {
    $n(e);
    const t = Me.cause(e);
    return t ? `${e.stack}
caused by: ${Me.fullStack(t)}` : e.stack ?? "";
  }
  static info(e) {
    $n(e);
    const t = {}, r = Me.cause(e);
    return r && Object.assign(t, Me.info(r)), e._info && Object.assign(t, e._info), t;
  }
  toString() {
    let e = this.name || this.constructor.name || this.constructor.prototype.name;
    return this.message && (e = `${e}: ${this.message}`), e;
  }
}
var ti = me(47), tn = me.n(ti);
const Ar = "__PATH_SEPARATOR_POSIX__", Nr = "__PATH_SEPARATOR_WINDOWS__";
function _e(n) {
  try {
    const e = n.replace(/\//g, Ar).replace(/\\\\/g, Nr);
    return encodeURIComponent(e).split(Nr).join("\\\\").split(Ar).join("/");
  } catch (e) {
    throw new Me(e, "Failed encoding path");
  }
}
function Ir(n) {
  return n.startsWith("/") ? n : "/" + n;
}
function Ut(n) {
  let e = n;
  return e[0] !== "/" && (e = "/" + e), /^.+\/$/.test(e) && (e = e.substr(0, e.length - 1)), e;
}
function ni(n) {
  let e = new (ei())(n).pathname;
  return e.length <= 0 && (e = "/"), Ut(e);
}
function ye() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++) e[t] = arguments[t];
  return (function() {
    return (function(r) {
      var s = [];
      if (r.length === 0) return "";
      if (typeof r[0] != "string") throw new TypeError("Url must be a string. Received " + r[0]);
      if (r[0].match(/^[^/:]+:\/*$/) && r.length > 1) {
        var o = r.shift();
        r[0] = o + r[0];
      }
      r[0].match(/^file:\/\/\//) ? r[0] = r[0].replace(/^([^/:]+):\/*/, "$1:///") : r[0] = r[0].replace(/^([^/:]+):\/*/, "$1://");
      for (var i = 0; i < r.length; i++) {
        var a = r[i];
        if (typeof a != "string") throw new TypeError("Url must be a string. Received " + a);
        a !== "" && (i > 0 && (a = a.replace(/^[\/]+/, "")), a = i < r.length - 1 ? a.replace(/[\/]+$/, "") : a.replace(/[\/]+$/, "/"), s.push(a));
      }
      var c = s.join("/"), l = (c = c.replace(/\/(\?|&|#[^!])/g, "$1")).split("?");
      return l.shift() + (l.length > 0 ? "?" : "") + l.join("&");
    })(typeof arguments[0] == "object" ? arguments[0] : [].slice.call(arguments));
  })(e.reduce(((r, s, o) => ((o === 0 || s !== "/" || s === "/" && r[r.length - 1] !== "/") && r.push(s), r)), []));
}
var ri = me(542), At = me.n(ri);
function Dr(n, e) {
  const t = n.url.replace("//", ""), r = t.indexOf("/") == -1 ? "/" : t.slice(t.indexOf("/")), s = n.method ? n.method.toUpperCase() : "GET", o = !!/(^|,)\s*auth\s*($|,)/.test(e.qop) && "auth", i = `00000000${e.nc}`.slice(-8), a = (function(d, g, _, m, v, b, y) {
    const w = y || At()(`${g}:${_}:${m}`);
    return d && d.toLowerCase() === "md5-sess" ? At()(`${w}:${v}:${b}`) : w;
  })(e.algorithm, e.username, e.realm, e.password, e.nonce, e.cnonce, e.ha1), c = At()(`${s}:${r}`), l = o ? At()(`${a}:${e.nonce}:${i}:${e.cnonce}:${o}:${c}`) : At()(`${a}:${e.nonce}:${c}`), u = { username: e.username, realm: e.realm, nonce: e.nonce, uri: r, qop: o, response: l, nc: i, cnonce: e.cnonce, algorithm: e.algorithm, opaque: e.opaque }, h = [];
  for (const d in u) u[d] && (d === "qop" || d === "nc" || d === "algorithm" ? h.push(`${d}=${u[d]}`) : h.push(`${d}="${u[d]}"`));
  return `Digest ${h.join(", ")}`;
}
function ks(n) {
  return (n.headers && n.headers.get("www-authenticate") || "").split(/\s/)[0].toLowerCase() === "digest";
}
var si = me(101), Cs = me.n(si);
function Fr(n) {
  return Cs().decode(n);
}
function Mr(n, e) {
  var t;
  return `Basic ${t = `${n}:${e}`, Cs().encode(t)}`;
}
const Or = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : typeof window < "u" ? window : globalThis, oi = Or.fetch.bind(Or);
let Ve = (function(n) {
  return n.Auto = "auto", n.Digest = "digest", n.None = "none", n.Password = "password", n.Token = "token", n;
})({}), ft = (function(n) {
  return n.DataTypeNoLength = "data-type-no-length", n.InvalidAuthType = "invalid-auth-type", n.InvalidOutputFormat = "invalid-output-format", n.LinkUnsupportedAuthType = "link-unsupported-auth", n.InvalidUpdateRange = "invalid-update-range", n.NotSupported = "not-supported", n;
})({});
function Ps(n, e, t, r, s) {
  switch (n.authType) {
    case Ve.Auto:
      e && t && (n.headers.Authorization = Mr(e, t));
      break;
    case Ve.Digest:
      n.digest = /* @__PURE__ */ (function(i, a, c) {
        return { username: i, password: a, ha1: c, nc: 0, algorithm: "md5", hasDigestAuth: !1 };
      })(e, t, s);
      break;
    case Ve.None:
      break;
    case Ve.Password:
      n.headers.Authorization = Mr(e, t);
      break;
    case Ve.Token:
      n.headers.Authorization = `${(o = r).token_type} ${o.access_token}`;
      break;
    default:
      throw new Me({ info: { code: ft.InvalidAuthType } }, `Invalid auth type: ${n.authType}`);
  }
  var o;
}
me(345), me(800);
const Lr = "@@HOTPATCHER", ii = () => {
};
function kn(n) {
  return { original: n, methods: [n], final: !1 };
}
class ai {
  constructor() {
    this._configuration = { registry: {}, getEmptyAction: "null" }, this.__type__ = Lr;
  }
  get configuration() {
    return this._configuration;
  }
  get getEmptyAction() {
    return this.configuration.getEmptyAction;
  }
  set getEmptyAction(e) {
    this.configuration.getEmptyAction = e;
  }
  control(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
    if (!e || e.__type__ !== Lr) throw new Error("Failed taking control of target HotPatcher instance: Invalid type or object");
    return Object.keys(e.configuration.registry).forEach(((r) => {
      this.configuration.registry.hasOwnProperty(r) ? t && (this.configuration.registry[r] = Object.assign({}, e.configuration.registry[r])) : this.configuration.registry[r] = Object.assign({}, e.configuration.registry[r]);
    })), e._configuration = this.configuration, this;
  }
  execute(e) {
    const t = this.get(e) || ii;
    for (var r = arguments.length, s = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) s[o - 1] = arguments[o];
    return t(...s);
  }
  get(e) {
    const t = this.configuration.registry[e];
    if (!t) switch (this.getEmptyAction) {
      case "null":
        return null;
      case "throw":
        throw new Error(`Failed handling method request: No method provided for override: ${e}`);
      default:
        throw new Error(`Failed handling request which resulted in an empty method: Invalid empty-action specified: ${this.getEmptyAction}`);
    }
    return (function() {
      for (var r = arguments.length, s = new Array(r), o = 0; o < r; o++) s[o] = arguments[o];
      if (s.length === 0) throw new Error("Failed creating sequence: No functions provided");
      return function() {
        for (var i = arguments.length, a = new Array(i), c = 0; c < i; c++) a[c] = arguments[c];
        let l = a;
        const u = this;
        for (; s.length > 0; ) l = [s.shift().apply(u, l)];
        return l[0];
      };
    })(...t.methods);
  }
  isPatched(e) {
    return !!this.configuration.registry[e];
  }
  patch(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const { chain: s = !1 } = r;
    if (this.configuration.registry[e] && this.configuration.registry[e].final) throw new Error(`Failed patching '${e}': Method marked as being final`);
    if (typeof t != "function") throw new Error(`Failed patching '${e}': Provided method is not a function`);
    if (s) this.configuration.registry[e] ? this.configuration.registry[e].methods.push(t) : this.configuration.registry[e] = kn(t);
    else if (this.isPatched(e)) {
      const { original: o } = this.configuration.registry[e];
      this.configuration.registry[e] = Object.assign(kn(t), { original: o });
    } else this.configuration.registry[e] = kn(t);
    return this;
  }
  patchInline(e, t) {
    this.isPatched(e) || this.patch(e, t);
    for (var r = arguments.length, s = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) s[o - 2] = arguments[o];
    return this.execute(e, ...s);
  }
  plugin(e) {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) r[s - 1] = arguments[s];
    return r.forEach(((o) => {
      this.patch(e, o, { chain: !0 });
    })), this;
  }
  restore(e) {
    if (!this.isPatched(e)) throw new Error(`Failed restoring method: No method present for key: ${e}`);
    if (typeof this.configuration.registry[e].original != "function") throw new Error(`Failed restoring method: Original method not found or of invalid type for key: ${e}`);
    return this.configuration.registry[e].methods = [this.configuration.registry[e].original], this;
  }
  setFinal(e) {
    if (!this.configuration.registry.hasOwnProperty(e)) throw new Error(`Failed marking '${e}' as final: No method found for key`);
    return this.configuration.registry[e].final = !0, this;
  }
}
let Cn = null;
function li() {
  return Cn || (Cn = new ai()), Cn;
}
function nn(n) {
  return (function(e) {
    if (typeof e != "object" || e === null || Object.prototype.toString.call(e) != "[object Object]") return !1;
    if (Object.getPrototypeOf(e) === null) return !0;
    let t = e;
    for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(e) === t;
  })(n) ? Object.assign({}, n) : Object.setPrototypeOf(Object.assign({}, n), Object.getPrototypeOf(n));
}
function Rr() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++) e[t] = arguments[t];
  let r = null, s = [...e];
  for (; s.length > 0; ) {
    const o = s.shift();
    r = r ? Es(r, o) : nn(o);
  }
  return r;
}
function Es(n, e) {
  const t = nn(n);
  return Object.keys(e).forEach(((r) => {
    t.hasOwnProperty(r) ? Array.isArray(e[r]) ? t[r] = Array.isArray(t[r]) ? [...t[r], ...e[r]] : [...e[r]] : typeof e[r] == "object" && e[r] ? t[r] = typeof t[r] == "object" && t[r] ? Es(t[r], e[r]) : nn(e[r]) : t[r] = e[r] : t[r] = e[r];
  })), t;
}
function ui(n) {
  const e = {};
  for (const t of n.keys()) e[t] = n.get(t);
  return e;
}
function zn() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++) e[t] = arguments[t];
  if (e.length === 0) return {};
  const r = {};
  return e.reduce(((s, o) => (Object.keys(o).forEach(((i) => {
    const a = i.toLowerCase();
    r.hasOwnProperty(a) ? s[r[a]] = o[i] : (r[a] = i, s[i] = o[i]);
  })), s)), {});
}
me(805);
const ci = typeof ArrayBuffer == "function", { toString: di } = Object.prototype;
function Ts(n) {
  return ci && (n instanceof ArrayBuffer || di.call(n) === "[object ArrayBuffer]");
}
function As(n) {
  return n != null && n.constructor != null && typeof n.constructor.isBuffer == "function" && n.constructor.isBuffer(n);
}
function Zn(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
}
function Vn(n, e, t) {
  return t ? e ? e(n) : n : (n && n.then || (n = Promise.resolve(n)), e ? n.then(e) : n);
}
const Ns = Zn((function(n) {
  const e = n._digest;
  return delete n._digest, e.hasDigestAuth && (n = Rr(n, { headers: { Authorization: Dr(n, e) } })), Vn(rn(n), (function(t) {
    let r = !1;
    return s = function(i) {
      return r ? i : t;
    }, (o = (function() {
      if (t.status == 401) return e.hasDigestAuth = (function(i, a) {
        if (!ks(i)) return !1;
        const c = /([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;
        for (; ; ) {
          const l = i.headers && i.headers.get("www-authenticate") || "", u = c.exec(l);
          if (!u) break;
          a[u[1]] = u[2] || u[3];
        }
        return a.nc += 1, a.cnonce = (function() {
          let l = "";
          for (let u = 0; u < 32; ++u) l = `${l}${"abcdef0123456789"[Math.floor(16 * Math.random())]}`;
          return l;
        })(), !0;
      })(t, e), (function() {
        if (e.hasDigestAuth) return Vn(rn(n = Rr(n, { headers: { Authorization: Dr(n, e) } })), (function(i) {
          return i.status == 401 ? e.hasDigestAuth = !1 : e.nc++, r = !0, i;
        }));
      })();
      e.nc++;
    })()) && o.then ? o.then(s) : s(o);
    var s, o;
  }));
})), hi = Zn((function(n, e) {
  return Vn(rn(n), (function(t) {
    return t.ok ? (e.authType = Ve.Password, t) : t.status == 401 && ks(t) ? (e.authType = Ve.Digest, Ps(e, e.username, e.password, void 0, void 0), n._digest = e.digest, Ns(n)) : t;
  }));
})), Se = Zn((function(n, e) {
  return e.authType === Ve.Auto ? hi(n, e) : n._digest ? Ns(n) : rn(n);
}));
function $e(n, e, t) {
  const r = nn(n);
  return r.headers = zn(e.headers, r.headers || {}, t.headers || {}), t.data !== void 0 && (r.data = t.data), t.signal && (r.signal = t.signal), e.httpAgent && (r.httpAgent = e.httpAgent), e.httpsAgent && (r.httpsAgent = e.httpsAgent), e.digest && (r._digest = e.digest), typeof e.withCredentials == "boolean" && (r.withCredentials = e.withCredentials), r;
}
function rn(n) {
  const e = li();
  return e.patchInline("request", ((t) => e.patchInline("fetch", oi, t.url, (function(r) {
    let s = {};
    const o = { method: r.method };
    if (r.headers && (s = zn(s, r.headers)), r.data !== void 0) {
      const [i, a] = (function(c) {
        if (typeof c == "string") return [c, {}];
        if (As(c)) return [c, {}];
        if (Ts(c)) return [c, {}];
        if (c && typeof c == "object") return [JSON.stringify(c), { "content-type": "application/json" }];
        throw new Error("Unable to convert request body: Unexpected body type: " + typeof c);
      })(r.data);
      o.body = i, s = zn(s, a);
    }
    return r.signal && (o.signal = r.signal), r.withCredentials && (o.credentials = "include"), o.headers = s, o;
  })(t))), n);
}
var fi = me(285);
const sn = (n) => {
  if (typeof n != "string") throw new TypeError("invalid pattern");
  if (n.length > 65536) throw new TypeError("pattern is too long");
}, pi = { "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", !0], "[:alpha:]": ["\\p{L}\\p{Nl}", !0], "[:ascii:]": ["\\x00-\\x7f", !1], "[:blank:]": ["\\p{Zs}\\t", !0], "[:cntrl:]": ["\\p{Cc}", !0], "[:digit:]": ["\\p{Nd}", !0], "[:graph:]": ["\\p{Z}\\p{C}", !0, !0], "[:lower:]": ["\\p{Ll}", !0], "[:print:]": ["\\p{C}", !0], "[:punct:]": ["\\p{P}", !0], "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", !0], "[:upper:]": ["\\p{Lu}", !0], "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", !0], "[:xdigit:]": ["A-Fa-f0-9", !1] }, Nt = (n) => n.replace(/[[\]\\-]/g, "\\$&"), jr = (n) => n.join(""), mi = (n, e) => {
  const t = e;
  if (n.charAt(t) !== "[") throw new Error("not in a brace expression");
  const r = [], s = [];
  let o = t + 1, i = !1, a = !1, c = !1, l = !1, u = t, h = "";
  e: for (; o < n.length; ) {
    const m = n.charAt(o);
    if (m !== "!" && m !== "^" || o !== t + 1) {
      if (m === "]" && i && !c) {
        u = o + 1;
        break;
      }
      if (i = !0, m !== "\\" || c) {
        if (m === "[" && !c) {
          for (const [v, [b, y, w]] of Object.entries(pi)) if (n.startsWith(v, o)) {
            if (h) return ["$.", !1, n.length - t, !0];
            o += v.length, w ? s.push(b) : r.push(b), a = a || y;
            continue e;
          }
        }
        c = !1, h ? (m > h ? r.push(Nt(h) + "-" + Nt(m)) : m === h && r.push(Nt(m)), h = "", o++) : n.startsWith("-]", o + 1) ? (r.push(Nt(m + "-")), o += 2) : n.startsWith("-", o + 1) ? (h = m, o += 2) : (r.push(Nt(m)), o++);
      } else c = !0, o++;
    } else l = !0, o++;
  }
  if (u < o) return ["", !1, 0, !1];
  if (!r.length && !s.length) return ["$.", !1, n.length - t, !0];
  if (s.length === 0 && r.length === 1 && /^\\?.$/.test(r[0]) && !l)
    return [(d = r[0].length === 2 ? r[0].slice(-1) : r[0], d.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")), !1, u - t, !1];
  var d;
  const g = "[" + (l ? "^" : "") + jr(r) + "]", _ = "[" + (l ? "" : "^") + jr(s) + "]";
  return [r.length && s.length ? "(" + g + "|" + _ + ")" : r.length ? g : _, a, u - t, !0];
}, Ot = function(n) {
  let { windowsPathsNoEscape: e = !1 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return e ? n.replace(/\[([^\/\\])\]/g, "$1") : n.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
};
var ze;
const vi = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]), Un = (n) => vi.has(n), zr = (n) => Un(n.type), gi = /* @__PURE__ */ new Map([["!", ["@"]], ["?", ["?", "@"]], ["@", ["@"]], ["*", ["*", "+", "?", "@"]], ["+", ["+", "@"]]]), _i = /* @__PURE__ */ new Map([["!", ["?"]], ["@", ["?"]], ["+", ["?", "*"]]]), yi = /* @__PURE__ */ new Map([["!", ["?", "@"]], ["?", ["?", "@"]], ["@", ["?", "@"]], ["*", ["*", "+", "?", "@"]], ["+", ["+", "@", "?", "*"]]]), Vr = /* @__PURE__ */ new Map([["!", /* @__PURE__ */ new Map([["!", "@"]])], ["?", /* @__PURE__ */ new Map([["*", "*"], ["+", "*"]])], ["@", /* @__PURE__ */ new Map([["!", "!"], ["?", "?"], ["@", "@"], ["*", "*"], ["+", "+"]])], ["+", /* @__PURE__ */ new Map([["?", "*"], ["*", "*"]])]]), Pn = "(?!\\.)", wi = /* @__PURE__ */ new Set(["[", "."]), bi = /* @__PURE__ */ new Set(["..", "."]), xi = new Set("().*{}+?[]^$\\!"), er = "[^/]", Ur = er + "*?", Br = er + "+?";
class tr {
  type;
  #n;
  #r;
  #s = !1;
  #e = [];
  #t;
  #a;
  #u;
  #l = !1;
  #o;
  #i;
  #c = !1;
  constructor(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.type = e, e && (this.#r = !0), this.#t = t, this.#n = this.#t ? this.#t.#n : this, this.#o = this.#n === this ? r : this.#n.#o, this.#u = this.#n === this ? [] : this.#n.#u, e !== "!" || this.#n.#l || this.#u.push(this), this.#a = this.#t ? this.#t.#e.length : 0;
  }
  get hasMagic() {
    if (this.#r !== void 0) return this.#r;
    for (const e of this.#e) if (typeof e != "string" && (e.type || e.hasMagic)) return this.#r = !0;
    return this.#r;
  }
  toString() {
    return this.#i !== void 0 ? this.#i : this.type ? this.#i = this.type + "(" + this.#e.map(((e) => String(e))).join("|") + ")" : this.#i = this.#e.map(((e) => String(e))).join("");
  }
  #g() {
    if (this !== this.#n) throw new Error("should only call on root");
    if (this.#l) return this;
    let e;
    for (this.toString(), this.#l = !0; e = this.#u.pop(); ) {
      if (e.type !== "!") continue;
      let t = e, r = t.#t;
      for (; r; ) {
        for (let s = t.#a + 1; !r.type && s < r.#e.length; s++) for (const o of e.#e) {
          if (typeof o == "string") throw new Error("string part in extglob AST??");
          o.copyIn(r.#e[s]);
        }
        t = r, r = t.#t;
      }
    }
    return this;
  }
  push() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
    for (const s of t) if (s !== "") {
      if (typeof s != "string" && !(s instanceof ze && s.#t === this)) throw new Error("invalid part: " + s);
      this.#e.push(s);
    }
  }
  toJSON() {
    const e = this.type === null ? this.#e.slice().map(((t) => typeof t == "string" ? t : t.toJSON())) : [this.type, ...this.#e.map(((t) => t.toJSON()))];
    return this.isStart() && !this.type && e.unshift([]), this.isEnd() && (this === this.#n || this.#n.#l && this.#t?.type === "!") && e.push({}), e;
  }
  isStart() {
    if (this.#n === this) return !0;
    if (!this.#t?.isStart()) return !1;
    if (this.#a === 0) return !0;
    const e = this.#t;
    for (let t = 0; t < this.#a; t++) {
      const r = e.#e[t];
      if (!(r instanceof ze && r.type === "!")) return !1;
    }
    return !0;
  }
  isEnd() {
    if (this.#n === this || this.#t?.type === "!") return !0;
    if (!this.#t?.isEnd()) return !1;
    if (!this.type) return this.#t?.isEnd();
    const e = this.#t ? this.#t.#e.length : 0;
    return this.#a === e - 1;
  }
  copyIn(e) {
    typeof e == "string" ? this.push(e) : this.push(e.clone(this));
  }
  clone(e) {
    const t = new ze(this.type, e);
    for (const r of this.#e) t.copyIn(r);
    return t;
  }
  static #d(e, t, r, s, o) {
    const i = s.maxExtglobRecursion ?? 2;
    let a = !1, c = !1, l = -1, u = !1;
    if (t.type === null) {
      let m = r, v = "";
      for (; m < e.length; ) {
        const b = e.charAt(m++);
        if (a || b === "\\") a = !a, v += b;
        else if (c) m === l + 1 ? b !== "^" && b !== "!" || (u = !0) : b !== "]" || m === l + 2 && u || (c = !1), v += b;
        else if (b !== "[") if (!s.noext && Un(b) && e.charAt(m) === "(" && o <= i) {
          t.push(v), v = "";
          const y = new ze(b, t);
          m = ze.#d(e, y, m, s, o + 1), t.push(y);
        } else v += b;
        else c = !0, l = m, u = !1, v += b;
      }
      return t.push(v), m;
    }
    let h = r + 1, d = new ze(null, t);
    const g = [];
    let _ = "";
    for (; h < e.length; ) {
      const m = e.charAt(h++);
      if (a || m === "\\") a = !a, _ += m;
      else if (c) h === l + 1 ? m !== "^" && m !== "!" || (u = !0) : m !== "]" || h === l + 2 && u || (c = !1), _ += m;
      else if (m !== "[") if (Un(m) && e.charAt(h) === "(" && (o <= i || t && t.#h(m))) {
        const v = t && t.#h(m) ? 0 : 1;
        d.push(_), _ = "";
        const b = new ze(m, d);
        d.push(b), h = ze.#d(e, b, h, s, o + v);
      } else if (m !== "|") {
        if (m === ")") return _ === "" && t.#e.length === 0 && (t.#c = !0), d.push(_), _ = "", t.push(...g, d), h;
        _ += m;
      } else d.push(_), _ = "", g.push(d), d = new ze(null, t);
      else c = !0, l = h, u = !1, _ += m;
    }
    return t.type = null, t.#r = void 0, t.#e = [e.substring(r - 1)], h;
  }
  #_(e) {
    return this.#p(e, _i);
  }
  #p(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : gi;
    if (!e || typeof e != "object" || e.type !== null || e.#e.length !== 1 || this.type === null) return !1;
    const r = e.#e[0];
    return !(!r || typeof r != "object" || r.type === null) && this.#h(r.type, t);
  }
  #h(e) {
    return !!(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : yi).get(this.type)?.includes(e);
  }
  #y(e, t) {
    const r = e.#e[0], s = new ze(null, r, this.options);
    s.#e.push(""), r.push(s), this.#m(e, t);
  }
  #m(e, t) {
    const r = e.#e[0];
    this.#e.splice(t, 1, ...r.#e);
    for (const s of r.#e) typeof s == "object" && (s.#t = this);
    this.#i = void 0;
  }
  #w(e) {
    return !!Vr.get(this.type)?.has(e);
  }
  #b(e) {
    if (!e || typeof e != "object" || e.type !== null || e.#e.length !== 1 || this.type === null || this.#e.length !== 1) return !1;
    const t = e.#e[0];
    return !(!t || typeof t != "object" || t.type === null) && this.#w(t.type);
  }
  #x(e) {
    const t = Vr.get(this.type), r = e.#e[0], s = t?.get(r.type);
    if (!s) return !1;
    this.#e = r.#e;
    for (const o of this.#e) typeof o == "object" && (o.#t = this);
    this.type = s, this.#i = void 0, this.#c = !1;
  }
  #f() {
    if (zr(this)) {
      let e = 0, t = !1;
      do {
        t = !0;
        for (let r = 0; r < this.#e.length; r++) {
          const s = this.#e[r];
          typeof s == "object" && (s.#f(), this.#p(s) ? (t = !1, this.#m(s, r)) : this.#_(s) ? (t = !1, this.#y(s, r)) : this.#b(s) && (t = !1, this.#x(s)));
        }
      } while (!t && ++e < 10);
    } else for (const e of this.#e) typeof e == "object" && e.#f();
    this.#i = void 0;
  }
  static fromGlob(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = new ze(null, void 0, t);
    return ze.#d(e, r, 0, t, 0), r;
  }
  toMMPattern() {
    if (this !== this.#n) return this.#n.toMMPattern();
    const e = this.toString(), [t, r, s, o] = this.toRegExpSource();
    if (!(s || this.#r || this.#o.nocase && !this.#o.nocaseMagicOnly && e.toUpperCase() !== e.toLowerCase())) return r;
    const i = (this.#o.nocase ? "i" : "") + (o ? "u" : "");
    return Object.assign(new RegExp(`^${t}$`, i), { _src: t, _glob: e });
  }
  get options() {
    return this.#o;
  }
  toRegExpSource(e) {
    const t = e ?? !!this.#o.dot;
    if (this.#n === this && (this.#f(), this.#g()), !zr(this)) {
      const c = this.isStart() && this.isEnd(), l = this.#e.map(((d) => {
        const [g, _, m, v] = typeof d == "string" ? ze.#S(d, this.#r, c) : d.toRegExpSource(e);
        return this.#r = this.#r || m, this.#s = this.#s || v, g;
      })).join("");
      let u = "";
      if (this.isStart() && typeof this.#e[0] == "string" && (this.#e.length !== 1 || !bi.has(this.#e[0]))) {
        const d = wi, g = t && d.has(l.charAt(0)) || l.startsWith("\\.") && d.has(l.charAt(2)) || l.startsWith("\\.\\.") && d.has(l.charAt(4)), _ = !t && !e && d.has(l.charAt(0));
        u = g ? "(?!(?:^|/)\\.\\.?(?:$|/))" : _ ? Pn : "";
      }
      let h = "";
      return this.isEnd() && this.#n.#l && this.#t?.type === "!" && (h = "(?:$|\\/)"), [u + l + h, Ot(l), this.#r = !!this.#r, this.#s];
    }
    const r = this.type === "*" || this.type === "+", s = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let o = this.#v(t);
    if (this.isStart() && this.isEnd() && !o && this.type !== "!") {
      const c = this.toString(), l = this;
      return l.#e = [c], l.type = null, l.#r = void 0, [c, Ot(this.toString()), !1, !1];
    }
    let i = !r || e || t ? "" : this.#v(!0);
    i === o && (i = ""), i && (o = `(?:${o})(?:${i})*?`);
    let a = "";
    return a = this.type === "!" && this.#c ? (this.isStart() && !t ? Pn : "") + Br : s + o + (this.type === "!" ? "))" + (!this.isStart() || t || e ? "" : Pn) + Ur + ")" : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && i ? ")" : this.type === "*" && i ? ")?" : `)${this.type}`), [a, Ot(o), this.#r = !!this.#r, this.#s];
  }
  #v(e) {
    return this.#e.map(((t) => {
      if (typeof t == "string") throw new Error("string type in extglob ast??");
      const [r, s, o, i] = t.toRegExpSource(e);
      return this.#s = this.#s || i, r;
    })).filter(((t) => !(this.isStart() && this.isEnd() && !t))).join("|");
  }
  static #S(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], s = !1, o = "", i = !1, a = !1;
    for (let c = 0; c < e.length; c++) {
      const l = e.charAt(c);
      if (s) s = !1, o += (xi.has(l) ? "\\" : "") + l, a = !1;
      else if (l !== "\\") {
        if (l === "[") {
          const [u, h, d, g] = mi(e, c);
          if (d) {
            o += u, i = i || h, c += d - 1, t = t || g, a = !1;
            continue;
          }
        }
        if (l !== "*") a = !1, l !== "?" ? o += l.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : (o += er, t = !0);
        else {
          if (a) continue;
          a = !0, o += r && /^[*]+$/.test(e) ? Br : Ur, t = !0;
        }
      } else c === e.length - 1 ? o += "\\\\" : s = !0;
    }
    return [o, Ot(e), !!t, i];
  }
}
ze = tr;
const Ne = function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return sn(e), !(!t.nocomment && e.charAt(0) === "#") && new on(e, t).match(n);
}, Si = /^\*+([^+@!?\*\[\(]*)$/, $i = (n) => (e) => !e.startsWith(".") && e.endsWith(n), ki = (n) => (e) => e.endsWith(n), Ci = (n) => (n = n.toLowerCase(), (e) => !e.startsWith(".") && e.toLowerCase().endsWith(n)), Pi = (n) => (n = n.toLowerCase(), (e) => e.toLowerCase().endsWith(n)), Ei = /^\*+\.\*+$/, Ti = (n) => !n.startsWith(".") && n.includes("."), Ai = (n) => n !== "." && n !== ".." && n.includes("."), Ni = /^\.\*+$/, Ii = (n) => n !== "." && n !== ".." && n.startsWith("."), Di = /^\*+$/, Fi = (n) => n.length !== 0 && !n.startsWith("."), Mi = (n) => n.length !== 0 && n !== "." && n !== "..", Oi = /^\?+([^+@!?\*\[\(]*)?$/, Li = (n) => {
  let [e, t = ""] = n;
  const r = Is([e]);
  return t ? (t = t.toLowerCase(), (s) => r(s) && s.toLowerCase().endsWith(t)) : r;
}, Ri = (n) => {
  let [e, t = ""] = n;
  const r = Ds([e]);
  return t ? (t = t.toLowerCase(), (s) => r(s) && s.toLowerCase().endsWith(t)) : r;
}, ji = (n) => {
  let [e, t = ""] = n;
  const r = Ds([e]);
  return t ? (s) => r(s) && s.endsWith(t) : r;
}, zi = (n) => {
  let [e, t = ""] = n;
  const r = Is([e]);
  return t ? (s) => r(s) && s.endsWith(t) : r;
}, Is = (n) => {
  let [e] = n;
  const t = e.length;
  return (r) => r.length === t && !r.startsWith(".");
}, Ds = (n) => {
  let [e] = n;
  const t = e.length;
  return (r) => r.length === t && r !== "." && r !== "..";
}, Fs = typeof process == "object" && process ? typeof process.env == "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
Ne.sep = Fs === "win32" ? "\\" : "/";
const Ae = /* @__PURE__ */ Symbol("globstar **");
Ne.GLOBSTAR = Ae, Ne.filter = function(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return (t) => Ne(t, n, e);
};
const Ke = function(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return Object.assign({}, n, e);
};
Ne.defaults = (n) => {
  if (!n || typeof n != "object" || !Object.keys(n).length) return Ne;
  const e = Ne;
  return Object.assign((function(t, r) {
    return e(t, r, Ke(n, arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}));
  }), { Minimatch: class extends e.Minimatch {
    constructor(t) {
      super(t, Ke(n, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}));
    }
    static defaults(t) {
      return e.defaults(Ke(n, t)).Minimatch;
    }
  }, AST: class extends e.AST {
    constructor(t, r) {
      super(t, r, Ke(n, arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}));
    }
    static fromGlob(t) {
      let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return e.AST.fromGlob(t, Ke(n, r));
    }
  }, unescape: function(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return e.unescape(t, Ke(n, r));
  }, escape: function(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return e.escape(t, Ke(n, r));
  }, filter: function(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return e.filter(t, Ke(n, r));
  }, defaults: (t) => e.defaults(Ke(n, t)), makeRe: function(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return e.makeRe(t, Ke(n, r));
  }, braceExpand: function(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return e.braceExpand(t, Ke(n, r));
  }, match: function(t, r) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return e.match(t, r, Ke(n, s));
  }, sep: e.sep, GLOBSTAR: Ae });
};
const Ms = function(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return sn(n), e.nobrace || !/\{(?:(?!\{).)*\}/.test(n) ? [n] : fi(n);
};
Ne.braceExpand = Ms, Ne.makeRe = function(n) {
  return new on(n, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}).makeRe();
}, Ne.match = function(n, e) {
  const t = new on(e, arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {});
  return n = n.filter(((r) => t.match(r))), t.options.nonull && !n.length && n.push(e), n;
};
const Hr = /[?*]|[+@!]\(.*?\)|\[|\]/;
class on {
  options;
  set;
  pattern;
  windowsPathsNoEscape;
  nonegate;
  negate;
  comment;
  empty;
  preserveMultipleSlashes;
  partial;
  globSet;
  globParts;
  nocase;
  isWindows;
  platform;
  windowsNoMagicRoot;
  maxGlobstarRecursion;
  regexp;
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    sn(e), t = t || {}, this.options = t, this.maxGlobstarRecursion = t.maxGlobstarRecursion ?? 200, this.pattern = e, this.platform = t.platform || Fs, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!t.windowsPathsNoEscape || t.allowWindowsEscape === !1, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!t.preserveMultipleSlashes, this.regexp = null, this.negate = !1, this.nonegate = !!t.nonegate, this.comment = !1, this.empty = !1, this.partial = !!t.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = t.windowsNoMagicRoot !== void 0 ? t.windowsNoMagicRoot : !(!this.isWindows || !this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) return !0;
    for (const e of this.set) for (const t of e) if (typeof t != "string") return !0;
    return !1;
  }
  debug() {
  }
  make() {
    const e = this.pattern, t = this.options;
    if (!t.nocomment && e.charAt(0) === "#") return void (this.comment = !0);
    if (!e) return void (this.empty = !0);
    this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], t.debug && (this.debug = function() {
      return console.error(...arguments);
    }), this.debug(this.pattern, this.globSet);
    const r = this.globSet.map(((o) => this.slashSplit(o)));
    this.globParts = this.preprocess(r), this.debug(this.pattern, this.globParts);
    let s = this.globParts.map(((o, i, a) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const c = !(o[0] !== "" || o[1] !== "" || o[2] !== "?" && Hr.test(o[2]) || Hr.test(o[3])), l = /^[a-z]:/i.test(o[0]);
        if (c) return [...o.slice(0, 4), ...o.slice(4).map(((u) => this.parse(u)))];
        if (l) return [o[0], ...o.slice(1).map(((u) => this.parse(u)))];
      }
      return o.map(((c) => this.parse(c)));
    }));
    if (this.debug(this.pattern, s), this.set = s.filter(((o) => o.indexOf(!1) === -1)), this.isWindows) for (let o = 0; o < this.set.length; o++) {
      const i = this.set[o];
      i[0] === "" && i[1] === "" && this.globParts[o][2] === "?" && typeof i[3] == "string" && /^[a-z]:$/i.test(i[3]) && (i[2] = "?");
    }
    this.debug(this.pattern, this.set);
  }
  preprocess(e) {
    if (this.options.noglobstar) for (let r = 0; r < e.length; r++) for (let s = 0; s < e[r].length; s++) e[r][s] === "**" && (e[r][s] = "*");
    const { optimizationLevel: t = 1 } = this.options;
    return t >= 2 ? (e = this.firstPhasePreProcess(e), e = this.secondPhasePreProcess(e)) : e = t >= 1 ? this.levelOneOptimize(e) : this.adjascentGlobstarOptimize(e), e;
  }
  adjascentGlobstarOptimize(e) {
    return e.map(((t) => {
      let r = -1;
      for (; (r = t.indexOf("**", r + 1)) !== -1; ) {
        let s = r;
        for (; t[s + 1] === "**"; ) s++;
        s !== r && t.splice(r, s - r);
      }
      return t;
    }));
  }
  levelOneOptimize(e) {
    return e.map(((t) => (t = t.reduce(((r, s) => {
      const o = r[r.length - 1];
      return s === "**" && o === "**" ? r : s === ".." && o && o !== ".." && o !== "." && o !== "**" ? (r.pop(), r) : (r.push(s), r);
    }), [])).length === 0 ? [""] : t));
  }
  levelTwoFileOptimize(e) {
    Array.isArray(e) || (e = this.slashSplit(e));
    let t = !1;
    do {
      if (t = !1, !this.preserveMultipleSlashes) {
        for (let s = 1; s < e.length - 1; s++) {
          const o = e[s];
          s === 1 && o === "" && e[0] === "" || o !== "." && o !== "" || (t = !0, e.splice(s, 1), s--);
        }
        e[0] !== "." || e.length !== 2 || e[1] !== "." && e[1] !== "" || (t = !0, e.pop());
      }
      let r = 0;
      for (; (r = e.indexOf("..", r + 1)) !== -1; ) {
        const s = e[r - 1];
        s && s !== "." && s !== ".." && s !== "**" && (t = !0, e.splice(r - 1, 2), r -= 2);
      }
    } while (t);
    return e.length === 0 ? [""] : e;
  }
  firstPhasePreProcess(e) {
    let t = !1;
    do {
      t = !1;
      for (let r of e) {
        let s = -1;
        for (; (s = r.indexOf("**", s + 1)) !== -1; ) {
          let i = s;
          for (; r[i + 1] === "**"; ) i++;
          i > s && r.splice(s + 1, i - s);
          let a = r[s + 1];
          const c = r[s + 2], l = r[s + 3];
          if (a !== ".." || !c || c === "." || c === ".." || !l || l === "." || l === "..") continue;
          t = !0, r.splice(s, 1);
          const u = r.slice(0);
          u[s] = "**", e.push(u), s--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let i = 1; i < r.length - 1; i++) {
            const a = r[i];
            i === 1 && a === "" && r[0] === "" || a !== "." && a !== "" || (t = !0, r.splice(i, 1), i--);
          }
          r[0] !== "." || r.length !== 2 || r[1] !== "." && r[1] !== "" || (t = !0, r.pop());
        }
        let o = 0;
        for (; (o = r.indexOf("..", o + 1)) !== -1; ) {
          const i = r[o - 1];
          if (i && i !== "." && i !== ".." && i !== "**") {
            t = !0;
            const a = o === 1 && r[o + 1] === "**" ? ["."] : [];
            r.splice(o - 1, 2, ...a), r.length === 0 && r.push(""), o -= 2;
          }
        }
      }
    } while (t);
    return e;
  }
  secondPhasePreProcess(e) {
    for (let t = 0; t < e.length - 1; t++) for (let r = t + 1; r < e.length; r++) {
      const s = this.partsMatch(e[t], e[r], !this.preserveMultipleSlashes);
      if (s) {
        e[t] = [], e[r] = s;
        break;
      }
    }
    return e.filter(((t) => t.length));
  }
  partsMatch(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], s = 0, o = 0, i = [], a = "";
    for (; s < e.length && o < t.length; ) if (e[s] === t[o]) i.push(a === "b" ? t[o] : e[s]), s++, o++;
    else if (r && e[s] === "**" && t[o] === e[s + 1]) i.push(e[s]), s++;
    else if (r && t[o] === "**" && e[s] === t[o + 1]) i.push(t[o]), o++;
    else if (e[s] !== "*" || !t[o] || !this.options.dot && t[o].startsWith(".") || t[o] === "**") {
      if (t[o] !== "*" || !e[s] || !this.options.dot && e[s].startsWith(".") || e[s] === "**" || a === "a") return !1;
      a = "b", i.push(t[o]), s++, o++;
    } else {
      if (a === "b") return !1;
      a = "a", i.push(e[s]), s++, o++;
    }
    return e.length === t.length && i;
  }
  parseNegate() {
    if (this.nonegate) return;
    const e = this.pattern;
    let t = !1, r = 0;
    for (let s = 0; s < e.length && e.charAt(s) === "!"; s++) t = !t, r++;
    r && (this.pattern = e.slice(r)), this.negate = t;
  }
  matchOne(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], s = 0, o = 0;
    if (this.isWindows) {
      const a = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]), c = !a && e[0] === "" && e[1] === "" && e[2] === "?" && /^[a-z]:$/i.test(e[3]), l = typeof t[0] == "string" && /^[a-z]:$/i.test(t[0]), u = c ? 3 : a ? 0 : void 0, h = !l && t[0] === "" && t[1] === "" && t[2] === "?" && typeof t[3] == "string" && /^[a-z]:$/i.test(t[3]) ? 3 : l ? 0 : void 0;
      if (typeof u == "number" && typeof h == "number") {
        const [d, g] = [e[u], t[h]];
        d.toLowerCase() === g.toLowerCase() && (t[h] = d, o = h, s = u);
      }
    }
    const { optimizationLevel: i = 1 } = this.options;
    return i >= 2 && (e = this.levelTwoFileOptimize(e)), t.includes(Ae) ? this.#n(e, t, r, s, o) : this.#s(e, t, r, s, o);
  }
  #n(e, t, r, s, o) {
    const i = t.indexOf(Ae, o), a = t.lastIndexOf(Ae), [c, l, u] = r ? [t.slice(o, i), t.slice(i + 1), []] : [t.slice(o, i), t.slice(i + 1, a), t.slice(a + 1)];
    if (c.length) {
      const y = e.slice(s, s + c.length);
      if (!this.#s(y, c, r, 0, 0)) return !1;
      s += c.length;
    }
    let h = 0;
    if (u.length) {
      if (u.length + s > e.length) return !1;
      let y = e.length - u.length;
      if (this.#s(e, u, r, y, 0)) h = u.length;
      else {
        if (e[e.length - 1] !== "" || s + u.length === e.length || (y--, !this.#s(e, u, r, y, 0))) return !1;
        h = u.length + 1;
      }
    }
    if (!l.length) {
      let y = !!h;
      for (let w = s; w < e.length - h; w++) {
        const x = String(e[w]);
        if (y = !0, x === "." || x === ".." || !this.options.dot && x.startsWith(".")) return !1;
      }
      return r || y;
    }
    const d = [[[], 0]];
    let g = d[0], _ = 0;
    const m = [0];
    for (const y of l) y === Ae ? (m.push(_), g = [[], 0], d.push(g)) : (g[0].push(y), _++);
    let v = d.length - 1;
    const b = e.length - h;
    for (const y of d) y[1] = b - (m[v--] + y[0].length);
    return !!this.#r(e, d, s, 0, r, 0, !!h);
  }
  #r(e, t, r, s, o, i, a) {
    const c = t[s];
    if (!c) {
      for (let h = r; h < e.length; h++) {
        a = !0;
        const d = e[h];
        if (d === "." || d === ".." || !this.options.dot && d.startsWith(".")) return !1;
      }
      return a;
    }
    const [l, u] = c;
    for (; r <= u; ) {
      if (this.#s(e.slice(0, r + l.length), l, o, r, 0) && i < this.maxGlobstarRecursion) {
        const d = this.#r(e, t, r + l.length, s + 1, o, i + 1, a);
        if (d !== !1) return d;
      }
      const h = e[r];
      if (h === "." || h === ".." || !this.options.dot && h.startsWith(".")) return !1;
      r++;
    }
    return o || null;
  }
  #s(e, t, r, s, o) {
    let i, a, c, l;
    for (i = s, a = o, l = e.length, c = t.length; i < l && a < c; i++, a++) {
      this.debug("matchOne loop");
      let u, h = t[a], d = e[i];
      if (this.debug(t, h, d), h === !1 || h === Ae || (typeof h == "string" ? (u = d === h, this.debug("string match", h, d, u)) : (u = h.test(d), this.debug("pattern match", h, d, u)), !u)) return !1;
    }
    if (i === l && a === c) return !0;
    if (i === l) return r;
    if (a === c) return i === l - 1 && e[i] === "";
    throw new Error("wtf?");
  }
  braceExpand() {
    return Ms(this.pattern, this.options);
  }
  parse(e) {
    sn(e);
    const t = this.options;
    if (e === "**") return Ae;
    if (e === "") return "";
    let r, s = null;
    (r = e.match(Di)) ? s = t.dot ? Mi : Fi : (r = e.match(Si)) ? s = (t.nocase ? t.dot ? Pi : Ci : t.dot ? ki : $i)(r[1]) : (r = e.match(Oi)) ? s = (t.nocase ? t.dot ? Ri : Li : t.dot ? ji : zi)(r) : (r = e.match(Ei)) ? s = t.dot ? Ai : Ti : (r = e.match(Ni)) && (s = Ii);
    const o = tr.fromGlob(e, this.options).toMMPattern();
    return s && typeof o == "object" && Reflect.defineProperty(o, "test", { value: s }), o;
  }
  makeRe() {
    if (this.regexp || this.regexp === !1) return this.regexp;
    const e = this.set;
    if (!e.length) return this.regexp = !1, this.regexp;
    const t = this.options, r = t.noglobstar ? "[^/]*?" : t.dot ? "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?" : "(?:(?!(?:\\/|^)\\.).)*?", s = new Set(t.nocase ? ["i"] : []);
    let o = e.map(((c) => {
      const l = c.map(((u) => {
        if (u instanceof RegExp) for (const h of u.flags.split("")) s.add(h);
        return typeof u == "string" ? u.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : u === Ae ? Ae : u._src;
      }));
      return l.forEach(((u, h) => {
        const d = l[h + 1], g = l[h - 1];
        u === Ae && g !== Ae && (g === void 0 ? d !== void 0 && d !== Ae ? l[h + 1] = "(?:\\/|" + r + "\\/)?" + d : l[h] = r : d === void 0 ? l[h - 1] = g + "(?:\\/|" + r + ")?" : d !== Ae && (l[h - 1] = g + "(?:\\/|\\/" + r + "\\/)" + d, l[h + 1] = Ae));
      })), l.filter(((u) => u !== Ae)).join("/");
    })).join("|");
    const [i, a] = e.length > 1 ? ["(?:", ")"] : ["", ""];
    o = "^" + i + o + a + "$", this.negate && (o = "^(?!" + o + ").+$");
    try {
      this.regexp = new RegExp(o, [...s].join(""));
    } catch {
      this.regexp = !1;
    }
    return this.regexp;
  }
  slashSplit(e) {
    return this.preserveMultipleSlashes ? e.split("/") : this.isWindows && /^\/\/[^\/]+/.test(e) ? ["", ...e.split(/\/+/)] : e.split(/\/+/);
  }
  match(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.partial;
    if (this.debug("match", e, this.pattern), this.comment) return !1;
    if (this.empty) return e === "";
    if (e === "/" && t) return !0;
    const r = this.options;
    this.isWindows && (e = e.split("\\").join("/"));
    const s = this.slashSplit(e);
    this.debug(this.pattern, "split", s);
    const o = this.set;
    this.debug(this.pattern, "set", o);
    let i = s[s.length - 1];
    if (!i) for (let a = s.length - 2; !i && a >= 0; a--) i = s[a];
    for (let a = 0; a < o.length; a++) {
      const c = o[a];
      let l = s;
      if (r.matchBase && c.length === 1 && (l = [i]), this.matchOne(l, c, t)) return !!r.flipNegate || !this.negate;
    }
    return !r.flipNegate && this.negate;
  }
  static defaults(e) {
    return Ne.defaults(e).Minimatch;
  }
}
function nr(n) {
  const e = new Error(`${arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ""}Invalid response: ${n.status} ${n.statusText}`);
  return e.status = n.status, e.response = n, e;
}
function ke(n, e) {
  const { status: t } = e;
  if (t === 401 && n.digest) return e;
  if (t >= 400) throw nr(e);
  return e;
}
function Pt(n, e) {
  return arguments.length > 2 && arguments[2] !== void 0 && arguments[2] ? { data: e, headers: n.headers ? ui(n.headers) : {}, status: n.status, statusText: n.statusText } : e;
}
Ne.AST = tr, Ne.Minimatch = on, Ne.escape = function(n) {
  let { windowsPathsNoEscape: e = !1 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return e ? n.replace(/[?*()[\]]/g, "[$&]") : n.replace(/[?*()[\]\\]/g, "\\$&");
}, Ne.unescape = Ot;
const Vi = (Wr = function(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
  const s = $e({ url: ye(n.remoteURL, _e(e)), method: "COPY", headers: { Destination: ye(n.remoteURL, _e(t)), Overwrite: r.overwrite === !1 ? "F" : "T", Depth: r.shallow ? "0" : "infinity" } }, n, r);
  return i = function(a) {
    ke(n, a);
  }, (o = Se(s, n)) && o.then || (o = Promise.resolve(o)), i ? o.then(i) : o;
  var o, i;
}, function() {
  for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
  try {
    return Promise.resolve(Wr.apply(this, n));
  } catch (t) {
    return Promise.reject(t);
  }
});
var Wr;
const qr = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Ui = new RegExp("^[" + qr + "][" + qr + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$");
function Os(n, e) {
  const t = [];
  let r = e.exec(n);
  for (; r; ) {
    const s = [];
    s.startIndex = e.lastIndex - r[0].length;
    const o = r.length;
    for (let i = 0; i < o; i++) s.push(r[i]);
    t.push(s), r = e.exec(n);
  }
  return t;
}
const hn = function(n) {
  return Ui.exec(n) != null;
}, rr = ["hasOwnProperty", "toString", "valueOf", "__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__"], Ls = ["__proto__", "constructor", "prototype"], Rs = (n) => rr.includes(n) ? "__" + n : n, Bi = { preserveOrder: !1, attributeNamePrefix: "@_", attributesGroupName: !1, textNodeName: "#text", ignoreAttributes: !0, removeNSPrefix: !1, allowBooleanAttributes: !1, parseTagValue: !0, parseAttributeValue: !1, trimValues: !0, cdataPropName: !1, numberParseOptions: { hex: !0, leadingZeros: !0, eNotation: !0 }, tagValueProcessor: function(n, e) {
  return e;
}, attributeValueProcessor: function(n, e) {
  return e;
}, stopNodes: [], alwaysCreateTextNode: !1, isArray: () => !1, commentPropName: !1, unpairedTags: [], processEntities: !0, htmlEntities: !1, entityDecoder: null, ignoreDeclaration: !1, ignorePiTags: !1, transformTagName: !1, transformAttributeName: !1, updateTag: function(n, e, t) {
  return n;
}, captureMetaData: !1, maxNestedTags: 100, strictReservedNames: !0, jPath: !0, onDangerousProperty: Rs };
function Hi(n, e) {
  if (typeof n != "string") return;
  const t = n.toLowerCase();
  if (rr.some(((r) => t === r.toLowerCase()))) throw new Error(`[SECURITY] Invalid ${e}: "${n}" is a reserved JavaScript keyword that could cause prototype pollution`);
  if (Ls.some(((r) => t === r.toLowerCase()))) throw new Error(`[SECURITY] Invalid ${e}: "${n}" is a reserved JavaScript keyword that could cause prototype pollution`);
}
function js(n, e) {
  return typeof n == "boolean" ? { enabled: n, maxEntitySize: 1e4, maxExpansionDepth: 1e4, maxTotalExpansions: 1 / 0, maxExpandedLength: 1e5, maxEntityCount: 1e3, allowedTags: null, tagFilter: null, appliesTo: "all" } : typeof n == "object" && n !== null ? { enabled: n.enabled !== !1, maxEntitySize: Math.max(1, n.maxEntitySize ?? 1e4), maxExpansionDepth: Math.max(1, n.maxExpansionDepth ?? 1e4), maxTotalExpansions: Math.max(1, n.maxTotalExpansions ?? 1 / 0), maxExpandedLength: Math.max(1, n.maxExpandedLength ?? 1e5), maxEntityCount: Math.max(1, n.maxEntityCount ?? 1e3), allowedTags: n.allowedTags ?? null, tagFilter: n.tagFilter ?? null, appliesTo: n.appliesTo ?? "all" } : js(!0);
}
const Wi = function(n) {
  const e = Object.assign({}, Bi, n), t = [{ value: e.attributeNamePrefix, name: "attributeNamePrefix" }, { value: e.attributesGroupName, name: "attributesGroupName" }, { value: e.textNodeName, name: "textNodeName" }, { value: e.cdataPropName, name: "cdataPropName" }, { value: e.commentPropName, name: "commentPropName" }];
  for (const { value: r, name: s } of t) r && Hi(r, s);
  return e.onDangerousProperty === null && (e.onDangerousProperty = Rs), e.processEntities = js(e.processEntities, e.htmlEntities), e.unpairedTagsSet = new Set(e.unpairedTags), e.stopNodes && Array.isArray(e.stopNodes) && (e.stopNodes = e.stopNodes.map(((r) => typeof r == "string" && r.startsWith("*.") ? ".." + r.substring(2) : r))), e;
};
let Bn;
Bn = typeof Symbol != "function" ? "@@xmlMetadata" : /* @__PURE__ */ Symbol("XML Node Metadata");
class ut {
  constructor(e) {
    this.tagname = e, this.child = [], this[":@"] = /* @__PURE__ */ Object.create(null);
  }
  add(e, t) {
    e === "__proto__" && (e = "#__proto__"), this.child.push({ [e]: t });
  }
  addChild(e, t) {
    e.tagname === "__proto__" && (e.tagname = "#__proto__"), e[":@"] && Object.keys(e[":@"]).length > 0 ? this.child.push({ [e.tagname]: e.child, ":@": e[":@"] }) : this.child.push({ [e.tagname]: e.child }), t !== void 0 && (this.child[this.child.length - 1][Bn] = { startIndex: t });
  }
  static getMetaDataSymbol() {
    return Bn;
  }
}
class qi {
  constructor(e) {
    this.suppressValidationErr = !e, this.options = e;
  }
  readDocType(e, t) {
    const r = /* @__PURE__ */ Object.create(null);
    let s = 0;
    if (e[t + 3] !== "O" || e[t + 4] !== "C" || e[t + 5] !== "T" || e[t + 6] !== "Y" || e[t + 7] !== "P" || e[t + 8] !== "E") throw new Error("Invalid Tag instead of DOCTYPE");
    {
      t += 9;
      let o = 1, i = !1, a = !1, c = "";
      for (; t < e.length; t++) if (e[t] !== "<" || a) if (e[t] === ">") {
        if (a ? e[t - 1] === "-" && e[t - 2] === "-" && (a = !1, o--) : o--, o === 0) break;
      } else e[t] === "[" ? i = !0 : c += e[t];
      else {
        if (i && mt(e, "!ENTITY", t)) {
          let l, u;
          if (t += 7, [l, u, t] = this.readEntityExp(e, t + 1, this.suppressValidationErr), u.indexOf("&") === -1) {
            if (this.options.enabled !== !1 && this.options.maxEntityCount != null && s >= this.options.maxEntityCount) throw new Error(`Entity count (${s + 1}) exceeds maximum allowed (${this.options.maxEntityCount})`);
            r[l] = u, s++;
          }
        } else if (i && mt(e, "!ELEMENT", t)) {
          t += 8;
          const { index: l } = this.readElementExp(e, t + 1);
          t = l;
        } else if (i && mt(e, "!ATTLIST", t)) t += 8;
        else if (i && mt(e, "!NOTATION", t)) {
          t += 9;
          const { index: l } = this.readNotationExp(e, t + 1, this.suppressValidationErr);
          t = l;
        } else {
          if (!mt(e, "!--", t)) throw new Error("Invalid DOCTYPE");
          a = !0;
        }
        o++, c = "";
      }
      if (o !== 0) throw new Error("Unclosed DOCTYPE");
    }
    return { entities: r, i: t };
  }
  readEntityExp(e, t) {
    const r = t = Re(e, t);
    for (; t < e.length && !/\s/.test(e[t]) && e[t] !== '"' && e[t] !== "'"; ) t++;
    let s = e.substring(r, t);
    if (It(s), t = Re(e, t), !this.suppressValidationErr) {
      if (e.substring(t, t + 6).toUpperCase() === "SYSTEM") throw new Error("External entities are not supported");
      if (e[t] === "%") throw new Error("Parameter entities are not supported");
    }
    let o = "";
    if ([t, o] = this.readIdentifierVal(e, t, "entity"), this.options.enabled !== !1 && this.options.maxEntitySize != null && o.length > this.options.maxEntitySize) throw new Error(`Entity "${s}" size (${o.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`);
    return [s, o, --t];
  }
  readNotationExp(e, t) {
    const r = t = Re(e, t);
    for (; t < e.length && !/\s/.test(e[t]); ) t++;
    let s = e.substring(r, t);
    !this.suppressValidationErr && It(s), t = Re(e, t);
    const o = e.substring(t, t + 6).toUpperCase();
    if (!this.suppressValidationErr && o !== "SYSTEM" && o !== "PUBLIC") throw new Error(`Expected SYSTEM or PUBLIC, found "${o}"`);
    t += o.length, t = Re(e, t);
    let i = null, a = null;
    if (o === "PUBLIC") [t, i] = this.readIdentifierVal(e, t, "publicIdentifier"), e[t = Re(e, t)] !== '"' && e[t] !== "'" || ([t, a] = this.readIdentifierVal(e, t, "systemIdentifier"));
    else if (o === "SYSTEM" && ([t, a] = this.readIdentifierVal(e, t, "systemIdentifier"), !this.suppressValidationErr && !a)) throw new Error("Missing mandatory system identifier for SYSTEM notation");
    return { notationName: s, publicIdentifier: i, systemIdentifier: a, index: --t };
  }
  readIdentifierVal(e, t, r) {
    let s = "";
    const o = e[t];
    if (o !== '"' && o !== "'") throw new Error(`Expected quoted string, found "${o}"`);
    const i = ++t;
    for (; t < e.length && e[t] !== o; ) t++;
    if (s = e.substring(i, t), e[t] !== o) throw new Error(`Unterminated ${r} value`);
    return [++t, s];
  }
  readElementExp(e, t) {
    const r = t = Re(e, t);
    for (; t < e.length && !/\s/.test(e[t]); ) t++;
    let s = e.substring(r, t);
    if (!this.suppressValidationErr && !hn(s)) throw new Error(`Invalid element name: "${s}"`);
    let o = "";
    if (e[t = Re(e, t)] === "E" && mt(e, "MPTY", t)) t += 4;
    else if (e[t] === "A" && mt(e, "NY", t)) t += 2;
    else if (e[t] === "(") {
      const i = ++t;
      for (; t < e.length && e[t] !== ")"; ) t++;
      if (o = e.substring(i, t), e[t] !== ")") throw new Error("Unterminated content model");
    } else if (!this.suppressValidationErr) throw new Error(`Invalid Element Expression, found "${e[t]}"`);
    return { elementName: s, contentModel: o.trim(), index: t };
  }
  readAttlistExp(e, t) {
    let r = t = Re(e, t);
    for (; t < e.length && !/\s/.test(e[t]); ) t++;
    let s = e.substring(r, t);
    for (It(s), r = t = Re(e, t); t < e.length && !/\s/.test(e[t]); ) t++;
    let o = e.substring(r, t);
    if (!It(o)) throw new Error(`Invalid attribute name: "${o}"`);
    t = Re(e, t);
    let i = "";
    if (e.substring(t, t + 8).toUpperCase() === "NOTATION") {
      if (i = "NOTATION", e[t = Re(e, t += 8)] !== "(") throw new Error(`Expected '(', found "${e[t]}"`);
      t++;
      let c = [];
      for (; t < e.length && e[t] !== ")"; ) {
        const l = t;
        for (; t < e.length && e[t] !== "|" && e[t] !== ")"; ) t++;
        let u = e.substring(l, t);
        if (u = u.trim(), !It(u)) throw new Error(`Invalid notation name: "${u}"`);
        c.push(u), e[t] === "|" && (t++, t = Re(e, t));
      }
      if (e[t] !== ")") throw new Error("Unterminated list of notations");
      t++, i += " (" + c.join("|") + ")";
    } else {
      const c = t;
      for (; t < e.length && !/\s/.test(e[t]); ) t++;
      i += e.substring(c, t);
      const l = ["CDATA", "ID", "IDREF", "IDREFS", "ENTITY", "ENTITIES", "NMTOKEN", "NMTOKENS"];
      if (!this.suppressValidationErr && !l.includes(i.toUpperCase())) throw new Error(`Invalid attribute type: "${i}"`);
    }
    t = Re(e, t);
    let a = "";
    return e.substring(t, t + 8).toUpperCase() === "#REQUIRED" ? (a = "#REQUIRED", t += 8) : e.substring(t, t + 7).toUpperCase() === "#IMPLIED" ? (a = "#IMPLIED", t += 7) : [t, a] = this.readIdentifierVal(e, t, "ATTLIST"), { elementName: s, attributeName: o, attributeType: i, defaultValue: a, index: t };
  }
}
const Re = (n, e) => {
  for (; e < n.length && /\s/.test(n[e]); ) e++;
  return e;
};
function mt(n, e, t) {
  for (let r = 0; r < e.length; r++) if (e[r] !== n[t + r + 1]) return !1;
  return !0;
}
function It(n) {
  if (hn(n)) return n;
  throw new Error(`Invalid entity name ${n}`);
}
const Ki = /^[-+]?0x[a-fA-F0-9]+$/, Gi = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/, Yi = { hex: !0, leadingZeros: !0, decimalPoint: ".", eNotation: !0, infinity: "original" }, Xi = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
class Qi {
  constructor(e) {
    this._matcher = e;
  }
  get separator() {
    return this._matcher.separator;
  }
  getCurrentTag() {
    const e = this._matcher.path;
    return e.length > 0 ? e[e.length - 1].tag : void 0;
  }
  getCurrentNamespace() {
    const e = this._matcher.path;
    return e.length > 0 ? e[e.length - 1].namespace : void 0;
  }
  getAttrValue(e) {
    const t = this._matcher.path;
    if (t.length !== 0) return t[t.length - 1].values?.[e];
  }
  hasAttr(e) {
    const t = this._matcher.path;
    if (t.length === 0) return !1;
    const r = t[t.length - 1];
    return r.values !== void 0 && e in r.values;
  }
  getPosition() {
    const e = this._matcher.path;
    return e.length === 0 ? -1 : e[e.length - 1].position ?? 0;
  }
  getCounter() {
    const e = this._matcher.path;
    return e.length === 0 ? -1 : e[e.length - 1].counter ?? 0;
  }
  getIndex() {
    return this.getPosition();
  }
  getDepth() {
    return this._matcher.path.length;
  }
  toString(e) {
    let t = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
    return this._matcher.toString(e, t);
  }
  toArray() {
    return this._matcher.path.map(((e) => e.tag));
  }
  matches(e) {
    return this._matcher.matches(e);
  }
  matchesAny(e) {
    return e.matchesAny(this._matcher);
  }
}
class sr {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.separator = e.separator || ".", this.path = [], this.siblingStacks = [], this._pathStringCache = null, this._view = new Qi(this);
  }
  push(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    this._pathStringCache = null, this.path.length > 0 && (this.path[this.path.length - 1].values = void 0);
    const s = this.path.length;
    this.siblingStacks[s] || (this.siblingStacks[s] = /* @__PURE__ */ new Map());
    const o = this.siblingStacks[s], i = r ? `${r}:${e}` : e, a = o.get(i) || 0;
    let c = 0;
    for (const u of o.values()) c += u;
    o.set(i, a + 1);
    const l = { tag: e, position: c, counter: a };
    r != null && (l.namespace = r), t != null && (l.values = t), this.path.push(l);
  }
  pop() {
    if (this.path.length === 0) return;
    this._pathStringCache = null;
    const e = this.path.pop();
    return this.siblingStacks.length > this.path.length + 1 && (this.siblingStacks.length = this.path.length + 1), e;
  }
  updateCurrent(e) {
    if (this.path.length > 0) {
      const t = this.path[this.path.length - 1];
      e != null && (t.values = e);
    }
  }
  getCurrentTag() {
    return this.path.length > 0 ? this.path[this.path.length - 1].tag : void 0;
  }
  getCurrentNamespace() {
    return this.path.length > 0 ? this.path[this.path.length - 1].namespace : void 0;
  }
  getAttrValue(e) {
    if (this.path.length !== 0) return this.path[this.path.length - 1].values?.[e];
  }
  hasAttr(e) {
    if (this.path.length === 0) return !1;
    const t = this.path[this.path.length - 1];
    return t.values !== void 0 && e in t.values;
  }
  getPosition() {
    return this.path.length === 0 ? -1 : this.path[this.path.length - 1].position ?? 0;
  }
  getCounter() {
    return this.path.length === 0 ? -1 : this.path[this.path.length - 1].counter ?? 0;
  }
  getIndex() {
    return this.getPosition();
  }
  getDepth() {
    return this.path.length;
  }
  toString(e) {
    let t = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
    const r = e || this.separator;
    if (r === this.separator && t === !0) {
      if (this._pathStringCache !== null) return this._pathStringCache;
      const s = this.path.map(((o) => o.namespace ? `${o.namespace}:${o.tag}` : o.tag)).join(r);
      return this._pathStringCache = s, s;
    }
    return this.path.map(((s) => t && s.namespace ? `${s.namespace}:${s.tag}` : s.tag)).join(r);
  }
  toArray() {
    return this.path.map(((e) => e.tag));
  }
  reset() {
    this._pathStringCache = null, this.path = [], this.siblingStacks = [];
  }
  matches(e) {
    const t = e.segments;
    return t.length !== 0 && (e.hasDeepWildcard() ? this._matchWithDeepWildcard(t) : this._matchSimple(t));
  }
  _matchSimple(e) {
    if (this.path.length !== e.length) return !1;
    for (let t = 0; t < e.length; t++) if (!this._matchSegment(e[t], this.path[t], t === this.path.length - 1)) return !1;
    return !0;
  }
  _matchWithDeepWildcard(e) {
    let t = this.path.length - 1, r = e.length - 1;
    for (; r >= 0 && t >= 0; ) {
      const s = e[r];
      if (s.type === "deep-wildcard") {
        if (r--, r < 0) return !0;
        const o = e[r];
        let i = !1;
        for (let a = t; a >= 0; a--) if (this._matchSegment(o, this.path[a], a === this.path.length - 1)) {
          t = a - 1, r--, i = !0;
          break;
        }
        if (!i) return !1;
      } else {
        if (!this._matchSegment(s, this.path[t], t === this.path.length - 1)) return !1;
        t--, r--;
      }
    }
    return r < 0;
  }
  _matchSegment(e, t, r) {
    if (e.tag !== "*" && e.tag !== t.tag || e.namespace !== void 0 && e.namespace !== "*" && e.namespace !== t.namespace || e.attrName !== void 0 && (!r || !t.values || !(e.attrName in t.values) || e.attrValue !== void 0 && String(t.values[e.attrName]) !== String(e.attrValue)))
      return !1;
    if (e.position !== void 0) {
      if (!r) return !1;
      const s = t.counter ?? 0;
      if (e.position === "first" && s !== 0 || e.position === "odd" && s % 2 != 1 || e.position === "even" && s % 2 != 0 || e.position === "nth" && s !== e.positionValue) return !1;
    }
    return !0;
  }
  matchesAny(e) {
    return e.matchesAny(this);
  }
  snapshot() {
    return { path: this.path.map(((e) => ({ ...e }))), siblingStacks: this.siblingStacks.map(((e) => new Map(e))) };
  }
  restore(e) {
    this._pathStringCache = null, this.path = e.path.map(((t) => ({ ...t }))), this.siblingStacks = e.siblingStacks.map(((t) => new Map(t)));
  }
  readOnly() {
    return this._view;
  }
}
class kt {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 ? arguments[2] : void 0;
    this.pattern = e, this.separator = t.separator || ".", this.segments = this._parse(e), this.data = r, this._hasDeepWildcard = this.segments.some(((s) => s.type === "deep-wildcard")), this._hasAttributeCondition = this.segments.some(((s) => s.attrName !== void 0)), this._hasPositionSelector = this.segments.some(((s) => s.position !== void 0));
  }
  _parse(e) {
    const t = [];
    let r = 0, s = "";
    for (; r < e.length; ) e[r] === this.separator ? r + 1 < e.length && e[r + 1] === this.separator ? (s.trim() && (t.push(this._parseSegment(s.trim())), s = ""), t.push({ type: "deep-wildcard" }), r += 2) : (s.trim() && t.push(this._parseSegment(s.trim())), s = "", r++) : (s += e[r], r++);
    return s.trim() && t.push(this._parseSegment(s.trim())), t;
  }
  _parseSegment(e) {
    const t = { type: "tag" };
    let r = null, s = e;
    const o = e.match(/^([^\[]+)(\[[^\]]*\])(.*)$/);
    if (o && (s = o[1] + o[3], o[2])) {
      const u = o[2].slice(1, -1);
      u && (r = u);
    }
    let i, a, c = s;
    if (s.includes("::")) {
      const u = s.indexOf("::");
      if (i = s.substring(0, u).trim(), c = s.substring(u + 2).trim(), !i) throw new Error(`Invalid namespace in pattern: ${e}`);
    }
    let l = null;
    if (c.includes(":")) {
      const u = c.lastIndexOf(":"), h = c.substring(0, u).trim(), d = c.substring(u + 1).trim();
      ["first", "last", "odd", "even"].includes(d) || /^nth\(\d+\)$/.test(d) ? (a = h, l = d) : a = c;
    } else a = c;
    if (!a) throw new Error(`Invalid segment pattern: ${e}`);
    if (t.tag = a, i && (t.namespace = i), r) if (r.includes("=")) {
      const u = r.indexOf("=");
      t.attrName = r.substring(0, u).trim(), t.attrValue = r.substring(u + 1).trim();
    } else t.attrName = r.trim();
    if (l) {
      const u = l.match(/^nth\((\d+)\)$/);
      u ? (t.position = "nth", t.positionValue = parseInt(u[1], 10)) : t.position = l;
    }
    return t;
  }
  get length() {
    return this.segments.length;
  }
  hasDeepWildcard() {
    return this._hasDeepWildcard;
  }
  hasAttributeCondition() {
    return this._hasAttributeCondition;
  }
  hasPositionSelector() {
    return this._hasPositionSelector;
  }
  toString() {
    return this.pattern;
  }
}
class Ji {
  constructor() {
    this._byDepthAndTag = /* @__PURE__ */ new Map(), this._wildcardByDepth = /* @__PURE__ */ new Map(), this._deepWildcards = [], this._patterns = /* @__PURE__ */ new Set(), this._sealed = !1;
  }
  add(e) {
    if (this._sealed) throw new TypeError("ExpressionSet is sealed. Create a new ExpressionSet to add more expressions.");
    if (this._patterns.has(e.pattern)) return this;
    if (this._patterns.add(e.pattern), e.hasDeepWildcard()) return this._deepWildcards.push(e), this;
    const t = e.length, r = e.segments[e.segments.length - 1], s = r?.tag;
    if (s && s !== "*") {
      const o = `${t}:${s}`;
      this._byDepthAndTag.has(o) || this._byDepthAndTag.set(o, []), this._byDepthAndTag.get(o).push(e);
    } else this._wildcardByDepth.has(t) || this._wildcardByDepth.set(t, []), this._wildcardByDepth.get(t).push(e);
    return this;
  }
  addAll(e) {
    for (const t of e) this.add(t);
    return this;
  }
  has(e) {
    return this._patterns.has(e.pattern);
  }
  get size() {
    return this._patterns.size;
  }
  seal() {
    return this._sealed = !0, this;
  }
  get isSealed() {
    return this._sealed;
  }
  matchesAny(e) {
    return this.findMatch(e) !== null;
  }
  findMatch(e) {
    const t = e.getDepth(), r = `${t}:${e.getCurrentTag()}`, s = this._byDepthAndTag.get(r);
    if (s) {
      for (let i = 0; i < s.length; i++) if (e.matches(s[i])) return s[i];
    }
    const o = this._wildcardByDepth.get(t);
    if (o) {
      for (let i = 0; i < o.length; i++) if (e.matches(o[i])) return o[i];
    }
    for (let i = 0; i < this._deepWildcards.length; i++) if (e.matches(this._deepWildcards[i])) return this._deepWildcards[i];
    return null;
  }
}
const Zi = { cent: "¢", pound: "£", curren: "¤", yen: "¥", euro: "€", dollar: "$", euro: "€", fnof: "ƒ", inr: "₹", af: "؋", birr: "ብር", peso: "₱", rub: "₽", won: "₩", yuan: "¥", cedil: "¸" }, zs = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' }, ea = { nbsp: " ", copy: "©", reg: "®", trade: "™", mdash: "—", ndash: "–", hellip: "…", laquo: "«", raquo: "»", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", bull: "•", para: "¶", sect: "§", deg: "°", frac12: "½", frac14: "¼", frac34: "¾" }, ta = new Set("!?\\\\/[]$%{}^&*()<>|+");
function Kr(n) {
  if (n[0] === "#") throw new Error(`[EntityReplacer] Invalid character '#' in entity name: "${n}"`);
  for (const e of n) if (ta.has(e)) throw new Error(`[EntityReplacer] Invalid character '${e}' in entity name: "${n}"`);
  return n;
}
function En() {
  const n = /* @__PURE__ */ Object.create(null);
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
  for (const s of t) if (s) for (const o of Object.keys(s)) {
    const i = s[o];
    if (typeof i == "string") n[o] = i;
    else if (i && typeof i == "object" && i.val !== void 0) {
      const a = i.val;
      typeof a == "string" && (n[o] = a);
    }
  }
  return n;
}
const vt = "external", Xt = "base", Tn = "all", He = Object.freeze({ allow: 0, leave: 1, remove: 2, throw: 3 }), na = /* @__PURE__ */ new Set([9, 10, 13]);
class Vs {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var t;
    this._limit = e.limit || {}, this._maxTotalExpansions = this._limit.maxTotalExpansions || 0, this._maxExpandedLength = this._limit.maxExpandedLength || 0, this._postCheck = typeof e.postCheck == "function" ? e.postCheck : (s) => s, this._limitTiers = (t = this._limit.applyLimitsTo ?? vt) && t !== vt ? t === Tn ? /* @__PURE__ */ new Set([Tn]) : t === Xt ? /* @__PURE__ */ new Set([Xt]) : Array.isArray(t) ? new Set(t) : /* @__PURE__ */ new Set([vt]) : /* @__PURE__ */ new Set([vt]), this._numericAllowed = e.numericAllowed ?? !0, this._baseMap = En(zs, e.namedEntities || null), this._externalMap = /* @__PURE__ */ Object.create(null), this._inputMap = /* @__PURE__ */ Object.create(null), this._totalExpansions = 0, this._expandedLength = 0, this._removeSet = new Set(e.remove && Array.isArray(e.remove) ? e.remove : []), this._leaveSet = new Set(e.leave && Array.isArray(e.leave) ? e.leave : []);
    const r = (function(s) {
      if (!s) return { xmlVersion: 1, onLevel: He.allow, nullLevel: He.remove };
      const o = s.xmlVersion === 1.1 ? 1.1 : 1, i = He[s.onNCR] ?? He.allow, a = He[s.nullNCR] ?? He.remove;
      return { xmlVersion: o, onLevel: i, nullLevel: Math.max(a, He.remove) };
    })(e.ncr);
    this._ncrXmlVersion = r.xmlVersion, this._ncrOnLevel = r.onLevel, this._ncrNullLevel = r.nullLevel;
  }
  setExternalEntities(e) {
    if (e) for (const t of Object.keys(e)) Kr(t);
    this._externalMap = En(e);
  }
  addExternalEntity(e, t) {
    Kr(e), typeof t == "string" && t.indexOf("&") === -1 && (this._externalMap[e] = t);
  }
  addInputEntities(e) {
    this._totalExpansions = 0, this._expandedLength = 0, this._inputMap = En(e);
  }
  reset() {
    return this._inputMap = /* @__PURE__ */ Object.create(null), this._totalExpansions = 0, this._expandedLength = 0, this;
  }
  setXmlVersion(e) {
    this._ncrXmlVersion = e === 1.1 ? 1.1 : 1;
  }
  decode(e) {
    if (typeof e != "string" || e.length === 0) return e;
    const t = e, r = [], s = e.length;
    let o = 0, i = 0;
    const a = this._maxTotalExpansions > 0, c = this._maxExpandedLength > 0, l = a || c;
    for (; i < s; ) {
      if (e.charCodeAt(i) !== 38) {
        i++;
        continue;
      }
      let h = i + 1;
      for (; h < s && e.charCodeAt(h) !== 59 && h - i <= 32; ) h++;
      if (h >= s || e.charCodeAt(h) !== 59) {
        i++;
        continue;
      }
      const d = e.slice(i + 1, h);
      if (d.length === 0) {
        i++;
        continue;
      }
      let g, _;
      if (this._removeSet.has(d)) g = "", _ === void 0 && (_ = vt);
      else {
        if (this._leaveSet.has(d)) {
          i++;
          continue;
        }
        if (d.charCodeAt(0) === 35) {
          const m = this._resolveNCR(d);
          if (m === void 0) {
            i++;
            continue;
          }
          g = m, _ = Xt;
        } else {
          const m = this._resolveName(d);
          g = m?.value, _ = m?.tier;
        }
      }
      if (g !== void 0) {
        if (i > o && r.push(e.slice(o, i)), r.push(g), o = h + 1, i = o, l && this._tierCounts(_)) {
          if (a && (this._totalExpansions++, this._totalExpansions > this._maxTotalExpansions)) throw new Error(`[EntityReplacer] Entity expansion count limit exceeded: ${this._totalExpansions} > ${this._maxTotalExpansions}`);
          if (c) {
            const m = g.length - (d.length + 2);
            if (m > 0 && (this._expandedLength += m, this._expandedLength > this._maxExpandedLength)) throw new Error(`[EntityReplacer] Expanded content length limit exceeded: ${this._expandedLength} > ${this._maxExpandedLength}`);
          }
        }
      } else i++;
    }
    o < s && r.push(e.slice(o));
    const u = r.length === 0 ? e : r.join("");
    return this._postCheck(u, t);
  }
  _tierCounts(e) {
    return !!this._limitTiers.has(Tn) || this._limitTiers.has(e);
  }
  _resolveName(e) {
    return e in this._inputMap ? { value: this._inputMap[e], tier: vt } : e in this._externalMap ? { value: this._externalMap[e], tier: vt } : e in this._baseMap ? { value: this._baseMap[e], tier: Xt } : void 0;
  }
  _classifyNCR(e) {
    return e === 0 ? this._ncrNullLevel : e >= 55296 && e <= 57343 || this._ncrXmlVersion === 1 && e >= 1 && e <= 31 && !na.has(e) ? He.remove : -1;
  }
  _applyNCRAction(e, t, r) {
    switch (e) {
      case He.allow:
        return String.fromCodePoint(r);
      case He.remove:
        return "";
      case He.leave:
        return;
      case He.throw:
        throw new Error(`[EntityDecoder] Prohibited numeric character reference &${t}; (U+${r.toString(16).toUpperCase().padStart(4, "0")})`);
      default:
        return String.fromCodePoint(r);
    }
  }
  _resolveNCR(e) {
    const t = e.charCodeAt(1);
    let r;
    if (r = t === 120 || t === 88 ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10), Number.isNaN(r) || r < 0 || r > 1114111) return;
    const s = this._classifyNCR(r);
    if (!this._numericAllowed && s < He.remove) return;
    const o = s === -1 ? this._ncrOnLevel : Math.max(this._ncrOnLevel, s);
    return this._applyNCRAction(o, e, r);
  }
}
function ra(n, e) {
  if (!n) return {};
  const t = e.attributesGroupName ? n[e.attributesGroupName] : n;
  if (!t) return {};
  const r = {};
  for (const s in t) s.startsWith(e.attributeNamePrefix) ? r[s.substring(e.attributeNamePrefix.length)] = t[s] : r[s] = t[s];
  return r;
}
function sa(n) {
  if (!n || typeof n != "string") return;
  const e = n.indexOf(":");
  if (e !== -1 && e > 0) {
    const t = n.substring(0, e);
    if (t !== "xmlns") return t;
  }
}
class oa {
  constructor(e, t) {
    var r;
    this.options = e, this.currentNode = null, this.tagsNodeStack = [], this.parseXml = ca, this.parseTextData = ia, this.resolveNameSpace = aa, this.buildAttributesMap = ua, this.isItStopNode = pa, this.replaceEntitiesValue = ha, this.readStopNodeData = va, this.saveTextToParentTag = fa, this.addChild = da, this.ignoreAttributesFn = typeof (r = this.options.ignoreAttributes) == "function" ? r : Array.isArray(r) ? (i) => {
      for (const a of r)
        if (typeof a == "string" && i === a || a instanceof RegExp && a.test(i)) return !0;
    } : () => !1, this.entityExpansionCount = 0, this.currentExpandedLength = 0;
    let s = { ...zs };
    this.options.entityDecoder ? this.entityDecoder = this.options.entityDecoder : (typeof this.options.htmlEntities == "object" ? s = this.options.htmlEntities : this.options.htmlEntities === !0 && (s = { ...ea, ...Zi }), this.entityDecoder = new Vs({ namedEntities: { ...s, ...t }, numericAllowed: this.options.htmlEntities, limit: { maxTotalExpansions: this.options.processEntities.maxTotalExpansions, maxExpandedLength: this.options.processEntities.maxExpandedLength, applyLimitsTo: this.options.processEntities.appliesTo } })), this.matcher = new sr(), this.readonlyMatcher = this.matcher.readOnly(), this.isCurrentNodeStopNode = !1, this.stopNodeExpressionsSet = new Ji();
    const o = this.options.stopNodes;
    if (o && o.length > 0) {
      for (let i = 0; i < o.length; i++) {
        const a = o[i];
        typeof a == "string" ? this.stopNodeExpressionsSet.add(new kt(a)) : a instanceof kt && this.stopNodeExpressionsSet.add(a);
      }
      this.stopNodeExpressionsSet.seal();
    }
  }
}
function ia(n, e, t, r, s, o, i) {
  const a = this.options;
  if (n !== void 0 && (a.trimValues && !r && (n = n.trim()), n.length > 0)) {
    i || (n = this.replaceEntitiesValue(n, e, t));
    const c = a.jPath ? t.toString() : t, l = a.tagValueProcessor(e, n, c, s, o);
    return l == null ? n : typeof l != typeof n || l !== n ? l : a.trimValues || n.trim() === n ? Us(n, a.parseTagValue, a.numberParseOptions) : n;
  }
}
function aa(n) {
  if (this.options.removeNSPrefix) {
    const e = n.split(":"), t = n.charAt(0) === "/" ? "/" : "";
    if (e[0] === "xmlns") return "";
    e.length === 2 && (n = t + e[1]);
  }
  return n;
}
const la = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
function ua(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
  const s = this.options;
  if (r === !0 || s.ignoreAttributes !== !0 && typeof n == "string") {
    const o = Os(n, la), i = o.length, a = {}, c = new Array(i);
    let l = !1;
    const u = {};
    for (let g = 0; g < i; g++) {
      const _ = this.resolveNameSpace(o[g][1]), m = o[g][4];
      if (_.length && m !== void 0) {
        let v = m;
        s.trimValues && (v = v.trim()), v = this.replaceEntitiesValue(v, t, this.readonlyMatcher), c[g] = v, u[_] = v, l = !0;
      }
    }
    l && typeof e == "object" && e.updateCurrent && e.updateCurrent(u);
    const h = s.jPath ? e.toString() : this.readonlyMatcher;
    let d = !1;
    for (let g = 0; g < i; g++) {
      const _ = this.resolveNameSpace(o[g][1]);
      if (this.ignoreAttributesFn(_, h)) continue;
      let m = s.attributeNamePrefix + _;
      if (_.length) if (s.transformAttributeName && (m = s.transformAttributeName(m)), m = Bs(m, s), o[g][4] !== void 0) {
        const v = c[g], b = s.attributeValueProcessor(_, v, h);
        a[m] = b == null ? v : typeof b != typeof v || b !== v ? b : Us(v, s.parseAttributeValue, s.numberParseOptions), d = !0;
      } else s.allowBooleanAttributes && (a[m] = !0, d = !0);
    }
    if (!d) return;
    if (s.attributesGroupName && !s.preserveOrder) {
      const g = {};
      return g[s.attributesGroupName] = a, g;
    }
    return a;
  }
}
const ca = function(n) {
  n = n.replace(/\r\n?/g, `
`);
  const e = new ut("!xml");
  let t = e, r = "";
  this.matcher.reset(), this.entityDecoder.reset(), this.entityExpansionCount = 0, this.currentExpandedLength = 0;
  const s = this.options, o = new qi(s.processEntities), i = n.length;
  for (let a = 0; a < i; a++) if (n[a] === "<") {
    const c = n.charCodeAt(a + 1);
    if (c === 47) {
      const l = St(n, ">", a, "Closing Tag is not closed.");
      let u = n.substring(a + 2, l).trim();
      if (s.removeNSPrefix) {
        const d = u.indexOf(":");
        d !== -1 && (u = u.substr(d + 1));
      }
      u = An(s.transformTagName, u, "", s).tagName, t && (r = this.saveTextToParentTag(r, t, this.readonlyMatcher));
      const h = this.matcher.getCurrentTag();
      if (u && s.unpairedTagsSet.has(u)) throw new Error(`Unpaired tag can not be used as closing tag: </${u}>`);
      h && s.unpairedTagsSet.has(h) && (this.matcher.pop(), this.tagsNodeStack.pop()), this.matcher.pop(), this.isCurrentNodeStopNode = !1, t = this.tagsNodeStack.pop(), r = "", a = l;
    } else if (c === 63) {
      let l = Hn(n, a, !1, "?>");
      if (!l) throw new Error("Pi Tag is not closed.");
      r = this.saveTextToParentTag(r, t, this.readonlyMatcher);
      const u = this.buildAttributesMap(l.tagExp, this.matcher, l.tagName, !0);
      if (u) {
        const h = u[this.options.attributeNamePrefix + "version"];
        this.entityDecoder.setXmlVersion(Number(h) || 1);
      }
      if (!(s.ignoreDeclaration && l.tagName === "?xml" || s.ignorePiTags)) {
        const h = new ut(l.tagName);
        h.add(s.textNodeName, ""), l.tagName !== l.tagExp && l.attrExpPresent && s.ignoreAttributes !== !0 && (h[":@"] = u), this.addChild(t, h, this.readonlyMatcher, a);
      }
      a = l.closeIndex + 1;
    } else if (c === 33 && n.charCodeAt(a + 2) === 45 && n.charCodeAt(a + 3) === 45) {
      const l = St(n, "-->", a + 4, "Comment is not closed.");
      if (s.commentPropName) {
        const u = n.substring(a + 4, l - 2);
        r = this.saveTextToParentTag(r, t, this.readonlyMatcher), t.add(s.commentPropName, [{ [s.textNodeName]: u }]);
      }
      a = l;
    } else if (c === 33 && n.charCodeAt(a + 2) === 68) {
      const l = o.readDocType(n, a);
      this.entityDecoder.addInputEntities(l.entities), a = l.i;
    } else if (c === 33 && n.charCodeAt(a + 2) === 91) {
      const l = St(n, "]]>", a, "CDATA is not closed.") - 2, u = n.substring(a + 9, l);
      r = this.saveTextToParentTag(r, t, this.readonlyMatcher);
      let h = this.parseTextData(u, t.tagname, this.readonlyMatcher, !0, !1, !0, !0);
      h == null && (h = ""), s.cdataPropName ? t.add(s.cdataPropName, [{ [s.textNodeName]: u }]) : t.add(s.textNodeName, h), a = l + 2;
    } else {
      let l = Hn(n, a, s.removeNSPrefix);
      if (!l) {
        const x = n.substring(Math.max(0, a - 50), Math.min(i, a + 50));
        throw new Error(`readTagExp returned undefined at position ${a}. Context: "${x}"`);
      }
      let u = l.tagName;
      const h = l.rawTagName;
      let d = l.tagExp, g = l.attrExpPresent, _ = l.closeIndex;
      if ({ tagName: u, tagExp: d } = An(s.transformTagName, u, d, s), s.strictReservedNames && (u === s.commentPropName || u === s.cdataPropName || u === s.textNodeName || u === s.attributesGroupName)) throw new Error(`Invalid tag name: ${u}`);
      t && r && t.tagname !== "!xml" && (r = this.saveTextToParentTag(r, t, this.readonlyMatcher, !1));
      const m = t;
      m && s.unpairedTagsSet.has(m.tagname) && (t = this.tagsNodeStack.pop(), this.matcher.pop());
      let v = !1;
      d.length > 0 && d.lastIndexOf("/") === d.length - 1 && (v = !0, u[u.length - 1] === "/" ? (u = u.substr(0, u.length - 1), d = u) : d = d.substr(0, d.length - 1), g = u !== d);
      let b, y = null;
      b = sa(h), u !== e.tagname && this.matcher.push(u, {}, b), u !== d && g && (y = this.buildAttributesMap(d, this.matcher, u), y && ra(y, s)), u !== e.tagname && (this.isCurrentNodeStopNode = this.isItStopNode());
      const w = a;
      if (this.isCurrentNodeStopNode) {
        let x = "";
        if (v) a = l.closeIndex;
        else if (s.unpairedTagsSet.has(u)) a = l.closeIndex;
        else {
          const k = this.readStopNodeData(n, h, _ + 1);
          if (!k) throw new Error(`Unexpected end of ${h}`);
          a = k.i, x = k.tagContent;
        }
        const $ = new ut(u);
        y && ($[":@"] = y), $.add(s.textNodeName, x), this.matcher.pop(), this.isCurrentNodeStopNode = !1, this.addChild(t, $, this.readonlyMatcher, w);
      } else {
        if (v) {
          ({ tagName: u, tagExp: d } = An(s.transformTagName, u, d, s));
          const x = new ut(u);
          y && (x[":@"] = y), this.addChild(t, x, this.readonlyMatcher, w), this.matcher.pop(), this.isCurrentNodeStopNode = !1;
        } else {
          if (s.unpairedTagsSet.has(u)) {
            const x = new ut(u);
            y && (x[":@"] = y), this.addChild(t, x, this.readonlyMatcher, w), this.matcher.pop(), this.isCurrentNodeStopNode = !1, a = l.closeIndex;
            continue;
          }
          {
            const x = new ut(u);
            if (this.tagsNodeStack.length > s.maxNestedTags) throw new Error("Maximum nested tags exceeded");
            this.tagsNodeStack.push(t), y && (x[":@"] = y), this.addChild(t, x, this.readonlyMatcher, w), t = x;
          }
        }
        r = "", a = _;
      }
    }
  } else r += n[a];
  return e.child;
};
function da(n, e, t, r) {
  this.options.captureMetaData || (r = void 0);
  const s = this.options.jPath ? t.toString() : t, o = this.options.updateTag(e.tagname, s, e[":@"]);
  o === !1 || (typeof o == "string" && (e.tagname = o), n.addChild(e, r));
}
function ha(n, e, t) {
  const r = this.options.processEntities;
  if (!r || !r.enabled) return n;
  if (r.allowedTags) {
    const s = this.options.jPath ? t.toString() : t;
    if (!(Array.isArray(r.allowedTags) ? r.allowedTags.includes(e) : r.allowedTags(e, s))) return n;
  }
  if (r.tagFilter) {
    const s = this.options.jPath ? t.toString() : t;
    if (!r.tagFilter(e, s)) return n;
  }
  return this.entityDecoder.decode(n);
}
function fa(n, e, t, r) {
  return n && (r === void 0 && (r = e.child.length === 0), (n = this.parseTextData(n, e.tagname, t, !1, !!e[":@"] && Object.keys(e[":@"]).length !== 0, r)) !== void 0 && n !== "" && e.add(this.options.textNodeName, n), n = ""), n;
}
function pa() {
  return this.stopNodeExpressionsSet.size !== 0 && this.matcher.matchesAny(this.stopNodeExpressionsSet);
}
function St(n, e, t, r) {
  const s = n.indexOf(e, t);
  if (s === -1) throw new Error(r);
  return s + e.length - 1;
}
function ma(n, e, t, r) {
  const s = n.indexOf(e, t);
  if (s === -1) throw new Error(r);
  return s;
}
function Hn(n, e, t) {
  const r = (function(u, h) {
    let d = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ">", g = 0;
    const _ = u.length, m = d.charCodeAt(0), v = d.length > 1 ? d.charCodeAt(1) : -1;
    let b = "", y = h;
    for (let w = h; w < _; w++) {
      const x = u.charCodeAt(w);
      if (g) x === g && (g = 0);
      else if (x === 34 || x === 39) g = x;
      else if (x === m) {
        if (v === -1) return b += u.substring(y, w), { data: b, index: w };
        if (u.charCodeAt(w + 1) === v) return b += u.substring(y, w), { data: b, index: w };
      } else x !== 9 || g || (b += u.substring(y, w) + " ", y = w + 1);
    }
  })(n, e + 1, arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ">");
  if (!r) return;
  let s = r.data;
  const o = r.index, i = s.search(/\s/);
  let a = s, c = !0;
  i !== -1 && (a = s.substring(0, i), s = s.substring(i + 1).trimStart());
  const l = a;
  if (t) {
    const u = a.indexOf(":");
    u !== -1 && (a = a.substr(u + 1), c = a !== r.data.substr(u + 1));
  }
  return { tagName: a, tagExp: s, closeIndex: o, attrExpPresent: c, rawTagName: l };
}
function va(n, e, t) {
  const r = t;
  let s = 1;
  const o = n.length;
  for (; t < o; t++) if (n[t] === "<") {
    const i = n.charCodeAt(t + 1);
    if (i === 47) {
      const a = ma(n, ">", t, `${e} is not closed`);
      if (n.substring(t + 2, a).trim() === e && (s--, s === 0)) return { tagContent: n.substring(r, t), i: a };
      t = a;
    } else if (i === 63) t = St(n, "?>", t + 1, "StopNode is not closed.");
    else if (i === 33 && n.charCodeAt(t + 2) === 45 && n.charCodeAt(t + 3) === 45) t = St(n, "-->", t + 3, "StopNode is not closed.");
    else if (i === 33 && n.charCodeAt(t + 2) === 91) t = St(n, "]]>", t, "StopNode is not closed.") - 2;
    else {
      const a = Hn(n, t, ">");
      a && ((a && a.tagName) === e && a.tagExp[a.tagExp.length - 1] !== "/" && s++, t = a.closeIndex);
    }
  }
}
function Us(n, e, t) {
  if (e && typeof n == "string") {
    const r = n.trim();
    return r === "true" || r !== "false" && (function(s) {
      let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (o = Object.assign({}, Yi, o), !s || typeof s != "string") return s;
      let i = s.trim();
      if (i.length === 0 || o.skipLike !== void 0 && o.skipLike.test(i)) return s;
      if (i === "0") return 0;
      if (o.hex && Ki.test(i)) return (function(c) {
        if (parseInt) return parseInt(c, 16);
        if (Number.parseInt) return Number.parseInt(c, 16);
        if (window && window.parseInt) return window.parseInt(c, 16);
        throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
      })(i);
      if (isFinite(i)) {
        if (i.includes("e") || i.includes("E")) return (function(c, l, u) {
          if (!u.eNotation) return c;
          const h = l.match(Xi);
          if (h) {
            let d = h[1] || "";
            const g = h[3].indexOf("e") === -1 ? "E" : "e", _ = h[2], m = d ? c[_.length + 1] === g : c[_.length] === g;
            return _.length > 1 && m ? c : (_.length !== 1 || !h[3].startsWith(`.${g}`) && h[3][0] !== g) && _.length > 0 ? u.leadingZeros && !m ? (l = (h[1] || "") + h[3], Number(l)) : c : Number(l);
          }
          return c;
        })(s, i, o);
        {
          const c = Gi.exec(i);
          if (c) {
            const l = c[1] || "", u = c[2];
            let h = ((a = c[3]) && a.indexOf(".") !== -1 && ((a = a.replace(/0+$/, "")) === "." ? a = "0" : a[0] === "." ? a = "0" + a : a[a.length - 1] === "." && (a = a.substring(0, a.length - 1))), a);
            const d = l ? s[u.length + 1] === "." : s[u.length] === ".";
            if (!o.leadingZeros && (u.length > 1 || u.length === 1 && !d)) return s;
            {
              const g = Number(i), _ = String(g);
              if (g === 0) return g;
              if (_.search(/[eE]/) !== -1) return o.eNotation ? g : s;
              if (i.indexOf(".") !== -1) return _ === "0" || _ === h || _ === `${l}${h}` ? g : s;
              let m = u ? h : i;
              return u ? m === _ || l + m === _ ? g : s : m === _ || m === l + _ ? g : s;
            }
          }
          return s;
        }
      }
      var a;
      return (function(c, l, u) {
        const h = l === 1 / 0;
        switch (u.infinity.toLowerCase()) {
          case "null":
            return null;
          case "infinity":
            return l;
          case "string":
            return h ? "Infinity" : "-Infinity";
          default:
            return c;
        }
      })(s, Number(i), o);
    })(n, t);
  }
  return n !== void 0 ? n : "";
}
function An(n, e, t, r) {
  if (n) {
    const s = n(e);
    t === e && (t = s), e = s;
  }
  return { tagName: e = Bs(e, r), tagExp: t };
}
function Bs(n, e) {
  if (Ls.includes(n)) throw new Error(`[SECURITY] Invalid name: "${n}" is a reserved JavaScript keyword that could cause prototype pollution`);
  return rr.includes(n) ? e.onDangerousProperty(n) : n;
}
const Nn = ut.getMetaDataSymbol();
function ga(n, e) {
  if (!n || typeof n != "object") return {};
  if (!e) return n;
  const t = {};
  for (const r in n) r.startsWith(e) ? t[r.substring(e.length)] = n[r] : t[r] = n[r];
  return t;
}
function _a(n, e, t, r) {
  return Hs(n, e, t, r);
}
function Hs(n, e, t, r) {
  let s;
  const o = {};
  for (let i = 0; i < n.length; i++) {
    const a = n[i], c = ya(a);
    if (c !== void 0 && c !== e.textNodeName) {
      const l = ga(a[":@"] || {}, e.attributeNamePrefix);
      t.push(c, l);
    }
    if (c === e.textNodeName) s === void 0 ? s = a[c] : s += "" + a[c];
    else {
      if (c === void 0) continue;
      if (a[c]) {
        let l = Hs(a[c], e, t, r);
        const u = ba(l, e);
        if (a[":@"] ? wa(l, a[":@"], r, e) : Object.keys(l).length !== 1 || l[e.textNodeName] === void 0 || e.alwaysCreateTextNode ? Object.keys(l).length === 0 && (e.alwaysCreateTextNode ? l[e.textNodeName] = "" : l = "") : l = l[e.textNodeName], a[Nn] !== void 0 && typeof l == "object" && l !== null && (l[Nn] = a[Nn]), o[c] !== void 0 && Object.prototype.hasOwnProperty.call(o, c)) Array.isArray(o[c]) || (o[c] = [o[c]]), o[c].push(l);
        else {
          const h = e.jPath ? r.toString() : r;
          e.isArray(c, h, u) ? o[c] = [l] : o[c] = l;
        }
        c !== void 0 && c !== e.textNodeName && t.pop();
      }
    }
  }
  return typeof s == "string" ? s.length > 0 && (o[e.textNodeName] = s) : s !== void 0 && (o[e.textNodeName] = s), o;
}
function ya(n) {
  const e = Object.keys(n);
  for (let t = 0; t < e.length; t++) {
    const r = e[t];
    if (r !== ":@") return r;
  }
}
function wa(n, e, t, r) {
  if (e) {
    const s = Object.keys(e), o = s.length;
    for (let i = 0; i < o; i++) {
      const a = s[i], c = a.startsWith(r.attributeNamePrefix) ? a.substring(r.attributeNamePrefix.length) : a, l = r.jPath ? t.toString() + "." + c : t;
      r.isArray(a, l, !0, !0) ? n[a] = [e[a]] : n[a] = e[a];
    }
  }
}
function ba(n, e) {
  const { textNodeName: t } = e, r = Object.keys(n).length;
  return r === 0 || !(r !== 1 || !n[t] && typeof n[t] != "boolean" && n[t] !== 0);
}
const xa = { allowBooleanAttributes: !1, unpairedTags: [] };
function Gr(n) {
  return n === " " || n === "	" || n === `
` || n === "\r";
}
function Yr(n, e) {
  const t = e;
  for (; e < n.length; e++) if (!(n[e] != "?" && n[e] != " ")) {
    const r = n.substr(t, e - t);
    if (e > 5 && r === "xml") return we("InvalidXml", "XML declaration allowed only at the start of the document.", De(n, e));
    if (n[e] == "?" && n[e + 1] == ">") {
      e++;
      break;
    }
  }
  return e;
}
function Xr(n, e) {
  if (n.length > e + 5 && n[e + 1] === "-" && n[e + 2] === "-") {
    for (e += 3; e < n.length; e++) if (n[e] === "-" && n[e + 1] === "-" && n[e + 2] === ">") {
      e += 2;
      break;
    }
  } else if (n.length > e + 8 && n[e + 1] === "D" && n[e + 2] === "O" && n[e + 3] === "C" && n[e + 4] === "T" && n[e + 5] === "Y" && n[e + 6] === "P" && n[e + 7] === "E") {
    let t = 1;
    for (e += 8; e < n.length; e++) if (n[e] === "<") t++;
    else if (n[e] === ">" && (t--, t === 0)) break;
  } else if (n.length > e + 9 && n[e + 1] === "[" && n[e + 2] === "C" && n[e + 3] === "D" && n[e + 4] === "A" && n[e + 5] === "T" && n[e + 6] === "A" && n[e + 7] === "[") {
    for (e += 8; e < n.length; e++) if (n[e] === "]" && n[e + 1] === "]" && n[e + 2] === ">") {
      e += 2;
      break;
    }
  }
  return e;
}
function Sa(n, e) {
  let t = "", r = "", s = !1;
  for (; e < n.length; e++) {
    if (n[e] === '"' || n[e] === "'") r === "" ? r = n[e] : r !== n[e] || (r = "");
    else if (n[e] === ">" && r === "") {
      s = !0;
      break;
    }
    t += n[e];
  }
  return r === "" && { value: t, index: e, tagClosed: s };
}
const $a = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
function Qr(n, e) {
  const t = Os(n, $a), r = {};
  for (let s = 0; s < t.length; s++) {
    if (t[s][1].length === 0) return we("InvalidAttr", "Attribute '" + t[s][2] + "' has no space in starting.", Dt(t[s]));
    if (t[s][3] !== void 0 && t[s][4] === void 0) return we("InvalidAttr", "Attribute '" + t[s][2] + "' is without value.", Dt(t[s]));
    if (t[s][3] === void 0 && !e.allowBooleanAttributes) return we("InvalidAttr", "boolean attribute '" + t[s][2] + "' is not allowed.", Dt(t[s]));
    const o = t[s][2];
    if (!Ca(o)) return we("InvalidAttr", "Attribute '" + o + "' is an invalid name.", Dt(t[s]));
    if (Object.prototype.hasOwnProperty.call(r, o)) return we("InvalidAttr", "Attribute '" + o + "' is repeated.", Dt(t[s]));
    r[o] = 1;
  }
  return !0;
}
function ka(n, e) {
  if (n[++e] === ";") return -1;
  if (n[e] === "#") return (function(r, s) {
    let o = /\d/;
    for (r[s] === "x" && (s++, o = /[\da-fA-F]/); s < r.length; s++) {
      if (r[s] === ";") return s;
      if (!r[s].match(o)) break;
    }
    return -1;
  })(n, ++e);
  let t = 0;
  for (; e < n.length; e++, t++) if (!(n[e].match(/\w/) && t < 20)) {
    if (n[e] === ";") break;
    return -1;
  }
  return e;
}
function we(n, e, t) {
  return { err: { code: n, msg: e, line: t.line || t, col: t.col } };
}
function Ca(n) {
  return hn(n);
}
function De(n, e) {
  const t = n.substring(0, e).split(/\r?\n/);
  return { line: t.length, col: t[t.length - 1].length + 1 };
}
function Dt(n) {
  return n.startIndex + n[1].length;
}
class Ws {
  constructor(e) {
    this.externalEntities = {}, this.options = Wi(e);
  }
  parse(e, t) {
    if (typeof e != "string" && e.toString) e = e.toString();
    else if (typeof e != "string") throw new Error("XML data is accepted in String or Bytes[] form.");
    if (t) {
      t === !0 && (t = {});
      const o = (function(i, a) {
        a = Object.assign({}, xa, a);
        const c = [];
        let l = !1, u = !1;
        i[0] === "\uFEFF" && (i = i.substr(1));
        for (let h = 0; h < i.length; h++) if (i[h] === "<" && i[h + 1] === "?") {
          if (h += 2, h = Yr(i, h), h.err) return h;
        } else {
          if (i[h] !== "<") {
            if (Gr(i[h])) continue;
            return we("InvalidChar", "char '" + i[h] + "' is not expected.", De(i, h));
          }
          {
            let d = h;
            if (h++, i[h] === "!") {
              h = Xr(i, h);
              continue;
            }
            {
              let g = !1;
              i[h] === "/" && (g = !0, h++);
              let _ = "";
              for (; h < i.length && i[h] !== ">" && i[h] !== " " && i[h] !== "	" && i[h] !== `
` && i[h] !== "\r"; h++) _ += i[h];
              if (_ = _.trim(), _[_.length - 1] === "/" && (_ = _.substring(0, _.length - 1), h--), !hn(_)) {
                let b;
                return b = _.trim().length === 0 ? "Invalid space after '<'." : "Tag '" + _ + "' is an invalid name.", we("InvalidTag", b, De(i, h));
              }
              const m = Sa(i, h);
              if (m === !1) return we("InvalidAttr", "Attributes for '" + _ + "' have open quote.", De(i, h));
              let v = m.value;
              if (h = m.index, v[v.length - 1] === "/") {
                const b = h - v.length;
                v = v.substring(0, v.length - 1);
                const y = Qr(v, a);
                if (y !== !0) return we(y.err.code, y.err.msg, De(i, b + y.err.line));
                l = !0;
              } else if (g) {
                if (!m.tagClosed) return we("InvalidTag", "Closing tag '" + _ + "' doesn't have proper closing.", De(i, h));
                if (v.trim().length > 0) return we("InvalidTag", "Closing tag '" + _ + "' can't have attributes or invalid starting.", De(i, d));
                if (c.length === 0) return we("InvalidTag", "Closing tag '" + _ + "' has not been opened.", De(i, d));
                {
                  const b = c.pop();
                  if (_ !== b.tagName) {
                    let y = De(i, b.tagStartPos);
                    return we("InvalidTag", "Expected closing tag '" + b.tagName + "' (opened in line " + y.line + ", col " + y.col + ") instead of closing tag '" + _ + "'.", De(i, d));
                  }
                  c.length == 0 && (u = !0);
                }
              } else {
                const b = Qr(v, a);
                if (b !== !0) return we(b.err.code, b.err.msg, De(i, h - v.length + b.err.line));
                if (u === !0) return we("InvalidXml", "Multiple possible root nodes found.", De(i, h));
                a.unpairedTags.indexOf(_) !== -1 || c.push({ tagName: _, tagStartPos: d }), l = !0;
              }
              for (h++; h < i.length; h++) if (i[h] === "<") {
                if (i[h + 1] === "!") {
                  h++, h = Xr(i, h);
                  continue;
                }
                if (i[h + 1] !== "?") break;
                if (h = Yr(i, ++h), h.err) return h;
              } else if (i[h] === "&") {
                const b = ka(i, h);
                if (b == -1) return we("InvalidChar", "char '&' is not expected.", De(i, h));
                h = b;
              } else if (u === !0 && !Gr(i[h])) return we("InvalidXml", "Extra text at the end", De(i, h));
              i[h] === "<" && h--;
            }
          }
        }
        return l ? c.length == 1 ? we("InvalidTag", "Unclosed tag '" + c[0].tagName + "'.", De(i, c[0].tagStartPos)) : !(c.length > 0) || we("InvalidXml", "Invalid '" + JSON.stringify(c.map(((h) => h.tagName)), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 }) : we("InvalidXml", "Start tag expected.", 1);
      })(e, t);
      if (o !== !0) throw Error(`${o.err.msg}:${o.err.line}:${o.err.col}`);
    }
    const r = new oa(this.options, this.externalEntities), s = r.parseXml(e);
    return this.options.preserveOrder || s === void 0 ? s : _a(s, this.options, r.matcher, r.readonlyMatcher);
  }
  addEntity(e, t) {
    if (t.indexOf("&") !== -1) throw new Error("Entity value can't have '&'");
    if (e.indexOf("&") !== -1 || e.indexOf(";") !== -1) throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
    if (t === "&") throw new Error("An entity with value '&' is not permitted");
    this.externalEntities[e] = t;
  }
  static getMetaDataSymbol() {
    return ut.getMetaDataSymbol();
  }
}
var Pa = me(829), ot = me.n(Pa), wt = (function(n) {
  return n.Array = "array", n.Object = "object", n.Original = "original", n;
})(wt || {});
function Jr(n) {
  return typeof n == "string" ? n : n.toString(".", !1);
}
function qs(n, e) {
  if (!n.endsWith("propstat.prop.displayname")) return e;
}
function Qt(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : wt.Original;
  const r = ot().get(n, e);
  return t === "array" && Array.isArray(r) === !1 ? [r] : t === "object" && Array.isArray(r) ? r[0] : r;
}
function fn(n, e) {
  return e = e ?? { attributeNamePrefix: "@", attributeParsers: [], tagParsers: [qs] }, new Promise(((t) => {
    t((function(r) {
      const { multistatus: s } = r;
      if (s === "") return { multistatus: { response: [] } };
      if (!s) throw new Error("Invalid response: No root multistatus found");
      const o = { multistatus: Array.isArray(s) ? s[0] : s };
      return ot().set(o, "multistatus.response", Qt(o, "multistatus.response", wt.Array)), ot().set(o, "multistatus.response", ot().get(o, "multistatus.response").map(((i) => (function(a) {
        const c = Object.assign({}, a);
        return c.status ? ot().set(c, "status", Qt(c, "status", wt.Object)) : (ot().set(c, "propstat", Qt(c, "propstat", wt.Object)), ot().set(c, "propstat.prop", Qt(c, "propstat.prop", wt.Object))), c;
      })(i)))), o;
    })((function(r) {
      let { attributeNamePrefix: s, attributeParsers: o, entityDecoder: i, tagParsers: a } = r;
      const c = { allowBooleanAttributes: !0, attributeNamePrefix: s, textNodeName: "text", ignoreAttributes: !1, removeNSPrefix: !0, jPath: !1, numberParseOptions: { hex: !0, leadingZeros: !1 }, attributeValueProcessor(l, u, h) {
        const d = Jr(h);
        for (const g of o) try {
          const _ = g(d, u);
          if (_ !== u) return _;
        } catch {
        }
        return u;
      }, tagValueProcessor(l, u, h) {
        const d = Jr(h);
        for (const g of a) try {
          const _ = g(d, u);
          if (_ !== u) return _;
        } catch {
        }
        return u;
      } };
      return i && (c.entityDecoder = new Vs({ limit: { maxTotalExpansions: i.limit?.maxTotalExpansions ?? 0, maxExpandedLength: i.limit?.maxExpandedLength ?? 0 } })), new Ws(c);
    })(e).parse(n)));
  }));
}
function or(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
  const { getlastmodified: r = null, getcontentlength: s = "0", resourcetype: o = null, getcontenttype: i = null, getetag: a = null } = n, c = o && typeof o == "object" && o.collection !== void 0 ? "directory" : "file", l = { filename: e, basename: tn().basename(e), lastmod: r, size: parseInt(s, 10), type: c, etag: typeof a == "string" ? a.replace(/"/g, "") : null };
  return c === "file" && (l.mime = i && typeof i == "string" ? i.split(";")[0] : ""), t && (n.displayname !== void 0 && (n.displayname = String(n.displayname)), l.props = n), l;
}
function Ea(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], r = null;
  try {
    n.multistatus.response[0].propstat && (r = n.multistatus.response[0]);
  } catch {
  }
  if (!r) throw new Error("Failed getting item stat: bad response");
  const { propstat: { prop: s, status: o } } = r, [i, a, c] = o.split(" ", 3), l = parseInt(a, 10);
  if (l >= 400) {
    const u = new Error(`Invalid response: ${l} ${c}`);
    throw u.status = l, u;
  }
  return or(s, Ut(e), t);
}
function Ta(n) {
  switch (String(n)) {
    case "-3":
      return "unlimited";
    case "-2":
    case "-1":
      return "unknown";
    default:
      return parseInt(String(n), 10);
  }
}
function In(n, e, t) {
  return t ? e ? e(n) : n : (n && n.then || (n = Promise.resolve(n)), e ? n.then(e) : n);
}
const ir = /* @__PURE__ */ (function(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
})((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const { details: r = !1 } = t, s = $e({ url: ye(n.remoteURL, _e(e)), method: "PROPFIND", headers: { Accept: "text/plain,application/xml", Depth: "0" } }, n, t);
  return In(Se(s, n), (function(o) {
    return ke(n, o), In(o.text(), (function(i) {
      return In(fn(i, n.parsing), (function(a) {
        const c = Ea(a, e, r);
        return Pt(o, c, r);
      }));
    }));
  }));
}));
function Ks(n, e, t) {
  return t ? e ? e(n) : n : (n && n.then || (n = Promise.resolve(n)), e ? n.then(e) : n);
}
const Aa = Gs((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const r = (function(o) {
    if (!o || o === "/") return [];
    let i = o;
    const a = [];
    do
      a.push(i), i = tn().dirname(i);
    while (i && i !== "/");
    return a;
  })(Ut(e));
  r.sort(((o, i) => o.length > i.length ? 1 : i.length > o.length ? -1 : 0));
  let s = !1;
  return (function(o, i, a) {
    if (typeof o[es] == "function") {
      let m = function(v) {
        try {
          for (; !(c = h.next()).done; ) if ((v = i(c.value)) && v.then) {
            if (!ts(v)) return void v.then(m, u || (u = Fe.bind(null, l = new bt(), 2)));
            v = v.v;
          }
          l ? Fe(l, 1, v) : l = v;
        } catch (b) {
          Fe(l || (l = new bt()), 2, b);
        }
      };
      var c, l, u, h = o[es]();
      if (m(), h.return) {
        var d = function(v) {
          try {
            c.done || h.return();
          } catch {
          }
          return v;
        };
        if (l && l.then) return l.then(d, (function(v) {
          throw d(v);
        }));
        d();
      }
      return l;
    }
    if (!("length" in o)) throw new TypeError("Object is not iterable");
    for (var g = [], _ = 0; _ < o.length; _++) g.push(o[_]);
    return (function(m, v, b) {
      var y, w, x = -1;
      return (function $(k) {
        try {
          for (; ++x < m.length && (!b || !b()); ) if ((k = v(x)) && k.then) {
            if (!ts(k)) return void k.then($, w || (w = Fe.bind(null, y = new bt(), 2)));
            k = k.v;
          }
          y ? Fe(y, 1, k) : y = k;
        } catch (P) {
          Fe(y || (y = new bt()), 2, P);
        }
      })(), y;
    })(g, (function(m) {
      return i(g[m]);
    }), a);
  })(r, (function(o) {
    return i = function() {
      return (function(c, l) {
        try {
          var u = Ks(ir(n, o), (function(h) {
            if (h.type !== "directory") throw new Error(`Path includes a file: ${e}`);
          }));
        } catch (h) {
          return l(h);
        }
        return u && u.then ? u.then(void 0, l) : u;
      })(0, (function(c) {
        const l = c;
        return (function() {
          if (l.status === 404) return s = !0, Zr(Wn(n, o, { ...t, recursive: !1 }));
          throw c;
        })();
      }));
    }, (a = (function() {
      if (s) return Zr(Wn(n, o, { ...t, recursive: !1 }));
    })()) && a.then ? a.then(i) : i();
    var i, a;
  }), (function() {
    return !1;
  }));
}));
function Gs(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
}
function Na() {
}
function Zr(n, e) {
  return n && n.then ? n.then(Na) : Promise.resolve();
}
const es = typeof Symbol < "u" ? Symbol.iterator || (Symbol.iterator = /* @__PURE__ */ Symbol("Symbol.iterator")) : "@@iterator";
function Fe(n, e, t) {
  if (!n.s) {
    if (t instanceof bt) {
      if (!t.s) return void (t.o = Fe.bind(null, n, e));
      1 & e && (e = t.s), t = t.v;
    }
    if (t && t.then) return void t.then(Fe.bind(null, n, e), Fe.bind(null, n, 2));
    n.s = e, n.v = t;
    const r = n.o;
    r && r(n);
  }
}
const bt = (function() {
  function n() {
  }
  return n.prototype.then = function(e, t) {
    const r = new n(), s = this.s;
    if (s) {
      const o = 1 & s ? e : t;
      if (o) {
        try {
          Fe(r, 1, o(this.v));
        } catch (i) {
          Fe(r, 2, i);
        }
        return r;
      }
      return this;
    }
    return this.o = function(o) {
      try {
        const i = o.v;
        1 & o.s ? Fe(r, 1, e ? e(i) : i) : t ? Fe(r, 1, t(i)) : Fe(r, 2, i);
      } catch (i) {
        Fe(r, 2, i);
      }
    }, r;
  }, n;
})();
function ts(n) {
  return n instanceof bt && 1 & n.s;
}
const Wn = Gs((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (t.recursive === !0) return Aa(n, e, t);
  const r = $e({ url: ye(n.remoteURL, (s = _e(e), s.endsWith("/") ? s : s + "/")), method: "MKCOL" }, n, t);
  var s;
  return Ks(Se(r, n), (function(o) {
    ke(n, o);
  }));
}));
var Ia = me(388), ns = me.n(Ia);
const Da = /* @__PURE__ */ (function(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
})((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const r = {};
  if (typeof t.range == "object" && typeof t.range.start == "number") {
    let a = `bytes=${t.range.start}-`;
    typeof t.range.end == "number" && (a = `${a}${t.range.end}`), r.Range = a;
  }
  const s = $e({ url: ye(n.remoteURL, _e(e)), method: "GET", headers: r }, n, t);
  return i = function(a) {
    if (ke(n, a), r.Range && a.status !== 206) {
      const c = new Error(`Invalid response code for partial request: ${a.status}`);
      throw c.status = a.status, c;
    }
    return t.callback && setTimeout((() => {
      t.callback(a);
    }), 0), a.body;
  }, (o = Se(s, n)) && o.then || (o = Promise.resolve(o)), i ? o.then(i) : o;
  var o, i;
})), Fa = () => {
}, Ma = /* @__PURE__ */ (function(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
})((function(n, e, t) {
  t.url || (t.url = ye(n.remoteURL, _e(e)));
  const r = $e(t, n, {});
  return o = function(i) {
    return ke(n, i), i;
  }, (s = Se(r, n)) && s.then || (s = Promise.resolve(s)), o ? s.then(o) : s;
  var s, o;
})), Oa = /* @__PURE__ */ (function(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
})((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const r = $e({ url: ye(n.remoteURL, _e(e)), method: "DELETE" }, n, t);
  return o = function(i) {
    ke(n, i);
  }, (s = Se(r, n)) && s.then || (s = Promise.resolve(s)), o ? s.then(o) : s;
  var s, o;
})), La = /* @__PURE__ */ (function(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
})((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return (function(r, s) {
    try {
      var o = (i = ir(n, e, t), a = function() {
        return !0;
      }, c ? a ? a(i) : i : (i && i.then || (i = Promise.resolve(i)), a ? i.then(a) : i));
    } catch (l) {
      return s(l);
    }
    var i, a, c;
    return o && o.then ? o.then(void 0, s) : o;
  })(0, (function(r) {
    if (r.status === 404) return !1;
    throw r;
  }));
}));
function Dn(n, e, t) {
  return t ? e ? e(n) : n : (n && n.then || (n = Promise.resolve(n)), e ? n.then(e) : n);
}
const Ra = /* @__PURE__ */ (function(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
})((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const r = $e({ url: ye(n.remoteURL, _e(e), "/"), method: "PROPFIND", headers: { Accept: "text/plain,application/xml", Depth: t.deep ? "infinity" : "1" } }, n, t);
  return Dn(Se(r, n), (function(s) {
    return ke(n, s), Dn(s.text(), (function(o) {
      if (!o) throw new Error("Failed parsing directory contents: Empty response");
      return Dn(fn(o, n.parsing), (function(i) {
        const a = Ir(e);
        let c = (function(l, u, h) {
          let d = arguments.length > 3 && arguments[3] !== void 0 && arguments[3], g = arguments.length > 4 && arguments[4] !== void 0 && arguments[4];
          const _ = tn().join(u, "/"), { multistatus: { response: m } } = l, v = m.map(((b) => {
            const y = (function(x) {
              try {
                return x.replace(/^https?:\/\/[^\/]+/, "");
              } catch ($) {
                throw new Me($, "Failed normalising HREF");
              }
            })(b.href), { propstat: { prop: w } } = b;
            return or(w, _ === "/" ? decodeURIComponent(Ut(y)) : Ut(tn().relative(decodeURIComponent(_), decodeURIComponent(y))), d);
          }));
          return g ? v : v.filter(((b) => b.basename && (b.type === "file" || b.filename !== h.replace(/\/$/, ""))));
        })(i, Ir(n.remoteBasePath || n.remotePath), a, t.details, t.includeSelf);
        return t.glob && (c = (function(l, u) {
          return l.filter(((h) => Ne(h.filename, u, { matchBase: !0 })));
        })(c, t.glob)), Pt(s, c, t.details);
      }));
    }));
  }));
}));
function ar(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
}
const ja = ar((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const r = $e({ url: ye(n.remoteURL, _e(e)), method: "GET", headers: { Accept: "text/plain" }, transformResponse: [Ua] }, n, t);
  return an(Se(r, n), (function(s) {
    return ke(n, s), an(s.text(), (function(o) {
      return Pt(s, o, t.details);
    }));
  }));
}));
function an(n, e, t) {
  return t ? e ? e(n) : n : (n && n.then || (n = Promise.resolve(n)), e ? n.then(e) : n);
}
const za = ar((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const r = $e({ url: ye(n.remoteURL, _e(e)), method: "GET" }, n, t);
  return an(Se(r, n), (function(s) {
    let o;
    return ke(n, s), (function(i, a) {
      var c = i();
      return c && c.then ? c.then(a) : a();
    })((function() {
      return an(s.arrayBuffer(), (function(i) {
        o = i;
      }));
    }), (function() {
      return Pt(s, o, t.details);
    }));
  }));
})), Va = ar((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const { format: r = "binary" } = t;
  if (r !== "binary" && r !== "text") throw new Me({ info: { code: ft.InvalidOutputFormat } }, `Invalid output format: ${r}`);
  return r === "text" ? ja(n, e, t) : za(n, e, t);
})), Ua = (n) => n;
function Ba(n, e) {
  let t = "";
  e.format && e.indentBy.length > 0 && (t = `
`);
  const r = [];
  if (e.stopNodes && Array.isArray(e.stopNodes)) for (let s = 0; s < e.stopNodes.length; s++) {
    const o = e.stopNodes[s];
    typeof o == "string" ? r.push(new kt(o)) : o instanceof kt && r.push(o);
  }
  return Ys(n, e, t, new sr(), r);
}
function Ys(n, e, t, r, s) {
  let o = "", i = !1;
  if (e.maxNestedTags && r.getDepth() > e.maxNestedTags) throw new Error("Maximum nested tags exceeded");
  if (!Array.isArray(n)) {
    if (n != null) {
      let a = n.toString();
      return a = qn(a, e), a;
    }
    return "";
  }
  for (let a = 0; a < n.length; a++) {
    const c = n[a], l = Qs(c);
    if (l === void 0) continue;
    const u = Ha(c[":@"], e);
    r.push(l, u);
    const h = qa(r, s);
    if (l === e.textNodeName) {
      let m = c[l];
      h || (m = e.tagValueProcessor(l, m), m = qn(m, e)), i && (o += t), o += m, i = !1, r.pop();
      continue;
    }
    if (l === e.cdataPropName) {
      i && (o += t);
      const m = c[l][0][e.textNodeName];
      o += `<![CDATA[${String(m).replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`, i = !1, r.pop();
      continue;
    }
    if (l === e.commentPropName) {
      const m = c[l][0][e.textNodeName];
      o += t + `<!--${String(m).replace(/--/g, "- -").replace(/-$/, "- ")}-->`, i = !0, r.pop();
      continue;
    }
    if (l[0] === "?") {
      const m = rs(c[":@"], e, h), v = l === "?xml" ? "" : t;
      let b = c[l][0][e.textNodeName];
      b = b.length !== 0 ? " " + b : "", o += v + `<${l}${b}${m}?>`, i = !0, r.pop();
      continue;
    }
    let d = t;
    d !== "" && (d += e.indentBy);
    const g = t + `<${l}${rs(c[":@"], e, h)}`;
    let _;
    _ = h ? Xs(c[l], e) : Ys(c[l], e, d, r, s), e.unpairedTags.indexOf(l) !== -1 ? e.suppressUnpairedNode ? o += g + ">" : o += g + "/>" : _ && _.length !== 0 || !e.suppressEmptyNode ? _ && _.endsWith(">") ? o += g + `>${_}${t}</${l}>` : (o += g + ">", _ && t !== "" && (_.includes("/>") || _.includes("</")) ? o += t + e.indentBy + _ + t : o += _, o += `</${l}>`) : o += g + "/>", i = !0, r.pop();
  }
  return o;
}
function Ha(n, e) {
  if (!n || e.ignoreAttributes) return null;
  const t = {};
  let r = !1;
  for (let s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s.startsWith(e.attributeNamePrefix) ? s.substr(e.attributeNamePrefix.length) : s] = n[s], r = !0);
  return r ? t : null;
}
function Xs(n, e) {
  if (!Array.isArray(n)) return n != null ? n.toString() : "";
  let t = "";
  for (let r = 0; r < n.length; r++) {
    const s = n[r], o = Qs(s);
    if (o === e.textNodeName) t += s[o];
    else if (o === e.cdataPropName) t += s[o][0][e.textNodeName];
    else if (o === e.commentPropName) t += s[o][0][e.textNodeName];
    else {
      if (o && o[0] === "?") continue;
      if (o) {
        const i = Wa(s[":@"], e), a = Xs(s[o], e);
        a && a.length !== 0 ? t += `<${o}${i}>${a}</${o}>` : t += `<${o}${i}/>`;
      }
    }
  }
  return t;
}
function Wa(n, e) {
  let t = "";
  if (n && !e.ignoreAttributes) for (let r in n) {
    if (!Object.prototype.hasOwnProperty.call(n, r)) continue;
    let s = n[r];
    s === !0 && e.suppressBooleanAttributes ? t += ` ${r.substr(e.attributeNamePrefix.length)}` : t += ` ${r.substr(e.attributeNamePrefix.length)}="${s}"`;
  }
  return t;
}
function Qs(n) {
  const e = Object.keys(n);
  for (let t = 0; t < e.length; t++) {
    const r = e[t];
    if (Object.prototype.hasOwnProperty.call(n, r) && r !== ":@") return r;
  }
}
function rs(n, e, t) {
  let r = "";
  if (n && !e.ignoreAttributes) for (let s in n) {
    if (!Object.prototype.hasOwnProperty.call(n, s)) continue;
    let o;
    t ? o = n[s] : (o = e.attributeValueProcessor(s, n[s]), o = qn(o, e)), o === !0 && e.suppressBooleanAttributes ? r += ` ${s.substr(e.attributeNamePrefix.length)}` : r += ` ${s.substr(e.attributeNamePrefix.length)}="${o}"`;
  }
  return r;
}
function qa(n, e) {
  if (!e || e.length === 0) return !1;
  for (let t = 0; t < e.length; t++) if (n.matches(e[t])) return !0;
  return !1;
}
function qn(n, e) {
  if (n && n.length > 0 && e.processEntities) for (let t = 0; t < e.entities.length; t++) {
    const r = e.entities[t];
    n = n.replace(r.regex, r.val);
  }
  return n;
}
const Ka = { attributeNamePrefix: "@_", attributesGroupName: !1, textNodeName: "#text", ignoreAttributes: !0, cdataPropName: !1, format: !1, indentBy: "  ", suppressEmptyNode: !1, suppressUnpairedNode: !0, suppressBooleanAttributes: !0, tagValueProcessor: function(n, e) {
  return e;
}, attributeValueProcessor: function(n, e) {
  return e;
}, preserveOrder: !1, commentPropName: !1, unpairedTags: [], entities: [{ regex: new RegExp("&", "g"), val: "&amp;" }, { regex: new RegExp(">", "g"), val: "&gt;" }, { regex: new RegExp("<", "g"), val: "&lt;" }, { regex: new RegExp("'", "g"), val: "&apos;" }, { regex: new RegExp('"', "g"), val: "&quot;" }], processEntities: !0, stopNodes: [], oneListGroup: !1, maxNestedTags: 100, jPath: !0 };
function Ge(n) {
  if (this.options = Object.assign({}, Ka, n), this.options.stopNodes && Array.isArray(this.options.stopNodes) && (this.options.stopNodes = this.options.stopNodes.map(((t) => typeof t == "string" && t.startsWith("*.") ? ".." + t.substring(2) : t))), this.stopNodeExpressions = [], this.options.stopNodes && Array.isArray(this.options.stopNodes)) for (let t = 0; t < this.options.stopNodes.length; t++) {
    const r = this.options.stopNodes[t];
    typeof r == "string" ? this.stopNodeExpressions.push(new kt(r)) : r instanceof kt && this.stopNodeExpressions.push(r);
  }
  var e;
  this.options.ignoreAttributes === !0 || this.options.attributesGroupName ? this.isAttribute = function() {
    return !1;
  } : (this.ignoreAttributesFn = typeof (e = this.options.ignoreAttributes) == "function" ? e : Array.isArray(e) ? (t) => {
    for (const r of e)
      if (typeof r == "string" && t === r || r instanceof RegExp && r.test(t)) return !0;
  } : () => !1, this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = Xa), this.processTextOrObjNode = Ga, this.options.format ? (this.indentate = Ya, this.tagEndChar = `>
`, this.newLine = `
`) : (this.indentate = function() {
    return "";
  }, this.tagEndChar = ">", this.newLine = "");
}
function Ga(n, e, t, r) {
  const s = this.extractAttributes(n);
  if (r.push(e, s), this.checkStopNode(r)) {
    const i = this.buildRawContent(n), a = this.buildAttributesForStopNode(n);
    return r.pop(), this.buildObjectNode(i, e, a, t);
  }
  const o = this.j2x(n, t + 1, r);
  return r.pop(), n[this.options.textNodeName] !== void 0 && Object.keys(n).length === 1 ? this.buildTextValNode(n[this.options.textNodeName], e, o.attrStr, t, r) : this.buildObjectNode(o.val, e, o.attrStr, t);
}
function Ya(n) {
  return this.options.indentBy.repeat(n);
}
function Xa(n) {
  return !(!n.startsWith(this.options.attributeNamePrefix) || n === this.options.textNodeName) && n.substr(this.attrPrefixLen);
}
Ge.prototype.build = function(n) {
  if (this.options.preserveOrder) return Ba(n, this.options);
  {
    Array.isArray(n) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (n = { [this.options.arrayNodeName]: n });
    const e = new sr();
    return this.j2x(n, 0, e).val;
  }
}, Ge.prototype.j2x = function(n, e, t) {
  let r = "", s = "";
  if (this.options.maxNestedTags && t.getDepth() >= this.options.maxNestedTags) throw new Error("Maximum nested tags exceeded");
  const o = this.options.jPath ? t.toString() : t, i = this.checkStopNode(t);
  for (let a in n) if (Object.prototype.hasOwnProperty.call(n, a)) if (n[a] === void 0) this.isAttribute(a) && (s += "");
  else if (n[a] === null) this.isAttribute(a) || a === this.options.cdataPropName ? s += "" : a[0] === "?" ? s += this.indentate(e) + "<" + a + "?" + this.tagEndChar : s += this.indentate(e) + "<" + a + "/" + this.tagEndChar;
  else if (n[a] instanceof Date) s += this.buildTextValNode(n[a], a, "", e, t);
  else if (typeof n[a] != "object") {
    const c = this.isAttribute(a);
    if (c && !this.ignoreAttributesFn(c, o)) r += this.buildAttrPairStr(c, "" + n[a], i);
    else if (!c) if (a === this.options.textNodeName) {
      let l = this.options.tagValueProcessor(a, "" + n[a]);
      s += this.replaceEntitiesValue(l);
    } else {
      t.push(a);
      const l = this.checkStopNode(t);
      if (t.pop(), l) {
        const u = "" + n[a];
        s += u === "" ? this.indentate(e) + "<" + a + this.closeTag(a) + this.tagEndChar : this.indentate(e) + "<" + a + ">" + u + "</" + a + this.tagEndChar;
      } else s += this.buildTextValNode(n[a], a, "", e, t);
    }
  } else if (Array.isArray(n[a])) {
    const c = n[a].length;
    let l = "", u = "";
    for (let h = 0; h < c; h++) {
      const d = n[a][h];
      if (d !== void 0) if (d === null) a[0] === "?" ? s += this.indentate(e) + "<" + a + "?" + this.tagEndChar : s += this.indentate(e) + "<" + a + "/" + this.tagEndChar;
      else if (typeof d == "object") if (this.options.oneListGroup) {
        t.push(a);
        const g = this.j2x(d, e + 1, t);
        t.pop(), l += g.val, this.options.attributesGroupName && d.hasOwnProperty(this.options.attributesGroupName) && (u += g.attrStr);
      } else l += this.processTextOrObjNode(d, a, e, t);
      else if (this.options.oneListGroup) {
        let g = this.options.tagValueProcessor(a, d);
        g = this.replaceEntitiesValue(g), l += g;
      } else {
        t.push(a);
        const g = this.checkStopNode(t);
        if (t.pop(), g) {
          const _ = "" + d;
          l += _ === "" ? this.indentate(e) + "<" + a + this.closeTag(a) + this.tagEndChar : this.indentate(e) + "<" + a + ">" + _ + "</" + a + this.tagEndChar;
        } else l += this.buildTextValNode(d, a, "", e, t);
      }
    }
    this.options.oneListGroup && (l = this.buildObjectNode(l, a, u, e)), s += l;
  } else if (this.options.attributesGroupName && a === this.options.attributesGroupName) {
    const c = Object.keys(n[a]), l = c.length;
    for (let u = 0; u < l; u++) r += this.buildAttrPairStr(c[u], "" + n[a][c[u]], i);
  } else s += this.processTextOrObjNode(n[a], a, e, t);
  return { attrStr: r, val: s };
}, Ge.prototype.buildAttrPairStr = function(n, e, t) {
  return t || (e = this.options.attributeValueProcessor(n, "" + e), e = this.replaceEntitiesValue(e)), this.options.suppressBooleanAttributes && e === "true" ? " " + n : " " + n + '="' + e + '"';
}, Ge.prototype.extractAttributes = function(n) {
  if (!n || typeof n != "object") return null;
  const e = {};
  let t = !1;
  if (this.options.attributesGroupName && n[this.options.attributesGroupName]) {
    const r = n[this.options.attributesGroupName];
    for (let s in r) Object.prototype.hasOwnProperty.call(r, s) && (e[s.startsWith(this.options.attributeNamePrefix) ? s.substring(this.options.attributeNamePrefix.length) : s] = r[s], t = !0);
  } else for (let r in n) {
    if (!Object.prototype.hasOwnProperty.call(n, r)) continue;
    const s = this.isAttribute(r);
    s && (e[s] = n[r], t = !0);
  }
  return t ? e : null;
}, Ge.prototype.buildRawContent = function(n) {
  if (typeof n == "string") return n;
  if (typeof n != "object" || n === null) return String(n);
  if (n[this.options.textNodeName] !== void 0) return n[this.options.textNodeName];
  let e = "";
  for (let t in n) {
    if (!Object.prototype.hasOwnProperty.call(n, t) || this.isAttribute(t) || this.options.attributesGroupName && t === this.options.attributesGroupName) continue;
    const r = n[t];
    if (t === this.options.textNodeName) e += r;
    else if (Array.isArray(r)) {
      for (let s of r) if (typeof s == "string" || typeof s == "number") e += `<${t}>${s}</${t}>`;
      else if (typeof s == "object" && s !== null) {
        const o = this.buildRawContent(s), i = this.buildAttributesForStopNode(s);
        e += o === "" ? `<${t}${i}/>` : `<${t}${i}>${o}</${t}>`;
      }
    } else if (typeof r == "object" && r !== null) {
      const s = this.buildRawContent(r), o = this.buildAttributesForStopNode(r);
      e += s === "" ? `<${t}${o}/>` : `<${t}${o}>${s}</${t}>`;
    } else e += `<${t}>${r}</${t}>`;
  }
  return e;
}, Ge.prototype.buildAttributesForStopNode = function(n) {
  if (!n || typeof n != "object") return "";
  let e = "";
  if (this.options.attributesGroupName && n[this.options.attributesGroupName]) {
    const t = n[this.options.attributesGroupName];
    for (let r in t) {
      if (!Object.prototype.hasOwnProperty.call(t, r)) continue;
      const s = r.startsWith(this.options.attributeNamePrefix) ? r.substring(this.options.attributeNamePrefix.length) : r, o = t[r];
      o === !0 && this.options.suppressBooleanAttributes ? e += " " + s : e += " " + s + '="' + o + '"';
    }
  } else for (let t in n) {
    if (!Object.prototype.hasOwnProperty.call(n, t)) continue;
    const r = this.isAttribute(t);
    if (r) {
      const s = n[t];
      s === !0 && this.options.suppressBooleanAttributes ? e += " " + r : e += " " + r + '="' + s + '"';
    }
  }
  return e;
}, Ge.prototype.buildObjectNode = function(n, e, t, r) {
  if (n === "") return e[0] === "?" ? this.indentate(r) + "<" + e + t + "?" + this.tagEndChar : this.indentate(r) + "<" + e + t + this.closeTag(e) + this.tagEndChar;
  {
    let s = "</" + e + this.tagEndChar, o = "";
    return e[0] === "?" && (o = "?", s = ""), !t && t !== "" || n.indexOf("<") !== -1 ? this.options.commentPropName !== !1 && e === this.options.commentPropName && o.length === 0 ? this.indentate(r) + `<!--${n}-->` + this.newLine : this.indentate(r) + "<" + e + t + o + this.tagEndChar + n + this.indentate(r) + s : this.indentate(r) + "<" + e + t + o + ">" + n + s;
  }
}, Ge.prototype.closeTag = function(n) {
  let e = "";
  return this.options.unpairedTags.indexOf(n) !== -1 ? this.options.suppressUnpairedNode || (e = "/") : e = this.options.suppressEmptyNode ? "/" : `></${n}`, e;
}, Ge.prototype.checkStopNode = function(n) {
  if (!this.stopNodeExpressions || this.stopNodeExpressions.length === 0) return !1;
  for (let e = 0; e < this.stopNodeExpressions.length; e++) if (n.matches(this.stopNodeExpressions[e])) return !0;
  return !1;
}, Ge.prototype.buildTextValNode = function(n, e, t, r, s) {
  if (this.options.cdataPropName !== !1 && e === this.options.cdataPropName) {
    const o = String(n).replace(/\]\]>/g, "]]]]><![CDATA[>");
    return this.indentate(r) + `<![CDATA[${o}]]>` + this.newLine;
  }
  if (this.options.commentPropName !== !1 && e === this.options.commentPropName) {
    const o = String(n).replace(/--/g, "- -").replace(/-$/, "- ");
    return this.indentate(r) + `<!--${o}-->` + this.newLine;
  }
  if (e[0] === "?") return this.indentate(r) + "<" + e + t + "?" + this.tagEndChar;
  {
    let o = this.options.tagValueProcessor(e, n);
    return o = this.replaceEntitiesValue(o), o === "" ? this.indentate(r) + "<" + e + t + this.closeTag(e) + this.tagEndChar : this.indentate(r) + "<" + e + t + ">" + o + "</" + e + this.tagEndChar;
  }
}, Ge.prototype.replaceEntitiesValue = function(n) {
  if (n && n.length > 0 && this.options.processEntities) for (let e = 0; e < this.options.entities.length; e++) {
    const t = this.options.entities[e];
    n = n.replace(t.regex, t.val);
  }
  return n;
};
const Qa = Ge;
function Ja(n) {
  return new Qa({ attributeNamePrefix: "@_", format: !0, ignoreAttributes: !1, suppressEmptyNode: !0 }).build(Js({ lockinfo: { "@_xmlns:d": "DAV:", lockscope: { exclusive: {} }, locktype: { write: {} }, owner: { href: n } } }, "d"));
}
function Js(n, e) {
  const t = { ...n };
  for (const r in t) t.hasOwnProperty(r) && (t[r] && typeof t[r] == "object" && r.indexOf(":") === -1 ? (t[`${e}:${r}`] = Js(t[r], e), delete t[r]) : /^@_/.test(r) === !1 && (t[`${e}:${r}`] = t[r], delete t[r]));
  return t;
}
function Kn(n, e, t) {
  return t ? e ? e(n) : n : (n && n.then || (n = Promise.resolve(n)), e ? n.then(e) : n);
}
function Zs(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
}
const Za = Zs((function(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
  const s = $e({ url: ye(n.remoteURL, _e(e)), method: "UNLOCK", headers: { "Lock-Token": t } }, n, r);
  return Kn(Se(s, n), (function(o) {
    if (ke(n, o), o.status !== 204 && o.status !== 200) throw nr(o);
  }));
})), el = Zs((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const { refreshToken: r, timeout: s = tl } = t, o = { Accept: "text/plain,application/xml", Timeout: s };
  r && (o.If = r);
  const i = $e({ url: ye(n.remoteURL, _e(e)), method: "LOCK", headers: o, data: Ja(n.contactHref) }, n, t);
  return Kn(Se(i, n), (function(a) {
    return ke(n, a), Kn(a.text(), (function(c) {
      const l = (d = c, new Ws({ removeNSPrefix: !0, parseAttributeValue: !0, parseTagValue: !0 }).parse(d)), u = ot().get(l, "prop.lockdiscovery.activelock.locktoken.href"), h = ot().get(l, "prop.lockdiscovery.activelock.timeout");
      var d;
      if (!u) throw nr(a, "No lock token received: ");
      return { token: u, serverTimeout: h };
    }));
  }));
})), tl = "Infinite, Second-4100000000";
function Fn(n, e, t) {
  return t ? e ? e(n) : n : (n && n.then || (n = Promise.resolve(n)), e ? n.then(e) : n);
}
const nl = /* @__PURE__ */ (function(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
})((function(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const t = e.path || "/", r = $e({ url: ye(n.remoteURL, t), method: "PROPFIND", headers: { Accept: "text/plain,application/xml", Depth: "0" } }, n, e);
  return Fn(Se(r, n), (function(s) {
    return ke(n, s), Fn(s.text(), (function(o) {
      return Fn(fn(o, n.parsing), (function(i) {
        const a = (function(c) {
          try {
            const [l] = c.multistatus.response, { propstat: { prop: { "quota-used-bytes": u, "quota-available-bytes": h } } } = l;
            return u !== void 0 && h !== void 0 ? { used: parseInt(String(u), 10), available: Ta(h) } : null;
          } catch {
          }
          return null;
        })(i);
        return Pt(s, a, e.details);
      }));
    }));
  }));
}));
function Mn(n, e, t) {
  return t ? e ? e(n) : n : (n && n.then || (n = Promise.resolve(n)), e ? n.then(e) : n);
}
const rl = /* @__PURE__ */ (function(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
})((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const { details: r = !1 } = t, s = $e({ url: ye(n.remoteURL, _e(e)), method: "SEARCH", headers: { Accept: "text/plain,application/xml", "Content-Type": n.headers["Content-Type"] || "application/xml; charset=utf-8" } }, n, t);
  return Mn(Se(s, n), (function(o) {
    return ke(n, o), Mn(o.text(), (function(i) {
      return Mn(fn(i, n.parsing), (function(a) {
        const c = (function(l, u, h) {
          const d = { truncated: !1, results: [] };
          return d.truncated = l.multistatus.response.some(((g) => (g.status || g.propstat?.status).split(" ", 3)?.[1] === "507" && g.href.replace(/\/$/, "").endsWith(_e(u).replace(/\/$/, "")))), l.multistatus.response.forEach(((g) => {
            if (g.propstat === void 0) return;
            const _ = g.href.split("/").map(decodeURIComponent).join("/");
            d.results.push(or(g.propstat.prop, _, h));
          })), d;
        })(a, e, r);
        return Pt(o, c, r);
      }));
    }));
  }));
})), sl = /* @__PURE__ */ (function(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
})((function(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
  const s = $e({ url: ye(n.remoteURL, _e(e)), method: "MOVE", headers: { Destination: ye(n.remoteURL, _e(t)), Overwrite: r.overwrite === !1 ? "F" : "T" } }, n, r);
  return i = function(a) {
    ke(n, a);
  }, (o = Se(s, n)) && o.then || (o = Promise.resolve(o)), i ? o.then(i) : o;
  var o, i;
}));
var ol = me(172);
function il(n) {
  if (Ts(n)) return n.byteLength;
  if (As(n)) return n.length;
  if (typeof n == "string") return (0, ol.d)(n);
  throw new Me({ info: { code: ft.DataTypeNoLength } }, "Cannot calculate data length: Invalid type");
}
const al = /* @__PURE__ */ (function(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
})((function(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
  const { contentLength: s = !0, overwrite: o = !0 } = r, i = { "Content-Type": "application/octet-stream" };
  s === !1 || (i["Content-Length"] = typeof s == "number" ? `${s}` : `${il(t)}`), o || (i["If-None-Match"] = "*");
  const a = $e({ url: ye(n.remoteURL, _e(e)), method: "PUT", headers: i, data: t }, n, r);
  return l = function(u) {
    try {
      ke(n, u);
    } catch (h) {
      const d = h;
      if (d.status !== 412 || o) throw d;
      return !1;
    }
    return !0;
  }, (c = Se(a, n)) && c.then || (c = Promise.resolve(c)), l ? c.then(l) : c;
  var c, l;
})), eo = /* @__PURE__ */ (function(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
})((function(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const r = $e({ url: ye(n.remoteURL, _e(e)), method: "OPTIONS" }, n, t);
  return o = function(i) {
    try {
      ke(n, i);
    } catch (a) {
      throw a;
    }
    return { compliance: (i.headers.get("DAV") ?? "").split(",").map(((a) => a.trim())), server: i.headers.get("Server") ?? "" };
  }, (s = Se(r, n)) && s.then || (s = Promise.resolve(s)), o ? s.then(o) : s;
  var s, o;
}));
function Lt(n, e, t) {
  return t ? e ? e(n) : n : (n && n.then || (n = Promise.resolve(n)), e ? n.then(e) : n);
}
const ll = lr((function(n, e, t, r, s) {
  let o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
  if (t > r || t < 0) throw new Me({ info: { code: ft.InvalidUpdateRange } }, `Invalid update range ${t} for partial update`);
  const i = { "Content-Type": "application/octet-stream", "Content-Length": "" + (r - t + 1), "Content-Range": `bytes ${t}-${r}/*` }, a = $e({ url: ye(n.remoteURL, _e(e)), method: "PUT", headers: i, data: s }, n, o);
  return Lt(Se(a, n), (function(c) {
    ke(n, c);
  }));
}));
function ss(n, e) {
  var t = n();
  return t && t.then ? t.then(e) : e(t);
}
const ul = lr((function(n, e, t, r, s) {
  let o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
  if (t > r || t < 0) throw new Me({ info: { code: ft.InvalidUpdateRange } }, `Invalid update range ${t} for partial update`);
  const i = { "Content-Type": "application/x-sabredav-partialupdate", "Content-Length": "" + (r - t + 1), "X-Update-Range": `bytes=${t}-${r}` }, a = $e({ url: ye(n.remoteURL, _e(e)), method: "PATCH", headers: i, data: s }, n, o);
  return Lt(Se(a, n), (function(c) {
    ke(n, c);
  }));
}));
function lr(n) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    try {
      return Promise.resolve(n.apply(this, e));
    } catch (r) {
      return Promise.reject(r);
    }
  };
}
const cl = lr((function(n, e, t, r, s) {
  let o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
  return Lt(eo(n, e, o), (function(i) {
    let a = !1;
    return ss((function() {
      if (i.compliance.includes("sabredav-partialupdate")) return Lt(ul(n, e, t, r, s, o), (function(c) {
        return a = !0, c;
      }));
    }), (function(c) {
      let l = !1;
      return a ? c : ss((function() {
        if (i.server.includes("Apache") && i.compliance.includes("<http://apache.org/dav/propset/fs/1>")) return Lt(ll(n, e, t, r, s, o), (function(u) {
          return l = !0, u;
        }));
      }), (function(u) {
        if (l) return u;
        throw new Me({ info: { code: ft.NotSupported } }, "Not supported");
      }));
    }));
  }));
})), dl = "https://github.com/perry-mitchell/webdav-client/blob/master/LOCK_CONTACT.md";
function hl(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const { authType: t = null, remoteBasePath: r, contactHref: s = dl, entityDecoder: o, ha1: i, headers: a = {}, httpAgent: c, httpsAgent: l, password: u, token: h, username: d, withCredentials: g } = e;
  let _ = t;
  _ || (_ = d || u ? Ve.Password : Ve.None);
  const m = { authType: _, remoteBasePath: r, contactHref: s, ha1: i, headers: Object.assign({}, a), httpAgent: c, httpsAgent: l, password: u, parsing: { attributeNamePrefix: e.attributeNamePrefix ?? "@", attributeParsers: [], entityDecoder: o, tagParsers: [qs] }, remotePath: ni(n), remoteURL: n, token: h, username: d, withCredentials: g };
  return Ps(m, d, u, h, i), { copyFile: (v, b, y) => Vi(m, v, b, y), createDirectory: (v, b) => Wn(m, v, b), createReadStream: (v, b) => (function(y, w) {
    let x = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const $ = new (ns()).PassThrough();
    return Da(y, w, x).then(((k) => {
      k.pipe($);
    })).catch(((k) => {
      $.emit("error", k);
    })), $;
  })(m, v, b), createWriteStream: (v, b, y) => (function(w, x) {
    let $ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, k = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Fa;
    const P = new (ns()).PassThrough(), A = {};
    $.overwrite === !1 && (A["If-None-Match"] = "*");
    const M = $e({ url: ye(w.remoteURL, _e(x)), method: "PUT", headers: A, data: P, maxRedirects: 0 }, w, $);
    return Se(M, w).then(((j) => ke(w, j))).then(((j) => {
      setTimeout((() => {
        k(j);
      }), 0);
    })).catch(((j) => {
      P.emit("error", j);
    })), P;
  })(m, v, b, y), customRequest: (v, b) => Ma(m, v, b), deleteFile: (v, b) => Oa(m, v, b), exists: (v, b) => La(m, v, b), getDirectoryContents: (v, b) => Ra(m, v, b), getFileContents: (v, b) => Va(m, v, b), getFileDownloadLink: (v) => (function(b, y) {
    let w = ye(b.remoteURL, _e(y));
    const x = /^https:/i.test(w) ? "https" : "http";
    switch (b.authType) {
      case Ve.None:
        break;
      case Ve.Password: {
        const $ = Fr(b.headers.Authorization.replace(/^Basic /i, "").trim());
        w = w.replace(/^https?:\/\//, `${x}://${$}@`);
        break;
      }
      default:
        throw new Me({ info: { code: ft.LinkUnsupportedAuthType } }, `Unsupported auth type for file link: ${b.authType}`);
    }
    return w;
  })(m, v), getFileUploadLink: (v) => (function(b, y) {
    let w = `${ye(b.remoteURL, _e(y))}?Content-Type=application/octet-stream`;
    const x = /^https:/i.test(w) ? "https" : "http";
    switch (b.authType) {
      case Ve.None:
        break;
      case Ve.Password: {
        const $ = Fr(b.headers.Authorization.replace(/^Basic /i, "").trim());
        w = w.replace(/^https?:\/\//, `${x}://${$}@`);
        break;
      }
      default:
        throw new Me({ info: { code: ft.LinkUnsupportedAuthType } }, `Unsupported auth type for file link: ${b.authType}`);
    }
    return w;
  })(m, v), getHeaders: () => Object.assign({}, m.headers), getQuota: (v) => nl(m, v), lock: (v, b) => el(m, v, b), moveFile: (v, b, y) => sl(m, v, b, y), putFileContents: (v, b, y) => al(m, v, b, y), partialUpdateFileContents: (v, b, y, w, x) => cl(m, v, b, y, w, x), getDAVCompliance: (v) => eo(m, v), search: (v, b) => rl(m, v, b), setHeaders: (v) => {
    m.headers = Object.assign({}, v);
  }, stat: (v, b) => ir(m, v, b), unlock: (v, b, y) => Za(m, v, b, y), registerAttributeParser: (v) => {
    m.parsing.attributeParsers.push(v);
  }, registerTagParser: (v) => {
    m.parsing.tagParsers.push(v);
  } };
}
class Ng extends dn {
  client;
  storagePrefix;
  storages;
  config;
  constructor(e) {
    super(), this.config = e, this.client = hl(e.url, {
      username: e.username,
      password: e.password
    }), this.storagePrefix = e.storagePrefix || "dav", this.storages = [this.storagePrefix];
  }
  getRealPath(e) {
    const { path: t } = this.parsePath(e);
    return t ? `/${t}` : "/";
  }
  toVuefinderPath(e) {
    const t = e.replace(/^\//, "");
    return t ? `${this.storagePrefix}://${t}` : `${this.storagePrefix}://`;
  }
  toDirEntry(e, t) {
    return {
      storage: this.storagePrefix,
      dir: t,
      basename: e.basename,
      extension: e.type === "file" && e.basename.split(".").pop() || "",
      path: this.toVuefinderPath(e.filename),
      type: e.type === "directory" ? "dir" : "file",
      file_size: e.size,
      last_modified: new Date(e.lastmod).getTime(),
      mime_type: e.mime || null,
      visibility: "public"
    };
  }
  async list(e) {
    const t = this.getRealPath(e?.path), r = await this.client.getDirectoryContents(t), s = e?.path || `${this.storagePrefix}://`, o = r.map((i) => this.toDirEntry(i, s));
    return o.sort((i, a) => i.type === "dir" && a.type === "file" ? -1 : i.type === "file" && a.type === "dir" ? 1 : i.basename.localeCompare(a.basename, void 0, {
      numeric: !0,
      sensitivity: "base"
    })), {
      storages: this.storages,
      dirname: s,
      files: o,
      read_only: !1
    };
  }
  async createFolder(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.getRealPath(e.path), r = t.endsWith("/") ? `${t}${e.name}` : `${t}/${e.name}`;
    return await this.client.createDirectory(r), await this.list({ path: e.path });
  }
  async delete(e) {
    this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    for (const r of e.items) {
      const s = this.getRealPath(r.path);
      await this.client.deleteFile(s);
    }
    return {
      ...await this.list({ path: e.path }),
      deleted: e.items
    };
  }
  async rename(e) {
    this.validateParam(e.item, "item"), this.validateParam(e.name, "name");
    const t = this.getRealPath(e.item), r = this.getRealPath(e.path), s = r.endsWith("/") ? `${r}${e.name}` : `${r}/${e.name}`;
    return await this.client.moveFile(t, s), await this.list({ path: e.path });
  }
  async getContent(e) {
    this.validateParam(e.path, "path");
    const t = this.getRealPath(e.path);
    return { content: await this.client.getFileContents(t, { format: "text" }) };
  }
  async save(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.content, "content");
    const t = this.getRealPath(e.path);
    return await this.client.putFileContents(t, e.content), e.path;
  }
  getDownloadUrl(e) {
    this.validateParam(e.path, "path");
    const t = this.getRealPath(e.path);
    return this.client.getFileDownloadLink(t);
  }
  getPreviewUrl(e) {
    return this.getDownloadUrl(e);
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.getRealPath(e.destination);
    for (const r of e.sources) {
      const s = this.getRealPath(r), o = s.split("/").pop() || "", i = t.endsWith("/") ? `${t}${o}` : `${t}/${o}`;
      await this.client.copyFile(s, i);
    }
    return await this.list({ path: e.path || e.destination });
  }
  async move(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.getRealPath(e.destination);
    for (const r of e.sources) {
      const s = this.getRealPath(r), o = s.split("/").pop() || "", i = t.endsWith("/") ? `${t}${o}` : `${t}/${o}`;
      await this.client.moveFile(s, i);
    }
    return await this.list({ path: e.path || e.destination });
  }
  async createFile(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.getRealPath(e.path), r = t.endsWith("/") ? `${t}${e.name}` : `${t}/${e.name}`;
    return await this.client.putFileContents(r, ""), await this.list({ path: e.path });
  }
  async search(e) {
    try {
      const t = this.getRealPath(e.path), r = await this.client.getDirectoryContents(t, { deep: e.deep }), s = e.path || `${this.storagePrefix}://`;
      let o = r.map((a) => {
        const c = a.filename.substring(0, a.filename.lastIndexOf("/")), l = c ? `${this.storagePrefix}://${c.replace(/^\//, "")}` : s;
        return this.toDirEntry(a, l);
      });
      const i = (e.filter || "").toLowerCase();
      return i && (o = o.filter((a) => a.basename.toLowerCase().includes(i))), e.size && e.size !== "all" && (o = o.filter((a) => {
        if (a.type === "dir") return !0;
        const c = a.file_size || 0;
        return e.size === "small" ? c < 1024 * 1024 : e.size === "medium" ? c >= 1024 * 1024 && c < 50 * 1024 * 1024 : e.size === "large" ? c >= 50 * 1024 * 1024 : !0;
      })), o;
    } catch (t) {
      return console.error("WebDAV Search Error:", t), [];
    }
  }
  configureUploader(e, t) {
    e.setOptions({
      restrictions: {
        ...e.opts.restrictions,
        maxFileSize: 500 * 1024 * 1024
      }
    }), e.on("complete", (r) => {
      r && Array.isArray(r.successful) && (r.successful = r.successful.map((s) => typeof s == "string" ? s : s.id));
    }), e.addUploader(async (r) => {
      const s = t.getTargetPath(), o = this.getRealPath(s), i = r.map((l) => e.getFile(l));
      e.emit("upload-start", i);
      const a = this.client.getHeaders(), c = r.map((l) => new Promise((u) => {
        const h = e.getFile(l);
        e.emit("upload-started", h);
        const g = (o.endsWith("/") ? `${o}${h.name}` : `${o}/${h.name}`).split("/").map(encodeURIComponent).join("/"), _ = this.config.url.replace(/\/+$/, "") + g, m = new XMLHttpRequest();
        m.open("PUT", _, !0);
        for (const [v, b] of Object.entries(a))
          m.setRequestHeader(v, b);
        m.setRequestHeader("Content-Type", "application/octet-stream"), m.upload.onprogress = (v) => {
          v.lengthComputable && e.emit("upload-progress", h, {
            uploader: "WebDAVDriver",
            bytesUploaded: v.loaded,
            bytesTotal: v.total
          });
        }, m.onload = () => {
          m.status >= 200 && m.status < 300 ? e.emit("upload-success", h, { status: m.status, body: m.responseText }) : e.emit("upload-error", h, new Error(`Upload failed with status ${m.status}: ${m.statusText}`)), u();
        }, m.onerror = () => {
          e.emit("upload-error", h, new Error("Network error during upload")), u();
        }, m.send(h.data);
      }));
      await Promise.all(c);
    });
  }
  async archive(e) {
    throw new Error("Not implemented");
  }
  async unarchive(e) {
    throw new Error("Not implemented");
  }
}
class Ig extends dn {
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
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "indexeddb", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.version = e.version || 1, this.driver = new Qo({
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
      const r = indexedDB.open(this.dbName, this.version);
      r.onerror = () => t(r.error), r.onsuccess = () => {
        this.db = r.result, e(this.db);
      }, r.onupgradeneeded = (s) => {
        const o = s.target.result;
        if (!o.objectStoreNames.contains("files")) {
          const i = o.createObjectStore("files", { keyPath: "path" });
          i.createIndex("storage", "storage", { unique: !1 }), i.createIndex("dir", "dir", { unique: !1 });
        }
        o.objectStoreNames.contains("content") || o.createObjectStore("content", { keyPath: "path" });
      };
    }), this.dbPromise);
  }
  async getDB() {
    return this.db ? this.db : this.initDB();
  }
  requestToPromise(e) {
    return new Promise((t, r) => {
      e.onsuccess = () => t(e.result), e.onerror = () => r(e.error);
    });
  }
  waitTransaction(e) {
    return new Promise((t, r) => {
      e.oncomplete = () => t(), e.onerror = () => r(e.error), e.onabort = () => r(e.error);
    });
  }
  async loadSnapshotFromDB() {
    const t = (await this.getDB()).transaction(["files", "content"], "readonly"), r = t.objectStore("files"), s = t.objectStore("content"), [o, i] = await Promise.all([
      this.requestToPromise(r.getAll()),
      this.requestToPromise(s.getAll())
    ]);
    await this.waitTransaction(t), this.entries.length = 0, this.entries.push(...o.filter((a) => this.isManagedStorage(a.storage))), this.contentStore.clear();
    for (const a of i)
      this.isManagedPath(a?.path) && this.contentStore.set(a.path, a.content);
  }
  async persistSnapshot() {
    if (this.readOnly) return;
    const t = (await this.getDB()).transaction(["files", "content"], "readwrite"), r = t.objectStore("files"), s = t.objectStore("content"), o = this.requestToPromise(
      r.getAll()
    ), i = this.requestToPromise(
      s.getAll()
    ), [a, c] = await Promise.all([
      o,
      i
    ]);
    r.clear(), s.clear();
    for (const l of a)
      this.isManagedStorage(l.storage) || r.put(l);
    for (const l of c)
      this.isManagedPath(l.path) || s.put(l);
    for (const l of this.entries)
      this.isManagedStorage(l.storage) && r.put(l);
    for (const [l, u] of this.contentStore.entries())
      this.isManagedPath(l) && s.put({ path: l, content: u });
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
const os = {
  list: (n) => ["adapter", "list", n],
  search: (n, e, t, r) => ["adapter", "search", n, e, t, r],
  delete: (n) => ["adapter", "delete", n],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class fl {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Ao({
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
    const t = os.list(e);
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
    const t = os.search(e.path, e.filter, e.deep, e.size);
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
function pl(n) {
  const e = X(n.state);
  return {
    current: V(() => e.value.theme || "silver"),
    set: (s) => {
      n.set("theme", s);
    }
  };
}
const ml = (n, e) => {
  const t = Ro(n.id ?? "vf"), r = Eo(), s = e.i18n, o = n.locale ?? e.locale, i = Go(n.id ?? "vf", n.config ?? {}), a = Xo();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new fl(n.driver);
  return ln({
    // app version
    version: Bo,
    // config store
    config: i,
    // Theme
    theme: (() => {
      const l = pl(i);
      return {
        current: l.current,
        set: l.set
      };
    })(),
    // files store
    fs: a,
    // root element
    root: null,
    // app id
    debug: n.debug ?? !1,
    // Event Bus
    emitter: r,
    // storage
    storage: t,
    // localization object
    i18n: Vo(
      t,
      o,
      r,
      s,
      i
    ),
    // modal state
    modal: Wo(i),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: bo(c),
    // active features
    features: bs(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: V(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: V(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: i.get("metricUnits") ? xs : Jn,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // expose custom uploader if provided
    customUploader: n.customUploader
  });
}, vl = ["data-theme"], gl = { class: "vuefinder__modal-layout__container" }, _l = { class: "vuefinder__modal-layout__content" }, yl = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, wl = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, bl = { class: "vuefinder__modal-drag-message" }, Ye = /* @__PURE__ */ te({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(n) {
    const e = L(null), t = ee();
    t.config;
    const r = n;
    he(() => {
      const o = document.querySelector(".v-f-modal input");
      o && o.focus(), nt(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const i = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: i,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const s = (o) => {
      o.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (o.preventDefault(), o.stopPropagation());
    };
    return (o, i) => (S(), C("div", {
      "data-theme": f(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: i[1] || (i[1] = Wt((a) => f(t).modal.close(), ["esc"]))
    }, [
      i[2] || (i[2] = p("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      p("div", gl, [
        p("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: s,
          onMousedown: i[0] || (i[0] = ae((a) => f(t).modal.close(), ["self"]))
        }, [
          p("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            p("div", _l, [
              Oe(o.$slots, "default")
            ]),
            o.$slots.buttons ? (S(), C("div", yl, [
              Oe(o.$slots, "buttons")
            ])) : R("", !0)
          ], 512)
        ], 32)
      ]),
      r.showDragOverlay ? (S(), C("div", wl, [
        p("div", bl, E(r.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : R("", !0)
    ], 40, vl));
  }
}), xl = { class: "vuefinder__modal-header" }, Sl = { class: "vuefinder__modal-header__icon-container" }, $l = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Ze = /* @__PURE__ */ te({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (S(), C("div", xl, [
      p("div", Sl, [
        (S(), U(ps(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      p("div", $l, E(n.title), 1)
    ]));
  }
}), kl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Cl(n, e) {
  return S(), C("svg", kl, [...e[0] || (e[0] = [
    p("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const to = { render: Cl }, Pl = { class: "vuefinder__delete-modal__content" }, El = { class: "vuefinder__delete-modal__form" }, Tl = { class: "vuefinder__delete-modal__description" }, Al = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Nl = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Il = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dl = { class: "vuefinder__delete-modal__file-name" }, Fl = { class: "vuefinder__delete-modal__confirmation" }, Ml = { class: "vuefinder__delete-modal__confirmation-label" }, Ol = { class: "vuefinder__delete-modal__confirmation-text" }, Ll = ["disabled"], pn = /* @__PURE__ */ te({
  __name: "ModalDelete",
  setup(n) {
    const e = ee(), t = Be(e), { t: r } = e.i18n, s = e.fs, o = X(s.path), i = L(e.modal.data.items), a = L(!1), c = () => {
      i.value.length && a.value && e.adapter.delete({
        path: o.value.path,
        items: i.value.map(({ path: l, type: u }) => ({
          path: l,
          type: u
        }))
      }).then((l) => {
        t.success(r("Files deleted.")), e.fs.setFiles(l.files), e.modal.close();
      }).catch((l) => {
        t.error(Ue(l, r("Failed to delete files")));
      });
    };
    return (l, u) => (S(), U(Ye, null, {
      buttons: oe(() => [
        p("div", Fl, [
          p("label", Ml, [
            ve(p("input", {
              "onUpdate:modelValue": u[0] || (u[0] = (h) => a.value = h),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [un, a.value]
            ]),
            p("span", Ol, E(f(r)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !a.value,
          onClick: c
        }, E(f(r)("Yes, Delete!")), 9, Ll),
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[1] || (u[1] = (h) => f(e).modal.close())
        }, E(f(r)("Cancel")), 1)
      ]),
      default: oe(() => [
        p("div", null, [
          B(Ze, {
            icon: f(to),
            title: f(r)("Delete files")
          }, null, 8, ["icon", "title"]),
          p("div", Pl, [
            p("div", El, [
              p("p", Tl, E(f(r)("Are you sure you want to delete these files?")), 1),
              p("div", Al, [
                (S(!0), C(de, null, ge(i.value, (h) => (S(), C("p", {
                  key: h.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  h.type === "dir" ? (S(), C("svg", Nl, [...u[2] || (u[2] = [
                    p("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (S(), C("svg", Il, [...u[3] || (u[3] = [
                    p("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  p("span", Dl, E(h.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function jl(n, e) {
  return S(), C("svg", Rl, [...e[0] || (e[0] = [
    p("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const no = { render: jl }, zl = { class: "vuefinder__rename-modal__content" }, Vl = { class: "vuefinder__rename-modal__item" }, Ul = { class: "vuefinder__rename-modal__item-info" }, Bl = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hl = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wl = { class: "vuefinder__rename-modal__item-name" }, mn = /* @__PURE__ */ te({
  __name: "ModalRename",
  setup(n) {
    const e = ee(), t = Be(e), { t: r } = e.i18n, s = e.fs, o = X(s.path), i = L(e.modal.data.items[0]), a = L(i.value.basename), c = () => {
      a.value != i.value.basename && e.adapter.rename({
        path: o.value.path,
        item: i.value.path,
        name: a.value
      }).then((l) => {
        t.success(r("%s is renamed.", a.value)), e.fs.setFiles(l.files), e.modal.close();
      }).catch((l) => {
        t.error(Ue(l, r("Failed to rename")));
      });
    };
    return (l, u) => (S(), U(Ye, null, {
      buttons: oe(() => [
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, E(f(r)("Rename")), 1),
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[1] || (u[1] = (h) => f(e).modal.close())
        }, E(f(r)("Cancel")), 1)
      ]),
      default: oe(() => [
        p("div", null, [
          B(Ze, {
            icon: f(no),
            title: f(r)("Rename")
          }, null, 8, ["icon", "title"]),
          p("div", zl, [
            p("div", Vl, [
              p("p", Ul, [
                i.value.type === "dir" ? (S(), C("svg", Bl, [...u[2] || (u[2] = [
                  p("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (S(), C("svg", Hl, [...u[3] || (u[3] = [
                  p("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                p("span", Wl, E(i.value.basename), 1)
              ]),
              ve(p("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (h) => a.value = h),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: Wt(c, ["enter"])
              }, null, 544), [
                [qt, a.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function et() {
  const n = ee(), e = V(() => n.features);
  return {
    enabled: (r) => e.value[r] ?? !1
  };
}
const ql = { class: "vuefinder__text-preview" }, Kl = { class: "vuefinder__text-preview__header" }, Gl = ["title"], Yl = { class: "vuefinder__text-preview__actions" }, Xl = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Ql = { key: 1 }, Jl = /* @__PURE__ */ te({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, r = L(""), s = L(""), o = L(null), i = L(!1), a = ee(), c = Be(a), { enabled: l } = et(), { t: u } = a.i18n;
    he(async () => {
      try {
        const g = await a.adapter.getContent({ path: a.modal.data.item.path });
        r.value = g.content, t("success");
      } catch (g) {
        Ue(g, "Failed to load text content"), t("success");
      }
    });
    const h = () => {
      i.value = !i.value, s.value = r.value, a.modal.setEditMode(i.value);
    }, d = async () => {
      try {
        const g = a.modal.data.item.path;
        await a.adapter.save({
          path: g,
          content: s.value
        }), r.value = s.value, c.success(u("Updated.")), t("success"), i.value = !i.value;
      } catch (g) {
        c.error(Ue(g, u("Failed to save file")));
      }
    };
    return (g, _) => (S(), C("div", ql, [
      p("div", Kl, [
        p("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: f(a).modal.data.item.path
        }, E(f(a).modal.data.item.basename), 9, Gl),
        p("div", Yl, [
          i.value ? (S(), C("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: d
          }, E(f(u)("Save")), 1)) : R("", !0),
          f(l)("edit") ? (S(), C("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: _[0] || (_[0] = (m) => h())
          }, E(i.value ? f(u)("Cancel") : f(u)("Edit")), 1)) : R("", !0)
        ])
      ]),
      p("div", null, [
        i.value ? (S(), C("div", Ql, [
          ve(p("textarea", {
            ref_key: "editInput",
            ref: o,
            "onUpdate:modelValue": _[1] || (_[1] = (m) => s.value = m),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [qt, s.value]
          ])
        ])) : (S(), C("pre", Xl, E(r.value), 1))
      ])
    ]));
  }
}), ur = async (n, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((r) => {
        e.file(r);
      });
      n(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), r = await new Promise((s) => {
        t.readEntries(s);
      });
      for (const s of r)
        await ur(n, s);
    }
  }
}, xe = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function ro(n) {
  const e = ee(), { t } = e.i18n, r = e.fs, s = X(r.path), o = e.config, i = L({ QUEUE_ENTRY_STATUS: xe }), a = L(null), c = L(null), l = L(null), u = L(null), h = L(null), d = L([]), g = L(""), _ = L(!1), m = L(!1), v = L(null);
  let b;
  const y = (D) => {
    D.preventDefault(), D.stopPropagation(), m.value = !0;
  }, w = (D) => {
    D.preventDefault(), D.stopPropagation(), m.value = !0;
  }, x = (D) => {
    D.preventDefault(), D.stopPropagation(), (!D.relatedTarget || D.relatedTarget === document.body) && (m.value = !1);
  }, $ = (D) => {
    D.preventDefault(), D.stopPropagation(), m.value = !1;
    const I = /^[/\\](.+)/, N = D.dataTransfer;
    N && (N.items && N.items.length ? Array.from(N.items).forEach((O) => {
      if (O.kind === "file") {
        const z = O.webkitGetAsEntry?.();
        if (z)
          ur((G, se) => {
            const fe = I.exec(G?.fullPath || "");
            P(se, fe ? fe[1] : se.name);
          }, z);
        else {
          const G = O.getAsFile?.();
          G && P(G);
        }
      }
    }) : N.files && N.files.length && Array.from(N.files).forEach((O) => P(O)));
  }, k = (D) => d.value.findIndex((I) => I.id === D), P = (D, I) => b.addFile({ name: I || D.name, type: D.type, data: D, source: "Local" }), A = (D) => D.status === xe.DONE ? "text-green-600" : D.status === xe.ERROR || D.status === xe.CANCELED ? "text-red-600" : "", M = (D) => D.status === xe.DONE ? "✓" : D.status === xe.ERROR || D.status === xe.CANCELED ? "!" : "...", j = () => u.value?.click(), F = () => e.modal.close(), q = (D) => {
    if (_.value || !d.value.filter((I) => I.status !== xe.DONE).length) {
      _.value || (g.value = t("Please select file to upload first."));
      return;
    }
    g.value = "", v.value = D || s.value, b.upload();
  }, T = () => {
    b.cancelAll(), d.value.forEach((D) => {
      D.status !== xe.DONE && (D.status = xe.CANCELED, D.statusName = t("Canceled"));
    }), _.value = !1;
  }, Y = (D) => {
    _.value || (b.removeFile(D.id), d.value.splice(k(D.id), 1));
  }, K = (D) => {
    if (!_.value)
      if (b.cancelAll(), D) {
        const I = d.value.filter((N) => N.status !== xe.DONE);
        d.value = [], I.forEach((N) => P(N.originalFile, N.name));
      } else
        d.value = [];
  }, Q = (D) => {
    D.forEach((I) => {
      P(I);
    });
  };
  return he(() => {
    b = new No({
      debug: e.debug,
      restrictions: { maxFileSize: Ho(o.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (O, z) => {
        if (z[O.id] != null) {
          const se = k(O.id);
          d.value[se]?.status === xe.PENDING && (g.value = b.i18n("noDuplicates", { fileName: O.name })), d.value = d.value.filter((fe) => fe.id !== O.id);
        }
        return d.value.push({
          id: O.id,
          name: O.name,
          size: e.filesize(O.size),
          status: xe.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: O.data
        }), !0;
      }
    });
    const D = {
      getTargetPath: () => (v.value || s.value).path
    };
    if (n)
      n(b, D);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(b, D);
    else
      throw new Error("No uploader configured");
    b.on("restriction-failed", (O, z) => {
      const G = d.value[k(O.id)];
      G && Y(G), g.value = z.message;
    }), b.on("upload-start", (O) => {
      O.forEach((z) => {
        const G = d.value[k(z.id)];
        G && (G.status = xe.UPLOADING, G.statusName = t("Uploading"), G.percent = "0%");
      });
    }), b.on("upload-progress", (O, z) => {
      const G = z.bytesTotal ?? 1, se = Math.floor(z.bytesUploaded / G * 100), fe = k(O.id);
      fe !== -1 && d.value[fe] && (d.value[fe].percent = `${se}%`);
    }), b.on("upload-success", (O) => {
      const z = d.value[k(O.id)];
      z && (z.status = xe.DONE, z.statusName = t("Done"));
    }), b.on("upload-error", (O, z) => {
      const G = d.value[k(O.id)];
      G && (G.percent = null, G.status = xe.ERROR, G.statusName = z?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : z?.message || t("Unknown Error"));
    }), b.on("error", (O) => {
      g.value = O.message, _.value = !1;
    }), b.on("complete", (O) => {
      _.value = !1;
      const z = v.value || s.value;
      e.adapter.invalidateListQuery(z.path), e.adapter.open(z.path);
      const G = d.value.filter(
        (se) => se.status === xe.DONE && O.successful.includes(se.id)
      ).map((se) => se.name);
      e.emitter.emit("vf-upload-complete", G);
    }), u.value?.addEventListener("click", () => c.value?.click()), h.value?.addEventListener("click", () => l.value?.click());
    const I = { capture: !0 };
    document.addEventListener("dragover", y, I), document.addEventListener("dragenter", w, I), document.addEventListener("dragleave", x, I), document.addEventListener("drop", $, I);
    const N = (O) => {
      const z = O.target, G = z.files;
      if (G) {
        for (const se of G) P(se);
        z.value = "";
      }
    };
    c.value?.addEventListener("change", N), l.value?.addEventListener("change", N);
  }), Ie(() => {
    const D = { capture: !0 };
    document.removeEventListener("dragover", y, D), document.removeEventListener("dragenter", w, D), document.removeEventListener("dragleave", x, D), document.removeEventListener("drop", $, D);
  }), {
    container: a,
    internalFileInput: c,
    internalFolderInput: l,
    pickFiles: u,
    pickFolders: h,
    queue: d,
    message: g,
    uploading: _,
    hasFilesInDropArea: m,
    definitions: i,
    openFileSelector: j,
    upload: q,
    cancel: T,
    remove: Y,
    clear: K,
    close: F,
    getClassNameForEntry: A,
    getIconForEntry: M,
    addExternalFiles: Q
  };
}
const Zl = { class: "vuefinder__image-preview" }, eu = { class: "vuefinder__image-preview__header" }, tu = ["title"], nu = { class: "vuefinder__image-preview__actions" }, ru = { class: "vuefinder__image-preview__image-container" }, su = ["src"], ou = /* @__PURE__ */ te({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, r = ee(), s = Be(r), { enabled: o } = et(), { t: i } = r.i18n, a = L(!1), c = L(
      r.modal.data.item.previewUrl ?? r.adapter.getPreviewUrl({ path: r.modal.data.item.path })
    ), l = L(c.value), { addExternalFiles: u, upload: h, queue: d } = ro(r.customUploader), g = r.fs, _ = X(g.path), m = xt("cropperRef"), v = async () => {
      a.value = !a.value, r.modal.setEditMode(a.value);
    }, b = async () => {
      const w = m.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!w) return;
      let x = w;
      if (w.width > 1200 || w.height > 1200) {
        const M = Math.min(1200 / w.width, 1200 / w.height), j = document.createElement("canvas");
        j.width = Math.floor(w.width * M), j.height = Math.floor(w.height * M);
        const F = j.getContext("2d");
        F && (F.drawImage(w, 0, 0, j.width, j.height), x = j);
      }
      const $ = r.modal.data.item.basename, k = $.split(".").pop()?.toLowerCase() || "jpg", P = k === "png" ? "image/png" : k === "gif" ? "image/gif" : "image/jpeg", A = await new Promise((M) => {
        x.toBlob((j) => M(j), P);
      });
      if (!A) {
        s.error(i("Failed to save image"));
        return;
      }
      try {
        const M = new File([A], $, { type: P }), F = r.modal.data.item.path.split("/");
        F.pop();
        const T = {
          path: F.join("/") || (_.value?.path ?? "")
        };
        u([M]), await new Promise((D) => setTimeout(D, 100));
        const Y = d.value.find((D) => D.name === M.name);
        if (!Y)
          throw new Error("File was not added to upload queue");
        h(T);
        let K = 0;
        for (; K < 150; ) {
          await new Promise((I) => setTimeout(I, 200));
          const D = d.value.find((I) => I.id === Y.id);
          if (D?.status === xe.DONE) break;
          if (D?.status === xe.ERROR)
            throw new Error(D.statusName || "Upload failed");
          K++;
        }
        s.success(i("Updated.")), await fetch(c.value, { cache: "reload", mode: "no-cors" });
        const Q = r.root?.querySelector?.('[data-src="' + c.value + '"]');
        Q && Q instanceof HTMLElement && ys.resetStatus(Q), r.emitter.emit("vf-refresh-thumbnails"), await v(), t("success");
      } catch (M) {
        s.error(Ue(M, i("Failed to save image")));
      }
    };
    return he(() => {
      t("success");
    }), (y, w) => (S(), C("div", Zl, [
      p("div", eu, [
        p("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: f(r).modal.data.item.path
        }, E(f(r).modal.data.item.basename), 9, tu),
        p("div", nu, [
          a.value ? (S(), C("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: b
          }, E(f(i)("Crop")), 1)) : R("", !0),
          f(o)("edit") ? (S(), C("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: w[0] || (w[0] = (x) => v())
          }, E(a.value ? f(i)("Cancel") : f(i)("Edit")), 1)) : R("", !0)
        ])
      ]),
      p("div", ru, [
        a.value ? (S(), U(f(Io), {
          key: 1,
          ref_key: "cropperRef",
          ref: m,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: l.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (S(), C("img", {
          key: 0,
          style: {},
          src: f(r).modal.data.item.previewUrl ?? f(r).adapter.getPreviewUrl({ path: f(r).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, su))
      ])
    ]));
  }
}), iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function au(n, e) {
  return S(), C("svg", iu, [...e[0] || (e[0] = [
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Bt = { render: au }, lu = { class: "vuefinder__default-preview" }, uu = { class: "vuefinder__default-preview__content" }, cu = { class: "vuefinder__default-preview__header" }, du = ["title"], hu = { class: "vuefinder__default-preview__icon-container" }, fu = ["title"], pu = /* @__PURE__ */ te({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), r = e;
    return he(() => {
      r("success");
    }), (s, o) => (S(), C("div", lu, [
      p("div", uu, [
        p("div", cu, [
          p("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: f(t).modal.data.item.path
          }, E(f(t).modal.data.item.basename), 9, du)
        ]),
        p("div", hu, [
          B(f(Bt), { class: "vuefinder__default-preview__file-icon" }),
          p("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: f(t).modal.data.item.path
          }, E(f(t).modal.data.item.basename), 9, fu)
        ])
      ])
    ]));
  }
}), mu = { class: "vuefinder__video-preview" }, vu = ["title"], gu = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, _u = ["src"], yu = /* @__PURE__ */ te({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), r = e, s = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return he(() => {
      r("success");
    }), (o, i) => (S(), C("div", mu, [
      p("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: f(t).modal.data.item.path
      }, E(f(t).modal.data.item.basename), 9, vu),
      p("div", null, [
        p("video", gu, [
          p("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, _u),
          i[0] || (i[0] = ce(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), wu = { class: "vuefinder__audio-preview" }, bu = ["title"], xu = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Su = ["src"], $u = /* @__PURE__ */ te({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, r = ee(), s = () => {
      const o = ee();
      return o.adapter.getPreviewUrl({ path: o.modal.data.item.path });
    };
    return he(() => {
      t("success");
    }), (o, i) => (S(), C("div", wu, [
      p("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: f(r).modal.data.item.path
      }, E(f(r).modal.data.item.basename), 9, bu),
      p("div", null, [
        p("audio", xu, [
          p("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Su),
          i[0] || (i[0] = ce(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), ku = { class: "vuefinder__pdf-preview" }, Cu = ["title"], Pu = ["data"], Eu = ["src"], Tu = /* @__PURE__ */ te({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), r = e, s = () => {
      const o = ee();
      return o.adapter.getPreviewUrl({ path: o.modal.data.item.path });
    };
    return he(() => {
      r("success");
    }), (o, i) => (S(), C("div", ku, [
      p("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: f(t).modal.data.item.path
      }, E(f(t).modal.data.item.basename), 9, Cu),
      p("div", null, [
        p("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          p("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Eu)
        ], 8, Pu)
      ])
    ]));
  }
});
function Au(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Nu = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Iu = ["disabled", "title"], Du = ["disabled", "title"], Fu = { class: "vuefinder__preview-modal__content" }, Mu = { key: 0 }, Ou = { class: "vuefinder__preview-modal__loading" }, Lu = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Ru = { class: "vuefinder__preview-modal__details" }, ju = { class: "font-bold" }, zu = { class: "pl-2 font-bold" }, Vu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Uu = ["download", "href"], Kt = /* @__PURE__ */ te({
  __name: "ModalPreview",
  setup(n) {
    const e = ee(), { enabled: t } = et(), { t: r } = e.i18n, s = L(!1), o = (y) => {
      const w = (y || "").split("/").pop() || "", x = w.lastIndexOf(".");
      return x >= 0 ? w.slice(x + 1).toLowerCase() : "";
    }, i = (y, w) => {
      if (!w) return !1;
      const x = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), $ = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), k = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), P = /* @__PURE__ */ new Set([
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
      return y === "image" ? x.has(w) : y === "video" ? $.has(w) : y === "audio" ? k.has(w) : y === "text" ? P.has(w) : y === "application/pdf" ? w === "pdf" : !1;
    }, a = (y) => {
      const w = e.modal.data.item.mime_type;
      if (w && typeof w == "string") return w.startsWith(y);
      const x = o(e.modal.data.item.path);
      return i(y, x);
    }, c = t("preview");
    c || (s.value = !0);
    const l = V(() => e.modal.data.item), u = X(e.fs.sortedFiles), h = V(() => u.value.filter((y) => y.type === "file")), d = V(
      () => h.value.findIndex((y) => y.path === l.value.path)
    ), g = V(() => d.value > 0), _ = V(() => d.value < h.value.length - 1), m = () => {
      if (e.modal.editMode || !g.value) return;
      const y = h.value[d.value - 1];
      y && (e.fs.clearSelection(), e.fs.select(y.path), e.modal.data.item = y);
    }, v = () => {
      if (e.modal.editMode || !_.value) return;
      const y = h.value[d.value + 1];
      y && (e.fs.clearSelection(), e.fs.select(y.path), e.modal.data.item = y);
    }, b = (y) => {
      if (y.key === "Escape") {
        y.preventDefault(), y.stopPropagation(), e.modal.close();
        return;
      }
      (y.key === "ArrowLeft" || y.key === "ArrowRight") && (y.preventDefault(), y.stopPropagation(), y.key === "ArrowLeft" ? m() : v());
    };
    return he(() => {
      const y = document.querySelector(".vuefinder__preview-modal");
      y && y.focus();
    }), (y, w) => (S(), U(Ye, null, {
      buttons: oe(() => [
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: w[6] || (w[6] = (x) => f(e).modal.close())
        }, E(f(r)("Close")), 1),
        f(t)("download") ? (S(), C("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: f(e).adapter.getDownloadUrl(f(e).modal.data.item),
          href: f(e).adapter.getDownloadUrl(f(e).modal.data.item)
        }, E(f(r)("Download")), 9, Uu)) : R("", !0)
      ]),
      default: oe(() => [
        p("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: b
        }, [
          f(e).modal.editMode ? R("", !0) : (S(), C("div", Nu, [
            p("button", {
              disabled: !g.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: f(r)("Previous file"),
              onClick: m
            }, [...w[7] || (w[7] = [
              p("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                p("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Iu),
            p("button", {
              disabled: !_.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: f(r)("Next file"),
              onClick: v
            }, [...w[8] || (w[8] = [
              p("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                p("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, Du)
          ])),
          p("div", Fu, [
            f(c) ? (S(), C("div", Mu, [
              a("text") ? (S(), U(Jl, {
                key: `text-${l.value.path}`,
                onSuccess: w[0] || (w[0] = (x) => s.value = !0)
              })) : a("image") ? (S(), U(ou, {
                key: `image-${l.value.path}`,
                onSuccess: w[1] || (w[1] = (x) => s.value = !0)
              })) : a("video") ? (S(), U(yu, {
                key: `video-${l.value.path}`,
                onSuccess: w[2] || (w[2] = (x) => s.value = !0)
              })) : a("audio") ? (S(), U($u, {
                key: `audio-${l.value.path}`,
                onSuccess: w[3] || (w[3] = (x) => s.value = !0)
              })) : a("application/pdf") ? (S(), U(Tu, {
                key: `pdf-${l.value.path}`,
                onSuccess: w[4] || (w[4] = (x) => s.value = !0)
              })) : (S(), U(pu, {
                key: `default-${l.value.path}`,
                onSuccess: w[5] || (w[5] = (x) => s.value = !0)
              }))
            ])) : R("", !0),
            p("div", Ou, [
              s.value === !1 ? (S(), C("div", Lu, [
                w[9] || (w[9] = p("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  p("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  p("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                p("span", null, E(f(r)("Loading")), 1)
              ])) : R("", !0)
            ])
          ])
        ], 32),
        p("div", Ru, [
          p("div", null, [
            p("span", ju, E(f(r)("File Size")) + ": ", 1),
            ce(E(f(e).filesize(f(e).modal.data.item.file_size)), 1)
          ]),
          p("div", null, [
            p("span", zu, E(f(r)("Last Modified")) + ": ", 1),
            ce(" " + E(f(Au)(f(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        f(t)("download") ? (S(), C("div", Vu, [
          p("span", null, E(f(r)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : R("", !0)
      ]),
      _: 1
    }));
  }
}), Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function Hu(n, e) {
  return S(), C("svg", Bu, [...e[0] || (e[0] = [
    p("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    p("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const Wu = { render: Hu }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ku(n, e) {
  return S(), C("svg", qu, [...e[0] || (e[0] = [
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const cr = { render: Ku }, Gu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Yu(n, e) {
  return S(), C("svg", Gu, [...e[0] || (e[0] = [
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const rt = { render: Yu }, Xu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Qu(n, e) {
  return S(), C("svg", Xu, [...e[0] || (e[0] = [
    p("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    p("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const vn = { render: Qu }, Ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Zu(n, e) {
  return S(), C("svg", Ju, [...e[0] || (e[0] = [
    p("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    p("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const gn = { render: Zu }, ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function tc(n, e) {
  return S(), C("svg", ec, [...e[0] || (e[0] = [
    p("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    p("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const dr = { render: tc }, nc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function rc(n, e) {
  return S(), C("svg", nc, [...e[0] || (e[0] = [
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const hr = { render: rc }, sc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function oc(n, e) {
  return S(), C("svg", sc, [...e[0] || (e[0] = [
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const fr = { render: oc }, ic = { class: "vuefinder__modal-tree__folder-item" }, ac = { class: "vuefinder__modal-tree__folder-content" }, lc = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, uc = { class: "vuefinder__modal-tree__folder-text" }, cc = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, dc = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, hc = 300, fc = /* @__PURE__ */ te({
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
    const t = ee(), { t: r } = t.i18n, s = t.fs, o = L({}), i = n, a = e;
    X(s.path);
    const c = V(() => {
      const P = `${i.storage}:${i.folder.path}`;
      return i.expandedFolders[P] || !1;
    }), l = V(() => i.modelValue?.path === i.folder.path), u = V(() => i.currentPath?.path === i.folder.path), h = V(() => i.modalTreeData[i.folder.path] || []), d = V(() => {
      const P = h.value, A = o.value[i.folder.path] || 50;
      return P.length > A ? P.slice(0, A) : P;
    }), g = V(() => h.value.length), _ = V(() => o.value[i.folder.path] || 50), m = V(() => g.value > _.value), v = () => {
      o.value[i.folder.path] = (_.value || 50) + 50;
    }, b = V(() => h.value.length > 0 || i.folder.type === "dir"), y = () => {
      a("toggleFolder", i.storage, i.folder.path);
    }, w = () => {
      a("update:modelValue", i.folder);
    }, x = () => {
      a("update:modelValue", i.folder), a("selectAndClose", i.folder);
    };
    let $ = 0;
    const k = () => {
      const P = Date.now();
      P - $ < hc ? x() : w(), $ = P;
    };
    return (P, A) => {
      const M = ms("ModalTreeFolderItem", !0);
      return S(), C("div", ic, [
        p("div", ac, [
          b.value ? (S(), C("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: y
          }, [
            c.value ? (S(), U(f(gn), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (S(), U(f(vn), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (S(), C("div", lc)),
          p("div", {
            class: ne(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": l.value,
              "vuefinder__modal-tree__folder-link--current": u.value
            }]),
            onClick: w,
            onDblclick: x,
            onTouchend: k
          }, [
            c.value ? (S(), U(f(fr), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (S(), U(f(rt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            p("span", uc, E(n.folder.basename), 1)
          ], 34)
        ]),
        c.value && b.value ? (S(), C("div", cc, [
          (S(!0), C(de, null, ge(d.value, (j) => (S(), U(M, {
            key: j.path,
            folder: j,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": A[0] || (A[0] = (F) => P.$emit("update:modelValue", F)),
            onSelectAndClose: A[1] || (A[1] = (F) => P.$emit("selectAndClose", F)),
            onToggleFolder: A[2] || (A[2] = (F, q) => P.$emit("toggleFolder", F, q))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          m.value ? (S(), C("div", dc, [
            p("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: v
            }, E(f(r)("load more")), 1)
          ])) : R("", !0)
        ])) : R("", !0)
      ]);
    };
  }
}), pc = { class: "vuefinder__modal-tree" }, mc = { class: "vuefinder__modal-tree__header" }, vc = { class: "vuefinder__modal-tree__title" }, gc = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, _c = { class: "vuefinder__modal-tree__section-title" }, yc = { class: "vuefinder__modal-tree__list" }, wc = ["onClick", "onDblclick", "onTouchend"], bc = { class: "vuefinder__modal-tree__text" }, xc = { class: "vuefinder__modal-tree__text-storage" }, Sc = { class: "vuefinder__modal-tree__section-title" }, $c = { class: "vuefinder__modal-tree__list" }, kc = { class: "vuefinder__modal-tree__storage-item" }, Cc = { class: "vuefinder__modal-tree__storage-content" }, Pc = ["onClick"], Ec = ["onClick", "onDblclick", "onTouchend"], Tc = { class: "vuefinder__modal-tree__storage-text" }, Ac = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Nc = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Ic = ["onClick"], is = 300, pr = /* @__PURE__ */ te({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = ee(), { t: r } = t.i18n, s = t.fs, o = t.config, i = e, a = X(s.sortedFiles), c = X(s.storages), l = V(() => c.value || []), u = X(s.path), h = L(null), d = L({}), g = L({}), _ = L({});
    ie(a, (T) => {
      const Y = T.filter((Q) => Q.type === "dir"), K = u.value?.path || "";
      K && (g.value[K] = Y.map((Q) => ({
        ...Q,
        type: "dir"
      })));
    });
    const m = (T, Y) => {
      const K = `${T}:${Y}`;
      d.value = {
        ...d.value,
        [K]: !d.value[K]
      }, d.value[K] && !g.value[Y] && t.adapter.list(Y).then((Q) => {
        const I = (Q.files || []).filter((N) => N.type === "dir");
        g.value[Y] = I.map((N) => ({
          ...N,
          type: "dir"
        }));
      });
    }, v = (T) => g.value[T] || [], b = (T) => _.value[T] || 50, y = (T) => {
      const Y = v(T), K = b(T);
      return Y.length > K ? Y.slice(0, K) : Y;
    }, w = (T) => v(T).length, x = (T) => w(T) > b(T), $ = (T) => {
      _.value[T] = b(T) + 50;
    }, k = (T) => {
      T && i("update:modelValue", T);
    }, P = (T) => {
      T && (i("update:modelValue", T), i("selectAndClose", T));
    }, A = (T) => {
      const Y = {
        storage: T,
        path: T + "://",
        basename: T,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: T + "://"
      };
      i("update:modelValue", Y);
    }, M = (T) => {
      const Y = {
        storage: T,
        path: T + "://",
        basename: T,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: T + "://"
      };
      i("update:modelValue", Y), i("selectAndClose", Y);
    };
    let j = 0;
    const F = (T) => {
      if (!T) return;
      const Y = Date.now();
      Y - j < is ? P(T) : k(T), j = Y;
    }, q = (T) => {
      const Y = Date.now();
      Y - j < is ? M(T) : A(T), j = Y;
    };
    return he(() => {
      h.value && Rt(h.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (T, Y) => (S(), C("div", pc, [
      p("div", mc, [
        p("div", vc, E(f(r)("Select Target Folder")), 1)
      ]),
      p("div", {
        ref_key: "modalContentElement",
        ref: h,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && f(t).features.pinned && f(o).get("pinnedFolders").length ? (S(), C("div", gc, [
          p("div", _c, E(f(r)("Pinned Folders")), 1),
          p("div", yc, [
            (S(!0), C(de, null, ge(f(o).get("pinnedFolders"), (K) => (S(), C("div", {
              key: K.path,
              class: ne(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === K.path }]),
              onClick: (Q) => k(K),
              onDblclick: (Q) => P(K),
              onTouchend: (Q) => F(K)
            }, [
              B(f(rt), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              p("div", bc, E(K.basename), 1),
              p("div", xc, E(K.storage), 1),
              B(f(dr), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, wc))), 128))
          ])
        ])) : R("", !0),
        p("div", Sc, E(f(r)("Storages")), 1),
        (S(!0), C(de, null, ge(l.value, (K) => (S(), C("div", {
          key: K,
          class: "vuefinder__modal-tree__section"
        }, [
          p("div", $c, [
            p("div", kc, [
              p("div", Cc, [
                p("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ae((Q) => m(K, K + "://"), ["stop"])
                }, [
                  d.value[`${K}:${K}://`] ? (S(), U(f(gn), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (S(), U(f(vn), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Pc),
                p("div", {
                  class: ne(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === K + "://"
                  }]),
                  onClick: (Q) => A(K),
                  onDblclick: (Q) => M(K),
                  onTouchend: (Q) => q(K)
                }, [
                  B(f(hr), { class: "vuefinder__modal-tree__storage-icon" }),
                  p("span", Tc, E(K), 1)
                ], 42, Ec)
              ]),
              d.value[`${K}:${K}://`] ? (S(), C("div", Ac, [
                (S(!0), C(de, null, ge(y(K + "://"), (Q) => (S(), U(fc, {
                  key: Q.path,
                  folder: Q,
                  storage: K,
                  "model-value": n.modelValue,
                  "expanded-folders": d.value,
                  "modal-tree-data": g.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": k,
                  onSelectAndClose: P,
                  onToggleFolder: m
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                x(K + "://") ? (S(), C("div", Nc, [
                  p("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (Q) => $(K + "://")
                  }, E(f(r)("load more")), 9, Ic)
                ])) : R("", !0)
              ])) : R("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Dc = ["title"], Gn = /* @__PURE__ */ te({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, r = ee(), { t: s } = r.i18n, o = L(!1), i = L(null), a = L(i.value?.innerHTML);
    ie(a, () => o.value = !1);
    const c = () => {
      t("hidden"), o.value = !0;
    };
    return (l, u) => (S(), C("div", null, [
      o.value ? R("", !0) : (S(), C("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: ne(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Oe(l.$slots, "default"),
        p("div", {
          class: "vuefinder__message__close",
          title: f(s)("Close"),
          onClick: c
        }, [...u[0] || (u[0] = [
          p("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            p("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, Dc)
      ], 2))
    ]));
  }
}), Fc = { class: "vuefinder__move-modal__content" }, Mc = { class: "vuefinder__move-modal__description" }, Oc = { class: "vuefinder__move-modal__files vf-scrollbar" }, Lc = { class: "vuefinder__move-modal__file-name" }, Rc = { class: "vuefinder__move-modal__target-title" }, jc = { class: "vuefinder__move-modal__target-container" }, zc = { class: "vuefinder__move-modal__target-path" }, Vc = { class: "vuefinder__move-modal__target-storage" }, Uc = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, Bc = { class: "vuefinder__move-modal__target-badge" }, Hc = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, Wc = { class: "vuefinder__move-modal__checkbox-label" }, qc = { class: "vuefinder__move-modal__checkbox-text" }, Kc = ["disabled"], Gc = { class: "vuefinder__move-modal__selected-items" }, so = /* @__PURE__ */ te({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = ee(), t = Be(e), { enabled: r } = et(), { t: s } = e.i18n, o = n, i = L(e.modal.data.items.from), a = L(e.modal.data.items.to), c = L(""), l = L(o.copy || !r("move")), u = V(() => l.value ? "copy" : "move"), h = L(!1), d = X(e.fs.path), g = V(() => l.value ? s("Copy files") : s("Move files")), _ = V(
      () => l.value ? s("Are you sure you want to copy these files?") : s("Are you sure you want to move these files?")
    ), m = V(() => l.value ? s("Yes, Copy!") : s("Yes, Move!"));
    V(() => l.value ? s("Files copied.") : s("Files moved."));
    const v = (k) => {
      k && (a.value = k);
    }, b = (k) => {
      k && (a.value = k, h.value = !1);
    }, y = V(() => {
      const k = a.value;
      return k ? i.value.some((P) => !!(k.path === P.path || P.path.startsWith(k.path + "/") || P.type === "dir" && k.path.startsWith(P.path + "/"))) : !0;
    }), w = V(() => {
      if (!y.value)
        return "";
      const k = a.value;
      return k ? i.value.find((A) => k.path === A.path || A.path.startsWith(k.path + "/") || A.type === "dir" && k.path.startsWith(A.path + "/")) ? s("Cannot move/copy item to itself or its parent/child directory") : s("Invalid destination directory") : s("Please select a destination directory");
    }), x = () => {
      const k = a.value.path;
      if (!k) return { storage: "local", path: "" };
      if (k.endsWith("://"))
        return { storage: k.replace("://", ""), path: "" };
      const P = k.split("://");
      return {
        storage: P[0] || "local",
        path: P[1] || ""
      };
    }, $ = async () => {
      if (i.value.length)
        try {
          const { files: k } = await e.adapter[u.value]({
            path: d.value.path,
            sources: i.value.map(({ path: P }) => P),
            destination: a.value.path
          });
          e.fs.setFiles(k), e.modal.close();
        } catch (k) {
          t.error(Ue(k, s("Failed to transfer files")));
        }
    };
    return (k, P) => (S(), U(Ye, null, {
      buttons: oe(() => [
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: y.value,
          onClick: $
        }, E(m.value), 9, Kc),
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: P[4] || (P[4] = (A) => f(e).modal.close())
        }, E(f(s)("Cancel")), 1),
        p("div", Gc, E(f(s)("%s item(s) selected.", i.value.length)), 1)
      ]),
      default: oe(() => [
        p("div", null, [
          B(Ze, {
            icon: l.value ? f(cr) : f(Wu),
            title: g.value
          }, null, 8, ["icon", "title"]),
          p("div", Fc, [
            p("p", Mc, E(_.value), 1),
            p("div", Oc, [
              (S(!0), C(de, null, ge(i.value, (A) => (S(), C("div", {
                key: A.path,
                class: "vuefinder__move-modal__file"
              }, [
                p("div", null, [
                  A.type === "dir" ? (S(), U(f(rt), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (S(), U(f(Bt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                p("div", Lc, E(A.path), 1)
              ]))), 128))
            ]),
            p("h4", Rc, E(f(s)("Target Directory")), 1),
            p("div", jc, [
              p("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: P[0] || (P[0] = (A) => h.value = !h.value)
              }, [
                p("div", zc, [
                  p("span", Vc, E(x().storage) + "://", 1),
                  x().path ? (S(), C("span", Uc, E(x().path), 1)) : R("", !0)
                ]),
                p("span", Bc, E(f(s)("Browse")), 1)
              ])
            ]),
            p("div", {
              class: ne([
                "vuefinder__move-modal__tree-selector",
                h.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              B(pr, {
                modelValue: a.value,
                "onUpdate:modelValue": [
                  P[1] || (P[1] = (A) => a.value = A),
                  v
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: b
              }, null, 8, ["modelValue"])
            ], 2),
            f(r)("copy") && f(r)("move") ? (S(), C("div", Hc, [
              p("label", Wc, [
                ve(p("input", {
                  "onUpdate:modelValue": P[2] || (P[2] = (A) => l.value = A),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [un, l.value]
                ]),
                p("span", qc, E(f(s)("Create a copy instead of moving")), 1)
              ])
            ])) : R("", !0),
            w.value ? (S(), U(Gn, {
              key: 1,
              error: ""
            }, {
              default: oe(() => [
                ce(E(w.value), 1)
              ]),
              _: 1
            })) : R("", !0),
            c.value.length && !w.value ? (S(), U(Gn, {
              key: 2,
              error: "",
              onHidden: P[3] || (P[3] = (A) => c.value = "")
            }, {
              default: oe(() => [
                ce(E(c.value), 1)
              ]),
              _: 1
            })) : R("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ct = /* @__PURE__ */ te({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (S(), U(so, { copy: !1 }));
  }
}), mr = /* @__PURE__ */ te({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (S(), U(so, { copy: !0 }));
  }
}), Yc = (n, e = 0, t = !1) => {
  let r;
  return (...s) => {
    t && !r && n(...s), clearTimeout(r), r = setTimeout(() => {
      n(...s);
    }, e);
  };
}, oo = (n, e, t) => {
  const r = L(n);
  return xo((s, o) => ({
    get() {
      return s(), r.value;
    },
    set: Yc(
      (i) => {
        r.value = i, o();
      },
      e,
      !1
    )
  }));
}, Xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Qc(n, e) {
  return S(), C("svg", Xc, [...e[0] || (e[0] = [
    p("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const vr = { render: Qc }, Jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Zc(n, e) {
  return S(), C("svg", Jc, [...e[0] || (e[0] = [
    p("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900"
    }, null, -1),
    p("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const _n = { render: Zc }, ed = { class: "vuefinder__search-modal__search-input" }, td = ["value", "placeholder", "disabled"], nd = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, rd = /* @__PURE__ */ te({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const r = t, s = ee(), { t: o } = s.i18n, i = L(null), a = (l) => {
      const u = l.target;
      r("update:modelValue", u.value);
    }, c = (l) => {
      r("keydown", l);
    };
    return e({
      focus: () => {
        i.value && i.value.focus();
      }
    }), (l, u) => (S(), C("div", ed, [
      B(f(vr), { class: "vuefinder__search-modal__search-icon" }),
      p("input", {
        ref_key: "searchInput",
        ref: i,
        value: n.modelValue,
        type: "text",
        placeholder: f(o)("Search files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: u[0] || (u[0] = ae(() => {
        }, ["stop"])),
        onInput: a
      }, null, 40, td),
      n.isSearching ? (S(), C("div", nd, [
        B(f(_n), { class: "vuefinder__search-modal__loading-icon" })
      ])) : R("", !0)
    ]));
  }
}), sd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function od(n, e) {
  return S(), C("svg", sd, [...e[0] || (e[0] = [
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const io = { render: od }, id = ["disabled", "title"], ad = ["data-theme"], ld = { class: "vuefinder__search-modal__dropdown-content" }, ud = { class: "vuefinder__search-modal__dropdown-section" }, cd = { class: "vuefinder__search-modal__dropdown-title" }, dd = { class: "vuefinder__search-modal__dropdown-options" }, hd = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, fd = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, pd = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, md = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, vd = /* @__PURE__ */ te({
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
    const r = n, s = t, o = ee(), { t: i } = o.i18n, a = L(null), c = L(null);
    let l = null;
    const u = (m) => {
      if (s("update:selectedOption", m), m.startsWith("size-")) {
        const v = m.split("-")[1];
        s("update:sizeFilter", v);
      }
    }, h = async () => {
      r.disabled || (r.visible ? (s("update:visible", !1), l && (l(), l = null)) : (s("update:visible", !0), await nt(), await d()));
    }, d = async () => {
      if (!(!a.value || !c.value) && (await nt(), !(!a.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: m, y: v } = await $t(a.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [jt(8), zt({ padding: 16 }), Vt({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${m}px`,
            top: `${v}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (m) {
          console.warn("Floating UI initial positioning error:", m);
          return;
        }
        try {
          l = Xn(a.value, c.value, async () => {
            if (!(!a.value || !c.value))
              try {
                const { x: m, y: v } = await $t(
                  a.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [jt(8), zt({ padding: 16 }), Vt({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${m}px`,
                  top: `${v}px`
                });
              } catch (m) {
                console.warn("Floating UI positioning error:", m);
              }
          });
        } catch (m) {
          console.warn("Floating UI autoUpdate setup error:", m), l = null;
        }
      }
    }, g = (m) => {
      if (!r.visible) return;
      const v = ["size-all", "size-small", "size-medium", "size-large"], b = v.findIndex((y) => y === r.selectedOption);
      if (m.key === "ArrowDown") {
        m.preventDefault();
        const y = (b + 1) % v.length;
        s("update:selectedOption", v[y] || null);
      } else if (m.key === "ArrowUp") {
        m.preventDefault();
        const y = b <= 0 ? v.length - 1 : b - 1;
        s("update:selectedOption", v[y] || null);
      } else m.key === "Enter" ? (m.preventDefault(), r.selectedOption?.startsWith("size-") && s(
        "update:sizeFilter",
        r.selectedOption.split("-")[1]
      )) : m.key === "Escape" && (m.preventDefault(), s("update:visible", !1), l && (l(), l = null));
    }, _ = () => {
      l && (l(), l = null);
    };
    return ie(
      () => r.visible,
      (m) => {
        !m && l && (l(), l = null);
      }
    ), Ie(() => {
      _();
    }), e({
      cleanup: _
    }), (m, v) => (S(), C(de, null, [
      p("button", {
        ref_key: "dropdownBtn",
        ref: a,
        class: ne(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: f(i)("Search Options"),
        onClick: ae(h, ["stop"])
      }, [
        B(f(io), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, id),
      (S(), U(cn, { to: "body" }, [
        n.visible ? (S(), C("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": f(o).theme.current,
          tabindex: "-1",
          onClick: v[4] || (v[4] = ae(() => {
          }, ["stop"])),
          onKeydown: g
        }, [
          p("div", ld, [
            p("div", ud, [
              p("div", cd, E(f(i)("File Size")), 1),
              p("div", dd, [
                p("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: v[0] || (v[0] = ae((b) => u("size-all"), ["stop"]))
                }, [
                  p("span", null, E(f(i)("All Files")), 1),
                  n.sizeFilter === "all" ? (S(), C("div", hd, [...v[5] || (v[5] = [
                    p("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      p("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : R("", !0)
                ], 2),
                p("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: v[1] || (v[1] = ae((b) => u("size-small"), ["stop"]))
                }, [
                  p("span", null, E(f(i)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (S(), C("div", fd, [...v[6] || (v[6] = [
                    p("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      p("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : R("", !0)
                ], 2),
                p("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: v[2] || (v[2] = ae((b) => u("size-medium"), ["stop"]))
                }, [
                  p("span", null, E(f(i)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (S(), C("div", pd, [...v[7] || (v[7] = [
                    p("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      p("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : R("", !0)
                ], 2),
                p("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: v[3] || (v[3] = ae((b) => u("size-large"), ["stop"]))
                }, [
                  p("span", null, E(f(i)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (S(), C("div", md, [...v[8] || (v[8] = [
                    p("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      p("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : R("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, ad)) : R("", !0)
      ]))
    ], 64));
  }
});
function ao(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const r = t[1], s = t[2] ?? "", o = s.split("/").filter(Boolean), i = o.pop();
  if (!i) return r + s;
  let a = `${r}${o.join("/")}${o.length ? "/" : ""}${i}`;
  if (a.length <= e) return a;
  const c = i.split(/\.(?=[^\.]+$)/), l = c[0] ?? "", u = c[1] ?? "", h = l.length > 10 ? `${l.slice(0, 6)}...${l.slice(-5)}` : l, d = u ? `${h}.${u}` : h;
  return a = `${r}${o.join("/")}${o.length ? "/" : ""}${d}`, a.length > e && (a = `${r}.../${d}`), a;
}
async function lo(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function Ht(n) {
  await lo(n);
}
async function gd(n) {
  await lo(n);
}
const _d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function yd(n, e) {
  return S(), C("svg", _d, [...e[0] || (e[0] = [
    p("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const uo = { render: yd }, wd = ["title"], bd = { class: "vuefinder__search-modal__result-icon" }, xd = { class: "vuefinder__search-modal__result-content" }, Sd = { class: "vuefinder__search-modal__result-name" }, $d = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, kd = ["title"], Cd = ["title"], Pd = ["data-item-dropdown", "data-theme"], Ed = { class: "vuefinder__search-modal__item-dropdown-content" }, Td = /* @__PURE__ */ te({
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
    const t = n, r = e, s = ee(), { t: o } = s.i18n, i = L(null);
    let a = null, c = null, l = [], u = null;
    ie(
      () => t.activeDropdown,
      (P) => {
        a && (a(), a = null), c && (l.forEach((A) => {
          A === window ? window.removeEventListener("scroll", c, !0) : A.removeEventListener("scroll", c, !0);
        }), c = null, l = []), u && (document.removeEventListener("mousedown", u, !0), document.removeEventListener("touchstart", u, !0), u = null), P === t.item.path && i.value && nt(() => {
          b(t.item.path, i.value), d(), g();
        });
      }
    );
    const h = (P) => {
      const A = [];
      let M = P;
      for (; M && M !== document.body && M !== document.documentElement; ) {
        const j = window.getComputedStyle(M), F = j.overflow + j.overflowX + j.overflowY;
        (F.includes("scroll") || F.includes("auto")) && A.push(M), M = M.parentElement;
      }
      return A;
    }, d = () => {
      if (t.activeDropdown !== t.item.path) return;
      const P = h(i.value);
      l = [window, ...P], c = () => {
        t.activeDropdown === t.item.path && r("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const A = c;
      A && l.forEach((M) => {
        M === window ? window.addEventListener("scroll", A, !0) : M.addEventListener("scroll", A, !0);
      });
    }, g = () => {
      t.activeDropdown === t.item.path && (u = (P) => {
        if (t.activeDropdown !== t.item.path) return;
        const A = P.target;
        if (!A) return;
        const M = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (M && M.contains(A) || i.value && i.value.contains(A))
          return;
        const j = s.root;
        if (j && j.contains(A)) {
          r("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const F = document.querySelector(".vuefinder__modal-layout");
        if (F && F.contains(A)) {
          r("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        r("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        u && (document.addEventListener("mousedown", u, !0), document.addEventListener("touchstart", u, !0));
      }, 100));
    };
    Ie(() => {
      a && (a(), a = null), c && (l.forEach((P) => {
        P === window ? window.removeEventListener("scroll", c, !0) : P.removeEventListener("scroll", c, !0);
      }), c = null, l = []), u && (document.removeEventListener("mousedown", u, !0), document.removeEventListener("touchstart", u, !0), u = null);
    });
    const _ = (P) => t.expandedPaths.has(P), m = (P) => P.type === "dir" || !P.file_size ? "" : Jn(P.file_size), v = (P, A) => {
      A.stopPropagation(), r("toggleItemDropdown", P, A);
    }, b = async (P, A) => {
      const M = document.querySelector(
        `[data-item-dropdown="${P}"]`
      );
      if (!(!M || !A) && (await nt(), !(!M || !A))) {
        Object.assign(M.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: j, y: F } = await $t(A, M, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [jt(8), zt({ padding: 16 }), Vt({ padding: 16 })]
          });
          Object.assign(M.style, {
            left: `${j}px`,
            top: `${F}px`
          }), requestAnimationFrame(() => {
            M && Object.assign(M.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (j) {
          console.warn("Floating UI initial positioning error:", j);
          return;
        }
        try {
          a = Xn(A, M, async () => {
            if (!(!A || !M))
              try {
                const { x: j, y: F } = await $t(A, M, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [jt(8), zt({ padding: 16 }), Vt({ padding: 16 })]
                });
                Object.assign(M.style, {
                  left: `${j}px`,
                  top: `${F}px`
                });
              } catch (j) {
                console.warn("Floating UI positioning error:", j);
              }
          });
        } catch (j) {
          console.warn("Floating UI autoUpdate setup error:", j), a = null;
        }
      }
    }, y = (P) => {
      r("update:selectedItemDropdownOption", P);
    }, w = async (P) => {
      await Ht(P.path), r("copyPath", P);
    }, x = (P) => {
      r("openContainingFolder", P);
    }, $ = (P) => {
      r("preview", P);
    }, k = (P) => {
      if (!t.activeDropdown) return;
      const A = ["copy-path", "open-folder", "preview"], M = t.selectedItemDropdownOption, j = A.findIndex((F) => M?.includes(F));
      if (P.key === "ArrowDown") {
        P.preventDefault();
        const F = (j + 1) % A.length;
        r(
          "update:selectedItemDropdownOption",
          `${A[F] || ""}-${t.activeDropdown}`
        );
      } else if (P.key === "ArrowUp") {
        P.preventDefault();
        const F = j <= 0 ? A.length - 1 : j - 1;
        r(
          "update:selectedItemDropdownOption",
          `${A[F] || ""}-${t.activeDropdown}`
        );
      } else P.key === "Enter" ? (P.preventDefault(), M && (M.includes("copy-path") ? w(t.item) : M.includes("open-folder") ? x(t.item) : M.includes("preview") && $(t.item))) : P.key === "Escape" && (P.preventDefault(), r("update:selectedItemDropdownOption", null));
    };
    return (P, A) => (S(), C("div", {
      class: ne(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: A[9] || (A[9] = (M) => r("select", n.index))
    }, [
      p("div", bd, [
        n.item.type === "dir" ? (S(), U(f(rt), { key: 0 })) : (S(), U(f(Bt), { key: 1 }))
      ]),
      p("div", xd, [
        p("div", Sd, [
          ce(E(n.item.basename) + " ", 1),
          m(n.item) ? (S(), C("span", $d, E(m(n.item)), 1)) : R("", !0)
        ]),
        p("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: A[0] || (A[0] = ae((M) => {
            r("select", n.index), r("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, E(_(n.item.path) ? n.item.path : f(ao)(n.item.path)), 9, kd)
      ]),
      p("button", {
        ref_key: "buttonElementRef",
        ref: i,
        class: "vuefinder__search-modal__result-actions",
        title: f(o)("More actions"),
        onClick: A[1] || (A[1] = (M) => {
          r("selectWithDropdown", n.index), v(n.item.path, M);
        })
      }, [
        B(f(uo), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Cd),
      (S(), U(cn, { to: "body" }, [
        n.activeDropdown === n.item.path ? (S(), C("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": f(s).theme.current,
          tabindex: "-1",
          onClick: A[8] || (A[8] = ae(() => {
          }, ["stop"])),
          onKeydown: k
        }, [
          p("div", Ed, [
            p("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: A[2] || (A[2] = (M) => {
                y(`copy-path-${n.item.path}`), w(n.item);
              }),
              onFocus: A[3] || (A[3] = (M) => y(`copy-path-${n.item.path}`))
            }, [
              B(f(cr), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              p("span", null, E(f(o)("Copy Path")), 1)
            ], 34),
            p("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: A[4] || (A[4] = (M) => {
                y(`open-folder-${n.item.path}`), x(n.item);
              }),
              onFocus: A[5] || (A[5] = (M) => y(`open-folder-${n.item.path}`))
            }, [
              B(f(rt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              p("span", null, E(f(o)("Open Containing Folder")), 1)
            ], 34),
            p("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: A[6] || (A[6] = (M) => {
                y(`preview-${n.item.path}`), $(n.item);
              }),
              onFocus: A[7] || (A[7] = (M) => y(`preview-${n.item.path}`))
            }, [
              B(f(Bt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              p("span", null, E(f(o)("Preview")), 1)
            ], 34)
          ])
        ], 40, Pd)) : R("", !0)
      ]))
    ], 10, wd));
  }
}), Ad = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Nd = { class: "vuefinder__search-modal__loading-icon" }, Id = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Dd = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Fd = { class: "vuefinder__search-modal__results-header" }, gt = 60, as = 5, Md = /* @__PURE__ */ te({
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
    const r = n, s = t, o = ee(), { t: i } = o.i18n, a = xt("scrollableContainer"), c = V(() => r.searchResults.length > 0), l = V(() => r.searchResults.length), u = L(0), h = L(600), d = V(() => r.searchResults.length * gt), g = V(() => {
      const w = Math.max(0, Math.floor(u.value / gt) - as), x = Math.min(
        r.searchResults.length,
        Math.ceil((u.value + h.value) / gt) + as
      );
      return { start: w, end: x };
    }), _ = V(() => {
      const { start: w, end: x } = g.value;
      return r.searchResults.slice(w, x).map(($, k) => ({
        item: $,
        index: w + k,
        top: (w + k) * gt
      }));
    }), m = (w) => {
      const x = w.target;
      u.value = x.scrollTop;
    }, v = () => {
      a.value && (h.value = a.value.clientHeight);
    }, b = () => {
      if (r.selectedIndex >= 0 && a.value) {
        const w = r.selectedIndex * gt, x = w + gt, $ = a.value.scrollTop, k = a.value.clientHeight, P = $ + k;
        let A = $;
        w < $ ? A = w : x > P && (A = x - k), A !== $ && a.value.scrollTo({
          top: A,
          behavior: "smooth"
        });
      }
    }, y = () => {
      a.value && (a.value.scrollTop = 0, u.value = 0);
    };
    return he(() => {
      v(), window.addEventListener("resize", v);
    }), Ie(() => {
      window.removeEventListener("resize", v);
    }), ie(
      () => a.value,
      () => {
        v();
      }
    ), e({
      scrollSelectedIntoView: b,
      resetScroll: y,
      getContainerHeight: () => h.value,
      scrollTop: () => u.value
    }), (w, x) => (S(), C("div", {
      class: ne(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (S(), C("div", Ad, [
        p("div", Nd, [
          B(f(_n), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        p("span", null, E(f(i)("Searching...")), 1)
      ])) : c.value ? (S(), C("div", Dd, [
        p("div", Fd, [
          p("span", null, E(f(i)("Found %s results", l.value)), 1)
        ]),
        p("div", {
          ref_key: "scrollableContainer",
          ref: a,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: m
        }, [
          p("div", {
            class: "vuefinder__search-modal__results-items",
            style: Je({ height: `${d.value}px`, position: "relative" })
          }, [
            (S(!0), C(de, null, ge(_.value, ($) => (S(), C("div", {
              key: $.item.path,
              style: Je({
                position: "absolute",
                top: `${$.top}px`,
                left: "0",
                width: "100%",
                height: `${gt}px`
              })
            }, [
              B(Td, {
                item: $.item,
                index: $.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: x[0] || (x[0] = (k) => s("selectResultItem", k)),
                onSelectWithDropdown: x[1] || (x[1] = (k) => s("selectResultItemWithDropdown", k)),
                onTogglePathExpansion: x[2] || (x[2] = (k) => s("togglePathExpansion", k)),
                onToggleItemDropdown: x[3] || (x[3] = (k, P) => s("toggleItemDropdown", k, P)),
                "onUpdate:selectedItemDropdownOption": x[4] || (x[4] = (k) => s("update:selectedItemDropdownOption", k)),
                onCopyPath: x[5] || (x[5] = (k) => s("copyPath", k)),
                onOpenContainingFolder: x[6] || (x[6] = (k) => s("openContainingFolder", k)),
                onPreview: x[7] || (x[7] = (k) => s("preview", k))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (S(), C("div", Id, [
        p("span", null, E(f(i)("No results found")), 1)
      ]))
    ], 2));
  }
}), Od = { class: "vuefinder__search-modal" }, Ld = { class: "vuefinder__search-modal__content" }, Rd = { class: "vuefinder__search-modal__search-bar" }, jd = { class: "vuefinder__search-modal__search-location" }, zd = ["title"], Vd = ["disabled"], Ud = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, Bd = { class: "vuefinder__search-modal__folder-selector-content" }, Hd = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, Wd = { class: "vuefinder__search-modal__instructions-text" }, gr = /* @__PURE__ */ te({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = ee(), t = Be(e), { t: r } = e.i18n, s = e.fs, o = L(null), i = L(null), a = L(null), c = oo("", 300), l = L([]), u = L(!1), h = L(-1), d = L(!1), g = L(!1), _ = L(null), m = L("all"), v = L(!1), b = L(`size-${m.value}`), y = L(null), w = L(/* @__PURE__ */ new Set()), x = L(null), $ = X(s.path), k = (N) => {
      w.value.has(N) ? w.value.delete(N) : w.value.add(N);
    }, P = (N, O) => {
      O && typeof O.stopPropagation == "function" && O.stopPropagation(), x.value === N ? x.value = null : x.value = N;
    }, A = () => {
      x.value = null;
    }, M = (N) => {
      try {
        const O = N.dir || `${N.storage}://`;
        e.adapter.open(O), e.modal.close(), A();
      } catch {
        t.error(r("Failed to open containing folder"));
      }
    }, j = (N) => {
      e.modal.open(Kt, {
        storage: $?.value?.storage ?? "local",
        item: N
      }), A();
    }, F = (N) => {
      h.value = N, A();
    }, q = (N) => {
      h.value = N;
    }, T = async (N) => {
      await Ht(N.path), A();
    };
    ie(c, async (N) => {
      N.trim() ? (await Y(N.trim()), h.value = 0) : (l.value = [], u.value = !1, h.value = -1);
    }), ie(m, async (N) => {
      b.value = `size-${N}`, c.value.trim() && !g.value && (await Y(c.value.trim()), h.value = 0);
    }), ie(v, async () => {
      c.value.trim() && !g.value && (await Y(c.value.trim()), h.value = 0);
    });
    const Y = async (N) => {
      if (N) {
        u.value = !0;
        try {
          const O = _.value?.path || $?.value?.path, z = await e.adapter.search({
            path: O,
            filter: N,
            deep: v.value,
            size: m.value
          });
          l.value = z || [], u.value = !1;
        } catch (O) {
          t.error(Ue(O, r("Search failed"))), l.value = [], u.value = !1;
        }
      }
    };
    he(() => {
      document.addEventListener("click", I), b.value = `size-${m.value}`;
    });
    const K = () => {
      g.value ? (g.value = !1, c.value.trim() && (Y(c.value.trim()), h.value = 0)) : (d.value = !1, g.value = !0);
    }, Q = (N) => {
      N && (_.value = N);
    }, D = (N) => {
      N && (Q(N), g.value = !1, c.value.trim() && (Y(c.value.trim()), h.value = 0));
    };
    Ie(() => {
      document.removeEventListener("click", I), i.value && i.value.cleanup();
    });
    const I = (N) => {
      const O = N.target;
      if (d.value && (O.closest(".vuefinder__search-modal__dropdown") || (d.value = !1, nt(() => {
        o.value && o.value.focus();
      }))), x.value) {
        const z = O.closest(".vuefinder__search-modal__item-dropdown"), G = O.closest(".vuefinder__search-modal__result-item");
        !z && !G && A();
      }
    };
    return (N, O) => (S(), U(Ye, { class: "vuefinder__search-modal-layout" }, {
      default: oe(() => [
        p("div", Od, [
          B(Ze, {
            icon: f(vr),
            title: f(r)("Search files")
          }, null, 8, ["icon", "title"]),
          p("div", Ld, [
            p("div", Rd, [
              B(rd, {
                ref_key: "searchInputRef",
                ref: o,
                modelValue: f(c),
                "onUpdate:modelValue": O[0] || (O[0] = (z) => So(c) ? c.value = z : null),
                "is-searching": u.value,
                disabled: g.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              B(vd, {
                ref_key: "searchOptionsDropdownRef",
                ref: i,
                visible: d.value,
                "onUpdate:visible": O[1] || (O[1] = (z) => d.value = z),
                "size-filter": m.value,
                "onUpdate:sizeFilter": O[2] || (O[2] = (z) => m.value = z),
                "selected-option": b.value,
                "onUpdate:selectedOption": O[3] || (O[3] = (z) => b.value = z),
                disabled: g.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            p("div", {
              class: "vuefinder__search-modal__options",
              onClick: O[7] || (O[7] = ae(() => {
              }, ["stop"]))
            }, [
              p("div", jd, [
                p("button", {
                  class: ne(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": g.value }]),
                  onClick: ae(K, ["stop"])
                }, [
                  B(f(rt), { class: "vuefinder__search-modal__location-icon" }),
                  p("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: _.value?.path || f($).path
                  }, E(f(ao)(_.value?.path || f($).path)), 9, zd),
                  O[10] || (O[10] = p("svg", {
                    class: "vuefinder__search-modal__location-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    p("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2)
              ]),
              p("label", {
                class: "vuefinder__search-modal__deep-search",
                onClick: O[6] || (O[6] = ae(() => {
                }, ["stop"]))
              }, [
                ve(p("input", {
                  "onUpdate:modelValue": O[4] || (O[4] = (z) => v.value = z),
                  type: "checkbox",
                  disabled: g.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: O[5] || (O[5] = ae(() => {
                  }, ["stop"]))
                }, null, 8, Vd), [
                  [un, v.value]
                ]),
                p("span", null, E(f(r)("Include subfolders")), 1)
              ])
            ]),
            g.value ? (S(), C("div", Ud, [
              p("div", Bd, [
                B(pr, {
                  modelValue: _.value,
                  "onUpdate:modelValue": [
                    O[8] || (O[8] = (z) => _.value = z),
                    Q
                  ],
                  "show-pinned-folders": !0,
                  "current-path": f($),
                  onSelectAndClose: D
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : R("", !0),
            !f(c).trim() && !g.value ? (S(), C("div", Hd, [
              p("p", Wd, E(f(r)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : R("", !0),
            f(c).trim() && !g.value ? (S(), U(Md, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: a,
              "search-results": l.value,
              "is-searching": u.value,
              "selected-index": h.value,
              "expanded-paths": w.value,
              "active-dropdown": x.value,
              "selected-item-dropdown-option": y.value,
              "results-enter": !0,
              onSelectResultItem: F,
              onSelectResultItemWithDropdown: q,
              onTogglePathExpansion: k,
              onToggleItemDropdown: P,
              "onUpdate:selectedItemDropdownOption": O[9] || (O[9] = (z) => y.value = z),
              onCopyPath: T,
              onOpenContainingFolder: M,
              onPreview: j
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : R("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), qd = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const r = ee(), s = L(!1), { t: o } = r.i18n;
    let i = null;
    const a = () => {
      i && clearTimeout(i), s.value = !0, i = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return he(() => {
      r.emitter.on(n.on, a);
    }), Ie(() => {
      i && clearTimeout(i);
    }), {
      shown: s,
      t: o
    };
  }
}, Kd = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, s] of e)
    t[r] = s;
  return t;
}, Gd = { key: 1 };
function Yd(n, e, t, r, s, o) {
  return S(), C("div", {
    class: ne(["vuefinder__action-message", { "vuefinder__action-message--hidden": !r.shown }])
  }, [
    n.$slots.default ? Oe(n.$slots, "default", { key: 0 }) : (S(), C("span", Gd, E(r.t("Saved.")), 1))
  ], 2);
}
const ls = /* @__PURE__ */ Kd(qd, [["render", Yd]]), Xd = [
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
], Qd = { class: "vuefinder__settings-modal__content" }, Jd = { class: "vuefinder__settings-modal__main" }, Zd = { class: "vuefinder__settings-modal__sections" }, eh = {
  key: 0,
  class: "vuefinder__settings-modal__section"
}, th = {
  for: "theme",
  class: "vuefinder__settings-modal__label"
}, nh = { class: "vuefinder__settings-modal__input-group" }, rh = ["value"], sh = ["value"], oh = {
  key: 1,
  class: "vuefinder__settings-modal__section"
}, ih = {
  for: "language",
  class: "vuefinder__settings-modal__label"
}, ah = { class: "vuefinder__settings-modal__input-group" }, lh = ["value"], uh = { class: "vuefinder__settings-modal__reset-section" }, ch = { class: "vuefinder__settings-modal__reset-content" }, dh = { class: "vuefinder__settings-modal__reset-title" }, hh = { class: "vuefinder__settings-modal__reset-description" }, co = /* @__PURE__ */ te({
  __name: "ModalSettings",
  setup(n) {
    const e = ee(), { enabled: t } = et(), r = e.config, { clearStore: s } = e.storage, { t: o, localeAtom: i } = e.i18n, a = X(i), c = V({
      get: () => String(a.value || "en"),
      set: (v) => i.set(v || "en")
    }), l = X(r.state), u = V(() => l.value.theme || "silver"), h = async () => {
      r.reset(), s(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, d = (v) => {
      r.set("theme", v), e.emitter.emit("vf-theme-saved");
    }, { i18n: g } = Jt("VueFinderOptions"), m = Object.fromEntries(
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
      }).filter(([v]) => Object.keys(g).includes(v))
    );
    return (v, b) => (S(), U(Ye, null, {
      buttons: oe(() => [
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[2] || (b[2] = (y) => f(e).modal.close())
        }, E(f(o)("Close")), 1)
      ]),
      default: oe(() => [
        p("div", Qd, [
          B(Ze, {
            icon: f(io),
            title: f(o)("Settings")
          }, null, 8, ["icon", "title"]),
          p("div", Jd, [
            p("div", Zd, [
              f(t)("theme") ? (S(), C("div", eh, [
                p("label", th, [
                  ce(E(f(o)("Theme")) + " ", 1),
                  B(ls, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: oe(() => [
                      ce(E(f(o)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                p("div", nh, [
                  p("select", {
                    id: "theme",
                    value: u.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: b[0] || (b[0] = (y) => d(y.target?.value))
                  }, [
                    (S(!0), C(de, null, ge(f(Xd), (y) => (S(), C("option", {
                      key: y.name,
                      value: y.name
                    }, E(y.displayName), 9, sh))), 128))
                  ], 40, rh)
                ])
              ])) : R("", !0),
              Object.keys(f(m)).length > 1 ? (S(), C("div", oh, [
                p("label", ih, [
                  ce(E(f(o)("Language")) + " ", 1),
                  B(ls, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: oe(() => [
                      ce(E(f(o)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                p("div", ah, [
                  ve(p("select", {
                    id: "language",
                    "onUpdate:modelValue": b[1] || (b[1] = (y) => c.value = y),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (S(!0), C(de, null, ge(f(m), (y, w) => (S(), C("option", {
                      key: w,
                      value: w
                    }, E(y), 9, lh))), 128))
                  ], 512), [
                    [Ln, c.value]
                  ])
                ])
              ])) : R("", !0)
            ]),
            p("div", uh, [
              p("div", ch, [
                p("div", dh, E(f(o)("Reset")), 1),
                p("div", hh, E(f(o)("Reset all settings to default")), 1)
              ]),
              p("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: h
              }, E(f(o)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), We = {
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
function fh() {
  const n = ee(), e = Be(n), t = n.fs, r = n.config, { enabled: s } = et(), o = X(t.path), i = X(t.selectedItems), a = (c) => {
    if (c.code === We.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (c.metaKey && c.code === We.KEY_R && !c.shiftKey && (n.adapter.invalidateListQuery(o.value.path), n.adapter.open(o.value.path), c.preventDefault()), c.metaKey && c.shiftKey && c.code === We.KEY_R && s("rename") && i.value.length === 1 && (n.modal.open(mn, { items: i.value }), c.preventDefault()), c.code === We.DELETE && i.value.length !== 0 && n.modal.open(pn, { items: i.value }), c.metaKey && c.code === We.KEY_F && s("search") && (n.modal.open(gr), c.preventDefault()), c.metaKey && c.code === We.KEY_E && (r.toggle("showTreeView"), c.preventDefault()), c.metaKey && c.code === We.KEY_S && (n.modal.open(co), c.preventDefault()), c.metaKey && c.code === We.ENTER && (r.toggle("fullScreen"), n.root.focus()), c.metaKey && c.code === We.KEY_A && (t.selectAll(n.selectionMode || "multiple", n), c.preventDefault()), c.code === We.SPACE && i.value.length === 1 && i.value[0]?.type !== "dir" && n.modal.open(Kt, {
        storage: t.path.get().storage,
        item: i.value[0]
      }), c.metaKey && c.code === We.KEY_C && s("copy")) {
        if (i.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(i.value.map((l) => l.path))), e.success(
          i.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", i.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === We.KEY_X && s("copy")) {
        if (i.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(i.value.map((l) => l.path))), e.success(
          i.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", i.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === We.KEY_V && s("copy")) {
        if (t.getClipboard().items.size === 0) {
          e.error(n.i18n.t("No items in clipboard"));
          return;
        }
        if (t.getClipboard().path === t.path.get().path) {
          e.error(n.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (t.getClipboard().type === "cut") {
          n.modal.open(Ct, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          }), t.clearClipboard();
          return;
        }
        if (t.getClipboard().type === "copy") {
          n.modal.open(mr, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          });
          return;
        }
        c.preventDefault();
      }
    }
  };
  he(async () => {
    if (await nt(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", a);
  }), vs(() => {
    n.root && n.root.removeEventListener("keydown", a);
  });
}
function ph() {
  const n = L(!1), e = L([]);
  return {
    isDraggingExternal: n,
    externalFiles: e,
    handleDragEnter: (a) => {
      a.preventDefault(), a.stopPropagation();
      const c = a.dataTransfer?.items;
      c && Array.from(c).some((u) => u.kind === "file") && (n.value = !0, a.isExternalDrag = !0);
    },
    handleDragOver: (a) => {
      n.value && a.dataTransfer && (a.dataTransfer.dropEffect = "copy", a.preventDefault(), a.stopPropagation());
    },
    handleDragLeave: (a) => {
      a.preventDefault();
      const c = a.currentTarget.getBoundingClientRect(), l = a.clientX, u = a.clientY;
      (l < c.left || l > c.right || u < c.top || u > c.bottom) && (n.value = !1);
    },
    handleDrop: async (a) => {
      a.preventDefault(), a.stopPropagation(), n.value = !1;
      const c = a.dataTransfer?.items;
      if (c) {
        const l = Array.from(c).filter((u) => u.kind === "file");
        if (l.length > 0) {
          e.value = [];
          for (const u of l) {
            const h = u.webkitGetAsEntry?.();
            if (h)
              await ur((d, g) => {
                e.value.push({
                  name: g.name,
                  size: g.size,
                  type: g.type,
                  lastModified: new Date(g.lastModified),
                  file: g
                });
              }, h);
            else {
              const d = u.getAsFile();
              d && e.value.push({
                name: d.name,
                size: d.size,
                type: d.type,
                lastModified: new Date(d.lastModified),
                file: d
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
const mh = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function vh(n, e) {
  return S(), C("svg", mh, [...e[0] || (e[0] = [
    p("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ho = { render: vh }, gh = { class: "vuefinder__new-folder-modal__content" }, _h = { class: "vuefinder__new-folder-modal__form" }, yh = { class: "vuefinder__new-folder-modal__description" }, wh = ["placeholder"], _r = /* @__PURE__ */ te({
  __name: "ModalNewFolder",
  setup(n) {
    const e = ee(), t = Be(e), { t: r } = e.i18n, s = e.fs, o = X(s.path), i = L(""), a = () => {
      i.value !== "" && e.adapter.createFolder({
        path: o.value.path,
        name: i.value
      }).then((c) => {
        t.success(r("%s is created.", i.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Ue(c, r("Failed to create folder")));
      });
    };
    return (c, l) => (S(), U(Ye, null, {
      buttons: oe(() => [
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: a
        }, E(f(r)("Create")), 1),
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[1] || (l[1] = (u) => f(e).modal.close())
        }, E(f(r)("Cancel")), 1)
      ]),
      default: oe(() => [
        p("div", null, [
          B(Ze, {
            icon: f(ho),
            title: f(r)("New Folder")
          }, null, 8, ["icon", "title"]),
          p("div", gh, [
            p("div", _h, [
              p("p", yh, E(f(r)("Create a new folder")), 1),
              ve(p("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => i.value = u),
                class: "vuefinder__new-folder-modal__input",
                placeholder: f(r)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: Wt(a, ["enter"])
              }, null, 40, wh), [
                [qt, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), bh = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function xh(n, e) {
  return S(), C("svg", bh, [...e[0] || (e[0] = [
    p("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const fo = { render: xh }, Sh = { class: "vuefinder__new-file-modal__content" }, $h = { class: "vuefinder__new-file-modal__form" }, kh = { class: "vuefinder__new-file-modal__description" }, Ch = ["placeholder"], po = /* @__PURE__ */ te({
  __name: "ModalNewFile",
  setup(n) {
    const e = ee(), t = Be(e), { t: r } = e.i18n, s = e.fs, o = X(s.path), i = L(""), a = () => {
      i.value !== "" && e.adapter.createFile({
        path: o.value.path,
        name: i.value
      }).then((c) => {
        t.success(r("%s is created.", i.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Ue(c, r("Failed to create file")));
      });
    };
    return (c, l) => (S(), U(Ye, null, {
      buttons: oe(() => [
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: a
        }, E(f(r)("Create")), 1),
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[1] || (l[1] = (u) => f(e).modal.close())
        }, E(f(r)("Cancel")), 1)
      ]),
      default: oe(() => [
        p("div", null, [
          B(Ze, {
            icon: f(fo),
            title: f(r)("New File")
          }, null, 8, ["icon", "title"]),
          p("div", Sh, [
            p("div", $h, [
              p("p", kh, E(f(r)("Create a new file")), 1),
              ve(p("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => i.value = u),
                class: "vuefinder__new-file-modal__input",
                placeholder: f(r)("File Name"),
                type: "text",
                onKeyup: Wt(a, ["enter"])
              }, null, 40, Ch), [
                [qt, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ph = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Eh(n, e) {
  return S(), C("svg", Ph, [...e[0] || (e[0] = [
    p("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const mo = { render: Eh };
function Yn(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const Th = { class: "vuefinder__upload-modal__content relative" }, Ah = { class: "vuefinder__upload-modal__target-section" }, Nh = { class: "vuefinder__upload-modal__target-label" }, Ih = { class: "vuefinder__upload-modal__target-container" }, Dh = { class: "vuefinder__upload-modal__target-path" }, Fh = { class: "vuefinder__upload-modal__target-storage" }, Mh = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Oh = { class: "vuefinder__upload-modal__target-badge" }, Lh = { class: "vuefinder__upload-modal__drag-hint" }, Rh = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, jh = ["textContent"], zh = { class: "vuefinder__upload-modal__file-info" }, Vh = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Uh = { class: "vuefinder__upload-modal__file-name md:hidden" }, Bh = {
  key: 0,
  class: "ml-auto"
}, Hh = ["title", "disabled", "onClick"], Wh = {
  key: 0,
  class: "py-2"
}, qh = ["aria-expanded"], Kh = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, Gh = ["disabled"], Yh = ["aria-expanded"], Xh = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, yr = /* @__PURE__ */ te({
  __name: "ModalUpload",
  setup(n) {
    const e = ee(), { t } = e.i18n, r = e.fs, s = X(r.path), o = L(s.value), i = L(!1), a = () => {
      const D = o.value.path;
      if (!D) return { storage: "local", path: "" };
      if (D.endsWith("://"))
        return { storage: D.replace("://", ""), path: "" };
      const I = D.split("://");
      return {
        storage: I[0] || "local",
        path: I[1] || ""
      };
    }, c = (D) => {
      D && (o.value = D);
    }, l = (D) => {
      D && (o.value = D, i.value = !1);
    }, {
      container: u,
      internalFileInput: h,
      internalFolderInput: d,
      pickFiles: g,
      queue: _,
      message: m,
      uploading: v,
      hasFilesInDropArea: b,
      definitions: y,
      openFileSelector: w,
      upload: x,
      cancel: $,
      remove: k,
      clear: P,
      close: A,
      getClassNameForEntry: M,
      getIconForEntry: j,
      addExternalFiles: F
    } = ro(e.customUploader), q = () => {
      x(o.value);
    };
    he(() => {
      e.emitter.on("vf-external-files-dropped", (D) => {
        F(D);
      });
    }), Ie(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const T = L(!1), Y = L(null), K = L(null), Q = (D) => {
      if (!T.value) return;
      const I = D.target, N = Y.value?.contains(I) ?? !1, O = K.value?.contains(I) ?? !1;
      !N && !O && (T.value = !1);
    };
    return he(() => document.addEventListener("click", Q)), Ie(() => document.removeEventListener("click", Q)), (D, I) => (S(), U(Ye, {
      "show-drag-overlay": f(b),
      "drag-overlay-text": f(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: oe(() => [
        p("div", {
          ref_key: "actionsMenuMobileRef",
          ref: Y,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          p("div", {
            class: ne([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              T.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            p("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: I[3] || (I[3] = (N) => f(w)())
            }, E(f(t)("Select Files")), 1),
            p("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": T.value ? "true" : "false",
              onClick: I[4] || (I[4] = ae((N) => T.value = !T.value, ["stop"]))
            }, [...I[17] || (I[17] = [
              p("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                p("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, qh)
          ], 2),
          T.value ? (S(), C("div", Kh, [
            p("div", {
              class: "vuefinder__upload-actions__item",
              onClick: I[5] || (I[5] = (N) => {
                f(w)(), T.value = !1;
              })
            }, E(f(t)("Select Files")), 1),
            p("div", {
              class: "vuefinder__upload-actions__item",
              onClick: I[6] || (I[6] = (N) => {
                f(d)?.click(), T.value = !1;
              })
            }, E(f(t)("Select Folders")), 1),
            I[18] || (I[18] = p("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            p("div", {
              class: ne(["vuefinder__upload-actions__item", f(v) ? "disabled" : ""]),
              onClick: I[7] || (I[7] = (N) => f(v) ? null : (f(P)(!1), T.value = !1))
            }, E(f(t)("Clear all")), 3),
            p("div", {
              class: ne(["vuefinder__upload-actions__item", f(v) ? "disabled" : ""]),
              onClick: I[8] || (I[8] = (N) => f(v) ? null : (f(P)(!0), T.value = !1))
            }, E(f(t)("Clear only successful")), 3)
          ])) : R("", !0)
        ], 512),
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: f(v) || !f(_).length,
          onClick: ae(q, ["prevent"])
        }, E(f(t)("Upload")), 9, Gh),
        f(v) ? (S(), C("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: I[9] || (I[9] = ae(
            //@ts-ignore
            (...N) => f($) && f($)(...N),
            ["prevent"]
          ))
        }, E(f(t)("Cancel")), 1)) : (S(), C("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: I[10] || (I[10] = ae(
            //@ts-ignore
            (...N) => f(A) && f(A)(...N),
            ["prevent"]
          ))
        }, E(f(t)("Close")), 1)),
        p("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: K,
          class: "relative mr-auto hidden sm:block"
        }, [
          p("div", {
            class: ne(["vuefinder__upload-actions", T.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            p("button", {
              ref_key: "pickFiles",
              ref: g,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, E(f(t)("Select Files")), 513),
            p("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": T.value ? "true" : "false",
              onClick: I[11] || (I[11] = ae((N) => T.value = !T.value, ["stop"]))
            }, [...I[19] || (I[19] = [
              p("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                p("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, Yh)
          ], 2),
          T.value ? (S(), C("div", Xh, [
            p("div", {
              class: "vuefinder__upload-actions__item",
              onClick: I[12] || (I[12] = (N) => {
                f(w)(), T.value = !1;
              })
            }, E(f(t)("Select Files")), 1),
            p("div", {
              class: "vuefinder__upload-actions__item",
              onClick: I[13] || (I[13] = (N) => {
                f(d)?.click(), T.value = !1;
              })
            }, E(f(t)("Select Folders")), 1),
            I[20] || (I[20] = p("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            p("div", {
              class: ne(["vuefinder__upload-actions__item", f(v) ? "disabled" : ""]),
              onClick: I[14] || (I[14] = (N) => f(v) ? null : (f(P)(!1), T.value = !1))
            }, E(f(t)("Clear all")), 3),
            p("div", {
              class: ne(["vuefinder__upload-actions__item", f(v) ? "disabled" : ""]),
              onClick: I[15] || (I[15] = (N) => f(v) ? null : (f(P)(!0), T.value = !1))
            }, E(f(t)("Clear only successful")), 3)
          ])) : R("", !0)
        ], 512)
      ]),
      default: oe(() => [
        p("div", null, [
          B(Ze, {
            icon: f(mo),
            title: f(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          p("div", Th, [
            p("div", Ah, [
              p("div", Nh, E(f(t)("Target Directory")), 1),
              p("div", Ih, [
                p("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: I[0] || (I[0] = (N) => i.value = !i.value)
                }, [
                  p("div", Dh, [
                    p("span", Fh, E(a().storage) + "://", 1),
                    a().path ? (S(), C("span", Mh, E(a().path), 1)) : R("", !0)
                  ]),
                  p("span", Oh, E(f(t)("Browse")), 1)
                ])
              ]),
              p("div", {
                class: ne([
                  "vuefinder__upload-modal__tree-selector",
                  i.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                B(pr, {
                  modelValue: o.value,
                  "onUpdate:modelValue": [
                    I[1] || (I[1] = (N) => o.value = N),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: l
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            p("div", Lh, E(f(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            p("div", {
              ref_key: "container",
              ref: u,
              class: "hidden"
            }, null, 512),
            p("div", Rh, [
              (S(!0), C(de, null, ge(f(_), (N) => (S(), C("div", {
                key: N.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                p("span", {
                  class: ne(["vuefinder__upload-modal__file-icon", f(M)(N)])
                }, [
                  p("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: E(f(j)(N))
                  }, null, 8, jh)
                ], 2),
                p("div", zh, [
                  p("div", Vh, E(f(Yn)(N.name, 40)) + " (" + E(N.size) + ") ", 1),
                  p("div", Uh, E(f(Yn)(N.name, 16)) + " (" + E(N.size) + ") ", 1),
                  p("div", {
                    class: ne(["vuefinder__upload-modal__file-status", f(M)(N)])
                  }, [
                    ce(E(N.statusName) + " ", 1),
                    N.status === f(y).QUEUE_ENTRY_STATUS.UPLOADING ? (S(), C("b", Bh, E(N.percent), 1)) : R("", !0)
                  ], 2)
                ]),
                p("button", {
                  type: "button",
                  class: ne(["vuefinder__upload-modal__file-remove", f(v) ? "disabled" : ""]),
                  title: f(t)("Delete"),
                  disabled: f(v),
                  onClick: (O) => f(k)(N)
                }, [...I[16] || (I[16] = [
                  p("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    p("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, Hh)
              ]))), 128)),
              f(_).length ? R("", !0) : (S(), C("div", Wh, E(f(t)("No files selected!")), 1))
            ]),
            f(m).length ? (S(), U(Gn, {
              key: 0,
              error: "",
              onHidden: I[2] || (I[2] = (N) => m.value = "")
            }, {
              default: oe(() => [
                ce(E(f(m)), 1)
              ]),
              _: 1
            })) : R("", !0)
          ])
        ]),
        p("input", {
          ref_key: "internalFileInput",
          ref: h,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        p("input", {
          ref_key: "internalFolderInput",
          ref: d,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["show-drag-overlay", "drag-overlay-text"]));
  }
}), Qh = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Jh(n, e) {
  return S(), C("svg", Qh, [...e[0] || (e[0] = [
    p("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const vo = { render: Jh }, Zh = { class: "vuefinder__unarchive-modal__content" }, ef = { class: "vuefinder__unarchive-modal__items" }, tf = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, nf = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rf = { class: "vuefinder__unarchive-modal__item-name" }, sf = { class: "vuefinder__unarchive-modal__info" }, wr = /* @__PURE__ */ te({
  __name: "ModalUnarchive",
  setup(n) {
    const e = ee(), t = Be(e), r = e.fs, s = X(r.path), { t: o } = e.i18n, i = L(e.modal.data.items[0]), a = L([]), c = () => {
      e.adapter.unarchive({
        item: i.value.path,
        path: s.value.path
      }).then((l) => {
        t.success(o("The file unarchived.")), e.fs.setFiles(l.files), e.modal.close();
      }).catch((l) => {
        t.error(Ue(l, o("Failed to unarchive")));
      });
    };
    return (l, u) => (S(), U(Ye, null, {
      buttons: oe(() => [
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, E(f(o)("Unarchive")), 1),
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[0] || (u[0] = (h) => f(e).modal.close())
        }, E(f(o)("Cancel")), 1)
      ]),
      default: oe(() => [
        p("div", null, [
          B(Ze, {
            icon: f(vo),
            title: f(o)("Unarchive")
          }, null, 8, ["icon", "title"]),
          p("div", Zh, [
            p("div", ef, [
              (S(!0), C(de, null, ge(a.value, (h) => (S(), C("p", {
                key: h.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                h.type === "dir" ? (S(), C("svg", tf, [...u[1] || (u[1] = [
                  p("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (S(), C("svg", nf, [...u[2] || (u[2] = [
                  p("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                p("span", rf, E(h.basename), 1)
              ]))), 128)),
              p("p", sf, E(f(o)("The archive will be unarchived at")) + " (" + E(f(s).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), of = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function af(n, e) {
  return S(), C("svg", of, [...e[0] || (e[0] = [
    p("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const go = { render: af }, lf = { class: "vuefinder__archive-modal__content" }, uf = { class: "vuefinder__archive-modal__form" }, cf = { class: "vuefinder__archive-modal__files vf-scrollbar" }, df = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hf = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ff = { class: "vuefinder__archive-modal__file-name" }, pf = ["placeholder"], br = /* @__PURE__ */ te({
  __name: "ModalArchive",
  setup(n) {
    const e = ee(), t = Be(e), { t: r } = e.i18n, s = e.fs, o = X(s.path), i = L(""), a = L(e.modal.data.items), c = () => {
      a.value.length && e.adapter.archive({
        path: o.value.path,
        items: a.value.map(({ path: l, type: u }) => ({
          path: l,
          type: u
        })),
        name: i.value
      }).then((l) => {
        t.success(r("The file(s) archived.")), e.fs.setFiles(l.files), e.modal.close();
      }).catch((l) => {
        t.error(Ue(l, r("Failed to archive files")));
      });
    };
    return (l, u) => (S(), U(Ye, null, {
      buttons: oe(() => [
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, E(f(r)("Archive")), 1),
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[1] || (u[1] = (h) => f(e).modal.close())
        }, E(f(r)("Cancel")), 1)
      ]),
      default: oe(() => [
        p("div", null, [
          B(Ze, {
            icon: f(go),
            title: f(r)("Archive the files")
          }, null, 8, ["icon", "title"]),
          p("div", lf, [
            p("div", uf, [
              p("div", cf, [
                (S(!0), C(de, null, ge(a.value, (h) => (S(), C("p", {
                  key: h.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  h.type === "dir" ? (S(), C("svg", df, [...u[2] || (u[2] = [
                    p("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (S(), C("svg", hf, [...u[3] || (u[3] = [
                    p("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  p("span", ff, E(h.basename), 1)
                ]))), 128))
              ]),
              ve(p("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (h) => i.value = h),
                class: "vuefinder__archive-modal__input",
                placeholder: f(r)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: Wt(c, ["enter"])
              }, null, 40, pf), [
                [qt, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), mf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function vf(n, e) {
  return S(), C("svg", mf, [...e[0] || (e[0] = [
    p("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }, null, -1),
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 8.2h.01M10.75 11.25H12v4.5m0 0h1.25m-1.25 0h-2"
    }, null, -1)
  ])]);
}
const gf = { render: vf }, _f = { class: "vuefinder__about-modal__content" }, yf = { class: "vuefinder__about-modal__main" }, wf = { class: "vuefinder__about-modal__shortcuts" }, bf = { class: "vuefinder__about-modal__shortcut" }, xf = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Sf = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, $f = { class: "vuefinder__about-modal__shortcut" }, kf = { class: "vuefinder__about-modal__shortcut" }, Cf = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, Pf = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, Ef = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, Tf = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, Af = { class: "vuefinder__about-modal__shortcut" }, Nf = { class: "vuefinder__about-modal__shortcut" }, If = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, Df = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, Ff = /* @__PURE__ */ te({
  __name: "ModalShortcuts",
  setup(n) {
    const e = ee(), { enabled: t } = et(), { t: r } = e.i18n;
    return (s, o) => (S(), U(Ye, null, {
      buttons: oe(() => [
        p("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: o[0] || (o[0] = (i) => f(e).modal.close())
        }, E(f(r)("Close")), 1)
      ]),
      default: oe(() => [
        p("div", _f, [
          B(Ze, {
            icon: f(gf),
            title: f(r)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          p("div", yf, [
            p("div", wf, [
              p("div", bf, [
                p("div", null, E(f(r)("Refresh")), 1),
                o[1] || (o[1] = p("div", null, [
                  p("kbd", null, "⌘"),
                  ce(" + "),
                  p("kbd", null, "R")
                ], -1))
              ]),
              f(t)("rename") ? (S(), C("div", xf, [
                p("div", null, E(f(r)("Rename")), 1),
                o[2] || (o[2] = p("div", null, [
                  p("kbd", null, "⌘"),
                  ce(" + "),
                  p("kbd", null, "Shift"),
                  ce(" + "),
                  p("kbd", null, "R")
                ], -1))
              ])) : R("", !0),
              f(t)("delete") ? (S(), C("div", Sf, [
                p("div", null, E(f(r)("Delete")), 1),
                o[3] || (o[3] = p("kbd", null, "Del", -1))
              ])) : R("", !0),
              p("div", $f, [
                p("div", null, E(f(r)("Escape")), 1),
                o[4] || (o[4] = p("kbd", null, "Esc", -1))
              ]),
              p("div", kf, [
                p("div", null, E(f(r)("Select All")), 1),
                o[5] || (o[5] = p("div", null, [
                  p("kbd", null, "⌘"),
                  ce(" + "),
                  p("kbd", null, "A")
                ], -1))
              ]),
              f(t)("copy") ? (S(), C("div", Cf, [
                p("div", null, E(f(r)("Cut")), 1),
                o[6] || (o[6] = p("div", null, [
                  p("kbd", null, "⌘"),
                  ce(" + "),
                  p("kbd", null, "X")
                ], -1))
              ])) : R("", !0),
              f(t)("copy") ? (S(), C("div", Pf, [
                p("div", null, E(f(r)("Copy")), 1),
                o[7] || (o[7] = p("div", null, [
                  p("kbd", null, "⌘"),
                  ce(" + "),
                  p("kbd", null, "C")
                ], -1))
              ])) : R("", !0),
              f(t)("copy") ? (S(), C("div", Ef, [
                p("div", null, E(f(r)("Paste")), 1),
                o[8] || (o[8] = p("div", null, [
                  p("kbd", null, "⌘"),
                  ce(" + "),
                  p("kbd", null, "V")
                ], -1))
              ])) : R("", !0),
              f(t)("search") ? (S(), C("div", Tf, [
                p("div", null, E(f(r)("Search")), 1),
                o[9] || (o[9] = p("div", null, [
                  p("kbd", null, "⌘"),
                  ce(" + "),
                  p("kbd", null, "F")
                ], -1))
              ])) : R("", !0),
              p("div", Af, [
                p("div", null, E(f(r)("Toggle Sidebar")), 1),
                o[10] || (o[10] = p("div", null, [
                  p("kbd", null, "⌘"),
                  ce(" + "),
                  p("kbd", null, "E")
                ], -1))
              ]),
              p("div", Nf, [
                p("div", null, E(f(r)("Open Settings")), 1),
                o[11] || (o[11] = p("div", null, [
                  p("kbd", null, "⌘"),
                  ce(" + "),
                  p("kbd", null, "S")
                ], -1))
              ]),
              f(t)("fullscreen") ? (S(), C("div", If, [
                p("div", null, E(f(r)("Toggle Full Screen")), 1),
                o[12] || (o[12] = p("div", null, [
                  p("kbd", null, "⌘"),
                  ce(" + "),
                  p("kbd", null, "Enter")
                ], -1))
              ])) : R("", !0),
              f(t)("preview") ? (S(), C("div", Df, [
                p("div", null, E(f(r)("Preview")), 1),
                o[13] || (o[13] = p("kbd", null, "Space", -1))
              ])) : R("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Mf = { class: "vuefinder__menubar__container" }, Of = ["onClick", "onMouseenter"], Lf = { class: "vuefinder__menubar__label" }, Rf = ["onMouseenter"], jf = ["onClick"], zf = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Vf = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Uf = /* @__PURE__ */ te({
  __name: "MenuBar",
  setup(n) {
    const e = ee(), t = Be(e), { enabled: r } = et(), { t: s } = e?.i18n || { t: (w) => w }, o = e?.fs, i = e?.config, a = X(i.state), c = X(o.selectedItems), l = X(o?.storages || []), u = L(null), h = L(!1), d = V(() => window.opener !== null || window.name !== "" || window.history.length <= 1), g = V(() => [
      {
        id: "file",
        label: s("File"),
        items: [
          {
            id: "new-folder",
            label: s("New Folder"),
            action: () => e?.modal?.open(_r, { items: c.value }),
            hidden: () => !r("newfolder")
          },
          {
            id: "new-file",
            label: s("New File"),
            action: () => e?.modal?.open(po, { items: c.value }),
            hidden: () => !r("newfile")
          },
          {
            type: "separator",
            hidden: () => !r("newfolder") && !r("newfile") || !r("upload")
          },
          {
            id: "upload",
            label: s("Upload"),
            action: () => e?.modal?.open(yr, { items: c.value }),
            hidden: () => !r("upload")
          },
          { type: "separator", hidden: () => !r("search") },
          {
            id: "search",
            label: s("Search"),
            action: () => e.modal.open(gr),
            hidden: () => !r("search")
          },
          { type: "separator", hidden: () => !r("archive") && !r("unarchive") },
          {
            id: "archive",
            label: s("Archive"),
            action: () => {
              c.value.length > 0 && e?.modal?.open(br, { items: c.value });
            },
            enabled: () => c.value.length > 0,
            hidden: () => !r("archive")
          },
          {
            id: "unarchive",
            label: s("Unarchive"),
            action: () => {
              c.value.length === 1 && c.value[0]?.mime_type === "application/zip" && e?.modal?.open(wr, { items: c.value });
            },
            enabled: () => c.value.length === 1 && c.value[0]?.mime_type === "application/zip",
            hidden: () => !r("unarchive")
          },
          { type: "separator", hidden: () => !r("preview") },
          {
            id: "preview",
            label: s("Preview"),
            action: () => {
              c.value.length === 1 && c.value[0]?.type !== "dir" && e?.modal?.open(Kt, {
                storage: o?.path?.get()?.storage,
                item: c.value[0]
              });
            },
            enabled: () => c.value.length === 1 && c.value[0]?.type !== "dir",
            hidden: () => !r("preview")
          },
          // Only show exit option if we can actually close the window
          ...d.value ? [
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
              action: () => o?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: s("Deselect All"),
              action: () => o?.clearSelection(),
              enabled: () => c.value.length > 0
            },
            { type: "separator" }
          ] : [],
          ...r("copy") ? [
            {
              id: "cut",
              label: s("Cut"),
              action: () => {
                c.value.length > 0 && o?.setClipboard(
                  "cut",
                  new Set(c.value.map((w) => w.path))
                );
              },
              enabled: () => c.value.length > 0
            },
            {
              id: "copy",
              label: s("Copy"),
              action: () => {
                c.value.length > 0 && o?.setClipboard(
                  "copy",
                  new Set(c.value.map((w) => w.path))
                );
              },
              enabled: () => c.value.length > 0
            },
            {
              id: "paste",
              label: s("Paste"),
              action: () => {
                const w = o?.getClipboard();
                w?.items?.size > 0 && e?.modal?.open(w.type === "cut" ? Ct : mr, {
                  items: { from: Array.from(w.items), to: o?.path?.get() }
                });
              },
              enabled: () => o?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...r("move") ? [
            {
              id: "move",
              label: s("Move files"),
              action: () => {
                if (c.value.length > 0) {
                  const w = e?.fs, x = {
                    storage: w?.path?.get()?.storage || "",
                    path: w?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(Ct, { items: { from: c.value, to: x } });
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
                const w = c.value[0];
                await Ht(w.path);
              } else {
                const w = o?.path?.get();
                w?.path && await Ht(w.path);
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
                const w = c.value[0];
                o?.path?.get()?.storage;
                const x = e?.adapter?.getDownloadUrl({ path: w.path });
                x && await gd(x);
              }
            },
            enabled: () => c.value.length === 1 && c.value[0]?.type !== "dir"
          },
          { type: "separator", hidden: () => !r("rename") && !r("delete") },
          {
            id: "rename",
            label: s("Rename"),
            action: () => {
              c.value.length === 1 && e?.modal?.open(mn, { items: c.value });
            },
            enabled: () => c.value.length === 1,
            hidden: () => !r("rename")
          },
          {
            id: "delete",
            label: s("Delete"),
            action: () => {
              c.value.length > 0 && e?.modal?.open(pn, { items: c.value });
            },
            enabled: () => c.value.length > 0,
            hidden: () => !r("delete")
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
              e.adapter.invalidateListQuery(o.path.get().path), e.adapter.open(o.path.get().path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: s("Grid View"),
            action: () => i?.set("view", "grid"),
            enabled: () => !0,
            checked: () => a.value?.view === "grid"
          },
          {
            id: "list-view",
            label: s("List View"),
            action: () => i?.set("view", "list"),
            enabled: () => !0,
            checked: () => a.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: s("Tree View"),
            action: () => i?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => a.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: s("Show Thumbnails"),
            action: () => i?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => a.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: s("Show Hidden Files"),
            action: () => i?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => a.value?.showHiddenFiles
          },
          { type: "separator", hidden: () => !r("fullscreen") },
          {
            id: "fullscreen",
            label: s("Full Screen"),
            action: () => i?.toggle("fullScreen"),
            enabled: () => r("fullscreen"),
            checked: () => a.value?.fullScreen,
            hidden: () => !r("fullscreen")
          },
          { type: "separator" },
          {
            id: "persist-path",
            label: s("Persist Path"),
            action: () => {
              i?.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
            },
            enabled: () => !0,
            checked: () => a.value?.persist
          },
          {
            id: "metric-units",
            label: s("Metric Units"),
            action: () => {
              i?.toggle("metricUnits"), e.filesize = i?.get("metricUnits") ? xs : Jn, e.emitter.emit("vf-metric-units-saved");
            },
            enabled: () => !0,
            checked: () => a.value?.metricUnits
          }
        ]
      },
      {
        id: "go",
        label: s("Go"),
        items: [
          ...r("history") ? [
            {
              id: "forward",
              label: s("Forward"),
              action: () => {
                o?.goForward();
                const w = o?.path?.get();
                w?.path && e?.adapter.open(w.path);
              },
              enabled: () => o?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: s("Back"),
              action: () => {
                o?.goBack();
                const w = o?.path?.get();
                w?.path && e?.adapter.open(w.path);
              },
              enabled: () => o?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: s("Open containing folder"),
            action: () => {
              const w = o?.path?.get();
              if (w?.breadcrumb && w.breadcrumb.length > 1) {
                const $ = w.breadcrumb[w.breadcrumb.length - 2]?.path ?? `${w.storage}://`;
                e?.adapter.open($);
              }
            },
            enabled: () => {
              const w = o?.path?.get();
              return w?.breadcrumb && w.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(l.value || []).map((w) => ({
            id: `storage-${w}`,
            label: w,
            action: () => {
              const x = `${w}://`;
              e?.adapter.open(x);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: s("Go to Folder"),
            action: async () => {
              const w = prompt(s("Enter folder path:"));
              if (w) {
                if (!w.includes("://")) {
                  alert(s("Invalid path format. Path must be in format: storage://path/to/folder"));
                  return;
                }
                const x = w.indexOf("://"), $ = w.slice(0, x);
                if (!l.value || !l.value.includes($)) {
                  alert(s('Invalid storage. Storage "%s" is not available.', $));
                  return;
                }
                try {
                  await e?.adapter.open(w);
                } catch (k) {
                  const P = Ue(k, s("Failed to navigate to folder"));
                  t.error(P), e.fs.setLoading(!1);
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
            action: () => e?.modal?.open(co),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: s("Shortcuts"),
            action: () => e?.modal?.open(Ff),
            enabled: () => !0
          }
        ]
      }
    ]), _ = (w) => {
      u.value === w ? v() : (u.value = w, h.value = !0);
    }, m = (w) => {
      h.value && (u.value = w);
    }, v = () => {
      u.value = null, h.value = !1;
    }, b = (w) => {
      v(), w();
    }, y = (w) => {
      w.target.closest(".vuefinder__menubar") || v();
    };
    return he(() => {
      document.addEventListener("click", y);
    }), Ie(() => {
      document.removeEventListener("click", y);
    }), (w, x) => (S(), C("div", {
      class: "vuefinder__menubar",
      onClick: x[0] || (x[0] = ae(() => {
      }, ["stop"]))
    }, [
      p("div", Mf, [
        (S(!0), C(de, null, ge(g.value, ($) => (S(), C("div", {
          key: $.id,
          class: ne(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": u.value === $.id }]),
          onClick: (k) => _($.id),
          onMouseenter: (k) => m($.id)
        }, [
          p("span", Lf, E($.label), 1),
          u.value === $.id ? (S(), C("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (k) => m($.id)
          }, [
            (S(!0), C(de, null, ge($.items, (k) => (S(), C("div", {
              key: k.id || k.type,
              class: ne(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": k.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": k.enabled && !k.enabled(),
                "vuefinder__menubar__dropdown__item--checked": k.checked && k.checked(),
                "vuefinder__menubar__dropdown__item--hidden": k.hidden && k.hidden()
              }]),
              onClick: ae((P) => k.type !== "separator" && k.enabled && k.enabled() ? b(k.action) : null, ["stop"])
            }, [
              k.type !== "separator" ? (S(), C("span", zf, E(k.label), 1)) : R("", !0),
              k.checked && k.checked() ? (S(), C("span", Vf, " ✓ ")) : R("", !0)
            ], 10, jf))), 128))
          ], 40, Rf)) : R("", !0)
        ], 42, Of))), 128))
      ])
    ]));
  }
}), Bf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Hf(n, e) {
  return S(), C("svg", Bf, [...e[0] || (e[0] = [
    p("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Wf = { render: Hf }, qf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Kf(n, e) {
  return S(), C("svg", qf, [...e[0] || (e[0] = [
    p("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Gf = { render: Kf }, Yf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Xf(n, e) {
  return S(), C("svg", Yf, [...e[0] || (e[0] = [
    p("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Qf = { render: Xf }, Jf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Zf(n, e) {
  return S(), C("svg", Jf, [...e[0] || (e[0] = [
    p("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const ep = { render: Zf }, tp = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function np(n, e) {
  return S(), C("svg", tp, [...e[0] || (e[0] = [
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const rp = { render: np }, sp = { class: "vuefinder__toolbar" }, op = { class: "vuefinder__toolbar__actions" }, ip = ["title"], ap = ["title"], lp = ["title"], up = ["title"], cp = ["title"], dp = ["title"], hp = ["title"], fp = { class: "vuefinder__toolbar__controls" }, pp = ["title"], mp = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, vp = ["title"], gp = { class: "relative" }, _p = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, yp = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, wp = { class: "vuefinder__toolbar__dropdown-content" }, bp = { class: "vuefinder__toolbar__dropdown-section" }, xp = { class: "vuefinder__toolbar__dropdown-label" }, Sp = { class: "vuefinder__toolbar__dropdown-row" }, $p = { value: "name" }, kp = { value: "size" }, Cp = { value: "modified" }, Pp = { value: "" }, Ep = { value: "asc" }, Tp = { value: "desc" }, Ap = { class: "vuefinder__toolbar__dropdown-section" }, Np = { class: "vuefinder__toolbar__dropdown-label" }, Ip = { class: "vuefinder__toolbar__dropdown-options" }, Dp = { class: "vuefinder__toolbar__dropdown-option" }, Fp = { class: "vuefinder__toolbar__option-text" }, Mp = { class: "vuefinder__toolbar__dropdown-option" }, Op = { class: "vuefinder__toolbar__option-text" }, Lp = { class: "vuefinder__toolbar__dropdown-option" }, Rp = { class: "vuefinder__toolbar__option-text" }, jp = { class: "vuefinder__toolbar__dropdown-toggle" }, zp = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Vp = { class: "vuefinder__toolbar__dropdown-reset" }, Up = ["title"], Bp = ["title"], Hp = /* @__PURE__ */ te({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = ee(), { enabled: t } = et(), { t: r } = e.i18n, s = e.fs, o = e.config, i = X(o.state), a = X(s.selectedItems), c = X(s.sort), l = X(s.filter);
    ie(
      () => i.value.fullScreen,
      () => {
        const v = document.querySelector("body");
        v && (v.style.overflow = i.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const u = L(!1), h = (v) => {
      v.target.closest(".vuefinder__toolbar__dropdown-container") || (u.value = !1);
    };
    he(() => {
      const v = document.querySelector("body");
      v && i.value.fullScreen && setTimeout(() => v.style.overflow = "hidden"), document.addEventListener("click", h);
    }), Ie(() => {
      document.removeEventListener("click", h);
    });
    const d = L({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: i.value.showHiddenFiles
      // Initialize with config store default
    });
    ie(
      () => d.value.sortBy,
      (v) => {
        if (!d.value.sortOrder) {
          s.clearSort();
          return;
        }
        v === "name" ? s.setSort("basename", d.value.sortOrder) : v === "size" ? s.setSort("file_size", d.value.sortOrder) : v === "modified" && s.setSort("last_modified", d.value.sortOrder);
      }
    ), ie(
      () => d.value.sortOrder,
      (v) => {
        if (!v) {
          s.clearSort();
          return;
        }
        d.value.sortBy === "name" ? s.setSort("basename", v) : d.value.sortBy === "size" ? s.setSort("file_size", v) : d.value.sortBy === "modified" && s.setSort("last_modified", v);
      }
    ), ie(
      c,
      (v) => {
        v.active ? (v.column === "basename" ? d.value.sortBy = "name" : v.column === "file_size" ? d.value.sortBy = "size" : v.column === "last_modified" && (d.value.sortBy = "modified"), d.value.sortOrder = v.order) : d.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ie(
      () => d.value.filterKind,
      (v) => {
        s.setFilter(v, i.value.showHiddenFiles);
      }
    ), ie(
      () => d.value.showHidden,
      (v) => {
        o.set("showHiddenFiles", v), s.setFilter(d.value.filterKind, v);
      }
    ), ie(
      l,
      (v) => {
        d.value.filterKind = v.kind;
      },
      { immediate: !0 }
    ), ie(
      () => i.value.showHiddenFiles,
      (v) => {
        d.value.showHidden = v, s.setFilter(d.value.filterKind, v);
      },
      { immediate: !0 }
    );
    const g = () => o.set("view", i.value.view === "grid" ? "list" : "grid"), _ = V(() => l.value.kind !== "all" || !i.value.showHiddenFiles || c.value.active), m = () => {
      d.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, o.set("showHiddenFiles", !0), s.clearSort(), s.clearFilter();
    };
    return (v, b) => (S(), C("div", sp, [
      p("div", op, [
        f(t)("newfolder") ? (S(), C("div", {
          key: 0,
          class: "mx-1.5",
          title: f(r)("New Folder"),
          onClick: b[0] || (b[0] = (y) => f(e).modal.open(_r, { items: f(a) }))
        }, [
          B(f(ho))
        ], 8, ip)) : R("", !0),
        f(t)("newfile") ? (S(), C("div", {
          key: 1,
          class: "mx-1.5",
          title: f(r)("New File"),
          onClick: b[1] || (b[1] = (y) => f(e).modal.open(po, { items: f(a) }))
        }, [
          B(f(fo))
        ], 8, ap)) : R("", !0),
        f(t)("rename") ? (S(), C("div", {
          key: 2,
          class: "mx-1.5",
          title: f(r)("Rename"),
          onClick: b[2] || (b[2] = (y) => f(a).length !== 1 || f(e).modal.open(mn, { items: f(a) }))
        }, [
          B(f(no), {
            class: ne(f(a).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, lp)) : R("", !0),
        f(t)("delete") ? (S(), C("div", {
          key: 3,
          class: "mx-1.5",
          title: f(r)("Delete"),
          onClick: b[3] || (b[3] = (y) => !f(a).length || f(e).modal.open(pn, { items: f(a) }))
        }, [
          B(f(to), {
            class: ne(f(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, up)) : R("", !0),
        f(t)("upload") ? (S(), C("div", {
          key: 4,
          class: "mx-1.5",
          title: f(r)("Upload"),
          onClick: b[4] || (b[4] = (y) => f(e).modal.open(yr, { items: f(a) }))
        }, [
          B(f(mo))
        ], 8, cp)) : R("", !0),
        f(t)("unarchive") && f(a).length === 1 && f(a)[0].mime_type === "application/zip" ? (S(), C("div", {
          key: 5,
          class: "mx-1.5",
          title: f(r)("Unarchive"),
          onClick: b[5] || (b[5] = (y) => !f(a).length || f(e).modal.open(wr, { items: f(a) }))
        }, [
          B(f(vo), {
            class: ne(f(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, dp)) : R("", !0),
        f(t)("archive") ? (S(), C("div", {
          key: 6,
          class: "mx-1.5",
          title: f(r)("Archive"),
          onClick: b[6] || (b[6] = (y) => !f(a).length || f(e).modal.open(br, { items: f(a) }))
        }, [
          B(f(go), {
            class: ne(f(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, hp)) : R("", !0)
      ]),
      p("div", fp, [
        f(t)("search") ? (S(), C("div", {
          key: 0,
          class: "mx-1.5",
          title: f(r)("Search Files"),
          onClick: b[7] || (b[7] = (y) => f(e).modal.open(gr))
        }, [
          B(f(vr), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, pp)) : R("", !0),
        p("div", mp, [
          p("div", {
            title: f(r)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: b[8] || (b[8] = (y) => u.value = !u.value)
          }, [
            p("div", gp, [
              B(f(rp), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              _.value ? (S(), C("div", _p)) : R("", !0)
            ])
          ], 8, vp),
          u.value ? (S(), C("div", yp, [
            p("div", wp, [
              p("div", bp, [
                p("div", xp, E(f(r)("Sorting")), 1),
                p("div", Sp, [
                  ve(p("select", {
                    "onUpdate:modelValue": b[9] || (b[9] = (y) => d.value.sortBy = y),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    p("option", $p, E(f(r)("Name")), 1),
                    p("option", kp, E(f(r)("Size")), 1),
                    p("option", Cp, E(f(r)("Date")), 1)
                  ], 512), [
                    [Ln, d.value.sortBy]
                  ]),
                  ve(p("select", {
                    "onUpdate:modelValue": b[10] || (b[10] = (y) => d.value.sortOrder = y),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    p("option", Pp, E(f(r)("None")), 1),
                    p("option", Ep, E(f(r)("Asc")), 1),
                    p("option", Tp, E(f(r)("Desc")), 1)
                  ], 512), [
                    [Ln, d.value.sortOrder]
                  ])
                ])
              ]),
              p("div", Ap, [
                p("div", Np, E(f(r)("Show")), 1),
                p("div", Ip, [
                  p("label", Dp, [
                    ve(p("input", {
                      "onUpdate:modelValue": b[11] || (b[11] = (y) => d.value.filterKind = y),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [bn, d.value.filterKind]
                    ]),
                    p("span", Fp, E(f(r)("All items")), 1)
                  ]),
                  p("label", Mp, [
                    ve(p("input", {
                      "onUpdate:modelValue": b[12] || (b[12] = (y) => d.value.filterKind = y),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [bn, d.value.filterKind]
                    ]),
                    p("span", Op, E(f(r)("Files only")), 1)
                  ]),
                  p("label", Lp, [
                    ve(p("input", {
                      "onUpdate:modelValue": b[13] || (b[13] = (y) => d.value.filterKind = y),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [bn, d.value.filterKind]
                    ]),
                    p("span", Rp, E(f(r)("Folders only")), 1)
                  ])
                ])
              ]),
              p("div", jp, [
                p("label", zp, E(f(r)("Show hidden files")), 1),
                ve(p("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": b[14] || (b[14] = (y) => d.value.showHidden = y),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [un, d.value.showHidden]
                ])
              ]),
              p("div", Vp, [
                p("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: m
                }, E(f(r)("Reset")), 1)
              ])
            ])
          ])) : R("", !0)
        ]),
        f(t)("fullscreen") ? (S(), C("div", {
          key: 1,
          class: "mx-1.5",
          title: f(r)("Toggle Full Screen"),
          onClick: b[15] || (b[15] = (y) => f(o).toggle("fullScreen"))
        }, [
          f(i).fullScreen ? (S(), U(f(Gf), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (S(), U(f(Wf), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Up)) : R("", !0),
        p("div", {
          class: "mx-1.5",
          title: f(r)("Change View"),
          onClick: b[16] || (b[16] = (y) => g())
        }, [
          f(i).view === "grid" ? (S(), U(f(Qf), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : R("", !0),
          f(i).view === "list" ? (S(), U(f(ep), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : R("", !0)
        ], 8, Bp)
      ])
    ]));
  }
}), Wp = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function qp(n, e) {
  return S(), C("svg", Wp, [...e[0] || (e[0] = [
    p("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Kp = { render: qp }, Gp = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Yp(n, e) {
  return S(), C("svg", Gp, [...e[0] || (e[0] = [
    p("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Xp = { render: Yp }, Qp = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Jp(n, e) {
  return S(), C("svg", Qp, [...e[0] || (e[0] = [
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Zp = { render: Jp }, em = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function tm(n, e) {
  return S(), C("svg", em, [...e[0] || (e[0] = [
    p("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const nm = { render: tm }, rm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function sm(n, e) {
  return S(), C("svg", rm, [...e[0] || (e[0] = [
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const om = { render: sm }, im = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function am(n, e) {
  return S(), C("svg", im, [...e[0] || (e[0] = [
    p("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    p("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const lm = { render: am }, um = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function cm(n, e) {
  return S(), C("svg", um, [...e[0] || (e[0] = [
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const dm = { render: cm };
function Gt(n, e = []) {
  const t = "vfDragEnterCounter", r = n.fs, s = X(r.selectedItems);
  function o(h, d) {
    return !!(!h || h.type !== "dir" || h.path.startsWith(d) || s.value.some((_) => _.path === d ? !1 : !!h.path.startsWith(_.path)));
  }
  function i(h, d) {
    if (h.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none");
      return;
    }
    h.preventDefault();
    const _ = r.getDraggedItem();
    o(d, _) ? h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none") : (h.dataTransfer && (h.dataTransfer.dropEffect = "copy", h.dataTransfer.effectAllowed = "all"), h.currentTarget.classList.add(...e));
  }
  function a(h) {
    if (h.isExternalDrag || !(n.features?.move ?? !1))
      return;
    h.preventDefault();
    const g = h.currentTarget, _ = Number(g.dataset[t] || 0);
    g.dataset[t] = String(_ + 1);
  }
  function c(h) {
    if (h.isExternalDrag || !(n.features?.move ?? !1))
      return;
    h.preventDefault();
    const g = h.currentTarget, m = Number(g.dataset[t] || 0) - 1;
    m <= 0 ? (delete g.dataset[t], g.classList.remove(...e)) : g.dataset[t] = String(m);
  }
  function l(h, d) {
    if (h.isExternalDrag || !(n.features?.move ?? !1) || !d) return;
    h.preventDefault();
    const _ = h.currentTarget;
    delete _.dataset[t], _.classList.remove(...e);
    const m = h.dataTransfer?.getData("items") || "[]", b = JSON.parse(m).map(
      (y) => r.sortedFiles.get().find((w) => w.path === y)
    );
    r.clearDraggedItem(), n.modal.open(Ct, { items: { from: b, to: d } });
  }
  function u(h) {
    return {
      dragover: (d) => i(d, h),
      dragenter: a,
      dragleave: c,
      drop: (d) => l(d, h)
    };
  }
  return { events: u };
}
const hm = { class: "vuefinder__breadcrumb__container" }, fm = ["title"], pm = ["title"], mm = ["title"], vm = ["title"], gm = { class: "vuefinder__breadcrumb__path-container" }, _m = { class: "vuefinder__breadcrumb__list" }, ym = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, wm = { class: "relative" }, bm = ["title", "onClick"], xm = ["title"], Sm = { class: "vuefinder__breadcrumb__path-mode" }, $m = { class: "vuefinder__breadcrumb__path-mode-content" }, km = ["title"], Cm = { class: "vuefinder__breadcrumb__path-text" }, Pm = ["title"], Em = ["data-theme"], Tm = ["onClick"], Am = { class: "vuefinder__breadcrumb__hidden-item-content" }, Nm = { class: "vuefinder__breadcrumb__hidden-item-text" }, Im = /* @__PURE__ */ te({
  __name: "Breadcrumb",
  setup(n) {
    const e = ee(), t = Be(e), { t: r } = e.i18n, s = e.fs, o = e.config, i = X(o.state), a = X(s.path), c = X(s.loading), l = L(null), u = oo(0, 100), h = L(5), d = L(!1), g = L(!1), _ = V(() => a.value?.breadcrumb ?? []);
    function m(D, I) {
      return D.length > I ? [D.slice(-I), D.slice(0, -I)] : [D, []];
    }
    const v = V(
      () => m(_.value, h.value)[0]
    ), b = V(
      () => m(_.value, h.value)[1]
    );
    ie(u, () => {
      if (!l.value) return;
      const D = l.value.children;
      let I = 0, N = 0;
      const O = 5, z = 1;
      h.value = O, nt(() => {
        for (let G = D.length - 1; G >= 0; G--) {
          const se = D[G];
          if (I + se.offsetWidth > u.value - 40)
            break;
          I += parseInt(se.offsetWidth.toString(), 10), N++;
        }
        N < z && (N = z), N > O && (N = O), h.value = N;
      });
    });
    const y = () => {
      l.value && (u.value = l.value.offsetWidth);
    }, w = L(null);
    he(() => {
      w.value = new ResizeObserver(y), l.value && w.value.observe(l.value);
    }), Ie(() => {
      w.value && w.value.disconnect();
    });
    const x = Gt(e, ["vuefinder__drag-over"]);
    function $(D = null) {
      D ??= _.value.length - 2;
      const I = {
        basename: a.value?.storage ?? "local",
        extension: "",
        path: (a.value?.storage ?? "local") + "://",
        storage: a.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return _.value[D] ?? I;
    }
    const k = () => {
      e.adapter.invalidateListQuery(a.value.path), e.adapter.open(a.value.path);
    }, P = () => {
      v.value.length > 0 && e.adapter.open(
        _.value[_.value.length - 2]?.path ?? (a.value?.storage ?? "local") + "://"
      );
    }, A = (D) => {
      e.adapter.open(D.path), d.value = !1;
    }, M = () => {
      d.value && (d.value = !1);
    }, j = {
      mounted(D, I) {
        D.clickOutsideEvent = function(N) {
          D === N.target || D.contains(N.target) || I.value();
        }, document.body.addEventListener("click", D.clickOutsideEvent);
      },
      beforeUnmount(D) {
        document.body.removeEventListener("click", D.clickOutsideEvent);
      }
    }, F = () => {
      o.toggle("showTreeView");
    }, q = L({
      x: 0,
      y: 0
    }), T = (D, I = null) => {
      if (D.currentTarget instanceof HTMLElement) {
        const { x: N, y: O, height: z } = D.currentTarget.getBoundingClientRect();
        q.value = { x: N, y: O + z };
      }
      d.value = I ?? !d.value;
    }, Y = () => {
      g.value = !g.value;
    }, K = async () => {
      await Ht(a.value?.path || ""), t.success(r("Path copied to clipboard"));
    }, Q = () => {
      g.value = !1;
    };
    return (D, I) => (S(), C("div", hm, [
      p("span", {
        title: f(r)("Toggle Tree View")
      }, [
        B(f(lm), {
          class: ne(["vuefinder__breadcrumb__toggle-tree", f(i).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: F
        }, null, 8, ["class"])
      ], 8, fm),
      p("span", {
        title: f(r)("Go up a directory")
      }, [
        B(f(Xp), Qe({
          class: _.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, ct(_.value.length ? f(x).events($()) : {}), { onClick: P }), null, 16, ["class"])
      ], 8, pm),
      f(s).isLoading() ? (S(), C("span", {
        key: 1,
        title: f(r)("Cancel")
      }, [
        B(f(Zp), {
          onClick: I[0] || (I[0] = (N) => f(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, vm)) : (S(), C("span", {
        key: 0,
        title: f(r)("Refresh")
      }, [
        B(f(Kp), { onClick: k })
      ], 8, mm)),
      ve(p("div", gm, [
        p("div", null, [
          B(f(nm), Qe({ class: "vuefinder__breadcrumb__home-icon" }, ct(f(x).events($(-1))), {
            onClick: I[1] || (I[1] = ae((N) => f(e).adapter.open(f(a).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        p("div", _m, [
          b.value.length ? ve((S(), C("div", ym, [
            I[3] || (I[3] = p("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            p("div", wm, [
              p("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: I[2] || (I[2] = (N) => T(N, !0)),
                onClick: ae(T, ["stop"])
              }, [
                B(f(uo), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [j, M]
          ]) : R("", !0)
        ]),
        p("div", {
          ref_key: "breadcrumbContainer",
          ref: l,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (S(!0), C(de, null, ge(v.value, (N, O) => (S(), C("div", { key: O }, [
            I[4] || (I[4] = p("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            p("span", Qe({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: N.basename
            }, ct(f(x).events(N), !0), {
              onClick: ae((z) => f(e).adapter.open(N.path), ["stop"])
            }), E(N.name), 17, bm)
          ]))), 128))
        ], 512),
        f(o).get("loadingIndicator") === "circular" && f(c) ? (S(), U(f(_n), { key: 0 })) : R("", !0),
        p("span", {
          title: f(r)("Toggle Path Copy Mode"),
          onClick: Y
        }, [
          B(f(dm), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, xm)
      ], 512), [
        [it, !g.value]
      ]),
      ve(p("div", Sm, [
        p("div", $m, [
          p("div", {
            title: f(r)("Copy Path")
          }, [
            B(f(cr), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: K
            })
          ], 8, km),
          p("div", Cm, E(f(a).path), 1),
          p("div", {
            title: f(r)("Exit")
          }, [
            B(f(om), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: Q
            })
          ], 8, Pm)
        ])
      ], 512), [
        [it, g.value]
      ]),
      (S(), U(cn, { to: "body" }, [
        p("div", null, [
          ve(p("div", {
            style: Je({
              position: "absolute",
              top: q.value.y + "px",
              left: q.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": f(e).theme.current
          }, [
            (S(!0), C(de, null, ge(b.value, (N, O) => (S(), C("div", Qe({
              key: O,
              class: "vuefinder__breadcrumb__hidden-item"
            }, ct(f(x).events(N), !0), {
              onClick: (z) => A(N)
            }), [
              p("div", Am, [
                p("span", null, [
                  B(f(rt), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                p("span", Nm, E(N.name), 1)
              ])
            ], 16, Tm))), 128))
          ], 12, Em), [
            [it, d.value]
          ])
        ])
      ]))
    ]));
  }
}), Dm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Fm(n, e) {
  return S(), C("svg", Dm, [...e[0] || (e[0] = [
    p("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const us = { render: Fm }, Mm = { class: "vuefinder__drag-item__container" }, Om = { class: "vuefinder__drag-item__count" }, Lm = /* @__PURE__ */ te({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, r) => (S(), C("div", Mm, [
      e.count > 1 ? (S(), U(f(us), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : R("", !0),
      B(f(us), { class: "vuefinder__drag-item__icon" }),
      p("div", Om, E(e.count), 1)
    ]));
  }
}), Rm = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, cs = /* @__PURE__ */ te({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(n) {
    const e = n, t = ee(), r = X(t.config.state), s = V(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), o = V(() => {
      const a = s.value, c = r.value?.listIconSize, l = r.value?.gridIconSize;
      return r.value?.gridItemWidth, r.value?.gridItemHeight, e.view === "list" || a === "small" ? {
        "--vf-icon-size": `${c ?? 16}px`
      } : {
        "--vf-icon-size": `${l ?? 48}px`
      };
    }), i = {
      app: t,
      config: r.value,
      item: e.item,
      view: e.view
    };
    return (a, c) => (S(), C("div", {
      class: ne(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": s.value === "small",
        "vuefinder__item-icon--large": s.value === "large",
        "vuefinder__item-icon--grid": n.view === "grid",
        "vuefinder__item-icon--list": n.view === "list"
      }]),
      style: Je(o.value)
    }, [
      Oe(a.$slots, "icon", dt(ht(i)), () => [
        n.item.type === "dir" ? (S(), U(f(rt), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (S(), U(f(Bt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (S(), C("div", Rm, E(n.item.extension.substring(0, 3)), 1)) : R("", !0)
      ])
    ], 6));
  }
}), jm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function zm(n, e) {
  return S(), C("svg", jm, [...e[0] || (e[0] = [
    p("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    p("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const ds = { render: zm }, Vm = ["data-key", "data-row", "data-col", "draggable"], Um = { key: 0 }, Bm = { class: "vuefinder__explorer__item-grid-content" }, Hm = ["data-src", "alt"], Wm = { class: "vuefinder__explorer__item-title" }, qm = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Km = { class: "vuefinder__explorer__item-list-name" }, Gm = { class: "vuefinder__explorer__item-list-icon" }, Ym = { class: "vuefinder__explorer__item-name" }, Xm = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Qm = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Jm = { key: 0 }, Zm = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, ev = /* @__PURE__ */ te({
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
    const t = n, r = e, s = ee(), o = s.fs, i = s.config, a = V(() => {
      const F = s.selectionFilterType;
      return !F || F === "both" ? !0 : F === "files" && t.item.type === "file" || F === "dirs" && t.item.type === "dir";
    }), c = V(() => {
      const F = s.selectionFilterMimeIncludes;
      return !F || !F.length || t.item.type === "dir" ? !0 : t.item.mime_type ? F.some((q) => t.item.mime_type?.startsWith(q)) : !1;
    }), l = V(() => a.value && c.value), u = V(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      l.value ? "" : "vf-explorer-item--unselectable"
    ]), h = V(() => ({
      opacity: t.isDragging || o.isCut(t.item.path) || !l.value ? 0.5 : ""
    })), d = L(null);
    let g = !1, _ = null, m = null, v = !1;
    const { enabled: b } = et(), y = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), w = V(() => y ? !1 : b("move")), x = () => {
      _ && (clearTimeout(_), _ = null), m = null;
    }, $ = (F) => {
      x(), m = F, v = !1, F.stopPropagation(), _ = setTimeout(() => {
        !m || _ === null || (v = !0, m.cancelable && m.preventDefault(), m.stopPropagation(), r("contextmenu", m), x());
      }, 500);
    }, k = (F) => {
      if (v) {
        F.preventDefault(), F.stopPropagation(), x();
        return;
      }
      setTimeout(() => {
        v || (x(), j(F));
      }, 100);
    }, P = (F) => {
      if (!m) return;
      const q = m.touches[0] || m.changedTouches[0], T = F.touches[0] || F.changedTouches[0];
      if (q && T) {
        const Y = Math.abs(T.clientX - q.clientX), K = Math.abs(T.clientY - q.clientY);
        (Y > 15 || K > 15) && x();
      }
    }, A = (F) => {
      y && F.type !== "click" || r("click", F);
    }, M = (F) => {
      if (v)
        return F.preventDefault(), F.stopPropagation(), !1;
      r("dragstart", F);
    }, j = (F) => {
      if (!g)
        g = !0, r("click", F), d.value = setTimeout(() => {
          g = !1;
        }, 300);
      else
        return g = !1, r("dblclick", F), !1;
    };
    return (F, q) => (S(), C("div", {
      class: ne(u.value),
      style: Je(h.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: w.value,
      onTouchstartCapture: q[1] || (q[1] = (T) => $(T)),
      onTouchendCapture: q[2] || (q[2] = (T) => k(T)),
      onTouchmoveCapture: P,
      onTouchcancelCapture: q[3] || (q[3] = () => x()),
      onClick: A,
      onDblclick: q[4] || (q[4] = (T) => r("dblclick", T)),
      onContextmenu: q[5] || (q[5] = ae((T) => r("contextmenu", T), ["prevent", "stop"])),
      onDragstart: M,
      onDragend: q[6] || (q[6] = (T) => r("dragend", T))
    }, [
      n.view === "grid" ? (S(), C("div", Um, [
        f(o).isReadOnly(n.item) ? (S(), U(f(ds), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : R("", !0),
        p("div", Bm, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (S(), C("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? f(s).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: q[0] || (q[0] = (T) => T.preventDefault())
          }, null, 40, Hm)) : (S(), U(cs, {
            key: 1,
            item: n.item,
            ext: !0,
            view: n.view
          }, {
            icon: oe((T) => [
              Oe(F.$slots, "icon", dt(ht(T)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        p("span", Wm, E(f(Yn)(n.item.basename)), 1)
      ])) : (S(), C("div", qm, [
        p("div", Km, [
          p("div", Gm, [
            B(cs, {
              item: n.item,
              view: n.view
            }, {
              icon: oe((T) => [
                Oe(F.$slots, "icon", dt(ht(T)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          p("span", Ym, E(n.item.basename), 1),
          p("div", null, [
            f(o).isReadOnly(n.item) ? (S(), U(f(ds), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : R("", !0)
          ])
        ]),
        n.showPath ? (S(), C("div", Xm, E(n.item.path), 1)) : R("", !0),
        n.showPath ? R("", !0) : (S(), C("div", Qm, [
          n.item.file_size ? (S(), C("div", Jm, E(f(s).filesize(n.item.file_size)), 1)) : R("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (S(), C("div", Zm, E(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : R("", !0)
      ])),
      f(b)("pinned") && f(i).get("pinnedFolders").find((T) => T.path === n.item.path) ? (S(), U(f(dr), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : R("", !0)
    ], 46, Vm));
  }
}), tv = ["data-row"], hs = /* @__PURE__ */ te({
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
    const t = n, r = e, s = V(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), o = V(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), i = V(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (a, c) => (S(), C("div", {
      class: ne(s.value),
      "data-row": n.rowIndex,
      style: Je(o.value)
    }, [
      p("div", {
        class: ne(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Je(i.value)
      }, [
        (S(!0), C(de, null, ge(n.items, (l, u) => (S(), U(ev, Qe({
          key: l.path,
          item: l,
          view: n.view,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(l.path),
          "is-dragging": n.isDraggingItem(l.path),
          "row-index": n.rowIndex,
          "col-index": u,
          "explorer-id": n.explorerId
        }, ct(n.dragNDropEvents(l)), {
          onClick: c[0] || (c[0] = (h) => r("click", h)),
          onDblclick: c[1] || (c[1] = (h) => r("dblclick", h)),
          onContextmenu: c[2] || (c[2] = (h) => r("contextmenu", h)),
          onDragstart: c[3] || (c[3] = (h) => r("dragstart", h)),
          onDragend: c[4] || (c[4] = (h) => r("dragend", h))
        }), {
          icon: oe((h) => [
            Oe(a.$slots, "icon", Qe({ ref_for: !0 }, h))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, tv));
  }
}), nv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function rv(n, e) {
  return S(), C("svg", nv, [...e[0] || (e[0] = [
    p("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const sv = { render: rv }, ov = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function iv(n, e) {
  return S(), C("svg", ov, [...e[0] || (e[0] = [
    p("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const av = { render: iv }, On = /* @__PURE__ */ te({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (S(), C("div", null, [
      n.direction === "asc" ? (S(), U(f(sv), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : R("", !0),
      n.direction === "desc" ? (S(), U(f(av), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : R("", !0)
    ]));
  }
}), lv = { class: "vuefinder__explorer__header" }, uv = /* @__PURE__ */ te({
  __name: "ExplorerHeader",
  setup(n) {
    const e = ee(), t = e.fs, { t: r } = e.i18n, s = X(t.sort);
    return (o, i) => (S(), C("div", lv, [
      p("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: i[0] || (i[0] = (a) => f(t).toggleSort("basename"))
      }, [
        ce(E(f(r)("Name")) + " ", 1),
        ve(B(On, {
          direction: f(s).order
        }, null, 8, ["direction"]), [
          [it, f(s).active && f(s).column === "basename"]
        ])
      ]),
      p("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: i[1] || (i[1] = (a) => f(t).toggleSort("file_size"))
      }, [
        ce(E(f(r)("Size")) + " ", 1),
        ve(B(On, {
          direction: f(s).order
        }, null, 8, ["direction"]), [
          [it, f(s).active && f(s).column === "file_size"]
        ])
      ]),
      p("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: i[2] || (i[2] = (a) => f(t).toggleSort("last_modified"))
      }, [
        ce(E(f(r)("Date")) + " ", 1),
        ve(B(On, {
          direction: f(s).order
        }, null, 8, ["direction"]), [
          [it, f(s).active && f(s).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function cv(n, e) {
  const {
    scrollContainer: t,
    itemWidth: r = 100,
    rowHeight: s,
    overscan: o = 2,
    containerPadding: i = 48,
    lockItemsPerRow: a
  } = e, c = n, l = () => typeof s == "number" ? s : s.value, u = () => r ? typeof r == "number" ? r : r.value : 100, h = () => i ? typeof i == "number" ? i : i.value : 0, d = L(0), g = L(6), _ = L(600);
  let m = null;
  const v = V(() => Math.ceil(c.value.length / g.value)), b = V(() => v.value * l()), y = V(() => {
    const F = l(), q = Math.max(0, Math.floor(d.value / F) - o), T = Math.min(
      v.value,
      Math.ceil((d.value + _.value) / F) + o
    );
    return { start: q, end: T };
  }), w = V(() => {
    const { start: F, end: q } = y.value;
    return Array.from({ length: q - F }, (T, Y) => F + Y);
  }), x = () => _.value, $ = () => typeof a == "object" ? a.value : !1, k = () => {
    if ($()) {
      g.value = 1;
      return;
    }
    if (t.value) {
      const F = h(), q = t.value.clientWidth - F, T = u();
      T > 0 && (g.value = Math.max(Math.floor(q / T), 2));
    }
  }, P = (F) => {
    const q = F.target;
    d.value = q.scrollTop;
  };
  ie(
    () => c.value.length,
    () => {
      k();
    }
  ), r && typeof r != "number" && ie(r, () => {
    k();
  }), i && typeof i != "number" && ie(i, () => {
    k();
  }), s && typeof s != "number" && ie(s, () => {
  });
  const A = (F, q) => {
    if (!F || !Array.isArray(F))
      return [];
    const T = q * g.value;
    return F.slice(T, T + g.value);
  }, M = (F, q, T, Y, K) => {
    if (!F || !Array.isArray(F))
      return [];
    const Q = [];
    for (let D = q; D <= T; D++)
      for (let I = Y; I <= K; I++) {
        const N = D * g.value + I;
        N < F.length && F[N] && Q.push(F[N]);
      }
    return Q;
  }, j = (F) => ({
    row: Math.floor(F / g.value),
    col: F % g.value
  });
  return he(async () => {
    await nt(), t.value && (_.value = t.value.clientHeight || 600), k(), window.addEventListener("resize", () => {
      t.value && (_.value = t.value.clientHeight || 600), k();
    }), t.value && "ResizeObserver" in window && (m = new ResizeObserver((F) => {
      const q = F[0];
      q && (_.value = Math.round(q.contentRect.height)), k();
    }), m.observe(t.value));
  }), Ie(() => {
    window.removeEventListener("resize", k), m && (m.disconnect(), m = null);
  }), {
    scrollTop: d,
    itemsPerRow: g,
    totalRows: v,
    totalHeight: b,
    visibleRange: y,
    visibleRows: w,
    updateItemsPerRow: k,
    handleScroll: P,
    getRowItems: A,
    getItemsInRange: M,
    getItemPosition: j,
    getContainerHeight: x
  };
}
function dv(n) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: r,
    getKey: s,
    selectionObject: o,
    rowHeight: i,
    itemWidth: a,
    osInstance: c
  } = n, l = () => typeof a == "number" ? a : a.value, u = Math.floor(Math.random() * 2 ** 32).toString(), h = ee(), d = h.fs, g = X(d.selectedKeys), _ = X(d.sortedFiles), m = V(() => {
    const I = /* @__PURE__ */ new Map();
    return _.value && _.value.forEach((N) => {
      I.set(s(N), N);
    }), I;
  }), v = L(/* @__PURE__ */ new Set()), b = L(!1), y = L(!1), w = (I) => I.map((N) => N.getAttribute("data-key")).filter((N) => !!N), x = (I) => {
    I.selection.clearSelection(!0, !0);
  }, $ = (I) => {
    if (g.value && g.value.size > 0) {
      const N = document.querySelectorAll(`.file-item-${u}[data-key]`), O = /* @__PURE__ */ new Map();
      N.forEach((G) => {
        const se = G.getAttribute("data-key");
        se && O.set(se, G);
      });
      const z = [];
      g.value.forEach((G) => {
        const se = O.get(G);
        se && k(G) && z.push(se);
      }), z.forEach((G) => {
        I.selection.select(G, !0);
      });
    }
  }, k = (I) => {
    const N = m.value.get(I);
    if (!N) return !1;
    const O = h.selectionFilterType, z = h.selectionFilterMimeIncludes;
    return O === "files" && N.type === "dir" || O === "dirs" && N.type === "file" ? !1 : z && Array.isArray(z) && z.length > 0 ? N.type === "dir" ? !0 : N.mime_type ? z.some((G) => N.mime_type?.startsWith(G)) : !1 : !0;
  }, P = (I) => {
    if (h.selectionMode === "single")
      return !1;
    b.value = !1, !I.event?.metaKey && !I.event?.ctrlKey && (y.value = !0), I.selection.resolveSelectables(), x(I), $(I);
  }, A = L(0), M = ({ event: I, selection: N }) => {
    A.value = (o.value?.getAreaLocation().y1 ?? 0) - (h.root.getBoundingClientRect().top ?? 0);
    const O = document.querySelector(
      ".selection-area-container"
    );
    if (O && (O.dataset.theme = h.theme.current), h.selectionMode === "single")
      return;
    const z = I;
    z && "type" in z && z.type === "touchend" && z.preventDefault();
    const G = I;
    !G?.ctrlKey && !G?.metaKey && (d.clearSelection(), N.clearSelection(!0, !0)), v.value.clear();
  }, j = (I) => {
    if (h.selectionMode === "single")
      return;
    const N = w(I.store.changed.added), O = w(I.store.changed.removed);
    y.value = !1, b.value = !0, N.forEach((z) => {
      g.value && !g.value.has(z) && k(z) && (v.value.add(z), d.select(z, h.selectionMode || "multiple"));
    }), O.forEach((z) => {
      document.querySelector(`[data-key="${z}"]`) && m.value.has(z) && v.value.delete(z), d.deselect(z);
    }), I.selection.resolveSelectables(), $(I);
  }, F = () => {
    v.value.clear();
  }, q = (I) => {
    if (!I.event)
      return;
    const N = document.querySelector(".scroller-" + u);
    if (!N)
      return;
    const O = N.getBoundingClientRect(), z = O.left, G = O.top;
    let se = N.scrollTop;
    if (c?.value) {
      const { viewport: st } = c.value.elements();
      st && (se = st.scrollTop);
    }
    const fe = o.value?.getAreaLocation();
    if (!fe)
      return;
    const Ce = Math.min(fe.x1, fe.x2), pe = se + Math.min(fe.y1, fe.y2), at = Math.max(fe.x1, fe.x2), pt = se + Math.max(fe.y1, fe.y2), Pe = 4, Z = l();
    let ue = Math.floor((Ce - z - Pe) / Z), le = Math.floor((at - z - Pe) / Z);
    const Ee = Ce - z - Pe - ue * Z, _t = at - z - Pe - le * Z;
    Ee > Z - Pe && (ue = ue + 1), _t < Pe && (le = le - 1);
    const xr = Math.max(0, ue), H = Math.min(e.value - 1, le);
    let W = Math.floor((pe - G - Pe) / i.value), J = Math.floor((pt - G - Pe) / i.value);
    const re = pe - G - Pe - W * i.value, tt = pt - G - Pe - J * i.value, qe = Math.floor((t.value - Pe) / i.value);
    re > i.value - Pe && (W = W + 1), tt < Pe && (J = J - 1);
    const Xe = Math.max(0, W), Et = Math.min(J, qe), Le = r(
      _.value,
      Xe,
      Et,
      xr,
      H
    ), yn = document.querySelectorAll(`.file-item-${u}[data-key]`), Sr = /* @__PURE__ */ new Map();
    yn.forEach((st) => {
      const Tt = st.getAttribute("data-key");
      Tt && Sr.set(Tt, st);
    });
    const wn = [];
    if (Le.forEach((st) => {
      const Tt = s(st);
      Sr.get(Tt) || wn.push(Tt);
    }), wn.length > 0) {
      const st = h.selectionMode || "multiple";
      d.selectMultiple(wn, st);
    }
  }, T = (I) => {
    q(I), x(I), $(I), d.setSelectedCount(g.value?.size || 0), b.value = !1;
  }, Y = () => {
    let I = [".scroller-" + u];
    if (c?.value) {
      const { viewport: N } = c.value.elements();
      N && (I = N);
    }
    o.value = new Fo({
      selectables: [".file-item-" + u + ":not(.vf-explorer-item--unselectable)"],
      boundaries: I,
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
    }), o.value.on("beforestart", P), o.value.on("start", M), o.value.on("move", j), o.value.on("stop", T);
  }, K = () => {
    o.value && (o.value.destroy(), o.value = null);
  }, Q = () => {
    o.value && (Array.from(
      g.value ?? /* @__PURE__ */ new Set()
    ).forEach((N) => {
      k(N) || d.deselect(N);
    }), K(), Y());
  }, D = (I) => {
    y.value && (o.value?.clearSelection(), F(), y.value = !1);
    const N = I;
    !v.value.size && !y.value && !N?.ctrlKey && !N?.metaKey && (d.clearSelection(), o.value?.clearSelection());
  };
  return he(() => {
    const I = (N) => {
      !N.buttons && b.value && (b.value = !1);
    };
    document.addEventListener("dragleave", I), Ie(() => {
      document.removeEventListener("dragleave", I);
    });
  }), {
    explorerId: u,
    isDragging: b,
    initializeSelectionArea: Y,
    updateSelectionArea: Q,
    handleContentClick: D
  };
}
function hv(n) {
  const e = (r) => {
    if (!r)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const s = n.selectionFilterType, o = n.selectionFilterMimeIncludes, i = !s || s === "both" || s === "files" && r.type === "file" || s === "dirs" && r.type === "dir";
    let a = !0;
    return o && Array.isArray(o) && o.length > 0 && (r.type === "dir" ? a = !0 : r.mime_type ? a = o.some((c) => r.mime_type.startsWith(c)) : a = !1), { typeAllowed: i, mimeAllowed: a };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (r) => {
      const { typeAllowed: s, mimeAllowed: o } = e(r);
      return s && o;
    }
  };
}
function fv(n) {
  const e = (r) => ({
    item: r,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (r, s, o) => {
      const i = e(r);
      if (r.type === "file" && s) {
        if (n.emitter.emit("vf-file-dclick", i), i.defaultPrevented) return;
      } else if (r.type === "dir" && o && (n.emitter.emit("vf-folder-dclick", i), i.defaultPrevented))
        return;
      const a = n.contextMenuItems?.find((c) => c.show(n, {
        items: [r],
        target: r,
        searchQuery: ""
      }));
      a && a.action(n, [r]);
    }
  };
}
function pv(n, e, t, r, s, o, i) {
  const a = n.fs, { canSelectItem: c } = hv(n), { openItem: l } = fv(n), u = (v) => {
    const b = v.target?.closest(".file-item-" + e);
    if (!b) return null;
    const y = String(b.getAttribute("data-key")), w = t.value?.find((x) => x.path === y);
    return { key: y, item: w };
  }, h = () => {
    const v = r.value;
    return t.value?.filter((b) => v?.has(b.path)) || [];
  };
  return {
    handleItemClick: (v) => {
      const b = u(v);
      if (!b) return;
      const { key: y, item: w } = b, x = v;
      if (!c(w))
        return;
      const $ = n.selectionMode || "multiple";
      !x?.ctrlKey && !x?.metaKey && (v.type !== "touchstart" || !a.isSelected(y)) && (a.clearSelection(), s.value?.clearSelection(!0, !0)), s.value?.resolveSelectables(), v.type === "touchstart" && a.isSelected(y) ? a.select(y, $) : a.toggleSelect(y, $), a.setSelectedCount(r.value?.size || 0);
    },
    handleItemDblClick: (v) => {
      const b = u(v);
      if (!b) return;
      const { item: y } = b;
      c(y) && y && l(y, o, i);
    },
    handleItemContextMenu: (v) => {
      v.preventDefault(), v.stopPropagation();
      const b = u(v);
      if (!b) return;
      const { key: y, item: w } = b;
      c(w) && (r.value?.has(y) || (a.clearSelection(), a.select(y)), n.emitter.emit("vf-contextmenu-show", {
        event: v,
        items: h(),
        target: w
      }));
    },
    handleContentContextMenu: (v) => {
      v.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: v, items: h() });
    },
    getSelectedItems: h
  };
}
function mv(n, e) {
  const t = L(null);
  return he(() => {
    if (Rt.plugin([Do]), n.value) {
      const r = Rt(
        n.value,
        {
          scrollbars: { theme: "vf-scrollbars-theme" }
        },
        {
          initialized: (s) => {
            t.value = s;
            const { viewport: o } = s.elements();
            o && o.addEventListener("scroll", e);
          },
          updated: (s) => {
            const { viewport: o } = s.elements();
          }
        }
      );
      t.value = r;
    }
  }), Ie(() => {
    if (t.value) {
      const { viewport: r } = t.value.elements();
      r && r.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
function vv(n, e) {
  const t = L(null);
  return he(() => {
    n.value && (t.value = new ys({
      elements_selector: ".lazy",
      container: n.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), $o(() => {
    t.value && t.value.update();
  }), Ie(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const gv = { class: "vuefinder__explorer__container" }, _v = {
  key: 0,
  class: "vuefinder__linear-loader"
}, yv = /* @__PURE__ */ te({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = ee(), r = Gt(t, ["vuefinder__drag-over"]), s = xt("dragImage"), o = fs(null), i = xt("scrollContainer"), a = xt("scrollContent"), c = t.fs, l = t.config, u = X(l.state), h = X(c.sortedFiles), d = X(c.selectedKeys), g = X(c.loading), _ = (Z) => d.value?.has(Z) ?? !1, m = V(() => {
      if (u.value?.view === "grid") {
        const Ee = u.value?.gridItemHeight ?? 80, _t = u.value?.gridItemGap ?? 8;
        return Ee + _t * 2;
      }
      const ue = u.value?.listItemHeight ?? 32, le = u.value?.listItemGap ?? 2;
      return ue + le * 2;
    }), v = V(() => {
      if (u.value?.view === "grid") {
        const ue = u.value?.gridItemWidth ?? 96, le = u.value?.gridItemGap ?? 8;
        return ue + le * 2;
      }
      return 104;
    }), b = V(() => u.value?.view === "grid" ? (u.value?.gridItemGap ?? 8) * 2 : 0), { t: y } = t.i18n, {
      itemsPerRow: w,
      totalHeight: x,
      visibleRows: $,
      handleScroll: k,
      getRowItems: P,
      getItemsInRange: A,
      updateItemsPerRow: M
    } = cv(
      V(() => h.value ?? []),
      {
        scrollContainer: i,
        itemWidth: v,
        rowHeight: m,
        overscan: 2,
        containerPadding: b,
        lockItemsPerRow: V(() => u.value.view === "list")
      }
    ), { osInstance: j } = mv(i, k), { explorerId: F, isDragging: q, initializeSelectionArea: T, updateSelectionArea: Y, handleContentClick: K } = dv({
      itemsPerRow: w,
      totalHeight: x,
      getItemsInRange: A,
      getKey: (Z) => Z.path,
      selectionObject: o,
      rowHeight: m,
      itemWidth: v,
      osInstance: j
    }), Q = L(null), D = (Z) => {
      if (!Z || !Q.value) return !1;
      const ue = d.value?.has(Q.value) ?? !1;
      return q.value && (ue ? d.value?.has(Z) ?? !1 : Z === Q.value);
    };
    ie(
      () => l.get("view"),
      (Z) => {
        Z === "list" ? w.value = 1 : M();
      },
      { immediate: !0 }
    ), ie(w, (Z) => {
      l.get("view") === "list" && Z !== 1 && (w.value = 1);
    });
    const I = (Z) => h.value?.[Z];
    vv(i, t);
    const { handleItemClick: N, handleItemDblClick: O, handleItemContextMenu: z, handleContentContextMenu: G } = pv(
      t,
      F,
      h,
      d,
      o,
      e.onFileDclick,
      e.onFolderDclick
    );
    he(() => {
      const Z = () => {
        o.value || T(), o.value && o.value.on("beforestart", ({ event: ue }) => {
          const le = ue?.target === a.value;
          if (!ue?.metaKey && !ue?.ctrlKey && !ue?.altKey && !le)
            return !1;
        });
      };
      if (j.value)
        Z();
      else {
        const ue = setInterval(() => {
          j.value && (clearInterval(ue), Z());
        }, 50);
        setTimeout(() => {
          clearInterval(ue), o.value || Z();
        }, 500);
      }
      ie(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], Y, {
        deep: !0
      });
    });
    const se = (Z) => {
      if (!(t.features?.move ?? !1) || Z.altKey || Z.ctrlKey || Z.metaKey)
        return Z.preventDefault(), !1;
      q.value = !0;
      const le = Z.target?.closest(
        ".file-item-" + F
      );
      if (Q.value = le ? String(le.dataset.key) : null, Z.dataTransfer && Q.value) {
        Z.dataTransfer.setDragImage(s.value, 0, 15), Z.dataTransfer.effectAllowed = "all", Z.dataTransfer.dropEffect = "copy";
        const Ee = d.value?.has(Q.value) ? Array.from(d.value) : [Q.value];
        Z.dataTransfer.setData("items", JSON.stringify(Ee)), c.setDraggedItem(Q.value);
      }
    }, fe = () => {
      Q.value = null;
    };
    let Ce = null, pe = null;
    const at = (Z) => {
      Z.target?.closest(".file-item-" + F) || (pe = Z, Ce && clearTimeout(Ce), Ce = setTimeout(() => {
        pe && (pe.cancelable && pe.preventDefault(), pe.stopPropagation(), G(pe)), pe = null, Ce = null;
      }, 500));
    }, pt = (Z) => {
      Ce && (clearTimeout(Ce), Ce = null), pe = null;
    }, Pe = (Z) => {
      if (!pe) return;
      const ue = pe.touches[0] || pe.changedTouches[0], le = Z.touches[0] || Z.changedTouches[0];
      if (ue && le) {
        const Ee = Math.abs(le.clientX - ue.clientX), _t = Math.abs(le.clientY - ue.clientY);
        (Ee > 15 || _t > 15) && (Ce && (clearTimeout(Ce), Ce = null), pe = null);
      }
    };
    return (Z, ue) => (S(), C("div", gv, [
      f(u).view === "list" ? (S(), U(uv, { key: 0 })) : R("", !0),
      p("div", {
        ref_key: "scrollContainer",
        ref: i,
        class: ne(["vuefinder__explorer__selector-area", "scroller-" + f(F)])
      }, [
        f(l).get("loadingIndicator") === "linear" && f(g) ? (S(), C("div", _v)) : R("", !0),
        p("div", {
          ref_key: "scrollContent",
          ref: a,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Je({ height: `${f(x)}px`, position: "relative", width: "100%" }),
          onContextmenu: ue[0] || (ue[0] = ae(
            //@ts-ignore
            (...le) => f(G) && f(G)(...le),
            ["self", "prevent"]
          )),
          onClick: ue[1] || (ue[1] = ae(
            //@ts-ignore
            (...le) => f(K) && f(K)(...le),
            ["self"]
          )),
          onTouchstartCapture: ae(at, ["self"]),
          onTouchendCapture: ae(pt, ["self"]),
          onTouchmoveCapture: ae(Pe, ["self"]),
          onTouchcancelCapture: ae(pt, ["self"])
        }, [
          p("div", {
            ref_key: "dragImage",
            ref: s,
            class: "vuefinder__explorer__drag-item"
          }, [
            B(Lm, {
              count: Q.value && f(d).has(Q.value) ? f(d).size : 1
            }, null, 8, ["count"])
          ], 512),
          f(u).view === "grid" ? (S(!0), C(de, { key: 0 }, ge(f($), (le) => (S(), U(hs, {
            key: le,
            "row-index": le,
            "row-height": m.value,
            view: "grid",
            "items-per-row": f(w),
            items: f(P)(f(h), le),
            "show-thumbnails": f(u).showThumbnails,
            "is-dragging-item": D,
            "is-selected": _,
            "drag-n-drop-events": (Ee) => f(r).events(Ee),
            "explorer-id": f(F),
            onClick: f(N),
            onDblclick: f(O),
            onContextmenu: f(z),
            onDragstart: se,
            onDragend: fe
          }, {
            icon: oe((Ee) => [
              Oe(Z.$slots, "icon", Qe({ ref_for: !0 }, Ee))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (S(!0), C(de, { key: 1 }, ge(f($), (le) => (S(), U(hs, {
            key: le,
            "row-index": le,
            "row-height": m.value,
            view: "list",
            items: I(le) ? [I(le)] : [],
            "is-dragging-item": D,
            "is-selected": _,
            "drag-n-drop-events": (Ee) => f(r).events(Ee),
            "explorer-id": f(F),
            onClick: f(N),
            onDblclick: f(O),
            onContextmenu: f(z),
            onDragstart: se,
            onDragend: fe
          }, {
            icon: oe((Ee) => [
              Oe(Z.$slots, "icon", Qe({ ref_for: !0 }, Ee))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), wv = ["href", "download"], bv = ["onClick"], xv = /* @__PURE__ */ te({
  __name: "ContextMenu",
  setup(n) {
    const e = ee(), t = L(null), r = L([]);
    let s = null, o = null, i = null, a = [], c = null;
    const l = ln({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (g) => {
      r.value = g;
    });
    const u = (g) => g.link(e, r.value), h = (g) => {
      e.emitter.emit("vf-contextmenu-hide"), g.action(e, r.value);
    };
    e.emitter.on("vf-contextmenu-show", (g) => {
      const { event: _, items: m, target: v = null } = g || {};
      l.items = (e.contextMenuItems || []).filter((b) => b.show(e, {
        items: m,
        target: v
      })).sort((b, y) => {
        const w = b.order ?? 1 / 0, x = y.order ?? 1 / 0;
        return w - x;
      }), v ? m.length > 1 && m.some((b) => b.path === v.path) ? e.emitter.emit("vf-context-selected", m) : e.emitter.emit("vf-context-selected", [v]) : e.emitter.emit("vf-context-selected", []), d(_);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      l.active = !1, s && (s(), s = null), i && (a.forEach((g) => {
        g === window ? window.removeEventListener("scroll", i, !0) : g.removeEventListener("scroll", i, !0);
      }), i = null, a = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), o = null, l.positions = {};
    });
    const d = async (g) => {
      s && (s(), s = null);
      const m = ((k) => {
        if ("clientX" in k && "clientY" in k)
          return { x: k.clientX, y: k.clientY };
        const P = "touches" in k && k.touches[0] || "changedTouches" in k && k.changedTouches[0];
        return P ? { x: P.clientX, y: P.clientY } : { x: 0, y: 0 };
      })(g);
      if (o = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: m.x,
          y: m.y,
          top: m.y,
          left: m.x,
          right: m.x,
          bottom: m.y
        })
      }, l.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, l.active = !0, await nt(), !t.value || !o) return;
      await new Promise((k) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(k);
        });
      });
      const v = [
        jt(8),
        zt({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        Vt({ padding: 16 })
      ];
      let b = 0, y = 0;
      try {
        const k = await $t(o, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: v
        });
        b = k.x, y = k.y;
      } catch (k) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", k);
        return;
      }
      l.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${b}px`,
        top: `${y}px`,
        opacity: "0",
        visibility: "visible",
        transform: "translateY(-8px)",
        transition: "opacity 150ms ease-out, transform 150ms ease-out"
      }, requestAnimationFrame(() => {
        t.value && (l.positions = {
          ...l.positions,
          opacity: "1",
          transform: "translateY(0)"
        });
      });
      const x = ((k) => {
        const P = [];
        let A = k;
        for (; A && A !== document.body && A !== document.documentElement; ) {
          const M = window.getComputedStyle(A), j = M.overflow + M.overflowX + M.overflowY;
          (j.includes("scroll") || j.includes("auto")) && P.push(A), A = A.parentElement;
        }
        return P;
      })(t.value);
      a = [window, ...x], i = () => {
        l.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const $ = i;
      $ && a.forEach((k) => {
        k === window ? window.addEventListener("scroll", $, !0) : k.addEventListener("scroll", $, !0);
      }), c = (k) => {
        if (!l.active) return;
        const P = k.target;
        if (!P || t.value && t.value.contains(P))
          return;
        const A = e.root;
        A && A.contains(P) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        c && (document.addEventListener("mousedown", c, !0), document.addEventListener("touchstart", c, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !o))
          try {
            s = Xn(o, t.value, async () => {
              if (!(!o || !t.value))
                try {
                  const { x: k, y: P } = await $t(o, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: v
                  });
                  l.positions = {
                    ...l.positions,
                    left: `${k}px`,
                    top: `${P}px`
                  };
                } catch (k) {
                  console.warn("Floating UI positioning error:", k);
                }
            });
          } catch (k) {
            console.warn("Floating UI autoUpdate setup error:", k), s = null;
          }
      }, 200);
    };
    return Ie(() => {
      s && (s(), s = null), i && (a.forEach((g) => {
        g === window ? window.removeEventListener("scroll", i, !0) : g.removeEventListener("scroll", i, !0);
      }), i = null, a = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), o = null;
    }), (g, _) => ve((S(), C("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: ne([{
        "vuefinder__context-menu--active": l.active,
        "vuefinder__context-menu--inactive": !l.active
      }, "vuefinder__context-menu"]),
      style: Je(l.positions)
    }, [
      (S(!0), C(de, null, ge(l.items, (m) => (S(), C("li", {
        key: m.title,
        class: "vuefinder__context-menu__item"
      }, [
        m.link ? (S(), C("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: u(m),
          download: u(m),
          onClick: _[0] || (_[0] = (v) => f(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          p("span", null, E(m.title(f(e).i18n)), 1)
        ], 8, wv)) : (S(), C("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (v) => h(m)
        }, [
          p("span", null, E(m.title(f(e).i18n)), 1)
        ], 8, bv))
      ]))), 128))
    ], 6)), [
      [it, l.active]
    ]);
  }
}), Sv = { class: "vuefinder__status-bar__wrapper" }, $v = { class: "vuefinder__status-bar__storage" }, kv = ["title"], Cv = { class: "vuefinder__status-bar__storage-icon" }, Pv = ["value"], Ev = ["value"], Tv = { class: "vuefinder__status-bar__info space-x-2" }, Av = { key: 0 }, Nv = { key: 1 }, Iv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Dv = { class: "vuefinder__status-bar__actions" }, Fv = /* @__PURE__ */ te({
  __name: "Statusbar",
  setup(n) {
    const e = ee(), { t } = e.i18n, r = e.fs, s = X(r.sortedFiles), o = X(r.path), i = X(r.selectedCount), a = X(r.storages), c = X(r.selectedItems), l = X(r.path), u = (v) => {
      const b = v.target.value;
      e.adapter.open(b + "://");
    }, h = V(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((v, b) => v + (b.file_size || 0), 0)), d = V(() => a.value), g = V(() => s.value), _ = V(() => i.value || 0), m = V(() => c.value || []);
    return (v, b) => (S(), C("div", Sv, [
      p("div", $v, [
        p("div", {
          class: "vuefinder__status-bar__storage-container",
          title: f(t)("Storage")
        }, [
          p("div", Cv, [
            B(f(hr))
          ]),
          p("select", {
            name: "vuefinder-media-selector",
            value: f(o).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: u
          }, [
            (S(!0), C(de, null, ge(d.value, (y) => (S(), C("option", {
              key: y,
              value: y
            }, E(y), 9, Ev))), 128))
          ], 40, Pv),
          b[0] || (b[0] = p("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, kv),
        p("div", Tv, [
          _.value === 0 ? (S(), C("span", Av, E(g.value.length) + " " + E(f(t)("items")), 1)) : (S(), C("span", Nv, [
            ce(E(_.value) + " " + E(f(t)("selected")) + " ", 1),
            h.value ? (S(), C("span", Iv, E(f(e).filesize(h.value)), 1)) : R("", !0)
          ]))
        ])
      ]),
      p("div", Dv, [
        Oe(v.$slots, "actions", {
          path: f(l).path,
          count: _.value || 0,
          selected: m.value
        })
      ])
    ]));
  }
}), Mv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ov(n, e) {
  return S(), C("svg", Mv, [...e[0] || (e[0] = [
    p("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    p("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Lv = { render: Ov };
function _o(n, e) {
  const t = n.findIndex((r) => r.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const Rv = { class: "vuefinder__folder-loader-indicator" }, jv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, yo = /* @__PURE__ */ te({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ ko({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, t = ee(), r = gs(n, "modelValue"), s = L(!1);
    ie(
      () => r.value,
      () => o()
    );
    const o = async () => {
      s.value = !0;
      try {
        const a = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        _o(t.treeViewData, { path: e.path, type: "dir", folders: a });
      } catch (i) {
        Ue(i, "Failed to fetch subfolders");
      } finally {
        s.value = !1;
      }
    };
    return (i, a) => (S(), C("div", Rv, [
      s.value ? (S(), U(f(_n), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (S(), C("div", jv, [
        r.value ? (S(), U(f(gn), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : R("", !0),
        r.value ? R("", !0) : (S(), U(f(vn), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), zv = { key: 0 }, Vv = { class: "vuefinder__treesubfolderlist__no-folders" }, Uv = { class: "vuefinder__treesubfolderlist__item-content" }, Bv = ["onClick"], Hv = ["title", "onDblclick", "onClick"], Wv = { class: "vuefinder__treesubfolderlist__item-icon" }, qv = { class: "vuefinder__treesubfolderlist__subfolder" }, Kv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, Gv = /* @__PURE__ */ te({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = ee(), t = e.fs, r = Gt(e, ["vuefinder__drag-over"]), s = L({}), o = e.config, i = X(o.state), { t: a } = e.i18n, c = X(t.path), l = n, u = L(null), h = L(50);
    he(() => {
      l.path === l.storage + "://" && u.value && Rt(u.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const d = V(() => {
      const w = e.treeViewData.find((x) => x.path === l.path)?.folders || [];
      return w.length > h.value ? w.slice(0, h.value) : w;
    }), g = V(() => e.treeViewData.find((w) => w.path === l.path)?.folders?.length || 0), _ = V(() => g.value > h.value), m = V(() => `${l.storage}://`), v = (y, w) => y === w || y.startsWith(`${w}/`);
    ie(
      d,
      (y) => {
        const w = i.value.expandTreeByDefault && l.path === m.value, x = i.value.expandedTreePaths || [];
        y.forEach(($) => {
          const k = x.some(
            (P) => v(P, $.path)
          );
          (w || k) && s.value[$.path] === void 0 && (s.value[$.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const b = () => {
      h.value += 50;
    };
    return (y, w) => {
      const x = ms("TreeSubfolderList", !0);
      return S(), C("ul", {
        ref_key: "parentSubfolderList",
        ref: u,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        d.value.length ? R("", !0) : (S(), C("li", zv, [
          p("div", Vv, E(f(a)("No folders")), 1)
        ])),
        (S(!0), C(de, null, ge(d.value, ($) => (S(), C("li", {
          key: $.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          p("div", Uv, [
            p("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (k) => s.value[$.path] = !s.value[$.path]
            }, [
              B(yo, {
                modelValue: s.value[$.path],
                "onUpdate:modelValue": (k) => s.value[$.path] = k,
                storage: n.storage,
                path: $.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, Bv),
            p("div", Qe({
              class: "vuefinder__treesubfolderlist__item-link",
              title: $.path
            }, ct(
              f(r).events({
                ...$,
                dir: $.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (k) => s.value[$.path] = !s.value[$.path],
              onClick: (k) => f(e).adapter.open($.path)
            }), [
              p("div", Wv, [
                f(c)?.path === $.path ? (S(), U(f(fr), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (S(), U(f(rt), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              p("div", {
                class: ne(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": f(c).path === $.path
                }])
              }, E($.basename), 3)
            ], 16, Hv)
          ]),
          p("div", qv, [
            ve(B(x, {
              storage: l.storage,
              path: $.path
            }, null, 8, ["storage", "path"]), [
              [it, s.value[$.path]]
            ])
          ])
        ]))), 128)),
        _.value ? (S(), C("li", Kv, [
          p("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: b
          }, E(f(a)("load more")), 1)
        ])) : R("", !0)
      ], 512);
    };
  }
}), Yv = /* @__PURE__ */ te({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = ee(), t = e.fs, r = e.config, s = n, o = X(r.state), i = V(() => {
      const g = o.value.expandedTreePaths || [], _ = `${s.storage}://`;
      return g.some(
        (m) => m === _ || m.startsWith(`${_}`)
      );
    }), a = L(o.value.expandTreeByDefault || i.value), c = Gt(e, ["vuefinder__drag-over"]), l = X(t.path), u = V(() => s.storage === l.value?.storage);
    ie(
      () => ({
        expandTreeByDefault: o.value.expandTreeByDefault,
        hasExpandedPathInStorage: i.value
      }),
      (g) => {
        (g.expandTreeByDefault || g.hasExpandedPathInStorage) && (a.value = !0);
      }
    );
    const h = {
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
    function d(g) {
      g === l.value?.storage ? a.value = !a.value : e.adapter.open(g + "://");
    }
    return (g, _) => (S(), C(de, null, [
      p("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: _[2] || (_[2] = (m) => d(n.storage))
      }, [
        p("div", Qe({
          class: ["vuefinder__treestorageitem__info", u.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, ct(f(c).events(h), !0)), [
          p("div", {
            class: ne(["vuefinder__treestorageitem__icon", u.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            B(f(hr))
          ], 2),
          p("div", null, E(n.storage), 1)
        ], 16),
        p("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: _[1] || (_[1] = ae((m) => a.value = !a.value, ["stop"]))
        }, [
          B(yo, {
            modelValue: a.value,
            "onUpdate:modelValue": _[0] || (_[0] = (m) => a.value = m),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      ve(B(Gv, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [it, a.value]
      ])
    ], 64));
  }
}), Xv = { class: "vuefinder__folder-indicator" }, Qv = { class: "vuefinder__folder-indicator--icon" }, Jv = /* @__PURE__ */ te({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = gs(n, "modelValue");
    return (t, r) => (S(), C("div", Xv, [
      p("div", Qv, [
        e.value ? (S(), U(f(gn), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : R("", !0),
        e.value ? R("", !0) : (S(), U(f(vn), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Zv = {
  key: 0,
  class: "vuefinder__treeview__header"
}, eg = { class: "vuefinder__treeview__pinned-label" }, tg = { class: "vuefinder__treeview__pin-text text-nowrap" }, ng = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, rg = ["onClick"], sg = ["title"], og = ["onClick"], ig = { key: 0 }, ag = { class: "vuefinder__treeview__no-pinned" }, lg = /* @__PURE__ */ te({
  __name: "TreeView",
  setup(n) {
    const e = ee(), { enabled: t } = et(), { t: r } = e.i18n, { getStore: s, setStore: o } = e.storage, i = e.fs, a = e.config, c = X(a.state), l = X(i.sortedFiles), u = X(i.storages), h = V(() => u.value || []), d = X(i.path), g = Gt(e, ["vuefinder__drag-over"]), _ = L(190), m = L(s("pinned-folders-opened", !0));
    ie(m, (w) => o("pinned-folders-opened", w));
    const v = (w) => {
      const x = a.get("pinnedFolders");
      a.set("pinnedFolders", x.filter(($) => $.path !== w.path));
    }, b = (w) => {
      const x = w.clientX, $ = w.target.parentElement;
      if (!$) return;
      const k = $.getBoundingClientRect().width;
      $.classList.remove("transition-[width]"), $.classList.add("transition-none");
      const P = (M) => {
        _.value = k + M.clientX - x, _.value < 50 && (_.value = 0, a.set("showTreeView", !1)), _.value > 50 && a.set("showTreeView", !0);
      }, A = () => {
        const M = $.getBoundingClientRect();
        _.value = M.width, $.classList.add("transition-[width]"), $.classList.remove("transition-none"), window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", A);
      };
      window.addEventListener("mousemove", P), window.addEventListener("mouseup", A);
    }, y = L(null);
    return he(() => {
      y.value && Rt(y.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ie(l, (w) => {
      const x = w.filter(($) => $.type === "dir");
      _o(e.treeViewData, {
        path: d.value.path || "",
        folders: x.map(($) => ({
          storage: $.storage,
          path: $.path,
          basename: $.basename,
          type: "dir"
        }))
      });
    }), (w, x) => (S(), C(de, null, [
      p("div", {
        class: ne(["vuefinder__treeview__overlay", f(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: x[0] || (x[0] = ($) => f(a).toggle("showTreeView"))
      }, null, 2),
      p("div", {
        style: Je(
          f(c).showTreeView ? "min-width:100px;max-width:75%; width: " + _.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        p("div", {
          ref_key: "treeViewScrollElement",
          ref: y,
          class: "vuefinder__treeview__scroll"
        }, [
          f(t)("pinned") ? (S(), C("div", Zv, [
            p("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: x[2] || (x[2] = ($) => m.value = !m.value)
            }, [
              p("div", eg, [
                B(f(dr), { class: "vuefinder__treeview__pin-icon" }),
                p("div", tg, E(f(r)("Pinned Folders")), 1)
              ]),
              B(Jv, {
                modelValue: m.value,
                "onUpdate:modelValue": x[1] || (x[1] = ($) => m.value = $)
              }, null, 8, ["modelValue"])
            ]),
            m.value ? (S(), C("ul", ng, [
              (S(!0), C(de, null, ge(f(c).pinnedFolders, ($) => (S(), C("li", {
                key: $.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                p("div", Qe({ class: "vuefinder__treeview__pinned-folder" }, ct(f(g).events($), !0), {
                  onClick: (k) => f(e).adapter.open($.path)
                }), [
                  f(d).path !== $.path ? (S(), U(f(rt), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : R("", !0),
                  f(d).path === $.path ? (S(), U(f(fr), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : R("", !0),
                  p("div", {
                    title: $.path,
                    class: ne(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": f(d).path === $.path
                    }])
                  }, E($.basename), 11, sg)
                ], 16, rg),
                p("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (k) => v($)
                }, [
                  B(f(Lv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, og)
              ]))), 128)),
              f(c).pinnedFolders.length ? R("", !0) : (S(), C("li", ig, [
                p("div", ag, E(f(r)("No folders pinned")), 1)
              ]))
            ])) : R("", !0)
          ])) : R("", !0),
          (S(!0), C(de, null, ge(h.value, ($) => (S(), C("div", {
            key: $,
            class: "vuefinder__treeview__storage"
          }, [
            B(Yv, { storage: $ }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        p("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: b
        }, null, 32)
      ], 4)
    ], 64));
  }
}), Te = {
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
function ug(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function be(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, r) => !(e.needsSearchQuery !== !!r.searchQuery || e.target !== void 0 && e.target !== ug(r) || e.targetType !== void 0 && e.targetType !== r.target?.type || e.mimeType !== void 0 && e.mimeType !== r.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function Ft(...n) {
  return (e, t) => n.some((r) => r(e, t));
}
function Mt(...n) {
  return (e, t) => n.every((r) => r(e, t));
}
const wo = [
  {
    id: Te.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: be({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: Te.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: Ft(be({ target: "none" }), be({ target: "many" })),
    order: 20
  },
  {
    id: Te.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && be({ target: "none" })(n, e),
    order: 30
  },
  {
    id: Te.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(_r),
    show: be({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: Te.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: be({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: Te.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const t = n.config, r = t.get("pinnedFolders"), s = r.concat(
        e.filter(
          (o) => r.findIndex((i) => i.path === o.path) === -1
        )
      );
      t.set("pinnedFolders", s);
    },
    show: Mt(be({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: Te.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const t = n.config, r = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        r.filter(
          (s) => !e.find((o) => o.path === s.path)
        )
      );
    },
    show: Mt(be({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: Te.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(Kt, { storage: e[0]?.storage, item: e[0] }),
    show: Mt(
      be({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: Te.download,
    link: (n, e) => {
      if (e[0])
        return n.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: Mt(
      be({ target: "one", feature: "download" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: Te.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(mn, { items: e }),
    show: be({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: Te.move,
    title: ({ t: n }) => n("Move files"),
    action: (n, e) => {
      const t = n.fs, r = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      n.modal.open(Ct, { items: { from: e, to: r } });
    },
    show: Ft(
      be({ target: "one", feature: "move" }),
      be({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: Te.copy,
    title: ({ t: n }) => n("Copy"),
    action: (n, e) => {
      e.length > 0 && n.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: Ft(
      be({ target: "one", feature: "copy" }),
      be({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: Te.paste,
    title: ({ t: n }) => n("Paste"),
    action: (n, e) => {
      const t = n.fs.getClipboard();
      if (t?.items?.size > 0) {
        const s = n.fs.path.get();
        let o = s.path, i = s.storage;
        e.length === 1 && e[0]?.type === "dir" && (o = e[0].path, i = e[0].storage);
        const a = {
          storage: i || "",
          path: o || "",
          type: "dir"
        };
        n.modal.open(t.type === "cut" ? Ct : mr, {
          items: { from: Array.from(t.items), to: a }
        });
      }
    },
    show: (n, e) => n.features?.copy ?? !1 ? n.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: Te.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(br, { items: e }),
    show: Ft(
      be({ target: "many", feature: "archive" }),
      Mt(
        be({ target: "one", feature: "archive" }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: Te.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(wr, { items: e }),
    show: be({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: Te.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(pn, { items: e });
    },
    show: Ft(
      be({ feature: "delete", target: "one" }),
      be({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], cg = ["data-theme"], dg = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, hg = { class: "vuefinder__external-drop-message" }, fg = { class: "vuefinder__main__content" }, pg = /* @__PURE__ */ te({
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
    const t = e, r = n, s = ee(), o = xt("root"), i = s.config;
    ie(
      () => r.features,
      (y) => {
        const w = bs(y);
        Object.keys(s.features).forEach((x) => {
          delete s.features[x];
        }), Object.assign(s.features, w);
      },
      { deep: !0 }
    );
    const a = s.fs, c = X(s.i18n.localeAtom), l = X(i.state), u = V(() => {
      const y = l.value;
      return {
        "--vf-grid-item-width": `${y.gridItemWidth}px`,
        "--vf-grid-item-height": `${y.gridItemHeight}px`,
        "--vf-grid-item-gap": `${y.gridItemGap}px`,
        "--vf-grid-icon-size": `${y.gridIconSize}px`,
        "--vf-list-item-height": `${y.listItemHeight}px`,
        "--vf-list-item-gap": `${y.listItemGap}px`,
        "--vf-list-icon-size": `${y.listIconSize}px`
      };
    });
    fh();
    const { isDraggingExternal: h, handleDragEnter: d, handleDragOver: g, handleDragLeave: _, handleDrop: m } = ph();
    function v(y) {
      a.setPath(y.dirname), i.get("persist") && i.set("path", y.dirname), a.setReadOnly(y.read_only ?? !1), s.modal.close(), a.setFiles(y.files), a.clearSelection(), a.setSelectedCount(0), a.setStorages(y.storages);
    }
    s.adapter.onBeforeOpen = () => {
      a.setLoading(!0);
    }, s.adapter.onAfterOpen = (y) => {
      v(y), a.setLoading(!1);
    }, s.emitter.on("vf-upload-complete", (y) => {
      t("upload-complete", y);
    }), s.emitter.on("vf-delete-complete", (y) => {
      t("delete-complete", y);
    }), s.emitter.on("vf-notify", (y) => {
      t("notify", y);
    }), s.emitter.on("vf-file-dclick", (y) => {
      t("file-dclick", y);
    }), s.emitter.on("vf-folder-dclick", (y) => {
      t("folder-dclick", y);
    }), ie(
      () => r.config?.theme,
      (y) => {
        y && i.set("theme", f(y));
      },
      { immediate: !0 }
    ), ie(
      c,
      (y, w) => {
        y !== w && t("update:locale", String(y));
      },
      { immediate: !1 }
    ), he(() => {
      s.root = o.value, ie(
        () => i.get("path"),
        (w) => {
          s.adapter.open(w);
        }
      );
      const y = i.get("persist") ? i.get("path") : i.get("initialPath") ?? "";
      a.setPath(y), s.adapter.open(y), a.path.listen((w) => {
        t("path-change", w.path);
      }), a.selectedItems.listen((w) => {
        t("select", w);
      }), t("ready");
    });
    const b = async (y) => {
      const w = await m(y);
      w.length > 0 && (s.modal.open(yr), setTimeout(() => {
        s.emitter.emit(
          "vf-external-files-dropped",
          w.map((x) => x.file)
        );
      }, 100));
    };
    return (y, w) => (S(), C("div", {
      ref_key: "root",
      ref: o,
      tabindex: "0",
      class: ne(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": f(h) }]),
      "data-theme": f(s).theme.current,
      style: Je(u.value),
      onDragenter: w[2] || (w[2] = //@ts-ignore
      (...x) => f(d) && f(d)(...x)),
      onDragover: w[3] || (w[3] = //@ts-ignore
      (...x) => f(g) && f(g)(...x)),
      onDragleave: w[4] || (w[4] = //@ts-ignore
      (...x) => f(_) && f(_)(...x)),
      onDrop: b
    }, [
      p("div", {
        class: ne(f(s).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        p("div", {
          class: ne([
            f(l)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: w[0] || (w[0] = (x) => f(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: w[1] || (w[1] = (x) => f(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          f(h) ? (S(), C("div", dg, [
            p("div", hg, E(f(s).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : R("", !0),
          f(l).showMenuBar ? (S(), U(Uf, { key: 1 })) : R("", !0),
          f(l).showToolbar ? (S(), U(Hp, { key: 2 })) : R("", !0),
          B(Im),
          p("div", fg, [
            B(lg),
            B(yv, {
              "on-file-dclick": r.onFileDclick,
              "on-folder-dclick": r.onFolderDclick
            }, {
              icon: oe((x) => [
                Oe(y.$slots, "icon", dt(ht(x)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          B(Fv, null, {
            actions: oe((x) => [
              Oe(y.$slots, "status-bar", dt(ht(x)))
            ]),
            _: 3
          })
        ], 34),
        (S(), U(cn, { to: "body" }, [
          B(Co, { name: "fade" }, {
            default: oe(() => [
              f(s).modal.visible ? (S(), U(ps(f(s).modal.type), { key: 0 })) : R("", !0)
            ]),
            _: 1
          })
        ])),
        B(xv, { items: f(wo) }, null, 8, ["items"]),
        f(l).notificationsEnabled ? (S(), U(f(To), {
          key: 0,
          position: f(l).notificationPosition,
          duration: f(l).notificationDuration,
          "visible-toasts": f(l).notificationVisibleToasts,
          "rich-colors": f(l).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : R("", !0)
      ], 2)
    ], 46, cg));
  }
}), mg = /* @__PURE__ */ te({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => wo },
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
    const e = n, t = e.id ?? Jt(Rn);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const r = ml(e, Jt("VueFinderOptions") || {});
    return ie(
      () => e.config,
      (s) => {
        if (s) {
          const o = {};
          for (const i in s) {
            const a = f(s[i]);
            a !== void 0 && (o[i] = a);
          }
          r.config.init(o);
        }
      },
      { deep: !0, immediate: !0 }
    ), ie(
      () => e.locale,
      (s) => {
        s && r.i18n.localeAtom && r.i18n.localeAtom.get() !== s && r.i18n.localeAtom.set(s);
      },
      { immediate: !0 }
    ), Oo(t, r), Po(Rn, t), vs(() => {
      Lo(t);
    }), (s, o) => (S(), U(pg, dt(ht(e)), {
      icon: oe((i) => [
        Oe(s.$slots, "icon", dt(ht(i)))
      ]),
      "status-bar": oe((i) => [
        Oe(s.$slots, "status-bar", dt(ht(i)))
      ]),
      _: 3
    }, 16));
  }
});
function Dg(n) {
  const e = ee(n), t = (s) => s || e.fs.path.get().path || "", r = (s) => {
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
      const o = (e.fs.files.get() || []).find((i) => i.path === s);
      !o || o.type !== "file" || e.modal.open(Kt, { storage: o.storage, item: o });
    },
    notify(s, o) {
      yt(e, s, o);
    },
    getPath() {
      return e.fs.path.get().path || "";
    },
    select(s) {
      const o = new Set((e.fs.files.get() || []).map((a) => a.path)), i = (s || []).filter((a) => o.has(a));
      e.fs.setSelection(i);
    },
    selectOne(s) {
      new Set((e.fs.files.get() || []).map((i) => i.path)).has(s) && e.fs.setSelection([s]);
    },
    clearSelection() {
      e.fs.clearSelection();
    },
    getSelectedPaths() {
      return (e.fs.selectedItems.get() || []).map((s) => s.path);
    },
    async createFolder(s, o) {
      const i = await e.adapter.createFolder({ path: t(o), name: s });
      r(i);
    },
    async createFile(s, o) {
      const i = await e.adapter.createFile({ path: t(o), name: s });
      r(i);
    },
    async delete(s, o) {
      const i = t(o), a = new Map(
        (e.fs.files.get() || []).map((u) => [u.path, u])
      ), c = (s || []).map((u) => a.get(u)).filter((u) => !!u).map((u) => ({ path: u.path, type: u.type })), l = await e.adapter.delete({ path: i, items: c });
      r(l);
    },
    async rename(s, o, i) {
      const a = await e.adapter.rename({
        path: t(i),
        item: s,
        name: o
      });
      r(a);
    },
    async copy(s, o, i) {
      const a = await e.adapter.copy({
        path: t(i),
        sources: s,
        destination: o
      });
      r(a);
    },
    async move(s, o, i) {
      const a = await e.adapter.move({
        path: t(i),
        sources: s,
        destination: o
      });
      r(a);
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
const Fg = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", mg);
  }
};
export {
  Qo as ArrayDriver,
  dn as BaseAdapter,
  Te as ContextMenuIds,
  Ig as IndexedDBDriver,
  $s as RemoteDriver,
  mg as VueFinder,
  Fg as VueFinderPlugin,
  mg as VueFinderProvider,
  Ng as WebDAVDriver,
  wo as contextMenuItems,
  jo as createLocaleAtom,
  Fg as default,
  Er as parseBackendError,
  Dg as useVueFinder
};
