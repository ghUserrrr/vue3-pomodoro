<template>
    <div class="tasks">
        <div class="tasks__header">
            <h2 class="tasks__title">Tasks</h2>
            <button
                ref="burgerMenuBtn"
                @click="toggleBurgerMenu()"
                class="tasks__burger-btn burger"
            >
                <img
                    src="../assets/threedots-white.png"
                    class="burger-img"
                    alt="open-menu"
                />
            </button>
            <div
                v-if="timerStore.isBurgerMenuVisible"
                v-click-outside="onClickOutsideBurgerMenu"
                class="tasks__burger-menu burger-menu"
            >
                <button
                    @click="
                        clearFinishedTasks();
                        toggleBurgerMenu();
                    "
                    class="burger-menu__button"
                >
                    <img
                        class="burger-menu__img"
                        src="../assets/delete-black.png"
                    />Clear finished tasks
                </button>
                <button
                    @click="
                        clearLapCounter();
                        toggleBurgerMenu();
                    "
                    class="burger-menu__button"
                >
                    <img
                        class="burger-menu__img"
                        src="../assets/clear-black.png"
                    />Clear act pomodoros
                </button>
                <button
                    @click="
                        clearAllTasks();
                        toggleBurgerMenu();
                    "
                    class="burger-menu__button"
                >
                    <img
                        class="burger-menu__img"
                        src="../assets/delete-black.png"
                    />Clear all tasks
                </button>
            </div>
        </div>
        <div class="tasks-wrapper">
            <ul class="tasks__list">
                <li
                    ref="task"
                    v-for="(toDo, index) in timerStore.toDo.tasks"
                    :key="index"
                    class="tasks__item tasks-item edit__touch"
                >
                    <div
                        v-if="!timerStore.toDo.isTaskEditorOpen[index]"
                        class="tasks-item__wrapper"
                        :class="{
                            'tasks-item__wrapper_active':
                                timerStore.toDo.isTaskActive[index],
                        }"
                        @click.self="setActiveTask(index)"
                    >
                        <div class="row">
                            <span
                                @click.self="setActiveTask(index)"
                                :class="{
                                    'tasks-item__title_checked':
                                        timerStore.toDo.isTaskChecked[index],
                                }"
                                class="tasks-item__title"
                            >
                                <div
                                    @click="
                                        timerStore.toDo.isTaskChecked[index] =
                                            !timerStore.toDo.isTaskChecked[
                                                index
                                            ]
                                    "
                                    :class="{
                                        'tasks-item__checkbox_checked':
                                            timerStore.toDo.isTaskChecked[
                                                index
                                            ],
                                    }"
                                    class="tasks-item__checkbox"
                                ></div>
                                {{ toDo }}
                            </span>
                            <div
                                @click.self="setActiveTask(index)"
                                class="tasks-item__controls ml-auto"
                            >
                                <div class="tasks-item__counters-wrapper">
                                    <span
                                        @click="setActiveTask(index)"
                                        class="tasks-item__current-pomodoro"
                                    >
                                        {{ timerStore.toDo.taskLaps[index] }}
                                    </span>
                                    <span class="tasks-item__pomodoros-left"
                                        >/</span
                                    >
                                    <span
                                        @click="setActiveTask(index)"
                                        class="tasks-item__pomodoros-left"
                                        >{{
                                            timerStore.toDo.pomodoroCounters[
                                                index
                                            ]
                                        }}</span
                                    >
                                </div>
                                <button
                                    ref="taskEditorBtn"
                                    @click="
                                        toggleTaskEditor(index);
                                        setTempTask(index);
                                        setTempNote(index);
                                        setTempPomodoroCounter(index);
                                    "
                                    class="tasks__burger-btn editor-btn burger edit__touch"
                                >
                                    <img
                                        src="../assets/vertical-ellipsis.png"
                                        class="burger-img edit__touch"
                                        alt="open-menu"
                                    />
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="tasks-item__note-wrapper">
                                <span
                                    class="tasks-item__note"
                                    v-if="
                                        timerStore.toDo.notes[index].trim() !=
                                        ''
                                    "
                                >
                                    {{ timerStore.toDo.notes[index] }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div v-else class="tasks__editor edit__touch">
                        <form class="tasks__form form edit__touch">
                            <input
                                class="tasks__input edit__touch"
                                type="text"
                                placeholder="What are you working on?"
                                v-model="tempTask"
                            />
                            <h3 class="form__counter-title edit__touch">
                                Act / Est pomodoros
                            </h3>
                            <div class="form__counter-wrapper edit__touch">
                                <input
                                    class="form__counter-input width70 edit__touch"
                                    type="number"
                                    min="1"
                                />
                                <span
                                    class="form__counter-separator edit__touch"
                                    >/</span
                                >
                                <input
                                    class="form__counter-input width70 edit__touch"
                                    type="number"
                                    v-model="tempPomodoroCounter"
                                    min="1"
                                />
                                <button
                                    class="form__counter-control counter-control edit__touch"
                                    @click.prevent="tempPomodoroCounter++"
                                >
                                    <img
                                        class="counter-control__img edit__touch"
                                        src="../assets/caret-up.png"
                                        alt=""
                                    />
                                </button>
                                <button
                                    class="form__counter-control counter-control edit__touch"
                                    @click.prevent="
                                        if (tempPomodoroCounter > 1) {
                                            tempPomodoroCounter--;
                                        }
                                    "
                                >
                                    <img
                                        class="counter-control__img edit__touch"
                                        src="../assets/caret-down.png"
                                        alt=""
                                    />
                                </button>
                            </div>
                            <button
                                v-if="!timerStore.toDo.isNote[index]"
                                class="form__add-note edit__touch"
                                @click="timerStore.toDo.isNote[index] = true"
                            >
                                + Add Note
                            </button>
                            <textarea
                                v-else
                                v-model="tempNote"
                                type="text"
                                class="form__edit-note edit__touch"
                                placeholder="Some notes..."
                            />
                        </form>
                        <div class="tasks-wrapper-bottom edit__touch">
                            <button
                                @click="deleteTask(index)"
                                class="cancel-btn btn edit__touch"
                            >
                                Delete
                            </button>
                            <button
                                @click="closeAllTaskEditors()"
                                class="cancel-btn btn ml-auto edit__touch"
                            >
                                Cancel
                            </button>
                            <button
                                @click="
                                    saveTaskChange(index);
                                    saveNoteChange(index);
                                    savepomodoroCounterChange(index);
                                    closeAllTaskEditors();
                                "
                                class="submit-btn btn edit__touch"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div
        v-if="isAddingTaskOpened"
        v-click-outside="onClickOutsideTaskForm"
        class="tasks__adding"
    >
        <form class="tasks__form form">
            <input
                class="tasks__input"
                type="text"
                placeholder="What are you working on?"
                v-model="timerStore.toDo.inputTask"
            />
            <h3 class="form__counter-title">Est pomodoros</h3>
            <div class="form__counter-wrapper">
                <input
                    class="form__counter-input width70"
                    type="number"
                    v-model="timerStore.toDo.pomodoroCounter"
                    min="1"
                />
                <button
                    class="form__counter-control counter-control"
                    @click.prevent="increasePomodoroCounter()"
                >
                    <img
                        class="counter-control__img"
                        src="../assets/caret-up.png"
                        alt=""
                    />
                </button>
                <button
                    class="form__counter-control counter-control"
                    @click.prevent="decreasePomodoroCounter()"
                >
                    <img
                        class="counter-control__img"
                        src="../assets/caret-down.png"
                        alt=""
                    />
                </button>
            </div>
            <button
                v-if="!timerStore.toDo.isNoteOpen"
                class="form__add-note"
                @click="timerStore.toDo.isNoteOpen = true"
            >
                + Add Note
            </button>
            <textarea
                v-else
                v-model="timerStore.toDo.inputNote"
                type="text"
                class="form__edit-note"
                placeholder="Some notes..."
            />
        </form>
        <div class="tasks-wrapper-bottom">
            <button
                @click="isAddingTaskOpened = !isAddingTaskOpened"
                class="cancel-btn btn ml-auto"
            >
                Cancel
            </button>
            <button
                class="submit-btn btn"
                @click="
                    addTask();
                    addNote();
                    addPomodoroCounter();
                    closeNote();
                    clearInputNote();
                    clearPomodoroCounter();
                    clearInputValue();
                "
            >
                Save
            </button>
        </div>
    </div>
    <button
        v-else
        @click="isAddingTaskOpened = !isAddingTaskOpened"
        ref="addingTaskBtn"
        class="tasks__add-btn"
    >
        Add Task
    </button>
    <div v-if="timerStore.toDo.tasks.length > 0" class="tasks-time">
        <div class="tasks-time__item tasks-time-item">
            Est:
            <span class="tasks-time-item__value">{{
                timerStore.totalPomodoroCounter
            }}</span>
        </div>
        <div class="tasks-time__item tasks-time-item">
            Act:
            <span class="tasks-time-item__value">{{
                timerStore.lapCounter
            }}</span>
        </div>
        <div class="tasks-time__item tasks-time-item">
            Finish at
            <span class="tasks-time-item__value">{{
                timerStore.finishTime
            }}</span>
        </div>
    </div>
</template>

<script>
import { useTimerStore } from "@/stores/timerStore";

export default {
    name: "MyTasks",
    setup() {
        const timerStore = useTimerStore();

        return {
            timerStore,
        };
    },
    data() {
        return {
            isAddingTaskOpened: false,
            tempTask: "",
            tempNote: "",
            tempPomodoroCounter: "",
            tempTaskLaps: "",
            currentEvent: "",
        };
    },
    created() {
        let data = this;
        document.addEventListener("click", function (e) {
            if (!e.target.classList.contains("edit__touch")) {
                data.closeAllTaskEditors();
            }
        });
    },
    methods: {
        clearInputValue() {
            this.timerStore.toDo.inputTask = "";
        },
        addTask() {
            if (this.timerStore.toDo.inputTask.length > 0) {
                this.timerStore.toDo.tasks.push(this.timerStore.toDo.inputTask);
                this.timerStore.toDo.isTaskChecked.push(false);
                this.timerStore.toDo.isTaskEditorOpen.push(false);
                this.timerStore.toDo.isTaskActive.push(false);
                this.timerStore.toDo.taskLaps.push(0);
                if (this.timerStore.toDo.inputNote.trim().length > 0) {
                    this.timerStore.toDo.isNote.push(true);
                } else {
                    this.timerStore.toDo.isNote.push(false);
                }
            }
        },
        deleteTask(index) {
            this.timerStore.toDo.tasks.splice(index, 1);
            this.timerStore.toDo.isTaskChecked.splice(index, 1);
            this.timerStore.toDo.isTaskEditorOpen.splice(index, 1);
            this.timerStore.toDo.pomodoroCounters.splice(index, 1);
            this.timerStore.toDo.isNote.splice(index, 1);
            this.timerStore.toDo.notes.splice(index, 1);
            this.timerStore.toDo.isTaskActive.splice(index, 1);
            this.timerStore.toDo.taskLaps.splice(index, 1);
        },
        setActiveTask(index) {
            this.setInactiveTasks();
            this.timerStore.toDo.isTaskActive[index] = true;
        },
        setInactiveTasks() {
            for (let i = 0; i < this.timerStore.toDo.isTaskActive.length; i++) {
                this.timerStore.toDo.isTaskActive[i] = false;
            }
        },
        onClickOutsideTaskForm(event) {
            if (event !== this.$refs.addingTaskBtn && this.isAddingTaskOpened) {
                this.isAddingTaskOpened = false;
            }
        },

        toggleBurgerMenu() {
            this.timerStore.isBurgerMenuVisible =
                !this.timerStore.isBurgerMenuVisible;
        },
        onClickOutsideBurgerMenu(event) {
            if (event !== this.$refs.burgerMenuBtn) {
                this.timerStore.isBurgerMenuVisible = false;
            }
        },

        addPomodoroCounter() {
            if (this.timerStore.toDo.inputTask.length > 0) {
                this.timerStore.toDo.pomodoroCounters.push(
                    this.timerStore.toDo.pomodoroCounter
                );
            }
        },
        increasePomodoroCounter() {
            this.timerStore.toDo.pomodoroCounter++;
        },
        decreasePomodoroCounter() {
            if (this.timerStore.toDo.pomodoroCounter > 1)
                this.timerStore.toDo.pomodoroCounter--;
        },
        clearPomodoroCounter() {
            this.timerStore.toDo.pomodoroCounter = 1;
        },

        addNote() {
            if (this.timerStore.toDo.inputTask.length > 0) {
                this.timerStore.toDo.notes.push(this.timerStore.toDo.inputNote);
            }
        },
        closeNote() {
            if (this.timerStore.toDo.inputTask.length > 0) {
                this.timerStore.toDo.isNoteOpen = false;
            }
        },
        clearInputNote() {
            this.timerStore.toDo.inputNote = "";
        },

        toggleTaskEditor(index) {
            this.closeAllTaskEditors();
            this.timerStore.toDo.isTaskEditorOpen[index] =
                !this.timerStore.toDo.isTaskEditorOpen[index];
        },
        closeAllTaskEditors() {
            for (
                let i = 0;
                i < this.timerStore.toDo.isTaskEditorOpen.length;
                i++
            ) {
                this.timerStore.toDo.isTaskEditorOpen[i] = false;
            }
        },
        setTempTask(index) {
            this.tempTask = this.timerStore.toDo.tasks[index];
        },
        setTempNote(index) {
            this.tempNote = this.timerStore.toDo.notes[index];
        },
        setTempPomodoroCounter(index) {
            this.tempPomodoroCounter =
                this.timerStore.toDo.pomodoroCounters[index];
        },

        saveTaskChange(index) {
            this.timerStore.toDo.tasks[index] = this.tempTask;
        },
        saveNoteChange(index) {
            this.timerStore.toDo.notes[index] = this.tempNote;
        },
        savepomodoroCounterChange(index) {
            this.timerStore.toDo.pomodoroCounters[index] =
                this.tempPomodoroCounter;
        },

        clearFinishedTasks() {
            let i = 0;
            for (i = 0; i < this.timerStore.toDo.isTaskChecked.length; i++) {
                if (this.timerStore.toDo.isTaskChecked[i]) {
                    this.deleteTask(i);
                    i--;
                }
            }
        },
        clearLapCounter() {
            this.timerStore.lapCounter = 0;
        },
        clearAllTasks() {
            let i = 0;
            for (i = 0; i < this.timerStore.toDo.tasks.length; i) {
                this.deleteTask(i);
            }
        },
    },
    watch: {
        "timerStore.lapCounter": function () {
            let i = 0;
            for (i = 0; i < this.timerStore.toDo.isTaskActive.length; i++) {
                if (this.timerStore.toDo.isTaskActive[i]) {
                    this.timerStore.toDo.taskLaps[i]++;
                }
            }
        },
        "timerStore.toDo.tasks": {
            deep: true,
            handler() {
                if (
                    !this.timerStore.toDo.isTaskActive.some(
                        (elem) => elem === true
                    ) &&
                    this.timerStore.toDo.isTaskActive.length > 0
                ) {
                    this.timerStore.toDo.isTaskActive[0] = true;
                }
            },
        },
    },
};
</script>

<style lang="scss">
.tasks {
    @media (max-width: 576px) {
        margin: 0 auto;
        width: 90%;
    }
}

.tasks__adding {
    @media (max-width: 576px) {
        margin: 0 auto;
        width: 90%;
    }
}

.tasks__form {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    padding: 18px 20px 18px;
    width: 100%;

    text-align: left;

    background-color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: rgb(0 0 0 / 15%) 0px 10px 20px, rgb(0 0 0 / 10%) 0px 3px 6px;
}

.tasks-wrapper {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.tasks__header {
    position: relative;

    display: flex;
    align-items: center;
    padding-bottom: 14px;

    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
}

.tasks__input {
    border-radius: 4px;
    font-size: 22px;
    padding: 10px 0px;
    box-shadow: none;
    border: none;
    color: rgb(85, 85, 85);
    width: 100%;
    box-sizing: border-box;
    font-weight: bold;

    @media (max-width: 576px) {
        font-size: 19px;
    }
}

.tasks__title {
    font-size: 18px;
    color: #fff;
}

.tasks__list {
    background-color: none;
}

.tasks-item__wrapper {
    display: flex;
    flex-direction: column;
    padding: 18px 14px;
    margin-top: 8px;
    width: 100%;

    text-align: left;
    font-size: 16px;

    background-color: white;
    box-sizing: border-box;
    border-radius: 4px;
    border-left: 6px solid transparent;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 4px;
    transition: unset;
    cursor: pointer;

    &:hover {
        border-left: 6px solid rgb(204, 204, 204);
    }
}

.tasks-item__wrapper_active {
    border-left: 6px solid #222 !important;
    transform: translateY(2px);
}

.tasks-item__title {
    display: flex;
    align-items: center;
    width: 85%;

    color: rgb(85, 85, 85);
    font-weight: bold;
    align-items: center;
    line-height: 1.5em;

    overflow: hidden;
}

.tasks-item__title_checked {
    color: rgb(187, 187, 187);
    text-decoration: line-through;
}

.tasks-item__checkbox {
    display: inline-block;
    margin-right: 10px;
    width: 26px;
    height: 26px;

    border: 2px solid rgb(223, 223, 223);
    border-radius: 50%;
    background-color: rgb(223, 223, 223);

    &:hover {
        opacity: 0.6;
    }

    &::after {
        content: "";
        display: block;
        margin-left: 7px;
        margin-top: 3px;
        width: 8px;
        height: 14px;

        border-color: rgb(255, 255, 255);
        border-style: solid;
        border-image: none 100%/1/0 stretch;
        border-width: 0px 3px 3px 0px;
        transform: rotate(45deg);
    }
}

.tasks-item__checkbox_checked {
    border: 2px solid rgb(202, 86, 82);
    background-color: rgb(202, 86, 82);
}

.tasks-item__note-wrapper {
    margin-top: 18px;
    padding-left: 16px;
    padding-right: 4px;
    width: 100%;

    cursor: text;

    &:empty {
        display: none;
    }
}

.tasks-item__note {
    display: flex;
    margin-top: 0px;
    margin-bottom: 0px;
    padding: 10px 12px;

    font-size: 15px;
    white-space: pre-wrap;
    word-break: break-word;
    color: rgb(96, 85, 21);

    border-radius: 8px;
    background-color: rgb(252, 248, 222);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px;
}

.form__counter-title {
    margin-bottom: 8px;
}

.form__counter-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 17px;
}

.form__counter-input {
    margin-right: 10px;
    padding: 10px;
    width: 75px;

    font-size: 16px;
    font-weight: bold;
    color: rgb(85, 85, 85);

    border-radius: 4px;
    background-color: rgb(239, 239, 239);
    box-shadow: none;
    border: none;
    box-sizing: border-box;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &[type="number"] {
        -moz-appearance: textfield;
    }
}

.form__counter-separator {
    display: inline-block;
    color: rgb(187, 187, 187);
    margin: 0 6px 0 -4px;
}

.form__counter-control {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0px 2px;
    padding: 11px 12px;
    min-width: 0px;
    width: 40px;

    font-size: 14px;
    text-align: center;
    color: rgb(85, 85, 85);

    background-color: white;
    border-radius: 4px;
    border: 1px solid rgb(223, 223, 223);
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 2px;
    opacity: 0.9;
    cursor: pointer;
}

.counter-control__img {
    width: 10px;
    height: 10px;
    opacity: 0.6;
}

.form__add-note {
    display: inline-block;

    text-align: left;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.02em;
    text-decoration: underline;
    color: rgba(0, 0, 0, 0.4);

    border: none;
    border-radius: 4px;
    background: none;
    opacity: 0.9;
    box-shadow: none;
    cursor: pointer;
}

.form__edit-note {
    display: block;
    margin: 8px 0px;
    padding: 10px 14px;
    width: 100%;
    height: 62px;

    font-size: 15px;
    line-height: 1.4em;
    color: rgb(85, 85, 85);

    box-sizing: border-box;
    border-radius: 4px;
    outline: none;
    background-color: rgb(239, 239, 239);
    border: none;
    resize: none;
}

.tasks-item__controls {
    display: flex;
    align-items: center;
}

.tasks-item__counters-wrapper {
    display: flex;
    align-items: baseline;
}

.tasks-item__current-pomodoro {
    color: rgb(187, 187, 187);
    font-size: 18px;
}

.tasks-item__pomodoros-left {
    margin-left: 2px;

    color: rgb(187, 187, 187);
    font-size: 14px;
}

.tasks__burger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    padding: 8px;
    min-width: auto;

    text-align: center;
    color: white;
    font-size: 13px;

    border-radius: 4px;
    cursor: pointer;
    opacity: 0.9;
    background: none rgba(255, 255, 255, 0.2);
    box-shadow: none;
    border: none;
}

.burger-img {
    width: 16px;
}

.tasks__burger-menu {
    position: absolute;
    top: 32px;
    right: 0px;

    display: block;
    padding: 4px 0px;
    width: 200px;

    background-color: white;
    border-radius: 4px;
    opacity: 1;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 20px,
        rgba(0, 0, 0, 0.1) 0px 3px 6px;
    transform: translateY(10px);
    pointer-events: auto;
    z-index: 1;
}

.burger-menu__button {
    position: relative;

    display: flex;
    align-items: center;
    padding: 10px 16px;
    width: 100%;

    font-size: 14px;
    color: rgb(79, 43, 45);

    cursor: pointer;

    &:last-child::before {
        content: "";
        position: absolute;
        top: 0;
        left: 16px;

        width: 168px;
        height: 1px;

        background: rgba(0, 0, 0, 0.1);
    }

    &:hover {
        background-color: rgb(240, 240, 240);
    }
}

.burger-menu__img {
    opacity: 0.8;
    width: 14px;
    margin-right: 8px;
}

.editor-btn {
    margin-left: 15px;

    border: 1px solid rgb(223, 223, 223);
    background-color: white;
    opacity: 0.4;
}

.tasks-wrapper-bottom {
    display: flex;
    padding: 14px 20px;

    text-align: right;

    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: rgb(239, 239, 239);
}

.tasks__add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    width: 100%;
    height: 60px;

    color: #fff;

    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    opacity: 0.8;
    border: 2px dashed rgba(255, 255, 255, 0.4);
    cursor: pointer;

    @media (max-width: 576px) {
        margin: 12px auto 0;
        width: 90%;
    }
}

.cancel-btn {
    display: inline-block;
    justify-content: center;
    align-items: center;
    margin-right: 14px;
    padding: 8px 12px;
    min-width: 70px;

    font-size: 14px;
    text-align: center;
    color: rgb(136, 136, 136);

    border-radius: 4px;
    opacity: 0.9;
    background: none;
    border: none;
    box-shadow: none;
    cursor: pointer;
}

.tasks-time {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 28px;
    padding: 20px 12px;

    border-top: 1px solid rgba(255, 255, 255, 0.8);
    text-align: center;
    background-color: rgba(255, 255, 255, 0.1);
}
.tasks-time__item {
    display: inline-block;
    margin: 0px 8px;

    color: rgba(255, 255, 255, 0.7);
}

.tasks-time-item__value {
    margin-left: 4px;

    font-weight: bold;
    font-size: 24px;
    color: rgb(255, 255, 255);
}
</style>
