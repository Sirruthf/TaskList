<script lang="ts">
    import { info } from 'console';
    import { TaskStatus } from '../App.vue';

    export default {
        data () {
            return {
                done: this.info.status == TaskStatus.done
            }
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
            dateString () {
                let formatter = Intl.DateTimeFormat("ru-RU", { hour: '2-digit', minute: '2-digit' });
                return formatter.format(this.info.date);
            }
        },

        methods: {
            flipDoneState () {
                this.done = !this.done;
                this.$emit("statusChange", {
                    taskID: this.info.id,
                    status: this.done
                });
            },

            removeSelf () {
                this.$emit("removePressed", {
                    taskID: this.info.id
                });
            },

            updateText () {
                this.$emit("textChange", {
                    taskID: this.info.id,
                    name: (this.$refs.name_field as HTMLElement).textContent,
                    desc: (this.$refs.desc_field as HTMLElement).textContent
                });
            }
        }
    };

</script>

<template>

    <div class="task" :class="done ? 'selected' : ''">

        <div class="task__text">
            <div class="task__row">
                <span class="task__name task__text-item" @input="updateText" contenteditable ref="name_field">{{ info.name }}</span>
                <span class="task__name-sep task__text-item"> // </span>
                <span class="task__date task__text-item">{{ dateString }}</span>
            </div>
            <div ref="desc_field" @input="updateText" contenteditable>{{ info.desc }}</div>
        </div>
        <div class="task__controls">
            <!-- <div class="task__edit" @click="flipEditState">
                <img class="task__edit-img" src="/src/assets/editing.png">
            </div> -->
            <input type="checkbox" class="task__done" :checked="done" @click="flipDoneState">
            <input type="button" class="task__remove" @click="removeSelf" value="x">
        </div>

    </div>

</template>

<style scoped>

    .task {
        display: flex;

        background: white;
        padding: 2%;
        margin: .2%;
    }

    .task.selected {
        background: #dffde7;
    }

    .task__text {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        gap: 1%; 
    }

    .task__row {
        display: flex;
        flex-grow: 1;
        gap: 1%; 
    }

    .task__name.in_edit {
        outline: 1px solid gray;
        text-decoration: none;
    }

    .task__controls {
        display: flex;
        align-items: center;
    }

    .task__done {
        width: 1vw;
        height: 1vw;

        cursor: pointer;
    }

    .task__edit {
        width: 1vw;
        height: 1vw;

        background: #EEE;
        cursor: pointer;
    }

    .task__edit-img {
        height: 100%;
    }

</style>