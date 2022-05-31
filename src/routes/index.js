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
    },
    {
      path: "/search",
      name: "search",
      component: searchView,
    },
    {
      path: "/movie",
      name: "movieCollection",
      component: movieCollection,
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: movieView,
    },
    {
      path: "/:notFound(.*)",
      component: notFound404,
    }
  ]
})