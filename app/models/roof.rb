class Roof < ApplicationRecord
  FLAT_SLOPE      = 7.89.freeze
  LOW_SLOPE       = 2.28.freeze
  MODERATE_SLOPE  = 3.29.freeze
  STEEP_SLOPE     = 5.27.freeze

  validates :name, :email, :area, :slope, presence: true

  before_save :update_estimation

  def calculate_estimation
    (area.to_i * "Roof::#{slope.upcase}_SLOPE".constantize).floor
  end

  private

  def update_estimation
    self.estimation = calculate_estimation
  end
end
