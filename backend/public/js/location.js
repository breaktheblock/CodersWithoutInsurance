
//
// location view javascript
//
function locate(){
    var position = null;
    var shareBtn = $('#share-location');

    var success = function(p) {
        position = p;
        setTimeout(function(){
            var href = 'share' +
                       '?accuracy=' + position.coords.accuracy +
                       '&longitude=' + position.coords.longitude +
                       '&latitude=' + position.coords.latitude;
            window.location.href = CC.baseUrl + '/' + href;
        }, 250);
    };
    var error = function() {
        // alert("No position");
        // shareBtn.click(function(){
        //     return false;
        // });
        // console.info(arguments);

        $('#location-error').show();
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy:true});
    } else {
        alert("No Geo Location!");
    }
}

$(document).ready(function(){
    $('#locateNow').click(
        function() {
            locate();
        }
    );
});