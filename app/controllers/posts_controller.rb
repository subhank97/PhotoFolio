class PostsController < ApplicationController
  before_action :authorize, only: [:create]

  def index
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
    post = Post.find(params[:id])
    if post.image.attached?
      render json: post.attributes.merge(image_url: post.image_url).to_json(include: [:user]), status: :ok
    else
      render json: post.to_json(include: [:user]), status: :ok
    end
  end

  def update
    post = current_user.posts.find(params[:id])
    post.update!(post_params)
    render json: post.to_json(include: [:user]), status: :accepted
  end

  def create
    post = @current_user.posts.create!(post_params)
    render json: post, status: :created
  end

  def destroy
    post = @current_user.posts.find(params[:id])
    post.destroy
    render json: post, status: :ok
  end

  private

  def authorize
    return render json: { error: 'Not authorized' }, status: :unauthorized unless current_user
  end  

  def post_params
    params.permit(:description).merge(image: params[:image])
  end
end
