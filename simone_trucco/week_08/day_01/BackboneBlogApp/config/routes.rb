Rails.application.routes.draw do

  get 'users/app'

  resources :posts
root "pages#app"
get "/app" => "pages#app"

end
