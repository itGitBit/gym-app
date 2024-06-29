Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :workouts, only: [:index, :show, :create, :update, :destroy]
      resources :workouts, only: [:index, :show, :create, :update, :destroy]
      resources :trainers, only: [:index, :show, :create, :update, :destroy]
      resources :trainees, only: [:index, :show, :create, :update, :destroy]
      resources :trainee_workouts, only: [:index, :show, :create, :update, :destroy]
      resources :trainer_workouts, only: [:index, :show, :create, :update, :destroy]
    end
  end

  root to: "home#index"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
