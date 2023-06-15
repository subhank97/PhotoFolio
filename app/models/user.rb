class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable, email: false

  def email_required?
    false
  end

  def email_changed?
    false
  end
  
  has_many :posts
  has_many :comments

  validates :username, presence: true
end
  