<script setup lang="ts">
import { ref, watch } from 'vue';
import { WORD_SIZE } from '@/configs/settings';
import wordsOfTheDay from "@/configs/wordsOfTheDay.json";

const emits = defineEmits(['guess-submit']);

const guessInProgress = ref<string>('');

watch(
    () => guessInProgress.value,
    (val) => {
        guessInProgress.value = val?.slice(0, WORD_SIZE)
            .toUpperCase()
            .replace(/[^A-Z]+/gi, "")
    },
)

function onSubmit() {
    if(!wordsOfTheDay.includes(guessInProgress.value)) return;

    emits('guess-submit', guessInProgress.value);
}
</script>

<template>
    <input
        v-model="guessInProgress"
        :maxlength="WORD_SIZE"
        type="text"
        autofocus
        @blur="({target}) => (target as HTMLInputElement).focus()"
        @keydown.enter="onSubmit"
    />
    <ul class="word">
        <li v-for="(letter, index) in guessInProgress.padEnd(WORD_SIZE, ' ')"
            :key="`${letter}-${index}`"
            :data-letter="letter"
            class="letter"
            v-text="letter"
        />
    </ul>
</template>

<style scoped>
/* input {
    position: absolute;
    opacity: 0;
} */
.word {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 0.25rem;
}
.letter {
    background-color: white;
    border: 1px solid hsl(0, 0%, 70%);
    width: 5rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: bolder;
}
li:not([data-letter=" "]) {
    animation: pop 100ms;
}
@keyframes pop {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.4);
    }
}
</style>