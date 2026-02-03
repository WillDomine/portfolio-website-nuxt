<script setup lang="ts">
import { calculateTimeSince } from '~/lib/date';
const age = calculateTimeSince('2005-01-11')
</script>

<template>
    <section
        class="mx-auto w-full max-w-360 px-[4vw] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 2xl:gap-32 items-center"
    >
        <div class="flex flex-col gap-4 lg:gap-6 2xl:gap-8 order-1">
            <div class="space-y-3 2xl:space-y-6">
                <h2 class="text-3xl md:text-4xl 2xl:text-6xl font-black tracking-tight">
                    {{ $t('about_section.title') }}
                </h2>
                <div class="h-1.5 w-20 bg-primary rounded-full"></div>
            </div>

            <div class="space-y-4 text-muted-foreground text-base md:text-lg 2xl:text-xl leading-relaxed">
                <p>
                    <i18n-t keypath="about_section.summary" scope="global">
                        <template #age>
                            <span class="text-foreground font-semibold">{{ age.years }}</span>
                        </template>
                    </i18n-t>
                </p>
            </div>

            <div class="space-y-4">
                <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-primary">{{
                    $t('about_section.achievements_label') }}
                </h3>
                <div class="grid gap-3">
                    <div class="flex gap-4 p-3 md:p-4 rounded-xl border border-border bg-card/30">
                        <Icon name="lucide:zap" class="text-primary size-5 md:size-6 shrink-0" />
                        <div>
                            <p class="font-bold text-foreground text-sm md:text-base">{{ $t('about_section.cpp_project_title') }}</p>
                            <p class="text-xs md:text-sm text-muted-foreground">{{ $t('about_section.cpp_project_desc') }}</p>
                        </div>
                    </div>
                    <div class="flex gap-4 p-3 md:p-4 rounded-xl border border-border bg-card/30">
                        <Icon name="lucide:layers" class="text-primary size-5 md:size-6 shrink-0" />
                        <div>
                            <p class="font-bold text-foreground text-sm md:text-base">{{ $t('about_section.go_project_title') }}</p>
                            <p class="text-xs md:text-sm text-muted-foreground">{{ $t('about_section.go_project_desc') }}</p>
                        </div>
                    </div>
                    <div class="flex gap-4 p-3 md:p-4 rounded-xl border border-border bg-primary/5">
                        <Icon name="lucide:languages" class="text-primary size-5 md:size-6 shrink-0" />
                        <div>
                            <p class="font-bold text-foreground text-sm md:text-base">{{ $t('about_section.lang_title') }}</p>
                            <p class="text-xs md:text-sm text-muted-foreground">{{ $t('about_section.lang_desc') }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-wrap items-center gap-6 pt-4 border-t border-border">
                <div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{{
                        $t('about_section.edu_label') }}</p>
                    <p class="font-bold text-foreground text-sm md:text-base">Computer Science B.S.</p>
                </div>
                <div class="h-8 w-px bg-border hidden sm:block"></div>
                <div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{{
                        $t('about_section.grad_label') }}</p>
                    <p class="font-bold text-primary text-sm md:text-base">{{ $t('about_section.grad_date') }}</p>
                </div>
            </div>
        </div>

        <div class="relative order-2 flex justify-center pb-10 sm:pb-0">
            <div class="absolute inset-0 flex justify-center items-center">
                <div class="w-[80%] aspect-square bg-primary/10 blur-[60px] md:blur-[100px] rounded-full"></div>
            </div>

            <div
                class="relative w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-2xl overflow-hidden group"
            >
                <div class="flex items-center gap-2 mb-6">
                    <div class="size-3 rounded-full bg-destructive/50"></div>
                    <div class="size-3 rounded-full bg-yellow-500/50"></div>
                    <div class="size-3 rounded-full bg-green-500/50"></div>
                    <span class="text-[10px] text-muted-foreground ml-2 font-mono">io_uring_perf.cpp</span>
                </div>

                <div class="font-mono text-xs md:text-sm space-y-2 text-foreground/80">
                    <p><span class="text-primary">void</span> <span class="text-blue-400">handle_io</span>() {</p>
                    <p class="pl-4"><span class="text-muted-foreground">// Achieving 2M+ PPS via bitwise
                            filtering</span></p>
                    <p class="pl-4">struct io_uring_sqe *sqe;</p>
                    <p class="pl-4">sqe = io_uring_get_sqe(&ring);</p>
                    <p class="pl-4">io_uring_prep_read(sqe, fd, buf, ...);</p>
                    <p>}</p>
                </div>

                <div class="mt-8 pt-4 border-t border-border flex justify-between items-center">
                    <div class="flex flex-col">
                        <span class="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Max
                            Throughput</span>
                        <span class="text-xl font-black text-primary">2.0M+ PPS</span>
                    </div>
                    <Icon name="lucide:activity" class="text-primary size-8 opacity-50" />
                </div>
            </div>
        </div>
    </section>
</template>