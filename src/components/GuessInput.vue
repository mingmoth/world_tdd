<script setup lang="ts">
import { ref, watch } from 'vue';
import GuessView from './GuessView.vue';
import { WORD_SIZE } from '@/configs/settings';
import wordsOfTheDay from "@/configs/wordsOfTheDay.json";

withDefaults(defineProps<{ disabled?: boolean}>(), { disabled: false })
const emits = defineEmits(['guess-submit']);

const guessInProgress = ref<string>('');
const hasFailedValidation = ref<boolean>(false)


watch(
    () => guessInProgress.value,
    (val) => {
        guessInProgress.value = val?.slice(0, WORD_SIZE)
            .toUpperCase()
            .replace(/[^A-Z]+/gi, "")
    },
)

function onSubmit() {
    if(!wordsOfTheDay.includes(guessInProgress.value)) {
        hasFailedValidation.value = true
        setTimeout(() => hasFailedValidation.value = false, 500)
        return;
    }

    emits('guess-submit', guessInProgress.value);
    guessInProgress.value = '';
}
</script>

<template>
    <GuessView
        v-if="!disabled"
        :guess="guessInProgress"
        :class="{ shake: hasFailedValidation }"
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
input {
    position: absolute;
    opacity: 0;
}

.shake {
    animation: shake;
    animation-duration: 100ms;
    animation-iteration-count: 2;
}

@keyframes shake {
    0% {
        transform: translateX(-2%);
    }
    25% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(2%);
    }
    75% {
        transform: translateX(0);
    }
}
</style>