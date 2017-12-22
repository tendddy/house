require(["jquery", "bootstrapdatetimepicker", "bootstrapdatetimepickeri18n", "bootstrap-table", "bootstrap","bootstrapTableZhCn","jqvalidatei18n","additionalmethods","jqtreeview","zTree","zTreecheck"], function ($) {
	$(function() {
		$.fn.serializeObject = function()    
		{    
		   var o = {};    
		   var a = this.serializeArray();    
		   $.each(a, function() {    
		       if (o[this.name]) {    
		           if (!o[this.name].push) {    
		               o[this.name] = [o[this.name]];    
		           }    
		           o[this.name].push(this.value || '');    
		       } else {    
		           o[this.name] = this.value || '';    
		       }    
		   });    
		   return o;    
		}; 
//		$.ajax({
//			url : "initPaymentPlatForm",
//			type : 'GET',
//			dataType : "json",
//			data: "queryPaymentPlatFormMessage="+data,
//			async : true,
//			error : function() {
//				alert("Connection error");
//			},
//			success : function(data) { 
//				
//			}
//		})
		
		$(".nav-list").find("b").on("click", function(e) {
			if(!$(this).hasClass('active')){
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
				
			}
		});
	});
})
function bindCard(){
	var jsonData = $("#oderPay").serializeObject();
	alert(JSON.stringify(jsonData));
	$.ajax({
		url : "coustomBindCard",
		type : 'POST',
		dataType : "json",
		data: "bindMessage="+JSON.stringify(jsonData),
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			if(data.status=="OK"){
				$("#bind_div").attr("hidden",true);
				$("#bank_div").attr("hidden",true);
				$("#pay_div").removeAttr("hidden");
				$("#bind_protocal").append('<input type="hidden" id="protocolid" name="protocolid" value="'+data.result+'">');
			
			}else{
				alert(data.message);
			}
		}
	})
}
function getVerifyCode(){
	var jsonData = $("#code_contend").serializeObject();
	$.ajax({
		url : "sendVerifyCode",
		type : 'GET',
		dataType : "json",
		data: "payCodeMessage="+JSON.stringify(jsonData),
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			alert("支付流水号=="+data.result);
			$("#pay_protocal").append('<input type="hidden" id="payProtocolid" name="payProtocolid" value="'+data.result+'">');

		}
	})
}