package com.cninsure.system.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cninsure.core.dao.BaseDao;
import com.cninsure.core.dao.impl.BaseServiceImpl;
import com.cninsure.core.utils.StringUtil;
import com.cninsure.system.dao.INSCCodeDao;
import com.cninsure.system.entity.INSCCode;
import com.cninsure.system.service.INSCCodeService;

@Service
@Transactional
public class INSCCodeServiceImpl extends BaseServiceImpl<INSCCode, String> implements INSCCodeService {
	@Resource
	private INSCCodeDao inscCodeDao;

	@Override
	protected BaseDao<INSCCode, String> getBaseDao() {
		return inscCodeDao;
	}

	@Override
	public List<INSCCode> queryINSCCodeByCode(String parentcode, String codetype) {
		Map<String, String> para = new HashMap<String, String>();
		if (!StringUtil.isEmpty(codetype)) {
			para.put("codetype", codetype);
		}
		if (!StringUtil.isEmpty(parentcode)) {
			para.put("parentcode", parentcode);
		}
		return inscCodeDao.selectINSCCodeByCode(para);
	}

	@Override
	public List<INSCCode> queryMyTaskCode(String parentcode, String codetype) {
		Map<String, String> para = new HashMap<String, String>();
		if (!StringUtil.isEmpty(codetype)) {
			para.put("codetype", codetype);
		}
		if (!StringUtil.isEmpty(parentcode)) {
			para.put("parentcode", parentcode);
		}
		return inscCodeDao.selectMyTaskCode(para);
	}

	@Override
	public String transferValueToName(String parentcode, String codetype, String codevalue) {
		Map<String, String> para = new HashMap<String, String>();
		if (!StringUtil.isEmpty(codetype)) {
			para.put("codetype", codetype);
		}
		if (!StringUtil.isEmpty(parentcode)) {
			para.put("parentcode", parentcode);
		}
		if (!StringUtil.isEmpty(codevalue)) {
			para.put("codevalue", codevalue);
			INSCCode insccode = inscCodeDao.transferCodeToName(para);
			if (insccode != null) {
				return insccode.getCodename();
			} else {
				return codevalue;
			}
		} else {
			return codevalue;
		}
	}
}