module Api
  module V1
    class TraineeWorkoutsController < ApplicationController
      before_action :set_trainee_workout, only: %i[ show update destroy ]

      # GET /trainee_workouts כל המתאמנים שבאימון
      def index
        @trainee_workouts = TraineeWorkout.all

        render json: @trainee_workouts
      end

      # GET /trainee_workouts/id
      def show
        render json: @trainee_workout
      end

      # POST /trainee_workouts
      def create
        @trainee_workout = TraineeWorkout.new(trainee_workout_params)

        if @trainee_workout.save
          render json: @trainee_workout, status: :created, location: @trainee_workout
        else
          render json: @trainee_workout.errors, status: :unprocessable_entity
        end
      end

      def update
        if @trainee_workout.update(trainee_workout_params)
          render json: @trainee_workout
        else
          render json: @trainee_workout.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @TraineeWorkout.destroy!
      end
      
    end
  end
end
