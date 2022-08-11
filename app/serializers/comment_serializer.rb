class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :post_id

  has_many :posts
  has_many :comments
end
