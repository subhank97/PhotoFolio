class SessionsController < ApplicationController
  skip_before_action :authorize

  def new
    if current_user
      Rails.logger.debug "Current user found, redirecting to '/me'"
      redirect_to '/me'
    else
      Rails.logger.debug "No current user found, rendering login form"
      render json: { message: 'Login form' }, status: :ok
    end
  end

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      Rails.logger.debug "Session data after setting user_id: #{session.to_hash}"
      render json: user, status: :created
    else
      Rails.logger.error "Invalid username or password"
      render json: { errors: ['Invalid username or password'] }, status: :unauthorized
    end
  end

  def destroy
    Rails.logger.debug "Deleting session user_id"
    session.delete(:user_id)
    head :no_content
  end
end
