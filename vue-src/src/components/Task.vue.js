var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { TaskStatus } from '../App.vue';
export default (await import('vue')).defineComponent({
    data: function () {
        return {
            done: this.info.status == TaskStatus.done
        };
    },
    props: [
        "info"
    ],
    emits: [
        "statusChange",
        "textChange",
        "removePressed"
    ],
    computed: {
        dateString: function () {
            var formatter = Intl.DateTimeFormat("ru-RU", { hour: '2-digit', minute: '2-digit' });
            return formatter.format(this.info.date);
        }
    },
    methods: {
        flipDoneState: function () {
            this.done = !this.done;
            this.$emit("statusChange", {
                taskID: this.info.id,
                status: this.done
            });
        },
        removeSelf: function () {
            this.$emit("removePressed", {
                taskID: this.info.id
            });
        },
        updateText: function () {
            this.$emit("textChange", {
                taskID: this.info.id,
                name: this.$refs.name_field.textContent,
                desc: this.$refs.desc_field.textContent
            });
        }
    }
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    var __VLS_ctx = {};
    var __VLS_localComponents = __assign(__assign({}, {}), __VLS_ctx);
    var __VLS_components;
    var __VLS_localDirectives = __assign(__assign({}, {}), __VLS_ctx);
    var __VLS_directives;
    var __VLS_styleScopedClasses;
    __VLS_styleScopedClasses['task'];
    // CSS variable injection 
    // CSS variable injection end 
    var __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("task") }, { class: ((__VLS_ctx.done ? 'selected' : '')) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("task__text") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("task__row") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign(__assign({ onInput: (__VLS_ctx.updateText) }, { class: ("task__name task__text-item") }), { contenteditable: (true), ref: ("name_field") }));
    // @ts-ignore navigation for `const name_field = ref()`
    __VLS_ctx.name_field;
    (__VLS_ctx.info.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: ("task__name-sep task__text-item") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: ("task__date task__text-item") }));
    (__VLS_ctx.dateString);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onInput: (__VLS_ctx.updateText) }, { ref: ("desc_field"), contenteditable: (true) }));
    // @ts-ignore navigation for `const desc_field = ref()`
    __VLS_ctx.desc_field;
    (__VLS_ctx.info.desc);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("task__controls") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign(__assign({ onClick: (__VLS_ctx.flipDoneState) }, { type: ("checkbox") }), { class: ("task__done") }), { checked: ((__VLS_ctx.done)) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign(__assign({ onClick: (__VLS_ctx.removeSelf) }, { type: ("button") }), { class: ("task__remove") }), { value: ("x") }));
    __VLS_styleScopedClasses['task'];
    __VLS_styleScopedClasses['task__text'];
    __VLS_styleScopedClasses['task__row'];
    __VLS_styleScopedClasses['task__name'];
    __VLS_styleScopedClasses['task__text-item'];
    __VLS_styleScopedClasses['task__name-sep'];
    __VLS_styleScopedClasses['task__text-item'];
    __VLS_styleScopedClasses['task__date'];
    __VLS_styleScopedClasses['task__text-item'];
    __VLS_styleScopedClasses['task__controls'];
    __VLS_styleScopedClasses['task__done'];
    __VLS_styleScopedClasses['task__remove'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    var __VLS_refs = {
        "name_field": __VLS_nativeElements['span'],
        "desc_field": __VLS_nativeElements['div'],
    };
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
var __VLS_self;
