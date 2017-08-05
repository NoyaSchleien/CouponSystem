(function () {

    var module = angular.module("adminApp");

    module.service("dataService", serviceCtor);

    function serviceCtor($http) {
    	
        this.main_url = "/Webapp/webapi/";
//        let companyPath=this.main_url+"admin/getallcompanies";
//        this.allCompanies={};
//        $http.get(companyPath).then(function(i){
//        	this.allCompanies=i.data;
//        	console.log(i.data);
//        })
        
        this.get = function get(url, id) {
            let path = this.main_url;
            path += url;
            if (id) path += "/" + id;
           // console.log('inside serviceCtor get ' + path);
            return $http.get(path).then(
                    function (resp) {
                     // console.log(resp.data);
                    return resp;
                    },
                    function (err) {
                    	if (err.status==440) {
        					window.location.replace("http://localhost:8080/Webapp/clientSide/index.html");
        				}   
                    	else{throw err;}
                    });
        }

        this.post = function post(url, obj) {
            let path = this.main_url;
            path += url;
           // console.log('inside serviceCtor post ' + path);
            return $http.post(path, obj).then(
                    function (resp) {
                    	return resp;
                    },
                    function (err) {
                    	if (err.status==440) {
        					window.location.replace("http://localhost:8080/Webapp/clientSide/index.html");
        				}     
                    	else{throw err;}
                    });
        }

        this.put = function put(url, obj) {
        	let path = this.main_url;
            path += url;
          //  console.log('inside serviceCtor put ' + path);
            return $http.put(path , obj).then(
                    function (resp) {
                    	return resp;
                    },
                    function (err) {
                    	if (err.status==440) {
        					window.location.replace("http://localhost:8080/Webapp/clientSide/index.html");
        				} 
                    	else{throw err;}                    
                    });
        }

        this.remove = function remove(url, id) {
            let path = this.main_url;
            path += url + "/" + id;
         //   console.log('inside serviceCtor delete ' + path);
            return $http.delete(path).then(
                    function (resp) {
                    	return resp;
                    },
                    function (err) {
                    	if (err.status==440) {
        					window.location.replace("http://localhost:8080/Webapp/clientSide/index.html");
        				} 
                    	else{throw err;}
                    });
        	}

    }



})();