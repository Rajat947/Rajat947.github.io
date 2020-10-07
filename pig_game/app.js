
var score,roundScore,activePlayer,gameEnd;

//Initilize game's arguments
function initilize(){
	score = [0, 0];
	activePlayer = 0;
	roundScore= 0;
	gameEnd = false;

	//hide dice image
	document.querySelector('.dice').style.display = 'none';

	//setting global score to 0
	document.getElementById('player0-globalScore').textContent = '0';
	document.getElementById('player1-globalScore').textContent = '0';

	//setting players name 
	document.getElementById('player0-name').textContent = 'player 1';
	document.getElementById('player1-name').textContent = 'player 2';

	//setting round score to 0
	document.getElementById('player0-roundScore').textContent = '0';
	document.getElementById('player1-roundScore').textContent = '0';

	//removing winner class
	document.querySelector('.player0').classList.remove('winner');
    document.querySelector('.player1').classList.remove('winner');

    //removing active class
    document.querySelector('.player0').classList.remove('active');
    document.querySelector('.player1').classList.remove('active');

    //adding active class 
    document.querySelector('.player0').classList.add('active');
}

//calling initilize funtion to initilize funtion to start game
initilize();


//Event linstener for Roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
	if(!gameEnd){

		//get a random number for dice
		var dice = Math.floor( Math.random() * 6 ) + 1;
		
		//Display dice result
		document.querySelector('.dice').style.display = 'block';
		document.querySelector('.dice').src = 'images/dice-' + dice + '.png';

		//Update score to roundscore
		if(dice!==1){
			//Add dice value to roundScore
			roundScore += dice;
			document.querySelector('#player' + activePlayer +'-roundScore').textContent = roundScore;

		} else{
			//switch control to next player
			nextPlayer();
		}

	}
});


//Event linstener for hold score button
document.querySelector('.btn-hold').addEventListener('click', function(){
	if(!gameEnd){
		score[activePlayer] += roundScore;

		//update global Score in panel
		document.querySelector('#player' + activePlayer + '-globalScore').textContent = score[activePlayer];

		if(score[activePlayer] >= 100){
			document.getElementById('player' + activePlayer + '-name').textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player' + activePlayer).classList.remove('active');
			document.querySelector('.player' + activePlayer).classList.add('winner');
			gameEnd = true;
		}
		else{
			//switch to next player
			nextPlayer();
		}
	}
});

////Added functionality for new game button
document.querySelector('.btn-new').onclick = function(){
    location.href = "Rules.html";
}

//function for startgame button
//to start game 
function startgame(){
	location.href = "index.html";
	initilize();
}


//function to switch players
function nextPlayer(){
	activePlayer ===0? activePlayer =1: activePlayer =0;
	roundScore = 0;
	document.querySelector('.player0').classList.toggle('active');
	document.querySelector('.player1').classList.toggle('active');
	document.getElementById('player0-roundScore').textContent = '0';
	document.getElementById('player1-roundScore').textContent = '0';
	document.querySelector('.dice').style.display = 'none';
}



