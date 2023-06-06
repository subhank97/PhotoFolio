class RemoveImageFromPosts < ActiveRecord::Migration[6.1]
  def change
    remove_column :posts, :image, :string
  end
end
