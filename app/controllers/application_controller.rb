class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::MimeResponds
  respond_to :json
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

  def set_flash_message(key, kind, options = {})
    message = find_message(kind, options)
    flash[key] = message if message.present?
  end

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :full_name])
  end

  def render_not_found(exception)
    Rails.logger.warn "#{exception.model} not found"
    render json: { error: "#{exception.model} not found" }, status: :not_found
  end

  def render_invalid(exception)
    Rails.logger.warn "Record invalid: #{exception.record.errors.full_messages}"
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
