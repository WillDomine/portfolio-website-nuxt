<script setup>
defineProps({
    id: String 
})
</script>
<template>
    <section :id="id" class="relative min-h-dvh w-full md:snap-start flex flex-col justify-center py-4 md:py-0 overflow-hidden">
        <slot />
    </section>
</template>