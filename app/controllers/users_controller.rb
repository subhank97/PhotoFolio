class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:current]

  def index
    Rails.logger.debug "Fetching all users"
    render json: User.all, only: [:id, :username], status: :ok
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
