package com.cninsure.system.service;

import java.util.List;
import java.util.Map;

import com.cninsure.core.dao.BaseService;
import com.cninsure.system.entity.INSCDept;

public interface INSCDeptService extends BaseService<INSCDept, String> {
	public List<Map<Object, Object>> queryDeptList(String parentcode);

	public int addDeptData(INSCDept model);

	public List<Map<String, String>> queryTreeList(String parentcode);

	public int updateDeptById(String id);

	public int updateDeptByIddel(String id);

	/**
	 * 查找当前节点所有子节点
	 * 
	 * @param parentcode
	 * @return
	 */
	public List<Map<String, String>> queryListByPcode4Group(String parentcode);

	public INSCDept getLegalPersonDept(String deptCode);

	public INSCDept getOrgDept(String deptCode);

	public String queryByComCode(String userorganization);

	public List<Map<String, String>> queryTreeListByAgr(String parentcode, String comtype);
}