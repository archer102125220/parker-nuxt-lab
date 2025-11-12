
export function useHeadMataData({
  titleTemplate: _titleTemplate,
  language: _metaDataLanguage,
  image: _metaDataImage,
  name: _metaDataName,
  card: _metaDataCard, // summary, summary_large_image, app or player
  title: _metaDataTitle,
  description: _metaDataDescription,
  url: _metaDataUrl,
  type: _metaDataType,
  copyright: _metaDataCopyright
} = {}) {
  const { $i18n } = useNuxtApp();
  const dayjs = useDayjs();

  const DOMAIN = import.meta.env.VITE_DOMAIN || '';
  const titleTemplate = computed(() => _titleTemplate || undefined);
  const metaDataLanguage = computed(() => _metaDataLanguage || $i18n?.locale?.value || 'zh');
  const metaDataImage = computed(() => _metaDataImage || (DOMAIN + '/img/ico/web-app-manifest-512x512.png'));
  const metaDataName = computed(() => _metaDataName || $i18n.t('system.systemName'));
  const metaDataCard = computed(() => _metaDataCard || 'summary_large_image'); // summary, summary_large_image, app or player
  const metaDataTitle = computed(() => _metaDataTitle || '');
  const metaDataDescription = computed(() => _metaDataDescription || $i18n.t('system.description'));
  const metaDataUrl = computed(() => _metaDataUrl || DOMAIN);
  const metaDataType = computed(() => _metaDataType || 'website');
  const metaDataCopyright = computed(() => _metaDataCopyright || `Copyright © ${dayjs().year()} Parker Chen. All rights reserved.`);

  return useHead({
    titleTemplate: titleTemplate.value,
    title: metaDataTitle.value,
    meta: [
      { id: 'meta-lang', language: metaDataLanguage.value },
      { property: 'description', content: metaDataDescription.value },
      {
        property: 'twitter:image',
        content: metaDataImage.value
      },
      { property: 'twitter:card', content: metaDataCard.value },
      { property: 'twitter:title', content: metaDataTitle.value },
      { property: 'twitter:description', content: metaDataDescription.value },
      { property: 'og:site_name', content: metaDataName.value },
      { property: 'og:title', content: metaDataTitle.value },
      { property: 'og:description', content: metaDataDescription.value },
      {
        property: 'og:image',
        content: metaDataImage.value
      },
      {
        property: 'og:url',
        content: metaDataUrl.value
      },
      { property: 'og:type', content: metaDataType.value },
      {
        copyright: metaDataCopyright.value
      }
    ]
  });
}

export default useHeadMataData;