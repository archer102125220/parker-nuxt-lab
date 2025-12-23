# CSS 命名規範違規報告

> [!WARNING]
> **此報告包含大量誤判**
> 
> 此自動掃描報告將 JavaScript 變數名稱(如 `setLoading`, `getContext` 等)誤認為 CSS 類別名稱,導致大量誤報。
> 
> **實際情況:**
> - ✅ 核心組件 (app/components/) 已手動檢查
> - ✅ 22 個核心組件中,僅 1 個需要修正 (PhoneInput.vue)
> - ✅ 其餘 21 個組件已符合 CSS 命名規範
> 
> **建議:**
> - 請忽略此報告中的 JavaScript 變數名稱
> - 僅關注 `<style>` 區塊中的 CSS 類別名稱
> - 手動檢查是更可靠的方式

**生成日期**: 2025-12-03
**掃描檔案**: 109
**違規檔案**: 57 (包含大量誤判)
**違規總數**: 1945 (絕大多數為 JavaScript 變數誤判)
**實際 CSS 違規**: ~13 處 (僅 PhoneInput.vue)

---

## 📊 違規類型統計

| 違規類型 | 數量 |
|---------|------|
| Element uses camelCase | 1922 |
| Element uses double underscore (__) | 19 |
| HTML attribute missing css- prefix | 3 |
| State uses BEM modifier (--) instead of HTML attribute | 1 |

---

## 📝 詳細違規清單

### `app/app.vue`

**違規數量**: 23

1. **行 25**: `bgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: bg_color

2. **行 27**: `dialogSettings.contentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: dialog_settings.content_class

3. **行 27**: `contentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: content_class

4. **行 28**: `contentProps`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: content_props

5. **行 29**: `dialogProps`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: dialog_props

6. **行 30**: `broswerInfo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: broswer_info

7. **行 31**: `setDialog`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_dialog

8. **行 64**: `titleTemplate`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: title_template

9. **行 65**: `titleTemplate`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: title_template

10. **行 70**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

11. **行 73**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

12. **行 89**: `messageState`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: message_state

13. **行 101**: `setMessageState`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_message_state

14. **行 139**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

15. **行 140**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

16. **行 142**: `setAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_attribute

17. **行 158**: `setDialog`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_dialog

18. **行 164**: `errorMsg`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: error_msg

19. **行 168**: `infoMsg`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: info_msg

20. **行 172**: `warnMsg`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: warn_msg

21. **行 176**: `successMsg`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: success_msg

22. **行 180**: `clientInit`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_init

23. **行 181**: `clientInit`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_init

---

### `app/pages/web-cam.vue`

**違規數量**: 5

1. **行 43**: `getContext`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_context

2. **行 45**: `getContext`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_context

3. **行 46**: `clearRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: clear_rect

4. **行 53**: `drawImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_image

5. **行 55**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

---

### `app/pages/web-authn.vue`

**違規數量**: 59

1. **行 108**: `GET_webAuthnGenerateChallenge`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _g_e_t_web_authn_generate_challenge

2. **行 109**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

3. **行 147**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

4. **行 161**: `charCodeAt`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: char_code_at

5. **行 162**: `charCodeAt`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: char_code_at

6. **行 163**: `charCodeAt`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: char_code_at

7. **行 176**: `toJSON`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_j_s_o_n

8. **行 178**: `authenticatorAttachment`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: authenticator_attachment

9. **行 180**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

10. **行 180**: `rawId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: raw_id

11. **行 182**: `attestationObject`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: attestation_object

12. **行 183**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

13. **行 184**: `attestationObject`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: attestation_object

14. **行 187**: `getAuthenticatorData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_authenticator_data

15. **行 188**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

16. **行 189**: `getAuthenticatorData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_authenticator_data

17. **行 192**: `clientDataJSON`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_data_j_s_o_n

18. **行 193**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

19. **行 194**: `clientDataJSON`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_data_j_s_o_n

20. **行 197**: `getPublicKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_public_key

21. **行 198**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

22. **行 199**: `getPublicKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_public_key

23. **行 202**: `getPublicKeyAlgorithm`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_public_key_algorithm

24. **行 203**: `getTransports`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_transports

25. **行 209**: `POST_webAuthnRegistration`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _p_o_s_t_web_authn_registration

26. **行 214**: `getTransports`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_transports

27. **行 218**: `base64URLServerSaveData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: base64_u_r_l_server_save_data

28. **行 218**: `credentialPublicKeyPem`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: credential_public_key_pem

29. **行 221**: `base64URLServerSaveData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: base64_u_r_l_server_save_data

30. **行 221**: `credentialPublicKeyJwk`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: credential_public_key_jwk

31. **行 229**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

32. **行 230**: `base64URLServerSaveData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: base64_u_r_l_server_save_data

33. **行 230**: `credentialId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: credential_id

34. **行 234**: `base64URLServerSaveData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: base64_u_r_l_server_save_data

35. **行 234**: `credentialId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: credential_id

36. **行 245**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

37. **行 250**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

38. **行 256**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

39. **行 266**: `charCodeAt`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: char_code_at

40. **行 270**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

41. **行 284**: `userHandle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_handle

42. **行 286**: `toJSON`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_j_s_o_n

43. **行 288**: `authenticatorAttachment`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: authenticator_attachment

44. **行 290**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

45. **行 290**: `rawId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: raw_id

46. **行 292**: `authenticatorData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: authenticator_data

47. **行 293**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

48. **行 294**: `authenticatorData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: authenticator_data

49. **行 297**: `clientDataJSON`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_data_j_s_o_n

50. **行 298**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

51. **行 299**: `clientDataJSON`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_data_j_s_o_n

52. **行 303**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

53. **行 307**: `userHandle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_handle

54. **行 308**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

55. **行 309**: `userHandle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_handle

56. **行 317**: `POST_webAuthnVerify`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _p_o_s_t_web_authn_verify

57. **行 323**: `encodeURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: encode_u_r_l

58. **行 326**: `encodeURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: encode_u_r_l

59. **行 341**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

---

### `app/pages/offline.vue`

**違規數量**: 11

1. **行 17**: `backOnline`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: back_online

2. **行 23**: `canRetry`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: can_retry

3. **行 63**: `goHome`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: go_home

4. **行 75**: `tipTitle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tip_title

5. **行 77**: `tipMessage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tip_message

6. **行 85**: `autoDetect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: auto_detect

7. **行 134**: `onLine`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: on_line

8. **行 137**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

9. **行 138**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

10. **行 144**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

11. **行 145**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

---

### `app/pages/index.vue`

**違規數量**: 1

1. **行 28**: `defaultTitle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: default_title

---

### `app/pages/frontend-api-cach-test.vue`

**違規數量**: 8

1. **行 103**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

2. **行 105**: `POST_frontendApiCachTest`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _p_o_s_t_frontend_api_cach_test

3. **行 119**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

4. **行 120**: `timeEnd`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_end

5. **行 130**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

6. **行 132**: `GET_frontendApiCachTest`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _g_e_t_frontend_api_cach_test

7. **行 146**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

8. **行 147**: `timeEnd`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_end

---

### `app/pages/fido2-lib.vue`

**違規數量**: 86

1. **行 123**: `broswerInfo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: broswer_info

2. **行 132**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

3. **行 136**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

4. **行 137**: `charCodeAt`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: char_code_at

5. **行 140**: `GET_fido2LibGenerateOption`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _g_e_t_fido2_lib_generate_option

6. **行 152**: `publicKeySetting`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: public_key_setting

7. **行 157**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

8. **行 159**: `publicKeySetting`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: public_key_setting

9. **行 160**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

10. **行 167**: `publicKeySetting`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: public_key_setting

11. **行 172**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

12. **行 174**: `publicKeySetting`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: public_key_setting

13. **行 175**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

14. **行 182**: `toJSON`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_j_s_o_n

15. **行 184**: `authenticatorAttachment`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: authenticator_attachment

16. **行 186**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

17. **行 186**: `rawId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: raw_id

18. **行 188**: `attestationObject`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: attestation_object

19. **行 189**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

20. **行 190**: `attestationObject`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: attestation_object

21. **行 193**: `getAuthenticatorData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_authenticator_data

22. **行 194**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

23. **行 195**: `getAuthenticatorData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_authenticator_data

24. **行 198**: `clientDataJSON`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_data_j_s_o_n

25. **行 199**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

26. **行 200**: `clientDataJSON`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_data_j_s_o_n

27. **行 203**: `getPublicKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_public_key

28. **行 204**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

29. **行 205**: `getPublicKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_public_key

30. **行 208**: `getPublicKeyAlgorithm`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_public_key_algorithm

31. **行 209**: `getTransports`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_transports

32. **行 215**: `POST_fido2LibRegistration`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _p_o_s_t_fido2_lib_registration

33. **行 222**: `getTransports`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_transports

34. **行 226**: `base64URLServerSaveData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: base64_u_r_l_server_save_data

35. **行 226**: `publicKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: public_key

36. **行 229**: `base64URLServerSaveData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: base64_u_r_l_server_save_data

37. **行 229**: `credentialPublicKeyPem`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: credential_public_key_pem

38. **行 232**: `base64URLServerSaveData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: base64_u_r_l_server_save_data

39. **行 232**: `credentialPublicKeyJwk`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: credential_public_key_jwk

40. **行 240**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

41. **行 241**: `base64URLServerSaveData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: base64_u_r_l_server_save_data

42. **行 241**: `resultId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: result_id

43. **行 245**: `setItem`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_item

44. **行 246**: `setItem`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_item

45. **行 248**: `getTransports`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_transports

46. **行 250**: `setItem`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_item

47. **行 251**: `base64URLServerSaveData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: base64_u_r_l_server_save_data

48. **行 251**: `resultId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: result_id

49. **行 252**: `getTransports`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_transports

50. **行 254**: `base64URLServerSaveData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: base64_u_r_l_server_save_data

51. **行 254**: `userId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_id

52. **行 266**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

53. **行 271**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

54. **行 277**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

55. **行 280**: `GET_fido2LibGenerateOption`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _g_e_t_fido2_lib_generate_option

56. **行 283**: `getItem`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_item

57. **行 295**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

58. **行 296**: `getItem`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_item

59. **行 298**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

60. **行 301**: `getItem`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_item

61. **行 305**: `getItem`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_item

62. **行 313**: `publicKeySetting`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: public_key_setting

63. **行 314**: `toUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_uint8_array

64. **行 321**: `toJSON`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_j_s_o_n

65. **行 323**: `authenticatorAttachment`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: authenticator_attachment

66. **行 325**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

67. **行 325**: `rawId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: raw_id

68. **行 327**: `authenticatorData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: authenticator_data

69. **行 328**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

70. **行 329**: `authenticatorData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: authenticator_data

71. **行 332**: `clientDataJSON`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_data_j_s_o_n

72. **行 333**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

73. **行 334**: `clientDataJSON`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_data_j_s_o_n

74. **行 338**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

75. **行 342**: `userHandle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_handle

76. **行 343**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

77. **行 344**: `userHandle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_handle

78. **行 352**: `fromUint8Array`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_uint8_array

79. **行 353**: `charCodeAt`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: char_code_at

80. **行 358**: `POST_fido2LibVerify`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _p_o_s_t_fido2_lib_verify

81. **行 363**: `base64URLServerSaveData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: base64_u_r_l_server_save_data

82. **行 365**: `encodeURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: encode_u_r_l

83. **行 368**: `encodeURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: encode_u_r_l

84. **行 371**: `encodeURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: encode_u_r_l

85. **行 372**: `base64URLServerSaveData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: base64_u_r_l_server_save_data

86. **行 386**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

---

### `app/pages/face-swap.vue`

**違規數量**: 61

1. **行 156**: `getContext`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_context

2. **行 158**: `getContext`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_context

3. **行 159**: `clearRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: clear_rect

4. **行 166**: `drawImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_image

5. **行 168**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

6. **行 180**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

7. **行 188**: `getComputedStyle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_computed_style

8. **行 207**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

9. **行 211**: `tinyFaceDetector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tiny_face_detector

10. **行 211**: `loadFromUri`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_from_uri

11. **行 212**: `faceLandmark68Net`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: face_landmark68_net

12. **行 212**: `loadFromUri`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_from_uri

13. **行 213**: `faceRecognitionNet`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: face_recognition_net

14. **行 213**: `loadFromUri`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_from_uri

15. **行 214**: `faceExpressionNet`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: face_expression_net

16. **行 214**: `loadFromUri`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_from_uri

17. **行 215**: `ageGenderNet`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: age_gender_net

18. **行 215**: `loadFromUri`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_from_uri

19. **行 220**: `detectAllFaces`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: detect_all_faces

20. **行 220**: `TinyFaceDetectorOptions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _tiny_face_detector_options

21. **行 221**: `withFaceLandmarks`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_landmarks

22. **行 222**: `withFaceDescriptors`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_descriptors

23. **行 223**: `withFaceExpressions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_expressions

24. **行 224**: `withAgeAndGender`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_age_and_gender

25. **行 226**: `detectAllFaces`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: detect_all_faces

26. **行 227**: `previewEl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: preview_el

27. **行 228**: `TinyFaceDetectorOptions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _tiny_face_detector_options

28. **行 230**: `withFaceLandmarks`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_landmarks

29. **行 231**: `withFaceDescriptors`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_descriptors

30. **行 232**: `withFaceExpressions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_expressions

31. **行 233**: `withAgeAndGender`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_age_and_gender

32. **行 248**: `euclideanDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: euclidean_distance

33. **行 259**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

34. **行 264**: `ssdMobilenetv1`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ssd_mobilenetv1

35. **行 273**: `detectAllFaces`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: detect_all_faces

36. **行 275**: `TinyFaceDetectorOptions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _tiny_face_detector_options

37. **行 278**: `matchDimensions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: match_dimensions

38. **行 281**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

39. **行 282**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

40. **行 289**: `resizeResults`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: resize_results

41. **行 293**: `drawDetections`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_detections

42. **行 301**: `loadFaceLandmarkModel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_face_landmark_model

43. **行 309**: `matchDimensions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: match_dimensions

44. **行 313**: `detectAllFaces`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: detect_all_faces

45. **行 314**: `withFaceLandmarks`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_landmarks

46. **行 317**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

47. **行 318**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

48. **行 327**: `resizeResults`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: resize_results

49. **行 334**: `drawDetections`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_detections

50. **行 339**: `drawFaceLandmarks`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_face_landmarks

51. **行 350**: `loadFaceLandmarkModel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_face_landmark_model

52. **行 351**: `loadFaceExpressionModel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_face_expression_model

53. **行 359**: `matchDimensions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: match_dimensions

54. **行 363**: `detectAllFaces`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: detect_all_faces

55. **行 364**: `withFaceLandmarks`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_landmarks

56. **行 365**: `withFaceExpressions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_expressions

57. **行 368**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

58. **行 369**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

59. **行 378**: `resizeResults`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: resize_results

60. **行 385**: `drawDetections`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_detections

61. **行 391**: `drawFaceExpressions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_face_expressions

---

### `app/pages/face-api.vue`

**違規數量**: 61

1. **行 163**: `getContext`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_context

2. **行 165**: `getContext`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_context

3. **行 166**: `clearRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: clear_rect

4. **行 173**: `drawImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_image

5. **行 175**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

6. **行 187**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

7. **行 195**: `getComputedStyle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_computed_style

8. **行 214**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

9. **行 218**: `tinyFaceDetector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tiny_face_detector

10. **行 218**: `loadFromUri`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_from_uri

11. **行 219**: `faceLandmark68Net`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: face_landmark68_net

12. **行 219**: `loadFromUri`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_from_uri

13. **行 220**: `faceRecognitionNet`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: face_recognition_net

14. **行 220**: `loadFromUri`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_from_uri

15. **行 221**: `faceExpressionNet`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: face_expression_net

16. **行 221**: `loadFromUri`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_from_uri

17. **行 222**: `ageGenderNet`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: age_gender_net

18. **行 222**: `loadFromUri`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_from_uri

19. **行 227**: `detectAllFaces`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: detect_all_faces

20. **行 227**: `TinyFaceDetectorOptions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _tiny_face_detector_options

21. **行 228**: `withFaceLandmarks`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_landmarks

22. **行 229**: `withFaceDescriptors`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_descriptors

23. **行 230**: `withFaceExpressions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_expressions

24. **行 231**: `withAgeAndGender`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_age_and_gender

25. **行 233**: `detectAllFaces`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: detect_all_faces

26. **行 234**: `previewEl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: preview_el

27. **行 235**: `TinyFaceDetectorOptions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _tiny_face_detector_options

28. **行 237**: `withFaceLandmarks`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_landmarks

29. **行 238**: `withFaceDescriptors`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_descriptors

30. **行 239**: `withFaceExpressions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_expressions

31. **行 240**: `withAgeAndGender`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_age_and_gender

32. **行 255**: `euclideanDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: euclidean_distance

33. **行 266**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

34. **行 271**: `ssdMobilenetv1`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ssd_mobilenetv1

35. **行 280**: `detectAllFaces`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: detect_all_faces

36. **行 282**: `TinyFaceDetectorOptions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _tiny_face_detector_options

37. **行 285**: `matchDimensions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: match_dimensions

38. **行 288**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

39. **行 289**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

40. **行 296**: `resizeResults`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: resize_results

41. **行 300**: `drawDetections`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_detections

42. **行 308**: `loadFaceLandmarkModel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_face_landmark_model

43. **行 316**: `matchDimensions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: match_dimensions

44. **行 320**: `detectAllFaces`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: detect_all_faces

45. **行 321**: `withFaceLandmarks`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_landmarks

46. **行 324**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

47. **行 325**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

48. **行 334**: `resizeResults`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: resize_results

49. **行 341**: `drawDetections`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_detections

50. **行 346**: `drawFaceLandmarks`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_face_landmarks

51. **行 357**: `loadFaceLandmarkModel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_face_landmark_model

52. **行 358**: `loadFaceExpressionModel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_face_expression_model

53. **行 366**: `matchDimensions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: match_dimensions

54. **行 370**: `detectAllFaces`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: detect_all_faces

55. **行 371**: `withFaceLandmarks`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_landmarks

56. **行 372**: `withFaceExpressions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: with_face_expressions

57. **行 375**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

58. **行 376**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

59. **行 385**: `resizeResults`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: resize_results

60. **行 392**: `drawDetections`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_detections

61. **行 398**: `drawFaceExpressions`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: draw_face_expressions

---

### `app/pages/about.vue`

**違規數量**: 7

1. **行 30**: `isDel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_del

2. **行 35**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

3. **行 35**: `listItemList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: list_item_list

4. **行 39**: `listItemList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: list_item_list

5. **行 58**: `GET_aboutContent`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _g_e_t_about_content

6. **行 64**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

7. **行 68**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

---

### `app/layouts/default.vue`

**違規數量**: 1

1. **行 17**: `isIndexPage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_index_page

---

### `app/components/Youtube.vue`

**違規數量**: 28

1. **行 46**: `videoUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: video_url

2. **行 46**: `videoUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: video_url

3. **行 47**: `loadVideoByUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_video_by_url

4. **行 48**: `loadVideoByUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: load_video_by_url

5. **行 48**: `videoUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: video_url

6. **行 50**: `stopVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: stop_video

7. **行 55**: `userAgent`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_agent

8. **行 60**: `seekTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: seek_to

9. **行 68**: `videoId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: video_id

10. **行 69**: `videoUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: video_url

11. **行 74**: `playerVars`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: player_vars

12. **行 80**: `youTubeIsCreated`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: you_tube_is_created

13. **行 86**: `onYouTubeIframeAPIReady`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: on_you_tube_iframe_a_p_i_ready

14. **行 91**: `videoId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: video_id

15. **行 104**: `videoUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: video_url

16. **行 119**: `getElementById`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_element_by_id

17. **行 120**: `createElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: create_element

18. **行 121**: `setAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_attribute

19. **行 122**: `setAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_attribute

20. **行 123**: `setAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_attribute

21. **行 124**: `setAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_attribute

22. **行 125**: `appendChild`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: append_child

23. **行 127**: `videoId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: video_id

24. **行 128**: `onYouTubeIframeAPIReady`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: on_you_tube_iframe_a_p_i_ready

25. **行 131**: `videoId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: video_id

26. **行 142**: `youTubeIsCreated`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: you_tube_is_created

27. **行 144**: `querySelectorAll`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector_all

28. **行 146**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

---

### `app/components/Triangle.vue`

**違規數量**: 4

1. **行 57**: `angleLowerLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: angle_lower_left

2. **行 60**: `angleLowerRight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: angle_lower_right

3. **行 63**: `angleUpperRight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: angle_upper_right

4. **行 66**: `angleUpperLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: angle_upper_left

---

### `app/components/SwitchButton.vue`

**違規數量**: 15

1. **行 62**: `checkedColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: checked_color

2. **行 65**: `checkedBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: checked_bg_color

3. **行 65**: `bgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: bg_color

4. **行 66**: `bgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: bg_color

5. **行 77**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

6. **行 81**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

7. **行 101**: `checkedLabel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: checked_label

8. **行 102**: `checkedLabel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: checked_label

9. **行 104**: `checkedLabel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: checked_label

10. **行 112**: `checkedIcon`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: checked_icon

11. **行 113**: `checkedIcon`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: checked_icon

12. **行 115**: `checkedIcon`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: checked_icon

13. **行 117**: `checkedIcon`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: checked_icon

14. **行 118**: `checkedIcon`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: checked_icon

15. **行 127**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

---

### `app/components/SwiperJs.vue`

**違規數量**: 120

1. **行 33**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

2. **行 39**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

3. **行 55**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

4. **行 72**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

5. **行 88**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

6. **行 107**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

7. **行 124**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

8. **行 140**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

9. **行 307**: `shouldFillHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: should_fill_height

10. **行 308**: `shouldFillHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: should_fill_height

11. **行 317**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

12. **行 317**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

13. **行 318**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

14. **行 319**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

15. **行 321**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

16. **行 322**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

17. **行 324**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

18. **行 325**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

19. **行 332**: `slideCenterWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_center_width

20. **行 333**: `slideCenterWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_center_width

21. **行 335**: `slideCenterWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_center_width

22. **行 337**: `slideCenterWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_center_width

23. **行 338**: `slideCenterWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_center_width

24. **行 340**: `slideCenterWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_center_width

25. **行 344**: `slideCenterMiddleWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_center_middle_width

26. **行 345**: `slideCenterMiddleWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_center_middle_width

27. **行 347**: `slideCenterMiddleWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_center_middle_width

28. **行 349**: `slideCenterMiddleWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_center_middle_width

29. **行 350**: `slideCenterMiddleWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_center_middle_width

30. **行 353**: `slideCenterMiddleWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_center_middle_width

31. **行 364**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

32. **行 367**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

33. **行 368**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

34. **行 370**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

35. **行 374**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

36. **行 374**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

37. **行 376**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

38. **行 376**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

39. **行 390**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

40. **行 399**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

41. **行 410**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

42. **行 411**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

43. **行 412**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

44. **行 415**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

45. **行 416**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

46. **行 417**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

47. **行 423**: `centeredSlides`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: centered_slides

48. **行 424**: `slidesPerView`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slides_per_view

49. **行 425**: `spaceBetween`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: space_between

50. **行 426**: `longSwipesRatio`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: long_swipes_ratio

51. **行 446**: `hasNavigation`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_navigation

52. **行 453**: `hasPagination`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_pagination

53. **行 457**: `paginationClickable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: pagination_clickable

54. **行 458**: `dynamicBullets`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: dynamic_bullets

55. **行 461**: `hasScrollbar`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_scrollbar

56. **行 468**: `autoplayDelay`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: autoplay_delay

57. **行 468**: `autoplayDelay`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: autoplay_delay

58. **行 471**: `autoplayDelay`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: autoplay_delay

59. **行 472**: `autoplayDisableOnInteraction`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: autoplay_disable_on_interaction

60. **行 484**: `autoplayDelay`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: autoplay_delay

61. **行 485**: `autoplayDelay`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: autoplay_delay

62. **行 492**: `autoplayDelay`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: autoplay_delay

63. **行 498**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

64. **行 498**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

65. **行 499**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

66. **行 504**: `centeredSlides`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: centered_slides

67. **行 505**: `slidesPerView`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slides_per_view

68. **行 506**: `spaceBetween`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: space_between

69. **行 507**: `longSwipesRatio`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: long_swipes_ratio

70. **行 509**: `hasNavigation`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_navigation

71. **行 516**: `hasPagination`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_pagination

72. **行 520**: `paginationClickable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: pagination_clickable

73. **行 521**: `dynamicBullets`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: dynamic_bullets

74. **行 524**: `hasScrollbar`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_scrollbar

75. **行 532**: `autoplayDelay`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: autoplay_delay

76. **行 533**: `autoplayDelay`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: autoplay_delay

77. **行 537**: `autoplayDelay`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: autoplay_delay

78. **行 538**: `autoplayDisableOnInteraction`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: autoplay_disable_on_interaction

79. **行 543**: `updateSize`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: update_size

80. **行 544**: `updateSlides`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: update_slides

81. **行 549**: `slideTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_to

82. **行 549**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

83. **行 552**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

84. **行 564**: `slideTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_to

85. **行 565**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

86. **行 565**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

87. **行 566**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

88. **行 570**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

89. **行 570**: `findIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: find_index

90. **行 573**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

91. **行 576**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

92. **行 581**: `realIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: real_index

93. **行 583**: `slideToLoop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_to_loop

94. **行 585**: `slideTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_to

95. **行 591**: `slideTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_to

96. **行 592**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

97. **行 597**: `findIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: find_index

98. **行 599**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

99. **行 599**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

100. **行 600**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

101. **行 605**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

102. **行 606**: `slideTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_to

103. **行 609**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

104. **行 611**: `onTouchMove`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: on_touch_move

105. **行 624**: `activeIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: active_index

106. **行 625**: `getAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_attribute

107. **行 627**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

108. **行 628**: `activeIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: active_index

109. **行 629**: `activeIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: active_index

110. **行 632**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

111. **行 632**: `activeIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: active_index

112. **行 634**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

113. **行 634**: `activeIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: active_index

114. **行 635**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

115. **行 635**: `realIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: real_index

116. **行 637**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

117. **行 637**: `realIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: real_index

118. **行 639**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

119. **行 687**: `scrollWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_width

120. **行 688**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

---

### `app/components/SwiperCustom.vue`

**違規數量**: 104

1. **行 33**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

2. **行 38**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

3. **行 48**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

4. **行 65**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

5. **行 81**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

6. **行 100**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

7. **行 117**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

8. **行 133**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

9. **行 227**: `shouldFillHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: should_fill_height

10. **行 228**: `shouldFillHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: should_fill_height

11. **行 239**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

12. **行 240**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

13. **行 251**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

14. **行 251**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

15. **行 255**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

16. **行 256**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

17. **行 277**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

18. **行 278**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

19. **行 279**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

20. **行 280**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

21. **行 283**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

22. **行 284**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

23. **行 285**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

24. **行 286**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

25. **行 290**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

26. **行 292**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

27. **行 298**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

28. **行 300**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

29. **行 309**: `findIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: find_index

30. **行 311**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

31. **行 323**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

32. **行 324**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

33. **行 333**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

34. **行 336**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

35. **行 337**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

36. **行 350**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

37. **行 351**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

38. **行 352**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

39. **行 353**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

40. **行 353**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

41. **行 354**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

42. **行 354**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

43. **行 355**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

44. **行 355**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

45. **行 356**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

46. **行 356**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

47. **行 357**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

48. **行 357**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

49. **行 358**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

50. **行 358**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

51. **行 362**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

52. **行 363**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

53. **行 364**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

54. **行 365**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

55. **行 365**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

56. **行 366**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

57. **行 366**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

58. **行 367**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

59. **行 367**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

60. **行 368**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

61. **行 368**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

62. **行 369**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

63. **行 369**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

64. **行 370**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

65. **行 370**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

66. **行 378**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

67. **行 379**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

68. **行 380**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

69. **行 381**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

70. **行 381**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

71. **行 382**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

72. **行 382**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

73. **行 383**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

74. **行 383**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

75. **行 384**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

76. **行 384**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

77. **行 385**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

78. **行 385**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

79. **行 386**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

80. **行 386**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

81. **行 389**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

82. **行 390**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

83. **行 391**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

84. **行 392**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

85. **行 392**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

86. **行 393**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

87. **行 393**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

88. **行 394**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

89. **行 394**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

90. **行 395**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

91. **行 395**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

92. **行 396**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

93. **行 396**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

94. **行 397**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

95. **行 397**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

96. **行 433**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

97. **行 443**: `findIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: find_index

98. **行 448**: `findLastIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: find_last_index

99. **行 454**: `slideList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slide_list

100. **行 455**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

101. **行 466**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

102. **行 468**: `longSwipesRatio`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: long_swipes_ratio

103. **行 468**: `longSwipesRatio`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: long_swipes_ratio

104. **行 489**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

---

### `app/components/SlideInPanel.vue`

**違規數量**: 108

1. **行 14**: `messageStyleList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: message_style_list

2. **行 96**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

3. **行 97**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

4. **行 97**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

5. **行 99**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

6. **行 103**: `itemHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: item_height

7. **行 104**: `itemHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: item_height

8. **行 106**: `itemHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: item_height

9. **行 107**: `itemHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: item_height

10. **行 107**: `itemHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: item_height

11. **行 108**: `itemHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: item_height

12. **行 112**: `itemSpacing`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: item_spacing

13. **行 113**: `itemSpacing`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: item_spacing

14. **行 116**: `itemSpacing`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: item_spacing

15. **行 118**: `itemSpacing`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: item_spacing

16. **行 119**: `itemSpacing`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: item_spacing

17. **行 121**: `itemSpacing`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: item_spacing

18. **行 125**: `containerPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: container_position

19. **行 126**: `containerPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: container_position

20. **行 129**: `containerPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: container_position

21. **行 133**: `containerPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: container_position

22. **行 147**: `leftEnter`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: left_enter

23. **行 161**: `userRemoveType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_remove_type

24. **行 169**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

25. **行 186**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

26. **行 190**: `maxRow`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_row

27. **行 191**: `maxRow`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_row

28. **行 192**: `maxRow`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_row

29. **行 193**: `maxRow`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_row

30. **行 198**: `handleMessageEnd`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: handle_message_end

31. **行 199**: `newMessageStyle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: new_message_style

32. **行 202**: `handleMessageEnd`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: handle_message_end

33. **行 203**: `newMessageStyle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: new_message_style

34. **行 218**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

35. **行 221**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

36. **行 236**: `findIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: find_index

37. **行 241**: `findIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: find_index

38. **行 243**: `getAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_attribute

39. **行 259**: `getAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_attribute

40. **行 261**: `setAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_attribute

41. **行 262**: `setAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_attribute

42. **行 267**: `clientHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_height

43. **行 273**: `setAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_attribute

44. **行 282**: `getAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_attribute

45. **行 306**: `cancelAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: cancel_animation_frame

46. **行 315**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

47. **行 318**: `getAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_attribute

48. **行 325**: `setAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_attribute

49. **行 331**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

50. **行 339**: `getAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_attribute

51. **行 355**: `setAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_attribute

52. **行 362**: `leftEnter`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: left_enter

53. **行 366**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

54. **行 368**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

55. **行 382**: `userRemoveType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_remove_type

56. **行 383**: `stopPropagation`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: stop_propagation

57. **行 386**: `getAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_attribute

58. **行 392**: `userRemoveType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_remove_type

59. **行 393**: `stopPropagation`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: stop_propagation

60. **行 396**: `getAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_attribute

61. **行 404**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

62. **行 405**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

63. **行 406**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

64. **行 407**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

65. **行 407**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

66. **行 408**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

67. **行 408**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

68. **行 409**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

69. **行 409**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

70. **行 410**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

71. **行 410**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

72. **行 411**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

73. **行 411**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

74. **行 412**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

75. **行 412**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

76. **行 418**: `userRemoveType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_remove_type

77. **行 424**: `stopPropagation`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: stop_propagation

78. **行 428**: `getAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_attribute

79. **行 434**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

80. **行 435**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

81. **行 436**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

82. **行 437**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

83. **行 437**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

84. **行 438**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

85. **行 438**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

86. **行 439**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

87. **行 439**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

88. **行 440**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

89. **行 440**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

90. **行 441**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

91. **行 441**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

92. **行 442**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

93. **行 442**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

94. **行 447**: `stopDeltaX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: stop_delta_x

95. **行 455**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

96. **行 457**: `leftEnter`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: left_enter

97. **行 471**: `removeDeltaX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_delta_x

98. **行 471**: `removeDeltaX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_delta_x

99. **行 472**: `removeDeltaX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_delta_x

100. **行 473**: `removeDeltaX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_delta_x

101. **行 474**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

102. **行 475**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

103. **行 476**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

104. **行 485**: `userRemoveType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_remove_type

105. **行 490**: `getAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_attribute

106. **行 498**: `removeDeltaX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_delta_x

107. **行 508**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

108. **行 524**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

---

### `app/components/Selector.vue`

**違規數量**: 59

1. **行 116**: `optionListTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_top

2. **行 118**: `optionListTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_top

3. **行 120**: `optionListTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_top

4. **行 121**: `optionListTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_top

5. **行 124**: `optionListTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_top

6. **行 143**: `hasShadow`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_shadow

7. **行 151**: `hasShadow`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_shadow

8. **行 154**: `hasTransition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_transition

9. **行 162**: `optionListLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_left

10. **行 163**: `optionListLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_left

11. **行 164**: `optionListLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_left

12. **行 165**: `optionListLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_left

13. **行 168**: `optionListRight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_right

14. **行 169**: `optionListRight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_right

15. **行 170**: `optionListRight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_right

16. **行 171**: `optionListRight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_right

17. **行 174**: `optionListWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_width

18. **行 175**: `optionListWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_width

19. **行 176**: `optionListWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_width

20. **行 177**: `optionListWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list_width

21. **行 183**: `optionList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list

22. **行 185**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

23. **行 186**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

24. **行 186**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

25. **行 187**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

26. **行 188**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

27. **行 192**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

28. **行 193**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

29. **行 194**: `displayKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: display_key

30. **行 197**: `displayKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: display_key

31. **行 198**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

32. **行 198**: `displayKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: display_key

33. **行 199**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

34. **行 200**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

35. **行 205**: `optionList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list

36. **行 224**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

37. **行 225**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

38. **行 227**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

39. **行 228**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

40. **行 235**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

41. **行 236**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

42. **行 238**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

43. **行 239**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

44. **行 249**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

45. **行 251**: `offsetHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_height

46. **行 252**: `offsetHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_height

47. **行 256**: `offsetHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_height

48. **行 261**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

49. **行 262**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

50. **行 262**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

51. **行 262**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

52. **行 273**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

53. **行 274**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

54. **行 276**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

55. **行 278**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

56. **行 279**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

57. **行 280**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

58. **行 285**: `optionList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list

59. **行 288**: `optionList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: option_list

---

### `app/components/ScrollFetch.vue`

**違規數量**: 159

1. **行 203**: `iosStyle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_style

2. **行 210**: `iosTypeIconSize`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_type_icon_size

3. **行 211**: `iosTypeIconSize`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_type_icon_size

4. **行 212**: `iosTypeIconSize`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_type_icon_size

5. **行 214**: `iosTypeIconSize`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_type_icon_size

6. **行 217**: `iosTypeIconStrokeWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_type_icon_stroke_width

7. **行 219**: `iosTypeIconStrokeWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_type_icon_stroke_width

8. **行 220**: `iosTypeIconStrokeWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_type_icon_stroke_width

9. **行 222**: `iosTypeIconStrokeWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_type_icon_stroke_width

10. **行 242**: `containerHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: container_height

11. **行 243**: `containerHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: container_height

12. **行 245**: `containerHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: container_height

13. **行 246**: `containerHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: container_height

14. **行 247**: `containerHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: container_height

15. **行 250**: `userSelectNone`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_select_none

16. **行 256**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

17. **行 257**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

18. **行 257**: `classList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: class_list

19. **行 263**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

20. **行 264**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

21. **行 264**: `classList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: class_list

22. **行 275**: `refreshIcon`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: refresh_icon

23. **行 275**: `refreshIcon`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: refresh_icon

24. **行 280**: `refreshingIcon`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: refreshing_icon

25. **行 281**: `refreshIcon`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: refresh_icon

26. **行 281**: `refreshIcon`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: refresh_icon

27. **行 313**: `infinityBuffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_buffer

28. **行 315**: `useObserver`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: use_observer

29. **行 325**: `infinityDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_disable

30. **行 326**: `infinityEnd`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_end

31. **行 337**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

32. **行 351**: `useObserver`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: use_observer

33. **行 352**: `infinityDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_disable

34. **行 353**: `infinityEnd`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_end

35. **行 357**: `infinityBuffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_buffer

36. **行 363**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

37. **行 370**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

38. **行 375**: `isMobile`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_mobile

39. **行 379**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

40. **行 381**: `setProperty`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_property

41. **行 384**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

42. **行 384**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

43. **行 389**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

44. **行 393**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

45. **行 395**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

46. **行 397**: `setProperty`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_property

47. **行 398**: `removeProperty`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_property

48. **行 402**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

49. **行 402**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

50. **行 405**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

51. **行 405**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

52. **行 415**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

53. **行 421**: `isMobile`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_mobile

54. **行 421**: `isMobile`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_mobile

55. **行 422**: `isMobile`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_mobile

56. **行 423**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

57. **行 425**: `setProperty`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_property

58. **行 429**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

59. **行 429**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

60. **行 432**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

61. **行 432**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

62. **行 437**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

63. **行 442**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

64. **行 445**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

65. **行 446**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

66. **行 450**: `useObserver`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: use_observer

67. **行 451**: `useObserver`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: use_observer

68. **行 452**: `infinityDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_disable

69. **行 452**: `infinityEnd`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_end

70. **行 453**: `infinityBuffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_buffer

71. **行 457**: `isMobile`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_mobile

72. **行 458**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

73. **行 460**: `setProperty`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_property

74. **行 461**: `removeProperty`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_property

75. **行 465**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

76. **行 465**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

77. **行 468**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

78. **行 468**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

79. **行 480**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

80. **行 481**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

81. **行 482**: `isMobile`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_mobile

82. **行 483**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

83. **行 512**: `infinityTimeout`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_timeout

84. **行 512**: `infinityTimeout`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_timeout

85. **行 513**: `infinityTimeout`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_timeout

86. **行 529**: `useObserver`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: use_observer

87. **行 530**: `infinityBuffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_buffer

88. **行 551**: `infinityTimeout`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_timeout

89. **行 552**: `infinityTimeout`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_timeout

90. **行 560**: `infinityTimeout`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_timeout

91. **行 563**: `infinityFetch`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_fetch

92. **行 564**: `infinityFetch`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_fetch

93. **行 592**: `refreshDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: refresh_disable

94. **行 599**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

95. **行 600**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

96. **行 601**: `screenY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: screen_y

97. **行 602**: `pageYOffset`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y_offset

98. **行 603**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

99. **行 612**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

100. **行 612**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

101. **行 613**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

102. **行 613**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

103. **行 614**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

104. **行 614**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

105. **行 615**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

106. **行 615**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

107. **行 616**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

108. **行 616**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

109. **行 617**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

110. **行 617**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

111. **行 618**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

112. **行 619**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

113. **行 620**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

114. **行 638**: `refreshDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: refresh_disable

115. **行 648**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

116. **行 649**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

117. **行 650**: `screenY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: screen_y

118. **行 651**: `pageYOffset`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y_offset

119. **行 652**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

120. **行 657**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

121. **行 657**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

122. **行 658**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

123. **行 658**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

124. **行 659**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

125. **行 659**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

126. **行 660**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

127. **行 660**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

128. **行 661**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

129. **行 661**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

130. **行 662**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

131. **行 662**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

132. **行 663**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

133. **行 664**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

134. **行 665**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

135. **行 670**: `iosStyle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_style

136. **行 691**: `iosStyle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_style

137. **行 712**: `refreshDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: refresh_disable

138. **行 718**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

139. **行 730**: `iosStyle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_style

140. **行 747**: `iosStyle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_style

141. **行 763**: `infinityDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_disable

142. **行 764**: `infinityEnd`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_end

143. **行 771**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

144. **行 784**: `infinityBuffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_buffer

145. **行 787**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

146. **行 794**: `infinityBuffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_buffer

147. **行 798**: `useObserver`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: use_observer

148. **行 802**: `infinityBuffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_buffer

149. **行 810**: `isIntersecting`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_intersecting

150. **行 811**: `isIntersecting`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_intersecting

151. **行 835**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

152. **行 836**: `scrollHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_height

153. **行 839**: `infinityBuffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_buffer

154. **行 860**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

155. **行 860**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

156. **行 869**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

157. **行 869**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

158. **行 883**: `getBoundingClientRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_bounding_client_rect

159. **行 892**: `getBoundingClientRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_bounding_client_rect

---

### `app/components/QRcode.vue`

**違規數量**: 3

1. **行 25**: `toDataURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_data_u_r_l

2. **行 39**: `qrCodeValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: qr_code_value

3. **行 54**: `qrCodeValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: qr_code_value

---

### `app/components/PhoneInput.vue`

**違規數量**: 63

1. **行 3**: `phone-input__container`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: phone-input-container

2. **行 12**: `phone-input__country-selector`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: phone-input-country-selector

3. **行 16**: `phone-input__country-selector__flag`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: phone-input-country-selector-flag

4. **行 20**: `countryCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_code

5. **行 20**: `toLowerCase`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_lower_case

6. **行 26**: `phone-input__country-selector__code`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: phone-input-country-selector-code

7. **行 27**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

8. **行 27**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

9. **行 31**: `phone-input__country-selector__option`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: phone-input-country-selector-option

10. **行 35**: `countryCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_code

11. **行 35**: `toLowerCase`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_lower_case

12. **行 39**: `phone-input__country-selector__option__name`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: phone-input-country-selector-option-name

13. **行 40**: `countryName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_name

14. **行 44**: `phone-input__country-selector__option__code`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: phone-input-country-selector-option-code

15. **行 46**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

16. **行 51**: `phone-input__divider`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: phone-input-divider

17. **行 52**: `phone-input__number`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: phone-input-number

18. **行 57**: `phone-input__number__field`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: phone-input-number-field

19. **行 65**: `phone-input__error`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: phone-input-error

20. **行 122**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

21. **行 123**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

22. **行 125**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

23. **行 126**: `countryCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_code

24. **行 127**: `countryName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_name

25. **行 128**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

26. **行 129**: `countryName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_name

27. **行 133**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

28. **行 134**: `countryNames`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_names

29. **行 134**: `countryName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_name

30. **行 136**: `countryName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_name

31. **行 136**: `countryNames`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_names

32. **行 174**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

33. **行 181**: `defaultCountryCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: default_country_code

34. **行 191**: `countryCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_code

35. **行 191**: `defaultCountryCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: default_country_code

36. **行 197**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

37. **行 202**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

38. **行 204**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

39. **行 204**: `countryCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_code

40. **行 206**: `countryCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_code

41. **行 206**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

42. **行 206**: `countryCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_code

43. **行 212**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

44. **行 212**: `phoneNumber`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_number

45. **行 215**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

46. **行 216**: `startsWith`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: starts_with

47. **行 223**: `countryList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_list

48. **行 224**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

49. **行 224**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

50. **行 228**: `startsWith`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: starts_with

51. **行 228**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

52. **行 230**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

53. **行 250**: `countryCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_code

54. **行 263**: `validateOnInput`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: validate_on_input

55. **行 301**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

56. **行 304**: `isValid`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_valid

57. **行 310**: `errorMessage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: error_message

58. **行 312**: `errorMessage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: error_message

59. **行 318**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

60. **行 320**: `returnObject`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: return_object

61. **行 322**: `countryCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_code

62. **行 323**: `countryName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: country_name

63. **行 324**: `phoneCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: phone_code

---

### `app/components/PWALoading.vue`

**違規數量**: 1

1. **行 4**: `pwaLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: pwa_loading

---

### `app/components/NotificationPermission.vue`

**違規數量**: 6

1. **行 53**: `agreeNotification`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: agree_notification

2. **行 56**: `firebaseCroeInited`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: firebase_croe_inited

3. **行 70**: `requestNotificationPermission`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_notification_permission

4. **行 76**: `messagingInit`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: messaging_init

5. **行 80**: `setFirebaseMessagingInited`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_firebase_messaging_inited

6. **行 85**: `setAgreeNotification`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_agree_notification

---

### `app/components/Message.vue`

**違規數量**: 21

1. **行 5**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

2. **行 19**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

3. **行 29**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

4. **行 53**: `messageState`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: message_state

5. **行 54**: `messageState`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: message_state

6. **行 68**: `messageList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: message_list

7. **行 85**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

8. **行 86**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

9. **行 87**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

10. **行 92**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

11. **行 93**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

12. **行 94**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

13. **行 96**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

14. **行 98**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

15. **行 99**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

16. **行 120**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

17. **行 126**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

18. **行 132**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

19. **行 133**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

20. **行 134**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

21. **行 139**: `timeId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: time_id

---

### `app/components/ImageUpload.vue`

**違規數量**: 21

1. **行 79**: `previewBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: preview_bg_color

2. **行 115**: `createElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: create_element

3. **行 117**: `setAttribute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_attribute

4. **行 118**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

5. **行 125**: `webkitURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: webkit_u_r_l

6. **行 127**: `createObjectURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: create_object_u_r_l

7. **行 128**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

8. **行 133**: `fileCheck`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: file_check

9. **行 134**: `fileCheck`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: file_check

10. **行 149**: `revokeObjectURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: revoke_object_u_r_l

11. **行 156**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

12. **行 159**: `readAsDataURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: read_as_data_u_r_l

13. **行 176**: `dataTransfer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: data_transfer

14. **行 179**: `webkitURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: webkit_u_r_l

15. **行 181**: `createObjectURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: create_object_u_r_l

16. **行 182**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

17. **行 186**: `fileCheck`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: file_check

18. **行 187**: `fileCheck`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: file_check

19. **行 194**: `revokeObjectURL`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: revoke_object_u_r_l

20. **行 215**: `maxSize`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_size

21. **行 217**: `fileCheck`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: file_check

---

### `app/components/GoTop.vue`

**違規數量**: 43

1. **行 53**: `heddinBottom`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: heddin_bottom

2. **行 53**: `heddinBottom`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: heddin_bottom

3. **行 54**: `heddinBottom`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: heddin_bottom

4. **行 55**: `heddinBottom`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: heddin_bottom

5. **行 56**: `heddinBottom`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: heddin_bottom

6. **行 59**: `showBottom`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: show_bottom

7. **行 59**: `showBottom`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: show_bottom

8. **行 60**: `showBottom`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: show_bottom

9. **行 61**: `showBottom`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: show_bottom

10. **行 62**: `showBottom`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: show_bottom

11. **行 71**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

12. **行 71**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

13. **行 72**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

14. **行 72**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

15. **行 73**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

16. **行 73**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

17. **行 75**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

18. **行 75**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

19. **行 79**: `parentElementTrigger`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element_trigger

20. **行 84**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

21. **行 85**: `documentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: document_element

22. **行 85**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

23. **行 87**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

24. **行 88**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

25. **行 90**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

26. **行 91**: `documentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: document_element

27. **行 91**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

28. **行 97**: `parentElementTrigger`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element_trigger

29. **行 98**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

30. **行 99**: `documentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: document_element

31. **行 99**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

32. **行 100**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

33. **行 100**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

34. **行 110**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

35. **行 111**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

36. **行 111**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

37. **行 112**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

38. **行 112**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

39. **行 117**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

40. **行 118**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

41. **行 118**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

42. **行 119**: `parentElement`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parent_element

43. **行 119**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

---

### `app/components/Drawer.vue`

**違規數量**: 122

1. **行 142**: `toLocaleLowerCase`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_locale_lower_case

2. **行 167**: `hasAnimation`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_animation

3. **行 172**: `rootPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: root_position

4. **行 172**: `rootPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: root_position

5. **行 173**: `rootPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: root_position

6. **行 176**: `wrappingPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: wrapping_position

7. **行 177**: `wrappingPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: wrapping_position

8. **行 179**: `wrappingPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: wrapping_position

9. **行 183**: `hasMask`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_mask

10. **行 184**: `maskPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: mask_position

11. **行 185**: `maskPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: mask_position

12. **行 187**: `maskPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: mask_position

13. **行 195**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

14. **行 196**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

15. **行 196**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

16. **行 198**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

17. **行 238**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

18. **行 239**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

19. **行 239**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

20. **行 241**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

21. **行 248**: `minWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_width

22. **行 249**: `minWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_width

23. **行 250**: `minWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_width

24. **行 250**: `minWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_width

25. **行 251**: `minWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_width

26. **行 253**: `maxWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_width

27. **行 254**: `minWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_width

28. **行 255**: `maxWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_width

29. **行 255**: `maxWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_width

30. **行 256**: `maxWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_width

31. **行 258**: `maxHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_height

32. **行 259**: `maxHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_height

33. **行 260**: `maxHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_height

34. **行 260**: `maxHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_height

35. **行 261**: `maxHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_height

36. **行 334**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

37. **行 337**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

38. **行 340**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

39. **行 340**: `classList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: class_list

40. **行 342**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

41. **行 342**: `classList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: class_list

42. **行 372**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

43. **行 373**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

44. **行 376**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

45. **行 383**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

46. **行 387**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

47. **行 398**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

48. **行 399**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

49. **行 399**: `classList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: class_list

50. **行 410**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

51. **行 411**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

52. **行 411**: `classList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: class_list

53. **行 418**: `keyCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: key_code

54. **行 424**: `dragCloseDisabled`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: drag_close_disabled

55. **行 429**: `dragCloseDisabled`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: drag_close_disabled

56. **行 437**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

57. **行 437**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

58. **行 438**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

59. **行 438**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

60. **行 439**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

61. **行 439**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

62. **行 440**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

63. **行 440**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

64. **行 441**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

65. **行 441**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

66. **行 442**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

67. **行 442**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

68. **行 443**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

69. **行 444**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

70. **行 445**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

71. **行 448**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

72. **行 448**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

73. **行 449**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

74. **行 449**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

75. **行 450**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

76. **行 450**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

77. **行 451**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

78. **行 451**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

79. **行 452**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

80. **行 452**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

81. **行 453**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

82. **行 453**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

83. **行 454**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

84. **行 455**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

85. **行 456**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

86. **行 461**: `dragCloseDisabled`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: drag_close_disabled

87. **行 470**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

88. **行 470**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

89. **行 471**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

90. **行 471**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

91. **行 472**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

92. **行 472**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

93. **行 473**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

94. **行 473**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

95. **行 474**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

96. **行 474**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

97. **行 475**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

98. **行 475**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

99. **行 476**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

100. **行 477**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

101. **行 478**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

102. **行 484**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

103. **行 484**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

104. **行 485**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

105. **行 485**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

106. **行 486**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

107. **行 486**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

108. **行 487**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

109. **行 487**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

110. **行 488**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

111. **行 488**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

112. **行 489**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

113. **行 489**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

114. **行 490**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

115. **行 491**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

116. **行 492**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

117. **行 496**: `getBoundingClientRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_bounding_client_rect

118. **行 497**: `getBoundingClientRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_bounding_client_rect

119. **行 529**: `offsetHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_height

120. **行 530**: `triggerPercentage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: trigger_percentage

121. **行 533**: `offsetWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_width

122. **行 534**: `triggerPercentage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: trigger_percentage

---

### `app/components/Dialog.vue`

**違規數量**: 32

1. **行 131**: `minWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_width

2. **行 132**: `minWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_width

3. **行 133**: `minWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_width

4. **行 133**: `minWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_width

5. **行 134**: `minWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_width

6. **行 137**: `minHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_height

7. **行 138**: `minHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_height

8. **行 139**: `minHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_height

9. **行 139**: `minHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_height

10. **行 140**: `minHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: min_height

11. **行 144**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

12. **行 145**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

13. **行 145**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

14. **行 147**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

15. **行 154**: `rootPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: root_position

16. **行 154**: `rootPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: root_position

17. **行 155**: `rootPosition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: root_position

18. **行 164**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

19. **行 167**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

20. **行 169**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

21. **行 169**: `classList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: class_list

22. **行 171**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

23. **行 171**: `classList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: class_list

24. **行 187**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

25. **行 190**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

26. **行 203**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

27. **行 204**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

28. **行 204**: `classList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: class_list

29. **行 210**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

30. **行 213**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

31. **行 214**: `querySelector`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector

32. **行 214**: `classList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: class_list

---

### `app/components/DatePicker.vue`

**違規數量**: 1

1. **行 25**: `toLowerCase`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_lower_case

---

### `app/components/Countdown.vue`

**違規數量**: 27

1. **行 509**: `bgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: bg_color

2. **行 509**: `bgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: bg_color

3. **行 510**: `bgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: bg_color

4. **行 521**: `countdownType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: countdown_type

5. **行 522**: `countdownType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: countdown_type

6. **行 523**: `countdownType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: countdown_type

7. **行 527**: `countdownType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: countdown_type

8. **行 531**: `initialSeconds`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: initial_seconds

9. **行 531**: `initialSeconds`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: initial_seconds

10. **行 533**: `endSecond`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: end_second

11. **行 533**: `endSecond`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: end_second

12. **行 555**: `isCountdownStart`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_countdown_start

13. **行 556**: `initialSeconds`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: initial_seconds

14. **行 557**: `endSecond`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: end_second

15. **行 558**: `countdownType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: countdown_type

16. **行 574**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

17. **行 584**: `isCountdownStart`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_countdown_start

18. **行 585**: `initialSeconds`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: initial_seconds

19. **行 586**: `initialSeconds`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: initial_seconds

20. **行 586**: `endSecond`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: end_second

21. **行 588**: `initialSeconds`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: initial_seconds

22. **行 590**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

23. **行 602**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

24. **行 613**: `initialSeconds`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: initial_seconds

25. **行 613**: `endSecond`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: end_second

26. **行 621**: `initialSeconds`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: initial_seconds

27. **行 621**: `endSecond`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: end_second

---

### `app/components/Banner.vue`

**違規數量**: 35

1. **行 51**: `getSlideClass(index)`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_slide_class(index)

2. **行 94**: `currentIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: current_index

3. **行 148**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

4. **行 168**: `transitionDuration`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: transition_duration

5. **行 215**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

6. **行 220**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

7. **行 225**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

8. **行 230**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

9. **行 237**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

10. **行 242**: `zIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: z_index

11. **行 265**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

12. **行 318**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

13. **行 318**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

14. **行 319**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

15. **行 319**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

16. **行 331**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

17. **行 331**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

18. **行 332**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

19. **行 332**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

20. **行 346**: `preventDefault`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: prevent_default

21. **行 353**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

22. **行 414**: `preventDefault`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: prevent_default

23. **行 419**: `preventDefault`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: prevent_default

24. **行 424**: `preventDefault`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: prevent_default

25. **行 429**: `preventDefault`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: prevent_default

26. **行 434**: `preventDefault`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: prevent_default

27. **行 458**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

28. **行 459**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

29. **行 460**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

30. **行 461**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

31. **行 469**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

32. **行 470**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

33. **行 471**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

34. **行 472**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

35. **行 479**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

---

### `app/pages/socket-test/index.vue`

**違規數量**: 1

1. **行 17**: `supportWebsocket`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: support_websocket

---

### `app/pages/route/query-back-test.vue`

**違規數量**: 3

1. **行 31**: `testData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: test_data

2. **行 32**: `testData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: test_data

3. **行 34**: `testData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: test_data

---

### `app/pages/components/tab-test.vue`

**違規數量**: 4

1. **行 119**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

2. **行 124**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

3. **行 129**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

4. **行 135**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

---

### `app/pages/components/slide-in-panel.vue`

**違規數量**: 2

1. **行 108**: `___testSildrInPanel__`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: -_testSildrInPanel-

2. **行 108**: `___testSildrInPanel__`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ___test_sildr_in_panel__

---

### `app/pages/components/scroll-fetch.vue`

**違規數量**: 7

1. **行 12**: `isMobile`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_mobile

2. **行 202**: `_cloneDeep`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _clone_deep

3. **行 223**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

4. **行 255**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

5. **行 262**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

6. **行 270**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

7. **行 276**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

---

### `app/pages/components/dialog.vue`

**違規數量**: 1

1. **行 29**: `setDialog`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_dialog

---

### `app/pages/components/components-test.vue`

**違規數量**: 4

1. **行 80**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

2. **行 85**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

3. **行 90**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

4. **行 96**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

---

### `app/pages/components/banner-demo.vue`

**違規數量**: 1

1. **行 49**: `isActive`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_active

---

### `app/pages/firebase/cloud-messaging.vue`

**違規數量**: 22

1. **行 117**: `createdAt`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: created_at

2. **行 147**: `createdAt`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: created_at

3. **行 180**: `createdAt`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: created_at

4. **行 253**: `GET_getMessageTokens`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _g_e_t_get_message_tokens

5. **行 257**: `firebaseMessagingInited`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: firebase_messaging_inited

6. **行 273**: `webTokenList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: web_token_list

7. **行 274**: `androidTokenList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: android_token_list

8. **行 275**: `iosTokenList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ios_token_list

9. **行 278**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

10. **行 279**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

11. **行 281**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

12. **行 284**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

13. **行 286**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

14. **行 288**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

15. **行 312**: `POST_pushNotification`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _p_o_s_t_push_notification

16. **行 322**: `DELETE_cancelMessageToken`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _d_e_l_e_t_e_cancel_message_token

17. **行 328**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

18. **行 330**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

19. **行 355**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

20. **行 371**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

21. **行 382**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

22. **行 392**: `setLoading`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_loading

---

### `app/pages/css-drawing/triangle-anime-test.vue`

**違規數量**: 1

1. **行 3**: `isMobile`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_mobile

---

### `app/components/WangEditor/index.vue`

**違規數量**: 141

1. **行 6**: `toolbarClassName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: toolbar_class_name

2. **行 14**: `editorClassName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_class_name

3. **行 159**: `menuConf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: menu_conf

4. **行 161**: `uploadImgUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_img_url

5. **行 162**: `uploadImg`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_img

6. **行 164**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

7. **行 165**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

8. **行 168**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

9. **行 168**: `customUpload`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: custom_upload

10. **行 169**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

11. **行 171**: `menuConf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: menu_conf

12. **行 171**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

13. **行 176**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

14. **行 177**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

15. **行 179**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

16. **行 180**: `menuConf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: menu_conf

17. **行 180**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

18. **行 186**: `insertImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: insert_image

19. **行 187**: `insertImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: insert_image

20. **行 191**: `insertImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: insert_image

21. **行 192**: `menuConf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: menu_conf

22. **行 192**: `insertImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: insert_image

23. **行 197**: `editImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: edit_image

24. **行 198**: `editImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: edit_image

25. **行 202**: `editImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: edit_image

26. **行 203**: `menuConf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: menu_conf

27. **行 203**: `editImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: edit_image

28. **行 208**: `uploadVideoUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video_url

29. **行 209**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

30. **行 211**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

31. **行 212**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

32. **行 215**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

33. **行 215**: `customUpload`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: custom_upload

34. **行 216**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

35. **行 218**: `menuConf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: menu_conf

36. **行 218**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

37. **行 223**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

38. **行 224**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

39. **行 226**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

40. **行 227**: `menuConf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: menu_conf

41. **行 227**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

42. **行 233**: `insertVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: insert_video

43. **行 234**: `insertVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: insert_video

44. **行 238**: `insertVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: insert_video

45. **行 239**: `menuConf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: menu_conf

46. **行 239**: `insertVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: insert_video

47. **行 244**: `insertVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: insert_video

48. **行 245**: `insertVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: insert_video

49. **行 249**: `insertVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: insert_video

50. **行 250**: `menuConf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: menu_conf

51. **行 250**: `insertVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: insert_video

52. **行 256**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

53. **行 257**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

54. **行 258**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

55. **行 264**: `uploadVideoUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video_url

56. **行 265**: `uploadVideoUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video_url

57. **行 266**: `uploadVideoUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video_url

58. **行 275**: `readOnly`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: read_only

59. **行 276**: `autoFocus`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: auto_focus

60. **行 282**: `toolbarConfig`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: toolbar_config

61. **行 283**: `excludeKeys`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: exclude_keys

62. **行 285**: `excludeKeys`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: exclude_keys

63. **行 286**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

64. **行 287**: `excludeKeys`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: exclude_keys

65. **行 287**: `_excludeKeys`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _exclude_keys

66. **行 290**: `menuConf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: menu_conf

67. **行 291**: `uploadImgUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_img_url

68. **行 292**: `uploadImg`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_img

69. **行 293**: `uploadVideoUrl`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video_url

70. **行 294**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

71. **行 296**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

72. **行 299**: `uploadImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_image

73. **行 299**: `customUpload`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: custom_upload

74. **行 301**: `excludeKeys`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: exclude_keys

75. **行 305**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

76. **行 308**: `uploadVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: upload_video

77. **行 308**: `customUpload`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: custom_upload

78. **行 310**: `excludeKeys`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: exclude_keys

79. **行 313**: `excludeKeys`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: exclude_keys

80. **行 313**: `excludeKeys`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: exclude_keys

81. **行 317**: `editorHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_height

82. **行 320**: `editorFocusBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_focus_bg_color

83. **行 321**: `editorFocusBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_focus_bg_color

84. **行 325**: `editorFocusBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_focus_bg_color

85. **行 332**: `editorBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_bg_color

86. **行 333**: `editorBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_bg_color

87. **行 335**: `editorBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_bg_color

88. **行 339**: `editorFocusBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_focus_bg_color

89. **行 340**: `editorFocusBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_focus_bg_color

90. **行 344**: `editorFocusBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_focus_bg_color

91. **行 351**: `editorHoverBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_hover_bg_color

92. **行 352**: `editorHoverBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_hover_bg_color

93. **行 354**: `editorHoverBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_hover_bg_color

94. **行 358**: `editorHoverBorderColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_hover_border_color

95. **行 359**: `editorHoverBorderColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_hover_border_color

96. **行 362**: `editorHoverBorderColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_hover_border_color

97. **行 370**: `toolbarBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: toolbar_bg_color

98. **行 370**: `toolbarBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: toolbar_bg_color

99. **行 371**: `toolbarBgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: toolbar_bg_color

100. **行 389**: `editorClassName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: editor_class_name

101. **行 392**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

102. **行 393**: `_editorClassName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _editor_class_name

103. **行 400**: `toolbarClassName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: toolbar_class_name

104. **行 403**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

105. **行 404**: `_toolbarClassName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _toolbar_class_name

106. **行 411**: `maxTextLenght`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: max_text_lenght

107. **行 431**: `setMessageState`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_message_state

108. **行 437**: `setMessageState`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_message_state

109. **行 443**: `setMessageState`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_message_state

110. **行 449**: `setMessageState`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_message_state

111. **行 455**: `setMessageState`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_message_state

112. **行 464**: `checkImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: check_image

113. **行 465**: `checkImage`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: check_image

114. **行 469**: `indexOf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: index_of

115. **行 469**: `indexOf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: index_of

116. **行 477**: `parseVideoSrc`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parse_video_src

117. **行 478**: `parseVideoSrc`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: parse_video_src

118. **行 482**: `indexOf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: index_of

119. **行 487**: `indexOf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: index_of

120. **行 489**: `indexOf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: index_of

121. **行 490**: `indexOf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: index_of

122. **行 490**: `indexOf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: index_of

123. **行 499**: `checkVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: check_video

124. **行 500**: `checkVideo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: check_video

125. **行 504**: `indexOf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: index_of

126. **行 508**: `indexOf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: index_of

127. **行 508**: `indexOf`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: index_of

128. **行 518**: `setHtml`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_html

129. **行 519**: `getHtml`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_html

130. **行 523**: `getText`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_text

131. **行 526**: `getText`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_text

132. **行 527**: `getHtml`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_html

133. **行 531**: `getText`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_text

134. **行 532**: `getHtml`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_html

135. **行 536**: `getText`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_text

136. **行 545**: `getText`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_text

137. **行 546**: `getHtml`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_html

138. **行 553**: `getText`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_text

139. **行 554**: `getHtml`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_html

140. **行 576**: `is-loading`
   - **問題**: HTML attribute missing css- prefix
   - **建議**: Add css- prefix: css-is-loading

141. **行 615**: `is-disabled`
   - **問題**: HTML attribute missing css- prefix
   - **建議**: Add css- prefix: css-is-disabled

---

### `app/components/Tabs/Content.vue`

**違規數量**: 28

1. **行 133**: `slotNameIsDefault`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name_is_default

2. **行 135**: `tabList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_list

3. **行 143**: `slotNameIsDefault`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name_is_default

4. **行 155**: `tabsContentHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tabs_content_height

5. **行 156**: `tabsContentHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tabs_content_height

6. **行 158**: `tabsContentHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tabs_content_height

7. **行 160**: `tabsContentHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tabs_content_height

8. **行 161**: `tabsContentHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tabs_content_height

9. **行 163**: `tabsContentHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tabs_content_height

10. **行 166**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

11. **行 166**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

12. **行 167**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

13. **行 169**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

14. **行 170**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

15. **行 172**: `swiperHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: swiper_height

16. **行 179**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

17. **行 179**: `slotName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: slot_name

18. **行 182**: `isNotScrollFetch`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_not_scroll_fetch

19. **行 183**: `isNotScrollFetch`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_not_scroll_fetch

20. **行 188**: `infinityEnd`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_end

21. **行 191**: `infinityEnd`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_end

22. **行 194**: `infinityEndLabel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_end_label

23. **行 195**: `infinityEndLabel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_end_label

24. **行 197**: `infinityEndLabel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: infinity_end_label

25. **行 200**: `refreshDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: refresh_disable

26. **行 201**: `refreshDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: refresh_disable

27. **行 203**: `refreshDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: refresh_disable

28. **行 203**: `refreshDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: refresh_disable

---

### `app/components/Tabs/Bar.vue`

**違規數量**: 317

1. **行 272**: `limitShadow`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: limit_shadow

2. **行 275**: `limitShadow`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: limit_shadow

3. **行 278**: `moveTransition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: move_transition

4. **行 281**: `moveTransition`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: move_transition

5. **行 284**: `selectedType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: selected_type

6. **行 297**: `lineBorderRadius`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: line_border_radius

7. **行 298**: `lineBorderRadius`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: line_border_radius

8. **行 300**: `lineBorderRadius`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: line_border_radius

9. **行 301**: `lineBorderRadius`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: line_border_radius

10. **行 303**: `lineBorderRadius`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: line_border_radius

11. **行 306**: `selectedType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: selected_type

12. **行 308**: `tabList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_list

13. **行 308**: `tabList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_list

14. **行 310**: `borderSideHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_height

15. **行 312**: `borderSideHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_height

16. **行 314**: `borderSideHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_height

17. **行 315**: `borderSideHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_height

18. **行 317**: `borderSideHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_height

19. **行 323**: `borderSideFullWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_full_width

20. **行 324**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

21. **行 326**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

22. **行 328**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

23. **行 329**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

24. **行 330**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

25. **行 332**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

26. **行 340**: `selectedType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: selected_type

27. **行 349**: `borderSideColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_color

28. **行 350**: `borderSideColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_color

29. **行 352**: `borderSideColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_color

30. **行 355**: `selectedColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: selected_color

31. **行 355**: `selectedColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: selected_color

32. **行 356**: `selectedColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: selected_color

33. **行 359**: `justifyContent`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: justify_content

34. **行 359**: `justifyContent`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: justify_content

35. **行 360**: `justifyContent`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: justify_content

36. **行 363**: `alignItems`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: align_items

37. **行 363**: `alignItems`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: align_items

38. **行 364**: `alignItems`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: align_items

39. **行 373**: `borderSideDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_distance

40. **行 375**: `borderSideDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_distance

41. **行 377**: `borderSideDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_distance

42. **行 378**: `borderSideDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_distance

43. **行 380**: `borderSideDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_distance

44. **行 383**: `leftLineDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: left_line_distance

45. **行 385**: `leftLineDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: left_line_distance

46. **行 387**: `leftLineDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: left_line_distance

47. **行 388**: `leftLineDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: left_line_distance

48. **行 390**: `leftLineDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: left_line_distance

49. **行 393**: `isNavigationAbsolute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_navigation_absolute

50. **行 405**: `tabItemLineHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_line_height

51. **行 406**: `tabItemLineHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_line_height

52. **行 408**: `tabItemLineHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_line_height

53. **行 409**: `tabItemLineHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_line_height

54. **行 410**: `tabItemLineHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_line_height

55. **行 423**: `tabItemWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_width

56. **行 424**: `tabItemWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_width

57. **行 426**: `tabItemWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_width

58. **行 427**: `tabItemWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_width

59. **行 429**: `tabItemWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_width

60. **行 432**: `tabItemTextAlign`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_text_align

61. **行 433**: `tabItemTextAlign`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_text_align

62. **行 435**: `tabItemTextAlign`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_item_text_align

63. **行 479**: `getComputedStyle`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_computed_style

64. **行 481**: `borderSideDistance`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_distance

65. **行 532**: `blankAtTheEnd`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: blank_at_the_end

66. **行 549**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

67. **行 552**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

68. **行 553**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

69. **行 562**: `tabList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_list

70. **行 565**: `tabListUpdateCurrentFocus`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_list_update_current_focus

71. **行 573**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

72. **行 576**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

73. **行 581**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

74. **行 590**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

75. **行 600**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

76. **行 601**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

77. **行 604**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

78. **行 609**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

79. **行 622**: `isNavigationAbsolute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_navigation_absolute

80. **行 624**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

81. **行 635**: `isNavigationAbsolute`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_navigation_absolute

82. **行 637**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

83. **行 647**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

84. **行 648**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

85. **行 649**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

86. **行 653**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

87. **行 654**: `addEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_event_listener

88. **行 657**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

89. **行 661**: `isIntersecting`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_intersecting

90. **行 669**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

91. **行 670**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

92. **行 671**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

93. **行 673**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

94. **行 674**: `removeEventListener`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remove_event_listener

95. **行 682**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

96. **行 684**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

97. **行 691**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

98. **行 700**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

99. **行 702**: `scrollLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_left

100. **行 706**: `deltaX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: delta_x

101. **行 706**: `deltaX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: delta_x

102. **行 707**: `deltaY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: delta_y

103. **行 707**: `deltaY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: delta_y

104. **行 717**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

105. **行 722**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

106. **行 729**: `deltaX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: delta_x

107. **行 729**: `deltaX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: delta_x

108. **行 730**: `deltaY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: delta_y

109. **行 730**: `deltaY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: delta_y

110. **行 737**: `tabList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_list

111. **行 737**: `findIndex`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: find_index

112. **行 738**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

113. **行 743**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

114. **行 751**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

115. **行 752**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

116. **行 756**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

117. **行 757**: `scrollLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_left

118. **行 766**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

119. **行 767**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

120. **行 771**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

121. **行 772**: `scrollLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_left

122. **行 779**: `hasNavigation`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_navigation

123. **行 788**: `getBoundingClientRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_bounding_client_rect

124. **行 789**: `getBoundingClientRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_bounding_client_rect

125. **行 790**: `getBoundingClientRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_bounding_client_rect

126. **行 852**: `hasNavigation`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: has_navigation

127. **行 859**: `getBoundingClientRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_bounding_client_rect

128. **行 860**: `getBoundingClientRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_bounding_client_rect

129. **行 861**: `getBoundingClientRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_bounding_client_rect

130. **行 909**: `clientHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_height

131. **行 913**: `selectedType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: selected_type

132. **行 914**: `borderSideHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_height

133. **行 915**: `borderSideHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_height

134. **行 916**: `borderSideHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_height

135. **行 918**: `clientHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_height

136. **行 919**: `offsetTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_top

137. **行 922**: `offsetTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_top

138. **行 922**: `clientHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_height

139. **行 928**: `selectedType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: selected_type

140. **行 929**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

141. **行 930**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

142. **行 931**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

143. **行 933**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

144. **行 934**: `offsetLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_left

145. **行 937**: `offsetLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_left

146. **行 937**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

147. **行 941**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

148. **行 942**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

149. **行 943**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

150. **行 944**: `borderSideWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_width

151. **行 945**: `borderSideFullWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: border_side_full_width

152. **行 947**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

153. **行 952**: `selectedType`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: selected_type

154. **行 954**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

155. **行 956**: `clientHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_height

156. **行 979**: `cancelAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: cancel_animation_frame

157. **行 986**: `verticalBufferScroll`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: vertical_buffer_scroll

158. **行 987**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

159. **行 988**: `offsetTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_top

160. **行 991**: `verticalScroll`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: vertical_scroll

161. **行 992**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

162. **行 993**: `offsetTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_top

163. **行 993**: `clientHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_height

164. **行 996**: `horizontalScroll`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: horizontal_scroll

165. **行 997**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

166. **行 998**: `offsetLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_left

167. **行 1001**: `horizontalBufferScroll`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: horizontal_buffer_scroll

168. **行 1002**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

169. **行 1003**: `offsetLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_left

170. **行 1003**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

171. **行 1011**: `tabList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: tab_list

172. **行 1011**: `valueKey`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: value_key

173. **行 1022**: `getBoundingClientRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_bounding_client_rect

174. **行 1024**: `getBoundingClientRect`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_bounding_client_rect

175. **行 1026**: `clientHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_height

176. **行 1028**: `clientHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_height

177. **行 1031**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

178. **行 1033**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

179. **行 1062**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

180. **行 1063**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

181. **行 1064**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

182. **行 1065**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

183. **行 1065**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

184. **行 1066**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

185. **行 1066**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

186. **行 1067**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

187. **行 1067**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

188. **行 1068**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

189. **行 1068**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

190. **行 1069**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

191. **行 1069**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

192. **行 1070**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

193. **行 1070**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

194. **行 1072**: `offsetTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_top

195. **行 1073**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

196. **行 1077**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

197. **行 1078**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

198. **行 1079**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

199. **行 1080**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

200. **行 1080**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

201. **行 1081**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

202. **行 1081**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

203. **行 1082**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

204. **行 1082**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

205. **行 1083**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

206. **行 1083**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

207. **行 1084**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

208. **行 1084**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

209. **行 1085**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

210. **行 1085**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

211. **行 1087**: `offsetLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_left

212. **行 1088**: `scrollLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_left

213. **行 1091**: `scrollDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_disable

214. **行 1096**: `stopPropagation`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: stop_propagation

215. **行 1106**: `scrollDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_disable

216. **行 1111**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

217. **行 1112**: `modelValue`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: model_value

218. **行 1125**: `scrollDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_disable

219. **行 1128**: `cancelAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: cancel_animation_frame

220. **行 1151**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

221. **行 1152**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

222. **行 1153**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

223. **行 1154**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

224. **行 1154**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

225. **行 1155**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

226. **行 1155**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

227. **行 1156**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

228. **行 1156**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

229. **行 1157**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

230. **行 1157**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

231. **行 1158**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

232. **行 1158**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

233. **行 1159**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

234. **行 1159**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

235. **行 1161**: `offsetTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_top

236. **行 1165**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

237. **行 1166**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

238. **行 1172**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

239. **行 1209**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

240. **行 1210**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

241. **行 1211**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

242. **行 1212**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

243. **行 1212**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

244. **行 1213**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

245. **行 1213**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

246. **行 1214**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

247. **行 1214**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

248. **行 1215**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

249. **行 1215**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

250. **行 1216**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

251. **行 1216**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

252. **行 1217**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

253. **行 1217**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

254. **行 1219**: `offsetLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_left

255. **行 1223**: `scrollLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_left

256. **行 1224**: `scrollLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_left

257. **行 1230**: `scrollLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_left

258. **行 1259**: `scrollDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_disable

259. **行 1263**: `preventDefault`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: prevent_default

260. **行 1266**: `cancelAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: cancel_animation_frame

261. **行 1283**: `scrollDisable`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_disable

262. **行 1291**: `scrollHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_height

263. **行 1291**: `offsetHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_height

264. **行 1292**: `clientHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_height

265. **行 1293**: `scrollWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_width

266. **行 1293**: `offsetWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_width

267. **行 1294**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

268. **行 1300**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

269. **行 1301**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

270. **行 1302**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

271. **行 1303**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

272. **行 1303**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

273. **行 1304**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

274. **行 1304**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

275. **行 1305**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

276. **行 1305**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

277. **行 1306**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

278. **行 1306**: `pageY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_y

279. **行 1307**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

280. **行 1307**: `clientY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_y

281. **行 1308**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

282. **行 1308**: `offsetY`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_y

283. **行 1310**: `offsetTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_top

284. **行 1312**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

285. **行 1318**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

286. **行 1319**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

287. **行 1320**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

288. **行 1321**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

289. **行 1321**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

290. **行 1322**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

291. **行 1322**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

292. **行 1323**: `targetTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: target_touches

293. **行 1323**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

294. **行 1324**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

295. **行 1324**: `pageX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: page_x

296. **行 1325**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

297. **行 1325**: `clientX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_x

298. **行 1326**: `changedTouches`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: changed_touches

299. **行 1326**: `offsetX`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_x

300. **行 1328**: `offsetLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_left

301. **行 1330**: `scrollLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_left

302. **行 1338**: `cancelAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: cancel_animation_frame

303. **行 1345**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

304. **行 1347**: `scrollLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_left

305. **行 1359**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

306. **行 1362**: `cancelAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: cancel_animation_frame

307. **行 1371**: `scrollTop`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_top

308. **行 1374**: `scrollHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_height

309. **行 1375**: `offsetHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_height

310. **行 1377**: `clientHeight`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_height

311. **行 1379**: `scrollLeft`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_left

312. **行 1381**: `scrollWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_width

313. **行 1381**: `offsetWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: offset_width

314. **行 1382**: `clientWidth`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: client_width

315. **行 1404**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

316. **行 1409**: `scrollTo`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: scroll_to

317. **行 1415**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

---

### `app/components/Hexagon/Container.vue`

**違規數量**: 3

1. **行 34**: `maskColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: mask_color

2. **行 34**: `maskColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: mask_color

3. **行 35**: `maskColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: mask_color

---

### `app/components/DialogModal/index.vue`

**違規數量**: 17

1. **行 12**: `computedContentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: computed_content_class

2. **行 49**: `contentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: content_class

3. **行 49**: `contentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: content_class

4. **行 50**: `contentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: content_class

5. **行 52**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

6. **行 52**: `contentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: content_class

7. **行 53**: `contentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: content_class

8. **行 55**: `contentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: content_class

9. **行 57**: `contentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: content_class

10. **行 58**: `contentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: content_class

11. **行 61**: `contentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: content_class

12. **行 61**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

13. **行 62**: `contentClass`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: content_class

14. **行 78**: `bgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: bg_color

15. **行 79**: `bgColor`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: bg_color

16. **行 114**: `querySelectorAll`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: query_selector_all

17. **行 115**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

---

### `app/components/Animation/TriangleEnter.vue`

**違規數量**: 8

1. **行 75**: `leftLabel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: left_label

2. **行 75**: `leftLabel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: left_label

3. **行 76**: `leftLabel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: left_label

4. **行 83**: `rightLabel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: right_label

5. **行 83**: `rightLabel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: right_label

6. **行 84**: `rightLabel`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: right_label

7. **行 92**: `isMobile`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_mobile

8. **行 178**: `isMobile`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_mobile

---

### `app/components/Animation/EnterLabel.vue`

**違規數量**: 7

1. **行 63**: `randomLen`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: random_len

2. **行 63**: `toLowerCase`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: to_lower_case

3. **行 77**: `requestAnimationFrame`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: request_animation_frame

4. **行 97**: `fromCharCode`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_char_code

5. **行 109**: `fromCodePoint`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: from_code_point

6. **行 113**: `animationEnd`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: animation_end

7. **行 115**: `autoStart`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: auto_start

---

### `app/components/Layout/Header.vue`

**違規數量**: 4

1. **行 18**: `systemName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: system_name

2. **行 26**: `systemName`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: system_name

3. **行 86**: `___IS_NUXT_INITED__`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: -_IS_NUXT_INITED-

4. **行 110**: `___IS_NUXT_INITED__`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: -_IS_NUXT_INITED-

---

### `app/components/Layout/Footer.vue`

**違規數量**: 3

1. **行 9**: `___IS_NUXT_INITED__`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: -_IS_NUXT_INITED-

2. **行 14**: `getFullYear`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: get_full_year

3. **行 18**: `___IS_NUXT_INITED__`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: -_IS_NUXT_INITED-

---

### `app/assets/styles/global.scss`

**違規數量**: 5

1. **行 141**: `el-tabs__content`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: el-tabs-content

2. **行 151**: `el-tabs--border-card`
   - **問題**: State uses BEM modifier (--) instead of HTML attribute
   - **建議**: Use HTML attribute selector instead: [css-is-{state}='true']

3. **行 151**: `el-tabs__header`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: el-tabs-header

4. **行 161**: `el-picker-panel__footer`
   - **問題**: Element uses double underscore (__)
   - **建議**: Use single hyphen instead: el-picker-panel-footer

5. **行 50**: `target`
   - **問題**: HTML attribute missing css- prefix
   - **建議**: Add css- prefix: css-target

---

### `app/pages/web-rtc/websocket/[uuId].vue`

**違規數量**: 19

1. **行 8**: `supportWebsocket`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: support_websocket

2. **行 61**: `iceConnectionState`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ice_connection_state

3. **行 69**: `uuId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: uu_id

4. **行 72**: `jsonData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: json_data

5. **行 74**: `isOffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_offer

6. **行 74**: `isOffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_offer

7. **行 75**: `isAnswer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_answer

8. **行 75**: `isOffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_offer

9. **行 78**: `localDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: local_description

10. **行 79**: `remoteDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remote_description

11. **行 81**: `jsonData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: json_data

12. **行 87**: `addIceCandidate`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_ice_candidate

13. **行 99**: `setRemoteDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_remote_description

14. **行 104**: `remoteDescriptionAdded`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remote_description_added

15. **行 121**: `uuId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: uu_id

16. **行 127**: `localDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: local_description

17. **行 135**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

18. **行 135**: `streamList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: stream_list

19. **行 135**: `streamList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: stream_list

---

### `app/pages/web-rtc/socket.io/[uuId].vue`

**違規數量**: 16

1. **行 6**: `supportWebsocket`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: support_websocket

2. **行 57**: `isOffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_offer

3. **行 57**: `isOffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_offer

4. **行 58**: `isAnswer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_answer

5. **行 58**: `isOffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_offer

6. **行 61**: `localDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: local_description

7. **行 62**: `remoteDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remote_description

8. **行 67**: `addIceCandidate`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_ice_candidate

9. **行 79**: `setRemoteDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_remote_description

10. **行 84**: `remoteDescriptionAdded`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remote_description_added

11. **行 101**: `uuId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: uu_id

12. **行 107**: `localDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: local_description

13. **行 115**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

14. **行 115**: `streamList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: stream_list

15. **行 115**: `streamList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: stream_list

16. **行 121**: `localDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: local_description

---

### `app/pages/server-sent-event-test/room-post/[uuId].vue`

**違規數量**: 1

1. **行 24**: `uuId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: uu_id

---

### `app/pages/server-sent-event-test/room-get/[uuId].vue`

**違規數量**: 1

1. **行 24**: `uuId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: uu_id

---

### `app/pages/route/params-back-test/[testData].vue`

**違規數量**: 3

1. **行 32**: `testData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: test_data

2. **行 33**: `testData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: test_data

3. **行 35**: `testData`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: test_data

---

### `app/pages/web-rtc/server-sent-event/room/[uuId].vue`

**違規數量**: 31

1. **行 48**: `uuId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: uu_id

2. **行 60**: `iceConnectionState`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: ice_connection_state

3. **行 67**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

4. **行 67**: `streamList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: stream_list

5. **行 67**: `streamList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: stream_list

6. **行 82**: `isOffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_offer

7. **行 83**: `isAnswer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_answer

8. **行 88**: `isOffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_offer

9. **行 96**: `isOffer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_offer

10. **行 99**: `isAnswer`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_answer

11. **行 102**: `memberCandidateList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: member_candidate_list

12. **行 103**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

13. **行 105**: `userId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_id

14. **行 107**: `candidateList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: candidate_list

15. **行 109**: `isArray`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: is_array

16. **行 112**: `addIceCandidate`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: add_ice_candidate

17. **行 118**: `memberDescriptionList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: member_description_list

18. **行 119**: `forEach`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: for_each

19. **行 121**: `userId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: user_id

20. **行 125**: `localDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: local_description

21. **行 126**: `remoteDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remote_description

22. **行 139**: `setRemoteDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: set_remote_description

23. **行 144**: `remoteDescriptionAdded`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: remote_description_added

24. **行 156**: `candidateList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: candidate_list

25. **行 161**: `POST_webRTCCandidateList`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _p_o_s_t_web_r_t_c_candidate_list

26. **行 162**: `uuId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: uu_id

27. **行 177**: `localDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: local_description

28. **行 182**: `POST_webRTCDescription`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _p_o_s_t_web_r_t_c_description

29. **行 183**: `uuId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: uu_id

30. **行 199**: `POST_webRTCJoinRoom`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: _p_o_s_t_web_r_t_c_join_room

31. **行 200**: `uuId`
   - **問題**: Element uses camelCase
   - **建議**: Use underscore for semantic words: uu_id

---

