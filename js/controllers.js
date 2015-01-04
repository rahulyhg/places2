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
            "airport", "train_station", "bus_station", "bank,atm", "hospital", "school", "park", "restaurant", "movie_theater", "night_club,bar", "department_store,grocery_or_supermarket", "pharmacy", "shopping_mall"
        ];
        $scope.places = [];
        var placescomplete = function (data) {
            data = data.results;
            if (data.length > 5) {
                data = data.slice(0, 5);
            }
            $scope.places = data;
            console.log(data);
        };
        $scope.getnewplaces = function (form) {
            NavigationService.getdetails(form.latlong, form.type).success(placescomplete);
        };



  }]);
phonecatControllers.controller('headerctrl', ['$scope', 'TemplateService',
 function ($scope, TemplateService) {
        $scope.template = TemplateService;
  }]);