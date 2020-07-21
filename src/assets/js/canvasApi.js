prepareCanvas();
redraw();
$( "#btnBorrarCanvas" ).click(function() {
	clickXCanv = new Array();
	clickYCanv = new Array();
	clickDrag = new Array();
	curColor = colorPurple;
	prepareCanvas();
});


var idTabselect = $("#tabselechistocli").text();

if(idTabselect == 1)
{
	$( "#tablihisc1" ).addClass("active");
	$( "#tablihisc2" ).removeClass();
	$( "#tablihisc3" ).removeClass();
	$( "#tablihisc4" ).removeClass();
	$( "#tab-item-2" ).attr("class","tab-pane fade in active");
	$( "#tab-item-3" ).attr("class","tab-pane fade");
	$( "#tab-item-4" ).attr("class","tab-pane fade");
	$( "#tab-item-5" ).attr("class","tab-pane fade");
}
else if(idTabselect == 2)
{
	$( "#tablihisc2" ).addClass("active");
	$( "#tablihisc1" ).removeClass();
	$( "#tablihisc3" ).removeClass();
	$( "#tablihisc4" ).removeClass();
	$( "#tab-item-3" ).attr("class","tab-pane fade in active");
	$( "#tab-item-2" ).attr("class","tab-pane fade");
	$( "#tab-item-4" ).attr("class","tab-pane fade");
	$( "#tab-item-5" ).attr("class","tab-pane fade");
}
else if(idTabselect == 3)
{
	$( "#tablihisc3" ).addClass("active");
	$( "#tablihisc2" ).removeClass();
	$( "#tablihisc1" ).removeClass();
	$( "#tablihisc4" ).removeClass();
	$( "#tab-item-4" ).attr("class","tab-pane fade in active");
	$( "#tab-item-3" ).attr("class","tab-pane fade");
	$( "#tab-item-2" ).attr("class","tab-pane fade");
	$( "#tab-item-5" ).attr("class","tab-pane fade");
}