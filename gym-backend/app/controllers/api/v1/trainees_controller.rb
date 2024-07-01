module Api
  module V1
    class TraineesController < ApplicationController
      before_action :set_trainee, only: %i[ show update destroy ]

      # GET /trainees
      def index
        @trainees = Trainee.all

        render json: @trainees
      end

      # GET /trainees/1
      def show
        render json: @trainee
      end

      # POST /trainees
      def create
        @trainee = Trainee.new(trainee_params)

        if @trainee.save
          render json: @trainee, status: :created, location: api_v1_trainee_path(@trainee)
        else
          render json: @trainee.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /trainees/1
      def update
        if @trainee.update(trainee_params)
          render json: @trainee
        else
          render json: @trainee.errors, status: :unprocessable_entity
        end
      end

      # DELETE /trainees/1
      def destroy
        @trainee.destroy!
      end

      def find_by_email
        response = Trainee.find_by_email_with_response(params[:email])
        render json: response[:trainee] || { error: response[:error] }, status: response[:status]
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_trainee
        @trainee = Trainee.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def trainee_params
        params.require(:trainee).permit(:name, :email, :phone)
      end
    end
  end
end
