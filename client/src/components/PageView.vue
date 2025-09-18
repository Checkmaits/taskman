<script setup>
import HeaderComponent from "./HeaderComponent.vue";
</script>

<template>
  <HeaderComponent />
  <main>
    <slot></slot>
  </main>
</template>

<style lang="scss" scoped></style>
