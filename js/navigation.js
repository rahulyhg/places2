var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
    var navigation = [{
        name: "Home",
        classis: "active",
        link: "#/home",
        subnav: []
    }];

    return {
        getnav: function () {
            return navigation;
        },
        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        getdetails: function (latlong, type) {
            latlong = latlong.split(",");
            var lat = latlong[0];
            var long = latlong[1];
            return $http.get("http://wohlig.co.in/places/index.php?lat=" + lat + "&long=" + long + "&type=" + type);
        },
        getproperties: function () {
            return $http.get("http://bdp.epuratech.com/admin/index.php/json/getallproperties");
        },
        formatmarkers: function (data) {
            var allmarkers = [];
            for (i = 0; i < data.length; i++) {
                var tempvar = {
                    id: i,
                    coords: {
                        latitude: data[i].lat,
                        longitude: data[i].long
                    },
                    options: {
                        draggable: false
                    }
                };
                allmarkers.push(tempvar);
                
            }
            return allmarkers;
        }

    }
});