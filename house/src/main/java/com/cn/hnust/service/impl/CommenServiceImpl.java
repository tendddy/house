package com.cn.hnust.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.hnust.dao.ICodeDao;
import com.cn.hnust.dao.ILoudongDao;
import com.cn.hnust.dao.ILoupanDao;
import com.cn.hnust.pojo.Code;
import com.cn.hnust.pojo.Loudong;
import com.cn.hnust.pojo.Loupan;
import com.cn.hnust.service.ICommenService;


@Service("commenService")
public class CommenServiceImpl implements ICommenService {
	@Resource
	private ICodeDao CodeDao;
	@Resource
	private ILoupanDao loupanDao;
	@Resource
	private ILoudongDao loudongDao;

	@Override
	public String getQujianValue(String parm, String type) {
		Map<String, String> queryCodemap = new HashMap<>();
		queryCodemap.put("parentcode", type);
		List<Code> codeList = CodeDao.selectByEntity(queryCodemap);
		for(Code tempCode : codeList) {
			String tempCodename = tempCode.getCodename();
			if(tempCodename.contains("以上")&&Integer.valueOf(tempCodename.replace("以上", ""))<=Integer.valueOf(parm)) {
				return tempCode.getCodevalue();
			}else if(tempCodename.contains("以下")&&Integer.valueOf(tempCodename.replace("以下", ""))>=Integer.valueOf(parm)) {
				return tempCode.getCodevalue();
			}else if(Integer.valueOf(tempCodename.split("-")[0])<=Integer.valueOf(parm)&&Integer.valueOf(tempCodename.split("-")[1])>=Integer.valueOf(parm)){
				return tempCode.getCodevalue();
			}
		}
		return "";
	}

	private String getDistinct(String [] parm){
		String result = "";
		Set<String> set = new HashSet<>();
        for (int i = 0; i < parm.length; i++) {
            set.add(parm[i]);
        }
        for (String str : set) {  
        	result += str + ",";  
      }
        return result;
	}

	@Override
	public void updateLoupanQujian(String loupanId, String[] jiages, String[] mianjis, String[] zongjias,
			String tabIndex) {
		Loupan record = new Loupan();
		record.setId(loupanId);
		record.setJiagequjian(getDistinct(jiages));
		record.setMianjiqujian(getDistinct(mianjis));
		record.setZongjiaqujian(getDistinct(zongjias));
		record.setModifytime(new Date());
		record.setTabIndex(tabIndex);
		loupanDao.updateByPrimaryKey(record);
	}

	@Override
	public void updateLoudongQujian(String loudongId, String[] jiages, String[] mianjis, String[] zongjias,
			String tabIndex) {
		Loudong record = new Loudong();
		record.setId(loudongId);
		record.setJiagequjian(getDistinct(jiages));
		record.setModifytime(new Date());
		record.setTabIndex(tabIndex);
		loudongDao.updateByPrimaryKey(record);
	}
}
