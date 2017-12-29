package com.cn.hnust.service;

import java.util.List;
import java.util.Map;

import com.cn.hnust.pojo.Code;

public interface ICodeService {
	public List<Code> getCodeInfo(Map<String, String> parm);
}
