// require配置
requirejs.config({
	"paths" : {
		// app
		
		// core
		"core" : "core/core",
		
		// lib
		"flat-ui" : "lib/flat-ui.min",
		"jqcookie" : "lib/jquery.cookie",
		"jqblockui" : "lib/jquery.blockui",
		"jquery-ui" : "lib/jquery-ui.min",
		"jqform" : "lib/jquery.form.min",
	 	"jqtreeview" : "lib/jqtreeview/jquery.treeview",
	 	"jqtreeviewasync" : "lib/jqtreeview/jquery.treeview.async",
	 	"jqtreeviewedit" : "lib/jqtreeview/jquery.treeview.edit",
	 	"jqgrid" : "lib/jqGrid/jquery.jqGrid.src",
	 	"jqgridi18n" : "lib/jqGrid/i18n/grid.locale-cn",
	 	"bootstrap" : "lib/bootstrap.min",
	 	"des" : "platform/des",
	 	"bootstrapdatetimepicker" : "lib/bootstrap-datetimepicker/bootstrap-datetimepicker",
	 	"bootstrapdatetimepickeri18n" : "lib/bootstrap-datetimepicker/i18n/bootstrap-datetimepicker.zh-CN",
	 	"jqvalidate" : "lib/jqvalidator/jquery.validate.min",
	 	"jqmetadata" : "lib/jqvalidator/jquery.metadata",
	 	"jqvalidatei18n" : "lib/jqvalidator/msgi18n/messages_cn",
	 	"additionalmethods" : "lib/jqvalidator/additional-methods",
	 	"bootstrap-table":"lib/bootstrap-table",
	 	"bootstrapTableZhCn":"lib/bootstrap-table-zh-CN.min",
	 	"fileinput" : "lib/fileupload/fileinput",
	 	"fileinputi18n" : "lib/fileupload/i18n/fileinput_locale_zh",
	 	"bootstraptree" : "lib/bootstrap-treeview",
	 	"fuelux":"lib/fuelux.min",
	 	"zTree":"lib/zTree/js/jquery.ztree.core-3.5",
	 	"zTreecheck":"lib/zTree/js/jquery.ztree.excheck-3.5",
	 	"zTreeexedit":"lib/zTree/js/jquery.ztree.exedit-3.5",
	 	"audioplayer" : "lib/audioplayer.min",
	 	"jquerycontextMenu" : "lib/jquery.contextMenu",
	 	"jqueryuiposition" : "lib/jquery.ui.position",
	 	"lodash" : "lib/lodash",
	 	"mousewheel" : "lib/mousewheel/jquery.mousewheel",
		// jquery lib
		"jquery" : "lib/jquery.min",
		"ajaxfileupload" : "lib/fileupload/ajaxfileupload",
		"multiselect" : "lib/multiselect/multiselect",
		"public" : "zzbconf/public"
	},
	"shim" : {
		
		"flat-ui": ["jquery"],
		"jqcookie": ["jquery"],
		"jquery-ui": ["jquery"],
		"jqform": ["jquery"],
		"jqtreeview": ["jquery"],
		"jqtreeviewasync": ["jquery", "jqtreeview"],
		"jqtreeviewedit": ["jquery", "jqtreeview"],
		"jqgrid" : ["jquery", "jqgridi18n"],
		"jqgridi18n" : ["jquery"],
		"bootstrap" : ["jquery"],
		"bootstrapdatetimepicker" : ["jquery", "bootstrap"],
		//"des" : ["jquery", "des"],
		"bootstrapdatetimepickeri18n" : ["jquery","bootstrapdatetimepicker"],
		"jqvalidatei18n" : ["jquery", "jqvalidate"],
		"jqvalidate" : ["jquery"],
		"jqmetadata" : ["jquery", "jqvalidate"],
		"additionalmethods" : ["jquery", "jqvalidate", "jqmetadata"],
		"bootstrap-table" : ["jquery","bootstrap"],
		"bootstrapTableZhCn" : ["jquery","bootstrap-table"],
		"fileinput" : ["jquery"],
		"fileinputi18n" : ["jquery", "fileinput"],
		"bootstraptree" : ["jquery","bootstrap"],
		"fuelux" : ["jquery"],
		"jquerycontextMenu" : ["jquery"],
	 	"jqueryuiposition" : ["jquery"],
	 	"zTree" : ["jquery"],
	 	"zTreecheck" : ["jquery","zTree"],
		"core" : ["jquery", "jqblockui"],
		"ajaxfileupload" : ["jquery"]
	}
});

require(["jquery","jqblockui","core"],function($){
	$(function() {
		$.insLoaded();
	});
});
