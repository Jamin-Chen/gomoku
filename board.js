var sides = 15; // number of lines on each side
var n = 2 * sides - 1;

function boardData() {
	var data = new Array();
	var xpos = 1;
	var ypos = 1;
    var length = (Math.min($(window).width(), $(window).height()) - 50)/(n + 1);
    console.log(length);

	for (var row = 0; row < n - 1; row++) {
		data.push( new Array() );
		for (var col = 0; col < n - 1; col++) {
            var quadrant;
            var dashArray;
            if (col % 2 == 1 && row % 2 == 0) {
                quadrant = 1;
                dashArray = [2 * length, 2 * length];
                cx = xpos + 3 * length;
                cy = ypos + 1 * length;
            }
            else if (col % 2 == 0 && row % 2 == 0) {
                quadrant = 2;
                dashArray = [length, 2 * length, length];
                cx = xpos + 2 * length;
                cy = ypos + 1 * length;
            }
            else if (col % 2 == 0 && row % 2 == 1) {
                quadrant = 3;
                dashArray = [0, 2 * length, 2 * length, 0];
                cx = xpos + 2 * length;
                cy = ypos + 2 * length;
            }
            else if (col % 2 == 1 && row % 2 == 1) {
                quadrant = 4;
                dashArray = [0, length, 2 * length, length];
                cx = xpos + 3 * length;
                cy = ypos + 2 * length;
            }
			data[row].push({
				x: xpos,
				y: ypos,
                y_coord: 15 - Math.floor((row + 1)/2),
                x_coord: String.fromCharCode("A".charCodeAt() + Math.floor((col + 1)/2)),
                cx: cx,
                cy: cy,
				length: length,
                quadrant: quadrant,
                dashArray: dashArray,
                played: false
			})
			xpos += length;
		}
		xpos = 1;
		ypos += length;
	}
	return data;
}

var boardData = boardData();
var length = boardData[0][0].length;
console.log(boardData);
var boardWidth = (n + 1) * length;
var boardHeight = boardWidth;
console.log(boardWidth);

var turn = "black";

var board = d3.select("#board")
	.append("svg")
    .attr("id", "grid")
	.attr("width", boardWidth * 1.01)
	.attr("height", boardHeight + length);
var row = board.selectAll(".row")
	.data(boardData)
	.enter().append("g")
	.attr("class", "row");
var column = row.selectAll(".square")
	.data(function(d) { return d; })
	.enter().append("rect")
	.attr("class","square")
	.attr("x", function(d) { return (d.x + 2 * d.length); })
	.attr("y", function(d) { return d.y + 1 * d.length; })
	.attr("width", function(d) { return d.length; })
	.attr("height", function(d) { return d.length; })
	.style("fill", "#fff")
	.style("stroke", "#999")
    .style("stroke-dasharray", function(d) { return d.dashArray; })
    .on("click", function(d) {
        d3.select("#tempCircle").remove();
        console.log(d);
        if (!d.played) {
            d3.select("#grid").append("svg:circle")
                              .attr("cx", d.cx)
                              .attr("cy", d.cy)
                              .attr("r", 0.8 * d.length)
                            //.style("stroke-width", 1)
                              .style("stroke", "black")
                              .style("fill", turn);
            if (turn == "black") {
                turn = "white";
            } else {
                turn = "black";
            }
            d.played = true;
        }
    })
    /*
    .on("mouseover", function(d) {
        if (!d.played) {
            var hoverFill;
            if (turn == "black") {
                hoverFill = "#DDD";
            } else if (turn == "white") {
                hoverFill = "white";
            }
            d3.select("#grid").append("svg:circle")
                              .attr("id", "tempCircle")
                              .attr("cx", d.cx)
                              .attr("cy", d.cy)
                              .attr("r", 0.8 * d.length)
                              .style("stroke", "black")
                              .style("stroke-dasharray", ("10, 3"))
                              .style("fill", hoverFill);
        }
    })
    .on("mouseout", function(d) {
        console.log("removing");
        d3.select("#tempCircle").remove();
    })
    */
    ;
board.append("text")
    .style("fill", "black")
    .style("font-weight", "bold")
    .style("font-size", boardWidth * 0.02)
    .style("font-family", "Courier New")
    .attr("x", 1.85 * length)
    .attr("y", boardHeight + 0.7 * length)
    .attr("textLength", boardWidth - length)
    .text("A B C D E F G H I J K L M N O");
for (var i = 0; i < sides; i++) {
    board.append("text")
        .attr("x", boardWidth * 0.01)
        .attr("y", 1.3 * length + i *1.99* length)
        .style("text-anchor", "middle")
        .style("font-family", "Courier New")
        .style("font-weight", "bold")
        .style("font-size", boardWidth * 0.02)
        .text(15 - i);

}
