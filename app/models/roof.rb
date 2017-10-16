class Roof < ApplicationRecord
  validates :name, :email, presence: true
end
