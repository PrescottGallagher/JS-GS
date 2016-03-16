//Class Vector 2:

var Vector2 = function(x, y)
{
	this.X = x;
	this.Y = y;
};

//Returns a new Vector2 with values set to 1
Vector2.One = function()
{
	return new Vector2(1, 1);
};

//Returns a new Vector2 with values set to 0
Vector2.Zero = function()
{
	return new Vector2(0, 0);
};

//Returns a new Vector2 that is a copy of Parameter
Vector2.Clone = function(Vector)
{
	return new Vector2(Vector.X, Vector.Y);
};

//Returns a new Vector2 that is the total of Vec1 and Vec2
Vector2.Add = function(Vec1, Vec2)
{
	return new Vector2(Vec1.X + Vec2.X, Vec1.Y + Vec2.Y);
};

//Returns a new Vector2 that is the difference between Vec1 and Vec2
Vector2.Subtract = function(Vec1, Vec2)
{
	return new Vector2(Vec1.X - Vec2.X, Vec1.Y - Vec2.Y);
};

//Returns a new Vector2 that is scaled between Vec1 and Vec2 using amount
Vector2.Lerp = function(Vec1, Vec2, amount)
{
	if(amount != 1 || amount !== 0)
	{
		var amountX = (((Vec1.X > Vec2.X) ? Vec1.X : Vec2.X) - ((Vec1.X < Vec2.X) ? Vec1.X : Vec2.X)) / 100;
		var amountY = (((Vec1.Y > Vec2.Y) ? Vec1.Y : Vec2.Y) - ((Vec1.Y < Vec2.Y) ? Vec1.Y : Vec2.Y)) / 100;
		return new Vector2(Vec1.X + (amountX * (amount * 100)), Vec1.Y + (amountY * (amount * 100)));
	}
	else if(amount === 0)
	{
		return Vec1;
	}
	else if(amount == 1)
	{
		return Vec2;
	}
};

//Returns a new Vector2 that is a scaled form of Vector using amount
Vector2.Multiply = function(Vector, scalar)
{
	return new Vector2(Vector.X * scalar, Vector.y * scalar);
};

//End Vector2 Class


//Class Rectangle


var Rectangle = function(x, y, width, height)
{
	this.X = x;
	this.Y = y;
	this.width = width;
	this.height = height;
	this.topLeft = new Vector2(x, y);
	this.topRight = new Vector2(x + width, y);
	this.bottomLeft = new Vector2(x, y + height);
	this.bottomRight = new Vector2(x + width, y + height);
	
	
	//Returns true if Parameter is inside Rectangle
	this.Contains = function(Vector)
	{
		var a = Vector.X;
		var b = Vector.Y;
		if(a >= this.X && a <= this.X + this.width && b >= this.Y && b <= this.Y + this.height) //Good
			return true;
		return false;
	};
	
	//Returns true if given coordinate is inside Rectangle
	this.Contains = function(x, y)
	{
		if(x >= this.X && x <= this.X + this.width && y >= this.Y && y <= this.Y + this.height) //Good
			return true;
		return false;
	};
	
	//Returns true if Parameter intersects Rectangle
	this.Intersects = function(Rect)
	{
		if((this.Contains(Rect.topLeft) || this.Contains(Rect.topRight)) || (this.Contains(Rect.bottomLeft) || this.Contains(Rect.bottomRight)))
			return true;
		else if((Rect.Contains(this.topLeft) || Rect.Contains(this.topRight)) || (Rect.Contains(this.bottomLeft) || Rect.Contains(this.bottomRight)))
			return true;
		return false;
	};
	
	//Drawsa Rectangle on screen given just the Color and Drawing Context
	this.Draw = function(ctx, fillColor)
	{
		ctx.fillRect(this.X, this.Y, this.width, this.height);
	};
	
	//Draws the border around the rectangle given just the Color and Drawing Context
	this.Draw = function(ctx, strokeColor)
	{
		ctx.strokeRect(this.X, this.Y, this.width, this.height);
	};
	
	//Draws a Rectangle on screen with a border
	this.Draw = function(ctx, fillColor, StrokeColor)
	{
		this.Draw(ctx, fillColor);
		this.Draw(ctx, StrokeColor);
	};
};

//Returns a new Rectangle with it's values set to 0
Rectangle.Empty = function()
{
	return new Rectangle(0, 0, 0, 0);
};

//End Rectangle Class

//Class SpriteBatch:


var SpriteBatch = function(context)
{
	this.ctx = context;
	this.canDraw = false;
	
	
	//Pointless (Emulates XNA 4.0)
	this.Begin = function()
	{
		this.canDraw = true;
	};
	
	//Pointless (Emulates XNA 4.0)
	this.End = function()
	{
		this.canDraw = false;
	};
	
	//Draws a section of an Image
	this.Draw = function(img, DrawRectangle, SheetRectangle)
	{
		if(this.canDraw)
			context.drawImage(img, SheetRectangle.X, SheetRectangle.Y, SheetRectangle.width, SheetRectangle.height, DrawRectangle.X, DrawRectangle.Y, DrawRectangle.width, DrawRectangle.height);
		else
			throw "error: must call Begin before drawing.";
	};
	
	//Draws the full Image (Scaled)
	this.DrawIF = function(img, DrawRectangle)
	{
		if(this.canDraw)
		{
			context.drawImage(img, DrawRectangle.X, DrawRectangle.Y, DrawRectangle.width, DrawRectangle.height);
		}
		else
			throw "error: must call Begin before drawing.";
	};
	
	//Draws a Black Box (For testing)
	this.Draw = function(Rect)
	{
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(Rect.X, Rect.Y, Rect.width, Rect.height);
	};
	
	//Draws a Colored Box (for testing)
	this.Draw = function(Rect, color, z, x, c)
	{
		this.ctx.fillStyle = color;
		this.ctx.fillRect(Rect.X, Rect.Y, Rect.width, Rect.height);
	};
};

//End SpriteBatch Class

//Class Viewport (Unfinished):


var XViewPort = function()
{
	this.x = 0;
	this.y = 0;
	this.maxRect = Vector2.Zero();
	
	this.lookAt = function(Vec)
	{
		this.x = this.x + (Vec.X / 2);
		this.y = this.y + (Vec.Y / 2);
	};
};

//End Viewport Class

//Class Keyboard

var KeyboardX = function()
{
	this.keysDown = [];
	
	this.KeyC = 
	{
		8: "backspace",
		9: "tab",
		12: "num",
		13: "enter",
		16: "shift",
		17: "ctrl",
		18: "alt",
		19: "pause",
		20: "caps",
		27: "escape",
		32: "space",
		33: "pageup",
		34: "pagedown",
		35: "end",
		36: "home",
		37: "left",
		38: "up",
		39: "right",
		40: "down",
		44: "print",
		45: "insert",
		46: "delete",
		48: "0",
		49: "1",
		50: "2",
		51: "3",
		52: "4",
		53: "5",
		54: "6",
		55: "7",
		56: "8",
		57: "9",
		65: "a",
		66: "b",
		67: "c",
		68: "d",
		69: "e",
		70: "f",
		71: "g",
		72: "h",
		73: "i",
		74: "j",
		75: "k",
		76: "l",
		77: "m",
		78: "n",
		79: "o",
		80: "p",
		81: "q",
		82: "r",
		83: "s",
		84: "t",
		85: "u",
		86: "v",
		87: "w",
		88: "x",
		89: "y",
		90: "z",
		96: "num_0",
		97: "num_1",
		98: "num_2",
		99: "num_3",
		100: "num_4",
		101: "num_5",
		102: "num_6",
		103: "num_7",
		104: "num_8",
		105: "num_9",
		186: ";",
		187: "=",
		188: ",",
		189: "-",
		190: ".",
		191: "/",
		192: "`",
		219: "[",
		220: "\\",
		221: "]",
		222: "\'",
		224: "cmd",
	};
};

var Keyboard = new KeyboardX();

Keyboard.isKeyDown = function(key)
{
	for(var i = 0; i != Keyboard.keysDown.length; i++)
	{
		if(Keyboard.keysDown[i] == key)
			return true;
	}
	return false;
};

Keyboard.isKeyUp = function(key)
{
	for(var i = 0; i != Keyboard.keysDown.length; i++)
	{
		if(Keyboard.keysDown[i] == key)
			return false;
	}
	return true;
};

window.onkeydown = function(e){
	Keyboard.keysDown.push(Keyboard.KeyC[e.keyCode]);
};

window.onkeyup = function(e){
	Keyboard.keysDown.splice(Keyboard.keysDown.indexOf(Keyboard.KeyC[e.keyCode]), 1);
};

//End Keyboard Class

//End MAIN FUNCTIONS


//Main TileMap

var TileMap = function(img)
{
	
};

//End TileMap

//Main Actor

var Actor = function(SpriteBatch)
{
	var Components = [];
	this.Position = new Vector2();
	
	this.Sprite = new Image();
	
	this.AddComponent = function(component){
		Components.push(component);
	};
	
	this.getComponents = function(){
		return Components;
	};
	
	this.Update = function(){
		if(Components.length === 0)
			return 0;
		
		else
			for(var c = 0; c != Components.length(); c++)
				Components[c].Update(this);
	};
	
	this.Draw = function(){
		if(this.Sprite.src === "")
			SpriteBatch.Draw(this.Sprite, new Rectangle(0, 0, 0, 0));
	};
};

//End Main Actor
