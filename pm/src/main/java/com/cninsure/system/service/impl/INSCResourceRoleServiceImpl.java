package com.cninsure.system.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cninsure.system.entity.INSCMenu;
import com.cninsure.system.entity.INSCRole;
import com.cninsure.system.entity.INSCRoleMenu;
import com.cninsure.system.service.INSCMenuService;
import com.cninsure.system.service.INSCResourceRoleService;
import com.cninsure.system.service.INSCRoleMenuService;
import com.cninsure.system.service.INSCRoleService;

/**
 * @author hlj
 * @date 14:40 2015/6/12
 *
 */
@Service
@Transactional
public class INSCResourceRoleServiceImpl implements INSCResourceRoleService {
	@Autowired
	public INSCMenuService inscMenuServiceImpl;
	@Autowired
	public INSCRoleService inscRoleServiceImpl;
	@Autowired
	public INSCRoleMenuService inscRoleMenuServiceImpl;

	/*
	 * 获得资源和角色的对应关系信息
	 * 
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cninsure.system.service.INSCResourceRoleService#getResourceRolesMap()
	 */
	@Override
	public Map<String, List<String>> getResourceRolesMap() {
		Map<String, List<String>> map = null;
		List<INSCMenu> menuList = inscMenuServiceImpl.queryAll();
		List<INSCRoleMenu> roleMenuList = inscRoleMenuServiceImpl.queryAll();
		List<INSCRole> roleList = inscRoleServiceImpl.queryAll();
		List<String> rolecodeList = null;
		if ((menuList != null) && (menuList.size() > 0)
				&& (!menuList.isEmpty())) {
			map = new HashMap<String, List<String>>();
			for (INSCMenu menu : menuList) {
				String menuId = menu.getId();
				String activeUrl = menu.getActiveurl();
				if (StringUtils.isNotBlank(activeUrl)) {
					rolecodeList = new ArrayList<String>();

					if (StringUtils.isNotBlank(menuId)
							&& (roleMenuList != null)
							&& (roleMenuList.size() > 0)
							&& (!roleMenuList.isEmpty())) {
						for (INSCRoleMenu roleMenu : roleMenuList) {
							String rMenuId = roleMenu.getMenuid();
							if (StringUtils.isNotBlank(rMenuId)
									&& (menuId.equals(rMenuId))) {
								String rRowid = roleMenu.getRoleid();
								if (StringUtils.isNotBlank(rRowid)
										&& (roleList != null)
										&& (roleList.size() > 0)
										&& (!roleList.isEmpty())) {
									for (INSCRole role : roleList) {
										String rowId = role.getId();
										if (StringUtils
												.isNotBlank(rowId)
												&& (rowId
														.equals(rRowid))) {
											String rolecode = role
													.getRolecode();

											if (StringUtils
													.isNotBlank(rolecode))
												rolecodeList.add(rolecode);

										}

									}

								}

							}

						}

					}

					map.put(activeUrl, rolecodeList);
					rolecodeList = null;
				}

			}

		}

		return map;
	}
}
