import Vue from "vue";
import Router from "vue-router";
import Login from "./views/LoginPage.vue";
import Mail from "./views/mail.vue";
import { AuthService } from "./services/auth.service";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: {
        public: true
      }
    },
    {
      path: "/mail",
      name: "mail",
      component: Mail,
      meta: {
        requiresSuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const loggedIn = !!AuthService.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: "/",
      query: { redirect: to.fullPath } // Store the full path to redirect the user to after login
    });
  }

  next();
});

export default router;
