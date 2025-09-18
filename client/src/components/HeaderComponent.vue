<script setup></script>

<template>
  <header class="header border-bottom">
    <div class="container py-3">
      <router-link :to="{ name: 'HomePage' }" class="header-logo">
        <div class="d-flex align-items-center gap-3">
          <img
            src="../assets/images/taskman_logo.png"
            alt="Taskman Logo"
            class="img-fluid"
            style="width: 45px; height: 45px"
          />
          <span class="h4 fw-bold mb-0">Taskman</span>
        </div>
      </router-link>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  &-logo {
    text-decoration: none;
  }
}
</style>
