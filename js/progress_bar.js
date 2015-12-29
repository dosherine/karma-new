/**
 * Created by Sherine on 2015/12/13.
 */

//bubble json object
var newBubbleObj = new Object();
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
            var positive_children = new Array();
            var negative_children = new Array();
            //debugger;
            var index_good = 0;
            var index_bad = 0;
            while(index<radio_num) {
                var radio_name = "radio_" + index;
                select_result[index] = $("input[name = " + radio_name + "]:checked").val(); //get the each radio's value

                if(select_result[index]=='Y'){
                    good_factor[index_good] = item_factor[index];//获取善业的因
                    positive_children[index_good] = item_positive[index];//获取善业的名称
                    index_good ++;
                }
                else{
                    bad_factor[index_bad] = item_factor[index];// 获取恶业的因
                    negative_children[index_bad] = item_negative[index];  //获取恶业的名称
                    index_bad ++;
                }
                index++;
            }
            /*console.log("neg_child:"+negative_text);
            console.log("pos_child:"+positive_text);*/

            newBubbleObj.name = "bubble";
            newBubbleObj.children = new Array();
            newBubbleObj.children[0] = new Object();
            newBubbleObj.children[0].name = "善业";
            newBubbleObj.children[0].children = positive_children;
            newBubbleObj.children[1] = new Object();
            newBubbleObj.children[1].name = "恶业";
            newBubbleObj.children[1].children = negative_children;
            var newBubbletext= JSON.stringify(newBubbleObj);

            console.log("newBubbletext:"+newBubbletext);
            $("#subPage").remove();

            $("#homepage").append("<div class='container'><div class='panel panel-primary center-block'>" +
                "<div class='panel-heading font-microblack'>测评结果</div>" +
                "<div class='panel-body' id='subPage'>" +
                "</div>" +
                "</div></div> ");

            var bubble_page = "<div class='center-block' id='mainBubble'> " +
                //    "<svg class='mainBubbleSVG'>" +
                //"<text style='fill: rgb(136, 136, 136);' alignment-baseline='middle' dominant-baseline='middle' font-size='12' y='398.44' x='10' id='bubbleItemNote'>"+
                //" </text></svg>" +
                "</div>";
            $("#subPage").append(bubble_page);
            //$("#bubble_page").load("result.html",function(responseTxt,statusTxt,xhr){
            //    if(statusTxt=="error")
            //        alert("Error: "+xhr.status+": "+xhr.statusText);
            //});

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


