import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
const baseURL = "http://localhost:3000/api/v1/";

const showErrorToast = (error, defaultMessage) => {
  const message = error.message || defaultMessage;
  toast.error(message);
  console.log(`${calculateCurrentTime()} - Error: ${message}`);
};


// Workouts
export const createWorkout = async (workout) => {
  try {
    const response = await axios.post(`${baseURL}workouts`, workout, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error creating workout");
  }
};

export const getWorkoutById = async (workoutId) => {
  try {
    const response = await axios.get(`${baseURL}workouts/${workoutId}`);
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error fetching workout by ID");
  }
};

export const updateWorkout = async (workout) => {
  try {
    const response = await axios.put(
      `${baseURL}workouts/${workout.id}`,
      {
        workout: {
          date: workout.date,
          start_time: workout.start_time,
          duration_in_minutes: workout.duration_in_minutes,
          trainee_ids: workout.trainee_ids,
          trainer_ids: workout.trainer_ids,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error updating workout");
  }
};

export const deleteWorkout = async (workoutId) => {
  try {
    const response = await axios.delete(`${baseURL}workouts/${workoutId}`);
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error deleting workout");
  }
};

export const getMonthWorkouts = async (year, month) => {
  try {
    const response = await axios.get(`${baseURL}workouts/month/${year}/${month}`);
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error fetching month workouts");
  }
};

export const getAllWorkouts = async () => {
  try {
    const response = await axios.get(`${baseURL}workouts`);
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error fetching all workouts");
  }
};

// Trainees
export const createTrainee = async (trainee) => {
  try {
    const response = await axios.post(`${baseURL}trainees`, trainee, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error creating trainee");
  }
};

export const getTraineeById = async (traineeId) => {
  try {
    const response = await axios.get(`${baseURL}trainees/${traineeId}`);
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error fetching trainee by ID");
  }
};

export const updateTrainee = async (trainee) => {
  try {
    const response = await axios.put(
      `${baseURL}trainees/${trainee.id}`,
      {
        name: trainee.name,
        email: trainee.email,
        phone: trainee.phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error updating trainee");
  }
};

export const deleteTrainee = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}trainees/${id}`);
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error deleting trainee");
  }
};

export const traineeLogin = async (email) => {
  try {
    const response = await axios.get(`${baseURL}trainees/findbyemail`, {
      params: { email: email },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error("User not found");
    } else {
      showErrorToast(error, "An unknown error occurred");
    }
  }
};

export const getTraineesWithPagination = async (page = 1) => {
  try {
    const response = await axios.get(`${baseURL}trainees`, {
      params: { page: page },
    });
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error fetching trainees with pagination");
  }
};

export const getAllTrainees = async () => {
  try {
    const response = await axios.get(`${baseURL}trainees`);
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error fetching all trainees");
  }
};

// Trainers
export const createTrainer = async (trainer) => {
  try {
    const response = await axios.post(`${baseURL}trainers`, trainer, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error creating trainer");
  }
};

export const getTrainerById = async (trainerId) => {
  try {
    const response = await axios.get(`${baseURL}trainers/${trainerId}`);
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error fetching trainer by ID");
  }
};

export const updateTrainer = async (trainer) => {
  try {
    const response = await axios.put(
      `${baseURL}trainers/${trainer.id}`,
      {
        name: trainer.name,
        email: trainer.email,
        phone: trainer.phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error updating trainer");
  }
};

export const deleteTrainer = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}trainers/${id}`);
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error deleting trainer");
  }
};

export const getTrainersWithPagination = async (page = 1) => {
  try {
    const response = await axios.get(`${baseURL}trainers`, {
      params: { page: page },
    });
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error fetching trainers with pagination");
  }
};

export const getAllTrainers = async () => {
  try {
    const response = await axios.get(`${baseURL}trainers`);
    return response.data;
  } catch (error) {
    showErrorToast(error, "Error fetching all trainers");
  }
};
