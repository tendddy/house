package com.cn.hnust.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.cn.hnust.dao.ICodeDao;
import com.cn.hnust.pojo.Code;
import com.cn.hnust.service.ICodeService;


@Service("codeService")
public class CodeServiceImpl implements ICodeService {
	@Resource
	private ICodeDao CodeDao;

	@Override
	public List<Code> getCodeInfo(Map<String, String> parm) {
		return CodeDao.selectByEntity(parm);
	}

}
