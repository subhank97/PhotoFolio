class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, authentication_keys: [:username]

  has_many :posts
  has_many :comments

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { in: Devise.password_length }

end