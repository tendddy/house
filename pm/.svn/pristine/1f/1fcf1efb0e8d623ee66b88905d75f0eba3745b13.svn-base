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
		$("#Configure").bootstrapTable({
	        url: "initPlatformList",
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
      	            {field: 'platformNo',title: '应用平台代码',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'platformName',title: '应用平台名称',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'status',title: '状态',align: 'center',valign: 'middle',sortable: true},
      	            {field: 'operation',title: '操作',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
      	        ],
      	           onLoadSuccess:function(data){
      	         }
	    });
		
	});
	
	//点击修改后，把值整理一下，
	if($("#platformid").val()!=""&&$("#platformid").val()!=undefined){
		$("#cancelform").show();
		$("#modifyform").show();
		$("#saveform").attr("disabled",true);
		$("#cancelform").attr("disabled",true);
		$("#modifyform").attr("disabled",false);
		$("#platformName").attr("readonly","readonly");
		$("#settlementBank").attr("readonly","readonly");
		$("#settlementCard").attr("readonly","readonly");
		$("#minimumAmount").attr("readonly","readonly");
		$("#maximumAmount").attr("readonly","readonly");
		$("#app_id").attr("disabled",true);
		$("#domain").attr("readonly","readonly");
		$("#status").attr("disabled",true);
		$("#settlementType").attr("disabled",true);
		$("#settlementInterval").attr("disabled",true);
		$(".settlementParty").attr("disabled",true);
	}else{//新增操作，取消和修改按钮不可见
		$("#cancelform").hide();
		$("#modifyform").hide();
	}
	//初始化状态选择
	 if($("#statuss").val()!=""&&$("#statuss").val()!=undefined){
		$("#status").val($("#statuss").val());
	 }
	//初始化结算类型选择
	 if($("#settlementTypes").val()!=""&&$("#settlementTypes").val()!=undefined){
			$("#settlementType").val($("#settlementTypes").val());
	 }
	//初始化结算周期选择
	 if($("#settlementIntervals").val()!=""&&$("#settlementIntervals").val()!=undefined){
			//$("#settlementInterval").val($("#settlementIntervals").val());
		 if($("#settlementTypes").val()=="1"){
			 $("#settlementInterval").html("<option value=\"0\">实时</option>	");
		 }
		 if($("#settlementTypes").val()=="2"){
			 $("#settlementInterval").html("<option value=\"1\">每月</option>");
		 }
	 }
	//初始化手续费付费方选择
	 if($("#settlementPartys").val()!=""&&$("#settlementPartys").val()!=undefined){
		 if($("#settlementPartys").val()=="01"){
			 $(".settlementParty").eq(0).attr("checked",true);//checked属性是用于首次加载时可用的，选择后就不可以用了
		 }else if($("#settlementPartys").val()=="02"){
			 $(".settlementParty").eq(1).attr("checked",true);
		 }else if($("#settlementPartys").val()=="03"){
			 $(".settlementParty").eq(2).attr("checked",true);
		 }
	 }
	
	//转到新增页面
	$("#addbutton").click(function(){
		window.location.href = "platform";
	})
	// 【返回】按钮
	$("#go_back").on("click",function(){
		window.location.href="configure";
	});
	// 【保存】按钮
	$("#saveform").on("click", function(e) {
		if($("#configform").valid()){
			saveplatform();
			$("#cancelform").click();
		}
	});
	//查看页面点击修改
	$("#modifyform").click(function(){
		$("#saveform").attr("disabled",false);
		$("#cancelform").attr("disabled",false);
		$("#modifyform").attr("disabled",true);
		$("#platformName").removeAttr("readonly");
		$("#settlementBank").removeAttr("readonly");
		$("#settlementCard").removeAttr("readonly");
		$("#minimumAmount").removeAttr("readonly");
		$("#maximumAmount").removeAttr("readonly");
		$("#app_id").attr("disabled",false);
		$("#domain").removeAttr("readonly");
		$("#status").attr("disabled",false);
		$("#settlementType").attr("disabled",false);
		$("#settlementInterval").attr("disabled",false);
		$(".settlementParty").attr("disabled",false);
	});
	$(document).on('blur', '.maximumAmounts', function() {
		if($(".minimumAmounts").val()){
			var min = parseInt($(".minimumAmounts").val().replace(/,/g, ''));
			var max = parseInt($(".maximumAmounts").val().replace(/,/g, ''));
			if(max<min){
				alert("【最高收费】不可小于【最低收费】");
				$(".minimumAmount").val("")
				$(".minimumAmount").focus();
			}
		}
	});
	
	//查看页面点击取消//放弃保存操作，修改信息初始化，应用平台信息恢复到不可编辑状态
	$("#cancelform").click(function(){
		$("#cancelform").show();
		$("#modifyform").show();
		$("#saveform").attr("disabled",true);
		$("#cancelform").attr("disabled",true);
		$("#modifyform").attr("disabled",false);
		var postdata = "id="+$("#platformid").val();
		var radios="";
		$.ajax({
			url : "selectPlatform",
			type : 'POST',
			dataType : "json",
			data: postdata,
			async : false,
			error : function() {
				alert("Connection error");
			},
			success : function(data) { 
				$("#platformName").val(data.platformName);
				$("#settlementBank").val(data.settlementBank);
				$("#settlementCard").val(data.settlementCard);
				$("#minimumAmount").val(data.minimumAmount);
				$("#maximumAmount").val(data.maximumAmount);
				$("#domain").val(data.domain);
				$("#status").val(data.status);
				$("#settlementType").val(data.settlementType);
				$("#settlementInterval").val(data.settlementInterval);
				radios=parseInt(data.settlementParty);
				$(".settlementParty").each(function(index){
					$(this).removeAttr("checked");
					if(index+1 == radios) {
						$(this).click();
					}
				});
				$("#platformName").attr("readonly","readonly");
				$("#settlementBank").attr("readonly","readonly");
				$("#settlementCard").attr("readonly","readonly");
				$("#minimumAmount").attr("readonly","readonly");
				$("#maximumAmount").attr("readonly","readonly");
				$("#app_id").attr("disabled",true);
				$("#domain").attr("readonly","readonly");
				$("#status").attr("disabled",true);
				$("#settlementType").attr("disabled",true);
				$("#settlementInterval").attr("disabled",true);
				$(".settlementParty").attr("disabled",true);
			}
		});
	
	});
	$("#settlementType").change(function(){
		var id = $(".feilv").length;
		if($(this).val()=="1"){
			$("#settlementInterval").html("<option value=\"\"></option><option value=\"0\">实时</option>	");
			/*for(var i=1;i<id;i++){
				$(".feilv").eq(i).find("td").eq(2).find("select").html("<option value=\"\"></option><option value=\"0\">百分比</option><option value=\"1\">固定金额</option>");
				$(".feilv").eq(i).find("td").eq(4).find(".cancelrate").click();
			}*/
		}else if($(this).val()=="2"){
			$("#settlementInterval").html("<option value=\"\"></option><option value=\"1\">每月</option>");
			/*for(var i=1;i<id;i++){
				$(".feilv").eq(i).find("td").eq(2).find("select").html("<option value=\"\"></option><option value=\"0\">百分比</option><option value=\"1\">固定金额</option>");
				$(".feilv").eq(i).find("td").eq(4).find(".cancelrate").click();
			}*/
		}else if($(this).val()=="3"){
			$("#settlementInterval").html("<option value=\"\"></option><option value=\"0\">实时</option>	<option value=\"1\">每月</option>");
			/*for(var i=1;i<id;i++){
				$(".feilv").eq(i).find("td").eq(4).find(".modifyrate").click();
				$(".feilv").eq(i).find("td").eq(2).find("select").html("<option checked value=\"1\">固定金额</option>");
			}*/
			alert("应用平台费率【计算方式】应该为“固定金额”");
		}
	});
	
	//费率模块添加行操作--新增的行是可编辑状态
	$("#addratediv").on("click", function(e) {
		var bai="<option value=\"0\">百分比</option>";
		if($("#settlementType").val()=="3"){
			bai="";
		}
		$(".feilv:last").after("<tr class=\"feilv\"><td style=\"text-align:center;vertical-align:middle;\"><i " +
				"class=\"deleteratediv glyphicon glyphicon-minus\" ></i></td><td style=\"text-align:center;vertical-align:middle;\">" +
				"<input type=\"text\" class=\"form-control col-md-2\"style=\"width:80px;\"id=\"minimumAmount\" " +
				"onkeyup=\"constraintMoneyLength(12,0);\" onblur=\"constraintMoneyLength(12,0);\">" +
				"<label class=\"col-md-2 control-label\"style=\"height:30px;line-height:30px;padding-left:9px;\">TO</label>" +
				"<input type=\"text\" class=\"form-control col-md-2\"style=\"width:80px;\"id=\"maximumAmount\" " +
				"onkeyup=\"constraintMoneyLength(12,0);\" onblur=\"constraintMoneyLength(12,0);\"" +
				" ></td><td><select  name=\"rateType\"class=\"form-control\"id=\"rateType\" value=\"\">" +
				"<option value=\"\"></option>"+bai+"<option value=\"1\">固定金额</option></select><input " +
				"type=\"hidden\"id=\"rateTypes\"value=\"\"></td><td><input type=\"text\" class=\"form-control\"id=\"rate\"name=\"rate\"" +
				"value=\"\" ></td><td><button type=\"button\"class=\"saverate btn btn-primary\">保存</button>" +
				" <button type=\"button\" class=\"cancelrate btn btn-primary\">取消</button> " +
				"<button type=\"button\" disabled class=\"modifyrate btn btn-primary\">修改</button></td><input " +
				"type=\"hidden\"id=\"id\"value=\"\"></tr>");
	});
	$(document).on('blur', '#maximumAmount', function() {
		 var index=$(this).parent().parent().index();
		 var $td = $(".feilv").eq(index).find("td");
		 var min = parseInt($td.eq(1).find("input:first").val().replace(/,/g, ''));
		 var max = parseInt($td.eq(1).find("input:last").val().replace(/,/g, ''));
		 if(max<min){
			 alert("第"+index+"行，【金额上限】不可小于【金额下限】");
			 $td.eq(1).find("input:last").val("")
			 $td.eq(1).find("input:last").focus();
		 }
	});

	//费率模块删除行操作
	$(document).on('click', '.deleteratediv', function() {
		 var index=$(this).parent().parent().index();
		 var $td = $(".feilv").eq(index).find("td");
		 var id = $(".feilv").eq(index).find("input:last").val();
		 if(id==null||id==""){//如果没有保存过，就直接删除块
			 $(this).parent().parent().remove();
		 }else{//如果保存过，删除数据后再删除模块
			 if(window.confirm('确定删除吗？')){
				 var postdata = "id="+id;
				 deleteRateAJAX(postdata,index);
			 }
		 }
	});
	//费率模块保存行操作
	$(document).on('click', '.saverate', function() {	
		var index=$(this).parent().parent().index();
		checkRate(index);
	});
	//费率模块取消行操作
	$(document).on('click', '.modifyrate', function() {	 
		var index=$(this).parent().parent().index();
		var $td = $(".feilv").eq(index).find("td");
		$td.eq(1).find("input:first").removeAttr("readonly");
		$td.eq(1).find("input:last").removeAttr("readonly");
		$td.eq(2).find("select").attr("disabled",false);
		$td.eq(3).find("input:last").removeAttr("readonly");
		$td.eq(4).find(".modifyrate").attr("disabled",true);
		$td.eq(4).find(".saverate").attr("disabled",false);
		$td.eq(4).find(".cancelrate").attr("disabled",false);
	});
	$(document).on('click', '.cancelrate', function() {	
		var index=$(this).parent().parent().index();
		 var $td = $(".feilv").eq(index).find("td");
		 var id = $(".feilv").eq(index).find("input:last").val();
		 if(id==null||id==""){//如果没有保存过，就置为空
			var index=$(this).parent().parent().index();
			var $td = $(".feilv").eq(index).find("td");
			$td.eq(1).find("input:first").val("");
			$td.eq(1).find("input:last").val("");
			$td.eq(2).find("select").val("");
			$td.eq(3).find("input:last").val("");
			$td.eq(1).find("input:first").removeAttr("readonly");
			$td.eq(1).find("input:last").removeAttr("readonly");
			$td.eq(2).find("select").attr("disabled",false);
			$td.eq(3).find("input:last").removeAttr("readonly");
			$td.eq(4).find(".modifyrate").attr("disabled",true);
			$td.eq(4).find(".cancelrate").attr("disabled",false);
			$td.eq(4).find(".saverate").attr("disabled",false);
		 }else{
				 var postdata = "id="+id;
				 selectRateAJAX(postdata,index);
		 }
	});
	
	//银行模块状态
	$("#bankdiv").on(function(e) {
		$(".yinhang:last").after("<tr style=\"border-left: 1px solid #dddddd;\" class=\"yinhang\"><td style=\"text-align:center;vertical-align:middle;\">" +
				"<label  class=\"col-md-2 control-label\" style=\"height:30px;line-height:30px;padding-left: 9px;\">"+$(".yinhang").length+"</label> </td>" +
				"<td style=\"text-align:center;vertical-align:middle;\"><input type=\"text\" class=\"form-control\" id=\"platform_name\" ></td>" +
				"<td style=\"text-align:center;vertical-align:middle;\"><input type=\"text\" class=\"form-control\" id=\"channel_name\" ></td>" +
				"<td style=\"text-align:center;vertical-align:middle;\"><input type=\"text\" class=\"form-control\" id=\"channel_code\" ></td>" +
				"<td style=\"text-align:center;vertical-align:middle;\">" +
				"<div class=\"checkbox\" style=\"padding-bottom:10px;\"><input type=\"checkbox\" style=\"position:static;\" id=\"card_type00\" value=\"0\" >支持储蓄卡<input " +
				"type=\"hidden\" id=\"lmitid0\" ></div>" +
				"<div class=\"checkbox\" style=\"padding-bottom:10px;\"><input type=\"checkbox\" style=\"position:static;\" id=\"card_type11\" value=\"1\">支持信用卡<input " +
				"type=\"hidden\" id=\"lmitid1\" ></div></td>" +
				"<td style=\"text-align:center;vertical-align:middle;\">" +
				"<input type=\"text\" class=\"form-control\" id=\"max_quota_per_time0\" readonly onkeyup=\"constraintMoneyLength(12,2);\" onblur=\"constraintMoneyLength(12,2);\">&nbsp;" +
				"<input type=\"text\" class=\"form-control\" id=\"max_quota_per_time1\" readonly onkeyup=\"constraintMoneyLength(12,2);\" onblur=\"constraintMoneyLength(12,2);\"></td>" +
				"<td style=\"text-align:center;vertical-align:middle;\">" +
				"<input type=\"text\" class=\"form-control\" id=\"max_quota_per_day0\" readonly onkeyup=\"constraintMoneyLength(12,2);\" onblur=\"constraintMoneyLength(12,2);\">&nbsp;" +
				"<input type=\"text\" class=\"form-control\" id=\"max_quota_per_day1\" readonly onkeyup=\"constraintMoneyLength(12,2);\" onblur=\"constraintMoneyLength(12,2);\"></td>" +
				"<td style=\"text-align:center;vertical-align:middle;\"><select class=\"col-md-1 form-control col-md-2\" disabled id=\"settlementInterval0\">" +
				"<option value=\"\"></option><option value=\"01\">即时</option><option value=\"02\">T+1</option></select>&nbsp;" +
				"<select class=\"col-md-1 form-control col-md-2\" disabled id=\"settlementInterval1\"><option value=\"\"></option><option value=\"01\">即时</option>" +
				"<option value=\"02\">T+1</option></select></td><td style=\"text-align:center;vertical-align:middle;\">" +
				"<select class=\"form-control m-left-1 col-md-2\" disabled id=\"status0\" ><option value=\"\"></option><option value=\"0\">启用</option>" +
				"<option value=\"1\">禁用</option></select>&nbsp;<select class=\"form-control m-left-1 col-md-2\" disabled id=\"status1\" >" +
				"<option value=\"\"></option><option value=\"0\">启用</option><option value=\"1\">禁用</option></select></td>" +
				"<td style=\"text-align:center;vertical-align:middle;\">" +
				"<select class=\"form-control m-left-1 col-md-2\" disabled id=\"status2\" ><option value=\"\"></option><option value=\"0\">启用</option>" +
				"<option value=\"1\">禁用</option></select>&nbsp;<select class=\"form-control m-left-1 col-md-2\" disabled id=\"status3\" >" +
				"<option value=\"\"></option><option value=\"0\">启用</option><option value=\"1\">禁用</option></select></td>" +
				"<td style=\"text-align:center;vertical-align:middle;\">" +
				"<button  type=\"button\"  id=\"savebank\" class=\"btn btn-primary\">保存</button> " +
				"<button  type=\"button\"  id=\"cancelbank\" class=\"btn btn-primary\">取消</button> " +
				"<button  type=\"button\"  id=\"modifybank\" disabled class=\"btn btn-primary\">修改</button></td><input " +
				"type=\"hidden\"id=\"id\"value=\"\"></tr>");
	});
	
	//银行信息模块修改操作，该银行信息进入可编辑状态
	$(document).on('click', '#modifybank', function() {	
		var index=$(this).parent().parent().index();
		var $td = $(".yinhang").eq(index).find("td");
		$td.eq(10).find("#modifybank").attr("disabled",true);
		$td.eq(10).find("#savebank").attr("disabled",false);
		$td.eq(10).find("#cancelbank").attr("disabled",false);
		 if($td.eq(4).find("input").eq(0).is(':checked')){
			 $td.eq(5).find("input:first").removeAttr("readonly");
			 $td.eq(6).find("input:first").removeAttr("readonly");
			 $td.eq(7).find("select:first").attr("disabled",false);
			 $td.eq(9).find("select:first").attr("disabled",false);
		 }
		 if($td.eq(4).find("input").eq(2).is(':checked')){
			 $td.eq(5).find("input:last").removeAttr("readonly");
			 $td.eq(6).find("input:last").removeAttr("readonly");
			 $td.eq(7).find("select:last").attr("disabled",false);
			 $td.eq(9).find("select:last").attr("disabled",false);
		 }
		 
	}); 
	
	//银行信息模块保存操作
	$(document).on('click', '#savebank', function() {
		var index=$(this).parent().parent().index();
		checkBank(index)
	});
	
	//银行信息模块查询操作
	$(document).on('click', '#selectbutton', function() {
		var postdata = "appId="+$("#platformid").val()+"&&platform_name="+$("#platform_name").val()+"&&channel_name="+$("#channel_name").val()+"&&card_type="+$("#card_type").val();
		$.ajax({
			url : "selectyinhang",
			type : 'POST',
			dataType : "json",
			data: postdata,
			async : false,
			error : function() {
				alert("Connection error");
			},
			success : function(data) { 
				var length=$(".yinhang").length
				for(var i=1;i<length;i++){
					$(".yinhang").eq(1).remove();
				}
				$(".yinhang:last").after(data.bankdiv);
			}
		});
	});
	
	//银行信息模块-取消操作
	$(document).on('click', '#cancelbank', function() {	
		var index=$(this).parent().parent().index();
		 var $td = $(".yinhang").eq(index).find("td");
		 var id = $(".yinhang").eq(index).find("input:last").val();
		 if(id==null||id==""){//如果没有保存，就置为空
			var index=$(this).parent().parent().index();
			var $td = $(".yinhang").eq(index).find("td");
			 
			 $td.eq(4).find("input").attr("checked",false);
			 $td.eq(5).find("input:first").attr("readonly","readonly");
			 $td.eq(6).find("input:first").attr("readonly","readonly");
			 $td.eq(7).find("select:first").attr("disabled",true);
			 $td.eq(8).find("select:first").attr("disabled",true);
			 $td.eq(9).find("select:first").attr("disabled",true);
			 $td.eq(5).find("input:first").val("");
			 $td.eq(6).find("input:first").val("");
			 $td.eq(7).find("select:first").val("");
			 $td.eq(8).find("select:first").val("");
			 $td.eq(9).find("select:first").val("");
			 $td.eq(5).find("input:last").attr("readonly","readonly");
			 $td.eq(6).find("input:last").attr("readonly","readonly");
			 $td.eq(7).find("select:last").attr("disabled",true);
			 $td.eq(8).find("select:last").attr("disabled",true);
			 $td.eq(9).find("select:last").attr("disabled",true);
			 $td.eq(5).find("input:last").val("");
			 $td.eq(6).find("input:last").val("");
			 $td.eq(7).find("select:last").val("");
			 $td.eq(8).find("select:last").val("");
			 $td.eq(9).find("select:last").val("");
		 }else{//如果保存了，放弃保存操作，初始化数据。
				 var postdata = "id="+id;
				 selectBankAJAX(postdata,index);
		 }
	});
	
	//点击“支持储蓄卡”，
	$(document).on('click', '#card_type00', function() {
		 var index=$(this).parent().parent().parent().index();
		 var $td = $(".yinhang").eq(index).find("td");
		 if($(this).is(':checked')){//被选中状态则保以编辑
			 $td.eq(5).find("input:first").removeAttr("readonly");
			 $td.eq(6).find("input:first").removeAttr("readonly");
			 $td.eq(7).find("select:first").attr("disabled",false);
			 $td.eq(9).find("select:first").attr("disabled",false);
		 }else{//未被选中状态则不可编辑
			 $td.eq(5).find("input:first").attr("readonly","readonly");
			 $td.eq(6).find("input:first").attr("readonly","readonly");
			 $td.eq(7).find("select:first").attr("disabled",true);
			 $td.eq(9).find("select:first").attr("disabled",true);
			 if($td.eq(4).find("input").eq(1).val()==null||$td.eq(3).find("input").eq(1).val()==""){//如果未保存卡类型，就置为空
				 $td.eq(5).find("input:first").val("");
				 $td.eq(6).find("input:first").val("");
				 $td.eq(7).find("select:first").val("");
				 $td.eq(9).find("select:first").val("");
			 }else{//如果已保存卡类型，就初始化数据
				 var postdata = "id="+ $td.eq(3).find("input").eq(1).val();
				//查询出来信息
				 $.ajax({
						url : "selectlmit",
						type : 'POST',
						dataType : "json",
						data: postdata,
						async : false,
						error : function() {
							alert("Connection error");
						},
						success : function(data) { 
							$td.eq(5).find("input:first").val(data.max_quota_per_time);
							$td.eq(6).find("input:first").val(data.max_quota_per_day);
							$td.eq(7).find("select:first").val(data.settlement_interval);
							$td.eq(9).find("select:first").val(data.status);
						}
					});
			 }
		 }
	});
	//点击“支持信用卡”，
	$(document).on('click', '#card_type11', function() {
		 var index=$(this).parent().parent().parent().index();
		 var $td = $(".yinhang").eq(index).find("td");
		 if($(this).is(':checked')){//被选中状态则保以编辑
			 $td.eq(5).find("input:last").removeAttr("readonly");
			 $td.eq(6).find("input:last").removeAttr("readonly");
			 $td.eq(7).find("select:last").attr("disabled",false);
			 $td.eq(9).find("select:last").attr("disabled",false);
		 }else{//未被选中状态则不可编辑
			 $td.eq(5).find("input:last").attr("readonly","readonly");
			 $td.eq(6).find("input:last").attr("readonly","readonly");
			 $td.eq(7).find("select:last").attr("disabled",true);
			 $td.eq(9).find("select:last").attr("disabled",true);
			 if($td.eq(4).find("input").eq(3).val()==null||$td.eq(4).find("input").eq(3).val()==""){//如果未保存卡类型，就置为空
				 $td.eq(5).find("input:last").val("");
				 $td.eq(6).find("input:last").val("");
				 $td.eq(7).find("select:last").val("");
				 $td.eq(9).find("select:last").val("");
			 }else{//如果已保存卡类型，就初始化数据
				 var postdata = "id="+ $td.eq(4).find("input").eq(3).val();
					//查询出来信息
					 $.ajax({
							url : "selectlmit",
							type : 'POST',
							dataType : "json",
							data: postdata,
							async : false,
							error : function() {
								alert("Connection error");
							},
							success : function(data) { 
								$td.eq(5).find("input:last").val(data.max_quota_per_time);
								$td.eq(6).find("input:last").val(data.max_quota_per_day);
								$td.eq(7).find("select:last").val(data.settlement_interval);
								$td.eq(9).find("select:last").val(data.status);
							}
						});
			 }
			 
		 }
	});
	
	//查询银行信息ajax操作且该行初始化
	function selectBankAJAX(data,index){
		$.ajax({
			url : "selectbank",
			type : 'POST',
			dataType : "json",
			data: data,
			async : false,
			error : function() {
				alert("Connection error");
			},
			success : function(data) { 
				var $td = $(".yinhang").eq(index).find("td");
				$td.eq(10).find("#modifybank").attr("disabled",false);
				$td.eq(10).find("#savebank").attr("disabled",true);
				$td.eq(10).find("#cancelbank").attr("disabled",true);
				 if(data.card_type0!=""&&data.card_type0!=null){
					 $td.eq(4).find("input").eq(0).attr("checked",true);
				 }
				 if(data.card_type1!=""&&data.card_type1!=null){
					 $td.eq(4).find("input").eq(2).attr("checked",true);
				 }
				 $td.eq(4).find("input").eq(1).val(data.lmitid0);
				 $td.eq(4).find("input").eq(3).val(data.lmitid1);
				 $td.eq(4).find("input").attr("disabled",true);
				 $td.eq(5).find("input:first").attr("readonly","readonly");
				 $td.eq(6).find("input:first").attr("readonly","readonly");
				 $td.eq(7).find("select:first").attr("disabled",true);
				 $td.eq(9).find("select:first").attr("disabled",true);
				 $td.eq(5).find("input:first").val(data.max_quota_per_time0);
				 $td.eq(6).find("input:first").val(data.max_quota_per_day0);
				 $td.eq(7).find("select:first").val(data.settlementInterval0);
				 $td.eq(9).find("select:first").val(data.status2);
				 $td.eq(5).find("input:last").attr("readonly","readonly");
				 $td.eq(6).find("input:last").attr("readonly","readonly");
				 $td.eq(7).find("select:last").attr("disabled",true);
				 $td.eq(9).find("select:last").attr("disabled",true);
				 $td.eq(5).find("input:last").val(data.max_quota_per_time1);
				 $td.eq(6).find("input:last").val(data.max_quota_per_day1);
				 $td.eq(7).find("select:last").val(data.settlementInterval1);
				 $td.eq(9).find("select:last").val(data.status3);
			}
		});
	}
	//保存银行信息校验操作
	function checkBank(index){
		if($("#platformid").val()==null||$("#platformid").val()==""){
			alert("还没保存平台");
			return false;
		}
		var $td = $(".yinhang").eq(index).find("td");
		var postdata = "appId="+$("#platformid").val();
		var id = $(".yinhang").eq(index).find("input:last").val();
		postdata += "&id="+id;
		var a = $td.eq(2).find("input").val();
		if(a==null||a==""){
			alert("第"+index+"行，银行名称不能为空！");return false;
		}
		postdata += "&channel_name="+a;
		var b = $td.eq(3).find("input").val();
		if(b==null||b==""){
			alert("第"+index+"行，银行代码不能为空！");return false;
		}
		postdata += "&channel_code="+b;
		
		
		var d = $td.eq(4).find("input").eq(0).is(':checked');
		var e = $td.eq(4).find("input").eq(2).is(':checked');
		var j = $td.eq(4).find("input").eq(1).val();
		var k = $td.eq(4).find("input").eq(3).val();
		postdata += "&card_type0="+d;
		postdata += "&card_type1="+e;
		postdata += "&lmitid0="+j;
		postdata += "&lmitid1="+k;
		if((id=null||id=="")&&!c&&!e){
			alert("第"+index+"行，卡类型不能为空！");return false;
		}
		var f = $td.eq(5).find("input:first").val();
		if((f==null||f=="")&&d){
			alert("第"+index+"行，储蓄卡的每笔最高额度不能为空！");return false;
		}
		postdata += "&max_quota_per_time0="+f;
		var g = $td.eq(6).find("input:first").val();
		if((g==null||g=="")&&d){
			alert("第"+index+"行，储蓄卡的日累计最高额度不能为空！");return false;
		}
		postdata += "&max_quota_per_day0="+g;
		g = parseInt(g.replace(/,/g, ''));
		f = parseInt(f.replace(/,/g, ''));
		if((g<f)&&d){
			alert("第"+index+"行，储蓄卡【日累计最高额度】不可小于【每笔最高额度】");return false;
		}
		
		var h = $td.eq(7).find("select:first").val();
		if((h==null||h=="")&&d){
			alert("第"+index+"行，储蓄卡的到账时间不能为空！");return false;
		}
		postdata += "&settlementInterval0="+h;
		var i = $td.eq(9).find("select:first").val();
		if((i==null||i=="")&&d){
			alert("第"+index+"行，应用平台启用状态不能为空！");return false;
		}
		postdata += "&status2="+i;
		var f = $td.eq(5).find("input:last").val();
		if((f==null||f=="")&&e){
			alert("第"+index+"行，信用卡的每笔最高额度不能为空！");return false;
		}
		postdata += "&max_quota_per_time1="+f;
		var g = $td.eq(6).find("input:last").val();
		if((g==null||g=="")&&e){
			alert("第"+index+"行，信用卡的日累计最高额度不能为空！");return false;
		}
		postdata += "&max_quota_per_day1="+g;
		g = parseInt(g.replace(/,/g, ''));
		f = parseInt(f.replace(/,/g, ''));
		if((g<f)&&e){
			alert("第"+index+"行，信用卡【日累计最高额度】不可小于【每笔最高额度】");return false;
		}
		
		var h = $td.eq(7).find("select:last").val();
		if((h==null||h=="")&&e){
			alert("第"+index+"行，信用卡的到账时间不能为空！");return false;
		}
		postdata += "&settlementInterval1="+h;
		var i = $td.eq(9).find("select:last").val();
		if((i==null||i=="")&&e){
			alert("第"+index+"行，应用平台启用状态不能为空！");return false;
		}
		postdata += "&status3="+i;
		saveBankAJAX(postdata,index);
	}
	
	//保存银行ajax
	function saveBankAJAX(data,index){
		$.ajax({
			url : "savebank",
			type : 'POST',
			dataType : "json",
			data: data,
			async : false,
			error : function() {
				alert("Connection error");
			},
			success : function(data) { 
				var $td = $(".yinhang").eq(index).find("td");
				$(".yinhang").eq(index).find("input:last").val(data.id);
				 $td.eq(10).find("#cancelbank").click();
			}
		});
	}
	
	//设置行号
	function checkId(){
		var id = $(".yinhang").length;
		for(var i=1;i<id;i++){
			$(".yinhang").eq(i).find("td").eq(1).find("label").html(i);
		}
	}
	
	
	// 列表页面【查询】按钮
	$("#querybutton").on("click", function(e) {
		var postdata = "";
		if($("#platformName").val()){
			postdata += "&platformName=" + $("#platformName").val();
		}
		if($("#platformNo").val()){
			postdata += "&platformNo=" + $("#platformNo").val();
		}
		reloaddata(postdata);
	 });
	
	
	// 查询条件【重置】按钮
	$("#resetbutton").on("click", function(e) {
		$("#platformName").val("");
		$("#platformNo").val("");
	});
	//卡片列表
	$("#toggle").on("click", function(e) {
		$('#Configure').bootstrapTable('toggleView');
	});
	//刷新
	$("#refresh").on("click", function(e) {
		$('#Configure').bootstrapTable('refresh');
	});
	
	//轨迹
	$("#trackbutton").on("click", function(e) {
		if($("#platformid").val()==null||$("#platformid").val()==""){
			alert("没有保存平台信息");
			return false;
		}
		window.parent.openDialogForSelf("configurtion/showTrack?id=" + $("#platformid").val() ,900);
		//main.js里的方法openDialogForSelf，是我自行添加。第一个参数是url，第二个参数是宽度。
	});
	
	$("#configform").validate({
		errorLabelContainer : ".alert-danger",
		errorElement : "p",
        errorClass : "text-left",
        focusInvalid : false,
        rules: {
        	platformName:"required",
        	domain:"required",
        	status:"required",
        	settlementType: "required",
        	settlementInterval: "required",
        	settlementBank: "required",
        	settlementCard: "required",
        	minimumAmount: "required",
        	maximumAmount: "required",
        	settlementParty: "required"
        },  
        messages: { 
        	platformName:{required: "应用平台名称不能为空"},
        	domain:{required: "应用平台域名不能为空"},
        	status:{required: "应用平台状态不能为空"},
        	settlementType:{required: "结算类型不能为空"},
        	settlementInterval:{required: "结算周期不能为空"},
        	settlementBank:{required: "结算银行为空"},
        	settlementCard:{required: "账户号码不能为空"},
        	minimumAmount:{required: "最低收费不能为空"},
        	maximumAmount:{required: "最高收费不能为空"},
        	settlementParty:{required: "手续费付费方不能为空"}
        }
    });
});
//得到查询参数
function queryParams(params) {
    return {
    	platformName: $("#platformName").val(),
    	platformNo: $("#platformNo").val(),
        offset:params.offset,
        limit:params.limit,
        sort: params.sort,  //排序列名
		order: params.order//排位命令（desc，asc）
    };

}
var pagesize = 10;
//查询列表
function reloaddata(data){
	$.ajax({
		url : "initPlatformList",
		type : 'GET',
		dataType : "json",
		data: data+"&limit="+pagesize,
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$('#Configure').bootstrapTable('load', data);
		}
	});
}

function checkRate(index){
	var $td = $(".feilv").eq(index).find("td");
	var postdata='';
	var postdata = "appId="+$("#platformid").val();
	postdata += "id="+$(".feilv").eq(index).find("input:last").val();
	var a = $td.eq(1).find("input:first").val();
	if(a==null||a==""){
		alert("第"+index+"行，最低金额不能为空！");return false;
	}
	postdata += "&minimumAmount="+a;
	var b = $td.eq(1).find("input:last").val();
	if(b==null||b==""){
		alert("第"+index+"行，最高金额不能为空！");return false;
	}
	postdata += "&maximumAmount="+b;
	var c = $td.eq(2).find("select option:selected").val();
	if
	(c==null||c==""){
		alert("第"+index+"行，计算方式不能为空！");return false;
	}
	postdata += "&rateType="+c;
	var d = $td.eq(3).find("input:last").val();
	if(d==null||d==""){
		alert("第"+index+"行，费率值不能为空！");return false;
	}
	postdata += "&rate="+d;
	saveRateAJAX(postdata,index);
}
//保存支付平台参数
function saveplatform(){
	var postdata = "";
	postdata += "&id=" + $("#platformid").val();
	postdata += "&platformNo=" + $("#platformNo").val();
	postdata += "&platformName=" + $("#platformName").val();
	postdata += "&domain=" + $("#domain").val();
	postdata += "&status=" + $("#status").val();
	postdata += "&settlementType=" + $("#settlementType").val();
	postdata += "&settlementInterval=" + $("#settlementInterval").val();
	postdata += "&settlementBank=" + $("#settlementBank").val();
	postdata += "&settlementCard=" + $("#settlementCard").val();
	postdata += "&minimumAmount=" + $("#minimumAmount").val();
	postdata += "&maximumAmount=" + $("#maximumAmount").val();
	if($(".settlementParty").eq(0).is(":checked")){
		postdata += "&settlementParty=" + $(".settlementParty").eq(0).val();
	}
	if($(".settlementParty").eq(1).is(":checked")){
		postdata += "&settlementParty=" + $(".settlementParty").eq(1).val();
	}
	if($(".settlementParty").eq(2).is(":checked")){
		postdata += "&settlementParty=" + $(".settlementParty").eq(2).val();
	}
	postdata=postdata.substring(1);
	saveplatformAJAX(postdata);
}
function saveplatformAJAX(data){
	$.ajax({
		url : "saveplatform",
		type : 'POST',
		dataType : "json",
		data: data,
		async : false,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$("#platformid").val(data.id);
			$("#platformNo").val(data.platformNo);
			$(".yinhang:last").after(data.bankdiv);
		}
	});
}


function checkRate(index){
	if($("#id").val()==null||$("#platformid").val()==""){
		alert("还没保存平台");
		return false;
	}
	var $td = $(".feilv").eq(index).find("td");
	var postdata = "appId="+$("#platformid").val();
	postdata += "&id="+$(".feilv").eq(index).find("input:last").val();
	var a = $td.eq(1).find("input:first").val();
	if(a==null||a==""){
		alert("第"+index+"行，最低金额不能为空！");return false;
	}
	postdata += "&minimumAmount="+a;
	var b = $td.eq(1).find("input:last").val();
	if(b==null||b==""){
		alert("第"+index+"行，最高金额不能为空！");return false;
	}
	postdata += "&maximumAmount="+b;
	var c = $td.eq(2).find("select option:selected").val();
	if(c==null||c==""){
		alert("第"+index+"行，计算方式不能为空！");return false;
	}
	postdata += "&rateType="+c;
	var d = $td.eq(3).find("input:last").val();
	if(d==null||d==""){
		alert("第"+index+"行，费率值不能为空！");return false;
	}
	if(c=="0"){
		if(parseFloat(d)>1){
			alert("第"+index+"行，费率值必须为小位数！");return false;
		}
	}
	
	postdata += "&rate="+d;
	saveRateAJAX(postdata,index);
}
function saveRateAJAX(data,index){
	$.ajax({
		url : "saverate",
		type : 'POST',
		dataType : "json",
		data: data,
		async : false,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			var $td = $(".feilv").eq(index).find("td");
			$(".feilv").eq(index).find("input:last").val(data.id);
			$td.eq(1).find("input:first").val(data.minimumAmount);
			$td.eq(1).find("input:last").val(data.maximumAmount);
			$td.eq(2).find("select").val(data.rateType);
			$td.eq(3).find("input:last").val(data.rate);
			$td.eq(1).find("input:first").attr("readonly","readonly");
			$td.eq(1).find("input:last").attr("readonly","readonly");
			$td.eq(2).find("select").attr("disabled",true);
			$td.eq(3).find("input:last").attr("readonly","readonly");
			$td.eq(4).find(".modifyrate").attr("disabled",false);
			$td.eq(4).find(".saverate").attr("disabled",true);
			$td.eq(4).find(".cancelrate").attr("disabled",true);
		}
	});
}
//删除数据后再删除模块
function deleteRateAJAX(data,index){
	$.ajax({
		url : "deleterate",
		type : 'POST',
		dataType : "json",
		data: data,
		async : false,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			$(".feilv").eq(index).remove();
		}
	});
}
//查询费率ajax且初始化数据
function selectRateAJAX(data,index){
	$.ajax({
		url : "selectrate",
		type : 'POST',
		dataType : "json",
		data: data,
		async : false,
		error : function() {
			alert("Connection error");
		},
		success : function(data) { 
			var $td = $(".feilv").eq(index).find("td");
			$td.eq(1).find("input:first").val(data.minimumAmount);
			$td.eq(1).find("input:last").val(data.maximumAmount);
			$td.eq(2).find("select").val(data.rateType);
			$td.eq(3).find("input:last").val(data.rate);
			$td.eq(1).find("input:first").attr("readonly","readonly");
			$td.eq(1).find("input:last").attr("readonly","readonly");
			$td.eq(2).find("select").attr("disabled",true);
			$td.eq(3).find("input:last").attr("readonly","readonly");
			$td.eq(4).find(".modifyrate").attr("disabled",false);
			$td.eq(4).find(".saverate").attr("disabled",true);
			$td.eq(4).find(".cancelrate").attr("disabled",true);
		}
	});
}
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
    	gotoConfigurationInfo(row.id);
    }
};
function gotoConfigurationInfo(id){
	window.location.href = "platform?id="+id;
}
