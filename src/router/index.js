import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "item.index",
    component: () => import("../views/item/Index.vue"),
  },
  {
    path: "/create",
    name: "item.create",
    component: () => import("../views/item/Create.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
