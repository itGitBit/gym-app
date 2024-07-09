Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "trainees/findbyemail", to: "trainees#find_by_email"
      get "workouts/month/:year/:month", to: "workouts#month_workouts"
      resources :workouts, except: [:new, :edit]
      resources :trainers, except: [:new, :edit]
      resources :trainees, except: [:new, :edit]
      resources :trainer_workouts, except: [:new, :edit]
      resources :trainee_workouts, except: [:new, :edit]
    end
  end

  root to: "home#index"

  get "up" => "rails/health#show", as: :rails_health_check
end
