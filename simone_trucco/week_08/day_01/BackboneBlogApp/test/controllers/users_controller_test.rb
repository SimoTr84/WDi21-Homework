require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get app" do
    get users_app_url
    assert_response :success
  end

end
