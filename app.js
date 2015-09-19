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

    })

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });


}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
