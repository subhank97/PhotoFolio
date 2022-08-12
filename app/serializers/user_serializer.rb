class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :username, :password

  has_many :posts 
  has_many :comments 
end
