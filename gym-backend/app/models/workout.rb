class Workout < ApplicationRecord
    has_many :trainee_workouts
    has_many :trainees, through: :trainee_workouts

    has_many :trainer_workouts
    has_many :trainers, through: :trainer_workouts

    validates :start_time, :duration_in_minutes, :date, presence: true
end
