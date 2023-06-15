class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: [:show, :update, :destroy]

  def index
    Rails.logger.debug "Fetching all posts for current user: #{current_user.id}"
    posts = current_user.posts.includes(:user)
    render json: posts, include: :user, status: :ok
  end

  def show
    render json: @post, include: :user, status: :ok
  end

  def create
    post = current_user.posts.build(post_params)
    if post.save
      Rails.logger.debug "Created post: #{post.id} for current user: #{current_user.id}"
      render json: post, include: :user, status: :created
    else
      Rails.logger.error "Error creating post: #{post.errors.full_messages}"
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      Rails.logger.debug "Updated post: #{@post.id} for current user: #{current_user.id}"
      render json: @post, include: :user, status: :accepted
    else
      Rails.logger.error "Error updating post: #{@post.errors.full_messages}"
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    Rails.logger.debug "Destroyed post: #{@post.id} for current user: #{current_user.id}"
    head :no_content
  end

  private

  def set_post
    @post = current_user.posts.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    Rails.logger.error "Post not found: #{params[:id]} for current user: #{current_user.id}"
    render json: { error: 'Post not found' }, status: :not_found
  end

  def post_params
    params.require(:post).permit(:description, :image)
  end
end
