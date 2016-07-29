// � ���������� ������ ������ ������
igra = {};
// � ����� ��������� �������� 'start' � ������� �������� ������� ������ ����
igra.start = function(){
	// ����� � �������
	console.log('start');
	// ����� �������, ����� � ���� �����, � ������ �������� display ������ �� 'none'
	// �������� ��������� �����
	document.getElementById("start-id").style.display='none';
}
// ������� ����������-�������� ������� ����
// ������
igra.shells = [];


// ������� �������� ���� - �������(�����) ��� ����������� �������
igra.reguliarno = function(){
	// ���������� ��������� ������� (�� ���� ������ ���������) (0, 1, 2 ...) � ������� ��������
	for(i in igra.shells){
		// �� �������� ����� ��������� ������� � ��������� � ���� ����� (������� �������) fly
		igra.shells[i].fly();
	}

  
}
// ��������� ������� ����� ��������
setInterval(igra.reguliarno, 1000);

// �����
//  � ���������� ������ ������ ������
player = {};



// ������ �������� ������ (��������� �������) ��� �������� �������
player.top = 65;
player.left = 10;
player.direction = 'right';
player.posledneeNajatie = 'right';

player.kolvoVistrelov = 0;

player.kolvohogov = 0;


// �������-�����-��������: ������� ��������� ���
// � ������� �������� ����� "left" ��� "right" ����� ����� ���� ������� (����� ������ ������)
player.step = function(x){
     // ���� ������ "�����"
	if (x == 'left'){
		player.posledneeNajatie = 'left';
		// �������� � �������� ������ ���������
		player.left = player.left - 1;
	}
	// ���� ������ "������"
	if (x == 'right'){
		// �������� ������ �����������
		player.posledneeNajatie = 'right';
		player.left = player.left + 1;
	}
	// ����� ������� ������ � �������� ��� �� ����������� ��������� (�������� 100 + 'vw' = '100vw')
	document.getElementById("player-id").style.left = player.left + 'vw';
	
	if (x == 'left'){
		document.getElementById("player-id").style.borderRadius = '100px 0 0 0';	
		
	} else {
		document.getElementById("player-id").style.borderRadius = '0 100px 0 0';
	}
	
	// �������� ������������
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
	console.log('����� ������:', x);
}

player.saveGoTemp = function() {
	player.kolvohogov = player.kolvohogov + 1
	console.log('����� � ���� ����:', player.kolvohogov);
}


// ������� ������� ���
player.go = function(x){
	player.saveGo();
	player.saveGoTemp();
	player.direction = x;
	// ��������� �������� ; �������� ��������� ; ��������
	// ���������� ����� �� ���� �� ���� (<4) - ��� ���������� ������ � ������� ����
	for ( i = 0; i < 4; i=i+1) {
		// �������� ��� ����������� - �����
		if(x == "left"){
			// ��������� ����� ������ step � �������� ���� 'left' (�����������)
			player.step('left');
		}
		// �������� ��� ����������� - ������
		if(x == "right"){
			// ��������� ����� ������ step � �������� ���� 'right' (�����������)
			player.step('right');
		}
	}
}

// ������� ������� (�����) jump - ��� ������ ������
player.jump = function(){
	// ����� � �������
	console.log("I jump I jump");
}

// ������� ����� (������-��������) ��� ��������
player.shoot = function(){
	player.saveCounter();
	player.saveCounterTemp();
	// ����� � �������
	console.log("I pif I paf");
	// ��������� � ������ �������� ����� �������
	igra.shells.push(
		// ������� ����� ������ �� ������������ ������ (�������� � ���� ������� ������ � ��������� ����������)
		new Shell (player.top, player.left+4, player.direction)
	);
}


player.saveCounter = function() {
	var x = localStorage.getItem('kolvoviletivshihsnaryadov');
	x = parseInt(x);
	x = x + 1;
	localStorage.setItem('kolvoviletivshihsnaryadov', x);
	console.log('��������� ������:', x);
}

player.saveCounterTemp = function() {
	player.kolvoVistrelov = player.kolvoVistrelov + 1;
	console.log('��������� � ���� ����:', player.kolvoVistrelov);
}

// ����������� �����������
function Monster (name, top, left){
	// ����������� � �������� ������������ ������� �� ��� �������� � ���������� (�� ���� � �������)
	this.name = name;
	this.top = top;
	this.left = left;
	// �������� ������� ������� ������������� � ������
	this.live = true;
	// ��������� �����-������� ��� ��������
	this.fire = function(){
		console.log('pif paf');
	}
	
	// � �������� divElem ������ ��������� html-������� (���������� <div></div>)
	this.divElem = document.createElement('div');
	
	// ���������� �������� ��������� ����� (���������� <div class="monster"></div>)
	this.divElem.className = "monster";
	
	// ���������� ������ ��� �������������� �������� div-place ��������� ������ ��� div-�������
	document.getElementById("div-place").appendChild( this.divElem );
	
	// ������������� ���-�������� �������
	this.divElem.style.top = this.top + 'vh';
	this.divElem.style.left = this.left + 'vw';

}

// ����������� �����������
function Box (name, top, left){
	this.name = name;
	this.top = top;
	this.left = left;
}                                                                                                       

// ����������� ��������
function Shell (top, left, direction){
	this.top = top;
	this.left = left;
	this.direction = direction;
	
	// � �������� divElem ������ ��������� html-������� (���������� <div></div>)
	this.divElem = document.createElement('div');
	
	// ���������� �������� ��������� �����
	this.divElem.className = "shell";
	
	// ���������� ������ �������� div-place ��������� ����� �������
	document.getElementById("div-place").appendChild( this.divElem );
	
	this.divElem.style.top = this.top + 'vh';
	this.divElem.style.left = this.left + 'vw';
	
	// ������� ����� ������
	this.fly = function(){
		// �������� ������� left ����������� �� ���
		if (this.direction == 'left'){
			this.left = this.left - 2;
		} else {
			this.left = this.left + 2;
		}
		
		// html-������������� ������� �������� �� ����� ����������
		
		this.divElem.style.top = this.top + 'vh';
		this.divElem.style.left = this.left + 'vw';
		
		if(this.left > 100){
			this.divElem.style.display = 'none';
	
		}
	}
}

player.checkPosition = function(){
	// ��������  ������������
	if((player.left + 9) >= ppk2.left && player.left <= (ppk2.left + 5) ){
		console.log('stop')
	} 
}





ppk = new Monster ('ppk', 20, 30);
ppk2 = new Monster ('ppk', 66, 50);
ppk3 = new Monster ('ppk', 40, 90);






