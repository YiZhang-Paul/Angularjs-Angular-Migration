angular.module('migration-sample-app').filter('capitalize', function() {
    return function (name, whitelist) {
        name = name.trim().replace(/\s{2,}/, ' ');
        var words = name.split(' ');
        if (words.length) {
            for (var i = 0; i < words.length; i++) {
                if (whitelist.indexOf(words[i]) != -1) {
                    continue;
                }

                if (/[a-zA-Z]/.test(words[i][0])) {
                    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
                }
            }
        }
        return words.join(' ');
    }
});
