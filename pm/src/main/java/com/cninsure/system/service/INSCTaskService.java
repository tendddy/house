package com.cninsure.system.service;

import com.cninsure.core.dao.BaseService;
import com.cninsure.system.entity.INSCTask;

public interface INSCTaskService extends BaseService<INSCTask, String> {
	public String getTaskByTasktypeid(String id);
}