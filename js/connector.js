 //Hosted at aacc-tableau-web-connector.s3-website-us-east-1.amazonaws.com

 $(document).ready(function() {
    $("#submitButton").click(function() {
      var stateName = $('#city').val().trim();
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
          var fieldNames = ['ISS_ID', 'LOCATIONID', 'SECTION', 'GRAVE', 'PRIMARYFIRSTNAME','PRIMARYLASTNAME','BRANCHOFSERVICE'];
          var fieldTypes = ['number', 'string', 'string','string','string','string','string'];
          tableau.headersCallback(fieldNames, fieldTypes);
      }

      myConnector.getTableData = function(lastRecordToken) {
          var index;
           if(lastRecordToken.length == 0)
                {index = 0;}
            else
                {index = parseInt(lastRecordToken);}
          //var maxRecords = 1;
          var dataToReturn = [];
          var hasMoreData = true;
          //var api_key = "&api_key=xD8bb27zxTxfMuQ5edQhz27zNTkzOc6pqcnYJwCD";
          var state = tableau.connectionData;
          var url = "http://wspublic.iss.army.mil/IssRetrieveServices.svc/search?q=rank=ssgt,birthstate=CA&sortColumn=PrimaryLastName,PrimaryFirstName&sortOrder=asc&limit=50&&start=0&method=IntermentsRender";          
          var connectionUri = url;//+  api_key;
          /*var IntermentsRender = function(rest){
          	console.log(rest);
          }*/
          var getRecords = function(connectionUri, index){
                //var alldataloaded = "";


                    $.ajax({
                    url: connectionUri,
                    jsonpCallback: 'IntermentsRender',
                    jsonp: 'method',
                    crossDomain: true,
                    contentType: "application/javascript",
                    dataType: 'jsonp',// + "&_per_page=50&_page=" + index,
                    success: function (res) {
                    	console.log(res);
                        if (res){
                        	console.log("The resoinse", res);
                            //tableau.dataCallback(dataToReturn);
/*
                            , index.toString(), hasMoreData);
                            var schools = res["results"];
                            maxRecords = res["metadata"]["total"];
                            console.log(maxRecords);
                            index++;
                            if( index == Math.ceil(maxRecords/50)){
                              hasMoreData = false;
                            }
                            var ii;
                            for (ii = 0; ii < schools.length; ++ii) {
                                var entry = {'Name': schools[ii]["school"]["name"],
                                             'City': schools[ii]["school"]["city"],
                                             'Ownership': schools[ii]["school"]["ownership"],
                                             'Predominant degree awarded':schools[ii]["school"]["degrees_awarded"]["predominant"],
                                             'Region': schools[ii]["school"]["region_id"],
                                              };
                                dataToReturn.push(entry);
                            
                          }
                            console.log("Data to return", dataToReturn, index, hasMoreData);
                            tableau.dataCallback(dataToReturn, index.toString(), hasMoreData);
*/
                          }
                          else {

                            tableau.abortWithError("No results found for ticker symbol: " + 'state');
                          }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        // If the connection fails, log the error and return an empty set.
                        tableau.log("Connection error: " + xhr.responseText + "\n" + thrownError);
                        tableau.abortWithError("Error while trying to connecto to the Yahoo stock data source.");
                    }
                  })
              
          };
          var xhr = getRecords(connectionUri, index);

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
