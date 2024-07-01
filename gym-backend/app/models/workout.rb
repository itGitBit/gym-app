class Workout < ApplicationRecord
    has_many :trainer_workouts, dependent: :destroy
    has_many :trainers, through: :trainer_workouts
  
    has_many :trainee_workouts, dependent: :destroy
    has_many :trainees, through: :trainee_workouts
  

    def trainer_ids=(ids)
      ids.each do |id|
        self.trainer_workouts.build(trainer_id: id)
      end
    end
  


    def trainee_ids=(ids)
      ids.each do |id|
        self.trainee_workouts.build(trainee_id: id)
      end
    end
  end
  