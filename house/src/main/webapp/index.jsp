<%@ page contentType="text/html;charset=UTF-8" language="java"  pageEncoding="UTF-8"  %>
<html>
<head>
<title>楼盘信息</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css" />  
<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-theme.min.css" />  
<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-table.css" />  
<!-- 引入JS-->  
<script type="text/javascript" src="assets/js/jquery.min.js" ></script>  
<script type="text/javascript" src="assets/js/bootstrap.min.js" ></script>
<script type="text/javascript" src="assets/js/bootstrap-table.js" ></script>
<script type="text/javascript" src="assets/js/bootstrap-table-zh-CN.min.js" ></script>
</head>
<body> 
	<div class="container-fluid">
		<div class="panel panel-default m-bottom-5">
		  <div class="panel-heading padding-5-5">查询</div>
		  <div class="panel-body">
		    <div class="row">
			<div class="col-md-12">
				<form class="form-inline" role="form" id="userform">
					<div class="form-group col-md-4">
						<label for="exampleInputCode">城市</label>
						<select name="city" class="form-control" id="city"> 
							<option value="">请选择</option>
						</select>
					</div>
					<div class="form-group col-md-4">
						<label for="exampleInputName">区域</label>
						<select name="quyu" class="form-control" id="quyu"> 
							<option value="">请选择</option>
						</select>
					</div>
					<div class="form-group col-md-4">
						<label for="exampleInputOrgName">楼盘名称</label> 
						<input class="form-control" name="loupanname" id="loupanname">
					</div>
					<div class="form-group col-md-4">
						<label for="exampleInputOrgName">价格(每/m²)</label> 
						<select name="jiage" class="form-control" id="jiage"> 
						</select>
					</div>
					<div class="form-group col-md-4">
						<label for="exampleInputOrgName">面积(m²)</label> 
						<select name="mianji" class="form-control" id="mianji"> 
						</select>
					</div>
					<div class="form-group col-md-4">
						<label for="exampleInputOrgName">总价(万元)</label> 
						<select name="zongjia" class="form-control" id="zongjia"> 
						</select>
					</div>
				</form>
			</div>
		</div>
		  </div>
		  <div class="panel-footer">
						<button id="querybutton" type="button" name="querybutton"
											class="btn btn-primary">查询</button>
			</div>
		</div>
		<div class="panel panel-default">
		  <div class="panel-heading padding-5-5">
		  <div class="row">
				<div class="col-md-2">
					楼盘列表
					</div>
			</div>
			</div>
		    <div class="row">
				<div class="col-md-12">
					<table id="table-javascript"></table>
				</div>
		  </div>
		</div>
	</div>
</body>
<script type="text/javascript">
$(function(){
	
	$("#table-javascript").bootstrapTable({
        url: "queryLoupan",
        method: 'get',
        striped: true,
        queryParams:queryParams,       
        cache: false,
        striped: true,
        pagination: true,
        sidePagination: 'server', 
        pageSize:pagesize,
        minimumCountColumns: 2,
        clickToSelect: true,
        columns: [
  	            {field: 'id',title: 'id',visible: false,switchable:false },
  	          	{field: 'loupanchengshi',title: '楼盘城市',visible: false,switchable:false },
  	            {field: 'loupanmingcheng',title: '楼盘名称',align: 'center',valign: 'middle',sortable: false},
  	          	{field: 'loupanquyu',title: '区域',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loupankaifashang',title: '开发商',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loupandizhi',title: '楼盘地址',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loupanshuxing',title: '楼盘属性',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loupanyongdimianji',title: '用地面积',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loupanjianzhumianji',title: '建筑面积',align: 'center',valign: 'middle',sortable: false},
  	          	{field: 'operating',title: '详情',align: 'center',valign: 'middle',switchable:false,formatter: operateFormatter,events: operateEvents}	
  	        ],
  	           onLoadSuccess:function(data){
  	         }
    });
	// 列表页面【查询】按钮
	$("#querybutton").on("click", function(e) {
		var postdata = "";
		if($("#city").val()){
			postdata += "&city=" + $("#city").val();
			postdata += "&tabIndex=" + $("#city").val();
		}else{
			alert("请选择城市");
			return;
		}
		if($("#quyu").val()){
			postdata += "&quyu=" + $("#quyu").val();
		}
		if($("#loupanname").val()){
			postdata += "&loupanname=" + $("#loupanname").val();
		}
		if($("#jiage").val()){
			postdata += "&jiage=" + $("#jiage").val();
		}
		if($("#mianji").val()){
			postdata += "&mianji=" + $("#mianji").val();
		}
		if($("#zongjia").val()){
			postdata += "&zongjia=" + $("#zongjia").val();
		}
		postdata=postdata.substring(1);
		reloaddata(postdata);
	});
	
	$.ajax({
		url : 'initInfo?parentcode=0',
		type : 'GET',
		dataType : "json",
		async : true,
		contentType: "application/json; charset=utf-8", 
		error : function() {
			alertmsg("Connection error");
		},
		success : function(data) {
			var testJson = eval(data);
			for(var i=0;i<testJson.length;i++){
				$("#city").append("<option value=\"" + testJson[i].codevalue + "\">" + testJson[i].codename + "</option>");
			}
		}
	});
	$.ajax({
		url : 'initInfo?parentcode=jiage',
		type : 'GET',
		dataType : "json",
		async : true,
		contentType: "application/json; charset=utf-8", 
		error : function() {
			alertmsg("Connection error");
		},
		success : function(data) {
			var testJson = eval(data);
			$("#jiage").append("<option value=\"\">请选择</option>");
			for(var i=0;i<testJson.length;i++){
				$("#jiage").append("<option value=\"" + testJson[i].codevalue + "\">" + testJson[i].codename + "</option>");
			}
		}
	});
	$.ajax({
		url : 'initInfo?parentcode=zongjia',
		type : 'GET',
		dataType : "json",
		async : true,
		contentType: "application/json; charset=utf-8", 
		error : function() {
			alertmsg("Connection error");
		},
		success : function(data) {
			var testJson = eval(data);
			$("#zongjia").append("<option value=\"\">请选择</option>");
			for(var i=0;i<testJson.length;i++){
				$("#zongjia").append("<option value=\"" + testJson[i].codevalue + "\">" + testJson[i].codename + "</option>");
			}
		}
	});
	$.ajax({
		url : 'initInfo?parentcode=mianji',
		type : 'GET',
		dataType : "json",
		async : true,
		contentType: "application/json; charset=utf-8", 
		error : function() {
			alertmsg("Connection error");
		},
		success : function(data) {
			var testJson = eval(data);
			$("#mianji").append("<option value=\"\">请选择</option>");
			for(var i=0;i<testJson.length;i++){
				$("#mianji").append("<option value=\"" + testJson[i].codevalue + "\">" + testJson[i].codename + "</option>");
			}
		}
	});
	$("#city").change(function(){
		$("#quyu").empty();
		var parentcode = $("#city").val();
		$.ajax({
			url : 'initInfo?parentcode=' + parentcode,
			type : 'GET',
			dataType : "json",
			async : true,
			contentType: "application/json; charset=utf-8", 
			error : function() {
				alertmsg("Connection error");
			},
			success : function(data) {
				var testJson = eval(data);
				$("#quyu").append("<option value=\"\">请选择</option>");
				for(var i=0;i<testJson.length;i++){
					$("#quyu").append("<option value=\"" + testJson[i].codevalue + "\">" + testJson[i].codename + "</option>");
				}
			}
		});
	});
}); 
//添加事件
function operateFormatter(value, row, index) {
    return [
        '<a class="edit m-left-5"  href="javascript:void(0)" title="详情">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</a>'
    ].join('');
}
//事件相应
window.operateEvents = {
    'click .edit': function (e, value, row, index) {
    	getloupaninfo(row.id,row.loupanchengshi);
    }
};
function getloupaninfo(id,loupanchengshi){
	location.href = "loupanInfo?loupanId=" + id + "&tabIndex=" + loupanchengshi;
}
function queryParams(params) {
    return {
    	tabIndex: $("#city").val(),
    	city: $("#city").val(),
    	quyu: $("#quyu").val(),
    	loupanname: $("#loupanname").val(),
    	jiage: $("#jiage").val(),
    	mianji: $("#mianji").val(),
    	zongjia: $("#zongjia").val(),
        offset:params.offset,
        limit:params.limit,
    };
}
var pagesize = 10;
function reloaddata(data){
	$.ajax({
		url : "queryLoupan",
		type : 'GET',
		dataType : "json",
		data: data+"&limit="+pagesize,
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$('#table-javascript').bootstrapTable('load', data);
		}
	});
}
</script>
</html>
