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
	requirejs([ "payment/settlepay1361" ]);
</script>
</head>
<body>
	<div class="container-fluid">
			<div class="panel panel-default m-bottom-5">
				<div class="panel-body" style="border-top: 1px solid #ddd;">
					<div class="col-md-12">
						<input type="hidden" id="paymentid" name="paymentid" value="${paymentid!''}">
						<input type="hidden" id="id" name="id" value="${id!''}">
						<div class="row">
							<div>
								<label class="col-md-5 control-label">请求参数：</label>
								<xmp class="col-sm-12 control-label" id="request_params" style="text-align: left;font-size:12px;word-wrap:break-word;">${request_params!''}</xmp>
							</div>
						</div>
						<div class="row">
							<div>
								<label class="col-md-5 control-label">响应信息：</label>
								<xmp class="col-sm-12 control-label" id="response_params" style="text-align: left;font-size:12px;word-wrap:break-word;">${response_params!''}</xmp>
							</div>
						</div>
						<div class="row">
							<div>
								<label class="col-md-5 control-label">备注：</label>
								<xmp class="col-sm-12 control-label" id="remark" style="text-align: left;font-size:12px;word-wrap:break-word;">${remark!''}</xmp>
							</div>
						</div>
					</div>
				</div>
				<div class="panel-footer">
					<button  type="button"  id="go_back" class="btn btn-primary">返回</button>
					<button  type="button"  id="visit_again" class="btn btn-primary">再次访问</button>
				</div>
			</div>
	</div>
</body>



</html>
