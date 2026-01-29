<script setup lang="ts">
import Button from './ui/button/Button.vue';
import { Home, Folder, Code, BriefcaseBusiness, User } from 'lucide-vue-next';

const { t, locale, setLocale } = useI18n();

const navItems = [
    { name: 'home', href: '#', icon: Home },
    { name: 'about', href: '#about', icon: User },
    { name: 'projects', href: '#projects', icon: Folder },
    { name: 'experience', href: '#experience', icon: BriefcaseBusiness },
    { name: 'skills', href: '#skills', icon: Code },
]

const section = ref('home');
</script>

<template>
    <header
        class="h-15 w-full flex items-center justify-center bg-background/90 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 z-50 transition-all duration-500">
        <nav class="w-full px-6 flex justify-between">
            <div class="flex space-x-2">
                <Button v-for="item in navItems" :key="item.name" variant="ghost" as-child @click="section = item.name" class="hover:bg-primary">
                    <NuxtLink :to="item.href" class="flex items-center">
                        <component :is="item.icon" class="h-4 w-4" />
                        <span class="hidden sm:inline">{{ t(item.name) }}</span>
                    </NuxtLink>
                </Button>
            </div>

            <div class="flex items-center space-x-4">
                <div class="flex items-center rounded-full border border-input bg-muted/50 p-1">
                    <button @click="setLocale('en')" :class="['px-3 py-1 text-xs font-bold transition-all rounded-full',
                        locale === 'en' ? 'bg-primary shadow-sm text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    ]">EN</button>
                    <button @click="setLocale('ja')" :class="['px-3 py-1 text-xs font-bold transition-all rounded-full',
                        locale === 'ja' ? 'bg-primary shadow-sm text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    ]">JP</button>
                </div>

                <Button variant="default" class="hidden lg:flex rounded-full w-28 px-6 transition-all duration-300">
                    {{ t('contact') }}
                </Button>
            </div>
        </nav>
    </header>
</template>