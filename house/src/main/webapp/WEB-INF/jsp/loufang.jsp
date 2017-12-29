<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<html>
<head>
<title>楼房信息</title>
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
						<label for="exampleInputOrgName">单元</label> 
						<select name="danyuan" class="form-control" id="danyuan"> 
						</select>
					</div>
					<div class="form-group col-md-4">
						<label for="exampleInputOrgName">房屋状态</label> 
						<select name="loufangzhuangtai" class="form-control" id="loufangzhuangtai"> 
						</select>
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
					楼房列表
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
        url: "queryLoufang",
        method: 'get',
        queryParams:queryParams,       
        cache: false,
        striped: false,
        pagination: true,
        sidePagination: 'server', 
        pageSize:pagesize,
        minimumCountColumns: 2,
        clickToSelect: true,
        rowStyle: function (row, index) {
        	var str = "";
        	if(row.loufangzhuangtai == "已售") {  
                var str = 'danger';  
            }else if(row.loufangzhuangtai == "可售"){  
                var str = 'success';  
            }else if(row.loufangzhuangtai == "预定") {  
                var str = 'warning';  
            }else{  
                var str = 'info';  
            }
        	return { classes: str };
        },
        columns: [
  	            {field: 'id',title: 'id',visible: false,switchable:false },
  	            {field: 'loufangmingcheng',title: '楼房名称',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loufangdanyuan',title: '单元',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loufangcengshu',title: '层数',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loufangshihao',title: '室号',align: 'center',valign: 'middle',sortable: false},
  	            {field: 'loufangjianzhumianji',title: '建筑面积',align: 'center',valign: 'middle',sortable: false},
  	          	{field: 'loufangtaoneimianji',title: '套内面积',align: 'center',valign: 'middle',sortable: false},	
  	          	{field: 'loufangfangxing',title: '房型',align: 'center',valign: 'middle',sortable: false},	
  	          	{field: 'loufangdanjia',title: '单价',align: 'center',valign: 'middle',sortable: false},	
  	          	{field: 'loufangzongjia',title: '总价',align: 'center',valign: 'middle',sortable: false},	
  	            {field: 'loufangzhuangtai',title: '房屋状态',align: 'center',valign: 'middle',sortable: false}
  	        ],
  	           onLoadSuccess:function(data){
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
	$.ajax({
		url : 'initInfo?parentcode=loufangzhuangtai',
		type : 'GET',
		dataType : "json",
		async : true,
		contentType: "application/json; charset=utf-8", 
		error : function() {
			alertmsg("Connection error");
		},
		success : function(data) {
			var testJson = eval(data);
			$("#loufangzhuangtai").append("<option value=\"\">请选择</option>");
			for(var i=0;i<testJson.length;i++){
				$("#loufangzhuangtai").append("<option value=\"" + testJson[i].codevalue + "\">" + testJson[i].codename + "</option>");
			}
		}
	});
	$.ajax({
		url : 'initDanyuan?loudongId=' + '${loudongId }' + '&tabIndex=' + '${tabIndex}',
		type : 'GET',
		dataType : "json",
		async : true,
		contentType: "application/json; charset=utf-8", 
		error : function() {
			alertmsg("Connection error");
		},
		success : function(data) {
			var testJson = eval(data);
			$("#danyuan").append("<option value=\"\">请选择</option>");
			for(var i=0;i<testJson.length;i++){
				$("#danyuan").append("<option value=\"" + testJson[i] + "\">" + testJson[i] + "</option>");
			}
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
		if($("#danyuan").val()){
			postdata += "&danyuan=" + $("#danyuan").val();
		}
		if($("#loufangzhuangtai").val()){
			postdata += "&loufangzhuangtai=" + $("#loufangzhuangtai").val();
		}
		postdata += "&tabIndex=" + '${tabIndex}';
		postdata += "&loudongId=" + '${loudongId}';
		postdata=postdata.substring(1);
		reloaddata(postdata);
	});
});
var pagesize = 10;
function queryParams(params) {
    return {
    	loudongId: '${loudongId}',
    	tabIndex: '${tabIndex}',
    	jiage: $("#jiage").val(),
    	mianji: $("#mianji").val(),
    	zongjia: $("#zongjia").val(),
    	loufangzhuangtai: $("#loufangzhuangtai").val(),
    	danyuan: $("#danyuan").val(),
        offset:params.offset,
        limit:params.limit,
    };
}
function reloaddata(data){
	$.ajax({
		url : "queryLoufang",
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
