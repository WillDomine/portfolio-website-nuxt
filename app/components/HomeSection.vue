<template>
    <section class="relative min-h-dvh w-full overflow-hidden flex flex-col lg:flex-row lg:items-center pt-15 lg:pt-0">
        <div class="absolute inset-0 -z-10">
            <div
                class="absolute top-[-5%] left-[-10%] w-[60vw] md:w-[40vw] aspect-square bg-primary/20 blur-[60px] md:blur-[10vw] rounded-full">
            </div>
            <div
                class="absolute bottom-[-5%] right-[-10%] w-[50vw] md:w-[35vw] aspect-square bg-primary/10 blur-[60px] md:blur-[10vw] rounded-full">
            </div>
        </div>

        <div
            class="mx-auto w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-8 lg:py-0">
            <div
                class="flex flex-col gap-5 md:gap-8 text-center lg:text-left items-center lg:items-start order-2 lg:order-1">
                <span
                    class="bg-primary/10 text-primary-text border border-black/5 px-3 py-1 rounded-md font-bold tracking-[0.2em] uppercase text-xs">
                    {{ $t('hero.role') }}
                </span>

                <h1 class="font-black leading-[0.9] tracking-tight text-[clamp(3.5rem,10vw,8rem)]">
                    Will <br class="hidden sm:block" />
                    <span
                        class="text-primary">
                        Domine
                    </span>
                </h1>

                <p class="max-w-md md:max-w-xl text-muted-foreground text-base md:text-xl leading-relaxed">
                    <i18n-t keypath="hero.description" scope="global">
                        <template #highPerformance>
                            <span class="text-foreground font-semibold">{{ $t('hero.high_performance') }}</span>
                        </template>
                    </i18n-t>
                </p>

                <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mt-2">
                    <a href="https://www.linkedin.com/in/will-domine/" target="_blank"
                        class="px-8 h-14 md:h-16 flex items-center justify-center gap-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-primary/20">
                        <Icon name="lucide:linkedin" class="size-5 md:size-6" />
                        {{ $t('hero.connect') }}
                    </a>
                    <a href="https://www.github.com/WillDomine"
                        class="px-8 h-14 md:h-16 flex items-center justify-center gap-3 border border-border rounded-2xl font-semibold hover:bg-muted active:scale-95 transition-all">
                        <Icon name="lucide:github" class="size-5 md:size-6" />
                        {{ $t('hero.github') }}
                    </a>
                </div>

                <div class="grid grid-cols-3 gap-4 md:gap-12 mt-6 w-full lg:w-auto">
                    <div class="text-center lg:text-left">
                        <p class="text-2xl md:text-4xl font-black">1+</p>
                        <p class="text-muted-foreground text-[10px] md:text-xs uppercase tracking-wider">{{
                            $t('hero.years_exp') }}</p>
                    </div>
                    <div class="text-center lg:text-left border-x border-border lg:border-none px-2">
                        <p class="text-2xl md:text-4xl font-black">5+</p>
                        <p class="text-muted-foreground text-[10px] md:text-xs uppercase tracking-wider">{{
                            $t('hero.projects_count') }}
                        </p>
                    </div>
                    <div class="text-center lg:text-left">
                        <p class="text-2xl md:text-4xl font-black">100%</p>
                        <p class="text-muted-foreground text-[10px] md:text-xs uppercase tracking-wider">{{
                            $t('hero.passion') }}</p>
                    </div>
                </div>
            </div>

            <div class="relative flex justify-center order-1 lg:order-2 w-full">
                <div class="absolute inset-0 flex justify-center items-center">
                    <div class="w-[70%] aspect-square bg-primary/20 blur-[50px] md:blur-[80px] rounded-full"></div>
                </div>

                <div
                    class="relative bg-background border border-border rounded-4xl p-2 md:p-4 shadow-2xl w-[65%] sm:w-[50%] lg:w-full max-w-100">
                    <NuxtImg src="/memoji_waving.jpg" preload fetchpriority="high" alt="Will Domine" class="w-full aspect-4/5 object-cover rounded-3xl" sizes="xs:300px sm:400px md:500px lg:600px" format="webp" quality="100"/>
                    <div
                        class="absolute -bottom-2 -right-2 md:-bottom-6 md:-right-6 bg-primary text-primary-foreground px-3 py-1.5 md:px-6 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-base font-black shadow-xl rotate-3">
                        {{ $t('hero.status') }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>