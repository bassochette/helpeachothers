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


Template.map.onCreated(function () {

    GoogleMaps.ready('servicesMap', function (map) {

        var geolocationSuccess = function (pos) {
                GoogleMaps.maps.servicesMap.instance
                    .setCenter({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                );
                Session.set('currentPosition',pos );
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


