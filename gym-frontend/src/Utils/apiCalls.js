import axios from "axios";

// CRUD WORKOUT

export const createWorkout = async (workout) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/workouts",
      workout,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const deleteWorkout = async (workoutId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/workouts/${workoutId}`
    );
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const getWorkoutById = async (workoutId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/workouts/${workoutId}`
    );
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const updateWorkout = async (workout) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/workouts/${workout.id}`,
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
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

// CRUD TRAINEE

export const updateTrainee = async (trainee) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/trainees/${trainee.id}`,
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
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const traineeLogin = async (email) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/trainees/findbyemail`,
      {
        params: { email: email },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const getTraineeById = async (traineeId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/trainees/${traineeId}`
    );
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const getTrainersWithPagination = async (page = 1) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/trainers`, {
      params: { page: page },
    });
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const getAllTrainers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/trainers`);
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};
export const deleteTrainer = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/trainers/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const deleteTrainee = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/trainees/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const createTrainee = async (trainee) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/trainees",
      trainee,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const createTrainer = async (trainer) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/trainers",
      trainer,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const getTraineesWithPagination = async (page = 1) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/trainees`, {
      params: { page: page },
    });
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const getAllTrainees = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/trainees`);
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const getMonthWorkouts = async (year, month) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/workouts/month/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const getTrainerById = async (trainerId) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/trainers/" + trainerId
    );
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};


export const updateTrainer = async (trainer) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/trainers/${trainer.id}`,
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
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const getAllWorkouts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/workouts");
    return response.data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

const calculateCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};
