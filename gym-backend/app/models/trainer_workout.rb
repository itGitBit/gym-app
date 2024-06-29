class TrainerWorkout < ApplicationRecord
  belongs_to :trainer
  belongs_to :workout

  validates :trainer_id, presence: true
  validates :workout_id, presence: true
end
