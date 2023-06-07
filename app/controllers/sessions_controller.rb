class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def new
    if current_user
      redirect_to '/me'
    else
      render json: { message: 'Login form' }, status: :ok
    end
  end
  
  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      Rails.logger.debug "User #{user.id} logged in, session id set to #{session[:user_id]}"
      render json: user, status: :created
    else
      Rails.logger.debug "Login failed for username #{params[:username]}"
      render json: { errors: ['Invalid Username or Password'] }, status: :unauthorized
    end
  end

  def destroy
    Rails.logger.debug "User #{session[:user_id]} logged out, clearing session id"
    session.delete(:user_id)
    head :no_content
  end
end
