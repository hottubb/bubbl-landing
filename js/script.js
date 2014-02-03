function addUser(username, email){
    var UserObject = Parse.Object.extend("PreRegUsers");

    var query = new Parse.Query(UserObject);
    query.equalTo("username", username);
    query.find({
        success: function(results) {
            if (results.length > 0){
                console.log('user exists');
            }
            else{
                var userObject = new UserObject();
                userObject.save({username: username, email: email}, {
                    success: function(object) {
                        console.log('added user')
                        $(".success").show();
                    },
                    error: function(model, error) {
                        $(".error").show();
                    }
                });
            }
        },
        error: function(error) {
            console.log('error')

        }
    });
}