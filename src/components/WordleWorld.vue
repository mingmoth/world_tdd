<script setup lang="ts">
import { computed, ref } from 'vue';
import GuessInput from './GuessInput.vue';
import GuessView from './GuessView.vue';
import { DEFEAT_MESSAGE, MAX_GUESSES_COUNT, VICTORY_MESSAGE } from '@/configs/settings';
import wordsOfTheDay from "@/configs/wordsOfTheDay.json";

const props = defineProps({
    wordOfTheDay: {
        type: String,
        required: true,
        validator: (wordGiven: string) => wordsOfTheDay.includes(wordGiven)
    }
})

const guessesSubmitted = ref<string[]>([]);

const isGameOver = computed(() => guessesSubmitted.value.length === MAX_GUESSES_COUNT || guessesSubmitted.value.includes(props.wordOfTheDay));

const countOfEmptyGuesses = computed(() => {
    const guessesRemaining = MAX_GUESSES_COUNT - guessesSubmitted.value.length
    return isGameOver.value ? guessesRemaining : guessesRemaining - 1
})
</script>

<template>
    <main>
        <ul>
            <li v-for="(guess, index) in guessesSubmitted" :key="`${index}-${guess}`">
                <GuessView :answer="wordOfTheDay" :guess="guess" should-flip />
            </li>
            <li>
                <GuessInput :disabled="isGameOver" @guess-submit="guess => guessesSubmitted.push(guess)"/>
            </li>
            <li v-for="i in countOfEmptyGuesses" :key="`remaining-guess-${i}`">
                <GuessView guess=""/>
            </li>
        </ul>
        <!-- <GuessInput :disabled="isGameOver" @guess-submit="guess => guessesSubmitted.push(guess)" /> -->
        <p
            v-if="isGameOver"
            v-text="guessesSubmitted.includes(wordOfTheDay) ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
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

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

li {
    margin-bottom: 0.25rem;
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
