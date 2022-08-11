class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :username, :password

  belongs_to :posts 
  belongs_to :user 
end
