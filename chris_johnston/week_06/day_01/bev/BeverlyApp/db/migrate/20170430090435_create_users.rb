class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.text :firstname
      t.text :lastname
      t.text :username
      t.text :email

      t.timestamps
    end
  end
end
