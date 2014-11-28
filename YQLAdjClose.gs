function YQLADJCLOSE(ticker, thedate) {
  // This function returns the the results of a YQL Query.  I started with this query:
  // select Adj_Close from yahoo.finance.historicaldata where symbol = "YHOO" and startDate = "2009-09-11" and endDate = "2009-09-11"
  // This Google App Script takes that YQL Query URL and replaces YHOO with TICKER and the 2 dates with THEDATE.
  
  // Created with help from example from:
  // http://www.markandey.com/2013/05/how-to-use-google-script-to-pull-data.html
  
  // Notes to self:
  // Check the YQL Console to learn more.
  // dates from sheet are brought in as date() object in Google App Script (similar to javascript)
  // + is used to concatenate strings
  // URL would look less messy if I used a YQL alias, but I didn't need to.
  // Someone else suggested using Yahoo Pipes, but I didn't need to.
  
  
  // These are the parts of the YQL URL that I build up.
  var url1 = "https://query.yahooapis.com/v1/public/yql?q=select%20Adj_Close%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22";
  var url2 = "%22%20and%20startDate%20%3D%20%22";
  var url3 = "%22%20and%20endDate%20%3D%20%22";
  var url4 = "%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
  
  // ----------format date text--------------
  // the date in the URL is very picky, e.g. needs 09 instead of 9 for Sept.
  var motxt = thedate.getMonth();
  if (motxt < 10) {motxt = "0" + motxt;}
  var daytxt = thedate.getDate();
  if (daytxt < 10) {daytxt = "0" + daytxt;}
  var datetxt = (thedate.getFullYear() + "-" + motxt + "-" + daytxt);
  // ----------------
  
  var url = (url1 + ticker + url2 + datetxt + url3 + datetxt + url4);
  var response = UrlFetchApp.fetch(url);
  var json=JSON.parse(response.getContentText());
  // this part is JSON parsing of the fields that are returned with the YQL call
  return json.query.results.quote.Adj_Close;
}
