import { createRouter, createWebHistory } from "vue-router"

import homeView from "@/home"
import searchView from "@/search"
import movieView from "@/movie"
import movieCollection from "@/movieCollection"
import notFound404 from "@/notFound404"

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: {name: "home"},
    },
    {
      path: "/main",
      name: "home",
      alias: "/kinder/main",
      component: homeView,
      meta: {
        footer_active: true,
      }
    },
    {
      path: "/search",
      name: "search",
      alias: "/kinder/search",
      component: searchView,
      meta: {
        footer_active: false,
      }
    },
    {
      path: "/collection",
      name: "movieCollection",
      alias: "/kinder/collection",
      component: movieCollection,
      meta: {
        footer_active: true,
      }
    },
    {
      path: "/movie/:id",
      name: "movie",
      alias: "/kinder/movie/:id",
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