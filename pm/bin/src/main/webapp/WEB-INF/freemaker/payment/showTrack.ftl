
<style>
.modal-body {
	white-space:normal;
	max-height: 800px;
	overflow: auto;
	overflow-x:hidden;
	
}
</style>
<script type="text/javascript">
	requirejs([ "payment/configure" ]);
	require(["jquery", "bootstrapdatetimepicker", "bootstrapdatetimepickeri18n", "bootstrap-table", "bootstrap","bootstrapTableZhCn","jqvalidatei18n","additionalmethods","jqtreeview","zTree","zTreecheck"], function ($) {
		//$(".modal-header").parent().parent().css("width","1200px");
				$("#trackPolicy").bootstrapTable({
			        url: "configurtion/getTrack",
			        method: 'get',
			        queryParams:queryParamss,       
			        cache: false,
		            striped: true,
		            pagination: true,
		            sidePagination: 'server', 
		            pageSize:10,
		            minimumCountColumns: 2,
		            clickToSelect: true,
		            columns: [
		      	            {field: 'id',title: 'id',visible: false,switchable:false },
		      	            {field : 'Number',title : '行号',align: 'center',valign: 'middle',//行号
		      	              formatter : function(value, row, index) { 
		      	            	 		var pageNumber = $(".page-number").length;
						  				for(var i=0;i<pageNumber;i++){
						  					if($(".page-number").eq(i).hasClass("active")){//得到当前页
						  						pageNumber=$(".page-number").eq(i).find("a").html();
						  					}
						  				}
		      	                  return pagesize * (pageNumber - 1) + index + 1;  
		      	              }  
		      	          },
		      	        {field: 'minimumAmount',title: '最低金额',align: 'center',valign: 'middle',sortable: true},
		  	            {field: 'maximumAmount',title: '最高金额',align: 'center',valign: 'middle',sortable: true},
			            {field: 'rateType',title: '计算方式',align: 'center',valign: 'middle',sortable: true},
		      	            {field: 'rate',title: '费率',align: 'center',valign: 'middle',sortable: true},
		      	            {field: 'modify_user',title: '维护人',align: 'center',valign: 'middle',sortable: true},
		      	            {field: 'createdate',title: '时间',align: 'center',valign: 'middle',sortable: true}
		      	            //{field: 'operation',title: '操作',align: 'center',valign: 'middle',switchable:false,formatter:operateFormatter,events:operateEvents}
		      	        ],
		      	           onLoadSuccess:function(data){
		      	         }
			    });
	});
	//得到查询参数
	function queryParamss(params) {
	    return {
	    	id: $("#platformid").val(),
	        offset:params.offset,
	        limit:params.limit,
	        sort: params.sort,  //排序列名
			order: params.order//排位命令（desc，asc）
	    };

	}
</script>
<div class="modal-header" style="padding:4px;padding-left:16px;">
	<button type="button" class="close" data-dismiss="modal"
		aria-hidden="true">&times;</button>
	<h6 class="modal-title" id="myModalLabel">费率轨迹</h6>
</div>

<div class="modal-body" style="width:900px" >
  <div  style="margin:0px 8px 0px 8px;font-size: 16px;line-height: 1.22222;padding:4px;">
	<form class="form-horizontal" role="form" id="scheduleForm">
		<div class="row">
			<div class="container-fluid">
				<input id="protocolid" name="protocolid" type="hidden" value="${id!''}"/>
				<div class="panel panel-default" style="margin-bottom:0px;">
					<div class="panel-body" style="padding:2px;">
						<div id="div1" class="table">
							<div class="col-md-12">
								<table id="trackPolicy" style="margin-bottom:0px;"></table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
   </div>
</div>
<div  style="height:45px;border-top: 1px solid #e5e5e5;">
	<div style="height:45px;width:800px;float: left;"></div>
	<div style="float: left;"><button class="btn btn-primary" data-dismiss="modal" style="padding: 6px 12px;background-color: #3071a9;border-color: #3071a9; margin-top:6px;"
	aria-hidden="true" type="button" name="closebutton"	title="关闭" id="closebutton">关闭</button></div>
</div>