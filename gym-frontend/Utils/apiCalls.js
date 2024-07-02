import axios from "axios";

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
      `http://localhost:3000/api/v1/workouts/`,
      { params: { workout_id: workoutId } }
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
    const response = await axios.get(`http://localhost:3000/api/v1/trainees/`, {
      params: { trainee_id: traineeId },
    });
    const array = response.data;
    return array.trainees[0];
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};

export const getTrainers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/trainers");
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

export const getTrainees = async (page = 1) => {
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
