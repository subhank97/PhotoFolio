class PostSerializer < ActiveModel::Serializer
  attributes :id, :image, :description, :user_id

end
