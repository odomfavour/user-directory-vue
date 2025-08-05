<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 cursor-pointer"
    @click="handleOverlayClick"
  >
    <div class="bg-white rounded-2xl max-w-md w-full p-6" @click.stop>
      <div class="flex justify-between items-center mb-6">
        <h2 v-if="title" class="text-2xl font-bold">{{ title }}</h2>
        <button @click="onClose" class="cursor-pointer">
          <LucideX class="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <slot />
      <button
        @click="onClose"
        class="mt-6 w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LucideX } from "lucide-vue-next";
import { defineProps } from "vue";

const props = defineProps<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}>();

function handleOverlayClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    props.onClose();
  }
}
</script>
