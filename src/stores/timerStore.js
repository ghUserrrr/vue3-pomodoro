import { defineStore } from "pinia";

export const useTimerStore = defineStore("timer", {
    id: "timerStore",
    state: () => ({
        timerStates: {
            isPomodoro: true,
            isShortBreak: false,
            isLongBreak: false,
        },
        time: {
            pomodoroMinutes: 25,
            pomodoroSeconds: 0,
            shortBreakMinutes: 5,
            shortBreakSeconds: 0,
            longBreakMinutes: 15,
            longBreakSeconds: 0,
            currentMinutes: 0,
            currentSeconds: 0,
        },
        toDo: {
            inputTask: "",
            tasks: [],
            isTaskChecked: [],
            isTaskEditorOpen: [],
            pomodoroCounter: 1,
            pomodoroCounters: [],
            isTaskActive: [],
            taskLaps: [],
            isNote: [],
            isNoteOpen: false,
            inputNote: "",
            notes: [],
        },
        showSettings: false,
        isTimerActive: false,
        timerId: 54,
        autoStartBreaks: false,
        autoStartPomodoros: false,
        darkMode: false,
        longBreakInterval: 4,
        lapCounter: 0,
        isBurgerMenuVisible: false,
    }),
    actions: {
        startTimer() {
            this.timerId = setInterval(() => {
                if (
                    this.time.currentMinutes + this.time.currentSeconds > 0 &&
                    this.isTimerActive
                ) {
                    if (this.time.currentSeconds > 0) {
                        this.time.currentSeconds--;
                    }
                    if (
                        this.time.currentSeconds < 1 &&
                        this.time.currentMinutes >= 1
                    ) {
                        this.time.currentMinutes--;
                        this.time.currentSeconds = 59;
                    }
                }
            }, 1000);
        },
        stopTimer() {
            clearInterval(this.timerId);
            this.isTimerActive = false;
        },
        timerSwitcher() {
            this.isTimerActive = !this.isTimerActive;
        },
        skipTimer() {
            if (
                this.timerStates.isPomodoro &&
                (this.lapCounter + 1) % this.longBreakInterval == 0
            ) {
                this.lapCounter++;
                this.activateLongBreak();
            } else if (this.timerStates.isPomodoro) {
                this.activateShortBreak();
                this.lapCounter++;
                return;
            } else if (this.timerStates.isShortBreak) {
                this.activatePomodoro();
                return;
            } else if (this.timerStates.isLongBreak) {
                this.activatePomodoro();
            }
        },
        setSeconds() {
            if (this.timerStates.isPomodoro) {
                this.time.currentSeconds = this.time.pomodoroSeconds;
            }
            if (this.timerStates.isShortBreak) {
                this.time.currentSeconds = this.time.shortBreakSeconds;
            }
            if (this.timerStates.isLongBreak) {
                this.time.currentSeconds = this.time.longBreakSeconds;
            }
        },
        setMinutes() {
            if (this.timerStates.isPomodoro) {
                this.time.currentMinutes = this.time.pomodoroMinutes;
            }
            if (this.timerStates.isShortBreak) {
                this.time.currentMinutes = this.time.shortBreakMinutes;
            }
            if (this.timerStates.isLongBreak) {
                this.time.currentMinutes = this.time.longBreakMinutes;
            }
            if (this.isTimerActive) {
                this.time.currentMinutes--;
            }
        },
        setTimer() {
            this.setSeconds();
            this.setMinutes();
        },
        activatePomodoro() {
            this.timerStates.isPomodoro = true;
            this.timerStates.isShortBreak = false;
            this.timerStates.isLongBreak = false;
            this.setTimer();
        },
        activateShortBreak() {
            this.timerStates.isPomodoro = false;
            this.timerStates.isShortBreak = true;
            this.timerStates.isLongBreak = false;
            this.setTimer();
        },
        activateLongBreak() {
            this.timerStates.isPomodoro = false;
            this.timerStates.isShortBreak = false;
            this.timerStates.isLongBreak = true;
            this.setTimer();
        },
        switchDarkMode() {
            this.darkMode = !this.darkMode;
        },
    },
    getters: {
        styledMinutes: function () {
            if (this.time.currentMinutes < 10) {
                return `0${this.time.currentMinutes}`;
            } else {
                return this.time.currentMinutes;
            }
        },
        styledSeconds: function () {
            if (this.time.currentSeconds < 10) {
                return `0${this.time.currentSeconds}`;
            } else {
                return this.time.currentSeconds;
            }
        },
        totalPomodoroCounter: function () {
            let total = 0;
            for (let i = 0; i < this.toDo.pomodoroCounters.length; i++) {
                total += this.toDo.pomodoroCounters[i];
            }
            return total;
        },
        finishTime: function () {
            let currentHours = Number(new Date().getHours());
            let currentMinutes = Number(new Date().getMinutes());
            let workMinutes =
                this.time.pomodoroMinutes * this.totalPomodoroCounter;

            for (let i = 1; i <= this.totalPomodoroCounter; i++) {
                if (i % this.longBreakInterval === 0) {
                    workMinutes += this.time.longBreakMinutes;
                } else {
                    workMinutes += this.time.shortBreakMinutes;
                }
            }
            if (this.totalPomodoroCounter > 0) {
                if (this.totalPomodoroCounter % this.longBreakInterval === 0) {
                    workMinutes -= this.time.longBreakMinutes;
                } else {
                    workMinutes -= this.time.shortBreakMinutes;
                }
            }

            currentMinutes += workMinutes;
            if (currentMinutes > 60) {
                currentHours = Math.floor(currentHours + currentMinutes / 60);
                currentMinutes = currentMinutes % 60;
            }

            if (currentHours >= 24) {
                currentHours = currentHours % 24;
            }

            if (currentHours < 10) {
                return `0${currentHours}:${currentMinutes}`;
            }
            if (currentMinutes < 10) {
                return `${currentHours}:0${currentMinutes}`;
            }
            if (currentHours < 10 && currentMinutes < 10) {
                return `0${currentHours}:0${currentMinutes}`;
            }
            return `${currentHours}:${currentMinutes}`;
        },
    },
});
