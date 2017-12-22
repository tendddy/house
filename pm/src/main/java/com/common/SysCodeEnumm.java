package com.common;

public enum SysCodeEnumm {
	SUCCESS("OK","0000","成功"),
	WARN("WARN","0001","连接异常"), 
	FAIL("FAIL","0002","失败");

	private final String key;
	private final String value;
	private final String describe;
	
	private SysCodeEnumm(String key, String value,String describe) {
		this.value = value;
		this.key = key;
		this.describe=describe;
	}

	public String getKey() {
		return key;
	}

	public String getValue() {
		return value;
	}

	public String getDescribe() {
		return describe;
	}
	
}
