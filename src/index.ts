//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api
import * as a1lib from "@alt1/base";
import { ImgRef } from "@alt1/base";
//import { lookup } from "dns";
//import { stringify } from "querystring";
import   * as resemble from "resemblejs";

//tell webpack to add index.html and appconfig.json to output

require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");
var img
var imgdoor
var brocount = 0
var toKill  = 8
var refreshrate = 100
var storedrefreshrate = 100
var interval 
//loads all images as raw pixel data async, images have to be saved as *.data.PNG
//this also takes care of metadata headers in the image that make browser load the image
//with slightly wrong colors
//this function is async, so you cant acccess the images instantly but generally takes <20ms
//use `await imgs.promise` if you want to use the images as soon as they are loaded
var puzzleimgsSq = a1lib.ImageDetect.webpackImages(
	{	
	SqM: require("./Puzzles/SquareMiddle.data.PNG")
	}
);
var puzzleimgsCoTo = a1lib.ImageDetect.webpackImages(
	{	
	CoM: require("./Puzzles/CornMiddle.data.PNG"),
	ToM: require("./Puzzles/TopMiddle.data.PNG")
	}
);
var puzzleimgsCT = a1lib.ImageDetect.webpackImages(
	{	
	
	CTM: require("./Puzzles/CirTriMiddle.data.PNG")
	}
);


var doorimg = a1lib.ImageDetect.webpackImages(
	{
	door: require("./Misc/DoorLock.data.PNG")
	}
);

var slainimg = a1lib.ImageDetect.webpackImages(
	{
		slain: require("./Misc/Slain.data.PNG")
	}
);

var brotherimgs = a1lib.ImageDetect.webpackImages(
	{
	Ahrim: require("./Brothers/Ahrim.data.PNG"),
	Dharok: require("./Brothers/Dharok.data.PNG"),
	Guthan: require("./Brothers/Guthan.data.PNG"),
	Karil: require("./Brothers/Karil.data.PNG"),
	Torag: require("./Brothers/Torag.data.PNG"),
	Verac: require("./Brothers/Verac.data.PNG"),	
	Akrisae: require("./Brothers/Akrisae.data.PNG"),
	Linza: require("./Brothers/Linza.data.PNG")
	}

);
var fullbrotherList = 	{
	Ahrim: 'Ahrim',
	Dharok:	'Dharok',
	Guthan: 'Guthan',
	Karil:	'Karil',
	Torag: 	'Torag',
	Verac: 	'Verac',
	Akrisae:'Akrisae',
	Linza: 	'Linza'
	}
;
var brotherList = 	{
	Ahrim: 'Ahrim',
	Dharok:	'Dharok',
	Guthan: 'Guthan',
	Karil:	'Karil',
	Torag: 	'Torag',
	Verac: 	'Verac',
	Akrisae:'Akrisae',
	Linza: 	'Linza'
	}
;

var brotherListselect = {
	Ahrim: 'Ahrim',
	Dharok:	'Dharok',
	Guthan: 'Guthan',
	Karil:	'Karil',
	Torag: 	'Torag',
	Verac: 	'Verac',
	Akrisae:'Akrisae',
	Linza: 	'Linza'
	}


var brotherListnonselect = {}

function ObjectLength( object ) {
	var length = 0;
	for( var key in object ) {
		if( object.hasOwnProperty(key) ) {
			++length;
		}
	}
	return length;
};

//only called when brother is selected.deselected.
export function changesettings(toggle) {
	if (toggle.src.match("Deselect"))
	{
		//when a brother is selected
		//add to brother list
		brotherListselect[toggle.id] = [toggle.id];

		//remove from ignore list
		delete brotherListnonselect[toggle.id]; 

		toKill = ObjectLength(brotherListselect)
		
	}
	else {	
		//remove relevant brother from list
		delete brotherListselect[toggle.id]; 
		//add relevant brother to ignore list
		brotherListnonselect[toggle.id] = [toggle.id];

		toKill = ObjectLength(brotherListselect)
	}	
	return;	
};

export function changerefresh(refresh) {
	storedrefreshrate = refresh.value
	refreshrate = storedrefreshrate
	
	clearInterval(interval)
	start()
	return;
};

//Webpage calls this function here.
export function start() {
	
	//Set effective refresh rate (todo, customise this rate)
    interval = setInterval(tick,refreshrate); 
	    
	tick(); 
}

function tick() {
   	//grab the rs window capture
	 							  console.log(refreshrate)
	img = a1lib.captureHoldFullRs();
	//run at barrows check/reset brother list. 
	atbarrows(img);
}


function atbarrows(img: ImgRef){
	//Check Brothers slain list header
	for (const [key] of Object.entries(slainimg)) {
		var loc = img.findSubimage(slainimg[key]);
	
		if (loc.length == 0){
			//change status in alt1 browser to "Not at barrows"
			document.getElementById('Status').textContent =  "Not at barrows";
				//reset brother list.
				var newObject = JSON.stringify(fullbrotherList);
				brotherList = JSON.parse(newObject);

				//brotherList = fullbrotherList
				//reset brocount (used so that the count doesn't go out of control after each run/tele out)	
				brocount = 0;

				if (refreshrate < 100)
				{
					refreshrate = storedrefreshrate
					
					clearInterval(interval)
					start()
					return;
				}

				for (const [key] of Object.entries(brotherimgs)) {						
					//blank out brother images
					(document.getElementById(`${key}HTMLimg`) as HTMLImageElement).src = `./TooltipHeads/${key}Dead.PNG`
				}
		}
		if (loc.length != 0){
			//run brother finder
			findBrothers(img);
			
			//run puzzle
			doorLock(img);
			
		}		
	}
	
	return;
}

function findBrothers(img: ImgRef) {
	//set this here so the count doesnt keep going up each loop round
	brocount = 0
	
	//var text = document.getElementById('debug').textContent = ` test: ${brocount}`;
	for (const [key] of Object.entries(brotherimgs)) {
		
		var broloc = img.findSubimage(brotherimgs[key]);
					
		if (broloc.length == 0){
			//Display coloured version of the brother image, as they are not dead yet
				(document.getElementById(`${key}HTMLimg`) as HTMLImageElement).src = `./TooltipHeads/${key}.PNG`
		}	
	}
	//loop through Non dead bro's and overwirte iwth Red image if deselected	
	for (const [key] of Object.entries(brotherList)) 
	{
		for (const [key2] of Object.entries(brotherListnonselect)) {
		
			(document.getElementById(`${key2}HTMLimg`) as HTMLImageElement).src = `./TooltipHeads/${key2}Deselect.PNG` //shove this before dead bu after alive. **************
					
		}
	}
	//loop through Non dead bro's and overwrite with dead image if dead (even if deselected)
	for (const [key] of Object.entries(brotherimgs)) {
		
			var broloc = img.findSubimage(brotherimgs[key]);	
		//search for brother names in killcount list.
		if (broloc.length != 0) {
			//increase kill counter
			brocount += 1;
			//replace image with greyed out version if brother name found in list
			(document.getElementById(`${key}HTMLimg`) as HTMLImageElement).src = `./TooltipHeads/${key}Dead.PNG`
							
			//remove relevant brother from brother list - used to display which brother is left when showing tunnel location
			delete brotherList[key];			
		} 
	}
	/*
	// Some debug shit I'm leaving in as I cba to rrewrite it when i inevitably need it again
	var text = document.getElementById('debug').textContent = ` test: tokill ${toKill}`
	*//*
	var text = document.getElementById('spare').textContent = ` broselectlist ${Object.keys(brotherListselect)}`
	
	var text = document.getElementById('canvastest').textContent = ` non bro select list ${Object.keys(brotherListnonselect)}`
	
	var text = document.getElementById('canvastest2').textContent = ` brolist ${Object.keys(brotherList)}`
	
	var text = document.getElementById('spare').textContent = `${Object.keys(brotherList).filter((key) => !key.includes('Torag'))}`*/
	
	
	//display brothers killed/tomb location/go loot the chest
	if (brocount ==1)
	{
		var text = document.getElementById('Status').textContent = brocount +  " brothers slain, Keep going!";
	}
	if (brocount < toKill-1 && brocount != 1)
	{
		var text = document.getElementById('Status').textContent = brocount + " brothers slain, Keep going!";
	}
	if (brocount >= toKill-1 && toKill != 0)
	{
		if(ObjectLength(brotherList) == 1)
		{//only show tunnel if all 8 killed
			var text = document.getElementById('Status').textContent = brocount  +" brothers slain, enter the tunnel at " + Object.keys(brotherList)  +"'s tomb";
		}
		else
		{
			var text = document.getElementById('Status').textContent = brocount  +" brothers slain, so tunnel location unknown. Possibilities: " + Object.keys(brotherList).filter((key) => !key.includes('Linza'));
		}
	}
	if (brocount == 8)
	{
		var text = document.getElementById('Status').textContent = "All brothers have been slain, go and loot the chest.";
	}	
	
	return;
}	


function doorLock(img:ImgRef){
	var Doorloc = img.findSubimage(doorimg.door);	
	//only run if door lock window is on screen, saves on performance
	if (window.alt1) {
		if (Doorloc.length != 0) {

			if (refreshrate != 50)
				{
					refreshrate = 50
					clearInterval(interval)
					start()
					return;
				}
			
					
			img = a1lib.captureHoldFullRs();
			getDiffCoTo(img) //remove when putting consisten check back in
			img = a1lib.captureHoldFullRs();
			getDiffSq(img) //remove when putting consisten check back in
			img = a1lib.captureHoldFullRs();
			getDiffCT(img) //remove when putting consisten check back in
			
		} 
		if(Doorloc.length ==0 && refreshrate == 50)
		{
			refreshrate = storedrefreshrate
					
					clearInterval(interval)
					start()
					return;
		}
	}
	
	
	return;
}

function getDiffCoTo(img:ImgRef){
	//finds door lock mech window from main image
	
	var Doorloc = img.findSubimage(doorimg.door);	

	//for every image in puzzleimages
	for (const [key] of Object.entries(puzzleimgsCoTo)) {
		
		
		//document.getElementById('canvastest').textContent = `${Doorloc.length}`
	//only run if door lock window is on screen, saves on performance
	if (window.alt1) {
		//if door lock found
			if (Doorloc.length != 0) {
				
				//recapture just door lock window			
				//pull back the relevant size of the barrows window (500X320 pixels)

				//acount for size diff with 3 funcs, 1 for each puzz except 4sq pieces
				
				imgdoor = a1lib.captureHold((Doorloc[0].x +46),(Doorloc[0].y +214), 397, 278 );   // top left corner coords / bottom left
				//convert that area to data
				var buf1 = imgdoor.toData((Doorloc[0].x +46),(Doorloc[0].y +214),63, 63); 
				
				var buf2 = imgdoor.toData((Doorloc[0].x +189),(Doorloc[0].y +214),63, 63); 
				
				var buf3 = imgdoor.toData((Doorloc[0].x +332),(Doorloc[0].y +214),63, 63); 
				//buf1.show()
				//buf2.show()
				//buf3.show()

				//Compare data stream of left puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf1)
				.compareTo(puzzleimgsCoTo[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {				
					if (parseInt(data.misMatchPercentage) < 10 )
						{
						//display border
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (Doorloc[0].x +46),(Doorloc[0].y +214), (puzzleimgsCoTo[key]['width']+4), (puzzleimgsCoTo[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
					
				//Compare data stream of middle puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf2)
				.compareTo(puzzleimgsCoTo[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {
					if (parseInt(data.misMatchPercentage) < 10 )
						{
						//display border							
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (Doorloc[0].x +189),(Doorloc[0].y +214), (puzzleimgsCoTo[key]['width']+4), (puzzleimgsCoTo[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
					
				//Compare data stream of right puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf3)
				.compareTo(puzzleimgsCoTo[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {				
					if (parseInt(data.misMatchPercentage) < 10 )
						{						
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (Doorloc[0].x +332),(Doorloc[0].y +214), (puzzleimgsCoTo[key]['width']+4), (puzzleimgsCoTo[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
			}
		}
	}
	
	return;
}


function getDiffSq(img:ImgRef){
	//finds door lock mech window from main image
	
	var DoorlocSq = img.findSubimage(doorimg.door);	

	//for every image in puzzleimages
	for (const [key] of Object.entries(puzzleimgsSq)) {
		
	//only run if door lock window is on screen, saves on performance
	if (window.alt1) {
		//if door lock found
		
				//document.getElementById('canvastest2').textContent = `${DoorlocSq.length}`
			if (DoorlocSq.length != 0) {
				
				//recapture just door lock window			
				//pull back the relevant size of the barrows window (500X320 pixels)

				//acount for size diff with 3 funcs, 1 for each puzz except 4sq pieces
				
				imgdoor = a1lib.captureHold((DoorlocSq[0].x +57),(DoorlocSq[0].y +225), 386, 268 );   // top left corner coords / bottom left
				//convert that area to data
				var buf1 = imgdoor.toData((DoorlocSq[0].x +57),(DoorlocSq[0].y +225),41, 41); 
				
				var buf2 = imgdoor.toData((DoorlocSq[0].x +200),(DoorlocSq[0].y +225),41, 41); 
				
				var buf3 = imgdoor.toData((DoorlocSq[0].x +343),(DoorlocSq[0].y +225),41, 41); 
				//buf1.show()
				//buf2.show()
				//buf3.show()

				//Compare data stream of left puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf1)
				.compareTo(puzzleimgsSq[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {				
					if (parseInt(data.misMatchPercentage) < 10 )
						{
						//display border
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (DoorlocSq[0].x +57),(DoorlocSq[0].y +225), (puzzleimgsSq[key]['width']+4), (puzzleimgsSq[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
					
				//Compare data stream of middle puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf2)
				.compareTo(puzzleimgsSq[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {
					if (parseInt(data.misMatchPercentage) < 10 )
						{
						//display border							
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (DoorlocSq[0].x +200),(DoorlocSq[0].y +225), (puzzleimgsSq[key]['width']+4), (puzzleimgsSq[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
					
				//Compare data stream of right puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf3)
				.compareTo(puzzleimgsSq[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {				
					if (parseInt(data.misMatchPercentage) < 10 )
						{						
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (DoorlocSq[0].x +343),(DoorlocSq[0].y +225), (puzzleimgsSq[key]['width']+4), (puzzleimgsSq[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
			}
		}
	}
	
	return;
}


function getDiffCT(img:ImgRef){
	//finds door lock mech window from main image
	
	var DoorlocSq = img.findSubimage(doorimg.door);	

	//for every image in puzzleimages
	for (const [key] of Object.entries(puzzleimgsCT)) {
		
	//only run if door lock window is on screen, saves on performance
	if (window.alt1) {
		//if door lock found
		
				//document.getElementById('canvastest2').textContent = `${DoorlocSq.length}`
			if (DoorlocSq.length != 0) {
				
				//recapture just door lock window			
				//pull back the relevant size of the barrows window (500X320 pixels)

				//acount for size diff with 3 funcs, 1 for each puzz except 4sq pieces
				
				imgdoor = a1lib.captureHold((DoorlocSq[0].x +41),(DoorlocSq[0].y +227), 403, 270 );   // top left corner coords / bottom left
				//convert that area to data
				var buf1 = imgdoor.toData((DoorlocSq[0].x +41),(DoorlocSq[0].y +227),78, 43); 
				
				var buf2 = imgdoor.toData((DoorlocSq[0].x +184),(DoorlocSq[0].y +227),78, 43); 
				
				var buf3 = imgdoor.toData((DoorlocSq[0].x +326),(DoorlocSq[0].y +227),78, 43); 
				//buf1.show()
				//buf2.show()
				//buf3.show()

				//Compare data stream of left puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf1)
				.compareTo(puzzleimgsCT[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {				
					if (parseInt(data.misMatchPercentage) < 10 )
						{
						//display border
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (DoorlocSq[0].x +41),(DoorlocSq[0].y +227), (puzzleimgsCT[key]['width']+4), (puzzleimgsCT[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
					
				//Compare data stream of middle puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf2)
				.compareTo(puzzleimgsCT[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {
					if (parseInt(data.misMatchPercentage) < 10 )
						{
						//display border							
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (DoorlocSq[0].x +184),(DoorlocSq[0].y +227), (puzzleimgsCT[key]['width']+4), (puzzleimgsCT[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
					
				//Compare data stream of right puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf3)
				.compareTo(puzzleimgsCT[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {				
					if (parseInt(data.misMatchPercentage) < 10 )
						{						
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (DoorlocSq[0].x +326),(DoorlocSq[0].y +227), (puzzleimgsCT[key]['width']+4), (puzzleimgsCT[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
			}
		}
	}
	
	return;
}

if (window.alt1) {
	alt1.identifyAppUrl("./appconfig.json");
}