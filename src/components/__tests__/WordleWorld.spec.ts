import { mount } from '@vue/test-utils'
import WordleWorld from '../WordleWorld.vue'

describe('WordleWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(WordleWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
