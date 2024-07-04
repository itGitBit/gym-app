class Trainer < ApplicationRecord
    has_many :trainer_workouts, dependent: :destroy
    has_many :workouts, through: :trainer_workouts


    validates :name, :email, :phone, presence: true
end
