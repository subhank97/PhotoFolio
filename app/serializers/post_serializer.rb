class PostSerializer < ActiveModel::Serializer
  attributes :id, :image, :description, :user_id

  belongs_to :user
  has_many :comments
end
