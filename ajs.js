// в переменную кладем пустой объект
igra = {};
// в обект добавляем свойство 'start' в котором хранится функция начала игры
igra.start = function(){
	// пишем в консоль
	console.log('start');
	// берем элемент, берем у него стили, в стилях свойство display меняем на 'none'
	// скрываем начальный экран
	document.getElementById("start-id").style.display='none';
}
// создаем переменную-свойство объекта Игра
// массив
igra.shells = [];


// создаем свойство Игры - функция(метод) для регулярного запуска
igra.reguliarno = function(){
	// перебираем поочереди индексы (то есть номера элементов) (0, 1, 2 ...) в массиве Снарядов
	for(i in igra.shells){
		// из снарядов берем очередной элемент и запускаем у него метод (функция объекта) fly
		igra.shells[i].fly();
	}

  
}
// запускаем функцию через интервал
setInterval(igra.reguliarno, 1000);

// игрок
//  в переменную кладем пустой объект
player = {};



// создаём свойства игрока (перменные объекта) для хранения позиции
player.top = 65;
player.left = 10;
player.direction = 'right';
player.posledneeNajatie = 'right';

player.kolvoVistrelov = 0;

player.kolvohogov = 0;


// функция-метод-действие: сделать маленький шаг
// в функцию приходит текст "left" или "right" чтобы знать куда двигать (какую кнопку нажали)
player.step = function(x){
     // если пришло "влево"
	if (x == 'left'){
		player.posledneeNajatie = 'left';
		// свойство с позицией Игрока уменьшаем
		player.left = player.left - 1;
	}
	// если пришло "вправо"
	if (x == 'right'){
		// свойство Игрока увеличиваем
		player.posledneeNajatie = 'right';
		player.left = player.left + 1;
	}
	// берем элемент Игрока и сдвигаем его на вычисленное положение (например 100 + 'vw' = '100vw')
	document.getElementById("player-id").style.left = player.left + 'vw';
	
	if (x == 'left'){
		document.getElementById("player-id").style.borderRadius = '100px 0 0 0';	
		
	} else {
		document.getElementById("player-id").style.borderRadius = '0 100px 0 0';
	}
	
	// проверка столкновения
	player.checkPosition();
	
	
}

player.saveGo = function() {
	if (localStorage.getItem('kolvohogov') == 'NaN' || localStorage.getItem('kolvohogov') == null){
		var x = 0;
	} else {
		var x = localStorage.getItem('kolvohogov');
	}
	x = parseInt(x);
	x = x + 1;
	localStorage.setItem('kolvohogov', x);
	console.log('ходов вообще:', x);
}

player.saveGoTemp = function() {
	player.kolvohogov = player.kolvohogov + 1
	console.log('ходов в этой игре:', player.kolvohogov);
}


// сделать большой шаг
player.go = function(x){
	player.saveGo();
	player.saveGoTemp();
	player.direction = x;
	// начальное значение ; проверка остановки ; прибавка
	// перебираем цифры от нуля до трех (<4) - это количество шажков в большом шаге
	for ( i = 0; i < 4; i=i+1) {
		// проверим что направление - влево
		if(x == "left"){
			// запускаем метод Игрока step и передаем туда 'left' (направление)
			player.step('left');
		}
		// проверим что направление - вправо
		if(x == "right"){
			// запускаем метод Игрока step и передаем туда 'right' (направление)
			player.step('right');
		}
	}
}

// создаем функцию (метод) jump - для прыжка игрока
player.jump = function(){
	// пишем в консоли
	console.log("I jump I jump");
}

// создаем метод (функци-действие) для выстрела
player.shoot = function(){
	player.saveCounter();
	player.saveCounterTemp();
	// пишем в консоль
	console.log("I pif I paf");
	// добавляем в массив Снарядов новый элемент
	igra.shells.push(
		// создаем новый объект из конструктора Снаряд (передаем в него позицию игрока с небольшой коррекцией)
		new Shell (player.top, player.left+4, player.direction)
	);
}


player.saveCounter = function() {
	var x = localStorage.getItem('kolvoviletivshihsnaryadov');
	x = parseInt(x);
	x = x + 1;
	localStorage.setItem('kolvoviletivshihsnaryadov', x);
	console.log('выстрелов вообще:', x);
}

player.saveCounterTemp = function() {
	player.kolvoVistrelov = player.kolvoVistrelov + 1;
	console.log('выстрелов в этой игре:', player.kolvoVistrelov);
}

// конструктор противников
function Monster (name, top, left){
	// записывваем в свойства создаваемого объекта то что передано в параметрах (то есть в скобках)
	this.name = name;
	this.top = top;
	this.left = left;
	// свойство живости вначале устанавливаем в Правду
	this.live = true;
	// создается метод-функция для выстрела
	this.fire = function(){
		console.log('pif paf');
	}
	
	// в свойство divElem кладем созданный html-элемент (получается <div></div>)
	this.divElem = document.createElement('div');
	
	// созданному элементу добавляем класс (получается <div class="monster"></div>)
	this.divElem.className = "monster";
	
	// запихиваем внутрь уже заготовленного элемента div-place созданный только что div-элемент
	document.getElementById("div-place").appendChild( this.divElem );
	
	// устанавливаем див-элементу позицию
	this.divElem.style.top = this.top + 'vh';
	this.divElem.style.left = this.left + 'vw';

}

// конструктор препятствий
function Box (name, top, left){
	this.name = name;
	this.top = top;
	this.left = left;
}                                                                                                       

// конструктор снарядов
function Shell (top, left, direction){
	this.top = top;
	this.left = left;
	this.direction = direction;
	
	// в свойство divElem кладем созданный html-элемент (получается <div></div>)
	this.divElem = document.createElement('div');
	
	// созданному элементу добавляем класс
	this.divElem.className = "shell";
	
	// запихиваем внутрь элемента div-place созданный ранее элемент
	document.getElementById("div-place").appendChild( this.divElem );
	
	this.divElem.style.top = this.top + 'vh';
	this.divElem.style.left = this.left + 'vw';
	
	// создаем метод полета
	this.fly = function(){
		// свойство снаряда left увеличиваем на два
		if (this.direction == 'left'){
			this.left = this.left - 2;
		} else {
			this.left = this.left + 2;
		}
		
		// html-представление Снаряда сдвигаем на новые координаты
		
		this.divElem.style.top = this.top + 'vh';
		this.divElem.style.left = this.left + 'vw';
		
		if(this.left > 100){
			this.divElem.style.display = 'none';
	
		}
	}
}

player.checkPosition = function(){
	// проверим  столкновение
	if((player.left + 9) >= ppk2.left && player.left <= (ppk2.left + 5) ){
		console.log('stop')
	} 
}





ppk = new Monster ('ppk', 20, 30);
ppk2 = new Monster ('ppk', 66, 50);
ppk3 = new Monster ('ppk', 40, 90);






