<script setup>
const phoneValue1 = ref('');
const phoneValue2 = ref('');
const phoneValue3 = ref(null);
const phoneValue4 = ref('');

const formData = ref({
  name: '',
  phone: null
});

const submittedData = ref(null);

function handleSubmit() {
  submittedData.value = {
    name: formData.value.name,
    phone: formData.value.phone
  };
}
</script>

<template>
  <div class="phone_input_demo">
    <div class="phone_input_demo-container">
      <h1 class="phone_input_demo-title">電話號碼輸入組件示範</h1>
      <p class="phone_input_demo-subtitle">
        帶國碼選擇器的電話號碼輸入組件，使用 flag-icons 顯示國旗
      </p>
      <div class="phone_input_demo-credit">
        <p>
          <span class="phone_input_demo-credit-icon">🤖</span>
          此組件由 <strong>Antigravity AI</strong> 協助建置
        </p>
      </div>

      <div class="phone_input_demo-section">
        <h2 class="phone_input_demo-section-title">基本用法</h2>
        <p class="phone_input_demo-section-description">
          預設使用台灣 (+886) 國碼
        </p>
        <PhoneInput v-model="phoneValue1" class="phone_input_demo-input" />
        <div class="phone_input_demo-result">
          <strong>輸出值：</strong>
          <code>{{ phoneValue1 || '(尚未輸入)' }}</code>
        </div>
      </div>

      <div class="phone_input_demo-section">
        <h2 class="phone_input_demo-section-title">自訂預設國碼</h2>
        <p class="phone_input_demo-section-description">
          設定預設為美國 (+1) 國碼
        </p>
        <PhoneInput
          v-model="phoneValue2"
          default-country-code="US"
          placeholder="Enter your phone number"
          class="phone_input_demo-input"
        />
        <div class="phone_input_demo-result">
          <strong>輸出值：</strong>
          <code>{{ phoneValue2 || '(尚未輸入)' }}</code>
        </div>
      </div>

      <div class="phone_input_demo-section">
        <h2 class="phone_input_demo-section-title">返回完整對象</h2>
        <p class="phone_input_demo-section-description">
          使用 <code>return-object</code> 屬性獲取完整的電話號碼資訊
        </p>
        <PhoneInput
          v-model="phoneValue3"
          :return-object="true"
          default-country-code="JP"
          placeholder="電話番号を入力してください"
          class="phone_input_demo-input"
        />
        <div class="phone_input_demo-result">
          <strong>輸出對象：</strong>
          <pre>{{ JSON.stringify(phoneValue3, null, 2) || '(尚未輸入)' }}</pre>
        </div>
      </div>

      <div class="phone_input_demo-section">
        <h2 class="phone_input_demo-section-title">自訂下拉選單寬度</h2>
        <p class="phone_input_demo-section-description">
          調整國碼選擇器下拉選單的寬度
        </p>
        <PhoneInput
          v-model="phoneValue4"
          default-country-code="CN"
          option-list-width="350px"
          placeholder="请输入电话号码"
          class="phone_input_demo-input"
        />
        <div class="phone_input_demo-result">
          <strong>輸出值：</strong>
          <code>{{ phoneValue4 || '(尚未輸入)' }}</code>
        </div>
      </div>

      <div class="phone_input_demo-section">
        <h2 class="phone_input_demo-section-title">表單整合示範</h2>
        <p class="phone_input_demo-section-description">
          在表單中使用電話號碼輸入組件
        </p>
        <form class="phone_input_demo-form" @submit.prevent="handleSubmit">
          <div class="phone_input_demo-form-group">
            <label class="phone_input_demo-form-label">姓名</label>
            <input
              v-model="formData.name"
              type="text"
              class="phone_input_demo-form-input"
              placeholder="請輸入姓名"
            />
          </div>
          <div class="phone_input_demo-form-group">
            <label class="phone_input_demo-form-label">電話號碼</label>
            <PhoneInput
              v-model="formData.phone"
              :return-object="true"
              class="phone_input_demo-input"
            />
          </div>
          <v-btn type="submit" color="primary" size="large" block>
            提交表單
          </v-btn>
        </form>
        <div v-if="submittedData" class="phone_input_demo-result">
          <strong>提交的資料：</strong>
          <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
        </div>
      </div>

      <div class="phone_input_demo-section">
        <h2 class="phone_input_demo-section-title">API 說明</h2>
        <div class="phone_input_demo-api">
          <h3>Props</h3>
          <table class="phone_input_demo-api-table">
            <thead>
              <tr>
                <th>屬性名稱</th>
                <th>類型</th>
                <th>預設值</th>
                <th>說明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>modelValue</code></td>
                <td>String | Object</td>
                <td>''</td>
                <td>v-model 綁定值</td>
              </tr>
              <tr>
                <td><code>defaultCountryCode</code></td>
                <td>String</td>
                <td>'TW'</td>
                <td>預設國碼（ISO 3166-1 alpha-2）</td>
              </tr>
              <tr>
                <td><code>placeholder</code></td>
                <td>String</td>
                <td>'請輸入電話號碼'</td>
                <td>輸入框佔位符</td>
              </tr>
              <tr>
                <td><code>optionListWidth</code></td>
                <td>String | Number</td>
                <td>'280px'</td>
                <td>下拉選單寬度</td>
              </tr>
              <tr>
                <td><code>returnObject</code></td>
                <td>Boolean</td>
                <td>false</td>
                <td>是否返回完整對象</td>
              </tr>
            </tbody>
          </table>

          <h3>Events</h3>
          <table class="phone_input_demo-api-table">
            <thead>
              <tr>
                <th>事件名稱</th>
                <th>參數</th>
                <th>說明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>update:modelValue</code></td>
                <td>value: String | Object</td>
                <td>值變更時觸發</td>
              </tr>
              <tr>
                <td><code>change</code></td>
                <td>value: String | Object</td>
                <td>值變更時觸發</td>
              </tr>
              <tr>
                <td><code>focus</code></td>
                <td>-</td>
                <td>輸入框獲得焦點時觸發</td>
              </tr>
              <tr>
                <td><code>blur</code></td>
                <td>-</td>
                <td>輸入框失去焦點時觸發</td>
              </tr>
            </tbody>
          </table>

          <h3>返回對象格式（當 returnObject 為 true）</h3>
          <pre class="phone_input_demo-api-code">
{
  countryCode: 'TW',      // 國家代碼
  countryName: '台灣',     // 國家名稱
  phoneCode: '886',       // 電話國碼
  phoneNumber: '912345678', // 電話號碼
  fullNumber: '+886912345678' // 完整電話號碼
}</pre
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.phone_input_demo {
  /* Display & Box Model */
  min-height: 100vh;
  padding: 40px 20px;

  /* Visual */
  background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);

  &-container {
    /* Display & Box Model */
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    border-radius: 16px;

    /* Visual */
    background: #fff;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  &-title {
    /* Display & Box Model */
    margin-bottom: 12px;

    /* Typography */
    font-size: 32px;
    font-weight: 700;
    color: #2c3e50;
    text-align: center;
  }

  &-subtitle {
    /* Display & Box Model */
    margin-bottom: 16px;

    /* Typography */
    font-size: 16px;
    color: #7f8c8d;
    text-align: center;
  }

  &-credit {
    /* Display & Box Model */
    margin-bottom: 40px;
    padding: 12px 20px;
    border-radius: 8px;
    border: 1px solid rgba(68, 160, 141, 0.2);

    /* Typography */
    text-align: center;

    /* Visual */
    background: linear-gradient(
      135deg,
      rgba(68, 160, 141, 0.1) 0%,
      rgba(78, 205, 196, 0.1) 100%
    );

    p {
      /* Display & Box Model */
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin: 0;

      /* Typography */
      font-size: 14px;
      color: #44a08d;
    }

    &-icon {
      /* Typography */
      font-size: 18px;

      /* Animation */
      animation: wave 2s ease-in-out infinite;
    }

    strong {
      /* Typography */
      font-weight: 600;
      color: #44a08d;
    }
  }

  @keyframes wave {
    0%,
    100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-10deg);
    }
    75% {
      transform: rotate(10deg);
    }
  }

  &-section {
    /* Display & Box Model */
    margin-bottom: 40px;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #e9ecef;

    /* Visual */
    background: #f8f9fa;

    &-title {
      /* Display & Box Model */
      margin-bottom: 8px;

      /* Typography */
      font-size: 20px;
      font-weight: 600;
      color: #2c3e50;
    }

    &-description {
      /* Display & Box Model */
      margin-bottom: 16px;

      /* Typography */
      font-size: 14px;
      color: #6c757d;

      code {
        /* Display & Box Model */
        padding: 2px 6px;
        border-radius: 4px;

        /* Typography */
        font-family: 'Monaco', 'Courier New', monospace;
        font-size: 13px;
        color: #d63384;

        /* Visual */
        background: #e9ecef;
      }
    }
  }

  &-input {
    /* Display & Box Model */
    margin-bottom: 16px;
  }

  &-result {
    /* Display & Box Model */
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #dee2e6;

    /* Visual */
    background: #fff;

    strong {
      /* Display & Box Model */
      display: block;
      margin-bottom: 8px;

      /* Typography */
      font-size: 14px;
      color: #495057;
    }

    code {
      /* Display & Box Model */
      display: block;
      padding: 8px 12px;
      border-radius: 6px;

      /* Typography */
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 13px;
      color: #212529;
      word-break: break-all;

      /* Visual */
      background: #f8f9fa;
    }

    pre {
      /* Display & Box Model */
      margin: 0;
      padding: 12px;
      border-radius: 6px;
      overflow-x: auto;

      /* Typography */
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 13px;
      color: #212529;

      /* Visual */
      background: #f8f9fa;
    }
  }

  &-form {
    &-group {
      /* Display & Box Model */
      margin-bottom: 20px;
    }

    &-label {
      /* Display & Box Model */
      display: block;
      margin-bottom: 8px;

      /* Typography */
      font-size: 14px;
      font-weight: 500;
      color: #495057;
    }

    &-input {
      /* Display & Box Model */
      width: 100%;
      padding: 10px 14px;
      border: 1px solid #d5d5d5;
      border-radius: 8px;

      /* Typography */
      font-size: 14px;

      /* Animation */
      transition: all 0.3s ease;

      &:focus {
        /* Visual */
        outline: none;
        border-color: #2c64e3;
        box-shadow: 0 0 0 2px rgba(44, 100, 227, 0.1);
      }

      &::placeholder {
        /* Typography */
        color: #999;
      }
    }
  }

  &-api {
    h3 {
      /* Display & Box Model */
      margin: 24px 0 12px;

      /* Typography */
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;

      &:first-child {
        /* Display & Box Model */
        margin-top: 0;
      }
    }

    &-table {
      /* Display & Box Model */
      width: 100%;
      margin-bottom: 20px;
      padding: 0;
      border-collapse: collapse;
      border-radius: 8px;
      overflow: hidden;

      /* Visual */
      background: #fff;

      th,
      td {
        /* Display & Box Model */
        padding: 12px;
        border-bottom: 1px solid #e9ecef;

        /* Typography */
        text-align: left;
      }

      th {
        /* Typography */
        font-size: 13px;
        font-weight: 600;
        color: #495057;

        /* Visual */
        background: #f8f9fa;
      }

      td {
        /* Typography */
        font-size: 13px;
        color: #6c757d;

        code {
          /* Display & Box Model */
          padding: 2px 6px;
          border-radius: 4px;

          /* Typography */
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 12px;
          color: #d63384;

          /* Visual */
          background: #e9ecef;
        }
      }

      tr:last-child {
        td {
          /* Display & Box Model */
          border-bottom: none;
        }
      }
    }

    &-code {
      /* Display & Box Model */
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #dee2e6;
      overflow-x: auto;

      /* Typography */
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 13px;
      color: #212529;

      /* Visual */
      background: #f8f9fa;
    }
  }
}
</style>
