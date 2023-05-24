class PostsController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def index
    if session[:user_id].nil?
      render json: { error: 'Not Authorized' }, status: :unauthorized
    else
      posts = Post.where(user_id: session[:user_id]).map do |post|
        post.attributes.merge(image_url: post.image_url)
      end
      render json: posts.to_json(include: :user), status: :ok
    end
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
    if session.include?(:user_id)
      post = Post.create!(post_params)
      render json: post, status: :created
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
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
