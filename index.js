'use strict';

var isparta = require('isparta');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
    var query = loaderUtils.parseQuery(this.query);
    var defaultConfig = {
        embedSource: true,
        noAutoWrap: true,
        babel: this.options.babel
    };
    var config = Object.assign({}, defaultConfig, this.options.isparta, query);

    var instrumenter = new isparta.Instrumenter(config);

    if (this.cacheable) {
        this.cacheable();
    }

    return instrumenter.instrumentSync(source, this.resourcePath);
};
