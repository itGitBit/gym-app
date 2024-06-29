import { createRouter, createWebHistory } from "vue-router";
import TrainerDashboard from "../components/Trainer/TrainerDashboard/TrainerDashboard.vue";
import Home from "../components/Home/Home.vue";
import TrainerLogin from "../components/Trainer/TrainerLogin/TrainerLogin.vue";
import CreateWorkout from "../components/Workouts/CreateWorkout/CreateWorkout.vue";
import ViewWorkouts from "../components/Workouts/ViewWorkouts/ViewWorkouts.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/trainerlogin",
    name: "TrainerLogin",
    component: TrainerLogin,
  },
  {
    path: "/trainerdashboard",
    name: "TrainerDashboard",
    component: TrainerDashboard,
  },
  {
    path: "/createworkout",
    name: "CreateWorkout",
    component: CreateWorkout,
  },
  {
    path: '/workouts',
    name: 'Workouts',
    component: ViewWorkouts,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
