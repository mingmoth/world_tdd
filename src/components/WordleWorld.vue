<script setup lang="ts">
import { ref } from 'vue';
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/configs/settings';

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (val: string) => val.length === 5
  }
})

const guessInProgress = ref('');
const guessSubmitted = ref('');
</script>

<template>
  <input
    v-model="guessInProgress"
    type="text"
    @keydown.enter="guessSubmitted = guessInProgress"
  >
  <p
    v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  />
</template>
