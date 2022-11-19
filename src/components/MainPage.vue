<template>
    <div
        class="main-page"
        :class="{
            'main-page_pomodoro': timerStore.$state.timerStates.isPomodoro,
            'main-page_short-break': timerStore.$state.timerStates.isShortBreak,
            'main-page_long-break': timerStore.$state.timerStates.isLongBreak,
            'main-page_dark':
                timerStore.$state.darkMode && timerStore.$state.isTimerActive,
        }"
    >
        <div class="container">
            <MyHeader />
            <MyProgressBar />
        </div>
        <div class="container-inner">
            <MyTimer />
            <MyLapCounter />
            <div :class="{ 'darkened-background': timerStore.showSettings }">
                <MySettings v-if="timerStore.showSettings" />
            </div>
            <MyTasks
                v-if="
                    !timerStore.darkMode ||
                    (timerStore.darkMode && !timerStore.isTimerActive)
                "
            />
        </div>
    </div>
</template>

<script>
import { useTimerStore } from "../stores/timerStore";
import MyHeader from "./MyHeader.vue";
import MyTimer from "./MyTimer.vue";
import MyLapCounter from "./MyLapCounter.vue";
import MySettings from "./MySettings.vue";
import MyProgressBar from "./MyProgressBar.vue";
import MyTasks from "./MyTasks.vue";

export default {
    name: "MainPage",
    components: {
        MyHeader,
        MyTimer,
        MyLapCounter,
        MySettings,
        MyProgressBar,
        MyTasks,
    },
    setup() {
        const timerStore = useTimerStore();
        return {
            timerStore,
        };
    },
};
</script>

<style lang="scss">
.dark-mode-text {
    color: #aaaaaa;
}

.darkened-background {
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    width: 100%;
    min-height: 100vh;

    background-color: #00000066;
    z-index: 10;
}

.main-page {
    min-height: 100vh;

    transition: background-color 0.5s ease-in-out 0s;
}

.main-page_pomodoro {
    background-color: #d95550;
}

.main-page_short-break {
    background-color: #e9cd54;
}

.main-page_long-break {
    background-color: #457ca3;
}

.main-page_dark {
    background-color: #000;
}

.container {
    padding: 0px 12px;
    max-width: 620px;
    margin: auto;
}

.container-inner {
    max-width: 480px;
    margin: auto;
}

.row {
    display: flex;
}
</style>
