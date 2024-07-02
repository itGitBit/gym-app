Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "trainees/findbyemail", to: "trainees#find_by_email"
      get "workouts/month/:year/:month", to: "workouts#month_workouts"
      resources :workouts, only: [:index, :show, :create, :update, :destroy]
      resources :trainers, only: [:index, :show, :create, :update, :destroy] do
        collection do
          get "get_with_pagination"
        end
      end
      resources :trainees, only: [:index, :show, :create, :update, :destroy] do
        collection do
          get "get_with_pagination"
        end
      end
      resources :trainee_workouts, only: [:index, :show, :create, :update, :destroy]
      resources :trainer_workouts, only: [:index, :show, :create, :update, :destroy]
    end
  end

  root to: "home#index"

  get "up" => "rails/health#show", as: :rails_health_check
end
