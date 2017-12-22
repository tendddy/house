require(["jquery", "bootstrap-table", "bootstrap","bootstrapTableZhCn","jqvalidatei18n", "bootstrapdatetimepicker","bootstrapdatetimepickeri18n","jqcookie", "jqtreeview","zTree","zTreecheck","public"], function ($) {
	//数据初始化 
	$(function() {
		$("#istest").on("change",function(){
			var temp_data = $("#istest").find("option:selected").val();
			if(temp_data==3){
				$("#base_data").append("<tr id='new_tr'><td class='col-md-1' align='right' style='vertical-align: middle;'>关联正式账户</td><td><input class='form-control' type='text' name='jobnum4virtual'></td><td></td><td></td><td></td><td></td></tr>");
			}else{
				$("#new_tr").remove();
			}
		});
				
		set_id=$("#setid option:selected").val();  
		agent_id = $("#id").val();
			
		if(set_id != ''){
			$('#deptname1').attr("disabled",true);
			//$('#deptname').attr("disabled",true); 
		};
		
		$("#agentkind").on("change",function(){
			var deptid =$("#deptid").val();
			var deptid1 =$("#deptid1").val();
			var agentkind =$("#agentkind").val();
			if( deptid!=''  && agentkind!='' && deptid1==null){
				getAreaByDeptid(deptid,agentkind,$("#setid"));
			}else if(deptid1!='' && agentkind!='' && deptid==null){
				getAreaByDeptid2(deptid1,agentkind,$("#setid"));
			}else{
				$("#setid").empty();
				$("#setid").append("<option value=''>"+"请选择"+"</option>");
			}
		});
		
		
		$("#go_back").on("click",function(){
			window.location.href="menu2list";
		})
		//初始化供应商
		$("#setid").on("change",function(){
			
			//功能包修改，联动供应商
			set_id=$(this).val();
			$.fn.zTree.init($("#provider_tree"), provider_setting);
			
			
			//代理人不能编辑功能包信息
//			if(set_id!=""){
//				$("#save_agent_permisssion_provider").attr("disabled","disabled ");
//			}else{
//				$("#save_agent_permisssion_provider").removeAttr("disabled")
//			}
			//reloaddata();
			//联动功能包权限列表
			$.ajax({
				url:'initpermissionlistpage',
				type:'get',
				data:({permissionsetId:set_id,agentId:agent_id,limit:10}),
				cache : false,
	            async : true,
				success:function(data){
					$('#permisssion_list').bootstrapTable('load', data);
				}			
			})
			
		});
		
//		if(set_id!=""){
//			$("#save_agent_permisssion_provider").attr("disabled","disabled ");
//		}
		
		//保存代理人基本信息
		$("#save_agent").on("click",function(){ 
			//alertmsg($("#agent_form").valid()); 
			var agentid = $("#agentid").val();
			var name = $("#name").val();
			var deptname = $("#deptname1").val();
			var deptid = $("#deptid").val();
			var agentkind = $("#agentkind").val();
			var approvesstate = $("#approvesstate").find("option:selected").text();
			var phoneverify1 = $("#phoneverify1").val();
//			var phoneverify2 = $("#phoneverify2").val();
			var flag = true;
			if(name.trim() == ""){
				alertmsg("姓名不能为空");
				return false;
			}
			if((deptname == "" || deptname == undefined) && (deptid == "" || deptid == undefined)){
				alertmsg("所属机构不能为空");
				return false;
			}else if(deptid != "" && deptid != undefined){
				$.ajax({
					url:'deptverify',
					type:'get',
					dataType:'json',
					async:false,
					data:({deptid:deptid}),
					success:function(data){
						if(data.msg=="false"){
							alertmsg("所属机构必须为网点");
							flag = false;
						}
					}
				})
			}
			if(flag == false){
				return false;
			}
			if(agentkind == "" ){
				alertmsg("用户类型不能为空");
			}
			if(agentkind == "2" || agentkind == "3"){
				if(approvesstate != "认证通过"){
					alertmsg("您选择的用户类型所对应的认证状态必须为认证通过");
					return false;
				}
			}
//			if(phoneverify1 != "" && phoneverify2 != "" && phoneverify1 == phoneverify2){
//				alertmsg("两个手机号不能相同");
//				return false;
//			}
			if(/^(13|14|15|17|18)\d{9}$/.test(phoneverify1)){
				$.ajax({
					url:'phoneverify',
					type:'get',
					dataType:'json',
					async:false,
					data:({phonenum:phoneverify1,agentid:agentid}),
					success:function(data){
						if(data.msg=="该手机号已存在"){
							alertmsg("手机号码1已存在");
							flag = false;
						}
					}
				})
			}else{
				alertmsg('请输入有效11位手机号！');
				return false;
			}
			if(flag == false){
				return false;
			}
//			if(phoneverify2 != ''){
//				if(/^(13|14|15|17|18)\d{9}$/.test(phoneverify2)){
//					$.ajax({
//						url:'phoneverify',
//						type:'get',
//						dataType:'json',
//						async:false,
//						data:({phonenum:phoneverify2,agentid:agentid}),
//						success:function(data){
//							if(data.msg=="该手机号已存在"){
//								alertmsg("手机号码2已存在");
//								flag = false;
//							}
//						}
//					})
//				}else{
//					alertmsg('请输入有效11位手机号！');
//					return false;
//				}
//			}
//			if(flag == false){
//				return false;
//			}
			if($("#agent_form").valid()){				
				$.ajax({ 
					url:'saveorupdateagent',
					type:'post',
					data:$("#agent_form").serialize(),
					success:function(data){
						if(data.length>0){							
							//每次更改最值机构时更新供应商信息（通过字段区分）
							 $("#id").attr("value",data);
							 agent_id =  $("#id").val();
							$.fn.zTree.init($("#provider_tree"), provider_setting);
							alertmsg("保存成功");
						}else{
							alertmsg("保存失败");
						}
					}					
				})
			}			
		});				

		$("#agent_form").validate({
			errorLabelContainer : ".alert-danger",
			errorElement : "p",
	        errorClass : "text-left",
	        focusInvalid : false,
	        rules: {
	        	agentcode:{
	        		required:true, 
		        	remote:{
		        		type:"post",
		        		url:"checkusercode",
		        		data:{
		        			agentcode:function(){return $("#agentcode").val();},
		        			id:function(){return $("#id").val()}
		        		}
		        	}		        		
	        	},
	        	deptid:{
	        		required:true
	        	},
	        	deptid1:{
	        		required:true
	        	},
	        	mobile:{
	        		required:true
	        	},
	        	name:{
	        		required:true
	        	},
	        	agentkind:{
	        		required:true
	        	}
	        },  
	        messages: { 
	        	agentcode:{
	        		required: "代理人编码不能为空",
	        		remote: jQuery.format("该代理人编码已存在")
	        	},
	        	deptid:{
	        		required: "所属机构不能为空"
	        	},
	        	deptid1:{
	        		required: "所属机构不能为空"
	        	},
	        	mobile:{
	        		required: "手机号码1不能为空"
	        	},
	        	name:{
	        		required: "姓名不能为空"
	        	},
	        	agentkind:{
	        		required: "用户类型不能为空"
	        	}
	        }
	    });
		
		//代理人   供应商 保存 
		$("#save_agent_permisssion_provider").on("click",function(){					
			//得到选中的供应商code(未选中进行提示)
			var treeObj = $.fn.zTree.getZTreeObj('provider_tree');  
		    var nodes = treeObj.getCheckedNodes(true);  
		    var checkedIds = '';  
		    for(var i=0; i<nodes.length; i++){  
		        checkedIds += nodes[i].id + ',';  
		    }  
		    if(checkedIds.length > 0){  
		        checkedIds = checkedIds.substring(0, checkedIds.length-1);  
		    }  
			if(checkedIds==""){
				alertmsg("请选择供应商");
				return false;
			}
		    //保存功能包 权限 供应商关系
		    $.ajax({
		    	url:'saveagentproviderdata',
		    	type:'post',
		    	data:({providerIds:checkedIds,agentId:agent_id}),
		    	success:function(data){
		    		if(data.status=="1"){
		    			alertmsg(data.message);
		    		}else{
		    			alertmsg(data.message);
		    		}
		    	}
		    })
		})
		
		$.fn.zTree.init($("#provider_tree"), provider_setting);
		
		//弹出机构树
		$("#deptname").on("click",function(){
			$.fn.zTree.init($("#dept_tree"), deptsetting);
			$("#myModal_dept").removeData("bs.modal");
			$("#myModal_dept").modal({
				 show: true
			});
			
		})
				
		//弹出机构树 常用网点设置
		$("#commonusebranchname").on("click",function(){
			/*$.fn.zTree.init($("#commonusebranchname_tree"), cdeptsetting);*/	
			$.fn.zTree.init($("#commonusebranchname_tree"), cdeptsetting);
			$("#myModal_commonusebranch").removeData("bs.modal");
			$("#myModal_commonusebranch").modal({
				 show: true
			});
		})
		//弹出渠道
		$("#channelname").on("click",function(){
			$.fn.zTree.init($("#channel_tree"), channelsetting);
			$("#myModal_channel").removeData("bs.modal");
			$("#myModal_channel").modal({
				 show: true
			});
			
		})
		//初始化权限列表（是否有功能包id）	
		$('#permisssion_list').bootstrapTable({
            method: 'get',
        	singleSelect:true,
            url: "initpermissionlistpage?agentId="+agent_id+"&permissionsetId="+set_id,
            cache: false,
            striped: true,
            pagination: true,
            sidePagination: 'server', 
            pageSize: '10',
            minimumCountColumns: 2,
            clickToSelect: true,
            columns: [{
                field: 'permissionName',
                title: '功能名称',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'functionstatestr',
                title: '功能状态',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
            	field: 'permissionNum',
            	title: '使用次数',
            	align: 'center',
            	valign: 'middle',
            	sortable: true
            }, {
            	field: 'permissionSurplusnum',
            	title: '已使用次数',
            	align: 'center',
            	valign: 'middle',
            	sortable: true
            }, {
                field: 'permissionPath',
            	title: '操作',
            	align: 'center',
            	valign: 'middle',
            	sortable: false
            }]
        });
	});
	
	
	
});

function cleanSurplusnum(agentPermissionId) {
	$.ajax({
        type: "get",
        url: "cleanSurplusnum?agentPermissionId=" + agentPermissionId,
        dataType:"text",
        cache : false,
        async : true,
        error : function() {
            alertmsg("Connection error");
        },
        success: function(data){
        	if (data == "success") {
        		alertmsg("清空已使用次数成功");
        		window.location.reload();
        	} else {
        		alertmsg("清空已使用次数失败");
        	}
        }
    });
}

function reloaddata(){
	$.ajax({
		url:'initpermissionlistpage',
		type:'get',
		data:({permissionsetId:set_id,agentId:agent_id,limit:10}),
		cache : false,
        async : true,
		success:function(data){
			//alert(data);
			$('#permisssion_list').bootstrapTable('load', data);
		}			
	})
}


//添加编辑
function operateFormatter(value, row, index) {
    return [
        '<a class="edit m-left-5" href="javascript:void(0)" title="清空已使用次数">',
        '<button value="清空已使用次数"/>',
        '</a>'
    ].join('');
}
//弹出编辑窗带参数 id
window.operateEvents = {
    'click .edit': function (e, value, row, index) {
//    	if(set_id!=""){
//    		alertmsg("功能包不能编辑！");
//    		return false;
//    	}
    	var apid="" ;
    	//关系表id
    	if(row.apid!=undefined){
    		apid = row.apid;
    	}
    	 $('#agent_permission_modal').removeData('bs.modal');
    	 
    	 //代理人id
    	 agent_id = $("#id").val();
    	 if(agent_id==""){
    		 alertmsg("请先保存功能包基础信息");
    		 return false;
    	 }else{
    		 $("#agent_permission_modal").modal({
    				show: true,
    				//                              权限id                代理人id        关系表id
    				remote: 'agent2agentpermission?id='+row.id
    			});
    	 }
    	
    	
    }
};



var provider_setting = {
		async: {
			enable: true,
			url:"initprovidertree",
			otherParam:{"agentId":function(){
					//得到当前代理人id
					return agent_id;
				},"setId":function(){					
					//得到选中的功能包id
					return set_id;
				}
			} 
		},
		/*check: {
			enable: true,
			autoCheckTrigger: true,
			chkboxType:{  "Y" : "", "N" : "ps"}
		},*/
		data: {
			simpleData: {
				enable: true
			}
		},
	};                                  

function zTreeOnAsyncSuccess(event, treeId, msg) { 
          try { 
        	  var treeObj = $.fn.zTree.getZTreeObj('provider_tree');  
                 //调用默认展开第一个结点 
        	  	var nodes = treeObj.getCheckedNodes(true); 
                 for(var i=0;i<nodes.length;i++ ){
                	 treeObj.expandNode(nodes[i], true); 
                	 var childNodes = treeObj.transformToArray(nodes[i]);
                	 for(var j=0;j<childNodes.length;j++){
                		 treeObj.expandNode(childNodes[1], true);
                	 }
                 }
           } catch (err) { 
        	   
           } 
} 
//得到所有已经选中的节点
function beforeAsync(treeId, treeNode) {
	return true;
}

function getAreaByDeptid(deptid,agentkind,selectobject){
			$.ajax({
				url : "../agent/getAreaByDeptid",
				type : 'GET',
				dataType : "json",
				data : {
					deptid:deptid,
					agentkind:agentkind
				},
				async : true,
				error : function() {
					alertmsg("Connection error");
				},
				success : function(data) {
					selectobject.empty();
					selectobject.append("<option value=''>"+"请选择"+"</option>")
					for (var i = 0; i < data.length; i++) {
						selectobject.append("<option value='"+data[i].id+"'>"+data[i].setname+"</option>");   
					}
					/*if(data.length>0){
						selectobject.get(0).selectedIndex=0;
					}*/
					selectobject.trigger("change"); 
				}
			});
}

function getAreaByDeptid2(deptid1,agentkind,selectobject){
	$.ajax({
		url : "../agent/getAreaByDeptid",
		type : 'GET',
		dataType : "json",
		data : {
			deptid:deptid1,
			agentkind:agentkind
		},
		async : true,
		error : function() {
			alertmsg("Connection error");
		},
		success : function(data) {
			selectobject.empty();
			selectobject.append("<option value=''>"+"请选择"+"</option>")
			for (var i = 0; i < data.length; i++) {
				selectobject.append("<option value='"+data[i].id+"'>"+data[i].setname+"</option>");   
			}
			/*if(data.length>0){
				selectobject.get(0).selectedIndex=0;
			}*/
			selectobject.trigger("change"); 
		}
	});
}

//常用设置网点，获取的网点数据
function showMenu() {
	var deptObj = $("#commonusebranchname");
	var deptOffset = $("#commonusebranchname").offset();
	$("#commonusebranchname_tree").css({left:deptOffset.left + "px", top:deptOffset.top + deptObj.outerHeight() + "px"}).slideDown("fast");

	$("body").bind("mousedown", onBodyDown);
}

function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "commonusebranchname" || event.target.id == "commonusebranchname_tree" || $(event.target).parents("#commonusebranchname_tree").length>0)) {
		hideMenu();
	}
}
function hideMenu() {
	$("#commonusebranchname_tree").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
function beforeClick(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("commonusebranchname_tree");
	zTree.checkNode(treeNode, !treeNode.checked, null, true);
	return false;
}

function onCheck(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("commonusebranchname_tree"),
	nodes = zTree.getCheckedNodes(true),
	v_id="";
	v = "";
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i].name + ",";
		v_id += nodes[i].id + ",";
	}
	if (v.length > 0 ) {
		v = v.substring(0, v.length-1);
	}
	if (v_id.length > 0 ) {
		v_id = v_id.substring(0, v_id.length-1);
	}
	var cityObj = $("#commonusebranchname");
	var deptIdObj = $("#commonusebranchid");
	cityObj.attr("value", v);
	deptIdObj.attr("value",v_id)
}
// 常用网点设置  结束
function filter(treeId, parentNode, childNodes) {
	if (!childNodes) return null;
	for (var i=0, l=childNodes.length; i<l; i++) {
		childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	return childNodes;
}
var deptsetting = {
		async: {
			enable: true,
			url:"initdepttree",
			autoParam:["id"],
			dataType: "json",
			type: "post"
		},
		check: {
			enable: true,
			chkStyle: "radio",
			radioType: "all"
			
		},
		callback: {
			onCheck: deptTreeOnCheck
		}
	};
function deptTreeOnCheck(event, treeId, treeNode) {
	$("#deptid").val(treeNode.id);
	$("#deptname").val(treeNode.name);
	$('#myModal_dept').modal("hide");
	var deptid =$("#deptid").val();
	var deptid1 =$("#deptid1").val();
	var agentkind =$("#agentkind").val();
	if( deptid!=''  && agentkind!='' && deptid1==null){
		getAreaByDeptid(deptid,agentkind,$("#setid"));
	}else if(deptid1!='' && agentkind!=''&& deptid==null){
		getAreaByDeptid2(deptid1,agentkind,$("#setid"));
	}else{
		$("#setid").empty();
		$("#setid").append("<option value=''>"+"请选择"+"</option>");
	};
}

var cdeptsetting = {
		view: {
			selectedMulti: true
		},
		async: {
			enable: true,
			url:"initdepttree",
			autoParam:["id","checked"],
			dataFilter: filter,
			otherParam:{"commonusebranchIds":function(){
				return $("#commonusebranchid").val();
			}}
		},
		check: {
			enable: true,
			autoCheckTrigger: true,
			chkboxType:{ "Y" : "", "N" : "ps"}
		},callback: {
			beforeAsync: beforeDeptAsync,
			onAsyncSuccess: zTreeDeptOnAsyncSuccess,
			onCheck:on_dept_Check
		}
	};		
function on_dept_Check(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("commonusebranchname_tree"),
	nodes = zTree.getCheckedNodes(true),
	v_id="";
	v = "";
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i].name + ",";
		v_id += nodes[i].id + ",";
	}
	if (v.length > 0 ) {
		v = v.substring(0, v.length-1);
	}
	if (v_id.length > 0 ) {
		v_id = v_id.substring(0, v_id.length-1);
	}
	var deptObjName = $("#commonusebranchname");
	var deptObjId = $("#commonusebranchid");
	deptObjName.attr("value", v);
	deptObjId.attr("value",v_id)
}
function zTreeDeptOnAsyncSuccess(event, treeId, msg) { 
    try { 
  	  var treeObj = $.fn.zTree.getZTreeObj('commonusebranchname_tree');  
           //调用默认展开第一个结点 
  	  	var nodes = treeObj.getCheckedNodes(true); 
           for(var i=0;i<nodes.length;i++ ){
          	 treeObj.expandNode(nodes[i], true); 
          	 var childNodes = treeObj.transformToArray(nodes[i]);
          	 for(var j=0;j<childNodes.length;j++){
          		 treeObj.expandNode(childNodes[1], true);
          	 }
           }
     } catch (err) { 
  	   
     } 
} 
//得到所有已经选中的节点
function beforeDeptAsync(treeId, treeNode) {
	return true;
}

var channelsetting = {
		async: {
			enable: true,
			url:"initchanneltree",
			autoParam:["id"],
			dataType: "json",
			type: "post"
		},
		check: {
			enable: true,
			chkStyle: "radio",
			radioType: "all"
		},
		callback: {
			onCheck: channelTreeOnCheck
		}
	};
function channelTreeOnCheck(event, treeId, treeNode) {
	$("#channelid").val(treeNode.id);
	$("#channelname").val(treeNode.name);
	$('#myModal_channel').modal("hide");
}