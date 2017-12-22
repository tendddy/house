package com.common;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;

import net.sf.json.JSON;

import org.jivesoftware.smack.AbstractXMPPConnection;
import org.jivesoftware.smack.ConnectionConfiguration.SecurityMode;
import org.jivesoftware.smack.ConnectionListener;
import org.jivesoftware.smack.SmackException;
import org.jivesoftware.smack.SmackException.NotConnectedException;
import org.jivesoftware.smack.XMPPConnection;
import org.jivesoftware.smack.XMPPException;
import org.jivesoftware.smack.chat.Chat;
import org.jivesoftware.smack.chat.ChatManager;
import org.jivesoftware.smack.chat.ChatManagerListener;
import org.jivesoftware.smack.chat.ChatMessageListener;
import org.jivesoftware.smack.packet.Message;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.jivesoftware.smack.tcp.XMPPTCPConnectionConfiguration;

import com.cninsure.core.tools.util.ValidateUtil;
import com.cninsure.core.utils.LogUtil;

public class XMPPUtils {
	
	private String userName = ValidateUtil.getConfigValue("fairy.userName") + "@" + ValidateUtil.getConfigValue("fairy.serviceName");
	private String passWord = ValidateUtil.getConfigValue("fairy.passWord");
    private String serviceName = ValidateUtil.getConfigValue("fairy.serviceName");
    private int  port = Integer.parseInt(ValidateUtil.getConfigValue("fairy.port"));
    private String host = ValidateUtil.getConfigValue("fairy.host");
    private String resource = ValidateUtil.getConfigValue("fairy.resource");
	//private XMPPState state;
	
	private XMPPTCPConnectionConfiguration config ;
	public AbstractXMPPConnection connection;
	private ChatManager chatmanager;
	
	private ConcurrentLinkedQueue<String> queue =new ConcurrentLinkedQueue<String>(); 

	/**
	 * 默认构造函数
	 */
	private XMPPUtils(){
		config = XMPPTCPConnectionConfiguration
				.builder()
				.setUsernameAndPassword (userName , passWord )
				.setServiceName(serviceName).setPort(port)
				.setSecurityMode(SecurityMode.disabled).setHost(host)
				.setConnectTimeout(100000).setCompressionEnabled(false)
				.setResource(resource).build();
		connection = new XMPPTCPConnection(config);
		connection.addConnectionListener(new XMPPConnectionListener());
		try {
			connection.connect();
			connection.login();
			chatmanager=ChatManager.getInstanceFor(connection);
            chatmanager.addChatListener(new MyChatManagerListener());
		} catch (SmackException | IOException | XMPPException e) {
			e.printStackTrace();
			LogUtil.error("openfire消息发送链接登陆出错！");
		}
	}
	private static final XMPPUtils XMPP_UTILS = new XMPPUtils();
	/**
	 * 默认登陆openfire的用户实例，单例模式，即admin
	 * @return AbstractXMPPConnection已经登陆并监听消息，可调用sendMessage进行消息发送
	 */
	public static XMPPUtils getInstance() {  
		return XMPP_UTILS;  
	}
	/**
	 * 用户自行登录openfire的实例
	 * @param userName
	 * @param pwd
	 * @return AbstractXMPPConnection已经登陆并监听消息，可调用sendMessage进行消息发送
	 */
	public static XMPPUtils getInstance(String userName,String pwd) {  
		return new XMPPUtils(userName,pwd);
	}
	
	
	/**
	 * 默认构造函数
	 */
	private XMPPUtils(String userName,String pwd){
		config = XMPPTCPConnectionConfiguration
				.builder()
				.setUsernameAndPassword (userName , pwd)
				.setServiceName(serviceName).setPort(port)
				.setSecurityMode(SecurityMode.disabled).setHost(host)
				.setConnectTimeout(100000).setCompressionEnabled(false)
				.setResource(resource).build();
		connection = new XMPPTCPConnection(config);
		connection.addConnectionListener(new XMPPConnectionListener());
		try {
			connection.connect();
			connection.login();
			chatmanager=ChatManager.getInstanceFor(connection);
            chatmanager.addChatListener(new MyChatManagerListener());
		} catch (SmackException | IOException | XMPPException e) {
			e.printStackTrace();
			LogUtil.error("openfire消息发送链接登陆出错！");
		}
	}
	
	
	
	private class XMPPConnectionListener implements ConnectionListener {

		@Override
		public void reconnectionSuccessful() {
			//state = XMPPState.CONNECTED;
		}

		@Override
		public void reconnectionFailed(Exception arg0) {
			//state = XMPPState.NOT_CONNECTED;
			getInstance();
		}

		@Override
		public void reconnectingIn(int arg0) {
			//state = XMPPState.CONNECTED;
		}

		@Override
		public void connectionClosedOnError(Exception arg0) {
			//state = XMPPState.CONNECTED;
		}

		@Override
		public void connectionClosed() {
			//state = XMPPState.NOT_CONNECTED;
			getInstance();
		}

		@Override
		public void connected(XMPPConnection arg0) {
			//state = XMPPState.CONNECTED;
		}

		@Override
		public void authenticated(XMPPConnection arg0, boolean arg1) {
			//state = XMPPState.AUTHENTICATED;
		}
	}
	
	private class MyChatManagerListener implements ChatManagerListener{
		@Override
		public void chatCreated(Chat chat, boolean createdLocally) {
			chat.addMessageListener(new ChatMessageListener() {
				@Override
				public void processMessage(Chat chat, Message message) {
					if(message.getBody()!=null && !message.getBody().equals("null")){
						queue.add(message.getBody());
//						onlineusers(queue);
					}
					
				}
			});
		}
	}

	/**
	 * 获取链接状态
	 * NOT_CONNECTED("Not connected"), 
	 * CONNECTED("Connected"), 
	 * AUTHENTICATED("Authenticated");
	 * @return
	 */
	//public XMPPState getState() {
	//	return state;
	//}
	
	/**
	 * 通过XMPP协议群发送消息
	 * @param toUsers -消息接收方 ,ldap -cn用户名域
	 * @param msg -消息体
	 * @throws NotConnectedException
	 */
	public void sendMessage(List<String> toUsers,String msg) throws NotConnectedException{
		Chat newChat  =null;
		for(String user:toUsers){
			newChat  = chatmanager.createChat(user);
			if(msg!=null && msg.length()!=0 && !msg.toLowerCase().equals("null")){
				newChat.sendMessage(msg);  
		    }
	    }
	}
	/**
	 * 通过XMPP协议发送消息
	 * @param toUser -消息接收方 ,ldap -cn用户名域
	 * @param msg -消息体
	 * @throws NotConnectedException
	 */
	public void sendMessage(String toUser,String msg) throws NotConnectedException{ 
		Chat newChat  = chatmanager.createChat(toUser);
		if(msg!=null && msg.length()!=0 && !msg.toLowerCase().equals("null")){
			newChat.sendMessage(msg);  
		}
	}
	/**
	 * 通过XMPP协议发送消息
	 * @param msg -消息报文
	 * @throws NotConnectedException
	 */
	public void sendMessage(String jsonStr) throws NotConnectedException{ 
		
	}
	
	/**
	 * 通过XMPP协议发送消息
	 * @param json -消息报文
	 * @throws NotConnectedException
	 */
	public void sendMessage(JSON json) throws NotConnectedException{ 

	}
	/**
	 * 获取消息队列，包含离线消息
	 * @return
	 */
	public ConcurrentLinkedQueue<String> getMessage(){
		return queue;
	}
	
	/**
	 * 清除消息队列
	 * @return
	 */
	public ConcurrentLinkedQueue<String> resetMessage(){
		queue.clear();
		return queue;
	}
	
	/**
	 * 在线列表更新
	 */
//	private void onlineusers(ConcurrentLinkedQueue<String> queue){
//		Map<String, Object> onLineUsers = new HashMap<String, Object>();
//		if(RedisClient.get("onlineUsers")==null||"".equals(RedisClient.get("onlineUsers"))){
//		}else{
//			onLineUsers = JsonUtil.parseJSONToMap(RedisClient.get("onlineUsers").toString());
//		}
//		if(queue.size()>0){
//			for(String msg : queue){
//				Map<String,Object> msgMap = JsonUtil.parseJSONToMap(msg);
//				String tempUserId = (String) msgMap.get("userid");
//				String tempJabber = (String) msgMap.get("jabber");
//				String tempStatus = (String) msgMap.get("status");
//				if(StringUtil.isEmpty(tempUserId)){
//					//代理人id为空，不进行任何操作
//				}else{
//					if("onLine".equals(tempStatus)){
//						Map<String,String> tempMap = new HashMap<String,String>();
//						tempMap.put("jabber", tempJabber);
//						tempMap.put("status", tempStatus);
//						onLineUsers.put(tempUserId, tempMap);
//					}else{
//						onLineUsers.remove(tempUserId);
//					}
//				}
//				XMPPUtils.getInstance().removeMessage(msg);
//			}
//			RedisClient.set("onlineUsers", onLineUsers);
//		}
//	}
	
	/**
	 * 去掉消息
	 * @return
	 */
	public boolean removeMessage(Object obj){
		return queue.remove(obj);
	}
	
	public void logOut(){
		connection.disconnect();
	}
	
}