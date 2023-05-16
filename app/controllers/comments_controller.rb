class CommentsController < ApplicationController
  skip_before_action :authorize, only: [:create, :destroy]

  # GET /comments
  def index
    @comments = Comment.all
    render json: @comments
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  # POST /comments
  def create
    if current_user.nil?
      render json: { error: 'User not logged in' }, status: :unauthorized
      return
    end

    comment = Comment.create!(comment_params)
    render json: comment, status: :created
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    end
  end

  # DELETE /comments/1
  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    render json: comment
  end

  private

  # Only allow a list of trusted parameters through.
  def comment_params
    params.permit(:user_id, :comment, :item_id)
  end
end