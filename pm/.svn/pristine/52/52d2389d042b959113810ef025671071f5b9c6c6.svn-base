package com.cninsure.system.dao;

import java.util.List;
import java.util.Map;

import com.cninsure.core.dao.BaseDao;
import com.cninsure.system.entity.INSCMessage;

public interface INSCMessageDao  extends BaseDao<INSCMessage, String>{
	/**
	 * 获取个人所有接收的消息
	 * @param receiver -接收者id
	 */
	public List<INSCMessage> getAllByReceiver(String receiver);
	/**
	 * 获取个人所有接收的消息
	 * @param receiver -接收者id
	 */
	public List<Map<Object, Object>> getAllByReceiverMap(String receiver);
	/**
	 * 分页获取个人所有接收的消息
	 * @param map -接收者id
	 */
	public List<Map<Object, Object>> getReceiveMessagesPaging(Map<String, Object> map);
	/**
	 * 获取个人所有发送的消息
	 * @param sender -发送者id
	 * @return
	 */
	public List<INSCMessage> getAllBySender(String sender);
	
	/**
	 * 获取个人所有未读接收消息
	 * @param reciever -接收者id
	 * @return
	 */
	public List<INSCMessage> getNotReadMsgByReveiver(String reciever);
	/**
	 * 根据条件获取对应的消息
	 * @param msg -INSCMessage 对象
	 * @return
	 */
	public List<INSCMessage> findByCondition(INSCMessage msg);
	/**
	 * 获取未读消息数量
	 * @param msg -INSCMessage 对象
	 * @return
	 */
	public int getNotReadMsgCount(String reciever);
	
	/**
	 * 获取个人消息数量
	 * @param msg -INSCMessage 对象
	 * @return
	 */
	public int getMsgCountByReceiver(String reciever);
	
	/**
	 * 更新已读状态
	 * @param id -message主键
	 * @return
	 */
	public void updateReadedById(Map<String, Object> map);
	/**
	 * 更新未读状态
	 * @param id -message主键
	 * @return
	 */
	public void updateNotReadById(String id);
	
}
