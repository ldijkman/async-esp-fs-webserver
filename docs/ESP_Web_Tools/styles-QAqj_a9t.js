var t = function(e, i) {
    return t = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(t, e) {
        t.__proto__ = e
    }
    || function(t, e) {
        for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
    }
    ,
    t(e, i)
};
function e(e, i) {
    if ("function" != typeof i && null !== i)
        throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
    function o() {
        this.constructor = e
    }
    t(e, i),
    e.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype,
    new o)
}
var i = function() {
    return i = Object.assign || function(t) {
        for (var e, i = 1, o = arguments.length; i < o; i++)
            for (var r in e = arguments[i])
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t
    }
    ,
    i.apply(this, arguments)
};
function o(t, e, i, o) {
    var r, n = arguments.length, a = n < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, i) : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, o);
    else
        for (var s = t.length - 1; s >= 0; s--)
            (r = t[s]) && (a = (n < 3 ? r(a) : n > 3 ? r(e, i, a) : r(e, i)) || a);
    return n > 3 && a && Object.defineProperty(e, i, a),
    a
}
function r(t) {
    var e = "function" == typeof Symbol && Symbol.iterator
      , i = e && t[e]
      , o = 0;
    if (i)
        return i.call(t);
    if (t && "number" == typeof t.length)
        return {
            next: function() {
                return t && o >= t.length && (t = void 0),
                {
                    value: t && t[o++],
                    done: !t
                }
            }
        };
    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
}
"function" == typeof SuppressedError && SuppressedError;
const n = window
  , a = n.ShadowRoot && (void 0 === n.ShadyCSS || n.ShadyCSS.nativeShadow) && "adoptedStyleSheets"in Document.prototype && "replace"in CSSStyleSheet.prototype
  , s = Symbol()
  , d = new WeakMap;
let c = class {
    constructor(t, e, i) {
        if (this._$cssResult$ = !0,
        i !== s)
            throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t,
        this.t = e
    }
    get styleSheet() {
        let t = this.o;
        const e = this.t;
        if (a && void 0 === t) {
            const i = void 0 !== e && 1 === e.length;
            i && (t = d.get(e)),
            void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText),
            i && d.set(e, t))
        }
        return t
    }
    toString() {
        return this.cssText
    }
}
;
const l = (t,...e)=>{
    const i = 1 === t.length ? t[0] : e.reduce(((e,i,o)=>e + (t=>{
        if (!0 === t._$cssResult$)
            return t.cssText;
        if ("number" == typeof t)
            return t;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
    }
    )(i) + t[o + 1]), t[0]);
    return new c(i,t,s)
}
  , p = a ? t=>t : t=>t instanceof CSSStyleSheet ? (t=>{
    let e = "";
    for (const i of t.cssRules)
        e += i.cssText;
    return (t=>new c("string" == typeof t ? t : t + "",void 0,s))(e)
}
)(t) : t;
var u;
const m = window
  , h = m.trustedTypes
  , f = h ? h.emptyScript : ""
  , g = m.reactiveElementPolyfillSupport
  , v = {
    toAttribute(t, e) {
        switch (e) {
        case Boolean:
            t = t ? f : null;
            break;
        case Object:
        case Array:
            t = null == t ? t : JSON.stringify(t)
        }
        return t
    },
    fromAttribute(t, e) {
        let i = t;
        switch (e) {
        case Boolean:
            i = null !== t;
            break;
        case Number:
            i = null === t ? null : Number(t);
            break;
        case Object:
        case Array:
            try {
                i = JSON.parse(t)
            } catch (t) {
                i = null
            }
        }
        return i
    }
}
  , b = (t,e)=>e !== t && (e == e || t == t)
  , y = {
    attribute: !0,
    type: String,
    converter: v,
    reflect: !1,
    hasChanged: b
}
  , _ = "finalized";
let x = class extends HTMLElement {
    constructor() {
        super(),
        this._$Ei = new Map,
        this.isUpdatePending = !1,
        this.hasUpdated = !1,
        this._$El = null,
        this.u()
    }
    static addInitializer(t) {
        var e;
        this.finalize(),
        (null !== (e = this.h) && void 0 !== e ? e : this.h = []).push(t)
    }
    static get observedAttributes() {
        this.finalize();
        const t = [];
        return this.elementProperties.forEach(((e,i)=>{
            const o = this._$Ep(i, e);
            void 0 !== o && (this._$Ev.set(o, i),
            t.push(o))
        }
        )),
        t
    }
    static createProperty(t, e=y) {
        if (e.state && (e.attribute = !1),
        this.finalize(),
        this.elementProperties.set(t, e),
        !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
            const i = "symbol" == typeof t ? Symbol() : "__" + t
              , o = this.getPropertyDescriptor(t, i, e);
            void 0 !== o && Object.defineProperty(this.prototype, t, o)
        }
    }
    static getPropertyDescriptor(t, e, i) {
        return {
            get() {
                return this[e]
            },
            set(o) {
                const r = this[t];
                this[e] = o,
                this.requestUpdate(t, r, i)
            },
            configurable: !0,
            enumerable: !0
        }
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || y
    }
    static finalize() {
        if (this.hasOwnProperty(_))
            return !1;
        this[_] = !0;
        const t = Object.getPrototypeOf(this);
        if (t.finalize(),
        void 0 !== t.h && (this.h = [...t.h]),
        this.elementProperties = new Map(t.elementProperties),
        this._$Ev = new Map,
        this.hasOwnProperty("properties")) {
            const t = this.properties
              , e = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
            for (const i of e)
                this.createProperty(i, t[i])
        }
        return this.elementStyles = this.finalizeStyles(this.styles),
        !0
    }
    static finalizeStyles(t) {
        const e = [];
        if (Array.isArray(t)) {
            const i = new Set(t.flat(1 / 0).reverse());
            for (const t of i)
                e.unshift(p(t))
        } else
            void 0 !== t && e.push(p(t));
        return e
    }
    static _$Ep(t, e) {
        const i = e.attribute;
        return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0
    }
    u() {
        var t;
        this._$E_ = new Promise((t=>this.enableUpdating = t)),
        this._$AL = new Map,
        this._$Eg(),
        this.requestUpdate(),
        null === (t = this.constructor.h) || void 0 === t || t.forEach((t=>t(this)))
    }
    addController(t) {
        var e, i;
        (null !== (e = this._$ES) && void 0 !== e ? e : this._$ES = []).push(t),
        void 0 !== this.renderRoot && this.isConnected && (null === (i = t.hostConnected) || void 0 === i || i.call(t))
    }
    removeController(t) {
        var e;
        null === (e = this._$ES) || void 0 === e || e.splice(this._$ES.indexOf(t) >>> 0, 1)
    }
    _$Eg() {
        this.constructor.elementProperties.forEach(((t,e)=>{
            this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]),
            delete this[e])
        }
        ))
    }
    createRenderRoot() {
        var t;
        const e = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
        return ((t,e)=>{
            a ? t.adoptedStyleSheets = e.map((t=>t instanceof CSSStyleSheet ? t : t.styleSheet)) : e.forEach((e=>{
                const i = document.createElement("style")
                  , o = n.litNonce;
                void 0 !== o && i.setAttribute("nonce", o),
                i.textContent = e.cssText,
                t.appendChild(i)
            }
            ))
        }
        )(e, this.constructor.elementStyles),
        e
    }
    connectedCallback() {
        var t;
        void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
        this.enableUpdating(!0),
        null === (t = this._$ES) || void 0 === t || t.forEach((t=>{
            var e;
            return null === (e = t.hostConnected) || void 0 === e ? void 0 : e.call(t)
        }
        ))
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        var t;
        null === (t = this._$ES) || void 0 === t || t.forEach((t=>{
            var e;
            return null === (e = t.hostDisconnected) || void 0 === e ? void 0 : e.call(t)
        }
        ))
    }
    attributeChangedCallback(t, e, i) {
        this._$AK(t, i)
    }
    _$EO(t, e, i=y) {
        var o;
        const r = this.constructor._$Ep(t, i);
        if (void 0 !== r && !0 === i.reflect) {
            const n = (void 0 !== (null === (o = i.converter) || void 0 === o ? void 0 : o.toAttribute) ? i.converter : v).toAttribute(e, i.type);
            this._$El = t,
            null == n ? this.removeAttribute(r) : this.setAttribute(r, n),
            this._$El = null
        }
    }
    _$AK(t, e) {
        var i;
        const o = this.constructor
          , r = o._$Ev.get(t);
        if (void 0 !== r && this._$El !== r) {
            const t = o.getPropertyOptions(r)
              , n = "function" == typeof t.converter ? {
                fromAttribute: t.converter
            } : void 0 !== (null === (i = t.converter) || void 0 === i ? void 0 : i.fromAttribute) ? t.converter : v;
            this._$El = r,
            this[r] = n.fromAttribute(e, t.type),
            this._$El = null
        }
    }
    requestUpdate(t, e, i) {
        let o = !0;
        void 0 !== t && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || b)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e),
        !0 === i.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map),
        this._$EC.set(t, i))) : o = !1),
        !this.isUpdatePending && o && (this._$E_ = this._$Ej())
    }
    async _$Ej() {
        this.isUpdatePending = !0;
        try {
            await this._$E_
        } catch (t) {
            Promise.reject(t)
        }
        const t = this.scheduleUpdate();
        return null != t && await t,
        !this.isUpdatePending
    }
    scheduleUpdate() {
        return this.performUpdate()
    }
    performUpdate() {
        var t;
        if (!this.isUpdatePending)
            return;
        this.hasUpdated,
        this._$Ei && (this._$Ei.forEach(((t,e)=>this[e] = t)),
        this._$Ei = void 0);
        let e = !1;
        const i = this._$AL;
        try {
            e = this.shouldUpdate(i),
            e ? (this.willUpdate(i),
            null === (t = this._$ES) || void 0 === t || t.forEach((t=>{
                var e;
                return null === (e = t.hostUpdate) || void 0 === e ? void 0 : e.call(t)
            }
            )),
            this.update(i)) : this._$Ek()
        } catch (t) {
            throw e = !1,
            this._$Ek(),
            t
        }
        e && this._$AE(i)
    }
    willUpdate(t) {}
    _$AE(t) {
        var e;
        null === (e = this._$ES) || void 0 === e || e.forEach((t=>{
            var e;
            return null === (e = t.hostUpdated) || void 0 === e ? void 0 : e.call(t)
        }
        )),
        this.hasUpdated || (this.hasUpdated = !0,
        this.firstUpdated(t)),
        this.updated(t)
    }
    _$Ek() {
        this._$AL = new Map,
        this.isUpdatePending = !1
    }
    get updateComplete() {
        return this.getUpdateComplete()
    }
    getUpdateComplete() {
        return this._$E_
    }
    shouldUpdate(t) {
        return !0
    }
    update(t) {
        void 0 !== this._$EC && (this._$EC.forEach(((t,e)=>this._$EO(e, this[e], t))),
        this._$EC = void 0),
        this._$Ek()
    }
    updated(t) {}
    firstUpdated(t) {}
}
;
var E;
x[_] = !0,
x.elementProperties = new Map,
x.elementStyles = [],
x.shadowRootOptions = {
    mode: "open"
},
null == g || g({
    ReactiveElement: x
}),
(null !== (u = m.reactiveElementVersions) && void 0 !== u ? u : m.reactiveElementVersions = []).push("1.6.2");
const A = window
  , w = A.trustedTypes
  , S = w ? w.createPolicy("lit-html", {
    createHTML: t=>t
}) : void 0
  , C = "$lit$"
  , T = `lit$${(Math.random() + "").slice(9)}$`
  , R = "?" + T
  , k = `<${R}>`
  , $ = document
  , O = ()=>$.createComment("")
  , I = t=>null === t || "object" != typeof t && "function" != typeof t
  , N = Array.isArray
  , D = "[ \t\n\f\r]"
  , H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g
  , F = /-->/g
  , L = />/g
  , P = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g")
  , M = /'/g
  , z = /"/g
  , U = /^(?:script|style|textarea|title)$/i
  , B = t=>(e,...i)=>({
    _$litType$: t,
    strings: e,
    values: i
})
  , V = B(1)
  , j = B(2)
  , G = Symbol.for("lit-noChange")
  , K = Symbol.for("lit-nothing")
  , q = new WeakMap
  , W = $.createTreeWalker($, 129, null, !1)
  , Y = (t,e)=>{
    const i = t.length - 1
      , o = [];
    let r, n = 2 === e ? "<svg>" : "", a = H;
    for (let e = 0; e < i; e++) {
        const i = t[e];
        let s, d, c = -1, l = 0;
        for (; l < i.length && (a.lastIndex = l,
        d = a.exec(i),
        null !== d); )
            l = a.lastIndex,
            a === H ? "!--" === d[1] ? a = F : void 0 !== d[1] ? a = L : void 0 !== d[2] ? (U.test(d[2]) && (r = RegExp("</" + d[2], "g")),
            a = P) : void 0 !== d[3] && (a = P) : a === P ? ">" === d[0] ? (a = null != r ? r : H,
            c = -1) : void 0 === d[1] ? c = -2 : (c = a.lastIndex - d[2].length,
            s = d[1],
            a = void 0 === d[3] ? P : '"' === d[3] ? z : M) : a === z || a === M ? a = P : a === F || a === L ? a = H : (a = P,
            r = void 0);
        const p = a === P && t[e + 1].startsWith("/>") ? " " : "";
        n += a === H ? i + k : c >= 0 ? (o.push(s),
        i.slice(0, c) + C + i.slice(c) + T + p) : i + T + (-2 === c ? (o.push(void 0),
        e) : p)
    }
    const s = n + (t[i] || "<?>") + (2 === e ? "</svg>" : "");
    if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
        throw Error("invalid template strings array");
    return [void 0 !== S ? S.createHTML(s) : s, o]
}
;
class X {
    constructor({strings: t, _$litType$: e}, i) {
        let o;
        this.parts = [];
        let r = 0
          , n = 0;
        const a = t.length - 1
          , s = this.parts
          , [d,c] = Y(t, e);
        if (this.el = X.createElement(d, i),
        W.currentNode = this.el.content,
        2 === e) {
            const t = this.el.content
              , e = t.firstChild;
            e.remove(),
            t.append(...e.childNodes)
        }
        for (; null !== (o = W.nextNode()) && s.length < a; ) {
            if (1 === o.nodeType) {
                if (o.hasAttributes()) {
                    const t = [];
                    for (const e of o.getAttributeNames())
                        if (e.endsWith(C) || e.startsWith(T)) {
                            const i = c[n++];
                            if (t.push(e),
                            void 0 !== i) {
                                const t = o.getAttribute(i.toLowerCase() + C).split(T)
                                  , e = /([.?@])?(.*)/.exec(i);
                                s.push({
                                    type: 1,
                                    index: r,
                                    name: e[2],
                                    strings: t,
                                    ctor: "." === e[1] ? et : "?" === e[1] ? ot : "@" === e[1] ? rt : tt
                                })
                            } else
                                s.push({
                                    type: 6,
                                    index: r
                                })
                        }
                    for (const e of t)
                        o.removeAttribute(e)
                }
                if (U.test(o.tagName)) {
                    const t = o.textContent.split(T)
                      , e = t.length - 1;
                    if (e > 0) {
                        o.textContent = w ? w.emptyScript : "";
                        for (let i = 0; i < e; i++)
                            o.append(t[i], O()),
                            W.nextNode(),
                            s.push({
                                type: 2,
                                index: ++r
                            });
                        o.append(t[e], O())
                    }
                }
            } else if (8 === o.nodeType)
                if (o.data === R)
                    s.push({
                        type: 2,
                        index: r
                    });
                else {
                    let t = -1;
                    for (; -1 !== (t = o.data.indexOf(T, t + 1)); )
                        s.push({
                            type: 7,
                            index: r
                        }),
                        t += T.length - 1
                }
            r++
        }
    }
    static createElement(t, e) {
        const i = $.createElement("template");
        return i.innerHTML = t,
        i
    }
}
function Z(t, e, i=t, o) {
    var r, n, a, s;
    if (e === G)
        return e;
    let d = void 0 !== o ? null === (r = i._$Co) || void 0 === r ? void 0 : r[o] : i._$Cl;
    const c = I(e) ? void 0 : e._$litDirective$;
    return (null == d ? void 0 : d.constructor) !== c && (null === (n = null == d ? void 0 : d._$AO) || void 0 === n || n.call(d, !1),
    void 0 === c ? d = void 0 : (d = new c(t),
    d._$AT(t, i, o)),
    void 0 !== o ? (null !== (a = (s = i)._$Co) && void 0 !== a ? a : s._$Co = [])[o] = d : i._$Cl = d),
    void 0 !== d && (e = Z(t, d._$AS(t, e.values), d, o)),
    e
}
class J {
    constructor(t, e) {
        this._$AV = [],
        this._$AN = void 0,
        this._$AD = t,
        this._$AM = e
    }
    get parentNode() {
        return this._$AM.parentNode
    }
    get _$AU() {
        return this._$AM._$AU
    }
    u(t) {
        var e;
        const {el: {content: i}, parts: o} = this._$AD
          , r = (null !== (e = null == t ? void 0 : t.creationScope) && void 0 !== e ? e : $).importNode(i, !0);
        W.currentNode = r;
        let n = W.nextNode()
          , a = 0
          , s = 0
          , d = o[0];
        for (; void 0 !== d; ) {
            if (a === d.index) {
                let e;
                2 === d.type ? e = new Q(n,n.nextSibling,this,t) : 1 === d.type ? e = new d.ctor(n,d.name,d.strings,this,t) : 6 === d.type && (e = new nt(n,this,t)),
                this._$AV.push(e),
                d = o[++s]
            }
            a !== (null == d ? void 0 : d.index) && (n = W.nextNode(),
            a++)
        }
        return W.currentNode = $,
        r
    }
    v(t) {
        let e = 0;
        for (const i of this._$AV)
            void 0 !== i && (void 0 !== i.strings ? (i._$AI(t, i, e),
            e += i.strings.length - 2) : i._$AI(t[e])),
            e++
    }
}
class Q {
    constructor(t, e, i, o) {
        var r;
        this.type = 2,
        this._$AH = K,
        this._$AN = void 0,
        this._$AA = t,
        this._$AB = e,
        this._$AM = i,
        this.options = o,
        this._$Cp = null === (r = null == o ? void 0 : o.isConnected) || void 0 === r || r
    }
    get _$AU() {
        var t, e;
        return null !== (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== e ? e : this._$Cp
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const e = this._$AM;
        return void 0 !== e && 11 === (null == t ? void 0 : t.nodeType) && (t = e.parentNode),
        t
    }
    get startNode() {
        return this._$AA
    }
    get endNode() {
        return this._$AB
    }
    _$AI(t, e=this) {
        t = Z(this, t, e),
        I(t) ? t === K || null == t || "" === t ? (this._$AH !== K && this._$AR(),
        this._$AH = K) : t !== this._$AH && t !== G && this._(t) : void 0 !== t._$litType$ ? this.g(t) : void 0 !== t.nodeType ? this.$(t) : (t=>N(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]))(t) ? this.T(t) : this._(t)
    }
    k(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB)
    }
    $(t) {
        this._$AH !== t && (this._$AR(),
        this._$AH = this.k(t))
    }
    _(t) {
        this._$AH !== K && I(this._$AH) ? this._$AA.nextSibling.data = t : this.$($.createTextNode(t)),
        this._$AH = t
    }
    g(t) {
        var e;
        const {values: i, _$litType$: o} = t
          , r = "number" == typeof o ? this._$AC(t) : (void 0 === o.el && (o.el = X.createElement(o.h, this.options)),
        o);
        if ((null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === r)
            this._$AH.v(i);
        else {
            const t = new J(r,this)
              , e = t.u(this.options);
            t.v(i),
            this.$(e),
            this._$AH = t
        }
    }
    _$AC(t) {
        let e = q.get(t.strings);
        return void 0 === e && q.set(t.strings, e = new X(t)),
        e
    }
    T(t) {
        N(this._$AH) || (this._$AH = [],
        this._$AR());
        const e = this._$AH;
        let i, o = 0;
        for (const r of t)
            o === e.length ? e.push(i = new Q(this.k(O()),this.k(O()),this,this.options)) : i = e[o],
            i._$AI(r),
            o++;
        o < e.length && (this._$AR(i && i._$AB.nextSibling, o),
        e.length = o)
    }
    _$AR(t=this._$AA.nextSibling, e) {
        var i;
        for (null === (i = this._$AP) || void 0 === i || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
            const e = t.nextSibling;
            t.remove(),
            t = e
        }
    }
    setConnected(t) {
        var e;
        void 0 === this._$AM && (this._$Cp = t,
        null === (e = this._$AP) || void 0 === e || e.call(this, t))
    }
}
class tt {
    constructor(t, e, i, o, r) {
        this.type = 1,
        this._$AH = K,
        this._$AN = void 0,
        this.element = t,
        this.name = e,
        this._$AM = o,
        this.options = r,
        i.length > 2 || "" !== i[0] || "" !== i[1] ? (this._$AH = Array(i.length - 1).fill(new String),
        this.strings = i) : this._$AH = K
    }
    get tagName() {
        return this.element.tagName
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(t, e=this, i, o) {
        const r = this.strings;
        let n = !1;
        if (void 0 === r)
            t = Z(this, t, e, 0),
            n = !I(t) || t !== this._$AH && t !== G,
            n && (this._$AH = t);
        else {
            const o = t;
            let a, s;
            for (t = r[0],
            a = 0; a < r.length - 1; a++)
                s = Z(this, o[i + a], e, a),
                s === G && (s = this._$AH[a]),
                n || (n = !I(s) || s !== this._$AH[a]),
                s === K ? t = K : t !== K && (t += (null != s ? s : "") + r[a + 1]),
                this._$AH[a] = s
        }
        n && !o && this.j(t)
    }
    j(t) {
        t === K ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "")
    }
}
class et extends tt {
    constructor() {
        super(...arguments),
        this.type = 3
    }
    j(t) {
        this.element[this.name] = t === K ? void 0 : t
    }
}
const it = w ? w.emptyScript : "";
class ot extends tt {
    constructor() {
        super(...arguments),
        this.type = 4
    }
    j(t) {
        t && t !== K ? this.element.setAttribute(this.name, it) : this.element.removeAttribute(this.name)
    }
}
class rt extends tt {
    constructor(t, e, i, o, r) {
        super(t, e, i, o, r),
        this.type = 5
    }
    _$AI(t, e=this) {
        var i;
        if ((t = null !== (i = Z(this, t, e, 0)) && void 0 !== i ? i : K) === G)
            return;
        const o = this._$AH
          , r = t === K && o !== K || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive
          , n = t !== K && (o === K || r);
        r && this.element.removeEventListener(this.name, this, o),
        n && this.element.addEventListener(this.name, this, t),
        this._$AH = t
    }
    handleEvent(t) {
        var e, i;
        "function" == typeof this._$AH ? this._$AH.call(null !== (i = null === (e = this.options) || void 0 === e ? void 0 : e.host) && void 0 !== i ? i : this.element, t) : this._$AH.handleEvent(t)
    }
}
class nt {
    constructor(t, e, i) {
        this.element = t,
        this.type = 6,
        this._$AN = void 0,
        this._$AM = e,
        this.options = i
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(t) {
        Z(this, t)
    }
}
const at = A.litHtmlPolyfillSupport;
null == at || at(X, Q),
(null !== (E = A.litHtmlVersions) && void 0 !== E ? E : A.litHtmlVersions = []).push("2.7.4");
var st, dt;
class ct extends x {
    constructor() {
        super(...arguments),
        this.renderOptions = {
            host: this
        },
        this._$Do = void 0
    }
    createRenderRoot() {
        var t, e;
        const i = super.createRenderRoot();
        return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild),
        i
    }
    update(t) {
        const e = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
        super.update(t),
        this._$Do = ((t,e,i)=>{
            var o, r;
            const n = null !== (o = null == i ? void 0 : i.renderBefore) && void 0 !== o ? o : e;
            let a = n._$litPart$;
            if (void 0 === a) {
                const t = null !== (r = null == i ? void 0 : i.renderBefore) && void 0 !== r ? r : null;
                n._$litPart$ = a = new Q(e.insertBefore(O(), t),t,void 0,null != i ? i : {})
            }
            return a._$AI(t),
            a
        }
        )(e, this.renderRoot, this.renderOptions)
    }
    connectedCallback() {
        var t;
        super.connectedCallback(),
        null === (t = this._$Do) || void 0 === t || t.setConnected(!0)
    }
    disconnectedCallback() {
        var t;
        super.disconnectedCallback(),
        null === (t = this._$Do) || void 0 === t || t.setConnected(!1)
    }
    render() {
        return G
    }
}
ct.finalized = !0,
ct._$litElement$ = !0,
null === (st = globalThis.litElementHydrateSupport) || void 0 === st || st.call(globalThis, {
    LitElement: ct
});
const lt = globalThis.litElementPolyfillSupport;
null == lt || lt({
    LitElement: ct
}),
(null !== (dt = globalThis.litElementVersions) && void 0 !== dt ? dt : globalThis.litElementVersions = []).push("3.3.2");
const pt = t=>e=>"function" == typeof e ? ((t,e)=>(customElements.define(t, e),
e))(t, e) : ((t,e)=>{
    const {kind: i, elements: o} = e;
    return {
        kind: i,
        elements: o,
        finisher(e) {
            customElements.define(t, e)
        }
    }
}
)(t, e)
  , ut = (t,e)=>"method" === e.kind && e.descriptor && !("value"in e.descriptor) ? {
    ...e,
    finisher(i) {
        i.createProperty(e.key, t)
    }
} : {
    kind: "field",
    key: Symbol(),
    placement: "own",
    descriptor: {},
    originalKey: e.key,
    initializer() {
        "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this))
    },
    finisher(i) {
        i.createProperty(e.key, t)
    }
}
  , mt = (t,e,i)=>{
    e.constructor.createProperty(i, t)
}
;
function ht(t) {
    return (e,i)=>void 0 !== i ? mt(t, e, i) : ut(t, e)
}
function ft(t) {
    return ht({
        ...t,
        state: !0
    })
}
const gt = ({finisher: t, descriptor: e})=>(i,o)=>{
    var r;
    if (void 0 === o) {
        const o = null !== (r = i.originalKey) && void 0 !== r ? r : i.key
          , n = null != e ? {
            kind: "method",
            placement: "prototype",
            key: o,
            descriptor: e(i.key)
        } : {
            ...i,
            key: o
        };
        return null != t && (n.finisher = function(e) {
            t(e, o)
        }
        ),
        n
    }
    {
        const r = i.constructor;
        void 0 !== e && Object.defineProperty(i, o, e(o)),
        null == t || t(r, o)
    }
}
;
function vt(t) {
    return gt({
        finisher: (e,i)=>{
            Object.assign(e.prototype[i], t)
        }
    })
}
function bt(t, e) {
    return gt({
        descriptor: i=>{
            const o = {
                get() {
                    var e, i;
                    return null !== (i = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(t)) && void 0 !== i ? i : null
                },
                enumerable: !0,
                configurable: !0
            };
            if (e) {
                const e = "symbol" == typeof i ? Symbol() : "__" + i;
                o.get = function() {
                    var i, o;
                    return void 0 === this[e] && (this[e] = null !== (o = null === (i = this.renderRoot) || void 0 === i ? void 0 : i.querySelector(t)) && void 0 !== o ? o : null),
                    this[e]
                }
            }
            return o
        }
    })
}
function yt(t) {
    return gt({
        descriptor: e=>({
            async get() {
                var e;
                return await this.updateComplete,
                null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(t)
            },
            enumerable: !0,
            configurable: !0
        })
    })
}
var _t;
const xt = null != (null === (_t = window.HTMLSlotElement) || void 0 === _t ? void 0 : _t.prototype.assignedElements) ? (t,e)=>t.assignedElements(e) : (t,e)=>t.assignedNodes(e).filter((t=>t.nodeType === Node.ELEMENT_NODE));
function Et(t) {
    const {slot: e, selector: i} = null != t ? t : {};
    return gt({
        descriptor: o=>({
            get() {
                var o;
                const r = "slot" + (e ? `[name=${e}]` : ":not([name])")
                  , n = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(r)
                  , a = null != n ? xt(n, t) : [];
                return i ? a.filter((t=>t.matches(i))) : a
            },
            enumerable: !0,
            configurable: !0
        })
    })
}
const At = l`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;
let wt = class extends ct {
    render() {
        return V`<span><slot></slot></span>`
    }
}
;
function St(t, e) {
    return (t.matches || t.webkitMatchesSelector || t.msMatchesSelector).call(t, e)
}
wt.styles = [At],
wt = o([pt("mwc-icon")], wt);
const Ct = t=>t.nodeType === Node.ELEMENT_NODE;
function Tt(t) {
    return {
        addClass: e=>{
            t.classList.add(e)
        }
        ,
        removeClass: e=>{
            t.classList.remove(e)
        }
        ,
        hasClass: e=>t.classList.contains(e)
    }
}
const Rt = ()=>{}
  , kt = {
    get passive() {
        return !1
    }
};
document.addEventListener("x", Rt, kt),
document.removeEventListener("x", Rt);
const $t = (t=window.document)=>{
    let e = t.activeElement;
    const i = [];
    if (!e)
        return i;
    for (; e && (i.push(e),
    e.shadowRoot); )
        e = e.shadowRoot.activeElement;
    return i
}
  , Ot = t=>{
    const e = $t();
    if (!e.length)
        return !1;
    const i = e[e.length - 1]
      , o = new Event("check-if-focused",{
        bubbles: !0,
        composed: !0
    });
    let r = [];
    const n = t=>{
        r = t.composedPath()
    }
    ;
    return document.body.addEventListener("check-if-focused", n),
    i.dispatchEvent(o),
    document.body.removeEventListener("check-if-focused", n),
    -1 !== r.indexOf(t)
}
;
class It extends ct {
    click() {
        if (this.mdcRoot)
            return this.mdcRoot.focus(),
            void this.mdcRoot.click();
        super.click()
    }
    createFoundation() {
        void 0 !== this.mdcFoundation && this.mdcFoundation.destroy(),
        this.mdcFoundationClass && (this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter()),
        this.mdcFoundation.init())
    }
    firstUpdated() {
        this.createFoundation()
    }
}
var Nt = function() {
    function t(t) {
        void 0 === t && (t = {}),
        this.adapter = t
    }
    return Object.defineProperty(t, "cssClasses", {
        get: function() {
            return {}
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "strings", {
        get: function() {
            return {}
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "numbers", {
        get: function() {
            return {}
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "defaultAdapter", {
        get: function() {
            return {}
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.init = function() {}
    ,
    t.prototype.destroy = function() {}
    ,
    t
}()
  , Dt = {
    BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
    FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
    FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
    ROOT: "mdc-ripple-upgraded",
    UNBOUNDED: "mdc-ripple-upgraded--unbounded"
}
  , Ht = {
    VAR_FG_SCALE: "--mdc-ripple-fg-scale",
    VAR_FG_SIZE: "--mdc-ripple-fg-size",
    VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
    VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
    VAR_LEFT: "--mdc-ripple-left",
    VAR_TOP: "--mdc-ripple-top"
}
  , Ft = {
    DEACTIVATION_TIMEOUT_MS: 225,
    FG_DEACTIVATION_MS: 150,
    INITIAL_ORIGIN_SCALE: .6,
    PADDING: 10,
    TAP_DELAY_MS: 300
};
var Lt = ["touchstart", "pointerdown", "mousedown", "keydown"]
  , Pt = ["touchend", "pointerup", "mouseup", "contextmenu"]
  , Mt = []
  , zt = function(t) {
    function o(e) {
        var r = t.call(this, i(i({}, o.defaultAdapter), e)) || this;
        return r.activationAnimationHasEnded = !1,
        r.activationTimer = 0,
        r.fgDeactivationRemovalTimer = 0,
        r.fgScale = "0",
        r.frame = {
            width: 0,
            height: 0
        },
        r.initialSize = 0,
        r.layoutFrame = 0,
        r.maxRadius = 0,
        r.unboundedCoords = {
            left: 0,
            top: 0
        },
        r.activationState = r.defaultActivationState(),
        r.activationTimerCallback = function() {
            r.activationAnimationHasEnded = !0,
            r.runDeactivationUXLogicIfReady()
        }
        ,
        r.activateHandler = function(t) {
            r.activateImpl(t)
        }
        ,
        r.deactivateHandler = function() {
            r.deactivateImpl()
        }
        ,
        r.focusHandler = function() {
            r.handleFocus()
        }
        ,
        r.blurHandler = function() {
            r.handleBlur()
        }
        ,
        r.resizeHandler = function() {
            r.layout()
        }
        ,
        r
    }
    return e(o, t),
    Object.defineProperty(o, "cssClasses", {
        get: function() {
            return Dt
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(o, "strings", {
        get: function() {
            return Ht
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(o, "numbers", {
        get: function() {
            return Ft
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(o, "defaultAdapter", {
        get: function() {
            return {
                addClass: function() {},
                browserSupportsCssVars: function() {
                    return !0
                },
                computeBoundingRect: function() {
                    return {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                containsEventTarget: function() {
                    return !0
                },
                deregisterDocumentInteractionHandler: function() {},
                deregisterInteractionHandler: function() {},
                deregisterResizeHandler: function() {},
                getWindowPageOffset: function() {
                    return {
                        x: 0,
                        y: 0
                    }
                },
                isSurfaceActive: function() {
                    return !0
                },
                isSurfaceDisabled: function() {
                    return !0
                },
                isUnbounded: function() {
                    return !0
                },
                registerDocumentInteractionHandler: function() {},
                registerInteractionHandler: function() {},
                registerResizeHandler: function() {},
                removeClass: function() {},
                updateCssVariable: function() {}
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    o.prototype.init = function() {
        var t = this
          , e = this.supportsPressRipple();
        if (this.registerRootHandlers(e),
        e) {
            var i = o.cssClasses
              , r = i.ROOT
              , n = i.UNBOUNDED;
            requestAnimationFrame((function() {
                t.adapter.addClass(r),
                t.adapter.isUnbounded() && (t.adapter.addClass(n),
                t.layoutInternal())
            }
            ))
        }
    }
    ,
    o.prototype.destroy = function() {
        var t = this;
        if (this.supportsPressRipple()) {
            this.activationTimer && (clearTimeout(this.activationTimer),
            this.activationTimer = 0,
            this.adapter.removeClass(o.cssClasses.FG_ACTIVATION)),
            this.fgDeactivationRemovalTimer && (clearTimeout(this.fgDeactivationRemovalTimer),
            this.fgDeactivationRemovalTimer = 0,
            this.adapter.removeClass(o.cssClasses.FG_DEACTIVATION));
            var e = o.cssClasses
              , i = e.ROOT
              , r = e.UNBOUNDED;
            requestAnimationFrame((function() {
                t.adapter.removeClass(i),
                t.adapter.removeClass(r),
                t.removeCssVars()
            }
            ))
        }
        this.deregisterRootHandlers(),
        this.deregisterDeactivationHandlers()
    }
    ,
    o.prototype.activate = function(t) {
        this.activateImpl(t)
    }
    ,
    o.prototype.deactivate = function() {
        this.deactivateImpl()
    }
    ,
    o.prototype.layout = function() {
        var t = this;
        this.layoutFrame && cancelAnimationFrame(this.layoutFrame),
        this.layoutFrame = requestAnimationFrame((function() {
            t.layoutInternal(),
            t.layoutFrame = 0
        }
        ))
    }
    ,
    o.prototype.setUnbounded = function(t) {
        var e = o.cssClasses.UNBOUNDED;
        t ? this.adapter.addClass(e) : this.adapter.removeClass(e)
    }
    ,
    o.prototype.handleFocus = function() {
        var t = this;
        requestAnimationFrame((function() {
            return t.adapter.addClass(o.cssClasses.BG_FOCUSED)
        }
        ))
    }
    ,
    o.prototype.handleBlur = function() {
        var t = this;
        requestAnimationFrame((function() {
            return t.adapter.removeClass(o.cssClasses.BG_FOCUSED)
        }
        ))
    }
    ,
    o.prototype.supportsPressRipple = function() {
        return this.adapter.browserSupportsCssVars()
    }
    ,
    o.prototype.defaultActivationState = function() {
        return {
            activationEvent: void 0,
            hasDeactivationUXRun: !1,
            isActivated: !1,
            isProgrammatic: !1,
            wasActivatedByPointer: !1,
            wasElementMadeActive: !1
        }
    }
    ,
    o.prototype.registerRootHandlers = function(t) {
        var e, i;
        if (t) {
            try {
                for (var o = r(Lt), n = o.next(); !n.done; n = o.next()) {
                    var a = n.value;
                    this.adapter.registerInteractionHandler(a, this.activateHandler)
                }
            } catch (t) {
                e = {
                    error: t
                }
            } finally {
                try {
                    n && !n.done && (i = o.return) && i.call(o)
                } finally {
                    if (e)
                        throw e.error
                }
            }
            this.adapter.isUnbounded() && this.adapter.registerResizeHandler(this.resizeHandler)
        }
        this.adapter.registerInteractionHandler("focus", this.focusHandler),
        this.adapter.registerInteractionHandler("blur", this.blurHandler)
    }
    ,
    o.prototype.registerDeactivationHandlers = function(t) {
        var e, i;
        if ("keydown" === t.type)
            this.adapter.registerInteractionHandler("keyup", this.deactivateHandler);
        else
            try {
                for (var o = r(Pt), n = o.next(); !n.done; n = o.next()) {
                    var a = n.value;
                    this.adapter.registerDocumentInteractionHandler(a, this.deactivateHandler)
                }
            } catch (t) {
                e = {
                    error: t
                }
            } finally {
                try {
                    n && !n.done && (i = o.return) && i.call(o)
                } finally {
                    if (e)
                        throw e.error
                }
            }
    }
    ,
    o.prototype.deregisterRootHandlers = function() {
        var t, e;
        try {
            for (var i = r(Lt), o = i.next(); !o.done; o = i.next()) {
                var n = o.value;
                this.adapter.deregisterInteractionHandler(n, this.activateHandler)
            }
        } catch (e) {
            t = {
                error: e
            }
        } finally {
            try {
                o && !o.done && (e = i.return) && e.call(i)
            } finally {
                if (t)
                    throw t.error
            }
        }
        this.adapter.deregisterInteractionHandler("focus", this.focusHandler),
        this.adapter.deregisterInteractionHandler("blur", this.blurHandler),
        this.adapter.isUnbounded() && this.adapter.deregisterResizeHandler(this.resizeHandler)
    }
    ,
    o.prototype.deregisterDeactivationHandlers = function() {
        var t, e;
        this.adapter.deregisterInteractionHandler("keyup", this.deactivateHandler);
        try {
            for (var i = r(Pt), o = i.next(); !o.done; o = i.next()) {
                var n = o.value;
                this.adapter.deregisterDocumentInteractionHandler(n, this.deactivateHandler)
            }
        } catch (e) {
            t = {
                error: e
            }
        } finally {
            try {
                o && !o.done && (e = i.return) && e.call(i)
            } finally {
                if (t)
                    throw t.error
            }
        }
    }
    ,
    o.prototype.removeCssVars = function() {
        var t = this
          , e = o.strings;
        Object.keys(e).forEach((function(i) {
            0 === i.indexOf("VAR_") && t.adapter.updateCssVariable(e[i], null)
        }
        ))
    }
    ,
    o.prototype.activateImpl = function(t) {
        var e = this;
        if (!this.adapter.isSurfaceDisabled()) {
            var i = this.activationState;
            if (!i.isActivated) {
                var o = this.previousActivationEvent;
                if (!(o && void 0 !== t && o.type !== t.type))
                    i.isActivated = !0,
                    i.isProgrammatic = void 0 === t,
                    i.activationEvent = t,
                    i.wasActivatedByPointer = !i.isProgrammatic && (void 0 !== t && ("mousedown" === t.type || "touchstart" === t.type || "pointerdown" === t.type)),
                    void 0 !== t && Mt.length > 0 && Mt.some((function(t) {
                        return e.adapter.containsEventTarget(t)
                    }
                    )) ? this.resetActivationState() : (void 0 !== t && (Mt.push(t.target),
                    this.registerDeactivationHandlers(t)),
                    i.wasElementMadeActive = this.checkElementMadeActive(t),
                    i.wasElementMadeActive && this.animateActivation(),
                    requestAnimationFrame((function() {
                        Mt = [],
                        i.wasElementMadeActive || void 0 === t || " " !== t.key && 32 !== t.keyCode || (i.wasElementMadeActive = e.checkElementMadeActive(t),
                        i.wasElementMadeActive && e.animateActivation()),
                        i.wasElementMadeActive || (e.activationState = e.defaultActivationState())
                    }
                    )))
            }
        }
    }
    ,
    o.prototype.checkElementMadeActive = function(t) {
        return void 0 === t || "keydown" !== t.type || this.adapter.isSurfaceActive()
    }
    ,
    o.prototype.animateActivation = function() {
        var t = this
          , e = o.strings
          , i = e.VAR_FG_TRANSLATE_START
          , r = e.VAR_FG_TRANSLATE_END
          , n = o.cssClasses
          , a = n.FG_DEACTIVATION
          , s = n.FG_ACTIVATION
          , d = o.numbers.DEACTIVATION_TIMEOUT_MS;
        this.layoutInternal();
        var c = ""
          , l = "";
        if (!this.adapter.isUnbounded()) {
            var p = this.getFgTranslationCoordinates()
              , u = p.startPoint
              , m = p.endPoint;
            c = u.x + "px, " + u.y + "px",
            l = m.x + "px, " + m.y + "px"
        }
        this.adapter.updateCssVariable(i, c),
        this.adapter.updateCssVariable(r, l),
        clearTimeout(this.activationTimer),
        clearTimeout(this.fgDeactivationRemovalTimer),
        this.rmBoundedActivationClasses(),
        this.adapter.removeClass(a),
        this.adapter.computeBoundingRect(),
        this.adapter.addClass(s),
        this.activationTimer = setTimeout((function() {
            t.activationTimerCallback()
        }
        ), d)
    }
    ,
    o.prototype.getFgTranslationCoordinates = function() {
        var t, e = this.activationState, i = e.activationEvent;
        return t = e.wasActivatedByPointer ? function(t, e, i) {
            if (!t)
                return {
                    x: 0,
                    y: 0
                };
            var o, r, n = e.x, a = e.y, s = n + i.left, d = a + i.top;
            if ("touchstart" === t.type) {
                var c = t;
                o = c.changedTouches[0].pageX - s,
                r = c.changedTouches[0].pageY - d
            } else {
                var l = t;
                o = l.pageX - s,
                r = l.pageY - d
            }
            return {
                x: o,
                y: r
            }
        }(i, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect()) : {
            x: this.frame.width / 2,
            y: this.frame.height / 2
        },
        {
            startPoint: t = {
                x: t.x - this.initialSize / 2,
                y: t.y - this.initialSize / 2
            },
            endPoint: {
                x: this.frame.width / 2 - this.initialSize / 2,
                y: this.frame.height / 2 - this.initialSize / 2
            }
        }
    }
    ,
    o.prototype.runDeactivationUXLogicIfReady = function() {
        var t = this
          , e = o.cssClasses.FG_DEACTIVATION
          , i = this.activationState
          , r = i.hasDeactivationUXRun
          , n = i.isActivated;
        (r || !n) && this.activationAnimationHasEnded && (this.rmBoundedActivationClasses(),
        this.adapter.addClass(e),
        this.fgDeactivationRemovalTimer = setTimeout((function() {
            t.adapter.removeClass(e)
        }
        ), Ft.FG_DEACTIVATION_MS))
    }
    ,
    o.prototype.rmBoundedActivationClasses = function() {
        var t = o.cssClasses.FG_ACTIVATION;
        this.adapter.removeClass(t),
        this.activationAnimationHasEnded = !1,
        this.adapter.computeBoundingRect()
    }
    ,
    o.prototype.resetActivationState = function() {
        var t = this;
        this.previousActivationEvent = this.activationState.activationEvent,
        this.activationState = this.defaultActivationState(),
        setTimeout((function() {
            return t.previousActivationEvent = void 0
        }
        ), o.numbers.TAP_DELAY_MS)
    }
    ,
    o.prototype.deactivateImpl = function() {
        var t = this
          , e = this.activationState;
        if (e.isActivated) {
            var o = i({}, e);
            e.isProgrammatic ? (requestAnimationFrame((function() {
                t.animateDeactivation(o)
            }
            )),
            this.resetActivationState()) : (this.deregisterDeactivationHandlers(),
            requestAnimationFrame((function() {
                t.activationState.hasDeactivationUXRun = !0,
                t.animateDeactivation(o),
                t.resetActivationState()
            }
            )))
        }
    }
    ,
    o.prototype.animateDeactivation = function(t) {
        var e = t.wasActivatedByPointer
          , i = t.wasElementMadeActive;
        (e || i) && this.runDeactivationUXLogicIfReady()
    }
    ,
    o.prototype.layoutInternal = function() {
        var t = this;
        this.frame = this.adapter.computeBoundingRect();
        var e = Math.max(this.frame.height, this.frame.width);
        this.maxRadius = this.adapter.isUnbounded() ? e : Math.sqrt(Math.pow(t.frame.width, 2) + Math.pow(t.frame.height, 2)) + o.numbers.PADDING;
        var i = Math.floor(e * o.numbers.INITIAL_ORIGIN_SCALE);
        this.adapter.isUnbounded() && i % 2 != 0 ? this.initialSize = i - 1 : this.initialSize = i,
        this.fgScale = "" + this.maxRadius / this.initialSize,
        this.updateLayoutCssVars()
    }
    ,
    o.prototype.updateLayoutCssVars = function() {
        var t = o.strings
          , e = t.VAR_FG_SIZE
          , i = t.VAR_LEFT
          , r = t.VAR_TOP
          , n = t.VAR_FG_SCALE;
        this.adapter.updateCssVariable(e, this.initialSize + "px"),
        this.adapter.updateCssVariable(n, this.fgScale),
        this.adapter.isUnbounded() && (this.unboundedCoords = {
            left: Math.round(this.frame.width / 2 - this.initialSize / 2),
            top: Math.round(this.frame.height / 2 - this.initialSize / 2)
        },
        this.adapter.updateCssVariable(i, this.unboundedCoords.left + "px"),
        this.adapter.updateCssVariable(r, this.unboundedCoords.top + "px"))
    }
    ,
    o
}(Nt)
  , Ut = zt;
const Bt = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6
}
  , Vt = t=>(...e)=>({
    _$litDirective$: t,
    values: e
});
let jt = class {
    constructor(t) {}
    get _$AU() {
        return this._$AM._$AU
    }
    _$AT(t, e, i) {
        this._$Ct = t,
        this._$AM = e,
        this._$Ci = i
    }
    _$AS(t, e) {
        return this.update(t, e)
    }
    update(t, e) {
        return this.render(...e)
    }
}
;
const Gt = Vt(class extends jt {
    constructor(t) {
        var e;
        if (super(t),
        t.type !== Bt.ATTRIBUTE || "class" !== t.name || (null === (e = t.strings) || void 0 === e ? void 0 : e.length) > 2)
            throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")
    }
    render(t) {
        return " " + Object.keys(t).filter((e=>t[e])).join(" ") + " "
    }
    update(t, [e]) {
        var i, o;
        if (void 0 === this.it) {
            this.it = new Set,
            void 0 !== t.strings && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((t=>"" !== t))));
            for (const t in e)
                e[t] && !(null === (i = this.nt) || void 0 === i ? void 0 : i.has(t)) && this.it.add(t);
            return this.render(e)
        }
        const r = t.element.classList;
        this.it.forEach((t=>{
            t in e || (r.remove(t),
            this.it.delete(t))
        }
        ));
        for (const t in e) {
            const i = !!e[t];
            i === this.it.has(t) || (null === (o = this.nt) || void 0 === o ? void 0 : o.has(t)) || (i ? (r.add(t),
            this.it.add(t)) : (r.remove(t),
            this.it.delete(t)))
        }
        return G
    }
}
)
  , Kt = "important"
  , qt = " !" + Kt
  , Wt = Vt(class extends jt {
    constructor(t) {
        var e;
        if (super(t),
        t.type !== Bt.ATTRIBUTE || "style" !== t.name || (null === (e = t.strings) || void 0 === e ? void 0 : e.length) > 2)
            throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")
    }
    render(t) {
        return Object.keys(t).reduce(((e,i)=>{
            const o = t[i];
            return null == o ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${o};`
        }
        ), "")
    }
    update(t, [e]) {
        const {style: i} = t.element;
        if (void 0 === this.ut) {
            this.ut = new Set;
            for (const t in e)
                this.ut.add(t);
            return this.render(e)
        }
        this.ut.forEach((t=>{
            null == e[t] && (this.ut.delete(t),
            t.includes("-") ? i.removeProperty(t) : i[t] = "")
        }
        ));
        for (const t in e) {
            const o = e[t];
            if (null != o) {
                this.ut.add(t);
                const e = "string" == typeof o && o.endsWith(qt);
                t.includes("-") || e ? i.setProperty(t, e ? o.slice(0, -11) : o, e ? Kt : "") : i[t] = o
            }
        }
        return G
    }
}
);
class Yt extends It {
    constructor() {
        super(...arguments),
        this.primary = !1,
        this.accent = !1,
        this.unbounded = !1,
        this.disabled = !1,
        this.activated = !1,
        this.selected = !1,
        this.internalUseStateLayerCustomProperties = !1,
        this.hovering = !1,
        this.bgFocused = !1,
        this.fgActivation = !1,
        this.fgDeactivation = !1,
        this.fgScale = "",
        this.fgSize = "",
        this.translateStart = "",
        this.translateEnd = "",
        this.leftPos = "",
        this.topPos = "",
        this.mdcFoundationClass = Ut
    }
    get isActive() {
        return St(this.parentElement || this, ":active")
    }
    createAdapter() {
        return {
            browserSupportsCssVars: ()=>!0,
            isUnbounded: ()=>this.unbounded,
            isSurfaceActive: ()=>this.isActive,
            isSurfaceDisabled: ()=>this.disabled,
            addClass: t=>{
                switch (t) {
                case "mdc-ripple-upgraded--background-focused":
                    this.bgFocused = !0;
                    break;
                case "mdc-ripple-upgraded--foreground-activation":
                    this.fgActivation = !0;
                    break;
                case "mdc-ripple-upgraded--foreground-deactivation":
                    this.fgDeactivation = !0
                }
            }
            ,
            removeClass: t=>{
                switch (t) {
                case "mdc-ripple-upgraded--background-focused":
                    this.bgFocused = !1;
                    break;
                case "mdc-ripple-upgraded--foreground-activation":
                    this.fgActivation = !1;
                    break;
                case "mdc-ripple-upgraded--foreground-deactivation":
                    this.fgDeactivation = !1
                }
            }
            ,
            containsEventTarget: ()=>!0,
            registerInteractionHandler: ()=>{}
            ,
            deregisterInteractionHandler: ()=>{}
            ,
            registerDocumentInteractionHandler: ()=>{}
            ,
            deregisterDocumentInteractionHandler: ()=>{}
            ,
            registerResizeHandler: ()=>{}
            ,
            deregisterResizeHandler: ()=>{}
            ,
            updateCssVariable: (t,e)=>{
                switch (t) {
                case "--mdc-ripple-fg-scale":
                    this.fgScale = e;
                    break;
                case "--mdc-ripple-fg-size":
                    this.fgSize = e;
                    break;
                case "--mdc-ripple-fg-translate-end":
                    this.translateEnd = e;
                    break;
                case "--mdc-ripple-fg-translate-start":
                    this.translateStart = e;
                    break;
                case "--mdc-ripple-left":
                    this.leftPos = e;
                    break;
                case "--mdc-ripple-top":
                    this.topPos = e
                }
            }
            ,
            computeBoundingRect: ()=>(this.parentElement || this).getBoundingClientRect(),
            getWindowPageOffset: ()=>({
                x: window.pageXOffset,
                y: window.pageYOffset
            })
        }
    }
    startPress(t) {
        this.waitForFoundation((()=>{
            this.mdcFoundation.activate(t)
        }
        ))
    }
    endPress() {
        this.waitForFoundation((()=>{
            this.mdcFoundation.deactivate()
        }
        ))
    }
    startFocus() {
        this.waitForFoundation((()=>{
            this.mdcFoundation.handleFocus()
        }
        ))
    }
    endFocus() {
        this.waitForFoundation((()=>{
            this.mdcFoundation.handleBlur()
        }
        ))
    }
    startHover() {
        this.hovering = !0
    }
    endHover() {
        this.hovering = !1
    }
    waitForFoundation(t) {
        this.mdcFoundation ? t() : this.updateComplete.then(t)
    }
    update(t) {
        t.has("disabled") && this.disabled && this.endHover(),
        super.update(t)
    }
    render() {
        const t = this.activated && (this.primary || !this.accent)
          , e = this.selected && (this.primary || !this.accent)
          , i = {
            "mdc-ripple-surface--accent": this.accent,
            "mdc-ripple-surface--primary--activated": t,
            "mdc-ripple-surface--accent--activated": this.accent && this.activated,
            "mdc-ripple-surface--primary--selected": e,
            "mdc-ripple-surface--accent--selected": this.accent && this.selected,
            "mdc-ripple-surface--disabled": this.disabled,
            "mdc-ripple-surface--hover": this.hovering,
            "mdc-ripple-surface--primary": this.primary,
            "mdc-ripple-surface--selected": this.selected,
            "mdc-ripple-upgraded--background-focused": this.bgFocused,
            "mdc-ripple-upgraded--foreground-activation": this.fgActivation,
            "mdc-ripple-upgraded--foreground-deactivation": this.fgDeactivation,
            "mdc-ripple-upgraded--unbounded": this.unbounded,
            "mdc-ripple-surface--internal-use-state-layer-custom-properties": this.internalUseStateLayerCustomProperties
        };
        return V`
        <div class="mdc-ripple-surface mdc-ripple-upgraded ${Gt(i)}"
          style="${Wt({
            "--mdc-ripple-fg-scale": this.fgScale,
            "--mdc-ripple-fg-size": this.fgSize,
            "--mdc-ripple-fg-translate-end": this.translateEnd,
            "--mdc-ripple-fg-translate-start": this.translateStart,
            "--mdc-ripple-left": this.leftPos,
            "--mdc-ripple-top": this.topPos
        })}"></div>`
    }
}
o([bt(".mdc-ripple-surface")], Yt.prototype, "mdcRoot", void 0),
o([ht({
    type: Boolean
})], Yt.prototype, "primary", void 0),
o([ht({
    type: Boolean
})], Yt.prototype, "accent", void 0),
o([ht({
    type: Boolean
})], Yt.prototype, "unbounded", void 0),
o([ht({
    type: Boolean
})], Yt.prototype, "disabled", void 0),
o([ht({
    type: Boolean
})], Yt.prototype, "activated", void 0),
o([ht({
    type: Boolean
})], Yt.prototype, "selected", void 0),
o([ht({
    type: Boolean
})], Yt.prototype, "internalUseStateLayerCustomProperties", void 0),
o([ft()], Yt.prototype, "hovering", void 0),
o([ft()], Yt.prototype, "bgFocused", void 0),
o([ft()], Yt.prototype, "fgActivation", void 0),
o([ft()], Yt.prototype, "fgDeactivation", void 0),
o([ft()], Yt.prototype, "fgScale", void 0),
o([ft()], Yt.prototype, "fgSize", void 0),
o([ft()], Yt.prototype, "translateStart", void 0),
o([ft()], Yt.prototype, "translateEnd", void 0),
o([ft()], Yt.prototype, "leftPos", void 0),
o([ft()], Yt.prototype, "topPos", void 0);
const Xt = l`.mdc-ripple-surface{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded],.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after,.mdc-ripple-upgraded--unbounded::before,.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-ripple-surface:hover::before,.mdc-ripple-surface.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;display:block}:host .mdc-ripple-surface{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;will-change:unset}.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary:hover::before,.mdc-ripple-surface--primary.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before,.mdc-ripple-surface--primary--activated::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--activated:hover::before,.mdc-ripple-surface--primary--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--primary--selected::before,.mdc-ripple-surface--primary--selected::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--selected:hover::before,.mdc-ripple-surface--primary--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent::before,.mdc-ripple-surface--accent::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent:hover::before,.mdc-ripple-surface--accent.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before,.mdc-ripple-surface--accent--activated::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--activated:hover::before,.mdc-ripple-surface--accent--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--accent--selected::before,.mdc-ripple-surface--accent--selected::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--selected:hover::before,.mdc-ripple-surface--accent--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--disabled{opacity:0}.mdc-ripple-surface--internal-use-state-layer-custom-properties::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties::after{background-color:#000;background-color:var(--mdc-ripple-hover-state-layer-color, #000)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:hover::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-state-layer-opacity, 0.04)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}`;
let Zt = class extends Yt {
}
;
function Jt(t, e, i) {
    if (void 0 !== e)
        return function(t, e, i) {
            const o = t.constructor;
            if (!i) {
                const t = `__${e}`;
                if (!(i = o.getPropertyDescriptor(e, t)))
                    throw new Error("@ariaProperty must be used after a @property decorator")
            }
            const r = i;
            let n = "";
            if (!r.set)
                throw new Error(`@ariaProperty requires a setter for ${e}`);
            if (t.dispatchWizEvent)
                return i;
            const a = {
                configurable: !0,
                enumerable: !0,
                set(t) {
                    if ("" === n) {
                        const t = o.getPropertyOptions(e);
                        n = "string" == typeof t.attribute ? t.attribute : e
                    }
                    this.hasAttribute(n) && this.removeAttribute(n),
                    r.set.call(this, t)
                }
            };
            return r.get && (a.get = function() {
                return r.get.call(this)
            }
            ),
            a
        }(t, e, i);
    throw new Error("@ariaProperty only supports TypeScript Decorators")
}
Zt.styles = [Xt],
Zt = o([pt("mwc-ripple")], Zt);
class Qt {
    constructor(t) {
        this.startPress = e=>{
            t().then((t=>{
                t && t.startPress(e)
            }
            ))
        }
        ,
        this.endPress = ()=>{
            t().then((t=>{
                t && t.endPress()
            }
            ))
        }
        ,
        this.startFocus = ()=>{
            t().then((t=>{
                t && t.startFocus()
            }
            ))
        }
        ,
        this.endFocus = ()=>{
            t().then((t=>{
                t && t.endFocus()
            }
            ))
        }
        ,
        this.startHover = ()=>{
            t().then((t=>{
                t && t.startHover()
            }
            ))
        }
        ,
        this.endHover = ()=>{
            t().then((t=>{
                t && t.endHover()
            }
            ))
        }
    }
}
const te = t=>null != t ? t : K;
class ee extends ct {
    constructor() {
        super(...arguments),
        this.raised = !1,
        this.unelevated = !1,
        this.outlined = !1,
        this.dense = !1,
        this.disabled = !1,
        this.trailingIcon = !1,
        this.fullwidth = !1,
        this.icon = "",
        this.label = "",
        this.expandContent = !1,
        this.shouldRenderRipple = !1,
        this.rippleHandlers = new Qt((()=>(this.shouldRenderRipple = !0,
        this.ripple)))
    }
    renderOverlay() {
        return V``
    }
    renderRipple() {
        const t = this.raised || this.unelevated;
        return this.shouldRenderRipple ? V`<mwc-ripple class="ripple" .primary="${!t}" .disabled="${this.disabled}"></mwc-ripple>` : ""
    }
    focus() {
        const t = this.buttonElement;
        t && (this.rippleHandlers.startFocus(),
        t.focus())
    }
    blur() {
        const t = this.buttonElement;
        t && (this.rippleHandlers.endFocus(),
        t.blur())
    }
    getRenderClasses() {
        return {
            "mdc-button--raised": this.raised,
            "mdc-button--unelevated": this.unelevated,
            "mdc-button--outlined": this.outlined,
            "mdc-button--dense": this.dense
        }
    }
    render() {
        return V`
      <button
          id="button"
          class="mdc-button ${Gt(this.getRenderClasses())}"
          ?disabled="${this.disabled}"
          aria-label="${this.label || this.icon}"
          aria-haspopup="${te(this.ariaHasPopup)}"
          @focus="${this.handleRippleFocus}"
          @blur="${this.handleRippleBlur}"
          @mousedown="${this.handleRippleActivate}"
          @mouseenter="${this.handleRippleMouseEnter}"
          @mouseleave="${this.handleRippleMouseLeave}"
          @touchstart="${this.handleRippleActivate}"
          @touchend="${this.handleRippleDeactivate}"
          @touchcancel="${this.handleRippleDeactivate}">
        ${this.renderOverlay()}
        ${this.renderRipple()}
        <span class="leading-icon">
          <slot name="icon">
            ${this.icon && !this.trailingIcon ? this.renderIcon() : ""}
          </slot>
        </span>
        <span class="mdc-button__label">${this.label}</span>
        <span class="slot-container ${Gt({
            flex: this.expandContent
        })}">
          <slot></slot>
        </span>
        <span class="trailing-icon">
          <slot name="trailingIcon">
            ${this.icon && this.trailingIcon ? this.renderIcon() : ""}
          </slot>
        </span>
      </button>`
    }
    renderIcon() {
        return V`
    <mwc-icon class="mdc-button__icon">
      ${this.icon}
    </mwc-icon>`
    }
    handleRippleActivate(t) {
        const e = ()=>{
            window.removeEventListener("mouseup", e),
            this.handleRippleDeactivate()
        }
        ;
        window.addEventListener("mouseup", e),
        this.rippleHandlers.startPress(t)
    }
    handleRippleDeactivate() {
        this.rippleHandlers.endPress()
    }
    handleRippleMouseEnter() {
        this.rippleHandlers.startHover()
    }
    handleRippleMouseLeave() {
        this.rippleHandlers.endHover()
    }
    handleRippleFocus() {
        this.rippleHandlers.startFocus()
    }
    handleRippleBlur() {
        this.rippleHandlers.endFocus()
    }
}
ee.shadowRootOptions = {
    mode: "open",
    delegatesFocus: !0
},
o([Jt, ht({
    type: String,
    attribute: "aria-haspopup"
})], ee.prototype, "ariaHasPopup", void 0),
o([ht({
    type: Boolean,
    reflect: !0
})], ee.prototype, "raised", void 0),
o([ht({
    type: Boolean,
    reflect: !0
})], ee.prototype, "unelevated", void 0),
o([ht({
    type: Boolean,
    reflect: !0
})], ee.prototype, "outlined", void 0),
o([ht({
    type: Boolean
})], ee.prototype, "dense", void 0),
o([ht({
    type: Boolean,
    reflect: !0
})], ee.prototype, "disabled", void 0),
o([ht({
    type: Boolean,
    attribute: "trailingicon"
})], ee.prototype, "trailingIcon", void 0),
o([ht({
    type: Boolean,
    reflect: !0
})], ee.prototype, "fullwidth", void 0),
o([ht({
    type: String
})], ee.prototype, "icon", void 0),
o([ht({
    type: String
})], ee.prototype, "label", void 0),
o([ht({
    type: Boolean
})], ee.prototype, "expandContent", void 0),
o([bt("#button")], ee.prototype, "buttonElement", void 0),
o([yt("mwc-ripple")], ee.prototype, "ripple", void 0),
o([ft()], ee.prototype, "shouldRenderRipple", void 0),
o([vt({
    passive: !0
})], ee.prototype, "handleRippleActivate", null);
const ie = l`.mdc-button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:var(--mdc-typography-button-text-transform, )}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:transparent}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__label{position:relative}.mdc-button .mdc-button__focus-ring{display:none}@media screen and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc( 100% + 4px );width:calc( 100% + 4px );display:block}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring::after,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring::after{content:"";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring::after,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring::after{border-color:CanvasText}}.mdc-button .mdc-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button{padding:0 8px 0 8px}.mdc-button--unelevated{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--unelevated.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--unelevated.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--raised.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--raised.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--outlined{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined .mdc-button__ripple{border-style:solid;border-color:transparent}.mdc-button{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised,.mdc-button--unelevated{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0, 0, 0, 0.12)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button--raised .mdc-button__ripple,.mdc-button--unelevated .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);padding:0 15px 0 15px;border-width:1px}.mdc-button--outlined:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button--outlined:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--outlined .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button--outlined .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined:disabled{border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined.mdc-button--icon-trailing{padding:0 11px 0 15px}.mdc-button--outlined.mdc-button--icon-leading{padding:0 15px 0 11px}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:1px}.mdc-button--outlined .mdc-button__touch{left:calc(-1 * 1px);width:calc(100% + 2 * 1px)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:transparent;vertical-align:top}:host([fullwidth]){width:100%}:host([raised]),:host([unelevated]){--mdc-ripple-color:#fff;--mdc-ripple-focus-opacity:0.24;--mdc-ripple-hover-opacity:0.08;--mdc-ripple-press-opacity:0.24}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon,.leading-icon ::slotted(*),.leading-icon .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}[dir=rtl] .trailing-icon ::slotted(*),[dir=rtl] .trailing-icon .mdc-button__icon,[dir=rtl] .leading-icon ::slotted(*),[dir=rtl] .leading-icon .mdc-button__icon,.trailing-icon ::slotted(*[dir=rtl]),.trailing-icon .mdc-button__icon[dir=rtl],.leading-icon ::slotted(*[dir=rtl]),.leading-icon .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .trailing-icon ::slotted(*),[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon ::slotted(*[dir=rtl]),.trailing-icon .mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}.slot-container{display:inline-flex;align-items:center;justify-content:center}.slot-container.flex{flex:auto}.mdc-button{flex:auto;overflow:hidden;padding-left:8px;padding-left:var(--mdc-button-horizontal-padding, 8px);padding-right:8px;padding-right:var(--mdc-button-horizontal-padding, 8px)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-focus, var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)))}.mdc-button--raised:hover{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-active, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-disabled, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised,.mdc-button--unelevated{padding-left:16px;padding-left:var(--mdc-button-horizontal-padding, 16px);padding-right:16px;padding-right:var(--mdc-button-horizontal-padding, 16px)}.mdc-button--outlined{border-width:1px;border-width:var(--mdc-button-outline-width, 1px);padding-left:calc(16px - 1px);padding-left:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px));padding-right:calc(16px - 1px);padding-right:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px))}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-outline-color, rgba(0, 0, 0, 0.12))}.mdc-button--outlined .ripple{top:calc(-1 * 1px);top:calc(-1 * var(--mdc-button-outline-width, 1px));left:calc(-1 * 1px);left:calc(-1 * var(--mdc-button-outline-width, 1px));right:initial;right:initial;border-width:1px;border-width:var(--mdc-button-outline-width, 1px);border-style:solid;border-color:transparent}[dir=rtl] .mdc-button--outlined .ripple,.mdc-button--outlined .ripple[dir=rtl]{left:initial;left:initial;right:calc(-1 * 1px);right:calc(-1 * var(--mdc-button-outline-width, 1px))}.mdc-button--dense{height:28px;margin-top:0;margin-bottom:0}.mdc-button--dense .mdc-button__touch{height:100%}:host([disabled]){pointer-events:none}:host([disabled]) .mdc-button{color:rgba(0, 0, 0, 0.38);color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-button--raised,:host([disabled]) .mdc-button--unelevated{background-color:rgba(0, 0, 0, 0.12);background-color:var(--mdc-button-disabled-fill-color, rgba(0, 0, 0, 0.12))}:host([disabled]) .mdc-button--outlined{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-disabled-outline-color, rgba(0, 0, 0, 0.12))}`;
class oe extends ee {
}
oe.styles = [ie, l`
      .mdc-button {
        min-width: initial;
      }
      :host([text-left]) .mdc-button__label {
        text-align: left;
      }
    `],
customElements.define("ewt-button", oe),
(()=>{
    var t, e, i;
    const o = Symbol()
      , r = Symbol()
      , n = Symbol()
      , a = Symbol()
      , s = Symbol()
      , d = Symbol()
      , c = Symbol()
      , l = Symbol()
      , p = Symbol()
      , u = Symbol()
      , m = Symbol()
      , h = Symbol()
      , f = Symbol();
    class g {
        constructor() {
            this[t] = [],
            this[e] = [],
            this[i] = new Set
        }
        destructor() {
            this[p](this[n]);
            const t = this;
            t[o] = null,
            t[n] = null,
            t[r] = null
        }
        get top() {
            const t = this[o];
            return t[t.length - 1] || null
        }
        push(t) {
            t && t !== this.top && (this.remove(t),
            this[d](t),
            this[o].push(t))
        }
        remove(t) {
            const e = this[o].indexOf(t);
            return -1 !== e && (this[o].splice(e, 1),
            e === this[o].length && this[d](this.top),
            !0)
        }
        pop() {
            const t = this.top;
            return t && this.remove(t),
            t
        }
        has(t) {
            return -1 !== this[o].indexOf(t)
        }
        [(t = o,
        e = n,
        i = r,
        d)](t) {
            const e = this[r]
              , i = this[n];
            if (!t)
                return this[p](i),
                e.clear(),
                void (this[n] = []);
            const o = this[u](t);
            if (o[o.length - 1].parentNode !== document.body)
                throw Error("Non-connected element cannot be a blocking element");
            this[n] = o;
            const a = this[m](t);
            if (!i.length)
                return void this[l](o, a, e);
            let s = i.length - 1
              , d = o.length - 1;
            for (; s > 0 && d > 0 && i[s] === o[d]; )
                s--,
                d--;
            i[s] !== o[d] && this[c](i[s], o[d]),
            s > 0 && this[p](i.slice(0, s)),
            d > 0 && this[l](o.slice(0, d), a, null)
        }
        [c](t, e) {
            const i = t[a];
            this[h](t) && !t.inert && (t.inert = !0,
            i.add(t)),
            i.has(e) && (e.inert = !1,
            i.delete(e)),
            e[s] = t[s],
            e[a] = i,
            t[s] = void 0,
            t[a] = void 0
        }
        [p](t) {
            for (const e of t) {
                e[s].disconnect(),
                e[s] = void 0;
                const t = e[a];
                for (const e of t)
                    e.inert = !1;
                e[a] = void 0
            }
        }
        [l](t, e, i) {
            for (const o of t) {
                const t = o.parentNode
                  , r = t.children
                  , n = new Set;
                for (let t = 0; t < r.length; t++) {
                    const a = r[t];
                    a === o || !this[h](a) || e && e.has(a) || (i && a.inert ? i.add(a) : (a.inert = !0,
                    n.add(a)))
                }
                o[a] = n;
                const d = new MutationObserver(this[f].bind(this));
                o[s] = d;
                let c = t;
                const l = c;
                l.__shady && l.host && (c = l.host),
                d.observe(c, {
                    childList: !0
                })
            }
        }
        [f](t) {
            const e = this[n]
              , i = this[r];
            for (const o of t) {
                const t = o.target.host || o.target
                  , r = t === document.body ? e.length : e.indexOf(t)
                  , n = e[r - 1]
                  , s = n[a];
                for (let t = 0; t < o.removedNodes.length; t++) {
                    const e = o.removedNodes[t];
                    if (e === n)
                        return console.info("Detected removal of the top Blocking Element."),
                        void this.pop();
                    s.has(e) && (e.inert = !1,
                    s.delete(e))
                }
                for (let t = 0; t < o.addedNodes.length; t++) {
                    const e = o.addedNodes[t];
                    this[h](e) && (i && e.inert ? i.add(e) : (e.inert = !0,
                    s.add(e)))
                }
            }
        }
        [h](t) {
            return !1 === /^(style|template|script)$/.test(t.localName)
        }
        [u](t) {
            const e = [];
            let i = t;
            for (; i && i !== document.body; )
                if (i.nodeType === Node.ELEMENT_NODE && e.push(i),
                i.assignedSlot) {
                    for (; i = i.assignedSlot; )
                        e.push(i);
                    i = e.pop()
                } else
                    i = i.parentNode || i.host;
            return e
        }
        [m](t) {
            const e = t.shadowRoot;
            if (!e)
                return null;
            const i = new Set;
            let o, r, n;
            const a = e.querySelectorAll("slot");
            if (a.length && a[0].assignedNodes)
                for (o = 0; o < a.length; o++)
                    for (n = a[o].assignedNodes({
                        flatten: !0
                    }),
                    r = 0; r < n.length; r++)
                        n[r].nodeType === Node.ELEMENT_NODE && i.add(n[r]);
            return i
        }
    }
    document.$blockingElements = new g
}
)();
var re = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var o = e[i];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(t, o.key, o)
        }
    }
    return function(e, i, o) {
        return i && t(e.prototype, i),
        o && t(e, o),
        e
    }
}();
function ne(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function() {
    if ("undefined" != typeof window) {
        var t = Array.prototype.slice
          , e = Element.prototype.matches || Element.prototype.msMatchesSelector
          , i = ["a[href]", "area[href]", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", "button:not([disabled])", "details", "summary", "iframe", "object", "embed", "[contenteditable]"].join(",")
          , o = function() {
            function o(t, e) {
                ne(this, o),
                this._inertManager = e,
                this._rootElement = t,
                this._managedNodes = new Set,
                this._rootElement.hasAttribute("aria-hidden") ? this._savedAriaHidden = this._rootElement.getAttribute("aria-hidden") : this._savedAriaHidden = null,
                this._rootElement.setAttribute("aria-hidden", "true"),
                this._makeSubtreeUnfocusable(this._rootElement),
                this._observer = new MutationObserver(this._onMutation.bind(this)),
                this._observer.observe(this._rootElement, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                })
            }
            return re(o, [{
                key: "destructor",
                value: function() {
                    this._observer.disconnect(),
                    this._rootElement && (null !== this._savedAriaHidden ? this._rootElement.setAttribute("aria-hidden", this._savedAriaHidden) : this._rootElement.removeAttribute("aria-hidden")),
                    this._managedNodes.forEach((function(t) {
                        this._unmanageNode(t.node)
                    }
                    ), this),
                    this._observer = null,
                    this._rootElement = null,
                    this._managedNodes = null,
                    this._inertManager = null
                }
            }, {
                key: "_makeSubtreeUnfocusable",
                value: function(t) {
                    var e = this;
                    s(t, (function(t) {
                        return e._visitNode(t)
                    }
                    ));
                    var i = document.activeElement;
                    if (!document.body.contains(t)) {
                        for (var o = t, r = void 0; o; ) {
                            if (o.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                                r = o;
                                break
                            }
                            o = o.parentNode
                        }
                        r && (i = r.activeElement)
                    }
                    t.contains(i) && (i.blur(),
                    i === document.activeElement && document.body.focus())
                }
            }, {
                key: "_visitNode",
                value: function(t) {
                    if (t.nodeType === Node.ELEMENT_NODE) {
                        var o = t;
                        o !== this._rootElement && o.hasAttribute("inert") && this._adoptInertRoot(o),
                        (e.call(o, i) || o.hasAttribute("tabindex")) && this._manageNode(o)
                    }
                }
            }, {
                key: "_manageNode",
                value: function(t) {
                    var e = this._inertManager.register(t, this);
                    this._managedNodes.add(e)
                }
            }, {
                key: "_unmanageNode",
                value: function(t) {
                    var e = this._inertManager.deregister(t, this);
                    e && this._managedNodes.delete(e)
                }
            }, {
                key: "_unmanageSubtree",
                value: function(t) {
                    var e = this;
                    s(t, (function(t) {
                        return e._unmanageNode(t)
                    }
                    ))
                }
            }, {
                key: "_adoptInertRoot",
                value: function(t) {
                    var e = this._inertManager.getInertRoot(t);
                    e || (this._inertManager.setInert(t, !0),
                    e = this._inertManager.getInertRoot(t)),
                    e.managedNodes.forEach((function(t) {
                        this._manageNode(t.node)
                    }
                    ), this)
                }
            }, {
                key: "_onMutation",
                value: function(e, i) {
                    e.forEach((function(e) {
                        var i = e.target;
                        if ("childList" === e.type)
                            t.call(e.addedNodes).forEach((function(t) {
                                this._makeSubtreeUnfocusable(t)
                            }
                            ), this),
                            t.call(e.removedNodes).forEach((function(t) {
                                this._unmanageSubtree(t)
                            }
                            ), this);
                        else if ("attributes" === e.type)
                            if ("tabindex" === e.attributeName)
                                this._manageNode(i);
                            else if (i !== this._rootElement && "inert" === e.attributeName && i.hasAttribute("inert")) {
                                this._adoptInertRoot(i);
                                var o = this._inertManager.getInertRoot(i);
                                this._managedNodes.forEach((function(t) {
                                    i.contains(t.node) && o._manageNode(t.node)
                                }
                                ))
                            }
                    }
                    ), this)
                }
            }, {
                key: "managedNodes",
                get: function() {
                    return new Set(this._managedNodes)
                }
            }, {
                key: "hasSavedAriaHidden",
                get: function() {
                    return null !== this._savedAriaHidden
                }
            }, {
                key: "savedAriaHidden",
                set: function(t) {
                    this._savedAriaHidden = t
                },
                get: function() {
                    return this._savedAriaHidden
                }
            }]),
            o
        }()
          , r = function() {
            function t(e, i) {
                ne(this, t),
                this._node = e,
                this._overrodeFocusMethod = !1,
                this._inertRoots = new Set([i]),
                this._savedTabIndex = null,
                this._destroyed = !1,
                this.ensureUntabbable()
            }
            return re(t, [{
                key: "destructor",
                value: function() {
                    if (this._throwIfDestroyed(),
                    this._node && this._node.nodeType === Node.ELEMENT_NODE) {
                        var t = this._node;
                        null !== this._savedTabIndex ? t.setAttribute("tabindex", this._savedTabIndex) : t.removeAttribute("tabindex"),
                        this._overrodeFocusMethod && delete t.focus
                    }
                    this._node = null,
                    this._inertRoots = null,
                    this._destroyed = !0
                }
            }, {
                key: "_throwIfDestroyed",
                value: function() {
                    if (this.destroyed)
                        throw new Error("Trying to access destroyed InertNode")
                }
            }, {
                key: "ensureUntabbable",
                value: function() {
                    if (this.node.nodeType === Node.ELEMENT_NODE) {
                        var t = this.node;
                        if (e.call(t, i)) {
                            if (-1 === t.tabIndex && this.hasSavedTabIndex)
                                return;
                            t.hasAttribute("tabindex") && (this._savedTabIndex = t.tabIndex),
                            t.setAttribute("tabindex", "-1"),
                            t.nodeType === Node.ELEMENT_NODE && (t.focus = function() {}
                            ,
                            this._overrodeFocusMethod = !0)
                        } else
                            t.hasAttribute("tabindex") && (this._savedTabIndex = t.tabIndex,
                            t.removeAttribute("tabindex"))
                    }
                }
            }, {
                key: "addInertRoot",
                value: function(t) {
                    this._throwIfDestroyed(),
                    this._inertRoots.add(t)
                }
            }, {
                key: "removeInertRoot",
                value: function(t) {
                    this._throwIfDestroyed(),
                    this._inertRoots.delete(t),
                    0 === this._inertRoots.size && this.destructor()
                }
            }, {
                key: "destroyed",
                get: function() {
                    return this._destroyed
                }
            }, {
                key: "hasSavedTabIndex",
                get: function() {
                    return null !== this._savedTabIndex
                }
            }, {
                key: "node",
                get: function() {
                    return this._throwIfDestroyed(),
                    this._node
                }
            }, {
                key: "savedTabIndex",
                set: function(t) {
                    this._throwIfDestroyed(),
                    this._savedTabIndex = t
                },
                get: function() {
                    return this._throwIfDestroyed(),
                    this._savedTabIndex
                }
            }]),
            t
        }()
          , n = function() {
            function i(t) {
                if (ne(this, i),
                !t)
                    throw new Error("Missing required argument; InertManager needs to wrap a document.");
                this._document = t,
                this._managedNodes = new Map,
                this._inertRoots = new Map,
                this._observer = new MutationObserver(this._watchForInert.bind(this)),
                d(t.head || t.body || t.documentElement),
                "loading" === t.readyState ? t.addEventListener("DOMContentLoaded", this._onDocumentLoaded.bind(this)) : this._onDocumentLoaded()
            }
            return re(i, [{
                key: "setInert",
                value: function(t, e) {
                    if (e) {
                        if (this._inertRoots.has(t))
                            return;
                        var i = new o(t,this);
                        if (t.setAttribute("inert", ""),
                        this._inertRoots.set(t, i),
                        !this._document.body.contains(t))
                            for (var r = t.parentNode; r; )
                                11 === r.nodeType && d(r),
                                r = r.parentNode
                    } else {
                        if (!this._inertRoots.has(t))
                            return;
                        this._inertRoots.get(t).destructor(),
                        this._inertRoots.delete(t),
                        t.removeAttribute("inert")
                    }
                }
            }, {
                key: "getInertRoot",
                value: function(t) {
                    return this._inertRoots.get(t)
                }
            }, {
                key: "register",
                value: function(t, e) {
                    var i = this._managedNodes.get(t);
                    return void 0 !== i ? i.addInertRoot(e) : i = new r(t,e),
                    this._managedNodes.set(t, i),
                    i
                }
            }, {
                key: "deregister",
                value: function(t, e) {
                    var i = this._managedNodes.get(t);
                    return i ? (i.removeInertRoot(e),
                    i.destroyed && this._managedNodes.delete(t),
                    i) : null
                }
            }, {
                key: "_onDocumentLoaded",
                value: function() {
                    t.call(this._document.querySelectorAll("[inert]")).forEach((function(t) {
                        this.setInert(t, !0)
                    }
                    ), this),
                    this._observer.observe(this._document.body || this._document.documentElement, {
                        attributes: !0,
                        subtree: !0,
                        childList: !0
                    })
                }
            }, {
                key: "_watchForInert",
                value: function(i, o) {
                    var r = this;
                    i.forEach((function(i) {
                        switch (i.type) {
                        case "childList":
                            t.call(i.addedNodes).forEach((function(i) {
                                if (i.nodeType === Node.ELEMENT_NODE) {
                                    var o = t.call(i.querySelectorAll("[inert]"));
                                    e.call(i, "[inert]") && o.unshift(i),
                                    o.forEach((function(t) {
                                        this.setInert(t, !0)
                                    }
                                    ), r)
                                }
                            }
                            ), r);
                            break;
                        case "attributes":
                            if ("inert" !== i.attributeName)
                                return;
                            var o = i.target
                              , n = o.hasAttribute("inert");
                            r.setInert(o, n)
                        }
                    }
                    ), this)
                }
            }]),
            i
        }();
        if (!Element.prototype.hasOwnProperty("inert")) {
            var a = new n(document);
            Object.defineProperty(Element.prototype, "inert", {
                enumerable: !0,
                get: function() {
                    return this.hasAttribute("inert")
                },
                set: function(t) {
                    a.setInert(this, t)
                }
            })
        }
    }
    function s(t, e, i) {
        if (t.nodeType == Node.ELEMENT_NODE) {
            var o = t;
            e && e(o);
            var r = o.shadowRoot;
            if (r)
                return void s(r, e);
            if ("content" == o.localName) {
                for (var n = o, a = n.getDistributedNodes ? n.getDistributedNodes() : [], d = 0; d < a.length; d++)
                    s(a[d], e);
                return
            }
            if ("slot" == o.localName) {
                for (var c = o, l = c.assignedNodes ? c.assignedNodes({
                    flatten: !0
                }) : [], p = 0; p < l.length; p++)
                    s(l[p], e);
                return
            }
        }
        for (var u = t.firstChild; null != u; )
            s(u, e),
            u = u.nextSibling
    }
    function d(t) {
        if (!t.querySelector("style#inert-style, link#inert-style")) {
            var e = document.createElement("style");
            e.setAttribute("id", "inert-style"),
            e.textContent = "\n[inert] {\n  pointer-events: none;\n  cursor: default;\n}\n\n[inert], [inert] * {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n",
            t.appendChild(e)
        }
    }
}();
var ae, se = {
    CLOSING: "mdc-dialog--closing",
    OPEN: "mdc-dialog--open",
    OPENING: "mdc-dialog--opening",
    SCROLLABLE: "mdc-dialog--scrollable",
    SCROLL_LOCK: "mdc-dialog-scroll-lock",
    STACKED: "mdc-dialog--stacked",
    FULLSCREEN: "mdc-dialog--fullscreen",
    SCROLL_DIVIDER_HEADER: "mdc-dialog-scroll-divider-header",
    SCROLL_DIVIDER_FOOTER: "mdc-dialog-scroll-divider-footer",
    SURFACE_SCRIM_SHOWN: "mdc-dialog__surface-scrim--shown",
    SURFACE_SCRIM_SHOWING: "mdc-dialog__surface-scrim--showing",
    SURFACE_SCRIM_HIDING: "mdc-dialog__surface-scrim--hiding",
    SCRIM_HIDDEN: "mdc-dialog__scrim--hidden"
}, de = {
    ACTION_ATTRIBUTE: "data-mdc-dialog-action",
    BUTTON_DEFAULT_ATTRIBUTE: "data-mdc-dialog-button-default",
    BUTTON_SELECTOR: ".mdc-dialog__button",
    CLOSED_EVENT: "MDCDialog:closed",
    CLOSE_ACTION: "close",
    CLOSING_EVENT: "MDCDialog:closing",
    CONTAINER_SELECTOR: ".mdc-dialog__container",
    CONTENT_SELECTOR: ".mdc-dialog__content",
    DESTROY_ACTION: "destroy",
    INITIAL_FOCUS_ATTRIBUTE: "data-mdc-dialog-initial-focus",
    OPENED_EVENT: "MDCDialog:opened",
    OPENING_EVENT: "MDCDialog:opening",
    SCRIM_SELECTOR: ".mdc-dialog__scrim",
    SUPPRESS_DEFAULT_PRESS_SELECTOR: ["textarea", ".mdc-menu .mdc-list-item", ".mdc-menu .mdc-deprecated-list-item"].join(", "),
    SURFACE_SELECTOR: ".mdc-dialog__surface"
}, ce = {
    DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
    DIALOG_ANIMATION_OPEN_TIME_MS: 150
}, le = function() {
    function t() {
        this.rafIDs = new Map
    }
    return t.prototype.request = function(t, e) {
        var i = this;
        this.cancel(t);
        var o = requestAnimationFrame((function(o) {
            i.rafIDs.delete(t),
            e(o)
        }
        ));
        this.rafIDs.set(t, o)
    }
    ,
    t.prototype.cancel = function(t) {
        var e = this.rafIDs.get(t);
        e && (cancelAnimationFrame(e),
        this.rafIDs.delete(t))
    }
    ,
    t.prototype.cancelAll = function() {
        var t = this;
        this.rafIDs.forEach((function(e, i) {
            t.cancel(i)
        }
        ))
    }
    ,
    t.prototype.getQueue = function() {
        var t = [];
        return this.rafIDs.forEach((function(e, i) {
            t.push(i)
        }
        )),
        t
    }
    ,
    t
}();
!function(t) {
    t.POLL_SCROLL_POS = "poll_scroll_position",
    t.POLL_LAYOUT_CHANGE = "poll_layout_change"
}(ae || (ae = {}));
var pe = function(t) {
    function o(e) {
        var r = t.call(this, i(i({}, o.defaultAdapter), e)) || this;
        return r.dialogOpen = !1,
        r.isFullscreen = !1,
        r.animationFrame = 0,
        r.animationTimer = 0,
        r.escapeKeyAction = de.CLOSE_ACTION,
        r.scrimClickAction = de.CLOSE_ACTION,
        r.autoStackButtons = !0,
        r.areButtonsStacked = !1,
        r.suppressDefaultPressSelector = de.SUPPRESS_DEFAULT_PRESS_SELECTOR,
        r.animFrame = new le,
        r.contentScrollHandler = function() {
            r.handleScrollEvent()
        }
        ,
        r.windowResizeHandler = function() {
            r.layout()
        }
        ,
        r.windowOrientationChangeHandler = function() {
            r.layout()
        }
        ,
        r
    }
    return e(o, t),
    Object.defineProperty(o, "cssClasses", {
        get: function() {
            return se
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(o, "strings", {
        get: function() {
            return de
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(o, "numbers", {
        get: function() {
            return ce
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(o, "defaultAdapter", {
        get: function() {
            return {
                addBodyClass: function() {},
                addClass: function() {},
                areButtonsStacked: function() {
                    return !1
                },
                clickDefaultButton: function() {},
                eventTargetMatches: function() {
                    return !1
                },
                getActionFromEvent: function() {
                    return ""
                },
                getInitialFocusEl: function() {
                    return null
                },
                hasClass: function() {
                    return !1
                },
                isContentScrollable: function() {
                    return !1
                },
                notifyClosed: function() {},
                notifyClosing: function() {},
                notifyOpened: function() {},
                notifyOpening: function() {},
                releaseFocus: function() {},
                removeBodyClass: function() {},
                removeClass: function() {},
                reverseButtons: function() {},
                trapFocus: function() {},
                registerContentEventHandler: function() {},
                deregisterContentEventHandler: function() {},
                isScrollableContentAtTop: function() {
                    return !1
                },
                isScrollableContentAtBottom: function() {
                    return !1
                },
                registerWindowEventHandler: function() {},
                deregisterWindowEventHandler: function() {}
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    o.prototype.init = function() {
        this.adapter.hasClass(se.STACKED) && this.setAutoStackButtons(!1),
        this.isFullscreen = this.adapter.hasClass(se.FULLSCREEN)
    }
    ,
    o.prototype.destroy = function() {
        this.animationTimer && (clearTimeout(this.animationTimer),
        this.handleAnimationTimerEnd()),
        this.isFullscreen && this.adapter.deregisterContentEventHandler("scroll", this.contentScrollHandler),
        this.animFrame.cancelAll(),
        this.adapter.deregisterWindowEventHandler("resize", this.windowResizeHandler),
        this.adapter.deregisterWindowEventHandler("orientationchange", this.windowOrientationChangeHandler)
    }
    ,
    o.prototype.open = function(t) {
        var e = this;
        this.dialogOpen = !0,
        this.adapter.notifyOpening(),
        this.adapter.addClass(se.OPENING),
        this.isFullscreen && this.adapter.registerContentEventHandler("scroll", this.contentScrollHandler),
        t && t.isAboveFullscreenDialog && this.adapter.addClass(se.SCRIM_HIDDEN),
        this.adapter.registerWindowEventHandler("resize", this.windowResizeHandler),
        this.adapter.registerWindowEventHandler("orientationchange", this.windowOrientationChangeHandler),
        this.runNextAnimationFrame((function() {
            e.adapter.addClass(se.OPEN),
            e.adapter.addBodyClass(se.SCROLL_LOCK),
            e.layout(),
            e.animationTimer = setTimeout((function() {
                e.handleAnimationTimerEnd(),
                e.adapter.trapFocus(e.adapter.getInitialFocusEl()),
                e.adapter.notifyOpened()
            }
            ), ce.DIALOG_ANIMATION_OPEN_TIME_MS)
        }
        ))
    }
    ,
    o.prototype.close = function(t) {
        var e = this;
        void 0 === t && (t = ""),
        this.dialogOpen && (this.dialogOpen = !1,
        this.adapter.notifyClosing(t),
        this.adapter.addClass(se.CLOSING),
        this.adapter.removeClass(se.OPEN),
        this.adapter.removeBodyClass(se.SCROLL_LOCK),
        this.isFullscreen && this.adapter.deregisterContentEventHandler("scroll", this.contentScrollHandler),
        this.adapter.deregisterWindowEventHandler("resize", this.windowResizeHandler),
        this.adapter.deregisterWindowEventHandler("orientationchange", this.windowOrientationChangeHandler),
        cancelAnimationFrame(this.animationFrame),
        this.animationFrame = 0,
        clearTimeout(this.animationTimer),
        this.animationTimer = setTimeout((function() {
            e.adapter.releaseFocus(),
            e.handleAnimationTimerEnd(),
            e.adapter.notifyClosed(t)
        }
        ), ce.DIALOG_ANIMATION_CLOSE_TIME_MS))
    }
    ,
    o.prototype.showSurfaceScrim = function() {
        var t = this;
        this.adapter.addClass(se.SURFACE_SCRIM_SHOWING),
        this.runNextAnimationFrame((function() {
            t.adapter.addClass(se.SURFACE_SCRIM_SHOWN)
        }
        ))
    }
    ,
    o.prototype.hideSurfaceScrim = function() {
        this.adapter.removeClass(se.SURFACE_SCRIM_SHOWN),
        this.adapter.addClass(se.SURFACE_SCRIM_HIDING)
    }
    ,
    o.prototype.handleSurfaceScrimTransitionEnd = function() {
        this.adapter.removeClass(se.SURFACE_SCRIM_HIDING),
        this.adapter.removeClass(se.SURFACE_SCRIM_SHOWING)
    }
    ,
    o.prototype.isOpen = function() {
        return this.dialogOpen
    }
    ,
    o.prototype.getEscapeKeyAction = function() {
        return this.escapeKeyAction
    }
    ,
    o.prototype.setEscapeKeyAction = function(t) {
        this.escapeKeyAction = t
    }
    ,
    o.prototype.getScrimClickAction = function() {
        return this.scrimClickAction
    }
    ,
    o.prototype.setScrimClickAction = function(t) {
        this.scrimClickAction = t
    }
    ,
    o.prototype.getAutoStackButtons = function() {
        return this.autoStackButtons
    }
    ,
    o.prototype.setAutoStackButtons = function(t) {
        this.autoStackButtons = t
    }
    ,
    o.prototype.getSuppressDefaultPressSelector = function() {
        return this.suppressDefaultPressSelector
    }
    ,
    o.prototype.setSuppressDefaultPressSelector = function(t) {
        this.suppressDefaultPressSelector = t
    }
    ,
    o.prototype.layout = function() {
        var t = this;
        this.animFrame.request(ae.POLL_LAYOUT_CHANGE, (function() {
            t.layoutInternal()
        }
        ))
    }
    ,
    o.prototype.handleClick = function(t) {
        if (this.adapter.eventTargetMatches(t.target, de.SCRIM_SELECTOR) && "" !== this.scrimClickAction)
            this.close(this.scrimClickAction);
        else {
            var e = this.adapter.getActionFromEvent(t);
            e && this.close(e)
        }
    }
    ,
    o.prototype.handleKeydown = function(t) {
        var e = "Enter" === t.key || 13 === t.keyCode;
        if (e && !this.adapter.getActionFromEvent(t)) {
            var i = t.composedPath ? t.composedPath()[0] : t.target
              , o = !this.suppressDefaultPressSelector || !this.adapter.eventTargetMatches(i, this.suppressDefaultPressSelector);
            e && o && this.adapter.clickDefaultButton()
        }
    }
    ,
    o.prototype.handleDocumentKeydown = function(t) {
        ("Escape" === t.key || 27 === t.keyCode) && "" !== this.escapeKeyAction && this.close(this.escapeKeyAction)
    }
    ,
    o.prototype.handleScrollEvent = function() {
        var t = this;
        this.animFrame.request(ae.POLL_SCROLL_POS, (function() {
            t.toggleScrollDividerHeader(),
            t.toggleScrollDividerFooter()
        }
        ))
    }
    ,
    o.prototype.layoutInternal = function() {
        this.autoStackButtons && this.detectStackedButtons(),
        this.toggleScrollableClasses()
    }
    ,
    o.prototype.handleAnimationTimerEnd = function() {
        this.animationTimer = 0,
        this.adapter.removeClass(se.OPENING),
        this.adapter.removeClass(se.CLOSING)
    }
    ,
    o.prototype.runNextAnimationFrame = function(t) {
        var e = this;
        cancelAnimationFrame(this.animationFrame),
        this.animationFrame = requestAnimationFrame((function() {
            e.animationFrame = 0,
            clearTimeout(e.animationTimer),
            e.animationTimer = setTimeout(t, 0)
        }
        ))
    }
    ,
    o.prototype.detectStackedButtons = function() {
        this.adapter.removeClass(se.STACKED);
        var t = this.adapter.areButtonsStacked();
        t && this.adapter.addClass(se.STACKED),
        t !== this.areButtonsStacked && (this.adapter.reverseButtons(),
        this.areButtonsStacked = t)
    }
    ,
    o.prototype.toggleScrollableClasses = function() {
        this.adapter.removeClass(se.SCROLLABLE),
        this.adapter.isContentScrollable() && (this.adapter.addClass(se.SCROLLABLE),
        this.isFullscreen && (this.toggleScrollDividerHeader(),
        this.toggleScrollDividerFooter()))
    }
    ,
    o.prototype.toggleScrollDividerHeader = function() {
        this.adapter.isScrollableContentAtTop() ? this.adapter.hasClass(se.SCROLL_DIVIDER_HEADER) && this.adapter.removeClass(se.SCROLL_DIVIDER_HEADER) : this.adapter.addClass(se.SCROLL_DIVIDER_HEADER)
    }
    ,
    o.prototype.toggleScrollDividerFooter = function() {
        this.adapter.isScrollableContentAtBottom() ? this.adapter.hasClass(se.SCROLL_DIVIDER_FOOTER) && this.adapter.removeClass(se.SCROLL_DIVIDER_FOOTER) : this.adapter.addClass(se.SCROLL_DIVIDER_FOOTER)
    }
    ,
    o
}(Nt);
function ue(t) {
    return void 0 === t && (t = window),
    !!function(t) {
        void 0 === t && (t = window);
        var e = !1;
        try {
            var i = {
                get passive() {
                    return e = !0,
                    !1
                }
            }
              , o = function() {};
            t.document.addEventListener("test", o, i),
            t.document.removeEventListener("test", o, i)
        } catch (t) {
            e = !1
        }
        return e
    }(t) && {
        passive: !0
    }
}
const me = t=>(e,i)=>{
    if (e.constructor._observers) {
        if (!e.constructor.hasOwnProperty("_observers")) {
            const t = e.constructor._observers;
            e.constructor._observers = new Map,
            t.forEach(((t,i)=>e.constructor._observers.set(i, t)))
        }
    } else {
        e.constructor._observers = new Map;
        const t = e.updated;
        e.updated = function(e) {
            t.call(this, e),
            e.forEach(((t,e)=>{
                const i = this.constructor._observers.get(e);
                void 0 !== i && i.call(this, this[e], t)
            }
            ))
        }
    }
    e.constructor._observers.set(i, t)
}
  , he = document.$blockingElements;
class fe extends It {
    constructor() {
        super(...arguments),
        this.hideActions = !1,
        this.stacked = !1,
        this.heading = "",
        this.scrimClickAction = "close",
        this.escapeKeyAction = "close",
        this.open = !1,
        this.defaultAction = "close",
        this.actionAttribute = "dialogAction",
        this.initialFocusAttribute = "dialogInitialFocus",
        this.initialSupressDefaultPressSelector = "",
        this.mdcFoundationClass = pe,
        this.boundHandleClick = null,
        this.boundHandleKeydown = null,
        this.boundHandleDocumentKeydown = null
    }
    set suppressDefaultPressSelector(t) {
        this.mdcFoundation ? this.mdcFoundation.setSuppressDefaultPressSelector(t) : this.initialSupressDefaultPressSelector = t
    }
    get suppressDefaultPressSelector() {
        return this.mdcFoundation ? this.mdcFoundation.getSuppressDefaultPressSelector() : this.initialSupressDefaultPressSelector
    }
    get primaryButton() {
        let t = this.primarySlot.assignedNodes();
        t = t.filter((t=>t instanceof HTMLElement));
        const e = t[0];
        return e || null
    }
    emitNotification(t, e) {
        const i = new CustomEvent(t,{
            detail: e ? {
                action: e
            } : {}
        });
        this.dispatchEvent(i)
    }
    getInitialFocusEl() {
        const t = `[${this.initialFocusAttribute}]`
          , e = this.querySelector(t);
        if (e)
            return e;
        const i = this.primarySlot.assignedNodes({
            flatten: !0
        })
          , o = this.searchNodeTreesForAttribute(i, this.initialFocusAttribute);
        if (o)
            return o;
        const r = this.secondarySlot.assignedNodes({
            flatten: !0
        })
          , n = this.searchNodeTreesForAttribute(r, this.initialFocusAttribute);
        if (n)
            return n;
        const a = this.contentSlot.assignedNodes({
            flatten: !0
        });
        return this.searchNodeTreesForAttribute(a, this.initialFocusAttribute)
    }
    searchNodeTreesForAttribute(t, e) {
        for (const i of t)
            if (i instanceof HTMLElement) {
                if (i.hasAttribute(e))
                    return i;
                {
                    const t = i.querySelector(`[${e}]`);
                    if (t)
                        return t
                }
            }
        return null
    }
    createAdapter() {
        return Object.assign(Object.assign({}, Tt(this.mdcRoot)), {
            addBodyClass: ()=>document.body.style.overflow = "hidden",
            removeBodyClass: ()=>document.body.style.overflow = "",
            areButtonsStacked: ()=>this.stacked,
            clickDefaultButton: ()=>{
                const t = this.primaryButton;
                t && t.click()
            }
            ,
            eventTargetMatches: (t,e)=>!!t && St(t, e),
            getActionFromEvent: t=>{
                if (!t.target)
                    return "";
                const e = function(t, e) {
                    if (t.closest)
                        return t.closest(e);
                    for (var i = t; i; ) {
                        if (St(i, e))
                            return i;
                        i = i.parentElement
                    }
                    return null
                }(t.target, `[${this.actionAttribute}]`);
                return e && e.getAttribute(this.actionAttribute)
            }
            ,
            getInitialFocusEl: ()=>this.getInitialFocusEl(),
            isContentScrollable: ()=>{
                const t = this.contentElement;
                return !!t && t.scrollHeight > t.offsetHeight
            }
            ,
            notifyClosed: t=>this.emitNotification("closed", t),
            notifyClosing: t=>{
                this.closingDueToDisconnect || (this.open = !1),
                this.emitNotification("closing", t)
            }
            ,
            notifyOpened: ()=>this.emitNotification("opened"),
            notifyOpening: ()=>{
                this.open = !0,
                this.emitNotification("opening")
            }
            ,
            reverseButtons: ()=>{}
            ,
            releaseFocus: ()=>{
                he.remove(this)
            }
            ,
            trapFocus: t=>{
                this.isConnected && (he.push(this),
                t && t.focus())
            }
            ,
            registerContentEventHandler: (t,e)=>{
                this.contentElement.addEventListener(t, e)
            }
            ,
            deregisterContentEventHandler: (t,e)=>{
                this.contentElement.removeEventListener(t, e)
            }
            ,
            isScrollableContentAtTop: ()=>{
                const t = this.contentElement;
                return !!t && 0 === t.scrollTop
            }
            ,
            isScrollableContentAtBottom: ()=>{
                const t = this.contentElement;
                return !!t && Math.ceil(t.scrollHeight - t.scrollTop) === t.clientHeight
            }
            ,
            registerWindowEventHandler: (t,e)=>{
                window.addEventListener(t, e, ue())
            }
            ,
            deregisterWindowEventHandler: (t,e)=>{
                window.removeEventListener(t, e, ue())
            }
        })
    }
    render() {
        const t = {
            [se.STACKED]: this.stacked
        };
        let e = V``;
        this.heading && (e = this.renderHeading());
        const i = {
            "mdc-dialog__actions": !this.hideActions
        };
        return V`
    <div class="mdc-dialog ${Gt(t)}"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="title"
        aria-describedby="content">
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface">
          ${e}
          <div id="content" class="mdc-dialog__content">
            <slot id="contentSlot"></slot>
          </div>
          <footer
              id="actions"
              class="${Gt(i)}">
            <span>
              <slot name="secondaryAction"></slot>
            </span>
            <span>
             <slot name="primaryAction"></slot>
            </span>
          </footer>
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>`
    }
    renderHeading() {
        return V`
      <h2 id="title" class="mdc-dialog__title">${this.heading}</h2>`
    }
    firstUpdated() {
        super.firstUpdated(),
        this.mdcFoundation.setAutoStackButtons(!0),
        this.initialSupressDefaultPressSelector ? this.suppressDefaultPressSelector = this.initialSupressDefaultPressSelector : this.suppressDefaultPressSelector = [this.suppressDefaultPressSelector, "mwc-textarea", "mwc-menu mwc-list-item", "mwc-select mwc-list-item"].join(", "),
        this.boundHandleClick = this.mdcFoundation.handleClick.bind(this.mdcFoundation),
        this.boundHandleKeydown = this.mdcFoundation.handleKeydown.bind(this.mdcFoundation),
        this.boundHandleDocumentKeydown = this.mdcFoundation.handleDocumentKeydown.bind(this.mdcFoundation)
    }
    connectedCallback() {
        super.connectedCallback(),
        this.open && this.mdcFoundation && !this.mdcFoundation.isOpen() && (this.setEventListeners(),
        this.mdcFoundation.open())
    }
    disconnectedCallback() {
        super.disconnectedCallback(),
        this.open && this.mdcFoundation && (this.removeEventListeners(),
        this.closingDueToDisconnect = !0,
        this.mdcFoundation.close(this.currentAction || this.defaultAction),
        this.closingDueToDisconnect = !1,
        this.currentAction = void 0,
        he.remove(this))
    }
    forceLayout() {
        this.mdcFoundation.layout()
    }
    focus() {
        const t = this.getInitialFocusEl();
        t && t.focus()
    }
    blur() {
        if (!this.shadowRoot)
            return;
        const t = this.shadowRoot.activeElement;
        if (t)
            t instanceof HTMLElement && t.blur();
        else {
            const t = this.getRootNode()
              , e = t instanceof Document ? t.activeElement : null;
            e instanceof HTMLElement && e.blur()
        }
    }
    setEventListeners() {
        this.boundHandleClick && this.mdcRoot.addEventListener("click", this.boundHandleClick),
        this.boundHandleKeydown && this.mdcRoot.addEventListener("keydown", this.boundHandleKeydown, ue()),
        this.boundHandleDocumentKeydown && document.addEventListener("keydown", this.boundHandleDocumentKeydown, ue())
    }
    removeEventListeners() {
        this.boundHandleClick && this.mdcRoot.removeEventListener("click", this.boundHandleClick),
        this.boundHandleKeydown && this.mdcRoot.removeEventListener("keydown", this.boundHandleKeydown),
        this.boundHandleDocumentKeydown && document.removeEventListener("keydown", this.boundHandleDocumentKeydown)
    }
    close() {
        this.open = !1
    }
    show() {
        this.open = !0
    }
}
o([bt(".mdc-dialog")], fe.prototype, "mdcRoot", void 0),
o([bt('slot[name="primaryAction"]')], fe.prototype, "primarySlot", void 0),
o([bt('slot[name="secondaryAction"]')], fe.prototype, "secondarySlot", void 0),
o([bt("#contentSlot")], fe.prototype, "contentSlot", void 0),
o([bt(".mdc-dialog__content")], fe.prototype, "contentElement", void 0),
o([bt(".mdc-container")], fe.prototype, "conatinerElement", void 0),
o([ht({
    type: Boolean
})], fe.prototype, "hideActions", void 0),
o([ht({
    type: Boolean
}), me((function() {
    this.forceLayout()
}
))], fe.prototype, "stacked", void 0),
o([ht({
    type: String
})], fe.prototype, "heading", void 0),
o([ht({
    type: String
}), me((function(t) {
    this.mdcFoundation.setScrimClickAction(t)
}
))], fe.prototype, "scrimClickAction", void 0),
o([ht({
    type: String
}), me((function(t) {
    this.mdcFoundation.setEscapeKeyAction(t)
}
))], fe.prototype, "escapeKeyAction", void 0),
o([ht({
    type: Boolean,
    reflect: !0
}), me((function(t) {
    this.mdcFoundation && this.isConnected && (t ? (this.setEventListeners(),
    this.mdcFoundation.open()) : (this.removeEventListeners(),
    this.mdcFoundation.close(this.currentAction || this.defaultAction),
    this.currentAction = void 0))
}
))], fe.prototype, "open", void 0),
o([ht()], fe.prototype, "defaultAction", void 0),
o([ht()], fe.prototype, "actionAttribute", void 0),
o([ht()], fe.prototype, "initialFocusAttribute", void 0);
const ge = l`.mdc-dialog .mdc-dialog__surface{background-color:#fff;background-color:var(--mdc-theme-surface, #fff)}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__surface-scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__title{color:rgba(0,0,0,.87)}.mdc-dialog .mdc-dialog__content{color:rgba(0,0,0,.6)}.mdc-dialog .mdc-dialog__close{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-dialog .mdc-dialog__close .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close .mdc-icon-button__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-surface, #000))}.mdc-dialog .mdc-dialog__close:hover .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close.mdc-ripple-surface--hover .mdc-icon-button__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-dialog .mdc-dialog__close.mdc-ripple-upgraded--background-focused .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):focus .mdc-icon-button__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded) .mdc-icon-button__ripple::after{transition:opacity 150ms linear}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):active .mdc-icon-button__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-dialog .mdc-dialog__close.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions,.mdc-dialog.mdc-dialog--scrollable.mdc-dialog-scroll-divider-footer .mdc-dialog__actions{border-color:rgba(0,0,0,.12)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:1px solid rgba(0,0,0,.12);margin-bottom:0}.mdc-dialog.mdc-dialog-scroll-divider-header.mdc-dialog--fullscreen .mdc-dialog__header{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12)}.mdc-dialog .mdc-dialog__surface{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}.mdc-dialog__surface{box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0,0,0,.12)}.mdc-dialog__title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit)}.mdc-dialog__content{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-body1-font-size, 1rem);line-height:1.5rem;line-height:var(--mdc-typography-body1-line-height, 1.5rem);font-weight:400;font-weight:var(--mdc-typography-body1-font-weight, 400);letter-spacing:0.03125em;letter-spacing:var(--mdc-typography-body1-letter-spacing, 0.03125em);text-decoration:inherit;text-decoration:var(--mdc-typography-body1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body1-text-transform, inherit)}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:none}@media(max-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;width:560px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 112px)}}@media(max-width: 720px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:560px}}@media(max-width: 720px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(max-width: 600px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(min-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 400px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}.mdc-dialog.mdc-dialog__scrim--hidden .mdc-dialog__scrim{opacity:0}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}[dir=rtl] .mdc-dialog__surface,.mdc-dialog__surface[dir=rtl]{text-align:right}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-dialog__surface{outline:2px solid windowText}}.mdc-dialog__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid transparent;border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-dialog__surface::before{border-color:CanvasText}}@media screen and (-ms-high-contrast: active),screen and (-ms-high-contrast: none){.mdc-dialog__surface::before{content:none}}.mdc-dialog__title{display:block;margin-top:0;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:0 24px 9px}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mdc-dialog__title,.mdc-dialog__title[dir=rtl]{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{margin-bottom:1px;padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{align-items:baseline;border-bottom:1px solid transparent;display:inline-flex;justify-content:space-between;padding:0 24px 9px;z-index:1}@media screen and (forced-colors: active){.mdc-dialog--fullscreen .mdc-dialog__header{border-bottom-color:CanvasText}}.mdc-dialog--fullscreen .mdc-dialog__header .mdc-dialog__close{right:-12px}.mdc-dialog--fullscreen .mdc-dialog__title{margin-bottom:0;padding:0;border-bottom:0}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:0;margin-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{top:5px}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top:1px solid transparent}@media screen and (forced-colors: active){.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content,.mdc-dialog__header+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}@media screen and (forced-colors: active){.mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim{opacity:1;z-index:1}.mdc-dialog--open.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{transition:opacity 75ms linear}.mdc-dialog--open.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim{transition:opacity 150ms linear}.mdc-dialog__surface-scrim{display:none;opacity:0;position:absolute;width:100%;height:100%}.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{display:block}.mdc-dialog-scroll-lock{overflow:hidden}.mdc-dialog--no-content-padding .mdc-dialog__content{padding:0}.mdc-dialog--sheet .mdc-dialog__close{right:12px;top:9px;position:absolute;z-index:1}#actions:not(.mdc-dialog__actions){display:none}.mdc-dialog__surface{box-shadow:var(--mdc-dialog-box-shadow, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12))}@media(min-width: 560px){.mdc-dialog .mdc-dialog__surface{max-width:560px;max-width:var(--mdc-dialog-max-width, 560px)}}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0, 0, 0, 0.32);background-color:var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.32))}.mdc-dialog .mdc-dialog__title{color:rgba(0, 0, 0, 0.87);color:var(--mdc-dialog-heading-ink-color, rgba(0, 0, 0, 0.87))}.mdc-dialog .mdc-dialog__content{color:rgba(0, 0, 0, 0.6);color:var(--mdc-dialog-content-ink-color, rgba(0, 0, 0, 0.6))}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-dialog-scroll-divider-color, rgba(0, 0, 0, 0.12))}.mdc-dialog .mdc-dialog__surface{min-width:280px;min-width:var(--mdc-dialog-min-width, 280px)}.mdc-dialog .mdc-dialog__surface{max-height:var(--mdc-dialog-max-height, calc(100% - 32px))}#actions ::slotted(*){margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*[dir=rtl]){margin-left:0;margin-right:8px}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*[dir=rtl]){text-align:left}.mdc-dialog--stacked #actions{flex-direction:column-reverse}.mdc-dialog--stacked #actions *:not(:last-child) ::slotted(*){flex-basis:.000000001px;margin-top:12px}`;
class ve extends fe {
}
ve.styles = [ge, l`
      .mdc-dialog__title {
        padding-right: 52px;
      }
    `],
customElements.define("ewt-dialog", ve);
const be = l`
  :host {
    --mdc-theme-primary: var(--improv-primary-color, #03a9f4);
    --mdc-theme-on-primary: var(--improv-on-primary-color, #fff);
    --improv-danger-color: #db4437;
    --improv-text-color: rgba(0, 0, 0, 0.6);
    --mdc-theme-text-primary-on-background: var(--improv-text-color);
    --mdc-dialog-content-ink-color: var(--improv-text-color);
    text-align: left;
    font-size: 16px;
    --mdc-typography-headline6-font-size: 1.25em;
    --mdc-typography-headline6-line-height: 2em;
    --mdc-typography-body1-font-size: 1em;
    --mdc-typography-body1-line-height: 1.5em;
    --mdc-typography-button-font-size: 0.875em;
    --mdc-typography-button-line-height: 2.25em;
    --mdc-typography-subtitle1-font-size: 1em;
    --mdc-typography-subtitle1-line-height: 1.75em;
  }

  a {
    color: var(--improv-primary-color, #03a9f4);
  }

  a.button {
    text-decoration: none;
  }
`;
export {K as A, It as B, j as C, be as D, Nt as M, Qt as R, G as T, o as _, Jt as a, vt as b, Gt as c, te as d, yt as e, l as f, e as g, i as h, bt as i, me as j, pt as k, Et as l, Vt as m, ht as n, gt as o, jt as p, Bt as q, r, ct as s, ft as t, Tt as u, Ct as v, Ot as w, V as x, $t as y, Wt as z};
