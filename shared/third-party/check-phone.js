import { PhoneNumberUtil } from 'google-libphonenumber';

import PHONE_AREA_CODE from '@app/assets/phoneCountryCode';

const phoneUtil = PhoneNumberUtil.getInstance();

export function checkPhone(phone = '000', countryCode = '') {
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

  // 檢查國碼格式
  if (
    isNaN(countryCode) ||
    typeof countryCode !== 'string' ||
    countryCode === ''
  ) {
    result.countryCodeError = true;
    result.errorMessage = '無效的國碼';
    return result;
  }

  // 檢查電話號碼是否包含非數字字符（除了空格、括號、破折號）
  if (isNaN(phone.replace(/[\s\-()]/g, ''))) {
    result.phoneError = true;
    result.errorMessage = '電話號碼格式不正確';
    return result;
  }

  try {
    const phoneAreaCodeObj =
      typeof countryCode === 'string' && countryCode !== ''
        ? PHONE_AREA_CODE.find(
          (_phoneCountryCode) =>
            _phoneCountryCode.phoneCode.padStart(3, 0) ===
            countryCode.padStart(3, 0)
        ) || {}
        : {};

    if (
      typeof phoneAreaCodeObj?.countryCode !== 'string' ||
      phoneAreaCodeObj?.countryCode === ''
    ) {
      result.countryCodeError = true;
      result.errorMessage = '無法識別的國碼';
      return result;
    }

    const phoneCountryCode = phoneAreaCodeObj?.countryCode || 'TW';

    const phoneNumberObj = phoneUtil.parseAndKeepRawInput(
      phone,
      phoneCountryCode
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