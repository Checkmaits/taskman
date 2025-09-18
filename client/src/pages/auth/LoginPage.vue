<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "../../stores/auth.store.js";

const emailRef = ref("");
const passwordRef = ref("");
const errorRef = ref("");
const loadingRef = ref(false);

const router = useRouter();
const authStore = useAuthStore();

async function handle() {
  if (!emailRef.value || !passwordRef.value) return;

  errorRef.value = "";
  loadingRef.value = true;

  try {
    const response = await axios.post("/auth/login", {
      email: emailRef.value,
      password: passwordRef.value,
    });

    if (response.status === 200) {
      router.replace({ name: "HomePage" });
    }
  } catch (error) {
    errorRef.value = error.response.data.message;
  } finally {
    loadingRef.value = false;
  }
}
</script>

<template>
  <main>
    <div class="login-wrapper">
      <div class="login-wrapper-overlay">
        <div class="login-container bg-white p-5 shadow">
          <div class="d-flex justify-content-center align-items-center gap-3">
            <img
              src="../../assets/images/taskman_logo.png"
              alt="Taskman Logo"
              class="img-fluid"
              style="width: 45px; height: 45px"
            />
            <span class="h3 fw-bold mb-0">Taskman</span>
          </div>
          <div v-if="loadingRef" class="text-center mt-5">
            <div class="spinner spinner-border text-primary"></div>
          </div>
          <form v-else @submit.prevent="handle" class="mt-5">
            <p class="text-center">Log in to your Taskman account to continue</p>
            <div v-if="errorRef" class="alert alert-danger mt-4 mb-0">{{ errorRef }}</div>
            <div class="form-group mt-4">
              <label>Email <span class="text-danger">*</span></label>
              <input
                v-model="emailRef"
                type="text"
                class="form-control bg-light rounded-0"
                placeholder="Enter your email"
                required
              />
            </div>
            <div class="form-group mt-3">
              <label>Password <span class="text-danger">*</span></label>
              <input
                v-model="passwordRef"
                type="password"
                class="form-control bg-light rounded-0"
                placeholder="********"
                required
              />
            </div>
            <button type="submit" class="btn btn-outline-primary rounded-pill w-100 mt-4">Login</button>
          </form>
          <p class="text-center mt-4 mb-0">
            Don't have an account? <router-link :to="{ name: 'RegisterPage' }">Register here</router-link>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use "../../assets/styles/colors" as c;

.login {
  &-wrapper {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: url("../../assets/images/cityscape.gif");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      background-color: rgba(c.$light, 0.95);

      @media (max-width: 768px) {
        padding: 10px;
      }
    }
  }

  &-container {
    position: relative;
    width: 500px;
    margin-top: 10px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 10px;
      background: linear-gradient(to right, c.$primary, c.$secondary);
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
