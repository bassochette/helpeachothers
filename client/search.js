Template.search.helpers({
    //add you helpers here
});

var search = "";
var geocoder = null;

Template.search.events({
    'keyup #mapSearch': function (evt, template) {
        var tmpSearch = document.getElementById('mapSearch').value;
        Meteor.setTimeout(function () {
            if (tmpSearch !== search) {
                search = tmpSearch;
            } else {

                if (GoogleMaps.loaded()) {

                    if (geocoder == null) {
                        geocoder = new google.maps.Geocoder;
                    }

                    geocoder.geocode({
                        'address': tmpSearch
                    }, function (results, status) {

                        // todo : let choose in the view wihch result is the good one

                        if (status == "OK") {

                            var srvMap = GoogleMaps.maps.servicesMap.instance;

                            srvMap.setCenter(
                                results[0].geometry.location
                            );

                        }


                    })
                }

            }
        }, 2000);

    }
});

Template.search.onCreated(function () {
    //add your statement here
});

Template.search.onRendered(function () {
    //add your statement here
});

Template.search.onDestroyed(function () {
    //add your statement here
});

