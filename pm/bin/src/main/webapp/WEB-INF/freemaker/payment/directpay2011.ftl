<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>2011-直接支付</title>
<link href="${staticRoot}/css/appmodule.css" rel="stylesheet">
<link href="${staticRoot}/css/system/flat-ui-icon.css" rel="stylesheet">
<link href="${staticRoot}/css/lib/bootstrap.min.css" rel="stylesheet"	media="screen">
<link rel="stylesheet" type="text/css" media="screen" href="${staticRoot}/css/lib/jquery-ui.css" />
<script data-main="${staticRoot}/js/load" src="${staticRoot}/js/lib/require.min.js"></script>
<script data-main="${staticRoot}/js/load" src="${staticRoot}/js/lib/common.js"></script>
<script type="text/javascript">
	requirejs([ "payment/directpay2011" ]);
</script>
</head>
<body>
	<div class="container-fluid">
		<form role="form" id="customerform">
			<div class="panel panel-default m-bottom-5">
				<div class="panel-body">
					<div class="col-md-12">
						<div class="row">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">应用平台名称：</label> <input
								class="form-control m-left-1" type="text"	id="platformName" name="platformName">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">应用平台订单号：</label> <input
								class="form-control m-left-1" type="text"	id="appOrderId" name="appOrderId">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">系统订单号：</label> <input
								class="form-control m-left-1" type="text"	id="orderid" name="orderid">
							</div>
						</div>
						<div class="row">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">绑卡流水号：</label> <input
								class="form-control m-left-1" type="text"	id="protocolid" name="protocolid">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">支付流水号：</label> <input
								class="form-control m-left-1" type="text"	id="payProtocolid" name="payProtocolid">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">订单金额：</label> <input
								class="form-control m-left-1" type="text"	id="orderfee" name="orderfee" 
								onkeyup="constraintMoneyLength(12,2);" onblur="constraintMoneyLength(12,2);">
							</div>
						</div>
						<div class="row">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">订单日期起：</label> <input
									class="form-control date form_date" type="text"	id="startdate" name="startdate">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">订单日期止：</label> <input
									class="form-control date form_date" type="text"	id="enddate" name="enddate">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">应用平台用户ID：</label> <input
								class="form-control m-left-1" type="text"	id="appUserId" name="appUserId">
							</div>
						</div>
						<div class="row">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">状态：</label>
								<select name="status" class="form-control m-left-1" id="status" >
									<option value=""></option>
									<option value="0">待支付</option>
									<option value="1">支付中</option>
									<option value="2">支付成功</option>
									<option value="3">支付失败</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="panel-footer">
				<button id="querybutton" type="button" name="querybutton"
					class="btn btn-primary">查询</button>
				<button id="resetbutton" type="button" name="resetbutton"
					class="btn btn-primary">重置</button>
				<button class="btn btn-primary" type="button" name="refresh"
					title="Refresh" id="refresh">
					<i class="glyphicon glyphicon-refresh icon-refresh"></i>
				</button>
				<button class="btn btn-primary" type="button" name="toggle"
					title="Toggle" id="toggle">
					<i class="glyphicon glyphicon-list-alt icon-list-alt"></i>
				</button>
			</div>
			</div>
			<div class="panel panel-default">
				<div class="panel-body">
					<div id="div1" class="table">
						<div class="col-md-16" >
							<table id="directpay2011Policy"></table>
						</div>
					</div>
				</div>
				<div class="panel-footer"></div>
			</div>
		</form>
	</div>
</body>



</html>
