<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="mx-auto max-w-6xl px-5 py-12">
      <!-- Top Section -->
      <div class="grid gap-10 md:grid-cols-4">
        <!-- Company -->
        <div>
          <h3 class="mb-4 text-xl font-semibold text-white">
            MyCompany
          </h3>
          <p class="text-sm leading-relaxed">
            We build modern digital solutions that help businesses grow
            and succeed in today’s competitive market.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="mb-4 text-lg font-semibold text-white">
            Quick Links
          </h4>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link to="/" class="hover:text-white">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="hover:text-white">
                About
              </router-link>
            </li>
            <li>
              <router-link to="/services" class="hover:text-white">
                Services
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="hover:text-white">
                Contact
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="mb-4 text-lg font-semibold text-white">
            Services
          </h4>
          <ul class="space-y-2 text-sm">
            <li class="cursor-pointer">Web Development</li>
            <li class="cursor-pointer">Mobile Apps</li>
            <li class="cursor-pointer">UI / UX Design</li>
            <li class="cursor-pointer">Cloud & DevOps</li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="mb-4 text-lg font-semibold text-white">
            Contact
          </h4>
          <ul class="space-y-2 text-sm">
            <li>📍 New York, USA</li>
            <li>📧 contact@mycompany.com</li>
            <li>📞 +1 (234) 567-890</li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="my-8 border-t border-gray-700"></div>

      <!-- Bottom Section -->
      <div class="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
        <p>
          © {{ new Date().getFullYear() }} MyCompany. All rights reserved.
        </p>

        <!-- Social Links -->
        <div class="flex gap-4 text-lg">
          <a href="#" class="hover:text-white">🌐</a>
          <a href="#" class="hover:text-white">🐦</a>
          <a href="#" class="hover:text-white">💼</a>
        </div>
      </div>
    </div>
  </footer>
</template>
