import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import vClickOutside from "click-outside-vue3";

import "./assets/styles/reset.scss";

const pinia = createPinia();

pinia.use((context) => {
    const timerStore = context.store.$id;

    const serializer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse,
    };

    const fromStorage = serializer.deserialize(
        window.localStorage.getItem(timerStore)
    );

    if (fromStorage) {
        context.store.$patch(fromStorage);
    }

    context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(timerStore, serializer.serialize(state));
    });
});

const app = createApp(App);

app.use(pinia);
app.use(vClickOutside);
app.mount("#app");
