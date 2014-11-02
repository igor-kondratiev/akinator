'use strict';
angular.module('services',[]);
angular.module('controllers',[]);
/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('app', ['ui.router', 'controllers','services']);
