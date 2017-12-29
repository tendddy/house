<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<html>
<head>
<title>楼栋信息</title>
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
					楼栋列表【 ${loupanmingcheng} 】
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
        url: "queryLoudong",
        method: 'get',
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
  	            {field: 'loudongmingcheng',title: '楼栋名称',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loudongxiaoshouxukezheng',title: '销售许可证',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loudongkaipanshijian',title: '开盘时间',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loudongzongtaoshu',title: '总套数',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loudongkeshoutaoshu',title: '可售套数',align: 'center',valign: 'middle',sortable: false},
  	          	{field: 'operating',title: '详情',align: 'center',valign: 'middle',switchable:false,formatter: operateFormatter,events: operateEvents}	
  	        ],
  	           onLoadSuccess:function(data){
  	         }
    });
	// 列表页面【查询】按钮
	$("#querybutton").on("click", function(e) {
		var postdata = "";
		if($("#jiage").val()){
			postdata += "&jiage=" + $("#jiage").val();
		}
		if($("#mianji").val()){
			postdata += "&mianji=" + $("#mianji").val();
		}
		if($("#zongjia").val()){
			postdata += "&zongjia=" + $("#zongjia").val();
		}
		postdata += "&loupanid=" + '${loupanId}';
		postdata += "&tabIndex=" + '${tabIndex}';
		postdata=postdata.substring(1);
		reloaddata(postdata);
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
    	getloudonginfo(row.id);
    }
};
function getloudonginfo(id){
	location.href = "loudongInfo?loudongId=" + id + "&tabIndex=" + '${tabIndex}';
}
var pagesize = 10;
function queryParams(params) {
    return {
    	loupanid: '${loupanId}',
    	tabIndex: '${tabIndex}',
    	jiage: $("#jiage").val(),
    	mianji: $("#mianji").val(),
    	zongjia: $("#zongjia").val(),
        offset:params.offset,
        limit:params.limit,
    };
}
function reloaddata(data){
	$.ajax({
		url : "queryLoudong",
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
