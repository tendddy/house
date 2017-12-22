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
						<div class="row">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-4 control-label">总入账金额：</label> <input type="text" 
								class="form-control m-left-1" id="totalFormoneys" name="totalFormoneys" value="${totalFormoneys!''}" readonly  >
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-4 control-label">总出账金额：</label><input type="text" 
								class="form-control m-left-1" id="totalOutmoneys" name="totalOutmoneys" value="${totalOutmoneys!''}" readonly >
							</div>
						</div>
					</div>
				</div>
				<input type="hidden" id="platformid" name="platformid" value="${platformid!''}">
				<input type="hidden" id="querydate" name="querydate" value="${querydate!''}">
				<input type="hidden" id="startdateup" name="startdateup" value="${startdateup!''}">
				<input type="hidden" id="enddatedown" name="enddatedown" value="${enddatedown!''}">
				<div class="panel-body" style="border-top: 1px solid #ddd;">
					<div class="col-md-12">
						<div class="row">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-4 control-label">查询日期起：</label> <input
									class="form-control date form_date" type="text"	id="startdate" name="startdate" value="${startdateup!''}">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-4 control-label">查询日期止：</label> <input
									class="form-control date form_date" type="text"	id="enddate" name="enddate" value="${enddatedown!''}">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-4 control-label">订单号：</label><input type="text" 
								class="form-control m-left-1" id="orderid" name="orderid" >
							</div>
						</div>
						<div class="row">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-4 control-label">支付号：</label><input type="text" 
								class="form-control m-left-1" id="corpuserid" name="corpuserid" >
							</div>
						</div>
					</div>
				</div>
				<div class="panel-footer">
				<button id="querybtn" type="button" name="querybtn"
					class="btn btn-primary">查询</button>
				<button id="resetbtn" type="button" name="resetbtn"
					class="btn btn-primary">重置</button>
				<button class="btn btn-primary" type="button" name="refreshbtn"
					title="Refresh" id="refreshbtn">
					<i class="glyphicon glyphicon-refresh icon-refresh"></i>
				</button>
				<button class="btn btn-primary" type="button" name="togglebtn"
					title="Toggle" id="togglebtn">
					<i class="glyphicon glyphicon-list-alt icon-list-alt"></i>
				</button>
				<button  type="button"  id="go_back" class="btn btn-primary">返回</button>
			</div>
			</div>
			<div class="panel panel-default">
				<div class="panel-body">
					<div id="div1" class="table">
						<div class="col-md-12" >
							<table id="appordersPolicy"></table>
						</div>
					</div>
				</div>
				<div class="panel-footer"></div>
			</div>
		</form>
	</div>
</body>



</html>
