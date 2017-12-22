require(["jquery","des","bootstrapdatetimepicker", "bootstrapdatetimepickeri18n", "bootstrap-table", "bootstrap","bootstrapTableZhCn","jqvalidatei18n","additionalmethods","jqtreeview","zTree","zTreecheck"], function ($) {
	var gb_count = 1;
	//console.log(strEncrypt('{"paymentId":"1993"}'));
	function checkOrderStatus(syssn)
	{
		if (gb_count<=0)
		{
			return;
			//window.location="orderList.jsp";	
		}
		//document.getElementById("infp").innerHTML="订单已支付成功，正在等待微信反馈...("+gb_count+")秒"
		$.ajax( {
			type : 'POST',
		    url : 'weChatScanCodePay.do',
		    dataType : 'json',
			data: "orderPayMessage="+strEncrypt("{'syssn':'"+syssn+"'}"),
		    success : function(data) {
		    	var list=data.data;  
				if (list[0].respcd=="0000")
				{
					window.location="success.ftl";
				}
				else
				{
					//gb_count--;
					//window.setTimeout(checkOrderStatus(syssn),1000);
				}
		    },
		    error : function(XMLHttpRequest, error, errorThrown) {
				alert("系统内部错误，请稍候再试");
				window.location="orderList.jsp";
		    }
		  });

	}
	
	
	$(function() {
		//初始化
		//加载第一个选项卡页面
		loadPaymentInfo( );
		
		//选项卡切换
		$(".nav-list").find("b").on("click", function(e) {
			if(!$(this).hasClass('active')){
				
				$("#qrcode").hide();
				$("#qrcode").html("");
				gb_count = 0;
				//选项卡切换
				var index = $(this).index();
				var length = $(this).parent().find("b").length;
				//alert(length);
				for(var i=0;i<length;i++){
					$(this).parent().find("b").eq(i).removeClass('active');
				}
				$(this).addClass('active');
				//选项卡内容切换
				var length = $(".platform_body > div").length;
				for(var i=0;i<length;i++){
					$(".platform_body > div").eq(i).removeClass('active');
					$(".platform_body > div").eq(i).css("display","none");
				}
				$(".platform_body > div").eq(index).addClass('active');
				$(".platform_body > div").eq(index).css("display","block");
				if (index == 1){
					$("#qrcode").show();
					$.ajax({
						url : "getweChatScanCode.do",
						type : 'POST',
						dataType : "json",
						data: "orderPayMessage="+strEncrypt("{'out_trade_no':11,'goods_name':'测试'}"),
						async : false,
						error : function() {
							alert("Connection error111");
						},
						success : function(data) {
					    	var qrcode = new QRCode(
					    			document.getElementById("qrcode"), 
					    			{
					    				width : 250,
					    				height : 250
					    			}
					    	);
							qrcode.makeCode(data.qrcode);
							
							gb_count = 200;
							checkOrderStatus(data.syssn);
						}
					});
				}
				
			}
			reset();
		});
		//绑卡信息下拉显示列表
		$(document).on('click', '.sel-btn', function() {
			var display =$('#platformdiv').css('display');
			if(display == 'none'){
				$("#platformdiv").show();
			}else{
				$("#platformdiv").hide();
			}
		});
		//绑卡信息下拉显示列表，鼠标离开时收起
		$(document).on('mouseleave ', '#platformdiv', function() {
				var display =$('#platformdiv').css('display');
				if(display != 'none'){
					$("#platformdiv").hide();
				}
		});
		//绑卡信息下拉列表点击事件，选中的绑卡信息提到默认选中
		$(document).on('click ', '.list01', function() {
			var index = $(this).index();
			var $list01=$(".platform_body").find("#default_platform").find("#platformdiv").find(".list01").eq(index);
			//得【原本所选绑卡信息】
			var $card1=$(".platform_body").find("#default_platform").find("#card1");
			var protocolid=$card1.find(".protocolid").val();
			var channelLogo=$card1.find(".channelLogo").val();
			var customphone=$card1.find(".customphone").val();
			var y2=$card1.find(".y2").html();
			//把选中的绑卡信息放到【原本所选绑卡信息】
			$card1.find(".protocolid").val($list01.find(".protocolid").val());
			$card1.find(".channelLogo").val($list01.find(".channelLogo").val());
			$card1.find(".customphone").val($list01.find(".customphone").val());
			$card1.find(".y2").html($list01.find(".y2").html());
			$card1.find(".bank-logo").attr("style","background-image:url(\""+$list01.find(".channelLogo").val()+"\");background-size:100%;");
			//把选中的绑卡信息换成【原本所选绑卡信息】
			$list01.find(".protocolid").val(protocolid);
			$list01.find(".channelLogo").val(channelLogo);
			$list01.find(".customphone").val(customphone);
			$list01.find(".y2").html(y2);
			$list01.find(".bank-logo").attr("style","background-image:url(\""+channelLogo+"\");background-size:100%;");
			$("#platformdiv").hide();
			$(".platform_body").find("#default_platform").find("#yanzhengma").val("");
			$("#tosendCode").html("点击获取验证码（发送短信至手机尾号"+$card1.find(".customphone").val()+"）");
			$("#tosendCodeMess").val("点击获取验证码（发送短信至手机尾号"+$card1.find(".customphone").val()+"）");
		});
		//返回银行卡列表
		$(document).on('click', '#test', function() {
			$(".platform_body").find("#default_platform > .sel-other:eq(0)").show();
			$("#addCard").hide();
			$("#backCard").show();
			$("#card1").hide();
			$("#platformdiv").hide();
			$("#bindcarddiv").hide();
			$("#sendCode").hide();
			$(".platform_body").find("#bindcarddiv").find(".cardType:first").click();
			deleteCookie("bindCountdown");
			initBindCard();
		});
		//选择银行卡去绑定
		$(document).on('click', '.pl-item', function() {
			$("#sendCode").hide();
			$("#bindcarddiv").show();
			$(".platform_body").find("#default_platform > .sel-other:eq(0)").hide();
			$(".platform_body").find("#default_platform > .sel-other:last").find("#bankcode").val($(this).find(".bankcode").val());
			$(".platform_body").find("#default_platform > .sel-other:last").find(".bank-logo").attr("style","background-image:url(\""+$(this).find(".banklogo").val()+"\");background-size:100%;");
			$(".platform_body").find("#default_platform > .sel-other:last").find("#banklogos").val($(this).find(".banklogo").val());
		});
		//点击更多银行显示
		$(document).on('click', '#morebank', function() {
			$.ajax({
				url : "initAllBanks",
				type : 'POST',
				dataType : "json",
				data: null ,
				async : false,
				error : function() {
					//alert("Connection error");
					failDestination();//跳转到错误页面
				},
				success : function(data) {
					var PayChanne="";
					data.forEach(function(otherPayChannel){ 
							PayChanne += "<li class='pl-item'>" +
							"<input type=hidden class='bankcode' value="+otherPayChannel.bank_code+">" +
							"<input type=hidden class='banklogo' value="+otherPayChannel.bank_logo+">" +
							"<label>" +
							"<span class='bank-logo bjyh' style='background-image:url(\""+otherPayChannel.bank_logo+"\");background-size:100%;'></span>" +
							"</label>" +
							"</li>";
					});
					$("#morebank").hide();
					$("#morebank").after(PayChanne);
				}
			});

		});
		//选择卡类型
		$(document).on('click', '.cardType', function() {
			if($('.cardType').eq(1).is(':checked')){
				$(".platform_body").find("#default_platform").find("#validdatediv").show();
				$(".platform_body").find("#default_platform").find("#cvn2div").show();
			}
			if($('.cardType').eq(0).is(':checked')){
				$(".platform_body").find("#default_platform").find("#validdatediv").hide();
				$(".platform_body").find("#default_platform").find("#cvn2div").hide();
			}
		});
		//绑卡操作，发送验证码
		$(document).on('click', '#sendbindcode', function() {
			$(this).attr("id","");
			//订单id
			var paymentId=$("#paymentId").val();
			//应用平台
			var h_appId=$("#h_appId").val();
			//用户Id
			var h_appUserId=$("#h_appUserId").val();
			var cardType=$(".platform_body").find("#default_platform > .sel-other:last").find(".cardType:checked").val();
			//银行卡号
			var customcardno=$(".platform_body").find("#default_platform > .sel-other:last").find("#customcardno").val();
			var validdate=$(".platform_body").find("#default_platform > .sel-other:last").find("#validdate").val();
			var cvn2=$(".platform_body").find("#default_platform > .sel-other:last").find("#cvn2").val();
			var customname=$(".platform_body").find("#default_platform > .sel-other:last").find("#customname").val();
			var identificationNumber=$(".platform_body").find("#default_platform > .sel-other:last").find("#identificationNumber").val();
			//银行预留手机号
			var customphone=$(".platform_body").find("#default_platform > .sel-other:last").find("#customphone").val();
			var bankcode=$(".platform_body").find("#default_platform > .sel-other:last").find("#bankcode").val();
			if(!checkBindCardinfo()){
				return false;
			}
			$("#sendbindcard_form").find("input").eq(0).val(h_appId);
			$("#sendbindcard_form").find("input").eq(1).val(h_appUserId);
			$("#sendbindcard_form").find("input").eq(2).val(customphone);
			$("#sendbindcard_form").find("input").eq(3).val(customcardno);
			$("#sendbindcard_form").find("input").eq(4).val(customname);
			$("#sendbindcard_form").find("input").eq(5).val(cardType);
			$("#sendbindcard_form").find("input").eq(7).val(identificationNumber);
			$("#sendbindcard_form").find("input").eq(8).val(bankcode);
			$("#sendbindcard_form").find("input").eq(9).val(validdate);
			$("#sendbindcard_form").find("input").eq(10).val(cvn2);
			$("#sendbindcard_form").find("input").eq(11).val(paymentId);
			var data = $("#sendbindcard_form").serializeArray(); //自动将form表单封装成json
			var postdata = getjson(data);
			var $this = $(this);
			$.ajax({
				url : "coustomBindCardGetCode",
				type : 'Post',
				dataType : "json",
				data: "bindMessage="+strEncrypt(postdata),
				async : false,
				error : function() {
					//alert("Connection error");
					failDestination();//跳转到错误页面
				},
				success : function(data) { 
					if(data.status=="OK"){
						$(".platform_body").find("#default_platform > .sel-other:last").find("#protocolid").val(data.protocolid);
						document.cookie="bindCountdown=60";
						alert("发送验证码成功");
						bindTime($this);
					}else{
						$(this).attr("id","sendbindcode");
						alert(data.message);
					}
				}
			});
		});
		//绑卡操作，
		$(document).on('click', '#bindCard', function() {
			//订单id
			var paymentId=$("#paymentId").val();
			var h_appId=$("#h_appId").val();
			var h_appUserId=$("#h_appUserId").val();
			var protocolid=$(".platform_body").find("#default_platform > .sel-other:last").find("#protocolid").val();
			var verifyCode=$(".platform_body").find("#default_platform > .sel-other:last").find("#verifyCode").val();
			var license=$(".platform_body").find("#default_platform > .sel-other:last").find("#license").is(':checked');
			if (!checkBindCardinfo()){
				return false;
			}
			if(verifyCode==null||verifyCode==""){
				alert("请输入验证码！");
				return false;
			}else if(!license){
				alert("是否同意《泛华收银台相关协议》！");
				return false;
			}
			shownMask();
			$("#bindcard_form").find("input").eq(0).val(h_appId);
			$("#bindcard_form").find("input").eq(1).val(h_appUserId);
			$("#bindcard_form").find("input").eq(2).val(protocolid);
			$("#bindcard_form").find("input").eq(3).val(verifyCode);
			$("#bindcard_form").find("input").eq(4).val(paymentId);
			var data = $("#bindcard_form").serializeArray(); //自动将form表单封装成json
			var postdata = getjson(data);
			$.ajax({
				url : "coustomBindCardWithCode",
				type : 'POST',
				dataType : "json",
				data: "bindCardWithCode="+strEncrypt(postdata),
				async : false,
				error : function() {
					//alert("Connection error");
					failDestination();//跳转到错误页面
				},
				success : function(data) { 
					hidenMask();
					if(data.status=="OK"){
						deleteCookie("bindCountdown");
						$("#backCard").hide();
						$(".platform_body").find("#default_platform > .sel-other:last").hide();
						$(".platform_body").find("#default_platform > .sel-other").eq(1).show();
						addAnotherBindCard(data.bankModel);
					}else{
						alert(data.message);
					}
				}
			});
		});
		//支付操作，发送验证码
		$(document).on('click', '#tosendCode', function() {
				$(this).attr("id","");
				//应用平台
				var h_appId=$("#h_appId").val();
				var paymentId=$("#paymentId").val();
				var protocolid = $(".platform_body").find("#default_platform > .first-bank > .clearfix").find(".protocolid").val();
				$("#sendcode_form").find("input").eq(0).val(paymentId);
				$("#sendcode_form").find("input").eq(1).val(protocolid);
				$("#sendcode_form").find("input").eq(2).val(h_appId);
				var data = $("#sendcode_form").serializeArray(); //自动将form表单封装成json
				var postdata = getjson(data);
				var $this = $(this);
				$.ajax({
					url : "sendVerifyCode",
					type : 'POST',
					dataType : "json",
					data: "payCodeMessage="+strEncrypt(postdata),
					async : false,
					error : function() {
						//alert("Connection error");
						failDestination();//跳转到错误页面
					},
					success : function(data) {
						if(data.status=="OK"){
							$("#payProtocolid").val(data.mainPayProtocolId);
							document.cookie="payCountdown=60";
							alert(data.message);
							payTime($this); 
						}else{
							alert(data.message);
							$(this).attr("id","tosendCode");
						}
					}
				});
		});
		//支付操作，提交支付
		$(document).on('click', '#toPay', function() {
			var yanzhengma = $("#yanzhengma").val();
			if(yanzhengma==null||yanzhengma==""){
				alert("请输入验证码！");return false;
			}
			var payProtocolid = $("#payProtocolid").val();
			if(payProtocolid==null||payProtocolid==""){
				alert("请发送验证码！");return false;
			}
			$("#paycard_form").find("input").eq(0).val(payProtocolid);
			$("#paycard_form").find("input").eq(1).val(yanzhengma);
			shownMask();
			deleteCookie("payCountdown");
			setTimeout("toPayIt()",2000);
		});
		
		/**遮罩层***********start**/
		//浏览器改变窗口大小事件resize事件			
		$(window).resize(function(){
			if($(".mask").is(":visible")){
				//获取屏幕的可视区域
				var windowWidth=$(window).width();
				var windowHeight=$(window).height();
				//获取弹出窗的高、宽			
				//width/height()获得宽高
				//innerWidth/innerHiehgt()获取包含padding的宽高不包括margin,border;
				//outerWidth(true)包括padding,border,margin
				var divWidth=$(".mask").outerWidth(true);  
				var divHeight=$(".mask").outerHeight(true);	
				//计算弹出窗口距离屏幕的中们位置
				var positionLeft=windowWidth/2-divWidth/2;
				var positionTop=windowHeight/2-divHeight/2;
				var maskWidth=$(document).width();
				var maskHeight=$(document).height();
				//获取浏览器纵向滚动条离页面顶部的高度$(window).scrollTop();
				var scrollTop=$(window).scrollTop();
				var scrollLeft=$(window).scrollLeft();
				windowWidth=$(window).width();
				windowHeight=$(window).height();
				divWidth=$(".mask").outerWidth(true);  
				divHeight=$(".mask").outerHeight(true);	
				positionLeft=windowWidth/2-divWidth/2;
				positionTop=windowHeight/2-divHeight/2;
				maskWidth=$(document).width();
				maskHeight=$(document).height();
				scrollTop=$(window).scrollTop();	
				scrollLeft=$(window).scrollLeft();	
				positionLeft=windowWidth/2-divWidth/2+scrollLeft;
				positionTop=windowHeight/2-divHeight/2+scrollTop;
				$(".mask").animate({
					"left":positionLeft+'px',
					"top":positionTop+'px'
				},0)
				$(".masks").width(maskWidth).height(maskHeight).show();
			}				
		});
		
		//浏览器拖动滚动条scroll事件	
		$(window.document).scroll(function () {
			if($(".mask").is(":visible")){            //如果窗口弹出则执行，否则拖动滚动条不执行
				//获取屏幕的可视区域
				var windowWidth=$(window).width();
				var windowHeight=$(window).height();
				//获取弹出窗的高、宽			
				//width/height()获得宽高
				//innerWidth/innerHiehgt()获取包含padding的宽高不包括margin,border;
				//outerWidth(true)包括padding,border,margin
				var divWidth=$(".mask").outerWidth(true);  
				var divHeight=$(".mask").outerHeight(true);	
				//计算弹出窗口距离屏幕的中们位置
				var positionLeft=windowWidth/2-divWidth/2;
				var positionTop=windowHeight/2-divHeight/2;
				var maskWidth=$(document).width();
				var maskHeight=$(document).height();
				//获取浏览器纵向滚动条离页面顶部的高度$(window).scrollTop();
				var scrollTop=$(window).scrollTop();
				var scrollLeft=$(window).scrollLeft();
				windowWidth=$(window).width();
				windowHeight=$(window).height();
				divWidth=$(".mask").outerWidth(true);  
				divHeight=$(".mask").outerHeight(true);	
				positionLeft=windowWidth/2-divWidth/2;
				positionTop=windowHeight/2-divHeight/2;
				maskWidth=$(document).width();
				maskHeight=$(document).height();
				scrollTop=$(window).scrollTop();	
				scrollLeft=$(window).scrollLeft();		       
				positionTop=windowHeight/2-divHeight/2+scrollTop;
				positionLeft=windowWidth/2-divWidth/2+scrollLeft;
					$(".mask").animate({
						"top":positionTop+"px",
						"left":positionLeft+"px"
						},5).dequeue();							
			}					
		});
		/**遮罩层***********end**/
		$(document).on('click', '#protocol', function() {
			$("#protocoldiv").show();
		});
		$(document).on('click', '#closeProtocol', function() {
			$("#protocoldiv").hide();
		});
	});
});
//支付接口
function toPayIt(){
	var data = $("#paycard_form").serializeArray(); //自动将form表单封装成json
	var postdata = getjson(data);
	$.ajax({
		url : "orderPay",
		type : 'POST',
		dataType : "json",
		data: "orderPayMessage="+strEncrypt(postdata),
		async : false,
		error : function() {
			failDestination();//跳转到错误页面
		},
		success : function(data) {
			if(data.status=="OK"){//支付成功
				hidenMask();
				alert(data.message);
				var paymentId=$("#paymentId").val();
				$("#payDown_form").find("input").eq(0).val(paymentId);
				var data = $("#payDown_form").serializeArray(); //自动将form表单封装成json
				var postdata = getjson(data);
				window.location.href = "payDown?paymentMessage="+strEncrypt(postdata);
			}else if(data.status=="FAIL"){//支付失败
				hidenMask();
				alert(data.message);
				var paymentId=$("#paymentId").val();
				$("#payDown_form").find("input").eq(0).val(paymentId);
				var data = $("#payDown_form").serializeArray(); //自动将form表单封装成json
				var postdata = getjson(data);
				window.location.href = "payDown1?paymentMessage="+strEncrypt(postdata);
			}else if(data.status=="ERROR"){//支付失败
				hidenMask();
				alert(data.message);
			}else if(data.status=="REST"){//支付中
				$.ajax({
					url : "selectOrderPay",
					type : 'POST',
					dataType : "json",
					data: "orderPayMessage="+strEncrypt(postdata),
					async : false,
					error : function() {
						failDestination();//跳转到错误页面
					},
					success : function(data) {
						if(data.status=="OK"){//支付成功
							hidenMask();
							alert(data.message);
							var paymentId=$("#paymentId").val();
							$("#payDown_form").find("input").eq(0).val(paymentId);
							var data = $("#payDown_form").serializeArray(); //自动将form表单封装成json
							var postdata = getjson(data);
							window.location.href = "payDown?paymentMessage="+strEncrypt(postdata);
						}else if(data.status=="ERROR"){//支付失败
							hidenMask();
							alert(data.message);
						}else if(data.status=="FAIL"){//支付失败
							hidenMask();
							alert(data.message);
							var paymentId=$("#paymentId").val();
							$("#payDown_form").find("input").eq(0).val(paymentId);
							var data = $("#payDown_form").serializeArray(); //自动将form表单封装成json
							var postdata = getjson(data);
							window.location.href = "payDown1?paymentMessage="+strEncrypt(postdata);
						}
					}
				});
			}
		}
	});
}
//重置
function reset(){
	loadPaymentInfo( );
	$("#morebank").show();//显示更多银行div
	$("#morebank").nextAll().remove();
	//初始化
	initBindCard();
	$(".platform_body").find("#yanzhengma").val("");
	$(".platform_body").find("#bindcarddiv").find(".cardType:first").click();
	backCard();
}
//绑卡操作验证
var cardno = /^(\d{16}|\d{17}|\d{18}|\d{19})$/;
var cardid = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
var phone=/^1[3|4|5|7|8]\d{9}$/;
var cvn=/^\d{3}$/;
function checkBindCardinfo(){
	var cardType=$(".platform_body").find("#default_platform > .sel-other:last").find(".cardType").val();
	var isXinYong=$(".platform_body").find("#default_platform > .sel-other:last").find(".cardType:last").is(':checked');
	//银行卡号
	var customcardno=$(".platform_body").find("#default_platform > .sel-other:last").find("#customcardno").val();
	var validdate=$(".platform_body").find("#default_platform > .sel-other:last").find("#validdate").val();
	var cvn2=$(".platform_body").find("#default_platform > .sel-other:last").find("#cvn2").val();
	var customname=$(".platform_body").find("#default_platform > .sel-other:last").find("#customname").val();
	var identificationNumber=$(".platform_body").find("#default_platform > .sel-other:last").find("#identificationNumber").val();
	//银行预留手机号
	var customphone=$(".platform_body").find("#default_platform > .sel-other:last").find("#customphone").val();
	var bankcode=$(".platform_body").find("#default_platform > .sel-other:last").find("#bankcode").val();
	if(customcardno==null||customcardno==""){
		alert("请输入银行卡号！");
		return false;
	}else if(!cardno.test(customcardno)){
		alert("请输入正确的银行卡号！");
		return false;
	}else if((validdate==null||validdate=="")&&isXinYong){//信用卡有效日期正则**************
		alert("请输入信用卡有效期！");
		return false;
	}else if((cvn2==null||cvn2=="")&&isXinYong){
		alert("请输入信用卡安全码！");
		return false;
	}else if(!cvn.test(cvn2)&&isXinYong){
		alert("请输入正确的信用卡安全码！");
		return false;
	}else if(customname==null||customname==""){
		alert("请输入姓名！");
		return false;
	}else if(identificationNumber==null||identificationNumber==""){
		alert("请输入身份证号！");
		return false;
	}else if(!cardid.test(identificationNumber)){
		alert("请输入正确的身份证号！");
		return false;
	}else if(customphone==null||customphone==""){
		alert("请输入手机号！");
		return false;
	}else if(!phone.test(customphone)){
		alert("请输入正确的手机号！");
		return false;
	}
	return true;
}
//+添加银行卡
function addCard(){
	$(".platform_body").find("#default_platform > .sel-other:eq(0)").show();
	$("#addCard").hide();
	$("#backCard").show();
	$("#card1").hide();
	$("#platformdiv").hide();
	$("#sendCode").hide();
	$(".platform_body").find("#default_platform").find("#yanzhengma").val("");
}
//返回我的银行卡
function backCard(){
	$(".platform_body").find("#default_platform > .sel-other:eq(0)").hide();
	$("#bindcarddiv").hide();//绑卡操作div
	$("#addCard").show();//+添加银行卡
	$("#backCard").hide();//返回我的银行卡
	$("#card1").show();//绑卡信息第一条
	$("#platformdiv").hide();//绑卡下拉列表第二条开始
	$("#sendCode").show();//立即支付div
	$("#morebank").show();//显示更多银行div
	$("#morebank").nextAll().remove();
	deleteCookie("bindCountdown");
	initBindCard();
}

//初始华时-加载支付信息
function loadPaymentInfo( ){
	$("#bindcarddiv").hide();
	var h_appId=$("#h_appId").val();
	var h_appUserId=$("#h_appUserId").val();
	$("#channel_form").find("input").eq(0).val(h_appId);
	$("#channel_form").find("input").eq(1).val(h_appUserId);
	var data = $("#channel_form").serializeArray(); //自动将form表单封装成json
	var postdata = getjson(data);
	reloaddata(postdata);
}
////加载支付信息
function reloaddata(data){
	$.ajax({
		url : "initPaymentPlatForm",
		type : 'POST',
		dataType : "json",
		data: "queryPaymentPlatFormMessage="+ strEncrypt(data) ,
		async : false,
		error : function() {
			//alert("Connection error");
			failDestination();//跳转到错误页面
		},
		success : function(data) { 
			if(data.status=="OK"){
				var bindBanks = data.bindBanks;
				var channeldiv="";
				if(bindBanks!=null&&bindBanks!=""){
					var n=1;
					bindBanks.forEach(function(bindBank){
							if(n==1){
								channeldiv+="<dl class='clearfix'>" +
												"<dd class='f-left' id='card1'>" +
													"<input type=hidden class='protocolid' value="+bindBank.protocolId+">" +
													"<input type=hidden class='channelLogo' value="+bindBank.bankLogo+">" +
													"<input type=hidden class='customphone' value="+bindBank.customphone+">" +
													"<div class='first-bank-c clearfix'>" +
														"<span class='bank-logo bjyh' style='background-image:url(\""+bindBank.bankLogo+"\");background-size:100%;'></span>" +
														"<em class='y2 c3 mar-2'>"+bindBank.cardType+"<span class='mar-1'>尾号("+bindBank.bankCardNo+")</span></em>" +
														"<b class=\"sel-btn\"></b>" +
													"</div>" +
												"</dd>" +
												"<dd class='f-left add c2 f2' onclick='addCard()' id='addCard'><b></b>+添加银行卡</dd>" +
												"<dd class='f-left return c3 f2 sel-b' style='display:none' onclick='backCard()' id='backCard'><b></b>返回我的银行卡</dd>" +
											"</dl>";	
								channeldiv+="<dl class='clearfix mar2' id='platformdiv' style='display:none;position:absolute;z-index:100;background-color:white;width:480px;'>" +
								"<dd class='dd1'>" +
									"<div class='first-bank-c clearfix'>";
								$("#tosendCode").html("点击获取验证码（发送短信至手机尾号"+bindBank.customphone+"）");
								$("#tosendCodeMess").val("点击获取验证码（发送短信至手机尾号"+bindBank.customphone+"）");
							}else{
								channeldiv+="<label class='list01 clearfix'>" +
												"<input type=hidden class='protocolid' value="+bindBank.protocolId+">" +
												"<input type=hidden class='channelLogo' value="+bindBank.bankLogo+">" +
												"<input type=hidden class='customphone' value="+bindBank.customphone+">" +
												"<span class='bank-logo bjyh' style='background-image:url(\""+bindBank.bankLogo+"\");background-size:100%;'></span>" +
												"<em class='y2 c3 mar-2'>"+bindBank.cardType+"<span class='mar-1'>尾号("+bindBank.bankCardNo+")</span></em>" +
											"</label>";
							}
							if (n == bindBanks.length){
								channeldiv+="</div>" +
										"</dd>" +
									"</dl>";
							}
							n++;
						});
						$(".platform_body").find("#default_platform > .sel-other:eq(0)").hide();
						$("#sendCode").show();
				}else{
					channeldiv="<div class=\"sel-other\"><div class=\"f4 c4 mar1\">请先绑卡，再完成支付</div></div>";
					$("#sendCode").hide();
				}
				$(".platform_body").find("#default_platform > .first-bank").html(channeldiv);
				if(n>2){
					$(".platform_body").find("#default_platform > .first-bank").find(".sel-btn").show();
				}
				var PayChanne="";
				var allBanks = data.allBanks;
				var length = allBanks.length;
				var index = 1;
				allBanks.forEach(function(allBank){ 
					if(length<=16||index<=15){
						PayChanne += "<li class='pl-item'>" +
						"<input type=hidden class='bankcode' value="+allBank.bank_code+">" +
						"<input type=hidden class='banklogo' value="+allBank.bank_logo+">" +
						"<label>" +
						"<span class='bank-logo bjyh' style='background-image:url(\""+allBank.bank_logo+"\");background-size:100%;'></span>" +
						"</label>" +
						"</li>";
					}
					index++;
				});
				if(length>16){
					PayChanne += "<li class='more c3 f2' id='morebank'>更多银行</li>";
				}
				$(".platform_body").find("#default_platform > .sel-other:eq(0) > ul").html(PayChanne);
			}
		}
	});
}
////初始化绑定信息
function initBindCard(){
	$(".platform_body").find("#default_platform > .sel-other:last").find(".cardType:first").attr("checked",true);
	//银行卡号
	$(".platform_body").find("#default_platform > .sel-other:last").find("#customcardno").val("");
	$(".platform_body").find("#default_platform > .sel-other:last").find("#customname").val("");
	$(".platform_body").find("#default_platform > .sel-other:last").find("#identificationNumber").val("");
	$(".platform_body").find("#default_platform").find("#validdate").val("");
	$(".platform_body").find("#default_platform").find("#cvn2").val("");
	$(".platform_body").find("#default_platform").find("#validdatediv").hide();
	$(".platform_body").find("#default_platform").find("#cvn2div").hide();
	//银行预留手机号
	$(".platform_body").find("#default_platform > .sel-other:last").find("#customphone").val("");
	$(".platform_body").find("#default_platform > .sel-other:last").find("#verifyCode").val("");
	$(".platform_body").find("#default_platform > .sel-other:last").find("#license").attr("checked",false);
}
//添加另一个银行卡绑定信息
function addAnotherBindCard(data){
	var channeldiv="<dl class='clearfix'>" +
					"<dd class='f-left' id='card1'>" +
						"<input type=hidden class='protocolid' value="+data.protocolId+">" +
						"<input type=hidden class='channelLogo' value="+data.bankLogo+">" +
						"<input type=hidden class='customphone' value="+data.customphone+">" +
						"<div class='first-bank-c clearfix'>" +
							"<span class='bank-logo bjyh' style='background-image:url(\""+data.bankLogo+"\");background-size:100%;'></span>" +
							"<em class='y2 c3 mar-2'>"+data.cardType+"<span class='mar-1'>尾号("+data.bankCardNo+")</span></em>" +
							"<b class=\"sel-btn\"></b>" +
						"</div>" +
					"</dd>" +
					"<dd class='f-left add c2 f2' onclick='addCard()' id='addCard'><b></b>+添加银行卡</dd>" +
					"<dd class='f-left return c3 f2 sel-b' style='display:none' onclick='backCard()' id='backCard'><b></b>返回我的银行卡</dd>" +
				"</dl>" +
				"<dl class='clearfix mar2' id='platformdiv' style='display:none;position:absolute;z-index:100;background-color:white;width:480px;'>" +
					"<dd class='dd1'>" +
						"<div class='first-bank-c clearfix'></div>" +
					"</dd>" +
				"</dl>";
	$("#tosendCode").html("点击获取验证码（发送短信至手机尾号"+data.customphone+"）");
	$("#tosendCodeMess").val("点击获取验证码（发送短信至手机尾号"+data.customphone+"）");
	$(".platform_body").find("#default_platform > .first-bank").html(channeldiv);
	$("#addCard").hide();
	$(".platform_body").find("#default_platform").find(".sel-btn").hide();
	$(".platform_body").find("#default_platform").find("#card1").show();
}


function getjson(data){
	 var orderMessage="";
	 $.each(data, function(i, field){
		 orderMessage+=",\""+field.name+"\":\""+field.value+"\"";
		});
	 orderMessage=orderMessage.substring(1);
	 return "{"+orderMessage+"}";
}



/**遮罩层***********start**/
function shownMask(){
	//获取屏幕的可视区域
	var windowWidth=$(window).width();
	var windowHeight=$(window).height();
	//获取弹出窗的高、宽			
	//width/height()获得宽高
	//innerWidth/innerHiehgt()获取包含padding的宽高不包括margin,border;
	//outerWidth(true)包括padding,border,margin
	var divWidth=$(".mask").outerWidth(true);  
	var divHeight=$(".mask").outerHeight(true);	
	//计算弹出窗口距离屏幕的中们位置
	var positionLeft=windowWidth/2-divWidth/2;
	var positionTop=windowHeight/2-divHeight/2;
	var maskWidth=$(document).width();
	var maskHeight=$(document).height();
	//获取浏览器纵向滚动条离页面顶部的高度$(window).scrollTop();
	var scrollTop=$(window).scrollTop();
	windowWidth=$(window).width();
	windowHeight=$(window).height();
	divWidth=$(".mask").outerWidth(true);  
	divHeight=$(".mask").outerHeight(true);	
	positionLeft=windowWidth/2-divWidth/2;
	positionTop=windowHeight/2-divHeight/2;
	maskWidth=$(document).width();
	maskHeight=$(document).height();
	scrollTop=$(window).scrollTop();	
	scrollLeft=$(window).scrollLeft();		       
	positionTop=windowHeight/2-divHeight/2+scrollTop;
	positionLeft=windowWidth/2-divWidth/2+scrollLeft;
	$(".mask").show().animate({
			"left":positionLeft,
			"top":positionTop
		},0);
	$(".masks").width(maskWidth).height(maskHeight).show();
}
function hidenMask(){
		$(".mask").hide();
		$(".masks").hide();	
}
/**遮罩层***********end**/

/*cookie用于发送验证码倒计时*/
function bindTime(o) { 
    var Countdown=getCookie("bindCountdown"); 
    if (Countdown == 0) { 
    	o.attr("id","sendbindcode");
        o.html("点击获取验证码"); 
        deleteCookie("bindCountdown") 
        document.cookie="bindCountdown=60"; 
    } else { 
    	o.attr("id","");
        o.html("重新获取验证码(" + Countdown + "s)"); 
        Countdown--; 
        deleteCookie("bindCountdown") 
        document.cookie="bindCountdown="+Countdown; 
        setTimeout(function() {bindTime(o)},1000) 
    } 
} 
function payTime(o) { 
    var Countdown=getCookie("payCountdown"); 
    if (Countdown == 0) { 
        o.attr("id","tosendCode");
        o.html($("#tosendCodeMess").val()); 
        deleteCookie("payCountdown") 
        document.cookie="payCountdown=60"; 
    } else { 
        o.attr("id","");
        o.html("重新获取验证码(" + Countdown + "s)"); 
        Countdown--; 
        deleteCookie("payCountdown");
        document.cookie="payCountdown="+Countdown; 
        setTimeout(function() {payTime(o)},1000) 
    } 
} 
function getCookie(name){ 
    var strCookie=document.cookie; 
    var arrCookie=strCookie.split("; "); 
    for(var i=0;i<arrCookie.length;i++){ 
        var arr=arrCookie[i].split("="); 
        if(arr[0]==name)return arr[1]; 
    } 
    return ""; 
} 
function deleteCookie(name){ 
     var date=new Date(); 
     date.setTime(date.getTime()-10000); 
     document.cookie=name+"=v; expires="+date.toGMTString(); 
 } 
/*cookie用于发送验证码倒计时*/


function failDestination(){
	var paymentId=$("#paymentId").val();
	$("#payDown_form").find("input").eq(0).val(paymentId);
	var data = $("#payDown_form").serializeArray(); //自动将form表单封装成json
	var postdata = getjson(data);
	window.location.href = "payDown1?paymentMessage="+strEncrypt(postdata);
}