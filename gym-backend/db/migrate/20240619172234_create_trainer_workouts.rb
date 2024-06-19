class CreateTrainerWorkouts < ActiveRecord::Migration[7.1]
  def change
    create_table :trainer_workouts do |t|
      t.references :trainer, null: false, foreign_key: true
      t.references :workout, null: false, foreign_key: true

      t.timestamps
    end
  end
end
