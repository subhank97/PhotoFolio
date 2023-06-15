class ClearUsers < ActiveRecord::Migration[6.1]
  def up
    User.destroy_all
  end

  def down
    # No rollback needed
  end
end