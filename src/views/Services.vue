<template>
  <section class="mx-auto my-14 max-w-6xl px-5">
    <!-- Header -->
    <div class="mb-14 text-center">
      <h1 class="mb-4 text-4xl font-bold tracking-tight">
        Our Services
      </h1>
      <p class="mx-auto max-w-2xl text-lg text-gray-600">
        We provide end-to-end digital solutions designed to help your
        business grow and succeed.
      </p>
    </div>

    <!-- Services Grid -->
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Service Card -->
      <div class="group rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div class="mb-4 text-4xl">🌐</div>
        <h2 class="mb-3 text-xl font-semibold">
          Web Development
        </h2>
        <p class="mb-4 text-gray-600">
          High-performance, secure, and scalable websites built using
          modern frameworks and best practices.
        </p>
        <ul class="space-y-1 text-sm text-gray-500">
          <li>• Vue / React / Angular</li>
          <li>• SEO & Performance</li>
          <li>• Secure Architecture</li>
        </ul>
      </div>

      <div class="group rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div class="mb-4 text-4xl">📱</div>
        <h2 class="mb-3 text-xl font-semibold">
          Mobile Applications
        </h2>
        <p class="mb-4 text-gray-600">
          Cross-platform mobile apps optimized for speed, performance,
          and user experience.
        </p>
        <ul class="space-y-1 text-sm text-gray-500">
          <li>• iOS & Android</li>
          <li>• Flutter / React Native</li>
          <li>• App Store Deployment</li>
        </ul>
      </div>

      <div class="group rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div class="mb-4 text-4xl">🎨</div>
        <h2 class="mb-3 text-xl font-semibold">
          UI / UX Design
        </h2>
        <p class="mb-4 text-gray-600">
          User-centered designs that create meaningful and engaging
          digital experiences.
        </p>
        <ul class="space-y-1 text-sm text-gray-500">
          <li>• Wireframes & Prototypes</li>
          <li>• Design Systems</li>
          <li>• Usability Testing</li>
        </ul>
      </div>

      <div class="group rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div class="mb-4 text-4xl">☁️</div>
        <h2 class="mb-3 text-xl font-semibold">
          Cloud & DevOps
        </h2>
        <p class="mb-4 text-gray-600">
          Reliable cloud infrastructure and CI/CD pipelines to ensure
          scalability and uptime.
        </p>
        <ul class="space-y-1 text-sm text-gray-500">
          <li>• AWS / Azure / GCP</li>
          <li>• CI/CD Automation</li>
          <li>• Monitoring & Security</li>
        </ul>
      </div>

      <div class="group rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div class="mb-4 text-4xl">🔐</div>
        <h2 class="mb-3 text-xl font-semibold">
          Security Solutions
        </h2>
        <p class="mb-4 text-gray-600">
          Protect your digital assets with advanced security audits
          and best practices.
        </p>
        <ul class="space-y-1 text-sm text-gray-500">
          <li>• Penetration Testing</li>
          <li>• Data Protection</li>
          <li>• Compliance</li>
        </ul>
      </div>

      <div class="group rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div class="mb-4 text-4xl">📊</div>
        <h2 class="mb-3 text-xl font-semibold">
          Digital Consulting
        </h2>
        <p class="mb-4 text-gray-600">
          Strategic guidance to help businesses adopt technology and
          optimize digital processes.
        </p>
        <ul class="space-y-1 text-sm text-gray-500">
          <li>• Technology Roadmaps</li>
          <li>• Product Strategy</li>
          <li>• Process Optimization</li>
        </ul>
      </div>
    </div>

    <!-- Why Choose Us -->
    <div class="mt-20 grid gap-10 md:grid-cols-2">
      <div>
        <h2 class="mb-4 text-3xl font-semibold">
          Why Choose Us
        </h2>
        <p class="mb-4 text-gray-600 leading-relaxed">
          We combine technical expertise with business understanding
          to deliver solutions that create real value.
        </p>
        <ul class="space-y-3 text-gray-700">
          <li>✔ Experienced & skilled team</li>
          <li>✔ Modern technology stack</li>
          <li>✔ Transparent communication</li>
          <li>✔ On-time delivery</li>
        </ul>
      </div>

      <!-- CTA Card -->
      <div class="rounded-xl bg-blue-600 p-8 text-white">
        <h3 class="mb-3 text-2xl font-semibold">
          Ready to Start Your Project?
        </h3>
        <p class="mb-6 text-blue-100">
          Let’s discuss your idea and turn it into a powerful digital
          solution.
        </p>
        <router-link
          to="/contact"
          class="inline-block rounded bg-white px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-100"
        >
          Get in Touch
        </router-link>
      </div>
    </div>
  </section>
</template>
