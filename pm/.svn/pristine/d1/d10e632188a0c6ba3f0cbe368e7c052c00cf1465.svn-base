package com.cninsure.system.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cninsure.core.dao.BaseDao;
import com.cninsure.core.dao.impl.BaseServiceImpl;
import com.cninsure.core.utils.StringUtil;
import com.cninsure.system.dao.INSCCodeDao;
import com.cninsure.system.dao.INSCDeptDao;
import com.cninsure.system.dao.INSCRoleDao;
import com.cninsure.system.dao.INSCUserDao;
import com.cninsure.system.dao.INSCUserRoleDao;
import com.cninsure.system.dao.impl.INSBServiceUtil;
import com.cninsure.system.entity.INSCDept;
import com.cninsure.system.entity.INSCRole;
import com.cninsure.system.entity.INSCUser;
import com.cninsure.system.entity.INSCUserRole;
import com.cninsure.system.service.INSCUserService;

@Service
@Transactional
public class INSCUserServiceImpl extends BaseServiceImpl<INSCUser, String> implements INSCUserService {
	@Resource
	private INSCUserDao inscUserDao;
	@Resource
	private INSCUserRoleDao userRoleDao;
	@Resource
	private INSCRoleDao roleDao;
	@Resource
	private INSCCodeDao codeDao;
	@Resource
	private INSCDeptDao deptDao;
	@Resource
	private INSBServiceUtil serviceUtil;

	@Override
	public INSCUser queryByUserCode(String usercode) {
		return inscUserDao.selectByUserCode(usercode);
	}

	@Override
	public boolean userCodeCheck(String usercode) {
		INSCUser user = inscUserDao.selectByUserCode(usercode);
		if (user == null) {
			return true;
		}
		return false;
	}

	@Override
	public void benchDeleteByIds(List<String> arrayid) {
		inscUserDao.deleteByIdInBatch(arrayid);
	}

	@Override
	protected BaseDao<INSCUser, String> getBaseDao() {
		return inscUserDao;
	}

	@Override
	public boolean changePassword(String usercode, String oldpwd, String newpwd) {
		INSCUser user = inscUserDao.selectByUserCode(usercode);
		if (user.getPassword().equals(StringUtil.md5Base64(oldpwd))) {
			user.setPassword(StringUtil.md5Base64(newpwd));
			inscUserDao.updateById(user);
			return true;
		}
		return false;
	}

	@Override
	public Map<String, Object> initUserList(Map<String, Object> data) {
		Map<String, Object> map = new HashMap<String, Object>();
		long total = inscUserDao.selectPagingCount(data);
		List<Map<Object, Object>> infoList = inscUserDao.selectUserListPaging(data);
		if (infoList != null) {
			for (Map<Object, Object> mapModel : infoList) {
				if ("1".equals(mapModel.get("status"))) {
					mapModel.put("statusStr", "正常");
				} else if ("0".equals(mapModel.get("status"))) {
					mapModel.put("statusStr", "停用");
				}
			}
		}

		map.put("total", total);
		map.put("rows", infoList);
		return map;
	}

	@Override
	public Map<String, String> updateResetPwd(String userIds) {
		Map<String, String> resultMap = new HashMap<String, String>();
		try {
			String[] userIdArray = userIds.split(",");
			for (String userId : userIdArray) {
				INSCUser tempUser = new INSCUser();
				tempUser.setId(userId);
				tempUser.setPassword(StringUtil.md5Base64("123456"));
				inscUserDao.updatePWDById(tempUser);
			}
			resultMap.put("code", "0");
			resultMap.put("message", "操作成功");
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("code", "1");
			resultMap.put("message", "操作失败，请稍候重试");
		}
		return resultMap;
	}

	@Override
	public Map<String, String> updateResetUserSataus(String userIds, int type) {
		Map<String, String> resultMap = new HashMap<String, String>();
		try {
			String[] userIdArray = userIds.split(",");
			for (String userId : userIdArray) {
				INSCUser tempUser = new INSCUser();
				tempUser.setId(userId);
				tempUser.setStatus("0");
				if (type == 1) {
					tempUser.setStatus("0");
					inscUserDao.updateUserStatusById(tempUser);
				} else if (type == 2) {
					tempUser.setStatus("1");
					inscUserDao.updateUserStatus2OnById(tempUser);
				}
			}
			resultMap.put("code", "0");
			resultMap.put("message", "操作成功");
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("code", "1");
			resultMap.put("message", "操作失败，请稍候重试");
		}
		return resultMap;
	}

	@Override
	public List<String> findUserByGroupid(String groupid) {
		List<String> list = null;
		if (StringUtils.isNotBlank(groupid)) {
			list = inscUserDao.selectUserByGroupid(groupid);
		}
		return list;
	}

	@Override
	public Map<String, Object> getEditeData(String id) {
		Map<String, Object> result = new HashMap<String, Object>();

		// 初始化角色信息
		INSCUser user = new INSCUser();
		List<String> roleIds = new ArrayList<String>();
		List<INSCRole> roleModelList = new ArrayList<INSCRole>();

		if (id != null) {
			user = inscUserDao.selectById(id);
			user.setMaturitydata(user.getMaturitydata().substring(0, 10));
			INSCDept deptModel = deptDao.selectById(user.getUserorganization());

			if (deptModel != null) {
				user.setComname(deptModel.getComname());
				roleIds = userRoleDao.selectRoleidByUserid(id);
			}
		}
		result.put("user", user);
		// role
		List<Map<String, Object>> roleList = roleDao.selectAllList();

		if (!roleIds.isEmpty()) {
			for (String roleid : roleIds) {
				roleModelList.add(roleDao.selectById(roleid));
			}
		}
		result.put("roleList", roleList);
		result.put("addList", roleModelList);
		System.out.println(roleModelList);

		// 初始化性别下拉框
		return result;
	}

	@Override
	public void saveOrUpdate(INSCUser operator, INSCUser user, String roleIds) {

		List<String> newRoleIdList = new ArrayList<String>();
		String[] tempArray = null;
		if (roleIds != null && roleIds != "") {
			try {
				tempArray = roleIds.split(",");
			} catch (Exception e) {
				tempArray[0] = roleIds;
				e.printStackTrace();
			}
			if (tempArray != null) {
				for (String str : tempArray) {
					newRoleIdList.add(str);
				}
			}
		}

		// 新增
		if (StringUtil.isEmpty(user.getId()) || user.getId() == null) {
			// 新增用户默认属于groupid为1的群组
			user.setGroupid("1");
			user.setCreatetime(new Date());
			user.setOperator(operator.getUsercode());
			user.setPassword(StringUtil.md5Base64(user.getPassword()));
			String userId = inscUserDao.insertReturnId(user);

			if (tempArray != null) {
				List<INSCUserRole> addList = new ArrayList<INSCUserRole>();
				for (String id : newRoleIdList) {
					INSCUserRole model = new INSCUserRole();
					model.setCreatetime(new Date());
					model.setOperator(operator.getUsercode());
					model.setRoleid(id);
					model.setUserid(userId);
					model.setStatus("1");
					addList.add(model);
				}
				userRoleDao.insertInBatch(addList);
			}
		} else {

			INSCUser olduser = inscUserDao.selectById(user.getId());

			// 判断当前两个密码是否相同 不相同 需要加密
			if (!olduser.getPassword().equals(user.getPassword())) {
				user.setPassword(StringUtil.md5Base64(user.getPassword()));
			}
			// 修改
			user.setModifytime(new Date());
			user.setOperator(operator.getUsercode());
			inscUserDao.updateById(user);

			// 已经保存的角色id
			List<String> oldRoleIds = userRoleDao.selectRoleidByUserid(user.getId());

			Map<String, List<String>> resultMap = serviceUtil.updateUtil(newRoleIdList, oldRoleIds);

			List<String> deleteRoleIds = resultMap.get("delete");
			for (String id : deleteRoleIds) {
				Map<String, String> paramMap = new HashMap<String, String>();
				paramMap.put("roleId", id);
				userRoleDao.deleteByUserIdRoleId(paramMap);
			}

			List<String> addRoleIds = resultMap.get("add");

			List<INSCUserRole> addList = new ArrayList<INSCUserRole>();
			for (String id : addRoleIds) {
				INSCUserRole model = new INSCUserRole();
				model.setCreatetime(new Date());
				model.setOperator(operator.getUsercode());
				model.setRoleid(id);
				model.setUserid(user.getId());
				model.setStatus("1");
				addList.add(model);
			}
			userRoleDao.insertInBatch(addList);
		}
	}
}
