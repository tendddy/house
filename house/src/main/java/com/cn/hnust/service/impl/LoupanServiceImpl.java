package com.cn.hnust.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.hnust.dao.ILoupanDao;
import com.cn.hnust.pojo.Loupan;
import com.cn.hnust.service.ILoupanService;

@Service("loupanService")
public class LoupanServiceImpl implements ILoupanService {
	@Resource
	private ILoupanDao loupanDao;
	@Override
	public Loupan getLoupanById(Map<String, Object> parm) {
		return this.loupanDao.selectByPrimaryKey(parm);
	}
	@Override
	public List<Loupan> getLoupanInfo(Map<String, Object> parm) {
		return loupanDao.selectByEntity(parm);
	}
	@Override
	public long selectByEntityCount(Map<String, Object> parm) {
		return loupanDao.selectByEntityCount(parm);
	}

}
