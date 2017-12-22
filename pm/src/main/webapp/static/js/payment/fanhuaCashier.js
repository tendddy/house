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
		$("#fanhuaCashierPolicy").bootstrapTable({
	        url: "initfanhuanCashierlist",
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
      	            {field: 'platformName',title: '第三方支付名称',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'platformNo',title: '第三方支付代码',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'stutas',title: '状态',align: 'center',valign: 'middle',sortable: true}
      	            //{field: 'operation',title: '操作',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
      	        ],
      	           onLoadSuccess:function(data){
      	         }
	    });
		$("#taskapplPolicy").bootstrapTable({
	        url: "inittaskappllist",
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
      	            {field: 'platformName',title: '支付号',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'platformNo',title: '业务号',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'stutas',title: '金额',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'a',title: '支付时间',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'b',title: '到账时间',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'c',title: '状态',align: 'center',valign: 'middle',sortable: true}
      	            //{field: 'operation',title: '操作',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
      	        ],
      	           onLoadSuccess:function(data){
      	         }
	    });
		// 列表页面【查询】按钮
		$("#querybutton").on("click", function(e) {
			var postdata = "";
			if($("#month").val()){
				postdata += "&month=" + $("#month").val();
			}
			reloaddata(postdata);
		});
		//修改页面
		$("#modifybutton").click(function(){
//			var arrayuserid = getSelectedRows();
//			if(arrayuserid!="undefined"&&arrayuserid.length!=1){
//				alert("请选中一条操作数据！");
//				return false;
//			}
			window.location.href = "taskapplication?id="+arrayuserid;
		})
		// 查询条件【重置】按钮
		$("#resetbutton").on("click", function(e) {
			$("#month").val("");
		});
		//卡片列表
		$("#toggle").on("click", function(e) {
			$('#fanhuaCashierPolicy').bootstrapTable('toggleView');
		});
		//刷新
		$("#refresh").on("click", function(e) {
			$('#fanhuaCashierPolicy').bootstrapTable('refresh');
		});
		//详细页面start*****************************************************
		// 列表页面【查询】按钮
		$("#querybtn").on("click", function(e) {
			var postdata = "";
			if($("#month").val()){
				postdata += "&month=" + $("#month").val();
			}
			reloaddata(postdata);
		});
		// 查询条件【重置】按钮
		$("#resetbtn").on("click", function(e) {
			$("#month").val("");
		});
		//卡片列表
		$("#togglebtn").on("click", function(e) {
			$('#taskapplPolicy').bootstrapTable('toggleView');
		});
		//刷新
		$("#refreshbtn").on("click", function(e) {
			$('#taskapplPolicy').bootstrapTable('refresh');
		});
	});
	
});	
//详细页面start*****************************************************
//查询列表
function reloaddata(data){
	$.ajax({
		url : "inittaskappllist",
		type : 'GET',
		dataType : "json",
		data: data+"&limit="+pagesize,
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$('#taskapplPolicy').bootstrapTable('load', data);
		}
	});
}
//得到查询参数
function queryParamsByOrders(params) {
    return {
    	month: $("#month").val(),
        offset:params.offset,
        limit:params.limit,
        sort: params.sort,  //排序列名
		order: params.order//排位命令（desc，asc）
    };
}
//详细页面end*****************************************************

function getSelectedRows() {
    var data = $('#fanhuaCashierPolicy').bootstrapTable('getSelections');
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
//查询列表
function reloaddata(data){
	$.ajax({
		url : "initfanhuanCashierlist",
		type : 'GET',
		dataType : "json",
		data: data+"&limit="+pagesize,
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$('#fanhuaCashierPolicy').bootstrapTable('load', data);
		}
	});
}
//得到查询参数
function queryParams(params) {
    return {
    	month: $("#month").val(),
        offset:params.offset,
        limit:params.limit,
        sort: params.sort,  //排序列名
		order: params.order//排位命令（desc，asc）
    };
}
var pagesize = 10;