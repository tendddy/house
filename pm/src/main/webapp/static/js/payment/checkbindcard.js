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
		$("#bindcardPolicy").bootstrapTable({
	        url: "initbindcardlist",
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
      	            {field: 'platform_name',title: '应用平台名称',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'platform_user_id',title: '应用平台用户id',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'protocolid',title: '绑卡流水号',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'createdate',title: '绑卡时间',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'bank_code',title: '银行编码',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'bank_name',title: '银行名称',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'card_type',title: '卡类型',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'customcardno',title: '银行卡号',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'validdate',title: '信用卡有效期',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'cvn2',title: '信用卡安全码',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'customname',title: '用户名',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'customphone',title: '手机号',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'identification_number',title: '身份证号',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'status',title: '状态',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'createdates',title: '绑卡成功时间',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'operation',title: '查看报文',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
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
			if($("#bankName").val()){
				postdata += "&bankName=" + $("#bankName").val();
			}
			if($("#cardType").val()){
				postdata += "&cardType=" + $("#cardType").val();
			}
			if($("#customcardno").val()){
				postdata += "&customcardno=" + $("#customcardno").val();
			}
			if($("#customname").val()){
				postdata += "&customname=" + $("#customname").val();
			}
			if($("#identificationNumber").val()){
				postdata += "&identificationNumber=" + $("#identificationNumber").val();
			}
			if($("#customphone").val()){
				postdata += "&customphone=" + $("#customphone").val();
			}
			if($("#status").val()){
				postdata += "&status=" + $("#status").val();
			}
			if($("#startdate").val()){
				postdata += "&startdate=" + $("#startdate").val();
			}
			if($("#enddate").val()){
				postdata += "&enddate=" + $("#enddate").val();
			}
			reloaddata(postdata);
		});
		// 查询条件【重置】按钮
		$("#resetbutton").on("click", function(e) {
			$("#platformName").val("");
			$("#bankName").val("");
			$("#cardType").val("");
			$("#customcardno").val("");
			$("#customname").val("");
			$("#identificationNumber").val("");
			$("#customphone").val("");
			$("#status").val("");
			$("#startdate").val("");
			$("#enddate").val("");
		});
		//卡片列表
		$("#toggle").on("click", function(e) {
			$('#bindcardPolicy').bootstrapTable('toggleView');
		});
		//刷新
		$("#refresh").on("click", function(e) {
			$('#bindcardPolicy').bootstrapTable('refresh');
		});
		// 【返回】按钮
		$("#go_back").on("click",function(){
			window.location.href="list";
		});
		// 【再次访问】按钮
		$("#visit_again").on("click",function(){
			$.ajax({
				url : "visitagain",
				type : 'POST',
				dataType : "json",
				data: "paymentid="+$("#paymentid").val(),
				async : false,
				error : function() {
					alert("Connection error");
				},
				success : function(data) { 
					alert(data.message);
					if(data.status!="SPECIAL"){
						$("#unencrypted_params").html(data.unencrypted_params);
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
		url : "initbindcardlist",
		type : 'GET',
		dataType : "json",
		data: data+"&limit="+pagesize,
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$('#bindcardPolicy').bootstrapTable('load', data);
		}
	});
}
//得到查询参数
function queryParams(params) {
    return {
    	platformName: $("#platformName").val(),
    	bankName: $("#bankName").val(),
    	cardType: $("#cardType").val(),
    	customcardno: $("#customcardno").val(),
    	customname: $("#customname").val(),
    	identificationNumber: $("#identificationNumber").val(),
    	customphone: $("#customphone").val(),
    	status: $("#status").val(),
    	startdate: $("#startdate").val(),
    	enddate: $("#enddate").val(),
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
        '<a class="edit m-left-5" href="javascript:void(0);" title="查看">',
        '<i class="glyphicon glyphicon-search"></i>',
        '</a>'
    ].join('');
}
//事件响应
window.operateEvents = {
    'click .edit': function (e, value, row, index) {
    	gotodetail(row.id);
    }
};
function gotodetail(id){
	window.location.href = "bindcardDetail?paymentid="+id;
}

//设置行号
function checkId(){
	var id = $(".enclosure").length;
	for(var i=1;i<id;i++){
		$(".enclosure").eq(i).find("td").eq(0).html(i);
	}
}