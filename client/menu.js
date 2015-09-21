
var markers = [];

function updateMarkers() {
    if (GoogleMaps.loaded()) {
        Meteor.call('getMarkers',
            Session.get('housing'),
            Session.get('feeding'),
            Session.get('transportation'),
            Session.get('bathroom'),
            function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }

                markers.map(function (marker) {
                    if(marker.getMap()){
                        marker.setMap(null);
                    }
                });

                markers = results;

                markers = markers.map(function (m) {

                    var contentString = "<div>Yo<div>";

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    var marker = new google.maps.Marker({
                        position: m.coords,
                        map: GoogleMaps.maps.servicesMap.instance
                    });

                    marker.addListener('click', function () {
                        infowindow.open(Google.maps.servicesMap.instance, marker);
                    });

                    return marker;
                });


            }

        )
    }

}


Template.menu.events({
    'click #showHousing': function () {
        Session.set('housing', (!Session.get('housing')));
        updateMarkers();

    },
    'click #showFeeding': function () {
        Session.set('feeding', (!Session.get('feeding')));
        updateMarkers();
    },
    'click #showTransportation': function () {
        Session.set('transportation', (!Session.get('transportation')));
        updateMarkers();
    },
    'click #showBathroom': function () {
        Session.set('bathroom', (!Session.get('bathroom')));
        updateMarkers();
    },
    'click #manageServices': function () {
        $('#manageServicesModal').modal('show');
        $("#manageServicesModal").css("z-index", "1500");
    }
});


Template.menu.helpers({
    displayHousingMarkers: function () {
        return Session.get('housing');
    },
    displayFeedingMarkers: function () {
        return Session.get('feeding');
    },
    displayBathroomMarkers: function () {
        return Session.get('bathroom');
    },
    displayTransportationMarkers: function () {
        return Session.get('transportation');
    }
})
;

