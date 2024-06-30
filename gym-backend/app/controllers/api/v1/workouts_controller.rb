module Api
  module V1
    class WorkoutsController < ApplicationController
      before_action :set_workout, only: %i[show update destroy]

      # GET /workouts
      def index
        @workouts = Workout.includes(:trainer_workouts, :trainee_workouts).all
        render json: @workouts.as_json(include: {
                                  trainer_workouts: { include: :trainer },
                                  trainee_workouts: { include: :trainee },
                                })
      end

      # GET /workouts/1
      def show
        render json: @workout
      end

      # POST /workouts
      def create
        @workout = Workout.new(workout_params.except(:trainer_ids, :trainee_ids))
        trainer_ids = workout_params[:trainer_ids]
        trainee_ids = workout_params[:trainee_ids]

        if @workout.save
          create_trainer_workouts(@workout, trainer_ids)
          create_trainee_workouts(@workout, trainee_ids)
          update_last_workout_date(trainee_ids, @workout.date)
          render json: @workout, status: :created, location: url_for([:api, :v1, @workout])
        else
          render json: @workout.errors.full_messages, status: :unprocessable_entity
        end
      end

      # PUT /workouts/1
      def update
        if @workout.update(workout_params.except(:trainer_ids, :trainee_ids))
          @workout.trainer_workouts.destroy_all
          @workout.trainee_workouts.destroy_all
          create_trainer_workouts(@workout, workout_params[:trainer_ids])
          create_trainee_workouts(@workout, workout_params[:trainee_ids])
          update_last_workout_date(workout_params[:trainee_ids], @workout.date)
          render json: @workout
        else
          render json: @workout.errors, status: :unprocessable_entity
        end
      end

      # DELETE /workouts/1
      def destroy
        @workout.destroy
        head :no_content
      end

      # GET /workouts/month/:year/:month
      def month_workouts
        year = params[:year].to_i
        month = params[:month].to_i
        start_date = Date.new(year, month, 1)
        end_date = start_date.end_of_month

        workouts = Workout.where(date: start_date..end_date)
        render json: workouts.as_json(include: {
          trainer_workouts: { include: :trainer },
          trainee_workouts: { include: :trainee },
        })
      end

      private

      def set_workout
        @workout = Workout.find(params[:id])
      end

      def create_trainer_workouts(workout, trainer_ids)
        trainer_ids.each do |trainer_id|
          trainer = Trainer.find_by(id: trainer_id)
          unless trainer
            render json: { error: "Trainer with id #{trainer_id} not found" }, status: :not_found and return
          end
          TrainerWorkout.create!(workout_id: workout.id, trainer_id: trainer_id)
        end
      end

      def create_trainee_workouts(workout, trainee_ids)
        trainee_ids.each do |trainee_id|
          trainee = Trainee.find_by(id: trainee_id)
          unless trainee
            render json: { error: "Trainee with id #{trainee_id} not found" }, status: :not_found and return
          end
          TraineeWorkout.create!(workout_id: workout.id, trainee_id: trainee_id)
        end
      end

      def workout_params
        params.require(:workout).permit(:date, :start_time, :duration_in_minutes, trainer_ids: [], trainee_ids: [])
      end

      def update_last_workout_date(trainee_ids, workout_date)
        trainee_ids.each do |trainee_id|
          trainee = Trainee.find(trainee_id)
          if trainee.last_workout_date.nil? || trainee.last_workout_date < workout_date
            trainee.update(last_workout_date: workout_date)
          end
        end
      end
    end
  end
end
