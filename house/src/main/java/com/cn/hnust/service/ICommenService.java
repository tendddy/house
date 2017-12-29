package com.cn.hnust.service;

public interface ICommenService {
	public void updateLoupanJiageQujian(String loupanId,String [] jiages,String cityname);
	public void updateLoudongJiageQujian(String loudongId,String [] jiages,String cityname);
	public void updateLoupanMainjiQujian(String loupanId,String [] mianjis,String cityname);
	public void updateLoudongMainjianQujian(String loudongId,String [] mianjis,String cityname);
	public void updateLoupanZongjiaQujian(String loupanId,String [] zongjias,String cityname);
	public void updateLoudongZongjiaQujian(String loudongId,String [] zongjias,String cityname);
	/**
	 * 
	 * @param parm 要比对的数据，如面积-109，价格 13400，总价 3040000
	 * @param type 类型，zongjia-总价区间，mianji-面积区间，jiage-价格区间
	 * @return
	 */
	public String getQujianValue(String parm,String type);
}
