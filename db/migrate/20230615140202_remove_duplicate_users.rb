class RemoveDuplicateUsers < ActiveRecord::Migration[6.0]
  def up
    duplicate_emails = User.group(:email).having('count(email) > 1').pluck(:email)

    duplicate_emails.each do |email|
      users_to_delete = User.where(email: email).order(id: :desc)[1..-1]
      users_to_delete.each(&:destroy)
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end