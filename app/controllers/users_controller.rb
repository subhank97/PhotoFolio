class UsersController < ApplicationController
  def index
    render json: User.all, status: :ok
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find_by(id: session[:user_id])
    if user
      if user.update(user_params_update)
        render json: user, status: :accepted
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end
  
  def show
    if session[:user_id].present?
      user = User.find_by(id: session[:user_id])
      if user
        render json: user.as_json(include: :posts), status: :ok
      else
        render json: { error: 'User not found' }, status: :not_found
      end
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