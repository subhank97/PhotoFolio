class CommentsController < ApplicationController
  def index
    @comments = Comment.all
    render json: @comments, status: :ok
  end

  def show
    comment = Comment.find(params[:id])
    render json: comment, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Comment not found' }, status: :not_found
  end

  def create
    comment = current_user.comments.create!(comment_params)
    render json: comment, status: :created
  rescue ActiveRecord::RecordInvalid
    render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
  end

  def update
    comment = current_user.comments.find(params[:id])
    comment.update!(comment_params)
    render json: comment, status: :accepted
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Comment not found' }, status: :not_found
  rescue ActiveRecord::RecordInvalid
    render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
  end

  def destroy
    comment = current_user.comments.find(params[:id])
    comment.destroy
    render json: comment, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Comment not found' }, status: :not_found
  end

  private

  def comment_params
    params.permit(:comment, :post_id)
  end
end