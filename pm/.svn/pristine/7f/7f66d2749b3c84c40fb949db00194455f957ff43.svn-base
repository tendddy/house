package com.cninsure.system.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.cninsure.core.controller.BaseController;
import com.cninsure.core.exception.ControllerException;
import com.cninsure.core.utils.StringUtil;
import com.cninsure.core.utils.UUIDUtils;
import com.cninsure.system.entity.INSCDept;
import com.cninsure.system.entity.INSCUser;
import com.cninsure.system.service.INSCDeptService;

import net.sf.json.JSONArray;

@Controller
@RequestMapping("/dept/*")
public class DeptController extends BaseController {

	@Resource
	private INSCDeptService service;

	@RequestMapping(value = "list", method = RequestMethod.GET)
	public ModelAndView returnInstitution() throws ControllerException {
		ModelAndView model = new ModelAndView("system/inscdeptlist");
		return model;
	}

	@RequestMapping(value = "inscdeptlist", method = RequestMethod.POST, produces = { "text/json;charset=UTF-8" })
	@ResponseBody
	public String institutionTreeList(@RequestParam(value = "root", required = false) String parentcode)
			throws ControllerException {
		List<Map<Object, Object>> resultinstitutionList = new ArrayList<Map<Object, Object>>();
		resultinstitutionList = service.queryDeptList(parentcode);
		System.out.println(JSONArray.fromObject(resultinstitutionList).toString() + "qiuxiaolin");
		return JSONArray.fromObject(resultinstitutionList).toString();
	}

	@RequestMapping(value = "updatedept", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView updateOrg(HttpSession session, @ModelAttribute INSCDept dept) throws ControllerException {
		ModelAndView mav = new ModelAndView("system/inscdeptlist");
		Date now = new Date();
		
		String uuid = UUIDUtils.random();
		if (StringUtil.isEmpty(dept.getId())) {
			dept.setId(uuid);
			dept.setComcode(uuid);
			dept.setCreatetime(now);
			dept.setModifytime(now);
			dept.setChildflag("0");
			dept.setOperator(((INSCUser) session.getAttribute("insc_user")).getUsername());
			service.addDeptData(dept);
			if (dept.getUpcomcode() != null) {
				service.updateDeptById(dept.getUpcomcode());
			}
		} else {
			dept.setModifytime(now);
			dept.setOperator(((INSCUser) session.getAttribute("insc_user")).getUsername());
			service.updateById(dept);
		}
		mav.addObject("flag", "success");
		return mav;
	}

	@RequestMapping(value = "deletbyid", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView deleteById(String id) throws ControllerException {
		ModelAndView model = new ModelAndView("system/inscdeptlist");
		String upcode = service.queryById(id).getUpcomcode();
		int count = service.deleteById(id);
		model.addObject("count", count + "");
		if (service.queryDeptList(upcode).size() < 1) {
			service.updateDeptByIddel(upcode);
		}
		return model;
	}

	@RequestMapping(value = "querybyid", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView queryById(String id) throws ControllerException {
		ModelAndView model = new ModelAndView("system/inscdeptlist");
		INSCDept s = service.queryById(id);
		model.addObject("orgobject", s);
		return model;
	}
}
