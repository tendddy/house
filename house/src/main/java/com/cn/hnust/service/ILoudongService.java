package com.cn.hnust.service;

import java.util.List;
import java.util.Map;

import com.cn.hnust.pojo.Loudong;

public interface ILoudongService {
	public Loudong getLoudongById(Map<String, Object> parm);
	
	public List<Loudong> getLoudongInfo(Map<String, Object> parm);

	public long selectByEntityCount(Map<String, Object> parm);
}
