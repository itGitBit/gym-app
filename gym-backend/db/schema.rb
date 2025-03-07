# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_30_182934) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "trainee_workouts", force: :cascade do |t|
    t.bigint "trainee_id", null: false
    t.bigint "workout_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trainee_id"], name: "index_trainee_workouts_on_trainee_id"
    t.index ["workout_id"], name: "index_trainee_workouts_on_workout_id"
  end

  create_table "trainees", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "last_workout_date"
  end

  create_table "trainer_workouts", force: :cascade do |t|
    t.bigint "trainer_id", null: false
    t.bigint "workout_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trainer_id"], name: "index_trainer_workouts_on_trainer_id"
    t.index ["workout_id"], name: "index_trainer_workouts_on_workout_id"
  end

  create_table "trainers", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "workouts", force: :cascade do |t|
    t.date "date"
    t.string "start_time"
    t.integer "duration_in_minutes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "trainee_workouts", "trainees"
  add_foreign_key "trainee_workouts", "workouts"
  add_foreign_key "trainer_workouts", "trainers"
  add_foreign_key "trainer_workouts", "workouts"
end
