package com.cninsure.system.dao;

import java.util.List;

import com.cninsure.core.dao.BaseDao;
import com.cninsure.system.entity.INSCMenu;


public interface INSCMenuDao extends BaseDao<INSCMenu, String> {

	public List<INSCMenu> selectMenuByParentNodeCode(String parentnodecode);
	
	public List<INSCMenu> selectAll();
	
	public List<INSCMenu> selectAllByOrder(String fieldName);

	public INSCMenu selectByNodeCode(String nodecode);
	
	/**
	 * 初始化菜单
	 * @param id
	 * @return
	 */
	public List<String> selectCodeByIds4Menu(List<String> ids);
	
}
