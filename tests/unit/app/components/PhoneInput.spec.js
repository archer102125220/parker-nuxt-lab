import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  afterEach
} from 'vitest';

// Mock phoneCountryCode.js 模組 - 必須在導入組件之前
vi.mock('@app/assets/phoneCountryCode.js', () => {
  const mockCountryList = [{
    countryCode: 'TW',
    countryName: '台灣',
    phoneCode: '886'
  },
  {
    countryCode: 'US',
    countryName: '美國',
    phoneCode: '1'
  },
  {
    countryCode: 'JP',
    countryName: '日本',
    phoneCode: '81'
  },
  {
    countryCode: 'CN',
    countryName: '中國',
    phoneCode: '86'
  }
  ];

  return {
    default: mockCountryList,
    PHONE_AREA_CODE: mockCountryList
  };
});

import {
  mount,
  flushPromises
} from '@vue/test-utils';
import PhoneInput from '@app/components/PhoneInput.vue';
import {
  checkPhone
} from '@shared/third-party/check-phone.js';

// 簡單的 Selector stub 組件
const SelectorStub = {
  name: 'Selector',
  template: '<div class="selector"><slot /></div>',
  props: ['modelValue', 'optionList', 'valueKey', 'displayKey', 'hasShadow', 'hasTransition', 'optionListWidth'],
  emits: ['update:modelValue', 'change']
};

// 全域設定
const globalConfig = {
  global: {
    directives: {
      ripple: {} // Stub v-ripple directive
    },
    stubs: {
      Selector: SelectorStub // 使用簡單的 Selector stub
    }
  }
};

describe('PhoneInput.vue', () => {
  let wrapper;

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
      wrapper = mount(PhoneInput, {
        ...globalConfig
      });

      expect(wrapper.find('.phone_input').exists()).toBe(true);
      expect(wrapper.find('.phone_input-country_selector').exists()).toBe(true);
      expect(wrapper.find('.phone_input-number-field').exists()).toBe(true);
    });

    it('應該顯示預設的國家選擇器', () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          defaultCountryCode: 'TW'
        }
      });

      // 預設應該選擇台灣
      expect(wrapper.vm.selectedCountry.value).toBeTruthy();
    });

    it('應該顯示自訂的 placeholder', () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          placeholder: '請輸入手機號碼'
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      expect(input.attributes('placeholder')).toBe('請輸入手機號碼');
    });
  });

  describe('國家選擇', () => {
    it('應該初始化為預設國家', () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          defaultCountryCode: 'JP'
        }
      });

      expect(wrapper.vm.selectedCountry.value?.countryCode).toBe('JP');
    });

    it('切換國家應該觸發 change 事件', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          defaultCountryCode: 'TW'
        }
      });

      // 模擬切換國家
      wrapper.vm.handleCountryChange('US');
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.selectedCountry.value?.countryCode).toBe('US');
      expect(wrapper.emitted('change')).toBeTruthy();
    });

    it('切換國家應該更新完整電話號碼', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          defaultCountryCode: 'TW'
        }
      });

      // 輸入電話號碼
      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('912345678');

      // 切換國家
      wrapper.vm.handleCountryChange('US');
      await wrapper.vm.$nextTick();

      // 檢查發送的值包含新的國碼
      const emittedValue = wrapper.emitted('update:modelValue')[wrapper.emitted('update:modelValue').length - 1][0];
      expect(emittedValue).toContain('+1');
    });
  });

  describe('電話號碼輸入', () => {
    it('應該允許輸入數字', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('0912345678');

      expect(wrapper.vm.phoneNumber.value).toBe('0912345678');
    });

    it('應該過濾非法字符（只允許數字、空格、破折號、括號）', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig
      });

      const input = wrapper.find('.phone_input-number-field');

      // 設置包含非法字符的值
      wrapper.vm.phoneNumber.value = '091abc2345xyz678!@#';
      wrapper.vm.handlePhoneNumberInput();

      // 應該只保留數字
      expect(wrapper.vm.phoneNumber.value).toBe('0912345678');
    });

    it('應該允許常見的電話號碼格式字符', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig
      });

      wrapper.vm.phoneNumber.value = '(091) 234-5678';
      wrapper.vm.handlePhoneNumberInput();

      expect(wrapper.vm.phoneNumber.value).toBe('(091) 234-5678');
    });

    it('輸入電話號碼應該觸發 change 事件', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('0912345678');
      await input.trigger('input');

      expect(wrapper.emitted('change')).toBeTruthy();
    });
  });

  describe('v-model 雙向綁定', () => {
    it('應該支援字串格式的 v-model', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          modelValue: '+886912345678'
        }
      });

      await wrapper.vm.$nextTick();

      // 應該解析國碼和號碼
      expect(wrapper.vm.selectedCountry.value?.phoneCode).toBe('886');
      expect(wrapper.vm.phoneNumber.value).toBe('912345678');
    });

    it('應該支援物件格式的 v-model', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          modelValue: {
            countryCode: 'US',
            phoneNumber: '2025551234'
          }
        }
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.selectedCountry.value?.countryCode).toBe('US');
      expect(wrapper.vm.phoneNumber.value).toBe('2025551234');
    });

    it('更新輸入應該發送 update:modelValue 事件', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('0912345678');
      await input.trigger('input');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    });

    it('modelValue 變化應該更新組件狀態', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          modelValue: ''
        }
      });

      await wrapper.setProps({
        modelValue: '+81312345678'
      });
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.selectedCountry.value?.phoneCode).toBe('81');
      expect(wrapper.vm.phoneNumber.value).toBe('312345678');
    });
  });

  describe('returnObject 模式', () => {
    it('returnObject=false 應該返回字串格式', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          returnObject: false,
          defaultCountryCode: 'TW'
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('912345678');
      await input.trigger('input');

      const emittedValue = wrapper.emitted('update:modelValue')[0][0];
      expect(typeof emittedValue).toBe('string');
      expect(emittedValue).toBe('+886912345678');
    });

    it('returnObject=true 應該返回物件格式', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          returnObject: true,
          defaultCountryCode: 'TW'
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('912345678');
      await input.trigger('input');

      const emittedValue = wrapper.emitted('update:modelValue')[0][0];
      expect(typeof emittedValue).toBe('object');
      expect(emittedValue).toHaveProperty('countryCode');
      expect(emittedValue).toHaveProperty('phoneCode');
      expect(emittedValue).toHaveProperty('phoneNumber');
      expect(emittedValue).toHaveProperty('fullNumber');
      expect(emittedValue.fullNumber).toBe('+886912345678');
    });

    it('returnObject 物件應該包含完整資訊', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          returnObject: true,
          defaultCountryCode: 'JP'
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('312345678');
      await input.trigger('input');

      const emittedValue = wrapper.emitted('update:modelValue')[0][0];
      expect(emittedValue.countryCode).toBe('JP');
      expect(emittedValue.phoneCode).toBe('81');
      expect(emittedValue.phoneNumber).toBe('312345678');
      expect(emittedValue.countryName).toBe('日本');
    });
  });

  describe('驗證功能', () => {
    it('validate=false 應該不進行驗證', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: false
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('invalid');
      await input.trigger('blur');

      expect(wrapper.vm.validationError.value).toBe('');
      expect(wrapper.find('.phone_input-error').exists()).toBe(false);
    });

    it('validate=true 應該在 blur 時驗證', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: true,
          defaultCountryCode: 'TW'
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('123'); // 無效的台灣電話號碼
      await input.trigger('blur');

      expect(wrapper.vm.validationError.value).toBeTruthy();
      expect(wrapper.vm.hasError.value).toBe(true);
    });

    it('驗證通過應該清除錯誤訊息', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: true,
          defaultCountryCode: 'TW'
        }
      });

      const input = wrapper.find('.phone_input-number-field');

      // 先輸入無效號碼
      await input.setValue('123');
      await input.trigger('blur');
      expect(wrapper.vm.validationError.value).toBeTruthy();

      // 再輸入有效號碼
      await input.setValue('0912345678');
      await input.trigger('blur');
      expect(wrapper.vm.validationError.value).toBe('');
      expect(wrapper.vm.hasError.value).toBe(false);
    });

    it('validateOnInput=true 應該即時驗證', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: true,
          validateOnInput: true,
          defaultCountryCode: 'TW'
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('123');
      await input.trigger('input');

      // 應該立即驗證，不需要等待 blur
      expect(wrapper.vm.validationError.value).toBeTruthy();
    });

    it('validateOnInput=false 應該只在 blur 時驗證', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: true,
          validateOnInput: false,
          defaultCountryCode: 'TW'
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('123');
      await input.trigger('input');

      // input 時不應該顯示錯誤
      expect(wrapper.vm.showError.value).toBe(false);

      await input.trigger('blur');

      // blur 時才顯示錯誤
      expect(wrapper.vm.showError.value).toBe(true);
    });

    it('空值應該通過驗證', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: true
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('');
      await input.trigger('blur');

      expect(wrapper.vm.validationError.value).toBe('');
      expect(wrapper.vm.hasError.value).toBe(false);
    });

    it('應該發送 validate 事件', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: true,
          defaultCountryCode: 'TW'
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('0912345678');
      await input.trigger('blur');

      expect(wrapper.emitted('validate')).toBeTruthy();
      const validateEvent = wrapper.emitted('validate')[0][0];
      expect(validateEvent).toHaveProperty('isValid');
      expect(validateEvent).toHaveProperty('error');
    });

    it('驗證失敗應該發送包含錯誤訊息的 validate 事件', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: true,
          defaultCountryCode: 'TW'
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('123');
      await input.trigger('blur');

      const validateEvent = wrapper.emitted('validate')[0][0];
      expect(validateEvent.isValid).toBe(false);
      expect(validateEvent.error).toBeTruthy();
    });
  });

  describe('錯誤訊息顯示', () => {
    it('應該顯示錯誤訊息', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: true,
          defaultCountryCode: 'TW'
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('123');
      await input.trigger('blur');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('.phone_input-error').exists()).toBe(true);
    });

    it('錯誤狀態應該改變邊框顏色', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: true,
          defaultCountryCode: 'TW'
        }
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('123');
      await input.trigger('blur');
      await wrapper.vm.$nextTick();

      const cssVars = wrapper.vm.cssVariable.value;
      expect(cssVars['--phone_input-border-color']).toBe('#dc3545');
    });

    it('輸入時應該隱藏錯誤訊息（validateOnInput=false）', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: true,
          validateOnInput: false,
          defaultCountryCode: 'TW'
        }
      });

      const input = wrapper.find('.phone_input-number-field');

      // 先觸發錯誤
      await input.setValue('123');
      await input.trigger('blur');
      expect(wrapper.vm.showError.value).toBe(true);

      // 再次輸入時應該隱藏錯誤
      await input.setValue('1234');
      await input.trigger('input');
      expect(wrapper.vm.showError.value).toBe(false);
    });
  });

  describe('焦點狀態', () => {
    it('focus 時應該觸發 focus 事件', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.trigger('focus');

      expect(wrapper.emitted('focus')).toBeTruthy();
      expect(wrapper.vm.isFocused.value).toBe(true);
    });

    it('blur 時應該觸發 blur 事件', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.trigger('focus');
      await input.trigger('blur');

      expect(wrapper.emitted('blur')).toBeTruthy();
      expect(wrapper.vm.isFocused.value).toBe(false);
    });

    it('focus 時應該改變邊框顏色', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.trigger('focus');
      await wrapper.vm.$nextTick();

      const cssVars = wrapper.vm.cssVariable.value;
      expect(cssVars['--phone_input-border-color']).toBe('#2c64e3');
      expect(cssVars['--phone_input-box-shadow']).toContain('rgba(44, 100, 227');
    });

    it('blur 時應該恢復預設邊框顏色', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig
      });

      const input = wrapper.find('.phone_input-number-field');
      await input.trigger('focus');
      await input.trigger('blur');
      await wrapper.vm.$nextTick();

      const cssVars = wrapper.vm.cssVariable.value;
      expect(cssVars['--phone_input-border-color']).toBe('#d5d5d5');
    });
  });

  describe('Props', () => {
    it('應該支援自訂 optionListWidth', () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          optionListWidth: '350px'
        }
      });

      // Selector 組件應該接收到這個 prop
      const selector = wrapper.findComponent(Selector);
      expect(selector.props('optionListWidth')).toBe('350px');
    });

    it('應該支援數字類型的 optionListWidth', () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          optionListWidth: 300
        }
      });

      const selector = wrapper.findComponent(Selector);
      expect(selector.props('optionListWidth')).toBe(300);
    });
  });

  describe('邊界情況', () => {
    it('應該處理空的 modelValue', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          modelValue: ''
        }
      });

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.phoneNumber.value).toBe('');
    });

    it('應該處理 null modelValue', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          modelValue: null
        }
      });

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.phoneNumber.value).toBe('');
    });

    it('應該處理 undefined modelValue', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          modelValue: undefined
        }
      });

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.phoneNumber.value).toBe('');
    });

    it('應該處理無效的國碼', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          modelValue: '+999123456789' // 不存在的國碼
        }
      });

      await wrapper.vm.$nextTick();
      // 應該使用預設國家
      expect(wrapper.vm.selectedCountry.value).toBeTruthy();
    });

    it('defaultCountryCode 變化應該更新選中的國家', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          defaultCountryCode: 'TW'
        }
      });

      expect(wrapper.vm.selectedCountry.value?.countryCode).toBe('TW');

      await wrapper.setProps({
        defaultCountryCode: 'US'
      });
      await wrapper.vm.$nextTick();

      // 如果已經有選中的國家，不應該自動切換
      // 只有在沒有選中國家時才會使用新的 defaultCountryCode
      expect(wrapper.vm.selectedCountry.value?.countryCode).toBe('TW');
    });
  });

  describe('整合測試', () => {
    it('完整流程：選擇國家 → 輸入號碼 → 驗證 → 提交', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: true,
          returnObject: true,
          defaultCountryCode: 'TW'
        }
      });

      // 1. 切換國家到美國
      wrapper.vm.handleCountryChange('US');
      await wrapper.vm.$nextTick();

      // 2. 輸入電話號碼
      const input = wrapper.find('.phone_input-number-field');
      await input.setValue('2025551234');
      await input.trigger('input');

      // 3. 失去焦點觸發驗證
      await input.trigger('blur');

      // 4. 檢查最終結果
      const emittedValue = wrapper.emitted('update:modelValue')[wrapper.emitted('update:modelValue').length - 1][0];
      expect(emittedValue.countryCode).toBe('US');
      expect(emittedValue.phoneCode).toBe('1');
      expect(emittedValue.phoneNumber).toBe('2025551234');
      expect(emittedValue.fullNumber).toBe('+12025551234');

      // 驗證應該通過
      const validateEvent = wrapper.emitted('validate')[0][0];
      expect(validateEvent.isValid).toBe(true);
    });

    it('完整流程：輸入無效號碼 → 顯示錯誤 → 修正 → 錯誤消失', async () => {
      wrapper = mount(PhoneInput, {
        ...globalConfig,
        props: {
          validate: true,
          defaultCountryCode: 'TW'
        }
      });

      const input = wrapper.find('.phone_input-number-field');

      // 1. 輸入無效號碼
      await input.setValue('123');
      await input.trigger('blur');
      await wrapper.vm.$nextTick();

      // 2. 應該顯示錯誤
      expect(wrapper.find('.phone_input-error').exists()).toBe(true);
      expect(wrapper.vm.hasError.value).toBe(true);

      // 3. 修正號碼
      await input.setValue('0912345678');
      await input.trigger('blur');
      await wrapper.vm.$nextTick();

      // 4. 錯誤應該消失
      expect(wrapper.vm.hasError.value).toBe(false);
      expect(wrapper.vm.validationError.value).toBe('');
    });
  });
});