class UsersController < ApplicationController
  # skip_before_action :authorize, only: [:create]

  def index
    render json: User.all, status: :ok
  end

  def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    user = User.update!(user_params_update)
    render json: user, status: :accepted
  end
  
  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, status: :created
    else
      render json: {error: "Not Authorized"}, status: :unauthorized
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