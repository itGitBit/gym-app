class UpdateWorkoutsColumns < ActiveRecord::Migration[7.1]
  def change
    # Change the column type of start_time from time to string
    change_column :workouts, :start_time, :string

    # Rename the column duration to duration_in_minutes
    rename_column :workouts, :duration, :duration_in_minutes
  end
end
