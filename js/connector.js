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
          var url = "http://api.data.gov/ed/collegescorecard/v1/schools.json?school.state=";
          url = url + state + api_key;
          microAjax( url, function (res) {
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
          tableau.dataCallback(dataToReturn, lastRecordToken.toString(), hasMoreData);
      }
      /*To be used when there is no user input
      myConnector.init = function() {
          tableau.initCallback;
          tableau.submit;
      };*/
      tableau.registerConnector(myConnector);
  })();
