var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'navigationservice']);

phonecatControllers.controller('home', ['$scope', 'TemplateService', 'NavigationService',
  function ($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService;
        $scope.menutitle = NavigationService.makeactive("Home");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.form = {
            latlong: "19.075984,72.877656",
            type: "airport"
        };
        $scope.alltypes = [
            "airport", "train_station", "bus_station", "bank|atm", "hospital", "school", "park", "restaurant", "movie_theater", "night_club|bar", "department_store|grocery_or_supermarket", "pharmacy", "shopping_mall"
        ];
        $scope.places = [];
        var placescomplete = function (data) {
            data = data.results;
            if (data.length > 5) {
                data = data.slice(0, 5);
            }
            $scope.places = data;
            //console.log(data);
        };
        $scope.getnewplaces = function (form) {
            NavigationService.getdetails(form.latlong, form.type).success(placescomplete);
        };
        var propertiessuccess = function (data) {

            data = data.queryresult;
            console.log(data);
            $scope.map = {
                center: {
                    latitude: data[0].lat,
                    longitude: data[0].long
                },
                zoom: 17
            };

            $scope.markers = NavigationService.formatmarkers(data);
            iconchange();

        };
        NavigationService.getproperties().success(propertiessuccess);

        $scope.console = function (data) {

            $scope.form.latlong = data.latitude + "," + data.longitude;
            NavigationService.getdetails($scope.form.latlong, $scope.form.type).success(placescomplete);
        };







        $scope.circles = [
            {
                id: 1,
                center: {
                    latitude: 19.075984,
                    longitude: 72.877656
                },
                radius: 2500,
                stroke: {
                    color: '#08B21F',
                    weight: 2,
                    opacity: 1
                },
                fill: {
                    color: '#08B21F',
                    opacity: 0.5
                },
                events: {

                    center_changed: function() {
                        iconchange();
                    }
                },
                geodesic: true, // optional: defaults to false
                draggable: true, // optional: defaults to false
                clickable: true, // optional: defaults to true
                editable: true, // optional: defaults to false
                visible: true // optional: defaults to true
            }

        ];


        var iconchange = function () {
            for (var i = 0; i < $scope.markers.length; i++) {
                var d = getDistance($scope.markers[i].coords.latitude, $scope.markers[i].coords.longitude, $scope.circles[0].center.latitude, $scope.circles[0].center.longitude);
                var r = $scope.circles[0].radius / 1000;
                if (d > r) {
                    $scope.markers[i].icon = 'img/favicon.ico';
                    console.log(i + '=' + d);
                } else {
                    $scope.markers[i].icon = 'img/logo.png';
                }
            }
        };
        
        var getDistance = function (lat1, long1, lat2, long2) {
            var R = 6378.137; // Earth’s mean radius in km
            var p1 = {
                lat: lat1,
                lng: long1
            };
            var p2 = {
                lat: lat2,
                lng: long2
            };

            var dLat = rad(p2.lat - p1.lat);
            var dLong = rad(p2.lng - p1.lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
                Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d; // returns the distance in km



        };
        var rad = function (x) {
            return x * Math.PI / 180;
        };


  }]);
phonecatControllers.controller('headerctrl', ['$scope', 'TemplateService',
 function ($scope, TemplateService) {
        $scope.template = TemplateService;
  }]);