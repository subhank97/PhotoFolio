class PostsController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def index
    user = User.find(params[:user_id])
    posts = user.posts.map do |post|
      post.attributes.merge(image_url: post.image_url)
    end
    render json: posts.to_json(include: :user), status: :ok
  end
  
  def show
    post = Post.find(params[:id])
    render json: post.to_json(include: [:user]), status: :ok
  end

  def update
    post = Post.find(params[:id])
    post.update!(post_params)
    render json: post.to_json(include: [:user]), status: :accepted
  end
  
  def create
    user = current_user
    if user.nil?
      render json: { error: 'User not logged in' }, status: :unauthorized
      return
    end
    post = user.posts.create!(post_params)
    render json: post, status: :created
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    render json: post
  end

private

def post_params
  params.permit(:image, :description, :user_id)
end


end
