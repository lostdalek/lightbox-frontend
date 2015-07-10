(function() {
  'use strict';

  describe('controllers', function(){

    beforeEach(module('paradeReport'));

    it('main controller should export config', inject(function($rootScope, $controller) {
      var scope = $rootScope.$new();
      var vm = $controller('MainController', {$scope: scope});
      expect(vm.navbladeConfig.navigation.length > 0).toBeTruthy();
    }));
  });
})();
