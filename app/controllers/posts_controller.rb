class PostsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

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
    post = current_user.posts.find(params[:id])
    post.update!(post_params)
    render json: post.to_json(include: [:user]), status: :accepted
  end
  
  def create
    post = current_user.posts    .create!(post_params)
    render json: post, status: :created
  end

  def destroy
    post = current_user.posts.find(params[:id])
    post.destroy
    render json: post, status: :ok
  end

  private

  def post_params
    params.permit(:image, :description)
  end
end