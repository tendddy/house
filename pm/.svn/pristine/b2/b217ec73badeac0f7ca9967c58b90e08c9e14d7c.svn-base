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
	requirejs([ "payment/platformReconciliation" ]);
</script>
</head>
<body>
	<div class="container-fluid">
		<form role="form" id="customerform">
			<div class="panel panel-default m-bottom-5">
				<div class="panel-body">
					<div class="col-md-12">
						<div class="row">
							<div class="form-group form-inline col-md-5">
									<label class="col-md-5 control-label">第三方支付名称：</label> <input type="text" 
									class="form-control m-left-1" id="platformName" name="platformName"  >
							</div>
							<div class="form-group form-inline col-md-5">
									<label class="col-md-5 control-label">第三方支付：</label> <input type="text" 
									class="form-control m-left-1" id="platformName" name="platformName"  >
							</div>
						</div>
						<div class="row">
							<div class="form-group form-inline col-md-5">
								<label class="col-md-5 control-label">状态：</label> 
								<select name="status" class="form-control m-left-1" id="status" >
									<option value=""></option>
									<option value="0">禁用</option>
									<option value="1">开启</option>
								</select>
							</div>
							<div class="form-group form-inline col-md-5">
								<label class="col-md-5 control-label">合并支付：</label>
								<select name="status" class="form-control m-left-1" id="status"  >
									<option value=""></option>
									<option value="0">停用</option>
									<option value="1">开启</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="form-group form-inline col-md-5">
									<label class="col-md-5 control-label">平台优先级：</label> <input type="text" 
									class="form-control m-left-1" id="platformName" name="platformName"  >
							</div>
							<div class="form-group form-inline col-md-5">
								<label class="col-md-5 control-label">应用终端：</label>
								<select name="status" class="form-control m-left-1" id="status"  >
									<option value=""></option>
									<option value="0">停用</option>
									<option value="1">开启</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="form-group form-inline col-md-5">
								<label class="col-md-5 control-label">收款方：</label>
								<select name="status" class="form-control m-left-1" id="status"    >
									<option value=""></option>
									<option value="0">停用</option>
									<option value="1">开启</option>
								</select>
							</div>
							<div class="form-group form-inline col-md-5">
								<label class="col-md-5 control-label">支付类型：</label>
								<select name="status" class="form-control m-left-1" id="status" >
									<option value=""></option>
									<option value="0">停用</option>
									<option value="1">开启</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="panel panel-default m-bottom-5">
				<div class="panel-body" >
						<div class="row">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">银行名称：</label> <input type="text"
									class="col-md-3 form-control" id="channel_name" name="channel_name">
							</div>
							<div class="form-group form-inline col-md-3">
								<label for="exampleInputCode" class="col-md-5 control-label">卡类型：</label> 
								<select name="card_type" class="col-md-3 form-control" id="card_type">
									<option value=""></option>
									<option value="0">储蓄卡</option>
									<option value="1">信用卡</option>
								</select>
							</div>
						</div>
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
				</div>
				<div class="panel panel-default">
					<div class="panel-body">
						<div id="div1" class="table">
							<div class="col-md-12" >
								<table id="taskapplPolicy"></table>
							</div>
						</div>
					</div>
					<div class="panel-footer"></div>
				</div>
			</div>
		</form>
	</div>
</body>



</html>
