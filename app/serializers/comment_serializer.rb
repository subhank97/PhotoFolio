class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :post_id

  belongs_to :post
  belongs_to :user
end
