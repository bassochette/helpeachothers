if (Meteor.isClient) {

    Meteor.startup(function () {
        GoogleMaps.load({
            v: '3',
            key: 'AIzaSyCmKMfpxScIIZCb6rekDhcfgxywQQLf1jM',
            libraries: 'geometry,places'
        });
    })
    Template.body.helpers({
        servicesMapOptions: function () {

            if (GoogleMaps.loaded()) {
                console.log("maps is loaded");
                return {
                    center: new google.maps.LatLng(-37.8136, 144.9631),
                    zoom: 8
                };
            }
            return {};
        }
    });

    Template.body.onCreated(function () {
        // We can use the `ready` callback to interact with the map API once the map is ready.
        GoogleMaps.ready('servicesMap', function (map) {
            // Add a marker to the map once it's ready
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });
        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
