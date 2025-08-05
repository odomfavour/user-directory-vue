<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-red-600 mb-4">{{ message }}</p>
      <button
        @click="onRetry"
        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Try Again
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  message: string;
  onRetry: () => void;
}>();
</script>
