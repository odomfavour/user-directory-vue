<template>
  <div>
    <div class="text-center mb-6">
      <img
        :src="selectedUser?.picture?.large"
        class="h-24 w-24 rounded-full mx-auto border-4 border-indigo-100 mb-4"
        :alt="`${selectedUser?.name.first} ${selectedUser?.name.last}`"
      />
      <h3 class="text-xl font-semibold">
        {{ selectedUser?.name.title }} {{ selectedUser?.name.first }}
        {{ selectedUser?.name.last }}
      </h3>
    </div>

    <div class="space-y-4 text-sm text-gray-600">
      <div class="bg-gray-100 p-3 rounded-lg flex items-center space-x-3">
        <Mail class="text-indigo-600" />
        <div>
          <p>Email</p>
          <p class="font-medium">{{ selectedUser?.email }}</p>
        </div>
      </div>

      <div class="bg-gray-100 p-3 rounded-lg flex items-center space-x-3">
        <MapPin class="text-indigo-600" />
        <div>
          <p>Location</p>
          <p class="font-medium">
            {{ selectedUser?.location.street.number }}
            {{ selectedUser?.location.street.name }},
            {{ selectedUser?.location.city }},
            {{ selectedUser?.location.state }},
            {{ selectedUser?.location.country }},
            {{ selectedUser?.location.postcode }}
          </p>
        </div>
      </div>

      <div class="bg-gray-100 p-3 rounded-lg flex items-center space-x-3">
        <User class="text-indigo-600" />
        <div>
          <p>Phone</p>
          <p class="font-medium">{{ selectedUser?.phone }}</p>
        </div>
      </div>

      <div class="bg-gray-100 p-3 rounded-lg flex items-center space-x-3">
        <User class="text-indigo-600" />
        <div>
          <p>Age</p>
          <p class="font-medium">{{ selectedUser?.dob.age }} years old</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Person } from "@/types/Person";
import { Mail, MapPin, User } from "lucide-vue-next";

interface UserDetailsCardProps {
  selectedUser: Person
}

defineProps<UserDetailsCardProps>();
</script>
