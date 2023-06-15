class User < ApplicationRecord
  include Devise::Models::DatabaseAuthenticatable

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
       :recoverable, :rememberable, :trackable, :validatable,
       email: false

  attr_accessor :email

  def email=(value)
    self.username = value.split('@').first if value.present?
  end

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
  