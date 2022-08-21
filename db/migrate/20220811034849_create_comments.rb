class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.text :comment
      t.integer :user_id
      t.text :post_id

      t.timestamps
    end
  end
end
