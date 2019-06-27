var strictMode = "disabled";
var btnID = "";
var seqArray = [];
var i = 0;
var running = false;
var interval = null;
var playerTurns = 0;
var winRounds = 20;


var quad1snd = new Audio('https://www.soundjay.com/button/sounds/button-36.mp3');
var quad2snd = new Audio('https://www.soundjay.com/button/sounds/button-41.mp3');
var quad3snd = new Audio('https://www.soundjay.com/button/sounds/button-31.mp3');
var quad4snd = new Audio('https://www.soundjay.com/button/sounds/button-35.mp3');
var wrongAns = new Audio('https://www.soundjay.com/button/sounds/button-4.mp3');

$("#onOffSwitch").on('mousedown', function() {

		$("#onOffSwitch").css({"float":"right"});
		
		if (running) {
			$("#onOffSwitch").css({"float":"left"});
			running = false;
			$("#scoreBox").html("");
			seqArray = [];
			i = 0;
			if(interval) {
				clearInterval(interval);
				interval = null;
			}
			return;
		}
		running = true;
		$("#scoreBox").html("--");
				
		$("#startBtn").on('click', function(e) {
				
			if (!running) {
				return;
			}
			$("#scoreBox").html("--");
  			seqArray = [];
  			i = 0;
  			this.i = 0;
  			var btnID = "";
  			var playerTurns = 0;
			if(interval) {
				clearInterval(interval);
				interval = null;
			}
			
			nextRnd();	
		});

  });


$('#strictBtn').on('click', function(e) {
		$('.onLight').toggleClass("active");
		if (strictMode = "disabled") {
			strictMode="enabled";
		} else {
			strictMode="disabled";
		}
});

  	  $('.quad1').on('mousedown', function() {
  	  		  if(!running) {
    		return;
    	}
        $(this).addClass('quad1active');
        quad1snd.play();

      }).on('mouseup', function() {
      	  if(!running) {
    		return;
    	}
        $(this).removeClass('quad1active');
      });

      // green
      $('.quad2').on('mousedown', function() {
      	if(!running) {
    		return;
    	}
        $(this).addClass('quad2active');

        quad2snd.play();

      }).on('mouseup', function() {
      	  if(!running) {
    		return;
    	}
        $(this).removeClass('quad2active');
      });

      // yellow
      $('.quad3').on('mousedown', function() {
      	if(!running) {
    		return;
    	}
        $(this).addClass('quad3active');

        quad3snd.play();

      }).on('mouseup', function() {
      	  if(!running) {
    		return;
    	}
        $(this).removeClass('quad3active');
      });

      // Blue
      $('.quad4').on('mousedown', function() {
      	if(!running) {
    		return;
    	}
        $(this).addClass('quad4active');

        quad4snd.play();

      }).on('mouseup', function() {
      	  if(!running) {
    		return;
    	}
        $(this).removeClass('quad4active');
      });
 
      function player(btnPush) {
      	  
      	  
    	
    	console.log("Player");
    	
    	if(!running) {
    		return;
    	}
    	    	
    	btnID = ("quad" + btnPush);
    	console.log("btnID = " + btnID);
  	
    	
      	endCheck(btnPush, playerTurns);
      	playerTurns++;
      	
      	if(playerTurns < seqArray.length) {
      		return;
      	}
      
      nextRnd();
    }  

      	function endCheck(btnPush, i) {

   		if(i > winRounds) {
  			alert("winner!");
  			$("#scoreBox").html("--");
  			seqArray = [];
  			i = 0;
  			this.i = 0;
  			var btnID = "";
  			var playerTurns = 0;
			if(interval) {
				clearInterval(interval);
				interval = null;
			}
  		} else if ((btnPush !== seqArray[i]) && strictMode === "disabled") {
  			$("#scoreBox").html("!!");
  			wrongAns.play();
  			$("#scoreBox").html("!!");
  			playSeq(seqArray);
  		} else if ((btnPush !== seqArray[i]) && strictMode === "enabled") {
  			$("#scoreBox").html("!!");
  			wrongAns.play();
  			$("#scoreBox").html("--");
  			seqArray = [];
  			this.i = 0;
  			var btnID = "";
  			var playerTurns = 0;
			if(interval) {
				clearInterval(interval);
				interval = null;
			}

		}
		
	} 
	
	

    function nextRnd() {
    	console.log("I = " + i);
    	$("#scoreBox").html(i + 1);
      
      seqArray.push(getRandomArbitrary(1, 5));
      playSeq(seqArray);
      i++;
    }
    
    $(".tile").on('click', function() { 
    	if(running == false) {
    		return;
    	}
    	
    	btnPush = Number(this.id);
    	
    	
    	player(btnPush);
    	
    	
    });
    	
function playerTurn() {
	playerTurns = 0;
}

   
function playSeq(seqArray) {
	

      var j = 0;

      if(interval === null) {
      interval = setInterval(function() {
        playIt(seqArray[j]);
        flashIt(seqArray[j]);

        j++;
        if (j >= seqArray.length) {
          clearInterval(interval);
          interval = null;
          playerTurn();
        }
      }, 1000);
      }
} // End playSeq

function flashIt(j) {

      if (j == 1) {
        $(".quad1").addClass('quad1active');
        setTimeout(function() {
          $(".quad1").removeClass('quad1active');
        }, 300);
      };

      if (j == 2) {
        $(".quad2").addClass('quad2active');
        setTimeout(function() {
          $(".quad2").removeClass('quad2active');
        }, 300);
      };

      if (j == 3) {
        $(".quad3").addClass('quad3active');
        setTimeout(function() {
          $(".quad3").removeClass('quad3active');
        }, 300);

      };

      if (j == 4) {
        $(".quad4").addClass('quad4active');
        setTimeout(function() {
          $(".quad4").removeClass('quad4active');
        }, 300);
      };
}  // End flashIt

    function playIt(j) {
      if (j == 1) {
        quad1snd.play(); 
      };

      if (j == 2) {
        quad2snd.play();
      };
      if (j == 3) {
        quad3snd.play();
      };
      if (j == 4) {
        quad4snd.play();
      };
    } // End playIt

    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    } // End getRandomArbitrary
