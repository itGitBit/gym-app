class Trainee < ApplicationRecord
    has_many :trainee_workouts
    has_many :workouts, through: :trainee_workouts

    validates :name, :email, :phone, presence: true
end
