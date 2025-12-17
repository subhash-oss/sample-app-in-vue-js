<template>
  <div class="p-6">
    <h2 class="mb-4 text-2xl font-semibold">User List</h2>

    <!-- Search Bar -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by username, email, status, or role"
        class="w-full md:w-1/3 rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="border px-4 py-2 text-left">Username</th>
            <th class="border px-4 py-2 text-left">Email</th>
            <th class="border px-4 py-2 text-left">Status</th>
            <th class="border px-4 py-2 text-left">Role</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="hover:bg-gray-50"
          >
            <td class="border px-4 py-2">{{ user.username }}</td>
            <td class="border px-4 py-2">{{ user.email }}</td>
            <td class="border px-4 py-2">
              <span
                :class="user.status === 'Active'
                  ? 'bg-green-600 text-white px-2 py-1 rounded text-sm'
                  : 'bg-red-600 text-white px-2 py-1 rounded text-sm'"
              >
                {{ user.status }}
              </span>
            </td>
            <td class="border px-4 py-2">{{ user.role }}</td>
          </tr>

          <tr v-if="paginatedUsers.length === 0">
            <td colspan="4" class="py-4 text-center text-gray-500">
              No users found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex items-center justify-between">
      <p class="text-sm text-gray-600">
        Page {{ currentPage }} of {{ totalPages }}
      </p>

      <div class="space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="rounded border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="rounded border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"

/* Search */
const searchQuery = ref("")

/* Pagination */
const currentPage = ref(1)
const itemsPerPage = 5

/* User Data */
const users = ref([
  { id: 1, username: "john_doe", email: "john@example.com", status: "Active", role: "Admin" },
  { id: 2, username: "jane_smith", email: "jane@example.com", status: "Inactive", role: "User" },
  { id: 3, username: "mark_taylor", email: "mark@example.com", status: "Active", role: "Editor" },
  { id: 4, username: "sara_lee", email: "sara@example.com", status: "Active", role: "User" },
  { id: 5, username: "robert_k", email: "robert@example.com", status: "Inactive", role: "User" },
  { id: 6, username: "emily_j", email: "emily@example.com", status: "Active", role: "Admin" },
  { id: 7, username: "michael_b", email: "michael@example.com", status: "Active", role: "Editor" },
  { id: 8, username: "olivia_p", email: "olivia@example.com", status: "Inactive", role: "User" },
  { id: 9, username: "daniel_r", email: "daniel@example.com", status: "Active", role: "User" },
  { id: 10, username: "sophia_m", email: "sophia@example.com", status: "Active", role: "Editor" }
])

/* Filtered Users */
const filteredUsers = computed(() => {
  const q = searchQuery.value.toLowerCase()

  return users.value.filter(user =>
    user.username.toLowerCase().includes(q) ||
    user.email.toLowerCase().includes(q) ||
    user.status.toLowerCase().includes(q) ||
    user.role.toLowerCase().includes(q)
  )
})

/* Pagination Logic */
const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage)
)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredUsers.value.slice(start, start + itemsPerPage)
})

/* Reset page on search */
watch(searchQuery, () => {
  currentPage.value = 1
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
</script>
