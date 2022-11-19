<template>
    <header class="header">
        <h1
            v-if="
                !timerStore.$state.darkMode ||
                (timerStore.$state.darkMode && !timerStore.$state.isTimerActive)
            "
            class="header__title"
        >
            <a href="#" class="header__link"
                ><img
                    src="../assets/icon-white.png"
                    class="header__img"
                    alt="logotype"
                />Pomofocus</a
            >
        </h1>
        <div class="header__buttons">
            <!-- <button class="header__btn header-btn btn">
                <img src="../assets/graph-white.png" class="header-btn__icon" />
                <span class="header-btn__text">Report</span>
            </button> -->
            <button
                ref="settingsBtn"
                @click="timerStore.showSettings = !timerStore.showSettings"
                class="header__btn header-btn btn"
            >
                <img
                    src="../assets/config-white.png"
                    class="header-btn__icon"
                />
                <span class="header-btn__text">Setting</span>
            </button>
            <!-- <button class="header__btn header-btn btn">
                <img src="../assets/user-white.png" class="header-btn__icon" />
                <span class="header-btn__text">Login</span>
            </button> -->
        </div>
    </header>
</template>

<script>
import { useTimerStore } from "@/stores/timerStore";

export default {
    data() {
        return {
            name: "MyHeader",
        };
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
.btn {
    padding: 8px 12px;

    font-family: ArialRounded;

    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;

    background-color: inherit;
}

.header__title {
    display: flex;
}

.header__link {
    font-family: ArialRounded;
    font-size: 20px;
    color: #fff;
}

.header__img {
    margin-right: 4px;
    width: 20px;
}

.header__buttons {
    align-items: center;
    display: flex;
    margin-left: auto;
}

.header__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    min-width: 70px;

    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    font-size: 13px;
    color: white;

    opacity: 0.9;
    background: none #ffffff33;
}

.header-btn__icon {
    width: 16px;
}

.header-btn__text {
    display: block;
    margin-left: 4px;
}
</style>
