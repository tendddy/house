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
	var params;
	function doPayment() {

		var data = "{\"openid\":\""
				+ $("#openid").val()
				+ "\",\"appId\":\"4\",\"appUserId\":\"420100002\",\"appUserName\":\"王连海\",\"idcard\":\"132330500818003\",\"appOrderId\":\""
				+ $("#appOrderId").val()
				+ "\",\"orderfee\":\"1\",\"payType\":\"2\",\"orderdatetime\":\"20170518155611\",\"receiveurl\":\"http://lzgplus.cisg.cn/lzg\",\"userinfourl\":\"http://lzgplus.cisg.cn/lzg\",\"payWay\":\"5\",\"products\":[{\"orderfee\":\"1\",\"appOrderId\":\""
				+ $("#appOrderId").val() + "\",\"appOrderName\":\"太平车主“全家安心”家庭综合意外险\"}]}";
		//发起ajax请求
		jQuery.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : 'initOrder4PlatForm',
			dataType : 'json',
			data : data,
			success : function(data) {
				if (data.status == "OK") {
					alert(JSON.stringify(data));
					params = data.brandWCPayRequestParams;
					if (typeof WeixinJSBridge == "undefined") {
						if (document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						} else if (document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					} else {
						onBridgeReady();
					}
				} else {
					alert(JSON.stringify(data));
				}
			},
			error : function(XMLHttpRequest, error, errorThrown) {
				alert("系统内部错误，请稍候再试");
			}
		});

	}

	function onBridgeReady() {

		if (params == null || params == "undefined")
			return;

		WeixinJSBridge.invoke('getBrandWCPayRequest', 
		/* 	{
			//公众号名称，由商户传入     
			"appId" : params.appId,
			//时间戳，自1970年以来的秒数      
			"timeStamp" : params.timeStamp,
			//随机串    
			"nonceStr" : params.nonceStr,
			"package" : params._package,
			//微信签名方式
			"signType" : "MD5",
			//微信签名 
			"paySign" : params.paySign

		} */
		params , 
		function(res) {
			alert(JSON.stringify(res));
			if (res.err_msg == "get_brand_wcpay_request:ok") {

			} else {
			
			}
		});
	}
</script>
</head>
<body>
	订单号:
	<input id="appOrderId" name="appOrderId" value="T00TNV7u8ujh5d8744" />
	</br> 商品名称：太平车主“全家安心”家庭综合意外险"
	</br> 金额(元): 0.01
	<input id="openid" name="openid" value="${openid}" hidden="hidden" />
	</br>
	<button type="button" onclick="doPayment();">确认支付</button>
</body>
</html>
