package com.cninsure.system.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.cninsure.core.dao.impl.BaseDaoImpl;
import com.cninsure.system.dao.INSCDeptDao;
import com.cninsure.system.entity.INSCDept;

@Repository
public class INSCDeptDaoImpl extends BaseDaoImpl<INSCDept, String> implements
		INSCDeptDao {
	@Override
	public List<INSCDept> selectByParentDeptCode(String parentcode) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("selectByParentDeptCode"),parentcode);
	}
	@Override
	public List<INSCDept> selectByParentDeptCodeAgr(Map<String, String> parm) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("selectByParentDeptCodeAgr"),parm);
	}
	@Override
	public List<Map<String, String>> selectByParentDeptCode4Group(String parentcode) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("selectByParentDeptCode4group"),parentcode);
	}

	@Override
	public int addDeptDatas(INSCDept org) {
		return this.sqlSessionTemplate.insert(this.getSqlName("insert"),org);
	}

	@Override
	public List<INSCDept> selectAllByDept(String fieldName) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("selectByDept"),fieldName);
	}

	@Override
	public int updateDeptByid(String id) {
		return this.sqlSessionTemplate.update(this.getSqlName("updateDeptByid"),id);
	}

	@Override
	public int updateDeptByiddel(String id) {
		return this.sqlSessionTemplate.update(this.getSqlName("updateDeptByiddel"),id);
	}

	@Override
	public INSCDept selectByComcode(String code) {
		return this.sqlSessionTemplate.selectOne(this.getSqlName("selectByDeptCode"), code);
	}

	@Override
	public INSCDept queryByNoti(String noti) {
		return this.sqlSessionTemplate.selectOne(this.getSqlName("queryPid"),noti);
	}
	@Override
	public INSCDept selectBydeptcode(Map<String, Object> deptcode) {
		
		return this.sqlSessionTemplate.selectOne(this.getSqlName("selectCom"), deptcode);
	}
	@Override
	public List<String> selectCodeByParentCode(String upcomcode) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("selectCodeByParentCode"), upcomcode);
	}
	@Override
	public List<String> selectAllChildren(String comcode) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("selectAllChildrenBycode"), comcode);
	}
	/**
	 * 查询某节点下所有网点id集合
	 * @param id
	 * @return
	 */
	@Override
	public List<String> queryWDidsByPatId(Map<String,String> map) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("selectWDidsByPatId"), map);
	}
	@Override
	public INSCDept selectParentCodeByCode(String comcode) {
		return this.sqlSessionTemplate.selectOne(this.getSqlName("selectParentCodeByCode"), comcode);
	}
	@Override
	public List<Map<String,String>> selectCodesByParentCodesIsNull() {
		return this.sqlSessionTemplate.selectList(this.getSqlName("selectCodesByParentCodesIsNull"));
	}
	@Override
	public String selectParentCodesByComcode(String comcode) {
		return this.sqlSessionTemplate.selectOne(this.getSqlName("selectParentCodesByComcode"), comcode);
	}
	@Override
	public void updateParentCodesByComcode(Map<String, String> map) {
		this.sqlSessionTemplate.update(this.getSqlName("updateParentCodesByComcode"), map);
	}
	
}