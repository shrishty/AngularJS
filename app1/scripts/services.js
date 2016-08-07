'use strict';

angular.module('sandvineApp')
        .constant('baseURL', "http://localhost:3000/")
        .service('packageFactory', ['$resource', 'baseURL', function($resource, baseURL) {
        
                this.getPackages = function(){
                    
                    return $resource(baseURL+"packages/:package_name", null, {'update':{method:'PUT'}});
                    
                };      
        }])
        // .service('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        //     this.setFeedback = function  () {
        //         return $resource(baseURL+"feedback/:id", null, {'update':{method: 'PUT'}});
        //     };
        // }])

        // .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
        //     var corpfac = {};

        //     corpfac.getLeaders = function(){
                    
        //         return $resource(baseURL+"leadership/:id", null, {'update':{method:'PUT'}});
                    
        //     };
  

        //     return corpfac;
    
        // }])

;
