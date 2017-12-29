package com.cn.hnust.dao;

import java.util.List;
import java.util.Map;

import com.cn.hnust.pojo.Loudong;

public interface ILoudongDao {
    int deleteByPrimaryKey(Map<String, Object> parm);

    int insert(Loudong record);

    int insertSelective(Loudong record);

    Loudong selectByPrimaryKey(Map<String, Object> parm);

    int updateByPrimaryKeySelective(Loudong record);

    int updateByPrimaryKey(Loudong record);
    
    List<Loudong> selectByEntity(Map<String, Object> parm);

    long selectByEntityCount(Map<String, Object> parm);
}