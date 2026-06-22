<template>
  <client-only>
    <VueDatePicker
      v-bind="$attrs"
      :locale="safeLocale"
      :formats="safeFormats"
    />
    <template #fallback>
      <v-skeleton-loader type="heading" />
    </template>
  </client-only>
</template>

<script setup>
import { zhTW, enUS, zhCN, zhHK } from 'date-fns/locale';
// TODO:實作民國年份轉換（西元年-1911）及資料流雙向綁定

const { locale: i18nLocale } = useI18n();

const props = defineProps({
  locale: { type: String, default: null },
  formats: { type: Object, default: null }
});

const safeLocale = computed(() => {
  const _locale = (props.locale || '').toLowerCase();
  if (_locale === 'zh-cn' || i18nLocale.value === 'zh-cn') {
    return zhCN;
  } else if (_locale === 'zh-hk' || i18nLocale.value === 'zh-hk') {
    return zhHK;
  } else if (_locale === 'zh-tw' || i18nLocale.value.includes('zh')) {
    return zhTW;
  }
  return enUS;
});

const safeFormats = computed(() => {
  const _formats = props.formats || {};

  return {
    ..._formats,
    input: _formats.input || 'yyyy/MM/dd HH:mm',
    preview: _formats.preview || 'yyyy/MM/dd HH:mm'
  };
});
</script>
