var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
    var navigation = [{
        name: "Home",
        classis: "active",
        link:"#/home",
        subnav: []
    }];

    return {
        getnav: function() {
            return navigation;
        },
        makeactive: function(menuname) {
            for(var i=0;i<navigation.length;i++) {
                if(navigation[i].name==menuname)
                {
                    navigation[i].classis="active";
                }
                else {
                    navigation[i].classis="";
                }
            }
            return menuname;
        },
        getdetails : function(latlong,type) {
            latlong=latlong.split(",");
            var lat=latlong[0];
            var long=latlong[1];
            return $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+long+"&radius=500&types="+type+"&key=AIzaSyCFszS_TmKjf2UaP4n2vRn8PP9Tnhk0XPI");
        }
        
    }
});