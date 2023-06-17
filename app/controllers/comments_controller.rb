class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_comment, only: [:show, :update, :destroy]

  def index
    Rails.logger.debug "Fetching all comments"
    comments = Comment.all.as_json(include: { user: { only: [:id, :full_name] } })
    render json: comments, status: :ok
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
    if @comment.user_id == current_user.id
      @comment.destroy
      head :no_content
    else
      render json: { error: 'You are not authorized to delete this comment' }, status: :unauthorized
    end
  end

  private

  def set_comment
    @comment = current_user.comments.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    Rails.logger.error "Comment not found: #{params[:id]}"
    render json: { error: 'Comment not found' }, status: :not_found
  end

  def comment_params
    params.require(:comment).permit(:comment, :item_id)
  end
end
