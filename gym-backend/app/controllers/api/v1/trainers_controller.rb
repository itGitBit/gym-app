module Api
  module V1
    class TrainersController < ApplicationController
      before_action :set_trainer, only: %i[ show update destroy ]

      # GET /trainers
      def index
        @trainers = Trainer.all

        render json: @trainers
      end

      def get_with_pagination
        @trainers = Trainer.page(params[:page]).per(10)
        render json: { trainers: @trainers, total_pages: @trainers.total_pages, current_page: @trainers.current_page }
      end

      # GET /trainers/1
      def show
        render json: @trainer
      end

      # POST /trainers
      def create
        @trainer = Trainer.new(trainer_params)

        if @trainer.save
          render json: @trainer, status: :created, location: @trainer
        else
          render json: @trainer.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /trainers/1
      def update
        if @trainer.update(trainer_params)
          render json: @trainer
        else
          render json: @trainer.errors, status: :unprocessable_entity
        end
      end

      # DELETE /trainers/1
      def destroy
        @trainer.destroy!
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_trainer
        @trainer = Trainer.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def trainer_params
        params.require(:trainer).permit(:name, :email, :phone)
      end
    end
  end
end
