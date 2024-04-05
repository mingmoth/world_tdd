import { mount } from '@vue/test-utils';
import WordleWorld from '../WordleWorld.vue';
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/configs/settings';

describe('WordleWorld', () => {
  let wordOfTheDay = 'TESTS';
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(WordleWorld, { props: { wordOfTheDay } })
  })

  function playerSubmitsGuess(guess: string) {
    const guessInput = wrapper.find('input[type=text]');
    guessInput.setValue(guess);
    guessInput.trigger('keydown.enter');
  }

  test("a victory message appears when the user makes a guess that matches the word of the day", async () => {
    playerSubmitsGuess(wordOfTheDay);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain(VICTORY_MESSAGE);
  })

  test("a defeat message appears if the user makes a guess that is incorrect", async () => {
    playerSubmitsGuess("WRONG");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain(DEFEAT_MESSAGE);
  })

  test("no end-of-game message appears if the user has not yet made a guess", async () => {
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE);
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
  })

  test("If a word of the day provided does not have exactly 5 characters, a warning is emitted", async () => {
    vi.spyOn(console, "warn");
    mount(wrapper, { props: { wordOfTheDay: 'TEST' } });
    expect(console.warn).toHaveBeenCalled();
  })
})
