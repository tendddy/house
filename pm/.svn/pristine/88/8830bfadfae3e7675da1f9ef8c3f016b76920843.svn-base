require(["jquery", "bootstrapdatetimepicker", "bootstrapdatetimepickeri18n", "bootstrap-table", "bootstrap","bootstrapTableZhCn","jqvalidatei18n","additionalmethods","jqtreeview","zTree","zTreecheck"], function ($) {
	$('.form_datetime').datetimepicker({
		language:  'zh-CN',	
		format: 'yyyy-mm-dd hh:ii:ss',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
        showMeridian: 1
    });
	$('.form_date').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });
	//选择年月的    startView: 3,   minView: 3, format: 'yyyymm',  
	$('.form_month').datetimepicker({  
	        format: 'yyyymm',  
	         weekStart: 1,  
	         autoclose: true,  
	         startView: 3,  
	         minView: 3,  
	         forceParse: false,  
	         language: 'zh-CN'  
	    }); 
	$('.form_time').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 1,
		minView: 0,
		maxView: 1,
		forceParse: 0
    });
	$(function() {
		//平台列表查看
		$("#ordersPolicy").bootstrapTable({
	        url: "initorderslist",
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
                    {field: 'state',align: 'center',valign: 'middle',checkbox: true},
      	            {field: 'id',title: 'id',visible: false,switchable:false },
      	            {field : 'Number',title : '行号',align: 'center',valign: 'middle',//行号
      	              formatter : function(value, row, index) { 
      	            	 		var pageNumber = $(".page-number").length;
				  				for(var i=0;i<pageNumber;i++){
				  					if($(".page-number").eq(i).hasClass("active")){//得到当前页
				  						pageNumber=$(".page-number").eq(i).find("a").html();
				  					}
				  				}
      	                  return pagesize * (pageNumber - 1) + index + 1;  
      	              }  
      	          },
      	            {field: 'platform_name',title: '应用平台名称',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'app_orderid',title: '订单号',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'orderfee',title: '实际支付金额',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'orderdatetime',title: '订单提交时间',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'status',title: '状态',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'operation',title: '操作',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
      	        ],
      	           onLoadSuccess:function(data){
      	         }
	    });
		// 列表页面【查询】按钮
		$("#querybutton").on("click", function(e) {
			var postdata = "";
			if($("#platformName").val()){
				postdata += "&platformName=" + $("#platformName").val();
			}
			if($("#startdate").val()){
				postdata += "&startdate=" + $("#startdate").val();
			}
			if($("#enddate").val()){
				postdata += "&enddate=" + $("#enddate").val();
			}
			if($("#appOrderid").val()){
				postdata += "&appOrderid=" + $("#appOrderid").val();
			}
			if($("#status").val()){
				postdata += "&status=" + $("#status").val();
			}
			postdata=postdata.substring(1);
			reloaddata(postdata);
		});
		// 查询条件【重置】按钮
		$("#resetbutton").on("click", function(e) {
			$("#platformName").val("");
			$("#startdate").val("");
			$("#enddate").val("");
			$("#appOrderid").val("");
			$("#status").val("");
		});
		// 【返回】按钮
		$("#go_back").on("click",function(){
			window.location.href="list";
		});
		//卡片列表
		$("#toggle").on("click", function(e) {
			$('#ordersPolicy').bootstrapTable('toggleView');
		});
		//刷新
		$("#refresh").on("click", function(e) {
			$('#ordersPolicy').bootstrapTable('refresh');
		});
	});
	
});	

//查询列表
function reloaddata(data){
	$.ajax({
		url : "initorderslist",
		type : 'GET',
		dataType : "json",
		data: data+"&limit="+pagesize,
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$('#ordersPolicy').bootstrapTable('load', data);
		}
	});
}
//得到查询参数
function queryParams(params) {
    return {
    	platformName: $("#platformName").val(),
    	startdate: $("#startdate").val(),
    	enddate: $("#enddate").val(),
    	appOrderid: $("#appOrderid").val(),
    	status: $("#status").val(),
        offset:params.offset,
        limit:params.limit,
        sort: params.sort,  //排序列名
		order: params.order//排位命令（desc，asc）
    };
}
var pagesize = 10;

//添加事件
function operateFormatter(value, row, index) {
    return [
        '<a class="edit m-left-5" href="javascript:void(0);" title="编辑">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</a>'
    ].join('');
}
//事件响应
window.operateEvents = {
    'click .edit': function (e, value, row, index) {
    	gotoProtocolInfo(row.id);
    }
};
function gotoProtocolInfo(id){
	window.location.href = "toDetailOfOrders?id="+id;
}