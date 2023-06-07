class PostsController < ApplicationController
  # before_action :authorize, only: [:create, :update, :destroy]

  def index
    authorize 
    user = User.find(params[:user_id])
    posts = user.posts.map do |post|
      if post.image.attached?
        post.attributes.merge(image_url: post.image_url)
      else
        post.attributes
      end
    end
    render json: posts.to_json(include: :user), status: :ok
  end

  def show
    authorize
    post = Post.find(params[:id])
    if post.image.attached?
      render json: post.attributes.merge(image_url: post.image_url).to_json(include: [:user]), status: :ok
    else
      render json: post.to_json(include: [:user]), status: :ok
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Post not found' }, status: :not_found
  end

  def update
    authorize
    post = current_user.posts.find(params[:id])
    post.update!(post_params)
    render json: post.to_json(include: [:user]), status: :accepted
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Post not found' }, status: :not_found
  rescue ActiveRecord::RecordInvalid
    render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
  end

  def create
    authorize
    post = current_user.posts.create!(post_params)
    render json: post, status: :created
  rescue ActiveRecord::RecordInvalid
    render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
  end

  def destroy
    authorize
    post = current_user.posts.find(params[:id])
    post.destroy
    render json: post, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Post not found' }, status: :not_found
  end

  private

  def post_params
    params.permit(:description).merge(image: params[:image])
  end
end
