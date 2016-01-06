# README #

### What is this repository for? ###

* Tableau Web Connector for the Arlington Cemetery Burial Service

### What does it do? ###
As of this moment, not much. It simply pulls in data from the Arlington National Cemetery, Developers' site <a href = "http://www.arlingtoncemetery.mil/Developers/Burial-Record-Public-Service-Methods">here </a> and executes a specific query- all the people who had their last name as 'Smith'.
It's very much a work in progress, but in the current form it gives you the scaffolding to execute the queries of your choice.

#  #
### How do I get set up? ###

* Sset up a proxy server to wrap json into jsonp at port 8001 (not included but you can find it <a href="https://github.com/spolyak/node-jsonp-proxy"> here </a>)
* Run a local http server inside the connector code folder.
* Open Tableau -> Connect To -> Web Connector -> localhost:8000



### Who do I talk to? ###

* Jay Parchure- jayantparchure[at]gmail.com
