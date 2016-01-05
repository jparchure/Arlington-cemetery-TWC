 //Hosted at aacc-tableau-web-connector.s3-website-us-east-1.amazonaws.com


 /*$(document).ready(function() {
    $("#submitButton").click(function() {
      var stateName = $('#city').val().trim();
      if (stateName) {
        tableau.connectionName = "Scorecard Data for " + stateName;
        tableau.connectionData = stateName;
        tableau.submit();
      //}
    }//);
  );*/

 (function() {
 	console.log("LEg 1");
      var myConnector = tableau.makeConnector();
      myConnector.init = function() {
				  console.log("Leg 10");
		          tableau.initCallback();
		          tableau.submit();
		          console.log("Leg 11");
		      };
      myConnector.getColumnHeaders = function() {
          var fieldNames = ['ISS_ID', 'LOCATIONID', 'SECTION', 'GRAVE', 'PRIMARYFIRSTNAME','PRIMARYLASTNAME','BRANCHOFSERVICE'];
          var fieldTypes = ['number', 'string', 'string','string','string','string','string'];
          console.log("LEg 2");
          tableau.headersCallback(fieldNames, fieldTypes);
          console.log("LEg 3");
      }

      myConnector.getTableData = function(lastRecordToken) {
      	console.log("LEg 4");
          var index;
           /*if(lastRecordToken.length == 0)
                {index = 0;}
            else
                {index = parseInt(lastRecordToken);}*/
          //var maxRecords = 1;
          var dataToReturn = [];
          var hasMoreData = true;
          //var api_key = "&api_key=xD8bb27zxTxfMuQ5edQhz27zNTkzOc6pqcnYJwCD";
          //var state = tableau.connectionData;
          var url = "http://wspublic.iss.army.mil/IssRetrieveServices.svc/search?q=rank=ssgt,birthstate=CA&sortColumn=PrimaryLastName,PrimaryFirstName&sortOrder=asc&limit=50&&start=0&method=IntermentsRender";          
          var connectionUri = url;//+  api_key;
          /*var IntermentsRender = function(rest){
          	console.log(rest);
          }*/
          var getRecords = function(connectionUri, index){
                //var alldataloaded = "";

                console.log("LEg 5");

                	$.ajax({
                    url: "http://localhost:8001/?url=http%3A%2F%2Fwspublic.iss.army.mil%2FIssRetrieveServices.svc%2Fsearch%3Fq%3DPrimaryLastName%3Dsmith%26sortColumn%3DPrimaryLastName%2Cprimaryfirstname%26sortOrder%3Dasc%26limit%3D50%26%26start%3D0%26method%3DIntermentsRender",
                    jsonp: 'jsonp',
                    contentType: "application/javascript",
                    dataType: 'jsonp',
                    success: function (res) {
                    	noofRecords = res["SearchResult"].Records.length;
                    	for(i=0;i<noofRecords;i++){
                    		curr_record = res["SearchResult"].Records[i]
                    		output = { 'ISS_ID':curr_record['ISS_ID'],
                    		'LOCATIONID':curr_record['LOCATIONID'],
                    		 'SECTION':curr_record['SECTION'],
                    		  'GRAVE':curr_record['GRAVE'], 
                    		  'PRIMARYFIRSTNAME':curr_record['PRIMARYFIRSTNAME'],
                    		  'PRIMARYLASTNAME':curr_record['PRIMARYLASTNAME'],
                    		  'BRANCHOFSERVICE':curr_record['BRANCHOFSERVICE']

                    		}
                    		console.log(output);
                    		dataToReturn.push(output);
                    	}
                    	tableau.dataCallback(dataToReturn);
                  },
                    error: function (xhr, ajaxOptions, thrownError) {
                      console.log(xhr, ajaxOptions, thrownError);
                      tableau.log("Connection error: " + xhr.responseText + "\n" + thrownError);
                        tableau.abortWithError("Error while trying to connecto to the Yahoo stock data source.");
                    	
                        // If the connection fails, log the error and return an empty set.
                          }
                  });
           
              
          };

          console.log("LEg 6");
          var xhr = getRecords(connectionUri, index);


      }
      
      
      
      console.log("LEg 8");
      tableau.registerConnector(myConnector);
      console.log("LEg 9");

      //$(document).ready(myConnector.init);
      
		
  
      
  })();



