<template>
  <div class="p-6">
    <h2 class="mb-4 text-2xl font-semibold">User List</h2>

    <!-- Search & Filters -->
    <div class="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
      <input
        v-model="searchQuery"
        placeholder="Search by name, email, status, role"
        class="w-full md:w-1/3 rounded border px-3 py-2"
      />

      <!-- Status Filter -->
      <select
        v-model="statusFilter"
        class="w-full md:w-40 rounded border px-3 py-2"
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <!-- Role Filter -->
      <select
        v-model="roleFilter"
        class="w-full md:w-40 rounded border px-3 py-2"
      >
        <option value="">All Roles</option>
        <option>Admin</option>
        <option>User</option>
        <option>Editor</option>
      </select>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="border px-4 py-2">Profile</th>
            <th class="border px-4 py-2">Username</th>
            <th class="border px-4 py-2">Email</th>
            <th class="border px-4 py-2">Status</th>
            <th class="border px-4 py-2">Role</th>
            <th class="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="hover:bg-gray-50"
          >
            <!-- Profile -->
            <td class="border px-4 py-2">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold"
                :style="{ backgroundColor: getAvatarColor(user.firstName, user.lastName) }"
              >
                {{ getInitials(user.firstName, user.lastName) }}
              </div>
            </td>

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

            <!-- Actions -->
            <td class="border px-4 py-2 text-center space-x-3">
              <button
                @click="openEditModal(user)"
                class="text-blue-600 hover:text-blue-800"
              >
                ✏️
              </button>
              <button
                @click="confirmDelete(user)"
                class="text-red-600 hover:text-red-800"
              >
                🗑️
              </button>
            </td>
          </tr>

          <tr v-if="paginatedUsers.length === 0">
            <td colspan="6" class="py-4 text-center text-gray-500">
              No users found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-between items-center">
      <p class="text-sm">Page {{ currentPage }} of {{ totalPages }}</p>
      <div class="space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="rounded border px-3 py-1 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="rounded border px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    <!-- EDIT MODAL -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div class="w-[400px] rounded bg-white p-6">
        <h3 class="mb-4 text-lg font-semibold">Edit User</h3>

        <div class="space-y-3">
          <input v-model="editUserData.firstName" class="w-full border p-2 rounded" />
          <input v-model="editUserData.lastName" class="w-full border p-2 rounded" />
          <input v-model="editUserData.email" class="w-full border p-2 rounded" />

          <select v-model="editUserData.status" class="w-full border p-2 rounded">
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <select v-model="editUserData.role" class="w-full border p-2 rounded">
            <option>Admin</option>
            <option>User</option>
            <option>Editor</option>
          </select>
        </div>

        <div class="mt-5 flex justify-end gap-3">
          <button @click="showEditModal = false">Cancel</button>
          <button @click="saveEdit" class="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- DELETE MODAL -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div class="w-80 rounded bg-white p-5">
        <h3 class="mb-3 text-lg font-semibold">Confirm Delete</h3>
        <p class="mb-4 text-sm">
          Delete <strong>{{ selectedUser?.username }}</strong>?
        </p>

        <div class="flex justify-end gap-3">
          <button @click="showDeleteModal = false">Cancel</button>
          <button @click="deleteUser" class="bg-red-600 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch } from "vue"

const searchQuery = ref("")
const statusFilter = ref("")
const roleFilter = ref("")
const currentPage = ref(1)
const itemsPerPage = 5

const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedUser = ref(null)
const editUserData = ref({})

const users = ref([
  { id: 1, firstName: "John", lastName: "Doe", username: "john_doe", email: "john@example.com", status: "Active", role: "Admin" },
  { id: 2, firstName: "Jane", lastName: "Smith", username: "jane_smith", email: "jane@example.com", status: "Inactive", role: "User" },
  { id: 3, firstName: "Mark", lastName: "Taylor", username: "mark_taylor", email: "mark@example.com", status: "Active", role: "Editor" },
  { id: 4, firstName: "Sara", lastName: "Lee", username: "sara_lee", email: "sara@example.com", status: "Active", role: "User" },
  { id: 5, firstName: "Robert", lastName: "King", username: "robert_k", email: "robert@example.com", status: "Inactive", role: "User" },
  { id: 6, firstName: "subhash", lastName: "os", username: "subhash_os", email: "subhash@example.com", status: "Active", role: "Admin" },
  { id: 7, firstName: "arya", lastName: "arya", username: "arya", email: "arya@example.com", status: "Inactive", role: "User" },
  { id: 8, firstName: "navin", lastName: "nm", username: "navin_nm", email: "navin@example.com", status: "Active", role: "Editor" },
  { id: 9, firstName: "leo", lastName: "Lkhanee", username: "leo_lkhanee", email: "leo@example.com", status: "Active", role: "User" },
  { id: 10, firstName: "martin", lastName: "paul", username: "martin_paul", email: "martin@example.com", status: "Inactive", role: "User" }
])

const getInitials = (f, l) => `${f[0]}${l[0]}`.toUpperCase()
const getAvatarColor = (f, l) =>
  ["#2563EB", "#16A34A", "#DC2626", "#7C3AED"][
    (f.charCodeAt(0) + l.charCodeAt(0)) % 4
  ]

/* 🔍 Search + Filter */
const filteredUsers = computed(() => {
  return users.value.filter(u => {
    const matchesSearch =
      Object.values(u).some(v =>
        String(v).toLowerCase().includes(searchQuery.value.toLowerCase())
      )

    const matchesStatus =
      !statusFilter.value || u.status === statusFilter.value

    const matchesRole =
      !roleFilter.value || u.role === roleFilter.value

    return matchesSearch && matchesStatus && matchesRole
  })
})

/* Pagination */
const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage)
)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredUsers.value.slice(start, start + itemsPerPage)
})

watch([searchQuery, statusFilter, roleFilter], () => {
  currentPage.value = 1
})

/* Edit */
const openEditModal = (user) => {
  editUserData.value = { ...user }
  showEditModal.value = true
}

const saveEdit = () => {
  const index = users.value.findIndex(u => u.id === editUserData.value.id)
  if (index !== -1) users.value[index] = { ...editUserData.value }
  showEditModal.value = false
}

/* Delete */
const confirmDelete = (user) => {
  selectedUser.value = user
  showDeleteModal.value = true
}

const deleteUser = () => {
  users.value = users.value.filter(u => u.id !== selectedUser.value.id)
  showDeleteModal.value = false
}

/* Pagination controls */
const nextPage = () => currentPage.value < totalPages.value && currentPage.value++
const prevPage = () => currentPage.value > 1 && currentPage.value--
</script>
