function initchannelagreementScript() {
    //初始化已关联网点表格数据
    //默认一页显示十条记录 
    var pagesize = 3;
    //当前调用的url
    //var channelid=treeNode.id;
    var pageurl = "/cm/channel/getChannelAgreementprovider?";
    //当前调用的url查询参数 ----渠道id
    var pageurlparameter = "channelid=" + $("#channelid").val() + "&limit" + pagesize;//+treeNode.id;
    $('#deptListTable').bootstrapTable({
        method: 'get',
        url: pageurl + pageurlparameter,
        cache: false,
        striped: true,
        pagination: true,
        sidePagination: 'server',
        pageSize: pagesize,
        minimumCountColumns: 2,
        clickToSelect: true,
        columns: [
//        {
//            field: 'state',
//            align: 'center',
//            valign: 'middle',
//            display:'hidden',
//            checkbox: true
//        }, 
            {
                field: 'agreementcode',
                title: '协议编码',
                align: 'center',
                valign: 'middle',
                display: 'hidden',
                sortable: true
            },
            {
                field: 'agreementname',
                title: '协议名称',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'prvshotname',
                title: '关联供应商',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'businesstype',
                title: '业务类型',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
//            field: 'deptid',
                field: 'shortname',
                title: '关联机构',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
//            field: 'deptid5',
                field: 'outcom',
                title: '出单网点',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
//            field: 'paychannelid',
                field: 'paychannelnames',
                title: '支付方式',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'agreementstatusname',
                title: '状态',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'operating',
                title: '修改及删除',
                align: 'center',
                valign: 'middle',
                switchable: false,
                formatter: operateFormatter1,
                events: operateEvents1
            }
        ]
    });
    //绑定省份变更事件
    $("#selectarea").change(function () {
        $("#citys").empty();
        $.ajax({
            url: "/cm/channel/getSelectArea",
            type: 'post',
            dataType: "JSON",
            data: {
                "province": $("#selectarea").val(),
            },
            async: true,
            error: function () {
                alertmsg("Connection error");
            },
            success: function (data) {
                var citys = "";
                for (var i = 0; i < data.length; i++) {
                    citys += "<input type=\"checkbox\" name=\"citys[" + i + "]\" value=\"" + data[i].comcode + "\"/>" + data[i].comcodename;
                    if ((i + 1) % 9 == 0) {
                        citys += "<br>";
                    }
                }
                $("#citys").html(citys);
            }
        });
    });
    //绑定基础信息保存事件
    $("#baseinfosave").click(function () {
        alert($("#baseinfoform").serialize());
//		alert($("input[name^='citys']:checkbox").length)
        if ($("input[name^='citys']:checked").length == 0) {
            alertmsg("请选择地市");
            return false;
        }
        $.ajax({
            url: "/cm/channel/saveBaseInfo",
            type: 'post',
            dataType: "text",
            data: $("#baseinfoform").serialize(),
            async: true,
            error: function () {
                alertmsg("Connection error");
            },
            success: function (data) {
                if (data == "fail") {
                    alertmsg("保存失败");
                } else {
                    alertmsg("保存成功");
                    $("#agreementid").val(data);
                }
            }
        });
    })
    //初始化应用地区数据
    /*$.ajax({
     url : "/cm/region/getregionsbyparentid",
     type : 'GET',
     dataType : "json",
     data : {
     parentid:0
     },
     async : false,
     error : function() {
     alertmsg("Connection error");
     },
     success : function(data) {
     $("#selectarea").empty();
     for (var i = 0; i < data.length; i++) {
     if(data[i].id == $.trim($("#province").val())){
     $("#selectarea").append("<option selected='selected' value='"+data[i].id+"'>"+data[i].comcodename+"</option>");
     }else{
     $("#selectarea").append("<option value='"+data[i].id+"'>"+data[i].comcodename+"</option>");
     }
     }
     $.ajax({
     url : "/cm/channel/getSelectArea",
     type : 'post',
     dataType : "JSON",
     data: {
     "province":$("#province").val(),
     "agreementid":$("#agreementid").val()
     },
     async : true,
     error : function() {
     alertmsg("Connection error");
     },
     success : function(data) {
     var citys = "";
     for(var i=0;i<data.length;i++){
     if(data[i].parentid == "checked"){
     citys += "<input type=\"checkbox\" checked name=\"citys["+i+"]\" value=\""+data[i].comcode+"\"/>"+data[i].comcodename;
     }else{
     citys += "<input type=\"checkbox\" name=\"citys["+i+"]\" value=\""+data[i].comcode+"\"/>"+data[i].comcodename;
     }
     //9个城市换一行
     if((i+1)%9==0){
     citys += "<br>";
     }
     }
     $("#citys").html(citys);
     }
     });
     }
     });*/
    //初始化权限管理数据
    getInterfaceInfoNew();
    
    $("#monthfree").blur(function () {
    	if ( isNaN($(this).val()) ) {
    		alertmsg("免费使用次数必须是数字！");
    	}
    });
    
    $("input:checkbox[name='provider']").click(function () {
    	var curSelObj = $(this);
    	var curSelPrvId = curSelObj.attr('value');
    	var curSelId = curSelObj.attr('id');
    	
    	if ($(this).prop("checked")) {
	    	$("input:checkbox[name='provider']").each(function() {
	    		var itPrvId = $(this).attr('value');
	    		var itId = $(this).attr('id');
	    		
		        if ( curSelPrvId == itPrvId && curSelId != itId && $(this).prop("checked") ) {
		        	$(this).prop("checked", false);
		        }	
	    	});
    	}
    });
    
    $("#interfacechargeadd").click(function () {
    	if ($("#agreementinterfaceid").val() == "") {
    		alertmsg("请先开启该接口！");
    		return false;
    	}
    	$("#agreeinterfaceid").val($("#agreementinterfaceid").val());
    	$('#chargesource').modal('show');
    });
    $("#interChargeCancelBt").click(function () {
    	$('#chargesource').modal('hide');
    });
    $("#interChargeSaveBt").click(saveInterfaceCharge);
    $("#converstart").blur(checkConverstart);
    $("#converend").blur(checkConverend);
    $("#charge").blur(checkCharge);
    
    //绑定权限管理保存事件
    $("#interfacesave").click(function () {
        //alert($("#interfaceform").serialize());
    	//if ($.trim($("#agreementid").val()) == "" || $("#agreementid").val() == null) {
    	//    alertmsg("请先保存基本信息");
    	//    return false;
    	//}
    	
    	if ( isNaN($("#monthfree").val()) ) {
    		alertmsg("免费使用次数必须是数字！");
    		return false;
    	}
    	
        $.ajax({
            url: "/cm/channel/saveInterfaces",
            type: 'post',
            dataType: "json",
            data: $("#interfaceform").serialize(),
            async: true,
            error: function () {
                alertmsg("Connection error");
            },
            success: function (data) {
                alertmsg(data.flag);
                
                if (data.flag == 'success') {
                	$("#agreementinterfaceid").val(data.agreementinterfaceid);
                }
                
                var pageurl = "/cm/channel/getInterfaceInfo?";
                var pageurlparameter = "agreementid=" + $("#agreementid").val() + "&channelinnercode=" + $("#channelinnercode").val();
                $('#interfacesTable').bootstrapTable('refresh', {url: pageurl + pageurlparameter});
                
                pageurl = "/cm/channel/getInterfaceCharge?";
                pageurlparameter = "agreementinterfaceid=" + $("#agreementinterfaceid").val();
                $('#interChargeTable').bootstrapTable('refresh', {url: pageurl + pageurlparameter});
            }
        });
    });
    //绑定支付方式开启按钮
    $("#openpaytype").click(function () {
        var payTypeTable = $('#payTypeTable').bootstrapTable('getSelections');
        console.log("selected:" + JSON.stringify(payTypeTable));
        $.ajax({
            url: "/cm/channel/savePayType",
            type: 'POST',
            dataType: 'text',
            data: {
                "flag": "1",
                "payTypeJson": JSON.stringify($('#payTypeTable').bootstrapTable('getSelections')),
                "providerid": $("#providerid").val(),
                "agreementid": $("#agreementid").val()
            },
            cache: false,
            async: true,
            success: function (data) {
                var url = "/cm/channel/getDeptPayType?providerid=" + $("#providerid").val() + "&deptid=" + $("#deptid").val() + "&agreeid=" + $("#agreementid").val();
                $('#payTypeTable').bootstrapTable('refresh', {url: url});
                alertmsg(data);
            }
        });
    });
    //绑定支付方式关闭按钮
    $("#closepaytype").click(function () {
        var payTypeTable = $('#payTypeTable').bootstrapTable('getSelections');
        console.log("selected:" + JSON.stringify(payTypeTable));
        $.ajax({
            url: "/cm/channel/savePayType",
            type: 'POST',
            dataType: 'text',
            data: {
                "flag": "0",
                "payTypeJson": JSON.stringify($('#payTypeTable').bootstrapTable('getSelections'))
            },
            cache: false,
            async: true,
            success: function (data) {
                var url = "/cm/channel/getDeptPayType?providerid=" + $("#providerid").val() + "&deptid=" + $("#deptid").val() + "&agreeid=" + $("#agreementid").val();
                $('#payTypeTable').bootstrapTable('refresh', {url: url});
                alertmsg(data);
            }
        });
    });
    //绑定支付方式选项卡
    $("#paytype").click(function () {
        var url = "/cm/channel/getDeptPayType?providerid=" + $("#providerid").val() + "&deptid=" + $("#deptid").val() + "&agreeid=" + $("#agreementid").val();
        console.log("url" + url);
        $('#payTypeTable').bootstrapTable({
            method: 'post',
            url: url,
            cache: false,
            striped: true,
            sidePagination: 'server',
            pageSize: pagesize,
            clickToSelect: true,
            columns: [
                {
                    field: 'state',
                    align: 'center',
                    valign: 'middle',
                    checkbox: true
                },
                {
                    field: 'id',
                    title: '序号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                },
                {
                    field: 'paychannelname',
                    title: '支付通道名称',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                },
                {
                    field: 'paytypename',
                    title: '支付类型',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                },
                {
                    field: 'modifytime',
                    title: '最近更新时间',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                },
                {
                    field: 'check',
                    title: '当前状态',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }
            ]
        });
        $('#payTypeTable').bootstrapTable('refresh', {url: url});
    });
    //初始化配送方式数据
    $("#distribution").click(function () {
        $.ajax({
            url: "/cm/channel/getDistribution",
            type: 'POST',
            dataType: "JSON",
            data: {
                "providerid": $("#providerid").val(),
                "deptid": $("#deptid").val(),
                "agreementid": $("#agreementid").val()
            },
            async: false,
            error: function () {
                alertmsg("Connection error");
            },
            success: function (data) {
                $("#distproviderid").val(data.providerid);
                $("#distdeptid").val(data.deptid);
                $("#distagreementid").val(data.agreementid);
                $("#selfdisttype").prop("checked", data.selfdistritype == "1");
                $("#selfnoti").val(data.selfnoti);
                $("#distdisttype").prop("checked", data.distdistritype == "2");
                $("#chargefee").val(data.chargefee);
                $("#distnoti").val(data.distnoti);

                var distrcompany = "<option value=\"0\"" + (data.distrcompany == null ? "selected" : "") + ">请选择快递公司</option>" +
                    "<option value=\"1\"" + (data.distrcompany == "1" ? "selected" : "") + ">顺丰快递</option>" +
                    "<option value=\"2\"" + (data.distrcompany == "2" ? "selected" : "") + ">申通快递</option>" +
                    "<option value=\"3\"" + (data.distrcompany == "3" ? "selected" : "") + ">中通快递</option>" +
                    "<option value=\"4\"" + (data.distrcompany == "4" ? "selected" : "") + ">圆通快递</option>" +
                    "<option value=\"5\"" + (data.distrcompany == "5" ? "selected" : "") + ">宅急送</option>" +
                    "<option value=\"6\"" + (data.distrcompany == "6" ? "selected" : "") + ">邮政EMS</option>";

                $("#distrcompany").html(distrcompany);

                $("#distpaytype1").prop("checked", data.distpaytype == "1");
                $("#distpaytype2").prop("checked", data.distpaytype == "2");
                $("#distpaytype3").prop("checked", data.distpaytype == "3");

            }
        });
    });
    //绑定配送方式保存事件
    $("#savedistribution").click(function () {
//        alert($("#distributionform").serialize());
        if (!$("#selfdisttype").is(':checked') && !$("#distdisttype").is(':checked')) {
            alertmsg("请至少选择一种配送方式");
            return false;
        }
        $.ajax({
            url: "/cm/channel/saveDistribution",
            type: 'post',
            dataType: "text",
            data: $("#distributionform").serialize(),
            async: true,
            error: function () {
                alertmsg("Connection error");
            },
            success: function (data) {
                alertmsg(data)
            }
        });
    });
    function operateFormatter1(value, row, index) {
        return [ '<a class="edit m-left-5" href="javascript:void(0)" title="编辑">',
            '<i class="glyphicon glyphicon-edit"></i>', '</a>',
            '<a class="remove m-left-5" href="javascript:void(0)" title="删除">',
            '<i class="glyphicon glyphicon-remove"></i>', '</a>', ].join('');
    }

    $("#checkProid").click(function () {
        var agreementid = $("#agreementid").val();
        var str = "";
        var agreeid = "";
        for (var i = 0; i < $('input[name="provider"]:checked').length; i++) {
            str += $('input[name="provider"]:checked')[i].value + ",";
            var id = $('input[name="provider"]:checked')[i].id;
            id = id.substring(8, id.length);
            agreeid += $('#agreeid' + id).val() + ",";
        }
        var str = str.substring(0, str.lenght);
        var agreeid = agreeid.substring(0, str.lenght);
        var channelid = $("#channelid").val()
        if (str == "") {
            alert("请选择供应商");
            return;
        }
        $.ajax({
            url: "/cm/channel/UploadAndSaveProvider",
            type: 'POST',
            dataType: 'text',
            data: {
                "providerid": str,
                "agreeid": agreeid,
                "agreementid": agreementid
            },
            cache: false,
            async: true,
            success: function (data) {
                if (data == "success") {
                    alertmsg("添加成功！");
                    $('#deptListTable').bootstrapTable('refresh', {url: "/cm/channel/getChannelAgreementprovider?channelid=" + $("#channelid").val() + "&limit=" + pagesize});
                    $('#providersource').modal('hide');
                } else if (data == "fail") {
                    alertmsg("添加失败！");
                }
            }
        });
    })
    $("#closeProid").click(function () {
        $('#providersource').modal('hide');
    });

    //点击网点确定按钮
    $("#checkdeptname").click(function () {
        var agreementid = $("#agreementid").val();
        var str = "";
        var agreeid = $("#soulagreeid").val();
        for (var i = 0; i < $("input[type='radio']:checked").length; i++) {
            str = $("input[type='radio']:checked")[i].value;
        }
        var str = str.substring(0, str.length - 1);
        if (str == "") {
            alert("请选择网点");
            return;
        }
        $.ajax({
            url: "/cm/channel/saveAgreementdept",
            type: 'POST',
            dataType: 'text',
            data: {
                "dept": str,
                "deptid5": $("#deptid5").val(),
                "agreementid": agreeid,
                "prvId": $("#providerid").val(),
                "chnagreementid": agreementid
            },
            cache: false,
            async: true,
            success: function (data) {
                if (data == "success") {
                    $('#deptnameTable').bootstrapTable('refresh', {url: "/cm/channel/getOutdept?agreementid=" + agreementid + "&providerid=" + $("#providerid").val()});
                    $("#deptid").val(str);
                    $("#deptid5").val(str);
                    $('#deptsource').modal('hide');
                } else if (data == "fail") {
                    alertmsg("网点应用范围保存失败！");
                }
            }
        });
    })
    $("#closedept").click(function () {
        $('#deptsource').modal('hide');
    });
}
window.operateEvents1 = {
    'click .edit': function (e, value, row, index) {
        $("#editprovider").show();
        $("#disprv").val(row.prvshotname);
        $("#providerid").val(row.providerid);
        $("#deptid").val(row.deptid5);
        $("#deptid5").val(row.deptid5);
        $("#soulagreeid").val(row.agreeid);
        console.log(row);
        var agreementid = $("#agreementid").val();
        var agreeid = $("#soulagreeid").val();
        var deptpageurl = "/cm/channel/getOutdept?"
        var deptPageurlparameter = "agreementid=" + agreementid + "&providerid=" + $("#providerid").val();
        $('#deptnameTable').bootstrapTable('refresh', {url: deptpageurl + deptPageurlparameter});
        $('#deptnameTable').bootstrapTable({
            method: 'get',
            url: deptpageurl + deptPageurlparameter,
            cache: false,
            striped: true,
            sidePagination: 'server',
            columns: [
                {
                    field: 'deptid1',
                    title: '集团',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                },
                {
                    field: 'deptid2',
                    title: '平台公司',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                },
                {
                    field: 'deptid3',
                    title: '法人公司',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                },
                {
                    field: 'deptid4',
                    title: '分公司',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                },
                {
                    field: 'deptid5',
                    title: '网点',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }
            ]
        });
        $("#outdept").click();
    },
    'click .remove': function (e, value, row, index) {
        if (window.confirm("确定要删除吗？") == true) {
            var pageurl = "/cm/channel/getChannelAgreementprovider?";
            var pageurlparameter = "channelid=" + $("#channelid").val() + "&limit" + 3;//+treeNode.id;
            $.ajax({
                url: '/cm/channel/deletebyagrprvid?id=' + row.agreementproviderid + '&agreeid=' + row.agreeid,
                type: 'GET',
                dataType: "json",
                async: true,
                error: function () {
                    alertmsg("Connection error");
                },
                success: function (data) {
                    if (data.status == "success") {
                        alertmsg(data.msg);
                        $('#deptListTable').bootstrapTable('refresh', {url: pageurl + pageurlparameter});
                    } else {
                        alertmsg("删除失败！");
                    }
                }
            });
            $("#outdept").click();
        } else {
            //alertmsg("取消");
            return false;
        }
    }

};
function addprovider() {
    $('#providersource').modal('show');
}
function updept() {
//	alert($("#soulagreeid").val()+",,");
    $.ajax({
        url: "/cm/channel/getAllDeptName",
        type: 'POST',
        dataType: 'json',
        data: {
            "agreementid": $("#agreementid").val(),
            "providerid": $("#providerid").val(),
            "soulagreeid": $("#soulagreeid").val()
        },
        cache: false,
        async: true,
        success: function (data) {
            $("#providerRead").empty();
            var arrList = new Array();
            arrList.push(1);
            if (data.chosed != null) {
                for (var j = 0; j < data.chosed.length; j++) {
                    arrList.push(data.chosed[j].deptid5);
                }
            }
            for (var i = 0; i < data.all.length; i++) {
                $("#providerRead").append("<input type='radio' id='radiobutton" + i + "' name='radiobutton' value=" + data.all[i].deptid + "/>" + data.all[i].comname + "<br>");
//				alert(data.all[i].comname);
                if ($.inArray(data.all[i].comname, arrList) != -1) {
                    $('#radiobutton' + i).attr("checked", "checked");
                }
            }
            $('#deptsource').modal('show');
            $("#providers").val($("#disprv").val());
        }
    });


}

//查询权限管理数据
function getInterfaceInfo() {
	$.ajax({
        url: "/cm/channel/getInterfaceInfo",
        type: 'POST',
        dataType: "JSON",
        data: {
            "agreementid": $("#agreementid").val()
        },
        async: false,
        error: function () {
            alertmsg("Connection error");
        },
        success: function (data) {
            var interfaces = "<tr>";
            for (var i = 0; i < data.length; i++) {
                var selected = "";
                var negativeselect = "";
                var checked = "";
                var negativechecked = "";
                //初始化开启关闭select
                if (data[i].check == "1") {
                    selected = "selected";
                } else {
                    negativeselect = "selected";
                }
                //初始化是否免费radio
                if (data[i].isfree == "1") {
                    checked = "checked"
                } else {
                    negativechecked = "checked";
                }
                //拼权限管理html
                interfaces += "<td class=\"graylb\"><label>" + data[i].interfacename + ":</label>" +
                    "<input type=\"hidden\" name=\"interfaces[" + i + "].interfaceid\" value=\"" + data[i].interfaceid + "\"/>" +
                    "<input type=\"hidden\" name=\"interfaces[" + i + "].agreementinterfaceid\" value=\"" + data[i].agreementinterfaceid + "\"/></td>" +
                    "<td><select name=\"interfaces[" + i + "].check\"><option value=\"1\" " + selected + ">开启</option>" +
                    "<option value=\"0\" " + negativeselect + ">关闭</option></select><br>" +
                    "是否收费:<input value=\"1\" name=\"interfaces[" + i + "].isfree\" " + checked + " type=\"radio\"/>是<input value=\"0\" name=\"interfaces[" + i + "].isfree\" " + negativechecked + "  type=\"radio\"/>否</td>";
                
                //2个接口换一行
                if ((i + 1) % 2 == 0) {
                    if (i + 1 == data.length) {
                        interfaces += "</tr>";
                    } else {
                        interfaces += "</tr><tr>";
                    }
                } else if (i + 1 == data.length) {
                    interfaces += "</tr>";
                    $("#agreementinterfaceid").val(data[i].agreementinterfaceid);
                }
            }
            $("#interfaces").html(interfaces);
        }
    });
}

function getInterfaceInfoNew(){
    var pageurl = "/cm/channel/getInterfaceInfo?";
    var pageurlparameter = "agreementid=" + $("#agreementid").val() + "&channelinnercode=" + $("#channelinnercode").val();
    $('#interfacesTable').bootstrapTable({
        method: 'post',
        url: pageurl + pageurlparameter,
        cache: false,
        striped: true,
        sidePagination: 'server',
        clickToSelect: true,
        columns: [
            {
                field: 'interfacename',
                title: '接口',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'checkflag',
                title: '开通情况',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'isfreename',
                title: '收费情况',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'operating',
                title: '修改',
                align: 'center',
                valign: 'middle',
                switchable: false,
                formatter: operateFormatterIin,
                events: operateEventsIin
            }
        ]
    });
    getInterfaceCharge();
}

function operateFormatterIin(value, row, index) {
    return [ '<a class="edit m-left-5" href="javascript:void(0)" title="编辑">',
        '<i class="glyphicon glyphicon-edit"></i>', '</a>', ].join('');
}

window.operateEventsIin = {
    'click .edit': function (e, value, row, index) {
    	console.log(row);
        $("#disInterface").val(row.interfacename);
        $("#monthfree").val(row.monthfree);
        $("#agreementinterfaceid").val(row.agreementinterfaceid);
        $("#interfaceid").val(row.interfaceid);

        $("input:radio[name='check'][value=" + row.check + "]").click();
        $("input:radio[name='isfree'][value=" + row.isfree + "]").click();

        var pageurl = "/cm/channel/getInterfaceCharge?";
        var pageurlparameter = "agreementinterfaceid=" + $("#agreementinterfaceid").val();
        $('#interChargeTable').bootstrapTable('refresh', {url: pageurl + pageurlparameter});
        $("#editInterface").show();        
    }
};

function getInterfaceCharge(){
    var pageurl = "/cm/channel/getInterfaceCharge?";
    var pageurlparameter = "agreementinterfaceid=" + $("#agreementinterfaceid").val();
    $('#interChargeTable').bootstrapTable({
        method: 'post',
        url: pageurl + pageurlparameter,
        cache: false,
        striped: true,
        sidePagination: 'server',
        clickToSelect: true,
        columns: [
            {
                field: 'conver',
                title: '月支付转化率',
                align: 'center',
                valign: 'middle',
                sortable: false
            },
            {
                field: 'operating',
                title: '操作',
                align: 'center',
                valign: 'middle',
                switchable: false,
                formatter: operateFormatterIc,
                events: operateEventsIc
            }
        ]
    });
}

function operateFormatterIc(value, row, index) {
    return [ '<a class="remove m-left-5" href="javascript:void(0)" title="删除">',
             '<i class="glyphicon glyphicon-remove"></i>', '</a>', ].join('');
}

window.operateEventsIc = {
    'click .remove': function (e, value, row, index) {
        if (window.confirm("确定要删除吗？")) {
            var pageurl = "/cm/channel/delInterfaceCharge?";
            var pageurlparameter = "id=" + row.id;
            $.ajax({
                url: pageurl + pageurlparameter,
                type: 'post',
                async: true,
                error: function () {
                    alertmsg("Connection error");
                },
                success: function (data) {
                	alertmsg(data);
                	if (data == "success") {
	                	pageurl = "/cm/channel/getInterfaceCharge?";
	                    pageurlparameter = "agreementinterfaceid=" + $("#agreementinterfaceid").val();
	                    $('#interChargeTable').bootstrapTable('refresh', {url: pageurl + pageurlparameter});
                	}
                }
            });
        } 
    }
};

function saveInterfaceCharge() {
	if (!checkSaveInterface()) {
		return false;
	}
	var pageurl = "/cm/channel/saveInterfaceCharge";
	$.ajax({
        url: pageurl,
        type: 'post',
        data: $("#chargesourceform").serialize(),
        async: true,
        error: function () {
            alertmsg("Connection error");
        },
        success: function (data) {
        	alertmsg(data);
        	if (data == "success") {
        		$('#chargesource').modal('hide');
            	pageurl = "/cm/channel/getInterfaceCharge?";
                var pageurlparameter = "agreementinterfaceid=" + $("#agreementinterfaceid").val();
                $('#interChargeTable').bootstrapTable('refresh', {url: pageurl + pageurlparameter});
        	} 
        }
    });
}

function checkConverstart() {
	if ($.trim($("#converstart").val()) == "") {
		alertmsg("不能为空！");
		return false;
	}
	if ( isNaN($("#converstart").val()) ) {
		alertmsg("请输入数字！");
		return false;
	}
	return true;
}

function checkConverend() {
	if ($.trim($("#converend").val()) == "") {
		alertmsg("不能为空！");
		return false;
	}
	if ( isNaN($("#converend").val()) ) {
		alertmsg("请输入数字！");
		return false;
	}
	return true;
}

function checkCharge() {
	if ($.trim($("#charge").val()) == "") {
		alertmsg("不能为空！");
		return false;
	}
	if ( isNaN($("#charge").val()) ) {
		alertmsg("请输入数字！");
		return false;
	}
	return true;
}

function checkSaveInterface() {
	if (checkConverstart() && checkConverend() && checkCharge()) {
		return true;
	} else {
		return false;
	}
}