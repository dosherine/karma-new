

//submit action
$("#submit_button").click(function () {
    //var w = window.innerWidth * 0.68 * 0.95;
    var w = window.innerWidth;
    var h = Math.ceil(window.innerWidth * 0.68 * 0.95 / 3 * 2);
    var oR = 0;
    var nTop = 0;
    var svgContainer = d3.select("#mainBubble")
        .style("height", h + "px");

    var svg = d3.select("#mainBubble").append("svg")
        .attr("class", "mainBubbleSVG")
        .attr("width", w)
        .attr("height", h + "px")
        .on("mouseleave", function () {
            return resetBubbles();
        });

    //var mainNote = svg.append("text")
    //    .attr("id", "bubbleItemNote")
    //    .attr("x", 10)
    //    .attr("y", w / 2 - 15)
    //    .attr("font-size", 12)
    //    .attr("dominant-baseline", "middle")
    //    .attr("alignment-baseline", "middle")
    //    .style("fill", "#888888")
    //    .text(function (d) {
    //        return "善业和恶业";
    //    });


    //d3.json("data/Bubble.json", function (error, root) {
    var root = newBubbleObj;
    var bubbleObj = svg.selectAll(".topBubble")
        .data(root.children)
        .enter().append("g")
        .attr("id", function (d, i) {
            return "topBubbleAndText_" + i
        });

    nTop = root.children.length;  //children's length
    //oR = w / (1 + 3 * nTop);
    oR = 3 * w / 40;  //top bubble's radius


    function countObj_cx(i){  //function : count the x of BubbleObj
        //return oR * (3 * (1 + i) - 1);
        return oR * (5 *  i + 2) ;
    }

    //h = Math.ceil(w / (nTop+1) * 2);
    svgContainer.style("height", h + "px");

    var colVals = d3.scale.category10();

    bubbleObj.append("circle")
        .attr("class", "topBubble")
        .attr("id", function (d, i) {
            return "topBubble" + i;
        })
        .attr("r", function (d) {
            return oR;
        })
        .attr("cx", function (d, i) {
            //return oR * (3 * (1 + i) - 1);
            return countObj_cx(i);
        })
        //.attr("cy", (h + oR) / 3)
        .attr("cy", (h - oR) / 2)
        .style("fill", function (d, i) {
            return colVals(i);
        }) // #1f77b4
        .style("opacity", 0.3)
        .on("mouseover", function (d, i) {
            d3.select(this)
                .style("opacity", 0.5);
            return activateBubble(d, i);
        })
        .on("mouseleave",function(d,i){
            d3.select(this).style("opacity", 0.3);
        })
    ;


    bubbleObj.append("text")
        .attr("class", "topBubbleText")
        .attr("x", function (d, i) {
            //return oR * (3 * (1 + i) - 1);
            return countObj_cx(i);
        })
        //.attr("y", (h + oR) / 3)
        .attr("y", (h - oR) / 2)
        .style("fill", function (d, i) {
            return colVals(i);
        }) // #1f77b4
        .attr("font-size", 30)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("alignment-baseline", "middle")
        .text(function (d) {
            return d.name
        })
        .on("mouseover", function (d, i) {
            return activateBubble(d, i);
        });

    addchildren(0,"#good-list-","list-group-item list-group-item-danger","list-group-item list-group-item-info");
    addchildren(1,"#bad-list-","list-group-item list-group-item-danger","list-group-item list-group-item-warning");
    //for (var iB = 0; iB < nTop; iB++) {
    function addchildren(iB , list_name, new_class, original_class){
        var childBubbles = svg.selectAll(".childBubble" + iB)
            .data(root.children[iB].children)
            .enter().append("g");

        //var nSubBubble = Math.floor(root.children[iB].children.length/2.0);

        childBubbles.append("circle")
            .attr("class", "childBubble" + iB)
            .attr("id", function (d, i) {
                return "childBubble_" + iB + "sub_" + i;
            })
            .attr("r", function (d) {
                return oR / 3.0;
            })
            .attr("cx", function (d, i) {
                //return (oR * (3 * (iB + 1) - 1) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * 3.1415926));
                return countObj_cx(iB) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * 3.1415926);
            })
            .attr("cy", function (d, i) {
                //return ((h + oR) / 3 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * 3.1415926));
                return ((h - oR) / 2 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * 3.1415926));
            })
            .attr("cursor", "pointer")
            .style("opacity", 0.5)
            .style("fill", "#eee")
            /*.on("click", function (d, i) {
                window.open(d.address);
            })
            .on("mouseover", function (d, i) {
                //window.alert("say something");
                var noteText = "";
                if (d.note == null || d.note == "") {
                    noteText = d.address;
                } else {
                    noteText = d.note;
                }
                d3.select("#bubbleItemNote").text(noteText);
            })
            .append("svg:title")
            .text(function (d) {
                return d.address;
            })*/
            .on("mouseover", function (d, i) {
                //console.log("mousevoer");
                $( list_name + i)
                    .removeClass()
                    .addClass(new_class);
                d3.select(this)
                    .style("fill","#ebcccc");
            })
            .on("mouseleave",function(d,i){
                $(list_name + i)
                    .removeClass()
                    .addClass(original_class);
                d3.select(this)
                    .style("fill","#eee");
            })
        ;

        childBubbles.append("text")
            .attr("class", "childBubbleText" + iB)
            .attr("x", function (d, i) {
                //return (oR * (3 * (iB + 1) - 1) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * 3.1415926));
                return countObj_cx(iB) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * 3.1415926);
            })
            .attr("y", function (d, i) {
                return ((h - oR) / 2 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * 3.1415926));
                //return ((h + oR) / 3 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * 3.1415926));
            })
            .style("opacity", 0.5)
            .attr("text-anchor", "middle")
            .style("fill", function (d, i) {
                return colVals(iB);
            }) // #1f77b4
            .attr("font-size", 6)
            .attr("cursor", "pointer")
            .attr("dominant-baseline", "middle")
            .attr("alignment-baseline", "middle")
            .text(function (d) {
                return d;
                // return d.name
            })
            /*.on("click", function (d, i) {
                window.open(d.address);
            })*/
            .on("mouseover", function (d, i) {
                //console.log("mousevoer");
                $( list_name + i)
                    .removeClass()
                    .addClass(new_class);
            })
            .on("mouseleave",function(d,i){
                $(list_name + i)
                    .removeClass()
                    .addClass(original_class);
            })
        ;

    }


    resetBubbles = function () {
        //w = window.innerWidth * 0.68 * 0.95;
        //oR = w / (1 + 3 * nTop);

        //h = Math.ceil(w / (nTop+1) * 2);
        //svgContainer.style("height", h + "px");

        //mainNote.attr("y", h - 15);

        svg.attr("width", w);
        svg.attr("height", h);

        d3.select("#bubbleItemNote").text("D3.js bubble menu developed by Shipeng Sun (sunsp.gis@gmail.com), Institute of Environment, University of Minnesota, and University of Springfield, Illinois.");

        var t = svg.transition()
            .duration(650);

        t.selectAll(".topBubble")
            .attr("r", function (d) {
                return oR;
            })
            .attr("cx", function (d, i) {
                //return oR * (3 * (1 + i) - 1);
                return countObj_cx(i);
            })
            //.attr("cy", (h + oR) / 3);
            .attr("cy", (h - oR) / 2);
        t.selectAll(".topBubbleText")
            .attr("font-size", 30)
            .attr("x", function (d, i) {
                return countObj_cx(i);
                //return oR * (3 * (1 + i) - 1);
            })
            //.attr("y", (h + oR) / 3);
            .attr("y", (h - oR) / 2);

        for (var k = 0; k < nTop; k++) {
            t.selectAll(".childBubbleText" + k)
                .attr("x", function (d, i) {
                    //return (oR * (3 * (k + 1) - 1) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * 3.1415926));
                    return countObj_cx(k) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * 3.1415926);
                })
                .attr("y", function (d, i) {
                    //return ((h + oR) / 3 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * 3.1415926));
                    return ((h - oR) / 2 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * 3.1415926));
                })
                .attr("font-size", 6)
                .style("opacity", 0.5);

            t.selectAll(".childBubble" + k)
                .attr("r", function (d) {
                    return oR / 3.0;
                })
                .style("opacity", 0.5)
                .attr("cx", function (d, i) {
                    //return (oR * (3 * (k + 1) - 1) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * 3.1415926));
                    return countObj_cx(k) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * 3.1415926);
                })
                .attr("cy", function (d, i) {
                    //return ((h + oR) / 3 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * 3.1415926));
                    return ((h - oR) / 2 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * 3.1415926));
                });

        }
    }


    function activateBubble(d, i) {
        // increase this bubble and decrease others
        var t = svg.transition()
            .duration(d3.event.altKey ? 7500 : 350);

        t.selectAll(".topBubble")
            .attr("cx", function (d, ii) {
                if (i == ii) {
                    // Nothing to change
                    //return oR * (3 * (1 + ii) - 1) - 0.6 * oR * (ii - 1);
                    return countObj_cx(ii);
                } else {
                    // Push away a little bit
                    if (ii < i) {
                        // left side
                        //return oR * 0.6 * (3 * (1 + ii) - 1);
                        return countObj_cx(ii) * 0.6;
                    } else {
                        // right side
                        //return oR * (nTop * 3 + 1) - oR * 0.6 * (3 * (nTop - ii) - 1);
                        return countObj_cx(ii) + oR * 0.6 * (3 * (nTop - ii) - 1);
                    }
                }
            })
            .attr("r", function (d, ii) {
                if (i == ii)
                    return oR * 1.8;
                else
                    return oR * 0.8;
            });

        t.selectAll(".topBubbleText")
            .attr("x", function (d, ii) {
                if (i == ii) {
                    // Nothing to change
                    //return oR * (3 * (1 + ii) - 1) - 0.6 * oR * (ii - 1);
                    return countObj_cx(ii);
                } else {
                    // Push away a little bit
                    if (ii < i) {
                        // left side
                        //这个元素在active元素的左边
                        //return oR * 0.6 * (3 * (1 + ii) - 1);
                        return countObj_cx(ii) * 0.6;
                    } else {
                        // right side
                        //这个元素在active元素的右边
                        //return oR * (nTop * 3 + 1) - oR * 0.6 * (3 * (nTop - ii) - 1);
                        return countObj_cx(ii) + oR * 0.6 * (3 * (nTop - ii) - 1);
                    }
                }
            })
            .attr("font-size", function (d, ii) {
                if (i == ii)
                    return 30 * 1.5;
                else
                    return 30 * 0.6;
            });

        var signSide = -1;
        for (var k = 0; k < nTop; k++) {
            signSide = 1;
            if (k < nTop / 2) signSide = 1;
            t.selectAll(".childBubbleText" + k)
                .attr("x", function (d, i) {
                    //return (oR * (3 * (k + 1) - 1) - 0.6 * oR * (k - 1) + signSide * oR * 2.5 * Math.cos((i - 1) * 45 / 180 * 3.1415926));
                    return countObj_cx(k) + signSide * oR * 2.5 * Math.cos((i - 1) * 45 / 180 * 3.1415926);
                })
                .attr("y", function (d, i) {
                    //return ((h + oR) / 3 + signSide * oR * 2.5 * Math.sin((i - 1) * 45 / 180 * 3.1415926));
                    return ((h - oR) / 2 + signSide * oR * 2.5 * Math.sin((i - 1) * 45 / 180 * 3.1415926));
                })
                .attr("font-size", function () {
                    return (k == i) ? 12 : 6;
                })
                .style("opacity", function () {
                    return (k == i) ? 1 : 0;
                });

            t.selectAll(".childBubble" + k)
                .attr("cx", function (d, i) {
                    //return (oR * (3 * (k + 1) - 1) - 0.6 * oR * (k - 1) + signSide * oR * 2.5 * Math.cos((i - 1) * 45 / 180 * 3.1415926));
                    return countObj_cx(k)  + signSide * oR * 2.5 * Math.cos((i - 1) * 45 / 180 * 3.1415926);
                })
                .attr("cy", function (d, i) {
                    //return ((h + oR) / 3 + signSide * oR * 2.5 * Math.sin((i - 1) * 45 / 180 * 3.1415926));
                    return ((h - oR) / 2 + signSide * oR * 2.5 * Math.sin((i - 1) * 45 / 180 * 3.1415926));
                })
                .attr("r", function () {
                    return (k == i) ? (oR * 0.55) : (oR / 3.0);
                })
                .style("opacity", function () {
                    return (k == i) ? 1 : 0;
                });
        }
    }

    window.onresize = resetBubbles;
});



