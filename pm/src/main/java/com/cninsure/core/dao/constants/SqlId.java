package com.cninsure.core.dao.constants;

/**
 * Mybatis Sql脚本的ID名称
 */
public interface SqlId {
	public final String SQL_SELECT_COUNT = "selectCount";
	public final String SQL_SELECT = "select";
	public final String SQL_SELECT_ONE = "selectOne";
	public final String SQL_SELECT_BY_ID = "selectById";
	public final String SQL_UPDATE_BY_ID = "updateById";
	public final String SQL_UPDATE_BY_ID_SELECTIVE = "updateByIdSelective";
	public final String SQL_DELETE = "delete";
	public final String SQL_DELETE_BY_ID = "deleteById";
	public final String SQL_INSERT = "insert";
}
