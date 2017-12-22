/*****************************************************
	* 金额千字符显示,同时限制整数部分和小数部分长度
	* @param intLength 		整数部分长度
	* @param floatLength 	小数部分长度
	* 调用方式同:input元素的onkeyup可onblur属性同时调用
	******************************************************/
	function constraintMoneyLength(intLength,floatLength){
		/* 触发千字符显示事件的对象 */
		var key = event.keyCode;
		if(key==37||key==38||key==39||key==40){
			return;
		}
		var srcObj = event.srcElement;
		var money = srcObj.value;
		
		if(money==null)return false;
		
		var sValue = money.replace(/,/g,'');
		var splitResult = sValue.split(".");
		var intPart = splitResult[0];
		var floatPart = splitResult[1];
		var sign = "";
		if(intPart.indexOf('-')!=-1){
			intPart = intPart.substring(1,intPart.length);
			sign='-';
		}
		if(intPart.length>=intLength){
			intPart = intPart.substring(0,intLength);			
		}
		if(floatPart!=null&&floatPart.length>=floatLength){
			floatPart = floatPart.substring(0,floatLength);		
		}
		
		if(floatPart!=null){
			sValue = sign + intPart + "." +floatPart;
		}else{
			sValue = sign + intPart; 
		}
		
		money = sValue;

		var tmp ='' ;
		for(var i = 0 ; i<money.length; i++){
			var char = money.charAt(i);
			if(char=='-'||char=='.') tmp+=char;//如果是负号，小数点，保留
			else tmp+=char.replace(/\D/,'');//如果不是数字，去掉
		}
		money = tmp;
		var pos = money.indexOf('-');
		if(pos!=-1){//去除多余的负号'-'
			money = money.substring(0,1)+money.substring(1).replace(/-/g,'');
		}
		pos = money.indexOf('.');
		if(pos!=-1){//去除多余的小数点'.'
			money = money.substring(0,pos+1)+money.substring(pos+1).replace(/\./g,'');
			if(pos==0) money = '0'+money;//小数点在首位则加'0'
		}

		//校验输入是否符合规范
		if(isNaN(money)){//应该不会进入这里
			if(money!='-'&&money!='.'){
				alert("请输入数字");
			  	return false;
			}
			srcObj.value = money;
			return true;
		}

		/**
		* 三位分节转换
		*/
		function convert(s){
			if(s.charAt(0)=='-'){
				return '-'+addComma(s.substring(1));
			}else{
				return addComma(s);
			}
		}

		/**
		* 加上分割符","
		*/
		function addComma(s){
			//去除首位多余的0
			while(s.charAt(0)=='0'){
				if(s.length==1||s.charAt(1)=='.')
					break;
				else
					s = s.substring(1);
			}
			var length = s.length;
			var array = new Array();
			//加逗号
			for(var i = 1; i<=length; i++){
				var pos = length - i ;
				array[array.length]=s.charAt(pos);
				if(pos!=0&&i%3==0){
					array[array.length]=",";
				}
			}
			return array.reverse().join('');
		}

		//分别讨论有无小数部分的情况
		if(money.indexOf('.')!=-1){
			var splitArray = money.split('.');
			var head = splitArray[0];//整数部分
			var tail = splitArray[1];//小数部分
			money = convert(head)+'.'+tail;
		}else{
			money = convert(money);
		}
		var scale = parseInt(srcObj.moneyScale);
		if(isNaN(scale))
			scale = floatLength;
		if(!isNaN(scale)){
			pos=money.indexOf('.');
			if(pos!=-1)
				money = money.substring(0,pos)+money.substring(pos,pos+scale+1);
		}
		if(event.type=='blur')
			money = money.replace(/\.$/,'\.0');
		srcObj.value = money;
		return true;
	}