<template>
  <section class="px-5 py-10">
    <!-- Hero Section -->
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-4xl font-bold">
        Welcome to Our Company
      </h1>

      <p class="mb-5 text-lg text-gray-600">
        We help businesses grow with modern web solutions.
      </p>

      <router-link
        to="/contact"
        class="inline-block rounded bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700"
      >
        Contact Us
      </router-link>
    </div>

    <!-- Features Section -->
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-md border border-gray-300 p-5 text-center">
        <h2 class="mb-2 text-xl font-semibold">Reliable</h2>
        <p class="text-gray-600">Trusted solutions for your business.</p>
      </div>

      <div class="rounded-md border border-gray-300 p-5 text-center">
        <h2 class="mb-2 text-xl font-semibold">Modern</h2>
        <p class="text-gray-600">Built using the latest technologies.</p>
      </div>

      <div class="rounded-md border border-gray-300 p-5 text-center">
        <h2 class="mb-2 text-xl font-semibold">Support</h2>
        <p class="text-gray-600">We provide continuous customer support.</p>
      </div>
    </div>
  </section>
 
  <section class="relative w-full overflow-hidden">
    <!-- Slider wrapper -->
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <!-- Slides -->
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="min-w-full h-[400px] flex items-center justify-center bg-gray-800 text-white"
      >
        <div class="text-center px-4">
          <h1 class="text-4xl font-bold mb-4">
            {{ slide.title }}
          </h1>
          <p class="text-lg mb-6">
            {{ slide.description }}
          </p>
          <router-link
            to="/contact"
            class="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700"
          >
            Contact Us
          </router-link>
        </div>
      </div>
    </div>

    <!-- Previous Button -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded"
    >
      ‹
    </button>

    <!-- Next Button -->
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded"
    >
      ›
    </button>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full"
        :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"
      ></button>
    </div>
  </section>

</template>
 <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

const slides = [
  {
    title: 'Welcome to Our Company',
    description: 'We build modern and scalable web solutions.'
  },
  {
    title: 'Professional Services',
    description: 'High-quality services tailored for your business.'
  },
  {
    title: 'Grow Your Business',
    description: 'Let us help you achieve your goals.'
  }
]

const currentSlide = ref(0)
let interval = null

function nextSlide() {
  currentSlide.value =
    (currentSlide.value + 1) % slides.length
}

function prevSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + slides.length) % slides.length
}

function goToSlide(index) {
  currentSlide.value = index
}

// Auto slide
onMounted(() => {
  interval = setInterval(nextSlide, 4000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>