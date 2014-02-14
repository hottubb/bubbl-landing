// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

Parse.Cloud.define("mailchimp", function (request, response) {

    Parse.Cloud.httpRequest({
        method: "GET",
        url: "http://us3.api.mailchimp.com/1.3/?method=listSubscribe&apikey=cc25eff96f3ec264eff864e84e76d842-us3&id=77ad7a8643&email_address="+request.params.email,
        body: {

        },
        success: function(httpResponse) {
            console.log(httpResponse.text);
        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });
    response.success("success!");
});

