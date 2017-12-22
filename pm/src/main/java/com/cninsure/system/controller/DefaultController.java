package com.cninsure.system.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.cninsure.core.controller.BaseController;
import com.cninsure.core.exception.ControllerException;
import com.cninsure.core.utils.LogUtil;
import com.cninsure.system.entity.INSCDept;
import com.cninsure.system.entity.INSCUser;
import com.cninsure.system.service.INSCDeptService;
import com.cninsure.system.service.INSCMenuService;

@Controller
@RequestMapping("/*")
@SessionAttributes("insc_user")
public class DefaultController extends BaseController {

	@Resource
	private INSCMenuService inscMenuService;
	@Resource
	private INSCDeptService inscDeptService;

	@RequestMapping(value = "application", method = RequestMethod.GET)
	public ModelAndView application(HttpSession session, @ModelAttribute("insc_user") INSCUser user)
			throws ControllerException {
		ModelAndView mav = new ModelAndView("application");
		INSCDept inscDept = inscDeptService.getOrgDept(user.getUserorganization());
		mav.addObject("org", inscDept.getComname());
		mav.addObject("menu", inscMenuService.queryMenusFtl(user.getUsercode(), "0"));
		String openpwd = (String) session.getAttribute(user.getUsercode());
		mav.addObject("ppp", openpwd);
		mav.addObject("username", user.getUsercode());
		mav.addObject("myMenu", inscMenuService.getTaskManageDataByUserCode(user.getUsercode()));
		LogUtil.debug("login username ：" + user.getUsercode());
		return mav;
	}

	@RequestMapping(value = "auth/logout", method = RequestMethod.GET)
	public ModelAndView logout(HttpSession session) throws ControllerException {
		session.invalidate();
		return new ModelAndView("login");
	}

	@RequestMapping(value = "auth/sign")
	public ModelAndView login(HttpServletRequest re) throws ControllerException {
		return new ModelAndView("login");
	}

	@RequestMapping(value = "auth/denied", method = RequestMethod.GET)
	public ModelAndView denied() throws ControllerException {
		return new ModelAndView("denied");
	}

	@RequestMapping(value = "auth/same", method = RequestMethod.GET)
	public ModelAndView same() throws ControllerException {
		return new ModelAndView("same");
	}
	
	@RequestMapping(value = "error", method = RequestMethod.GET)
	public ModelAndView error() throws ControllerException {
		return new ModelAndView("error");
	}

}
