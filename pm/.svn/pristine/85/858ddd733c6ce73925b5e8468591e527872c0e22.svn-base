<!DOCTYPE html>
<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>  
 <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
 <meta name="renderer" content="webkit"> 
 <title>泛华企业集团--支付</title>  
 <meta name="title" content="泛华企业集团"> 
 <meta name="keywords" content="泛华，泛华企业集团，泛华保险，泛华金融"/> 
 <meta name="description" content="中国领先的独立第三方O2O综合金融服务公司，致力于通过互联网与地面网络有机结合，为个人及企业客户提供多元化的金融产品和服务"/> 
<link href="${staticRoot}/css/payment/common.css" rel="stylesheet">
<script data-main="${staticRoot}/js/load" src="${staticRoot}/js/lib/require.min.js"></script>
<script src="${staticRoot}/js/platform/qrcode.js"></script>
<script type="text/javascript">
	requirejs([ "platform/pay"]);
</script>
</head>

<body class="bg2">
	<div class="main-cont">
		<div class="pay-top mar1 clearfix">
             <div class="lt1 f-left mar2"><img src="${staticRoot}/images/payment/logo1.png"></div>
             <div class="lt2 f-left">
                    <p class="c1 f1">订单编号：${pModel.appOrderid } </p>
                    <p class="c1 f1">订单时间：${pModel.appOrderTime } </p>
             </div>
             <div class="rt1 f-right">
                   <p class="f3 c1"><b>应付金额</b></p>
                   <div class="c2 f9">${pModel.orderfee }<span class="f1 c1">元</span></div>
             </div>
			<input type="hidden" value="${pModel.paymentId}" id="paymentId" placeholder="订单号">
			<input type="hidden" value="${pModel.appId }" id="h_appId" placeholder="应用平台id">
			<input type="hidden" value="${pModel.appUserId }" id="h_appUserId" placeholder="应用平台用户名">
		</div>
		<!---->
		<div class="body-cont bg1 mar1">
                <div class="nav-list clearfix">
			  		<b class="active" id="default_nav">银行卡</b>
					<b id="weixin_nav">微信支付</b>
                 </div>
                 
                 <!---->
                 
                 <div class="platform_body">
  					<div class="active" id="default_platform">
  						<!-- <input type="hidden" value="${pModel.defaultPaymentPlatformId }"> -->
  						<div class="first-bank">
  						</div>
  						<div class="sel-other" id="other">
	  						<ul class="clearfix mar1">
	                 	  	</ul>
	                 	</div>
	                 	<div class="sel-other" id="sendCode" style="display:none;">
	  						<ul class="clearfix mar1">
			  					<div class="mar1">
		                           <input type="text" placeholder="" autocomplete="off" id="yanzhengma"  class="ui-input" >
		                           <input type="hidden" id="payProtocolid" >
		                           <input type="hidden" id="tosendCodeMess" value="">
		                           <a id="tosendCode" href="javascript:void(0)" class="c3 f1 dblock2 pad9"></a>
		                 	  	</div>
		                      	<div class="mar1">
		                 	       <input type="button"  class="ui-button ui-button-XL" id="toPay" value="立即支付">
		                       	</div>
	                 	  	</ul>
  						</div>
  						<div class="sel-other" id="bindcarddiv" style="display:none">
	  						<div class="mar1 bd-card">
	  							<input type="hidden" id="bankcode" >
	  							<!-- <input type="hidden" id="channelId" > -->
	  							<dl class="clearfix">
			                          <dt>付款银行</dt>
			                          <dd>
			                              <div class="pay-flat-c f-left">
			                                  	<label class="clearfix">
			                                      	<span class="bank-logo bjyh"></span>
			                                      	<input type="hidden" id="banklogos" >
			                              		</label>
			                              </div>
			                              <div class="sel-b f-left c3 f1" id='test'><b></b>选择其他银行</div>
			
			                          </dd>
			            	      </dl>
								  <dl class="clearfix">
			                          <dt>卡类型</dt>
			                          <dd>
			                              <label><input type="radio" class="cardType" name="cardType" value="10" checked>储蓄卡</label>
			                              <label><input type="radio" class="cardType" name="cardType" value="20">信用卡</label>
			                          </dd>
			                      </dl>
			                      <dl class="clearfix">
			                          <dt>银行卡号</dt>
			                          <dd><input type="text" value="" name="customcardno" id="customcardno" placeholder="银行卡号" autocomplete="off"  class="ui-input "></dd>
			                      </dl>
			                      <dl class="clearfix" id="validdatediv" style="display:none;">
			                          <dt>信用卡有效期</dt>
			                          <dd><input type="text" name="validdate" id="validdate" placeholder="信用卡时必填，格式 YYMM" autocomplete="off"  class="ui-input "></dd>
			                      </dl>
			                      <dl class="clearfix" id="cvn2div" style="display:none;">
			                          <dt>信用卡安全码</dt>
			                          <dd><input type="text" name="cvn2" id="cvn2" placeholder="信用卡时必填，卡背面的末3位数字" autocomplete="off"  class="ui-input "></dd>
			                      </dl>
			                      <dl class="clearfix">
			                          <dt>姓名</dt>
			                          <dd><input name="customname" value="" id="customname" type="text" placeholder="姓名"  class="ui-input "></dd>
			                      </dl>
			                      <dl class="clearfix">
			                          <dt>身份证号</dt>
			                          <dd><input type="text"  value="" placeholder="身份证号" id="identificationNumber" name="identificationNumber" class="ui-input " value=""></dd>
			                      </dl>
			                      <dl class="clearfix">
			                          <dt>手机号</dt>
			                          <dd><input id="customphone" value="" name="customphone" type="text" placeholder="手机号"  class="ui-input "></dd>
			                      </dl>
			                      <dl class="clearfix">
			                          <dt>验证码</dt>
			                          <dd><input type="text" placeholder="验证码"  class="ui-input" id="verifyCode">
			                          <input type=hidden id="protocolid" ><a id="sendbindcode" href="javascript:void(0)" class="c3 f1 dblock2 pad9">点击获取验证码</a></dd>
			                      </dl>
			                      <dl class="clearfix">
			                          <dd class="dd01"><label class="label01"><input type="checkbox" id="license" name="license"><b></b><span id="protocol">泛华收银台相关协议</span></label></dd>
			                      </dl>
			                      <dl class="clearfix">
			                          <dd class="dd01"><input type="button" id="bindCard" class="ui-button ui-button-XL" value="同意绑定"></dd>
			                     </dl>
	                       	</div>
  						</div>
  					</div>
				 	<div id="weixin_platform" style="display:none" >
  					</div>
	    	</div>
		</div>
		<div id="qrcode" align="center" style="display:none;"></div>
		<div class="mask hide">
			 <img class="mvBtn" src="${staticRoot}/images/payment/loading.jpg" />
		</div>
		<div class="masks hide"></div>
		
<div class="agreement-box" id="protocoldiv" style="display:none;">
	<h3 class="title f3">泛华收银台相关协议<b class="f-right" id="closeProtocol">X</b></h3>
	<div class="txt-box">
		<p>在您注册成为本平台用户前请务必仔细阅读以下条款。若您一旦注册，则视为您接受本平台的服务并受以下条款的约束。若您不接受以下条款，
		请停止注册本网站。</p>
		<p>本使用协议内容包括以下条款及已经发布的或将来可能发布的各类规则。所有规则为协议不可分割的一部分，与协议正文具有同等法律效力。
		本协议是由您与本平台共同签订的，适用于您在本平台的全部活动。在您注册成为用户时，您已经阅读、理解并接受本协议的全部条款及各类
		规则，并承诺遵守中华人民共和国现行的法律、法规、规章及其他政府规定，如有违反而导致任何法律后果的发生，您将以自己的名义独立承
		担所有相应的法律责任。</p>
		<p>
		<b>一、使用限制</b>
		</p>
	</div>
</div>
   
		<form id="channel_form"  style='display:none'> 
			<input type=hidden name="appId" >  
			<input type=hidden name="appUserId" >
		</form>
		<form id="sendcode_form"  style='display:none'> <!-- 发送验证码 -->
			<input type=hidden name="paymentId" >  
			<input type=hidden name="protocolid" >
			<input type=hidden name="appId" >
		</form>
		<form id="paycard_form"  style='display:none'> <!-- 支付操作 -->
			<input type=hidden name="payProtocolid" >  
			<input type=hidden name="smsValidationCode" >  
		</form>
		<form id="sendbindcard_form"  style='display:none'> <!-- 绑定银行卡操作 -->
           	<input type="hidden" name="appId" >
           	<input type="hidden" name="platformUserId" >
           	<input type="hidden" name="customphone" >
           	<input type="hidden" name="customcardno" >
           	<input type="hidden" name="customname" >
           	<input type="hidden" name="cardType" >
           	<input type="hidden" name="identificationType" value="0">
           	<input type="hidden" name="identificationNumber" >
           	<input type="hidden" name="bankcode" >
           	<input type="hidden" name="validdate" >
           	<input type="hidden" name="cvn2" >
           	<input type="hidden" name="paymentId" >
		</form>
		<form id="bindcard_form"  style='display:none'> <!-- 绑定银行卡操作 -->
           	<input type="hidden" name="appId" >
           	<input type="hidden" name="platformUserId" >
           	<input type="hidden" name="protocolid" >
           	<input type="hidden" name="SMSValidationCode" >
           	<input type="hidden" name="paymentId" >
		</form>
		<form id="payDown_form"  style='display:none'> <!-- 发送验证码 -->
			<input type=hidden name="paymentId" >  
		</form>
	</div>
</body>
</html>
