class FallbackController < ApplicationController
  def index
    render file: Rails.public_path.join('index.html'), layout: false
  end
end
