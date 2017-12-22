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
	requirejs([ "payment/settlementfee" ]);
</script>
</head>
<body>
	<div class="container-fluid">
			<div class="panel panel-default m-bottom-5">
				<div class="panel-body" style="border-top: 1px solid #ddd;">
					<div class="col-md-12">
						<div class="row">
							<div class="form-group form-inline col-md-4">
								<input type="hidden" id="appid" name="appid" value="${appid!''}">
								<label class="col-md-5 control-label">应用平台名称：</label> <input type="text" 
								class="form-control m-left-1" id="platformName" name="platformName" readonly value="${platformName!''}">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">结算状态：</label>
								<select name="statementStatus" class="form-control m-left-1" id="statementStatus" >
									<option value=""></option>
									<option value="0">应结</option>
									<option value="1">已结</option>
								</select>
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">应结时间：</label> <input
									class="form-control date form_date" type="text"	id="settleDate" name="settleDate">
							</div>
						</div>
						<div class="row">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">订单号：</label> <input type="text" 
								class="form-control m-left-1" id="orderid" name="orderid" >
							</div>
							<div class="form-group form-inline col-md-4">
								<label for="email" class="col-md-5 control-label">结算周期：</label> <select
								name="settlementInterval" class="form-control m-left-1"
								id="settlementInterval">
								<option value=""></option>
								<option value="0">实时</option>
								<option value="1">每月</option>
							</select>
							</div>
						</div>
					</div>
				</div>
				<div class="panel-footer">
						<button id="querybtn" type="button" name="querybtn"
							class="btn btn-primary">结算轨迹查询</button>
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
						<button id="handlebtn" type="button" name="handlebtn" style="float:right;"
							class="btn btn-primary">结算处理</button>
						<div class="form-group form-inline col-md-4" style="float:right;">
							<label class="control-label">结算月份：</label><input 
							class="form-control date form_month" type="text" id="settleMonth" name="settleMonth">
						</div>
				</div>
			</div>
			<div class="panel panel-default">
				<div class="panel-body">
					<div id="div1" class="table">
						<div class="col-md-12" >
							<table id="detailPolicy"></table>
						</div>
					</div>
				</div>
				<div class="panel-footer">
				</div>
			</div>
	</div>
</body>



</html>
