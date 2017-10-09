require 'test_helper'

class RoofsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get roofs_index_url
    assert_response :success
  end

end
