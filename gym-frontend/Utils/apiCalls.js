export const createWorkout = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trainer_ids: trainerIds.value,
        date: date.value,
        start_time: startTime.value,
        duration_in_minutes: durationInMinutes.value,
        trainee_ids: traineeIds.value,
      }),
    });
    const data = await response.json();
  } catch (error) {
    console.log(`${calculateCurrentTime} - Error: ${error} `);
  }
};

export const getTrainers = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/trainers");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error} `);
  }
};

export const getTrainees = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/trainees");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error} `);
  }
};

export const getAllWorkouts = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/workouts");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error} `);
  }
};

const calculateCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};
