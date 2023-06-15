class PostsController < ApplicationController
  before_action :find_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    @posts = Post.all
    render json: @posts
  end

  # POST /posts
  def create
    @post = current_user.posts.create!(post_params)
    render json: @post, status: :created
  end

  # GET /posts/:id
  def show
    render json: @post
  end

  # PUT /posts/:id
  def update
    @post.update(post_params)
    head :no_content
  end

  # DELETE /posts/:id
  def destroy
    @post.destroy
    head :no_content
  end

  private

  def post_params
    params.permit(:title, :content)
  end

  def find_post
    @post = Post.find(params[:id])
  end
end
