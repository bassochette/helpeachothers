if (Meteor.isClient) {

    Meteor.startup(function () {
        GoogleMaps.load({
            v: '3',
            key: 'AIzaSyCmKMfpxScIIZCb6rekDhcfgxywQQLf1jM',
            libraries: 'geometry,places'
        });

        Session.set('housing', true);
        Session.set('feeding', true);
        Session.set('transportation', true);
        Session.set('bathroom', true);
        Session.set('internet', true);
        Session.set('translation', true);
        Session.set('markers', []);
    });

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });




}

var markers = [];

Meteor.methods({
    getMarkers : function(housing, feeding, transportation, bathroom){
        
        var markers = Meteor.users.find().fetch();

        var mrk = markers.map(function(marker){
            if(marker.profile.coords) {
                if (marker.profile.coords.lat && marker.profile.coords.lng) {
                    return JSON.parse(JSON.stringify(marker.profile));
                }
            }
            return false;
        });

        mrk = mrk.filter(function(marker){
            if(!marker)
                return false;

            if(housing && marker.housing)
                return true;

            if(feeding && marker.feeding)
                return true;

            if(transportation && marker.transportation)
                return true;

            if(bathroom && marker.bathroom)
                return true;

            return false;

        });



        return mrk;
    }
});

if (Meteor.isServer) {

    Accounts.onCreateUser(function (options, user) {

        user.profile = {
            name: "Un citoyen",
            phone: "?",
            address: "?",
            housing: false,
            feeding: false,
            bathroom: false,
            transportation: false,
            internet: false,
            translation: false,
            shortTerm: false,
            midTerm: false,
            longTerm: false,
            teaching : false,
            coords : {
                lat: false,
                lng : false,
            }
        };


        return user;

    });
}
