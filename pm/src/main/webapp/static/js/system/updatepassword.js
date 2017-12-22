require(["jquery", "jqform", "jqgrid", "jqgridi18n", "jqvalidate", "jqmetadata", "jqvalidatei18n", "additionalmethods"], function ($) {

	$(function() {
		
		$("#oldpwd").val("");
		$("#newpwd").val("");
		$("#checknewpwd").val("");
		
		// 修改密码【重置】按钮
		$("#resetbutton").on("click", function() {
			$("#oldpwd").val("");
			$("#newpwd").val("");
			$("#checknewpwd").val("");
			$("p").html("");
		});
		
		//修改密码【确定】按钮
		$("#updatepasswordbutton").on("click", function(e) {
			if(!$("#oldpwd").val()){
				alertmsg("请输入旧密码");
				return;
			}else if(!$("#newpwd").val()){
				alertmsg("请输入新密码");
				return;
			}else if(!$("#checknewpwd").val()){
				alertmsg("请输入确认密码");
				return;
			}else if($("#newpwd").val()!=$("#checknewpwd").val()){
				alertmsg("输入的新密码不一致");
				return;
			}
			$('#userupdatepasswordform').ajaxSubmit({
				url : 'user/changepassword',
				type : 'POST',
				dataType : "json",
				error : function() {
					alertmsg("Connection error");
				},
				success : function(data) {
					var result = data.msg;
					if (result=='true') {
						$("#inputfrom").html("修改成功！");
						$("p").html("update ok");
						alertmsg("update ok");
					}else{
						$("p").html("error");
					}
				}
			});
		});
	});

});
