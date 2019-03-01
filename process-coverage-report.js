const vstsCoverageStyles = require('vsts-coverage-styles').VstsCoverageStyles;

const overrideCss = '.status-line { clear:both;} ' +
    '.coverage .line-count, .coverage .line-coverage, ' +
    '.coverage .text .prettyprint {font-size:12px !important; ' +
    'line-height:1.2 !important;font-family:Consolas, "Liberation Mono", Menlo, Courier, monospace !important;}' +
    '.coverage .line-count{max-width:40px;padding-right:25px !important;display:block !important;} ' +
    '.coverage .line-coverage{max-width:45px;}' +
    '.coverage .line-coverage .cline-any{padding-right:25px !important;}' +
    '.coverage-summary{font-size:small;}';

vstsCoverageStyles({
    coverageDir: './coverage',
    pattern: '/**/*.html',
    fileEncoding: 'utf8',
    extraCss: overrideCss,
    preProcessFn: html => html.replace(new RegExp('×', 'g'), 'x'),
    postProcessFn: html => html
});
