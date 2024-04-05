<script setup lang="ts">
import { computed, ref } from 'vue';
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from '@/configs/settings';
import wordsOfTheDay from "@/configs/wordsOfTheDay.json";

defineProps({
    wordOfTheDay: {
        type: String,
        validator: (wordGiven: string) => wordsOfTheDay.includes(wordGiven)
    }
})

const guessInProgress = ref('');
const formattedGuessInProgress = computed({
    get() {
        return guessInProgress.value
    },
    set(val: string) {
        guessInProgress.value = val.slice(0, WORD_SIZE)
    }
})

const guessSubmitted = ref('');
</script>

<template>
    <input
        v-model="formattedGuessInProgress"
        :maxlength="WORD_SIZE"
        type="text"
        @keydown.enter="guessSubmitted = guessInProgress"
    >
    <p
        v-if="guessSubmitted.length > 0"
        v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
    />
</template>
