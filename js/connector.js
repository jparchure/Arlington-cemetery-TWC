
 (function() {
 	console.log("LEg 1");
      var myConnector = tableau.makeConnector();
      myConnector.init = function() {
      			console.log("LEg 2");
		          tableau.initCallback();
		          tableau.submit();
		          console.log("LEg 2");
		      };
      myConnector.getColumnHeaders = function() {
          var fieldNames = ['ISS_ID', 'LOCATIONID', 'SECTION', 'GRAVE', 'PRIMARYFIRSTNAME','PRIMARYLASTNAME','BRANCHOFSERVICE'];
          var fieldTypes = ['number', 'string', 'string','string','string','string','string'];
          tableau.headersCallback(fieldNames, fieldTypes);
      }

      myConnector.getTableData = function(lastRecordToken) {

          var index;

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
                    	tableau.dataCallback(dataToReturn,0,false);
                  },
                    error: function (xhr, ajaxOptions, thrownError) {
                      console.log(xhr, ajaxOptions, thrownError);
                      tableau.log("Connection error: " + xhr.responseText + "\n" + thrownError);
                        tableau.abortWithError("Error while trying to connecto to the Yahoo stock data source.");
                    	
                        // If the connection fails, log the error and return an empty set.
                          }
                  });
           
              
          };


          var xhr = getRecords(connectionUri, index);


      }
      tableau.registerConnector(myConnector);

      
		
  
      
  })();



