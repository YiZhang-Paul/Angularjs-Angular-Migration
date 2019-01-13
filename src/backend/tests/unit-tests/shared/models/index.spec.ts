import { expect } from 'chai';

import Models from '../../../../shared/models';

context('models index unit test', () => {

    describe('model exports', () => {

        it('should correctly export User model', () => {

            expect(Models.User.modelName).to.equal('User');
        });
    });
});
