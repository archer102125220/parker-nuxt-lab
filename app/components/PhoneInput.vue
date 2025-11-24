<template>
  <div class="phone_input" :style="cssVariable">
    <div class="phone_input-country_selector">
      <Selector
        v-model="selectedCountry"
        :option-list="countryList"
        value-key="countryCode"
        display-key="phoneCode"
        :has-shadow="true"
        :has-transition="true"
        :option-list-width="optionListWidth"
        @change="handleCountryChange"
      >
        <template #prefix="{ isOptionOpen }">
          <div class="phone_input-country_selector-flag">
            <span
              :class="[
                'fi',
                `fi-${selectedCountry?.countryCode?.toLowerCase() || 'tw'}`
              ]"
            />
          </div>
        </template>
        <template #value="{ value }">
          <span class="phone_input-country_selector-code">
            +{{ value?.phoneCode || selectedCountry?.phoneCode || '886' }}
          </span>
        </template>
        <template #default="{ option, selected }">
          <div class="phone_input-country_selector-option">
            <span
              :class="[
                'fi',
                `fi-${option.countryCode?.toLowerCase()}`,
                'phone_input-country_selector-option-flag'
              ]"
            />
            <span class="phone_input-country_selector-option-name">
              {{ option.countryName }}
            </span>
            <span
              :class="[
                'phone_input-country_selector-option-code',
                selected ? 'selected' : ''
              ]"
            >
              +{{ option.phoneCode }}
            </span>
          </div>
        </template>
      </Selector>
    </div>
    <div class="phone_input-divider" />
    <div class="phone_input-number">
      <input
        v-model="phoneNumber"
        type="tel"
        :placeholder="placeholder"
        class="phone_input-number-field"
        @input="handlePhoneNumberInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>
  </div>
  <transition name="error-fade">
    <div v-if="showError && validationError" class="phone_input-error">
      {{ validationError }}
    </div>
  </transition>
</template>

<script setup>
import PHONE_AREA_CODE from '@app/assets/phoneCountryCode.js';
import { checkPhone } from '@shared/third-party/check-phone.js';

const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: ''
  },
  defaultCountryCode: {
    type: String,
    default: 'TW'
  },
  placeholder: {
    type: String,
    default: '請輸入電話號碼'
  },
  optionListWidth: {
    type: [String, Number],
    default: '280px'
  },
  // 是否返回完整對象 { countryCode, phoneCode, phoneNumber, fullNumber }
  returnObject: {
    type: Boolean,
    default: false
  },
  // 是否啟用驗證
  validate: {
    type: Boolean,
    default: true
  },
  // 是否在輸入時即時驗證（false 則只在 blur 時驗證）
  validateOnInput: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  'update:modelValue',
  'change',
  'blur',
  'focus',
  'validate'
]);

const countryList = computed(() => {
  // 去重複的國碼（有些國家共用同一個國碼）
  const uniqueCountries = [];
  const seenCodes = new Set();

  PHONE_AREA_CODE.forEach((country) => {
    const key = `${country.countryCode}-${country.phoneCode}`;
    if (!seenCodes.has(key)) {
      seenCodes.add(key);
      uniqueCountries.push(country);
    }
  });

  return uniqueCountries;
});

const selectedCountry = ref(null);
const phoneNumber = ref('');
const isFocused = ref(false);
const validationError = ref('');
const showError = ref(false);
const hasError = ref(false);

const cssVariable = computed(() => {
  // 錯誤狀態優先
  if (hasError.value && showError.value) {
    return {
      '--phone_input-border-color': '#dc3545',
      '--phone_input-box-shadow': '0 0 0 2px rgba(220, 53, 69, 0.1)'
    };
  }

  return {
    '--phone_input-border-color': isFocused.value ? '#2c64e3' : '#d5d5d5',
    '--phone_input-box-shadow': isFocused.value
      ? '0 0 0 2px rgba(44, 100, 227, 0.1)'
      : 'none'
  };
});

// 初始化選中的國家
onMounted(() => {
  initializeCountry();
  parseModelValue();
});

watch(
  () => props.modelValue,
  () => {
    parseModelValue();
  }
);

watch(
  () => props.defaultCountryCode,
  () => {
    if (!selectedCountry.value) {
      initializeCountry();
    }
  }
);

function initializeCountry() {
  const defaultCountry = countryList.value.find(
    (c) => c.countryCode === props.defaultCountryCode
  );
  selectedCountry.value = defaultCountry || countryList.value[0];
}

function parseModelValue() {
  if (!props.modelValue) {
    phoneNumber.value = '';
    return;
  }

  if (typeof props.modelValue === 'object') {
    // 如果是對象格式
    if (props.modelValue.countryCode) {
      const country = countryList.value.find(
        (c) => c.countryCode === props.modelValue.countryCode
      );
      if (country) {
        selectedCountry.value = country;
      }
    }
    phoneNumber.value = props.modelValue.phoneNumber || '';
  } else {
    // 如果是字符串格式，嘗試解析
    const value = String(props.modelValue);
    if (value.startsWith('+')) {
      // 格式如 +886912345678
      const match = value.match(/^\+(\d+)(.*)$/);
      if (match) {
        const code = match[1];
        const number = match[2];
        const country = countryList.value.find((c) => c.phoneCode === code);
        if (country) {
          selectedCountry.value = country;
        }
        phoneNumber.value = number;
      }
    } else {
      phoneNumber.value = value;
    }
  }
}

function handleCountryChange(newCountryCode) {
  // Selector 組件會發送 countryCode（因為我們設定了 value-key="countryCode"）
  // 我們需要找到完整的國家對象並更新 selectedCountry
  const country = countryList.value.find(
    (c) => c.countryCode === newCountryCode
  );
  if (country) {
    selectedCountry.value = country;
  }
  emitValue();
}

function handlePhoneNumberInput() {
  // 只允許數字和常見的電話號碼字符
  phoneNumber.value = phoneNumber.value.replace(/[^\d\s\-()]/g, '');

  // 如果啟用即時驗證
  if (props.validate && props.validateOnInput) {
    validatePhoneNumber();
  } else {
    // 清除錯誤狀態（輸入時）
    showError.value = false;
  }

  emitValue();
}

function handleFocus() {
  isFocused.value = true;
  emit('focus');
}

function handleBlur() {
  isFocused.value = false;

  // 失去焦點時進行驗證
  if (props.validate) {
    validatePhoneNumber();
    showError.value = true;
  }

  emit('blur');
}

function validatePhoneNumber() {
  // 如果沒有輸入電話號碼，不顯示錯誤
  if (!phoneNumber.value || phoneNumber.value.trim() === '') {
    validationError.value = '';
    hasError.value = false;
    emit('validate', { isValid: true, error: '' });
    return true;
  }

  const result = checkPhone(
    phoneNumber.value,
    selectedCountry.value?.phoneCode || '886'
  );

  if (result.isValid) {
    validationError.value = '';
    hasError.value = false;
    emit('validate', { isValid: true, error: '' });
    return true;
  } else {
    validationError.value = result.errorMessage;
    hasError.value = true;
    emit('validate', { isValid: false, error: result.errorMessage });
    return false;
  }
}

function emitValue() {
  const fullNumber = `+${selectedCountry.value?.phoneCode || ''}${phoneNumber.value}`;

  if (props.returnObject) {
    const value = {
      countryCode: selectedCountry.value?.countryCode || '',
      countryName: selectedCountry.value?.countryName || '',
      phoneCode: selectedCountry.value?.phoneCode || '',
      phoneNumber: phoneNumber.value,
      fullNumber
    };
    emit('update:modelValue', value);
    emit('change', value);
  } else {
    emit('update:modelValue', fullNumber);
    emit('change', fullNumber);
  }
}
</script>

<style lang="scss">
// 引入 flag-icons 樣式
@import 'flag-icons/css/flag-icons.min.css';

.phone_input {
  display: flex;
  align-items: center;
  border: 1px solid var(--phone_input-border-color, #d5d5d5);
  border-radius: 8px;
  padding: 8px 12px;
  background-color: #fff;
  transition: all 0.3s ease;
  box-shadow: var(--phone_input-box-shadow, none);

  &:hover {
    border-color: #999;
  }

  &-country_selector {
    display: flex;
    align-items: center;
    min-width: 100px;

    .selector {
      border: none;
      padding: 0;
      min-height: auto;
    }

    &-flag {
      display: flex;
      align-items: center;
      margin-right: 8px;

      .fi {
        width: 24px;
        height: 18px;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
    }

    &-code {
      font-family: 'PingFang SC', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #111;
    }

    &-option {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;

      &-flag {
        width: 20px;
        height: 15px;
        border-radius: 2px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        flex-shrink: 0;
      }

      &-name {
        flex: 1;
        font-size: 13px;
        color: #333;
      }

      &-code {
        font-size: 12px;
        color: #666;
        font-weight: 500;

        &.selected {
          color: $primary;
        }
      }
    }
  }

  &-divider {
    width: 1px;
    height: 24px;
    background-color: #e0e0e0;
    margin: 0 12px;
  }

  &-number {
    flex: 1;
    display: flex;
    align-items: center;

    &-field {
      width: 100%;
      border: none;
      outline: none;
      font-family: 'PingFang SC', sans-serif;
      font-size: 14px;
      color: #111;
      background: transparent;

      &::placeholder {
        color: #999;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type='number'] {
        -moz-appearance: textfield;
      }
    }
  }

  &-error {
    margin-top: 6px;
    font-size: 13px;
    color: #dc3545;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;

    &::before {
      content: '⚠';
      font-size: 14px;
    }
  }
}

// 錯誤訊息淡入淡出動畫
.error-fade-enter-active,
.error-fade-leave-active {
  transition: all 0.3s ease;
}

.error-fade-enter-from,
.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
