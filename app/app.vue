<script setup>
const { locale } = useI18n()
useHead({
  htmlAttrs: {
    lang: computed(() => locale.value)
  }
})
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
