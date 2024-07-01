class Trainee < ApplicationRecord
  has_many :trainee_workouts
  has_many :workouts, through: :trainee_workouts

  validates :name, :email, :phone, presence: true

  def self.find_by_email_with_response(email)
    trainee = find_by(email: email)
    if trainee
      { status: :ok, trainee: trainee }
    else
      { status: :not_found, error: "Trainee not found" }
    end
  end
end
