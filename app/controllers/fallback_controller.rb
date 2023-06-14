class FallbackController < ApplicationController
  def index
    Rails.logger.debug "Rendering fallback index page"
    render file: Rails.public_path.join('index.html'), layout: false
  end
end
