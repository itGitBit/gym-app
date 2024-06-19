require "test_helper"

class TraineesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @trainee = trainees(:one)
  end

  test "should get index" do
    get trainees_url, as: :json
    assert_response :success
  end

  test "should create trainee" do
    assert_difference("Trainee.count") do
      post trainees_url, params: { trainee: { email: @trainee.email, name: @trainee.name, phone: @trainee.phone } }, as: :json
    end

    assert_response :created
  end

  test "should show trainee" do
    get trainee_url(@trainee), as: :json
    assert_response :success
  end

  test "should update trainee" do
    patch trainee_url(@trainee), params: { trainee: { email: @trainee.email, name: @trainee.name, phone: @trainee.phone } }, as: :json
    assert_response :success
  end

  test "should destroy trainee" do
    assert_difference("Trainee.count", -1) do
      delete trainee_url(@trainee), as: :json
    end

    assert_response :no_content
  end
end
