<script setup lang="ts">
import Button from './ui/button/Button.vue';
import { useIntervalFn } from '@vueuse/core';

const router = useRouter(); 
const route = useRoute();
const { t, locale, setLocale } = useI18n();

const navItems = [
    { name: 'home', href: '#home', icon: 'lucide:home' },
    { name: 'about', href: '#about', icon: 'lucide:user' },
    { name: 'projects', href: '#projects', icon: 'lucide:folder' },
]

const section = ref('home');
const isManualScroll = ref(false);
let observer: IntersectionObserver | null = null;

const startObserver = () => {
    if (observer) observer.disconnect();

    const targets = navItems.map(item => document.getElementById(item.name));
    if (!targets.every(el => el !== null)) return false; 

    observer = new IntersectionObserver((entries) => {
        if(isManualScroll.value) return;

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                section.value = entry.target.id;
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: "-20% 0px -20% 0px"
    });

    targets.forEach(el => {
        if (el && observer) observer.observe(el);
    });

    return true; 
};

const { pause, resume } = useIntervalFn(() => {
    if (startObserver()) pause();
}, 100, { immediate: false });

onMounted(() => {
    if (router.currentRoute.value.hash) {
        const hash = router.currentRoute.value.hash.replace('#', '');
        if (navItems.some(i => i.name === hash)) section.value = hash;
    }
    resume();
});

watch(locale, () => resume());

onUnmounted(() => {
    if (observer) observer.disconnect();
    pause();
});

const handleNavClick = (name: string) => {
    isManualScroll.value = true;
    section.value = name; 
    
    if (typeof history !== 'undefined') {
        history.replaceState(null, '', `#${name}`);
    }
    
    document.getElementById(name)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    setTimeout(() => isManualScroll.value = false, 1000);
}
</script>

<template>
    <header class="h-15 w-full flex items-center justify-center bg-background/90 md:backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 z-50 transition-all duration-500">
        <nav class="w-full max-w-500 mx-auto px-[4vw] flex justify-between">
            <div class="flex space-x-2">
                <Button v-for="item in navItems" :key="item.name" variant="ghost" as-child 
                    :class="[
                        'transition-all duration-300',
                        section === item.name
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'hover:bg-muted'
                    ]">
                    <NuxtLink :to="item.href" :aria-label="t(item.name)" @click="handleNavClick(item.name)" class="flex items-center justify-center">
                        <Icon :name="item.icon" mode="svg" />
                        <span class="hidden md:inline font-semibold">{{ t(item.name) }}</span>
                    </NuxtLink>
                </Button>
            </div>

            <div class="flex items-center space-x-4">
                <div class="flex items-center rounded-full border border-muted bg-muted/50 p-1">
                    <button @click="setLocale('en')" :class="['px-3 py-1 text-xs font-bold transition-all rounded-full',
                        locale === 'en' ? 'bg-primary shadow-sm text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    ]" aria-label="Switch to English">EN</button>
                    <button @click="setLocale('ja')" :class="['px-3 py-1 text-xs font-bold transition-all rounded-full',
                        locale === 'ja' ? 'bg-primary shadow-sm text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    ]" aria-label="Switch to Japanese">JP</button>
                </div>

                <Button variant="default" :aria-label="t('resume')" class="hidden lg:flex w-28 rounded-full font-bold px-6 transition-all duration-300">
                    <Icon name="lucide:file-text" mode="svg" />
                    {{ t('resume') }}
                </Button>
            </div>
        </nav>
    </header>
    <Button variant="default" :aria-label="t('resume')" 
        class="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 lg:hidden font-bold">
        <Icon name="lucide:file-text" class="text-xl" />
    </Button>
</template>