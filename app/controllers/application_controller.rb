class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :set_current_user
  before_action :authorize

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

  def authorize
    return render json: { error: 'Not authorized' }, status: :unauthorized unless @current_user
  end

  private

  def render_not_found(exception)
    render json: { error: "#{exception.model} not found" }, status: :not_found
  end

  def render_invalid(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def set_current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end
end
