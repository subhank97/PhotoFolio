Rails.application.routes.draw do
  resources :users do
    resources :posts, except: [:edit]
    resources :comments, except: [:edit]
  end

  root to: 'sessions#new'

  get '/me', to: 'users#current'
  post '/login', to: "sessions#create"
  delete '/logout', to: 'sessions#destroy'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
