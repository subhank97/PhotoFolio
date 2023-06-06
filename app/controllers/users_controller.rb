class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def index
    render json: User.all, only: [:id, :username], status: :ok
  end

  def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordInvalid
    render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
  end

  def update
    user = User.find(session[:user_id])
    user.update!(user_params_update)
    render json: user, status: :accepted
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  rescue ActiveRecord::RecordInvalid
    render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
  end
  
  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, status: :ok
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:full_name, :username, :password)
  end

  def user_params_update
    params.permit(:image, :description)
  end
end