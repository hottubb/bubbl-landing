function addUser(e,t){var n=Parse.Object.extend("PreRegUsers"),r=new Parse.Query(n);r.equalTo("username",e);r.find({success:function(r){if(r.length>0)$("#error").show();else{var i=new n;i.save({username:e,email:t},{success:function(e){$("#reserve_username_form").hide();$(".success").fadeIn()},error:function(e,t){$("#error").show()}})}},error:function(e){console.log("error")}})}function userExists(e){var t=Parse.Object.extend("PreRegUsers"),n=new Parse.Query(t);n.equalTo("username",e);n.find({success:function(e){return e.length>0?"test":"test1"},error:function(e){console.log("error")}})};