<script setup>
defineProps({
    id:String 
})
</script>
<template>
    <section :id="id" class="min-h-dvh w-full md:snap-start scroll-mt-15 flex items-center justify-center">
        <slot />
    </section>
</template>