class SessionsController < Devise::SessionsController
    respond_to :json
  
    def create
      user = User.find_by(username: params[:user][:username])
    
      if user && user.valid_password?(params[:user][:password])
        sign_in :user, user
        puts "User signed in? #{user_signed_in?}" # Debugging line
        render json: { id: user.id, username: user.username, full_name: user.full_name }
      else
        render json: { success: false, error: "Invalid username or password" }, status: :unauthorized
      end
    end
  
    private
  
    def respond_with(resource, _opts = {})
      render json: resource
    end
  
    def respond_to_on_destroy
      head :no_content
    end
end
