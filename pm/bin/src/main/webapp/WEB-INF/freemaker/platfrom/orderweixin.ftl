<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>支付</title>
<link href="${staticRoot}/css/system/flat-ui-icon.css" rel="stylesheet">
<link href="../static/css/lib/bootstrap.min.css" rel="stylesheet" media="screen">
<link href="${staticRoot}/css/appmodule.css" rel="stylesheet">
<script data-main="${staticRoot}/js/load" src="${staticRoot}/js/lib/require.min.js"></script>
<script src="${staticRoot}/js/platform/des.js"></script>
<script type="text/javascript">

if (typeof WeixinJSBridge == "undefined"){
   if( document.addEventListener ){
       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
   }else if (document.attachEvent){
       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
   }
}else{
	doPayment();
}

function doPayment()
{
	
	var data = $("#orderMessage").val();
	$("#orderMessage").val(strEncrypt(data));
	//发起ajax请求
	jQuery.ajax( {
		type : 'GET',
	    contentType : 'application/json',
	    url : 'getPaymentInfo.do',
	    dataType : 'json',
		data:{
			orderId:strEncrypt(data)
			},
	    success : function(data) {
			if (data.result=="success")
			{

				onBridgeReady(data.params);
				
			}
			else
			{
				alert(data.desc);
				window.location="orderList.jsp";
				
			}
	    },
	    error : function(XMLHttpRequest, error, errorThrown) {
			alert("系统内部错误，请稍候再试");
			window.location="orderList.jsp";
	    }
	  });
}

function onBridgeReady(params)
{

   WeixinJSBridge.invoke(
   	'getBrandWCPayRequest', 
	{
	   "appId" : params.appId,      
	   "timeStamp": params.timeStamp,              
	   "nonceStr" : params.nonceStr,      
	   "package" : "prepay_id="+params.prepay_id,     
	   "signType" : "MD5",             
	   "paySign" : params.paySign  
   },
   function(res){     
	   if(res.err_msg == "get_brand_wcpay_request:ok" )
	   { //前往后台查询订单状态
	   		/* gb_count=15;
		   checkOrderStatus(); */
	   }
	   else
	   {
			alert("订单支付失败，您可以选择进入订单列表，再次尝试");
			//window.location="orderList.jsp";
	   
	   }
		     
   	}
   
   );

}

</script>
</head>
<body><p id="results"></p>
	<div class="container-fluid">
		<div class="panel panel-default m-bottom-5" style="width:1220px;">
		  <div class="panel-heading padding-5-5"></div>
		  	<div class="panel-body">
				<div class="row" style="padding-bottom:5px;">
					<form action="initOrder" class="form-inline" role="form" name="oderPay" method="post">
						<table width="100%">
							<tr>
							<td>
								<textarea rows="10" cols="190" name="orderMessage" id="orderMessage">
								{"appId":51,"appUserId":"654321","appUserName":"张三","idcard":"0000000000000","appOrderId":"56565656565","orderfee":8000000,"payType":"1","orderdatetime":"20160808102340","sub_openid":"${orderdatetime }"}</textarea>
							</td>
							</tr>
						</table>
						<button type="submit" onclick="clicksub();">提交订单</button>
					</form>
					</div>
			</div>
		</div>
	</div>
</body>
</html>
