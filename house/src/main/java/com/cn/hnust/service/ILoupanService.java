package com.cn.hnust.service;

import java.util.List;
import java.util.Map;

import com.cn.hnust.pojo.Loupan;

public interface ILoupanService {
	public Loupan getLoupanById(Map<String, Object> parm);
	
	public List<Loupan> getLoupanInfo(Map<String, Object> parm);

	public long selectByEntityCount(Map<String, Object> parm);

}
