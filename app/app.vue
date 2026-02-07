<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

useHead({
  title: 'Will Domine - Full Stack Developer',
  meta: [
    { name: 'description', content: t('seo_description') }
  ]
})

onMounted(() => {
  if (route.hash) {
    nextTick(() => {
      const element = document.querySelector(route.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }
})
</script>

<template>
  <div class="relative">
    <Navbar />
    <main class="w-full">
      <SectionWrapper id="home">
        <HomeSection />
      </SectionWrapper>
      
      <SectionWrapper id="about">
        <AboutSection />
      </SectionWrapper>
      
      <SectionWrapper id="projects">
        <ProjectsSection />
      </SectionWrapper>
    </main>
  </div>
</template>