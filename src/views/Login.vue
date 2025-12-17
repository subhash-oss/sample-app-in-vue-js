<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <h2 class="my-4 text-4xl">Login</h2>

    <input
      v-model="username"
      class="m-2 w-[250px] rounded border p-2"
      type="text"
      placeholder="Username"
    />

    <input
      v-model="password"
      class="m-2 w-[250px] rounded border p-2"
      type="password"
      placeholder="Password"
    />

    <button
      @click="login"
      class="mt-4 w-[150px] rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
    >
      Login
    </button>

    <p v-if="errorMessage" class="mt-3 text-red-500">
      {{ errorMessage }}
    </p>

    <!-- Success Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <div class="rounded bg-white p-6 text-center">
        <h3 class="mb-4 text-xl text-green-600">
          Login Successful
        </h3>

        <button
          @click="goDashboard"
          class="rounded bg-blue-500 px-6 py-2 text-white"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const username = ref("")
const password = ref("")
const errorMessage = ref("")
const showModal = ref(false)

/* ✅ INITIALIZE USERS ONLY ONCE */
onMounted(() => {
  if (!localStorage.getItem("users")) {
    const users = [
      { username: "admin", password: "1234" },
      { username: "john", password: "password" }
    ]
    localStorage.setItem("users", JSON.stringify(users))
  }
})

const login = () => {
  errorMessage.value = ""

  const users = JSON.parse(localStorage.getItem("users")) || []

  const user = users.find(
    u => u.username === username.value && u.password === password.value
  )

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user))
    showModal.value = true
  } else {
    errorMessage.value = "Invalid username or password"
  }
}

const goDashboard = () => {
  showModal.value = false
  router.push("/dashbord")
}
</script>
