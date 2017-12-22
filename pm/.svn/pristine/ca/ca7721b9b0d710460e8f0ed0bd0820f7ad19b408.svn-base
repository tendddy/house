package com.cninsure.system.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.cninsure.core.dao.impl.BaseDaoImpl;
import com.cninsure.system.dao.INSCCodeDao;
import com.cninsure.system.entity.INSCCode;

@Repository
public class INSCCodeDaoImpl extends BaseDaoImpl<INSCCode, String> implements INSCCodeDao {
	@Override
	public void insert(INSCCode insccode) {

		this.sqlSessionTemplate.insert(this.getSqlName("insert"), insccode);
	}

	@Override
	public List<INSCCode> selectINSCCodeByCode(Map<String, String> para) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("select"), para);
	}

	public List<INSCCode> selectINSCCodeByParentCode(Map<String, String> map) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("select"), map);
	}

	@Override
	public Map<String, String> selectWorkflowNodeNameByCode(String codevalue) {
		return this.sqlSessionTemplate.selectOne(this.getSqlName("selectWorkflowNodeNameByValue"), codevalue);
	}

	@Override
	public String selectByOrderStatus(String orderStatus) {
		return this.sqlSessionTemplate.selectOne(this.getSqlName("seelctByOrderStatus"), orderStatus);
	}

	@Override
	public List<Map<String, Object>> selectByType(String codetype) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("selectByType"), codetype);
	}

	@Override
	public String selectCodeValueByCodeName(Map<String, String> map) {
		return this.sqlSessionTemplate.selectOne(this.getSqlName("selectByCodeName"), map);
	}

	@Override
	public INSCCode selectBankList(String codevalue) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("codetype", "bankcard");
		map.put("parentcode", "bankcard");
		map.put("codevalue", codevalue);
		return selectINSCCodeByCode(map).get(0);
	}

	@Override
	public List<INSCCode> selectMyTaskCode(Map<String, String> para) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("selectMyTaskCode"), para);
	}

	@Override
	public INSCCode transferCodeToName(Map<String, String> para) {
		return this.sqlSessionTemplate.selectOne(this.getSqlName("select"), para);
	}
}