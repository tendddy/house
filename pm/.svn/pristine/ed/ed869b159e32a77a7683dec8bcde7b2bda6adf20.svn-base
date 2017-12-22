<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="${staticRoot}/css/appmodule.css" rel="stylesheet">
<script data-main="${staticRoot}/js/load"
	src="${staticRoot}/js/lib/require.min.js"></script>
<script data-main="${staticRoot}/js/load"
	src="${staticRoot}/js/lib/jquery.min.js"></script>
<script data-main="${staticRoot}/js/load"
	src="${staticRoot}/js/lib/fileupload/ajaxfileupload.js"></script>
<title>查看订单详细信息</title>
<link href="${staticRoot}/css/system/flat-ui-icon.css" rel="stylesheet">
<link href="../static/css/lib/bootstrap.min.css" rel="stylesheet"
	media="screen">
<script type="text/javascript">
	requirejs([ "payment/orders" ]);
</script>
</head>
<body>
	<div class="container-fluid">
		<div class="panel panel-default m-bottom-5" >
			<div class="panel-heading padding-5-5">订单详细信息：</div>
			<div class="panel-body">
				<form id="addprotocolform">
					<div class="row">
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">应用平台名称：</label>
							<input type="text" class="form-control m-left-1"
								id="app_name" name="app_name" value="${app_name!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">应用平台订单号：</label>
							<input type="text" class="form-control m-left-1"
								id="app_orderid" name="app_orderid" value="${app_orderid!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">支付平台：</label>
							<input type="text" class="form-control m-left-1"
								id="platform_name" name="platform_name" value="${platform_name!''}"
								readOnly>
						</div>
					</div>
					<div class="row">
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">应用用户id：</label>
							<input type="text" class="form-control m-left-1"
								id="app_user_id" name="app_user_id" value="${app_user_id!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">银行编码：</label>
							<input type="text" class="form-control m-left-1"
								id="bankcode" name="bankcode" value="${bankcode!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">银行名称：</label>
							<input type="text" class="form-control m-left-1"
								id="bankname" name="bankname" value="${bankname!''}"
								readOnly>
						</div>
					</div>
					<div class="row">
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">卡类型：</label>
							<input type="text" class="form-control m-left-1"
								id="card_type" name="card_type" value="${card_type!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">手机号：</label>
							<input type="text" class="form-control m-left-1"
								id="customphone" name="customphone" value="${customphone!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">银行卡号：</label>
							<input type="text" class="form-control m-left-1"
								id="customcardno" name="customcardno" value="${customcardno!''}"
								readOnly>
						</div>
					</div>
					<div class="row">
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">有效日期：</label>
							<input type="text" class="form-control m-left-1"
								placeholder="信用卡有效日期" id="validdate" name="validdate" value="${validdate!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">安全码：</label>
							<input type="text" class="form-control m-left-1"
								placeholder="信用卡安全码" id="cvn2" name="cvn2" value="${cvn2!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">支付订单号：</label>
							<input type="text" class="form-control m-left-1"
								id="orderid" name="orderid" value="${orderid!''}"
								readOnly>
						</div>
					</div>
					<div class="row">
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">绑卡流水号：</label>
							<input type="text" class="form-control m-left-1"
								id="protocolid" name="protocolid" value="${protocolid!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">支付流水号：</label>
							<input type="text" class="form-control m-left-1"
								id="payprotocolid" name="payprotocolid" value="${payprotocolid!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">订单提交时间：</label>
							<input type="text" class="form-control m-left-1"
								id="orderdatetime" name="orderdatetime" value="${orderdatetime!''}"
								readOnly>
						</div>
					</div>
					<div class="row">
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">订单金额：</label>
							<input type="text" class="form-control m-left-1"
								id="orderfee" name="orderfee" value="${orderfee!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">实际支付金额：</label>
							<input type="text" class="form-control m-left-1"
								id="payfee" name="payfee" value="${payfee!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">订单状态：</label>
							<input type="text" class="form-control m-left-1"
								id="status" name="status" value="${status!''}"
								readOnly>
						</div>
					</div>
					<div class="row">
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">支付结果回调地址：</label>
							<input type="text" class="form-control m-left-1"
								id="receiveurl" name="receiveurl" value="${receiveurl!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">用户信息回调地址：</label>
							<input type="text" class="form-control m-left-1"
								id="userinfourl" name="userinfourl" value="${userinfourl!''}"
								readOnly>
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">支付类型：</label>
							<input type="text" class="form-control m-left-1"
								id="pay_type" name="pay_type" value="${pay_type!''}"
								readOnly>
						</div>
					</div>
					<div class="panel-footer">
						<button type="button" id="go_back" class="btn btn-primary">返回</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>
