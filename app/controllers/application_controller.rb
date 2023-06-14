class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize
  before_action :set_current_user

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

  def authorize
    Rails.logger.info "Authorizing user"
    unless current_user
      Rails.logger.warn "No current user found"
      render json: { error: 'Not Authorized' }, status: 401
    else
      Rails.logger.info "Current user: #{current_user.id}"
    end
  end

  private

  def render_not_found(exception)
    Rails.logger.warn "#{exception.model} not found"
    render json: { error: "#{exception.model} not found" }, status: :not_found
  end

  def render_invalid(exception)
    Rails.logger.warn "Record invalid: #{exception.record.errors.full_messages}"
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def current_user
    @current_user
  end

  def set_current_user
    Rails.logger.debug "Session data: #{session.to_hash}"
    @current_user ||= User.find_by(id: session[:user_id])
    Rails.logger.debug "Current user: #{@current_user}"
  end
end
