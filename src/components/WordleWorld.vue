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
    <main>
        <GuessInput @guess-submit="guessSubmitted = $event" />
        <p
            v-if="guessSubmitted.length > 0"
            v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
        />
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
}
.end-of-game-message {
    font-size: 3rem;
    animation: end-of-game-message-animation 700ms forwards;
    white-space: nowrap;
    text-align: center;
}
@keyframes end-of-game-message-animation {
    0% {
        opacity: 0;
        transform: rotateZ(0);
    }
    100% {
        opacity: 1;
        transform: translateY(2rem);
    }
}
</style>
