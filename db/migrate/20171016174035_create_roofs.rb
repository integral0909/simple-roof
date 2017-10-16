class CreateRoofs < ActiveRecord::Migration[5.1]
  def change
    create_table :roofs do |t|
      t.string :name
      t.string :email
      t.string :address
      t.string :latitude
      t.string :longitude
      t.string :area
      t.string :estimation

      t.timestamps
    end
  end
end
