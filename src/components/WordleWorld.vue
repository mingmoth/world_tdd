<script setup lang="ts">
import { ref } from 'vue';
import GuessInput from './GuessInput.vue';
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/configs/settings';
import wordsOfTheDay from "@/configs/wordsOfTheDay.json";

defineProps({
    wordOfTheDay: {
        type: String,
        validator: (wordGiven: string) => wordsOfTheDay.includes(wordGiven)
    }
})

const guessSubmitted = ref('');
</script>

<template>
    <GuessInput @guess-submit="guessSubmitted = $event" />
    <p
        v-if="guessSubmitted.length > 0"
        v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
    />
</template>
