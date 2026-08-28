<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('phone_input_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('phone_input_page.hero.description')
    }
  ]
});

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
      <h1 class="phone_input_demo-title">
        {{ $t('phone_input_page.hero.title') }}
      </h1>
      <p class="phone_input_demo-subtitle">
        {{ $t('phone_input_page.hero.subtitle') }}
      </p>
      <div class="phone_input_demo-credit">
        <p>
          <span class="phone_input_demo-credit-icon">🤖</span>
          <span class="phone_input_demo-credit-prefix">{{ $t('phone_input_page.credit.prefix') }}</span>
          <strong class="phone_input_demo-credit-author">{{ $t('phone_input_page.credit.author') }}</strong>
          <span class="phone_input_demo-credit-suffix">{{ $t('phone_input_page.credit.suffix') }}</span>
        </p>
      </div>

      <div class="phone_input_demo-section">
        <h2 class="phone_input_demo-section-title">
          {{ $t('phone_input_page.sections.basic.title') }}
        </h2>
        <p class="phone_input_demo-section-description">
          {{ $t('phone_input_page.sections.basic.desc') }}
        </p>
        <PhoneInput v-model="phoneValue1" class="phone_input_demo-input" />
        <div class="phone_input_demo-result">
          <strong>{{ $t('phone_input_page.output_value') }}</strong>
          <code>{{ phoneValue1 || $t('phone_input_page.not_entered') }}</code>
        </div>
      </div>

      <div class="phone_input_demo-section">
        <h2 class="phone_input_demo-section-title">
          {{ $t('phone_input_page.sections.custom_default.title') }}
        </h2>
        <p class="phone_input_demo-section-description">
          {{ $t('phone_input_page.sections.custom_default.desc') }}
        </p>
        <PhoneInput
          v-model="phoneValue2"
          default-country-code="US"
          :placeholder="$t('phone_input_page.sections.custom_default.placeholder')"
          class="phone_input_demo-input"
        />
        <div class="phone_input_demo-result">
          <strong>{{ $t('phone_input_page.output_value') }}</strong>
          <code>{{ phoneValue2 || $t('phone_input_page.not_entered') }}</code>
        </div>
      </div>

      <div class="phone_input_demo-section">
        <h2 class="phone_input_demo-section-title">
          {{ $t('phone_input_page.sections.return_object.title') }}
        </h2>
        <p class="phone_input_demo-section-description">
          {{ $t('phone_input_page.sections.return_object.desc') }}
        </p>
        <PhoneInput
          v-model="phoneValue3"
          :return-object="true"
          default-country-code="JP"
          :placeholder="$t('phone_input_page.sections.return_object.placeholder')"
          class="phone_input_demo-input"
        />
        <div class="phone_input_demo-result">
          <strong>{{ $t('phone_input_page.output_object') }}</strong>
          <pre>{{ JSON.stringify(phoneValue3, null, 2) || $t('phone_input_page.not_entered') }}</pre>
        </div>
      </div>

      <div class="phone_input_demo-section">
        <h2 class="phone_input_demo-section-title">
          {{ $t('phone_input_page.sections.custom_width.title') }}
        </h2>
        <p class="phone_input_demo-section-description">
          {{ $t('phone_input_page.sections.custom_width.desc') }}
        </p>
        <PhoneInput
          v-model="phoneValue4"
          default-country-code="CN"
          option-list-width="350px"
          :placeholder="$t('phone_input_page.sections.custom_width.placeholder')"
          class="phone_input_demo-input"
        />
        <div class="phone_input_demo-result">
          <strong>{{ $t('phone_input_page.output_value') }}</strong>
          <code>{{ phoneValue4 || $t('phone_input_page.not_entered') }}</code>
        </div>
      </div>

      <div class="phone_input_demo-section">
        <h2 class="phone_input_demo-section-title">
          {{ $t('phone_input_page.sections.form_demo.title') }}
        </h2>
        <p class="phone_input_demo-section-description">
          {{ $t('phone_input_page.sections.form_demo.desc') }}
        </p>
        <form class="phone_input_demo-form" @submit.prevent="handleSubmit">
          <div class="phone_input_demo-form-group">
            <label class="phone_input_demo-form-label">
              {{ $t('phone_input_page.sections.form_demo.name_label') }}
            </label>
            <input
              v-model="formData.name"
              type="text"
              class="phone_input_demo-form-input"
              :placeholder="$t('phone_input_page.sections.form_demo.name_placeholder')"
            />
          </div>
          <div class="phone_input_demo-form-group">
            <label class="phone_input_demo-form-label">
              {{ $t('phone_input_page.sections.form_demo.phone_label') }}
            </label>
            <PhoneInput
              v-model="formData.phone"
              :return-object="true"
              class="phone_input_demo-input"
            />
          </div>
          <v-btn type="submit" color="primary" size="large" block>
            {{ $t('phone_input_page.sections.form_demo.submit_btn') }}
          </v-btn>
        </form>
        <div v-if="submittedData" class="phone_input_demo-result">
          <strong>{{ $t('phone_input_page.sections.form_demo.submitted_data') }}</strong>
          <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
        </div>
      </div>

      <div class="phone_input_demo-section">
        <h2 class="phone_input_demo-section-title">
          {{ $t('phone_input_page.sections.api.title') }}
        </h2>
        <div class="phone_input_demo-api">
          <h3>{{ $t('phone_input_page.sections.api.props_title') }}</h3>
          <table class="phone_input_demo-api-table">
            <thead>
              <tr>
                <th>{{ $t('phone_input_page.sections.api.th_prop') }}</th>
                <th>{{ $t('phone_input_page.sections.api.th_type') }}</th>
                <th>{{ $t('phone_input_page.sections.api.th_default') }}</th>
                <th>{{ $t('phone_input_page.sections.api.th_desc') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>modelValue</code></td>
                <td>String | Object</td>
                <td>''</td>
                <td>{{ $t('phone_input_page.sections.api.prop_model_value') }}</td>
              </tr>
              <tr>
                <td><code>defaultCountryCode</code></td>
                <td>String</td>
                <td>'TW'</td>
                <td>{{ $t('phone_input_page.sections.api.prop_default_country') }}</td>
              </tr>
              <tr>
                <td><code>placeholder</code></td>
                <td>String</td>
                <td>'{{ $t('phone_input_page.sections.api.default_placeholder') }}'</td>
                <td>{{ $t('phone_input_page.sections.api.prop_placeholder') }}</td>
              </tr>
              <tr>
                <td><code>optionListWidth</code></td>
                <td>String | Number</td>
                <td>'280px'</td>
                <td>{{ $t('phone_input_page.sections.api.prop_option_width') }}</td>
              </tr>
              <tr>
                <td><code>returnObject</code></td>
                <td>Boolean</td>
                <td>false</td>
                <td>{{ $t('phone_input_page.sections.api.prop_return_object') }}</td>
              </tr>
            </tbody>
          </table>

          <h3>{{ $t('phone_input_page.sections.api.events_title') }}</h3>
          <table class="phone_input_demo-api-table">
            <thead>
              <tr>
                <th>{{ $t('phone_input_page.sections.api.th_event') }}</th>
                <th>{{ $t('phone_input_page.sections.api.th_params') }}</th>
                <th>{{ $t('phone_input_page.sections.api.th_desc') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>update:modelValue</code></td>
                <td>value: String | Object</td>
                <td>{{ $t('phone_input_page.sections.api.event_update_model') }}</td>
              </tr>
              <tr>
                <td><code>change</code></td>
                <td>value: String | Object</td>
                <td>{{ $t('phone_input_page.sections.api.event_change') }}</td>
              </tr>
              <tr>
                <td><code>focus</code></td>
                <td>-</td>
                <td>{{ $t('phone_input_page.sections.api.event_focus') }}</td>
              </tr>
              <tr>
                <td><code>blur</code></td>
                <td>-</td>
                <td>{{ $t('phone_input_page.sections.api.event_blur') }}</td>
              </tr>
            </tbody>
          </table>

          <h3>{{ $t('phone_input_page.sections.api.return_format_title') }}</h3>
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
