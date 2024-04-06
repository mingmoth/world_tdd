<script setup lang="ts">
import { ref, watch } from 'vue';
import GuessView from './GuessView.vue';
import { WORD_SIZE } from '@/configs/settings';
import wordsOfTheDay from "@/configs/wordsOfTheDay.json";

withDefaults(defineProps<{ disabled?: boolean}>(), { disabled: false })
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
    guessInProgress.value = '';
}
</script>

<template>
    <GuessView
        v-if="!disabled"
        :guess="guessInProgress"
    />
    <input
        v-model="guessInProgress"
        :disabled="disabled"
        aria-label="Make your guess for the word of the day!"
        :maxlength="WORD_SIZE"
        type="text"
        autofocus
        @blur="({target}) => (target as HTMLInputElement).focus()"
        @keydown.enter="onSubmit"
    />
</template>

<style scoped>
/* input {
    position: absolute;
    opacity: 0;
} */
</style>