require(["jquery", "bootstrap-table", "bootstrap","bootstrapTableZhCn", "bootstrapdatetimepicker","bootstrapdatetimepickeri18n","jqcookie", "jqtreeview","zTree","zTreecheck","public"], function ($) {
	//数据初始化 
	$(function() {
		$('.form_datetime').datetimepicker({
		    language: 'zh-CN',
		    format: "yyyy-mm-dd",
		    weekStart: 1,
		    todayBtn: 1,
		    autoclose: 1,
		    todayHighlight: 1,
		    startView: 2,
		    forceParse: 0,
		    minView: 2,
		    // showMeridian: 1
		});
		var inp = $('#num');
		inp.blur(function(){
			var inpVal = inp.val();
			if(inpVal) {
				if(!isNaN(inpVal) && ("^-?//d+$").test(inpVal)){
				}else{
					alert('请输入整数');
					inp.focus();
				}
			}

		})
		
		$("#close_modal").on("click",function(){
			 var permissionset_id=$("#permissionsetId").val();
			 window.location.href="mian2edit?permissionsetId="+permissionset_id;
		})
		$("#save_permisssionallot").on("click",function(){
			$.ajax({
				url:'updatepermissionallot',
				type:"post",
				data:$("#permissionallot_form").serialize(),
				 success: function(data){
					 if(data.length>2){
						 alertmsg("保存成功");
						 $("#permissionallot_modal").modal('hide');
						 var permissionset_id=$("#permissionsetId").val();
						 window.location.href="mian2edit?permissionsetId="+permissionset_id;
					 }else if(data="1"){
						 alertmsg("修改成功");
						 $("#permissionallot_modal").modal('hide');
						 var permissionset_id=$("#permissionsetId").val();
						 window.location.href="mian2edit?permissionsetId="+permissionset_id;
					 }else{
						 alertmsg("保存失败，请稍后重试！");
						 var permissionset_id=$("#permissionsetId").val();
						 window.location.href="mian2edit?permissionsetId="+permissionset_id;
					 }
					
				 }
				
			})
		})
		
		//删除当前关系表数据
		$("#delete_permissionallot").on("click",function(){
			$.ajax({
				url:'deletepermissionallot',
				type:"post",
				data:$("#permissionallot_form").serialize(),
				 success: function(data){
					 if(data.status=="1"){
						 alertmsg(data.message);
						 $("#permissionallot_modal").modal('hide');
						 var permissionset_id=$("#permissionsetId").val();
						 window.location.href="mian2edit?permissionsetId="+permissionset_id;
					 }else{
						 alertmsg(data.message);
					 }
					
				 }
				
			})
		})
	});
	
	
})