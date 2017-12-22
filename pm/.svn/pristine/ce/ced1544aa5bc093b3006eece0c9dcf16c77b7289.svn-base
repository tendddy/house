package com.cninsure.system.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cninsure.core.dao.BaseDao;
import com.cninsure.core.dao.impl.BaseServiceImpl;
import com.cninsure.core.utils.StringUtil;
import com.cninsure.system.dao.INSCMenuDao;
import com.cninsure.system.dao.INSCRoleMenuDao;
import com.cninsure.system.dao.INSCUserDao;
import com.cninsure.system.dao.INSCUserRoleDao;
import com.cninsure.system.entity.INSCMenu;
import com.cninsure.system.service.INSCMenuService;

@Service
@Transactional
public class INSCMenuServiceImpl extends BaseServiceImpl<INSCMenu, String> implements INSCMenuService {
	@Resource
	private INSCMenuDao inscMenuDao;
	@Resource
	private INSCUserRoleDao userRoleDao;
	@Resource
	private INSCUserDao userDao;
	@Resource
	private INSCRoleMenuDao roleMenuDao;

	@Override
	protected BaseDao<INSCMenu, String> getBaseDao() {
		return inscMenuDao;
	}

	// @Cacheable(value="menuCache")
	public String queryMenusFtl(String usercode, String parentnodecode) {

		List<String> myMenuIds = new ArrayList<String>();

		String userId = userDao.selectIdByCode4Menu(usercode);
		if (userId != null) {
			// 得到当前用户所属角色
			List<String> roleIds = userRoleDao.selectRoleidByUserid(userId);
			if (roleIds != null) {
				List<String> menuIds = roleMenuDao.selectMenuIdsByRoleIds4Menu(roleIds);
				if (menuIds != null) {
					myMenuIds = inscMenuDao.selectCodeByIds4Menu(menuIds);
				}
			}

		}

		List<Map<Object, Object>> resultList = this.queryMenusByUserCode(usercode, parentnodecode, myMenuIds);

		StringBuffer tbody = new StringBuffer();
		tbody.append("<ul class=\"nav navbar-nav\">");
		for (int i = 0; i < resultList.size(); i++) {
			Map<Object, Object> map1 = new HashMap<Object, Object>();
			map1 = (Map<Object, Object>) resultList.get(i);
			if (!"".equals(map1.get("children"))) {
				INSCMenu tempInscMenu1 = new INSCMenu();
				tempInscMenu1 = (INSCMenu) map1.get("menu");
				tbody.append(
						"<li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"collapse\" data-target=\"#sub-"
								+ i + "\"><span class=\"" + tempInscMenu1.getIconurl() + " cus-icon\"></span>"
								+ tempInscMenu1.getNodename() + "<b class=\"caret\"></b></a>");
				@SuppressWarnings("unchecked")
				List<Map<Object, Object>> list1 = (List<Map<Object, Object>>) map1.get("children");
				tbody.append(
						"<div id=\"sub-" + i + "\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\">");
				for (int j = 0; j < list1.size(); j++) {

					Map<Object, Object> map2 = new HashMap<Object, Object>();
					map2 = (Map<Object, Object>) list1.get(j);
					INSCMenu tempInscMenu2 = new INSCMenu();
					tempInscMenu2 = (INSCMenu) map2.get("menu");
					if (!"".equals(map2.get("children"))) {
						@SuppressWarnings("unchecked")
						List<Map<Object, Object>> list2 = (List<Map<Object, Object>>) map2.get("children");
						tbody.append(
								"<li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"collapse\" data-target=\"#sub-"
										+ i + "_" + j + "\"><span class=\"" + tempInscMenu2.getIconurl()
										+ " cus-icon\"></span>" + tempInscMenu2.getNodename()
										+ "<b class=\"caret\"></b></a>");
						tbody.append("<div id=\"sub-" + i + "_" + j
								+ "\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\">");
						for (int k = 0; k < list2.size(); k++) {
							INSCMenu tempInscMenu3 = new INSCMenu();
							Map<Object, Object> map3 = new HashMap<Object, Object>();
							map3 = (Map<Object, Object>) list2.get(k);
							tempInscMenu3 = (INSCMenu) map3.get("menu");
							tbody.append("<li><a data-bind=\"" + tempInscMenu3.getActiveurl()
									+ "\" target=\"fra_content\"><span class=\"" + tempInscMenu3.getIconurl()
									+ " cus-icon\"></span>" + tempInscMenu3.getNodename() + "</a></li>");
						}
						tbody.append("</ul></div></li>");
					} else {
						tbody.append("<li><a data-bind=\"" + tempInscMenu2.getActiveurl()
								+ "\" target=\"fra_content\"><span class=\"" + tempInscMenu2.getIconurl()
								+ " cus-icon\"></span>" + tempInscMenu2.getNodename() + "</a></li>");
					}

				}
				tbody.append("</ul></div></li>");

			} else {
				INSCMenu tempInscMenu4 = new INSCMenu();
				tempInscMenu4 = (INSCMenu) map1.get("menu");
				tbody.append("<li><a data-bind=\"" + tempInscMenu4.getActiveurl()
						+ "\" target=\"fra_content\"><span class=\"" + tempInscMenu4.getIconurl()
						+ " cus-icon\"></span>" + tempInscMenu4.getNodename() + "</a></li>");
			}

		}
		tbody.append("</ul>");
		return tbody.toString();
	}

	private List<Map<Object, Object>> queryMenusByUserCode(String usercode, String parentnodecode,
			List<String> myMenuIds) {
		List<Map<Object, Object>> resultList = new ArrayList<>();
		List<INSCMenu> tempListMenu = new ArrayList<INSCMenu>();
		if ("0".equals(parentnodecode)) {
			List<INSCMenu> myTempListMenu = inscMenuDao.selectMenuByParentNodeCode(parentnodecode);

			for (INSCMenu model : myTempListMenu) {
				if (myMenuIds.contains(model.getNodecode())) {
					tempListMenu.add(model);
				}
			}
		} else if (myMenuIds.contains(parentnodecode)) {
			List<INSCMenu> myTempListMenu = inscMenuDao.selectMenuByParentNodeCode(parentnodecode);
			for (INSCMenu model : myTempListMenu) {
				if (myMenuIds.contains(model.getNodecode())) {
					tempListMenu.add(model);
				}
			}
		}
		// tempListMenu =
		// inscMenuDao.selectMenuByParentNodeCode(parentnodecode);

		if (!tempListMenu.isEmpty()) {
			for (int i = 0; i < tempListMenu.size(); i++) {

				INSCMenu tempInscMenu = new INSCMenu();
				Map<Object, Object> tempMap = new HashMap<Object, Object>();
				tempInscMenu = tempListMenu.get(i);
				tempMap.put("menu", tempInscMenu);
				tempMap.put("children", "1".equals(tempInscMenu.getChildflag())
						? this.queryMenusByUserCode(usercode, tempInscMenu.getNodecode(), myMenuIds) : "");
				resultList.add(tempMap);
			}
		}
		return resultList;
	}

	@Override
	public List<Map<Object, Object>> queryMenusList(String id, String NoParentnodecode) {
		List<Map<Object, Object>> resultList = new ArrayList<>();
		List<INSCMenu> tempListMenu = new ArrayList<INSCMenu>();
		INSCMenu inscmenu = new INSCMenu();
		String parentnodecode = null;
		if (id != null && !"".equals(id)) {
			inscmenu = inscMenuDao.selectById(id);
			parentnodecode = inscmenu.getNodecode();
		} else if (id == null || StringUtil.isEmpty(parentnodecode) || "source".equalsIgnoreCase(parentnodecode)) {
			parentnodecode = "0";
		}
		/*
		 * if(StringUtil.isEmpty(parentnodecode) ||
		 * "source".equalsIgnoreCase(parentnodecode)){ parentnodecode = "0"; }
		 */
		tempListMenu = inscMenuDao.selectMenuByParentNodeCode(parentnodecode);
		for (int i = 0; i < tempListMenu.size(); i++) {
			INSCMenu tempInscMenu = new INSCMenu();
			Map<Object, Object> tempMap = new HashMap<Object, Object>();
			tempInscMenu = tempListMenu.get(i);
			/**
			 * ztree数据
			 */
			tempMap.put("name", tempInscMenu.getNodename());
			tempMap.put("id", tempInscMenu.getId());
			tempMap.put("pid", tempInscMenu.getParentnodecode());
			tempMap.put("isParent", "1".equals(tempInscMenu.getChildflag()) ? "true" : "false");

			resultList.add(tempMap);
		}
		return resultList;
	}

	@Override
	public INSCMenu queryByNodeCode(String nodecode) {
		INSCMenu menu = new INSCMenu();
		menu = (INSCMenu) inscMenuDao.selectByNodeCode(nodecode);
		return menu;
	}

	@Override
	public Map<String, String> getTaskManageDataByUserCode(String usercode) {

		Map<String, String> result = new HashMap<String, String>();
		String userId = userDao.selectIdByCode4Menu(usercode);
		if (userId != null) {
			// 得到当前用户所属角色
			List<String> roleIds = userRoleDao.selectRoleidByUserid(userId);
			if (roleIds != null) {
				List<String> menuIds = roleMenuDao.selectMenuIdsByRoleIds4Menu(roleIds);
				// 判断当前菜单是否包含
				List<String> myIds = new ArrayList<String>();
				myIds.add("17");
				myIds.add("18");
				myIds.add("55");

				String myData = "";
				if (menuIds.contains("17")) {
					myData += "m0017,";
				}
				if (menuIds.contains("18")) {
					myData += "m0018,";
				}
				if (menuIds.contains("55")) {
					myData += "m0025,";
				}
				if (myData.length() > 0) {
					myData.substring(0, myData.length() - 1);
					result.put("myMenu", myData);
				}
			}
		}
		return result;
	}
}
