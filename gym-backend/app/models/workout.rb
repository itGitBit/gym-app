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

def update_with_associations(params)
    Rails.logger.debug { "Params received: #{params.inspect}" }

    if self.update(params.except(:trainee_ids, :trainer_ids))
      Rails.logger.debug { "Update successful. Trainee IDs: #{params[:trainee_ids]}, Trainer IDs: #{params[:trainer_ids]}" }

      if params[:trainee_ids]
        self.trainee_workouts.destroy_all
        params[:trainee_ids].each do |trainee_id|
          self.trainee_workouts.create(trainee_id: trainee_id)
        end
      end
      if params[:trainer_ids]
        self.trainer_workouts.destroy_all
        params[:trainer_ids].each do |trainer_id|
          self.trainer_workouts.create(trainer_id: trainer_id)
        end
      end
      true
    else
      Rails.logger.debug { "Update failed: #{self.errors.full_messages}" }
      false
    end
  end


  def trainee_ids=(ids)
    ids.each do |id|
      self.trainee_workouts.build(trainee_id: id)
    end
  end
end
