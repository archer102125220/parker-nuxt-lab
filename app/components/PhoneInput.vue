<template>
  <div class="phone-input">
    <div class="phone-input__container" :style="cssVariable">
      <Selector
        v-model="selectedCountry"
        :option-list="countryList"
        value-key="countryCode"
        display-key="phoneCode"
        :has-shadow="true"
        :has-transition="true"
        :option-list-width="optionListWidth"
        class="phone-input__country-selector"
        @change="handleCountryChange"
      >
        <template #prefix>
          <div class="phone-input__country-selector__flag">
            <span
              :class="[
                'fi',
                `fi-${selectedCountry?.countryCode?.toLowerCase() || 'tw'}`
              ]"
            />
          </div>
        </template>
        <template #value="{ value }">
          <span class="phone-input__country-selector__code">
            +{{ value?.phoneCode || selectedCountry?.phoneCode || '886' }}
          </span>
        </template>
        <template #default="{ option, selected }">
          <div class="phone-input__country-selector__option">
            <span
              :class="[
                'fi',
                `fi-${option.countryCode?.toLowerCase()}`,
                'phone-input__country-selector__option__flag'
              ]"
            />
            <span class="phone-input__country-selector__option__name">
              {{ option.countryName }}
            </span>
            <span
              :css-selected="selected"
              class="phone-input__country-selector__option__code"
            >
              +{{ option.phoneCode }}
            </span>
          </div>
        </template>
      </Selector>
      <div class="phone-input__divider" />
      <div class="phone-input__number">
        <input
          v-model="phoneNumber"
          type="tel"
          :placeholder="placeholder"
          class="phone-input__number__field"
          @input="handlePhoneNumberInput"
          @blur="handleBlur"
          @focus="handleFocus"
        />
      </div>
    </div>
    <transition name="error-fade">
      <div v-if="showError && validationError" class="phone-input__error">
        {{ validationError }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import PHONE_AREA_CODE from '@app/assets/phoneCountryCode';
import { checkPhone } from '@shared/third-party/check-phone';

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
  // 合併相同國碼的國家，以第一個國家的 icon 為基準，串接國家名稱
  const phoneCodeMap = new Map();

  PHONE_AREA_CODE.forEach((country) => {
    if (!phoneCodeMap.has(country.phoneCode)) {
      // 第一次遇到這個國碼，直接加入
      phoneCodeMap.set(country.phoneCode, {
        countryCode: country.countryCode, // 使用第一個國家的 icon
        countryName: country.countryName,
        phoneCode: country.phoneCode,
        countryNames: [country.countryName] // 保存所有國家名稱
      });
    } else {
      // 已經存在這個國碼，將國家名稱加入
      const existing = phoneCodeMap.get(country.phoneCode);
      existing.countryNames.push(country.countryName);
      // 更新串接後的國家名稱
      existing.countryName = existing.countryNames.join(' / ');
    }
  });

  return Array.from(phoneCodeMap.values());
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
      '--phone-input-border-color': '#dc3545',
      '--phone-input-box-shadow': '0 0 0 2px rgba(220, 53, 69, 0.1)'
    };
  }

  return {
    '--phone-input-border-color': isFocused.value ? '#2c64e3' : '#d5d5d5',
    '--phone-input-box-shadow': isFocused.value
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
      // 嘗試匹配已知的國際碼（從最長到最短）
      let matched = false;
      const numberPart = value.substring(1); // 移除 +

      // 按照國際碼長度排序（從長到短），避免短碼誤匹配
      const sortedCountries = [...countryList.value].sort(
        (a, b) => b.phoneCode.length - a.phoneCode.length
      );

      for (const country of sortedCountries) {
        if (numberPart.startsWith(country.phoneCode)) {
          selectedCountry.value = country;
          phoneNumber.value = numberPart.substring(country.phoneCode.length);
          matched = true;
          break;
        }
      }

      // 如果沒有匹配到任何國際碼，保留原值
      if (!matched) {
        phoneNumber.value = value;
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

.phone-input {
  &__container {
    // Display & Box Model
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border: 1px solid var(--phone-input-border-color, #d5d5d5);
    border-radius: 8px;

    // Visual
    background-color: #fff;
    box-shadow: var(--phone-input-box-shadow, none);

    // Animation
    transition: all 0.3s ease;

    &:hover {
      border-color: #999;
    }
  }

  &__country-selector {
    // Display & Box Model
    display: flex;
    align-items: center;
    min-width: 100px;
    min-height: auto;
    padding: 0;
    border: none;

    &__flag {
      // Display & Box Model
      display: flex;
      align-items: center;
      margin-right: 8px;

      .fi {
        // Display & Box Model
        width: 24px;
        height: 18px;
        border-radius: 2px;

        // Visual
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
    }

    &__code {
      // Typography
      font-family: 'PingFang SC', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #111;
    }

    &__option {
      // Display & Box Model
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;

      &__flag {
        // Display & Box Model
        flex-shrink: 0;
        width: 20px;
        height: 15px;
        border-radius: 2px;

        // Visual
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      &__name {
        // Display & Box Model
        flex: 1;

        // Typography
        font-size: 13px;
        color: #333;
      }

      &__code {
        // Typography
        font-size: 12px;
        font-weight: 500;
        color: #666;

        &[css-selected='true'] {
          color: $primary;
        }
      }
    }
  }

  &__divider {
    // Display & Box Model
    width: 1px;
    height: 24px;
    margin: 0 12px;

    // Visual
    background-color: #e0e0e0;
  }

  &__number {
    // Display & Box Model
    flex: 1;
    display: flex;
    align-items: center;

    &__field {
      // Display & Box Model
      width: 100%;
      padding: 0;
      border: none;

      // Typography
      font-family: 'PingFang SC', sans-serif;
      font-size: 14px;
      color: #111;

      // Visual
      background: transparent;

      // Misc
      outline: none;

      &::placeholder {
        color: #999;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        margin: 0;
        -webkit-appearance: none;
      }

      &[type='number'] {
        -moz-appearance: textfield;
      }
    }
  }

  &__error {
    // Display & Box Model
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 6px;

    // Typography
    font-size: 13px;
    font-weight: 500;
    color: #dc3545;

    &::before {
      // Typography
      font-size: 14px;

      // Misc
      content: '⚠';
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
  // Visual
  opacity: 0;

  // Animation
  transform: translateY(-4px);
}
</style>
