class PostsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

  def index
    user = User.find(params[:user_id])
    if user == current_user
      posts = user.posts.map do |post|
        post.attributes.merge(image_url: post.image_url)
      end
      render json: posts.to_json(include: :user), status: :ok
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end

  def show
    post = Post.find(params[:id])
    if post.user == current_user
      render json: post.to_json(include: [:user]), status: :ok
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end

  def update
    post = Post.find(params[:id])
    if post.user == current_user
      post.update!(post_params)
      render json: post.to_json(include: [:user]), status: :accepted
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
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
    if post.user == current_user
      post.destroy
      render json: post
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end

  private

  def post_params
    params.permit(:image, :description, :user_id)
  end
end
