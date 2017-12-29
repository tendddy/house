package com.cn.hnust.dao;

import java.util.List;
import java.util.Map;

import com.cn.hnust.pojo.Loufang;

public interface ILoufangDao {
    int deleteByPrimaryKey(Map<String, Object> parm);

    int insert(Loufang record);

    int insertSelective(Loufang record);

    Loufang selectByPrimaryKey(Map<String, Object> parm);

    int updateByPrimaryKeySelective(Loufang record);

    int updateByPrimaryKey(Loufang record);
    
    List<Loufang> selectByEntity(Map<String, Object> parm);

    long selectByEntityCount(Map<String, Object> parm);
    
    List<String> selectByPrimaryKey4Danyuan(Map<String, Object> parm);
}