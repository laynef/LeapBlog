class CreateBlogs < ActiveRecord::Migration[5.2]
  def change
    create_table :blogs do |t|
      t.text :text
      t.references :user, foreign_key: true
      t.references :category, foreign_key: true
      t.string :image_url
      t.string :title

      t.timestamps
    end
  end
end
