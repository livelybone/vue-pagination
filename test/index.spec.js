import { shallowMount } from '@vue/test-utils'
import Pagination from '../src/components/Index.vue'

describe('Index.vue', () => {
  it('Rendered', () => {
    const wrapper = shallowMount(Pagination)
    expect(wrapper.find('div').exists()).to.equal(true)
  })
})
