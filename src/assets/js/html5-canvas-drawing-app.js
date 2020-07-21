
// Copyright 2010 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var canvas;
var contextCanv;
var canvasWidth = 646;
var canvasHeight = 411;
var paddingCanv = 25;
var lineWidthCanv = 8;
var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var outlineImage = new Image();
var crayonImage = new Image();
var markerImage = new Image();
var eraserImage = new Image();
var crayonBackgroundImage = new Image();
var markerBackgroundImage = new Image();
var eraserBackgroundImage = new Image();
var crayonTextureImage = new Image();
var clickXCanv = new Array();
var clickYCanv = new Array();
var clickColor = new Array();
var clickTool = new Array();
var clickSize = new Array();
var clickDrag = new Array();
var paint = false;
var curColor = colorPurple;
var curTool = "marker";
var curSize = "normal";
var mediumStartX = 18;
var mediumStartY = 19;
var mediumImageWidth = 93;
var mediumImageHeight = 46;
var drawingAreaX = 0;
var drawingAreaY = 11;
var drawingAreaWidth = 646;
var drawingAreaHeight = 411;
var toolHotspotStartY = 23;
var toolHotspotHeight = 38;
var sizeHotspotStartY = 157;
var sizeHotspotHeight = 36;
var sizeHotspotWidthObject = new Object();
sizeHotspotWidthObject.huge = 39;
sizeHotspotWidthObject.large = 25;
sizeHotspotWidthObject.normal = 18;
sizeHotspotWidthObject.small = 16;
var totalLoadResources = 8;
var curLoadResNum = 0;
var primeraVezCanv = true;
/**
* Calls the redraw function after all neccessary resources are loaded.
*/
function resourceLoaded()
{
	if(++curLoadResNum >= totalLoadResources){
		redraw();
	}
}

/**
* Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
*/
function prepareCanvas()
{
	if(primeraVezCanv)
	{
		var cadenaEscDol = document.getElementById("historiaClin:escalanalogaImg").value;
		if(cadenaEscDol)
		{
			var cadenasRecor = cadenaEscDol.split(";;");
			if(cadenasRecor.length >= 3)
			{
				clickDrag = cadenasRecor[0].split(",");
				clickXCanv = cadenasRecor[1].split(",");
				clickYCanv = cadenasRecor[2].split(",");
				var continDrg =0;
				for(; continDrg < clickDrag.length; continDrg++)
				{	
					clickDrag[continDrg] = clickDrag[continDrg] == "true";
				}
			}
		}
		primeraVezCanv = false;
	}
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById('canvasDiv');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	var item = document.getElementById("canvas");
	if(item)
		item.parentNode.removeChild(item);
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	contextCanv = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	// Load images
	// -----------
	crayonImage.onload = function() { resourceLoaded(); 
	};
	crayonImage.src = "images/crayon-outline.png";
	//context.drawImage(crayonImage, 0, 0, 100, 100);
	
	markerImage.onload = function() { resourceLoaded(); 
	};
	markerImage.src = "images/marker-outline.png";
	
	eraserImage.onload = function() { resourceLoaded(); 
	};
	eraserImage.src = "images/eraser-outline.png";	
	
	crayonBackgroundImage.onload = function() { resourceLoaded(); 
	};
	crayonBackgroundImage.src = "images/crayon-background.png";
	
	markerBackgroundImage.onload = function() { resourceLoaded(); 
	};
	markerBackgroundImage.src = "images/marker-background.png";
	
	eraserBackgroundImage.onload = function() { resourceLoaded(); 
	};
	eraserBackgroundImage.src = "images/eraser-background.png";

	crayonTextureImage.onload = function() { resourceLoaded(); 
	};
	crayonTextureImage.src = "images/crayon-texture.png";
	
	outlineImage.onload = function() { resourceLoaded(); 
	};
	outlineImage.src = "images/escaladolorT.png";

	// Add mouse events
	// ----------------
	$('#canvas').mousedown(function(e)
	{
		// Mouse down location
		var mouseX = e.pageX - (this.offsetParent.offsetLeft + this.offsetLeft);
		var mouseY = e.pageY - (this.offsetParent.offsetParent.offsetTop + this.offsetParent.offsetTop + this.offsetTop);
		
		paint = true;
		addClick(mouseX, mouseY, false);
		redraw();
	});
	
	$('#canvas').mousemove(function(e){
		if(paint==true){
			addClick(e.pageX - (this.offsetParent.offsetLeft + this.offsetLeft), e.pageY - (this.offsetParent.offsetParent.offsetTop +this.offsetParent.offsetTop + this.offsetTop), true);
			redraw();
		}
	});
	
	$('#canvas').mouseup(function(e){
		paint = false;
	  	redraw();
	});
	
	$('#canvas').mouseleave(function(e){
		paint = false;
	});
}

/**
* Adds a point to the drawing array.
* @param x
* @param y
* @param dragging
*/
function addClick(x, y, dragging)
{
	clickXCanv.push(x);
	clickYCanv.push(y);
	clickTool.push(curTool);
	clickColor.push(curColor);
	clickSize.push(curSize);
	clickDrag.push(dragging);
}

/**
* Clears the canvas.
*/
function clearCanvas()
{
	contextCanv.clearRect(0, 0, canvasWidth, canvasHeight);
}

/**
* Redraws the canvas.
*/
function redraw()
{
	// Make sure required resources are loaded before redrawing
	if(curLoadResNum < totalLoadResources){ return; }
	
	clearCanvas();
	
	var locX;
	var locY;
	
	
	
	
	
		
	var radius;
	var i = 0;
	
	var escalaDolApp = document.getElementById("historiaClin:escalanalogaImg");
	escalaDolApp.value = clickDrag + ";;" +clickXCanv + ";;" +clickYCanv;
	
	for(; i < clickXCanv.length; i++)
	{		
		if(clickSize[i] == "small"){
			radius = 2;
		}else if(clickSize[i] == "normal"){
			radius = 5;
		}else if(clickSize[i] == "large"){
			radius = 10;
		}else if(clickSize[i] == "huge"){
			radius = 20;
		}else{
			radius = 5;	
		}
		
		contextCanv.beginPath();
		if(clickDrag[i] && i){
			contextCanv.moveTo(clickXCanv[i-1], clickYCanv[i-1]);
		}else{
			contextCanv.moveTo(clickXCanv[i], clickYCanv[i]);
		}
		contextCanv.lineTo(clickXCanv[i], clickYCanv[i]);
		contextCanv.closePath();
		
		if(clickTool[i] == "eraser"){
			//contextCanv.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
			contextCanv.strokeStyle = 'white';
		}else{
			//contextCanv.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
			contextCanv.strokeStyle = clickColor[i];
		}
		contextCanv.lineJoin = "round";
		contextCanv.lineWidth = radius;
		contextCanv.stroke();
		
	}
	//contextCanv.globalCompositeOperation = "source-over";// To erase instead of draw over with white
	contextCanv.restore();
	
	// Overlay a crayon texture (if the current tool is crayon)
	if(curTool == "crayon"){
		contextCanv.globalAlpha = 0.4; // No IE support
		contextCanv.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
	}
	contextCanv.globalAlpha = 1; // No IE support
	
	// Draw the outline image
	contextCanv.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
}


/**/