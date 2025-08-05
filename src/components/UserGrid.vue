<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <div
      v-for="(user, index) in filteredUsers"
      :key="`${user.email}-${index}`"
      @click="props.openModal(user)"
      class="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
    >
      <div class="p-6">
        <div
          class="flex md:flex-row flex-col md:items-center items-start space-x-4 mb-4"
        >
          <img
            :src="user.picture.large"
            :alt="user.name.first"
            class="h-16 w-16 rounded-full object-cover border-4 border-indigo-100"
          />
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              {{ user.name.first }} {{ user.name.last }}
            </h3>
            <div class="flex items-center text-gray-500 text-sm mt-1 text-wrap">
              <Mail class="h-4 w-4 mr-1" />
              {{ user.email }}
            </div>
          </div>
        </div>
        <div class="flex items-center text-gray-600 text-sm">
          <MapPin class="h-4 w-4 mr-2" />
          {{ user.location.city }}, {{ user.location.country }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Person } from "@/types/Person";
import { Mail, MapPin } from "lucide-vue-next";


const props = defineProps<{
  filteredUsers: Person[];
  openModal: (user: Person) => void;
}>();
</script>
