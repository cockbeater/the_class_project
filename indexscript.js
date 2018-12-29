
var length= people.length;
var randomarr=[];
var currentpageindex=0;
var tref;
var arepicsset;
var images_=[];
var selectedquarterindex=-1;
var movelefticon,moverighticon;

(function(){
	
	var loadingdiv=document.getElementById('loadingdiv');
	loadingdiv.style.position="fixed";
	loadingdiv.style.width=window.innerWidth+"px";
	loadingdiv.style.height=window.innerHeight+"px";
	
	var count=0;
	for(var i=0;i<length;++i){
		var src='pics/picroll'+(i+1)+'.jpg';
		var img=new Image();
		img.onload=function(){
			++count;
			var per=Math.ceil((count/length)*100);
			document.getElementById('lmessage').innerHTML=("Loading : "+per+"%<br><br>(Best viewed in full screen)");
			if(count===length){
				document.getElementById('loadingdiv').style.display="none";
			}
		};
		img.src=src;
		images_.push(img);
	}
	
	movelefticon=document.getElementById("leftarr");
	moverighticon=document.getElementById("rightarr");
	movelefticon.style.display="none";
	
	for(var i=0;i<length;++i){
		randomarr[i]=i;
	}
	randomarr=shuffle(randomarr);
	
	var divs=document.getElementsByClassName('col');
	for(var i=0;i<divs.length;++i){
		divs[i].onmouseenter=function(event){
			var did=event.target.id;
			if(did==="col0"){
				selectedquarterindex=0;
			}else if(did==="col1"){
				selectedquarterindex=1;
			}else if(did==="col2"){
				selectedquarterindex=2;
			}else if(did==="col3"){
				selectedquarterindex=3;
			}
			selectquarter();
		};
	}
	
	document.getElementById("sidediv0").onmouseenter=function(){
		selectedquarterindex=-1;
		selectquarter();
	};
	document.getElementById("sidediv1").onmouseenter=function(){
		selectedquarterindex=-1;
		selectquarter();
	};
	document.getElementById("parentdiv").onmouseenter=function(){
		selectedquarterindex=-1;
		selectquarter();
	};
	document.getElementById('rightarr').onmouseenter=function(){
		selectedquarterindex=-1;
		selectquarter();
	};
	document.getElementById('leftarr').onmouseenter=function(){
		selectedquarterindex=-1;
		selectquarter();
	};
	
	setpicsanddesc();
	
	window.onkeyup=function(e){
		var key=e.keyCode?e.keyCode:e.which;
		
		if(key===37){
			//left;
			if(currentpageindex>0){
				currentpageindex-=4;
				moverighticon.style.display="block";
				if(currentpageindex===0){
					movelefticon.style.display="none";
				}
				blurredinout();
			}
		}else if(key===39){
			//right
			if((currentpageindex+4)<length){
				currentpageindex+=4;
				movelefticon.style.display="block";
				if((length-currentpageindex)<=4){
					moverighticon.style.display="none";
				}
				blurredinout();
			}
		}
	};
	
	document.getElementById('leftarr').onclick=function(){	
		//left;
		if(currentpageindex>0){
			currentpageindex-=4;
			moverighticon.style.display="block";
			if(currentpageindex===0){
				movelefticon.style.display="none";
			}
			blurredinout();
		}
	};
	
	document.getElementById('rightarr').onclick=function(){	
		//right
		if((currentpageindex+4)<length){
			currentpageindex+=4;
			movelefticon.style.display="block";
			if((length-currentpageindex)<=4){
				moverighticon.style.display="none";
			}
			blurredinout();
		}
	};
	
})();

function blurredinout(){
	tref=Date.now();
	arepicsset=false;
	execanim();
}

function execanim(){
	var t=(Date.now()-tref)/1000;
	
	if(t<0.3){
		var val=Math.floor(20*Math.sin((10/3)*Math.PI*t));
		var opac=90+Math.floor(10*(1 - Math.sin((10/3)*Math.PI*t)));
		opac=(opac>100)?100:opac;
		document.getElementById("col0").style.filter="blur("+val+"px) grayscale(0%) opacity("+opac+"%)";
		document.getElementById("col1").style.filter="blur("+val+"px) grayscale(0%) opacity("+opac+"%)";
		document.getElementById("col2").style.filter="blur("+val+"px) grayscale(0%) opacity("+opac+"%)";
		document.getElementById("col3").style.filter="blur("+val+"px) grayscale(0%) opacity("+opac+"%)";
		setTimeout(execanim,1);
	}else{
		selectquarter();
	}
	
	if((t>=0.15)&&(!arepicsset)){
		arepicsset=true;
		setpicsanddesc();
	}
}

function setpicsanddesc(){
	var cp=currentpageindex;
	if(cp<length){
		document.getElementById("col0").style.backgroundImage="url("+images_[randomarr[cp]].src+")";
		document.getElementById("actualtext0").innerHTML=("<b>"+people[randomarr[cp]].name+"</b><br><br>"+people[randomarr[cp]].description);
	}
	++cp;
	if(cp<length){
		document.getElementById("col1").style.backgroundImage="url("+images_[randomarr[cp]].src+")";
		document.getElementById("actualtext1").innerHTML=("<b>"+people[randomarr[cp]].name+"</b><br><br>"+people[randomarr[cp]].description);
	}
	++cp;
	if(cp<length){
		document.getElementById("col2").style.backgroundImage="url("+images_[randomarr[cp]].src+")";
		document.getElementById("actualtext2").innerHTML=("<b>"+people[randomarr[cp]].name+"</b><br><br>"+people[randomarr[cp]].description);
	} 
	++cp;
	if(cp<length){
		document.getElementById("col3").style.backgroundImage="url("+images_[randomarr[cp]].src+")";
		document.getElementById("actualtext3").innerHTML=("<b>"+people[randomarr[cp]].name+"</b><br><br>"+people[randomarr[cp]].description);
	}
}

function selectquarter(){
	if(selectedquarterindex===0){
		document.getElementById("text0").style.display="block";
		document.getElementById("text1").style.display="none";
		document.getElementById("text2").style.display="none";
		document.getElementById("text3").style.display="none";
			
		document.getElementById("col0").style.filter = "blur(2.5px) grayscale(100%)";
		document.getElementById("col1").style.filter="none";
		document.getElementById("col2").style.filter="none";
		document.getElementById("col3").style.filter="none";
	}else if(selectedquarterindex===1){
		document.getElementById("text0").style.display="none";
		document.getElementById("text1").style.display="block";
		document.getElementById("text2").style.display="none";
		document.getElementById("text3").style.display="none";
				
		document.getElementById("col0").style.filter="none";
		document.getElementById("col1").style.filter="blur(2.5px) grayscale(100%)";
		document.getElementById("col2").style.filter="none";
		document.getElementById("col3").style.filter="none";
	}else if(selectedquarterindex===2){
		document.getElementById("text0").style.display="none";
		document.getElementById("text1").style.display="none";
		document.getElementById("text2").style.display="block";
		document.getElementById("text3").style.display="none";
				
		document.getElementById("col0").style.filter="none";
		document.getElementById("col1").style.filter="none";
		document.getElementById("col2").style.filter="blur(2.5px) grayscale(100%)";
		document.getElementById("col3").style.filter="none";
	}else if(selectedquarterindex===3){
		document.getElementById("text0").style.display="none";
		document.getElementById("text1").style.display="none";
		document.getElementById("text2").style.display="none";
		document.getElementById("text3").style.display="block";
				
		document.getElementById("col0").style.filter="none";
		document.getElementById("col1").style.filter="none";
		document.getElementById("col2").style.filter="none";
		document.getElementById("col3").style.filter="blur(2.5px) grayscale(100%)";
	}else{
		document.getElementById("text0").style.display="none";
		document.getElementById("text1").style.display="none";
		document.getElementById("text2").style.display="none";
		document.getElementById("text3").style.display="none";
				
		document.getElementById("col0").style.filter="none";
		document.getElementById("col1").style.filter="none";
		document.getElementById("col2").style.filter="none";
		document.getElementById("col3").style.filter="none";
	}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

