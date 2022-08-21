class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id

  belongs_to :user
end
