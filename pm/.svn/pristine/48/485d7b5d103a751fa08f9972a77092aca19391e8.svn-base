<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title> 各应用平台对账管理</title>
<link href="${staticRoot}/css/appmodule.css" rel="stylesheet">
<link href="${staticRoot}/css/system/flat-ui-icon.css" rel="stylesheet">
<link href="../static/css/lib/bootstrap.min.css" rel="stylesheet"	media="screen">
<link rel="stylesheet" type="text/css" media="screen" href="../static/css/lib/jquery-ui.css" />
<script data-main="../static/js/load" src="../static/js/lib/require.min.js"></script>
<script type="text/javascript">
	requirejs([ "payment/appReconciliation" ]);
</script>
</head>
<body>
	<div class="container-fluid">
		<form role="form" id="customerform">
			<div class="panel panel-default m-bottom-5">
				<div class="panel-body">
					<div class="col-md-12">
						<form class="form-inline" role="form" id="userform">
							<div class="row">
								<div class="form-group form-inline col-md-4">
									<label class="col-md-5 control-label">应用平台名称：</label> <input
									class="form-control m-left-1" type="text"	id="platformName" name="platformName">
								</div>
								<div class="form-group form-inline col-md-4">
									<label class="col-md-5 control-label">查询月份：</label> <input
									class="form-control date form_month" type="text"	id="querymonth" name="querymonth">
								</div>
								<div class="form-group form-inline col-md-4">
									<label class="col-md-5 control-label">查询日期：</label> <input
										class="form-control date form_date" type="text"	id="querydate" name="querydate">
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="panel-footer">
				<button id="querybutton" type="button" name="querybutton"
					class="btn btn-primary">查询</button>
				<button id="detailquerybutton" type="button" name="detailquerybutton"
					class="btn btn-primary">详细查询</button>
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
						<div class="col-md-12" >
							<table id="appCheckPolicy"></table>
						</div>
					</div>
				</div>
				<div class="panel-footer"></div>
			</div>
		</form>
	</div>
</body>



</html>
