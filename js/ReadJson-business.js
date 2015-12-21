/**
 * Created by Dell on 2015/12/17.
 */

var item_factor = new Array();
$(document).ready(function(){
    $.getJSON("data/karma.json",function(data){
        $.each(data.business ,function( i , item ){
            $("#mainFrame").append(" <div class='panel panel-default'> <table class='table table-hover'> <thead> <tr> " +
                "<th class='col-xs-3'>"+
                (i+1) +
                "</th>" + "<th>" +
                item.title +
                "</th>" +
                " </tr> </thead> <tbody> <tr> <th scope='row'></th> <td class='col-xs-4'> <div class='radio'> <label>" +
                "<input type='radio' name='radio_" +
                i +
                "' id='radio1_sel_" +
                i +
                "' value='Y'>Yes </label> </div> </td> <td class='col-xs-4'> <div class='radio'> <label>" +
                "<input type='radio' name='radio_" +
                i +
                "' id='radio1_sel_" +
                i + "' value='N'>No </label> </div> </td> </tr> </tbody> </table> </div>"

            );
            //debugger;
            item_factor[i] = item.factor;
            //console.log(item_factor[i]);
        });

    });
});