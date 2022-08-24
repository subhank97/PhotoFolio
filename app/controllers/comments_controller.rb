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
    # Use callbacks to share common setup or constraints between actions.
    # def set_comment
    #   @comment = Comment.find(params[:id])
    # end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.permit(:user_id, :comment, :item_id)
    end
end