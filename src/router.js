import { createRouter, createWebHistory } from 'vue-router';

import GamePage from './pages/GamePage.vue';
import GamesPage from './pages/GamesPage.vue';
import LeaderBoardPage from './pages/LeaderboardPage.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import TeamPage from './pages/TeamPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const routes = [
  {
    path: '/game',
    name: 'game',
    component: GamePage,

    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/games",
    name: "games",
    component: GamesPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage
  },
  {
    path: "/team",
    name: "team",
    component: TeamPage,
    meta: {
        requiresAuth: true
    }
  },
  {
    path:"/leaderboard",
    name:"leaderboard",
    component: LeaderBoardPage
  }, 
  {
    path: "/notfound",
    name: "notfound",
    component: NotFoundPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard to check authentication before accessing certain routes
router.beforeEach((to, _, next) => {
  
  if(to.path === '/')
    next({name: 'leaderboard'}); // Redirect to leadboard if the path is root

  else if(!routes.some(route => route.path === to.path)){
    next({ name: 'notfound' }); // If the route is not found, redirect to the error page
  }

  else{
    
    // If the route requires authentication, check if the user is logged in.
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        //if the user is not logged in, redirect to the login page
        next({ name: 'login' });
      } else {
      //if the user is logged in, continue to the requested route
        next();
      }
    } else {
      next();
    }

  }
});

export default router;
