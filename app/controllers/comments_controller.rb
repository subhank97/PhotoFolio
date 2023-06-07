class CommentsController < ApplicationController
  before_action :authorize
  before_action :set_comment, only: [:show, :update, :destroy]

  def index
    comments = Comment.includes(:user)
    render json: comments, include: :user, status: :ok
  end

  def show
    render json: @comment, include: :user, status: :ok
  end

  def create
    comment = current_user.comments.build(comment_params)
    if comment.save
      render json: comment, include: :user, status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment, include: :user, status: :accepted
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    head :no_content
  end

  private

  def set_comment
    @comment = current_user.comments.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Comment not found' }, status: :not_found
  end

  def comment_params
    params.require(:comment).permit(:comment, :post_id)
  end
end
