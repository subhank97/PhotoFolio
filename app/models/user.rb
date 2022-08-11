class User < ApplicationRecord
    belongs_to :posts 
    belongs_to :user 
end
