<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>支付</title>
<link href="${staticRoot}/css/system/flat-ui-icon.css" rel="stylesheet">
<link href="../static/css/lib/bootstrap.min.css" rel="stylesheet" media="screen">
<link href="${staticRoot}/css/appmodule.css" rel="stylesheet">
<link href="${staticRoot}/css/payment/common.css" rel="stylesheet">
<script data-main="${staticRoot}/js/load" src="${staticRoot}/js/lib/require.min.js"></script>
</head>

<body class="bg2">
	<div class="main-cont">
		<div class="pay-top mar1 clearfix">
             <div class="lt1 f-left mar2"><img src="${staticRoot}/images/payment/logo1.png"></div>
             <div class="lt2 f-left">
                    <p class="c1 f1">订单编号：${orderid } </p>
                    <p class="c1 f1">订单时间：${orderdatetime } </p>
             </div>
             <div class="rt1 f-right">
                   <p class="f3 c1"><b>应付金额</b></p>
                   <div class="c2 f9">￥${payfee }<span class="f1 c1">元</span></div>
             </div>
		</div>
		<!---->
		<div class="body-cont bg1 mar1">

			<dl class="pay-fail clearfix">
                 <dt class="f-left"><img src="${staticRoot}/images/payment/fail.png"></dt>
                 <dd  class="f-left">
                      <p class="f5 c5">尊敬的客户,交易处理失败，请您稍后再试。</p>
                      <p class="f3">你的订单号为${orderid }</p>
                      <a href="${receiveurl }"  class="f2 c1">返回首页</a>
                 </dd>
			</dl>


		</div>
                 


	</div>
</body>
</html>
