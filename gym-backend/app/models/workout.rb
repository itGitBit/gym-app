class Workout < ApplicationRecord
  has_many :trainer_workouts, dependent: :destroy
  has_many :trainers, through: :trainer_workouts

  has_many :trainee_workouts, dependent: :destroy
  has_many :trainees, through: :trainee_workouts

  validates :date, presence: true
  validates :start_time, presence: true
  validates :duration_in_minutes, presence: true, numericality: { greater_than: 0, less_than: 181 }

  def update_with_associations(params)
    if self.update(params.except(:trainee_ids, :trainer_ids))
      if !params[:trainee_ids].empty?
        self.trainee_workouts.destroy_all
        params[:trainee_ids].each do |trainee_id|
          self.trainee_workouts.create(trainee_id: trainee_id)
        end
      end
      if !params[:trainer_ids].empty?
        self.trainer_workouts.destroy_all
        params[:trainer_ids].each do |trainer_id|
          self.trainer_workouts.create(trainer_id: trainer_id)
        end
      end
      true
    else
      false
    end
  end

  def self.create_with_associations(date, start_time, duration_in_minutes, trainer_ids, trainee_ids)
    workout = Workout.new(date: date, start_time: start_time, duration_in_minutes: duration_in_minutes)
    if workout.save
      trainer_ids.each do |trainer_id|
        trainer = Trainer.find_by(id: trainer_id)
        unless trainer
          workout.errors.add(:base, "Trainer with id #{trainer_id} not found")
          return workout
        end
        workout.trainer_workouts.create(trainer_id: trainer_id)
      end
      trainee_ids.each do |trainee_id|
        trainee = Trainee.find_by(id: trainee_id)
        unless trainee
          workout.errors.add(:base, "Trainee with id #{trainee_id} not found")
          return workout
        end
        workout.trainee_workouts.create(trainee_id: trainee_id)
        if trainee.last_workout_date.nil? || trainee.last_workout_date < workout.date
          trainee.update(last_workout_date: workout.date)
        end
      end
    end

    workout
  end

  def trainee_ids=(ids)
    ids.each do |id|
      self.trainee_workouts.build(trainee_id: id)
    end
  end
end
