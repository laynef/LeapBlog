class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password
      t.string :image_url
      t.string :first_name
      t.string :last_name
      t.string :email_verification_hash

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
