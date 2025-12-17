<template>
  <nav class="bg-gray-900 px-4 py-3">
    <div class="mx-auto flex max-w-7xl items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="text-xl font-bold text-white">
        MyApp
      </router-link>

      <!-- Mobile Menu Button -->
      <button
        @click="isOpen = !isOpen"
        class="text-2xl text-white md:hidden bg-transparent border-none focus:outline-none"
      >
        ☰
      </button>

      <!-- Desktop Menu -->
      <div class="hidden space-x-6 md:flex">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/about">About</router-link>
        <router-link class="nav-link" to="/services">Services</router-link>
        <router-link class="nav-link" to="/contact">Contact</router-link>
        <router-link class="nav-link" to="/login">Login</router-link>
      </div>
    </div>

    <!-- Mobile Sliding Menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-60 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="max-h-60 opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div
        v-if="isOpen"
        class="overflow-hidden md:hidden"
      >
        <div class="mt-4 space-y-3">
          <router-link class="mobile-link" to="/" @click="close">Home</router-link>
          <router-link class="mobile-link" to="/about" @click="close">About</router-link>
          <router-link class="mobile-link" to="/services" @click="close">Services</router-link>
          <router-link class="mobile-link" to="/contact" @click="close">Contact</router-link>
          <router-link class="mobile-link" to="/login" @click="close">Login</router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const close = () => (isOpen.value = false)
</script>

<style scoped>
.nav-link {
  @apply text-white transition hover:text-blue-400;
}

.mobile-link {
  @apply block px-2 text-white transition hover:text-blue-400;
}
</style>
