import { expect } from 'chai';

import Models from '../../../../shared/models';

context('models index unit test', () => {

    describe('model exports', () => {

        it('should correctly export Bookmark model', () => {

            expect(Models.Bookmark.modelName).to.equal('Bookmark');
        });

        it('should correctly export Channel model', () => {

            expect(Models.Channel.modelName).to.equal('Channel');
        });

        it('should correctly export Provider model', () => {

            expect(Models.Provider.modelName).to.equal('Provider');
        });

        it('should correctly export User model', () => {

            expect(Models.User.modelName).to.equal('User');
        });
    });
});
