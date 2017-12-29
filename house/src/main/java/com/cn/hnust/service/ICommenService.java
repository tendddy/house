package com.cn.hnust.service;

public interface ICommenService {
	/**
	 * 
	 * @param loupanId 楼盘ID
	 * @param jiages 数组
	 * @param mianjis 数组
	 * @param zongjias 数组
	 * @param tabIndex  城市（如beijing、wuhan)
	 */
	public void updateLoupanQujian(String loupanId,String [] jiages,String [] mianjis,String [] zongjias,String tabIndex);
	/**
	 * 
	 * @param loudongId 楼栋ID
	 * @param jiages 数组
	 * @param mianjis 数组
	 * @param zongjias 数组
	 * @param tabIndex 城市（如beijing、wuhan)
	 */
	public void updateLoudongQujian(String loudongId,String [] jiages,String [] mianjis,String [] zongjias,String tabIndex);
	/**
	 * 
	 * @param parm 要比对的数据，如面积-109，价格 13400，总价 3040000
	 * @param type 类型，zongjia-总价区间，mianji-面积区间，jiage-价格区间
	 * @return
	 */
	public String getQujianValue(String parm,String type);
}
