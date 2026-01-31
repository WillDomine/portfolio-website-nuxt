<script setup>
const { t, locale } = useI18n()
useHead({
  htmlAttrs: {
    lang: computed(() => locale.value)
  }
})
useSeoMeta({
  description: () => t('seo_description'),
  ogDescription: () => t('seo_description')
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
