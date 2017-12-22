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
	requirejs([ "payment/audit" ]);
</script>
</head>
<body>
	<div class="container-fluid">
		<form role="form" id="customerform">
			<div class="panel panel-default m-bottom-5"  style="width:1320px;">
				<div class="panel-body">
					<div class="col-md-12">
						<div class="row">
							<div class="form-group form-inline col-md-6">
								<label class="col-md-6 control-label">总入账金额：${selectdate!''}</label>
								<input type="hidden" id="selectdate" name="selectdate" value="${selectdate!''}" >
							</div>
						</div>
						<div class="row">
							<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-4 control-label">订单号：</label> 
							<input type="text" 
								class="form-control col-md-4" id="orderid" name="orderid" >
							</div>
							<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">总平台名称：</label> 
							<input type="text" 
								class="form-control col-md-4" id="platform_name" name="platform_name" >
							</div>
							<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">应用平台名称：</label> 
							<input type="text" 
								class="form-control col-md-4" id="app_name" name="app_name"  >
							</div>
						</div>
					</div>
				</div>
				<div class="panel-footer">
					<button id="querybtn" type="button" name="querybtn"
						class="btn btn-primary">查询</button>
					<button id="resetbtn" type="button" name="resetbtn"
						class="btn btn-primary">重置</button>
					<button class="btn btn-primary" type="button" name="refresh"
						title="Refresh" id="refreshbtn">
						<i class="glyphicon glyphicon-refresh icon-refresh"></i>
					</button>
					<button class="btn btn-primary" type="button" name="toggle"
						title="Toggle" id="togglebtn">
						<i class="glyphicon glyphicon-list-alt icon-list-alt"></i>
					</button>
					<button  type="button"  id="downdetail" class="btn btn-primary">明细导出</button>
					<button  type="button"  id="go_back" class="btn btn-primary">返回</button>
				</div>
			</div>
			<div class="panel panel-default"  style="width:1320px;">
				<div class="panel-body">
					<div id="div1" class="table">
						<div class="col-md-12"   style="width:1300px;">
							<table id="detailPolicy"></table>
						</div>
					</div>
				</div>
				<div class="panel-footer"></div>
			</div>
		</form>
	</div>
</body>



</html>
