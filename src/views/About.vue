<template>
  <section class="mx-auto my-12 max-w-5xl px-5">
    <!-- Header -->
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-4xl font-bold tracking-tight">
        About Our Company
      </h1>
      <p class="mx-auto max-w-2xl text-lg text-gray-600">
        We build innovative digital solutions that help businesses grow,
        scale, and succeed in a competitive world.
      </p>
    </div>

    <!-- Content Grid -->
    <div class="grid gap-10 md:grid-cols-2">
      <!-- Left Content -->
      <div class="space-y-5">
        <h2 class="text-2xl font-semibold">
          Who We Are
        </h2>

        <p class="leading-relaxed text-gray-700">
          We are a professional technology-driven company focused on delivering
          high-quality web and software solutions tailored to our clients’
          needs. Our team combines creativity, technical expertise, and
          strategic thinking to deliver impactful results.
        </p>

        <p class="leading-relaxed text-gray-700">
          With years of experience in modern technologies, we help startups,
          enterprises, and growing businesses build reliable digital products
          that users love.
        </p>
      </div>

      <!-- Right Content (Stats / Highlights) -->
      <div class="grid gap-6 sm:grid-cols-2">
        <div class="rounded-lg border bg-white p-6 shadow-sm">
          <h3 class="mb-2 text-3xl font-bold text-blue-600">
            10+
          </h3>
          <p class="text-gray-600">
            Years of Experience
          </p>
        </div>

        <div class="rounded-lg border bg-white p-6 shadow-sm">
          <h3 class="mb-2 text-3xl font-bold text-blue-600">
            100+
          </h3>
          <p class="text-gray-600">
            Projects Delivered
          </p>
        </div>

        <div class="rounded-lg border bg-white p-6 shadow-sm">
          <h3 class="mb-2 text-3xl font-bold text-blue-600">
            50+
          </h3>
          <p class="text-gray-600">
            Happy Clients
          </p>
        </div>

        <div class="rounded-lg border bg-white p-6 shadow-sm">
          <h3 class="mb-2 text-3xl font-bold text-blue-600">
            24/7
          </h3>
          <p class="text-gray-600">
            Customer Support
          </p>
        </div>
      </div>
    </div>

    <!-- Mission & Vision -->
    <div class="mt-16 grid gap-10 md:grid-cols-2">
      <div class="rounded-lg bg-gray-100 p-8">
        <h2 class="mb-3 text-2xl font-semibold">
          Our Mission
        </h2>
        <p class="leading-relaxed text-gray-700">
          Our mission is to empower businesses with innovative technology
          solutions that drive growth, efficiency, and long-term success.
        </p>
      </div>

      <div class="rounded-lg bg-gray-100 p-8">
        <h2 class="mb-3 text-2xl font-semibold">
          Our Vision
        </h2>
        <p class="leading-relaxed text-gray-700">
          We envision a future where technology seamlessly connects businesses
          with their customers through smart, scalable, and user-friendly
          digital experiences.
        </p>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="mt-16 text-center">
      <h2 class="mb-4 text-3xl font-semibold">
        Let’s Build Something Great Together
      </h2>
      <p class="mb-6 text-gray-600">
        Partner with us to turn your ideas into powerful digital solutions.
      </p>

      <router-link
        to="/contact"
        class="inline-block rounded bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Contact Us
      </router-link>
    </div>
  </section>
</template>
