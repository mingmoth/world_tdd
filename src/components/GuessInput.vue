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
    >
</template>