<script setup>
defineProps({
  icon: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <a :href="url" target="_blank" class="not-prose flex items-center p-4 bg-white rounded-lg border-gray border-2 shadow-sm hover:shadow-lg transition duration-300">
    <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white bg-white rounded-full">
      <span v-if="!icon.startsWith('https://')" class="text-xl text-black font-bold">{{ icon }}</span>
      <img v-else :src="icon" class="w-8 h-8" />
    </div>
    <div class="ml-4">
      <div class="flex items-center justify-start space-x-2">
        <h3 class="text-lg font-medium text-gray-900">
          {{ name }}
        </h3> <!--
        --> <ContentSlot :use="$slots.extraTag" /> <!--
        --> <span class="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">
          {{ year }}
        </span>
      </div>
      <p class="text-sm text-gray-500">
        {{ description }}
      </p>
    </div>
  </a>
</template>
