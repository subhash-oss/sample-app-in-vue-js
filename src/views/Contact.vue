<template>
  <section class="max-w-[600px] mx-auto p-4">
    <h1 class="text-center mb-5">Contact Us</h1>

    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="mb-1 block">Name</label>
        <input class="border border-gray-400 w-[22em] md:w-[32em]" v-model="form.name" type="text" required />
      </div>

      <div class="form-group">
        <label class="mb-1 block">Email</label>
        <input class="border border-gray-400 w-[22em] md:w-[32em]" v-model="form.email" type="email" required />
      </div>

      <div class="mb-4">
        <label class="mb-1 block">Message</label>
        <textarea class="border border-gray-400 w-[22em] md:w-[32em]" v-model="form.message" rows="5" required></textarea>
      </div>

      <button type="submit" class="cursor-pointer py-2.5 px-5 border border-gray-400 w-[22em] md:w-[32em]">Send Message</button>
    </form>

    <p v-if="success" class="mx-3 text-green-300">
      ✅ Your message has been sent!
    </p>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const success = ref(false)
function submitForm() {
  console.log('Form data:', form)

  // simulate submit
  success.value = true

  // reset form
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>
