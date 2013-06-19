/**
 * This app using Weather API from http://www.wunderground.com 
 * and HTML5 Geolocation API
 *
 * Note: 
 * Change wu_api_key to your own wunderground.com api key!.
 * This app tested on Google Chrome 14 Linux and Firefox 7 Linux.
 *
 *
 *
 * Author By Equan Pr.
 * http://www.junwatu.com
 */

/** change this to your api key */
wu_api_key = 'a701d0d2314662c6';

wu_base_url = 'http://api.wunderground.com/api';
wu_features = 'geolookup/forecast';

function cuacaku() {
    // small javascript library that detects the availability of native implementations for next-generation web technologies such as HTML5 and CSS3
    if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(get_weather, handle_errors);
    } else {
        alert("Geolocation Not Supported! ");
    }
}

function get_weather(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    wu_query = latitude + ',' + longitude;

    //weather underground request URL format
    wu_url = wu_base_url + '/' + wu_api_key + '/' + wu_features + '/q/' + wu_query + '.json';
    console.log('URL Query: ' + wu_url);

    $.ajax({
        url: wu_url,
        dataType: "jsonp",
        success: function(parsed_json) {
            console.log(parsed_json);

            var location = parsed_json['location']['city'];
            var wuurl = parsed_json['location']['wuiurl'];
            
            //simple forecast day 1.
            var wu = parsed_json['forecast']['simpleforecast']['forecastday'][0];
            var wu_icon_url = wu['icon_url'];
            var wu_icon_alt = wu['icon'];
            var wu_high_temp = wu['high']['celsius'];
            var wu_low_temp = wu['low']['celsius'];

            $('#location').html('<a href="' + wuurl + '" target="_blank">' + location + '</a>');
            $('#weather_icon').attr('alt', wu_icon_alt);
            $('#weather_icon').attr('src', wu_icon_url);
            $('#temp').html(wu_low_temp + ' &degC - ' + wu_high_temp + ' &degC');
        }
    });
}

function handle_errors(error) {
    switch (error.code) {
    case error.PERMISSION_DENIED:
        alert("user did not share geolocation data");
        break;

    case error.POSITION_UNAVAILABLE:
        alert("could not detect current position");
        break;

    case error.TIMEOUT:
        alert("retrieving position timedout");
        break;

    default:
        alert("unknown error");
        break;
    }
}

cuacaku();