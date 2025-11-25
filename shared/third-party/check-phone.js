import { PhoneNumberUtil } from 'google-libphonenumber';

import PHONE_AREA_CODE from '@app/assets/phoneCountryCode';

const phoneUtil = PhoneNumberUtil.getInstance();

/**
 * 驗證電話號碼
 * @param {string} phone - 電話號碼
 * @param {string} phoneCode - 電話國碼（如 '886' 代表台灣，'1' 代表美國）
 * @returns {Object} 驗證結果
 */
export function checkPhone(phone = '000', phoneCode = '') {
  const result = {
    countryCodeError: false,
    phoneError: true,
    isValid: false,
    errorMessage: ''
  };

  // 檢查電話號碼是否為空
  if (!phone || phone.trim() === '') {
    result.phoneError = true;
    result.errorMessage = '請輸入電話號碼';
    return result;
  }

  // 檢查電話國碼格式
  if (
    typeof phoneCode !== 'string' ||
    phoneCode === ''
  ) {
    result.countryCodeError = true;
    result.errorMessage = '無效的電話國碼';
    return result;
  }

  // 檢查電話號碼是否包含非數字字符（除了空格、括號、破折號）
  if (isNaN(phone.replace(/[\s\-()]/g, ''))) {
    result.phoneError = true;
    result.errorMessage = '電話號碼格式不正確';
    return result;
  }

  try {
    // 根據電話國碼（phoneCode）查找對應的國家資訊
    const phoneAreaCodeObj =
      typeof phoneCode === 'string' && phoneCode !== ''
        ? PHONE_AREA_CODE.find(
          (areaCode) =>
            areaCode.phoneCode.padStart(3, 0) ===
            phoneCode.padStart(3, 0)
        ) || {}
        : {};

    // 檢查是否找到對應的國家代碼（countryCode，如 'TW', 'US'）
    if (
      typeof phoneAreaCodeObj?.countryCode !== 'string' ||
      phoneAreaCodeObj?.countryCode === ''
    ) {
      result.countryCodeError = true;
      result.errorMessage = '無法識別的電話國碼';
      return result;
    }

    // 取得國家代碼（用於 google-libphonenumber）
    const countryCode = phoneAreaCodeObj?.countryCode || 'TW';

    const phoneNumberObj = phoneUtil.parseAndKeepRawInput(
      phone,
      countryCode
    );

    const isValidNumber = phoneUtil.isValidNumber(phoneNumberObj);
    result.phoneError = !isValidNumber;
    result.isValid = isValidNumber;

    if (!isValidNumber) {
      result.errorMessage = '電話號碼格式不正確';
    }

    return result;
  } catch (error) {
    result.phoneError = true;
    result.errorMessage = '電話號碼驗證失敗';
    return result;
  }
}

export function checkTelephone(telephone = '00000', areaCode = '02') {
  return /^0\d{1,3}-\d{5,8}$/.test(`${areaCode}-${telephone}`);
}