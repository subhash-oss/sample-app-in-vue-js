<template>
  <div class="flex h-[92vh] overflow-hidden">
    <!-- Mobile Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 z-40 bg-black/50 md:hidden"
    ></div>

    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 z-50 h-[92vh] w-64 bg-gray-800 text-white
             transform transition-transform duration-300
             md:static md:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <h2 class="border-b border-gray-700 p-5 text-xl font-bold">
        Dashboard
      </h2>

      <ul class="p-4">
        <li
          @click="activeTab = 'settings'; isSidebarOpen = false"
          class="cursor-pointer rounded p-2 hover:bg-gray-700"
        >
          ⚙️ Settings
        </li>
      </ul>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-4 md:p-8">
      <!-- Mobile Menu Button -->
      <button
        @click="isSidebarOpen = true"
        class="mb-4 rounded bg-gray-800 px-3 py-2 text-white md:hidden"
      >
        ☰ Menu
      </button>

      <div v-if="activeTab === 'settings'">
        <h2 class="mb-6 text-2xl font-semibold">
          User Settings
        </h2>

        <div class="max-w-md space-y-5">
          <!-- Username -->
          <div>
            <label class="mb-1 block font-medium">Username</label>
            <div class="flex items-center gap-2">
              <input
                ref="usernameInput"
                v-model="user.username"
                :readonly="!isEditingUsername"
                class="w-full rounded border p-2"
                :class="!isEditingUsername
                  ? 'cursor-not-allowed bg-gray-100'
                  : 'bg-white'"
                type="text"
              />

              <button
                @click.stop="enableUsernameEdit"
                class="text-blue-500 hover:text-blue-700"
              >
                ✏️
              </button>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="mb-1 block font-medium">Password</label>
            <div class="flex items-center gap-2">
              <input
                ref="passwordInput"
                v-model="user.password"
                :readonly="!isEditingPassword"
                class="w-full rounded border p-2"
                :class="!isEditingPassword
                  ? 'cursor-not-allowed bg-gray-100'
                  : 'bg-white'"
                type="text"
              />

              <button
                @click.stop="enablePasswordEdit"
                class="text-blue-500 hover:text-blue-700"
              >
                ✏️
              </button>
            </div>
          </div>


          <!-- Profile Image -->
          <div>
            <label class="mb-2 block font-medium">Profile Image</label>

            <div class="flex items-center gap-4">
              <img
                v-if="user.image"
                :src="user.image"
                class="h-20 w-20 rounded-full border object-cover"
              />

              <input
                type="file"
                accept="image/png, image/jpeg"
                @change="handleImageUpload"
                class="block w-full text-sm"
              />
            </div>

            <p v-if="imageError" class="mt-1 text-sm text-red-600">
              {{ imageError }}
            </p>
          </div>

          <!-- Save Button -->
          <button
            @click="saveSettings"
            :disabled="!canSave"
            class="mt-4 rounded px-5 py-2 text-white transition"
            :class="canSave
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'cursor-not-allowed bg-gray-400'"
          >
            Save Changes
          </button>

          <p v-if="successMessage" class="mt-3 text-green-600">
            {{ successMessage }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue"

const activeTab = ref("settings")
const successMessage = ref("")
const isSidebarOpen = ref(false)
const imageError = ref("")

const user = ref({
  username: "",
  password: "",
  image: ""
})

const isEditingUsername = ref(false)
const isEditingPassword = ref(false)

const usernameInput = ref(null)
const passwordInput = ref(null)

const canSave = computed(() => {
  return (
    isEditingUsername.value ||
    isEditingPassword.value ||
    !!user.value.image
  )
})

onMounted(() => {
  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"))

  if (loggedInUser) {
    user.value = { ...loggedInUser }
  }
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  imageError.value = ""

  if (!file) return

  if (!["image/png", "image/jpeg"].includes(file.type)) {
    imageError.value = "Only PNG or JPG images are allowed"
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    user.value.image = reader.result
  }
  reader.readAsDataURL(file)
}

const enableUsernameEdit = async () => {
  isEditingUsername.value = true
  successMessage.value = ""
  await nextTick()
  usernameInput.value.focus()
}

const enablePasswordEdit = async () => {
  isEditingPassword.value = true
  successMessage.value = ""
  await nextTick()
  passwordInput.value.focus()
}

const saveSettings = () => {
  if (!canSave.value) return

  let users = JSON.parse(localStorage.getItem("users")) || []
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))

  const index = users.findIndex(
    u => u.username === loggedInUser.username
  )

  if (index !== -1) {
    users[index] = { ...user.value }

    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(user.value)
    )

    successMessage.value = "✅ Settings updated successfully"

    isEditingUsername.value = false
    isEditingPassword.value = false
  }
}
</script>
