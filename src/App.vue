<template>
    <MainPage />
</template>

<script>
import MainPage from "./components/MainPage.vue";
export default {
    name: "App",
    components: { MainPage },
};
</script>

<style lang="scss">
@font-face {
    font-family: "ArialRounded";
    src: local("ArialRounded"),
        url(./fonts/arial-rounded.ttf) format("truetype");
}

@font-face {
    font-family: "Roboto";
    src: local("Roboto"), url(./fonts/Roboto-Light.ttf) format("truetype");
}

body {
    font-family: "ArialRounded", "Roboto";
}
</style>
