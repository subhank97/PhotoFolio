class RegistrationsController < Devise::RegistrationsController
  before_action :configure_permitted_parameters, if: :devise_controller?

  def create
    super do |resource|
      if resource.persisted?
        sign_in(resource) # Manually sign in the user
        puts "User signed in? #{user_signed_in?}" # Debugging line
        render json: resource and return # return the serialized User object
      end
    end
  end

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :full_name])
  end
end
