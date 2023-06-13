class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:new, :create]

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
      puts "Session data after setting user_id: #{session.to_hash}"
      render json: user, status: :created
    else
      render json: { errors: ['Invalid username or password'] }, status: :unauthorized
    end
  end

  def destroy
    session.delete(:user_id)
    head :no_content
  end
end
