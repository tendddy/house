<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改密码</title>
<script type="text/javascript">
	require([ "system/updatepassword" ]);
</script>
<style> 
	.div-height{height:300px;} 
</style> 

</head>
<body>
	<div class="modal-header">
       <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
       <span class="modal-title" id="myModalLabel">修改密码</span>
	</div>
	
	<div class="modal-body">
	<div class="div-height">  
	<form id="userupdatepasswordform">
	  <div id="inputfrom" class="input-group-sm">
		<input id="usercode" type="hidden" name="usercode" value="${insc_user.usercode!""}" />
		<table style="margin-left:20%;margin-top:5%;">
		  <div class="input-group-sm">
			<tr><td>旧  密  码：</td><td><input id="oldpwd" name="oldpwd" type="text" class="form-control" placeholder="password"></td></tr>
			<tr><td>&nbsp;</td></tr>
			<tr><td>新  密  码：</td><td><input id="newpwd" name="newpwd" type="password" class="form-control" placeholder="newpassword"></td></tr>
			<tr><td>&nbsp;</td></tr>
			<tr><td>确认密码：</td><td><input id="checknewpwd" name="checknewpwd" type="password" class="form-control" placeholder="newpassword"></td></tr>
		  </div>
		</table>
	   </div>
	</form>
	</div>
	
	<p></p>
	
	<div class="modal-footer">
	  <input id="updatepasswordbutton" type="submit" class="btn btn-primary" name="updatepasswordbutton" value="确定" />
	  <input id="resetbutton" type="button" class="btn btn-primary" name="resetbutton" value="重置" />
	  <input id="closebutton" type="button" class="btn btn-defult" data-dismiss="modal" name="closebutton" value="关闭" />
	</div>
	</div>
	

</body>
</html>
