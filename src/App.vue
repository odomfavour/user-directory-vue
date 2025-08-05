<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <Header v-model:viewMode="viewMode" @changeView="setViewMode" />

    <div class="max-w-7xl mx-auto px-4 py-8">
      <div
        class="flex md:flex-row flex-col-reverse gap-4 justify-between mb-5 items-center"
      >
        <p class="text-gray-600">
          {{
            filteredUsers.length === 0
              ? "No users found"
              : `Showing ${start}–${end} of ${FAKE_TOTAL_USERS} users`
          }}
        </p>

        <div class="relative w-64">
          <SearchIcon
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
          />
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search by name..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white"
          />
        </div>
      </div>

      <div v-if="isLoading">
        <Loader />
      </div>

      <ErrorView
        v-else-if="isError"
        :message="error?.message || 'Something went wrong'"
        @retry="refetch"
      />

      <div v-else>
        <div v-if="filteredUsers.length === 0" class="text-center py-12">
          <UserIcon class="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500 text-lg">No users match your search</p>
        </div>
        <UserGrid
          v-else-if="viewMode === 'grid'"
          :filteredUsers="filteredUsers"
          :openModal="openModal"
        />
        <UserTable v-else :users="filteredUsers" @rowClick="openModal" />
        <Pagination
          :usersPerPage="usersPerPage"
          :currentPage="currentPage"
          :totalPages="totalPages"
          @update:usersPerPage="setUsersPerPage"
          @update:currentPage="setCurrentPage"
          @changePage="handlePageChange"
        />
      </div>
    </div>

    <Modal
      v-if="selectedUser"
      :isOpen="true"
      title="User Details"
      @close="closeModal"
    >
      <UserDetails :selectedUser="selectedUser" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import Loader from "@/components/Loader.vue";
import ErrorView from "@/components/ErrorView.vue";
import Header from "@/components/Header.vue";
import UserGrid from "@/components/UserGrid.vue";
import UserTable from "@/components/UserTable.vue";
import Pagination from "@/components/Pagination.vue";
import Modal from "@/components/Modal.vue";
import UserDetails from "@/components/UserDetails.vue";

import { Search as SearchIcon, User as UserIcon } from "lucide-vue-next";

const FAKE_TOTAL_USERS = 45;

type RandomUser = {
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

const searchTerm = ref("");
const selectedUser = ref<RandomUser | null>(null);
const viewMode = ref<"grid" | "table">("grid");
const currentPage = ref(1);
const usersPerPage = ref(9);

const start = computed(() => (currentPage.value - 1) * usersPerPage.value + 1);
const end = computed(() =>
  Math.min(currentPage.value * usersPerPage.value, FAKE_TOTAL_USERS)
);
const totalPages = computed(() =>
  Math.ceil(FAKE_TOTAL_USERS / usersPerPage.value)
);

const fetchUsers = async () => {
  const res = await fetch(
    `https://randomuser.me/api/?results=${usersPerPage.value}&page=${currentPage.value}`
  );
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data.results as RandomUser[];
};

const {
  data: users = ref<RandomUser[]>([]),
  isLoading,
  isError,
  error,
  refetch,
} = useQuery({
  queryKey: ["users", currentPage, usersPerPage],
  queryFn: fetchUsers,
  placeholderData: () => [],
});

const filteredUsers = computed(() =>
  (users.value || []).filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(searchTerm.value.toLowerCase());
  })
);

const openModal = (user: RandomUser) => {
  selectedUser.value = user;
};
const closeModal = () => {
  selectedUser.value = null;
};
const setViewMode = (mode: "grid" | "table") => {
  viewMode.value = mode;
};
const setUsersPerPage = (val: number) => {
  usersPerPage.value = val;
};

const setCurrentPage = (val: number) => {
  currentPage.value = val;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};
</script>
