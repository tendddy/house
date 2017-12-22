package com.cninsure.system.manager.scm.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cninsure.system.entity.INSCDept;
import com.cninsure.system.manager.scm.INSCDeptSyncService;
import com.cninsure.system.service.INSCDeptService;


@Service
public class INSCDeptSyncServiceImpl  implements
		INSCDeptSyncService {
	@Resource
	private INSCDeptService inscDeptService;

	@Override
	public void saveDept(INSCDept dept) {
		inscDeptService.insert(dept);
	}

	@Override
	public void updateDept(INSCDept dept) {
		inscDeptService.updateById(dept);
	}

}