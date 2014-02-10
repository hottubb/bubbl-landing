//Define Bubbl Namespace
var bubblLanding = {}

//Set initial video
bubblLanding.current_bubbl_landing_page = "one";

function addUser(username, email){
    var userAdded = {};
    // Send the dimensions to Parse along with the 'search' event

    $("#error").hide();
    $(".spinner").show();
    var UserObject = Parse.Object.extend("PreRegUsers");

    var query = new Parse.Query(UserObject);
    query.equalTo("username", username);
    query.find({
        success: function(results) {
            if (results.length > 0){
                $(".spinner").hide();
                $("#error").show();
                userAdded['status'] = "user exists";
            }
            else{
                var userObject = new UserObject();
                userObject.save({username: username, email: email}, {
                    success: function(object) {
                        userAdded['status'] = "user added";
                        $("#reserve_username_form").hide();
                        $(".spinner").hide();
                        $(".success").fadeIn();
                    },
                    error: function(model, error) {
                        $(".spinner").hide();
                        $("#error").show();
                    }
                });
            }
        },
        error: function(error) {
            userAdded['status'] = "error";
            console.log('error')

        }
    });
    Parse.Analytics.track('signups', userAdded)
}