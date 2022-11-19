<template>
    <div class="bar">
        <div
            class="progress"
            :class="{
                'progress_dark-mode':
                    timerStore.$state.darkMode &&
                    timerStore.$state.isTimerActive,
            }"
            :style="{ width: secondsElapsed / onePercentOfTime + '%' }"
        ></div>
    </div>
</template>

<script>
import { useTimerStore } from "@/stores/timerStore";

export default {
    name: "MyProgressBar",
    setup() {
        const timerStore = useTimerStore();
        return {
            timerStore,
        };
    },
    computed: {
        secondsLeft() {
            return (
                this.timerStore.time.currentMinutes * 60 +
                this.timerStore.time.currentSeconds
            );
        },
        onePercentOfTime() {
            if (this.timerStore.timerStates.isPomodoro) {
                return (this.timerStore.time.pomodoroMinutes * 60) / 100;
            }
            if (this.timerStore.timerStates.isShortBreak) {
                return (this.timerStore.time.shortBreakMinutes * 60) / 100;
            }
            if (this.timerStore.timerStates.isLongBreak) {
                return (this.timerStore.time.longBreakMinutes * 60) / 100;
            }
            return this.onePercentOfTime;
        },
        secondsElapsed() {
            if (this.timerStore.timerStates.isPomodoro) {
                return (
                    this.timerStore.time.pomodoroMinutes * 60 - this.secondsLeft
                );
            }
            if (this.timerStore.timerStates.isShortBreak) {
                return (
                    this.timerStore.time.shortBreakMinutes * 60 -
                    this.secondsLeft
                );
            }
            if (this.timerStore.timerStates.isLongBreak) {
                return (
                    this.timerStore.time.longBreakMinutes * 60 -
                    this.secondsLeft
                );
            }
            return this.secondsElapsed;
        },
    },
};
</script>

<style>
.bar {
    position: relative;
    margin-bottom: 15px;
    width: 100%;
    height: 1px;

    background-color: rgba(0, 0, 0, 0.1);
}

.progress {
    position: absolute;
    top: -1px;

    height: 3px;

    background-color: #fff;
    border-radius: 2px;
}

.progress_dark-mode {
    background-color: #aaaaaa;
}
</style>
