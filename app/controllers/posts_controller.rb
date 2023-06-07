class PostsController < ApplicationController
  before_action :authorize
  before_action :set_post, only: [:show, :update, :destroy]

  def index
    user = User.find(params[:user_id])
    posts = user.posts.includes(:user)
    render json: posts, include: :user, status: :ok
  end

  def show
    render json: @post, include: :user, status: :ok
  end

  def create
    post = current_user.posts.build(post_params)
    if post.save
      render json: post, include: :user, status: :created
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: @post, include: :user, status: :accepted
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    head :no_content
  end

  private

  def set_post
    @post = current_user.posts.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Post not found' }, status: :not_found
  end

  def post_params
    params.require(:post).permit(:description, :image)
  end
end
