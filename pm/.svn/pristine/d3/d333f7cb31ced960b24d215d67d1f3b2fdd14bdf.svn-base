package com.cninsure.system.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cninsure.core.dao.BaseDao;
import com.cninsure.core.dao.impl.BaseServiceImpl;
import com.cninsure.core.utils.DateUtil;
import com.cninsure.system.dao.INSCMessageDao;
import com.cninsure.system.entity.INSCMessage;
import com.cninsure.system.service.INSCMessageService;

@Service
@Transactional
public class INSCMessageServiceImpl extends BaseServiceImpl<INSCMessage, String> implements INSCMessageService {

	@Resource
	private INSCMessageDao inscMessageDao;

	@Override
	protected BaseDao<INSCMessage, String> getBaseDao() {
		return inscMessageDao;
	}

	public int getNotReadMsgCount(String receiver) {
		return this.inscMessageDao.getNotReadMsgCount(receiver);
	}

	public List<INSCMessage> getAllReceiveMessages(String receiver) {
		return this.inscMessageDao.getAllByReceiver(receiver);
	}

	@Override
	public Map<String, Object> getReceiveMessagesPaging(Map<String, Object> data, String receiver) {
		Map<String, Object> map = new HashMap<String, Object>();
		long total = inscMessageDao.getNotReadMsgCount(receiver);
		List<Map<Object, Object>> infoList = inscMessageDao.getReceiveMessagesPaging(data);

		map.put("total", total);
		map.put("rows", infoList);
		return map;
	}

	public List<INSCMessage> getAllSenderMessages(String sender) {
		return this.inscMessageDao.getAllBySender(sender);
	}

	@Override
	public void markedReaded(String id) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("readtime", DateUtil.toDateTimeString(new Date()));
		this.inscMessageDao.updateReadedById(map);
	}

	@Override
	public void markedNotReaded(String id) {
		this.inscMessageDao.updateNotReadById(id);
	}

	@Override
	public Map<String, Object> getReceiveMessagesPaging(Map<String, Object> map) {
		String receiver = (String) map.get("receiver");
		long total = inscMessageDao.getMsgCountByReceiver(receiver);
		List<Map<Object, Object>> infoList = inscMessageDao.getReceiveMessagesPaging(map);

		map.put("total", total);
		map.put("rows", infoList);
		return map;
	}

	@Override
	public Map<String, Object> getNotReadMessagesPaging(Map<String, Object> map) {
		String reciver = (String) map.get("receiver");
		long total = inscMessageDao.getNotReadMsgCount(reciver);
		map.put("status", 0);
		List<Map<Object, Object>> infoList = inscMessageDao.getReceiveMessagesPaging(map);

		map.put("total", total);
		map.put("rows", infoList);
		return map;
	}

	@Override
	public INSCMessage viewMessage(String id) {
		INSCMessage inscMessage = inscMessageDao.selectById(id);
		if (inscMessage == null)
			return inscMessage;
		inscMessage.setStatus(1);
		markedReaded(id);
		return inscMessage;
	}
}
