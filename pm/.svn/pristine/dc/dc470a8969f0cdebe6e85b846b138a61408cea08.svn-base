<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商联绑卡对账</title>
<link href="${staticRoot}/css/appmodule.css" rel="stylesheet">
<link href="${staticRoot}/css/system/flat-ui-icon.css" rel="stylesheet">
<link href="../static/css/lib/bootstrap.min.css" rel="stylesheet"	media="screen">
<link rel="stylesheet" type="text/css" media="screen" href="../static/css/lib/jquery-ui.css" />
<script data-main="../static/js/load" src="../static/js/lib/require.min.js"></script>
<script type="text/javascript">
	requirejs([ "payment/checkbindcard" ]);
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
								<label class="col-md-5 control-label">银行名称：</label> <input
								class="form-control m-left-1" type="text"	id="bankName" name="bankName">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">卡类型：</label>
								<select name="cardType" class="form-control m-left-1" id="cardType" >
									<option value=""></option>
									<option value="10">储蓄卡</option>
									<option value="20">信用卡</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">银行卡号：</label> <input
								class="form-control m-left-1" type="text"	id="customcardno" name="customcardno">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">姓名：</label> <input
								class="form-control m-left-1" type="text"	id="customname" name="customname">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">身份证号：</label> <input
								class="form-control m-left-1" type="text"	id="identificationNumber" name="identificationNumber">
							</div>
						</div>
						<div class="row">
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">手机号：</label> <input
								class="form-control m-left-1" type="text"	id="customphone" name="customphone">
							</div>
							<div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">状态：</label>
								<select name="status" class="form-control m-left-1" id="status" >
									<option value=""></option>
									<option value="0">暂存</option>
									<option value="1">已绑定</option>
									<option value="3">绑定失败</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="form-group form-inline col-md-4">
									<label class="col-md-5 control-label">起始日期：</label> <input
										class="form-control date form_datetime" type="text"	id="startdate" name="startdate">
							</div>
							<div class="form-group form-inline col-md-4">
									<label class="col-md-5 control-label">结束日期：</label> <input
										class="form-control date form_datetime" type="text"	id="enddate" name="enddate">
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
							<table id="bindcardPolicy"></table>
						</div>
					</div>
				</div>
				<div class="panel-footer"></div>
			</div>
		</form>
	</div>
</body>



</html>
