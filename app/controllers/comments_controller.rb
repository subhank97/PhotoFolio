class CommentsController < ApplicationController
  before_action :find_comment, only: [:update, :destroy]

  # POST /comments
  def create
    @comment = current_user.comments.create!(comment_params)
    render json: @comment, status: :created
  end

  # PUT /comments/:id
  def update
    @comment.update(comment_params)
    head :no_content
  end

  # DELETE /comments/:id
  def destroy
    @comment.destroy
    head :no_content
  end

  private

  def comment_params
    params.permit(:content, :post_id)
  end

  def find_comment
    @comment = Comment.find(params[:id])
  end
end
