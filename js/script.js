function addUser(username, email){
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
            }
            else{
                var userObject = new UserObject();
                userObject.save({username: username, email: email}, {
                    success: function(object) {
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
            console.log('error')

        }
    });
}


function userExists(username){
    var UserObject = Parse.Object.extend("PreRegUsers");

    var query = new Parse.Query(UserObject);
    query.equalTo("username", username);
    query.find({
        success: function(results) {
            if (results.length > 0){
                return "test"
            }
            else{
                return "test1"
            }
        },
        error: function(error) {
            console.log('error')

        }
    });
}