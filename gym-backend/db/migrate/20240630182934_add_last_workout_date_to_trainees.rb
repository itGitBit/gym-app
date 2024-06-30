class AddLastWorkoutDateToTrainees < ActiveRecord::Migration[7.1]
  def change
    add_column :trainees, :last_workout_date, :date
  end
end
