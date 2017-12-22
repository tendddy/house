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
function clicksub(){
	var data = $("#orderMessage").val();
	$("#orderMessage").val(strEncrypt(data));
	oderPay.submit();
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
{"appId":01,"appUserId":"654321","appUserName":"张三","idcard":"0000000000000","appOrderId":"56565656565","orderfee":2,"payType":"1","orderdatetime":"20161010102340","receiveurl":"http://www.zhangzhongbao.com/getPayResult","userinfourl":"http://www.zhangzhongbao.com/getIdcard","products":[{"orderfee":1,"appOrderId":"111111","appOrderName": "11name","txRemark":"结算测试","accountType":"11","bankID":"302","accountName":"北京商联在线科技有限公司","accountNumber":"10241000000064759","branchName":"华夏银行股份有限公司北京新发地支行","province":"北京","city":"北京"},{"orderfee":1,"appOrderId":"222222","appOrderName": "22name","txRemark":"结算测试","accountType":"11","bankID":"302","accountName":"北京商联在线科技有限公司","accountNumber":"10241000000064759","branchName":"华夏银行股份有限公司北京新发地支行","province":"北京","city":"北京"}]}
								</textarea>
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
