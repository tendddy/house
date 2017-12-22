<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>总银行配置</title>
<link href="${staticRoot}/css/appmodule.css" rel="stylesheet">
<link href="${staticRoot}/css/system/flat-ui-icon.css" rel="stylesheet">
<link href="../static/css/lib/bootstrap.min.css" rel="stylesheet"	media="screen">
<link rel="stylesheet" type="text/css" media="screen" href="../static/css/lib/jquery-ui.css" />
<script data-main="../static/js/load" src="../static/js/lib/require.min.js"></script>
<script type="text/javascript">
	requirejs([ "payment/banksconfig" ]);
</script>
</head>
<body>
	<div class="container-fluid">
		<form role="form" id="customerform">
			<div class="panel panel-default m-bottom-5">
				<div class="panel-heading padding-5-5">总银行配置</div>
				<div class="panel-body">
					<div class="col-md-12">
						<form class="form-inline" role="form" id="userform">
							<div class="row">
								<div class="form-group form-inline col-md-5">
									<label class="col-md-5 control-label">银行名称：</label> <input type="text"
										class="col-md-3 form-control" id="bankName" name="bankName">
								</div>
								<div class="form-group form-inline col-md-5">
							      <label for="exampleInputCode" class="col-md-5 control-label">银行状态：</label>
							        <select name="status" class="col-md-3 form-control" id="status">
							         <option value=""></option>
								     <option value="0">启用</option>
								     <option value="1">禁用</option>
							        </select>
						        </div>
							</div>
						</form>
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
				<div class="panel-heading padding-5-5">
					<div class="row">
						<div class="col-md-10" align="left">
							<button class="btn btn-primary" type="button" name="addbutton" id="addbutton" title="新增" >&nbsp;新增&nbsp;</button><!-- &nbsp;&nbsp;&nbsp;&nbsp;
							<button class="btn btn-primary" type="button" name="modifybutton" id="modifybutton" title="修改" >&nbsp;修改&nbsp;</button> -->
						</div>
					</div>
				</div>
				<div class="panel-body">
					<div id="div1" class="table">
						<div class="col-md-12"  style="width:700px;">
							<table id="banksConfigPolicy"></table>
						</div>
					</div>
				</div>
				<div class="panel-footer"></div>
			</div>
		</form>
	</div>
</body>

</html>
