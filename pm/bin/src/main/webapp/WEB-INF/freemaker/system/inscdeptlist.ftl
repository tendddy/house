<!DOCTYPE html>
<html lang ="en" class="fuelux" >  
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>机构管理</title>
<link href="${staticRoot}/css/appmodule.css" rel="stylesheet">
<link href="${staticRoot}/css/system/flat-ui-icon.css" rel="stylesheet">
<script data-main="${staticRoot}/js/load" src="${staticRoot}/js/lib/require.min.js"></script>
<style type="text/css">
		.htmleaf-header{margin-bottom: 15px;font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", "FontAwesome", sans-serif;}
		.htmleaf-icon{color: #fff;}
	</style>
<script type="text/javascript">
	requirejs([ "system/inscdept" ]);
</script>
</head>
<body>

<div class="col-md-4">
 <div class="panel panel-default m-bottom-5">
 <div class="panel-heading padding-5-5">机构列表</div>
  <div class="panel-body">
	<#-- <ul class="tree tree-folder-select" role="tree" id="myTree" style="width:100%; height:400px; overflow-y:auto;overflow-x:auto;">
	  <li class="tree-branch hide" data-template="treebranch" role="treeitem" aria-expanded="false">
	    <div class="tree-branch-header">
	      <button class="glyphicon icon-caret glyphicon-play"><span class="sr-only">Open</span></button>
	      <button class="tree-branch-name">
	        <span class="glyphicon icon-folder glyphicon-folder-close"></span>
	        <span class="tree-label"></span>
	      </button>
	    </div>
	    <ul class="tree-branch-children" role="group"></ul>
	    <div class="tree-loader" role="alert">Loading...</div>
	  </li>
	  <li class="tree-item hide" data-template="treeitem" role="treeitem">
	    <button class="tree-item-name">
	      <span class="glyphicon icon-item fueluxicon-bullet"></span>
	      <span class="tree-label"></span>
	    </button>
	  </li>
	</ul> -->
	
	<div class="ztree" id="deptTree" style="width:100%; height:400px; overflow-y:auto;overflow-x:auto;"></div>
	
 </div>
 <div style="float: left; margin-right: 5px">
		<input class="btn btn-primary" id="syncdept" type="button" value="同步机构">
 </div>
<!-- <div>
	<div style="float: left; margin-right: 5px">
	<input class="btn btn-primary" id="addonedept" type="button" value="添加机构">
	</div>
	<div>
	 <form id = "orgdelform" action="deletbyid" method="post">
	        	<input  type="hidden" id = "delid" name = "id"  >
	        	<input style="display: none;" class="btn btn-primary"  id="deldept" type="submit" value="删除机构" >
      </form>
	</div>
</div> -->
 </div>
</div>
<div class="col-md-8">
	<div class="panel panel-default m-bottom-5">
   	   <div class="panel-heading padding-5-5">机构详细信息</div>
   	     <div class="panel-body">
	 	   <form  id = "orgsaveform" action="updatedept" method="post">
			 <div class="alert alert-danger" role="alert" id="showerrormessage" style="display: none;"></div>
	         <table class="table table-bordered ">
	          <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构上级代码</label></td>
				
				<td colspan="3"><input class="form-control" id = "upcomcode" type="text"  name="upcomcode" readonly="readonly">
				</td>
		      </tr>
	          <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构代码</label></td>
				<td colspan="3"><input class="form-control" id = "comcode" type="text"  name="comcode" readonly="readonly">
					<input type="hidden" id="id" name="id">
				</td>
		      </tr>
	          <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构内部编码</label></td>
				<td colspan="3"><input class="form-control" id = "deptinnercode" type="text" name="deptinnercode" readonly="readonly">
				</td>
		      </tr>
		      <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构名称</label></td>
				<td colspan="3"><input class="form-control" id = "comname" type="text" name="comname" readonly="readonly"></td>
			  </tr>
		      <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构类型</label></td>
			  	<td colspan="3">
					<select name="comtype" class="form-control" id ="comtype">
					<option value="" selected="selected">请选择类型</option>
					<option value=00>集团</option>
					<option value=01>子集团</option>
					<option value=02>省平台</option>
					<option value=03>法人</option>
					<option value=04>分公司</option>
					<option value=05>营销部（网点）</option>
					<option value=06>团队</option>
					</select>
				</td>
			  </tr>
		      <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构级别</label></td>
				<td colspan="3">
					<select name="comgrade" class="form-control" id ="comgrade">
					<option value="" selected="selected">请选择级别</option>
					<option value="01">级别1</option>
					<option value="02">级别2</option>
					<option value="03">级别3</option>
					<option value="04">级别4</option>
					<option value="05">级别5</option>
					</select>
				</td>
			  </tr>
		      <!-- <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">育成机构代码</label></td>
				<td colspan="3"><input class="form-control" id = "rearcomcode" type="text" name="rearcomcode"></td>
			  </tr> -->
		      <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">所在省、市、县</label></td>
				<td style="vertical-align: middle;">
					<select name="province" class="form-control" id ="province" onchange="changeprv()">
						<option value="" selected="selected">省份</option>
					</select>
				</td>
				<td style="vertical-align: middle;">
					<select name="city" class="form-control" id ="city" onchange="changecity()">
						<option value="" selected="selected">市</option>
					</select>
				</td>
				<td style="vertical-align: middle;">
					<select name="county" class="form-control" id ="county">
						<option value="" selected="selected">县</option>
					</select>
				</td>
			  </tr>
			  <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构地址</label></td>
				<td><input class="form-control" id = "address" type="text"  name="address"></td>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构网址</label></td>
				<td><input class="form-control" id = "webaddress" type="text"  name="webaddress"></td>
			  </tr>
			  <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构邮编</label></td>
				<td><input class="form-control" id = "zipcode" type="text"  name="zipcode"></td>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构电话</label></td>
				<td><input class="form-control" id = "phone" type="text"  name="phone"></td>
			  </tr>
			  <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">传真</label></td>
				<td><input class="form-control" id = "fax" type="text"  name="fax"></td>
				<td style="vertical-align: middle;"><label for="exampleInputName">EMAIL</label></td>
				<td><input class="form-control" id = "email" type="text"  name="email"></td>
			  </tr>
			  <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构负责人姓名</label></td>
				<td><input class="form-control" id = "satrapname" type="text"  name="satrapname"></td>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构负责人电话</label></td>
				<td><input class="form-control" id = "satrapphone" type="text"  name="satrapphone"></td>
			  </tr>
			  <tr>
				<td style="vertical-align: middle;"><label for="exampleInputName">机构负责人代码</label></td>
				<td><input class="form-control" id = "satrapcode" type="text"  name="satrapcode"></td>
				<td style="vertical-align: middle;"><label for="exampleInputName">业务归属机构</label></td>
				<td><input class="form-control" id = "belongstosatrap" type="text"  name="belongstosatrap"></td>
			  </tr>
			  <tr>
			  	<td><input class="btn btn-primary"  id="savebutton" type="button" value = "保存"></td>
			  </tr>
	         </table>
	         </form>
	         
        </div>
      </div>
     </div>
	       
</body>
</html>
