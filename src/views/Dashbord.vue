<template>
  <div class="flex  overflow-hidden">
    <!-- Mobile Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 z-40 bg-black/50 md:hidden"
    ></div>

    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 z-50 w-64 bg-gray-800 text-white
             transform transition-transform duration-300
             md:static md:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <h2 class="border-b border-gray-700 p-5 text-xl font-bold">
        Dashboard
      </h2>

      <ul class="p-4 space-y-1">
        <li
          @click="activeTab = 'settings'; isSidebarOpen = false"
          class="cursor-pointer rounded p-2 hover:bg-gray-700"
        >
          ⚙️ Settings
        </li>

        <li
          @click="activeTab = 'listing'; isSidebarOpen = false"
          class="cursor-pointer rounded p-2 hover:bg-gray-700"
        >
          📋 List
        </li>
      </ul>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-4 md:p-8 overflow-y-auto">
      <!-- Header -->
      <div class="mb-4 flex items-center justify-between border-b pb-3">
        <h1 class="text-xl font-semibold">Dashboard</h1>

        <div class="relative">
          <img
            v-if="user.image"
            :src="user.image"
            @click="toggleProfileMenu"
            class="h-10 w-10 cursor-pointer rounded-full border object-cover"
          />

          <div
            v-if="isProfileMenuOpen"
            class="absolute right-0 mt-2 w-56 rounded border bg-white shadow-lg z-50"
          >
            <div class="flex flex-col items-center border-b p-4">
              <img
                :src="user.image"
                class="h-16 w-16 rounded-full border object-cover"
              />
              <p class="mt-2 text-sm font-medium">
                {{ user.username }}
              </p>
            </div>

            <button
              @click="logout"
              class="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <button
        @click="isSidebarOpen = true"
        class="mb-4 rounded bg-gray-800 px-3 py-2 text-white md:hidden"
      >
        ☰ Dashboard Menu
      </button>

      <!-- SETTINGS -->
      <div v-if="activeTab === 'settings'">
        <h2 class="mb-6 text-2xl font-semibold">User Settings</h2>

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
              />
              <button @click.stop="enableUsernameEdit">✏️</button>
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
              />
              <button @click.stop="enablePasswordEdit">✏️</button>
            </div>
          </div>

          <!-- Profile Image -->
          <div>
            <label class="mb-2 block font-medium">Profile Image</label>

            <div class="flex items-center gap-4">
              <img
                v-if="user.image"
                :src="user.image"
                class="h-20 w-20 cursor-pointer rounded-full border object-cover"
                @click="openCropper"
              />

              <input
                type="file"
                accept="image/png, image/jpeg"
                @change="handleImageUpload"
              />
            </div>

            <p v-if="imageError" class="text-sm text-red-600">
              {{ imageError }}
            </p>
          </div>

          <button
            @click="saveSettings"
            :disabled="!canSave"
            class="mt-4 rounded px-5 py-2 text-white"
            :class="canSave ? 'bg-blue-500' : 'bg-gray-400'"
          >
            Save Changes
          </button>

          <p v-if="successMessage" class="text-green-600">
            {{ successMessage }}
          </p>
        </div>
      </div>

      <!-- LISTING -->
      <div v-if="activeTab === 'listing'">
        <h2 class="mb-3 text-2xl font-semibold"> User Listing Page</h2>
        <UserList />
      </div>
    </main>

    <!-- CROPPER MODAL -->
    <div
      v-if="showCropper"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <div class="w-[350px] rounded bg-white p-4">
        <img ref="cropperImage" />

        <div class="mt-4 flex justify-end gap-3">
          <button @click="closeCropper">Cancel</button>
          <button
            class="rounded bg-blue-500 px-4 py-2 text-white"
            @click="cropImage"
          >
            Crop
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue"
import { useRouter } from "vue-router"
import Cropper from "cropperjs"
import "cropperjs/dist/cropper.css"
  import UserList from '../components/UserList.vue'

const router = useRouter()

const activeTab = ref("settings")
const isSidebarOpen = ref(false)
const isProfileMenuOpen = ref(false)
const successMessage = ref("")
const imageError = ref("")

const user = ref({ username: "", password: "", image: "" })

const isEditingUsername = ref(false)
const isEditingPassword = ref(false)

const usernameInput = ref(null)
const passwordInput = ref(null)

const canSave = computed(() =>
  isEditingUsername.value ||
  isEditingPassword.value ||
  !!user.value.image
)

onMounted(() => {
  const u = JSON.parse(localStorage.getItem("loggedInUser"))
  if (u) user.value = { ...u }
})

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

/* CROPPER */
const showCropper = ref(false)
const cropperImage = ref(null)
let cropper = null

const openCropper = () => {
  showCropper.value = true
  nextTick(() => {
    cropperImage.value.src = user.value.image
    cropper = new Cropper(cropperImage.value, {
      aspectRatio: 1,
      viewMode: 1
    })
  })
}

const closeCropper = () => {
  cropper.destroy()
  showCropper.value = false
}

const cropImage = () => {
  const canvas = cropper.getCroppedCanvas({
    width: 300,
    height: 300
  })

  user.value.image = canvas.toDataURL("image/jpeg")
  closeCropper()
}

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    user.value.image = reader.result
    openCropper()
  }
  reader.readAsDataURL(file)
}

const enableUsernameEdit = async () => {
  isEditingUsername.value = true
  await nextTick()
  usernameInput.value.focus()
}

const enablePasswordEdit = async () => {
  isEditingPassword.value = true
  await nextTick()
  passwordInput.value.focus()
}

const saveSettings = () => {
  let users = JSON.parse(localStorage.getItem("users")) || []
  const logged = JSON.parse(localStorage.getItem("loggedInUser"))

  const index = users.findIndex(
    u => u.username === logged.username
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

const logout = () => {
  localStorage.removeItem("loggedInUser")
  router.push("/")
}
</script>
