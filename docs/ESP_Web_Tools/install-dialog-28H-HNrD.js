// changes by Dirk Luberth Dijkman, u are the master 
// original is written in typescript and transpiled to js
// i do not know yet how that works
// messing around in the js files
// https://github.com/esphome/esp-web-tools

import {l as e, o as t, _ as i, n, B as o, t as r, i as a, a as d, e as s, b as l, R as c, x as h, c as m, d as p, f as u, g as f, h as g, M as _, j as b, s as x, k as y, m as v, p as w, q as k, r as E, T as I, A, u as S, v as R, w as T, y as C, z as O, C as L, D as F} from "./styles-QAqj_a9t.js";
function D(i, n, o) {
    let r, a = i;
    return "object" == typeof i ? (a = i.slot,
    r = i) : r = {
        flatten: n
    },
    o ? e({
        slot: a,
        flatten: n,
        selector: o
    }) : t({
        descriptor: e=>({
            get() {
                var e, t;
                const i = "slot" + (a ? `[name=${a}]` : ":not([name])")
                  , n = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(i);
                return null !== (t = null == n ? void 0 : n.assignedNodes(r)) && void 0 !== t ? t : []
            },
            enumerable: !0,
            configurable: !0
        })
    })
}
var z, M;
const N = null !== (M = null === (z = window.ShadyDOM) || void 0 === z ? void 0 : z.inUse) && void 0 !== M && M;
class B extends o {
    constructor() {
        super(...arguments),
        this.disabled = !1,
        this.containingForm = null,
        this.formDataListener = e=>{
            this.disabled || this.setFormData(e.formData)
        }
    }
    findFormElement() {
        if (!this.shadowRoot || N)
            return null;
        const e = this.getRootNode().querySelectorAll("form");
        for (const t of Array.from(e))
            if (t.contains(this))
                return t;
        return null
    }
    connectedCallback() {
        var e;
        super.connectedCallback(),
        this.containingForm = this.findFormElement(),
        null === (e = this.containingForm) || void 0 === e || e.addEventListener("formdata", this.formDataListener)
    }
    disconnectedCallback() {
        var e;
        super.disconnectedCallback(),
        null === (e = this.containingForm) || void 0 === e || e.removeEventListener("formdata", this.formDataListener),
        this.containingForm = null
    }
    click() {
        this.formElement && !this.disabled && (this.formElement.focus(),
        this.formElement.click())
    }
    firstUpdated() {
        super.firstUpdated(),
        this.shadowRoot && this.mdcRoot.addEventListener("change", (e=>{
            this.dispatchEvent(new Event("change",e))
        }
        ))
    }
}
B.shadowRootOptions = {
    mode: "open",
    delegatesFocus: !0
},
i([n({
    type: Boolean
})], B.prototype, "disabled", void 0);
class P extends B {
    constructor() {
        super(...arguments),
        this.checked = !1,
        this.indeterminate = !1,
        this.disabled = !1,
        this.name = "",
        this.value = "on",
        this.reducedTouchTarget = !1,
        this.animationClass = "",
        this.shouldRenderRipple = !1,
        this.focused = !1,
        this.mdcFoundationClass = void 0,
        this.mdcFoundation = void 0,
        this.rippleElement = null,
        this.rippleHandlers = new c((()=>(this.shouldRenderRipple = !0,
        this.ripple.then((e=>this.rippleElement = e)),
        this.ripple)))
    }
    createAdapter() {
        return {}
    }
    update(e) {
        const t = e.get("indeterminate")
          , i = e.get("checked")
          , n = e.get("disabled");
        if (void 0 !== t || void 0 !== i || void 0 !== n) {
            const e = this.calculateAnimationStateName(!!i, !!t, !!n)
              , o = this.calculateAnimationStateName(this.checked, this.indeterminate, this.disabled);
            this.animationClass = `${e}-${o}`
        }
        super.update(e)
    }
    calculateAnimationStateName(e, t, i) {
        return i ? "disabled" : t ? "indeterminate" : e ? "checked" : "unchecked"
    }
    renderRipple() {
        return this.shouldRenderRipple ? this.renderRippleTemplate() : ""
    }
    renderRippleTemplate() {
        return h`<mwc-ripple
        .disabled="${this.disabled}"
        unbounded></mwc-ripple>`
    }
    render() {
        const e = this.indeterminate || this.checked
          , t = {
            "mdc-checkbox--disabled": this.disabled,
            "mdc-checkbox--selected": e,
            "mdc-checkbox--touch": !this.reducedTouchTarget,
            "mdc-ripple-upgraded--background-focused": this.focused,
            "mdc-checkbox--anim-checked-indeterminate": "checked-indeterminate" == this.animationClass,
            "mdc-checkbox--anim-checked-unchecked": "checked-unchecked" == this.animationClass,
            "mdc-checkbox--anim-indeterminate-checked": "indeterminate-checked" == this.animationClass,
            "mdc-checkbox--anim-indeterminate-unchecked": "indeterminate-unchecked" == this.animationClass,
            "mdc-checkbox--anim-unchecked-checked": "unchecked-checked" == this.animationClass,
            "mdc-checkbox--anim-unchecked-indeterminate": "unchecked-indeterminate" == this.animationClass
        }
          , i = this.indeterminate ? "mixed" : void 0;
        return h`
      <div class="mdc-checkbox mdc-checkbox--upgraded ${m(t)}">
        <input type="checkbox"
              class="mdc-checkbox__native-control"
              name="${p(this.name)}"
              aria-checked="${p(i)}"
              aria-label="${p(this.ariaLabel)}"
              aria-labelledby="${p(this.ariaLabelledBy)}"
              aria-describedby="${p(this.ariaDescribedBy)}"
              data-indeterminate="${this.indeterminate ? "true" : "false"}"
              ?disabled="${this.disabled}"
              .indeterminate="${this.indeterminate}"
              .checked="${this.checked}"
              .value="${this.value}"
              @change="${this.handleChange}"
              @focus="${this.handleFocus}"
              @blur="${this.handleBlur}"
              @mousedown="${this.handleRippleMouseDown}"
              @mouseenter="${this.handleRippleMouseEnter}"
              @mouseleave="${this.handleRippleMouseLeave}"
              @touchstart="${this.handleRippleTouchStart}"
              @touchend="${this.handleRippleDeactivate}"
              @touchcancel="${this.handleRippleDeactivate}">
        <div class="mdc-checkbox__background"
          @animationend="${this.resetAnimationClass}">
          <svg class="mdc-checkbox__checkmark"
              viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path"
                  fill="none"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>
        ${this.renderRipple()}
      </div>`
    }
    setFormData(e) {
        this.name && this.checked && e.append(this.name, this.value)
    }
    handleFocus() {
        this.focused = !0,
        this.handleRippleFocus()
    }
    handleBlur() {
        this.focused = !1,
        this.handleRippleBlur()
    }
    handleRippleMouseDown(e) {
        const t = ()=>{
            window.removeEventListener("mouseup", t),
            this.handleRippleDeactivate()
        }
        ;
        window.addEventListener("mouseup", t),
        this.rippleHandlers.startPress(e)
    }
    handleRippleTouchStart(e) {
        this.rippleHandlers.startPress(e)
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
    handleChange() {
        this.checked = this.formElement.checked,
        this.indeterminate = this.formElement.indeterminate
    }
    resetAnimationClass() {
        this.animationClass = ""
    }
    get isRippleActive() {
        var e;
        return (null === (e = this.rippleElement) || void 0 === e ? void 0 : e.isActive) || !1
    }
}
i([a(".mdc-checkbox")], P.prototype, "mdcRoot", void 0),
i([a("input")], P.prototype, "formElement", void 0),
i([n({
    type: Boolean,
    reflect: !0
})], P.prototype, "checked", void 0),
i([n({
    type: Boolean
})], P.prototype, "indeterminate", void 0),
i([n({
    type: Boolean,
    reflect: !0
})], P.prototype, "disabled", void 0),
i([n({
    type: String,
    reflect: !0
})], P.prototype, "name", void 0),
i([n({
    type: String
})], P.prototype, "value", void 0),
i([d, n({
    type: String,
    attribute: "aria-label"
})], P.prototype, "ariaLabel", void 0),
i([d, n({
    type: String,
    attribute: "aria-labelledby"
})], P.prototype, "ariaLabelledBy", void 0),
i([d, n({
    type: String,
    attribute: "aria-describedby"
})], P.prototype, "ariaDescribedBy", void 0),
i([n({
    type: Boolean
})], P.prototype, "reducedTouchTarget", void 0),
i([r()], P.prototype, "animationClass", void 0),
i([r()], P.prototype, "shouldRenderRipple", void 0),
i([r()], P.prototype, "focused", void 0),
i([s("mwc-ripple")], P.prototype, "ripple", void 0),
i([l({
    passive: !0
})], P.prototype, "handleRippleTouchStart", null);
const U = u`.mdc-checkbox{padding:calc((40px - 18px) / 2);padding:calc((var(--mdc-checkbox-ripple-size, 40px) - 18px) / 2);margin:calc((40px - 40px) / 2);margin:calc((var(--mdc-checkbox-touch-target-size, 40px) - 40px) / 2)}.mdc-checkbox .mdc-checkbox__ripple::before,.mdc-checkbox .mdc-checkbox__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-checkbox:hover .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-ripple-surface--hover .mdc-checkbox__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-checkbox:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-checkbox.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-checkbox.mdc-checkbox--selected:hover .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-surface--hover .mdc-checkbox__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-checkbox .mdc-checkbox__background{top:calc((40px - 18px) / 2);top:calc((var(--mdc-checkbox-ripple-size, 40px) - 18px) / 2);left:calc((40px - 18px) / 2);left:calc((var(--mdc-checkbox-ripple-size, 40px) - 18px) / 2)}.mdc-checkbox .mdc-checkbox__native-control{top:calc((40px - 40px) / 2);top:calc((40px - var(--mdc-checkbox-touch-target-size, 40px)) / 2);right:calc((40px - 40px) / 2);right:calc((40px - var(--mdc-checkbox-touch-target-size, 40px)) / 2);left:calc((40px - 40px) / 2);left:calc((40px - var(--mdc-checkbox-touch-target-size, 40px)) / 2);width:40px;width:var(--mdc-checkbox-touch-target-size, 40px);height:40px;height:var(--mdc-checkbox-touch-target-size, 40px)}.mdc-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unchecked-color, rgba(0, 0, 0, 0.54));background-color:transparent}.mdc-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#018786;border-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #018786));background-color:#018786;background-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #018786))}@keyframes mdc-checkbox-fade-in-background-8A000000FF01878600000000FF018786{0%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unchecked-color, rgba(0, 0, 0, 0.54));background-color:transparent}50%{border-color:#018786;border-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #018786));background-color:#018786;background-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #018786))}}@keyframes mdc-checkbox-fade-out-background-8A000000FF01878600000000FF018786{0%,80%{border-color:#018786;border-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #018786));background-color:#018786;background-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #018786))}100%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unchecked-color, rgba(0, 0, 0, 0.54));background-color:transparent}}.mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FF01878600000000FF018786}.mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FF01878600000000FF018786}.mdc-checkbox .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.38);border-color:var(--mdc-checkbox-disabled-color, rgba(0, 0, 0, 0.38));background-color:transparent}.mdc-checkbox .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true][disabled]~.mdc-checkbox__background{border-color:transparent;background-color:rgba(0, 0, 0, 0.38);background-color:var(--mdc-checkbox-disabled-color, rgba(0, 0, 0, 0.38))}.mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff;color:var(--mdc-checkbox-ink-color, #fff)}.mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff;border-color:var(--mdc-checkbox-ink-color, #fff)}.mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff;color:var(--mdc-checkbox-ink-color, #fff)}.mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff;border-color:var(--mdc-checkbox-ink-color, #fff)}.mdc-touch-target-wrapper{display:inline}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{border-color:CanvasText}}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{content:"";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{border-color:CanvasText}}@media all and (-ms-high-contrast: none){.mdc-checkbox .mdc-checkbox__focus-ring{display:none}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin:calc((48px - 40px) / 2);margin:calc((var(--mdc-checkbox-state-layer-size, 48px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2)}.mdc-checkbox--touch .mdc-checkbox__native-control{top:calc((40px - 48px) / 2);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);right:calc((40px - 48px) / 2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);left:calc((40px - 48px) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);width:48px;width:var(--mdc-checkbox-state-layer-size, 48px);height:48px;height:var(--mdc-checkbox-state-layer-size, 48px)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}:host{outline:none;display:inline-flex;-webkit-tap-highlight-color:transparent}:host([checked]),:host([indeterminate]){--mdc-ripple-color:var(--mdc-theme-secondary, #018786)}.mdc-checkbox .mdc-checkbox__background::before{content:none}`;
class $ extends P {
}
$.styles = [U],
customElements.define("ewt-checkbox", $);
class H {
    constructor(e) {
        this.targetElement = e,
        this.state = {
            bold: !1,
            italic: !1,
            underline: !1,
            strikethrough: !1,
            foregroundColor: null,
            backgroundColor: null,
            carriageReturn: !1,
            secret: !1
        }
    }
    logs() {
        return this.targetElement.innerText
    }
    addLine(e) {
        const t = /(?:\033|\\033)(?:\[(.*?)[@-~]|\].*?(?:\007|\033\\))/g;
        let i = 0;
        this.state.carriageReturn && ("\n" !== e && this.targetElement.removeChild(this.targetElement.lastChild),
        this.state.carriageReturn = !1),
        e.includes("\r") && (this.state.carriageReturn = !0);
        const n = document.createElement("span");
        n.classList.add("line"),
        this.targetElement.appendChild(n);
        const o = e=>{
            if ("" === e)
                return;
            const t = document.createElement("span");
            if (this.state.bold && t.classList.add("log-bold"),
            this.state.italic && t.classList.add("log-italic"),
            this.state.underline && t.classList.add("log-underline"),
            this.state.strikethrough && t.classList.add("log-strikethrough"),
            this.state.secret && t.classList.add("log-secret"),
            null !== this.state.foregroundColor && t.classList.add(`log-fg-${this.state.foregroundColor}`),
            null !== this.state.backgroundColor && t.classList.add(`log-bg-${this.state.backgroundColor}`),
            t.appendChild(document.createTextNode(e)),
            n.appendChild(t),
            this.state.secret) {
                const e = document.createElement("span");
                e.classList.add("log-secret-redacted"),
                e.appendChild(document.createTextNode("[redacted]")),
                n.appendChild(e)
            }
        }
        ;
        for (; ; ) {
            const n = t.exec(e);
            if (null === n)
                break;
            const r = n.index;
            if (o(e.substring(i, r)),
            i = r + n[0].length,
            void 0 !== n[1])
                for (const e of n[1].split(";"))
                    switch (parseInt(e)) {
                    case 0:
                        this.state.bold = !1,
                        this.state.italic = !1,
                        this.state.underline = !1,
                        this.state.strikethrough = !1,
                        this.state.foregroundColor = null,
                        this.state.backgroundColor = null,
                        this.state.secret = !1;
                        break;
                    case 1:
                        this.state.bold = !0;
                        break;
                    case 3:
                        this.state.italic = !0;
                        break;
                    case 4:
                        this.state.underline = !0;
                        break;
                    case 5:
                        this.state.secret = !0;
                        break;
                    case 6:
                        this.state.secret = !1;
                        break;
                    case 9:
                        this.state.strikethrough = !0;
                        break;
                    case 22:
                        this.state.bold = !1;
                        break;
                    case 23:
                        this.state.italic = !1;
                        break;
                    case 24:
                        this.state.underline = !1;
                        break;
                    case 29:
                        this.state.strikethrough = !1;
                        break;
                    case 30:
                        this.state.foregroundColor = "black";
                        break;
                    case 31:
                        this.state.foregroundColor = "red";
                        break;
                    case 32:
                        this.state.foregroundColor = "green";
                        break;
                    case 33:
                        this.state.foregroundColor = "yellow";
                        break;
                    case 34:
                        this.state.foregroundColor = "blue";
                        break;
                    case 35:
                        this.state.foregroundColor = "magenta";
                        break;
                    case 36:
                        this.state.foregroundColor = "cyan";
                        break;
                    case 37:
                        this.state.foregroundColor = "white";
                        break;
                    case 39:
                        this.state.foregroundColor = null;
                        break;
                    case 41:
                        this.state.backgroundColor = "red";
                        break;
                    case 42:
                        this.state.backgroundColor = "green";
                        break;
                    case 43:
                        this.state.backgroundColor = "yellow";
                        break;
                    case 44:
                        this.state.backgroundColor = "blue";
                        break;
                    case 45:
                        this.state.backgroundColor = "magenta";
                        break;
                    case 46:
                        this.state.backgroundColor = "cyan";
                        break;
                    case 47:
                        this.state.backgroundColor = "white";
                        break;
                    case 40:
                    case 49:
                        this.state.backgroundColor = null
                    }
        }
        const r = this.targetElement.scrollTop > this.targetElement.scrollHeight - this.targetElement.offsetHeight - 50;
        o(e.substring(i)),
        r && (this.targetElement.scrollTop = this.targetElement.scrollHeight)
    }
}
const V = e=>new Promise((t=>setTimeout(t, e)));
class W {
    constructor() {
        this.chunks = ""
    }
    transform(e, t) {
        this.chunks += e;
        const i = this.chunks.split("\r\n");
        this.chunks = i.pop(),
        i.forEach((e=>t.enqueue(e + "\r\n")))
    }
    flush(e) {
        e.enqueue(this.chunks)
    }
}
class G extends HTMLElement {
    constructor() {
        super(...arguments),
        this.allowInput = !0
    }
    logs() {
        var e;
        return (null === (e = this._console) || void 0 === e ? void 0 : e.logs()) || ""
    }
    connectedCallback() {
        if (this._console)
            return;
        if (this.attachShadow({
            mode: "open"
        }).innerHTML = `\n      <style>\n        :host, input {\n          background-color: #1c1c1c;\n          color: #ddd;\n          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,\n            monospace;\n          line-height: 1.45;\n          display: flex;\n          flex-direction: column;\n        }\n        form {\n          display: flex;\n          align-items: center;\n          padding: 0 8px 0 16px;\n        }\n        input {\n          flex: 1;\n          padding: 4px;\n          margin: 0 8px;\n          border: 0;\n          outline: none;\n        }\n        \n  .log {\n    flex: 1;\n    background-color: #1c1c1c;\n    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,\n      monospace;\n    font-size: 12px;\n    padding: 16px;\n    overflow: auto;\n    line-height: 1.45;\n    border-radius: 3px;\n    white-space: pre-wrap;\n    overflow-wrap: break-word;\n    color: #ddd;\n  }\n\n  .log-bold {\n    font-weight: bold;\n  }\n  .log-italic {\n    font-style: italic;\n  }\n  .log-underline {\n    text-decoration: underline;\n  }\n  .log-strikethrough {\n    text-decoration: line-through;\n  }\n  .log-underline.log-strikethrough {\n    text-decoration: underline line-through;\n  }\n  .log-secret {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n  }\n  .log-secret-redacted {\n    opacity: 0;\n    width: 1px;\n    font-size: 1px;\n  }\n  .log-fg-black {\n    color: rgb(128, 128, 128);\n  }\n  .log-fg-red {\n    color: rgb(255, 0, 0);\n  }\n  .log-fg-green {\n    color: rgb(0, 255, 0);\n  }\n  .log-fg-yellow {\n    color: rgb(255, 255, 0);\n  }\n  .log-fg-blue {\n    color: rgb(0, 0, 255);\n  }\n  .log-fg-magenta {\n    color: rgb(255, 0, 255);\n  }\n  .log-fg-cyan {\n    color: rgb(0, 255, 255);\n  }\n  .log-fg-white {\n    color: rgb(187, 187, 187);\n  }\n  .log-bg-black {\n    background-color: rgb(0, 0, 0);\n  }\n  .log-bg-red {\n    background-color: rgb(255, 0, 0);\n  }\n  .log-bg-green {\n    background-color: rgb(0, 255, 0);\n  }\n  .log-bg-yellow {\n    background-color: rgb(255, 255, 0);\n  }\n  .log-bg-blue {\n    background-color: rgb(0, 0, 255);\n  }\n  .log-bg-magenta {\n    background-color: rgb(255, 0, 255);\n  }\n  .log-bg-cyan {\n    background-color: rgb(0, 255, 255);\n  }\n  .log-bg-white {\n    background-color: rgb(255, 255, 255);\n  }\n\n      </style>\n      <div class="log"></div>\n      ${this.allowInput ? "<form>\n                >\n                <input autofocus>\n              </form>\n            " : ""}\n    `,
        this._console = new H(this.shadowRoot.querySelector("div")),
        this.allowInput) {
            const e = this.shadowRoot.querySelector("input");
            this.addEventListener("click", (()=>{
                var t;
                "" === (null === (t = getSelection()) || void 0 === t ? void 0 : t.toString()) && e.focus()
            }
            )),
            e.addEventListener("keydown", (e=>{
                "Enter" === e.key && (e.preventDefault(),
                e.stopPropagation(),
                this._sendCommand())
            }
            ))
        }
        const e = new AbortController
          , t = this._connect(e.signal);
        this._cancelConnection = ()=>(e.abort(),
        t)
    }
    async _connect(e) {
        this.logger.debug("Starting console read loop");
        try {
            await this.port.readable.pipeThrough(new TextDecoderStream, {
                signal: e
            }).pipeThrough(new TransformStream(new W)).pipeTo(new WritableStream({
                write: e=>{
                    this._console.addLine(e.replace("\r", ""))
                }
            })),
            e.aborted || (this._console.addLine(""),
            this._console.addLine(""),
            this._console.addLine("Terminal disconnected"))
        } catch (e) {
            this._console.addLine(""),
            this._console.addLine(""),
            this._console.addLine(`Terminal disconnected: ${e}`)
        } finally {
            await V(100),
            this.logger.debug("Finished console read loop")
        }
    }
    async _sendCommand() {
        const e = this.shadowRoot.querySelector("input")
          , t = e.value
          , i = new TextEncoder
          , n = this.port.writable.getWriter();
        await n.write(i.encode(t + "\r\n")),
        this._console.addLine(`> ${t}\r\n`),
        e.value = "",
        e.focus();
        try {
            n.releaseLock()
        } catch (e) {
            console.error("Ignoring release lock error", e)
        }
    }
    async disconnect() {
        this._cancelConnection && (await this._cancelConnection(),
        this._cancelConnection = void 0)
    }
    async reset() {
        this.logger.debug("Triggering reset"),
        await this.port.setSignals({
            dataTerminalReady: !1,
            requestToSend: !0
        }),
        await V(250),
        await this.port.setSignals({
            dataTerminalReady: !1,
            requestToSend: !1
        }),
        await V(250),
        await new Promise((e=>setTimeout(e, 1e3)))
    }
}
customElements.define("ewt-console", G);
var X = {
    ROOT: "mdc-form-field"
}
  , q = {
    LABEL_SELECTOR: ".mdc-form-field > label"
}
  , Z = function(e) {
    function t(i) {
        var n = e.call(this, g(g({}, t.defaultAdapter), i)) || this;
        return n.click = function() {
            n.handleClick()
        }
        ,
        n
    }
    return f(t, e),
    Object.defineProperty(t, "cssClasses", {
        get: function() {
            return X
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "strings", {
        get: function() {
            return q
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "defaultAdapter", {
        get: function() {
            return {
                activateInputRipple: function() {},
                deactivateInputRipple: function() {},
                deregisterInteractionHandler: function() {},
                registerInteractionHandler: function() {}
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.init = function() {
        this.adapter.registerInteractionHandler("click", this.click)
    }
    ,
    t.prototype.destroy = function() {
        this.adapter.deregisterInteractionHandler("click", this.click)
    }
    ,
    t.prototype.handleClick = function() {
        var e = this;
        this.adapter.activateInputRipple(),
        requestAnimationFrame((function() {
            e.adapter.deactivateInputRipple()
        }
        ))
    }
    ,
    t
}(_);
class Y extends o {
    constructor() {
        super(...arguments),
        this.alignEnd = !1,
        this.spaceBetween = !1,
        this.nowrap = !1,
        this.label = "",
        this.mdcFoundationClass = Z
    }
    createAdapter() {
        return {
            registerInteractionHandler: (e,t)=>{
                this.labelEl.addEventListener(e, t)
            }
            ,
            deregisterInteractionHandler: (e,t)=>{
                this.labelEl.removeEventListener(e, t)
            }
            ,
            activateInputRipple: async()=>{
                const e = this.input;
                if (e instanceof B) {
                    const t = await e.ripple;
                    t && t.startPress()
                }
            }
            ,
            deactivateInputRipple: async()=>{
                const e = this.input;
                if (e instanceof B) {
                    const t = await e.ripple;
                    t && t.endPress()
                }
            }
        }
    }
    get input() {
        var e, t;
        return null !== (t = null === (e = this.slottedInputs) || void 0 === e ? void 0 : e[0]) && void 0 !== t ? t : null
    }
    render() {
        const e = {
            "mdc-form-field--align-end": this.alignEnd,
            "mdc-form-field--space-between": this.spaceBetween,
            "mdc-form-field--nowrap": this.nowrap
        };
        return h`
      <div class="mdc-form-field ${m(e)}">
        <slot></slot>
        <label class="mdc-label"
               @click="${this._labelClick}">${this.label}</label>
      </div>`
    }
    click() {
        this._labelClick()
    }
    _labelClick() {
        const e = this.input;
        e && (e.focus(),
        e.click())
    }
}
i([n({
    type: Boolean
})], Y.prototype, "alignEnd", void 0),
i([n({
    type: Boolean
})], Y.prototype, "spaceBetween", void 0),
i([n({
    type: Boolean
})], Y.prototype, "nowrap", void 0),
i([n({
    type: String
}), b((async function(e) {
    var t;
    null === (t = this.input) || void 0 === t || t.setAttribute("aria-label", e)
}
))], Y.prototype, "label", void 0),
i([a(".mdc-form-field")], Y.prototype, "mdcRoot", void 0),
i([D("", !0, "*")], Y.prototype, "slottedInputs", void 0),
i([a("label")], Y.prototype, "labelEl", void 0);
const j = u`.mdc-form-field{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}:host{display:inline-flex}.mdc-form-field{width:100%}::slotted(*){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}::slotted(mwc-switch){margin-right:10px}[dir=rtl] ::slotted(mwc-switch),::slotted(mwc-switch[dir=rtl]){margin-left:10px}`;
class K extends Y {
}
K.styles = [j],
customElements.define("ewt-formfield", K);
class Q extends x {
    constructor() {
        super(...arguments),
        this.disabled = !1,
        this.icon = "",
        this.shouldRenderRipple = !1,
        this.rippleHandlers = new c((()=>(this.shouldRenderRipple = !0,
        this.ripple)))
    }
    renderRipple() {
        return this.shouldRenderRipple ? h`
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>` : ""
    }
    focus() {
        const e = this.buttonElement;
        e && (this.rippleHandlers.startFocus(),
        e.focus())
    }
    blur() {
        const e = this.buttonElement;
        e && (this.rippleHandlers.endFocus(),
        e.blur())
    }
    render() {
        return h`<button
        class="mdc-icon-button mdc-icon-button--display-flex"
        aria-label="${this.ariaLabel || this.icon}"
        aria-haspopup="${p(this.ariaHasPopup)}"
        ?disabled="${this.disabled}"
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleMouseDown}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleTouchStart}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}"
    >${this.renderRipple()}
    ${this.icon ? h`<i class="material-icons">${this.icon}</i>` : ""}
    <span
      ><slot></slot
    ></span>
  </button>`
    }
    handleRippleMouseDown(e) {
        const t = ()=>{
            window.removeEventListener("mouseup", t),
            this.handleRippleDeactivate()
        }
        ;
        window.addEventListener("mouseup", t),
        this.rippleHandlers.startPress(e)
    }
    handleRippleTouchStart(e) {
        this.rippleHandlers.startPress(e)
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
i([n({
    type: Boolean,
    reflect: !0
})], Q.prototype, "disabled", void 0),
i([n({
    type: String
})], Q.prototype, "icon", void 0),
i([d, n({
    type: String,
    attribute: "aria-label"
})], Q.prototype, "ariaLabel", void 0),
i([d, n({
    type: String,
    attribute: "aria-haspopup"
})], Q.prototype, "ariaHasPopup", void 0),
i([a("button")], Q.prototype, "buttonElement", void 0),
i([s("mwc-ripple")], Q.prototype, "ripple", void 0),
i([r()], Q.prototype, "shouldRenderRipple", void 0),
i([l({
    passive: !0
})], Q.prototype, "handleRippleMouseDown", null),
i([l({
    passive: !0
})], Q.prototype, "handleRippleTouchStart", null);
const J = u`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-icon-button{font-size:24px;width:48px;height:48px;padding:12px}.mdc-icon-button .mdc-icon-button__focus-ring{display:none}.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{display:block;max-height:48px;max-width:48px}@media screen and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring::after,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring::after{content:"";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring::after,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring::after{border-color:CanvasText}}.mdc-icon-button.mdc-icon-button--reduced-size .mdc-icon-button__ripple{width:40px;height:40px;margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-icon-button.mdc-icon-button--reduced-size.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button.mdc-icon-button--reduced-size:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{max-height:40px;max-width:40px}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button__link{height:100%;left:0;outline:none;position:absolute;top:0;width:100%}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button__link{height:100%;left:0;outline:none;position:absolute;top:0;width:100%}:host{display:inline-block;outline:none}:host([disabled]){pointer-events:none}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block}:host{--mdc-ripple-color: currentcolor;-webkit-tap-highlight-color:transparent}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc( (var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2 )}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}`;
class ee extends Q {
}
ee.styles = [J],
customElements.define("ewt-icon-button", ee);
var te = {
    NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch"
}
  , ie = {
    NOTCH_ELEMENT_PADDING: 8
}
  , ne = {
    NO_LABEL: "mdc-notched-outline--no-label",
    OUTLINE_NOTCHED: "mdc-notched-outline--notched",
    OUTLINE_UPGRADED: "mdc-notched-outline--upgraded"
}
  , oe = function(e) {
    function t(i) {
        return e.call(this, g(g({}, t.defaultAdapter), i)) || this
    }
    return f(t, e),
    Object.defineProperty(t, "strings", {
        get: function() {
            return te
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "cssClasses", {
        get: function() {
            return ne
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "numbers", {
        get: function() {
            return ie
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "defaultAdapter", {
        get: function() {
            return {
                addClass: function() {},
                removeClass: function() {},
                setNotchWidthProperty: function() {},
                removeNotchWidthProperty: function() {}
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.notch = function(e) {
        var i = t.cssClasses.OUTLINE_NOTCHED;
        e > 0 && (e += ie.NOTCH_ELEMENT_PADDING),
        this.adapter.setNotchWidthProperty(e),
        this.adapter.addClass(i)
    }
    ,
    t.prototype.closeNotch = function() {
        var e = t.cssClasses.OUTLINE_NOTCHED;
        this.adapter.removeClass(e),
        this.adapter.removeNotchWidthProperty()
    }
    ,
    t
}(_);
class re extends o {
    constructor() {
        super(...arguments),
        this.mdcFoundationClass = oe,
        this.width = 0,
        this.open = !1,
        this.lastOpen = this.open
    }
    createAdapter() {
        return {
            addClass: e=>this.mdcRoot.classList.add(e),
            removeClass: e=>this.mdcRoot.classList.remove(e),
            setNotchWidthProperty: e=>this.notchElement.style.setProperty("width", `${e}px`),
            removeNotchWidthProperty: ()=>this.notchElement.style.removeProperty("width")
        }
    }
    openOrClose(e, t) {
        this.mdcFoundation && (e && void 0 !== t ? this.mdcFoundation.notch(t) : this.mdcFoundation.closeNotch())
    }
    render() {
        this.openOrClose(this.open, this.width);
        const e = m({
            "mdc-notched-outline--notched": this.open
        });
        return h`
      <span class="mdc-notched-outline ${e}">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__notch">
          <slot></slot>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>`
    }
}
i([a(".mdc-notched-outline")], re.prototype, "mdcRoot", void 0),
i([n({
    type: Number
})], re.prototype, "width", void 0),
i([n({
    type: Boolean,
    reflect: !0
})], re.prototype, "open", void 0),
i([a(".mdc-notched-outline__notch")], re.prototype, "notchElement", void 0);
const ae = u`.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}:host{display:block;position:absolute;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] :host,:host([dir=rtl]){text-align:right}::slotted(.mdc-floating-label){display:inline-block;position:relative;top:17px;bottom:auto;max-width:100%}::slotted(.mdc-floating-label--float-above){text-overflow:clip}.mdc-notched-outline--upgraded ::slotted(.mdc-floating-label--float-above){max-width:calc(100% / 0.75)}.mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-notched-outline .mdc-notched-outline__leading,.mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-color:var(--mdc-notched-outline-border-color, var(--mdc-theme-primary, #6200ee));border-width:1px;border-width:var(--mdc-notched-outline-stroke-width, 1px)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0;padding-top:var(--mdc-notched-outline-notch-offset, 0)}`;
let de = class extends re {
}
;
de.styles = [ae],
de = i([y("mwc-notched-outline")], de);
var se = {
    LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
    LABEL_REQUIRED: "mdc-floating-label--required",
    LABEL_SHAKE: "mdc-floating-label--shake",
    ROOT: "mdc-floating-label"
}
  , le = function(e) {
    function t(i) {
        var n = e.call(this, g(g({}, t.defaultAdapter), i)) || this;
        return n.shakeAnimationEndHandler = function() {
            n.handleShakeAnimationEnd()
        }
        ,
        n
    }
    return f(t, e),
    Object.defineProperty(t, "cssClasses", {
        get: function() {
            return se
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "defaultAdapter", {
        get: function() {
            return {
                addClass: function() {},
                removeClass: function() {},
                getWidth: function() {
                    return 0
                },
                registerInteractionHandler: function() {},
                deregisterInteractionHandler: function() {}
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.init = function() {
        this.adapter.registerInteractionHandler("animationend", this.shakeAnimationEndHandler)
    }
    ,
    t.prototype.destroy = function() {
        this.adapter.deregisterInteractionHandler("animationend", this.shakeAnimationEndHandler)
    }
    ,
    t.prototype.getWidth = function() {
        return this.adapter.getWidth()
    }
    ,
    t.prototype.shake = function(e) {
        var i = t.cssClasses.LABEL_SHAKE;
        e ? this.adapter.addClass(i) : this.adapter.removeClass(i)
    }
    ,
    t.prototype.float = function(e) {
        var i = t.cssClasses
          , n = i.LABEL_FLOAT_ABOVE
          , o = i.LABEL_SHAKE;
        e ? this.adapter.addClass(n) : (this.adapter.removeClass(n),
        this.adapter.removeClass(o))
    }
    ,
    t.prototype.setRequired = function(e) {
        var i = t.cssClasses.LABEL_REQUIRED;
        e ? this.adapter.addClass(i) : this.adapter.removeClass(i)
    }
    ,
    t.prototype.handleShakeAnimationEnd = function() {
        var e = t.cssClasses.LABEL_SHAKE;
        this.adapter.removeClass(e)
    }
    ,
    t
}(_);
const ce = v(class extends w {
    constructor(e) {
        switch (super(e),
        this.foundation = null,
        this.previousPart = null,
        e.type) {
        case k.ATTRIBUTE:
        case k.PROPERTY:
            break;
        default:
            throw new Error("FloatingLabel directive only support attribute and property parts")
        }
    }
    update(e, [t]) {
        if (e !== this.previousPart) {
            this.foundation && this.foundation.destroy(),
            this.previousPart = e;
            const t = e.element;
            t.classList.add("mdc-floating-label");
            const i = (e=>({
                addClass: t=>e.classList.add(t),
                removeClass: t=>e.classList.remove(t),
                getWidth: ()=>e.scrollWidth,
                registerInteractionHandler: (t,i)=>{
                    e.addEventListener(t, i)
                }
                ,
                deregisterInteractionHandler: (t,i)=>{
                    e.removeEventListener(t, i)
                }
            }))(t);
            this.foundation = new le(i),
            this.foundation.init()
        }
        return this.render(t)
    }
    render(e) {
        return this.foundation
    }
}
);
var he = {
    LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
    LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating"
}
  , me = function(e) {
    function t(i) {
        var n = e.call(this, g(g({}, t.defaultAdapter), i)) || this;
        return n.transitionEndHandler = function(e) {
            n.handleTransitionEnd(e)
        }
        ,
        n
    }
    return f(t, e),
    Object.defineProperty(t, "cssClasses", {
        get: function() {
            return he
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "defaultAdapter", {
        get: function() {
            return {
                addClass: function() {},
                removeClass: function() {},
                hasClass: function() {
                    return !1
                },
                setStyle: function() {},
                registerEventHandler: function() {},
                deregisterEventHandler: function() {}
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.init = function() {
        this.adapter.registerEventHandler("transitionend", this.transitionEndHandler)
    }
    ,
    t.prototype.destroy = function() {
        this.adapter.deregisterEventHandler("transitionend", this.transitionEndHandler)
    }
    ,
    t.prototype.activate = function() {
        this.adapter.removeClass(he.LINE_RIPPLE_DEACTIVATING),
        this.adapter.addClass(he.LINE_RIPPLE_ACTIVE)
    }
    ,
    t.prototype.setRippleCenter = function(e) {
        this.adapter.setStyle("transform-origin", e + "px center")
    }
    ,
    t.prototype.deactivate = function() {
        this.adapter.addClass(he.LINE_RIPPLE_DEACTIVATING)
    }
    ,
    t.prototype.handleTransitionEnd = function(e) {
        var t = this.adapter.hasClass(he.LINE_RIPPLE_DEACTIVATING);
        "opacity" === e.propertyName && t && (this.adapter.removeClass(he.LINE_RIPPLE_ACTIVE),
        this.adapter.removeClass(he.LINE_RIPPLE_DEACTIVATING))
    }
    ,
    t
}(_);
const pe = v(class extends w {
    constructor(e) {
        switch (super(e),
        this.previousPart = null,
        this.foundation = null,
        e.type) {
        case k.ATTRIBUTE:
        case k.PROPERTY:
            return;
        default:
            throw new Error("LineRipple only support attribute and property parts.")
        }
    }
    update(e, t) {
        if (this.previousPart !== e) {
            this.foundation && this.foundation.destroy(),
            this.previousPart = e;
            const t = e.element;
            t.classList.add("mdc-line-ripple");
            const i = (e=>({
                addClass: t=>e.classList.add(t),
                removeClass: t=>e.classList.remove(t),
                hasClass: t=>e.classList.contains(t),
                setStyle: (t,i)=>e.style.setProperty(t, i),
                registerEventHandler: (t,i)=>{
                    e.addEventListener(t, i)
                }
                ,
                deregisterEventHandler: (t,i)=>{
                    e.removeEventListener(t, i)
                }
            }))(t);
            this.foundation = new me(i),
            this.foundation.init()
        }
        return this.render()
    }
    render() {
        return this.foundation
    }
}
);
var ue = {
    ARIA_CONTROLS: "aria-controls",
    ARIA_DESCRIBEDBY: "aria-describedby",
    INPUT_SELECTOR: ".mdc-text-field__input",
    LABEL_SELECTOR: ".mdc-floating-label",
    LEADING_ICON_SELECTOR: ".mdc-text-field__icon--leading",
    LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
    OUTLINE_SELECTOR: ".mdc-notched-outline",
    PREFIX_SELECTOR: ".mdc-text-field__affix--prefix",
    SUFFIX_SELECTOR: ".mdc-text-field__affix--suffix",
    TRAILING_ICON_SELECTOR: ".mdc-text-field__icon--trailing"
}
  , fe = {
    DISABLED: "mdc-text-field--disabled",
    FOCUSED: "mdc-text-field--focused",
    HELPER_LINE: "mdc-text-field-helper-line",
    INVALID: "mdc-text-field--invalid",
    LABEL_FLOATING: "mdc-text-field--label-floating",
    NO_LABEL: "mdc-text-field--no-label",
    OUTLINED: "mdc-text-field--outlined",
    ROOT: "mdc-text-field",
    TEXTAREA: "mdc-text-field--textarea",
    WITH_LEADING_ICON: "mdc-text-field--with-leading-icon",
    WITH_TRAILING_ICON: "mdc-text-field--with-trailing-icon",
    WITH_INTERNAL_COUNTER: "mdc-text-field--with-internal-counter"
}
  , ge = {
    LABEL_SCALE: .75
}
  , _e = ["pattern", "min", "max", "required", "step", "minlength", "maxlength"]
  , be = ["color", "date", "datetime-local", "month", "range", "time", "week"]
  , xe = ["mousedown", "touchstart"]
  , ye = ["click", "keydown"]
  , ve = function(e) {
    function t(i, n) {
        void 0 === n && (n = {});
        var o = e.call(this, g(g({}, t.defaultAdapter), i)) || this;
        return o.isFocused = !1,
        o.receivedUserInput = !1,
        o.valid = !0,
        o.useNativeValidation = !0,
        o.validateOnValueChange = !0,
        o.helperText = n.helperText,
        o.characterCounter = n.characterCounter,
        o.leadingIcon = n.leadingIcon,
        o.trailingIcon = n.trailingIcon,
        o.inputFocusHandler = function() {
            o.activateFocus()
        }
        ,
        o.inputBlurHandler = function() {
            o.deactivateFocus()
        }
        ,
        o.inputInputHandler = function() {
            o.handleInput()
        }
        ,
        o.setPointerXOffset = function(e) {
            o.setTransformOrigin(e)
        }
        ,
        o.textFieldInteractionHandler = function() {
            o.handleTextFieldInteraction()
        }
        ,
        o.validationAttributeChangeHandler = function(e) {
            o.handleValidationAttributeChange(e)
        }
        ,
        o
    }
    return f(t, e),
    Object.defineProperty(t, "cssClasses", {
        get: function() {
            return fe
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "strings", {
        get: function() {
            return ue
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "numbers", {
        get: function() {
            return ge
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "shouldAlwaysFloat", {
        get: function() {
            var e = this.getNativeInput().type;
            return be.indexOf(e) >= 0
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "shouldFloat", {
        get: function() {
            return this.shouldAlwaysFloat || this.isFocused || !!this.getValue() || this.isBadInput()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "shouldShake", {
        get: function() {
            return !this.isFocused && !this.isValid() && !!this.getValue()
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "defaultAdapter", {
        get: function() {
            return {
                addClass: function() {},
                removeClass: function() {},
                hasClass: function() {
                    return !0
                },
                setInputAttr: function() {},
                removeInputAttr: function() {},
                registerTextFieldInteractionHandler: function() {},
                deregisterTextFieldInteractionHandler: function() {},
                registerInputInteractionHandler: function() {},
                deregisterInputInteractionHandler: function() {},
                registerValidationAttributeChangeHandler: function() {
                    return new MutationObserver((function() {}
                    ))
                },
                deregisterValidationAttributeChangeHandler: function() {},
                getNativeInput: function() {
                    return null
                },
                isFocused: function() {
                    return !1
                },
                activateLineRipple: function() {},
                deactivateLineRipple: function() {},
                setLineRippleTransformOrigin: function() {},
                shakeLabel: function() {},
                floatLabel: function() {},
                setLabelRequired: function() {},
                hasLabel: function() {
                    return !1
                },
                getLabelWidth: function() {
                    return 0
                },
                hasOutline: function() {
                    return !1
                },
                notchOutline: function() {},
                closeOutline: function() {}
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.init = function() {
        var e, t, i, n;
        this.adapter.hasLabel() && this.getNativeInput().required && this.adapter.setLabelRequired(!0),
        this.adapter.isFocused() ? this.inputFocusHandler() : this.adapter.hasLabel() && this.shouldFloat && (this.notchOutline(!0),
        this.adapter.floatLabel(!0),
        this.styleFloating(!0)),
        this.adapter.registerInputInteractionHandler("focus", this.inputFocusHandler),
        this.adapter.registerInputInteractionHandler("blur", this.inputBlurHandler),
        this.adapter.registerInputInteractionHandler("input", this.inputInputHandler);
        try {
            for (var o = E(xe), r = o.next(); !r.done; r = o.next()) {
                var a = r.value;
                this.adapter.registerInputInteractionHandler(a, this.setPointerXOffset)
            }
        } catch (t) {
            e = {
                error: t
            }
        } finally {
            try {
                r && !r.done && (t = o.return) && t.call(o)
            } finally {
                if (e)
                    throw e.error
            }
        }
        try {
            for (var d = E(ye), s = d.next(); !s.done; s = d.next()) {
                a = s.value;
                this.adapter.registerTextFieldInteractionHandler(a, this.textFieldInteractionHandler)
            }
        } catch (e) {
            i = {
                error: e
            }
        } finally {
            try {
                s && !s.done && (n = d.return) && n.call(d)
            } finally {
                if (i)
                    throw i.error
            }
        }
        this.validationObserver = this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler),
        this.setcharacterCounter(this.getValue().length)
    }
    ,
    t.prototype.destroy = function() {
        var e, t, i, n;
        this.adapter.deregisterInputInteractionHandler("focus", this.inputFocusHandler),
        this.adapter.deregisterInputInteractionHandler("blur", this.inputBlurHandler),
        this.adapter.deregisterInputInteractionHandler("input", this.inputInputHandler);
        try {
            for (var o = E(xe), r = o.next(); !r.done; r = o.next()) {
                var a = r.value;
                this.adapter.deregisterInputInteractionHandler(a, this.setPointerXOffset)
            }
        } catch (t) {
            e = {
                error: t
            }
        } finally {
            try {
                r && !r.done && (t = o.return) && t.call(o)
            } finally {
                if (e)
                    throw e.error
            }
        }
        try {
            for (var d = E(ye), s = d.next(); !s.done; s = d.next()) {
                a = s.value;
                this.adapter.deregisterTextFieldInteractionHandler(a, this.textFieldInteractionHandler)
            }
        } catch (e) {
            i = {
                error: e
            }
        } finally {
            try {
                s && !s.done && (n = d.return) && n.call(d)
            } finally {
                if (i)
                    throw i.error
            }
        }
        this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver)
    }
    ,
    t.prototype.handleTextFieldInteraction = function() {
        var e = this.adapter.getNativeInput();
        e && e.disabled || (this.receivedUserInput = !0)
    }
    ,
    t.prototype.handleValidationAttributeChange = function(e) {
        var t = this;
        e.some((function(e) {
            return _e.indexOf(e) > -1 && (t.styleValidity(!0),
            t.adapter.setLabelRequired(t.getNativeInput().required),
            !0)
        }
        )),
        e.indexOf("maxlength") > -1 && this.setcharacterCounter(this.getValue().length)
    }
    ,
    t.prototype.notchOutline = function(e) {
        if (this.adapter.hasOutline() && this.adapter.hasLabel())
            if (e) {
                var t = this.adapter.getLabelWidth() * ge.LABEL_SCALE;
                this.adapter.notchOutline(t)
            } else
                this.adapter.closeOutline()
    }
    ,
    t.prototype.activateFocus = function() {
        this.isFocused = !0,
        this.styleFocused(this.isFocused),
        this.adapter.activateLineRipple(),
        this.adapter.hasLabel() && (this.notchOutline(this.shouldFloat),
        this.adapter.floatLabel(this.shouldFloat),
        this.styleFloating(this.shouldFloat),
        this.adapter.shakeLabel(this.shouldShake)),
        !this.helperText || !this.helperText.isPersistent() && this.helperText.isValidation() && this.valid || this.helperText.showToScreenReader()
    }
    ,
    t.prototype.setTransformOrigin = function(e) {
        if (!this.isDisabled() && !this.adapter.hasOutline()) {
            var t = e.touches
              , i = t ? t[0] : e
              , n = i.target.getBoundingClientRect()
              , o = i.clientX - n.left;
            this.adapter.setLineRippleTransformOrigin(o)
        }
    }
    ,
    t.prototype.handleInput = function() {
        this.autoCompleteFocus(),
        this.setcharacterCounter(this.getValue().length)
    }
    ,
    t.prototype.autoCompleteFocus = function() {
        this.receivedUserInput || this.activateFocus()
    }
    ,
    t.prototype.deactivateFocus = function() {
        this.isFocused = !1,
        this.adapter.deactivateLineRipple();
        var e = this.isValid();
        this.styleValidity(e),
        this.styleFocused(this.isFocused),
        this.adapter.hasLabel() && (this.notchOutline(this.shouldFloat),
        this.adapter.floatLabel(this.shouldFloat),
        this.styleFloating(this.shouldFloat),
        this.adapter.shakeLabel(this.shouldShake)),
        this.shouldFloat || (this.receivedUserInput = !1)
    }
    ,
    t.prototype.getValue = function() {
        return this.getNativeInput().value
    }
    ,
    t.prototype.setValue = function(e) {
        if (this.getValue() !== e && (this.getNativeInput().value = e),
        this.setcharacterCounter(e.length),
        this.validateOnValueChange) {
            var t = this.isValid();
            this.styleValidity(t)
        }
        this.adapter.hasLabel() && (this.notchOutline(this.shouldFloat),
        this.adapter.floatLabel(this.shouldFloat),
        this.styleFloating(this.shouldFloat),
        this.validateOnValueChange && this.adapter.shakeLabel(this.shouldShake))
    }
    ,
    t.prototype.isValid = function() {
        return this.useNativeValidation ? this.isNativeInputValid() : this.valid
    }
    ,
    t.prototype.setValid = function(e) {
        this.valid = e,
        this.styleValidity(e);
        var t = !e && !this.isFocused && !!this.getValue();
        this.adapter.hasLabel() && this.adapter.shakeLabel(t)
    }
    ,
    t.prototype.setValidateOnValueChange = function(e) {
        this.validateOnValueChange = e
    }
    ,
    t.prototype.getValidateOnValueChange = function() {
        return this.validateOnValueChange
    }
    ,
    t.prototype.setUseNativeValidation = function(e) {
        this.useNativeValidation = e
    }
    ,
    t.prototype.isDisabled = function() {
        return this.getNativeInput().disabled
    }
    ,
    t.prototype.setDisabled = function(e) {
        this.getNativeInput().disabled = e,
        this.styleDisabled(e)
    }
    ,
    t.prototype.setHelperTextContent = function(e) {
        this.helperText && this.helperText.setContent(e)
    }
    ,
    t.prototype.setLeadingIconAriaLabel = function(e) {
        this.leadingIcon && this.leadingIcon.setAriaLabel(e)
    }
    ,
    t.prototype.setLeadingIconContent = function(e) {
        this.leadingIcon && this.leadingIcon.setContent(e)
    }
    ,
    t.prototype.setTrailingIconAriaLabel = function(e) {
        this.trailingIcon && this.trailingIcon.setAriaLabel(e)
    }
    ,
    t.prototype.setTrailingIconContent = function(e) {
        this.trailingIcon && this.trailingIcon.setContent(e)
    }
    ,
    t.prototype.setcharacterCounter = function(e) {
        if (this.characterCounter) {
            var t = this.getNativeInput().maxLength;
            if (-1 === t)
                throw new Error("MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.");
            this.characterCounter.setCounterValue(e, t)
        }
    }
    ,
    t.prototype.isBadInput = function() {
        return this.getNativeInput().validity.badInput || !1
    }
    ,
    t.prototype.isNativeInputValid = function() {
        return this.getNativeInput().validity.valid
    }
    ,
    t.prototype.styleValidity = function(e) {
        var i = t.cssClasses.INVALID;
        if (e ? this.adapter.removeClass(i) : this.adapter.addClass(i),
        this.helperText) {
            if (this.helperText.setValidity(e),
            !this.helperText.isValidation())
                return;
            var n = this.helperText.isVisible()
              , o = this.helperText.getId();
            n && o ? this.adapter.setInputAttr(ue.ARIA_DESCRIBEDBY, o) : this.adapter.removeInputAttr(ue.ARIA_DESCRIBEDBY)
        }
    }
    ,
    t.prototype.styleFocused = function(e) {
        var i = t.cssClasses.FOCUSED;
        e ? this.adapter.addClass(i) : this.adapter.removeClass(i)
    }
    ,
    t.prototype.styleDisabled = function(e) {
        var i = t.cssClasses
          , n = i.DISABLED
          , o = i.INVALID;
        e ? (this.adapter.addClass(n),
        this.adapter.removeClass(o)) : this.adapter.removeClass(n),
        this.leadingIcon && this.leadingIcon.setDisabled(e),
        this.trailingIcon && this.trailingIcon.setDisabled(e)
    }
    ,
    t.prototype.styleFloating = function(e) {
        var i = t.cssClasses.LABEL_FLOATING;
        e ? this.adapter.addClass(i) : this.adapter.removeClass(i)
    }
    ,
    t.prototype.getNativeInput = function() {
        return (this.adapter ? this.adapter.getNativeInput() : null) || {
            disabled: !1,
            maxLength: -1,
            required: !1,
            type: "input",
            validity: {
                badInput: !1,
                valid: !0
            },
            value: ""
        }
    }
    ,
    t
}(_)
  , we = ve;
const ke = {}
  , Ee = v(class extends w {
    constructor(e) {
        if (super(e),
        e.type !== k.PROPERTY && e.type !== k.ATTRIBUTE && e.type !== k.BOOLEAN_ATTRIBUTE)
            throw Error("The `live` directive is not allowed on child or event bindings");
        if (!(e=>void 0 === e.strings)(e))
            throw Error("`live` bindings can only contain a single expression")
    }
    render(e) {
        return e
    }
    update(e, [t]) {
        if (t === I || t === A)
            return t;
        const i = e.element
          , n = e.name;
        if (e.type === k.PROPERTY) {
            if (t === i[n])
                return I
        } else if (e.type === k.BOOLEAN_ATTRIBUTE) {
            if (!!t === i.hasAttribute(n))
                return I
        } else if (e.type === k.ATTRIBUTE && i.getAttribute(n) === t + "")
            return I;
        return ((e,t=ke)=>{
            e._$AH = t
        }
        )(e),
        t
    }
}
)
  , Ie = ["touchstart", "touchmove", "scroll", "mousewheel"]
  , Ae = (e={})=>{
    const t = {};
    for (const i in e)
        t[i] = e[i];
    return Object.assign({
        badInput: !1,
        customError: !1,
        patternMismatch: !1,
        rangeOverflow: !1,
        rangeUnderflow: !1,
        stepMismatch: !1,
        tooLong: !1,
        tooShort: !1,
        typeMismatch: !1,
        valid: !0,
        valueMissing: !1
    }, t)
}
;
class Se extends B {
    constructor() {
        super(...arguments),
        this.mdcFoundationClass = we,
        this.value = "",
        this.type = "text",
        this.placeholder = "",
        this.label = "",
        this.icon = "",
        this.iconTrailing = "",
        this.disabled = !1,
        this.required = !1,
        this.minLength = -1,
        this.maxLength = -1,
        this.outlined = !1,
        this.helper = "",
        this.validateOnInitialRender = !1,
        this.validationMessage = "",
        this.autoValidate = !1,
        this.pattern = "",
        this.min = "",
        this.max = "",
        this.step = null,
        this.size = null,
        this.helperPersistent = !1,
        this.charCounter = !1,
        this.endAligned = !1,
        this.prefix = "",
        this.suffix = "",
        this.name = "",
        this.readOnly = !1,
        this.autocapitalize = "",
        this.outlineOpen = !1,
        this.outlineWidth = 0,
        this.isUiValid = !0,
        this.focused = !1,
        this._validity = Ae(),
        this.validityTransform = null
    }
    get validity() {
        return this._checkValidity(this.value),
        this._validity
    }
    get willValidate() {
        return this.formElement.willValidate
    }
    get selectionStart() {
        return this.formElement.selectionStart
    }
    get selectionEnd() {
        return this.formElement.selectionEnd
    }
    focus() {
        const e = new CustomEvent("focus");
        this.formElement.dispatchEvent(e),
        this.formElement.focus()
    }
    blur() {
        const e = new CustomEvent("blur");
        this.formElement.dispatchEvent(e),
        this.formElement.blur()
    }
    select() {
        this.formElement.select()
    }
    setSelectionRange(e, t, i) {
        this.formElement.setSelectionRange(e, t, i)
    }
    update(e) {
        e.has("autoValidate") && this.mdcFoundation && this.mdcFoundation.setValidateOnValueChange(this.autoValidate),
        e.has("value") && "string" != typeof this.value && (this.value = `${this.value}`),
        super.update(e)
    }
    setFormData(e) {
        this.name && e.append(this.name, this.value)
    }
    render() {
        const e = this.charCounter && -1 !== this.maxLength
          , t = !!this.helper || !!this.validationMessage || e
          , i = {
            "mdc-text-field--disabled": this.disabled,
            "mdc-text-field--no-label": !this.label,
            "mdc-text-field--filled": !this.outlined,
            "mdc-text-field--outlined": this.outlined,
            "mdc-text-field--with-leading-icon": this.icon,
            "mdc-text-field--with-trailing-icon": this.iconTrailing,
            "mdc-text-field--end-aligned": this.endAligned
        };
        return h`
      <label class="mdc-text-field ${m(i)}">
        ${this.renderRipple()}
        ${this.outlined ? this.renderOutline() : this.renderLabel()}
        ${this.renderLeadingIcon()}
        ${this.renderPrefix()}
        ${this.renderInput(t)}
        ${this.renderSuffix()}
        ${this.renderTrailingIcon()}
        ${this.renderLineRipple()}
      </label>
      ${this.renderHelperText(t, e)}
    `
    }
    updated(e) {
        e.has("value") && void 0 !== e.get("value") && (this.mdcFoundation.setValue(this.value),
        this.autoValidate && this.reportValidity())
    }
    renderRipple() {
        return this.outlined ? "" : h`
      <span class="mdc-text-field__ripple"></span>
    `
    }
    renderOutline() {
        return this.outlined ? h`
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${this.renderLabel()}
      </mwc-notched-outline>` : ""
    }
    renderLabel() {
        return this.label ? h`
      <span
          .floatingLabelFoundation=${ce(this.label)}
          id="label">${this.label}</span>
    ` : ""
    }
    renderLeadingIcon() {
        return this.icon ? this.renderIcon(this.icon) : ""
    }
    renderTrailingIcon() {
        return this.iconTrailing ? this.renderIcon(this.iconTrailing, !0) : ""
    }
    renderIcon(e, t=!1) {
        return h`<i class="material-icons mdc-text-field__icon ${m({
            "mdc-text-field__icon--leading": !t,
            "mdc-text-field__icon--trailing": t
        })}">${e}</i>`
    }
    renderPrefix() {
        return this.prefix ? this.renderAffix(this.prefix) : ""
    }
    renderSuffix() {
        return this.suffix ? this.renderAffix(this.suffix, !0) : ""
    }
    renderAffix(e, t=!1) {
        return h`<span class="mdc-text-field__affix ${m({
            "mdc-text-field__affix--prefix": !t,
            "mdc-text-field__affix--suffix": t
        })}">
        ${e}</span>`
    }
    renderInput(e) {
        const t = -1 === this.minLength ? void 0 : this.minLength
          , i = -1 === this.maxLength ? void 0 : this.maxLength
          , n = this.autocapitalize ? this.autocapitalize : void 0
          , o = this.validationMessage && !this.isUiValid
          , r = this.label ? "label" : void 0
          , a = e ? "helper-text" : void 0
          , d = this.focused || this.helperPersistent || o ? "helper-text" : void 0;
        return h`
      <input
          aria-labelledby=${p(r)}
          aria-controls="${p(a)}"
          aria-describedby="${p(d)}"
          class="mdc-text-field__input"
          type="${this.type}"
          .value="${Ee(this.value)}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?readonly="${this.readOnly}"
          minlength="${p(t)}"
          maxlength="${p(i)}"
          pattern="${p(this.pattern ? this.pattern : void 0)}"
          min="${p("" === this.min ? void 0 : this.min)}"
          max="${p("" === this.max ? void 0 : this.max)}"
          step="${p(null === this.step ? void 0 : this.step)}"
          size="${p(null === this.size ? void 0 : this.size)}"
          name="${p("" === this.name ? void 0 : this.name)}"
          inputmode="${p(this.inputMode)}"
          autocapitalize="${p(n)}"
          @input="${this.handleInputChange}"
          @focus="${this.onInputFocus}"
          @blur="${this.onInputBlur}">`
    }
    renderLineRipple() {
        return this.outlined ? "" : h`
      <span .lineRippleFoundation=${pe()}></span>
    `
    }
    renderHelperText(e, t) {
        const i = this.validationMessage && !this.isUiValid
          , n = {
            "mdc-text-field-helper-text--persistent": this.helperPersistent,
            "mdc-text-field-helper-text--validation-msg": i
        }
          , o = this.focused || this.helperPersistent || i ? void 0 : "true"
          , r = i ? this.validationMessage : this.helper;
        return e ? h`
      <div class="mdc-text-field-helper-line">
        <div id="helper-text"
             aria-hidden="${p(o)}"
             class="mdc-text-field-helper-text ${m(n)}"
             >${r}</div>
        ${this.renderCharCounter(t)}
      </div>` : ""
    }
    renderCharCounter(e) {
        const t = Math.min(this.value.length, this.maxLength);
        return e ? h`
      <span class="mdc-text-field-character-counter"
            >${t} / ${this.maxLength}</span>` : ""
    }
    onInputFocus() {
        this.focused = !0
    }
    onInputBlur() {
        this.focused = !1,
        this.reportValidity()
    }
    checkValidity() {
        const e = this._checkValidity(this.value);
        if (!e) {
            const e = new Event("invalid",{
                bubbles: !1,
                cancelable: !0
            });
            this.dispatchEvent(e)
        }
        return e
    }
    reportValidity() {
        const e = this.checkValidity();
        return this.mdcFoundation.setValid(e),
        this.isUiValid = e,
        e
    }
    _checkValidity(e) {
        const t = this.formElement.validity;
        let i = Ae(t);
        if (this.validityTransform) {
            const t = this.validityTransform(e, i);
            i = Object.assign(Object.assign({}, i), t),
            this.mdcFoundation.setUseNativeValidation(!1)
        } else
            this.mdcFoundation.setUseNativeValidation(!0);
        return this._validity = i,
        this._validity.valid
    }
    setCustomValidity(e) {
        this.validationMessage = e,
        this.formElement.setCustomValidity(e)
    }
    handleInputChange() {
        this.value = this.formElement.value
    }
    createAdapter() {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, this.getRootAdapterMethods()), this.getInputAdapterMethods()), this.getLabelAdapterMethods()), this.getLineRippleAdapterMethods()), this.getOutlineAdapterMethods())
    }
    getRootAdapterMethods() {
        return Object.assign({
            registerTextFieldInteractionHandler: (e,t)=>this.addEventListener(e, t),
            deregisterTextFieldInteractionHandler: (e,t)=>this.removeEventListener(e, t),
            registerValidationAttributeChangeHandler: e=>{
                const t = new MutationObserver((t=>{
                    e((e=>e.map((e=>e.attributeName)).filter((e=>e)))(t))
                }
                ));
                return t.observe(this.formElement, {
                    attributes: !0
                }),
                t
            }
            ,
            deregisterValidationAttributeChangeHandler: e=>e.disconnect()
        }, S(this.mdcRoot))
    }
    getInputAdapterMethods() {
        return {
            getNativeInput: ()=>this.formElement,
            setInputAttr: ()=>{}
            ,
            removeInputAttr: ()=>{}
            ,
            isFocused: ()=>!!this.shadowRoot && this.shadowRoot.activeElement === this.formElement,
            registerInputInteractionHandler: (e,t)=>this.formElement.addEventListener(e, t, {
                passive: e in Ie
            }),
            deregisterInputInteractionHandler: (e,t)=>this.formElement.removeEventListener(e, t)
        }
    }
    getLabelAdapterMethods() {
        return {
            floatLabel: e=>this.labelElement && this.labelElement.floatingLabelFoundation.float(e),
            getLabelWidth: ()=>this.labelElement ? this.labelElement.floatingLabelFoundation.getWidth() : 0,
            hasLabel: ()=>Boolean(this.labelElement),
            shakeLabel: e=>this.labelElement && this.labelElement.floatingLabelFoundation.shake(e),
            setLabelRequired: e=>{
                this.labelElement && this.labelElement.floatingLabelFoundation.setRequired(e)
            }
        }
    }
    getLineRippleAdapterMethods() {
        return {
            activateLineRipple: ()=>{
                this.lineRippleElement && this.lineRippleElement.lineRippleFoundation.activate()
            }
            ,
            deactivateLineRipple: ()=>{
                this.lineRippleElement && this.lineRippleElement.lineRippleFoundation.deactivate()
            }
            ,
            setLineRippleTransformOrigin: e=>{
                this.lineRippleElement && this.lineRippleElement.lineRippleFoundation.setRippleCenter(e)
            }
        }
    }
    async getUpdateComplete() {
        var e;
        const t = await super.getUpdateComplete();
        return await (null === (e = this.outlineElement) || void 0 === e ? void 0 : e.updateComplete),
        t
    }
    firstUpdated() {
        var e;
        super.firstUpdated(),
        this.mdcFoundation.setValidateOnValueChange(this.autoValidate),
        this.validateOnInitialRender && this.reportValidity(),
        null === (e = this.outlineElement) || void 0 === e || e.updateComplete.then((()=>{
            var e;
            this.outlineWidth = (null === (e = this.labelElement) || void 0 === e ? void 0 : e.floatingLabelFoundation.getWidth()) || 0
        }
        ))
    }
    getOutlineAdapterMethods() {
        return {
            closeOutline: ()=>this.outlineElement && (this.outlineOpen = !1),
            hasOutline: ()=>Boolean(this.outlineElement),
            notchOutline: e=>{
                this.outlineElement && !this.outlineOpen && (this.outlineWidth = e,
                this.outlineOpen = !0)
            }
        }
    }
    async layout() {
        await this.updateComplete;
        const e = this.labelElement;
        if (!e)
            return void (this.outlineOpen = !1);
        const t = !!this.label && !!this.value;
        if (e.floatingLabelFoundation.float(t),
        !this.outlined)
            return;
        this.outlineOpen = t,
        await this.updateComplete;
        const i = e.floatingLabelFoundation.getWidth();
        this.outlineOpen && (this.outlineWidth = i,
        await this.updateComplete)
    }
}
i([a(".mdc-text-field")], Se.prototype, "mdcRoot", void 0),
i([a("input")], Se.prototype, "formElement", void 0),
i([a(".mdc-floating-label")], Se.prototype, "labelElement", void 0),
i([a(".mdc-line-ripple")], Se.prototype, "lineRippleElement", void 0),
i([a("mwc-notched-outline")], Se.prototype, "outlineElement", void 0),
i([a(".mdc-notched-outline__notch")], Se.prototype, "notchElement", void 0),
i([n({
    type: String
})], Se.prototype, "value", void 0),
i([n({
    type: String
})], Se.prototype, "type", void 0),
i([n({
    type: String
})], Se.prototype, "placeholder", void 0),
i([n({
    type: String
}), b((function(e, t) {
    void 0 !== t && this.label !== t && this.layout()
}
))], Se.prototype, "label", void 0),
i([n({
    type: String
})], Se.prototype, "icon", void 0),
i([n({
    type: String
})], Se.prototype, "iconTrailing", void 0),
i([n({
    type: Boolean,
    reflect: !0
})], Se.prototype, "disabled", void 0),
i([n({
    type: Boolean
})], Se.prototype, "required", void 0),
i([n({
    type: Number
})], Se.prototype, "minLength", void 0),
i([n({
    type: Number
})], Se.prototype, "maxLength", void 0),
i([n({
    type: Boolean,
    reflect: !0
}), b((function(e, t) {
    void 0 !== t && this.outlined !== t && this.layout()
}
))], Se.prototype, "outlined", void 0),
i([n({
    type: String
})], Se.prototype, "helper", void 0),
i([n({
    type: Boolean
})], Se.prototype, "validateOnInitialRender", void 0),
i([n({
    type: String
})], Se.prototype, "validationMessage", void 0),
i([n({
    type: Boolean
})], Se.prototype, "autoValidate", void 0),
i([n({
    type: String
})], Se.prototype, "pattern", void 0),
i([n({
    type: String
})], Se.prototype, "min", void 0),
i([n({
    type: String
})], Se.prototype, "max", void 0),
i([n({
    type: String
})], Se.prototype, "step", void 0),
i([n({
    type: Number
})], Se.prototype, "size", void 0),
i([n({
    type: Boolean
})], Se.prototype, "helperPersistent", void 0),
i([n({
    type: Boolean
})], Se.prototype, "charCounter", void 0),
i([n({
    type: Boolean
})], Se.prototype, "endAligned", void 0),
i([n({
    type: String
})], Se.prototype, "prefix", void 0),
i([n({
    type: String
})], Se.prototype, "suffix", void 0),
i([n({
    type: String
})], Se.prototype, "name", void 0),
i([n({
    type: String
})], Se.prototype, "inputMode", void 0),
i([n({
    type: Boolean
})], Se.prototype, "readOnly", void 0),
i([n({
    type: String
})], Se.prototype, "autocapitalize", void 0),
i([r()], Se.prototype, "outlineOpen", void 0),
i([r()], Se.prototype, "outlineWidth", void 0),
i([r()], Se.prototype, "isUiValid", void 0),
i([r()], Se.prototype, "focused", void 0),
i([l({
    passive: !0
})], Se.prototype, "handleInputChange", null);
const Re = u`.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform;transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required::after,.mdc-floating-label--required[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-text-field--filled{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-text-field--filled .mdc-text-field__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-text-field--filled .mdc-text-field__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-text-field--filled.mdc-ripple-upgraded--unbounded .mdc-text-field__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-activation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-deactivation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-text-field__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{color:rgba(0, 0, 0, 0.87)}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.54)}}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.54)}}.mdc-text-field .mdc-text-field__input{caret-color:#6200ee;caret-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field-character-counter,.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}.mdc-text-field__affix{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{background-color:rgba(0, 0, 0, 0.87);background-color:var(--mdc-ripple-color, rgba(0, 0, 0, 0.87))}.mdc-text-field--filled:hover .mdc-text-field__ripple::before,.mdc-text-field--filled.mdc-ripple-surface--hover .mdc-text-field__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:whitesmoke}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42)}.mdc-text-field--filled:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-color:#6200ee;border-bottom-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.38)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px, var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-text-field__ripple::before,.mdc-text-field--outlined .mdc-text-field__ripple::after{background-color:transparent;background-color:var(--mdc-ripple-color, transparent)}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:transparent}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0;transition:none}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px;line-height:1.5rem}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-10.25px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-10.25px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(98, 0, 238, 0.87)}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid .mdc-text-field__input{caret-color:#b00020;caret-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}.mdc-text-field--disabled .mdc-text-field__input{color:rgba(0, 0, 0, 0.38)}@media all{.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.38)}}@media all{.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.38)}}.mdc-text-field--disabled .mdc-floating-label{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06)}.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.06)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-floating-label{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--leading{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:GrayText}}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled{background-color:#fafafa}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-text-field-helper-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin:0;opacity:0;will-change:opacity;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-text-field-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-text-field-helper-text--persistent{transition:none;opacity:1;will-change:initial}.mdc-text-field-character-counter{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-left:auto;margin-right:0;padding-left:16px;padding-right:0;white-space:nowrap}.mdc-text-field-character-counter::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field__icon{align-self:center;cursor:pointer}.mdc-text-field__icon:not([tabindex]),.mdc-text-field__icon[tabindex="-1"]{cursor:default;pointer-events:none}.mdc-text-field__icon svg{display:block}.mdc-text-field__icon--leading{margin-left:16px;margin-right:8px}[dir=rtl] .mdc-text-field__icon--leading,.mdc-text-field__icon--leading[dir=rtl]{margin-left:8px;margin-right:16px}.mdc-text-field__icon--trailing{padding:12px;margin-left:0px;margin-right:0px}[dir=rtl] .mdc-text-field__icon--trailing,.mdc-text-field__icon--trailing[dir=rtl]{margin-left:0px;margin-right:0px}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{display:inline-flex;flex-direction:column;outline:none}.mdc-text-field{width:100%}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42);border-bottom-color:var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42))}.mdc-text-field:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87);border-bottom-color:var(--mdc-text-field-hover-line-color, rgba(0, 0, 0, 0.87))}.mdc-text-field.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06);border-bottom-color:var(--mdc-text-field-disabled-line-color, rgba(0, 0, 0, 0.06))}.mdc-text-field.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field__input{direction:inherit}mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-idle-border-color, rgba(0, 0, 0, 0.38) )}:host(:not([disabled]):hover) :not(.mdc-text-field--invalid):not(.mdc-text-field--focused) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-hover-border-color, rgba(0, 0, 0, 0.87) )}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-fill-color, whitesmoke)}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-error-color, var(--mdc-theme-error, #b00020) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-character-counter,:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid .mdc-text-field__icon{color:var(--mdc-text-field-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused mwc-notched-outline{--mdc-notched-outline-stroke-width: 2px}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-focused-label-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-floating-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input{color:var(--mdc-text-field-ink-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg),:host(:not([disabled])) .mdc-text-field-helper-line:not(.mdc-text-field--invalid) .mdc-text-field-character-counter{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host([disabled]) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-disabled-fill-color, #fafafa)}:host([disabled]) .mdc-text-field.mdc-text-field--outlined mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-disabled-border-color, rgba(0, 0, 0, 0.06) )}:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field .mdc-text-field__input,:host([disabled]) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-helper-text,:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-character-counter{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}`;
class Te extends Se {
}
Te.styles = [Re, u`
      .mdc-floating-label {
        line-height: 1.15em;
      }
    `],
customElements.define("ewt-textfield", Te);
class Ce extends x {
    constructor() {
        super(...arguments),
        this.value = "",
        this.group = null,
        this.tabindex = -1,
        this.disabled = !1,
        this.twoline = !1,
        this.activated = !1,
        this.graphic = null,
        this.multipleGraphics = !1,
        this.hasMeta = !1,
        this.noninteractive = !1,
        this.selected = !1,
        this.shouldRenderRipple = !1,
        this._managingList = null,
        this.boundOnClick = this.onClick.bind(this),
        this._firstChanged = !0,
        this._skipPropRequest = !1,
        this.rippleHandlers = new c((()=>(this.shouldRenderRipple = !0,
        this.ripple))),
        this.listeners = [{
            target: this,
            eventNames: ["click"],
            cb: ()=>{
                this.onClick()
            }
        }, {
            target: this,
            eventNames: ["mouseenter"],
            cb: this.rippleHandlers.startHover
        }, {
            target: this,
            eventNames: ["mouseleave"],
            cb: this.rippleHandlers.endHover
        }, {
            target: this,
            eventNames: ["focus"],
            cb: this.rippleHandlers.startFocus
        }, {
            target: this,
            eventNames: ["blur"],
            cb: this.rippleHandlers.endFocus
        }, {
            target: this,
            eventNames: ["mousedown", "touchstart"],
            cb: e=>{
                const t = e.type;
                this.onDown("mousedown" === t ? "mouseup" : "touchend", e)
            }
        }]
    }
    get text() {
        const e = this.textContent;
        return e ? e.trim() : ""
    }
    render() {
        const e = this.renderText()
          , t = this.graphic ? this.renderGraphic() : h``
          , i = this.hasMeta ? this.renderMeta() : h``;
        return h`
      ${this.renderRipple()}
      ${t}
      ${e}
      ${i}`
    }
    renderRipple() {
        return this.shouldRenderRipple ? h`
      <mwc-ripple
        .activated=${this.activated}>
      </mwc-ripple>` : this.activated ? h`<div class="fake-activated-ripple"></div>` : ""
    }
    renderGraphic() {
        const e = {
            multi: this.multipleGraphics
        };
        return h`
      <span class="mdc-deprecated-list-item__graphic material-icons ${m(e)}">
        <slot name="graphic"></slot>
      </span>`
    }
    renderMeta() {
        return h`
      <span class="mdc-deprecated-list-item__meta material-icons">
        <slot name="meta"></slot>
      </span>`
    }
    renderText() {
        const e = this.twoline ? this.renderTwoline() : this.renderSingleLine();
        return h`
      <span class="mdc-deprecated-list-item__text">
        ${e}
      </span>`
    }
    renderSingleLine() {
        return h`<slot></slot>`
    }
    renderTwoline() {
        return h`
      <span class="mdc-deprecated-list-item__primary-text">
        <slot></slot>
      </span>
      <span class="mdc-deprecated-list-item__secondary-text">
        <slot name="secondary"></slot>
      </span>
    `
    }
    onClick() {
        this.fireRequestSelected(!this.selected, "interaction")
    }
    onDown(e, t) {
        const i = ()=>{
            window.removeEventListener(e, i),
            this.rippleHandlers.endPress()
        }
        ;
        window.addEventListener(e, i),
        this.rippleHandlers.startPress(t)
    }
    fireRequestSelected(e, t) {
        if (this.noninteractive)
            return;
        const i = new CustomEvent("request-selected",{
            bubbles: !0,
            composed: !0,
            detail: {
                source: t,
                selected: e
            }
        });
        this.dispatchEvent(i)
    }
    connectedCallback() {
        super.connectedCallback(),
        this.noninteractive || this.setAttribute("mwc-list-item", "");
        for (const e of this.listeners)
            for (const t of e.eventNames)
                e.target.addEventListener(t, e.cb, {
                    passive: !0
                })
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        for (const e of this.listeners)
            for (const t of e.eventNames)
                e.target.removeEventListener(t, e.cb);
        this._managingList && (this._managingList.debouncedLayout ? this._managingList.debouncedLayout(!0) : this._managingList.layout(!0))
    }
    firstUpdated() {
        const e = new Event("list-item-rendered",{
            bubbles: !0,
            composed: !0
        });
        this.dispatchEvent(e)
    }
}
i([a("slot")], Ce.prototype, "slotElement", void 0),
i([s("mwc-ripple")], Ce.prototype, "ripple", void 0),
i([n({
    type: String
})], Ce.prototype, "value", void 0),
i([n({
    type: String,
    reflect: !0
})], Ce.prototype, "group", void 0),
i([n({
    type: Number,
    reflect: !0
})], Ce.prototype, "tabindex", void 0),
i([n({
    type: Boolean,
    reflect: !0
}), b((function(e) {
    e ? this.setAttribute("aria-disabled", "true") : this.setAttribute("aria-disabled", "false")
}
))], Ce.prototype, "disabled", void 0),
i([n({
    type: Boolean,
    reflect: !0
})], Ce.prototype, "twoline", void 0),
i([n({
    type: Boolean,
    reflect: !0
})], Ce.prototype, "activated", void 0),
i([n({
    type: String,
    reflect: !0
})], Ce.prototype, "graphic", void 0),
i([n({
    type: Boolean
})], Ce.prototype, "multipleGraphics", void 0),
i([n({
    type: Boolean
})], Ce.prototype, "hasMeta", void 0),
i([n({
    type: Boolean,
    reflect: !0
}), b((function(e) {
    e ? (this.removeAttribute("aria-checked"),
    this.removeAttribute("mwc-list-item"),
    this.selected = !1,
    this.activated = !1,
    this.tabIndex = -1) : this.setAttribute("mwc-list-item", "")
}
))], Ce.prototype, "noninteractive", void 0),
i([n({
    type: Boolean,
    reflect: !0
}), b((function(e) {
    const t = this.getAttribute("role")
      , i = "gridcell" === t || "option" === t || "row" === t || "tab" === t;
    i && e ? this.setAttribute("aria-selected", "true") : i && this.setAttribute("aria-selected", "false"),
    this._firstChanged ? this._firstChanged = !1 : this._skipPropRequest || this.fireRequestSelected(e, "property")
}
))], Ce.prototype, "selected", void 0),
i([r()], Ce.prototype, "shouldRenderRipple", void 0),
i([r()], Ce.prototype, "_managingList", void 0);
const Oe = u`:host{cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;height:48px;display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mdc-list-side-padding, 16px);padding-right:var(--mdc-list-side-padding, 16px);outline:none;height:48px;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host:focus{outline:none}:host([activated]){color:#6200ee;color:var(--mdc-theme-primary, #6200ee);--mdc-ripple-color: var( --mdc-theme-primary, #6200ee )}:host([activated]) .mdc-deprecated-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host([activated]) .fake-activated-ripple::before{position:absolute;display:block;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;z-index:1;content:"";opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12);background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-deprecated-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;display:inline-flex}.mdc-deprecated-list-item__graphic ::slotted(*){flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;width:100%;height:100%;text-align:center}.mdc-deprecated-list-item__meta{width:var(--mdc-list-item-meta-size, 24px);height:var(--mdc-list-item-meta-size, 24px);margin-left:auto;margin-right:0;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-item__meta.multi{width:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:var(--mdc-list-item-meta-size, 24px);line-height:var(--mdc-list-item-meta-size, 24px)}.mdc-deprecated-list-item__meta ::slotted(.material-icons),.mdc-deprecated-list-item__meta ::slotted(mwc-icon){line-height:var(--mdc-list-item-meta-size, 24px) !important}.mdc-deprecated-list-item__meta ::slotted(:not(.material-icons):not(mwc-icon)){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}[dir=rtl] .mdc-deprecated-list-item__meta,.mdc-deprecated-list-item__meta[dir=rtl]{margin-left:0;margin-right:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:100%;height:100%}.mdc-deprecated-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-deprecated-list-item__text ::slotted([for]),.mdc-deprecated-list-item__text[for]{pointer-events:none}.mdc-deprecated-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px;display:block}.mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;display:block}.mdc-deprecated-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__secondary-text{font-size:inherit}* ::slotted(a),a{color:inherit;text-decoration:none}:host([twoline]){height:72px}:host([twoline]) .mdc-deprecated-list-item__text{align-self:flex-start}:host([disabled]),:host([noninteractive]){cursor:default;pointer-events:none}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*){opacity:.38}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__primary-text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__secondary-text ::slotted(*){color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-deprecated-list-item__secondary-text ::slotted(*){color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-deprecated-list-item__graphic ::slotted(*){background-color:transparent;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-group__subheader ::slotted(*){color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 40px);height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 40px);line-height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 40px) !important}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){border-radius:50%}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic,:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic,:host([graphic=control]) .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 16px)}[dir=rtl] :host([graphic=avatar]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=medium]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=large]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=control]) .mdc-deprecated-list-item__graphic,:host([graphic=avatar]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=medium]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=large]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=control]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 16px);margin-right:0}:host([graphic=icon]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 24px);height:var(--mdc-list-item-graphic-size, 24px);margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 32px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 24px);line-height:var(--mdc-list-item-graphic-size, 24px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 24px) !important}[dir=rtl] :host([graphic=icon]) .mdc-deprecated-list-item__graphic,:host([graphic=icon]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 32px);margin-right:0}:host([graphic=avatar]:not([twoLine])),:host([graphic=icon]:not([twoLine])){height:56px}:host([graphic=medium]:not([twoLine])),:host([graphic=large]:not([twoLine])){height:72px}:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 56px);height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic.multi,:host([graphic=large]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(*),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 56px);line-height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 56px) !important}:host([graphic=large]){padding-left:0px}`;
let Le = class extends Ce {
}
;
Le.styles = [Oe],
Le = i([y("mwc-list-item")], Le);
var Fe = {
    UNKNOWN: "Unknown",
    BACKSPACE: "Backspace",
    ENTER: "Enter",
    SPACEBAR: "Spacebar",
    PAGE_UP: "PageUp",
    PAGE_DOWN: "PageDown",
    END: "End",
    HOME: "Home",
    ARROW_LEFT: "ArrowLeft",
    ARROW_UP: "ArrowUp",
    ARROW_RIGHT: "ArrowRight",
    ARROW_DOWN: "ArrowDown",
    DELETE: "Delete",
    ESCAPE: "Escape",
    TAB: "Tab"
}
  , De = new Set;
De.add(Fe.BACKSPACE),
De.add(Fe.ENTER),
De.add(Fe.SPACEBAR),
De.add(Fe.PAGE_UP),
De.add(Fe.PAGE_DOWN),
De.add(Fe.END),
De.add(Fe.HOME),
De.add(Fe.ARROW_LEFT),
De.add(Fe.ARROW_UP),
De.add(Fe.ARROW_RIGHT),
De.add(Fe.ARROW_DOWN),
De.add(Fe.DELETE),
De.add(Fe.ESCAPE),
De.add(Fe.TAB);
var ze = 8
  , Me = 13
  , Ne = 32
  , Be = 33
  , Pe = 34
  , Ue = 35
  , $e = 36
  , He = 37
  , Ve = 38
  , We = 39
  , Ge = 40
  , Xe = 46
  , qe = 27
  , Ze = 9
  , Ye = new Map;
Ye.set(ze, Fe.BACKSPACE),
Ye.set(Me, Fe.ENTER),
Ye.set(Ne, Fe.SPACEBAR),
Ye.set(Be, Fe.PAGE_UP),
Ye.set(Pe, Fe.PAGE_DOWN),
Ye.set(Ue, Fe.END),
Ye.set($e, Fe.HOME),
Ye.set(He, Fe.ARROW_LEFT),
Ye.set(Ve, Fe.ARROW_UP),
Ye.set(We, Fe.ARROW_RIGHT),
Ye.set(Ge, Fe.ARROW_DOWN),
Ye.set(Xe, Fe.DELETE),
Ye.set(qe, Fe.ESCAPE),
Ye.set(Ze, Fe.TAB);
var je, Ke, Qe = new Set;
function Je(e) {
    var t = e.key;
    if (De.has(t))
        return t;
    var i = Ye.get(e.keyCode);
    return i || Fe.UNKNOWN
}
Qe.add(Fe.PAGE_UP),
Qe.add(Fe.PAGE_DOWN),
Qe.add(Fe.END),
Qe.add(Fe.HOME),
Qe.add(Fe.ARROW_LEFT),
Qe.add(Fe.ARROW_UP),
Qe.add(Fe.ARROW_RIGHT),
Qe.add(Fe.ARROW_DOWN);
var et = "mdc-list-item--activated"
  , tt = "mdc-list-item"
  , it = "mdc-list-item--disabled"
  , nt = "mdc-list-item--selected"
  , ot = "mdc-list-item__text"
  , rt = "mdc-list-item__primary-text"
  , at = "mdc-list";
(je = {})["" + et] = "mdc-list-item--activated",
je["" + tt] = "mdc-list-item",
je["" + it] = "mdc-list-item--disabled",
je["" + nt] = "mdc-list-item--selected",
je["" + rt] = "mdc-list-item__primary-text",
je["" + at] = "mdc-list";
var dt = ((Ke = {})["" + et] = "mdc-deprecated-list-item--activated",
Ke["" + tt] = "mdc-deprecated-list-item",
Ke["" + it] = "mdc-deprecated-list-item--disabled",
Ke["" + nt] = "mdc-deprecated-list-item--selected",
Ke["" + ot] = "mdc-deprecated-list-item__text",
Ke["" + rt] = "mdc-deprecated-list-item__primary-text",
Ke["" + at] = "mdc-deprecated-list",
Ke)
  , st = {
    ACTION_EVENT: "MDCList:action",
    SELECTION_CHANGE_EVENT: "MDCList:selectionChange",
    ARIA_CHECKED: "aria-checked",
    ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
    ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
    ARIA_CURRENT: "aria-current",
    ARIA_DISABLED: "aria-disabled",
    ARIA_ORIENTATION: "aria-orientation",
    ARIA_ORIENTATION_HORIZONTAL: "horizontal",
    ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
    ARIA_SELECTED: "aria-selected",
    ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
    ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
    CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
    CHECKBOX_SELECTOR: 'input[type="checkbox"]',
    CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + tt + " button:not(:disabled),\n    ." + tt + " a,\n    ." + dt[tt] + " button:not(:disabled),\n    ." + dt[tt] + " a\n  ",
    DEPRECATED_SELECTOR: ".mdc-deprecated-list",
    FOCUSABLE_CHILD_ELEMENTS: "\n    ." + tt + " button:not(:disabled),\n    ." + tt + " a,\n    ." + tt + ' input[type="radio"]:not(:disabled),\n    .' + tt + ' input[type="checkbox"]:not(:disabled),\n    .' + dt[tt] + " button:not(:disabled),\n    ." + dt[tt] + " a,\n    ." + dt[tt] + ' input[type="radio"]:not(:disabled),\n    .' + dt[tt] + ' input[type="checkbox"]:not(:disabled)\n  ',
    RADIO_SELECTOR: 'input[type="radio"]',
    SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]'
}
  , lt = {
    UNSET_INDEX: -1,
    TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
};
const ct = (e,t)=>e - t
  , ht = ["input", "button", "textarea", "select"];
function mt(e) {
    return e instanceof Set
}
const pt = e=>{
    const t = e === lt.UNSET_INDEX ? new Set : e;
    return mt(t) ? new Set(t) : new Set([t])
}
;
class ut extends _ {
    constructor(e) {
        super(Object.assign(Object.assign({}, ut.defaultAdapter), e)),
        this.isMulti_ = !1,
        this.wrapFocus_ = !1,
        this.isVertical_ = !0,
        this.selectedIndex_ = lt.UNSET_INDEX,
        this.focusedItemIndex_ = lt.UNSET_INDEX,
        this.useActivatedClass_ = !1,
        this.ariaCurrentAttrValue_ = null
    }
    static get strings() {
        return st
    }
    static get numbers() {
        return lt
    }
    static get defaultAdapter() {
        return {
            focusItemAtIndex: ()=>{}
            ,
            getFocusedElementIndex: ()=>0,
            getListItemCount: ()=>0,
            isFocusInsideList: ()=>!1,
            isRootFocused: ()=>!1,
            notifyAction: ()=>{}
            ,
            notifySelected: ()=>{}
            ,
            getSelectedStateForElementIndex: ()=>!1,
            setDisabledStateForElementIndex: ()=>{}
            ,
            getDisabledStateForElementIndex: ()=>!1,
            setSelectedStateForElementIndex: ()=>{}
            ,
            setActivatedStateForElementIndex: ()=>{}
            ,
            setTabIndexForElementIndex: ()=>{}
            ,
            setAttributeForElementIndex: ()=>{}
            ,
            getAttributeForElementIndex: ()=>null
        }
    }
    setWrapFocus(e) {
        this.wrapFocus_ = e
    }
    setMulti(e) {
        this.isMulti_ = e;
        const t = this.selectedIndex_;
        if (e) {
            if (!mt(t)) {
                const e = t === lt.UNSET_INDEX;
                this.selectedIndex_ = e ? new Set : new Set([t])
            }
        } else if (mt(t))
            if (t.size) {
                const e = Array.from(t).sort(ct);
                this.selectedIndex_ = e[0]
            } else
                this.selectedIndex_ = lt.UNSET_INDEX
    }
    setVerticalOrientation(e) {
        this.isVertical_ = e
    }
    setUseActivatedClass(e) {
        this.useActivatedClass_ = e
    }
    getSelectedIndex() {
        return this.selectedIndex_
    }
    setSelectedIndex(e) {
        this.isIndexValid_(e) && (this.isMulti_ ? this.setMultiSelectionAtIndex_(pt(e)) : this.setSingleSelectionAtIndex_(e))
    }
    handleFocusIn(e, t) {
        t >= 0 && this.adapter.setTabIndexForElementIndex(t, 0)
    }
    handleFocusOut(e, t) {
        t >= 0 && this.adapter.setTabIndexForElementIndex(t, -1),
        setTimeout((()=>{
            this.adapter.isFocusInsideList() || this.setTabindexToFirstSelectedItem_()
        }
        ), 0)
    }
    handleKeydown(e, t, i) {
        const n = "ArrowLeft" === Je(e)
          , o = "ArrowUp" === Je(e)
          , r = "ArrowRight" === Je(e)
          , a = "ArrowDown" === Je(e)
          , d = "Home" === Je(e)
          , s = "End" === Je(e)
          , l = "Enter" === Je(e)
          , c = "Spacebar" === Je(e);
        if (this.adapter.isRootFocused())
            return void (o || s ? (e.preventDefault(),
            this.focusLastElement()) : (a || d) && (e.preventDefault(),
            this.focusFirstElement()));
        let h, m = this.adapter.getFocusedElementIndex();
        if (!(-1 === m && (m = i,
        m < 0))) {
            if (this.isVertical_ && a || !this.isVertical_ && r)
                this.preventDefaultEvent(e),
                h = this.focusNextElement(m);
            else if (this.isVertical_ && o || !this.isVertical_ && n)
                this.preventDefaultEvent(e),
                h = this.focusPrevElement(m);
            else if (d)
                this.preventDefaultEvent(e),
                h = this.focusFirstElement();
            else if (s)
                this.preventDefaultEvent(e),
                h = this.focusLastElement();
            else if ((l || c) && t) {
                const t = e.target;
                if (t && "A" === t.tagName && l)
                    return;
                this.preventDefaultEvent(e),
                this.setSelectedIndexOnAction_(m, !0)
            }
            this.focusedItemIndex_ = m,
            void 0 !== h && (this.setTabindexAtIndex_(h),
            this.focusedItemIndex_ = h)
        }
    }
    handleSingleSelection(e, t, i) {
        e !== lt.UNSET_INDEX && (this.setSelectedIndexOnAction_(e, t, i),
        this.setTabindexAtIndex_(e),
        this.focusedItemIndex_ = e)
    }
    focusNextElement(e) {
        let t = e + 1;
        if (t >= this.adapter.getListItemCount()) {
            if (!this.wrapFocus_)
                return e;
            t = 0
        }
        return this.adapter.focusItemAtIndex(t),
        t
    }
    focusPrevElement(e) {
        let t = e - 1;
        if (t < 0) {
            if (!this.wrapFocus_)
                return e;
            t = this.adapter.getListItemCount() - 1
        }
        return this.adapter.focusItemAtIndex(t),
        t
    }
    focusFirstElement() {
        return this.adapter.focusItemAtIndex(0),
        0
    }
    focusLastElement() {
        const e = this.adapter.getListItemCount() - 1;
        return this.adapter.focusItemAtIndex(e),
        e
    }
    setEnabled(e, t) {
        this.isIndexValid_(e) && this.adapter.setDisabledStateForElementIndex(e, !t)
    }
    preventDefaultEvent(e) {
        const t = `${e.target.tagName}`.toLowerCase();
        -1 === ht.indexOf(t) && e.preventDefault()
    }
    setSingleSelectionAtIndex_(e, t=!0) {
        this.selectedIndex_ !== e && (this.selectedIndex_ !== lt.UNSET_INDEX && (this.adapter.setSelectedStateForElementIndex(this.selectedIndex_, !1),
        this.useActivatedClass_ && this.adapter.setActivatedStateForElementIndex(this.selectedIndex_, !1)),
        t && this.adapter.setSelectedStateForElementIndex(e, !0),
        this.useActivatedClass_ && this.adapter.setActivatedStateForElementIndex(e, !0),
        this.setAriaForSingleSelectionAtIndex_(e),
        this.selectedIndex_ = e,
        this.adapter.notifySelected(e))
    }
    setMultiSelectionAtIndex_(e, t=!0) {
        const i = ((e,t)=>{
            const i = Array.from(e)
              , n = Array.from(t)
              , o = {
                added: [],
                removed: []
            }
              , r = i.sort(ct)
              , a = n.sort(ct);
            let d = 0
              , s = 0;
            for (; d < r.length || s < a.length; ) {
                const e = r[d]
                  , t = a[s];
                e !== t ? void 0 !== e && (void 0 === t || e < t) ? (o.removed.push(e),
                d++) : void 0 !== t && (void 0 === e || t < e) && (o.added.push(t),
                s++) : (d++,
                s++)
            }
            return o
        }
        )(pt(this.selectedIndex_), e);
        if (i.removed.length || i.added.length) {
            for (const e of i.removed)
                t && this.adapter.setSelectedStateForElementIndex(e, !1),
                this.useActivatedClass_ && this.adapter.setActivatedStateForElementIndex(e, !1);
            for (const e of i.added)
                t && this.adapter.setSelectedStateForElementIndex(e, !0),
                this.useActivatedClass_ && this.adapter.setActivatedStateForElementIndex(e, !0);
            this.selectedIndex_ = e,
            this.adapter.notifySelected(e, i)
        }
    }
    setAriaForSingleSelectionAtIndex_(e) {
        this.selectedIndex_ === lt.UNSET_INDEX && (this.ariaCurrentAttrValue_ = this.adapter.getAttributeForElementIndex(e, st.ARIA_CURRENT));
        const t = null !== this.ariaCurrentAttrValue_
          , i = t ? st.ARIA_CURRENT : st.ARIA_SELECTED;
        this.selectedIndex_ !== lt.UNSET_INDEX && this.adapter.setAttributeForElementIndex(this.selectedIndex_, i, "false");
        const n = t ? this.ariaCurrentAttrValue_ : "true";
        this.adapter.setAttributeForElementIndex(e, i, n)
    }
    setTabindexAtIndex_(e) {
        this.focusedItemIndex_ === lt.UNSET_INDEX && 0 !== e ? this.adapter.setTabIndexForElementIndex(0, -1) : this.focusedItemIndex_ >= 0 && this.focusedItemIndex_ !== e && this.adapter.setTabIndexForElementIndex(this.focusedItemIndex_, -1),
        this.adapter.setTabIndexForElementIndex(e, 0)
    }
    setTabindexToFirstSelectedItem_() {
        let e = 0;
        "number" == typeof this.selectedIndex_ && this.selectedIndex_ !== lt.UNSET_INDEX ? e = this.selectedIndex_ : mt(this.selectedIndex_) && this.selectedIndex_.size > 0 && (e = Math.min(...this.selectedIndex_)),
        this.setTabindexAtIndex_(e)
    }
    isIndexValid_(e) {
        if (e instanceof Set) {
            if (!this.isMulti_)
                throw new Error("MDCListFoundation: Array of index is only supported for checkbox based list");
            if (0 === e.size)
                return !0;
            {
                let t = !1;
                for (const i of e)
                    if (t = this.isIndexInRange_(i),
                    t)
                        break;
                return t
            }
        }
        if ("number" == typeof e) {
            if (this.isMulti_)
                throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + e);
            return e === lt.UNSET_INDEX || this.isIndexInRange_(e)
        }
        return !1
    }
    isIndexInRange_(e) {
        const t = this.adapter.getListItemCount();
        return e >= 0 && e < t
    }
    setSelectedIndexOnAction_(e, t, i) {
        if (this.adapter.getDisabledStateForElementIndex(e))
            return;
        let n = e;
        if (this.isMulti_ && (n = new Set([e])),
        this.isIndexValid_(n)) {
            if (this.isMulti_)
                this.toggleMultiAtIndex(e, i, t);
            else if (t || i)
                this.setSingleSelectionAtIndex_(e, t);
            else {
                this.selectedIndex_ === e && this.setSingleSelectionAtIndex_(lt.UNSET_INDEX)
            }
            t && this.adapter.notifyAction(e)
        }
    }
    toggleMultiAtIndex(e, t, i=!0) {
        let n = !1;
        n = void 0 === t ? !this.adapter.getSelectedStateForElementIndex(e) : t;
        const o = pt(this.selectedIndex_);
        n ? o.add(e) : o.delete(e),
        this.setMultiSelectionAtIndex_(o, i)
    }
}
const ft = e=>e.hasAttribute("mwc-list-item");
function gt() {
    const e = this.itemsReadyResolver;
    this.itemsReady = new Promise((e=>this.itemsReadyResolver = e)),
    e()
}
class _t extends o {
    constructor() {
        super(),
        this.mdcAdapter = null,
        this.mdcFoundationClass = ut,
        this.activatable = !1,
        this.multi = !1,
        this.wrapFocus = !1,
        this.itemRoles = null,
        this.innerRole = null,
        this.innerAriaLabel = null,
        this.rootTabbable = !1,
        this.previousTabindex = null,
        this.noninteractive = !1,
        this.itemsReadyResolver = ()=>{}
        ,
        this.itemsReady = Promise.resolve([]),
        this.items_ = [];
        const e = function(e, t=50) {
            let i;
            return function(n=!0) {
                clearTimeout(i),
                i = setTimeout((()=>{
                    e(n)
                }
                ), t)
            }
        }(this.layout.bind(this));
        this.debouncedLayout = (t=!0)=>{
            gt.call(this),
            e(t)
        }
    }
    async getUpdateComplete() {
        const e = await super.getUpdateComplete();
        return await this.itemsReady,
        e
    }
    get items() {
        return this.items_
    }
    updateItems() {
        var e;
        const t = null !== (e = this.assignedElements) && void 0 !== e ? e : []
          , i = [];
        for (const e of t)
            ft(e) && (i.push(e),
            e._managingList = this),
            e.hasAttribute("divider") && !e.hasAttribute("role") && e.setAttribute("role", "separator");
        this.items_ = i;
        const n = new Set;
        if (this.items_.forEach(((e,t)=>{
            this.itemRoles ? e.setAttribute("role", this.itemRoles) : e.removeAttribute("role"),
            e.selected && n.add(t)
        }
        )),
        this.multi)
            this.select(n);
        else {
            const e = n.size ? n.entries().next().value[1] : -1;
            this.select(e)
        }
        const o = new Event("items-updated",{
            bubbles: !0,
            composed: !0
        });
        this.dispatchEvent(o)
    }
    get selected() {
        const e = this.index;
        if (!mt(e))
            return -1 === e ? null : this.items[e];
        const t = [];
        for (const i of e)
            t.push(this.items[i]);
        return t
    }
    get index() {
        return this.mdcFoundation ? this.mdcFoundation.getSelectedIndex() : -1
    }
    render() {
        const e = null === this.innerRole ? void 0 : this.innerRole
          , t = null === this.innerAriaLabel ? void 0 : this.innerAriaLabel
          , i = this.rootTabbable ? "0" : "-1";
        return h`
      <!-- @ts-ignore -->
      <ul
          tabindex=${i}
          role="${p(e)}"
          aria-label="${p(t)}"
          class="mdc-deprecated-list"
          @keydown=${this.onKeydown}
          @focusin=${this.onFocusIn}
          @focusout=${this.onFocusOut}
          @request-selected=${this.onRequestSelected}
          @list-item-rendered=${this.onListItemConnected}>
        <slot></slot>
        ${this.renderPlaceholder()}
      </ul>
    `
    }
    renderPlaceholder() {
        var e;
        const t = null !== (e = this.assignedElements) && void 0 !== e ? e : [];
        return void 0 !== this.emptyMessage && 0 === t.length ? h`
        <mwc-list-item noninteractive>${this.emptyMessage}</mwc-list-item>
      ` : null
    }
    firstUpdated() {
        super.firstUpdated(),
        this.items.length || (this.mdcFoundation.setMulti(this.multi),
        this.layout())
    }
    onFocusIn(e) {
        if (this.mdcFoundation && this.mdcRoot) {
            const t = this.getIndexOfTarget(e);
            this.mdcFoundation.handleFocusIn(e, t)
        }
    }
    onFocusOut(e) {
        if (this.mdcFoundation && this.mdcRoot) {
            const t = this.getIndexOfTarget(e);
            this.mdcFoundation.handleFocusOut(e, t)
        }
    }
    onKeydown(e) {
        if (this.mdcFoundation && this.mdcRoot) {
            const t = this.getIndexOfTarget(e)
              , i = e.target
              , n = ft(i);
            this.mdcFoundation.handleKeydown(e, n, t)
        }
    }
    onRequestSelected(e) {
        if (this.mdcFoundation) {
            let t = this.getIndexOfTarget(e);
            if (-1 === t && (this.layout(),
            t = this.getIndexOfTarget(e),
            -1 === t))
                return;
            if (this.items[t].disabled)
                return;
            const i = e.detail.selected
              , n = e.detail.source;
            this.mdcFoundation.handleSingleSelection(t, "interaction" === n, i),
            e.stopPropagation()
        }
    }
    getIndexOfTarget(e) {
        const t = this.items
          , i = e.composedPath();
        for (const e of i) {
            let i = -1;
            if (R(e) && ft(e) && (i = t.indexOf(e)),
            -1 !== i)
                return i
        }
        return -1
    }
    createAdapter() {
        return this.mdcAdapter = {
            getListItemCount: ()=>this.mdcRoot ? this.items.length : 0,
            getFocusedElementIndex: this.getFocusedItemIndex,
            getAttributeForElementIndex: (e,t)=>{
                if (!this.mdcRoot)
                    return "";
                const i = this.items[e];
                return i ? i.getAttribute(t) : ""
            }
            ,
            setAttributeForElementIndex: (e,t,i)=>{
                if (!this.mdcRoot)
                    return;
                const n = this.items[e];
                n && n.setAttribute(t, i)
            }
            ,
            focusItemAtIndex: e=>{
                const t = this.items[e];
                t && t.focus()
            }
            ,
            setTabIndexForElementIndex: (e,t)=>{
                const i = this.items[e];
                i && (i.tabindex = t)
            }
            ,
            notifyAction: e=>{
                const t = {
                    bubbles: !0,
                    composed: !0
                };
                t.detail = {
                    index: e
                };
                const i = new CustomEvent("action",t);
                this.dispatchEvent(i)
            }
            ,
            notifySelected: (e,t)=>{
                const i = {
                    bubbles: !0,
                    composed: !0
                };
                i.detail = {
                    index: e,
                    diff: t
                };
                const n = new CustomEvent("selected",i);
                this.dispatchEvent(n)
            }
            ,
            isFocusInsideList: ()=>T(this),
            isRootFocused: ()=>{
                const e = this.mdcRoot;
                return e.getRootNode().activeElement === e
            }
            ,
            setDisabledStateForElementIndex: (e,t)=>{
                const i = this.items[e];
                i && (i.disabled = t)
            }
            ,
            getDisabledStateForElementIndex: e=>{
                const t = this.items[e];
                return !!t && t.disabled
            }
            ,
            setSelectedStateForElementIndex: (e,t)=>{
                const i = this.items[e];
                i && (i.selected = t)
            }
            ,
            getSelectedStateForElementIndex: e=>{
                const t = this.items[e];
                return !!t && t.selected
            }
            ,
            setActivatedStateForElementIndex: (e,t)=>{
                const i = this.items[e];
                i && (i.activated = t)
            }
        },
        this.mdcAdapter
    }
    selectUi(e, t=!1) {
        const i = this.items[e];
        i && (i.selected = !0,
        i.activated = t)
    }
    deselectUi(e) {
        const t = this.items[e];
        t && (t.selected = !1,
        t.activated = !1)
    }
    select(e) {
        this.mdcFoundation && this.mdcFoundation.setSelectedIndex(e)
    }
    toggle(e, t) {
        this.multi && this.mdcFoundation.toggleMultiAtIndex(e, t)
    }
    onListItemConnected(e) {
        const t = e.target;
        this.layout(-1 === this.items.indexOf(t))
    }
    layout(e=!0) {
        e && this.updateItems();
        const t = this.items[0];
        for (const e of this.items)
            e.tabindex = -1;
        t && (this.noninteractive ? this.previousTabindex || (this.previousTabindex = t) : t.tabindex = 0),
        this.itemsReadyResolver()
    }
    getFocusedItemIndex() {
        if (!this.mdcRoot)
            return -1;
        if (!this.items.length)
            return -1;
        const e = C();
        if (!e.length)
            return -1;
        for (let t = e.length - 1; t >= 0; t--) {
            const i = e[t];
            if (ft(i))
                return this.items.indexOf(i)
        }
        return -1
    }
    focusItemAtIndex(e) {
        for (const e of this.items)
            if (0 === e.tabindex) {
                e.tabindex = -1;
                break
            }
        this.items[e].tabindex = 0,
        this.items[e].focus()
    }
    focus() {
        const e = this.mdcRoot;
        e && e.focus()
    }
    blur() {
        const e = this.mdcRoot;
        e && e.blur()
    }
}
i([n({
    type: String
})], _t.prototype, "emptyMessage", void 0),
i([a(".mdc-deprecated-list")], _t.prototype, "mdcRoot", void 0),
i([D("", !0, "*")], _t.prototype, "assignedElements", void 0),
i([D("", !0, '[tabindex="0"]')], _t.prototype, "tabbableElements", void 0),
i([n({
    type: Boolean
}), b((function(e) {
    this.mdcFoundation && this.mdcFoundation.setUseActivatedClass(e)
}
))], _t.prototype, "activatable", void 0),
i([n({
    type: Boolean
}), b((function(e, t) {
    this.mdcFoundation && this.mdcFoundation.setMulti(e),
    void 0 !== t && this.layout()
}
))], _t.prototype, "multi", void 0),
i([n({
    type: Boolean
}), b((function(e) {
    this.mdcFoundation && this.mdcFoundation.setWrapFocus(e)
}
))], _t.prototype, "wrapFocus", void 0),
i([n({
    type: String
}), b((function(e, t) {
    void 0 !== t && this.updateItems()
}
))], _t.prototype, "itemRoles", void 0),
i([n({
    type: String
})], _t.prototype, "innerRole", void 0),
i([n({
    type: String
})], _t.prototype, "innerAriaLabel", void 0),
i([n({
    type: Boolean
})], _t.prototype, "rootTabbable", void 0),
i([n({
    type: Boolean,
    reflect: !0
}), b((function(e) {
    var t, i;
    if (e) {
        const e = null !== (i = null === (t = this.tabbableElements) || void 0 === t ? void 0 : t[0]) && void 0 !== i ? i : null;
        this.previousTabindex = e,
        e && e.setAttribute("tabindex", "-1")
    } else
        !e && this.previousTabindex && (this.previousTabindex.setAttribute("tabindex", "0"),
        this.previousTabindex = null)
}
))], _t.prototype, "noninteractive", void 0);
const bt = u`@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{display:block}.mdc-deprecated-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));padding:var(--mdc-list-vertical-padding, 8px) 0}.mdc-deprecated-list:focus{outline:none}.mdc-deprecated-list-item{height:48px}.mdc-deprecated-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-deprecated-list ::slotted([divider]){height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(0, 0, 0, 0.12)}.mdc-deprecated-list ::slotted([divider][padded]){margin:0 var(--mdc-list-side-padding, 16px)}.mdc-deprecated-list ::slotted([divider][inset]){margin-left:var(--mdc-list-inset-margin, 72px);margin-right:0;width:calc( 100% - var(--mdc-list-inset-margin, 72px) )}[dir=rtl] .mdc-deprecated-list ::slotted([divider][inset]),.mdc-deprecated-list ::slotted([divider][inset][dir=rtl]){margin-left:0;margin-right:var(--mdc-list-inset-margin, 72px)}.mdc-deprecated-list ::slotted([divider][inset][padded]){width:calc( 100% - var(--mdc-list-inset-margin, 72px) - var(--mdc-list-side-padding, 16px) )}.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:40px}.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 20px}.mdc-deprecated-list--two-line.mdc-deprecated-list--dense ::slotted([mwc-list-item]),.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:60px}.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 36px}:host([noninteractive]){pointer-events:none;cursor:default}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text){display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}`;
let xt = class extends _t {
}
;
xt.styles = [bt],
xt = i([y("mwc-list")], xt);
var yt, vt, wt = {
    ANCHOR: "mdc-menu-surface--anchor",
    ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
    ANIMATING_OPEN: "mdc-menu-surface--animating-open",
    FIXED: "mdc-menu-surface--fixed",
    IS_OPEN_BELOW: "mdc-menu-surface--is-open-below",
    OPEN: "mdc-menu-surface--open",
    ROOT: "mdc-menu-surface"
}, kt = {
    CLOSED_EVENT: "MDCMenuSurface:closed",
    CLOSING_EVENT: "MDCMenuSurface:closing",
    OPENED_EVENT: "MDCMenuSurface:opened",
    OPENING_EVENT: "MDCMenuSurface:opening",
    FOCUSABLE_ELEMENTS: ["button:not(:disabled)", '[href]:not([aria-disabled="true"])', "input:not(:disabled)", "select:not(:disabled)", "textarea:not(:disabled)", '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'].join(", ")
}, Et = {
    TRANSITION_OPEN_DURATION: 120,
    TRANSITION_CLOSE_DURATION: 75,
    MARGIN_TO_EDGE: 32,
    ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: .67,
    TOUCH_EVENT_WAIT_MS: 30
};
!function(e) {
    e[e.BOTTOM = 1] = "BOTTOM",
    e[e.CENTER = 2] = "CENTER",
    e[e.RIGHT = 4] = "RIGHT",
    e[e.FLIP_RTL = 8] = "FLIP_RTL"
}(yt || (yt = {})),
function(e) {
    e[e.TOP_LEFT = 0] = "TOP_LEFT",
    e[e.TOP_RIGHT = 4] = "TOP_RIGHT",
    e[e.BOTTOM_LEFT = 1] = "BOTTOM_LEFT",
    e[e.BOTTOM_RIGHT = 5] = "BOTTOM_RIGHT",
    e[e.TOP_START = 8] = "TOP_START",
    e[e.TOP_END = 12] = "TOP_END",
    e[e.BOTTOM_START = 9] = "BOTTOM_START",
    e[e.BOTTOM_END = 13] = "BOTTOM_END"
}(vt || (vt = {}));
var It = function(e) {
    function t(i) {
        var n = e.call(this, g(g({}, t.defaultAdapter), i)) || this;
        return n.isSurfaceOpen = !1,
        n.isQuickOpen = !1,
        n.isHoistedElement = !1,
        n.isFixedPosition = !1,
        n.isHorizontallyCenteredOnViewport = !1,
        n.maxHeight = 0,
        n.openBottomBias = 0,
        n.openAnimationEndTimerId = 0,
        n.closeAnimationEndTimerId = 0,
        n.animationRequestId = 0,
        n.anchorCorner = vt.TOP_START,
        n.originCorner = vt.TOP_START,
        n.anchorMargin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        n.position = {
            x: 0,
            y: 0
        },
        n
    }
    return f(t, e),
    Object.defineProperty(t, "cssClasses", {
        get: function() {
            return wt
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "strings", {
        get: function() {
            return kt
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "numbers", {
        get: function() {
            return Et
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "Corner", {
        get: function() {
            return vt
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "defaultAdapter", {
        get: function() {
            return {
                addClass: function() {},
                removeClass: function() {},
                hasClass: function() {
                    return !1
                },
                hasAnchor: function() {
                    return !1
                },
                isElementInContainer: function() {
                    return !1
                },
                isFocused: function() {
                    return !1
                },
                isRtl: function() {
                    return !1
                },
                getInnerDimensions: function() {
                    return {
                        height: 0,
                        width: 0
                    }
                },
                getAnchorDimensions: function() {
                    return null
                },
                getWindowDimensions: function() {
                    return {
                        height: 0,
                        width: 0
                    }
                },
                getBodyDimensions: function() {
                    return {
                        height: 0,
                        width: 0
                    }
                },
                getWindowScroll: function() {
                    return {
                        x: 0,
                        y: 0
                    }
                },
                setPosition: function() {},
                setMaxHeight: function() {},
                setTransformOrigin: function() {},
                saveFocus: function() {},
                restoreFocus: function() {},
                notifyClose: function() {},
                notifyClosing: function() {},
                notifyOpen: function() {},
                notifyOpening: function() {}
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.init = function() {
        var e = t.cssClasses
          , i = e.ROOT
          , n = e.OPEN;
        if (!this.adapter.hasClass(i))
            throw new Error(i + " class required in root element.");
        this.adapter.hasClass(n) && (this.isSurfaceOpen = !0)
    }
    ,
    t.prototype.destroy = function() {
        clearTimeout(this.openAnimationEndTimerId),
        clearTimeout(this.closeAnimationEndTimerId),
        cancelAnimationFrame(this.animationRequestId)
    }
    ,
    t.prototype.setAnchorCorner = function(e) {
        this.anchorCorner = e
    }
    ,
    t.prototype.flipCornerHorizontally = function() {
        this.originCorner = this.originCorner ^ yt.RIGHT
    }
    ,
    t.prototype.setAnchorMargin = function(e) {
        this.anchorMargin.top = e.top || 0,
        this.anchorMargin.right = e.right || 0,
        this.anchorMargin.bottom = e.bottom || 0,
        this.anchorMargin.left = e.left || 0
    }
    ,
    t.prototype.setIsHoisted = function(e) {
        this.isHoistedElement = e
    }
    ,
    t.prototype.setFixedPosition = function(e) {
        this.isFixedPosition = e
    }
    ,
    t.prototype.isFixed = function() {
        return this.isFixedPosition
    }
    ,
    t.prototype.setAbsolutePosition = function(e, t) {
        this.position.x = this.isFinite(e) ? e : 0,
        this.position.y = this.isFinite(t) ? t : 0
    }
    ,
    t.prototype.setIsHorizontallyCenteredOnViewport = function(e) {
        this.isHorizontallyCenteredOnViewport = e
    }
    ,
    t.prototype.setQuickOpen = function(e) {
        this.isQuickOpen = e
    }
    ,
    t.prototype.setMaxHeight = function(e) {
        this.maxHeight = e
    }
    ,
    t.prototype.setOpenBottomBias = function(e) {
        this.openBottomBias = e
    }
    ,
    t.prototype.isOpen = function() {
        return this.isSurfaceOpen
    }
    ,
    t.prototype.open = function() {
        var e = this;
        this.isSurfaceOpen || (this.adapter.notifyOpening(),
        this.adapter.saveFocus(),
        this.isQuickOpen ? (this.isSurfaceOpen = !0,
        this.adapter.addClass(t.cssClasses.OPEN),
        this.dimensions = this.adapter.getInnerDimensions(),
        this.autoposition(),
        this.adapter.notifyOpen()) : (this.adapter.addClass(t.cssClasses.ANIMATING_OPEN),
        this.animationRequestId = requestAnimationFrame((function() {
            e.dimensions = e.adapter.getInnerDimensions(),
            e.autoposition(),
            e.adapter.addClass(t.cssClasses.OPEN),
            e.openAnimationEndTimerId = setTimeout((function() {
                e.openAnimationEndTimerId = 0,
                e.adapter.removeClass(t.cssClasses.ANIMATING_OPEN),
                e.adapter.notifyOpen()
            }
            ), Et.TRANSITION_OPEN_DURATION)
        }
        )),
        this.isSurfaceOpen = !0))
    }
    ,
    t.prototype.close = function(e) {
        var i = this;
        if (void 0 === e && (e = !1),
        this.isSurfaceOpen) {
            if (this.adapter.notifyClosing(),
            this.isQuickOpen)
                return this.isSurfaceOpen = !1,
                e || this.maybeRestoreFocus(),
                this.adapter.removeClass(t.cssClasses.OPEN),
                this.adapter.removeClass(t.cssClasses.IS_OPEN_BELOW),
                void this.adapter.notifyClose();
            this.adapter.addClass(t.cssClasses.ANIMATING_CLOSED),
            requestAnimationFrame((function() {
                i.adapter.removeClass(t.cssClasses.OPEN),
                i.adapter.removeClass(t.cssClasses.IS_OPEN_BELOW),
                i.closeAnimationEndTimerId = setTimeout((function() {
                    i.closeAnimationEndTimerId = 0,
                    i.adapter.removeClass(t.cssClasses.ANIMATING_CLOSED),
                    i.adapter.notifyClose()
                }
                ), Et.TRANSITION_CLOSE_DURATION)
            }
            )),
            this.isSurfaceOpen = !1,
            e || this.maybeRestoreFocus()
        }
    }
    ,
    t.prototype.handleBodyClick = function(e) {
        var t = e.target;
        this.adapter.isElementInContainer(t) || this.close()
    }
    ,
    t.prototype.handleKeydown = function(e) {
        var t = e.keyCode;
        ("Escape" === e.key || 27 === t) && this.close()
    }
    ,
    t.prototype.autoposition = function() {
        var e;
        this.measurements = this.getAutoLayoutmeasurements();
        var i = this.getoriginCorner()
          , n = this.getMenuSurfaceMaxHeight(i)
          , o = this.hasBit(i, yt.BOTTOM) ? "bottom" : "top"
          , r = this.hasBit(i, yt.RIGHT) ? "right" : "left"
          , a = this.getHorizontalOriginOffset(i)
          , d = this.getVerticalOriginOffset(i)
          , s = this.measurements
          , l = s.anchorSize
          , c = s.surfaceSize
          , h = ((e = {})[r] = a,
        e[o] = d,
        e);
        l.width / c.width > Et.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO && (r = "center"),
        (this.isHoistedElement || this.isFixedPosition) && this.adjustPositionForHoistedElement(h),
        this.adapter.setTransformOrigin(r + " " + o),
        this.adapter.setPosition(h),
        this.adapter.setMaxHeight(n ? n + "px" : ""),
        this.hasBit(i, yt.BOTTOM) || this.adapter.addClass(t.cssClasses.IS_OPEN_BELOW)
    }
    ,
    t.prototype.getAutoLayoutmeasurements = function() {
        var e = this.adapter.getAnchorDimensions()
          , t = this.adapter.getBodyDimensions()
          , i = this.adapter.getWindowDimensions()
          , n = this.adapter.getWindowScroll();
        return e || (e = {
            top: this.position.y,
            right: this.position.x,
            bottom: this.position.y,
            left: this.position.x,
            width: 0,
            height: 0
        }),
        {
            anchorSize: e,
            bodySize: t,
            surfaceSize: this.dimensions,
            viewportDistance: {
                top: e.top,
                right: i.width - e.right,
                bottom: i.height - e.bottom,
                left: e.left
            },
            viewportSize: i,
            windowScroll: n
        }
    }
    ,
    t.prototype.getoriginCorner = function() {
        var e, i, n = this.originCorner, o = this.measurements, r = o.viewportDistance, a = o.anchorSize, d = o.surfaceSize, s = t.numbers.MARGIN_TO_EDGE;
        this.hasBit(this.anchorCorner, yt.BOTTOM) ? (e = r.top - s + this.anchorMargin.bottom,
        i = r.bottom - s - this.anchorMargin.bottom) : (e = r.top - s + this.anchorMargin.top,
        i = r.bottom - s + a.height - this.anchorMargin.top),
        !(i - d.height > 0) && e > i + this.openBottomBias && (n = this.setBit(n, yt.BOTTOM));
        var l, c, h = this.adapter.isRtl(), m = this.hasBit(this.anchorCorner, yt.FLIP_RTL), p = this.hasBit(this.anchorCorner, yt.RIGHT) || this.hasBit(n, yt.RIGHT), u = !1;
        (u = h && m ? !p : p) ? (l = r.left + a.width + this.anchorMargin.right,
        c = r.right - this.anchorMargin.right) : (l = r.left + this.anchorMargin.left,
        c = r.right + a.width - this.anchorMargin.left);
        var f = l - d.width > 0
          , g = c - d.width > 0
          , _ = this.hasBit(n, yt.FLIP_RTL) && this.hasBit(n, yt.RIGHT);
        return g && _ && h || !f && _ ? n = this.unsetBit(n, yt.RIGHT) : (f && u && h || f && !u && p || !g && l >= c) && (n = this.setBit(n, yt.RIGHT)),
        n
    }
    ,
    t.prototype.getMenuSurfaceMaxHeight = function(e) {
        if (this.maxHeight > 0)
            return this.maxHeight;
        var i = this.measurements.viewportDistance
          , n = 0
          , o = this.hasBit(e, yt.BOTTOM)
          , r = this.hasBit(this.anchorCorner, yt.BOTTOM)
          , a = t.numbers.MARGIN_TO_EDGE;
        return o ? (n = i.top + this.anchorMargin.top - a,
        r || (n += this.measurements.anchorSize.height)) : (n = i.bottom - this.anchorMargin.bottom + this.measurements.anchorSize.height - a,
        r && (n -= this.measurements.anchorSize.height)),
        n
    }
    ,
    t.prototype.getHorizontalOriginOffset = function(e) {
        var t = this.measurements.anchorSize
          , i = this.hasBit(e, yt.RIGHT)
          , n = this.hasBit(this.anchorCorner, yt.RIGHT);
        if (i) {
            var o = n ? t.width - this.anchorMargin.left : this.anchorMargin.right;
            return this.isHoistedElement || this.isFixedPosition ? o - (this.measurements.viewportSize.width - this.measurements.bodySize.width) : o
        }
        return n ? t.width - this.anchorMargin.right : this.anchorMargin.left
    }
    ,
    t.prototype.getVerticalOriginOffset = function(e) {
        var t = this.measurements.anchorSize
          , i = this.hasBit(e, yt.BOTTOM)
          , n = this.hasBit(this.anchorCorner, yt.BOTTOM);
        return i ? n ? t.height - this.anchorMargin.top : -this.anchorMargin.bottom : n ? t.height + this.anchorMargin.bottom : this.anchorMargin.top
    }
    ,
    t.prototype.adjustPositionForHoistedElement = function(e) {
        var t, i, n = this.measurements, o = n.windowScroll, r = n.viewportDistance, a = n.surfaceSize, d = n.viewportSize, s = Object.keys(e);
        try {
            for (var l = E(s), c = l.next(); !c.done; c = l.next()) {
                var h = c.value
                  , m = e[h] || 0;
                !this.isHorizontallyCenteredOnViewport || "left" !== h && "right" !== h ? (m += r[h],
                this.isFixedPosition || ("top" === h ? m += o.y : "bottom" === h ? m -= o.y : "left" === h ? m += o.x : m -= o.x),
                e[h] = m) : e[h] = (d.width - a.width) / 2
            }
        } catch (e) {
            t = {
                error: e
            }
        } finally {
            try {
                c && !c.done && (i = l.return) && i.call(l)
            } finally {
                if (t)
                    throw t.error
            }
        }
    }
    ,
    t.prototype.maybeRestoreFocus = function() {
        var e = this
          , t = this.adapter.isFocused()
          , i = this.adapter.getOwnerDocument ? this.adapter.getOwnerDocument() : document
          , n = i.activeElement && this.adapter.isElementInContainer(i.activeElement);
        (t || n) && setTimeout((function() {
            e.adapter.restoreFocus()
        }
        ), Et.TOUCH_EVENT_WAIT_MS)
    }
    ,
    t.prototype.hasBit = function(e, t) {
        return Boolean(e & t)
    }
    ,
    t.prototype.setBit = function(e, t) {
        return e | t
    }
    ,
    t.prototype.unsetBit = function(e, t) {
        return e ^ t
    }
    ,
    t.prototype.isFinite = function(e) {
        return "number" == typeof e && isFinite(e)
    }
    ,
    t
}(_)
  , At = It;
const St = {
    TOP_LEFT: vt.TOP_LEFT,
    TOP_RIGHT: vt.TOP_RIGHT,
    BOTTOM_LEFT: vt.BOTTOM_LEFT,
    BOTTOM_RIGHT: vt.BOTTOM_RIGHT,
    TOP_START: vt.TOP_START,
    TOP_END: vt.TOP_END,
    BOTTOM_START: vt.BOTTOM_START,
    BOTTOM_END: vt.BOTTOM_END
};
class Rt extends o {
    constructor() {
        super(...arguments),
        this.mdcFoundationClass = At,
        this.absolute = !1,
        this.fullwidth = !1,
        this.fixed = !1,
        this.x = null,
        this.y = null,
        this.quick = !1,
        this.open = !1,
        this.stayOpenOnBodyClick = !1,
        this.bitwiseCorner = vt.TOP_START,
        this.previousMenuCorner = null,
        this.menuCorner = "START",
        this.corner = "TOP_START",
        this.styleTop = "",
        this.styleLeft = "",
        this.styleRight = "",
        this.styleBottom = "",
        this.styleMaxHeight = "",
        this.styleTransformOrigin = "",
        this.anchor = null,
        this.previouslyFocused = null,
        this.previousAnchor = null,
        this.onBodyClickBound = ()=>{}
    }
    render() {
        return this.renderSurface()
    }
    renderSurface() {
        const e = this.getRootClasses()
          , t = this.getRootStyles();
        return h`
      <div
          class=${m(e)}
          style="${O(t)}"
          @keydown=${this.onKeydown}
          @opened=${this.registerBodyClick}
          @closed=${this.deregisterBodyClick}>
        ${this.renderContent()}
      </div>`
    }
    getRootClasses() {
        return {
            "mdc-menu-surface": !0,
            "mdc-menu-surface--fixed": this.fixed,
            "mdc-menu-surface--fullwidth": this.fullwidth
        }
    }
    getRootStyles() {
        return {
            top: this.styleTop,
            left: this.styleLeft,
            right: this.styleRight,
            bottom: this.styleBottom,
            "max-height": this.styleMaxHeight,
            "transform-origin": this.styleTransformOrigin
        }
    }
    renderContent() {
        return h`<slot></slot>`
    }
    createAdapter() {
        return Object.assign(Object.assign({}, S(this.mdcRoot)), {
            hasAnchor: ()=>!!this.anchor,
            notifyClose: ()=>{
                const e = new CustomEvent("closed",{
                    bubbles: !0,
                    composed: !0
                });
                this.open = !1,
                this.mdcRoot.dispatchEvent(e)
            }
            ,
            notifyClosing: ()=>{
                const e = new CustomEvent("closing",{
                    bubbles: !0,
                    composed: !0
                });
                this.mdcRoot.dispatchEvent(e)
            }
            ,
            notifyOpen: ()=>{
                const e = new CustomEvent("opened",{
                    bubbles: !0,
                    composed: !0
                });
                this.open = !0,
                this.mdcRoot.dispatchEvent(e)
            }
            ,
            notifyOpening: ()=>{
                const e = new CustomEvent("opening",{
                    bubbles: !0,
                    composed: !0
                });
                this.mdcRoot.dispatchEvent(e)
            }
            ,
            isElementInContainer: ()=>!1,
            isRtl: ()=>!!this.mdcRoot && "rtl" === getComputedStyle(this.mdcRoot).direction,
            setTransformOrigin: e=>{
                this.mdcRoot && (this.styleTransformOrigin = e)
            }
            ,
            isFocused: ()=>T(this),
            saveFocus: ()=>{
                const e = C()
                  , t = e.length;
                t || (this.previouslyFocused = null),
                this.previouslyFocused = e[t - 1]
            }
            ,
            restoreFocus: ()=>{
                this.previouslyFocused && "focus"in this.previouslyFocused && this.previouslyFocused.focus()
            }
            ,
            getInnerDimensions: ()=>{
                const e = this.mdcRoot;
                return e ? {
                    width: e.offsetWidth,
                    height: e.offsetHeight
                } : {
                    width: 0,
                    height: 0
                }
            }
            ,
            getAnchorDimensions: ()=>{
                const e = this.anchor;
                return e ? e.getBoundingClientRect() : null
            }
            ,
            getBodyDimensions: ()=>({
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }),
            getWindowDimensions: ()=>({
                width: window.innerWidth,
                height: window.innerHeight
            }),
            getWindowScroll: ()=>({
                x: window.pageXOffset,
                y: window.pageYOffset
            }),
            setPosition: e=>{
                this.mdcRoot && (this.styleLeft = "left"in e ? `${e.left}px` : "",
                this.styleRight = "right"in e ? `${e.right}px` : "",
                this.styleTop = "top"in e ? `${e.top}px` : "",
                this.styleBottom = "bottom"in e ? `${e.bottom}px` : "")
            }
            ,
            setMaxHeight: async e=>{
                this.mdcRoot && (this.styleMaxHeight = e,
                await this.updateComplete,
                this.styleMaxHeight = `var(--mdc-menu-max-height, ${e})`)
            }
        })
    }
    onKeydown(e) {
        this.mdcFoundation && this.mdcFoundation.handleKeydown(e)
    }
    onBodyClick(e) {
        if (this.stayOpenOnBodyClick)
            return;
        -1 === e.composedPath().indexOf(this) && this.close()
    }
    registerBodyClick() {
        this.onBodyClickBound = this.onBodyClick.bind(this),
        document.body.addEventListener("click", this.onBodyClickBound, {
            passive: !0,
            capture: !0
        })
    }
    deregisterBodyClick() {
        document.body.removeEventListener("click", this.onBodyClickBound, {
            capture: !0
        })
    }
    onOpenChanged(e, t) {
        this.mdcFoundation && (e ? this.mdcFoundation.open() : void 0 !== t && this.mdcFoundation.close())
    }
    close() {
        this.open = !1
    }
    show() {
        this.open = !0
    }
}
i([a(".mdc-menu-surface")], Rt.prototype, "mdcRoot", void 0),
i([a("slot")], Rt.prototype, "slotElement", void 0),
i([n({
    type: Boolean
}), b((function(e) {
    this.mdcFoundation && !this.fixed && this.mdcFoundation.setIsHoisted(e)
}
))], Rt.prototype, "absolute", void 0),
i([n({
    type: Boolean
})], Rt.prototype, "fullwidth", void 0),
i([n({
    type: Boolean
}), b((function(e) {
    this.mdcFoundation && !this.absolute && this.mdcFoundation.setFixedPosition(e)
}
))], Rt.prototype, "fixed", void 0),
i([n({
    type: Number
}), b((function(e) {
    this.mdcFoundation && null !== this.y && null !== e && (this.mdcFoundation.setAbsolutePosition(e, this.y),
    this.mdcFoundation.setAnchorMargin({
        left: e,
        top: this.y,
        right: -e,
        bottom: this.y
    }))
}
))], Rt.prototype, "x", void 0),
i([n({
    type: Number
}), b((function(e) {
    this.mdcFoundation && null !== this.x && null !== e && (this.mdcFoundation.setAbsolutePosition(this.x, e),
    this.mdcFoundation.setAnchorMargin({
        left: this.x,
        top: e,
        right: -this.x,
        bottom: e
    }))
}
))], Rt.prototype, "y", void 0),
i([n({
    type: Boolean
}), b((function(e) {
    this.mdcFoundation && this.mdcFoundation.setQuickOpen(e)
}
))], Rt.prototype, "quick", void 0),
i([n({
    type: Boolean,
    reflect: !0
}), b((function(e, t) {
    this.onOpenChanged(e, t)
}
))], Rt.prototype, "open", void 0),
i([n({
    type: Boolean
})], Rt.prototype, "stayOpenOnBodyClick", void 0),
i([r(), b((function(e) {
    this.mdcFoundation && this.mdcFoundation.setAnchorCorner(e)
}
))], Rt.prototype, "bitwiseCorner", void 0),
i([n({
    type: String
}), b((function(e) {
    if (this.mdcFoundation) {
        const t = "START" === e || "END" === e
          , i = null === this.previousMenuCorner
          , n = !i && e !== this.previousMenuCorner;
        t && (n || i && "END" === e) && (this.bitwiseCorner = this.bitwiseCorner ^ yt.RIGHT,
        this.mdcFoundation.flipCornerHorizontally(),
        this.previousMenuCorner = e)
    }
}
))], Rt.prototype, "menuCorner", void 0),
i([n({
    type: String
}), b((function(e) {
    if (this.mdcFoundation && e) {
        let t = St[e];
        "END" === this.menuCorner && (t ^= yt.RIGHT),
        this.bitwiseCorner = t
    }
}
))], Rt.prototype, "corner", void 0),
i([r()], Rt.prototype, "styleTop", void 0),
i([r()], Rt.prototype, "styleLeft", void 0),
i([r()], Rt.prototype, "styleRight", void 0),
i([r()], Rt.prototype, "styleBottom", void 0),
i([r()], Rt.prototype, "styleMaxHeight", void 0),
i([r()], Rt.prototype, "styleTransformOrigin", void 0);
const Tt = u`.mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-width:var(--mdc-menu-max-width, calc(100vw - 32px));max-height:calc(100vh - 32px);max-height:var(--mdc-menu-max-height, calc(100vh - 32px));margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;transition:opacity .03s linear,transform .12s cubic-bezier(0, 0, 0.2, 1),height 250ms cubic-bezier(0, 0, 0.2, 1);box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);background-color:#fff;background-color:var(--mdc-theme-surface, #fff);color:#000;color:var(--mdc-theme-on-surface, #000);border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0;transition:opacity .075s linear}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}:host(:not([open])){display:none}.mdc-menu-surface{z-index:8;z-index:var(--mdc-menu-z-index, 8);min-width:112px;min-width:var(--mdc-menu-min-width, 112px)}`;
let Ct = class extends Rt {
}
;
Ct.styles = [Tt],
Ct = i([y("mwc-menu-surface")], Ct);
var Ot, Lt = {
    MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
    MENU_SELECTION_GROUP: "mdc-menu__selection-group",
    ROOT: "mdc-menu"
}, Ft = {
    ARIA_CHECKED_ATTR: "aria-checked",
    ARIA_DISABLED_ATTR: "aria-disabled",
    CHECKBOX_SELECTOR: 'input[type="checkbox"]',
    LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
    SELECTED_EVENT: "MDCMenu:selected",
    SKIP_RESTORE_FOCUS: "data-menu-item-skip-restore-focus"
}, Dt = {
    FOCUS_ROOT_INDEX: -1
};
!function(e) {
    e[e.NONE = 0] = "NONE",
    e[e.LIST_ROOT = 1] = "LIST_ROOT",
    e[e.FIRST_ITEM = 2] = "FIRST_ITEM",
    e[e.LAST_ITEM = 3] = "LAST_ITEM"
}(Ot || (Ot = {}));
var zt = function(e) {
    function t(i) {
        var n = e.call(this, g(g({}, t.defaultAdapter), i)) || this;
        return n.closeAnimationEndTimerId = 0,
        n.defaultFocusState = Ot.LIST_ROOT,
        n.selectedIndex = -1,
        n
    }
    return f(t, e),
    Object.defineProperty(t, "cssClasses", {
        get: function() {
            return Lt
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "strings", {
        get: function() {
            return Ft
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "numbers", {
        get: function() {
            return Dt
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "defaultAdapter", {
        get: function() {
            return {
                addClassToElementAtIndex: function() {},
                removeClassFromElementAtIndex: function() {},
                addAttributeToElementAtIndex: function() {},
                removeAttributeFromElementAtIndex: function() {},
                getAttributeFromElementAtIndex: function() {
                    return null
                },
                elementContainsClass: function() {
                    return !1
                },
                closeSurface: function() {},
                getElementIndex: function() {
                    return -1
                },
                notifySelected: function() {},
                getMenuItemCount: function() {
                    return 0
                },
                focusItemAtIndex: function() {},
                focusListRoot: function() {},
                getSelectedSiblingOfItemAtIndex: function() {
                    return -1
                },
                isSelectableItemAtIndex: function() {
                    return !1
                }
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.destroy = function() {
        this.closeAnimationEndTimerId && clearTimeout(this.closeAnimationEndTimerId),
        this.adapter.closeSurface()
    }
    ,
    t.prototype.handleKeydown = function(e) {
        var t = e.key
          , i = e.keyCode;
        ("Tab" === t || 9 === i) && this.adapter.closeSurface(!0)
    }
    ,
    t.prototype.handleItemAction = function(e) {
        var t = this
          , i = this.adapter.getElementIndex(e);
        if (!(i < 0)) {
            this.adapter.notifySelected({
                index: i
            });
            var n = "true" === this.adapter.getAttributeFromElementAtIndex(i, Ft.SKIP_RESTORE_FOCUS);
            this.adapter.closeSurface(n),
            this.closeAnimationEndTimerId = setTimeout((function() {
                var i = t.adapter.getElementIndex(e);
                i >= 0 && t.adapter.isSelectableItemAtIndex(i) && t.setSelectedIndex(i)
            }
            ), It.numbers.TRANSITION_CLOSE_DURATION)
        }
    }
    ,
    t.prototype.handleMenuSurfaceOpened = function() {
        switch (this.defaultFocusState) {
        case Ot.FIRST_ITEM:
            this.adapter.focusItemAtIndex(0);
            break;
        case Ot.LAST_ITEM:
            this.adapter.focusItemAtIndex(this.adapter.getMenuItemCount() - 1);
            break;
        case Ot.NONE:
            break;
        default:
            this.adapter.focusListRoot()
        }
    }
    ,
    t.prototype.setDefaultFocusState = function(e) {
        this.defaultFocusState = e
    }
    ,
    t.prototype.getSelectedIndex = function() {
        return this.selectedIndex
    }
    ,
    t.prototype.setSelectedIndex = function(e) {
        if (this.validatedIndex(e),
        !this.adapter.isSelectableItemAtIndex(e))
            throw new Error("MDCMenuFoundation: No selection group at specified index.");
        var t = this.adapter.getSelectedSiblingOfItemAtIndex(e);
        t >= 0 && (this.adapter.removeAttributeFromElementAtIndex(t, Ft.ARIA_CHECKED_ATTR),
        this.adapter.removeClassFromElementAtIndex(t, Lt.MENU_SELECTED_LIST_ITEM)),
        this.adapter.addClassToElementAtIndex(e, Lt.MENU_SELECTED_LIST_ITEM),
        this.adapter.addAttributeToElementAtIndex(e, Ft.ARIA_CHECKED_ATTR, "true"),
        this.selectedIndex = e
    }
    ,
    t.prototype.setEnabled = function(e, t) {
        this.validatedIndex(e),
        t ? (this.adapter.removeClassFromElementAtIndex(e, it),
        this.adapter.addAttributeToElementAtIndex(e, Ft.ARIA_DISABLED_ATTR, "false")) : (this.adapter.addClassToElementAtIndex(e, it),
        this.adapter.addAttributeToElementAtIndex(e, Ft.ARIA_DISABLED_ATTR, "true"))
    }
    ,
    t.prototype.validatedIndex = function(e) {
        var t = this.adapter.getMenuItemCount();
        if (!(e >= 0 && e < t))
            throw new Error("MDCMenuFoundation: No list item at specified index.")
    }
    ,
    t
}(_);
class Mt extends o {
    constructor() {
        super(...arguments),
        this.mdcFoundationClass = zt,
        this.listElement_ = null,
        this.anchor = null,
        this.open = !1,
        this.quick = !1,
        this.wrapFocus = !1,
        this.innerRole = "menu",
        this.innerAriaLabel = null,
        this.corner = "TOP_START",
        this.x = null,
        this.y = null,
        this.absolute = !1,
        this.multi = !1,
        this.activatable = !1,
        this.fixed = !1,
        this.forceGroupSelection = !1,
        this.fullwidth = !1,
        this.menuCorner = "START",
        this.stayOpenOnBodyClick = !1,
        this.defaultFocus = "LIST_ROOT",
        this._listUpdateComplete = null
    }
    get listElement() {
        return this.listElement_ || (this.listElement_ = this.renderRoot.querySelector("mwc-list")),
        this.listElement_
    }
    get items() {
        const e = this.listElement;
        return e ? e.items : []
    }
    get index() {
        const e = this.listElement;
        return e ? e.index : -1
    }
    get selected() {
        const e = this.listElement;
        return e ? e.selected : null
    }
    render() {
        return this.renderSurface()
    }
    renderSurface() {
        const e = this.getSurfaceClasses();
        return h`
      <mwc-menu-surface
        ?hidden=${!this.open}
        .anchor=${this.anchor}
        .open=${this.open}
        .quick=${this.quick}
        .corner=${this.corner}
        .x=${this.x}
        .y=${this.y}
        .absolute=${this.absolute}
        .fixed=${this.fixed}
        .fullwidth=${this.fullwidth}
        .menuCorner=${this.menuCorner}
        ?stayOpenOnBodyClick=${this.stayOpenOnBodyClick}
        class=${m(e)}
        @closed=${this.onClosed}
        @opened=${this.onOpened}
        @keydown=${this.onKeydown}>
      ${this.renderList()}
    </mwc-menu-surface>`
    }
    getSurfaceClasses() {
        return {
            "mdc-menu": !0,
            "mdc-menu-surface": !0
        }
    }
    renderList() {
        const e = "menu" === this.innerRole ? "menuitem" : "option"
          , t = this.renderListClasses();
        return h`
      <mwc-list
          rootTabbable
          .innerAriaLabel=${this.innerAriaLabel}
          .innerRole=${this.innerRole}
          .multi=${this.multi}
          class=${m(t)}
          .itemRoles=${e}
          .wrapFocus=${this.wrapFocus}
          .activatable=${this.activatable}
          @action=${this.onAction}>
        <slot></slot>
      </mwc-list>`
    }
    renderListClasses() {
        return {
            "mdc-deprecated-list": !0
        }
    }
    createAdapter() {
        return {
            addClassToElementAtIndex: (e,t)=>{
                const i = this.listElement;
                if (!i)
                    return;
                const n = i.items[e];
                n && ("mdc-menu-item--selected" === t ? this.forceGroupSelection && !n.selected && i.toggle(e, !0) : n.classList.add(t))
            }
            ,
            removeClassFromElementAtIndex: (e,t)=>{
                const i = this.listElement;
                if (!i)
                    return;
                const n = i.items[e];
                n && ("mdc-menu-item--selected" === t ? n.selected && i.toggle(e, !1) : n.classList.remove(t))
            }
            ,
            addAttributeToElementAtIndex: (e,t,i)=>{
                const n = this.listElement;
                if (!n)
                    return;
                const o = n.items[e];
                o && o.setAttribute(t, i)
            }
            ,
            removeAttributeFromElementAtIndex: (e,t)=>{
                const i = this.listElement;
                if (!i)
                    return;
                const n = i.items[e];
                n && n.removeAttribute(t)
            }
            ,
            getAttributeFromElementAtIndex: (e,t)=>{
                const i = this.listElement;
                if (!i)
                    return null;
                const n = i.items[e];
                return n ? n.getAttribute(t) : null
            }
            ,
            elementContainsClass: (e,t)=>e.classList.contains(t),
            closeSurface: ()=>{
                this.open = !1
            }
            ,
            getElementIndex: e=>{
                const t = this.listElement;
                return t ? t.items.indexOf(e) : -1
            }
            ,
            notifySelected: ()=>{}
            ,
            getMenuItemCount: ()=>{
                const e = this.listElement;
                return e ? e.items.length : 0
            }
            ,
            focusItemAtIndex: e=>{
                const t = this.listElement;
                if (!t)
                    return;
                const i = t.items[e];
                i && i.focus()
            }
            ,
            focusListRoot: ()=>{
                this.listElement && this.listElement.focus()
            }
            ,
            getSelectedSiblingOfItemAtIndex: e=>{
                const t = this.listElement;
                if (!t)
                    return -1;
                const i = t.items[e];
                if (!i || !i.group)
                    return -1;
                for (let n = 0; n < t.items.length; n++) {
                    if (n === e)
                        continue;
                    const o = t.items[n];
                    if (o.selected && o.group === i.group)
                        return n
                }
                return -1
            }
            ,
            isSelectableItemAtIndex: e=>{
                const t = this.listElement;
                if (!t)
                    return !1;
                const i = t.items[e];
                return !!i && i.hasAttribute("group")
            }
        }
    }
    onKeydown(e) {
        this.mdcFoundation && this.mdcFoundation.handleKeydown(e)
    }
    onAction(e) {
        const t = this.listElement;
        if (this.mdcFoundation && t) {
            const i = e.detail.index
              , n = t.items[i];
            n && this.mdcFoundation.handleItemAction(n)
        }
    }
    onOpened() {
        this.open = !0,
        this.mdcFoundation && this.mdcFoundation.handleMenuSurfaceOpened()
    }
    onClosed() {
        this.open = !1
    }
    async getUpdateComplete() {
        await this._listUpdateComplete;
        return await super.getUpdateComplete()
    }
    async firstUpdated() {
        super.firstUpdated();
        const e = this.listElement;
        e && (this._listUpdateComplete = e.updateComplete,
        await this._listUpdateComplete)
    }
    select(e) {
        const t = this.listElement;
        t && t.select(e)
    }
    close() {
        this.open = !1
    }
    show() {
        this.open = !0
    }
    getFocusedItemIndex() {
        const e = this.listElement;
        return e ? e.getFocusedItemIndex() : -1
    }
    focusItemAtIndex(e) {
        const t = this.listElement;
        t && t.focusItemAtIndex(e)
    }
    layout(e=!0) {
        const t = this.listElement;
        t && t.layout(e)
    }
}
i([a(".mdc-menu")], Mt.prototype, "mdcRoot", void 0),
i([a("slot")], Mt.prototype, "slotElement", void 0),
i([n({
    type: Object
})], Mt.prototype, "anchor", void 0),
i([n({
    type: Boolean,
    reflect: !0
})], Mt.prototype, "open", void 0),
i([n({
    type: Boolean
})], Mt.prototype, "quick", void 0),
i([n({
    type: Boolean
})], Mt.prototype, "wrapFocus", void 0),
i([n({
    type: String
})], Mt.prototype, "innerRole", void 0),
i([n({
    type: String
})], Mt.prototype, "innerAriaLabel", void 0),
i([n({
    type: String
})], Mt.prototype, "corner", void 0),
i([n({
    type: Number
})], Mt.prototype, "x", void 0),
i([n({
    type: Number
})], Mt.prototype, "y", void 0),
i([n({
    type: Boolean
})], Mt.prototype, "absolute", void 0),
i([n({
    type: Boolean
})], Mt.prototype, "multi", void 0),
i([n({
    type: Boolean
})], Mt.prototype, "activatable", void 0),
i([n({
    type: Boolean
})], Mt.prototype, "fixed", void 0),
i([n({
    type: Boolean
})], Mt.prototype, "forceGroupSelection", void 0),
i([n({
    type: Boolean
})], Mt.prototype, "fullwidth", void 0),
i([n({
    type: String
})], Mt.prototype, "menuCorner", void 0),
i([n({
    type: Boolean
})], Mt.prototype, "stayOpenOnBodyClick", void 0),
i([n({
    type: String
}), b((function(e) {
    this.mdcFoundation && this.mdcFoundation.setDefaultFocusState(Ot[e])
}
))], Mt.prototype, "defaultFocus", void 0);
const Nt = u`mwc-list ::slotted([mwc-list-item]:not([twoline])),mwc-list ::slotted([noninteractive]:not([twoline])){height:var(--mdc-menu-item-height, 48px)}`;
let Bt = class extends Mt {
}
;
Bt.styles = [Nt],
Bt = i([y("mwc-menu")], Bt);
var Pt = ["input", "button", "textarea", "select"]
  , Ut = function(e) {
    var t = e.target;
    if (t) {
        var i = ("" + t.tagName).toLowerCase();
        -1 === Pt.indexOf(i) && e.preventDefault()
    }
};
function $t(e, t) {
    for (var i = new Map, n = 0; n < e; n++) {
        var o = t(n).trim();
        if (o) {
            var r = o[0].toLowerCase();
            i.has(r) || i.set(r, []),
            i.get(r).push({
                text: o.toLowerCase(),
                index: n
            })
        }
    }
    return i.forEach((function(e) {
        e.sort((function(e, t) {
            return e.index - t.index
        }
        ))
    }
    )),
    i
}
function Ht(e, t) {
    var i, n = e.nextChar, o = e.focusItemAtIndex, r = e.sortedIndexByFirstChar, a = e.focusedItemIndex, d = e.skipFocus, s = e.isItemAtIndexDisabled;
    return clearTimeout(t.bufferClearTimeout),
    t.bufferClearTimeout = setTimeout((function() {
        !function(e) {
            e.typeaheadBuffer = ""
        }(t)
    }
    ), lt.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS),
    t.typeaheadBuffer = t.typeaheadBuffer + n,
    i = 1 === t.typeaheadBuffer.length ? function(e, t, i, n) {
        var o = n.typeaheadBuffer[0]
          , r = e.get(o);
        if (!r)
            return -1;
        if (o === n.currentFirstChar && r[n.sortedIndexCursor].index === t) {
            n.sortedIndexCursor = (n.sortedIndexCursor + 1) % r.length;
            var a = r[n.sortedIndexCursor].index;
            if (!i(a))
                return a
        }
        n.currentFirstChar = o;
        var d, s = -1;
        for (d = 0; d < r.length; d++)
            if (!i(r[d].index)) {
                s = d;
                break
            }
        for (; d < r.length; d++)
            if (r[d].index > t && !i(r[d].index)) {
                s = d;
                break
            }
        if (-1 !== s)
            return n.sortedIndexCursor = s,
            r[n.sortedIndexCursor].index;
        return -1
    }(r, a, s, t) : function(e, t, i) {
        var n = i.typeaheadBuffer[0]
          , o = e.get(n);
        if (!o)
            return -1;
        var r = o[i.sortedIndexCursor];
        if (0 === r.text.lastIndexOf(i.typeaheadBuffer, 0) && !t(r.index))
            return r.index;
        var a = (i.sortedIndexCursor + 1) % o.length
          , d = -1;
        for (; a !== i.sortedIndexCursor; ) {
            var s = o[a]
              , l = 0 === s.text.lastIndexOf(i.typeaheadBuffer, 0)
              , c = !t(s.index);
            if (l && c) {
                d = a;
                break
            }
            a = (a + 1) % o.length
        }
        if (-1 !== d)
            return i.sortedIndexCursor = d,
            o[i.sortedIndexCursor].index;
        return -1
    }(r, s, t),
    -1 === i || d || o(i),
    i
}
function Vt(e) {
    return e.typeaheadBuffer.length > 0
}
var Wt = {
    ACTIVATED: "mdc-select--activated",
    DISABLED: "mdc-select--disabled",
    FOCUSED: "mdc-select--focused",
    INVALID: "mdc-select--invalid",
    MENU_INVALID: "mdc-select__menu--invalid",
    OUTLINED: "mdc-select--outlined",
    REQUIRED: "mdc-select--required",
    ROOT: "mdc-select",
    WITH_LEADING_ICON: "mdc-select--with-leading-icon"
}
  , Gt = {
    ARIA_CONTROLS: "aria-controls",
    ARIA_DESCRIBEDBY: "aria-describedby",
    ARIA_SELECTED_ATTR: "aria-selected",
    CHANGE_EVENT: "MDCSelect:change",
    HIDDEN_INPUT_SELECTOR: 'input[type="hidden"]',
    LABEL_SELECTOR: ".mdc-floating-label",
    LEADING_ICON_SELECTOR: ".mdc-select__icon",
    LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
    MENU_SELECTOR: ".mdc-select__menu",
    OUTLINE_SELECTOR: ".mdc-notched-outline",
    SELECTED_TEXT_SELECTOR: ".mdc-select__selected-text",
    SELECT_ANCHOR_SELECTOR: ".mdc-select__anchor",
    VALUE_ATTR: "data-value"
}
  , Xt = {
    LABEL_SCALE: .75,
    UNSET_INDEX: -1,
    CLICK_DEBOUNCE_TIMEOUT_MS: 330
}
  , qt = function(e) {
    function t(i, n) {
        void 0 === n && (n = {});
        var o = e.call(this, g(g({}, t.defaultAdapter), i)) || this;
        return o.disabled = !1,
        o.isMenuOpen = !1,
        o.useDefaultValidation = !0,
        o.customValidity = !0,
        o.lastSelectedIndex = Xt.UNSET_INDEX,
        o.clickDebounceTimeout = 0,
        o.recentlyClicked = !1,
        o.leadingIcon = n.leadingIcon,
        o.helperText = n.helperText,
        o
    }
    return f(t, e),
    Object.defineProperty(t, "cssClasses", {
        get: function() {
            return Wt
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "numbers", {
        get: function() {
            return Xt
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "strings", {
        get: function() {
            return Gt
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t, "defaultAdapter", {
        get: function() {
            return {
                addClass: function() {},
                removeClass: function() {},
                hasClass: function() {
                    return !1
                },
                activateBottomLine: function() {},
                deactivateBottomLine: function() {},
                getSelectedIndex: function() {
                    return -1
                },
                setSelectedIndex: function() {},
                hasLabel: function() {
                    return !1
                },
                floatLabel: function() {},
                getLabelWidth: function() {
                    return 0
                },
                setLabelRequired: function() {},
                hasOutline: function() {
                    return !1
                },
                notchOutline: function() {},
                closeOutline: function() {},
                setRippleCenter: function() {},
                notifyChange: function() {},
                setSelectedText: function() {},
                isSelectAnchorFocused: function() {
                    return !1
                },
                getSelectAnchorAttr: function() {
                    return ""
                },
                setSelectAnchorAttr: function() {},
                removeSelectAnchorAttr: function() {},
                addMenuClass: function() {},
                removeMenuClass: function() {},
                openMenu: function() {},
                closeMenu: function() {},
                getAnchorElement: function() {
                    return null
                },
                setMenuAnchorElement: function() {},
                setMenuAnchorCorner: function() {},
                setMenuWrapFocus: function() {},
                focusMenuItemAtIndex: function() {},
                getMenuItemCount: function() {
                    return 0
                },
                getMenuItemValues: function() {
                    return []
                },
                getMenuItemTextAtIndex: function() {
                    return ""
                },
                isTypeaheadInProgress: function() {
                    return !1
                },
                typeaheadMatchItem: function() {
                    return -1
                }
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    t.prototype.getSelectedIndex = function() {
        return this.adapter.getSelectedIndex()
    }
    ,
    t.prototype.setSelectedIndex = function(e, t, i) {
        void 0 === t && (t = !1),
        void 0 === i && (i = !1),
        e >= this.adapter.getMenuItemCount() || (e === Xt.UNSET_INDEX ? this.adapter.setSelectedText("") : this.adapter.setSelectedText(this.adapter.getMenuItemTextAtIndex(e).trim()),
        this.adapter.setSelectedIndex(e),
        t && this.adapter.closeMenu(),
        i || this.lastSelectedIndex === e || this.handleChange(),
        this.lastSelectedIndex = e)
    }
    ,
    t.prototype.setValue = function(e, t) {
        void 0 === t && (t = !1);
        var i = this.adapter.getMenuItemValues().indexOf(e);
        this.setSelectedIndex(i, !1, t)
    }
    ,
    t.prototype.getValue = function() {
        var e = this.adapter.getSelectedIndex()
          , t = this.adapter.getMenuItemValues();
        return e !== Xt.UNSET_INDEX ? t[e] : ""
    }
    ,
    t.prototype.getDisabled = function() {
        return this.disabled
    }
    ,
    t.prototype.setDisabled = function(e) {
        this.disabled = e,
        this.disabled ? (this.adapter.addClass(Wt.DISABLED),
        this.adapter.closeMenu()) : this.adapter.removeClass(Wt.DISABLED),
        this.leadingIcon && this.leadingIcon.setDisabled(this.disabled),
        this.disabled ? this.adapter.removeSelectAnchorAttr("tabindex") : this.adapter.setSelectAnchorAttr("tabindex", "0"),
        this.adapter.setSelectAnchorAttr("aria-disabled", this.disabled.toString())
    }
    ,
    t.prototype.openMenu = function() {
        this.adapter.addClass(Wt.ACTIVATED),
        this.adapter.openMenu(),
        this.isMenuOpen = !0,
        this.adapter.setSelectAnchorAttr("aria-expanded", "true")
    }
    ,
    t.prototype.setHelperTextContent = function(e) {
        this.helperText && this.helperText.setContent(e)
    }
    ,
    t.prototype.layout = function() {
        if (this.adapter.hasLabel()) {
            var e = this.getValue().length > 0
              , t = this.adapter.hasClass(Wt.FOCUSED)
              , i = e || t
              , n = this.adapter.hasClass(Wt.REQUIRED);
            this.notchOutline(i),
            this.adapter.floatLabel(i),
            this.adapter.setLabelRequired(n)
        }
    }
    ,
    t.prototype.layoutOptions = function() {
        var e = this.adapter.getMenuItemValues().indexOf(this.getValue());
        this.setSelectedIndex(e, !1, !0)
    }
    ,
    t.prototype.handleMenuOpened = function() {
        if (0 !== this.adapter.getMenuItemValues().length) {
            var e = this.getSelectedIndex()
              , t = e >= 0 ? e : 0;
            this.adapter.focusMenuItemAtIndex(t)
        }
    }
    ,
    t.prototype.handleMenuClosing = function() {
        this.adapter.setSelectAnchorAttr("aria-expanded", "false")
    }
    ,
    t.prototype.handleMenuClosed = function() {
        this.adapter.removeClass(Wt.ACTIVATED),
        this.isMenuOpen = !1,
        this.adapter.isSelectAnchorFocused() || this.blur()
    }
    ,
    t.prototype.handleChange = function() {
        this.layout(),
        this.adapter.notifyChange(this.getValue()),
        this.adapter.hasClass(Wt.REQUIRED) && this.useDefaultValidation && this.setValid(this.isValid())
    }
    ,
    t.prototype.handleMenuItemAction = function(e) {
        this.setSelectedIndex(e, !0)
    }
    ,
    t.prototype.handleFocus = function() {
        this.adapter.addClass(Wt.FOCUSED),
        this.layout(),
        this.adapter.activateBottomLine()
    }
    ,
    t.prototype.handleBlur = function() {
        this.isMenuOpen || this.blur()
    }
    ,
    t.prototype.handleClick = function(e) {
        this.disabled || this.recentlyClicked || (this.setClickDebounceTimeout(),
        this.isMenuOpen ? this.adapter.closeMenu() : (this.adapter.setRippleCenter(e),
        this.openMenu()))
    }
    ,
    t.prototype.handleKeydown = function(e) {
        if (!this.isMenuOpen && this.adapter.hasClass(Wt.FOCUSED)) {
            var t = Je(e) === Fe.ENTER
              , i = Je(e) === Fe.SPACEBAR
              , n = Je(e) === Fe.ARROW_UP
              , o = Je(e) === Fe.ARROW_DOWN;
            if (!(e.ctrlKey || e.metaKey) && (!i && e.key && 1 === e.key.length || i && this.adapter.isTypeaheadInProgress())) {
                var r = i ? " " : e.key
                  , a = this.adapter.typeaheadMatchItem(r, this.getSelectedIndex());
                return a >= 0 && this.setSelectedIndex(a),
                void e.preventDefault()
            }
            (t || i || n || o) && (this.openMenu(),
            e.preventDefault())
        }
    }
    ,
    t.prototype.notchOutline = function(e) {
        if (this.adapter.hasOutline()) {
            var t = this.adapter.hasClass(Wt.FOCUSED);
            if (e) {
                var i = Xt.LABEL_SCALE
                  , n = this.adapter.getLabelWidth() * i;
                this.adapter.notchOutline(n)
            } else
                t || this.adapter.closeOutline()
        }
    }
    ,
    t.prototype.setLeadingIconAriaLabel = function(e) {
        this.leadingIcon && this.leadingIcon.setAriaLabel(e)
    }
    ,
    t.prototype.setLeadingIconContent = function(e) {
        this.leadingIcon && this.leadingIcon.setContent(e)
    }
    ,
    t.prototype.getUseDefaultValidation = function() {
        return this.useDefaultValidation
    }
    ,
    t.prototype.setUseDefaultValidation = function(e) {
        this.useDefaultValidation = e
    }
    ,
    t.prototype.setValid = function(e) {
        this.useDefaultValidation || (this.customValidity = e),
        this.adapter.setSelectAnchorAttr("aria-invalid", (!e).toString()),
        e ? (this.adapter.removeClass(Wt.INVALID),
        this.adapter.removeMenuClass(Wt.MENU_INVALID)) : (this.adapter.addClass(Wt.INVALID),
        this.adapter.addMenuClass(Wt.MENU_INVALID)),
        this.syncHelperTextValidity(e)
    }
    ,
    t.prototype.isValid = function() {
        return this.useDefaultValidation && this.adapter.hasClass(Wt.REQUIRED) && !this.adapter.hasClass(Wt.DISABLED) ? this.getSelectedIndex() !== Xt.UNSET_INDEX && (0 !== this.getSelectedIndex() || Boolean(this.getValue())) : this.customValidity
    }
    ,
    t.prototype.setRequired = function(e) {
        e ? this.adapter.addClass(Wt.REQUIRED) : this.adapter.removeClass(Wt.REQUIRED),
        this.adapter.setSelectAnchorAttr("aria-required", e.toString()),
        this.adapter.setLabelRequired(e)
    }
    ,
    t.prototype.getRequired = function() {
        return "true" === this.adapter.getSelectAnchorAttr("aria-required")
    }
    ,
    t.prototype.init = function() {
        var e = this.adapter.getAnchorElement();
        e && (this.adapter.setMenuAnchorElement(e),
        this.adapter.setMenuAnchorCorner(vt.BOTTOM_START)),
        this.adapter.setMenuWrapFocus(!1),
        this.setDisabled(this.adapter.hasClass(Wt.DISABLED)),
        this.syncHelperTextValidity(!this.adapter.hasClass(Wt.INVALID)),
        this.layout(),
        this.layoutOptions()
    }
    ,
    t.prototype.blur = function() {
        this.adapter.removeClass(Wt.FOCUSED),
        this.layout(),
        this.adapter.deactivateBottomLine(),
        this.adapter.hasClass(Wt.REQUIRED) && this.useDefaultValidation && this.setValid(this.isValid())
    }
    ,
    t.prototype.syncHelperTextValidity = function(e) {
        if (this.helperText) {
            this.helperText.setValidity(e);
            var t = this.helperText.isVisible()
              , i = this.helperText.getId();
            t && i ? this.adapter.setSelectAnchorAttr(Gt.ARIA_DESCRIBEDBY, i) : this.adapter.removeSelectAnchorAttr(Gt.ARIA_DESCRIBEDBY)
        }
    }
    ,
    t.prototype.setClickDebounceTimeout = function() {
        var e = this;
        clearTimeout(this.clickDebounceTimeout),
        this.clickDebounceTimeout = setTimeout((function() {
            e.recentlyClicked = !1
        }
        ), Xt.CLICK_DEBOUNCE_TIMEOUT_MS),
        this.recentlyClicked = !0
    }
    ,
    t
}(_);
const Zt = (e={})=>{
    const t = {};
    for (const i in e)
        t[i] = e[i];
    return Object.assign({
        badInput: !1,
        customError: !1,
        patternMismatch: !1,
        rangeOverflow: !1,
        rangeUnderflow: !1,
        stepMismatch: !1,
        tooLong: !1,
        tooShort: !1,
        typeMismatch: !1,
        valid: !0,
        valueMissing: !1
    }, t)
}
;
class Yt extends B {
    constructor() {
        super(...arguments),
        this.mdcFoundationClass = qt,
        this.disabled = !1,
        this.outlined = !1,
        this.label = "",
        this.outlineOpen = !1,
        this.outlineWidth = 0,
        this.value = "",
        this.name = "",
        this.selectedText = "",
        this.icon = "",
        this.menuOpen = !1,
        this.helper = "",
        this.validateOnInitialRender = !1,
        this.validationMessage = "",
        this.required = !1,
        this.naturalMenuWidth = !1,
        this.isUiValid = !0,
        this.fixedMenuPosition = !1,
        this.typeaheadState = {
            bufferClearTimeout: 0,
            currentFirstChar: "",
            sortedIndexCursor: 0,
            typeaheadBuffer: ""
        },
        this.sortedIndexByFirstChar = new Map,
        this.menuElement_ = null,
        this.listeners = [],
        this.onBodyClickBound = ()=>{}
        ,
        this._menuUpdateComplete = null,
        this.valueSetDirectly = !1,
        this.validityTransform = null,
        this._validity = Zt()
    }
    get items() {
        return this.menuElement_ || (this.menuElement_ = this.menuElement),
        this.menuElement_ ? this.menuElement_.items : []
    }
    get selected() {
        const e = this.menuElement;
        return e ? e.selected : null
    }
    get index() {
        const e = this.menuElement;
        return e ? e.index : -1
    }
    get shouldRenderHelperText() {
        return !!this.helper || !!this.validationMessage
    }
    get validity() {
        return this._checkValidity(this.value),
        this._validity
    }
    render() {
        const e = {
            "mdc-select--disabled": this.disabled,
            "mdc-select--no-label": !this.label,
            "mdc-select--filled": !this.outlined,
            "mdc-select--outlined": this.outlined,
            "mdc-select--with-leading-icon": !!this.icon,
            "mdc-select--required": this.required,
            "mdc-select--invalid": !this.isUiValid
        }
          , t = this.label ? "label" : void 0
          , i = this.shouldRenderHelperText ? "helper-text" : void 0;
        return h`
      <div
          class="mdc-select ${m(e)}">
        <input
            class="formElement"
            name="${this.name}"
            .value="${this.value}"
            hidden
            ?disabled="${this.disabled}"
            ?required=${this.required}>
        <!-- @ts-ignore -->
        <div class="mdc-select__anchor"
            aria-autocomplete="none"
            role="combobox"
            aria-expanded=${this.menuOpen}
            aria-invalid=${!this.isUiValid}
            aria-haspopup="listbox"
            aria-labelledby=${p(t)}
            aria-required=${this.required}
            aria-describedby=${p(i)}
            @click=${this.onClick}
            @focus=${this.onFocus}
            @blur=${this.onBlur}
            @keydown=${this.onKeydown}>
          ${this.renderRipple()}
          ${this.outlined ? this.renderOutline() : this.renderLabel()}
          ${this.renderLeadingIcon()}
          <span class="mdc-select__selected-text-container">
            <span class="mdc-select__selected-text">${this.selectedText}</span>
          </span>
          <span class="mdc-select__dropdown-icon">
            <svg
                class="mdc-select__dropdown-icon-graphic"
                viewBox="7 10 10 5"
                focusable="false">
              <polygon
                  class="mdc-select__dropdown-icon-inactive"
                  stroke="none"
                  fill-rule="evenodd"
                  points="7 10 12 15 17 10">
              </polygon>
              <polygon
                  class="mdc-select__dropdown-icon-active"
                  stroke="none"
                  fill-rule="evenodd"
                  points="7 15 12 10 17 15">
              </polygon>
            </svg>
          </span>
          ${this.renderLineRipple()}
        </div>
        ${this.renderMenu()}
      </div>
      ${this.renderHelperText()}`
    }
    renderMenu() {
        const e = this.getMenuClasses();
        return h`
      <mwc-menu
        innerRole="listbox"
        wrapFocus
        class=" ${m(e)}"
        activatable
        .fullwidth=${!this.fixedMenuPosition && !this.naturalMenuWidth}
        .open=${this.menuOpen}
        .anchor=${this.anchorElement}
        .fixed=${this.fixedMenuPosition}
        @selected=${this.onSelected}
        @opened=${this.onOpened}
        @closed=${this.onClosed}
        @items-updated=${this.onItemsUpdated}
        @keydown=${this.handleTypeahead}>
      ${this.renderMenuContent()}
    </mwc-menu>`
    }
    getMenuClasses() {
        return {
            "mdc-select__menu": !0,
            "mdc-menu": !0,
            "mdc-menu-surface": !0,
            "mdc-select__menu--invalid": !this.isUiValid
        }
    }
    renderMenuContent() {
        return h`<slot></slot>`
    }
    renderRipple() {
        return this.outlined ? A : h`
      <span class="mdc-select__ripple"></span>
    `
    }
    renderOutline() {
        return this.outlined ? h`
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${this.renderLabel()}
      </mwc-notched-outline>` : A
    }
    renderLabel() {
        return this.label ? h`
      <span
          .floatingLabelFoundation=${ce(this.label)}
          id="label">${this.label}</span>
    ` : A
    }
    renderLeadingIcon() {
        return this.icon ? h`<mwc-icon class="mdc-select__icon"><div>${this.icon}</div></mwc-icon>` : A
    }
    renderLineRipple() {
        return this.outlined ? A : h`
      <span .lineRippleFoundation=${pe()}></span>
    `
    }
    renderHelperText() {
        if (!this.shouldRenderHelperText)
            return A;
        const e = this.validationMessage && !this.isUiValid;
        return h`
        <p
          class="mdc-select-helper-text ${m({
            "mdc-select-helper-text--validation-msg": e
        })}"
          id="helper-text">${e ? this.validationMessage : this.helper}</p>`
    }
    createAdapter() {
        return Object.assign(Object.assign({}, S(this.mdcRoot)), {
            activateBottomLine: ()=>{
                this.lineRippleElement && this.lineRippleElement.lineRippleFoundation.activate()
            }
            ,
            deactivateBottomLine: ()=>{
                this.lineRippleElement && this.lineRippleElement.lineRippleFoundation.deactivate()
            }
            ,
            hasLabel: ()=>!!this.label,
            floatLabel: e=>{
                this.labelElement && this.labelElement.floatingLabelFoundation.float(e)
            }
            ,
            getLabelWidth: ()=>this.labelElement ? this.labelElement.floatingLabelFoundation.getWidth() : 0,
            setLabelRequired: e=>{
                this.labelElement && this.labelElement.floatingLabelFoundation.setRequired(e)
            }
            ,
            hasOutline: ()=>this.outlined,
            notchOutline: e=>{
                this.outlineElement && !this.outlineOpen && (this.outlineWidth = e,
                this.outlineOpen = !0)
            }
            ,
            closeOutline: ()=>{
                this.outlineElement && (this.outlineOpen = !1)
            }
            ,
            setRippleCenter: e=>{
                if (this.lineRippleElement) {
                    this.lineRippleElement.lineRippleFoundation.setRippleCenter(e)
                }
            }
            ,
            notifyChange: async e=>{
                if (!this.valueSetDirectly && e === this.value)
                    return;
                this.valueSetDirectly = !1,
                this.value = e,
                await this.updateComplete;
                const t = new Event("change",{
                    bubbles: !0
                });
                this.dispatchEvent(t)
            }
            ,
            setSelectedText: e=>this.selectedText = e,
            isSelectAnchorFocused: ()=>{
                const e = this.anchorElement;
                if (!e)
                    return !1;
                return e.getRootNode().activeElement === e
            }
            ,
            getSelectAnchorAttr: e=>{
                const t = this.anchorElement;
                return t ? t.getAttribute(e) : null
            }
            ,
            setSelectAnchorAttr: (e,t)=>{
                const i = this.anchorElement;
                i && i.setAttribute(e, t)
            }
            ,
            removeSelectAnchorAttr: e=>{
                const t = this.anchorElement;
                t && t.removeAttribute(e)
            }
            ,
            openMenu: ()=>{
                this.menuOpen = !0
            }
            ,
            closeMenu: ()=>{
                this.menuOpen = !1
            }
            ,
            addMenuClass: ()=>{}
            ,
            removeMenuClass: ()=>{}
            ,
            getAnchorElement: ()=>this.anchorElement,
            setMenuAnchorElement: ()=>{}
            ,
            setMenuAnchorCorner: ()=>{
                const e = this.menuElement;
                e && (e.corner = "BOTTOM_START")
            }
            ,
            setMenuWrapFocus: e=>{
                const t = this.menuElement;
                t && (t.wrapFocus = e)
            }
            ,
            focusMenuItemAtIndex: e=>{
                const t = this.menuElement;
                if (!t)
                    return;
                const i = t.items[e];
                i && i.focus()
            }
            ,
            getMenuItemCount: ()=>{
                const e = this.menuElement;
                return e ? e.items.length : 0
            }
            ,
            getMenuItemValues: ()=>{
                const e = this.menuElement;
                if (!e)
                    return [];
                return e.items.map((e=>e.value))
            }
            ,
            getMenuItemTextAtIndex: e=>{
                const t = this.menuElement;
                if (!t)
                    return "";
                const i = t.items[e];
                return i ? i.text : ""
            }
            ,
            getSelectedIndex: ()=>this.index,
            setSelectedIndex: ()=>{}
            ,
            isTypeaheadInProgress: ()=>Vt(this.typeaheadState),
            typeaheadMatchItem: (e,t)=>{
                if (!this.menuElement)
                    return -1;
                const i = {
                    focusItemAtIndex: e=>{
                        this.menuElement.focusItemAtIndex(e)
                    }
                    ,
                    focusedItemIndex: t || this.menuElement.getFocusedItemIndex(),
                    nextChar: e,
                    sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                    skipFocus: !1,
                    isItemAtIndexDisabled: e=>this.items[e].disabled
                }
                  , n = Ht(i, this.typeaheadState);
                return -1 !== n && this.select(n),
                n
            }
        })
    }
    checkValidity() {
        const e = this._checkValidity(this.value);
        if (!e) {
            const e = new Event("invalid",{
                bubbles: !1,
                cancelable: !0
            });
            this.dispatchEvent(e)
        }
        return e
    }
    reportValidity() {
        const e = this.checkValidity();
        return this.isUiValid = e,
        e
    }
    _checkValidity(e) {
        const t = this.formElement.validity;
        let i = Zt(t);
        if (this.validityTransform) {
            const t = this.validityTransform(e, i);
            i = Object.assign(Object.assign({}, i), t)
        }
        return this._validity = i,
        this._validity.valid
    }
    setCustomValidity(e) {
        this.validationMessage = e,
        this.formElement.setCustomValidity(e)
    }
    async getUpdateComplete() {
        await this._menuUpdateComplete;
        return await super.getUpdateComplete()
    }
    async firstUpdated() {
        const e = this.menuElement;
        if (e && (this._menuUpdateComplete = e.updateComplete,
        await this._menuUpdateComplete),
        super.firstUpdated(),
        this.mdcFoundation.isValid = ()=>!0,
        this.mdcFoundation.setValid = ()=>{}
        ,
        this.mdcFoundation.setDisabled(this.disabled),
        this.validateOnInitialRender && this.reportValidity(),
        !this.selected) {
            !this.items.length && this.slotElement && this.slotElement.assignedNodes({
                flatten: !0
            }).length && (await new Promise((e=>requestAnimationFrame(e))),
            await this.layout());
            const e = this.items.length && "" === this.items[0].value;
            if (!this.value && e)
                return void this.select(0);
            this.selectByValue(this.value)
        }
        this.sortedIndexByFirstChar = $t(this.items.length, (e=>this.items[e].text))
    }
    onItemsUpdated() {
        this.sortedIndexByFirstChar = $t(this.items.length, (e=>this.items[e].text))
    }
    select(e) {
        const t = this.menuElement;
        t && t.select(e)
    }
    selectByValue(e) {
        let t = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].value === e) {
                t = i;
                break
            }
        }
        this.valueSetDirectly = !0,
        this.select(t),
        this.mdcFoundation.handleChange()
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        for (const e of this.listeners)
            e.target.removeEventListener(e.name, e.cb)
    }
    focus() {
        const e = new CustomEvent("focus")
          , t = this.anchorElement;
        t && (t.dispatchEvent(e),
        t.focus())
    }
    blur() {
        const e = new CustomEvent("blur")
          , t = this.anchorElement;
        t && (t.dispatchEvent(e),
        t.blur())
    }
    onFocus() {
        this.mdcFoundation && this.mdcFoundation.handleFocus()
    }
    onBlur() {
        this.mdcFoundation && this.mdcFoundation.handleBlur();
        const e = this.menuElement;
        e && !e.open && this.reportValidity()
    }
    onClick(e) {
        if (this.mdcFoundation) {
            this.focus();
            const t = e.target.getBoundingClientRect();
            let i = 0;
            i = "touches"in e ? e.touches[0].clientX : e.clientX;
            const n = i - t.left;
            this.mdcFoundation.handleClick(n)
        }
    }
    onKeydown(e) {
        const t = Je(e) === Fe.ARROW_UP
          , i = Je(e) === Fe.ARROW_DOWN;
        if (i || t) {
            const n = t && this.index > 0
              , o = i && this.index < this.items.length - 1;
            return n ? this.select(this.index - 1) : o && this.select(this.index + 1),
            e.preventDefault(),
            void this.mdcFoundation.openMenu()
        }
        this.mdcFoundation.handleKeydown(e)
    }
    handleTypeahead(e) {
        if (!this.menuElement)
            return;
        const t = this.menuElement.getFocusedItemIndex()
          , i = R(e.target) ? e.target : null;
        !function(e, t) {
            var i = e.event
              , n = e.isTargetListItem
              , o = e.focusedItemIndex
              , r = e.focusItemAtIndex
              , a = e.sortedIndexByFirstChar
              , d = e.isItemAtIndexDisabled
              , s = "ArrowLeft" === Je(i)
              , l = "ArrowUp" === Je(i)
              , c = "ArrowRight" === Je(i)
              , h = "ArrowDown" === Je(i)
              , m = "Home" === Je(i)
              , p = "End" === Je(i)
              , u = "Enter" === Je(i)
              , f = "Spacebar" === Je(i);
            i.altKey || i.ctrlKey || i.metaKey || s || l || c || h || m || p || u || (f || 1 !== i.key.length ? f && (n && Ut(i),
            n && Vt(t) && Ht({
                focusItemAtIndex: r,
                focusedItemIndex: o,
                nextChar: " ",
                sortedIndexByFirstChar: a,
                skipFocus: !1,
                isItemAtIndexDisabled: d
            }, t)) : (Ut(i),
            Ht({
                focusItemAtIndex: r,
                focusedItemIndex: o,
                nextChar: i.key.toLowerCase(),
                sortedIndexByFirstChar: a,
                skipFocus: !1,
                isItemAtIndexDisabled: d
            }, t)))
        }({
            event: e,
            focusItemAtIndex: e=>{
                this.menuElement.focusItemAtIndex(e)
            }
            ,
            focusedItemIndex: t,
            isTargetListItem: !!i && i.hasAttribute("mwc-list-item"),
            sortedIndexByFirstChar: this.sortedIndexByFirstChar,
            isItemAtIndexDisabled: e=>this.items[e].disabled
        }, this.typeaheadState)
    }
    async onSelected(e) {
        this.mdcFoundation || await this.updateComplete,
        this.mdcFoundation.handleMenuItemAction(e.detail.index);
        const t = this.items[e.detail.index];
        t && (this.value = t.value)
    }
    onOpened() {
        this.mdcFoundation && (this.menuOpen = !0,
        this.mdcFoundation.handleMenuOpened())
    }
    onClosed() {
        this.mdcFoundation && (this.menuOpen = !1,
        this.mdcFoundation.handleMenuClosed())
    }
    setFormData(e) {
        this.name && null !== this.selected && e.append(this.name, this.value)
    }
    async layout(e=!0) {
        this.mdcFoundation && this.mdcFoundation.layout(),
        await this.updateComplete;
        const t = this.menuElement;
        t && t.layout(e);
        const i = this.labelElement;
        if (!i)
            return void (this.outlineOpen = !1);
        const n = !!this.label && !!this.value;
        if (i.floatingLabelFoundation.float(n),
        !this.outlined)
            return;
        this.outlineOpen = n,
        await this.updateComplete;
        const o = i.floatingLabelFoundation.getWidth();
        this.outlineOpen && (this.outlineWidth = o)
    }
    async layoutOptions() {
        this.mdcFoundation && this.mdcFoundation.layoutOptions()
    }
}
i([a(".mdc-select")], Yt.prototype, "mdcRoot", void 0),
i([a(".formElement")], Yt.prototype, "formElement", void 0),
i([a("slot")], Yt.prototype, "slotElement", void 0),
i([a("select")], Yt.prototype, "nativeSelectElement", void 0),
i([a("input")], Yt.prototype, "nativeInputElement", void 0),
i([a(".mdc-line-ripple")], Yt.prototype, "lineRippleElement", void 0),
i([a(".mdc-floating-label")], Yt.prototype, "labelElement", void 0),
i([a("mwc-notched-outline")], Yt.prototype, "outlineElement", void 0),
i([a(".mdc-menu")], Yt.prototype, "menuElement", void 0),
i([a(".mdc-select__anchor")], Yt.prototype, "anchorElement", void 0),
i([n({
    type: Boolean,
    attribute: "disabled",
    reflect: !0
}), b((function(e) {
    this.mdcFoundation && this.mdcFoundation.setDisabled(e)
}
))], Yt.prototype, "disabled", void 0),
i([n({
    type: Boolean
}), b((function(e, t) {
    void 0 !== t && this.outlined !== t && this.layout(!1)
}
))], Yt.prototype, "outlined", void 0),
i([n({
    type: String
}), b((function(e, t) {
    void 0 !== t && this.label !== t && this.layout(!1)
}
))], Yt.prototype, "label", void 0),
i([r()], Yt.prototype, "outlineOpen", void 0),
i([r()], Yt.prototype, "outlineWidth", void 0),
i([n({
    type: String
}), b((function(e) {
    if (this.mdcFoundation) {
        const t = null === this.selected && !!e
          , i = this.selected && this.selected.value !== e;
        (t || i) && this.selectByValue(e),
        this.reportValidity()
    }
}
))], Yt.prototype, "value", void 0),
i([n()], Yt.prototype, "name", void 0),
i([r()], Yt.prototype, "selectedText", void 0),
i([n({
    type: String
})], Yt.prototype, "icon", void 0),
i([r()], Yt.prototype, "menuOpen", void 0),
i([n({
    type: String
})], Yt.prototype, "helper", void 0),
i([n({
    type: Boolean
})], Yt.prototype, "validateOnInitialRender", void 0),
i([n({
    type: String
})], Yt.prototype, "validationMessage", void 0),
i([n({
    type: Boolean
})], Yt.prototype, "required", void 0),
i([n({
    type: Boolean
})], Yt.prototype, "naturalMenuWidth", void 0),
i([r()], Yt.prototype, "isUiValid", void 0),
i([n({
    type: Boolean
})], Yt.prototype, "fixedMenuPosition", void 0),
i([l({
    capture: !0
})], Yt.prototype, "handleTypeahead", null);
const jt = u`.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform;transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required::after,.mdc-floating-label--required[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-select{display:inline-flex;position:relative}.mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text{color:rgba(0, 0, 0, 0.87)}.mdc-select.mdc-select--disabled .mdc-select__selected-text{color:rgba(0, 0, 0, 0.38)}.mdc-select:not(.mdc-select--disabled) .mdc-floating-label{color:rgba(0, 0, 0, 0.6)}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label{color:rgba(98, 0, 238, 0.87)}.mdc-select.mdc-select--disabled .mdc-floating-label{color:rgba(0, 0, 0, 0.38)}.mdc-select:not(.mdc-select--disabled) .mdc-select__dropdown-icon{fill:rgba(0, 0, 0, 0.54)}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-select__dropdown-icon{fill:#6200ee;fill:var(--mdc-theme-primary, #6200ee)}.mdc-select.mdc-select--disabled .mdc-select__dropdown-icon{fill:rgba(0, 0, 0, 0.38)}.mdc-select:not(.mdc-select--disabled)+.mdc-select-helper-text{color:rgba(0, 0, 0, 0.6)}.mdc-select.mdc-select--disabled+.mdc-select-helper-text{color:rgba(0, 0, 0, 0.38)}.mdc-select:not(.mdc-select--disabled) .mdc-select__icon{color:rgba(0, 0, 0, 0.54)}.mdc-select.mdc-select--disabled .mdc-select__icon{color:rgba(0, 0, 0, 0.38)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-select.mdc-select--disabled .mdc-select__selected-text{color:GrayText}.mdc-select.mdc-select--disabled .mdc-select__dropdown-icon{fill:red}.mdc-select.mdc-select--disabled .mdc-floating-label{color:GrayText}.mdc-select.mdc-select--disabled .mdc-line-ripple::before{border-bottom-color:GrayText}.mdc-select.mdc-select--disabled .mdc-notched-outline__leading,.mdc-select.mdc-select--disabled .mdc-notched-outline__notch,.mdc-select.mdc-select--disabled .mdc-notched-outline__trailing{border-color:GrayText}.mdc-select.mdc-select--disabled .mdc-select__icon{color:GrayText}.mdc-select.mdc-select--disabled+.mdc-select-helper-text{color:GrayText}}.mdc-select .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-select .mdc-select__anchor{padding-left:16px;padding-right:0}[dir=rtl] .mdc-select .mdc-select__anchor,.mdc-select .mdc-select__anchor[dir=rtl]{padding-left:0;padding-right:16px}.mdc-select.mdc-select--with-leading-icon .mdc-select__anchor{padding-left:0;padding-right:0}[dir=rtl] .mdc-select.mdc-select--with-leading-icon .mdc-select__anchor,.mdc-select.mdc-select--with-leading-icon .mdc-select__anchor[dir=rtl]{padding-left:0;padding-right:0}.mdc-select .mdc-select__icon{width:24px;height:24px;font-size:24px}.mdc-select .mdc-select__dropdown-icon{width:24px;height:24px}.mdc-select .mdc-select__menu .mdc-deprecated-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-select .mdc-select__menu .mdc-deprecated-list-item,.mdc-select .mdc-select__menu .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-select .mdc-select__menu .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:12px}[dir=rtl] .mdc-select .mdc-select__menu .mdc-deprecated-list-item__graphic,.mdc-select .mdc-select__menu .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:12px;margin-right:0}.mdc-select__dropdown-icon{margin-left:12px;margin-right:12px;display:inline-flex;position:relative;align-self:center;align-items:center;justify-content:center;flex-shrink:0;pointer-events:none}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-active,.mdc-select__dropdown-icon .mdc-select__dropdown-icon-inactive{position:absolute;top:0;left:0}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-graphic{width:41.6666666667%;height:20.8333333333%}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-inactive{opacity:1;transition:opacity 75ms linear 75ms}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-active{opacity:0;transition:opacity 75ms linear}[dir=rtl] .mdc-select__dropdown-icon,.mdc-select__dropdown-icon[dir=rtl]{margin-left:12px;margin-right:12px}.mdc-select--activated .mdc-select__dropdown-icon .mdc-select__dropdown-icon-inactive{opacity:0;transition:opacity 49.5ms linear}.mdc-select--activated .mdc-select__dropdown-icon .mdc-select__dropdown-icon-active{opacity:1;transition:opacity 100.5ms linear 49.5ms}.mdc-select__anchor{width:200px;min-width:0;flex:1 1 auto;position:relative;box-sizing:border-box;overflow:hidden;outline:none;cursor:pointer}.mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-select__selected-text-container{display:flex;appearance:none;pointer-events:none;box-sizing:border-box;width:auto;min-width:0;flex-grow:1;height:28px;border:none;outline:none;padding:0;background-color:transparent;color:inherit}.mdc-select__selected-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;width:100%;text-align:left}[dir=rtl] .mdc-select__selected-text,.mdc-select__selected-text[dir=rtl]{text-align:right}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--invalid+.mdc-select-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-select__dropdown-icon{fill:#b00020;fill:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-select__dropdown-icon{fill:#b00020;fill:var(--mdc-theme-error, #b00020)}.mdc-select--disabled{cursor:default;pointer-events:none}.mdc-select--with-leading-icon .mdc-select__menu .mdc-deprecated-list-item{padding-left:12px;padding-right:12px}[dir=rtl] .mdc-select--with-leading-icon .mdc-select__menu .mdc-deprecated-list-item,.mdc-select--with-leading-icon .mdc-select__menu .mdc-deprecated-list-item[dir=rtl]{padding-left:12px;padding-right:12px}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-select__menu::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:"";pointer-events:none}}@media screen and (forced-colors: active)and (forced-colors: active),screen and (-ms-high-contrast: active)and (forced-colors: active){.mdc-select__menu::before{border-color:CanvasText}}.mdc-select__menu .mdc-deprecated-list .mdc-select__icon,.mdc-select__menu .mdc-list .mdc-select__icon{margin-left:0;margin-right:0}[dir=rtl] .mdc-select__menu .mdc-deprecated-list .mdc-select__icon,[dir=rtl] .mdc-select__menu .mdc-list .mdc-select__icon,.mdc-select__menu .mdc-deprecated-list .mdc-select__icon[dir=rtl],.mdc-select__menu .mdc-list .mdc-select__icon[dir=rtl]{margin-left:0;margin-right:0}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--activated,.mdc-select__menu .mdc-list .mdc-deprecated-list-item--selected,.mdc-select__menu .mdc-list .mdc-deprecated-list-item--activated{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-deprecated-list-item__graphic,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--activated .mdc-deprecated-list-item__graphic,.mdc-select__menu .mdc-list .mdc-deprecated-list-item--selected .mdc-deprecated-list-item__graphic,.mdc-select__menu .mdc-list .mdc-deprecated-list-item--activated .mdc-deprecated-list-item__graphic{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-select__menu .mdc-list-item__start{display:inline-flex;align-items:center}.mdc-select__option{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-select__option,.mdc-select__option[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-select__one-line-option.mdc-list-item--with-one-line{height:48px}.mdc-select__two-line-option.mdc-list-item--with-two-lines{height:64px}.mdc-select__two-line-option.mdc-list-item--with-two-lines .mdc-list-item__start{margin-top:20px}.mdc-select__two-line-option.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-select__two-line-option.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-select__two-line-option.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-select__two-line-option.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-select__two-line-option.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:36px;content:"";vertical-align:0}.mdc-select__option-with-leading-content{padding-left:0;padding-right:12px}.mdc-select__option-with-leading-content.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-select__option-with-leading-content.mdc-list-item,.mdc-select__option-with-leading-content.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-select__option-with-leading-content .mdc-list-item__start{margin-left:12px;margin-right:0}[dir=rtl] .mdc-select__option-with-leading-content .mdc-list-item__start,.mdc-select__option-with-leading-content .mdc-list-item__start[dir=rtl]{margin-left:0;margin-right:12px}.mdc-select__option-with-leading-content .mdc-list-item__start{width:36px;height:24px}[dir=rtl] .mdc-select__option-with-leading-content,.mdc-select__option-with-leading-content[dir=rtl]{padding-left:12px;padding-right:0}.mdc-select__option-with-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-select__option-with-meta.mdc-list-item,.mdc-select__option-with-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-select__option-with-meta .mdc-list-item__end{margin-left:12px;margin-right:12px}[dir=rtl] .mdc-select__option-with-meta .mdc-list-item__end,.mdc-select__option-with-meta .mdc-list-item__end[dir=rtl]{margin-left:12px;margin-right:12px}.mdc-select--filled .mdc-select__anchor{height:56px;display:flex;align-items:baseline}.mdc-select--filled .mdc-select__anchor::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-select--filled.mdc-select--no-label .mdc-select__anchor .mdc-select__selected-text::before{content:"​"}.mdc-select--filled.mdc-select--no-label .mdc-select__anchor .mdc-select__selected-text-container{height:100%;display:inline-flex;align-items:center}.mdc-select--filled.mdc-select--no-label .mdc-select__anchor::before{display:none}.mdc-select--filled .mdc-select__anchor{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-select--filled:not(.mdc-select--disabled) .mdc-select__anchor{background-color:whitesmoke}.mdc-select--filled.mdc-select--disabled .mdc-select__anchor{background-color:#fafafa}.mdc-select--filled:not(.mdc-select--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42)}.mdc-select--filled:not(.mdc-select--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87)}.mdc-select--filled:not(.mdc-select--disabled) .mdc-line-ripple::after{border-bottom-color:#6200ee;border-bottom-color:var(--mdc-theme-primary, #6200ee)}.mdc-select--filled.mdc-select--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06)}.mdc-select--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-select--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-select--filled .mdc-menu-surface--is-open-below{border-top-left-radius:0px;border-top-right-radius:0px}.mdc-select--filled.mdc-select--focused.mdc-line-ripple::after{transform:scale(1, 2);opacity:1}.mdc-select--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-select--filled .mdc-floating-label,.mdc-select--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label{left:48px;right:initial}[dir=rtl] .mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label,.mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled):hover .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-line-ripple::after{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-select--outlined{border:none}.mdc-select--outlined .mdc-select__anchor{height:56px}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined-56px 250ms 1}@keyframes mdc-floating-label-shake-float-above-select-outlined-56px{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-select--outlined .mdc-select__anchor{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-select--outlined .mdc-select__anchor,.mdc-select--outlined .mdc-select__anchor[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-select--outlined .mdc-select__anchor,.mdc-select--outlined .mdc-select__anchor[dir=rtl]{padding-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-select--outlined+.mdc-select-helper-text{margin-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-select--outlined+.mdc-select-helper-text,.mdc-select--outlined+.mdc-select-helper-text[dir=rtl]{margin-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-select--outlined+.mdc-select-helper-text,.mdc-select--outlined+.mdc-select-helper-text[dir=rtl]{margin-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-select__anchor{background-color:transparent}.mdc-select--outlined.mdc-select--disabled .mdc-select__anchor{background-color:transparent}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.38)}.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.87)}.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:2px}.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-select--outlined.mdc-select--disabled .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--disabled .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--disabled .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.06)}.mdc-select--outlined .mdc-select__anchor :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-select--outlined .mdc-select__anchor{display:flex;align-items:baseline;overflow:visible}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined 250ms 1}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-select--outlined .mdc-select__anchor .mdc-select__selected-text::before{content:"​"}.mdc-select--outlined .mdc-select__anchor .mdc-select__selected-text-container{height:100%;display:inline-flex;align-items:center}.mdc-select--outlined .mdc-select__anchor::before{display:none}.mdc-select--outlined .mdc-select__selected-text-container{display:flex;border:none;z-index:1;background-color:transparent}.mdc-select--outlined .mdc-select__icon{z-index:2}.mdc-select--outlined .mdc-floating-label{line-height:1.15rem;left:4px;right:initial}[dir=rtl] .mdc-select--outlined .mdc-floating-label,.mdc-select--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-select--outlined.mdc-select--focused .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:2px}.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label,.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above,.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--outlined.mdc-select--with-leading-icon.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined.mdc-select--with-leading-icon .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined.mdc-select--with-leading-icon.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-select--outlined.mdc-select--with-leading-icon .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-select--outlined.mdc-select--with-leading-icon.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined.mdc-select--with-leading-icon .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px 250ms 1}@keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px{0%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--shake,.mdc-select--outlined.mdc-select--with-leading-icon[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px 250ms 1}@keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px-rtl{0%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-select__anchor :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 96px)}.mdc-select--outlined .mdc-menu-surface{margin-bottom:8px}.mdc-select--outlined.mdc-select--no-label .mdc-menu-surface,.mdc-select--outlined .mdc-menu-surface--is-open-below{margin-bottom:0}.mdc-select__anchor{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}.mdc-select__anchor .mdc-select__ripple::before,.mdc-select__anchor .mdc-select__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-select__anchor .mdc-select__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-select__anchor .mdc-select__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-select__anchor.mdc-ripple-upgraded .mdc-select__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-select__anchor.mdc-ripple-upgraded .mdc-select__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-select__anchor.mdc-ripple-upgraded--unbounded .mdc-select__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-select__anchor.mdc-ripple-upgraded--foreground-activation .mdc-select__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-select__anchor.mdc-ripple-upgraded--foreground-deactivation .mdc-select__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-select__anchor .mdc-select__ripple::before,.mdc-select__anchor .mdc-select__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-select__anchor.mdc-ripple-upgraded .mdc-select__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-select__anchor .mdc-select__ripple::before,.mdc-select__anchor .mdc-select__ripple::after{background-color:rgba(0, 0, 0, 0.87);background-color:var(--mdc-ripple-color, rgba(0, 0, 0, 0.87))}.mdc-select__anchor:hover .mdc-select__ripple::before,.mdc-select__anchor.mdc-ripple-surface--hover .mdc-select__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-select__anchor.mdc-ripple-upgraded--background-focused .mdc-select__ripple::before,.mdc-select__anchor:not(.mdc-ripple-upgraded):focus .mdc-select__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-select__anchor .mdc-select__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-deprecated-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-deprecated-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-surface, #000))}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:hover .mdc-deprecated-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-surface--hover .mdc-deprecated-list-item__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-deprecated-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-deprecated-list-item__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded) .mdc-deprecated-list-item__ripple::after{transition:opacity 150ms linear}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-deprecated-list-item__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-surface, #000))}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:hover .mdc-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-select-helper-text{margin:0;margin-left:16px;margin-right:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal}[dir=rtl] .mdc-select-helper-text,.mdc-select-helper-text[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-select-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-select-helper-text--validation-msg{opacity:0;transition:opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-select--invalid+.mdc-select-helper-text--validation-msg,.mdc-select-helper-text--validation-msg-persistent{opacity:1}.mdc-select--with-leading-icon .mdc-select__icon{display:inline-block;box-sizing:border-box;border:none;text-decoration:none;cursor:pointer;user-select:none;flex-shrink:0;align-self:center;background-color:transparent;fill:currentColor}.mdc-select--with-leading-icon .mdc-select__icon{margin-left:12px;margin-right:12px}[dir=rtl] .mdc-select--with-leading-icon .mdc-select__icon,.mdc-select--with-leading-icon .mdc-select__icon[dir=rtl]{margin-left:12px;margin-right:12px}.mdc-select__icon:not([tabindex]),.mdc-select__icon[tabindex="-1"]{cursor:default;pointer-events:none}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{display:inline-block;vertical-align:top;outline:none}.mdc-select{width:100%}[hidden]{display:none}.mdc-select__icon{z-index:2}.mdc-select--with-leading-icon{--mdc-list-item-graphic-margin: calc( 48px - var(--mdc-list-item-graphic-size, 24px) - var(--mdc-list-side-padding, 16px) )}.mdc-select .mdc-select__anchor .mdc-select__selected-text{overflow:hidden}.mdc-select .mdc-select__anchor *{display:inline-flex}.mdc-select .mdc-select__anchor .mdc-floating-label{display:inline-block}mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-select-outlined-idle-border-color, rgba(0, 0, 0, 0.38) );--mdc-notched-outline-notch-offset: 1px}:host(:not([disabled]):hover) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-select-outlined-hover-border-color, rgba(0, 0, 0, 0.87) )}:host(:not([disabled])) .mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text{color:rgba(0, 0, 0, 0.87);color:var(--mdc-select-ink-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-select:not(.mdc-select--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42);border-bottom-color:var(--mdc-select-idle-line-color, rgba(0, 0, 0, 0.42))}:host(:not([disabled])) .mdc-select:not(.mdc-select--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87);border-bottom-color:var(--mdc-select-hover-line-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-select:not(.mdc-select--outlined):not(.mdc-select--disabled) .mdc-select__anchor{background-color:whitesmoke;background-color:var(--mdc-select-fill-color, whitesmoke)}:host(:not([disabled])) .mdc-select.mdc-select--invalid .mdc-select__dropdown-icon{fill:var(--mdc-select-error-dropdown-icon-color, var(--mdc-select-error-color, var(--mdc-theme-error, #b00020)))}:host(:not([disabled])) .mdc-select.mdc-select--invalid .mdc-floating-label,:host(:not([disabled])) .mdc-select.mdc-select--invalid .mdc-floating-label::after{color:var(--mdc-select-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-select.mdc-select--invalid mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-select-error-color, var(--mdc-theme-error, #b00020))}.mdc-select__menu--invalid{--mdc-theme-primary: var(--mdc-select-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-floating-label,:host(:not([disabled])) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-floating-label::after{color:rgba(0, 0, 0, 0.6);color:var(--mdc-select-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-select__dropdown-icon{fill:rgba(0, 0, 0, 0.54);fill:var(--mdc-select-dropdown-icon-color, rgba(0, 0, 0, 0.54))}:host(:not([disabled])) .mdc-select.mdc-select--focused mwc-notched-outline{--mdc-notched-outline-stroke-width: 2px;--mdc-notched-outline-notch-offset: 2px}:host(:not([disabled])) .mdc-select.mdc-select--focused:not(.mdc-select--invalid) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-select-focused-label-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)) )}:host(:not([disabled])) .mdc-select.mdc-select--focused:not(.mdc-select--invalid) .mdc-select__dropdown-icon{fill:rgba(98,0,238,.87);fill:var(--mdc-select-focused-dropdown-icon-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)))}:host(:not([disabled])) .mdc-select.mdc-select--focused:not(.mdc-select--invalid) .mdc-floating-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-select.mdc-select--focused:not(.mdc-select--invalid) .mdc-floating-label::after{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-select-helper-text:not(.mdc-select-helper-text--validation-msg){color:var(--mdc-select-label-ink-color, rgba(0, 0, 0, 0.6))}:host([disabled]){pointer-events:none}:host([disabled]) .mdc-select:not(.mdc-select--outlined).mdc-select--disabled .mdc-select__anchor{background-color:#fafafa;background-color:var(--mdc-select-disabled-fill-color, #fafafa)}:host([disabled]) .mdc-select.mdc-select--outlined mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-select-outlined-disabled-border-color, rgba(0, 0, 0, 0.06) )}:host([disabled]) .mdc-select .mdc-select__dropdown-icon{fill:rgba(0, 0, 0, 0.38);fill:var(--mdc-select-disabled-dropdown-icon-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-floating-label,:host([disabled]) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-floating-label::after{color:rgba(0, 0, 0, 0.38);color:var(--mdc-select-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-select-helper-text{color:rgba(0, 0, 0, 0.38);color:var(--mdc-select-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-select__selected-text{color:rgba(0, 0, 0, 0.38);color:var(--mdc-select-disabled-ink-color, rgba(0, 0, 0, 0.38))}`;
class Kt extends Yt {
}
Kt.styles = [jt, u`
      .mdc-floating-label {
        line-height: 1.15em;
      }
    `],
customElements.define("ewt-select", Kt);
class Qt extends Ce {
}
Qt.styles = [Oe],
customElements.define("ewt-list-item", Qt);
class Jt extends x {
    constructor() {
        super(...arguments),
        this.indeterminate = !1,
        this.progress = 0,
        this.density = 0,
        this.closed = !1
    }
    open() {
        this.closed = !1
    }
    close() {
        this.closed = !0
    }
    render() {
        const e = {
            "mdc-circular-progress--closed": this.closed,
            "mdc-circular-progress--indeterminate": this.indeterminate
        }
          , t = 48 + 4 * this.density
          , i = {
            width: `${t}px`,
            height: `${t}px`
        };
        return h`
      <div
        class="mdc-circular-progress ${m(e)}"
        style="${O(i)}"
        role="progressbar"
        aria-label="${p(this.ariaLabel)}"
        aria-valuemin="0"
        aria-valuemax="1"
        aria-valuenow="${p(this.indeterminate ? void 0 : this.progress)}">
        ${this.renderDeterminateContainer()}
        ${this.renderIndeterminateContainer()}
      </div>`
    }
    renderDeterminateContainer() {
        const e = 48 + 4 * this.density
          , t = e / 2
          , i = this.density >= -3 ? 18 + 11 * this.density / 6 : 12.5 + 5 * (this.density + 3) / 4
          , n = 6.2831852 * i
          , o = (1 - this.progress) * n
          , r = this.density >= -3 ? 4 + this.density * (1 / 3) : 3 + (this.density + 3) * (1 / 6);
        return h`
      <div class="mdc-circular-progress__determinate-container">
        <svg class="mdc-circular-progress__determinate-circle-graphic"
             viewBox="0 0 ${e} ${e}">
          <circle class="mdc-circular-progress__determinate-track"
                  cx="${t}" cy="${t}" r="${i}"
                  stroke-width="${r}"></circle>
          <circle class="mdc-circular-progress__determinate-circle"
                  cx="${t}" cy="${t}" r="${i}"
                  stroke-dasharray="${6.2831852 * i}"
                  stroke-dashoffset="${o}"
                  stroke-width="${r}"></circle>
        </svg>
      </div>`
    }
    renderIndeterminateContainer() {
        return h`
      <div class="mdc-circular-progress__indeterminate-container">
        <div class="mdc-circular-progress__spinner-layer">
          ${this.renderIndeterminateSpinnerLayer()}
        </div>
      </div>`
    }
    renderIndeterminateSpinnerLayer() {
        const e = 48 + 4 * this.density
          , t = e / 2
          , i = this.density >= -3 ? 18 + 11 * this.density / 6 : 12.5 + 5 * (this.density + 3) / 4
          , n = 6.2831852 * i
          , o = .5 * n
          , r = this.density >= -3 ? 4 + this.density * (1 / 3) : 3 + (this.density + 3) * (1 / 6);
        return h`
        <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
          <svg class="mdc-circular-progress__indeterminate-circle-graphic"
               viewBox="0 0 ${e} ${e}">
            <circle cx="${t}" cy="${t}" r="${i}"
                    stroke-dasharray="${n}"
                    stroke-dashoffset="${o}"
                    stroke-width="${r}"></circle>
          </svg>
        </div>
        <div class="mdc-circular-progress__gap-patch">
          <svg class="mdc-circular-progress__indeterminate-circle-graphic"
               viewBox="0 0 ${e} ${e}">
            <circle cx="${t}" cy="${t}" r="${i}"
                    stroke-dasharray="${n}"
                    stroke-dashoffset="${o}"
                    stroke-width="${.8 * r}"></circle>
          </svg>
        </div>
        <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
          <svg class="mdc-circular-progress__indeterminate-circle-graphic"
               viewBox="0 0 ${e} ${e}">
            <circle cx="${t}" cy="${t}" r="${i}"
                    stroke-dasharray="${n}"
                    stroke-dashoffset="${o}"
                    stroke-width="${r}"></circle>
          </svg>
        </div>`
    }
    update(e) {
        super.update(e),
        e.has("progress") && (this.progress > 1 && (this.progress = 1),
        this.progress < 0 && (this.progress = 0))
    }
}
i([n({
    type: Boolean,
    reflect: !0
})], Jt.prototype, "indeterminate", void 0),
i([n({
    type: Number,
    reflect: !0
})], Jt.prototype, "progress", void 0),
i([n({
    type: Number,
    reflect: !0
})], Jt.prototype, "density", void 0),
i([n({
    type: Boolean,
    reflect: !0
})], Jt.prototype, "closed", void 0),
i([d, n({
    type: String,
    attribute: "aria-label"
})], Jt.prototype, "ariaLabel", void 0);
const ei = u`.mdc-circular-progress__determinate-circle,.mdc-circular-progress__indeterminate-circle-graphic{stroke:#6200ee;stroke:var(--mdc-theme-primary, #6200ee)}.mdc-circular-progress__determinate-track{stroke:transparent}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-color-1-fade-in-out{from{opacity:.99}25%{opacity:.99}26%{opacity:0}89%{opacity:0}90%{opacity:.99}to{opacity:.99}}@keyframes mdc-circular-progress-color-2-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:.99}50%{opacity:.99}51%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-3-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:.99}75%{opacity:.99}76%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-4-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:.99}90%{opacity:.99}to{opacity:0}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}.mdc-circular-progress{display:inline-flex;position:relative;direction:ltr;line-height:0;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:transparent}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-1{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-1-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-2{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-2-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-3{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-3-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-4{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-4-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--closed{opacity:0}:host{display:inline-flex}.mdc-circular-progress__determinate-track{stroke:transparent;stroke:var(--mdc-circular-progress-track-color, transparent)}`;
class ti extends Jt {
}
ti.styles = [ei],
customElements.define("ewt-circular-progress", ti);
class ii extends x {
    render() {
        return h`
      <div>
        <ewt-circular-progress
          active
          ?indeterminate=${void 0 === this.progress}
          .progress=${void 0 !== this.progress ? this.progress / 100 : void 0}
          density="8"
        ></ewt-circular-progress>
        ${void 0 !== this.progress ? h`<div>${this.progress}%</div>` : ""}
      </div>
      ${this.label}
    `
    }
}
ii.styles = u`
    :host {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
    ewt-circular-progress {
      margin-bottom: 16px;
    }
  `,
i([n()], ii.prototype, "label", void 0),
i([n()], ii.prototype, "progress", void 0),
customElements.define("ewt-page-progress", ii);
class ni extends x {
    render() {
        return h`
      <div class="icon">${this.icon}</div>
      ${this.label}
    `
    }
}
ni.styles = u`
    :host {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
    .icon {
      font-size: 50px;
      line-height: 80px;
      color: black;
    }
    ewt-circular-progress {
      margin-bottom: 16px;
    }
  `,
i([n()], ni.prototype, "icon", void 0),
i([n()], ni.prototype, "label", void 0),
customElements.define("ewt-page-message", ni);
const oi = L`
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
    />
  </svg>
`
  , ri = L`
  <svg viewBox="0 0 24 24" title="Software">
    <path
      fill="currentColor"
      d="M9.5,8.5L11,10L8,13L11,16L9.5,17.5L5,13L9.5,8.5M14.5,17.5L13,16L16,13L13,10L14.5,8.5L19,13L14.5,17.5M21,2H3A2,2 0 0,0 1,4V20A2,2 0 0,0 3,22H21A2,2 0 0,0 23,20V4A2,2 0 0,0 21,2M21,20H3V6H21V20Z"
    />
  </svg>
`
  , ai = L`
  <svg viewBox="0 0 24 24" title="Chipset">
    <path
      fill="currentColor"
      d="M6,4H18V5H21V7H18V9H21V11H18V13H21V15H18V17H21V19H18V20H6V19H3V17H6V15H3V13H6V11H3V9H6V7H3V5H6V4M11,15V18H12V15H11M13,15V18H14V15H13M15,15V18H16V15H15Z"
    />
  </svg>
`
  , di = L`
  <svg viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"
    />
  </svg>
`
  , si = ["I".charCodeAt(0), "M".charCodeAt(0), "P".charCodeAt(0), "R".charCodeAt(0), "O".charCodeAt(0), "V".charCodeAt(0), 1];
var li, ci;
!function(e) {
    e[e.CURRENT_STATE = 1] = "CURRENT_STATE",
    e[e.ERROR_STATE = 2] = "ERROR_STATE",
    e[e.RPC = 3] = "RPC",
    e[e.RPC_RESULT = 4] = "RPC_RESULT"
}(li || (li = {})),
function(e) {
    e[e.READY = 2] = "READY",
    e[e.PROVISIONING = 3] = "PROVISIONING",
    e[e.PROVISIONED = 4] = "PROVISIONED"
}(ci || (ci = {}));
const hi = {
    0: "NO_ERROR",
    1: "INVALID_RPC_PACKET",
    2: "UNKNOWN_RPC_COMMAND",
    3: "UNABLE_TO_CONNECT",
    254: "TIMEOUT",
    255: "UNKNOWN_ERROR"
};
class mi extends Error {
    constructor() {
        super("Port is not ready")
    }
}
const pi = e=>"[" + e.map((e=>((e,t=2)=>{
    let i = e.toString(16).toUpperCase();
    return i.startsWith("-") ? "-0x" + i.substring(1).padStart(t, "0") : "0x" + i.padStart(t, "0")
}
)(e))).join(", ") + "]";
class ui extends EventTarget {
    constructor(e, t) {
        if (super(),
        this.port = e,
        this.logger = t,
        this.error = 0,
        null === e.readable)
            throw new Error("Port is not readable");
        if (null === e.writable)
            throw new Error("Port is not writable")
    }
    async initialize(e=1e3) {
        var t;
        if (this.logger.log("Initializing Improv Serial"),
        this._processInput(),
        await (t = 3e3,
        new Promise((e=>setTimeout(e, t)))),
        void 0 === this._reader)
            throw new mi;
        try {
            await new Promise((async(t,i)=>{
                setTimeout((()=>i(new Error("Improv Wi-Fi Serial not detected"))), e),
                await this.requestCurrentState(),
                t(void 0)
            }
            )),
            await this.requestInfo()
        } catch (e) {
            throw await this.close(),
            e
        }
        return this.info
    }
    async close() {
        this._reader && await new Promise((e=>{
            this._reader.cancel(),
            this.addEventListener("disconnect", e, {
                once: !0
            })
        }
        ))
    }
    async requestCurrentState() {
        let e;
        try {
            await new Promise((async(t,i)=>{
                this.addEventListener("state-changed", t, {
                    once: !0
                });
                e = this._sendRPCWithResponse(2, []),
                e.catch((e=>{
                    this.removeEventListener("state-changed", t),
                    i(e)
                }
                ))
            }
            ))
        } catch (e) {
            throw this._rpcFeedback = void 0,
            new Error(`Error fetching current state: ${e}`)
        }
        if (this.state !== ci.PROVISIONED)
            return void (this._rpcFeedback = void 0);
        const t = await e;
        this.nextUrl = t[0]
    }
    async requestInfo(e) {
        const t = await this._sendRPCWithResponse(3, [], e);
        this.info = {
            firmware: t[0],
            version: t[1],
            name: t[3],
            chipFamily: t[2]
        }
    }
    async provision(e, t, i) {
        const n = new TextEncoder
          , o = n.encode(e)
          , r = n.encode(t)
          , a = [o.length, ...o, r.length, ...r]
          , d = await this._sendRPCWithResponse(1, a, i);
        this.nextUrl = d[0]
    }
    async scan() {
        const e = (await this._sendRPCWithMultipleResponses(4, [])).map((([e,t,i])=>({
            name: e,
            rssi: parseInt(t),
            secured: "YES" === i
        })));
        return e.sort(((e,t)=>e.name.toLocaleLowerCase().localeCompare(t.name.toLocaleLowerCase()))),
        e
    }
    _sendRPC(e, t) {
        this.writePacketToStream(li.RPC, [e, t.length, ...t])
    }
    async _sendRPCWithResponse(e, t, i) {
        if (this._rpcFeedback)
            throw new Error("Only 1 RPC command that requires feedback can be active");
        return await this._awaitRPCResultWithTimeout(new Promise(((i,n)=>{
            this._rpcFeedback = {
                command: e,
                resolve: i,
                reject: n
            },
            this._sendRPC(e, t)
        }
        )), i)
    }
    async _sendRPCWithMultipleResponses(e, t, i) {
        if (this._rpcFeedback)
            throw new Error("Only 1 RPC command that requires feedback can be active");
        return await this._awaitRPCResultWithTimeout(new Promise(((i,n)=>{
            this._rpcFeedback = {
                command: e,
                resolve: i,
                reject: n,
                receivedData: []
            },
            this._sendRPC(e, t)
        }
        )), i)
    }
    async _awaitRPCResultWithTimeout(e, t) {
        return t ? await new Promise(((i,n)=>{
            const o = setTimeout((()=>this._setError(254)), t);
            e.finally((()=>clearTimeout(o))),
            e.then(i, n)
        }
        )) : await e
    }
    async _processInput() {
        this.logger.debug("Starting read loop"),
        this._reader = this.port.readable.getReader();
        try {
            let e, t = [], i = 0;
            for (; ; ) {
                const {value: n, done: o} = await this._reader.read();
                if (o)
                    break;
                if (n && 0 !== n.length)
                    for (const o of n) {
                        if (!1 === e) {
                            10 === o && (e = void 0);
                            continue
                        }
                        if (!0 === e) {
                            t.push(o),
                            t.length === i && (this._handleIncomingPacket(t),
                            e = void 0,
                            t = []);
                            continue
                        }
                        if (10 === o) {
                            t = [];
                            continue
                        }
                        if (t.push(o),
                        9 !== t.length)
                            continue;
                        if (e = "IMPROV" === String.fromCharCode(...t.slice(0, 6)),
                        !e) {
                            t = [];
                            continue
                        }
                        i = 9 + t[8] + 1
                    }
            }
        } catch (e) {
            this.logger.error("Error while reading serial port", e)
        } finally {
            this._reader.releaseLock(),
            this._reader = void 0
        }
        this.logger.debug("Finished read loop"),
        this.dispatchEvent(new Event("disconnect"))
    }
    _handleIncomingPacket(e) {
        const t = e.slice(6)
          , i = t[0]
          , n = t[1]
          , o = t[2]
          , r = t.slice(3, 3 + o);
        if (this.logger.debug("PROCESS", {
            version: i,
            packetType: n,
            packetLength: o,
            data: pi(r)
        }),
        1 !== i)
            return void this.logger.error("Received unsupported version", i);
        let a = t[3 + o]
          , d = 0;
        for (let t = 0; t < e.length - 1; t++)
            d += e[t];
        if (d &= 255,
        d === a)
            if (n === li.CURRENT_STATE)
                this.state = r[0],
                this.dispatchEvent(new CustomEvent("state-changed",{
                    detail: this.state
                }));
            else if (n === li.ERROR_STATE)
                this._setError(r[0]);
            else if (n === li.RPC_RESULT) {
                if (!this._rpcFeedback)
                    return void this.logger.error("Received result while not waiting for one");
                const e = r[0];
                if (e !== this._rpcFeedback.command)
                    return void this.logger.error(`Received result for command ${e} but expected ${this._rpcFeedback.command}`);
                const t = []
                  , i = r[1];
                let n = 2;
                for (; n < 2 + i; )
                    t.push(String.fromCodePoint(...r.slice(n + 1, n + r[n] + 1))),
                    n += r[n] + 1;
                "receivedData"in this._rpcFeedback ? t.length > 0 ? this._rpcFeedback.receivedData.push(t) : (this._rpcFeedback.resolve(this._rpcFeedback.receivedData),
                this._rpcFeedback = void 0) : (this._rpcFeedback.resolve(t),
                this._rpcFeedback = void 0)
            } else
                this.logger.error("Unable to handle packet", t);
        else
            this.logger.error(`Received invalid checksum ${a}. Expected ${d}`)
    }
    async writePacketToStream(e, t) {
        const i = new Uint8Array([...si, e, t.length, ...t, 0, 0]);
        i[i.length - 2] = 255 & i.reduce(((e,t)=>e + t), 0),
        i[i.length - 1] = 10,
        this.logger.debug("Writing to stream:", pi(new Array(...i)));
        const n = this.port.writable.getWriter();
        await n.write(i);
        try {
            n.releaseLock()
        } catch (e) {
            console.error("Ignoring release lock error", e)
        }
    }
    _setError(e) {
        this.error = e,
        e > 0 && this._rpcFeedback && (this._rpcFeedback.reject(hi[e] || `UNKNOWN_ERROR (${e})`),
        this._rpcFeedback = void 0),
        this.dispatchEvent(new CustomEvent("error-changed",{
            detail: this.error
        }))
    }
}
class fi extends Error {
}
function gi(e) {
    let t = e.length;
    for (; --t >= 0; )
        e[t] = 0
}
const _i = 256
  , bi = 286
  , xi = 30
  , yi = 15
  , vi = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
  , wi = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
  , ki = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
  , Ei = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  , Ii = new Array(576);
gi(Ii);
const Ai = new Array(60);
gi(Ai);
const Si = new Array(512);
gi(Si);
const Ri = new Array(256);
gi(Ri);
const Ti = new Array(29);
gi(Ti);
const Ci = new Array(xi);
function Oi(e, t, i, n, o) {
    this.static_tree = e,
    this.extra_bits = t,
    this.extra_base = i,
    this.elems = n,
    this.max_length = o,
    this.has_stree = e && e.length
}
let Li, Fi, Di;
function zi(e, t) {
    this.dyn_tree = e,
    this.max_code = 0,
    this.stat_desc = t
}
gi(Ci);
const Mi = e=>e < 256 ? Si[e] : Si[256 + (e >>> 7)]
  , Ni = (e,t)=>{
    e.pending_buf[e.pending++] = 255 & t,
    e.pending_buf[e.pending++] = t >>> 8 & 255
}
  , Bi = (e,t,i)=>{
    e.bi_valid > 16 - i ? (e.bi_buf |= t << e.bi_valid & 65535,
    Ni(e, e.bi_buf),
    e.bi_buf = t >> 16 - e.bi_valid,
    e.bi_valid += i - 16) : (e.bi_buf |= t << e.bi_valid & 65535,
    e.bi_valid += i)
}
  , Pi = (e,t,i)=>{
    Bi(e, i[2 * t], i[2 * t + 1])
}
  , Ui = (e,t)=>{
    let i = 0;
    do {
        i |= 1 & e,
        e >>>= 1,
        i <<= 1
    } while (--t > 0);
    return i >>> 1
}
  , $i = (e,t,i)=>{
    const n = new Array(16);
    let o, r, a = 0;
    for (o = 1; o <= yi; o++)
        a = a + i[o - 1] << 1,
        n[o] = a;
    for (r = 0; r <= t; r++) {
        let t = e[2 * r + 1];
        0 !== t && (e[2 * r] = Ui(n[t]++, t))
    }
}
  , Hi = e=>{
    let t;
    for (t = 0; t < bi; t++)
        e.dyn_ltree[2 * t] = 0;
    for (t = 0; t < xi; t++)
        e.dyn_dtree[2 * t] = 0;
    for (t = 0; t < 19; t++)
        e.bl_tree[2 * t] = 0;
    e.dyn_ltree[512] = 1,
    e.opt_len = e.static_len = 0,
    e.sym_next = e.matches = 0
}
  , Vi = e=>{
    e.bi_valid > 8 ? Ni(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf),
    e.bi_buf = 0,
    e.bi_valid = 0
}
  , Wi = (e,t,i,n)=>{
    const o = 2 * t
      , r = 2 * i;
    return e[o] < e[r] || e[o] === e[r] && n[t] <= n[i]
}
  , Gi = (e,t,i)=>{
    const n = e.heap[i];
    let o = i << 1;
    for (; o <= e.heap_len && (o < e.heap_len && Wi(t, e.heap[o + 1], e.heap[o], e.depth) && o++,
    !Wi(t, n, e.heap[o], e.depth)); )
        e.heap[i] = e.heap[o],
        i = o,
        o <<= 1;
    e.heap[i] = n
}
  , Xi = (e,t,i)=>{
    let n, o, r, a, d = 0;
    if (0 !== e.sym_next)
        do {
            n = 255 & e.pending_buf[e.sym_buf + d++],
            n += (255 & e.pending_buf[e.sym_buf + d++]) << 8,
            o = e.pending_buf[e.sym_buf + d++],
            0 === n ? Pi(e, o, t) : (r = Ri[o],
            Pi(e, r + _i + 1, t),
            a = vi[r],
            0 !== a && (o -= Ti[r],
            Bi(e, o, a)),
            n--,
            r = Mi(n),
            Pi(e, r, i),
            a = wi[r],
            0 !== a && (n -= Ci[r],
            Bi(e, n, a)))
        } while (d < e.sym_next);
    Pi(e, 256, t)
}
  , qi = (e,t)=>{
    const i = t.dyn_tree
      , n = t.stat_desc.static_tree
      , o = t.stat_desc.has_stree
      , r = t.stat_desc.elems;
    let a, d, s, l = -1;
    for (e.heap_len = 0,
    e.heap_max = 573,
    a = 0; a < r; a++)
        0 !== i[2 * a] ? (e.heap[++e.heap_len] = l = a,
        e.depth[a] = 0) : i[2 * a + 1] = 0;
    for (; e.heap_len < 2; )
        s = e.heap[++e.heap_len] = l < 2 ? ++l : 0,
        i[2 * s] = 1,
        e.depth[s] = 0,
        e.opt_len--,
        o && (e.static_len -= n[2 * s + 1]);
    for (t.max_code = l,
    a = e.heap_len >> 1; a >= 1; a--)
        Gi(e, i, a);
    s = r;
    do {
        a = e.heap[1],
        e.heap[1] = e.heap[e.heap_len--],
        Gi(e, i, 1),
        d = e.heap[1],
        e.heap[--e.heap_max] = a,
        e.heap[--e.heap_max] = d,
        i[2 * s] = i[2 * a] + i[2 * d],
        e.depth[s] = (e.depth[a] >= e.depth[d] ? e.depth[a] : e.depth[d]) + 1,
        i[2 * a + 1] = i[2 * d + 1] = s,
        e.heap[1] = s++,
        Gi(e, i, 1)
    } while (e.heap_len >= 2);
    e.heap[--e.heap_max] = e.heap[1],
    ((e,t)=>{
        const i = t.dyn_tree
          , n = t.max_code
          , o = t.stat_desc.static_tree
          , r = t.stat_desc.has_stree
          , a = t.stat_desc.extra_bits
          , d = t.stat_desc.extra_base
          , s = t.stat_desc.max_length;
        let l, c, h, m, p, u, f = 0;
        for (m = 0; m <= yi; m++)
            e.bl_count[m] = 0;
        for (i[2 * e.heap[e.heap_max] + 1] = 0,
        l = e.heap_max + 1; l < 573; l++)
            c = e.heap[l],
            m = i[2 * i[2 * c + 1] + 1] + 1,
            m > s && (m = s,
            f++),
            i[2 * c + 1] = m,
            c > n || (e.bl_count[m]++,
            p = 0,
            c >= d && (p = a[c - d]),
            u = i[2 * c],
            e.opt_len += u * (m + p),
            r && (e.static_len += u * (o[2 * c + 1] + p)));
        if (0 !== f) {
            do {
                for (m = s - 1; 0 === e.bl_count[m]; )
                    m--;
                e.bl_count[m]--,
                e.bl_count[m + 1] += 2,
                e.bl_count[s]--,
                f -= 2
            } while (f > 0);
            for (m = s; 0 !== m; m--)
                for (c = e.bl_count[m]; 0 !== c; )
                    h = e.heap[--l],
                    h > n || (i[2 * h + 1] !== m && (e.opt_len += (m - i[2 * h + 1]) * i[2 * h],
                    i[2 * h + 1] = m),
                    c--)
        }
    }
    )(e, t),
    $i(i, l, e.bl_count)
}
  , Zi = (e,t,i)=>{
    let n, o, r = -1, a = t[1], d = 0, s = 7, l = 4;
    for (0 === a && (s = 138,
    l = 3),
    t[2 * (i + 1) + 1] = 65535,
    n = 0; n <= i; n++)
        o = a,
        a = t[2 * (n + 1) + 1],
        ++d < s && o === a || (d < l ? e.bl_tree[2 * o] += d : 0 !== o ? (o !== r && e.bl_tree[2 * o]++,
        e.bl_tree[32]++) : d <= 10 ? e.bl_tree[34]++ : e.bl_tree[36]++,
        d = 0,
        r = o,
        0 === a ? (s = 138,
        l = 3) : o === a ? (s = 6,
        l = 3) : (s = 7,
        l = 4))
}
  , Yi = (e,t,i)=>{
    let n, o, r = -1, a = t[1], d = 0, s = 7, l = 4;
    for (0 === a && (s = 138,
    l = 3),
    n = 0; n <= i; n++)
        if (o = a,
        a = t[2 * (n + 1) + 1],
        !(++d < s && o === a)) {
            if (d < l)
                do {
                    Pi(e, o, e.bl_tree)
                } while (0 != --d);
            else
                0 !== o ? (o !== r && (Pi(e, o, e.bl_tree),
                d--),
                Pi(e, 16, e.bl_tree),
                Bi(e, d - 3, 2)) : d <= 10 ? (Pi(e, 17, e.bl_tree),
                Bi(e, d - 3, 3)) : (Pi(e, 18, e.bl_tree),
                Bi(e, d - 11, 7));
            d = 0,
            r = o,
            0 === a ? (s = 138,
            l = 3) : o === a ? (s = 6,
            l = 3) : (s = 7,
            l = 4)
        }
}
;
let ji = !1;
const Ki = (e,t,i,n)=>{
    Bi(e, 0 + (n ? 1 : 0), 3),
    Vi(e),
    Ni(e, i),
    Ni(e, ~i),
    i && e.pending_buf.set(e.window.subarray(t, t + i), e.pending),
    e.pending += i
}
;
var Qi = e=>{
    ji || ((()=>{
        let e, t, i, n, o;
        const r = new Array(16);
        for (i = 0,
        n = 0; n < 28; n++)
            for (Ti[n] = i,
            e = 0; e < 1 << vi[n]; e++)
                Ri[i++] = n;
        for (Ri[i - 1] = n,
        o = 0,
        n = 0; n < 16; n++)
            for (Ci[n] = o,
            e = 0; e < 1 << wi[n]; e++)
                Si[o++] = n;
        for (o >>= 7; n < xi; n++)
            for (Ci[n] = o << 7,
            e = 0; e < 1 << wi[n] - 7; e++)
                Si[256 + o++] = n;
        for (t = 0; t <= yi; t++)
            r[t] = 0;
        for (e = 0; e <= 143; )
            Ii[2 * e + 1] = 8,
            e++,
            r[8]++;
        for (; e <= 255; )
            Ii[2 * e + 1] = 9,
            e++,
            r[9]++;
        for (; e <= 279; )
            Ii[2 * e + 1] = 7,
            e++,
            r[7]++;
        for (; e <= 287; )
            Ii[2 * e + 1] = 8,
            e++,
            r[8]++;
        for ($i(Ii, 287, r),
        e = 0; e < xi; e++)
            Ai[2 * e + 1] = 5,
            Ai[2 * e] = Ui(e, 5);
        Li = new Oi(Ii,vi,257,bi,yi),
        Fi = new Oi(Ai,wi,0,xi,yi),
        Di = new Oi(new Array(0),ki,0,19,7)
    }
    )(),
    ji = !0),
    e.l_desc = new zi(e.dyn_ltree,Li),
    e.d_desc = new zi(e.dyn_dtree,Fi),
    e.bl_desc = new zi(e.bl_tree,Di),
    e.bi_buf = 0,
    e.bi_valid = 0,
    Hi(e)
}
  , Ji = (e,t,i,n)=>{
    let o, r, a = 0;
    e.level > 0 ? (2 === e.strm.data_type && (e.strm.data_type = (e=>{
        let t, i = 4093624447;
        for (t = 0; t <= 31; t++,
        i >>>= 1)
            if (1 & i && 0 !== e.dyn_ltree[2 * t])
                return 0;
        if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26])
            return 1;
        for (t = 32; t < _i; t++)
            if (0 !== e.dyn_ltree[2 * t])
                return 1;
        return 0
    }
    )(e)),
    qi(e, e.l_desc),
    qi(e, e.d_desc),
    a = (e=>{
        let t;
        for (Zi(e, e.dyn_ltree, e.l_desc.max_code),
        Zi(e, e.dyn_dtree, e.d_desc.max_code),
        qi(e, e.bl_desc),
        t = 18; t >= 3 && 0 === e.bl_tree[2 * Ei[t] + 1]; t--)
            ;
        return e.opt_len += 3 * (t + 1) + 5 + 5 + 4,
        t
    }
    )(e),
    o = e.opt_len + 3 + 7 >>> 3,
    r = e.static_len + 3 + 7 >>> 3,
    r <= o && (o = r)) : o = r = i + 5,
    i + 4 <= o && -1 !== t ? Ki(e, t, i, n) : 4 === e.strategy || r === o ? (Bi(e, 2 + (n ? 1 : 0), 3),
    Xi(e, Ii, Ai)) : (Bi(e, 4 + (n ? 1 : 0), 3),
    ((e,t,i,n)=>{
        let o;
        for (Bi(e, t - 257, 5),
        Bi(e, i - 1, 5),
        Bi(e, n - 4, 4),
        o = 0; o < n; o++)
            Bi(e, e.bl_tree[2 * Ei[o] + 1], 3);
        Yi(e, e.dyn_ltree, t - 1),
        Yi(e, e.dyn_dtree, i - 1)
    }
    )(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, a + 1),
    Xi(e, e.dyn_ltree, e.dyn_dtree)),
    Hi(e),
    n && Vi(e)
}
  , en = (e,t,i)=>(e.pending_buf[e.sym_buf + e.sym_next++] = t,
e.pending_buf[e.sym_buf + e.sym_next++] = t >> 8,
e.pending_buf[e.sym_buf + e.sym_next++] = i,
0 === t ? e.dyn_ltree[2 * i]++ : (e.matches++,
t--,
e.dyn_ltree[2 * (Ri[i] + _i + 1)]++,
e.dyn_dtree[2 * Mi(t)]++),
e.sym_next === e.sym_end)
  , tn = e=>{
    Bi(e, 2, 3),
    Pi(e, 256, Ii),
    (e=>{
        16 === e.bi_valid ? (Ni(e, e.bi_buf),
        e.bi_buf = 0,
        e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf,
        e.bi_buf >>= 8,
        e.bi_valid -= 8)
    }
    )(e)
}
  , nn = {
    _tr_init: Qi,
    _tr_stored_block: Ki,
    _tr_flush_block: Ji,
    _tr_tally: en,
    _tr_align: tn
};
var on = (e,t,i,n)=>{
    let o = 65535 & e | 0
      , r = e >>> 16 & 65535 | 0
      , a = 0;
    for (; 0 !== i; ) {
        a = i > 2e3 ? 2e3 : i,
        i -= a;
        do {
            o = o + t[n++] | 0,
            r = r + o | 0
        } while (--a);
        o %= 65521,
        r %= 65521
    }
    return o | r << 16 | 0
}
;
const rn = new Uint32Array((()=>{
    let e, t = [];
    for (var i = 0; i < 256; i++) {
        e = i;
        for (var n = 0; n < 8; n++)
            e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
        t[i] = e
    }
    return t
}
)());
var an = (e,t,i,n)=>{
    const o = rn
      , r = n + i;
    e ^= -1;
    for (let i = n; i < r; i++)
        e = e >>> 8 ^ o[255 & (e ^ t[i])];
    return -1 ^ e
}
  , dn = {
    2: "need dictionary",
    1: "stream end",
    0: "",
    "-1": "file error",
    "-2": "stream error",
    "-3": "data error",
    "-4": "insufficient memory",
    "-5": "buffer error",
    "-6": "incompatible version"
}
  , sn = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8
};
const {_tr_init: ln, _tr_stored_block: cn, _tr_flush_block: hn, _tr_tally: mn, _tr_align: pn} = nn
  , {Z_NO_FLUSH: un, Z_PARTIAL_FLUSH: fn, Z_FULL_FLUSH: gn, Z_FINISH: _n, Z_BLOCK: bn, Z_OK: xn, Z_STREAM_END: yn, Z_STREAM_ERROR: vn, Z_DATA_ERROR: wn, Z_BUF_ERROR: kn, Z_DEFAULT_COMPRESSION: En, Z_FILTERED: In, Z_HUFFMAN_ONLY: An, Z_RLE: Sn, Z_FIXED: Rn, Z_DEFAULT_STRATEGY: Tn, Z_UNKNOWN: Cn, Z_DEFLATED: On} = sn
  , Ln = 258
  , Fn = 262
  , Dn = 42
  , zn = 113
  , Mn = 666
  , Nn = (e,t)=>(e.msg = dn[t],
t)
  , Bn = e=>2 * e - (e > 4 ? 9 : 0)
  , Pn = e=>{
    let t = e.length;
    for (; --t >= 0; )
        e[t] = 0
}
  , Un = e=>{
    let t, i, n, o = e.w_size;
    t = e.hash_size,
    n = t;
    do {
        i = e.head[--n],
        e.head[n] = i >= o ? i - o : 0
    } while (--t);
    t = o,
    n = t;
    do {
        i = e.prev[--n],
        e.prev[n] = i >= o ? i - o : 0
    } while (--t)
}
;
let $n = (e,t,i)=>(t << e.hash_shift ^ i) & e.hash_mask;
const Hn = e=>{
    const t = e.state;
    let i = t.pending;
    i > e.avail_out && (i = e.avail_out),
    0 !== i && (e.output.set(t.pending_buf.subarray(t.pending_out, t.pending_out + i), e.next_out),
    e.next_out += i,
    t.pending_out += i,
    e.total_out += i,
    e.avail_out -= i,
    t.pending -= i,
    0 === t.pending && (t.pending_out = 0))
}
  , Vn = (e,t)=>{
    hn(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t),
    e.block_start = e.strstart,
    Hn(e.strm)
}
  , Wn = (e,t)=>{
    e.pending_buf[e.pending++] = t
}
  , Gn = (e,t)=>{
    e.pending_buf[e.pending++] = t >>> 8 & 255,
    e.pending_buf[e.pending++] = 255 & t
}
  , Xn = (e,t,i,n)=>{
    let o = e.avail_in;
    return o > n && (o = n),
    0 === o ? 0 : (e.avail_in -= o,
    t.set(e.input.subarray(e.next_in, e.next_in + o), i),
    1 === e.state.wrap ? e.adler = on(e.adler, t, o, i) : 2 === e.state.wrap && (e.adler = an(e.adler, t, o, i)),
    e.next_in += o,
    e.total_in += o,
    o)
}
  , qn = (e,t)=>{
    let i, n, o = e.max_chain_length, r = e.strstart, a = e.prev_length, d = e.nice_match;
    const s = e.strstart > e.w_size - Fn ? e.strstart - (e.w_size - Fn) : 0
      , l = e.window
      , c = e.w_mask
      , h = e.prev
      , m = e.strstart + Ln;
    let p = l[r + a - 1]
      , u = l[r + a];
    e.prev_length >= e.good_match && (o >>= 2),
    d > e.lookahead && (d = e.lookahead);
    do {
        if (i = t,
        l[i + a] === u && l[i + a - 1] === p && l[i] === l[r] && l[++i] === l[r + 1]) {
            r += 2,
            i++;
            do {} while (l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && r < m);
            if (n = Ln - (m - r),
            r = m - Ln,
            n > a) {
                if (e.match_start = t,
                a = n,
                n >= d)
                    break;
                p = l[r + a - 1],
                u = l[r + a]
            }
        }
    } while ((t = h[t & c]) > s && 0 != --o);
    return a <= e.lookahead ? a : e.lookahead
}
  , Zn = e=>{
    const t = e.w_size;
    let i, n, o;
    do {
        if (n = e.window_size - e.lookahead - e.strstart,
        e.strstart >= t + (t - Fn) && (e.window.set(e.window.subarray(t, t + t - n), 0),
        e.match_start -= t,
        e.strstart -= t,
        e.block_start -= t,
        e.insert > e.strstart && (e.insert = e.strstart),
        Un(e),
        n += t),
        0 === e.strm.avail_in)
            break;
        if (i = Xn(e.strm, e.window, e.strstart + e.lookahead, n),
        e.lookahead += i,
        e.lookahead + e.insert >= 3)
            for (o = e.strstart - e.insert,
            e.ins_h = e.window[o],
            e.ins_h = $n(e, e.ins_h, e.window[o + 1]); e.insert && (e.ins_h = $n(e, e.ins_h, e.window[o + 3 - 1]),
            e.prev[o & e.w_mask] = e.head[e.ins_h],
            e.head[e.ins_h] = o,
            o++,
            e.insert--,
            !(e.lookahead + e.insert < 3)); )
                ;
    } while (e.lookahead < Fn && 0 !== e.strm.avail_in)
}
  , Yn = (e,t)=>{
    let i, n, o, r = e.pending_buf_size - 5 > e.w_size ? e.w_size : e.pending_buf_size - 5, a = 0, d = e.strm.avail_in;
    do {
        if (i = 65535,
        o = e.bi_valid + 42 >> 3,
        e.strm.avail_out < o)
            break;
        if (o = e.strm.avail_out - o,
        n = e.strstart - e.block_start,
        i > n + e.strm.avail_in && (i = n + e.strm.avail_in),
        i > o && (i = o),
        i < r && (0 === i && t !== _n || t === un || i !== n + e.strm.avail_in))
            break;
        a = t === _n && i === n + e.strm.avail_in ? 1 : 0,
        cn(e, 0, 0, a),
        e.pending_buf[e.pending - 4] = i,
        e.pending_buf[e.pending - 3] = i >> 8,
        e.pending_buf[e.pending - 2] = ~i,
        e.pending_buf[e.pending - 1] = ~i >> 8,
        Hn(e.strm),
        n && (n > i && (n = i),
        e.strm.output.set(e.window.subarray(e.block_start, e.block_start + n), e.strm.next_out),
        e.strm.next_out += n,
        e.strm.avail_out -= n,
        e.strm.total_out += n,
        e.block_start += n,
        i -= n),
        i && (Xn(e.strm, e.strm.output, e.strm.next_out, i),
        e.strm.next_out += i,
        e.strm.avail_out -= i,
        e.strm.total_out += i)
    } while (0 === a);
    return d -= e.strm.avail_in,
    d && (d >= e.w_size ? (e.matches = 2,
    e.window.set(e.strm.input.subarray(e.strm.next_in - e.w_size, e.strm.next_in), 0),
    e.strstart = e.w_size,
    e.insert = e.strstart) : (e.window_size - e.strstart <= d && (e.strstart -= e.w_size,
    e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0),
    e.matches < 2 && e.matches++,
    e.insert > e.strstart && (e.insert = e.strstart)),
    e.window.set(e.strm.input.subarray(e.strm.next_in - d, e.strm.next_in), e.strstart),
    e.strstart += d,
    e.insert += d > e.w_size - e.insert ? e.w_size - e.insert : d),
    e.block_start = e.strstart),
    e.high_water < e.strstart && (e.high_water = e.strstart),
    a ? 4 : t !== un && t !== _n && 0 === e.strm.avail_in && e.strstart === e.block_start ? 2 : (o = e.window_size - e.strstart,
    e.strm.avail_in > o && e.block_start >= e.w_size && (e.block_start -= e.w_size,
    e.strstart -= e.w_size,
    e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0),
    e.matches < 2 && e.matches++,
    o += e.w_size,
    e.insert > e.strstart && (e.insert = e.strstart)),
    o > e.strm.avail_in && (o = e.strm.avail_in),
    o && (Xn(e.strm, e.window, e.strstart, o),
    e.strstart += o,
    e.insert += o > e.w_size - e.insert ? e.w_size - e.insert : o),
    e.high_water < e.strstart && (e.high_water = e.strstart),
    o = e.bi_valid + 42 >> 3,
    o = e.pending_buf_size - o > 65535 ? 65535 : e.pending_buf_size - o,
    r = o > e.w_size ? e.w_size : o,
    n = e.strstart - e.block_start,
    (n >= r || (n || t === _n) && t !== un && 0 === e.strm.avail_in && n <= o) && (i = n > o ? o : n,
    a = t === _n && 0 === e.strm.avail_in && i === n ? 1 : 0,
    cn(e, e.block_start, i, a),
    e.block_start += i,
    Hn(e.strm)),
    a ? 3 : 1)
}
  , jn = (e,t)=>{
    let i, n;
    for (; ; ) {
        if (e.lookahead < Fn) {
            if (Zn(e),
            e.lookahead < Fn && t === un)
                return 1;
            if (0 === e.lookahead)
                break
        }
        if (i = 0,
        e.lookahead >= 3 && (e.ins_h = $n(e, e.ins_h, e.window[e.strstart + 3 - 1]),
        i = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h],
        e.head[e.ins_h] = e.strstart),
        0 !== i && e.strstart - i <= e.w_size - Fn && (e.match_length = qn(e, i)),
        e.match_length >= 3)
            if (n = mn(e, e.strstart - e.match_start, e.match_length - 3),
            e.lookahead -= e.match_length,
            e.match_length <= e.max_lazy_match && e.lookahead >= 3) {
                e.match_length--;
                do {
                    e.strstart++,
                    e.ins_h = $n(e, e.ins_h, e.window[e.strstart + 3 - 1]),
                    i = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h],
                    e.head[e.ins_h] = e.strstart
                } while (0 != --e.match_length);
                e.strstart++
            } else
                e.strstart += e.match_length,
                e.match_length = 0,
                e.ins_h = e.window[e.strstart],
                e.ins_h = $n(e, e.ins_h, e.window[e.strstart + 1]);
        else
            n = mn(e, 0, e.window[e.strstart]),
            e.lookahead--,
            e.strstart++;
        if (n && (Vn(e, !1),
        0 === e.strm.avail_out))
            return 1
    }
    return e.insert = e.strstart < 2 ? e.strstart : 2,
    t === _n ? (Vn(e, !0),
    0 === e.strm.avail_out ? 3 : 4) : e.sym_next && (Vn(e, !1),
    0 === e.strm.avail_out) ? 1 : 2
}
  , Kn = (e,t)=>{
    let i, n, o;
    for (; ; ) {
        if (e.lookahead < Fn) {
            if (Zn(e),
            e.lookahead < Fn && t === un)
                return 1;
            if (0 === e.lookahead)
                break
        }
        if (i = 0,
        e.lookahead >= 3 && (e.ins_h = $n(e, e.ins_h, e.window[e.strstart + 3 - 1]),
        i = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h],
        e.head[e.ins_h] = e.strstart),
        e.prev_length = e.match_length,
        e.prev_match = e.match_start,
        e.match_length = 2,
        0 !== i && e.prev_length < e.max_lazy_match && e.strstart - i <= e.w_size - Fn && (e.match_length = qn(e, i),
        e.match_length <= 5 && (e.strategy === In || 3 === e.match_length && e.strstart - e.match_start > 4096) && (e.match_length = 2)),
        e.prev_length >= 3 && e.match_length <= e.prev_length) {
            o = e.strstart + e.lookahead - 3,
            n = mn(e, e.strstart - 1 - e.prev_match, e.prev_length - 3),
            e.lookahead -= e.prev_length - 1,
            e.prev_length -= 2;
            do {
                ++e.strstart <= o && (e.ins_h = $n(e, e.ins_h, e.window[e.strstart + 3 - 1]),
                i = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h],
                e.head[e.ins_h] = e.strstart)
            } while (0 != --e.prev_length);
            if (e.match_available = 0,
            e.match_length = 2,
            e.strstart++,
            n && (Vn(e, !1),
            0 === e.strm.avail_out))
                return 1
        } else if (e.match_available) {
            if (n = mn(e, 0, e.window[e.strstart - 1]),
            n && Vn(e, !1),
            e.strstart++,
            e.lookahead--,
            0 === e.strm.avail_out)
                return 1
        } else
            e.match_available = 1,
            e.strstart++,
            e.lookahead--
    }
    return e.match_available && (n = mn(e, 0, e.window[e.strstart - 1]),
    e.match_available = 0),
    e.insert = e.strstart < 2 ? e.strstart : 2,
    t === _n ? (Vn(e, !0),
    0 === e.strm.avail_out ? 3 : 4) : e.sym_next && (Vn(e, !1),
    0 === e.strm.avail_out) ? 1 : 2
}
;
function Qn(e, t, i, n, o) {
    this.good_length = e,
    this.max_lazy = t,
    this.nice_length = i,
    this.max_chain = n,
    this.func = o
}
const Jn = [new Qn(0,0,0,0,Yn), new Qn(4,4,8,4,jn), new Qn(4,5,16,8,jn), new Qn(4,6,32,32,jn), new Qn(4,4,16,16,Kn), new Qn(8,16,32,32,Kn), new Qn(8,16,128,128,Kn), new Qn(8,32,128,256,Kn), new Qn(32,128,258,1024,Kn), new Qn(32,258,258,4096,Kn)];
function eo() {
    this.strm = null,
    this.status = 0,
    this.pending_buf = null,
    this.pending_buf_size = 0,
    this.pending_out = 0,
    this.pending = 0,
    this.wrap = 0,
    this.gzhead = null,
    this.gzindex = 0,
    this.method = On,
    this.last_flush = -1,
    this.w_size = 0,
    this.w_bits = 0,
    this.w_mask = 0,
    this.window = null,
    this.window_size = 0,
    this.prev = null,
    this.head = null,
    this.ins_h = 0,
    this.hash_size = 0,
    this.hash_bits = 0,
    this.hash_mask = 0,
    this.hash_shift = 0,
    this.block_start = 0,
    this.match_length = 0,
    this.prev_match = 0,
    this.match_available = 0,
    this.strstart = 0,
    this.match_start = 0,
    this.lookahead = 0,
    this.prev_length = 0,
    this.max_chain_length = 0,
    this.max_lazy_match = 0,
    this.level = 0,
    this.strategy = 0,
    this.good_match = 0,
    this.nice_match = 0,
    this.dyn_ltree = new Uint16Array(1146),
    this.dyn_dtree = new Uint16Array(122),
    this.bl_tree = new Uint16Array(78),
    Pn(this.dyn_ltree),
    Pn(this.dyn_dtree),
    Pn(this.bl_tree),
    this.l_desc = null,
    this.d_desc = null,
    this.bl_desc = null,
    this.bl_count = new Uint16Array(16),
    this.heap = new Uint16Array(573),
    Pn(this.heap),
    this.heap_len = 0,
    this.heap_max = 0,
    this.depth = new Uint16Array(573),
    Pn(this.depth),
    this.sym_buf = 0,
    this.lit_bufsize = 0,
    this.sym_next = 0,
    this.sym_end = 0,
    this.opt_len = 0,
    this.static_len = 0,
    this.matches = 0,
    this.insert = 0,
    this.bi_buf = 0,
    this.bi_valid = 0
}
const to = e=>{
    if (!e)
        return 1;
    const t = e.state;
    return !t || t.strm !== e || t.status !== Dn && 57 !== t.status && 69 !== t.status && 73 !== t.status && 91 !== t.status && 103 !== t.status && t.status !== zn && t.status !== Mn ? 1 : 0
}
  , io = e=>{
    if (to(e))
        return Nn(e, vn);
    e.total_in = e.total_out = 0,
    e.data_type = Cn;
    const t = e.state;
    return t.pending = 0,
    t.pending_out = 0,
    t.wrap < 0 && (t.wrap = -t.wrap),
    t.status = 2 === t.wrap ? 57 : t.wrap ? Dn : zn,
    e.adler = 2 === t.wrap ? 0 : 1,
    t.last_flush = -2,
    ln(t),
    xn
}
  , no = e=>{
    const t = io(e);
    return t === xn && (e=>{
        e.window_size = 2 * e.w_size,
        Pn(e.head),
        e.max_lazy_match = Jn[e.level].max_lazy,
        e.good_match = Jn[e.level].good_length,
        e.nice_match = Jn[e.level].nice_length,
        e.max_chain_length = Jn[e.level].max_chain,
        e.strstart = 0,
        e.block_start = 0,
        e.lookahead = 0,
        e.insert = 0,
        e.match_length = e.prev_length = 2,
        e.match_available = 0,
        e.ins_h = 0
    }
    )(e.state),
    t
}
  , oo = (e,t,i,n,o,r)=>{
    if (!e)
        return vn;
    let a = 1;
    if (t === En && (t = 6),
    n < 0 ? (a = 0,
    n = -n) : n > 15 && (a = 2,
    n -= 16),
    o < 1 || o > 9 || i !== On || n < 8 || n > 15 || t < 0 || t > 9 || r < 0 || r > Rn || 8 === n && 1 !== a)
        return Nn(e, vn);
    8 === n && (n = 9);
    const d = new eo;
    return e.state = d,
    d.strm = e,
    d.status = Dn,
    d.wrap = a,
    d.gzhead = null,
    d.w_bits = n,
    d.w_size = 1 << d.w_bits,
    d.w_mask = d.w_size - 1,
    d.hash_bits = o + 7,
    d.hash_size = 1 << d.hash_bits,
    d.hash_mask = d.hash_size - 1,
    d.hash_shift = ~~((d.hash_bits + 3 - 1) / 3),
    d.window = new Uint8Array(2 * d.w_size),
    d.head = new Uint16Array(d.hash_size),
    d.prev = new Uint16Array(d.w_size),
    d.lit_bufsize = 1 << o + 6,
    d.pending_buf_size = 4 * d.lit_bufsize,
    d.pending_buf = new Uint8Array(d.pending_buf_size),
    d.sym_buf = d.lit_bufsize,
    d.sym_end = 3 * (d.lit_bufsize - 1),
    d.level = t,
    d.strategy = r,
    d.method = i,
    no(e)
}
;
var ro = (e,t)=>{
    if (to(e) || t > bn || t < 0)
        return e ? Nn(e, vn) : vn;
    const i = e.state;
    if (!e.output || 0 !== e.avail_in && !e.input || i.status === Mn && t !== _n)
        return Nn(e, 0 === e.avail_out ? kn : vn);
    const n = i.last_flush;
    if (i.last_flush = t,
    0 !== i.pending) {
        if (Hn(e),
        0 === e.avail_out)
            return i.last_flush = -1,
            xn
    } else if (0 === e.avail_in && Bn(t) <= Bn(n) && t !== _n)
        return Nn(e, kn);
    if (i.status === Mn && 0 !== e.avail_in)
        return Nn(e, kn);
    if (i.status === Dn && 0 === i.wrap && (i.status = zn),
    i.status === Dn) {
        let t = On + (i.w_bits - 8 << 4) << 8
          , n = -1;
        if (n = i.strategy >= An || i.level < 2 ? 0 : i.level < 6 ? 1 : 6 === i.level ? 2 : 3,
        t |= n << 6,
        0 !== i.strstart && (t |= 32),
        t += 31 - t % 31,
        Gn(i, t),
        0 !== i.strstart && (Gn(i, e.adler >>> 16),
        Gn(i, 65535 & e.adler)),
        e.adler = 1,
        i.status = zn,
        Hn(e),
        0 !== i.pending)
            return i.last_flush = -1,
            xn
    }
    if (57 === i.status)
        if (e.adler = 0,
        Wn(i, 31),
        Wn(i, 139),
        Wn(i, 8),
        i.gzhead)
            Wn(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)),
            Wn(i, 255 & i.gzhead.time),
            Wn(i, i.gzhead.time >> 8 & 255),
            Wn(i, i.gzhead.time >> 16 & 255),
            Wn(i, i.gzhead.time >> 24 & 255),
            Wn(i, 9 === i.level ? 2 : i.strategy >= An || i.level < 2 ? 4 : 0),
            Wn(i, 255 & i.gzhead.os),
            i.gzhead.extra && i.gzhead.extra.length && (Wn(i, 255 & i.gzhead.extra.length),
            Wn(i, i.gzhead.extra.length >> 8 & 255)),
            i.gzhead.hcrc && (e.adler = an(e.adler, i.pending_buf, i.pending, 0)),
            i.gzindex = 0,
            i.status = 69;
        else if (Wn(i, 0),
        Wn(i, 0),
        Wn(i, 0),
        Wn(i, 0),
        Wn(i, 0),
        Wn(i, 9 === i.level ? 2 : i.strategy >= An || i.level < 2 ? 4 : 0),
        Wn(i, 3),
        i.status = zn,
        Hn(e),
        0 !== i.pending)
            return i.last_flush = -1,
            xn;
    if (69 === i.status) {
        if (i.gzhead.extra) {
            let t = i.pending
              , n = (65535 & i.gzhead.extra.length) - i.gzindex;
            for (; i.pending + n > i.pending_buf_size; ) {
                let o = i.pending_buf_size - i.pending;
                if (i.pending_buf.set(i.gzhead.extra.subarray(i.gzindex, i.gzindex + o), i.pending),
                i.pending = i.pending_buf_size,
                i.gzhead.hcrc && i.pending > t && (e.adler = an(e.adler, i.pending_buf, i.pending - t, t)),
                i.gzindex += o,
                Hn(e),
                0 !== i.pending)
                    return i.last_flush = -1,
                    xn;
                t = 0,
                n -= o
            }
            let o = new Uint8Array(i.gzhead.extra);
            i.pending_buf.set(o.subarray(i.gzindex, i.gzindex + n), i.pending),
            i.pending += n,
            i.gzhead.hcrc && i.pending > t && (e.adler = an(e.adler, i.pending_buf, i.pending - t, t)),
            i.gzindex = 0
        }
        i.status = 73
    }
    if (73 === i.status) {
        if (i.gzhead.name) {
            let t, n = i.pending;
            do {
                if (i.pending === i.pending_buf_size) {
                    if (i.gzhead.hcrc && i.pending > n && (e.adler = an(e.adler, i.pending_buf, i.pending - n, n)),
                    Hn(e),
                    0 !== i.pending)
                        return i.last_flush = -1,
                        xn;
                    n = 0
                }
                t = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0,
                Wn(i, t)
            } while (0 !== t);
            i.gzhead.hcrc && i.pending > n && (e.adler = an(e.adler, i.pending_buf, i.pending - n, n)),
            i.gzindex = 0
        }
        i.status = 91
    }
    if (91 === i.status) {
        if (i.gzhead.comment) {
            let t, n = i.pending;
            do {
                if (i.pending === i.pending_buf_size) {
                    if (i.gzhead.hcrc && i.pending > n && (e.adler = an(e.adler, i.pending_buf, i.pending - n, n)),
                    Hn(e),
                    0 !== i.pending)
                        return i.last_flush = -1,
                        xn;
                    n = 0
                }
                t = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0,
                Wn(i, t)
            } while (0 !== t);
            i.gzhead.hcrc && i.pending > n && (e.adler = an(e.adler, i.pending_buf, i.pending - n, n))
        }
        i.status = 103
    }
    if (103 === i.status) {
        if (i.gzhead.hcrc) {
            if (i.pending + 2 > i.pending_buf_size && (Hn(e),
            0 !== i.pending))
                return i.last_flush = -1,
                xn;
            Wn(i, 255 & e.adler),
            Wn(i, e.adler >> 8 & 255),
            e.adler = 0
        }
        if (i.status = zn,
        Hn(e),
        0 !== i.pending)
            return i.last_flush = -1,
            xn
    }
    if (0 !== e.avail_in || 0 !== i.lookahead || t !== un && i.status !== Mn) {
        let n = 0 === i.level ? Yn(i, t) : i.strategy === An ? ((e,t)=>{
            let i;
            for (; ; ) {
                if (0 === e.lookahead && (Zn(e),
                0 === e.lookahead)) {
                    if (t === un)
                        return 1;
                    break
                }
                if (e.match_length = 0,
                i = mn(e, 0, e.window[e.strstart]),
                e.lookahead--,
                e.strstart++,
                i && (Vn(e, !1),
                0 === e.strm.avail_out))
                    return 1
            }
            return e.insert = 0,
            t === _n ? (Vn(e, !0),
            0 === e.strm.avail_out ? 3 : 4) : e.sym_next && (Vn(e, !1),
            0 === e.strm.avail_out) ? 1 : 2
        }
        )(i, t) : i.strategy === Sn ? ((e,t)=>{
            let i, n, o, r;
            const a = e.window;
            for (; ; ) {
                if (e.lookahead <= Ln) {
                    if (Zn(e),
                    e.lookahead <= Ln && t === un)
                        return 1;
                    if (0 === e.lookahead)
                        break
                }
                if (e.match_length = 0,
                e.lookahead >= 3 && e.strstart > 0 && (o = e.strstart - 1,
                n = a[o],
                n === a[++o] && n === a[++o] && n === a[++o])) {
                    r = e.strstart + Ln;
                    do {} while (n === a[++o] && n === a[++o] && n === a[++o] && n === a[++o] && n === a[++o] && n === a[++o] && n === a[++o] && n === a[++o] && o < r);
                    e.match_length = Ln - (r - o),
                    e.match_length > e.lookahead && (e.match_length = e.lookahead)
                }
                if (e.match_length >= 3 ? (i = mn(e, 1, e.match_length - 3),
                e.lookahead -= e.match_length,
                e.strstart += e.match_length,
                e.match_length = 0) : (i = mn(e, 0, e.window[e.strstart]),
                e.lookahead--,
                e.strstart++),
                i && (Vn(e, !1),
                0 === e.strm.avail_out))
                    return 1
            }
            return e.insert = 0,
            t === _n ? (Vn(e, !0),
            0 === e.strm.avail_out ? 3 : 4) : e.sym_next && (Vn(e, !1),
            0 === e.strm.avail_out) ? 1 : 2
        }
        )(i, t) : Jn[i.level].func(i, t);
        if (3 !== n && 4 !== n || (i.status = Mn),
        1 === n || 3 === n)
            return 0 === e.avail_out && (i.last_flush = -1),
            xn;
        if (2 === n && (t === fn ? pn(i) : t !== bn && (cn(i, 0, 0, !1),
        t === gn && (Pn(i.head),
        0 === i.lookahead && (i.strstart = 0,
        i.block_start = 0,
        i.insert = 0))),
        Hn(e),
        0 === e.avail_out))
            return i.last_flush = -1,
            xn
    }
    return t !== _n ? xn : i.wrap <= 0 ? yn : (2 === i.wrap ? (Wn(i, 255 & e.adler),
    Wn(i, e.adler >> 8 & 255),
    Wn(i, e.adler >> 16 & 255),
    Wn(i, e.adler >> 24 & 255),
    Wn(i, 255 & e.total_in),
    Wn(i, e.total_in >> 8 & 255),
    Wn(i, e.total_in >> 16 & 255),
    Wn(i, e.total_in >> 24 & 255)) : (Gn(i, e.adler >>> 16),
    Gn(i, 65535 & e.adler)),
    Hn(e),
    i.wrap > 0 && (i.wrap = -i.wrap),
    0 !== i.pending ? xn : yn)
}
  , ao = (e,t)=>{
    let i = t.length;
    if (to(e))
        return vn;
    const n = e.state
      , o = n.wrap;
    if (2 === o || 1 === o && n.status !== Dn || n.lookahead)
        return vn;
    if (1 === o && (e.adler = on(e.adler, t, i, 0)),
    n.wrap = 0,
    i >= n.w_size) {
        0 === o && (Pn(n.head),
        n.strstart = 0,
        n.block_start = 0,
        n.insert = 0);
        let e = new Uint8Array(n.w_size);
        e.set(t.subarray(i - n.w_size, i), 0),
        t = e,
        i = n.w_size
    }
    const r = e.avail_in
      , a = e.next_in
      , d = e.input;
    for (e.avail_in = i,
    e.next_in = 0,
    e.input = t,
    Zn(n); n.lookahead >= 3; ) {
        let e = n.strstart
          , t = n.lookahead - 2;
        do {
            n.ins_h = $n(n, n.ins_h, n.window[e + 3 - 1]),
            n.prev[e & n.w_mask] = n.head[n.ins_h],
            n.head[n.ins_h] = e,
            e++
        } while (--t);
        n.strstart = e,
        n.lookahead = 2,
        Zn(n)
    }
    return n.strstart += n.lookahead,
    n.block_start = n.strstart,
    n.insert = n.lookahead,
    n.lookahead = 0,
    n.match_length = n.prev_length = 2,
    n.match_available = 0,
    e.next_in = a,
    e.input = d,
    e.avail_in = r,
    n.wrap = o,
    xn
}
  , so = {
    deflateInit: (e,t)=>oo(e, t, On, 15, 8, Tn),
    deflateInit2: oo,
    deflateReset: no,
    deflateResetKeep: io,
    deflateSetHeader: (e,t)=>to(e) || 2 !== e.state.wrap ? vn : (e.state.gzhead = t,
    xn),
    deflate: ro,
    deflateEnd: e=>{
        if (to(e))
            return vn;
        const t = e.state.status;
        return e.state = null,
        t === zn ? Nn(e, wn) : xn
    }
    ,
    deflateSetDictionary: ao,
    deflateInfo: "pako deflate (from Nodeca project)"
};
const lo = (e,t)=>Object.prototype.hasOwnProperty.call(e, t);
var co = {
    assign: function(e) {
        const t = Array.prototype.slice.call(arguments, 1);
        for (; t.length; ) {
            const i = t.shift();
            if (i) {
                if ("object" != typeof i)
                    throw new TypeError(i + "must be non-object");
                for (const t in i)
                    lo(i, t) && (e[t] = i[t])
            }
        }
        return e
    },
    flattenChunks: e=>{
        let t = 0;
        for (let i = 0, n = e.length; i < n; i++)
            t += e[i].length;
        const i = new Uint8Array(t);
        for (let t = 0, n = 0, o = e.length; t < o; t++) {
            let o = e[t];
            i.set(o, n),
            n += o.length
        }
        return i
    }
};
let ho = !0;
try {
    String.fromCharCode.apply(null, new Uint8Array(1))
} catch (e) {
    ho = !1
}
const mo = new Uint8Array(256);
for (let e = 0; e < 256; e++)
    mo[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1;
mo[254] = mo[254] = 1;
var po = {
    string2buf: e=>{
        if ("function" == typeof TextEncoder && TextEncoder.prototype.encode)
            return (new TextEncoder).encode(e);
        let t, i, n, o, r, a = e.length, d = 0;
        for (o = 0; o < a; o++)
            i = e.charCodeAt(o),
            55296 == (64512 & i) && o + 1 < a && (n = e.charCodeAt(o + 1),
            56320 == (64512 & n) && (i = 65536 + (i - 55296 << 10) + (n - 56320),
            o++)),
            d += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4;
        for (t = new Uint8Array(d),
        r = 0,
        o = 0; r < d; o++)
            i = e.charCodeAt(o),
            55296 == (64512 & i) && o + 1 < a && (n = e.charCodeAt(o + 1),
            56320 == (64512 & n) && (i = 65536 + (i - 55296 << 10) + (n - 56320),
            o++)),
            i < 128 ? t[r++] = i : i < 2048 ? (t[r++] = 192 | i >>> 6,
            t[r++] = 128 | 63 & i) : i < 65536 ? (t[r++] = 224 | i >>> 12,
            t[r++] = 128 | i >>> 6 & 63,
            t[r++] = 128 | 63 & i) : (t[r++] = 240 | i >>> 18,
            t[r++] = 128 | i >>> 12 & 63,
            t[r++] = 128 | i >>> 6 & 63,
            t[r++] = 128 | 63 & i);
        return t
    }
    ,
    buf2string: (e,t)=>{
        const i = t || e.length;
        if ("function" == typeof TextDecoder && TextDecoder.prototype.decode)
            return (new TextDecoder).decode(e.subarray(0, t));
        let n, o;
        const r = new Array(2 * i);
        for (o = 0,
        n = 0; n < i; ) {
            let t = e[n++];
            if (t < 128) {
                r[o++] = t;
                continue
            }
            let a = mo[t];
            if (a > 4)
                r[o++] = 65533,
                n += a - 1;
            else {
                for (t &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && n < i; )
                    t = t << 6 | 63 & e[n++],
                    a--;
                a > 1 ? r[o++] = 65533 : t < 65536 ? r[o++] = t : (t -= 65536,
                r[o++] = 55296 | t >> 10 & 1023,
                r[o++] = 56320 | 1023 & t)
            }
        }
        return ((e,t)=>{
            if (t < 65534 && e.subarray && ho)
                return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t));
            let i = "";
            for (let n = 0; n < t; n++)
                i += String.fromCharCode(e[n]);
            return i
        }
        )(r, o)
    }
    ,
    utf8border: (e,t)=>{
        (t = t || e.length) > e.length && (t = e.length);
        let i = t - 1;
        for (; i >= 0 && 128 == (192 & e[i]); )
            i--;
        return i < 0 || 0 === i ? t : i + mo[e[i]] > t ? i : t
    }
};
var uo = function() {
    this.input = null,
    this.next_in = 0,
    this.avail_in = 0,
    this.total_in = 0,
    this.output = null,
    this.next_out = 0,
    this.avail_out = 0,
    this.total_out = 0,
    this.msg = "",
    this.state = null,
    this.data_type = 2,
    this.adler = 0
};
const fo = Object.prototype.toString
  , {Z_NO_FLUSH: go, Z_SYNC_FLUSH: _o, Z_FULL_FLUSH: bo, Z_FINISH: xo, Z_OK: yo, Z_STREAM_END: vo, Z_DEFAULT_COMPRESSION: wo, Z_DEFAULT_STRATEGY: ko, Z_DEFLATED: Eo} = sn;
function Io(e) {
    this.options = co.assign({
        level: wo,
        method: Eo,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: ko
    }, e || {});
    let t = this.options;
    t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16),
    this.err = 0,
    this.msg = "",
    this.ended = !1,
    this.chunks = [],
    this.strm = new uo,
    this.strm.avail_out = 0;
    let i = so.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
    if (i !== yo)
        throw new Error(dn[i]);
    if (t.header && so.deflateSetHeader(this.strm, t.header),
    t.dictionary) {
        let e;
        if (e = "string" == typeof t.dictionary ? po.string2buf(t.dictionary) : "[object ArrayBuffer]" === fo.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary,
        i = so.deflateSetDictionary(this.strm, e),
        i !== yo)
            throw new Error(dn[i]);
        this._dict_set = !0
    }
}
function Ao(e, t) {
    const i = new Io(t);
    if (i.push(e, !0),
    i.err)
        throw i.msg || dn[i.err];
    return i.result
}
Io.prototype.push = function(e, t) {
    const i = this.strm
      , n = this.options.chunkSize;
    let o, r;
    if (this.ended)
        return !1;
    for (r = t === ~~t ? t : !0 === t ? xo : go,
    "string" == typeof e ? i.input = po.string2buf(e) : "[object ArrayBuffer]" === fo.call(e) ? i.input = new Uint8Array(e) : i.input = e,
    i.next_in = 0,
    i.avail_in = i.input.length; ; )
        if (0 === i.avail_out && (i.output = new Uint8Array(n),
        i.next_out = 0,
        i.avail_out = n),
        (r === _o || r === bo) && i.avail_out <= 6)
            this.onData(i.output.subarray(0, i.next_out)),
            i.avail_out = 0;
        else {
            if (o = so.deflate(i, r),
            o === vo)
                return i.next_out > 0 && this.onData(i.output.subarray(0, i.next_out)),
                o = so.deflateEnd(this.strm),
                this.onEnd(o),
                this.ended = !0,
                o === yo;
            if (0 !== i.avail_out) {
                if (r > 0 && i.next_out > 0)
                    this.onData(i.output.subarray(0, i.next_out)),
                    i.avail_out = 0;
                else if (0 === i.avail_in)
                    break
            } else
                this.onData(i.output)
        }
    return !0
}
,
Io.prototype.onData = function(e) {
    this.chunks.push(e)
}
,
Io.prototype.onEnd = function(e) {
    e === yo && (this.result = co.flattenChunks(this.chunks)),
    this.chunks = [],
    this.err = e,
    this.msg = this.strm.msg
}
;
var So = {
    Deflate: Io,
    deflate: Ao,
    deflateRaw: function(e, t) {
        return (t = t || {}).raw = !0,
        Ao(e, t)
    },
    gzip: function(e, t) {
        return (t = t || {}).gzip = !0,
        Ao(e, t)
    },
    constants: sn
};
const Ro = 16209;
var To = function(e, t) {
    let i, n, o, r, a, d, s, l, c, h, m, p, u, f, g, _, b, x, y, v, w, k, E, I;
    const A = e.state;
    i = e.next_in,
    E = e.input,
    n = i + (e.avail_in - 5),
    o = e.next_out,
    I = e.output,
    r = o - (t - e.avail_out),
    a = o + (e.avail_out - 257),
    d = A.dmax,
    s = A.wsize,
    l = A.whave,
    c = A.wnext,
    h = A.window,
    m = A.hold,
    p = A.bits,
    u = A.lencode,
    f = A.distcode,
    g = (1 << A.lenbits) - 1,
    _ = (1 << A.distbits) - 1;
    e: do {
        p < 15 && (m += E[i++] << p,
        p += 8,
        m += E[i++] << p,
        p += 8),
        b = u[m & g];
        t: for (; ; ) {
            if (x = b >>> 24,
            m >>>= x,
            p -= x,
            x = b >>> 16 & 255,
            0 === x)
                I[o++] = 65535 & b;
            else {
                if (!(16 & x)) {
                    if (0 == (64 & x)) {
                        b = u[(65535 & b) + (m & (1 << x) - 1)];
                        continue t
                    }
                    if (32 & x) {
                        A.mode = 16191;
                        break e
                    }
                    e.msg = "invalid literal/length code",
                    A.mode = Ro;
                    break e
                }
                y = 65535 & b,
                x &= 15,
                x && (p < x && (m += E[i++] << p,
                p += 8),
                y += m & (1 << x) - 1,
                m >>>= x,
                p -= x),
                p < 15 && (m += E[i++] << p,
                p += 8,
                m += E[i++] << p,
                p += 8),
                b = f[m & _];
                i: for (; ; ) {
                    if (x = b >>> 24,
                    m >>>= x,
                    p -= x,
                    x = b >>> 16 & 255,
                    !(16 & x)) {
                        if (0 == (64 & x)) {
                            b = f[(65535 & b) + (m & (1 << x) - 1)];
                            continue i
                        }
                        e.msg = "invalid distance code",
                        A.mode = Ro;
                        break e
                    }
                    if (v = 65535 & b,
                    x &= 15,
                    p < x && (m += E[i++] << p,
                    p += 8,
                    p < x && (m += E[i++] << p,
                    p += 8)),
                    v += m & (1 << x) - 1,
                    v > d) {
                        e.msg = "invalid distance too far back",
                        A.mode = Ro;
                        break e
                    }
                    if (m >>>= x,
                    p -= x,
                    x = o - r,
                    v > x) {
                        if (x = v - x,
                        x > l && A.sane) {
                            e.msg = "invalid distance too far back",
                            A.mode = Ro;
                            break e
                        }
                        if (w = 0,
                        k = h,
                        0 === c) {
                            if (w += s - x,
                            x < y) {
                                y -= x;
                                do {
                                    I[o++] = h[w++]
                                } while (--x);
                                w = o - v,
                                k = I
                            }
                        } else if (c < x) {
                            if (w += s + c - x,
                            x -= c,
                            x < y) {
                                y -= x;
                                do {
                                    I[o++] = h[w++]
                                } while (--x);
                                if (w = 0,
                                c < y) {
                                    x = c,
                                    y -= x;
                                    do {
                                        I[o++] = h[w++]
                                    } while (--x);
                                    w = o - v,
                                    k = I
                                }
                            }
                        } else if (w += c - x,
                        x < y) {
                            y -= x;
                            do {
                                I[o++] = h[w++]
                            } while (--x);
                            w = o - v,
                            k = I
                        }
                        for (; y > 2; )
                            I[o++] = k[w++],
                            I[o++] = k[w++],
                            I[o++] = k[w++],
                            y -= 3;
                        y && (I[o++] = k[w++],
                        y > 1 && (I[o++] = k[w++]))
                    } else {
                        w = o - v;
                        do {
                            I[o++] = I[w++],
                            I[o++] = I[w++],
                            I[o++] = I[w++],
                            y -= 3
                        } while (y > 2);
                        y && (I[o++] = I[w++],
                        y > 1 && (I[o++] = I[w++]))
                    }
                    break
                }
            }
            break
        }
    } while (i < n && o < a);
    y = p >> 3,
    i -= y,
    p -= y << 3,
    m &= (1 << p) - 1,
    e.next_in = i,
    e.next_out = o,
    e.avail_in = i < n ? n - i + 5 : 5 - (i - n),
    e.avail_out = o < a ? a - o + 257 : 257 - (o - a),
    A.hold = m,
    A.bits = p
};
const Co = 15
  , Oo = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0])
  , Lo = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78])
  , Fo = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0])
  , Do = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]);
var zo = (e,t,i,n,o,r,a,d)=>{
    const s = d.bits;
    let l, c, h, m, p, u, f = 0, g = 0, _ = 0, b = 0, x = 0, y = 0, v = 0, w = 0, k = 0, E = 0, I = null;
    const A = new Uint16Array(16)
      , S = new Uint16Array(16);
    let R, T, C, O = null;
    for (f = 0; f <= Co; f++)
        A[f] = 0;
    for (g = 0; g < n; g++)
        A[t[i + g]]++;
    for (x = s,
    b = Co; b >= 1 && 0 === A[b]; b--)
        ;
    if (x > b && (x = b),
    0 === b)
        return o[r++] = 20971520,
        o[r++] = 20971520,
        d.bits = 1,
        0;
    for (_ = 1; _ < b && 0 === A[_]; _++)
        ;
    for (x < _ && (x = _),
    w = 1,
    f = 1; f <= Co; f++)
        if (w <<= 1,
        w -= A[f],
        w < 0)
            return -1;
    if (w > 0 && (0 === e || 1 !== b))
        return -1;
    for (S[1] = 0,
    f = 1; f < Co; f++)
        S[f + 1] = S[f] + A[f];
    for (g = 0; g < n; g++)
        0 !== t[i + g] && (a[S[t[i + g]]++] = g);
    if (0 === e ? (I = O = a,
    u = 20) : 1 === e ? (I = Oo,
    O = Lo,
    u = 257) : (I = Fo,
    O = Do,
    u = 0),
    E = 0,
    g = 0,
    f = _,
    p = r,
    y = x,
    v = 0,
    h = -1,
    k = 1 << x,
    m = k - 1,
    1 === e && k > 852 || 2 === e && k > 592)
        return 1;
    for (; ; ) {
        R = f - v,
        a[g] + 1 < u ? (T = 0,
        C = a[g]) : a[g] >= u ? (T = O[a[g] - u],
        C = I[a[g] - u]) : (T = 96,
        C = 0),
        l = 1 << f - v,
        c = 1 << y,
        _ = c;
        do {
            c -= l,
            o[p + (E >> v) + c] = R << 24 | T << 16 | C | 0
        } while (0 !== c);
        for (l = 1 << f - 1; E & l; )
            l >>= 1;
        if (0 !== l ? (E &= l - 1,
        E += l) : E = 0,
        g++,
        0 == --A[f]) {
            if (f === b)
                break;
            f = t[i + a[g]]
        }
        if (f > x && (E & m) !== h) {
            for (0 === v && (v = x),
            p += _,
            y = f - v,
            w = 1 << y; y + v < b && (w -= A[y + v],
            !(w <= 0)); )
                y++,
                w <<= 1;
            if (k += 1 << y,
            1 === e && k > 852 || 2 === e && k > 592)
                return 1;
            h = E & m,
            o[h] = x << 24 | y << 16 | p - r | 0
        }
    }
    return 0 !== E && (o[p + E] = f - v << 24 | 64 << 16 | 0),
    d.bits = x,
    0
}
;
const {Z_FINISH: Mo, Z_BLOCK: No, Z_TREES: Bo, Z_OK: Po, Z_STREAM_END: Uo, Z_NEED_DICT: $o, Z_STREAM_ERROR: Ho, Z_DATA_ERROR: Vo, Z_MEM_ERROR: Wo, Z_BUF_ERROR: Go, Z_DEFLATED: Xo} = sn
  , qo = 16180
  , Zo = 16190
  , Yo = 16191
  , jo = 16192
  , Ko = 16194
  , Qo = 16199
  , Jo = 16200
  , er = 16206
  , tr = 16209
  , ir = e=>(e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
function nr() {
    this.strm = null,
    this.mode = 0,
    this.last = !1,
    this.wrap = 0,
    this.havedict = !1,
    this.flags = 0,
    this.dmax = 0,
    this.check = 0,
    this.total = 0,
    this.head = null,
    this.wbits = 0,
    this.wsize = 0,
    this.whave = 0,
    this.wnext = 0,
    this.window = null,
    this.hold = 0,
    this.bits = 0,
    this.length = 0,
    this.offset = 0,
    this.extra = 0,
    this.lencode = null,
    this.distcode = null,
    this.lenbits = 0,
    this.distbits = 0,
    this.ncode = 0,
    this.nlen = 0,
    this.ndist = 0,
    this.have = 0,
    this.next = null,
    this.lens = new Uint16Array(320),
    this.work = new Uint16Array(288),
    this.lendyn = null,
    this.distdyn = null,
    this.sane = 0,
    this.back = 0,
    this.was = 0
}
const or = e=>{
    if (!e)
        return 1;
    const t = e.state;
    return !t || t.strm !== e || t.mode < qo || t.mode > 16211 ? 1 : 0
}
  , rr = e=>{
    if (or(e))
        return Ho;
    const t = e.state;
    return e.total_in = e.total_out = t.total = 0,
    e.msg = "",
    t.wrap && (e.adler = 1 & t.wrap),
    t.mode = qo,
    t.last = 0,
    t.havedict = 0,
    t.flags = -1,
    t.dmax = 32768,
    t.head = null,
    t.hold = 0,
    t.bits = 0,
    t.lencode = t.lendyn = new Int32Array(852),
    t.distcode = t.distdyn = new Int32Array(592),
    t.sane = 1,
    t.back = -1,
    Po
}
  , ar = e=>{
    if (or(e))
        return Ho;
    const t = e.state;
    return t.wsize = 0,
    t.whave = 0,
    t.wnext = 0,
    rr(e)
}
  , dr = (e,t)=>{
    let i;
    if (or(e))
        return Ho;
    const n = e.state;
    return t < 0 ? (i = 0,
    t = -t) : (i = 5 + (t >> 4),
    t < 48 && (t &= 15)),
    t && (t < 8 || t > 15) ? Ho : (null !== n.window && n.wbits !== t && (n.window = null),
    n.wrap = i,
    n.wbits = t,
    ar(e))
}
  , sr = (e,t)=>{
    if (!e)
        return Ho;
    const i = new nr;
    e.state = i,
    i.strm = e,
    i.window = null,
    i.mode = qo;
    const n = dr(e, t);
    return n !== Po && (e.state = null),
    n
}
;
let lr, cr, hr = !0;
const mr = e=>{
    if (hr) {
        lr = new Int32Array(512),
        cr = new Int32Array(32);
        let t = 0;
        for (; t < 144; )
            e.lens[t++] = 8;
        for (; t < 256; )
            e.lens[t++] = 9;
        for (; t < 280; )
            e.lens[t++] = 7;
        for (; t < 288; )
            e.lens[t++] = 8;
        for (zo(1, e.lens, 0, 288, lr, 0, e.work, {
            bits: 9
        }),
        t = 0; t < 32; )
            e.lens[t++] = 5;
        zo(2, e.lens, 0, 32, cr, 0, e.work, {
            bits: 5
        }),
        hr = !1
    }
    e.lencode = lr,
    e.lenbits = 9,
    e.distcode = cr,
    e.distbits = 5
}
  , pr = (e,t,i,n)=>{
    let o;
    const r = e.state;
    return null === r.window && (r.wsize = 1 << r.wbits,
    r.wnext = 0,
    r.whave = 0,
    r.window = new Uint8Array(r.wsize)),
    n >= r.wsize ? (r.window.set(t.subarray(i - r.wsize, i), 0),
    r.wnext = 0,
    r.whave = r.wsize) : (o = r.wsize - r.wnext,
    o > n && (o = n),
    r.window.set(t.subarray(i - n, i - n + o), r.wnext),
    (n -= o) ? (r.window.set(t.subarray(i - n, i), 0),
    r.wnext = n,
    r.whave = r.wsize) : (r.wnext += o,
    r.wnext === r.wsize && (r.wnext = 0),
    r.whave < r.wsize && (r.whave += o))),
    0
}
;
var ur = (e,t)=>{
    let i, n, o, r, a, d, s, l, c, h, m, p, u, f, g, _, b, x, y, v, w, k, E = 0;
    const I = new Uint8Array(4);
    let A, S;
    const R = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    if (or(e) || !e.output || !e.input && 0 !== e.avail_in)
        return Ho;
    i = e.state,
    i.mode === Yo && (i.mode = jo),
    a = e.next_out,
    o = e.output,
    s = e.avail_out,
    r = e.next_in,
    n = e.input,
    d = e.avail_in,
    l = i.hold,
    c = i.bits,
    h = d,
    m = s,
    k = Po;
    e: for (; ; )
        switch (i.mode) {
        case qo:
            if (0 === i.wrap) {
                i.mode = jo;
                break
            }
            for (; c < 16; ) {
                if (0 === d)
                    break e;
                d--,
                l += n[r++] << c,
                c += 8
            }
            if (2 & i.wrap && 35615 === l) {
                0 === i.wbits && (i.wbits = 15),
                i.check = 0,
                I[0] = 255 & l,
                I[1] = l >>> 8 & 255,
                i.check = an(i.check, I, 2, 0),
                l = 0,
                c = 0,
                i.mode = 16181;
                break
            }
            if (i.head && (i.head.done = !1),
            !(1 & i.wrap) || (((255 & l) << 8) + (l >> 8)) % 31) {
                e.msg = "incorrect header check",
                i.mode = tr;
                break
            }
            if ((15 & l) !== Xo) {
                e.msg = "unknown compression method",
                i.mode = tr;
                break
            }
            if (l >>>= 4,
            c -= 4,
            w = 8 + (15 & l),
            0 === i.wbits && (i.wbits = w),
            w > 15 || w > i.wbits) {
                e.msg = "invalid window size",
                i.mode = tr;
                break
            }
            i.dmax = 1 << i.wbits,
            i.flags = 0,
            e.adler = i.check = 1,
            i.mode = 512 & l ? 16189 : Yo,
            l = 0,
            c = 0;
            break;
        case 16181:
            for (; c < 16; ) {
                if (0 === d)
                    break e;
                d--,
                l += n[r++] << c,
                c += 8
            }
            if (i.flags = l,
            (255 & i.flags) !== Xo) {
                e.msg = "unknown compression method",
                i.mode = tr;
                break
            }
            if (57344 & i.flags) {
                e.msg = "unknown header flags set",
                i.mode = tr;
                break
            }
            i.head && (i.head.text = l >> 8 & 1),
            512 & i.flags && 4 & i.wrap && (I[0] = 255 & l,
            I[1] = l >>> 8 & 255,
            i.check = an(i.check, I, 2, 0)),
            l = 0,
            c = 0,
            i.mode = 16182;
        case 16182:
            for (; c < 32; ) {
                if (0 === d)
                    break e;
                d--,
                l += n[r++] << c,
                c += 8
            }
            i.head && (i.head.time = l),
            512 & i.flags && 4 & i.wrap && (I[0] = 255 & l,
            I[1] = l >>> 8 & 255,
            I[2] = l >>> 16 & 255,
            I[3] = l >>> 24 & 255,
            i.check = an(i.check, I, 4, 0)),
            l = 0,
            c = 0,
            i.mode = 16183;
        case 16183:
            for (; c < 16; ) {
                if (0 === d)
                    break e;
                d--,
                l += n[r++] << c,
                c += 8
            }
            i.head && (i.head.xflags = 255 & l,
            i.head.os = l >> 8),
            512 & i.flags && 4 & i.wrap && (I[0] = 255 & l,
            I[1] = l >>> 8 & 255,
            i.check = an(i.check, I, 2, 0)),
            l = 0,
            c = 0,
            i.mode = 16184;
        case 16184:
            if (1024 & i.flags) {
                for (; c < 16; ) {
                    if (0 === d)
                        break e;
                    d--,
                    l += n[r++] << c,
                    c += 8
                }
                i.length = l,
                i.head && (i.head.extra_len = l),
                512 & i.flags && 4 & i.wrap && (I[0] = 255 & l,
                I[1] = l >>> 8 & 255,
                i.check = an(i.check, I, 2, 0)),
                l = 0,
                c = 0
            } else
                i.head && (i.head.extra = null);
            i.mode = 16185;
        case 16185:
            if (1024 & i.flags && (p = i.length,
            p > d && (p = d),
            p && (i.head && (w = i.head.extra_len - i.length,
            i.head.extra || (i.head.extra = new Uint8Array(i.head.extra_len)),
            i.head.extra.set(n.subarray(r, r + p), w)),
            512 & i.flags && 4 & i.wrap && (i.check = an(i.check, n, p, r)),
            d -= p,
            r += p,
            i.length -= p),
            i.length))
                break e;
            i.length = 0,
            i.mode = 16186;
        case 16186:
            if (2048 & i.flags) {
                if (0 === d)
                    break e;
                p = 0;
                do {
                    w = n[r + p++],
                    i.head && w && i.length < 65536 && (i.head.name += String.fromCharCode(w))
                } while (w && p < d);
                if (512 & i.flags && 4 & i.wrap && (i.check = an(i.check, n, p, r)),
                d -= p,
                r += p,
                w)
                    break e
            } else
                i.head && (i.head.name = null);
            i.length = 0,
            i.mode = 16187;
        case 16187:
            if (4096 & i.flags) {
                if (0 === d)
                    break e;
                p = 0;
                do {
                    w = n[r + p++],
                    i.head && w && i.length < 65536 && (i.head.comment += String.fromCharCode(w))
                } while (w && p < d);
                if (512 & i.flags && 4 & i.wrap && (i.check = an(i.check, n, p, r)),
                d -= p,
                r += p,
                w)
                    break e
            } else
                i.head && (i.head.comment = null);
            i.mode = 16188;
        case 16188:
            if (512 & i.flags) {
                for (; c < 16; ) {
                    if (0 === d)
                        break e;
                    d--,
                    l += n[r++] << c,
                    c += 8
                }
                if (4 & i.wrap && l !== (65535 & i.check)) {
                    e.msg = "header crc mismatch",
                    i.mode = tr;
                    break
                }
                l = 0,
                c = 0
            }
            i.head && (i.head.hcrc = i.flags >> 9 & 1,
            i.head.done = !0),
            e.adler = i.check = 0,
            i.mode = Yo;
            break;
        case 16189:
            for (; c < 32; ) {
                if (0 === d)
                    break e;
                d--,
                l += n[r++] << c,
                c += 8
            }
            e.adler = i.check = ir(l),
            l = 0,
            c = 0,
            i.mode = Zo;
        case Zo:
            if (0 === i.havedict)
                return e.next_out = a,
                e.avail_out = s,
                e.next_in = r,
                e.avail_in = d,
                i.hold = l,
                i.bits = c,
                $o;
            e.adler = i.check = 1,
            i.mode = Yo;
        case Yo:
            if (t === No || t === Bo)
                break e;
        case jo:
            if (i.last) {
                l >>>= 7 & c,
                c -= 7 & c,
                i.mode = er;
                break
            }
            for (; c < 3; ) {
                if (0 === d)
                    break e;
                d--,
                l += n[r++] << c,
                c += 8
            }
            switch (i.last = 1 & l,
            l >>>= 1,
            c -= 1,
            3 & l) {
            case 0:
                i.mode = 16193;
                break;
            case 1:
                if (mr(i),
                i.mode = Qo,
                t === Bo) {
                    l >>>= 2,
                    c -= 2;
                    break e
                }
                break;
            case 2:
                i.mode = 16196;
                break;
            case 3:
                e.msg = "invalid block type",
                i.mode = tr
            }
            l >>>= 2,
            c -= 2;
            break;
        case 16193:
            for (l >>>= 7 & c,
            c -= 7 & c; c < 32; ) {
                if (0 === d)
                    break e;
                d--,
                l += n[r++] << c,
                c += 8
            }
            if ((65535 & l) != (l >>> 16 ^ 65535)) {
                e.msg = "invalid stored block lengths",
                i.mode = tr;
                break
            }
            if (i.length = 65535 & l,
            l = 0,
            c = 0,
            i.mode = Ko,
            t === Bo)
                break e;
        case Ko:
            i.mode = 16195;
        case 16195:
            if (p = i.length,
            p) {
                if (p > d && (p = d),
                p > s && (p = s),
                0 === p)
                    break e;
                o.set(n.subarray(r, r + p), a),
                d -= p,
                r += p,
                s -= p,
                a += p,
                i.length -= p;
                break
            }
            i.mode = Yo;
            break;
        case 16196:
            for (; c < 14; ) {
                if (0 === d)
                    break e;
                d--,
                l += n[r++] << c,
                c += 8
            }
            if (i.nlen = 257 + (31 & l),
            l >>>= 5,
            c -= 5,
            i.ndist = 1 + (31 & l),
            l >>>= 5,
            c -= 5,
            i.ncode = 4 + (15 & l),
            l >>>= 4,
            c -= 4,
            i.nlen > 286 || i.ndist > 30) {
                e.msg = "too many length or distance symbols",
                i.mode = tr;
                break
            }
            i.have = 0,
            i.mode = 16197;
        case 16197:
            for (; i.have < i.ncode; ) {
                for (; c < 3; ) {
                    if (0 === d)
                        break e;
                    d--,
                    l += n[r++] << c,
                    c += 8
                }
                i.lens[R[i.have++]] = 7 & l,
                l >>>= 3,
                c -= 3
            }
            for (; i.have < 19; )
                i.lens[R[i.have++]] = 0;
            if (i.lencode = i.lendyn,
            i.lenbits = 7,
            A = {
                bits: i.lenbits
            },
            k = zo(0, i.lens, 0, 19, i.lencode, 0, i.work, A),
            i.lenbits = A.bits,
            k) {
                e.msg = "invalid code lengths set",
                i.mode = tr;
                break
            }
            i.have = 0,
            i.mode = 16198;
        case 16198:
            for (; i.have < i.nlen + i.ndist; ) {
                for (; E = i.lencode[l & (1 << i.lenbits) - 1],
                g = E >>> 24,
                _ = E >>> 16 & 255,
                b = 65535 & E,
                !(g <= c); ) {
                    if (0 === d)
                        break e;
                    d--,
                    l += n[r++] << c,
                    c += 8
                }
                if (b < 16)
                    l >>>= g,
                    c -= g,
                    i.lens[i.have++] = b;
                else {
                    if (16 === b) {
                        for (S = g + 2; c < S; ) {
                            if (0 === d)
                                break e;
                            d--,
                            l += n[r++] << c,
                            c += 8
                        }
                        if (l >>>= g,
                        c -= g,
                        0 === i.have) {
                            e.msg = "invalid bit length repeat",
                            i.mode = tr;
                            break
                        }
                        w = i.lens[i.have - 1],
                        p = 3 + (3 & l),
                        l >>>= 2,
                        c -= 2
                    } else if (17 === b) {
                        for (S = g + 3; c < S; ) {
                            if (0 === d)
                                break e;
                            d--,
                            l += n[r++] << c,
                            c += 8
                        }
                        l >>>= g,
                        c -= g,
                        w = 0,
                        p = 3 + (7 & l),
                        l >>>= 3,
                        c -= 3
                    } else {
                        for (S = g + 7; c < S; ) {
                            if (0 === d)
                                break e;
                            d--,
                            l += n[r++] << c,
                            c += 8
                        }
                        l >>>= g,
                        c -= g,
                        w = 0,
                        p = 11 + (127 & l),
                        l >>>= 7,
                        c -= 7
                    }
                    if (i.have + p > i.nlen + i.ndist) {
                        e.msg = "invalid bit length repeat",
                        i.mode = tr;
                        break
                    }
                    for (; p--; )
                        i.lens[i.have++] = w
                }
            }
            if (i.mode === tr)
                break;
            if (0 === i.lens[256]) {
                e.msg = "invalid code -- missing end-of-block",
                i.mode = tr;
                break
            }
            if (i.lenbits = 9,
            A = {
                bits: i.lenbits
            },
            k = zo(1, i.lens, 0, i.nlen, i.lencode, 0, i.work, A),
            i.lenbits = A.bits,
            k) {
                e.msg = "invalid literal/lengths set",
                i.mode = tr;
                break
            }
            if (i.distbits = 6,
            i.distcode = i.distdyn,
            A = {
                bits: i.distbits
            },
            k = zo(2, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, A),
            i.distbits = A.bits,
            k) {
                e.msg = "invalid distances set",
                i.mode = tr;
                break
            }
            if (i.mode = Qo,
            t === Bo)
                break e;
        case Qo:
            i.mode = Jo;
        case Jo:
            if (d >= 6 && s >= 258) {
                e.next_out = a,
                e.avail_out = s,
                e.next_in = r,
                e.avail_in = d,
                i.hold = l,
                i.bits = c,
                To(e, m),
                a = e.next_out,
                o = e.output,
                s = e.avail_out,
                r = e.next_in,
                n = e.input,
                d = e.avail_in,
                l = i.hold,
                c = i.bits,
                i.mode === Yo && (i.back = -1);
                break
            }
            for (i.back = 0; E = i.lencode[l & (1 << i.lenbits) - 1],
            g = E >>> 24,
            _ = E >>> 16 & 255,
            b = 65535 & E,
            !(g <= c); ) {
                if (0 === d)
                    break e;
                d--,
                l += n[r++] << c,
                c += 8
            }
            if (_ && 0 == (240 & _)) {
                for (x = g,
                y = _,
                v = b; E = i.lencode[v + ((l & (1 << x + y) - 1) >> x)],
                g = E >>> 24,
                _ = E >>> 16 & 255,
                b = 65535 & E,
                !(x + g <= c); ) {
                    if (0 === d)
                        break e;
                    d--,
                    l += n[r++] << c,
                    c += 8
                }
                l >>>= x,
                c -= x,
                i.back += x
            }
            if (l >>>= g,
            c -= g,
            i.back += g,
            i.length = b,
            0 === _) {
                i.mode = 16205;
                break
            }
            if (32 & _) {
                i.back = -1,
                i.mode = Yo;
                break
            }
            if (64 & _) {
                e.msg = "invalid literal/length code",
                i.mode = tr;
                break
            }
            i.extra = 15 & _,
            i.mode = 16201;
        case 16201:
            if (i.extra) {
                for (S = i.extra; c < S; ) {
                    if (0 === d)
                        break e;
                    d--,
                    l += n[r++] << c,
                    c += 8
                }
                i.length += l & (1 << i.extra) - 1,
                l >>>= i.extra,
                c -= i.extra,
                i.back += i.extra
            }
            i.was = i.length,
            i.mode = 16202;
        case 16202:
            for (; E = i.distcode[l & (1 << i.distbits) - 1],
            g = E >>> 24,
            _ = E >>> 16 & 255,
            b = 65535 & E,
            !(g <= c); ) {
                if (0 === d)
                    break e;
                d--,
                l += n[r++] << c,
                c += 8
            }
            if (0 == (240 & _)) {
                for (x = g,
                y = _,
                v = b; E = i.distcode[v + ((l & (1 << x + y) - 1) >> x)],
                g = E >>> 24,
                _ = E >>> 16 & 255,
                b = 65535 & E,
                !(x + g <= c); ) {
                    if (0 === d)
                        break e;
                    d--,
                    l += n[r++] << c,
                    c += 8
                }
                l >>>= x,
                c -= x,
                i.back += x
            }
            if (l >>>= g,
            c -= g,
            i.back += g,
            64 & _) {
                e.msg = "invalid distance code",
                i.mode = tr;
                break
            }
            i.offset = b,
            i.extra = 15 & _,
            i.mode = 16203;
        case 16203:
            if (i.extra) {
                for (S = i.extra; c < S; ) {
                    if (0 === d)
                        break e;
                    d--,
                    l += n[r++] << c,
                    c += 8
                }
                i.offset += l & (1 << i.extra) - 1,
                l >>>= i.extra,
                c -= i.extra,
                i.back += i.extra
            }
            if (i.offset > i.dmax) {
                e.msg = "invalid distance too far back",
                i.mode = tr;
                break
            }
            i.mode = 16204;
        case 16204:
            if (0 === s)
                break e;
            if (p = m - s,
            i.offset > p) {
                if (p = i.offset - p,
                p > i.whave && i.sane) {
                    e.msg = "invalid distance too far back",
                    i.mode = tr;
                    break
                }
                p > i.wnext ? (p -= i.wnext,
                u = i.wsize - p) : u = i.wnext - p,
                p > i.length && (p = i.length),
                f = i.window
            } else
                f = o,
                u = a - i.offset,
                p = i.length;
            p > s && (p = s),
            s -= p,
            i.length -= p;
            do {
                o[a++] = f[u++]
            } while (--p);
            0 === i.length && (i.mode = Jo);
            break;
        case 16205:
            if (0 === s)
                break e;
            o[a++] = i.length,
            s--,
            i.mode = Jo;
            break;
        case er:
            if (i.wrap) {
                for (; c < 32; ) {
                    if (0 === d)
                        break e;
                    d--,
                    l |= n[r++] << c,
                    c += 8
                }
                if (m -= s,
                e.total_out += m,
                i.total += m,
                4 & i.wrap && m && (e.adler = i.check = i.flags ? an(i.check, o, m, a - m) : on(i.check, o, m, a - m)),
                m = s,
                4 & i.wrap && (i.flags ? l : ir(l)) !== i.check) {
                    e.msg = "incorrect data check",
                    i.mode = tr;
                    break
                }
                l = 0,
                c = 0
            }
            i.mode = 16207;
        case 16207:
            if (i.wrap && i.flags) {
                for (; c < 32; ) {
                    if (0 === d)
                        break e;
                    d--,
                    l += n[r++] << c,
                    c += 8
                }
                if (4 & i.wrap && l !== (4294967295 & i.total)) {
                    e.msg = "incorrect length check",
                    i.mode = tr;
                    break
                }
                l = 0,
                c = 0
            }
            i.mode = 16208;
        case 16208:
            k = Uo;
            break e;
        case tr:
            k = Vo;
            break e;
        case 16210:
            return Wo;
        default:
            return Ho
        }
    return e.next_out = a,
    e.avail_out = s,
    e.next_in = r,
    e.avail_in = d,
    i.hold = l,
    i.bits = c,
    (i.wsize || m !== e.avail_out && i.mode < tr && (i.mode < er || t !== Mo)) && pr(e, e.output, e.next_out, m - e.avail_out),
    h -= e.avail_in,
    m -= e.avail_out,
    e.total_in += h,
    e.total_out += m,
    i.total += m,
    4 & i.wrap && m && (e.adler = i.check = i.flags ? an(i.check, o, m, e.next_out - m) : on(i.check, o, m, e.next_out - m)),
    e.data_type = i.bits + (i.last ? 64 : 0) + (i.mode === Yo ? 128 : 0) + (i.mode === Qo || i.mode === Ko ? 256 : 0),
    (0 === h && 0 === m || t === Mo) && k === Po && (k = Go),
    k
}
  , fr = {
    inflateReset: ar,
    inflateReset2: dr,
    inflateResetKeep: rr,
    inflateInit: e=>sr(e, 15),
    inflateInit2: sr,
    inflate: ur,
    inflateEnd: e=>{
        if (or(e))
            return Ho;
        let t = e.state;
        return t.window && (t.window = null),
        e.state = null,
        Po
    }
    ,
    inflateGetHeader: (e,t)=>{
        if (or(e))
            return Ho;
        const i = e.state;
        return 0 == (2 & i.wrap) ? Ho : (i.head = t,
        t.done = !1,
        Po)
    }
    ,
    inflateSetDictionary: (e,t)=>{
        const i = t.length;
        let n, o, r;
        return or(e) ? Ho : (n = e.state,
        0 !== n.wrap && n.mode !== Zo ? Ho : n.mode === Zo && (o = 1,
        o = on(o, t, i, 0),
        o !== n.check) ? Vo : (r = pr(e, t, i, i),
        r ? (n.mode = 16210,
        Wo) : (n.havedict = 1,
        Po)))
    }
    ,
    inflateInfo: "pako inflate (from Nodeca project)"
};
var gr = function() {
    this.text = 0,
    this.time = 0,
    this.xflags = 0,
    this.os = 0,
    this.extra = null,
    this.extra_len = 0,
    this.name = "",
    this.comment = "",
    this.hcrc = 0,
    this.done = !1
};
const _r = Object.prototype.toString
  , {Z_NO_FLUSH: br, Z_FINISH: xr, Z_OK: yr, Z_STREAM_END: vr, Z_NEED_DICT: wr, Z_STREAM_ERROR: kr, Z_DATA_ERROR: Er, Z_MEM_ERROR: Ir} = sn;
function Ar(e) {
    this.options = co.assign({
        chunkSize: 65536,
        windowBits: 15,
        to: ""
    }, e || {});
    const t = this.options;
    t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits,
    0 === t.windowBits && (t.windowBits = -15)),
    !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32),
    t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15),
    this.err = 0,
    this.msg = "",
    this.ended = !1,
    this.chunks = [],
    this.strm = new uo,
    this.strm.avail_out = 0;
    let i = fr.inflateInit2(this.strm, t.windowBits);
    if (i !== yr)
        throw new Error(dn[i]);
    if (this.header = new gr,
    fr.inflateGetHeader(this.strm, this.header),
    t.dictionary && ("string" == typeof t.dictionary ? t.dictionary = po.string2buf(t.dictionary) : "[object ArrayBuffer]" === _r.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)),
    t.raw && (i = fr.inflateSetDictionary(this.strm, t.dictionary),
    i !== yr)))
        throw new Error(dn[i])
}
function Sr(e, t) {
    const i = new Ar(t);
    if (i.push(e),
    i.err)
        throw i.msg || dn[i.err];
    return i.result
}
Ar.prototype.push = function(e, t) {
    const i = this.strm
      , n = this.options.chunkSize
      , o = this.options.dictionary;
    let r, a, d;
    if (this.ended)
        return !1;
    for (a = t === ~~t ? t : !0 === t ? xr : br,
    "[object ArrayBuffer]" === _r.call(e) ? i.input = new Uint8Array(e) : i.input = e,
    i.next_in = 0,
    i.avail_in = i.input.length; ; ) {
        for (0 === i.avail_out && (i.output = new Uint8Array(n),
        i.next_out = 0,
        i.avail_out = n),
        r = fr.inflate(i, a),
        r === wr && o && (r = fr.inflateSetDictionary(i, o),
        r === yr ? r = fr.inflate(i, a) : r === Er && (r = wr)); i.avail_in > 0 && r === vr && i.state.wrap > 0 && 0 !== e[i.next_in]; )
            fr.inflateReset(i),
            r = fr.inflate(i, a);
        switch (r) {
        case kr:
        case Er:
        case wr:
        case Ir:
            return this.onEnd(r),
            this.ended = !0,
            !1
        }
        if (d = i.avail_out,
        i.next_out && (0 === i.avail_out || r === vr))
            if ("string" === this.options.to) {
                let e = po.utf8border(i.output, i.next_out)
                  , t = i.next_out - e
                  , o = po.buf2string(i.output, e);
                i.next_out = t,
                i.avail_out = n - t,
                t && i.output.set(i.output.subarray(e, e + t), 0),
                this.onData(o)
            } else
                this.onData(i.output.length === i.next_out ? i.output : i.output.subarray(0, i.next_out));
        if (r !== yr || 0 !== d) {
            if (r === vr)
                return r = fr.inflateEnd(this.strm),
                this.onEnd(r),
                this.ended = !0,
                !0;
            if (0 === i.avail_in)
                break
        }
    }
    return !0
}
,
Ar.prototype.onData = function(e) {
    this.chunks.push(e)
}
,
Ar.prototype.onEnd = function(e) {
    e === yr && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = co.flattenChunks(this.chunks)),
    this.chunks = [],
    this.err = e,
    this.msg = this.strm.msg
}
;
var Rr = {
    Inflate: Ar,
    inflate: Sr,
    inflateRaw: function(e, t) {
        return (t = t || {}).raw = !0,
        Sr(e, t)
    },
    ungzip: Sr,
    constants: sn
};
const {Deflate: Tr, deflate: Cr, deflateRaw: Or, gzip: Lr} = So
  , {Inflate: Fr, inflate: Dr, inflateRaw: zr, ungzip: Mr} = Rr;
var Nr = Cr
  , Br = Fr;
class Pr {
    constructor(e) {
        this.device = e,
        this.slip_reader_enabled = !1,
        this.left_over = new Uint8Array(0),
        this.baudrate = 0,
        this._DTR_state = !1
    }
    get_info() {
        const e = this.device.getInfo();
        return e.usbVendorId && e.usbProductId ? `WebSerial VendorID 0x${e.usbVendorId.toString(16)} ProductID 0x${e.usbProductId.toString(16)}` : ""
    }
    get_pid() {
        return this.device.getInfo().usbProductId
    }
    slip_writer(e) {
        let t = 0
          , i = 0
          , n = 0;
        for (i = 0; i < e.length; i++)
            192 !== e[i] && 219 !== e[i] || t++;
        const o = new Uint8Array(2 + t + e.length);
        for (o[0] = 192,
        n = 1,
        i = 0; i < e.length; i++,
        n++)
            192 !== e[i] ? 219 !== e[i] ? o[n] = e[i] : (o[n++] = 219,
            o[n] = 221) : (o[n++] = 219,
            o[n] = 220);
        return o[n] = 192,
        o
    }
    async write(e) {
        const t = this.slip_writer(e);
        if (this.device.writable) {
            const e = this.device.writable.getWriter();
            await e.write(t),
            e.releaseLock()
        }
    }
    _appendBuffer(e, t) {
        const i = new Uint8Array(e.byteLength + t.byteLength);
        return i.set(new Uint8Array(e), 0),
        i.set(new Uint8Array(t), e.byteLength),
        i.buffer
    }
    slip_reader(e) {
        let t = 0
          , i = 0
          , n = 0
          , o = "init";
        for (; t < e.length; )
            if ("init" !== o || 192 != e[t]) {
                if ("valid_data" === o && 192 == e[t]) {
                    n = t - 1,
                    o = "packet_complete";
                    break
                }
                t++
            } else
                i = t + 1,
                o = "valid_data",
                t++;
        if ("packet_complete" !== o)
            return this.left_over = e,
            new Uint8Array(0);
        this.left_over = e.slice(n + 2);
        const r = new Uint8Array(n - i + 1);
        let a = 0;
        for (t = i; t <= n; t++,
        a++)
            219 !== e[t] || 220 !== e[t + 1] ? 219 !== e[t] || 221 !== e[t + 1] ? r[a] = e[t] : (r[a] = 219,
            t++) : (r[a] = 192,
            t++);
        return r.slice(0, a)
    }
    async read(e=0, t=12) {
        let i, n = this.left_over;
        if (this.left_over = new Uint8Array(0),
        this.slip_reader_enabled) {
            const e = this.slip_reader(n);
            if (e.length > 0)
                return e;
            n = this.left_over,
            this.left_over = new Uint8Array(0)
        }
        if (null == this.device.readable)
            return this.left_over;
        const o = this.device.readable.getReader();
        try {
            e > 0 && (i = setTimeout((function() {
                o.cancel()
            }
            ), e));
            do {
                const {value: e, done: t} = await o.read();
                if (t)
                    throw this.left_over = n,
                    new Error("Timeout");
                n = new Uint8Array(this._appendBuffer(n.buffer, e.buffer))
            } while (n.length < t)
        } finally {
            e > 0 && clearTimeout(i),
            o.releaseLock()
        }
        return this.slip_reader_enabled ? this.slip_reader(n) : n
    }
    async rawRead(e=0) {
        if (0 != this.left_over.length) {
            const e = this.left_over;
            return this.left_over = new Uint8Array(0),
            e
        }
        if (!this.device.readable)
            return this.left_over;
        const t = this.device.readable.getReader();
        let i;
        try {
            e > 0 && (i = setTimeout((function() {
                t.cancel()
            }
            ), e));
            const {value: n, done: o} = await t.read();
            if (o)
                throw new Error("Timeout");
            return n
        } finally {
            e > 0 && clearTimeout(i),
            t.releaseLock()
        }
    }
    async setRTS(e) {
        await this.device.setSignals({
            requestToSend: e
        }),
        await this.setDTR(this._DTR_state)
    }
    async setDTR(e) {
        this._DTR_state = e,
        await this.device.setSignals({
            dataTerminalReady: e
        })
    }
    async connect(e=115200, t={}) {
        await this.device.open({
            baudRate: e,
            dataBits: null == t ? void 0 : t.dataBits,
            stopBits: null == t ? void 0 : t.stopBits,
            bufferSize: null == t ? void 0 : t.bufferSize,
            parity: null == t ? void 0 : t.parity,
            flowControl: null == t ? void 0 : t.flowControl
        }),
        this.baudrate = e,
        this.left_over = new Uint8Array(0)
    }
    async sleep(e) {
        return new Promise((t=>setTimeout(t, e)))
    }
    async waitForUnlock(e) {
        for (; this.device.readable && this.device.readable.locked || this.device.writable && this.device.writable.locked; )
            await this.sleep(e)
    }
    async disconnect() {
        await this.waitForUnlock(400),
        await this.device.close()
    }
}
function Ur(e) {
    return new Promise((t=>setTimeout(t, e)))
}
async function $r(e, t) {
    const i = {
        D: async t=>await e.setDTR(t),
        R: async t=>await e.setRTS(t),
        W: async e=>await Ur(e)
    };
    try {
        if (!function(e) {
            const t = ["D", "R", "W"]
              , i = e.split("|");
            for (const e of i) {
                const i = e[0]
                  , n = e.slice(1);
                if (!t.includes(i))
                    return !1;
                if ("D" === i || "R" === i) {
                    if ("0" !== n && "1" !== n)
                        return !1
                } else if ("W" === i) {
                    const e = parseInt(n);
                    if (isNaN(e) || e <= 0)
                        return !1
                }
            }
            return !0
        }(t))
            return;
        const e = t.split("|");
        for (const t of e) {
            const e = t[0]
              , n = t.slice(1);
            "W" === e ? await i.W(Number(n)) : "D" !== e && "R" !== e || await i[e]("1" === n)
        }
    } catch (e) {
        throw new Error("Invalid custom reset sequence")
    }
}
class Hr {
    constructor(e) {
        this.ESP_RAM_BLOCK = 6144,
        this.ESP_FLASH_BEGIN = 2,
        this.ESP_FLASH_DATA = 3,
        this.ESP_FLASH_END = 4,
        this.ESP_MEM_BEGIN = 5,
        this.ESP_MEM_END = 6,
        this.ESP_MEM_DATA = 7,
        this.ESP_WRITE_REG = 9,
        this.ESP_READ_REG = 10,
        this.ESP_SPI_ATTACH = 13,
        this.ESP_CHANGE_BAUDRATE = 15,
        this.ESP_FLASH_DEFL_BEGIN = 16,
        this.ESP_FLASH_DEFL_DATA = 17,
        this.ESP_FLASH_DEFL_END = 18,
        this.ESP_SPI_FLASH_MD5 = 19,
        this.ESP_ERASE_FLASH = 208,
        this.ESP_ERASE_REGION = 209,
        this.ESP_READ_FLASH = 210,
        this.ESP_RUN_USER_CODE = 211,
        this.ESP_IMAGE_MAGIC = 233,
        this.ESP_CHECKSUM_MAGIC = 239,
        this.ROM_INVALID_RECV_MSG = 5,
        this.ERASE_REGION_TIMEOUT_PER_MB = 3e4,
        this.ERASE_WRITE_TIMEOUT_PER_MB = 4e4,
        this.MD5_TIMEOUT_PER_MB = 8e3,
        this.CHIP_ERASE_TIMEOUT = 12e4,
        this.FLASH_READ_TIMEOUT = 1e5,
        this.MAX_TIMEOUT = 2 * this.CHIP_ERASE_TIMEOUT,
        this.CHIP_DETECT_MAGIC_REG_ADDR = 1073745920,
        this.DETECTED_FLASH_SIZES = {
            18: "256KB",
            19: "512KB",
            20: "1MB",
            21: "2MB",
            22: "4MB",
            23: "8MB",
            24: "16MB"
        },
        this.DETECTED_FLASH_SIZES_NUM = {
            18: 256,
            19: 512,
            20: 1024,
            21: 2048,
            22: 4096,
            23: 8192,
            24: 16384
        },
        this.USB_JTAG_SERIAL_PID = 4097,
        this.romBaudrate = 115200,
        this.debugLogging = !1,
        this.checksum = function(e) {
            let t, i = 239;
            for (t = 0; t < e.length; t++)
                i ^= e[t];
            return i
        }
        ,
        this.timeout_per_mb = function(e, t) {
            const i = e * (t / 1e6);
            return i < 3e3 ? 3e3 : i
        }
        ,
        this.flash_size_bytes = function(e) {
            let t = -1;
            return -1 !== e.indexOf("KB") ? t = 1024 * parseInt(e.slice(0, e.indexOf("KB"))) : -1 !== e.indexOf("MB") && (t = 1024 * parseInt(e.slice(0, e.indexOf("MB"))) * 1024),
            t
        }
        ,
        this.IS_STUB = !1,
        this.FLASH_WRITE_SIZE = 16384,
        this.transport = e.transport,
        this.baudrate = e.baudrate,
        e.serialOptions && (this.serialOptions = e.serialOptions),
        e.romBaudrate && (this.romBaudrate = e.romBaudrate),
        e.terminal && (this.terminal = e.terminal,
        this.terminal.clean()),
        e.debugLogging && (this.debugLogging = e.debugLogging),
        e.port && (this.transport = new Pr(e.port)),
        this.info("esptool.js"),
        this.info("Serial port " + this.transport.get_info())
    }
    _sleep(e) {
        return new Promise((t=>setTimeout(t, e)))
    }
    write(e, t=!0) {
        this.terminal ? t ? this.terminal.writeLine(e) : this.terminal.write(e) : console.log(e)
    }
    error(e, t=!0) {
        this.write(`Error: ${e}`, t)
    }
    info(e, t=!0) {
        this.write(e, t)
    }
    debug(e, t=!0) {
        this.debugLogging && this.write(`Debug: ${e}`, t)
    }
    _short_to_bytearray(e) {
        return new Uint8Array([255 & e, e >> 8 & 255])
    }
    _int_to_bytearray(e) {
        return new Uint8Array([255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255])
    }
    _bytearray_to_short(e, t) {
        return e | t >> 8
    }
    _bytearray_to_int(e, t, i, n) {
        return e | t << 8 | i << 16 | n << 24
    }
    _appendBuffer(e, t) {
        const i = new Uint8Array(e.byteLength + t.byteLength);
        return i.set(new Uint8Array(e), 0),
        i.set(new Uint8Array(t), e.byteLength),
        i.buffer
    }
    _appendArray(e, t) {
        const i = new Uint8Array(e.length + t.length);
        return i.set(e, 0),
        i.set(t, e.length),
        i
    }
    ui8ToBstr(e) {
        let t = "";
        for (let i = 0; i < e.length; i++)
            t += String.fromCharCode(e[i]);
        return t
    }
    bstrToUi8(e) {
        const t = new Uint8Array(e.length);
        for (let i = 0; i < e.length; i++)
            t[i] = e.charCodeAt(i);
        return t
    }
    async flush_input() {
        try {
            await this.transport.rawRead(200)
        } catch (e) {
            this.error(e.message)
        }
    }
    async read_packet(e=null, t=3e3) {
        for (let i = 0; i < 100; i++) {
            const i = await this.transport.read(t)
              , n = i[0]
              , o = i[1]
              , r = this._bytearray_to_int(i[4], i[5], i[6], i[7])
              , a = i.slice(8);
            if (1 == n) {
                if (null == e || o == e)
                    return [r, a];
                if (0 != a[0] && a[1] == this.ROM_INVALID_RECV_MSG)
                    throw await this.flush_input(),
                    new fi("unsupported command error")
            }
        }
        throw new fi("invalid response")
    }
    async command(e=null, t=new Uint8Array(0), i=0, n=!0, o=3e3) {
        if (null != e) {
            const n = new Uint8Array(8 + t.length);
            let o;
            for (n[0] = 0,
            n[1] = e,
            n[2] = this._short_to_bytearray(t.length)[0],
            n[3] = this._short_to_bytearray(t.length)[1],
            n[4] = this._int_to_bytearray(i)[0],
            n[5] = this._int_to_bytearray(i)[1],
            n[6] = this._int_to_bytearray(i)[2],
            n[7] = this._int_to_bytearray(i)[3],
            o = 0; o < t.length; o++)
                n[8 + o] = t[o];
            await this.transport.write(n)
        }
        return n ? this.read_packet(e, o) : [0, new Uint8Array(0)]
    }
    async read_reg(e, t=3e3) {
        const i = this._int_to_bytearray(e);
        return (await this.command(this.ESP_READ_REG, i, void 0, void 0, t))[0]
    }
    async write_reg(e, t, i=4294967295, n=0, o=0) {
        let r = this._appendArray(this._int_to_bytearray(e), this._int_to_bytearray(t));
        r = this._appendArray(r, this._int_to_bytearray(i)),
        r = this._appendArray(r, this._int_to_bytearray(n)),
        o > 0 && (r = this._appendArray(r, this._int_to_bytearray(this.chip.UART_DATE_REG_ADDR)),
        r = this._appendArray(r, this._int_to_bytearray(0)),
        r = this._appendArray(r, this._int_to_bytearray(0)),
        r = this._appendArray(r, this._int_to_bytearray(o))),
        await this.check_command("write target memory", this.ESP_WRITE_REG, r)
    }
    async sync() {
        this.debug("Sync");
        const e = new Uint8Array(36);
        let t;
        for (e[0] = 7,
        e[1] = 7,
        e[2] = 18,
        e[3] = 32,
        t = 0; t < 32; t++)
            e[4 + t] = 85;
        try {
            return await this.command(8, e, void 0, void 0, 100)
        } catch (e) {
            throw this.debug("Sync err " + e),
            e
        }
    }
    async _connect_attempt(e="default_reset", t=!1) {
        if (this.debug("_connect_attempt " + e + " " + t),
        "no_reset" !== e)
            if (this.transport.get_pid() === this.USB_JTAG_SERIAL_PID)
                await async function(e) {
                    await e.setRTS(!1),
                    await e.setDTR(!1),
                    await Ur(100),
                    await e.setDTR(!0),
                    await e.setRTS(!1),
                    await Ur(100),
                    await e.setRTS(!0),
                    await e.setDTR(!1),
                    await e.setRTS(!0),
                    await Ur(100),
                    await e.setRTS(!1),
                    await e.setDTR(!1)
                }(this.transport);
            else {
                const e = t ? "D0|R1|W100|W2000|D1|R0|W50|D0" : "D0|R1|W100|D1|R0|W50|D0";
                await $r(this.transport, e)
            }
        let i = 0
          , n = !0;
        for (; n; ) {
            try {
                i += (await this.transport.read(1e3)).length
            } catch (e) {
                if (this.debug(e.message),
                e instanceof Error) {
                    n = !1;
                    break
                }
            }
            await this._sleep(50)
        }
        for (this.transport.slip_reader_enabled = !0,
        i = 7; i--; ) {
            try {
                const e = await this.sync();
                return this.debug(e[0].toString()),
                "success"
            } catch (e) {
                e instanceof Error && (t ? this.info("_", !1) : this.info(".", !1))
            }
            await this._sleep(50)
        }
        return "error"
    }
    async connect(e="default_reset", t=7, i=!1) {
        let n, o;
        for (this.info("Connecting...", !1),
        await this.transport.connect(this.romBaudrate, this.serialOptions),
        n = 0; n < t && (o = await this._connect_attempt(e, !1),
        "success" !== o) && (o = await this._connect_attempt(e, !0),
        "success" !== o); n++)
            ;
        if ("success" !== o)
            throw new fi("Failed to connect with the device");
        if (this.info("\n\r", !1),
        !i) {
            const e = await this.read_reg(1073745920) >>> 0;
            this.debug("Chip Magic " + e.toString(16));
            const t = await async function(e) {
                switch (e) {
                case 15736195:
                    {
                        const {ESP32ROM: e} = await import("./esp32-D3NakGZR.js");
                        return new e
                    }
                case 1763790959:
                case 456216687:
                    {
                        const {ESP32C3ROM: e} = await import("./esp32c3-ulVL_2_M.js");
                        return new e
                    }
                case 752910447:
                    {
                        const {ESP32C6ROM: e} = await import("./esp32c6-cpWtm3Jj.js");
                        return new e
                    }
                case 3619110528:
                    {
                        const {ESP32H2ROM: e} = await import("./esp32h2-vvZklO0u.js");
                        return new e
                    }
                case 9:
                    {
                        const {ESP32S3ROM: e} = await import("./esp32s3-x90QvIED.js");
                        return new e
                    }
                case 1990:
                    {
                        const {ESP32S2ROM: e} = await import("./esp32s2-wDMulds7.js");
                        return new e
                    }
                case 4293968129:
                    {
                        const {ESP8266ROM: e} = await import("./esp8266-QjDUxVMt.js");
                        return new e
                    }
                default:
                    return null
                }
            }(e);
            if (null === this.chip)
                throw new fi(`Unexpected CHIP magic value ${e}. Failed to autodetect chip type.`);
            this.chip = t
        }
    }
    async detect_chip(e="default_reset") {
        await this.connect(e),
        this.info("Detecting chip type... ", !1),
        null != this.chip ? this.info(this.chip.CHIP_NAME) : this.info("unknown!")
    }
    async check_command(e="", t=null, i=new Uint8Array(0), n=0, o=3e3) {
        this.debug("check_command " + e);
        const r = await this.command(t, i, n, void 0, o);
        return r[1].length > 4 ? r[1] : r[0]
    }
    async mem_begin(e, t, i, n) {
        this.debug("mem_begin " + e + " " + t + " " + i + " " + n.toString(16));
        let o = this._appendArray(this._int_to_bytearray(e), this._int_to_bytearray(t));
        o = this._appendArray(o, this._int_to_bytearray(i)),
        o = this._appendArray(o, this._int_to_bytearray(n)),
        await this.check_command("enter RAM download mode", this.ESP_MEM_BEGIN, o)
    }
    async mem_block(e, t) {
        let i = this._appendArray(this._int_to_bytearray(e.length), this._int_to_bytearray(t));
        i = this._appendArray(i, this._int_to_bytearray(0)),
        i = this._appendArray(i, this._int_to_bytearray(0)),
        i = this._appendArray(i, e);
        const n = this.checksum(e);
        await this.check_command("write to target RAM", this.ESP_MEM_DATA, i, n)
    }
    async mem_finish(e) {
        const t = 0 === e ? 1 : 0
          , i = this._appendArray(this._int_to_bytearray(t), this._int_to_bytearray(e));
        await this.check_command("leave RAM download mode", this.ESP_MEM_END, i, void 0, 50)
    }
    async flash_spi_attach(e) {
        const t = this._int_to_bytearray(e);
        await this.check_command("configure SPI flash pins", this.ESP_SPI_ATTACH, t)
    }
    async flash_begin(e, t) {
        const i = Math.floor((e + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE)
          , n = this.chip.get_erase_size(t, e)
          , o = new Date
          , r = o.getTime();
        let a = 3e3;
        0 == this.IS_STUB && (a = this.timeout_per_mb(this.ERASE_REGION_TIMEOUT_PER_MB, e)),
        this.debug("flash begin " + n + " " + i + " " + this.FLASH_WRITE_SIZE + " " + t + " " + e);
        let d = this._appendArray(this._int_to_bytearray(n), this._int_to_bytearray(i));
        d = this._appendArray(d, this._int_to_bytearray(this.FLASH_WRITE_SIZE)),
        d = this._appendArray(d, this._int_to_bytearray(t)),
        0 == this.IS_STUB && (d = this._appendArray(d, this._int_to_bytearray(0))),
        await this.check_command("enter Flash download mode", this.ESP_FLASH_BEGIN, d, void 0, a);
        const s = o.getTime();
        return 0 != e && 0 == this.IS_STUB && this.info("Took " + (s - r) / 1e3 + "." + (s - r) % 1e3 + "s to erase flash block"),
        i
    }
    async flash_defl_begin(e, t, i) {
        const n = Math.floor((t + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE)
          , o = Math.floor((e + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE)
          , r = new Date
          , a = r.getTime();
        let d, s;
        this.IS_STUB ? (d = e,
        s = 3e3) : (d = o * this.FLASH_WRITE_SIZE,
        s = this.timeout_per_mb(this.ERASE_REGION_TIMEOUT_PER_MB, d)),
        this.info("Compressed " + e + " bytes to " + t + "...");
        let l = this._appendArray(this._int_to_bytearray(d), this._int_to_bytearray(n));
        l = this._appendArray(l, this._int_to_bytearray(this.FLASH_WRITE_SIZE)),
        l = this._appendArray(l, this._int_to_bytearray(i)),
        "ESP32-S2" !== this.chip.CHIP_NAME && "ESP32-S3" !== this.chip.CHIP_NAME && "ESP32-C3" !== this.chip.CHIP_NAME || !1 !== this.IS_STUB || (l = this._appendArray(l, this._int_to_bytearray(0))),
        await this.check_command("enter compressed flash mode", this.ESP_FLASH_DEFL_BEGIN, l, void 0, s);
        const c = r.getTime();
        return 0 != e && !1 === this.IS_STUB && this.info("Took " + (c - a) / 1e3 + "." + (c - a) % 1e3 + "s to erase flash block"),
        n
    }
    async flash_block(e, t, i) {
        let n = this._appendArray(this._int_to_bytearray(e.length), this._int_to_bytearray(t));
        n = this._appendArray(n, this._int_to_bytearray(0)),
        n = this._appendArray(n, this._int_to_bytearray(0)),
        n = this._appendArray(n, e);
        const o = this.checksum(e);
        await this.check_command("write to target Flash after seq " + t, this.ESP_FLASH_DATA, n, o, i)
    }
    async flash_defl_block(e, t, i) {
        let n = this._appendArray(this._int_to_bytearray(e.length), this._int_to_bytearray(t));
        n = this._appendArray(n, this._int_to_bytearray(0)),
        n = this._appendArray(n, this._int_to_bytearray(0)),
        n = this._appendArray(n, e);
        const o = this.checksum(e);
        this.debug("flash_defl_block " + e[0].toString(16) + " " + e[1].toString(16)),
        await this.check_command("write compressed data to flash after seq " + t, this.ESP_FLASH_DEFL_DATA, n, o, i)
    }
    async flash_finish(e=!1) {
        const t = e ? 0 : 1
          , i = this._int_to_bytearray(t);
        await this.check_command("leave Flash mode", this.ESP_FLASH_END, i)
    }
    async flash_defl_finish(e=!1) {
        const t = e ? 0 : 1
          , i = this._int_to_bytearray(t);
        await this.check_command("leave compressed flash mode", this.ESP_FLASH_DEFL_END, i)
    }
    async run_spiflash_command(e, t, i) {
        const n = this.chip.SPI_REG_BASE
          , o = n + 0
          , r = n + this.chip.SPI_USR_OFFS
          , a = n + this.chip.SPI_USR1_OFFS
          , d = n + this.chip.SPI_USR2_OFFS
          , s = n + this.chip.SPI_W0_OFFS;
        let l;
        l = null != this.chip.SPI_MOSI_DLEN_OFFS ? async(e,t)=>{
            const i = n + this.chip.SPI_MOSI_DLEN_OFFS
              , o = n + this.chip.SPI_MISO_DLEN_OFFS;
            e > 0 && await this.write_reg(i, e - 1),
            t > 0 && await this.write_reg(o, t - 1)
        }
        : async(e,t)=>{
            const i = a
              , n = (0 === t ? 0 : t - 1) << 8 | (0 === e ? 0 : e - 1) << 17;
            await this.write_reg(i, n)
        }
        ;
        const c = 1 << 18;
        if (i > 32)
            throw new fi("Reading more than 32 bits back from a SPI flash operation is unsupported");
        if (t.length > 64)
            throw new fi("Writing more than 64 bytes of data with one SPI command is unsupported");
        const h = 8 * t.length
          , m = await this.read_reg(r)
          , p = await this.read_reg(d);
        let u, f = 1 << 31;
        i > 0 && (f |= 268435456),
        h > 0 && (f |= 134217728),
        await l(h, i),
        await this.write_reg(r, f);
        let g = 7 << 28 | e;
        if (await this.write_reg(d, g),
        0 == h)
            await this.write_reg(s, 0);
        else {
            if (t.length % 4 != 0) {
                const e = new Uint8Array(t.length % 4);
                t = this._appendArray(t, e)
            }
            let e = s;
            for (u = 0; u < t.length - 4; u += 4)
                g = this._bytearray_to_int(t[u], t[u + 1], t[u + 2], t[u + 3]),
                await this.write_reg(e, g),
                e += 4
        }
        for (await this.write_reg(o, c),
        u = 0; u < 10 && (g = await this.read_reg(o) & c,
        0 != g); u++)
            ;
        if (10 === u)
            throw new fi("SPI command did not complete in time");
        const _ = await this.read_reg(s);
        return await this.write_reg(r, m),
        await this.write_reg(d, p),
        _
    }
    async read_flash_id() {
        const e = new Uint8Array(0);
        return await this.run_spiflash_command(159, e, 24)
    }
    async erase_flash() {
        this.info("Erasing flash (this may take a while)...");
        let e = new Date;
        const t = e.getTime()
          , i = await this.check_command("erase flash", this.ESP_ERASE_FLASH, void 0, void 0, this.CHIP_ERASE_TIMEOUT);
        e = new Date;
        const n = e.getTime();
        return this.info("Chip erase completed successfully in " + (n - t) / 1e3 + "s"),
        i
    }
    toHex(e) {
        return Array.prototype.map.call(e, (e=>("00" + e.toString(16)).slice(-2))).join("")
    }
    async flash_md5sum(e, t) {
        const i = this.timeout_per_mb(this.MD5_TIMEOUT_PER_MB, t);
        let n = this._appendArray(this._int_to_bytearray(e), this._int_to_bytearray(t));
        n = this._appendArray(n, this._int_to_bytearray(0)),
        n = this._appendArray(n, this._int_to_bytearray(0));
        let o = await this.check_command("calculate md5sum", this.ESP_SPI_FLASH_MD5, n, void 0, i);
        o instanceof Uint8Array && o.length > 16 && (o = o.slice(0, 16));
        return this.toHex(o)
    }
    async read_flash(e, t, i=null) {
        let n = this._appendArray(this._int_to_bytearray(e), this._int_to_bytearray(t));
        n = this._appendArray(n, this._int_to_bytearray(4096)),
        n = this._appendArray(n, this._int_to_bytearray(1024));
        const o = await this.check_command("read flash", this.ESP_READ_FLASH, n);
        if (0 != o)
            throw new fi("Failed to read memory: " + o);
        let r = new Uint8Array(0);
        for (; r.length < t; ) {
            const e = await this.transport.read(this.FLASH_READ_TIMEOUT);
            if (!(e instanceof Uint8Array))
                throw new fi("Failed to read memory: " + e);
            e.length > 0 && (r = this._appendArray(r, e),
            await this.transport.write(this._int_to_bytearray(r.length)),
            i && i(e, r.length, t))
        }
        return r
    }
    async run_stub() {
        this.info("Uploading stub...");
        let e = atob(this.chip.ROM_TEXT)
          , t = e.split("").map((function(e) {
            return e.charCodeAt(0)
        }
        ));
        const i = new Uint8Array(t);
        e = atob(this.chip.ROM_DATA),
        t = e.split("").map((function(e) {
            return e.charCodeAt(0)
        }
        ));
        const n = new Uint8Array(t);
        let o, r = Math.floor((i.length + this.ESP_RAM_BLOCK - 1) / this.ESP_RAM_BLOCK);
        for (await this.mem_begin(i.length, r, this.ESP_RAM_BLOCK, this.chip.TEXT_START),
        o = 0; o < r; o++) {
            const e = o * this.ESP_RAM_BLOCK
              , t = e + this.ESP_RAM_BLOCK;
            await this.mem_block(i.slice(e, t), o)
        }
        for (r = Math.floor((n.length + this.ESP_RAM_BLOCK - 1) / this.ESP_RAM_BLOCK),
        await this.mem_begin(n.length, r, this.ESP_RAM_BLOCK, this.chip.DATA_START),
        o = 0; o < r; o++) {
            const e = o * this.ESP_RAM_BLOCK
              , t = e + this.ESP_RAM_BLOCK;
            await this.mem_block(n.slice(e, t), o)
        }
        this.info("Running stub..."),
        await this.mem_finish(this.chip.ENTRY);
        for (let e = 0; e < 100; e++) {
            const e = await this.transport.read(1e3, 6);
            if (79 === e[0] && 72 === e[1] && 65 === e[2] && 73 === e[3])
                return this.info("Stub running..."),
                this.IS_STUB = !0,
                this.FLASH_WRITE_SIZE = 16384,
                this.chip
        }
        throw new fi("Failed to start stub. Unexpected response")
    }
    async change_baud() {
        this.info("Changing baudrate to " + this.baudrate);
        const e = this.IS_STUB ? this.transport.baudrate : 0
          , t = this._appendArray(this._int_to_bytearray(this.baudrate), this._int_to_bytearray(e))
          , i = await this.command(this.ESP_CHANGE_BAUDRATE, t);
        this.debug(i[0].toString()),
        this.info("Changed"),
        await this.transport.disconnect(),
        await this._sleep(50),
        await this.transport.connect(this.baudrate, this.serialOptions);
        try {
            let e = 64;
            for (; e--; ) {
                try {
                    await this.sync();
                    break
                } catch (e) {
                    this.debug(e.message)
                }
                await this._sleep(10)
            }
        } catch (e) {
            this.debug(e.message)
        }
    }
    async main_fn(e="default_reset") {
        await this.detect_chip(e);
        const t = await this.chip.get_chip_description(this);
        return this.info("Chip is " + t),
        this.info("Features: " + await this.chip.get_chip_features(this)),
        this.info("Crystal is " + await this.chip.get_crystal_freq(this) + "MHz"),
        this.info("MAC: " + await this.chip.read_mac(this)),
        await this.chip.read_mac(this),
        void 0 !== this.chip._post_connect && await this.chip._post_connect(this),
        await this.run_stub(),
        this.romBaudrate !== this.baudrate && await this.change_baud(),
        t
    }
    parse_flash_size_arg(e) {
        if (void 0 === this.chip.FLASH_SIZES[e])
            throw new fi("Flash size " + e + " is not supported by this chip type. Supported sizes: " + this.chip.FLASH_SIZES);
        return this.chip.FLASH_SIZES[e]
    }
    _update_image_flash_params(e, t, i, n, o) {
        if (this.debug("_update_image_flash_params " + i + " " + n + " " + o),
        e.length < 8)
            return e;
        if (t != this.chip.BOOTLOADER_FLASH_OFFSET)
            return e;
        if ("keep" === i && "keep" === n && "keep" === o)
            return this.info("Not changing the image"),
            e;
        const r = parseInt(e[0]);
        let a = parseInt(e[2]);
        const d = parseInt(e[3]);
        if (r !== this.ESP_IMAGE_MAGIC)
            return this.info("Warning: Image file at 0x" + t.toString(16) + " doesn't look like an image file, so not changing any flash settings."),
            e;
        if ("keep" !== n) {
            a = {
                qio: 0,
                qout: 1,
                dio: 2,
                dout: 3
            }[n]
        }
        let s = 15 & d;
        if ("keep" !== o) {
            s = {
                "40m": 0,
                "26m": 1,
                "20m": 2,
                "80m": 15
            }[o]
        }
        let l = 240 & d;
        "keep" !== i && (l = this.parse_flash_size_arg(i));
        const c = a << 8 | s + l;
        return this.info("Flash params set to " + c.toString(16)),
        parseInt(e[2]) !== a << 8 && (e = e.substring(0, 2) + (a << 8).toString() + e.substring(3)),
        parseInt(e[3]) !== s + l && (e = e.substring(0, 3) + (s + l).toString() + e.substring(4)),
        e
    }
    async write_flash(e) {
        if (this.debug("EspLoader program"),
        "keep" !== e.flashSize) {
            const t = this.flash_size_bytes(e.flashSize);
            for (let i = 0; i < e.fileArray.length; i++)
                if (e.fileArray[i].data.length + e.fileArray[i].address > t)
                    throw new fi(`File ${i + 1} doesn't fit in the available flash`)
        }
        let t, i;
        !0 === this.IS_STUB && !0 === e.eraseAll && await this.erase_flash();
        for (let n = 0; n < e.fileArray.length; n++) {
            this.debug("Data Length " + e.fileArray[n].data.length),
            t = e.fileArray[n].data;
            const o = e.fileArray[n].data.length % 4;
            if (o > 0 && (t += "ÿÿÿÿ".substring(4 - o)),
            i = e.fileArray[n].address,
            this.debug("Image Length " + t.length),
            0 === t.length) {
                this.debug("Warning: File is empty");
                continue
            }
            t = this._update_image_flash_params(t, i, e.flashSize, e.flashMode, e.flashFreq);
            let r = null;
            e.calculateMD5Hash && (r = e.calculateMD5Hash(t),
            this.debug("Image MD5 " + r));
            const a = t.length;
            let d;
            if (e.compress) {
                const e = this.bstrToUi8(t);
                t = this.ui8ToBstr(Nr(e, {
                    level: 9
                })),
                d = await this.flash_defl_begin(a, t.length, i)
            } else
                d = await this.flash_begin(a, i);
            let s = 0
              , l = 0;
            const c = t.length;
            e.reportProgress && e.reportProgress(n, 0, c);
            let h = new Date;
            const m = h.getTime();
            let p = 5e3;
            const u = new Br({
                chunkSize: 1
            });
            let f = 0;
            for (u.onData = function(e) {
                f += e.byteLength
            }
            ; t.length > 0; ) {
                this.debug("Write loop " + i + " " + s + " " + d),
                this.info("Writing at 0x" + (i + f).toString(16) + "... (" + Math.floor(100 * (s + 1) / d) + "%)");
                const o = this.bstrToUi8(t.slice(0, this.FLASH_WRITE_SIZE));
                if (!e.compress)
                    throw new fi("Yet to handle Non Compressed writes");
                {
                    const e = f;
                    u.push(o, !1);
                    const t = f - e;
                    let i = 3e3;
                    this.timeout_per_mb(this.ERASE_WRITE_TIMEOUT_PER_MB, t) > 3e3 && (i = this.timeout_per_mb(this.ERASE_WRITE_TIMEOUT_PER_MB, t)),
                    !1 === this.IS_STUB && (p = i),
                    await this.flash_defl_block(o, s, p),
                    this.IS_STUB && (p = i)
                }
                l += o.length,
                t = t.slice(this.FLASH_WRITE_SIZE, t.length),
                s++,
                e.reportProgress && e.reportProgress(n, l, c)
            }
            this.IS_STUB && await this.read_reg(this.CHIP_DETECT_MAGIC_REG_ADDR, p),
            h = new Date;
            const g = h.getTime() - m;
            if (e.compress && this.info("Wrote " + a + " bytes (" + l + " compressed) at 0x" + i.toString(16) + " in " + g / 1e3 + " seconds."),
            r) {
                const e = await this.flash_md5sum(i, a);
                if (new String(e).valueOf() != new String(r).valueOf())
                    throw this.info("File  md5: " + r),
                    this.info("Flash md5: " + e),
                    new fi("MD5 of file does not match data in flash!");
                this.info("Hash of data verified.")
            }
        }
        this.info("Leaving..."),
        this.IS_STUB && (await this.flash_begin(0, 0),
        e.compress ? await this.flash_defl_finish() : await this.flash_finish())
    }
    async flash_id() {
        this.debug("flash_id");
        const e = await this.read_flash_id();
        this.info("Manufacturer: " + (255 & e).toString(16));
        const t = e >> 16 & 255;
        this.info("Device: " + (e >> 8 & 255).toString(16) + t.toString(16)),
        this.info("Detected flash size: " + this.DETECTED_FLASH_SIZES[t])
    }
    async get_flash_size() {
        this.debug("flash_id");
        const e = await this.read_flash_id() >> 16 & 255;
        return this.DETECTED_FLASH_SIZES_NUM[e]
    }
    async hard_reset() {
        await this.transport.setRTS(!0),
        await this._sleep(100),
        await this.transport.setRTS(!1)
    }
    async soft_reset() {
        if (this.IS_STUB) {
            if ("ESP8266" != this.chip.CHIP_NAME)
                throw new fi("Soft resetting is currently only supported on ESP8266");
            await this.command(this.ESP_RUN_USER_CODE, void 0, void 0, !1)
        } else
            await this.flash_begin(0, 0),
            await this.flash_finish(!1)
    }
}
const Vr = async e=>{
    await e.device.setSignals({
        dataTerminalReady: !1,
        requestToSend: !0
    }),
    await V(250),
    await e.device.setSignals({
        dataTerminalReady: !1,
        requestToSend: !1
    }),
    await V(250)
}
  , Wr = (e,t="")=>{
    const i = new Blob([e],{
        type: "text/plain"
    })
      , n = URL.createObjectURL(i);
    ((e,t="")=>{
        const i = document.createElement("a");
        i.target = "_blank",
        i.href = e,
        i.download = t,
        document.body.appendChild(i),
        i.dispatchEvent(new MouseEvent("click")),
        document.body.removeChild(i)
    }
    )(n, t),
    setTimeout((()=>URL.revokeObjectURL(n)), 0)
}
;
console.log("ESP Web Tools 9.4.3 by Nabu Casa; https://esphome.github.io/esp-web-tools/");
class Gr extends x {
    constructor() {
        super(...arguments),
        this.logger = console,
        this._state = "DASHBOARD",
        this._installErase = !1,
        this._installConfirmed = !1,
        this._provisionForce = !1,
        this._wasProvisioned = !1,
        this._busy = !1,
        this._selectedSsid = null,
        this._handleDisconnect = ()=>{
            this._state = "ERROR",
            this._error = "Disconnected"
        }
    }
    render() {
        if (!this.port)
            return h``;
        let e, t, i = !1, n = !1;
        return void 0 === this._client && "INSTALL" !== this._state && "LOGS" !== this._state ? this._error ? [e,t,i] = this._renderError(this._error) : (t = this._renderProgress("Connecting"),
        i = !0) : "INSTALL" === this._state ? [e,t,i,n] = this._renderInstall() : "ASK_ERASE" === this._state ? [e,t] = this._renderAskErase() : "ERROR" === this._state ? [e,t,i] = this._renderError(this._error) : "DASHBOARD" === this._state ? [e,t,i,n] = this._client ? this._renderDashboard() : this._renderDashboardNoImprov() : "PROVISION" === this._state ? [e,t,i] = this._renderProvision() : "LOGS" === this._state && ([e,t,i] = this._renderLogs()),
        h`
      <ewt-dialog
        open
        .heading=${e}
        scrimClickAction
        @closed=${this._handleClose}
        .hideActions=${i}
      >
        ${e && n ? h`
              <ewt-icon-button dialogAction="close">
                ${oi}
              </ewt-icon-button>
            ` : ""}
        ${t}
      </ewt-dialog>
    `
    }
    _renderProgress(e, t) {
        return h`
      <ewt-page-progress
        .label=${e}
        .progress=${t}
      ></ewt-page-progress>
    `
    }
    _renderError(e) {
        return ["Error", h`
      <ewt-page-message .icon=${"⚠️"} .label=${e}></ewt-page-message>
      <ewt-button
        slot="primaryAction"
        dialogAction="ok"
        label="Close"
      ></ewt-button>
    `, !1]
    }
    _renderDashboard() {
        const e = this._info.name;
        let t;
        return t = h`
      <div class="table-row">
        ${ri}
        <div>${this._info.firmware}&nbsp;${this._info.version}</div>
      </div>
      <div class="table-row last">
        ${ai}
        <div>${this._info.chipFamily}</div>
      </div>
      <div class="dashboard-buttons">
        ${this._isSameVersion ? "" : h`
              <div>
                <ewt-button
                  text-left
                  .label=${this._isSameFirmware ? `Update ${this._manifest.name}` : `Install ${this._manifest.name}`}
                  @click=${()=>{
            this._isSameFirmware ? this._startInstall(!1) : this._manifest.new_install_prompt_erase ? this._state = "ASK_ERASE" : this._startInstall(!0)
        }
        }
                ></ewt-button>
              </div>
            `}
        ${void 0 === this._client.nextUrl ? "" : h`
              <div>
                <font style="font-size: 12px;">Don't Forget to Set a Unique mDNS adres in /setup</font><br>
                <a
                  href=${this._client.nextUrl}
                  class="has-button"
                  target="_blank"
                >
                  <ewt-button label="Visit Device HomePage" title="Don't forget to set Unique mDNS adress in /setup tab custom"></ewt-button>
                </a>
              </div>
            `}
        ${this._manifest.home_assistant_domain && this._client.state === ci.PROVISIONED ? h`
              <div>
                <a
                  href=${`https://my.home-assistant.io/redirect/config_flow_start/?domain=${this._manifest.home_assistant_domain}`}
                  class="has-button"
                  target="_blank"
                >
                  <ewt-button label="Add to Home Assistant"></ewt-button>
                </a>
              </div>
            ` : ""}
        <div>
          <ewt-button
            .label=${this._client.state === ci.READY ? "Connect to Wi-Fi" : "Change Wi-Fi"}
            @click=${()=>{
            this._state = "PROVISION",
            this._client.state === ci.PROVISIONED && (this._provisionForce = !0)
        }
        }
          ></ewt-button>
        </div>
        <div>
          <ewt-button
            label="Logs & Console & Reset"
            @click=${async()=>{
            const e = this._client;
            e && (await this._closeClientWithoutEvents(e),
            await V(100)),
            this._client = void 0,
            this._state = "LOGS"
        }
        }
          ></ewt-button>
        </div>
        ${this._isSameFirmware||this._manifest.funding_url?h`
              <div>
                <a
                  class="button"
                  href=${this._manifest.funding_url}
                  target="_blank"
                  title="Fund this project By Talk About it, Sharing it, Coding or Coins?"
                >
                  <ewt-button label="Support Our Project's Growth?!"></ewt-button>
                </a>
              </div>
            `:""}
        ${this._isSameVersion ? h`
              <div>
                <ewt-button
                  class="danger"
                  label="Erase User Data"
                  @click=${()=>this._startInstall(!0)}
                ></ewt-button>
              </div>
            ` : ""}
      </div>
    `,
        [e, t, !0, !0]
    }
    _renderDashboardNoImprov() {
        let e;
        return e = h`
      <div class="dashboard-buttons">
        <div>
          <ewt-button
            text-left
            .label=${`Install ${this._manifest.name}`}
            @click=${()=>{
            this._manifest.new_install_prompt_erase ? this._state = "ASK_ERASE" : this._startInstall(!0)
        }
        }
          ></ewt-button>
        </div>

        <div>
          <ewt-button
            label="Logs & Console"
            @click=${async()=>{
            this._client = void 0,
            this._state = "LOGS"
        }
        }
          ></ewt-button>
        </div>
      </div>
    `,
        ["Device Dashboard", e, !0, !0]
    }
    _renderProvision() {
        var e;
        let t, i = "Configure Wi-Fi", n = !1;
        if (this._busy)
            return [i, this._renderProgress(void 0 === this._ssids ? "Scanning for networks" : "Connecting"), !0];
        if (this._provisionForce || this._client.state !== ci.PROVISIONED) {
            let i;
            switch (this._client.error) {
            case 3:
                i = "Unable to connect";
                break;
            case 254:
                i = "Timeout";
                break;
            case 0:
            case 2:
                break;
            default:
                i = `Unknown error (${this._client.error})`
            }
            const n = null === (e = this._ssids) || void 0 === e ? void 0 : e.find((e=>e.name === this._selectedSsid));
            t = h`
        <div>
          Enter the credentials of the Wi-Fi network that you want your device
          to connect to.
        </div>
        ${i ? h`<p class="error">${i}</p>` : ""}
        ${null !== this._ssids ? h`
              <ewt-select
                fixedMenuPosition
                label="Network"
                @selected=${e=>{
                const t = e.detail.index;
                this._selectedSsid = t === this._ssids.length ? null : this._ssids[t].name
            }
            }
                @closed=${e=>e.stopPropagation()}
              >
                ${this._ssids.map((e=>h`
                    <ewt-list-item
                      .selected=${n === e}
                      .value=${e.name}
                    >
                      ${e.name}
                    </ewt-list-item>
                  `))}
                <ewt-list-item .selected=${!n} value="-1">
                  Join other…
                </ewt-list-item>
              </ewt-select>
              <ewt-icon-button @click=${this._updateSsids}>
                ${di}
              </ewt-icon-button>
            ` : ""}
        ${n ? "" : h`
                <ewt-textfield label="Network Name" name="ssid"></ewt-textfield>
              `}
        ${!n || n.secured ? h`
              <ewt-textfield
                label="Password"
                name="password"
                type="password"
              ></ewt-textfield>
            ` : ""}
        <ewt-button
          slot="primaryAction"
          label="Connect"
          @click=${this._doProvision}
        ></ewt-button>
        <ewt-button
          slot="secondaryAction"
          .label=${this._installState && this._installErase ? "Skip" : "Back"}
          @click=${()=>{
                this._state = "DASHBOARD"
            }
            }
        ></ewt-button>
      `
        } else {
            i = void 0;
            const e = !this._wasProvisioned && (void 0 !== this._client.nextUrl || "home_assistant_domain"in this._manifest);
            n = e,
            t = h`
        <ewt-page-message
          .icon=${"🎉"}
          label="Device connected to the network!"
        ></ewt-page-message>
        ${e ? h`
              <div class="dashboard-buttons">
                ${void 0 === this._client.nextUrl ? "" : h`
                      <div>
                        <a
                          href=${this._client.nextUrl}
                          class="has-button"
                          target="_blank"
                          @click=${()=>{
                this._state = "DASHBOARD"
            }
            }
                        >
                          <ewt-button label="Visit Device"></ewt-button>
                        </a>
                      </div>
                              <div>
          <ewt-button
            label="Logs & Console & Reset"
            @click=${async()=>{
            const e = this._client;
            e && (await this._closeClientWithoutEvents(e),
            await V(100)),
            this._client = void 0,
            this._state = "LOGS"
        }
        }
          ></ewt-button>
        </div>
                    `}
                ${this._manifest.home_assistant_domain ? h`
                      <div>
                        <a
                          href=${`https://my.home-assistant.io/redirect/config_flow_start/?domain=${this._manifest.home_assistant_domain}`}
                          class="has-button"
                          target="_blank"
                          @click=${()=>{
                this._state = "DASHBOARD"
            }
            }
                        >
                          <ewt-button
                            label="Add to Home Assistant"
                          ></ewt-button>
                        </a>
                      </div>
                    ` : ""}
                <div>
                  <ewt-button
                    label="Back to Menu"
                    @click=${()=>{
                this._state = "DASHBOARD"
            }
            }
                  ></ewt-button>
                </div>
              </div>
            ` : h`
              <ewt-button
                slot="primaryAction"
                label="Continue"
                @click=${()=>{
                this._state = "DASHBOARD"
            }
            }
              ></ewt-button>
            `}
      `
        }
        return [i, t, n]
    }
    _renderAskErase() {
        return ["Erase device", h`
      <div>
        Do you want to erase the device before installing
        ${this._manifest.name}? All data on the device will be lost.
      </div>
      <ewt-formfield label="Erase device" class="danger">
        <ewt-checkbox></ewt-checkbox>
      </ewt-formfield>
      <ewt-button
        slot="primaryAction"
        label="Next"
        @click=${()=>{
            const e = this.shadowRoot.querySelector("ewt-checkbox");
            this._startInstall(e.checked)
        }
        }
      ></ewt-button>
      <ewt-button
        slot="secondaryAction"
        label="Back"
        @click=${()=>{
            this._state = "DASHBOARD"
        }
        }
      ></ewt-button>
    `]
    }
    _renderInstall() {
        let e, t, i = !1;
        const n = !this._installErase && this._isSameFirmware;
        if (!this._installConfirmed && this._isSameVersion)
            e = "Erase User Data",
            t = h`
        Do you want to reset your device and erase all user data from your
        device?
        <ewt-button
          class="danger"
          slot="primaryAction"
          label="Erase User Data"
          @click=${this._confirmInstall}
        ></ewt-button>
      `;
        else if (this._installConfirmed)
            if (this._installState && "initializing" !== this._installState.state && "preparing" !== this._installState.state)
                if ("erasing" === this._installState.state)
                    e = "Installing",
                    t = this._renderProgress("Erasing"),
                    i = !0;
                else if ("writing" === this._installState.state || "finished" === this._installState.state && void 0 === this._client) {
                    let n, o;
                    e = "Installing Flashing the Bits",
                    "finished" === this._installState.state ? o = "Wrapping up" : this._installState.details.percentage < 4 ? o = "Installing" : n = this._installState.details.percentage,
                    t = this._renderProgress(h`
          ${o ? h`${o}<br />` : ""}
          <br />
          This will take
          ${"ESP8266" === this._installState.chipFamily ? "a Moment" : "2 Moments"}.<br />
          Keep this page visible
        `, n),
                    i = !0
                } else if ("finished" === this._installState.state) {
                    e = void 0;
                    const i = null !== this._client;
                    t = h`
           <center>U are the Master!<br></center> <ewt-button
        slot="primaryAction"
        dialogAction="ok"
        label="Close"
      ></ewt-button>
            <ewt-page-message
        .icon=${"🎉"}
        label="Installation complete!"
    >-</ewt-page-message><br>
    <center>
    Next to configure WiFi<br>
<br></center>
  <ewt-button
        slot="primaryAction"
        label="Next"
        @click=${() => { this._state = i && this._installErase ? "PROVISION" : "DASHBOARD" }}
    ></ewt-button>
 
      `}else"error"===this._installState.state&&(e="Installation failed",t=h`
        <ewt-page-message
          .icon=${"⚠️"}
          .label=${this._installState.message}
        ></ewt-page-message>
        <ewt-button
          slot="primaryAction"
          label="Back"
          @click=${async()=>{
                        this._initialize(),
                        this._state = "DASHBOARD"
                    }
                    }
        ></ewt-button>
      `);
            else
                e = "Installing",
                t = this._renderProgress("Preparing installation"),
                i = !0;
        else {
            e = "Confirm Installation";
            const i = n ? "update to" : "install";
            t = h`
        ${n ? h`Your device is running
              ${this._info.firmware}&nbsp;${this._info.version}.<br /><br />` : ""}
        Do you want to ${i}
        ${this._manifest.name}&nbsp;${this._manifest.version}?
        ${this._installErase ? h`<br /><br />All data on the device will be erased.` : ""}
        <ewt-button
          slot="primaryAction"
          label="Install"
          @click=${this._confirmInstall}
        ></ewt-button>
        <ewt-button
          slot="secondaryAction"
          label="Back"
          @click=${()=>{
                this._state = "DASHBOARD"
            }
            }
        ></ewt-button>
      `
        }
        return [e, t, i, !1]
    }
    _renderLogs() {
        let e;
        return e = h`
      <ewt-console .port=${this.port} .logger=${this.logger}></ewt-console>
      <ewt-button
        slot="primaryAction"
        label="Back"
        @click=${async()=>{
            await this.shadowRoot.querySelector("ewt-console").disconnect(),
            this._state = "DASHBOARD",
            this._initialize()
        }
        }
      ></ewt-button>
      <button onclick="document.querySelector('.log').innerHTML = '';">Clear Log</button>
      <ewt-button
        slot="secondaryAction"
        label="Download Logs"
        @click=${()=>{
            Wr(this.shadowRoot.querySelector("ewt-console").logs(), "esp-web-tools-logs.txt"),
            this.shadowRoot.querySelector("ewt-console").reset()
        }
        }
      ></ewt-button>
      <button id="delete-lines-btn" onclick="this.shadowRoot.querySelector("ewt-console").logs()=\"\"">Delete All Lines</button>
      buttons do not work, clear button and make links clickable in monitor?<br>
      Can you do that in TypeScript? <a href=\"https://github.com/ldijkman/async-esp-fs-webserver/discussions/7\" target=\"_blank\">Wishlist link</a><br>
      <ewt-button
        slot="secondaryAction"
        label="Reset Device"
        @click=${async()=>{
            await this.shadowRoot.querySelector("ewt-console").reset()
        }
        }
      ></ewt-button>
    `,
        ["Logs", e, !1]
    }
    willUpdate(e) {
        e.has("_state") && ("ERROR" !== this._state && (this._error = void 0),
        "PROVISION" === this._state ? this._updateSsids() : this._provisionForce = !1,
        "INSTALL" === this._state && (this._installConfirmed = !1,
        this._installState = void 0))
    }
    async _updateSsids(e=0) {
        const t = this._ssids;
        let i;
        this._ssids = void 0,
        this._busy = !0;
        try {
            i = await this._client.scan()
        } catch (e) {
            return void 0 === this._ssids && (this._ssids = null,
            this._selectedSsid = null),
            void (this._busy = !1)
        }
        if (0 === i.length && e < 3)
            return console.log("SCHEDULE RETRY", e),
            void setTimeout((()=>this._updateSsids(e + 1)), 1e3);
        t ? this._selectedSsid && !i.find((e=>e.name === this._selectedSsid)) && (this._selectedSsid = i[0].name) : this._selectedSsid = i.length ? i[0].name : null,
        this._ssids = i,
        this._busy = !1
    }
    firstUpdated(e) {
        super.firstUpdated(e),
        this._initialize()
    }
    updated(e) {
        super.updated(e),
        e.has("_state") && this.setAttribute("state", this._state),
        "PROVISION" === this._state && (e.has("_selectedSsid") && null === this._selectedSsid ? this._focusFormElement("ewt-textfield[name=ssid]") : e.has("_ssids") && this._focusFormElement())
    }
    _focusFormElement(e="ewt-textfield, ewt-select") {
        const t = this.shadowRoot.querySelector(e);
        t && t.updateComplete.then((()=>setTimeout((()=>t.focus()), 100)))
    }
    async _initialize(e=!1) {
        if (null === this.port.readable || null === this.port.writable)
            return this._state = "ERROR",
            void (this._error = "Serial port is not readable/writable. Close any other application using it and try again.");
        try {
            this._manifest = await (async e=>{
                const t = new URL(e,location.toString()).toString()
                  , i = await fetch(t)
                  , n = await i.json();
                return "new_install_skip_erase"in n && (console.warn('Manifest option "new_install_skip_erase" is deprecated. Use "new_install_prompt_erase" instead.'),
                n.new_install_skip_erase && (n.new_install_prompt_erase = !0)),
                n
            }
            )(this.manifestPath)
        } catch (e) {
            return this._state = "ERROR",
            void (this._error = "Failed to download manifest")
        }
        if (0 === this._manifest.new_install_improv_wait_time)
            return void (this._client = null);
        const t = new ui(this.port,this.logger);
        t.addEventListener("state-changed", (()=>{
            this.requestUpdate()
        }
        )),
        t.addEventListener("error-changed", (()=>this.requestUpdate()));
        try {
            const i = e ? void 0 !== this._manifest.new_install_improv_wait_time ? 1e3 * this._manifest.new_install_improv_wait_time : 1e4 : 1e3;
            this._info = await t.initialize(i),
            this._client = t,
            t.addEventListener("disconnect", this._handleDisconnect)
        } catch (e) {
            this._info = void 0,
            e instanceof mi ? (this._state = "ERROR",
            this._error = "Serial port is not ready. Close any other application using it and try again.") : (this._client = null,
            this.logger.error("Improv initialization failed.", e))
        }
    }
    _startInstall(e) {
        this._state = "INSTALL",
        this._installErase = e,
        this._installConfirmed = !1
    }
    async _confirmInstall() {
        this._installConfirmed = !0,
        this._installState = void 0,
        this._client && await this._closeClientWithoutEvents(this._client),
        this._client = void 0,
        await this.port.close(),
        (async(e,t,i,n,o)=>{
            let r, a;
            const d = t=>e({
                ...t,
                manifest: n,
                build: r,
                chipFamily: a
            })
              , s = new Pr(t)
              , l = new Hr({
                transport: s,
                baudrate: 115200,
                romBaudrate: 115200
            });
            window.esploader = l,
            d({
                state: "initializing",
                message: "Initializing...",
                details: {
                    done: !1
                }
            });
            try {
                await l.main_fn(),
                await l.flash_id()
            } catch (e) {
                return console.error(e),
                d({
                    state: "error",
                    message: "Failed to initialize. Try resetting your device or holding the BOOT button while clicking INSTALL.",
                    details: {
                        error: "failed_initialize",
                        details: e
                    }
                }),
                await Vr(s),
                void await s.disconnect()
            }
            if (a = l.chip.CHIP_NAME,
            !l.chip.ROM_TEXT)
                return d({
                    state: "error",
                    message: `Chip ${a} is not supported`,
                    details: {
                        error: "not_supported",
                        details: `Chip ${a} is not supported`
                    }
                }),
                await Vr(s),
                void await s.disconnect();
            if (d({
                state: "initializing",
                message: `Initialized. Found ${a}`,
                details: {
                    done: !0
                }
            }),
            r = n.builds.find((e=>e.chipFamily === a)),
            !r)
                return d({
                    state: "error",
                    message: `Your ${a} board is not supported.`,
                    details: {
                        error: "not_supported",
                        details: a
                    }
                }),
                await Vr(s),
                void await s.disconnect();
            d({
                state: "preparing",
                message: "Preparing installation...",
                details: {
                    done: !1
                }
            });
            const c = new URL(i,location.toString()).toString()
              , h = r.parts.map((async e=>{
                const t = new URL(e.path,c).toString()
                  , i = await fetch(t);
                if (!i.ok)
                    throw new Error(`Downlading firmware ${e.path} failed: ${i.status}`);
                const n = new FileReader
                  , o = await i.blob();
                return new Promise((e=>{
                    n.addEventListener("load", (()=>e(n.result))),
                    n.readAsBinaryString(o)
                }
                ))
            }
            ))
              , m = [];
            let p = 0;
            for (let e = 0; e < h.length; e++)
                try {
                    const t = await h[e];
                    m.push({
                        data: t,
                        address: r.parts[e].offset
                    }),
                    p += t.length
                } catch (e) {
                    return d({
                        state: "error",
                        message: e.message,
                        details: {
                            error: "failed_firmware_download",
                            details: e.message
                        }
                    }),
                    await Vr(s),
                    void await s.disconnect()
                }
            d({
                state: "preparing",
                message: "Installation prepared",
                details: {
                    done: !0
                }
            }),
            o && (d({
                state: "erasing",
                message: "Erasing device...",
                details: {
                    done: !1
                }
            }),
            await l.erase_flash(),
            d({
                state: "erasing",
                message: "Device erased",
                details: {
                    done: !0
                }
            })),
            d({
                state: "writing",
                message: "Writing progress: 0%",
                details: {
                    bytesTotal: p,
                    bytesWritten: 0,
                    percentage: 0
                }
            });
            let u = 0;
            try {
                await l.write_flash({
                    fileArray: m,
                    flashSize: "keep",
                    flashMode: "keep",
                    flashFreq: "keep",
                    eraseAll: !1,
                    compress: !0,
                    reportProgress: (e,t,i)=>{
                        const n = t / i * m[e].data.length
                          , o = Math.floor((u + n) / p * 100);
                        t !== i ? d({
                            state: "writing",
                            message: `Writing progress: ${o}%`,
                            details: {
                                bytesTotal: p,
                                bytesWritten: u + t,
                                percentage: o
                            }
                        }) : u += n
                    }
                })
            } catch (e) {
                return d({
                    state: "error",
                    message: e.message,
                    details: {
                        error: "write_failed",
                        details: e
                    }
                }),
                await Vr(s),
                void await s.disconnect()
            }
            d({
                state: "writing",
                message: "Writing complete",
                details: {
                    bytesTotal: p,
                    bytesWritten: u,
                    percentage: 100
                }
            }),
            await V(100),
            console.log("HARD RESET"),
            await Vr(s),
            console.log("DISCONNECT"),
            await s.disconnect(),
            d({
                state: "finished",
                message: "All done!"
            })
        }
        )((e=>{
            this._installState = e,
            "finished" === e.state ? V(100).then((()=>this.port.open({
                baudRate: 115200
            }))).then((()=>this._initialize(!0))).then((()=>this.requestUpdate())) : "error" === e.state && V(100).then((()=>this.port.open({
                baudRate: 115200
            })))
        }
        ), this.port, this.manifestPath, this._manifest, this._installErase)
    }
    async _doProvision() {
        var e;
        this._busy = !0,
        this._wasProvisioned = this._client.state === ci.PROVISIONED;
        const t = null === this._selectedSsid ? this.shadowRoot.querySelector("ewt-textfield[name=ssid]").value : this._selectedSsid
          , i = (null === (e = this.shadowRoot.querySelector("ewt-textfield[name=password]")) || void 0 === e ? void 0 : e.value) || "";
        try {
            await this._client.provision(t, i, 3e4)
        } catch (e) {
            return
        } finally {
            this._busy = !1,
            this._provisionForce = !1
        }
    }
    async _handleClose() {
        this._client && await this._closeClientWithoutEvents(this._client),
        ((e,t,i,n)=>{
            n = n || {};
            const o = new CustomEvent(t,{
                bubbles: void 0 === n.bubbles || n.bubbles,
                cancelable: Boolean(n.cancelable),
                composed: void 0 === n.composed || n.composed,
                detail: i
            });
            e.dispatchEvent(o)
        }
        )(this, "closed"),
        this.parentNode.removeChild(this)
    }
    get _isSameFirmware() {
        var e;
        return !!this._info && ((null === (e = this.overrides) || void 0 === e ? void 0 : e.checkSameFirmware) ? this.overrides.checkSameFirmware(this._manifest, this._info) : this._info.firmware === this._manifest.name)
    }
    get _isSameVersion() {
        return this._isSameFirmware && this._info.version === this._manifest.version
    }
    async _closeClientWithoutEvents(e) {
        e.removeEventListener("disconnect", this._handleDisconnect),
        await e.close()
    }
}
Gr.styles = [F, u`
      :host {
        --mdc-dialog-max-width: 390px;
      }
      ewt-icon-button {
        position: absolute;
        right: 4px;
        top: 10px;
      }
      .table-row {
        display: flex;
      }
      .table-row.last {
        margin-bottom: 16px;
      }
      .table-row svg {
        width: 20px;
        margin-right: 8px;
      }
      ewt-textfield,
      ewt-select {
        display: block;
        margin-top: 16px;
      }
      .dashboard-buttons {
        margin: 0 0 -16px -8px;
      }
      .dashboard-buttons div {
        display: block;
        margin: 4px 0;
      }
      a.has-button {
        text-decoration: none;
      }
      .error {
        color: var(--improv-danger-color);
      }
      .danger {
        --mdc-theme-primary: var(--improv-danger-color);
        --mdc-theme-secondary: var(--improv-danger-color);
      }
      button.link {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        text-align: left;
        text-decoration: underline;
        cursor: pointer;
      }
      :host([state="LOGS"]) ewt-dialog {
        --mdc-dialog-max-width: 90vw;
      }
      ewt-console {
        width: calc(80vw - 48px);
        height: 70vh;
      }
      ewt-list-item[value="-1"] {
        border-top: 1px solid #ccc;
      }
    `],
i([r()], Gr.prototype, "_client", void 0),
i([r()], Gr.prototype, "_state", void 0),
i([r()], Gr.prototype, "_installErase", void 0),
i([r()], Gr.prototype, "_installConfirmed", void 0),
i([r()], Gr.prototype, "_installState", void 0),
i([r()], Gr.prototype, "_provisionForce", void 0),
i([r()], Gr.prototype, "_error", void 0),
i([r()], Gr.prototype, "_busy", void 0),
i([r()], Gr.prototype, "_ssids", void 0),
i([r()], Gr.prototype, "_selectedSsid", void 0),
customElements.define("ewt-install-dialog", Gr);
export {Gr as EwtInstallDialog};
