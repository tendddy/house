package com.cn.hnust.service;

import java.util.List;
import java.util.Map;

import com.cn.hnust.pojo.Loufang;

public interface ILoufangService {
	public Loufang getloufangById(Map<String, Object> parm);
	public List<Loufang> getloufangInfo(Map<String, Object> parm);

	public long selectByEntityCount(Map<String, Object> parm);
	
	public List<String> selectByPrimaryKey4Danyuan(Map<String, Object> parm);
}
