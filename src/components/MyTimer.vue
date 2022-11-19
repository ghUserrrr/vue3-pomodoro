<template>
    <div
        class="timer"
        :class="{
            'timer_dark-mode':
                timerStore.$state.darkMode && timerStore.$state.isTimerActive,
        }"
    >
        <div
            class="timer__menu timer-menu"
            :class="{
                'timer__menu_dark-mode':
                    timerStore.$state.darkMode &&
                    timerStore.$state.isTimerActive,
            }"
        >
            <button
                class="timer-menu__btn"
                :class="{
                    'timer-menu__btn_active':
                        timerStore.$state.timerStates.isPomodoro,
                }"
                @click="
                    timerStore.stopTimer();
                    timerStore.activatePomodoro();
                "
            >
                Pomodoro
            </button>
            <button
                class="timer-menu__btn"
                :class="{
                    'timer-menu__btn_active':
                        timerStore.$state.timerStates.isShortBreak,
                }"
                @click="
                    timerStore.stopTimer();
                    timerStore.activateShortBreak();
                "
            >
                Short Break
            </button>
            <button
                class="timer-menu__btn"
                :class="{
                    'timer-menu__btn_active':
                        timerStore.$state.timerStates.isLongBreak,
                }"
                @click="
                    timerStore.stopTimer();
                    timerStore.activateLongBreak();
                "
            >
                Long Break
            </button>
        </div>
        <div
            class="timer__body"
            :class="{
                'dark-mode-text':
                    timerStore.$state.darkMode &&
                    timerStore.$state.isTimerActive,
            }"
        >
            {{ timerStore.styledMinutes }}:{{ timerStore.styledSeconds }}
        </div>
        <div class="timer__row">
            <button
                class="timer__btn timer__btn-start"
                :class="{
                    timer__btn_pomodoro:
                        timerStore.$state.timerStates.isPomodoro,
                    'timer__btn_short-break':
                        timerStore.$state.timerStates.isShortBreak,
                    'timer__btn_long-break':
                        timerStore.$state.timerStates.isLongBreak,
                    'timer__btn_dark-mode':
                        timerStore.$state.darkMode &&
                        timerStore.$state.isTimerActive,
                }"
                @click="
                    timerStore.timerSwitcher();
                    timerStore.startTimer();
                    playTimer();
                "
                v-if="!timerStore.$state.isTimerActive"
            >
                START
            </button>
            <button
                class="timer__btn timer__btn_stop"
                :class="{
                    timer__btn_pomodoro:
                        timerStore.$state.timerStates.isPomodoro,
                    'timer__btn_short-break':
                        timerStore.$state.timerStates.isShortBreak,
                    'timer__btn_long-break':
                        timerStore.$state.timerStates.isLongBreak,
                    'timer__btn_dark-mode':
                        timerStore.$state.darkMode &&
                        timerStore.$state.isTimerActive,
                }"
                @click="
                    timerStore.stopTimer();
                    playTimer();
                "
                v-else
            >
                STOP
            </button>
            <button
                v-if="timerStore.$state.isTimerActive"
                @click="
                    timerStore.stopTimer();
                    timerStore.skipTimer();
                "
                class="timer__btn-skip timer-btn-skip"
            >
                <img
                    src="../assets/next-white3.png"
                    class="timer-btn-skip__img"
                    alt="next"
                />
            </button>
        </div>
    </div>
</template>

<script>
import { useTimerStore } from "../stores/timerStore";

export default {
    name: "MyTimer",
    data() {
        return {
            bebra: true,
        };
    },
    setup() {
        const timerStore = useTimerStore();
        return {
            timerStore,
        };
    },
    mounted() {
        if (
            this.timerStore.time.currentMinutes +
                this.timerStore.time.currentSeconds <
            1
        ) {
            this.timerStore.setTimer();
        }
    },
    methods: {
        playTimer() {
            const timerSound = new Audio("./audio/timer-btn.mp3");
            timerSound.play();
        },
        playTimerEnding() {
            const timerSoundEnding = new Audio("./audio/timer-alarm.mp3");
            timerSoundEnding.play();
        },
    },
    watch: {
        "timerStore.time.currentSeconds": function () {
            if (
                this.timerStore.time.currentSeconds +
                    this.timerStore.time.currentMinutes ===
                0
            ) {
                this.playTimerEnding();
                if (this.timerStore.timerStates.isPomodoro) {
                    this.timerStore.stopTimer();
                    this.timerStore.skipTimer();
                    return;
                }
                if (
                    this.timerStore.timerStates.isShortBreak ||
                    this.timerStore.timerStates.isLongBreak
                ) {
                    this.timerStore.stopTimer();
                    this.timerStore.skipTimer();
                    return;
                }
            }
        },
        "timerStore.timerStates.isPomodoro": function () {
            if (
                this.timerStore.timerStates.isPomodoro &&
                this.timerStore.autoStartPomodoros
            ) {
                this.timerStore.timerSwitcher();
                this.timerStore.startTimer();
                console.log(1);
            }
        },
        "timerStore.timerStates.isShortBreak": function () {
            if (
                (this.timerStore.timerStates.isShortBreak ||
                    this.timerStore.timerStates.isLongBreak) &&
                this.timerStore.autoStartBreaks
            ) {
                this.timerStore.timerSwitcher();
                this.timerStore.startTimer();
                console.log(2);
            }
        },
    },
};
</script>

<style lang="scss">
.timer {
    display: flex;
    flex-direction: column;
    margin: 0 auto 20px;
    padding: 20px 0px 30px;
    width: 100%;

    background-color: #ffffff1a;
    border-radius: 6px;

    @media (max-width: 576px) {
        width: 90%;
    }
}

.timer_dark-mode {
    background: none;
}

.timer__menu {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.timer__menu_dark-mode {
    visibility: hidden;
}

.timer-menu__btn {
    margin: 0px;
    padding: 2px 12px;
    height: 28px;

    font-size: 16px;
    font-family: ArialRounded;
    font-weight: 300;
    color: white;

    border: none;
    border-radius: 4px;
    background: none;
    box-shadow: none;
    cursor: pointer;

    @media (max-width: 576px) {
        font-size: 12px;
    }
}

.timer-menu__btn_active {
    background-color: #00000026;
}

.timer__body {
    margin-top: 20px;

    font-size: 120px;
    font-weight: bold;
    color: #fff;
    text-align: center;

    @media (max-width: 576px) {
        font-size: 90px;
    }
}

.timer__btn {
    align-self: center;
    margin-left: calc(50% - 100px);
    margin-right: 50px;
    padding: 0px 12px;
    width: 200px;
    height: 55px;

    font-family: ArialRounded;
    font-size: 22px;
    font-weight: bold;
    color: #696969;

    border: none;
    border-radius: 4px;
    background-color: white;
    transition: color 0.5s ease-in-out 0s;
    cursor: pointer;
}

.timer__btn-start {
    box-shadow: rgb(235 235 235) 0px 6px 0px;
}

.timer__btn_stop {
    transform: translate(0, 6px);
}

.timer__btn_pomodoro {
    color: #d95550;
}

.timer__btn_short-break {
    color: #e9cd54;
}

.timer__btn_long-break {
    color: #457ca3;
}

.timer__btn_dark-mode {
    background: 0;
    color: #aaaaaa;
}

.timer__row {
    display: flex;
    align-items: center;
    margin: 20px 0px 0px;
}

.timer__btn-skip {
    margin: 0;
    padding: 0;

    transform: translate(0, 6px);
    background: none;
    border: none;
    cursor: pointer;
}

.timer-btn-skip__img {
    width: 22px;

    opacity: 0.9;
}
</style>
