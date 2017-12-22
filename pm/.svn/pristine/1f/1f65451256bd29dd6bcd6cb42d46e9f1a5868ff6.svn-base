package com.cninsure.system.dao;

import java.util.List;
import java.util.Map;

import com.cninsure.core.dao.BaseDao;
import com.cninsure.system.entity.INSCCode;

public interface INSCCodeDao extends BaseDao<INSCCode, String> {

	public List<INSCCode> selectINSCCodeByCode(Map<String, String> para);

	/**
	 * 通过任意字段得到code信息
	 * 
	 * @param para
	 *            codetype parentcode codevalue codename </if>
	 * @return
	 */
	public void insert(INSCCode insccode);

	public List<INSCCode> selectINSCCodeByParentCode(Map<String, String> map);

	/**
	 * 通过工作流节点code得到 节点名称
	 * 
	 * @return Map<codename,value>
	 */
	public Map<String, String> selectWorkflowNodeNameByCode(String codevalue);

	/**
	 * 通过订单状态得到订单信息
	 * 
	 * @param orderStatus
	 *            1:待投保、2：待支付、3：全部
	 * @return 工作流节点状态
	 */
	public String selectByOrderStatus(String orderStatus);

	/**
	 * 通过名称得到value
	 * 
	 * @param codename
	 * @return
	 */
	public String selectCodeValueByCodeName(Map<String, String> map);

	/**
	 * 通过字典类型得到 一类信息
	 * 
	 * @param type
	 * @return
	 */
	public List<Map<String, Object>> selectByType(String type);

	/**
	 * 根据code得到银行信息
	 * 
	 * @return
	 */
	public INSCCode selectBankList(String codevalue);

	/**
	 * 我的任务模块有哪几种任务类型
	 * 
	 * @param para
	 * @return
	 */
	public List<INSCCode> selectMyTaskCode(Map<String, String> para);

	/**
	 * 我的任务code翻译成name
	 * 
	 * @param para
	 * @return
	 */
	public INSCCode transferCodeToName(Map<String, String> para);
}