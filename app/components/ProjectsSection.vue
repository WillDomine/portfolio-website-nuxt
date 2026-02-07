<script setup lang="ts">
const { locale } = useI18n()

const { data: projects, pending, error } = useFetch('/api/projects', {
    lazy: true,
    key:'projects-data'
})
</script>

<template>
    <section class="relative min-h-screen w-full flex flex-col justify-center overflow-hidden">

        <div class="absolute inset-0 -z-10 pointer-events-none">
            <div
                class="absolute top-[10%] right-[-5%] w-[40vw] aspect-square bg-primary/10 blur-[80px] md:blur-[120px] rounded-full">
            </div>
            <div
                class="absolute bottom-[10%] left-[-10%] w-[35vw] aspect-square bg-primary/10 blur-[80px] md:blur-[120px] rounded-full">
            </div>
        </div>

        <div class="mx-auto w-full max-w-360 px-[4vw] h-full flex flex-col justify-center">

            <div class="mb-6 md:mb-10 flex flex-col gap-6">
                <div class="space-y-3 2xl:space-y-6">
                    <h2 class="text-3xl md:text-4xl 2xl:text-6xl font-black tracking-tight">
                        {{ $t('projects') }}
                    </h2>
                    <div class="h-1.5 w-20 bg-primary rounded-full"></div>
                </div>
                <p class="text-muted-foreground text-base md:text-lg 2xl:text-xl max-w-2xl leading-relaxed">
                    {{ $t('projects_section.subtitle') }}
                </p>
            </div>

            <div v-if="pending" class="flex justify-center p-20">
                <Icon name="lucide:loader-2" class="animate-spin size-10 text-primary" />
            </div>

            <div v-else-if="error"
                class="text-destructive text-center p-12 bg-destructive/5 border border-destructive/20 rounded-3xl">
                <p class="font-bold text-lg">{{ $t('projects_section.error') }}</p>
            </div>

            <div v-else-if="!projects || projects.length === 0"
                class="text-center p-20 text-muted-foreground bg-card/30 border border-border rounded-3xl">
                <Icon name="lucide:folder-open" class="size-12 mb-4 opacity-50 mx-auto" />
                <p>No projects found.</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                <div v-for="project in projects" :key="project.id"
                    class="group relative flex flex-col bg-card/50 backdrop-blur-sm border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
                    <div class="aspect-video w-full bg-muted/50 relative overflow-hidden border-b border-border/50">
                        <div v-if="!project.image"
                            class="absolute inset-0 flex items-center justify-center bg-secondary/30 group-hover:bg-secondary/50 transition-colors">
                            <Icon name="lucide:folder-code" class="size-12 text-primary/20" />
                        </div>
                        <NuxtImg v-else :src="project.image"
                            class="w-full h-full object-cover rounded-2xl md:rounded-3xl" format="webp" quality="90"
                            loading="lazy" :alt="project.name"/>

                        <div class="absolute top-4 right-4 flex gap-2">
                            <div v-if="project.stars > 0"
                                class="flex items-center gap-1.5 text-xs font-bold bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border shadow-sm">
                                <Icon name="lucide:star" class="size-3.5 text-yellow-500 fill-yellow-500" />
                                <span>{{ project.stars }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="p-4 md:p-5 flex flex-col grow gap-3">
                        <div class="space-y-2">
                            <h3
                                class="text-lg md:text-xl font-black tracking-tight group-hover:text-primary transition-colors duration-300">
                                {{ project.name }}
                            </h3>

                            <p class="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-3">
                                {{ project.description[locale] || project.description['en'] }}
                            </p>
                        </div>

                        <div class="mt-auto space-y-3">
                            <div class="flex flex-wrap gap-1.5"> <span v-for="topic in project.topics.slice(0, 4)"
                                    :key="topic"
                                    class="text-[10px] font-black uppercase tracking-widest bg-primary/5 text-primary border border-primary/10 px-2 py-0.5 rounded-md">
                                    {{ topic }}
                                </span>
                            </div>

                            <div class="flex gap-2 pt-1"> <a v-if="project.url" :href="project.url" target="_blank"
                                    class="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs md:text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20">
                                    <Icon name="lucide:github" class="size-3.5" />
                                    GitHub
                                </a>
                                <a v-if="project.homepage" :href="project.homepage" target="_blank"
                                    class="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs md:text-sm font-bold border border-border bg-background hover:bg-muted hover:text-foreground hover:scale-[1.02] active:scale-95 transition-all">
                                    <Icon name="lucide:external-link" class="size-3.5" />
                                    Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>