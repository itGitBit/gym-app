export const createWorkout = async (workout) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
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

export const createTrainee = async (trainee) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/trainees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trainee),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error} `);
  }
}

export const getTrainees = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/trainees");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error} `);
  }
};

export const getMonthWorkouts = async (year, month) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/workouts/month/${year}/${month}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`${calculateCurrentTime()} - Error: ${error}`);
  }
};


export const updateTrainer = async (trainer) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/trainers/${trainer.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trainer.name,
          email: trainer.email,
          phone: trainer.phone,
        }),
      }
    );
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
