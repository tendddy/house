<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>详细</title>
<link href="${staticRoot}/css/appmodule.css" rel="stylesheet">
<link href="${staticRoot}/css/system/flat-ui-icon.css" rel="stylesheet">
<link href="../static/css/lib/bootstrap.min.css" rel="stylesheet"	media="screen">
<link rel="stylesheet" type="text/css" media="screen" href="../static/css/lib/jquery-ui.css" />
<script data-main="../static/js/load" src="../static/js/lib/require.min.js"></script>
<script data-main="${staticRoot}/js/load"
	src="${staticRoot}/js/lib/jquery.min.js"></script>
	<script data-main="${staticRoot}/js/load"
	src="${staticRoot}/js/lib/common.js"></script>
<script data-main="${staticRoot}/js/load"
	src="${staticRoot}/js/lib/fileupload/ajaxfileupload.js"></script>
<script type="text/javascript">
	requirejs([ "payment/settlementfee" ]);
</script>
</head>
<body>
	<div class="container-fluid">
			<div class="panel panel-default m-bottom-5" >
			  	<div class="panel-body">
					<div class="row" style="padding-bottom:5px;">
							<input type="hidden" id="id" name="id" value="${id!''}">
							<input type="hidden" id="appid" name="appid" value="${appid!''}">
							<input type="hidden" id="settleMonth" name="settleMonth" value="${settleMonth!''}">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-4 control-label">结算状态：</label> <input type="text"
									class="col-md-3 form-control" id="statementStatus" name="statementStatus" value="${statementStatus!''}" readonly>
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-4 control-label">应结算金额：</label> <input type="text"
									class="col-md-3 form-control" id="settleTotalfee" name="settleTotalfee" value="${settleTotalfee!''}" readonly>
							</div>
					</div>
					<div class="row" style="padding-bottom:5px;">
							<div class="form-group form-inline col-md-5">
								<label class="col-md-3 control-label">选择附件：</label> <input type="file"
									class=" form-control" id="uploadfile" name="uploadfile">
							</div>
							<button  type="button"  id="uploadbutton" class="btn btn-primary">上传</button>
					</div>
					<div id="row" class="table">
						<div class="fixed-table-container" style="width:600px;">
							<table class="table table-hover table-striped">
								<tr style="border-left: 1px solid #dddddd;" class="enclosure">
									<td style="text-align: center; vertical-align: middle;width:50px; ">序号</td>
									<td style="text-align: center; vertical-align: middle;width:300px; ">附件名称</td>
									<td style="text-align: center; vertical-align: middle;width:90px; ">上传人</td>
									<td style="text-align: center; vertical-align: middle;width:80px; ">操作</td>
								</tr>
								${attachdiv!''}
							</table>
						</div>
					</div>
					<div class="row" style="padding-bottom:5px;">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">银行账户：</label> <input type="text"
									class="col-md-3 form-control" id="settlementCard" name="settlementCard" value="${settlementCard!''}">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">结算金额：</label> <input type="text"
									class="col-md-3 form-control" id="settlementTotalfee" name="settlementTotalfee" value="${settlementTotalfee!''}" 
									onkeyup="constraintMoneyLength(12,2);" onblur="constraintMoneyLength(12,2);">
							</div>
					</div>
					<div class="row" style="padding-bottom:5px;padding-right:50px;float:right;">
						<button  type="button"  id="savebutton" class="btn btn-primary">保存</button>
						<button  type="button"  id="go_back_detail" class="btn btn-primary">返回</button>
					</div>
				</div>
			</div>
	</div>
</body>



</html>
