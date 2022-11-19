<template>
    <div v-click-outside="onClickOutsideSettings" class="settings-wrapper">
        <div class="settings-inner-wrapper">
            <div class="settings">
                <div class="settings__header settings-header">
                    <h3 class="settings-header__title">TIMER SETTINGS</h3>
                    <button
                        class="settings-header__btn"
                        @click="submitSettings()"
                        :disabled="!isSettingsTimeCorrect"
                    >
                        <img
                            src="../assets/remove-black-sm.png"
                            class="settings-header__btn-img"
                            alt="close"
                        />
                    </button>
                </div>
                <div class="settings__item">
                    <div class="settings__row">
                        <h4 class="settings__title">Timer (minutes)</h4>
                    </div>
                    <div class="settings__row space-between">
                        <div class="settings-time__item">
                            <label class="settings-time__label"
                                >Pomodoro
                                <input
                                    class="settings__input"
                                    type="number"
                                    :value="settingsPomodoroMinutes"
                                    min="1"
                                    @input="
                                        settingsPomodoroMinutes =
                                            +$event.target.value
                                    "
                                />
                            </label>
                        </div>
                        <div class="settings-time__item">
                            <label class="settings-time__label"
                                >Short Break
                                <input
                                    class="settings__input"
                                    type="number"
                                    :value="settingsShortBreakMinutes"
                                    min="1"
                                    @input="
                                        settingsShortBreakMinutes =
                                            +$event.target.value
                                    "
                                />
                            </label>
                        </div>
                        <div class="settings-time__item">
                            <label class="settings-time__label"
                                >Long Break
                                <input
                                    class="settings__input"
                                    type="number"
                                    :value="settingsLongBreakMinutes"
                                    min="1"
                                    @input="
                                        settingsLongBreakMinutes =
                                            +$event.target.value
                                    "
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div class="settings__item">
                    <div class="settings__row">
                        <h4 class="settings__title">Auto Start Breaks</h4>
                        <div class="switch ml-auto">
                            <div
                                @click="
                                    timerStore.autoStartBreaks =
                                        !timerStore.autoStartBreaks
                                "
                                :class="{
                                    'slider-wrapper_active':
                                        timerStore.autoStartBreaks,
                                }"
                                class="slider-wrapper"
                            >
                                <span
                                    :class="{
                                        slider_active:
                                            timerStore.autoStartBreaks,
                                    }"
                                    class="slider"
                                ></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="settings__item">
                    <div class="settings__row">
                        <h4 class="settings__title">Auto Start Pomodoros</h4>
                        <div class="switch ml-auto">
                            <div
                                @click="
                                    timerStore.autoStartPomodoros =
                                        !timerStore.autoStartPomodoros
                                "
                                :class="{
                                    'slider-wrapper_active':
                                        timerStore.autoStartPomodoros,
                                }"
                                class="slider-wrapper"
                            >
                                <span
                                    :class="{
                                        slider_active:
                                            timerStore.autoStartPomodoros,
                                    }"
                                    class="slider"
                                ></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="settings__item">
                    <div class="settings__row">
                        <h4 class="settings__title">Long Break Interval</h4>
                        <input
                            @input="
                                settingsLongBreakInterval = $event.target.value
                            "
                            :value="settingsLongBreakInterval"
                            class="settings__input width70 ml-auto"
                            type="number"
                            min="1"
                        />
                    </div>
                </div>
                <div class="settings__item">
                    <div class="settings__row">
                        <h4 class="settings__title">Dark Mode when running</h4>
                        <div class="switch ml-auto">
                            <div
                                @click="
                                    timerStore.darkMode = !timerStore.darkMode
                                "
                                :class="{
                                    'slider-wrapper_active':
                                        timerStore.darkMode,
                                }"
                                class="slider-wrapper"
                            >
                                <span
                                    :class="{
                                        slider_active: timerStore.darkMode,
                                    }"
                                    class="slider"
                                ></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="settings-footer">
            <div class="settings__row">
                <button
                    @click="submitSettings()"
                    :disabled="!isSettingsTimeCorrect"
                    class="submit-btn btn ml-auto"
                >
                    OK
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useTimerStore } from "../stores/timerStore";

export default {
    name: "MySettings",
    setup() {
        const timerStore = useTimerStore();
        return {
            timerStore,
        };
    },
    data() {
        return {
            isSettingsTimeCorrect: true,
            settingsPomodoroMinutes: 0,
            settingsShortBreakMinutes: 0,
            settingsLongBreakMinutes: 0,
            settingsLongBreakInterval: 0,
        };
    },
    methods: {
        onClickOutsideSettings(event) {
            if (
                event !== this.$refs.settingsBtn &&
                this.timerStore.showSettings
            ) {
                this.timerStore.showSettings = false;
            }
        },
        submitSettings() {
            this.timerStore.showSettings = !this.timerStore.showSettings;
            this.changeLongBreakInterval();
            this.setMinutes();
            this.changeTime();
        },
        changeTime() {
            this.timerStore.time.pomodoroMinutes = this.settingsPomodoroMinutes;
            this.timerStore.time.shortBreakMinutes =
                this.settingsShortBreakMinutes;
            this.timerStore.time.longBreakMinutes =
                this.settingsLongBreakMinutes;
        },
        changeLongBreakInterval() {
            this.timerStore.longBreakInterval = this.settingsLongBreakInterval;
        },
        setMinutes() {
            if (this.timerStore.timerStates.isPomodoro) {
                if (
                    this.settingsPomodoroMinutes !==
                    this.timerStore.time.pomodoroMinutes
                ) {
                    this.timerStore.time.currentMinutes =
                        this.settingsPomodoroMinutes;
                }
            }
            if (this.timerStore.timerStates.isShortBreak) {
                if (
                    this.settingsShortBreakMinutes !==
                    this.timerStore.time.shortBreakMinutes
                ) {
                    this.timerStore.time.currentMinutes =
                        this.settingsLongBreakMinutes;
                }
            }
            if (this.timerStore.timerStates.isLongBreak) {
                if (
                    this.settingsLongBreakMinutes !==
                    this.timerStore.time.longBreakMinutes
                ) {
                    this.timerStore.time.currentMinutes =
                        this.settingsLongBreakMinutes;
                }
            }
            if (
                this.timerStore.isTimerActive &&
                this.settingsPomodoroMinutes !==
                    this.timerStore.time.pomodoroMinutes
            ) {
                this.timerStore.time.currentMinutes--;
            }
        },
    },
    created() {
        this.settingsPomodoroMinutes = this.timerStore.time.pomodoroMinutes;
        this.settingsShortBreakMinutes = this.timerStore.time.shortBreakMinutes;
        this.settingsLongBreakMinutes = this.timerStore.time.longBreakMinutes;
        this.settingsLongBreakInterval = this.timerStore.longBreakInterval;
    },
    watch: {
        settingsPomodoroMinutes: function () {
            if (
                this.settingsPomodoroMinutes < 1 ||
                this.settingsShortBreakMinutes < 1 ||
                this.settingsLongBreakMinutes < 1
            ) {
                this.isSettingsTimeCorrect = false;
            } else {
                this.isSettingsTimeCorrect = true;
            }
        },
    },
};
</script>

<style lang="scss">
.settings-wrapper {
    display: block;
    max-width: 400px;
    margin: 0 auto;
    width: 95%;
    height: 100%;

    color: rgb(34, 34, 34);

    background-color: #fff;
    border-radius: 8px;
    border-top: 1px solid rgb(239, 239, 239);
    border-bottom: 1px solid rgb(239, 239, 239);
    transform: translateY(20px);
    box-shadow: rgb(0 0 0 / 15%) 0px 10px 20px, rgb(0 0 0 / 10%) 0px 3px 6px;
    overflow: hidden;
}

.settings-inner-wrapper {
    position: relative;
    max-width: 780px;
}

.settings {
    padding: 20px 20px 0px;
}

.settings__header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.settings-header__title {
    font-size: 16px;
    text-transform: uppercase;
    color: rgb(187, 187, 187);
}

.settings-header__btn {
    margin-left: auto;

    background: none;
    border: none;
}

.settings-header__btn-img {
    cursor: pointer;
    width: 17px;
    opacity: 0.3;
    // z-index: 2147483647;
}

.settings__row {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.settings__title {
    color: rgb(85, 85, 85);
    font-weight: bold;
    margin: 0;
}

.settings__item {
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    width: 100%;

    border-top: 1px solid rgba(182, 165, 166, 0.2);
}

.settings-time__wrapper {
    display: flex;
    justify-content: space-between;
}

.settings-time__item {
    width: 98px;
}

.settings-time__label {
    font-size: 14px;
    color: #bbbbbb;
    font-weight: bold;
    margin-bottom: 4px;
}

.settings__input {
    padding: 10px;
    width: 100%;

    font-size: 16px;
    color: #555555;

    box-sizing: border-box;
    border-radius: 4px;
    background-color: #efefef;
    box-shadow: none;
    border: none;
}

.settings-footer {
    padding: 14px 20px;
    text-align: right;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: rgb(239, 239, 239);
}

/* Switch buttons */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 32px;

    cursor: pointer;
}
.slider-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    cursor: pointer;
    background-color: #ccc;
    border-radius: 50px;
}
.slider {
    position: absolute;
    top: 2px;
    left: 2px;

    width: 28px;
    height: 28px;

    border-radius: 50px;
    background-color: white;
    box-shadow: #0000004d 0px 1px 1px;
}
.slider-wrapper_active {
    background-color: #84c733cc;
}
.slider_active {
    transform: translateX(28px);
}

.submit-btn {
    display: inline-block;
    min-width: 70px;

    font-size: 14px;
    color: white;

    background-color: rgb(34, 34, 34);
    border: 2px solid rgb(34, 34, 34);
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 2px;
    opacity: 0.9;
}

// other classes

.ml-auto {
    margin-left: auto;
}
.space-between {
    display: flex;
    width: 100%;
    justify-content: space-between;
}
.width70 {
    width: 70px;
}
</style>
