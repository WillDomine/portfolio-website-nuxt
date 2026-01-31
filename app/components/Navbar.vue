<script setup lang="ts">
import Button from './ui/button/Button.vue';
const { t, locale, setLocale } = useI18n();

const navItems = [
    { name: 'home', href: '#', icon: 'lucide:home' },
    { name: 'about', href: '#about', icon: 'lucide:user' },
    { name: 'projects', href: '#projects', icon: 'lucide:folder' },
    { name: 'experience', href: '#experience', icon: 'lucide:briefcase-business' },
    { name: 'skills', href: '#skills', icon: 'lucide:code' }
]

const section = ref('home');
const isOpen = ref(false)
</script>

<template>
    <header
        class="h-15 w-full flex items-center justify-center bg-background/90 md:backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 z-50 transition-all duration-500">
        <nav class="w-full max-w-500 mx-auto px-[5vw] flex justify-between">
            <div class="flex space-x-2">
                <Button v-for="item in navItems" :key="item.name" variant="ghost" as-child @click="section = item.name"
                    :class="[
                        'transition-all duration-300',
                        section === item.name
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'hover:bg-muted'
                    ]">
                    <NuxtLink :to="item.href" :aria-label="t(item.name)" class="flex items-center justify-center">
                        <Icon :name="item.icon" mode="svg" />
                        <span class="hidden md:inline">{{ t(item.name) }}</span>
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



                <Button variant="default" class="hidden lg:flex rounded-full w-28 px-6 transition-all duration-300">
                    {{ t('contact') }}
                </Button>
            </div>
        </nav>
    </header>
    <Button variant="default" aria-label="contact" class="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 lg:hidden">
        <Icon name="lucide:mail" class="text-xl" />
    </Button>

</template>