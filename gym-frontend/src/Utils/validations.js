import { useToast } from "vue-toastification";

const toast = useToast();

export const validateWorkout = (workout) => {
  if (workout.duration_in_minutes < 1) {
    toast.error("Please enter a valid duration.");
    return false;
  }
  if (workout.duration_in_minutes > 180) {
    toast.error("Please enter a duration less than 180 minutes.");
    return false;
  }
  if (workout.date === "") {
    toast.error("Please enter a valid date.");
    return false;
  }
  if (workout.start_time === "") {
    toast.error("Please enter a valid start time.");
    return false;
  }
  if(workout.date < new Date().toISOString().split("T")[0]){
    toast.error("Please enter a valid date.");
    return false;
  }

  return true;
};

export const validateTrainer = (trainer) => {
  if (trainer.name === "" || trainer.email === "" || trainer.phone === "") {
    toast.error("Please fill in all fields");
    return false;
  }
  if (trainer.name.length < 3) {
    toast.error("Name must be at least 3 characters long");
    return false;
  }
  if (trainer.email.length < 3) {
    toast.error("Email must be at least 3 characters long");
    return false;
  }
  if (trainer.phone.length !== 10) {
    toast.error("Phone number must be 10 digits long");
    return false;
  }
  if (!trainer.phone.startsWith("0")) {
    toast.error("Phone number must not start with 0");
    return false;
  }

  return true;
};

export const validateTrainee = (trainee) => {
  if (trainee.name === "" || trainee.email === "" || trainee.phone === "") {
    toast.error("Please fill in all fields");
    return false;
  }
  if (trainee.name.length < 3) {
    toast.error("Name must be at least 3 characters long");
    return false;
  }
  if (trainee.email.length < 3) {
    toast.error("Email must be at least 3 characters long");
    return false;
  }
  if (trainee.phone.length !== 10) {
    toast.error("Phone number must be 10 digits long");
    return false;
  }
  if (!trainee.phone.startsWith("0")) {
    toast.error("Phone number must not start with 0");
    return false;
  }

  return true;
};
