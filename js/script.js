//Define Bubbl Namespace
var bubblLanding = {}

//Set initial video
bubblLanding.current_bubbl_landing_page = "one";

function addUser(username, email){
    var userAdded = {};
    // Send the dimensions to Parse along with the 'search' event

    $("ul.username-error-list").hide();
    $(".spinner").show();
    var UserObject = Parse.Object.extend("PreRegUsers");

    var query = new Parse.Query(UserObject);
    query.equalTo("username", username);
    query.find({
        success: function(results) {
            if (results.length > 0){
                $(".spinner").hide();
                $("ul.username-error-list").show();
                userAdded['status'] = "user exists";
            }
            else{
                var userObject = new UserObject();
                userObject.save({username: username, email: email}, {
                    success: function(object) {
                        bubblLanding.email = email;
                        userAdded['status'] = "user added";
                        $("#reserve_username_form").hide();
                        $(".spinner").hide();
                        $("#header_text").hide();
                        $('#header_text').replaceWith ('<h1 id="header_text">Username Confirmed</h1>')
                        $(".success").fadeIn();
                        $("#social_share").fadeIn();
                        $("#submit_video").fadeIn();
                    },
                    error: function(model, error) {
                        $(".spinner").hide();
                        $("ul.username-error-list").show();
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

function addURL(url){
    var userAdded = {};
    // Send the dimensions to Parse along with the 'search' event

    var UserObject = Parse.Object.extend("LandingVidsSubmitted");

    var userObject = new UserObject();
    userObject.save({url: url, email: bubblLanding.email}, {
        success: function(object) {
            $("#submit_video").hide();
            $(".url_success").fadeIn();
        },
        error: function(model, error) {
            $(".spinner").hide();
            $("ul.username-error-list").show();
        }
    });
}