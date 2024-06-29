class TraineeWorkout < ApplicationRecord
  belongs_to :trainee
  belongs_to :workout

  validates :trainee_id, presence: true
  validates :workout_id, presence: true
end
