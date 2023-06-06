class CommentsController < ApplicationController
  def index
    @comments = Comment.all
    render json: @comments, status: :ok
  end

  def show
    comment = Comment.find(params[:id])
    render json: comment, status: :ok
  end

  def create
    comment = current_user.comments.create!(comment_params)
    render json: comment, status: :created
  end

  def update
    comment = current_user.comments.find(params[:id])
    comment.update!(comment_params)
    render json: comment, status: :accepted
  end

  def destroy
    comment = current_user.comments.find(params[:id])
    comment.destroy
    render json: comment, status: :ok
  end

  private

  def comment_params
    params.permit(:comment, :post_id)
  end
end