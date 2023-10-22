<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    required: true,
  },
  repo: {
    type: String,
    default: '',
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
});

const stars = ref(null);

const fetchStarCount = async (repo) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`);
    const data = await response.json();
    stars.value = data.stargazers_count;
  } catch (error) {
    console.error('Error fetching the star count:', error);
  }
};

onMounted(() => {
  fetchStarCount(props.repo);
})
</script>

<template>
  <a :href="url" target="_blank" class="not-prose flex items-center p-4 bg-white border-gray-200 dark:border-transparent border-2 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
    <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white bg-white rounded-full">
      <span v-if="!icon.startsWith('https://')" class="text-xl text-black font-bold">{{ icon }}</span>
      <img v-else :src="icon" class="w-8 h-8" />
    </div>
    <div class="ml-4">
      <div class="flex items-center justify-start space-x-2">
        <h3 class="text-lg font-medium text-gray-900">
          {{ name }}
        </h3> <!--
        --> <span v-if="repo" class="flex items-center justify-start space-x-1 ps-2 pe-3 py-1 text-xs font-medium text-white bg-gray-600 rounded-full">
          <Icon name="material-symbols:star" class="-mt-0.5" /> <LoadingDots v-if="!stars" /> <span v-else>{{ stars }}</span>
        </span> <!--
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
