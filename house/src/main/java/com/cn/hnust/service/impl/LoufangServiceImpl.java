package com.cn.hnust.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.hnust.dao.ILoufangDao;
import com.cn.hnust.pojo.Loufang;
import com.cn.hnust.service.ILoufangService;

@Service("loufangService")
public class LoufangServiceImpl implements ILoufangService {
	@Resource
	private ILoufangDao loufangDao;
	@Override
	public Loufang getloufangById(Map<String, Object> parm) {
		return this.loufangDao.selectByPrimaryKey(parm);
	}
	@Override
	public List<Loufang> getloufangInfo(Map<String, Object> parm) {
		return loufangDao.selectByEntity(parm);
	}
	@Override
	public long selectByEntityCount(Map<String, Object> parm) {
		return loufangDao.selectByEntityCount(parm);
	}
	@Override
	public List<String> selectByPrimaryKey4Danyuan(Map<String, Object> parm) {
		return loufangDao.selectByPrimaryKey4Danyuan(parm);
	}

}
