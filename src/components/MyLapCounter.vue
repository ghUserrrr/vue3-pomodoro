<template>
    <p class="lap-counter">#{{ timerStore.lapCounter }}</p>
    <p class="counter-title">
        {{ timeFor }}
    </p>
</template>

<script>
import { useTimerStore } from "../stores/timerStore";

export default {
    name: "MyLapCounter",
    setup() {
        const timerStore = useTimerStore();
        return {
            timerStore,
        };
    },
    created() {
        this.setTimeFor();
    },
    data() {
        return {
            timeFor: "",
        };
    },
    methods: {
        setTimeFor() {
            for (let i = 0; i < this.timerStore.toDo.isTaskActive.length; i++) {
                if (this.timerStore.toDo.isTaskActive[i]) {
                    this.timeFor = this.timerStore.toDo.tasks[i];
                }
            }
            if (
                this.timerStore.timerStates.isPomodoro &&
                this.timerStore.toDo.isTaskActive.length < 1
            ) {
                this.timeFor = "Time to focus!";
            }
            if (
                (this.timerStore.timerStates.isShortBreak ||
                    this.timerStore.timerStates.isLongBreak) &&
                this.timerStore.toDo.isTaskActive.length < 1
            ) {
                this.timeFor = "Time for a break!";
            }
        },
    },
    watch: {
        "timerStore.timerStates": {
            deep: true,
            handler() {
                this.setTimeFor();
                console.log(54);
            },
        },
        "timerStore.toDo.isTaskActive": {
            deep: true,
            handler() {
                this.setTimeFor();
            },
        },
    },
};
</script>

<style lang="scss">
.lap-counter {
    margin-bottom: 4px;

    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    color: #fff;
    text-align: center;

    user-select: none;
    opacity: 0.6;
    cursor: pointer;
}

.counter-title {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 400;
    text-align: center;
    font-size: 18px;
    color: white;
    overflow-wrap: break-word;
}
</style>
