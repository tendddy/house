require(
		[ "jquery", "bootstrapdatetimepicker", "bootstrapdatetimepickeri18n",
				"bootstrap-table", "bootstrap", "bootstrapTableZhCn",
				"jqvalidatei18n", "additionalmethods", "jqtreeview", "zTree",
				"zTreecheck" ],
		function($) {
			$('.form_datetime').datetimepicker({
				language : 'zh-CN',
				format : 'yyyy-mm-dd hh:ii:ss',
				weekStart : 1,
				todayBtn : 1,
				autoclose : 1,
				todayHighlight : 1,
				startView : 2,
				forceParse : 0,
				showMeridian : 1
			});
			$('.form_date').datetimepicker({
				language : 'zh-CN',
				format : 'yyyy-mm-dd',
				weekStart : 1,
				todayBtn : 1,
				autoclose : 1,
				todayHighlight : 1,
				startView : 2,
				minView : 2,
				forceParse : 0
			});
			$('.form_time').datetimepicker({
				language : 'zh-CN',
				weekStart : 1,
				todayBtn : 1,
				autoclose : 1,
				todayHighlight : 1,
				startView : 1,
				minView : 0,
				maxView : 1,
				forceParse : 0
			});
			$(function() {
				// 平台列表查看
				$("#banksConfigPolicy").bootstrapTable({
					url : "initbankslist",
					method : 'get',
					queryParams : queryParams,
					cache : false,
					striped : true,
					pagination : true,
					sidePagination : 'server',
					pageSize : pagesize,
					minimumCountColumns : 2,
					clickToSelect : true,
					columns : [// {field: 'state',align:'center',valign:'middle',checkbox: true},
							{field : 'id',title : 'id',visible : false,switchable : false},
							{field : 'Number',title : '行号',align : 'center',valign : 'middle',// 行号
								formatter : function(value,row, index) {
									var pageNumber = $(".page-number").length;
									for (var i = 0; i < pageNumber; i++) {
										if ($(".page-number").eq(i).hasClass("active")) {// 得到当前页
											pageNumber = $(".page-number").eq(i).find("a").html();
										}
									}
									return pagesize* (pageNumber - 1)+ index + 1;
								}
							},
							{field : 'channelType',title : '渠道类型',align : 'center',valign : 'middle',sortable : true},
							{field : 'bankCode',title : '银行代码',align : 'center',valign : 'middle',sortable : true}, 
							{field : 'bankName',title : '银行名称',align : 'center',valign : 'middle',sortable : true},
							{field : 'bankOrder',title : '银行卡优先级',align : 'center',valign : 'middle',sortable : true},
							{field : 'status',title : '状态',align : 'center',valign : 'middle',sortable : true},
							{field : 'operation',title : '操作',align : 'center',valign : 'middle',switchable : false,formatter : operateFormatter,events : operateEvents}
							],
					onLoadSuccess : function(data) {}
				});
			

			// 上传图片操作-点击“上传”
			$("#shangchuan").click(function(e) {
				if (!$("#shangchuan").hasClass('activess')) {// disabled属性对于div不可用
					$("#file").click();
				}
			});
			// 上传图片操作-点击图片
			$("#preview").click(function(e) {
				if (!$("#savebanks").is(':disabled')) {// disabled属性对于input还好
					$("#file").click();
				}
			});
			// 图片选择器发生变化
			$(document).on('change', '#file', function() {
				setImagePreview();
			});

			// 初始化修改---start---点击修改后，把值整理一下，
			// 进入修改页面，设置了按钮显示和标签不可编辑
			if ($("#banksid").val() != "" && $("#banksid").val() != undefined) {
				$("#cancelform").show();
				$("#modifyform").show();
				$("#savebanks").attr("disabled", true);
				$("#cancelform").attr("disabled", true);
				$("#modifyform").attr("disabled", false);
				var postdata = "id=" + $("#banksid").val();
				$.ajax({
					url : "selectbanks",
					type : 'POST',
					dataType : "json",
					data : postdata,
					async : false,
					error : function() {
						alert("Connection error");
					},
					success : function(data) {
						$("#bankName").val(data.bankName);
						$("#bankOrder").val(data.bankOrder);
						$("#channelType").val(data.channelType);
						$("#status").val(data.status);
						if (data.bankLogo != null && data.bankLogo != "") {
							$("#bankLogo").val(data.bankLogo);
							$("img").attr("src", data.bankLogo);
							$("#localImag").show();
							$("#shangchuan").hide();
						} else {
							$("#shangchuan").show();
							$("#shangchuan").addClass('activess');
						}
						$("#bankName").attr("readonly", "readonly");
						$("#bankOrder").attr("readonly", "readonly");
						$("#channelType").attr("disabled", true);
						$("#status").attr("disabled", true);
						$("#bankLogo").attr("disabled", true);
					}
				});
			} else {// 新增操作，取消和修改按钮不可见
				$("#cancelform").hide();
				$("#modifyform").hide();
			}
			// 初始化状态选择
			if ($("#statuss").val() != "" && $("#statuss").val() != undefined) {
				$("#status").val($("#statuss").val());
			}
			// 初始化结算类型选择
			if ($("#channelTypes").val() != ""
					&& $("#channelTypes").val() != undefined) {
				$("#channelType").val($("#channelTypes").val());
			}
			// 初始化修改---end---

			// 转到新增页面
			$("#addbutton").click(function(e) {
				window.location.href = "addbanks";
			})
			// 【返回】按钮
			$("#go_back").on("click", function(e) {
				window.location.href = "list";
			});
			// 【保存】按钮
			$("#savebanks").on("click", function(e) {
				if ($("#addbanksform").valid()) {
					saveBanks();
					// $("#cancelform").click();
				}
			});
			$("#addbanksform").validate({
				errorLabelContainer : ".alert-danger",
				errorElement : "p",
				errorClass : "text-left",
				focusInvalid : false,
				rules : {
					bankName : "required",
					status : "required",
					channelType : "required",
					bankLogo : "required"

				},
				messages : {
					bankName : {
						required : "银行名称不能为空"
					},
					status : {
						required : "银行状态不能为空"
					},
					channelType : {
						required : "渠道类型不能为空"
					},
					bankLogo : {
						required : "银行Logo不能为空"
					}
				}
			});

			// 查看页面点击修改//进入可编辑状态
			$("#modifyform").click(function() {
				$("#savebanks").attr("disabled", false);
				$("#cancelform").attr("disabled", false);
				$("#modifyform").attr("disabled", true);
				$("#bankName").removeAttr("readonly");
				$("#bankOrder").removeAttr("readonly");
				$("#status").attr("disabled", false);
				$("#channelType").attr("disabled", false);
				$("#bankLogo").attr("disabled", false);
				$("#shangchuan").removeClass('activess');
			});

			// 查看页面点击取消//放弃保存操作，修改信息初始化，支付平台信息恢复到不可编辑状态
			$("#cancelform").click(function(e) {
				$("#cancelform").show();
				$("#modifyform").show();
				$("#savebanks").attr("disabled", true);
				$("#cancelform").attr("disabled", true);
				$("#modifyform").attr("disabled", false);

				var postdata = "id=" + $("#banksid").val();
				$.ajax({
					url : "selectbanks",
					type : 'POST',
					dataType : "json",
					data : postdata,
					async : false,
					error : function() {
						alert("Connection error");
					},
					success : function(data) {
						$("#bankName").val(data.bankName);
						$("#bankOrder").val(data.bankOrder);
						$("#channelType").val(data.channelType);
						$("#status").val(data.status);
						if (data.bankLogo != null && data.bankLogo != "") {
							$("#bankLogo").val(data.bankLogo);
							$("img").attr("src", data.bankLogo);
							$("#localImag").show();
							$("#shangchuan").hide();
						} else {
							$("#shangchuan").show();
							$("#shangchuan").addClass('activess');
						}
						$("bankLogo").attr("disabled", true);
						$("#bankName").attr("readonly", "readonly");
						$("#bankOrder").attr("readonly", "readonly");
						$("#channelType").attr("disabled", true);
						$("#status").attr("disabled", true);
					}
				});

			});

			// 列表页面【查询】按钮
			$("#querybutton").on("click", function(e) {
				var postdata = "";
				if ($("#bankName").val()) {
					postdata += "&bankName=" + $("#bankName").val();
				}
				if ($("#status").val()) {
					postdata += "&status=" + $("#status").val();
				}
				reloaddata(postdata);
			});

			// 查询条件【重置】按钮
			$("#resetbutton").on("click", function(e) {
				$("#bankName").val("");
				$("#status").val("");
			});
			// 卡片列表
			$("#toggle").on("click", function(e) {
				$('#banksConfigPolicy').bootstrapTable('toggleView');
			});
			// 刷新
			$("#refresh").on("click", function(e) {
				$('#banksConfigPolicy').bootstrapTable('refresh');
			});
		});
	});
// 保存参数
function saveBanks() {
	var postdata = "";
	postdata += "&id=" + $("#banksid").val();
	postdata += "&channelType=" + $("#channelType").val();
	postdata += "&bankCode=" + $("#bankCode").val();
	postdata += "&bankName=" + $("#bankName").val();
	postdata += "&bankOrder=" + $("#bankOrder").val();
	postdata += "&status=" + $("#status").val();
	postdata += "&bankLogo=" + $("#bankLogo").val();

	postdata = postdata.substring(1);
	saveBanksAJAX(postdata);
}
// 保存ajax
function saveBanksAJAX(data) {
	var uploadUrl = "savebanks?" + data;
	$.ajaxFileUpload({
		url : uploadUrl,
		type : 'POST',
		secureuri : false, // 是否启用安全提交,默认为false
		fileElementId : "file", // 文件选择框的id属性
		dataType : 'text', // 服务器返回的格式,可以是json或xml等
		// 但是ajaxFileUpload返回值类型dataType必须是text。返回的是带<pre>{"id","22"}</pre>.解决方法：data
		// = jQuery.parseJSON(jQuery(data).text());转换一下。
		success : function(data) {
			data = jQuery.parseJSON(jQuery(data).text());
			$("#banksid").val(data.banksid);
			$("#cancelform").click();
		},
		error : function(data) {
			alert("Connection error");
		}
	});
}
// 添加事件
function operateFormatter(value, row, index) {
	return [ '<a class="edit m-left-5" href="javascript:void(0);" title="编辑">',
			'<i class="glyphicon glyphicon-edit"></i>', '</a>' ].join('');
}
// 事件响应
window.operateEvents = {
	'click .edit' : function(e, value, row, index) {
		gotoBanksInfo(row.id);
	}
};
function gotoBanksInfo(id) {
	window.location.href = "addbanks?id=" + id;
}

// 预览方法
function setImagePreview() {
	// var $td = $(".yinhang").eq(index).find("td");
	var docObj = $("#file").get(0);// document.getElementById("doc");
	if (docObj.value == "" || docObj.value == null) {
		return false;
	}
	var pos = docObj.value.lastIndexOf("\\");
	var filename = docObj.value.substring(pos + 1);
	var kuo = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
	if (kuo != "gif" && kuo != "jpg" && kuo != "jpeg" && kuo != "png"
			&& kuo != "bmp") {
		alert("文件类型不是图片，请重新上传。")
		return false;
	}
	var imgObjPreview = $("#preview").get(0);// document.getElementById("preview");
	if (docObj.files && docObj.files[0]) {
		// 火狐下，直接设img属性
		imgObjPreview.style.display = 'block';
		imgObjPreview.style.width = '138px';
		imgObjPreview.style.height = '33px';
		// imgObjPreview.src = docObj.files[0].getAsDataURL();

		// 火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
		imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
	} else {
		// IE下，使用滤镜
		docObj.select();
		var imgSrc = document.selection.createRange().text;
		var localImagId = $("#localImag").get(0);// document.getElementById("localImag");
		// 必须设置初始大小
		localImagId.style.width = "138px";
		localImagId.style.height = "33px";
		// 图片异常的捕捉，防止用户修改后缀来伪造图片
		try {
			localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			localImagId.filters
					.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		} catch (e) {
			alert("您上传的图片格式不正确，请重新选择!");
			return false;
		}
		imgObjPreview.style.display = 'none';
		document.selection.empty();
	}
	$("#shangchuan").hide();
	$("#localImag").show();
	$("#bankLogo").val(filename)
	return true;
}

// 响应input-file方法
function selectLogo() {
	$("#file").click();
}

var pagesize = 10;

// 查询列表
function reloaddata(data) {
	$.ajax({
		url : "initbankslist",
		type : 'GET',
		dataType : "json",
		data : data + "&limit=" + pagesize,
		async : true,
		error : function() {
			alert("Connection error");
		},
		success : function(data) {
			$('#banksConfigPolicy').bootstrapTable('load', data);
		}
	});
}

// 得到查询参数
function queryParams(params) {
	return {
		bankName : $("#bankName").val(),
		status : $("#status").val(),
		offset : params.offset,
		limit : params.limit,
		sort : params.sort, // 排序列名
		order : params.order
	// 排位命令（desc，asc）
	};

}
