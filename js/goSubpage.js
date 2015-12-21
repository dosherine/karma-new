/**
 * Created by Sherine on 2015/12/15.
 */

$(document).ready(function(){
   $("#goBusiness").click(function(){
        $("#homepage").load("business.html",function(responseTxt,statusTxt,xhr){
            if(statusTxt=="error")
                alert("Error: "+xhr.status+": "+xhr.statusText);
        });
   });

    $("#goHealth").click(function(){
        $("#homepage").load("health.html",function(responseTxt,statusTxt,xhr){
            if(statusTxt=="error")
                alert("Error: "+xhr.status+": "+xhr.statusText);
        });
    });

    $("#goRelationship").click(function(){
        $("#homepage").load("relationship.html",function(responseTxt,statusTxt,xhr){
            if(statusTxt=="error")
                alert("Error: "+xhr.status+": "+xhr.statusText);
        });
    });
});
