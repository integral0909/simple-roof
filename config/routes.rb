Rails.application.routes.draw do
  root 'roofs#index'
  resources :roofs, only: %i(index show create)
end
