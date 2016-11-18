var levels   = [
	[[5,5],[0,0,1],[1,4,2],[2,2,2],[4,3,3]],
	[[5,5],[4,4,4],[4,1,2],[0,2,2],[3,4,5]],
	[[5,5],[0,0,6],[0,4,6],[1,3,2],[3,1,2],[4,2,7],[4,4,7]],
	[[5,5],[0,3,2],[1,0,3],[2,1,1],[2,2,2],[2,3,1],[2,4,2],[4,2,2],[4,3,3]],
	[[5,5],[4,4,4],[3,4,4],[4,3,4],[2,2,2],[2,3,2],[2,0,2],[0,0,5],[1,0,5],[4,1,5]],
	[[5,5],[0,0,6],[1,0,6],[2,0,6],[2,2,2],[1,2,2],[2,3,2],[0,0,7],[3,0,7],[1,3,7]],
	[[6,6],[0,0,1],[1,1,2],[4,0,2],[3,5,2],[5,3,2],[1,4,2],[0,2,3]],
	[[6,6],[0,4,4],[0,5,4],[4,2,2],[2,1,2],[2,5,2],[3,0,5],[3,1,5]],
	[[6,6],[0,4,1],[0,5,6],[4,2,2],[2,1,2],[5,5,2],[3,0,3],[3,1,7],[2,4,2]],
	[[6,6],[0,0,1],[0,1,1],[0,2,4],[0,3,4],[2,2,2],[3,3,2],[1,1,2],[4,4,2],[5,5,5],[5,4,3],[5,3,3],[5,2,5]],
	[[6,6],[5,0,6],[0,5,1],[2,0,2],[3,5,2],[5,3,2],[0,1,7],[0,4,3]],
	[[7,7],[0,0,4],[6,1,2],[0,2,2],[6,4,2],[5,5,2],[1,6,5]],
	[[7,7],[0,0,1],[4,6,2],[2,6,2],[3,6,3],[5,3,2],[0,4,2],[1,1,2],[3,0,2],[4,2,2]],
	[[7,7],[0,0,6],[0,2,2],[5,1,2],[4,3,2],[1,5,2],[3,5,2],[3,4,7]],
	[[7,7],[0,0,1],[0,1,4],[0,2,2],[5,1,2],[4,3,2],[1,5,2],[3,5,2],[4,4,3],[0,3,5]],
	[[3,3],[0,0,1],[0,1,4],[1,0,6],[1,1,2],[0,0,7],[1,0,5],[0,1,3]],
	[[5,5],[0,0,2],[0,1,2],[0,2,2],[0,3,2],[0,4,2],[1,0,2],[1,1,2],[1,2,3],[1,3,2],[1,4,5],[2,0,1],[2,1,4],[2,2,6],[2,3,7],[3,0,2],[3,1,2],[3,2,2],[3,3,2],[3,4,2],[4,0,2],[4,1,2],[4,2,2],[4,3,2],[4,4,2]],
	[[5,5],[0,0,1],[1,0,1],[2,0,1],[2,1,2],[3,0,1],[3,1,2],[4,0,1],[4,1,2],[4,0,3],[3,0,3],[2,0,3],[1,4,3],[4,4,3]],
	[[6,6],[0,0,4],[5,0,4],[0,5,4],[5,5,4],[1,3,2],[4,5,2],[4,4,2],[5,5,5],[5,4,5],[3,5,5],[3,4,5]],
	[[4,4],[0,0,1],[0,1,4],[0,2,6],[2,2,2],[0,1,3],[0,3,5],[3,2,7]]
];
var grid     = [];
var canPress = true;
var victory1 = [];
var victory2 = [];
var victory3 = [];
var currentLevel = 0;
var gameMode = 0;
var gridSizeX = 7;
var gridSizeY = 7;
var cellSize  = 16;
var debug = false;
var highestLevel = 0;
var mc = new Hammer(document.body);

if(localStorage.level && !debug && currentLevel == 0){
	currentLevel = Number(localStorage.level);
	highestLevel = currentLevel;

	for(var i = 0; i <= currentLevel; i++){
		document.getElementById("level-"+(i + 1)).className = "level unlocked";
	}
}

for(var i = 0; i < gridSizeY; i++){
	grid.push(new Array(gridSizeX).fill(0));
}

function showHelp(){
	document.getElementById("no-click").style.visibility = "visible";
	document.getElementById("help-box").style.visibility = "visible";
	gameMode = 1;
}

function hideHelp(){
	document.getElementById("no-click").style.visibility = "hidden";
	document.getElementById("help-box").style.visibility = "hidden";
	gameMode = 2;
}

function showWin(){
	document.getElementById("no-click").style.visibility = "visible";
	document.getElementById("win-box").style.visibility = "visible";
	gameMode = 3;
}

function hideWin(){
	document.getElementById("no-click").style.visibility = "hidden";
	document.getElementById("win-box").style.visibility = "hidden";
	startLevel(levels[currentLevel]);
	gameMode = 2;
}

function showLevelSelect(){
	document.getElementById("no-click").style.visibility = "visible";
	document.getElementById("level-select").style.visibility = "visible";
	gameMode = 4;
}

function hideLevelSelect(){
	document.getElementById("no-click").style.visibility = "hidden";
	document.getElementById("level-select").style.visibility = "hidden";
	startLevel(levels[currentLevel]);
	gameMode = 2;
}

function levelSelect(num){
	if(num - 1 <= highestLevel || debug){
		currentLevel = num - 1;
		hideLevelSelect();
	}
}

function clearType(type){
	var list = document.getElementsByClassName(type);

	while(list.length > 0){
		list[0].parentNode.removeChild(list[0]);
	}
}

function startLevel(level){
	var main = document.getElementById("main");
	victory1 = [];
	victory2 = [];
	victory3 = [];

	gridSizeY = level[0][0];
	gridSizeX = level[0][1];

	cellSize = 80 / gridSizeX;

	grid = [];
	for(var i = 0; i < gridSizeY; i++){
		grid.push(new Array(gridSizeX).fill(0));
	}

	clearType("block");
	clearType("cell-1");
	clearType("victory-1");
	clearType("cell-2");
	clearType("victory-2");
	clearType("cell-3");
	clearType("victory-3");

	document.getElementById("current-level").innerText = currentLevel + 1;

	function newCell(type, num){
		var x = level[i][1];
		var y = level[i][0];
		var cell = document.createElement("div");
		if(num > 0){
			grid[y][x] = num;
		}
		cell.className  = type;
		cell.id 		= y+"-"+x
		cell.style.top  = (cellSize * y) + "vmin";
		cell.style.left = (cellSize * x) + "vmin";
		return cell;
	}

	for(var i = 1; i < level.length; i++){
		if(level[i][2] == 1){
			var cell = newCell("cell-1", 1);
			cell.style.height = (cellSize - 2) + "vmin";
			cell.style.width  = (cellSize - 2) + "vmin";
			main.appendChild(cell);
		}else if(level[i][2] == 2){
			var cell = newCell("block", 2);
			cell.style.height = cellSize + "vmin";
			cell.style.width  = cellSize + "vmin";
			main.appendChild(cell);
		}else if(level[i][2] == 3){
			var cell = newCell("victory-1", 0);
			victory1.push(cell.id);
			cell.id = cell.id + "-victory";
			cell.style.height = cellSize + "vmin";
			cell.style.width  = cellSize + "vmin";
			main.appendChild(cell);
		}else if(level[i][2] == 4){
			var cell = newCell("cell-2", 1);
			cell.style.height = (cellSize - 2) + "vmin";
			cell.style.width  = (cellSize - 2) + "vmin";
			main.appendChild(cell);
		}else if(level[i][2] == 5){
			var cell = newCell("victory-2", 0);
			victory2.push(cell.id);
			cell.id = cell.id + "-victory";
			cell.style.height = cellSize + "vmin";
			cell.style.width  = cellSize + "vmin";
			main.appendChild(cell);
		}else if(level[i][2] == 6){
			var cell = newCell("cell-3", 1);
			cell.style.height = (cellSize - 2) + "vmin";
			cell.style.width  = (cellSize - 2) + "vmin";
			main.appendChild(cell);
		}else if(level[i][2] == 7){
			var cell = newCell("victory-3", 0);
			victory3.push(cell.id);
			cell.id = cell.id + "-victory";
			cell.style.height = cellSize + "vmin";
			cell.style.width  = cellSize + "vmin";
			main.appendChild(cell);
		}
	}
}

function winLevel(){
	showWin();
	currentLevel++;
	if(currentLevel > highestLevel){
		highestLevel++;
		localStorage.level = highestLevel;
		document.getElementById("level-"+(highestLevel + 1)).className = "level unlocked";
	}
}

function moveBricks(direction){
	function doVerticalMove(){
		if(last != i){
			var element = document.getElementById(i+"-"+j);
			element.style.top = (cellSize * last) + "vmin";
			element.id = last+"-"+j;
			grid[last][j] = 1;
			grid[i][j]    = 0;
		}
	}
	function doHorizontalMove(){
		if(last != j){
			var element = document.getElementById(i+"-"+j);
			element.style.left = (cellSize * last) + "vmin";
			element.id = i+"-"+last;
			grid[i][last] = 1;
			grid[i][j]    = 0;
		}
	}

	if(direction == 'down'){
		for(var i = gridSizeY - 2; i >= 0; i--){
			for(var j = gridSizeX - 1; j >= 0; j--){
				if(grid[i][j] == 1){
					var last = gridSizeY - 1;
					for(var k = i + 1; k <= gridSizeY - 1; k++){
						if(grid[k][j] != 0){
							last = k - 1;
							break;
						}
					}

					doVerticalMove();
				}
			}
		}
	}else if(direction == 'up'){
		for(var i = 1; i <= gridSizeY - 1; i++){
			for(var j = gridSizeX - 1; j >= 0; j--){
				if(grid[i][j] == 1){
					var last = 0;
					for(var k = i - 1; k >= 0; k--){
						if(grid[k][j] != 0){
							last = k + 1;
							break;
						}
					}

					doVerticalMove();
				}
			}
		}
	}else if(direction == 'left'){
		for(var i = gridSizeY - 1; i >= 0; i--){
			for(var j = 1; j <= gridSizeX - 1; j++){
				if(grid[i][j] == 1){
					var last = 0;
					for(var k = j - 1; k >= 0; k--){
						if(grid[i][k] != 0){
							last = k + 1;
							break;
						}
					}

					doHorizontalMove();
				}
			}
		}
	}else if(direction == 'right'){
		for(var i = gridSizeY - 1; i >= 0; i--){
			for(var j = gridSizeX - 2; j >= 0; j--){
				if(grid[i][j] == 1){
					var last = gridSizeX - 1;
					for(var k = j + 1; k <= gridSizeX - 1; k++){
						if(grid[i][k] != 0){
							last = k - 1;
							break;
						}
					}

					doHorizontalMove();
				}
			}
		}
	}

	var victoryNum = 0;
	var boxes = document.getElementsByClassName("cell-1");
	for(var i = 0; i < victory1.length; i++){
		for(var j = 0; j < boxes.length; j++){
			if(boxes[j].id == victory1[i]){
				victoryNum++;
			}
		}
	}
	var boxes = document.getElementsByClassName("cell-2");
	for(var i = 0; i < victory2.length; i++){
		for(var j = 0; j < boxes.length; j++){
			if(boxes[j].id == victory2[i]){
				victoryNum++;
			}
		}
	}
	var boxes = document.getElementsByClassName("cell-3");
	for(var i = 0; i < victory3.length; i++){
		for(var j = 0; j < boxes.length; j++){
			if(boxes[j].id == victory3[i]){
				victoryNum++;
			}
		}
	}

	if(victoryNum == victory1.length + victory2.length + victory3.length){
		if(!debug){setTimeout(winLevel, cellSize);}
	}
}

function keyPressed(event){
	if(canPress){
		if(gameMode == 2){
			if(event.which == 38){        //up
				moveBricks('up');

			}else if(event.which == 37){  //left
				moveBricks('left');

			}else if(event.which == 39){  //right
				moveBricks('right');

			}else if(event.which == 40){  //down
				moveBricks('down');

			}else if(event.which == 82){  //R
				startLevel(levels[currentLevel]);

			}
		}
		if(event.which == 13){  //enter
			if(gameMode == 0){ // start
				hideHelp();
				startLevel(levels[currentLevel]);
			}else if(gameMode == 1){ // help
				hideHelp();
			}else if(gameMode == 3){ // win
				hideWin();
			}
		}

		canPress = false;
		setTimeout(function(){canPress = true}, 100);
	}
}

mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

mc.on("swipeleft swiperight swipeup swipedown", function(ev) {
	if(gameMode == 2){
		moveBricks(ev.type.substring(5));
	}
});

startLevel(levels[currentLevel]);