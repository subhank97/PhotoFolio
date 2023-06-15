class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:create, :current]

  def index
    Rails.logger.debug "Fetching all users"
    render json: User.all, only: [:id, :username], status: :ok
  end

  def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id] = user.id
      Rails.logger.debug "Created user and set session user_id: #{session[:user_id]}"
      render json: user, status: :created
    else
      Rails.logger.error "Error creating user: #{user.errors.full_messages}"
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordInvalid
    render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
  end

  def update
    user = User.find(session[:user_id])
    user.update!(user_params_update)
    Rails.logger.debug "Updated user: #{session[:user_id]}"
    render json: user, status: :accepted
  rescue ActiveRecord::RecordNotFound
    Rails.logger.error "User not found: #{session[:user_id]}"
    render json: { error: 'User not found' }, status: :not_found
  rescue ActiveRecord::RecordInvalid
    Rails.logger.error "Error updating user: #{user.errors.full_messages}"
    render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
  end
  
  def current
    if current_user
      Rails.logger.debug "Showing user: #{current_user.id}"
      render json: current_user, status: :ok
    else
      Rails.logger.error "Not authorized to show user"
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
