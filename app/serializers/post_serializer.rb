class PostSerializer < ActiveModel::Serializer
  attributes :id, :description, :user_id, :image_url, :user

  def user
    object.user.as_json(only: [:id, :full_name])
  end
end