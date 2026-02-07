<script setup lang="ts">
import Button from './ui/button/Button.vue'

const router = useRouter()
const route = useRoute()
const { t, locale, setLocale } = useI18n()

const navItems = [
    { name: 'home', href: '#home', icon: 'lucide:home' },
    { name: 'about', href: '#about', icon: 'lucide:user' },
    { name: 'projects', href: '#projects', icon: 'lucide:folder' },
]

const activeSection = ref('home')
const isScrolling = ref(false)
let observer: IntersectionObserver | null = null
let scrollTimeout: NodeJS.Timeout | null = null

// Debounced scroll end detection
const handleScrollEnd = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
        isScrolling.value = false
    }, 150)
}

// Setup intersection observer for automatic section detection
const setupObserver = () => {
    if (observer) observer.disconnect()

    const sections = navItems.map(item => document.getElementById(item.name)).filter(Boolean)

    if (sections.length === 0) return false

    observer = new IntersectionObserver(
        (entries) => {
            // Don't update during manual scrolling
            if (isScrolling.value) return

            // Find the most visible section
            let mostVisible = entries[0]
            entries.forEach(entry => {
                if (entry.intersectionRatio > (mostVisible?.intersectionRatio || 0)) {
                    mostVisible = entry
                }
            })

            if (mostVisible?.isIntersecting) {
                activeSection.value = mostVisible.target.id
                // Update URL without triggering navigation
                if (window.location.hash !== `#${mostVisible.target.id}`) {
                    history.replaceState(null, '', `#${mostVisible.target.id}`)
                }
            }
        },
        {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '-10% 0px -50% 0px'
        }
    )

    sections.forEach(section => {
        if (section) observer!.observe(section)
    })

    return true
}

// Handle navigation clicks
const handleNavClick = (event: Event, name: string) => {
    event.preventDefault()

    isScrolling.value = true
    activeSection.value = name

    const element = document.getElementById(name)
    if (element) {
        const offsetTop = element.offsetTop - 60 // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        })

        // Update URL
        history.replaceState(null, '', `#${name}`)
    }

    // Reset scrolling flag after animation
    setTimeout(() => {
        isScrolling.value = false
    }, 1000)
}

// Initialize on mount
onMounted(() => {
    // Set initial section from URL hash
    const hash = route.hash.replace('#', '')
    if (hash && navItems.some(item => item.name === hash)) {
        activeSection.value = hash

        // Scroll to section after a brief delay to ensure DOM is ready
        setTimeout(() => {
            const element = document.getElementById(hash)
            if (element) {
                const offsetTop = element.offsetTop - 60
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                })
            }
        }, 100)
    }

    // Setup observer with retry logic
    let attempts = 0
    const maxAttempts = 20
    const trySetup = () => {
        if (setupObserver() || attempts >= maxAttempts) {
            return
        }
        attempts++
        setTimeout(trySetup, 100)
    }
    trySetup()

    // Add scroll listener for debouncing
    window.addEventListener('scroll', handleScrollEnd, { passive: true })
})

// Cleanup
onUnmounted(() => {
    if (observer) observer.disconnect()
    if (scrollTimeout) clearTimeout(scrollTimeout)
    window.removeEventListener('scroll', handleScrollEnd)
})

// Re-setup observer when locale changes (DOM might re-render)
watch(locale, () => {
    setTimeout(() => setupObserver(), 300)
})
</script>

<template>
    <header
        class="h-15 w-full flex items-center justify-center bg-background/90 md:backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 z-50 transition-all duration-500">
        <nav class="w-full max-w-500 mx-auto px-[4vw] flex justify-between">
            <div class="flex space-x-2">
                <Button v-for="item in navItems" :key="item.name" variant="ghost" as-child :class="[
                    'transition-all duration-300',
                    activeSection === item.name
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'hover:bg-muted'
                ]">
                    <a :href="item.href" :aria-label="t(item.name)" @click="(e) => handleNavClick(e, item.name)"
                        class="flex items-center justify-center">
                        <Icon :name="item.icon" mode="svg" />
                        <span class="hidden md:inline font-semibold">{{ t(item.name) }}</span>
                    </a>
                </Button>
            </div>

            <div class="flex items-center space-x-4">
                <div class="flex items-center rounded-full border border-muted bg-muted/50 p-1">
                    <button @click="setLocale('en')" :class="[
                        'px-3 py-1 text-xs font-bold transition-all rounded-full',
                        locale === 'en'
                            ? 'bg-primary shadow-sm text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                    ]" aria-label="Switch to English">
                        EN
                    </button>
                    <button @click="setLocale('ja')" :class="[
                        'px-3 py-1 text-xs font-bold transition-all rounded-full',
                        locale === 'ja'
                            ? 'bg-primary shadow-sm text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                    ]" aria-label="Switch to Japanese">
                        JP
                    </button>
                </div>

                <Button variant="default" :aria-label="t('resume')"
                    class="hidden lg:flex w-28 rounded-full font-bold px-6 transition-all duration-300">
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