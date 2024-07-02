import { createRouter, createWebHistory } from "vue-router";
import TrainerDashboard from "../components/Trainer/TrainerDashboard/TrainerDashboard.vue";
import Home from "../components/Home/Home.vue";
import TrainerLogin from "../components/Trainer/TrainerLogin/TrainerLogin.vue";
import CreateWorkout from "../components/Workouts/CreateWorkout/CreateWorkout.vue";
import ViewWorkouts from "../components/Workouts/ViewWorkouts/ViewWorkouts.vue";
import UpdateTrainer from "../components/Trainer/UpdateTrainer/UpdateTrainer.vue";
import TraineesPage from "../components/Trainee/TraineesPage/TraineesPage.vue";
import CreateTrainee from "../components/Trainee/CreateTrainee/CreateTrainee.vue";
import TraineeLogin from "../components/Trainee/TraineeLogin/TraineeLogin.vue";
import TraineeDashboard from "../components/Trainee/TraineeDashboard/TraineeDashboard.vue";
import TraineeEdit from "../components/Trainee/TraineeEdit/TraineeEdit.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/trainer-login",
    name: "TrainerLogin",
    component: TrainerLogin,
  },
  {
    path: "/trainer-dashboard",
    name: "TrainerDashboard",
    component: TrainerDashboard,
  },
  {
    path: "/create-workout",
    name: "CreateWorkout",
    component: CreateWorkout,
  },
  {
    path: "/workouts",
    name: "Workouts",
    component: ViewWorkouts,
  },
  {
    path: "/update-trainer",
    name: "UpdateTrainer",
    component: UpdateTrainer,
  },
  {
    path: "/trainees",
    name: "Trainees",
    component: TraineesPage,
  },
  {
    path:'/add-trainee',
    name:'AddTrainee',
    component: CreateTrainee
  },
  {
    path: '/trainee-login',
    name: 'TraineeLogin',
    component: TraineeLogin
  },
  {
    path: '/trainee-dashboard',
    name: 'TraineeDashboard',
    component: TraineeDashboard
  },
  {
    path: '/trainee-edit/:traineeId',
    name: 'TraineeEdit',
    component: TraineeEdit
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
