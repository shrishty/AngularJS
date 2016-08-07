'use strict';

angular.module('sandvineApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            menuFactory.getDishes().query(
                function  (response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function  (response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstname:"", lastname:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) { 
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    feedbackFactory.setFeedback().save($scope.feedback);
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstname:"", lastname:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackform.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.dish = {};
            $scope.showDish = false;
            $scope.message = "Loading....";

            menuFactory.getDishes().get({id:parseInt($stateParams.id, 10)}).
            $promise.then(
                function  (response) {
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function  (response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
                );
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.userComment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.userComment.date = new Date().toISOString();
                console.log($scope.userComment);
                
                $scope.dish.comments.push($scope.userComment);

                // two parameters, id and updated dish object
                menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);

                console.log("in dish comment controller");
                
                $scope.commentForm.$setPristine();
                
                $scope.userComment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        .controller('PackageController', ['$scope', 'packageFactory', function ($scope, packageFactory) {

            packageFactory.getPackages().query(
                function  (response) {
                    console.log($scope.packages);
                    $scope.packages = response;
                    console.log($scope.packages);
                },
                function  (response) {
                       $scope.message = "Error: " + response.status + " " + response.statusText; 
                }
            ); 
            
            // $scope.showDish = false;
            // $scope.showPromotion = false;
            // $scope.message = "Loading...";
            // $scope.showLeader = false;

            // menuFactory.getDishes().get({id:0})
            //     .$promise.then(
            //             function  (response) {
            //                 $scope.dish = response;
            //                 $scope.showDish = true;
            //             },
            //             function  (response) {
            //                $scope.message = "Error: " + response.status + " " + response.statusText; 
            //             }
            //         );

            // corporateFactory.getLeaders().get({id:3})
            //     .$promise.then(
            //         function  (response) {
            //             $scope.leader = response;
            //             $scope.showLeader = true;
            //         },
            //         function  (response) {
            //             $scope.message = "Error: " + response.status + " " + response.statusText; 
            //         }
            //     );
            
            // menuFactory.getPromotion().get({id:0})
            //     .$promise.then(
            //         function  (response) {
            //                 $scope.promotion = response;
            //                 $scope.showPromotion = true;
            //             },    
            //         function  (response) {
            //                $scope.message = "Error: " + response.status + " " + response.statusText; 
            //             }
            //         );
        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
            $scope.showLeaders = false;
            $scope.message = "Loading...";

            corporateFactory.getLeaders().query(
                function  (response) {
                    console.log($scope.leaders);
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                    console.log($scope.leaders);
                },
                function  (response) {
                       $scope.message = "Error: " + response.status + " " + response.statusText; 
                }

            );
        }])

;
