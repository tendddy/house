package com.cn.hnust.dao;

import java.util.List;
import java.util.Map;

import com.cn.hnust.pojo.Code;

public interface ICodeDao {
    int deleteByPrimaryKey(String id);

    int insert(Code record);

    int insertSelective(Code record);

    Code selectByPrimaryKey(String CodeId);

    int updateByPrimaryKeySelective(Code record);

    int updateByPrimaryKey(Code record);
    
    List<Code> selectByEntity(Map<String, String> parm);
}