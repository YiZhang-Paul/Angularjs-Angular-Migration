let logStub;

before('global test setup', () => {

    logStub = sinon.stub(console, 'log');
});

after('global test teardown', () => {

    logStub.restore();
});

const context = require.context('.', true, /\.(t|j)s/);

context.keys().forEach(context);
