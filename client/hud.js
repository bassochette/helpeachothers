Template.hud.helpers({
    'change #showHousing' : function(){
        Session.set('housing', (! Session.get('housing')));
    },
    'change #showFeeding' : function(){
        Session.set('feeding', (! Session.get('feeding')));
    },
    'change #showTransportation' : function(){
        Session.set('transportation', (! Session.get('transportation')));
    },
    'change #showBathroom' : function(){
        Session.set('bathroom', (! Session.get('bathroom')));
    },
    'change #showInternet' : function(){
        Session.set('internet', (! Session.get('internet')));
    },
    'change #showTranslation' : function(){
        Session.set('translation', (! Session.get('translation')));
    }
});

Template.hud.events({
    //add your events here
});

Template.hud.onCreated(function () {


});

Template.hud.onRendered(function () {
    //add your statement here
});

Template.hud.onDestroyed(function () {
    //add your statement here
});

Template.manageServices.events({
    'click #manageServicesOpen' : function(){
        console.log('click on manage services')
    }
});
