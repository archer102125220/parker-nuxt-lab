import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import PhoneInput from '@app/components/PhoneInput.vue';

describe('PhoneInput.vue', () => {
  let wrapper;

  beforeEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('基本渲染', () => {
    it('應該正確渲染組件', () => {
      wrapper = mount(PhoneInput, {
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      expect(wrapper.find('.phone-input').exists()).toBe(true);
    });

    it('應該包含電話號碼輸入框', () => {
      wrapper = mount(PhoneInput, {
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      const input = wrapper.find('input[type="tel"]');
      expect(input.exists()).toBe(true);
    });

    it('應該顯示預設 placeholder', () => {
      wrapper = mount(PhoneInput, {
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      const input = wrapper.find('input[type="tel"]');
      expect(input.attributes('placeholder')).toBe('請輸入電話號碼');
    });

    it('應該支援自訂 placeholder', () => {
      wrapper = mount(PhoneInput, {
        props: {
          placeholder: 'Enter your phone'
        },
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      const input = wrapper.find('input[type="tel"]');
      expect(input.attributes('placeholder')).toBe('Enter your phone');
    });
  });

  describe('Props', () => {
    it('應該接受 defaultCountryCode prop', () => {
      wrapper = mount(PhoneInput, {
        props: {
          defaultCountryCode: 'US'
        },
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      expect(wrapper.props('defaultCountryCode')).toBe('US');
    });

    it('應該接受 returnObject prop', () => {
      wrapper = mount(PhoneInput, {
        props: {
          returnObject: true
        },
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      expect(wrapper.props('returnObject')).toBe(true);
    });

    it('應該接受 validate prop', () => {
      wrapper = mount(PhoneInput, {
        props: {
          validate: false
        },
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      expect(wrapper.props('validate')).toBe(false);
    });

    it('應該接受 validateOnInput prop', () => {
      wrapper = mount(PhoneInput, {
        props: {
          validateOnInput: true
        },
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      expect(wrapper.props('validateOnInput')).toBe(true);
    });
  });

  describe('電話號碼輸入', () => {
    it('應該允許輸入電話號碼', async () => {
      wrapper = mount(PhoneInput, {
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      const input = wrapper.find('input[type="tel"]');
      await input.setValue('0912345678');

      expect(input.element.value).toBe('0912345678');
    });
  });

  describe('焦點事件', () => {
    it('focus 時應該觸發 focus 事件', async () => {
      wrapper = mount(PhoneInput, {
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      const input = wrapper.find('input[type="tel"]');
      await input.trigger('focus');

      expect(wrapper.emitted('focus')).toBeTruthy();
    });

    it('blur 時應該觸發 blur 事件', async () => {
      wrapper = mount(PhoneInput, {
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      const input = wrapper.find('input[type="tel"]');
      await input.trigger('blur');

      expect(wrapper.emitted('blur')).toBeTruthy();
    });

    it('focus 時應該更新 isFocused 狀態', async () => {
      wrapper = mount(PhoneInput, {
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      const input = wrapper.find('input[type="tel"]');
      await input.trigger('focus');

      expect(wrapper.vm.isFocused.value).toBe(true);
    });

    it('blur 時應該重置 isFocused 狀態', async () => {
      wrapper = mount(PhoneInput, {
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      const input = wrapper.find('input[type="tel"]');
      await input.trigger('focus');
      await input.trigger('blur');

      expect(wrapper.vm.isFocused.value).toBe(false);
    });
  });

  describe('v-model', () => {
    it('應該處理空的 modelValue', async () => {
      wrapper = mount(PhoneInput, {
        props: {
          modelValue: ''
        },
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.phoneNumber.value).toBe('');
    });

    it('應該處理 null modelValue', async () => {
      wrapper = mount(PhoneInput, {
        props: {
          modelValue: null
        },
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.phoneNumber.value).toBe('');
    });
  });

  describe('CSS 變數', () => {
    it('預設狀態應該有正確的邊框顏色', () => {
      wrapper = mount(PhoneInput, {
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      // cssVariable 是 computed ref，需要用 .value 訪問
      const cssVars = wrapper.vm.cssVariable.value;
      expect(cssVars['--phone-input-border-color']).toBe('#d5d5d5');
    });
  });

  describe('國家列表', () => {
    it('應該有 countryList computed 屬性', () => {
      wrapper = mount(PhoneInput, {
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      expect(wrapper.vm.countryList).toBeDefined();
      expect(wrapper.vm.countryList.value).toBeInstanceOf(Array);
    });

    it('countryList 應該包含台灣', () => {
      wrapper = mount(PhoneInput, {
        global: {
          stubs: {
            Selector: true
          }
        }
      });

      const taiwan = wrapper.vm.countryList.value.find(c => c.countryCode === 'TW');
      expect(taiwan).toBeDefined();
      expect(taiwan.phoneCode).toBe('886');
    });
  });
});
