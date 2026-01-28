<script setup lang="ts">
import ButtonGroup from './ui/button-group/ButtonGroup.vue';
import Button from './ui/button/Button.vue';
const { t, locale, setLocale } = useI18n();
import { Home, Folder, Code, BriefcaseBusiness } from 'lucide-vue-next';
const navItems = [
    { name: 'home', href: '#', icon: Home },
    { name: 'projects', href: '#projects', icon: Folder },
    { name: 'experience', href: '#experience', icon: BriefcaseBusiness },
    { name: 'skills', href: '#skills', icon: Code }
]
const section = ref(t('home'));
</script>

<template>
    <header
        class="h-15 w-screen flex items-center justify-center bg-white/90 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 z-50 opacity-0 md:opacity-100 transition-opacity duration-500">
        <nav class="w-full p-8 flex items-center justify-between">
            <div class="space-x-2">
                <Button v-for="item in navItems" :key="item.name" variant="ghost" as-child
                    @click="section = item.name">
                    <NuxtLink :to="item.href" class="flex items-center">
                        <component :is="item.icon" class="inline-block h-4 w-4" />
                        {{ t(item.name) }}
                    </NuxtLink>
                </Button>
            </div>
            <div class="flex space-x-2">
                <div class="flex items-center rounded-full border border-gray-200 bg-gray-50/50 p-1">
                    <button @click="setLocale('en')" :class="[
                        'px-3 py-1 text-xs font-bold transition-all rounded-full',
                        locale === 'en' ? 'bg-primary shadow-sm text-white' : 'text-gray-500 hover:text-gray-900'
                    ]">
                        EN
                    </button>
                    <button @click="setLocale('jp')" :class="[
                        'px-3 py-1 text-xs font-bold transition-all rounded-full',
                        locale === 'jp' ? 'bg-primary shadow-sm text-white' : 'text-gray-500 hover:text-gray-900'
                    ]">
                        JP
                    </button>
                </div>
                <Button variant="default" class="rounded-full min-w-30 transition-all duration-300">
                    {{ t('contact') }}
                </Button>
            </div>
        </nav>
    </header>
</template>