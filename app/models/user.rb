class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, authentication_keys: [:username]

  has_many :posts
  has_many :comments

  validates :username, presence: true
  validates :password, presence: true

end
