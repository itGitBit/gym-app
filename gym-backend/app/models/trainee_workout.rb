class TraineeWorkout < ApplicationRecord
  belongs_to :trainee
  belongs_to :workout
  validates :trainee_id, :workout_id, presence: true
end
