package com.cninsure.system.service;

import java.util.List;

import com.cninsure.core.dao.BaseService;
import com.cninsure.system.entity.INSCCode;

public interface INSCCodeService extends BaseService<INSCCode, String> {
	
	public List<INSCCode> queryINSCCodeByCode(String parentcode, String codetype);
	
	/**
	 * 查询我的任务模块有哪几种类型的任务
	 * 
	 */
	public List<INSCCode> queryMyTaskCode(String parentcode, String codetype);
	/**
	 * 我的任务模块code翻译成name
	 * 
	 */
	public String transferValueToName(String parentcode,String codetype,String codevalue);
}