class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :set_current_user
  before_action :authorize

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

  def authorize
    puts "Authorizing user"
    unless current_user
      puts "No current user found"
      render json: { error: 'Not Authorized' }, status: 401
    else
      puts "Current user: #{current_user.id}"
    end
  end

  private

  def render_not_found(exception)
    render json: { error: "#{exception.model} not found" }, status: :not_found
  end

  def render_invalid(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def current_user
    @current_user
  end

  def set_current_user
    puts "Session data: #{session.to_hash}"
    @current_user ||= User.find_by(id: session[:user_id])
  end
  
end
