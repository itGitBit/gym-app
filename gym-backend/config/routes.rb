Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :workouts, only: [:index, :show, :create, :update, :destroy]
      resources :trainers, only: [:index, :show, :create, :update, :destroy]
      resources :trainees, only: [:index, :show, :create, :update, :destroy]
      resources :trainee_workouts, only: [:index, :show, :create, :update, :destroy]
      resources :trainer_workouts, only: [:index, :show, :create, :update, :destroy]
      get "workouts/month/:year/:month", to: "workouts#month_workouts"
    end
  end

  root to: "home#index"

  get "up" => "rails/health#show", as: :rails_health_check


end
