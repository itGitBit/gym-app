export const validateWorkout = (workout) => {
  if (workout.duration_in_minutes < 1) {
    handleWarningText("Please enter a valid duration.");
    return false;
  }
  if (workout.date === "") {
    handleWarningText("Please enter a valid date.");
    return false;
  }
  if (workout.start_time === "") {
    handleWarningText("Please enter a valid start time.");
    return false;
  }
  if (workout.trainee_ids.length === 0) {
    handleWarningText("Please select at least one trainee.");
    return false;
  }
  if (workout.trainer_ids.length === 0) {
    handleWarningText("Please select at least one trainer.");
    return false;
  }
  return true;
};
