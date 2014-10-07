'use strict';

angular.module('controllers',[]);
angular.module('services',[]);
/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('app', ['controllers','services','ui.router']);
