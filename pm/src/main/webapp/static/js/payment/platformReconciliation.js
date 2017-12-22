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
        format: 'yyyy-mm',  
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
		$("#platformPolicy").bootstrapTable({
	        url: "initplatformlist",
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
      	            {field: 'platformName',title: '总平台名称',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'platformNo',title: '总平台代码',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'platformStutas',title: '总平台状态',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'todayforfee',title: '本日入账总金额',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'tomonthforfee',title: '本月入账总金额',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'todayoutfee',title: '本日转出总金额',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'tomonthoutfee',title: '本月转出总金额',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'totalProceduresFee',title: '总手续费金额',align: 'center',valign: 'middle',sortable: true}
      	            //{field: 'operation',title: '操作',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
      	        ],
      	           onLoadSuccess:function(data){
      	         }
	    });
		$("#ordersPolicy").bootstrapTable({
	        url: "initorderslist",
	        method: 'get',
	        queryParams:queryParamsByOrders,       
	        cache: false,
            striped: true,
            pagination: true,
            sidePagination: 'server', 
            pageSize:pagesize,
            minimumCountColumns: 2,
            clickToSelect: true,
            columns: [
                    //{field: 'state',align: 'center',valign: 'middle',checkbox: true},
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
      	            {field: 'payprotocolid',title: '支付号',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'app_orderid',title: '订单号',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'payfee',title: '金额',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'modifydate',title: '支付时间',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'arrivaltime',title: '到账时间',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'status',title: '状态',align: 'center',valign: 'middle',sortable: true}
      	            //{field: 'operation',title: '操作',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
      	        ],
      	           onLoadSuccess:function(data){
      	         }
	    });
		//总平台对账页面【查询】按钮
		$("#querybutton").on("click", function(e) {
			var postdata = "";
			if($("#querymonth").val()){
				postdata += "&querymonth=" + $("#querymonth").val();
			}
			if($("#querydate").val()){
				postdata += "&querydate=" + $("#querydate").val();
			}
			if(!$("#querymonth").val()&&!$("#querydate").val()){
				alert("【查询月份】和【查询日期】不可全为空");
				return false;
			}
			if($("#querymonth").val()&&$("#querydate").val()){
				alert("【查询月份】和【查询日期】不可全为参数");
				return false;
			}
			reloaddata(postdata);
		});
		//【详细查询】按钮
		$("#detailquerybutton").click(function(){
			var arrayuserid = getSelectedRows();
			if(arrayuserid!="undefined"&&arrayuserid.length!=1){
				alert("请选中一条操作数据！");
				return false;
			}
			window.location.href = "detailquery?id="+arrayuserid+"&querymonth="+$("#querymonth").val()+"&&querydate="+$("#querydate").val();
		})
		// 查询条件【重置】按钮
		$("#resetbutton").on("click", function(e) {
			$("#querymonth").val("");
			$("#querydate").val("");
		});
		//卡片列表
		$("#toggle").on("click", function(e) {
			$('#platformPolicy').bootstrapTable('toggleView');
		});
		//刷新
		$("#refresh").on("click", function(e) {
			$('#platformPolicy').bootstrapTable('refresh');
		});
		//详细查询页面start*****************************************************
		// 详细查询页面【查询】按钮
		$("#querybtn").on("click", function(e) {
			var postdata = "id=" + $("#platformid").val();
			if($("#startdate").val()){
				postdata += "&startdate=" + $("#startdate").val();
			}
			if($("#enddate").val()){
				postdata += "&enddate=" + $("#enddate").val();
			}
			if($("#payprotocolid").val()){
				postdata += "&payprotocolid=" + $("#payprotocolid").val();
			}
			if($("#orderid").val()){
				postdata += "&orderid=" + $("#orderid").val();
			}
			if($("#querydate").val()){
				if($("#startdate").val()==$("#querydate").val()&&$("#enddate").val()==$("#querydate").val()){
					alert("查询日期只能是："+$("#querydate").val());
					return false;
				}
			}else{
				if($("#startdate").val()>=$("#startdateup").val()&&$("#enddate").val()<=$("#enddatedown").val()){
					if($("#startdate").val()>$("#enddate").val()){
						alert("【查询日期止】要大于【查询日期起】");
						return false;
					}
				}else{
					alert("查询日期范围为："+$("#startdateup").val()+"~"+$("#enddatedown").val());
					return false;
				}
			}
			reloaddatabtn(postdata);
		});
		//详细查询页面 查询条件【重置】按钮
		$("#resetbtn").on("click", function(e) {
			$("#startdate").val("");
			$("#enddate").val("");
			$("#orderid").val("");
			$("#payprotocolid").val("");
		});
		//详细查询页面 卡片列表
		$("#togglebtn").on("click", function(e) {
			$('#ordersPolicy').bootstrapTable('toggleView');
		});
		//详细查询页面 刷新
		$("#refreshbtn").on("click", function(e) {
			$('#ordersPolicy').bootstrapTable('refresh');
		});
		//详细查询页面 【返回】按钮
		$("#go_back").on("click",function(){
			window.location.href="list";
		});
	});
	
});	
//详细查询页面start*****************************************************
//详细查询页面 查询列表
function reloaddatabtn(data){
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
//详细查询页面 得到查询参数
function queryParamsByOrders(params) {
    return {
    	id: $("#platformid").val(),
    	startdate: $("#startdate").val(),
    	enddate: $("#enddate").val(),
    	orderid: $("#orderid").val(),
    	payprotocolid: $("#payprotocolid").val(),
        offset:params.offset,
        limit:params.limit,
        sort: params.sort,  //排序列名
		order: params.order//排位命令（desc，asc）
    };
}
//详细查询页面end*****************************************************
//总平台对账页面 得到选中的行id
function getSelectedRows() {
    var data = $('#platformPolicy').bootstrapTable('getSelections');
    if(data.length == 0){
    	alert("至少选择一行数据！");
    }else{
    	var arrayuserid = new Array();
    	for(var i=0;i<data.length;i++){
    		arrayuserid.push(data[i].id)//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
    	}
    	return arrayuserid;
    }
}
//总平台对账页面 查询列表
function reloaddata(data){
	$.ajax({
		url : "initplatformlist",
		type : 'GET',
		dataType : "json",
		data: data+"&limit="+pagesize,
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$('#platformPolicy').bootstrapTable('load', data);
		}
	});
}
//总平台对账页面 得到查询参数
function queryParams(params) {
    return {
    	querymonth: $("#querymonth").val(),
    	querydate: $("#querydate").val(),
        offset:params.offset,
        limit:params.limit,
        sort: params.sort,  //排序列名
		order: params.order//排位命令（desc，asc）
    };
}
var pagesize = 10;