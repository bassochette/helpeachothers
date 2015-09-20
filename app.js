if (Meteor.isClient) {

    Meteor.startup(function () {
        GoogleMaps.load({
            v: '3',
            key: 'AIzaSyCmKMfpxScIIZCb6rekDhcfgxywQQLf1jM',
            libraries: 'geometry,places'
        });
    });

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });


    Session.set('housing', true);
    Session.set('feeding', true);
    Session.set('transportation', true);
    Session.set('bathroom', true);
    Session.set('internet', true);
    Session.set('translation', true);

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });

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
        };


        return user;

    });
}
