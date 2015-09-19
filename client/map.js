Template.map.helpers({
    servicesMapOptions: function () {

        if (GoogleMaps.loaded()) {
            console.log("maps is loaded");
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 8,
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

    });
});

Template.map.onRendered(function () {
});

Template.map.onDestroyed(function () {
});

