require([ "jquery", "zTree", "zTreecheck", "flat-ui", "bootstrap", "bootstrap-table", "fuelux", "bootstrapTableZhCn","public" ], function($) {
	/*ztree数据*/
	var channelSetting = {
		async: {
			enable: true,
			url: "/cm/channel/queryTreeList",
			autoParam: ["id=parentCode"],
			dataType : "json",
			type : "post"
		},
		check : {
			enable : true,
			chkStyle : "radio",
			radioType : "all"
		},
		callback: {
			onClick: freshchannelinfo,
			onCheck: freshchannelinfo
		}
	}
	$.fn.zTree.init($("#channelTree"), channelSetting);
	function freshchannelinfo(event, treeId, treeNode){
		//alert("选中的渠道id="+treeNode.id);
		$.ajax({
			url : '/cm/channel/getNewChannelProtocolInfo',
			type : 'GET',
			dataType : 'html',
			contentType: "application/json" ,
			data :{
				"id":treeNode.id
			},
			cache : false,
			async : true,
			error : function() {
				alertmsg("Connection error");
			},
			success : function(data) {
				if (data) {
					$("#channelagreementsubpage").empty();
					$("#channelagreementsubpage").html(data);
				}else{
					alertmsg("读取渠道信息失败！");
				}
			}
		});
	}
});
