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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import Task from './components/Task.vue';
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["done"] = 0] = "done";
    TaskStatus[TaskStatus["not_done"] = 1] = "not_done";
    TaskStatus[TaskStatus["overdue"] = 2] = "overdue";
})(TaskStatus || (TaskStatus = {}));
;
function task_mapper(task) {
    var result = {
        name: task.fields.name,
        desc: task.fields.desc,
        date: new Date(task.fields.date),
        status: task.fields.status ? TaskStatus.done : TaskStatus.not_done,
        id: task.fields.taskID
    };
    for (var key in Object.keys(result))
        if (result[key] !== undefined &&
            result[key] !== null)
            throw new Error("One or more values are missing");
    return result;
}
export default (await import('vue')).defineComponent({
    components: {
        Task: Task
    },
    mounted: function () {
        return __awaiter(this, void 0, void 0, function () {
            var saved_data, old_tasks, exc_1, _i, old_tasks_1, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("/api/tasks", {
                                method: "GET",
                                headers: {
                                    "X-CSRFToken": this.csrf
                                },
                            })];
                    case 1:
                        saved_data = _a.sent();
                        return [4 /*yield*/, saved_data.json()];
                    case 2:
                        old_tasks = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exc_1 = _a.sent();
                        alert("Error retrieving tasks");
                        return [3 /*break*/, 4];
                    case 4:
                        for (_i = 0, old_tasks_1 = old_tasks; _i < old_tasks_1.length; _i++) {
                            task = old_tasks_1[_i];
                            try {
                                this.tasks.push(task_mapper(task));
                            }
                            catch (exc) {
                                alert("Error parcing a task");
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    data: function () {
        var formatter = Intl.DateTimeFormat("ru-RU", { hour: '2-digit', minute: '2-digit' });
        var date_ = formatter.format(new Date());
        var data = {
            tasks: [],
            date: date_,
            states: TaskStatus,
            currentType: null,
            csrf: document.querySelector("[name=csrfmiddlewaretoken]").value
        };
        return data;
    },
    computed: {
        tasksShownCurrently: function () {
            var _this = this;
            return this.tasks.filter(function (task) {
                if (_this.currentType == TaskStatus.overdue &&
                    task.status == TaskStatus.not_done)
                    return task.date.getTime() < new Date().getTime();
                return task.status == _this.currentType || _this.currentType == null;
            });
        }
    },
    methods: {
        removeTask: function (_a) {
            var taskID = _a.taskID;
            try {
                fetch("/api/tasks/", {
                    method: "DELETE",
                    headers: {
                        "X-CSRFToken": this.csrf
                    },
                    body: JSON.stringify({ id: taskID })
                });
            }
            catch (exc) {
                alert("Failed to contact the server, try again");
                return;
            }
            this.tasks = this.tasks.filter(function (task) { return task.id != taskID; });
        },
        addTask: function (name, desc, time) {
            var timeComponents = time.split(":");
            var date = new Date();
            date.setHours(+timeComponents[0]);
            date.setMinutes(+timeComponents[1]);
            var item = {
                name: name,
                date: date,
                status: TaskStatus.not_done,
                id: this.generateID(),
                desc: desc
            };
            this.tasks.push(item);
            fetch("/api/tasks/", {
                method: "PUT",
                headers: {
                    "X-CSRFToken": this.csrf
                },
                body: JSON.stringify(item)
            });
        },
        filterTasksByState: function (type) {
            this.currentType = type;
        },
        updateTaskText: function (_a) {
            var taskID = _a.taskID, name = _a.name, desc = _a.desc;
            fetch("/api/tasks/", {
                method: "PATCH",
                headers: {
                    "X-CSRFToken": this.csrf
                },
                body: JSON.stringify({
                    id: taskID,
                    name: name,
                    desc: desc
                })
            });
        },
        // синхрон тасков-элементов и моделей тасков
        updateTaskStatus: function (_a) {
            var taskID = _a.taskID, status = _a.status;
            var taskToUpdate = this.tasks.find(function (task) { return task.id == taskID; });
            if (!taskToUpdate)
                throw new Error("Task ID not found — " + taskID);
            taskToUpdate.status = status;
            fetch("/api/tasks/", {
                method: "PATCH",
                headers: {
                    "X-CSRFToken": this.csrf
                },
                body: JSON.stringify({
                    id: taskID,
                    status: status
                })
            });
        },
        generateID: function () {
            return new Date().getTime();
        }
    }
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    var __VLS_ctx = {};
    var __VLS_localComponents = __assign(__assign({
        Task: Task
    }, {}), __VLS_ctx);
    var __VLS_components;
    var __VLS_localDirectives = __assign(__assign({}, {}), __VLS_ctx);
    var __VLS_directives;
    var __VLS_styleScopedClasses;
    __VLS_styleScopedClasses['tab'];
    // CSS variable injection 
    // CSS variable injection end 
    var __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("main") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("tabs") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.filterTasksByState(null);
        } }, { class: ("tab all-tab") }), { class: ((__VLS_ctx.currentType === null ? 'selected' : '')) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("tab-text") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.filterTasksByState(__VLS_ctx.states.done);
        } }, { class: ("tab done-tab") }), { class: ((__VLS_ctx.currentType === __VLS_ctx.states.done ? 'selected' : '')) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("tab-text") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.filterTasksByState(__VLS_ctx.states.not_done);
        } }, { class: ("tab not-done-tab") }), { class: ((__VLS_ctx.currentType === __VLS_ctx.states.not_done ? 'selected' : '')) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("tab-text") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.filterTasksByState(__VLS_ctx.states.overdue);
        } }, { class: ("tab not-done-tab") }), { class: ((__VLS_ctx.currentType === __VLS_ctx.states.overdue ? 'selected' : '')) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("tab-text") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("task-container") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("task-container__list") }, { ref: ("task_list") }));
    // @ts-ignore navigation for `const task_list = ref()`
    __VLS_ctx.task_list;
    for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.tasksShownCurrently)); _i < _a.length; _i++) {
        var task = _a[_i][0];
        var __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Task;
        /** @type { [typeof __VLS_components.Task, typeof __VLS_components.Task, ] } */
        // @ts-ignore
        var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign(__assign(__assign({ 'onStatusChange': {} }, { 'onTextChange': {} }), { 'onRemovePressed': {} }), { info: ((task)), key: ((task.id)) })));
        var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign(__assign({ 'onStatusChange': {} }, { 'onTextChange': {} }), { 'onRemovePressed': {} }), { info: ((task)), key: ((task.id)) })], __VLS_functionalComponentArgsRest(__VLS_1), false));
        var __VLS_6 = void 0;
        var __VLS_7 = {
            onStatusChange: (__VLS_ctx.updateTaskStatus)
        };
        var __VLS_8 = {
            onTextChange: (__VLS_ctx.updateTaskText)
        };
        var __VLS_9 = {
            onRemovePressed: (__VLS_ctx.removeTask)
        };
        var __VLS_3 = void 0;
        var __VLS_4 = void 0;
        var __VLS_5;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("task-container__controls") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("task-container__control-row") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ class: ("task-container__name-field") }, { placeholder: ("New Task Name"), ref: ("new_task_name") }));
    // @ts-ignore navigation for `const new_task_name = ref()`
    __VLS_ctx.new_task_name;
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ class: ("task-container__date-field") }, { type: ("time"), value: ((__VLS_ctx.date)), ref: ("new_task_date") }));
    // @ts-ignore navigation for `const new_task_date = ref()`
    __VLS_ctx.new_task_date;
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.addTask($refs.new_task_name.value, $refs.new_task_text.value, $refs.new_task_date.value);
        } }, { type: ("button") }), { class: ("task-container__add-button") }), { value: ("Add Task") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("task-container__control-area") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)(__assign({ class: ("task-container__description-field") }, { ref: ("new_task_text"), placeholder: ("description") }));
    // @ts-ignore navigation for `const new_task_text = ref()`
    __VLS_ctx.new_task_text;
    __VLS_styleScopedClasses['main'];
    __VLS_styleScopedClasses['tabs'];
    __VLS_styleScopedClasses['tab'];
    __VLS_styleScopedClasses['all-tab'];
    __VLS_styleScopedClasses['tab-text'];
    __VLS_styleScopedClasses['tab'];
    __VLS_styleScopedClasses['done-tab'];
    __VLS_styleScopedClasses['tab-text'];
    __VLS_styleScopedClasses['tab'];
    __VLS_styleScopedClasses['not-done-tab'];
    __VLS_styleScopedClasses['tab-text'];
    __VLS_styleScopedClasses['tab'];
    __VLS_styleScopedClasses['not-done-tab'];
    __VLS_styleScopedClasses['tab-text'];
    __VLS_styleScopedClasses['task-container'];
    __VLS_styleScopedClasses['task-container__list'];
    __VLS_styleScopedClasses['task-container__controls'];
    __VLS_styleScopedClasses['task-container__control-row'];
    __VLS_styleScopedClasses['task-container__name-field'];
    __VLS_styleScopedClasses['task-container__date-field'];
    __VLS_styleScopedClasses['task-container__add-button'];
    __VLS_styleScopedClasses['task-container__control-area'];
    __VLS_styleScopedClasses['task-container__description-field'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    var __VLS_refs = {
        "task_list": __VLS_nativeElements['div'],
        "new_task_name": __VLS_nativeElements['input'],
        "new_task_date": __VLS_nativeElements['input'],
        "new_task_text": __VLS_nativeElements['textarea'],
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
