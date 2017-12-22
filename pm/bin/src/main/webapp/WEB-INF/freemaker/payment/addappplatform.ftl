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
	src="${staticRoot}/js/lib/common.js"></script>
<title>应用平台</title>
<link href="${staticRoot}/css/system/flat-ui-icon.css" rel="stylesheet">
<link href="../static/css/lib/bootstrap.min.css" rel="stylesheet" media="screen">
<script type="text/javascript">
	requirejs([ "payment/configure"]);
</script>
</head>
<body>
	<div class="container-fluid">
		<div class="panel panel-default m-bottom-5" style="width:1220px;">
		  <div class="panel-heading padding-5-5">应用平台定义：</div>
		  <div class="panel-body">
				<form  id="configform" >
				<div class="alert alert-danger" role="alert" id="showerrormessage" style="display: none;"></div>
				<div class="row">
					<div class="form-group form-inline col-md-4">
						<input id="platformid" name="platformid" type="hidden" value="${platformid!''}"/>
						<label for="examplechannel_code" class="col-md-5 control-label">应用平台代码：</label> 
							<input type="text" class="form-control m-left-1" id="platformNo" name="platformNo" placeholder="系统自动生成" readonly value="${platformNo!''}" class="required">
					</div>
					<div class="form-group form-inline col-md-4">
						<label for="examplechannel_name" class="col-md-5 control-label">应用平台名称：</label> 
						<input type="text" 
							class="form-control m-left-1" id="platformName" name="platformName" value="${platformName!''}" class="required">
					</div>
					<div class="form-group form-inline col-md-4">
						<label for="exampleInputCode" class="col-md-5 control-label">合并支付：</label>
						<select name="app_id" class="form-control m-left-1" id="app_id" >
							<option value=""></option>
							<option value="0">支持</option>
							<option value="1">不支持</option>
						</select>
					</div>
				</div>
				<div class="row">
					<div class="form-group form-inline col-md-4">
						<label for="exampleInputCode" class="col-md-5 control-label">应用平台状态：</label> 
						<select name="status" class="form-control m-left-1" id="status" class="required " >
							<option value=""></option>
							<option value="0">开启</option>
							<option value="1">禁用</option>
						</select>
						<input  type="hidden" id="statuss"  value="${status!''}"/>
					</div>
					<div class="form-group form-inline col-md-4">
						<label for="exampleInputCode" class="col-md-5 control-label">结算类型：</label> 
						<select name="settlementType" class="form-control m-left-1" id="settlementType" class="required " >
							<option value=""></option>
							<option value="1">按笔实时结算</option>
							<option value="2">按笔后续结算</option>
							<option value="3">固定金额结算</option>
						</select>
						<input  type="hidden" id="settlementTypes"  value="${settlementType!''}"/>
					</div>	
					<div class="form-group form-inline col-md-4">
						<label for="email" class="col-md-5 control-label">结算周期：</label>
						<select name="settlementInterval" class="form-control m-left-1" id="settlementInterval" class="required"  value="${settlementInterval!''}">
							<option value=""></option>
							<option value="0">实时</option>
							<option value="1">每月</option>
						</select>
						<input  type="hidden" id="settlementIntervals"  value="${settlementInterval!''}"/>
					</div>
				</div>
				<div class="row">
					<div class="form-group form-inline col-md-4">
						<label for="examplechannel_code" class="col-md-5 control-label">结算银行：</label> 
							<input type="text" class="form-control m-left-1" id="settlementBank" name="settlementBank" value="${settlementBank!''}" class="required">
					</div>
					<div class="form-group form-inline col-md-4">
						<label for="examplechannel_name" class="col-md-5 control-label">账户号码：</label> 
						<input type="text" class="form-control m-left-1" id="settlementCard" name="settlementCard" value="${settlementCard!''}" class="required">
					</div>
					<div class="form-group form-inline col-md-4">
						<label for="examplechannel_name" class="col-md-5 control-label">平台域名：</label> 
						<input type="text" class="form-control m-left-1" id="domain" name="domain" value="${domain!''}" placeholder="以http://开始" class="required">
					</div>
					</div>
					<div class="row">
					  <div class="form-group form-inline col-md-4">
						<label for="examplechannel_code" class="col-md-5 control-label">最低收费：</label> 
							<input type="text" class="minimumAmounts form-control m-left-1" id="minimumAmount" name="minimumAmount" 
							value="${minimumAmount!''}" class="required"
							onkeyup="constraintMoneyLength(12,2);" onblur="constraintMoneyLength(12,2);">
					</div>
					<div class="form-group form-inline col-md-4">
						<label for="examplechannel_code" class="col-md-5 control-label">最高收费：</label> 
						<input type="text" class="maximumAmounts form-control m-left-1" id="maximumAmount" name="maximumAmount" 
						value="${maximumAmount!''}" class="required"
						onkeyup="constraintMoneyLength(12,2);" onblur="constraintMoneyLength(12,2);">
					</div>

					<div class="form-group form-inline col-md-4">
						<label for="examplechannel_name" class="col-md-5 control-label">手续费付费方：</label> 
						<label class="radio-inline m-left-5">
 						  <input type="radio" name="settlementParty" class="settlementParty" value="01"/> 商户
						</label>
						<label class="radio-inline m-left-5">
 						  <input type="radio" name="settlementParty" class="settlementParty" value="02"/> 银行
						</label>
						<label class="radio-inline m-left-5">
 						  <input type="radio" name="settlementParty" class="settlementParty" value="03"/> 客户
						</label>
						<input  type="hidden" id="settlementPartys"  value="${settlementParty!''}"/>
					</div>
				</div>
				
				<div class="row">
					<div class="form-group form-inline col-md-10" align="right">
						<button id="saveform" type="button" name="saveform" class="btn btn-primary">保存</button>
						<button  type="button"  id="cancelform" style="display:none;" class="btn btn-primary">取消</button>
						<button  type="button"  id="modifyform" style="display:none;" class="btn btn-primary">修改</button>
						<button  type="button"  id="go_back" class="btn btn-primary">返回</button>
					</div>
				  </div>
				</form>
			</div>
		</div>
		<div class="panel panel-default m-bottom-5" style="width:1220px;">
		  <div class="panel-heading padding-5-5">手续费率定义：<button  type="button"  id="trackbutton" class="btn btn-primary">轨迹</button></div>
		  	<div class="panel-body">
					<div id="row" class="table" >
						<div class="fixed-table-container" style="width:690px;">
							<table class="table table-hover table-striped">
								<tr style="border-left: 1px solid #dddddd;" class="feilv">
									<td style="text-align: center; vertical-align: middle;width:80px; "></td>
									<td style="text-align: center; vertical-align: middle;width:250px; ">金额区间</td>
									<td style="text-align: center; vertical-align: middle;width:130px; ">计算方式</td>
									<td style="text-align: center; vertical-align: middle;width:100px; ">费率值</td>
									<td style="text-align: center; vertical-align: middle;width:210px; ">操作按钮</td>
								</tr>
								${ratediv!''}
								<tr class="feilvs">
									<td style="text-align: left; vertical-align: middle;"colspan="5">
										<i id="addratediv" class="glyphicon glyphicon-plus"></i>
									</td>
								</tr>
							</table>
						</div>
					</div>
			</div>
		</div>
		<div class="panel panel-default m-bottom-5" style="width:1220px;">
		  <div class="panel-heading padding-5-5">可在线支付银行：</div>
		  	<div class="panel-body">
				<div class="row" style="padding-bottom:5px;">
					<form class="form-inline" role="form" id="userform">
					        <div class="form-group form-inline col-md-4">
								<label class="col-md-5 control-label">总平台名称：</label> <input type="text"
									class="col-md-3 form-control" id="platform_name" name="platform_name">
							</div>
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
							<button  type="button"  id="selectbutton" class="btn btn-primary">查询</button>
						</form>
					</div>
					<div id="row" class="table">
					    <form  id="addconfigform" action="saveconfig" method="post" >
						<div class="fixed-table-container" style="width:1200px;">
							<table class="table table-hover table-striped">
								<tr style="border-left: 1px solid #dddddd;" class="yinhang">
									<td style="text-align: center; vertical-align: middle;width:50px; ">序号</td>
									<td style="text-align: center; vertical-align: middle;width:90px; ">总平台名称</td>
									<td style="text-align: center; vertical-align: middle;width:100px; ">银行名称</td>
									<td style="text-align: center; vertical-align: middle;width:100px; ">银行代码</td>
									<td style="text-align: center; vertical-align: middle;width:100px; ">支持卡类型</td>
									<td style="text-align: center; vertical-align: middle;width:100px; ">每笔最高额度</td>
									<td style="text-align: center; vertical-align: middle;width:110px; ">日累计最高额度</td>
									<td style="text-align: center; vertical-align: middle;width:90px; ">到账时间</td>
									<td style="text-align: center; vertical-align: middle;width:100px; ">状态</td>
									<td style="text-align: center; vertical-align: middle;width:100px; ">应用平台启用状态</td>
									<td style="text-align: center; vertical-align: middle;width:180px; ">操作按钮</td>
								</tr>
								${bankdiv!''}			
							</table>
						</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
