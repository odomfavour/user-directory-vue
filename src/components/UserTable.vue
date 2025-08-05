<template>
  <div class="overflow-x-auto mb-8">
    <table
      class="min-w-full bg-white border rounded-lg overflow-hidden text-sm"
    >
      <thead class="text-gray-700">
        <tr>
          <th class="text-left p-4">Photo</th>
          <th class="text-left p-4">Name</th>
          <th class="text-left p-4">Email</th>
          <th class="text-left p-4">Location</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="`${user.email}-${index}`"
          @click="handleRowClick(user)"
          class="border-t hover:bg-indigo-50 cursor-pointer"
        >
          <td class="px-4 py-2">
            <img
              :src="user.picture.thumbnail"
              :alt="user.name.first"
              class="h-10 w-10 rounded-full"
            />
          </td>
          <td class="px-4 py-2">{{ user.name.first }} {{ user.name.last }}</td>
          <td class="px-4 py-2">{{ user.email }}</td>
          <td class="px-4 py-2">
            {{ user.location.city }}, {{ user.location.country }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
export type User = {
  name: { title: string; first: string; last: string };
  email: string;
  phone: string;
  picture: { large: string; thumbnail: string };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
  };
  dob: { age: number };
  login: { uuid: string };
};

defineProps<{
  users: User[];
  onRowClick: (user: User) => void;
}>();

const emit = defineEmits<{
  (e: "row-click", user: User): void;
}>();

function handleRowClick(user: User) {
  emit("row-click", user);
}
</script>
