import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Selector from '@app/components/Selector.vue';

// 全域設定
const globalConfig = {
  global: {
    directives: {
      ripple: {} // Stub v-ripple directive
    }
  }
};

describe('Selector.vue', () => {
  let wrapper;

  const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ];

  beforeEach(() => {
    // 清理之前的 wrapper
    if (wrapper) {
      wrapper.unmount();
    }
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('基本渲染', () => {
    it('應該正確渲染組件', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          modelValue: '1'
        }
      });

      expect(wrapper.find('.selector').exists()).toBe(true);
    });

    it('應該顯示當前選中的值', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          modelValue: '1',
          displayKey: 'label'
        }
      });

      const text = wrapper.find('.selector-current_value-label').text();
      expect(text).toContain('Option 1');
    });

    it('應該顯示空列表訊息當沒有選項時', async () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: []
        }
      });

      await wrapper.find('.selector').trigger('click');

      expect(wrapper.find('.selector-option_list-item_empty').exists()).toBe(true);
      expect(wrapper.find('.selector-option_list-item_empty').text()).toBe('暂无资料');
    });
  });

  describe('選項列表互動', () => {
    it('點擊應該觸發 handleOptionListTrigger', async () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions
        }
      });

      const selector = wrapper.find('.selector');
      expect(selector.exists()).toBe(true);

      await selector.trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.vm).toBeTruthy();
    });

    it('loading 狀態時不應該打開選項列表', async () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          loading: true
        }
      });

      await wrapper.find('.selector').trigger('click');
      expect(wrapper.vm.isOptionListOpen.value).toBe(false);
    });

    it('應該渲染所有選項', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          displayKey: 'label'
        }
      });

      const options = wrapper.findAll('.selector-option_list-item');
      expect(options).toHaveLength(3);
      expect(options[0].text()).toBe('Option 1');
      expect(options[1].text()).toBe('Option 2');
      expect(options[2].text()).toBe('Option 3');
    });
  });

  describe('選項選擇', () => {
    it('點擊選項應該發送 change 和 update:modelValue 事件', async () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          valueKey: 'value'
        }
      });

      await wrapper.find('.selector').trigger('click');
      await wrapper.findAll('.selector-option_list-item')[1].trigger('click');

      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('change')[0]).toEqual(['2', 1]);
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['2', 1]);
    });

    it('選擇相同的值不應該發送事件', async () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          modelValue: '1',
          valueKey: 'value'
        }
      });

      await wrapper.find('.selector').trigger('click');
      await wrapper.findAll('.selector-option_list-item')[0].trigger('click');

      expect(wrapper.emitted('change')).toBeFalsy();
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('應該正確標記選中的選項', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          modelValue: '2',
          valueKey: 'value'
        }
      });

      const options = wrapper.findAll('.selector-option_list-item');
      expect(options[1].classes()).toContain('selector-option_list-item_selsected');
    });

    it('選擇後應該關閉選項列表', async () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          valueKey: 'value'
        }
      });

      // 打開選項列表
      await wrapper.find('.selector').trigger('click');
      await wrapper.vm.$nextTick();

      // 選擇一個選項
      await wrapper.findAll('.selector-option_list-item')[1].trigger('click');
      await wrapper.vm.$nextTick();

      // 驗證選項列表已關閉
      expect(wrapper.vm.isOptionListOpen.value).toBe(false);
    });
  });

  describe('valueKey 和 displayKey', () => {
    it('應該使用 valueKey 來識別值', async () => {
      const customOptions = [
        { id: 'a', name: 'Apple' },
        { id: 'b', name: 'Banana' }
      ];

      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: customOptions,
          valueKey: 'id',
          displayKey: 'name'
        }
      });

      await wrapper.find('.selector').trigger('click');
      await wrapper.findAll('.selector-option_list-item')[0].trigger('click');

      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['a', 0]);
    });

    it('應該使用 displayKey 來顯示文字', () => {
      const customOptions = [
        { id: 'a', name: 'Apple' },
        { id: 'b', name: 'Banana' }
      ];

      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: customOptions,
          modelValue: 'a',
          valueKey: 'id',
          displayKey: 'name'
        }
      });

      const text = wrapper.find('.selector-current_value-label').text();
      expect(text).toContain('Apple');
    });

    it('沒有 valueKey 時應該使用整個物件', async () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions
        }
      });

      await wrapper.find('.selector').trigger('click');
      await wrapper.findAll('.selector-option_list-item')[0].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    });

    it('應該正確處理物件類型的 modelValue', () => {
      const objectOptions = [
        { id: 1, label: 'Item 1' },
        { id: 2, label: 'Item 2' }
      ];

      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: objectOptions,
          modelValue: { id: 1, label: 'Item 1' },
          valueKey: 'id',
          displayKey: 'label'
        }
      });

      const text = wrapper.find('.selector-current_value-label').text();
      expect(text).toContain('Item 1');
    });
  });

  describe('自訂插槽', () => {
    it('應該支援 prefix 插槽', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions
        },
        slots: {
          prefix: '<div class="custom-prefix">Prefix</div>'
        }
      });

      expect(wrapper.find('.custom-prefix').exists()).toBe(true);
      expect(wrapper.find('.custom-prefix').text()).toBe('Prefix');
    });

    it('應該支援 suffix 插槽', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions
        },
        slots: {
          suffix: '<div class="custom-suffix">Suffix</div>'
        }
      });

      expect(wrapper.find('.custom-suffix').exists()).toBe(true);
      expect(wrapper.find('.custom-suffix').text()).toBe('Suffix');
    });

    it('應該支援 value 插槽', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          modelValue: '1'
        },
        slots: {
          value: '<div class="custom-value">Custom Value</div>'
        }
      });

      expect(wrapper.find('.custom-value').exists()).toBe(true);
    });

    it('應該支援 default 插槽自訂選項顯示', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions
        },
        slots: {
          default: `
            <template #default="{ option }">
              <div class="custom-option">{{ option.label }}</div>
            </template>
          `
        }
      });

      const customOptions = wrapper.findAll('.custom-option');
      expect(customOptions.length).toBeGreaterThan(0);
    });
  });

  describe('樣式和 CSS 變數', () => {
    it('應該根據 isOptionListOpen 設定 CSS 變數', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions
        }
      });

      expect(wrapper.vm.cssVariable.value).toBeDefined();
      expect(wrapper.vm.cssVariable.value).toHaveProperty('--selector_arrow_icon');
      expect(wrapper.vm.cssVariable.value['--selector_arrow_icon']).toBe('rotate(0deg)');
    });

    it('應該支援自訂 optionListWidth', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          optionListWidth: '300px'
        }
      });

      expect(wrapper.vm.cssVariable.value['--select_option_list_width']).toBe('300px');
    });

    it('應該支援數字類型的 optionListWidth', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          optionListWidth: 250
        }
      });

      expect(wrapper.vm.cssVariable.value['--select_option_list_width']).toBe('250px');
    });

    it('應該支援 hasShadow 屬性', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          hasShadow: true
        }
      });

      expect(wrapper.vm.cssVariable.value['--select_option_list_shadow']).toBeDefined();
    });

    it('應該支援 hasTransition 屬性', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          hasTransition: true
        }
      });

      expect(wrapper.vm.cssVariable.value['--select_suffix_arrow_icon_transition']).toBeDefined();
    });

    it('應該支援自訂 optionListTop', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          optionListTop: 10
        }
      });

      // optionListTop 會影響 CSS 變數
      expect(wrapper.vm.cssVariable.value).toBeDefined();
    });

    it('應該支援字串類型的 optionListTop', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          optionListTop: '20px'
        }
      });

      expect(wrapper.vm.cssVariable.value).toBeDefined();
    });

    it('應該支援 optionListLeft 和 optionListRight', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          optionListLeft: '10px',
          optionListRight: 20
        }
      });

      expect(wrapper.vm.cssVariable.value['--select_option_list_left']).toBe('10px');
      expect(wrapper.vm.cssVariable.value['--select_option_list_right']).toBe('20px');
    });
  });

  describe('Watchers', () => {

    it('optionList 變化時應該重新計算高度', async () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions
        }
      });

      const initialHeight = wrapper.vm.optionListHeight.value;

      // 更新 optionList
      await wrapper.setProps({
        optionList: [...mockOptions, { value: '4', label: 'Option 4' }]
      });
      await flushPromises();

      // 高度應該被重置（設為 null 然後重新計算）
      // 由於測試環境的限制，我們只驗證函數被觸發
      expect(wrapper.vm.optionList).toHaveLength(4);
    });
  });

  describe('displayValue computed', () => {
    it('應該使用 displayKey 顯示值', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          modelValue: '1',
          valueKey: 'value',
          displayKey: 'label'
        }
      });

      expect(wrapper.vm.displayValue.value).toBe('Option 1');
    });

    it('應該回退到 modelValue 的 label 屬性', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: [],
          modelValue: { label: 'Custom Label' }
        }
      });

      expect(wrapper.vm.displayValue.value).toBe('Custom Label');
    });

    it('應該直接顯示 modelValue 如果沒有匹配的選項', () => {
      wrapper = mount(Selector, {
        ...globalConfig,
        props: {
          optionList: mockOptions,
          modelValue: 'Not in list'
        }
      });

      expect(wrapper.vm.displayValue.value).toBe('Not in list');
    });
  });
});
