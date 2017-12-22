package com.cninsure.system.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cninsure.core.dao.BaseDao;
import com.cninsure.core.dao.impl.BaseServiceImpl;
import com.cninsure.core.utils.LogUtil;
import com.cninsure.core.utils.StringUtil;
import com.cninsure.system.dao.INSCDeptDao;
import com.cninsure.system.entity.INSCDept;
import com.cninsure.system.manager.scm.INSCDeptSyncService;
import com.cninsure.system.service.INSCDeptService;

@Service
@Transactional
public class INSCDeptServiceImpl extends BaseServiceImpl<INSCDept, String> implements INSCDeptService {
	@Resource
	private INSCDeptDao inscDeptDao;

	@Resource
	private INSCDeptSyncService inscDeptSyncService;

	@Override
	protected BaseDao<INSCDept, String> getBaseDao() {
		return inscDeptDao;
	}

	// @Cacheable(value="deptCache", key="#parentcode")
	@Override
	public List<Map<Object, Object>> queryDeptList(String parentcode) {
		LogUtil.info("dept tree parentinnercode= " + parentcode);
		List<Map<Object, Object>> resultList = new ArrayList<Map<Object, Object>>();
		List<INSCDept> inscListDept = queryDeptListByPid(parentcode);
		for (int i = 0; i < inscListDept.size(); i++) {
			INSCDept tempDept = new INSCDept();
			Map<Object, Object> tempMap = new HashMap<Object, Object>();
			tempDept = inscListDept.get(i);

			/* zTree数据 */
			tempMap.put("id", tempDept.getId());
			tempMap.put("pid", tempDept.getComcode());
			tempMap.put("name", tempDept.getComname());
			tempMap.put("isParent", "1".equals(tempDept.getChildflag()) ? "true" : "false");

			resultList.add(tempMap);
		}
		return resultList;
	}

	@Override
	public int addDeptData(INSCDept dept) {

		return inscDeptDao.addDeptDatas(dept);
	}

	private List<INSCDept> queryDeptListByPid(String parentcode) {
		if (StringUtil.isEmpty(parentcode) || "source".equalsIgnoreCase(parentcode)) {
			parentcode = "";
		}
		return inscDeptDao.selectByParentDeptCode(parentcode);
	}

	private List<INSCDept> queryDeptListByPidAgr(String upcomcode, String comtype) {
		if (StringUtil.isEmpty(upcomcode) || "source".equalsIgnoreCase(upcomcode)) {
			upcomcode = "";
		}
		Map<String, String> parm = new HashMap<String, String>();
		parm.put("upcomcode", upcomcode);
		if (!upcomcode.equals("")) {
			parm.put("comtype", comtype);
		}
		return inscDeptDao.selectByParentDeptCodeAgr(parm);
	}

	@Override
	public List<Map<String, String>> queryTreeList(String parentcode) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		List<INSCDept> inscListDept = queryDeptListByPid(parentcode);
		for (INSCDept dept : inscListDept) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("id", dept.getId());
			map.put("pId", dept.getUpcomcode());
			map.put("name", dept.getComname());
			map.put("isParent", "1".equals(dept.getChildflag()) ? "true" : "false");
			list.add(map);
		}
		return list;
	}

	@Override
	public List<Map<String, String>> queryTreeListByAgr(String parentcode, String comtype) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		List<INSCDept> inscListDept = queryDeptListByPidAgr(parentcode, comtype);
		for (INSCDept dept : inscListDept) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("id", dept.getId());
			map.put("pId", dept.getUpcomcode());
			map.put("name", dept.getComname());
			map.put("isParent", queryDeptListByPidAgr(dept.getComcode(), comtype).size() > 0 ? "true" : "false");
			list.add(map);
		}
		return list;
	}

	@Override
	public List<Map<String, String>> queryListByPcode4Group(String parentcode) {
		return inscDeptDao.selectByParentDeptCode4Group(parentcode);
	}

	@Override
	public int updateDeptById(String id) {
		return inscDeptDao.updateDeptByid(id);
	}

	@Override
	public int updateDeptByIddel(String id) {
		return inscDeptDao.updateDeptByiddel(id);
	}

	@Override
	public INSCDept getLegalPersonDept(String deptCode) {
		INSCDept dept = inscDeptDao.selectByComcode(deptCode);
		if ("02".compareTo(dept.getComtype()) >= 0) {
			return dept;
		}
		if (dept.getComtype().equals("02"))
			return dept;
		while (!dept.getComtype().equals("02")) {
			dept = inscDeptDao.selectByComcode(dept.getUpcomcode());
			if (dept.getComtype().equals("02")) {
				return dept;
			}

		}
		return null;
	}

	@Override
	public String queryByComCode(String userorganization) {
		INSCDept temp = new INSCDept();
		temp.setComcode(userorganization);
		return inscDeptDao.selectOne(temp).getId();
	}

	/**
	 * 获得机构信息
	 * 
	 * @param dept
	 * @param modifyDept
	 * @return
	 */
	public INSCDept getModifideDeptInfo(INSCDept dept, INSCDept modifyDept) {
		dept.setId(modifyDept.getId());
		dept.setDeptinnercode(modifyDept.getDeptinnercode());
		dept.setComcode(modifyDept.getComcode());
		dept.setUpcomcode(modifyDept.getUpcomcode());
		dept.setComname(modifyDept.getComname());
		dept.setShortname(modifyDept.getShortname());
		dept.setComkind(modifyDept.getComkind());
		dept.setComtype(modifyDept.getComtype());
		dept.setComgrade(modifyDept.getComgrade());
		dept.setRearcomcode(modifyDept.getRearcomcode());
		dept.setProvince(modifyDept.getProvince());
		dept.setCity(modifyDept.getCity());
		dept.setCounty(modifyDept.getCounty());
		dept.setAddress(modifyDept.getAddress());
		dept.setZipcode(modifyDept.getZipcode());
		dept.setPhone(modifyDept.getPhone());
		dept.setFax(modifyDept.getFax());
		dept.setEmail(modifyDept.getEmail());
		dept.setWebaddress(modifyDept.getWebaddress());
		dept.setSatrapname(modifyDept.getSatrapname());
		dept.setSatrapcode(modifyDept.getSatrapcode());
		dept.setChildflag(modifyDept.getChildflag());
		dept.setTreelevel(modifyDept.getTreelevel());
		dept.setOperator(modifyDept.getOperator());
		dept.setCreatetime(modifyDept.getCreatetime());
		dept.setModifytime(modifyDept.getModifytime());
		return dept;
	}

	@Override
	public INSCDept getOrgDept(String deptCode) {
		INSCDept dept = inscDeptDao.selectByComcode(deptCode);
		if ("02".compareTo(dept.getComtype()) >= 0) {
			return dept;
		}
		if (dept.getComtype().equals("02"))
			return dept;
		while (!dept.getComtype().equals("02")) {
			dept = inscDeptDao.selectByComcode(dept.getUpcomcode());
			if (dept.getComtype().equals("02")) {
				return dept;
			}

		}
		return null;
	}
}