package com.cn.hnust.pojo;

import java.io.Serializable;
import java.util.Date;

public class Loupan implements Serializable {
	private static final long serialVersionUID = 3817529441268706938L;
	private String id;
	private Date createtime;
	private Date modifytime;
	private String loupanmingcheng;
	private String loupanchengshi;
	private String loupanquyu;
	private String loupankaifashang;
	private String loupandizhi;
	private String loupanshuxing;
	private String loupanyongdimianji;
	private String loupanjianzhumianji;
	private String jiagequjian;
	private String mianjiqujian;
	private String zongjiaqujian;
	private String tabIndex;

	public String getTabIndex() {
		return tabIndex;
	}
	public void setTabIndex(String tabIndex) {
		this.tabIndex = tabIndex;
	}
	public String getJiagequjian() {
		return jiagequjian;
	}
	public void setJiagequjian(String jiagequjian) {
		this.jiagequjian = jiagequjian;
	}
	public String getMianjiqujian() {
		return mianjiqujian;
	}
	public void setMianjiqujian(String mianjiqujian) {
		this.mianjiqujian = mianjiqujian;
	}
	public String getZongjiaqujian() {
		return zongjiaqujian;
	}
	public void setZongjiaqujian(String zongjiaqujian) {
		this.zongjiaqujian = zongjiaqujian;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	public Date getModifytime() {
		return modifytime;
	}
	public void setModifytime(Date modifytime) {
		this.modifytime = modifytime;
	}
	public String getLoupanmingcheng() {
		return loupanmingcheng;
	}
	public void setLoupanmingcheng(String loupanmingcheng) {
		this.loupanmingcheng = loupanmingcheng;
	}
	public String getLoupanchengshi() {
		return loupanchengshi;
	}
	public void setLoupanchengshi(String loupanchengshi) {
		this.loupanchengshi = loupanchengshi;
	}
	public String getLoupanquyu() {
		return loupanquyu;
	}
	public void setLoupanquyu(String loupanquyu) {
		this.loupanquyu = loupanquyu;
	}
	public String getLoupankaifashang() {
		return loupankaifashang;
	}
	public void setLoupankaifashang(String loupankaifashang) {
		this.loupankaifashang = loupankaifashang;
	}
	public String getLoupandizhi() {
		return loupandizhi;
	}
	public void setLoupandizhi(String loupandizhi) {
		this.loupandizhi = loupandizhi;
	}
	public String getLoupanshuxing() {
		return loupanshuxing;
	}
	public void setLoupanshuxing(String loupanshuxing) {
		this.loupanshuxing = loupanshuxing;
	}
	public String getLoupanyongdimianji() {
		return loupanyongdimianji;
	}
	public void setLoupanyongdimianji(String loupanyongdimianji) {
		this.loupanyongdimianji = loupanyongdimianji;
	}
	public String getLoupanjianzhumianji() {
		return loupanjianzhumianji;
	}
	public void setLoupanjianzhumianji(String loupanjianzhumianji) {
		this.loupanjianzhumianji = loupanjianzhumianji;
	}
	
}