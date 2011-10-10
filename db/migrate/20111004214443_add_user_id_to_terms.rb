class AddUserIdToTerms < ActiveRecord::Migration
  def self.up
    add_column :terms, :user_id, :integer
  end

  def self.down
    remove_column :terms, :user_id 
  end
end
