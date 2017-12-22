package com.cninsure.system.service;

import java.util.List;
import java.util.Map;

import com.cninsure.core.dao.BaseService;
import com.cninsure.system.entity.INSCMenu;

public interface INSCMenuService extends BaseService<INSCMenu, String> {
	
//	public List<Map<Object, Object>> queryMenusByUserCode(String usercode, String parentnodecode);
	public String queryMenusFtl(String usercode, String parentnodecode);

	public List<Map<Object, Object>> queryMenusList(String id,String parentinnercode);

	INSCMenu queryByNodeCode(String nodecode);
	
	/**
	 * 通过业管得到任务管理菜单 信息
	 * @param userCode
	 * @return
	 */
	public Map<String,String> getTaskManageDataByUserCode(String userCode);
}
