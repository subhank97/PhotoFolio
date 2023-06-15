class PostSerializer < ActiveModel::Serializer
  attributes :id, :description, :user_id, :image_url

end
