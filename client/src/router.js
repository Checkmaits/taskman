import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/auth/LoginPage.vue";
import RegisterPage from "./pages/auth/RegisterPage.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
];

export default createRouter({ history: createWebHistory(), routes });
