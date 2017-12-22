<!DOCTYPE html>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="${staticRoot}/css/applogin.css" rel="stylesheet">
<link href="${staticRoot}/favicon.ico" type="image/x-icon" rel="shortcut icon">
<title>支付平台运营管理系统-欢迎登录</title>
<script type="text/javascript">
	if (window.top.location != window.self.location) {
		window.top.location = window.self.location;
	}
</script>
<script src="${staticRoot}/js/lib/jquery.min.js"></script>
<!--<script src="${staticRoot}/js/cm/common/echobot.js"></script>-->
<script src="${staticRoot}/js/cm/common/strophe.js"></script>
<script>
	function validateForm() {
		if ($("#username").val() == "" || $("#password").val() == "") {
			alert("用户名或密码不能为空。");
			return false;
		}
		return true;
	}
	$(function() {

		$("#username").focus();
	});
	document.onkeydown = function(e) {
		if (!e)
			e = window.event;
		if ((e.keyCode || e.which) == 13) {
			$("#loginBtn").click();
			//调用openfire登陆
		}
	}
</script>
</head>
<body>
	<header>
		<div class="topLogo" title="支付平台管理系统"><label class="l1">支付平台运营</label><label class="l2">管理系统</label></div>
	</header>
	<section>
		<h2>欢迎登录</h2>
		<div class=login>
			<form id="loginform" method="POST" action="${webRoot}/login">
				<span id="userNameLab">登录账号</span> <input id="username"
					class="logintext" name="username" placeholder="请输入用户名"
					 /> <span id="pwdLab">密码</span> <input id="password"
					class="logintext pwd" name="password" type="password"
					placeholder="请输入密码" /> <input type="submit"
					id="loginBtn" onclick="return validateForm();" value="登录" />
				<div>
					<#if _csrf??><input type="hidden" name="${_csrf.parameterName}"
						value="${_csrf.token}" /></#if>
				</div>
			</form>
			<div class="err">
				<#if error??>
				<p>用户名密码错误</p>
				</#if>
			</div>
		</div>

	</section>
	<footer class="copyright">Copyright © 2017  泛华金控集团版权所有</footer>


</body>
</html>
