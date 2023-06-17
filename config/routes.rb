Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }
  resources :users, only: [:show]
  resources :posts, except: [:edit]
  resources :comments, except: [:edit]

  root to: 'users#index'
  get "/current", to: "users#current"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
