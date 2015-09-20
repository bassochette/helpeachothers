Template.map.helpers({
    servicesMapOptions: function () {

        if (GoogleMaps.loaded()) {

            return {
                center: new google.maps.LatLng(50.84, 4.34),
                zoom: 10,
                disableDefaultUI: false,
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                panControl: false,
            };
        }
        return {};
    }
});

Template.map.events({});

Template.map.onCreated(function () {

    GoogleMaps.ready('servicesMap', function (map) {

        var geolocationSuccess = function (pos) {
                GoogleMaps.maps.servicesMap.instance
                    .setCenter({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                );
            },
            geolocationError = function (err) {
                console.log(err);
            };
        navigator.geolocation.getCurrentPosition(
            geolocationSuccess,
            geolocationError
        )

        //var markers = Markers.find();

        markers = [];
        markers.map(function(marker){

            return new google.maps.Markers({
                position : {
                    lat : marker.lat,
                    lng : marker.lng
                },
                map: GoogleMaps.maps.servicesMap.instance,
                info : {
                    services : marker.services,
                    phone : marker.phone,
                    email : marker.email,
                    name : marker.name
                }
            });

        });

        Session.set('markers', markers);


    });
});

Template.map.onRendered(function () {
});

Template.map.onDestroyed(function () {
});

