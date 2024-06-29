module Api
  module V1
    class TrainerWorkoutsController < ApplicationController
      before_action :set_trainer_workout, only: %i[ show update destroy ]

      # GET /trainer_workouts לא מצ'אט ג'יפיטי
      def index
        @trainer_workouts = TrainerWorkout.all

        render json: @trainer_workouts
      end

      # GET /trainer_workouts/id
      def show
        render json: @trainer_workout
      end

      # POST /trainer_workouts
      def create
        @trainer_workout = TrainerWorkout.new(trainer_workout_params)

        if @trainer_workout.save
          render json: @trainer_workout, status: :created, location: @trainer_workout
        else
          render json: @trainer_workout.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /trainer_workouts/id
      def update
        if @trainer_workout.update(trainer_workout_params)
          render json: @trainer_workout
        else
          render json: @trainer_workout.errors, status: :unprocessable_entity
        end
      end

      # DELETE /trainer_workouts/id
      def destroy
        @trainer_workout.destroy!
      end

      def trainer_workout_params
        params.require(:trainer_workout).permit(:trainer_id, :workout_id)
      end
    end
  end
end
