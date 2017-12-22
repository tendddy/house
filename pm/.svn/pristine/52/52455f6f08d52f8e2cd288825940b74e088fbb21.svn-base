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
<title>添加银行</title>
<link href="${staticRoot}/css/system/flat-ui-icon.css" rel="stylesheet">
<link href="../static/css/lib/bootstrap.min.css" rel="stylesheet"
	media="screen">
<script type="text/javascript">
	requirejs([ "payment/banksconfig" ]);
</script>
</head>
<body>
	<div class="container-fluid">
		<div class="panel panel-default m-bottom-5" style="width: 1166px;">
			<div class="panel-heading padding-5-5">银行定义：
			银行卡优先级最大值：${maxbankOrder!''}
			</div>
			<div class="panel-body">
				<form id="addbanksform">
						<div class="row">
						<div class="form-group form-inline col-md-4">
							<input id="banksid" name="banksid" type="hidden"
								value="${banksid!''}" /> <label for="examplechannel_code"
								class="col-md-5 control-label">银行代码：</label> <input type="text"
								class="form-control m-left-1" id="bankCode" name="bankCode"
								placeholder="系统自动生成" readonly value="${bankCode!''}"
								class="required">
						</div>
					<div class="form-group form-inline col-md-4">
							<label for="exampleInputCode" class="col-md-5 control-label">渠道类型：</label>
							<select name="channelType" class="form-control m-left-1"
								id="channelType" class="required ">
								<option value=""></option>
								<option value="01">银行</option>
								<option value="02">其他</option>
							</select> 
							<input type="hidden" id="channelTypes"
								value="${channelType!''}" />
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="exampleInputCode" class="col-md-5 control-label">银行状态：</label>
							<select name="status" class="form-control m-left-1" id="status"
								class="required" value="${status!''}">
								<option value=""></option>
								<option value="0">启用</option>
								<option value="1">禁用</option>
							</select> <input type="hidden" id="statuss" value="${status!''}" />
						</div>
					</div>	
					<div class="row">
                        <div class="form-group form-inline col-md-4">
							<label for="examplechannel_name" class="col-md-5 control-label">银行名称：</label>
							<input type="text" class="form-control m-left-1"
								id="bankName" name="bankName" value="${bankName!''}"
								class="required">
						</div>
						<div class="form-group form-inline col-md-4">
							<label for="examplechannelCode" class="col-md-5 control-label">银行卡优先级：</label>
							<input type="text" class="form-control m-left-1"
								id="bankOrder" name="bankOrder" value="${bankOrder!''}"
								class="required">
						</div>
						<div class="form-group form-inline col-md-3">
						    <label for="examplechannel_name" class="col-md-5 control-label">银行logo：</label>
						    <label  for="examplechannel_name" class="col-md-5 control-label" id="shangchuan">
						    <a style="cursor:pointer;">上传</a></label>
							   <div id="localImag" style="display:none;">
							     <img id="preview"  style="cursor:pointer;display:block;width:138px;height:33px;">
				               </div>
							<input  type="file" class="form-control m-left-1" 
							id="file" name="file"  style="display:none;"/>
				            <input type="hidden" class="form-control m-left-5"  id="bankLogo">					
						</div>
					</div>
					<div class="row">
						<div class="form-group form-inline col-md-10" align="right">
							<button id="savebanks" type="button" name="savebanks"
								class="btn btn-primary">保存</button>
							<button type="button" id="cancelform" style="display: none;"
								class="btn btn-primary">取消</button>
							<button type="button" id="modifyform" style="display: none;"
								class="btn btn-primary">修改</button>
							<button type="button" id="go_back" class="btn btn-primary">返回</button>
						</div>
					</div>
				</form>
			</div>
		</div>