<script setup lang="ts">
import { ref, watch } from 'vue';
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from '@/configs/settings';
import wordsOfTheDay from "@/configs/wordsOfTheDay.json";

defineProps({
    wordOfTheDay: {
        type: String,
        validator: (wordGiven: string) => wordsOfTheDay.includes(wordGiven)
    }
})

const guessInProgress = ref<string>('');
const guessSubmitted = ref('');

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

    guessSubmitted.value = guessInProgress.value
}
</script>

<template>
    <input
        v-model="guessInProgress"
        :maxlength="WORD_SIZE"
        type="text"
        @keydown.enter="onSubmit"
    >
    <p
        v-if="guessSubmitted.length > 0"
        v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
    />
</template>
