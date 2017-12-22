<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>订单查询</title>
<link href="${staticRoot}/css/appmodule.css" rel="stylesheet">
<link href="${staticRoot}/css/system/flat-ui-icon.css" rel="stylesheet">
<link href="../static/css/lib/bootstrap.min.css" rel="stylesheet"	media="screen">
<link rel="stylesheet" type="text/css" media="screen" href="../static/css/lib/jquery-ui.css" />
<script data-main="../static/js/load" src="../static/js/lib/require.min.js"></script>
<script type="text/javascript">
	requirejs([ "payment/orders" ]);
</script>
</head>
<body>
	<div class="container-fluid">
		<form role="form" id="customerform">
			<div class="panel panel-default m-bottom-5">
				<div class="panel-heading padding-5-5">订单信息查询</div>
				<div class="panel-body">
					<div class="col-md-12">
							<div class="row">
								<div class="form-group form-inline col-md-4">
									<label class="col-md-5 control-label">应用平台名称：</label> <input type="text"
										class="col-md-3 form-control" id="platformName" name="platformName">
								</div>
								<div class="form-group form-inline col-md-4">
									<label class="col-md-5 control-label">订单号：</label> <input type="text"
										class="col-md-3 form-control" id="appOrderid" name="appOrderid">
								</div>
								<div class="form-group form-inline col-md-4">
									<label class="col-md-5 control-label">订单状态：</label>
									<select name="status" class="form-control m-left-3" id="status" >
										<option value=""></option>
										<option value="0">待支付</option>
										<option value="1">支付中</option>
										<option value="2">支付成功</option>
										<option value="3">支付失败</option>
										<option value="4">支付取消</option>
									</select>
								</div>
							</div>
							<div class="row">
								<div class="form-group form-inline col-md-4">
									<label class="col-md-5 control-label">支付日期起：</label> <input
										class="form-control date form_date" type="text"	id="startdate" name="startdate">
								</div>
								<div class="form-group form-inline col-md-4">
									<label class="col-md-5 control-label">支付日期止：</label> <input
										class="form-control date form_date" type="text"	id="enddate" name="enddate">
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
				<div class="panel-heading padding-5-5"></div>
				<div class="panel-body">
					<div id="div1" class="table">
						<div class="col-md-12">
							<table id="ordersPolicy"></table>
						</div>
					</div>
				</div>
				<div class="panel-footer"></div>
			</div>
		</form>
	</div>
</body>



</html>
