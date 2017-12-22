package com.cninsure.system.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.cninsure.core.dao.impl.BaseDaoImpl;
import com.cninsure.system.dao.INSCMessageDao;
import com.cninsure.system.entity.INSCMessage;

@Repository
public class INSCMessageDaoImpl extends BaseDaoImpl<INSCMessage, String> implements INSCMessageDao {

	@Override
	public List<INSCMessage> getAllByReceiver(String receiver) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("getAllByReceiver"),receiver);
	}
	@Override
	public List<Map<Object, Object>> getAllByReceiverMap(String receiver) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("getAllByReceiverMap"),receiver);
	}

	@Override
	public List<INSCMessage> getAllBySender(String sender) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("getAllBySender"),sender);
	}

	@Override
	public List<INSCMessage> getNotReadMsgByReveiver(String reciever) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("getNotReadMsgByReveiver"),reciever);
	}

	@Override
	public List<INSCMessage> findByCondition(INSCMessage msg) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("findByCondition"),msg);
	}

	@Override
	public int getNotReadMsgCount(String reciever) {
		return this.sqlSessionTemplate.selectOne(this.getSqlName("getNotReadMsgCount"),reciever);
	}

	@Override
	public void updateReadedById(Map<String, Object> map) {
		this.sqlSessionTemplate.update(this.getSqlName("updateReadedById"),map);

	}

	@Override
	public void updateNotReadById(String id) {
		this.sqlSessionTemplate.update(this.getSqlName("updateNotReadById"),id);

	}

	public List<Map<Object, Object>> getReceiveMessagesPaging(Map<String, Object> map) {
		return this.sqlSessionTemplate.selectList(this.getSqlName("getByReceiverPaging"),map);
	}
	@Override
	public int getMsgCountByReceiver(String receiver) {
		return this.sqlSessionTemplate.selectOne(this.getSqlName("getMsgCountByReceiver"),receiver);
	}

}
