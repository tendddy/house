package com.cn.hnust.dao;

import java.util.List;
import java.util.Map;

import com.cn.hnust.pojo.Loupan;

public interface ILoupanDao {
    int deleteByPrimaryKey(Map<String, Object> parm);

    int insert(Loupan record);

    int insertSelective(Loupan record);

    Loupan selectByPrimaryKey(Map<String, Object> parm);

    int updateByPrimaryKeySelective(Loupan record);

    int updateByPrimaryKey(Loupan record);
    
    List<Loupan> selectByEntity(Map<String, Object> parm);

    long selectByEntityCount(Map<String, Object> parm);
}