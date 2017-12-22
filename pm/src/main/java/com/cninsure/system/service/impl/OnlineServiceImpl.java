package com.cninsure.system.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cninsure.system.dao.INSCUserDao;
import com.cninsure.system.entity.INSCUser;
import com.cninsure.system.service.OnlineService;
@Service(value="onlineService")
@Transactional
public class OnlineServiceImpl implements OnlineService{
	@Resource
	private INSCUserDao inscUserDao ;
	/**
	 * 上下线标记
	 * @param usercode
	 * @return 
	 */
	@Override
	public boolean changeOnlinestatus(String usercode, int onlinestatus) {
		try {
			INSCUser user = inscUserDao.selectByUserCode(usercode);
			if(user.getOnlinestatus()!=null&&user.getOnlinestatus()==onlinestatus){
				return true;
			}else{
				user.setOnlinestatus(onlinestatus);
				inscUserDao.updateById(user);
				return true;
			}
		} catch (Exception e) {
			return false;
		}
		
	}
}
