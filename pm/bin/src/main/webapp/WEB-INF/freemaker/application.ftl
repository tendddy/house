<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- mobile not available <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
<link href="${staticRoot}/css/appmain.css" rel="stylesheet">
<link href="${staticRoot}/css/skin/default.css" rel="stylesheet">
<link href="${staticRoot}/css/appreset.css" rel="stylesheet">
<link href="${staticRoot}/favicon.ico" type="image/x-icon"
	rel="shortcut icon">
<script src="${staticRoot}/js/lib/jquery.min.js"></script>	
<script data-main="${staticRoot}/js/load"
	src="${staticRoot}/js/lib/require.min.js"></script>


<title>支付平台运营管理系统</title>
<script type="text/javascript">
	requirejs([ "system/main" ]);
</script>

</head>
<body>
	<nav id="apphead"
		class="navbar navbar-inverse navbar-embossed navbar-fixed-top"
		role="navigation">
		<div class="navbar-left">
			<div class="head-logo" >
				<img src="static/images/system/logo2.png" /><span id="head-title">运营管理 </span>
				<span id="head_show" style="display:none;">
					<a class="head-title-a" href="javascript:desktop();">
					<span class="fui-export"></span>
						 <span id="head-title-s">切换至工作桌面</span>
					</a>
				</span>
			</div>
		</div>
		<div class="navbar-right">
			<div class="welcome"><span class="fui-user cus-icon"></span>${insc_user.name}<input type="hidden" id="my_menu" value="${myMenu.myMenu}"><input type="hidden" id="user_code" value="${insc_user.usercode}">&nbsp;&nbsp;&nbsp;&nbsp;${org}</div>
			<ul>
				<li><a id="im_logut" href="auth/logout"><span class="fui-power cus-icon"></span>退出</a></li>
				<li><a href="javascript:openDialog('user/updatepassword');">
						<span class="fui-lock cus-icon"></span>修改密码
				</a></li>
				<li><a id ="im_message" 
					href="javascript:openDialog('user/message/${insc_user.usercode}');">
						<span class="fui-bubble cus-icon"></span>消息 
						<!-- <span
						class="navbar-unread cus-navbar-unread">3</span> -->
						
				</a></li>
					<li class="head-task">
					<span id="top_menu1" style="display: none;">
					<a href="javascript:$.cmTaskList('management', 'list', true);">
						<span class="fui-calendar-solid cus-icon"></span>任务管理
					</a>
					</span>
				</li>
				<li class="head-task">
				<span id="top_menu2" style="display: none;">
				<a href="javascript:$.cmTaskList('share', 'list', true);">
						<span class="fui-eye cus-icon"></span>任务池
				</a>
				</span>
				</li>
				<li class="head-task">
				<span id="top_menu3" style="display: none;">
				<a id="im_mytask" href="javascript:$.cmTaskList('my', 'nothing', true);">
						<span class="fui-heart cus-icon"></span>我的任务
				</a>
				</span>
				</li>
				<li><button type="button" class="navbar-toggle"
						data-toggle="collapse" data-target="#appmenu">
						功能导航
					</button></li>
			</ul>
		</div>
	</nav>
	<div class="container-fluid appmid-content" id="menu">
		<div class="row">
			<div class="collapse navbar-collapse" id="appmenu">
				<nav class="navbar navbar-inverse navbar-embossed" role="navigation">
					${menu!""}</nav>
			</div>
			<div id="appcontent" class="col-xs-12 col-sm-9">
				<div class="menutitle" id="showmenu">
					<label class="m-left-10" id="showtitle"></label>
				</div>
				<!-- iframe -->
			</div>
		</div>
	</div>
	<div class="container-fluid appmid-content" id="desktop"
		style="display: none;">
		<iframe id="desktop_tasks" name="desktop_tasks"
			src="about:blank" style="width:100%; height:100%;"></iframe>
		<iframe id="desktop_content" name="desktop_content"
			src="about:blank" style="width:80%; height:100%;display: none;"></iframe>
	</div>
	<nav id="apptask"
		class="navbar navbar-inverse navbar-embossed navbar-fixed-bottom"
		role="navigation">
		<ul id="div_tab" class="nav navbar-nav navbar-left"></ul>
		<ul class="nav navbar-nav navbar-right" style="display:none;">
			<li class="desk"><a href="javascript:desktop();"><span
					class="fui-windows-8" ></span></a></li>
		</ul>
	</nav>
	<input type="hidden" value="${username }" id="ulogfute"/>
	<input type="hidden" value="${ppp }" id="qazwsx" />
	<input type="hidden" value="" id="blink" />
</body>
<script src="${staticRoot}/js/system/echobot2.js"></script>
<script src="${staticRoot}/js/system/strophe.js"></script>
</html>
