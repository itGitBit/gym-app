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
import UpdateWorkout from "../components/Workouts/UpdateWorkout/UpdateWorkout.vue";
import CreateTrainer from "../components/Trainer/CreateTrainer/CreateTrainer.vue";
import TrainersPage from "../components/Trainer/TrainersPage/TrainersPage.vue";
import TrainersNav from "../components/Trainer/TrainerNav/TrainerNav.vue";
import TraineesNav from "../components/Trainee/TraineeNav/TraineeNav.vue";
import path from "path";
import WorkoutsNav from "../components/Workouts/WorkoutsNav/WorkoutsNav.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/trainers",
    name: "TrainerNav",
    component: TrainersNav,
    children: [
      { path: "all", name: "TrainersPage", component: TrainersPage },
      { path: "login", name: "TrainerLogin", component: TrainerLogin },
      { path: "create", name: "CreateTrainer", component: CreateTrainer },
      {
        path: "update/:trainerId",
        name: "UpdateTrainer",
        component: UpdateTrainer,
        props: true,
      },
      {
        path: "dashboard",
        name: "TrainerDashboard",
        component: TrainerDashboard,
      },
    ],
  },
  {
    path: "/workouts",
    name: "WorkoutsNav",
    component: WorkoutsNav,
    children: [
      { path: "all", name: "ViewWorkouts", component: ViewWorkouts },
      { path: "create", name: "CreateWorkout", component: CreateWorkout },
      {
        path: "update/:workoutId",
        name: "UpdateWorkout",
        component: UpdateWorkout,
        props: true,
      },
    ],
  },
  {
    path: "/trainees",
    name: "Trainees",
    component: TraineesNav,
    children: [
      { path: "create", name: "CreateTrainee", component: CreateTrainee },
      {
        path: "update/:traineeId",
        name: "UpdateTrainee",
        component: TraineeEdit,
        props: true,
      },
      { path: "all", name: "TraineesPage", component: TraineesPage },
      { path: "login", name: "TraineeLogin", component: TraineeLogin },
      {
        path: "dashboard",
        name: "TraineeDashboard",
        component: TraineeDashboard,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
