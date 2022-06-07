import { createRouter, createWebHistory } from "vue-router"

import homeView from "@/home"
import searchView from "@/search"
import movieView from "@/movie"
import movieCollection from "@/movieCollection"
import notFound404 from "@/notFound404"

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: homeView,
      meta: {
        footer_active: true,
      }
    },
    {
      path: "/search",
      name: "search",
      component: searchView,
      meta: {
        footer_active: false,
      }
    },
    {
      path: "/movie",
      name: "movieCollection",
      component: movieCollection,
      meta: {
        footer_active: true,
      }
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: movieView,
      meta: {
        footer_active: false,
      }
    },
    {
      path: "/:notFound(.*)",
      component: notFound404,
      meta: {
        footer_active: true,
      }
    }
  ]
})