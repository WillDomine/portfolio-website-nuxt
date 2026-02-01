<script setup>
import { calculateTimeSince } from "~/lib/date";

const { locale } = useI18n();
const experienceYears = calculateTimeSince("2025-05-15");
</script>
<template>
  <section class="relative w-full flex flex-col lg:flex-row lg:items-center">
    <div class="absolute inset-0 -z-10">
      <div
        class="absolute top-[-5%] left-[-10%] w-[60vw] md:w-[40vw] aspect-square bg-primary/20 blur-[60px] md:blur-[10vw] rounded-full">
      </div>
      <div
        class="absolute bottom-[-5%] right-[-10%] w-[50vw] md:w-[35vw] aspect-square bg-primary/10 blur-[60px] md:blur-[10vw] rounded-full">
      </div>
    </div>

    <div
      class="mx-auto w-full max-w-360 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 2xl:gap-20 items-center">
      <div
        class="flex flex-col gap-4 md:gap-6 2xl:gap-8 text-center lg:text-left items-center lg:items-start order-2 lg:order-1">
        <span
          class="bg-primary/10 text-primary-text border border-black/5 px-3 py-1 rounded-md font-bold tracking-[0.2em] uppercase text-xs">
          {{ $t("home_section.role") }}
        </span>

        <h1 class="font-black leading-[0.9] tracking-tight text-[clamp(3.5rem,7vw,8rem)]">
          Will <br class="hidden sm:block" />
          <span class="text-primary"> Domine </span>
        </h1>

        <p class="max-w-md md:max-w-xl text-muted-foreground text-base md:text-lg 2xl:text-2xl leading-relaxed">
          <i18n-t keypath="home_section.description" scope="global">
            <template #highPerformance>
              <span class="text-foreground font-semibold">{{
                $t("home_section.high_performance")
              }}</span>
            </template>
          </i18n-t>
        </p>

        <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mt-2">
          <a href="https://www.linkedin.com/in/will-domine/" target="_blank"
            class="px-8 h-12 md:h-14 2xl:h-16 flex items-center justify-center gap-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-primary/20">
            <Icon name="lucide:linkedin" class="size-5 md:size-6" />
            {{ $t("home_section.connect") }}
          </a>
          <a href="https://www.github.com/WillDomine"
            class="px-8 h-12 md:h-14 2xl:h-16 flex items-center justify-center gap-3 border border-border rounded-2xl font-semibold hover:bg-muted active:scale-95 transition-all">
            <Icon name="lucide:github" class="size-5 md:size-6" />
            {{ $t("home_section.github") }}
          </a>
        </div>

        <div class="grid grid-cols-3 gap-4 md:gap-8 2xl:gap-12 mt-4 2xl:mt-8 w-full lg:w-auto">
          <div class="text-center lg:text-left">
            <p class="text-2xl md:text-3xl 2xl:text-5xl font-black">
              {{
                experienceYears.years < 1 ? experienceYears.months : experienceYears.years }} </p>
                <p class="text-muted-foreground text-[10px] md:text-xs uppercase tracking-wider">
                  {{
                    experienceYears.years < 1 ? $t("home_section.months_exp") : $t("home_section.years_exp") }} </p>
          </div>
          <div class="text-center lg:text-left border-x border-border lg:border-none px-2">
            <p class="text-2xl md:text-3xl 2xl:text-5xl font-black">5+</p>
            <p class="text-muted-foreground text-[10px] md:text-xs uppercase tracking-wider">
              {{ $t("home_section.projects_count") }}
            </p>
          </div>
          <div class="text-center lg:text-left">
            <p class="text-2xl md:text-3xl 2xl:text-5xl font-black">100%</p>
            <p class="text-muted-foreground text-[10px] md:text-xs uppercase tracking-wider">
              {{ $t("home_section.passion") }}
            </p>
          </div>
        </div>
      </div>

      <div class="relative flex justify-center order-1 lg:order-2 w-full">
        <div class="absolute inset-0 flex justify-center items-center">
          <div class="w-[70%] aspect-square bg-primary/20 blur-[50px] md:blur-[80px] rounded-full"></div>
        </div>

        <div
          class="relative bg-background border border-border rounded-3xl md:rounded-4xl p-2 md:p-4 shadow-2xl w-[60%] sm:w-[50%] lg:w-[80%] xl:w-full max-w-sm 2xl:max-w-lg">
          <NuxtImg :src="locale === 'en' ? '/memoji_waving.jpg' : '/memoji_hand_bow.png'
            " preload fetchpriority="high" alt="Will Domine"
            class="w-full aspect-4/5 object-cover rounded-2xl md:rounded-3xl"
            sizes="xs:300px sm:400px md:500px lg:600px" format="webp" quality="100" />
          <div
            class="absolute -bottom-2 -right-2 md:-bottom-6 md:-right-6 bg-primary text-primary-foreground px-3 py-1.5 md:px-6 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-base font-black shadow-xl rotate-3">
            {{ $t("home_section.status") }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>