describe('description -', function () {
    'use strict';

    var template;

    beforeEach(module('networks'));
    beforeEach(inject(function ($rootScope, $compile) {
        template = $compile(angular.element('<section class="row-full module-hero test" overlay />'))($rootScope);
        $rootScope.$apply();
    }));

    describe('overlay directive', function () {
        it('should toggling', function () {
            template.scope().toggle();
            expect(template.scope().isVisible).toBeTruthy();
            template.scope().toggle();
            expect(template.scope().isVisible).toBeFalsy();
            template.scope().toggle();
            expect(template.scope().isVisible).toBeTruthy();
        });
    });
});