fps = 60;

var designView = function(){
	
	contentHolder = document.getElementById("holder");
	canvas = document.createElement("canvas");
	canvas.id = "design";
	contentHolder.appendChild(canvas);
	ctx = canvas.getContext("2d");
	spriteBatch = new SpriteBatch(ctx);
	Main = new Content(ctx);
	
	gameLoop = setInterval(function(){
		
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		
		Main.Update();
		
		Main.Draw(spriteBatch);
		
		if(Keyboard.isKeyDown("enter"))
		{
			clearInterval(gameLoop);
			
			canvas.remove();
			
			gameView();
		}
		
	}, 1000 / 60)
};



var gameView = function(){
	
	canvas = document.createElement("canvas");
	canvas.id = "game";
	canvas.style.zIndex = 2;
	document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");
	Main = new Game(ctx);
	spriteBatch = new SpriteBatch(ctx);
	
	
	gameLoop = setInterval(function(){
		
		ctx.canvas.width = window.innerWidth - 4;
		ctx.canvas.height = window.innerHeight - 4;
		ctx.canvas.style.backgroundColor = "white";
		
		Main.Update();
		
		Main.Draw(spriteBatch);
		
		if(Keyboard.isKeyDown("escape"))
		{
			clearInterval(gameLoop);
			
			canvas.remove();
			
			designView();
		}
		
	}, 1000 / fps)
};

gameView();
