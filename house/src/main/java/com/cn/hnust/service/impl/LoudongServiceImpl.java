package com.cn.hnust.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.hnust.dao.ILoudongDao;
import com.cn.hnust.pojo.Loudong;
import com.cn.hnust.service.ILoudongService;


@Service("loudongService")
public class LoudongServiceImpl implements ILoudongService {
	@Resource
	private ILoudongDao loudongDao;

	@Override
	public Loudong getLoudongById(Map<String, Object> parm) {
		return this.loudongDao.selectByPrimaryKey(parm);
	}
	
	@Override
	public List<Loudong> getLoudongInfo(Map<String, Object> parm) {
		return loudongDao.selectByEntity(parm);
	}
	@Override
	public long selectByEntityCount(Map<String, Object> parm) {
		return loudongDao.selectByEntityCount(parm);
	}

}
