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
		//列表查看
		$("#settlepay1341Policy").bootstrapTable({
	        url: "initsettleproductlist",
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
	  	            {field: 'app_orderid',title: '应用平台订单号',align: 'center',valign: 'middle',sortable: true},
	  	            {field: 'orderid',title: '系统订单号',align: 'center',valign: 'middle',sortable: true},
	  	            {field: 'app_ordername',title: '应用平台订单名称',align: 'center',valign: 'middle',sortable: true},
	  	            {field: 'statement_protocolid',title: '结算流水号',align: 'center',valign: 'middle',sortable: true},
	  	            {field: 'orderfee',title: '实际支付金额',align: 'center',valign: 'middle',sortable: true},
	  	            {field: 'account_type',title: '账户类型',align: 'center',valign: 'middle',sortable: true},
	  	            {field: 'bankID',title: '银行编号',align: 'center',valign: 'middle',sortable: true},
	  	            {field: 'account_name',title: '账户名称',align: 'center',valign: 'middle',sortable: true},
	  	            {field: 'account_number',title: '账户号码',align: 'center',valign: 'middle',sortable: true},
	  	            {field: 'branch_name',title: '分支行名称',align: 'center',valign: 'middle',sortable: true},
	  	            {field: 'province',title: '分支行省份',align: 'center',valign: 'middle',sortable: true},
	  	            {field: 'city',title: '分支行城市',align: 'center',valign: 'middle',sortable: true},
	  	            {field: 'status',title: '产品状态',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'operation',title: '手工操作',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
      	        ],
      	           onLoadSuccess:function(data){
      	         }
	    });
	
		// 列表页面【查询】按钮
		$("#querybutton").on("click", function(e) {
			var postdata = "paymentid="+ $("#paymentid").val();;
			if($("#appOrderId").val()){
				postdata += "&appOrderId=" + $("#appOrderId").val();
			}
			if($("#orderid").val()){
				postdata += "&orderid=" + $("#orderid").val();
			}
			if($("#appOrderName").val()){
				postdata += "&appOrderName=" + $("#appOrderName").val();
			}
			if($("#statementProtocolid").val()){
				postdata += "&statementProtocolid=" + $("#statementProtocolid").val();
			}
			if($("#accountType").val()){
				postdata += "&accountType=" + $("#accountType").val();
			}
			if($("#accountNumber").val()){
				postdata += "&accountNumber=" + $("#accountNumber").val();
			}
			if($("#status").val()){
				postdata += "&status=" + $("#status").val();
			}
			if($("#statementStatus").val()){
				postdata += "&statementStatus=" + $("#statementStatus").val();
			}
			reloaddata(postdata);
		});
		// 查询条件【重置】按钮
		$("#resetbutton").on("click", function(e) {
			$("#appOrderId").val("");
			$("#orderid").val("");
			$("#appOrderName").val("");
			$("#statementProtocolid").val("");
			$("#accountType").val("");
			$("#accountNumber").val("");
			$("#status").val("");
			$("#statementStatus").val("");
		});
		//卡片列表
		$("#toggle").on("click", function(e) {
			$('#settlepay1341Policy').bootstrapTable('toggleView');
		});
		//刷新
		$("#refresh").on("click", function(e) {
			$('#settlepay1341Policy').bootstrapTable('refresh');
		});
		// 【返回】按钮
		$("#go_back0").on("click",function(){
			window.location.href = "list";
		});
		// 【返回】按钮
		$("#go_back1").on("click",function(){
			window.location.href = "settlepay1341?paymentid="+$("#paymentid").val();
		});
		// 【再次访问】按钮
		$("#visit_again").on("click",function(){
			$.ajax({
				url : "visitagain1341",
				type : 'POST',
				dataType : "json",
				data: "paymentid="+$("#paymentid").val()+"&productId="+$("#productId").val()+"&logid="+$("#logid").val(),
				async : false,
				error : function() {
					alert("Connection error");
				},
				success : function(data) { 
					alert(data.message);
					if(data.status!="SPECIAL"){
						$("#request_params").html(data.request_params);
						$("#response_params").html(data.response_params);
						$("#remark").html(data.remark);
					}
				}
			});
		});
	});
	
});	
//查询列表
function reloaddata(data){
	$.ajax({
		url : "initsettleproductlist",
		type : 'GET',
		dataType : "json",
		data: data+"&limit="+pagesize,
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$('#settlepay1341Policy').bootstrapTable('load', data);
		}
	});
}
//得到查询参数
function queryParams(params) {
    return {
    	paymentid: $("#paymentid").val(),
    	appOrderId: $("#appOrderId").val(),
    	orderid: $("#orderid").val(),
    	appOrderName: $("#appOrderName").val(),
    	statementProtocolid: $("#statementProtocolid").val(),
    	accountType: $("#accountType").val(),
    	accountNumber: $("#accountNumber").val(),
    	status: $("#status").val(),
    	statementStatus: $("#statementStatus").val(),
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
        '<a class="edit m-left-5" id="checkproductsucc" href="javascript:void(0);" title="返回">',
        '<i class="glyphicon">查看报文</i>',
        '</a>'
    ].join('');
}
//事件响应
window.operateEvents = {
    'click #checkproductsucc': function (e, value, row, index) {
    	checkProductPayInfo(row.id);
    }
};
function checkProductPayInfo(id){
	window.location.href = "settlepay1341Detail?paymentid="+$("#paymentid").val()+"&productId="+id;
}

//设置行号
function checkId(){
	var id = $(".enclosure").length;
	for(var i=1;i<id;i++){
		$(".enclosure").eq(i).find("td").eq(0).html(i);
	}
}