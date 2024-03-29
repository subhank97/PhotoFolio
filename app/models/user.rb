class User < ApplicationRecord
  devise :database_authenticatable, :timeoutable, :registerable,
         :recoverable, authentication_keys: [:username]

  has_many :posts
  has_many :comments

  validates :username, presence: true

end
