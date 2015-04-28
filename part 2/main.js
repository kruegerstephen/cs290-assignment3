/*code references TA post on Piazza*/
var response;

var fetchData = function() {
    var xmlReq = new XMLHttpRequest();
    var url = "https://api.github.com/gists/public";
    if(xmlReq!=null){
        (xmlReq.onreadystatechange = function () {
            if (xmlReq.readyState == 4) {
                response = JSON.parse(xmlReq.responseText);
               if(localStorage.getItem("Original Git List") !=null){
                  var originalGistList = JSON.parse(localStorage.getItem("Original Git List"));
                   var i = 0;
                   for(var z = originalGistList.length; z<=(originalGistList.length+30); z++){
                        for(i; i<30; i++){
                            var find = findGist(response[i].id);
                            if(find==false ) {
                                originalGistList[z] = response[i];

                            }
                        }
                   }
                   localStorage.setItem("Original Git List",JSON.stringify(originalGistList));
               }else{
                    localStorage.setItem("Original Git List",JSON.stringify(response));
                }
                generateGists(response);
                generateFavorites();
            }
        });
        xmlReq.open('GET',url);
        xmlReq.send();
    }
};

fetchData();

var findGist = function(id){
    if(localStorage.getItem("Original Git List") !==null && id!==null) {
        var originalGistList = JSON.parse(localStorage.getItem("Original Git List"));
        for (var i = 0; i < originalGistList.length-1; i++) {
            if(originalGistList[i]!==null) {
                if (originalGistList[i].id == id) {
                    return originalGistList[i];
                }
            }
        }
    }

                return false;

};

var findAndSubmit = function(id){
        var gist = findGist(id);
        localStorage.setItem(id, JSON.stringify(gist));
        var remGist = JSON.parse(localStorage.getItem("Original Git List"));
        for(var i = 0; i<remGist.length; i++){
            if(remGist[i]!==null) {
                if (remGist[i].id == id) {
                    remGist[i].id = 0;
                }
            }
        }
        localStorage.setItem("Original Git List", JSON.stringify(remGist));


};


var generateGists = function(response, type) {
    for (var i = 0; i < response.length; i++) {
        var gists = document.getElementById("tableGists");
        var newTD = document.createElement("div");
        var newA = document.createElement("a");
        var plusFavoriteButton;
        plusFavoriteButton = document.createElement("button");
        plusFavoriteButton.addEventListener('click', function() {
            findAndSubmit(this.id);
        });
        plusFavoriteButton.innerHTML = "Add To Favorites";
        var id = response[i].id;
        var url = response[i].url;
        plusFavoriteButton.setAttribute('id',id);
        newTD.setAttribute('id', id);
        newTD.setAttribute('url', url);
        if(response[i].description!=="") {
            newA.innerHTML = response[i].description;
        }else{
            newA.innerHTML = response[i].url;
        }
        newA.setAttribute('href',url);
        newTD.appendChild(newA);
        newTD.appendChild(plusFavoriteButton);
        gists.appendChild(newTD);
    }
};

var generateFavorites = function(){
    for (var i = 0; i < localStorage.length+1; i++) {
        var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(key === localStorage.getItem("Original Git List")){
                break;
            }
        if (key != null && key.id!=0) {
            var favGistTable = document.getElementById("favoriteGists");
            var newTD = document.createElement("div");
            var newA = document.createElement("a");
            var id = key.id;
            var url = key.url;
            var removeFavoriteButton = document.createElement("button");
            removeFavoriteButton.setAttribute('id',id);
            removeFavoriteButton.addEventListener('click', function() {
                findAndSubmit(this.id);
            });
            removeFavoriteButton.innerHTML = "Remove From Favorites";
            newTD.setAttribute('id', id);
            newTD.setAttribute('url', url);
            newA.innerHTML = key.url;
            newA.setAttribute('href', url);
            newTD.appendChild(newA);
            newTD.appendChild(removeFavoriteButton);
            favGistTable.appendChild(newTD);
        }
    }
};



