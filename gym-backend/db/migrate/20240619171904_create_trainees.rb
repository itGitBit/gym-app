class CreateTrainees < ActiveRecord::Migration[7.1]
  def change
    create_table :trainees do |t|
      t.string :name
      t.string :email
      t.string :phone

      t.timestamps
    end
  end
end
