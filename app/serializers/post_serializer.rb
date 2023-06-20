class PostSerializer < ActiveModel::Serializer
  attributes :id, :description, :user_id, :image_url, :user

  def user
    object.user.as_json(only: [:id, :full_name])
  end

  def image_url
    Rails.application.routes.url_helpers.rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end