let logStub;

before('global test setup', () => {

    logStub = sinon.stub(console, 'log');
});

after('global test teardown', () => {

    logStub.restore();
});

const context = require.context('.', true, /\.js/);

context.keys().forEach(context);
