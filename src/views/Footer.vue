<template>
  <footer class="footer">
    <p>© {{ year }} My Company. All rights reserved.</p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  margin-top: 40px;
  padding: 15px;
  text-align: center;
  background: #333;
  color: white;
}
</style>
