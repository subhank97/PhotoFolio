class CommentsController < ApplicationController
  before_action :authorize
  before_action :set_comment, only: [:show, :update, :destroy]

  def index
    Rails.logger.debug "Fetching all comments"
    comments = Comment.includes(:user)
    render json: comments, include: :user, status: :ok
  end

  def show
    Rails.logger.debug "Showing comment: #{@comment.id}"
    render json: @comment, include: :user, status: :ok
  end

  def create
    comment = current_user.comments.build(comment_params)
    if comment.save
      Rails.logger.debug "Created comment: #{comment.id}"
      render json: comment, include: :user, status: :created
    else
      Rails.logger.error "Error creating comment: #{comment.errors.full_messages}"
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      Rails.logger.debug "Updated comment: #{@comment.id}"
      render json: @comment, include: :user, status: :accepted
    else
      Rails.logger.error "Error updating comment: #{@comment.errors.full_messages}"
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    Rails.logger.debug "Destroying comment: #{@comment.id}"
    @comment.destroy
    head :no_content
  end

  private

  def set_comment
    @comment = current_user.comments.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    Rails.logger.error "Comment not found: #{params[:id]}"
    render json: { error: 'Comment not found' }, status: :not_found
  end

  def comment_params
    params.require(:comment).permit(:comment, :post_id)
  end
end
