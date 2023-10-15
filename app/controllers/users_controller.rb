class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:current]

  def index
    Rails.logger.debug "Fetching all users"
    users = User.all
    render json: users, status: :ok
  end

  def current
    if current_user
      Rails.logger.debug "Current user: #{current_user.id}"
      render json: current_user, status: :ok
    else
      Rails.logger.error "No current user"
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end

  def show
    render json: @user, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  def user_params
    params.permit(:full_name, :username, :password)
  end

  def user_params_update
    params.permit(:image, :description)
  end
end
