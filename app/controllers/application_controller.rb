class ApplicationController < ActionController::API
  include ActionController::Cookies

rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
before_action :authorize


private

  def render_not_found(invalid)
    render json: {error: "#{invalid.model} not found"}, status: :not_found
  end

  def render_invalid(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include?(:user_id)
  end

end