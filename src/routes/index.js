import { createRouter, createWebHistory } from "vue-router"

import homeView from "@/home"
import searchView from "@/search"
import aboutView from "@/about"
import movieView from "@/movie"
import movieCollection from "@/movieCollection"

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
      path: "/about",
      name: "about",
      component: aboutView,
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
  ]
})