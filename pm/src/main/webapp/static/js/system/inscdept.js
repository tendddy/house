require([ "jquery", "fuelux", "zTree", "zTreecheck", "bootstrap-table", "bootstrap","bootstrapTableZhCn","additionalmethods", "jqvalidatei18n","jqcookie", "jqtreeview","lodash" ], function($) {

	$(function() {
		inittree();
		
		$("#addonedept").on("click", function(e) {
			
			if(!$("#comcode").val()){
				alertmsg("请选择机构!")
			}
			$("#upcomcode").val($("#comcode").val());
			$("#comcode").val("");
			$("#deptinnercode").val("");
			$("#comname").val("");
			$("#comtype").val("");
			$("#comgrade").val("");
			$("#rearcomcode").val("");
			$("#province").val("");
			$("#city").val("");
	        $("#county").val("");
			$("#address").val("");
			$("#webaddress").val("");
			$("#zipcode").val("");
			$("#phone").val("");
			$("#fax").val("");
			$("#email").val("");
			$("#satrapname").val("");
			$("#satrapphone").val("");
			$("#satrapcode").val("");
			$("#id").val("");
		});
//		选择地区
		initArea();
		$("#deldept").on("click", function(e) {	
			if(!$("#id").val()){
				alertmsg("请选择机构!");
			}
			$("#delid").val($("#id").val());
		});
		
		$('#myTree').on('selected.fu.tree', function (e, selected) {
			getdatafromid(selected.selected[0].dataAttributes.id);
		});

		$('#myTree').on('updated.fu.tree', function (e, selected) {
			getdatafromid(selected.selected[0].dataAttributes.id);
		});
		
		$('#myTree').on('opened.fu.tree', function (e, info) {
			getdatafromid(info.dataAttributes.id);
		});

		$('#myTree').on('closed.fu.tree', function (e, info) {
			getdatafromid(info.dataAttributes.id);
		});
		
		$("#savebutton").on("click", function(e) {
	 		if($("#orgsaveform").valid()){
				$("#orgsaveform").submit();
			}
		});
		$("#orgsaveform").validate({
				errorLabelContainer : ".alert-danger",
				errorElement : "p",
		        errorClass : "text-left",
		        focusInvalid : false,
		        rules: {
		        	rearcomcode:"required"
		        },  
		        messages: { 
		        	rearcomcode:{required: "育成机构代码不能为空"}   	
		        }
		 });
		
		$('#syncdept').on('click',function (){
			syncDeptData();
		});
	});	
	
});
	
function initArea(){
	getAreaByParentid("0",$("#province"));
}
function changeprv(){
	 getAreaByParentid($("#province").val(),$("#city"));
}
function changecity(){
	 getAreaByParentid($("#city").val(),$("#county"));
}

function getAreaByParentid(parentid,selectobject){
	$.ajax({
		url : "../region/getregionsbyparentid",
		type : 'GET',
		dataType : "json",
		data : {
			parentid:parentid
		},
		async : true,
		error : function() {
			alertmsg("Connection error");
		},
		success : function(data) {
			selectobject.empty();
			for (var i = 0; i < data.length; i++) {
				selectobject.append("<option value='"+data[i].id+"'>"+data[i].comcodename+"</option>");   
			}
			if(data.length>0){
				selectobject.get(0).selectedIndex=0;
			}
			selectobject.trigger("change"); 
		}
	});
}
function getAreaByParentid2(parentid,selectobject,value){
	$.ajax({
		url : "../region/getregionsbyparentid",
		type : 'GET',
		dataType : "json",
		data : {
			parentid:parentid
		},
		async : true,
		error : function() {
			alertmsg("Connection error");
		},
		success : function(data) {
			selectobject.empty();
			for (var i = 0; i < data.length; i++) {
				if(data[i].id == value){
					selectobject.append("<option selected='selected' value='"+data[i].id+"'>"+data[i].comcodename+"</option>");   
				}else{
					selectobject.append("<option value='"+data[i].id+"'>"+data[i].comcodename+"</option>");   
				}
			}
//			if(data.length>0){
//				selectobject.get(0).selectedIndex=0;
//			}
//			selectobject.trigger("change"); 
		}
	});
}
/*function getdatafromid(id){*/
function getdatafromid(event,treeId,treeNode){
	var id=treeNode.id;
	$("#deldept").show();
	$.ajax({
	   type: "POST",
	   url: "../dept/querybyid",
	   data: "id="+id,
	   dataType:"json",
	   success: function(datainfo){
		 $("#id").val(datainfo.orgobject.id);
		 $("#upcomcode").val(datainfo.orgobject.upcomcode);
	     $("#comcode").val(datainfo.orgobject.comcode);
	     $("#deptinnercode").val(datainfo.orgobject.deptinnercode);
	     $("#comname").val(datainfo.orgobject.comname);
	     $("#comtype").val(datainfo.orgobject.comtype);
	     $("#comgrade").val(datainfo.orgobject.comgrade);
	     $("#rearcomcode").val(datainfo.orgobject.rearcomcode);
    	 $("#province").val(datainfo.orgobject.province);
    	 $("#city").val(datainfo.orgobject.city);
    	 $("#county").val(datainfo.orgobject.county);
    	 getAreaByParentid2($("#province").val(),$("#city"),datainfo.orgobject.city);
    	 getAreaByParentid2(datainfo.orgobject.city,$("#county"),datainfo.orgobject.county);
    	 $("#address").val(datainfo.orgobject.address);
	     $("#webaddress").val(datainfo.orgobject.webaddress);
	     $("#zipcode").val(datainfo.orgobject.zipcode);
	     $("#phone").val(datainfo.orgobject.phone);
	     $("#fax").val(datainfo.orgobject.fax);
	     $("#email").val(datainfo.orgobject.email);
	     $("#satrapname").val(datainfo.orgobject.satrapname);
	     $("#satrapphone").val(datainfo.orgobject.satrapphone);
	     $("#satrapcode").val(datainfo.orgobject.satrapcode);
	   }
	});
}

/* zTree初始化数据 */
function inittree() {
	$.fn.zTree.init($("#deptTree"), deptSetting);
}
var deptSetting = {
		async: {
			enable: true,
			url: "../dept/inscdeptlist",
			autoParam: ["id=root"]
		},
		/*check: {
			enable: true,
			chkStyle: "radio",
			radioType: "all"
		},*/
		callback: {
			onClick: getdatafromid
		}
};
/* bootstrap-tree初始化数据 */
/*function inittree() {
	$('#myTree').tree({
	dataSource: function (options, callback) {
		var parentcode ="";
		var id = "";
		if(!jQuery.isEmptyObject(options)){
//			console.log('options:', options);
//			console.log(options.dataAttributes.parentcode);
			parentcode =options.dataAttributes.parentcode;
			id = options.dataAttributes.id;
		}
		
		$.ajax({
			type : "POST",
			url : "../dept/inscdeptlist",
			data :"root="+parentcode,
			dataType : 'json',
			success : function(data) {
				callback({
					data: data
				});
			}
		});
	},
	multiSelect : false,
	cacheItems : true,
	folderSelect : false,
});
}*/

function syncDeptData() {
	  $.ajax({
	    url: '../dept/getSyncDeptData',
	    type: 'POST',
	    dataType: "json",
	    async: true,
	    error: function() {
	      alertmsg("Connection error");
	    },
	    success: function(data) {
	      if (data != null) {
	    	  alertmsg(data.returnMsg);
	    	  if(data.success != null && data.success == true){
	    		  location.href="../dept/list";
	    	  }
	      }
	    }
	  });
}