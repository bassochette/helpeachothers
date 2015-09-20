Template.menu.events({
    'click #showHousing': function () {
        Session.set('housing', (!Session.get('housing')));
    },
    'click #showFeeding': function () {
        Session.set('feeding', (!Session.get('feeding')));
    },
    'click #showTransportation': function () {
        Session.set('transportation', (!Session.get('transportation')));
    },
    'click #showBathroom': function () {
        Session.set('bathroom', (!Session.get('bathroom')));
    },
    'click #manageServices' : function(){
        $('#manageServicesModal').modal('show');
        $("#manageServicesModal").css("z-index", "1500");
    }
});

function getFromProfile(el) {
    if (Meteor.user())
        return Meteor.user().profile[el];

    return null;
}

Template.menu.helpers({
    displayHousingMarkers: function(){
        return Session.get('housing');
    },
    displayFeedingMarkers: function(){
        return Session.get('feeding');
    },
    displayBathroomMarkers: function(){
        return Session.get('bathroom');
    },
    displayTransportationMarkers: function(){
        return Session.get('transportation');
    }
})
;

function getVal(el) {
    return document.getElementById(el).value;
}

function getChecked(el) {
    return document.getElementById(el).checked;
}
function isCheckedFromUserProfile(el) {
    if (Meteor.user())
        return ( Meteor.user().profile[el] ? "checked" : "");

    return null;
}

Template.manageServices.helpers({
    name: function(){
        return getFromProfile('name');
    },
    phone: function(){
        return getFromProfile('phone')
    },
    address: function(){
        return getFromProfile('address')
    },
    housing: function(){
        return isCheckedFromUserProfile('housing')
    },
    feeding: function(){
        return isCheckedFromUserProfile('feeding')
    },
    transportation: function(){
        return isCheckedFromUserProfile('transportation')
    },
    bathroom: function(){
        return isCheckedFromUserProfile('bathroom')
    },
    internet: function(){
        return isCheckedFromUserProfile('internet')
    },
    translation: function() {
        return isCheckedFromUserProfile('translation')
    }
});

Template.manageServices.events({
    'click #saveServiceInfo': function () {
        console.log('click on manage services');
        console.log(Meteor.user().profile);

        var updatedUser = {
            profile: {
                name: getVal('contactName'),
                phone: getVal('contactPhone'),
                address: getVal('contactAddress'),
                housing: getChecked('setHousing'),
                feeding: getChecked('setFeeding'),
                bathroom: getChecked('setBathroom'),
                transportation: getChecked('setTransportation'),
                internet: getChecked('setInternet'),
                translation: getChecked('setTranslation')
            }
        };

        console.log(updatedUser);

        Meteor.users.update({_id: Meteor.user()._id}, {$set: updatedUser});

    }
})
;

