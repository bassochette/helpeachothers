Template.search.helpers({
    geocoding : function(){
        return (Session.get('geocoding') ? "": "hidden");
    },
    searchResults : function(){
        return (Session.get('searchResults') ? Session.get('searchResults'): []);
    }
});

var search = "";
var geocoder = null;

Template.search.events({
    'click .searchResultBox': function(evt, template){
        // todo : implement, can' figure how to have this index of the array element clicked
    },
    'keyup #mapSearch': function (evt, template) {
        var tmpSearch = document.getElementById('mapSearch').value;
        Meteor.setTimeout(function () {
            if (tmpSearch !== search) {
                search = tmpSearch;
                Session.set('searchResults', []);
            } else {
                console.log("Send search geocoding");

                if (GoogleMaps.loaded()) {

                    Session.set('geocoding', true);
                    if (geocoder == null) {
                        geocoder = new google.maps.Geocoder;
                    }

                    geocoder.geocode({
                        'address': tmpSearch
                    }, function (results, status) {

                        Session.set('geocoding', false);
                        // todo : let choose in the view wihch result is the good one

                        if (status == "OK") {

                            var srvMap = GoogleMaps.maps.servicesMap.instance;

                            // todo : diplay all results
                            Session.set('searchResults', [results[0]]);

                            srvMap.setCenter(
                                results[0].geometry.location
                            );

                        } else {
                            Session.set('searchResults', []);
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

