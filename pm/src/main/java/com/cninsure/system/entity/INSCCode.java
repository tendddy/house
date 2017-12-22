package com.cninsure.system.entity;

import com.cninsure.core.dao.domain.BaseEntity;
import com.cninsure.core.dao.domain.Identifiable;

public class INSCCode extends BaseEntity implements Identifiable {
	private static final long serialVersionUID = 1L;

	
	private String id;
	/**
	 * 
	 */
	private String codetype;

	/**
	 * 
	 */
	private String parentcode;

	/**
	 * 
	 */
	private String codevalue;

	/**
	 * 
	 */
	private String codename;

	/**
	 * 
	 */
	private Integer codeorder;

	/**
	 * 属性1
	 */
	private Integer prop1;

	/**
	 * 属性2
	 */
	private String prop2;

	/**
	 * 属性3
	 */
	private String prop3;

	/**
	 * 属性4
	 */
	private String prop4;


	public String getCodetype() {
		return codetype;
	}
	public void setCodetype(String codetype) {
		this.codetype = codetype;
	}
	public String getParentcode() {
		return parentcode;
	}
	public void setParentcode(String parentcode) {
		this.parentcode = parentcode;
	}
	public String getCodevalue() {
		return codevalue;
	}
	public void setCodevalue(String codevalue) {
		this.codevalue = codevalue;
	}
	public String getCodename() {
		return codename;
	}
	public void setCodename(String codename) {
		this.codename = codename;
	}
	public Integer getCodeorder() {
		return codeorder;
	}
	public void setCodeorder(Integer codeorder) {
		this.codeorder = codeorder;
	}
	public String getProp2() {
		return prop2;
	}
	public void setProp2(String prop2) {
		this.prop2 = prop2;
	}
	public String getProp3() {
		return prop3;
	}
	public void setProp3(String prop3) {
		this.prop3 = prop3;
	}
	public String getProp4() {
		return prop4;
	}
	public void setProp4(String prop4) {
		this.prop4 = prop4;
	}
	
	
	public Integer getProp1() {
		return prop1;
	}
	public void setProp1(Integer prop1) {
		this.prop1 = prop1;
	}
	
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@Override
	public String toString() {
		return "INSCCode [id=" + id + ", codetype=" + codetype
				+ ", parentcode=" + parentcode + ", codevalue=" + codevalue
				+ ", codename=" + codename + ", codeorder=" + codeorder
				+ ", prop1=" + prop1 + ", prop2=" + prop2 + ", prop3=" + prop3
				+ ", prop4=" + prop4 + "]";
	}

	
	
}