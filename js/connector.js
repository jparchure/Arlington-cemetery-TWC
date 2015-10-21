 $(document).ready(function() {
    $("#submitButton").click(function() {
      var stateName = $('#state').val().trim();
      if (stateName) {
        tableau.connectionName = "Scorecard Data for " + stateName;
        tableau.connectionData = stateName;
        tableau.submit();
      }
    });
  });


 (function() {
      var myConnector = tableau.makeConnector();

      myConnector.getColumnHeaders = function() {
          var fieldNames = ['Name', 'City', 'Ownership'];
          var fieldTypes = ['string', 'string', 'int'];
          tableau.headersCallback(fieldNames, fieldTypes);
      }

      myConnector.getTableData = function(lastRecordToken) {
          var dataToReturn = [];
          var lastRecordToken = 0;
          var hasMoreData = false;
          var api_key = "&api_key=xD8bb27zxTxfMuQ5edQhz27zNTkzOc6pqcnYJwCD";
          var state = tableau.connectionData;
          var url = "https://api.data.gov/ed/collegescorecard/v1/schools?school.state=";
          var connectionUri = url + state + api_key;

          var xhr = $.ajax({
          url: connectionUri,
          success: function (res) {
              if (res.results) {
                  var schools = res["results"];
                  var ii;
                  for (ii = 0; ii < schools.length; ++ii) {
                      var entry = {'Name': schools[ii]["school"]["name"],
                                   'City': schools[ii]["school"]["city"],
                                   'Ownership': schools[ii]["school"]["ownership"]};
                      dataToReturn.push(entry);
                  }
                  tableau.dataCallback(dataToReturn, lastRecordToken, false);
                }
                else {
                  tableau.abortWithError("No results found for ticker symbol: " + state);
                }
          },
          error: function (xhr, ajaxOptions, thrownError) {
              // If the connection fails, log the error and return an empty set.
              tableau.log("Connection error: " + xhr.responseText + "\n" + thrownError);
              tableau.abortWithError("Error while trying to connecto to the Yahoo stock data source.");
          }
        });
          /*
          microAjax(url, function (res) {
            res = JSON.parse(res);

            if (res.results) {
              var schools = res["results"];
              var ii;
              for (ii = 0; ii < schools.length; ++ii) {
                  var entry = {'Name': schools[ii]["school"]["name"],
                               'City': schools[ii]["school"]["city"],
                               'Ownership': schools[ii]["school"]["ownership"]};
                  dataToReturn.push(entry);
              }
              tableau.dataCallback(dataToReturn, lastRecordToken, false);
            }
            else {
              tableau.abortWithError("No results found for: " + state);
            }
          });
          tableau.dataCallback(dataToReturn, lastRecordToken.toString(), hasMoreData);*/
      }
      /*To be used when there is no user input
      myConnector.init = function() {
          tableau.initCallback;
          tableau.submit;
      };*/
      tableau.registerConnector(myConnector);
  })();
