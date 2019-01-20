import { expect } from 'chai';

import Models from '.';

context('models index unit test', () => {

    describe('model exports', () => {

        it('should correctly export Account model', () => {

            expect(Models.Account.modelName).to.equal('Account');
        });

        it('should correctly export Bookmark model', () => {

            expect(Models.Bookmark.modelName).to.equal('Bookmark');
        });

        it('should correctly export Channel model', () => {

            expect(Models.Channel.modelName).to.equal('Channel');
        });

        it('should correctly export Game model', () => {

            expect(Models.Game.modelName).to.equal('Game');
        });

        it('should correctly export Provider model', () => {

            expect(Models.Provider.modelName).to.equal('Provider');
        });

        it('should correctly export User model', () => {

            expect(Models.User.modelName).to.equal('User');
        });

        it('should correctly export ViewHistory model', () => {

            expect(Models.ViewHistory.modelName).to.equal('ViewHistory');
        });
    });
});
