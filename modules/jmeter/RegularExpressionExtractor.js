"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegularExpressionExtractor {
    constructor() {
        this.defaultValue = 'NO_VALUE';
    }
    /**
     * Get saved Value from referenceName
     * @param  {String} referenceName Reference Name from Value
     * @return {string}               Value
     */
    static getValue(referenceName) {
        return this.values['' + referenceName + ''];
    }
    /**
     * Regular Expression Extractor
     * @param  {String} referenceName     Reference Name from Value extracted.
     * @param  {RegExp} regularExpression Regular Expression to Extract some value.
     * @param  {String} defaultValue      Default value in the case of null result from extract.
     */
    setup(referenceName, regularExpression, defaultValue) {
        //Set
        this.referenceName = referenceName;
        this.regularExpression = regularExpression;
        if (defaultValue)
            this.defaultValue = defaultValue;
    }
    /**
     * Extract value and save it in RegularExpressionExtractor.values Object.
     * @param  {string} responseData response data from request
     */
    extract(responseData) {
        //Find value
        var result = responseData.match(this.regularExpression);
        if (result) {
            this.extractedValue = result[0];
            this.extractedValue = this.extractedValue.replace('<meta content="', '').replace('" name="csrf-token" />', '');
        }
        ;
        //Save value in var(referenceName)
        RegularExpressionExtractor.values['' + this.referenceName + ''] = this.extractedValue;
    }
}
//Static access
RegularExpressionExtractor.values = new Object();
exports.RegularExpressionExtractor = RegularExpressionExtractor;
