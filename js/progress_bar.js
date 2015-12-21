/**
 * Created by Sherine on 2015/12/13.
 */

//add action to progress bar
$(document).ready(function(){
    var percentage = 0;
    var radio_num = 0;
    $("div").delegate("input","click",function(){
        $("#alert").remove();       //remove the alert text
        radio_num = $(".table").length;  //total number of the question
        var checked_len = $("input:checked").length;  //number of the chosen radio
        percentage = checked_len/radio_num * 100;   //percentage
        var percentage_text = percentage.toFixed(0) + "%";
        //$("#progress-bar").css({"width": "percentage_text"});
        $("#progress-bar").width(percentage_text);
        $("#progress_value").text(percentage_text);
    });


    //submit action
    $("#submit_button").click(function () {
        if (percentage < 100) {
            // add alert text , if there are question not been chosen
            $("#warning-text").append("<div class='alert alert-danger' id='alert' role='alert'>您还有未填的空白选项！</div>");
        }
        else {
            var index = 0;
            var select_result = new Array();
            var good_factor = new Array();
            var bad_factor = new Array();
            //debugger;
            var index_good = 0;
            var index_bad = 0;
            while(index<radio_num) {
                var radio_name = "radio_" + index;
                select_result[index] = $("input[name = " + radio_name + "]:checked").val(); //get the each radio's value

                if(select_result[index]=='Y'){
                    good_factor[index_good] = item_factor[index];
                    index_good ++;
                }
                else{
                    bad_factor[index_bad] = item_factor[index];
                    index_bad ++;
                }
                index++;
            }
            //console.log(select_result[index-1]);
            //console.log(item_factor[index-1]);



            //$("#subPage").load("result.html",function(responseTxt,statusTxt,xhr){
            //    if(statusTxt=="error")
            //        alert("Error: "+xhr.status+": "+xhr.statusText);
            //});
            $("#subPage").remove();

            $("#homepage").append("<div class='container'><div class='panel panel-primary center-block'>" +
                "<div class='panel-heading font-microblack'>测评结果</div>" +
                "<div class='panel-body' id='subPage'>" +
                "</div>" +
                "</div></div> ");


            //var good_content = "<div class='col-lg-6 panel panel-primary' id='good_content'></div>";
            var good_content = "<div class='col-lg-6'>" +
                                "<div class='font-microblack' id='title'><span class='label label-success'>Success</span>" +
                                "<strong>您得到如今的果，是因为您在以下方面做得比较好:</strong></div>" +
                "<div class='list-group' id='good_content'></div></div>";
            //var bad_content = "<div class='col-lg-6 panel panel-primary' id='bad_content'></div>";
            var bad_content = "<div class='col-lg-6'>" +
                "<div class='font-microblack' id='title'><span class='label label-danger'>Advise</span>" +
                "<strong>您在一些方面做得不够好，我们给您提出如下建议:</strong></div>" +
                "<div class='list-group' id='bad_content'></div></div>";


            $("#subPage").append(good_content);

            for(var i=0;i<good_factor.length;i++){
                $("#good_content").append("<li class='list-group-item list-group-item-success'>"+good_factor[i]+"</li>");
            }

            $("#subPage").append(bad_content);
            for(var i=0;i<bad_factor.length;i++){
                $("#bad_content").append("<li class='list-group-item list-group-item-danger'>"+bad_factor[i]+"</li>");
            }



        }

    });
});


