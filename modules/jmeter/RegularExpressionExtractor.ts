export class RegularExpressionExtractor {

  //Static access
  private static values:Object = new Object();

  /**
   * Get saved Value from referenceName
   * @param  {String} referenceName Reference Name from Value
   * @return {string}               Value
   */
  public static getValue(referenceName:String):string {
    return this.values['' + referenceName + ''];
  }

  //Non Global
  private referenceName:String;
  private regularExpression:RegExp;
  private defaultValue:String = 'NO_VALUE';
  private filter:RegExp;

  private extractedValue:String;

  /**
   * Regular Expression Extractor
   * @param  {String} referenceName     Reference Name from Value extracted.
   * @param  {RegExp} regularExpression Regular Expression to Extract some value.
   * @param  {String} defaultValue      Default value in the case of null result from extract.
   */
  public setup(referenceName:String, regularExpression:RegExp, defaultValue?:String){

    //Set
    this.referenceName = referenceName;
    this.regularExpression = regularExpression;
    if(defaultValue) this.defaultValue = defaultValue;
  }

  /**
   * Extract value and save it in RegularExpressionExtractor.values Object.
   * @param  {string} responseData response data from request
   */
  public extract(responseData:string) {

    //Find value
    var result:RegExpMatchArray = responseData.match(this.regularExpression);
    if(result) {
      this.extractedValue = result[0]
      this.extractedValue = this.extractedValue.replace('<meta content="', '').replace('" name="csrf-token" />', '');
    };

    //Save value in var(referenceName)
    RegularExpressionExtractor.values['' + this.referenceName + ''] = this.extractedValue;

  }

}
