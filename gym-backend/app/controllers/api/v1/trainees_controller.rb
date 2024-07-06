module Api
  module V1
    class TraineesController < ApplicationController
      before_action :set_trainee, only: %i[ show update destroy ]

      # GET /trainees
      def index
        if params[:page]
          @trainees = Trainee.page(params[:page]).per(9)
          render json: { trainees: @trainees, total_pages: @trainees.total_pages, current_page: @trainees.current_page }
        else
          @trainees = Trainee.all
          render json: @trainees
        end
      end

      # GET /trainees/1
      def show
        render json: @trainee || { error: response[:error] }, status: response[:status]
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
        if @trainee.destroyed?
          render json: { success: "Trainee deleted successfully" }
        else
          render json: { error: "Failed to delete trainee" }
        end
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
