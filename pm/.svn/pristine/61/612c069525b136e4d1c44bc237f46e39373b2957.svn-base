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
		$("#settlementPolicy").bootstrapTable({
	        url: "initsettlementfeelist",
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
      	            {field: 'platform_no',title: '应用平台代码',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'statust',title: '结算状态',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'settlement_interval',title: '结算间隔',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'settlement_date',title: '末次结算时间',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'operation',title: '操作',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
      	        ],
      	           onLoadSuccess:function(data){
      	         }
	    });
		$("#detailPolicy").bootstrapTable({
	        url: "initSettleDetaillist",
	        method: 'get',
	        queryParams:queryParamsBysettle,       
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
      	          	{field: 'orderid',title: '订单号',align: 'center',valign: 'middle',sortable: true},
      	          	{field: 'orderfee',title: '订单金额',align: 'center',valign: 'middle',sortable: true},
      	          	{field: 'rate',title: '费率',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'settle_fee',title: '结算金额',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'settlement_interval',title: '结算周期',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'settle_date',title: '应结时间',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'settle_user',title: ' 结算人 ',align: 'center',valign: 'middle',sortable: true},
    	            {field: 'status',title: '状态',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'settlement_date',title: ' 实际结算时间 ',align: 'center',valign: 'middle',sortable: true}
      	            //{field: 'operation',title: '操作',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
      	        ],
      	           onLoadSuccess:function(data){
      	         }
	    });
		//初始化修改---start---点击修改后，把值整理一下，
		if($("#statementStatus").val()=="未结"){
			$("#settlementCard").removeAttr("readonly");
			$("#settlementTotalfee").removeAttr("readonly");
			$("#savebutton").attr("disabled",false);
		}
		if($("#statementStatus").val()=="已结"){
			$("#settlementCard").attr("readonly","readonly");
			$("#settlementTotalfee").attr("readonly","readonly");
			$("#savebutton").attr("disabled",true);
		}
		// 列表页面【查询】按钮
		$("#querybutton").on("click", function(e) {
			var postdata = "";
			if($("#platformName").val()){
				postdata += "&platformName=" + $("#platformName").val();
			}
			if($("#statementStatus").val()){
				postdata += "&statementStatus=" + $("#statementStatus").val();
			}
			reloaddata(postdata);
		});
		// 查询条件【重置】按钮
		$("#resetbutton").on("click", function(e) {
			$("#platformName").val("");
			$("#statementStatus").val("");
		});
		//卡片列表
		$("#toggle").on("click", function(e) {
			$('#settlementPolicy').bootstrapTable('toggleView');
		});
		//刷新
		$("#refresh").on("click", function(e) {
			$('#settlementPolicy').bootstrapTable('refresh');
		});
		//详细页面start*****************************************************
		// 列表页面【查询】按钮
		$("#querybtn").on("click", function(e) {
			var postdata = "";
			if($("#appid").val()){
				postdata += "&appid=" + $("#appid").val();
			}
			if($("#statementStatus").val()){
				postdata += "&statementStatus=" + $("#statementStatus").val();
			}
			if($("#settleDate").val()){
				postdata += "&settleDate=" + $("#settleDate").val();
			}
			if($("#orderid").val()){
				postdata += "&orderid=" + $("#orderid").val();
			}
			if($("#settlementInterval").val()){
				postdata += "&settlementInterval=" + $("#settlementInterval").val();
			}
			postdata=postdata.substring(1);
			reloaddatadetail(postdata);
		});
		//结算处理按钮
		$("#handlebtn").on("click", function(e) {
			if(!$("#settleMonth").val()){
				alert("结算月份不能为空！");return false;
			}
			/*              *     这里要有一些问题，如果该月份没有结算数据，则不做结算处理              */
			$.ajax({
				url : "checksettle",
				type : 'POST',
				dataType : "json",
				data: "appid="+$("#appid").val()+"&settleMonth="+$("#settleMonth").val(),
				async : false,
				error : function() {
					alert("Connection error");
				},
				success : function(data) { 
					if(data.status=="success"){
						window.location.href = "treatmentDetail?appid="+$("#appid").val()+"&settleMonth="+$("#settleMonth").val();
					}else{
						alert("该月份内没有要结算订单！");
					}
				}
			});
		});
		// 查询条件【重置】按钮
		$("#resetbtn").on("click", function(e) {
			$("#statementStatus").val("");
			$("#settleDate").val("");
			$("#orderid").val("");
			$("#settlementInterval").val("");
		});
		//卡片列表
		$("#togglebtn").on("click", function(e) {
			$('#detailPolicy').bootstrapTable('toggleView');
		});
		//刷新
		$("#refreshbtn").on("click", function(e) {
			$('#detailPolicy').bootstrapTable('refresh');
		});
		//结算轨迹页面 【返回】按钮
		$("#go_back").on("click",function(){
			window.location.href="list";
		});
		//结算处理情况页面 【返回】按钮
		$("#go_back_detail").on("click",function(){
			window.location.href = "settlementDetail?appid="+$("#appid").val();
		});
		//上传附件
		$("#uploadbutton").on("click", function(e) {
			if(!$("#uploadfile").val()){
				alert("上传附件不能为空！");return false;
			}
			var data = "id="+$("#id").val()+"&appId="+$("#appid").val()+"&settleDate="+$("#settleMonth").val()+
						"&status="+$("#statementStatus").val()	+"&settleTotalfee="+$("#settleTotalfee").val();
			var uploadUrl =   "saveCaseAndAttach?"+data ;
			$.ajaxFileUpload({
				url:uploadUrl,
				type : 'POST',
				secureuri:false,                       //是否启用安全提交,默认为false
		        fileElementId:"uploadfile",           //文件选择框的id属性
		        dataType:'text',               //服务器返回的格式,可以是json或xml等
		        //但是ajaxFileUpload返回值类型dataType必须是text。返回的是带<pre>{"id","22"}</pre>.解决方法：data = jQuery.parseJSON(jQuery(data).text());转换一下。
				success : function(data) {
					data = jQuery.parseJSON(jQuery(data).text());
					if(data.status=="success"){
						$("#id").val(data.cid);
						var div="<tr style='border-left: 1px solid #dddddd;' class='enclosure'>"
							+ "<input type='hidden' class='id' value='"+data.aid+"'>"
							+ "<td style='text-align: center; vertical-align: middle;'>"+data.counts+"</td>"
							+ "<td style='text-align: center; vertical-align: middle;'>"+data.attach_name+"</td>"
							+ "<td style='text-align: center; vertical-align: middle;'>"+data.attach_user+"</td>"
							+ "<td style='text-align: center; vertical-align: middle;'>"
								+ "<a class='edit m-left-5' href='javascript:void(0);' title='删除'>"
								+ "<i class='glyphicon glyphicon-remove'></i></a>"
							+ "</td>"
						+ "</tr>";
						$(".enclosure:last").after(div);
					}else{
						alert("上传失败，请重新上传！");
					}
				},
				error : function(data) {
					alert("上传失败，请重新上传！");
				}
			});
		});
		//删除上传附件行模块
		$(document).on('click', '.glyphicon-remove', function() {
			var index = $(this).parent().parent().parent().index();
			if(window.confirm('确定删除吗？')){
				var postdata = "id="+$(".enclosure").eq(index).find("input").val();
				$.ajax({
					url : "deleteattach",
					type : 'POST',
					dataType : "json",
					data: postdata,
					async : false,
					error : function() {
						alert("Connection error");
					},
					success : function(data) { 
						$(".enclosure").eq(index).remove();
						checkId();
					}
				});
			}
		});
		//结算处理情况页面 【保存】按钮
		$("#savebutton").on("click",function(){
			var settlementTotalfee = parseInt($("#settlementTotalfee").val());
			var settleTotalfee = parseInt($("#settleTotalfee").val())
			if(settlementTotalfee!=settleTotalfee){
				alert("【应结算金额】和【结算金额】不等！");return false;
			}
			var postdata = "id=" + $("#id").val() + "&appId=" + $("#appid").val() + "&settleDate=" + $("#settleMonth").val() 
					+ "&status=" + $("#statementStatus").val() + "&settleTotalfee=" + $("#settleTotalfee").val()
					+ "&settlementCard=" + $("#settlementCard").val() + "&settlementTotalfee=" + $("#settlementTotalfee").val();
			$.ajax({
				url : "savesettlecase",
				type : 'POST',
				dataType : "json",
				data: postdata,
				async : false,
				error : function() {
					alert("Connection error");
				},
				success : function(data) { 
					if(data.status=="success"){
						alert(data.message);
						$("#id").val(data.cid);
						$("#settlementCard").attr("readonly","readonly");
						$("#settlementTotalfee").attr("readonly","readonly");
						$("#savebutton").attr("disabled",true);
						
					}
				}
			});
		});
	});
	
});	
//情况页面start*****************************************************
//情况细页面end*****************************************************
//详细页面start*****************************************************
//查询列表
function reloaddatadetail(data){
	$.ajax({
		url : "initSettleDetaillist",
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
//得到查询参数
function queryParamsBysettle(params) {
    return {
    	appid: $("#appid").val(),
    	statementStatus: $("#statementStatus").val(),
    	settleDate: $("#settleDate").val(),
    	orderid: $("#orderid").val(),
    	settlementInterval: $("#settlementInterval").val(),
        offset:params.offset,
        limit:params.limit,
        sort: params.sort,  //排序列名
		order: params.order//排位命令（desc，asc）
    };
}
//详细页面end*****************************************************
//查询列表
function reloaddata(data){
	$.ajax({
		url : "initsettlementfeelist",
		type : 'GET',
		dataType : "json",
		data: data+"&limit="+pagesize,
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$('#settlementPolicy').bootstrapTable('load', data);
		}
	});
}
//得到查询参数
function queryParams(params) {
    return {
    	platformName: $("#platformName").val(),
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
        '<a class="edit m-left-5" href="javascript:void(0);" title="编辑">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</a>'
    ].join('');
}
//事件响应
window.operateEvents = {
    'click .edit': function (e, value, row, index) {
    	gotoSettleCase(row.id);
    }
};
function gotoSettleCase(id){
	window.location.href = "settlementDetail?appid="+id;
}

//设置行号
function checkId(){
	var id = $(".enclosure").length;
	for(var i=1;i<id;i++){
		$(".enclosure").eq(i).find("td").eq(0).html(i);
	}
}