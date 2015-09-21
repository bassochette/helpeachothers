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
function getFromProfile(el) {
    if (Meteor.user())
        return Meteor.user().profile[el];

    return null;
}

Template.manageServices.helpers({
    name: function () {
        return getFromProfile('name');
    },
    phone: function () {
        return getFromProfile('phone')
    },
    address: function () {
        return getFromProfile('address')
    },
    housing: function () {
        return ( Meteor.user().profile.housing ? "checked" : "")
    },
    feeding: function () {
        return ( Meteor.user().profile.feeding ? "checked" : "")
    },
    transportation: function () {
        return ( Meteor.user().profile.transportation ? "checked" : "")
    },
    bathroom: function () {
        return ( Meteor.user().profile.bathroom ? "checked" : "")
    },
    isGeocoding : function(){
        return (Session.get('geocoding') ? "" : "hidden");
    }
});


var geocoder = null;

Template.manageServices.events({
    'keyup #contactAddress': function (evt, template) {
        var tmpAddress = document.getElementById('contactAddress').value;
        Meteor.setTimeout(function () {
            if (tmpAddress == document.getElementById('contactAddress').value) {

                if (GoogleMaps.loaded()) {

                    if (geocoder == null) {
                        geocoder = new google.maps.Geocoder;
                    }

                    Session.set('geocoding', true);

                    geocoder.geocode({
                        'address': tmpAddress
                    }, function (results, status) {
                        if (status == "OK") {
                            console.log(results);
                            Session.set('formattedAddress', results[0].formattedAddress);
                            Session.set('coords', {
                                lat : results[0].geometry.location.G,
                                lng : results[0].geometry.location.K
                            })
                        } else {
                            console.log(status);
                        }

                        Session.set('geocoding', false)
                    })

                }

            }
        }, 3000);

    },
    'click #saveServiceInfo': function () {

        var updatedUser = {
            profile: {
                name: getVal('contactName'),
                phone: getVal('contactPhone'),
                address: getVal('contactAddress'),
                coords: Session.get('coords'),
                housing: getChecked('setHousing'),
                feeding: getChecked('setFeeding'),
                bathroom: getChecked('setBathroom'),
                transportation: getChecked('setTransportation')

            }
        };

        console.log(updatedUser);

        Meteor.users.update({_id: Meteor.user()._id}, {$set: updatedUser});

    }
})
;
