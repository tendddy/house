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
		
		$("#auditPolicy").bootstrapTable({
	        url: "",
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
      	            {field: 'selectdate',title: '对账日期',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'txcou',title: '中金订单数',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'txAmount',title: '中金订单总金额',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'paycou',title: '平台订单数',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'payfee',title: '平台订单总金额',align: 'center',valign: 'middle',sortable: true}
      	            //{field: 'operation',title: '操作',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
      	        ],
      	           onLoadSuccess:function(data){
      	         }
	    });
		$("#detailPolicy").bootstrapTable({
	        url: "selectauditdetaillist",
	        method: 'get',
	        queryParams:querydetailParams,       
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
      	            {field: 'payprotocolid',title: '平台支付流水号',align: 'left',valign: 'middle',sortable: false},
      	            {field: 'orderid',title: '平台支付订单号',align: 'left',valign: 'middle',sortable: false},
      	            {field: 'platform_name',title: '总平台名称',align: 'left',valign: 'middle',sortable: false},
      	            {field: 'app_name',title: '应用平台名称',align: 'left',valign: 'middle',sortable: false},
      	            {field: 'txSn',title: '中金流水号',align: 'left',valign: 'middle',sortable: false},
      	            {field: 'payfee',title: '平台支付订单金额',align: 'center',valign: 'middle',sortable: false},
      	            {field: 'txAmount',title: '中金订单金额',align: 'center',valign: 'middle',sortable: false},
      	            {field: 'trcon',title: '情况',align: 'center',valign: 'left',sortable: false}
      	            //{field: 'operation',title: '操作',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
      	        ],
      	           onLoadSuccess:function(data){
      	         }
	    });
		//初始化---start---
		
		//初始化---end---
		// 列表页面【查询】按钮
		$("#querybtn").on("click", function(e) {
			var postdata = "";
			if($("#selectdate").val()){
				postdata += "&selectdate=" + $("#selectdate").val();
			}
			if($("#orderid").val()){
				postdata += "&orderid=" + $("#orderid").val();
			}
			if($("#platform_name").val()){
				postdata += "&platform_name=" + $("#platform_name").val();
			}
			if($("#app_name").val()){
				postdata += "&app_name=" + $("#app_name").val();
			}
			postdata=postdata.substring(1);
			reloaddetaildata(postdata);
		});
		
		
		// 查询条件【重置】按钮
		$("#resetbtn").on("click", function(e) {
			$("#orderid").val("");
			$("#platform_name").val("");
			$("#app_name").val("");
		});
		//卡片列表
		$("#togglebtn").on("click", function(e) {
			$('#detailPolicy').bootstrapTable('toggleView');
		});
		//刷新
		$("#refreshbtn").on("click", function(e) {
			$('#detailPolicy').bootstrapTable('refresh');
		});
		// 【明细导出】按钮
		$("#downdetail").on("click",function(){
			var postdata = "";
			if($("#selectdate").val()){
				postdata += "&selectdate=" + $("#selectdate").val();
			}
			if($("#orderid").val()){
				postdata += "&orderid=" + $("#orderid").val();
			}
			if($("#platform_name").val()){
				postdata += "&platform_name=" + $("#platform_name").val();
			}
			if($("#app_name").val()){
				postdata += "&app_name=" + $("#app_name").val();
			}
			postdata=postdata.substring(1);
			window.location.href="downauditdetaillist?"+postdata+"&limit="+pagesize;
		});
		// 【导出】按钮
		$("#down").on("click",function(){
			var postdata = "";
			if($("#startdate").val()){
				postdata += "&startdate=" + $("#startdate").val();
			}else{
				alert("查询日期起不能为空！");return false;
			}
			if($("#enddate").val()){
				postdata += "&enddate=" + $("#enddate").val();
			}else{
				alert("查询日期止不能为空！");return false;
			}
			if($("#startdate").val()>$("#enddate").val()){
				alert("查询日期起不能大于查询日期止！");return false;
			}
			postdata=postdata.substring(1);
			window.location.href="downauditlist?"+postdata+"&limit="+pagesize;
		});
		// 【返回】按钮
		$("#go_back").on("click",function(){
			window.location.href="list";
		});
		//【详细查询】按钮
		$("#detailquerybutton").click(function(){
			var arrayuserid = getSelectedRows();
			if(arrayuserid!="undefined"&&arrayuserid.length!=1){
				alert("请选中一条操作数据！");
				return false;
			}
			window.location.href = "detailquery?selectdate="+arrayuserid;
		})
		// 列表页面【查询】按钮
		$("#querybutton").on("click", function(e) {
			var postdata = "";
//			if($("#platformSel").val()){
//				postdata += "&platformSel=" + $("#platformSel").val();
//			}else{
//				alert("平台不能为空！");return false;
//			}
			if($("#startdate").val()){
				postdata += "&startdate=" + $("#startdate").val();
			}else{
				alert("查询日期起不能为空！");return false;
			}
			if($("#enddate").val()){
				postdata += "&enddate=" + $("#enddate").val();
			}else{
				alert("查询日期止不能为空！");return false;
			}
			if($("#startdate").val()>$("#enddate").val()){
				alert("查询日期起不能大于查询日期止！");return false;
			}
			postdata=postdata.substring(1);
			reloaddata(postdata);
		});
		
		
		// 查询条件【重置】按钮
		$("#resetbutton").on("click", function(e) {
			$("#startdate").val("");
			$("#enddate").val("");
//			$("#platformSel").val("");
		});
		//卡片列表
		$("#toggle").on("click", function(e) {
			$('#auditPolicy').bootstrapTable('toggleView');
		});
		//刷新
		$("#refresh").on("click", function(e) {
			$('#auditPolicy').bootstrapTable('refresh');
		});
	});
	
});

//得到选中的列表条目中的selectdate
function getSelectedRows() {
    var data = $('#auditPolicy').bootstrapTable('getSelections');
    if(data.length == 0){
    	alert("至少选择一行数据！");
    }else{
    	var arrayuserid = new Array();
    	for(var i=0;i<data.length;i++){
    		arrayuserid.push(data[i].selectdate)//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
    	}
    	return arrayuserid;
    }
}
//得到查询参数
function queryParams(params) {
    return {
    	startdate: $("#startdate").val(),
    	enddate: $("#enddate").val(),
//    	platformSel: $("#platformSel").val(),
        offset:params.offset,
        limit:params.limit,
        sort: params.sort,  //排序列名
		order: params.order//排位命令（desc，asc）
    };
}
//查询列表
function reloaddata(data){
	$.ajax({
		url : "selectauditlist",
		type : 'GET',
		dataType : "json",
		data: data+"&limit="+pagesize,
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$('#auditPolicy').bootstrapTable('load', data);
		}
	});
}


function querydetailParams(params) {
    return {
    	selectdate: $("#selectdate").val(),
        offset:params.offset,
        limit:params.limit,
    };
}
//查询列表
function reloaddetaildata(data){
	$.ajax({
		url : "selectauditdetaillist",
		type : 'GET',
		dataType : "json",
		data: data+"&limit="+pagesize,
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$('#detailPolicy').bootstrapTable('load', data);
		}
	});
}

	//默认一页显示十条记录
	var pagesize = 10;
