<template>
  <div class="flex justify-between mt-6 items-center flex-wrap gap-4">
   
    <div class="flex items-center gap-2">
      <label for="perPage" class="text-sm text-gray-700">
        Users per page:
      </label>
      <select
        id="perPage"
        v-model="localUsersPerPage"
        @change="onPerPageChange"
        class="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
      >
        <option v-for="value in [6, 9, 12, 15, 20]" :key="value" :value="value">
          {{ value }}
        </option>
      </select>
    </div>


    <div class="flex justify-center gap-2 flex-wrap">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="handlePageChange(page)"
        class="px-4 py-2 rounded text-sm cursor-pointer"
        :class="
          currentPage === page
            ? 'bg-primary text-white'
            : 'bg-white border text-gray-700 hover:bg-gray-100'
        "
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, watch, ref } from "vue";

const props = defineProps<{
  usersPerPage: number;
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "update:usersPerPage", value: number): void;
  (e: "update:currentPage", value: number): void;
  (e: "changePage", page: number): void;
}>();

const localUsersPerPage = ref(props.usersPerPage);

watch(
  () => props.usersPerPage,
  (newVal) => {
    localUsersPerPage.value = newVal;
  }
);

function onPerPageChange() {
  emit("update:usersPerPage", Number(localUsersPerPage.value));
  emit("update:currentPage", 1);
}

function handlePageChange(page: number) {
  emit("changePage", page);
}
</script>
