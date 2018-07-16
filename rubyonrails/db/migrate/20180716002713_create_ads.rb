class CreateAds < ActiveRecord::Migration[5.2]
  def change
    create_table :ads do |t|
      t.references :category, foreign_key: true
      t.string :image_url
      t.string :target_url
      t.text :description
      t.string :title

      t.timestamps
    end
  end
end
