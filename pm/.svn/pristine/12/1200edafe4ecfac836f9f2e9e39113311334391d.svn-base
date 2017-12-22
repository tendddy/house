package com.cninsure.system.security;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.cninsure.system.entity.INSCUser;
import com.cninsure.system.service.INSCUserService;

public class SecurityAuthenticationSuccessHandlerImpl implements AuthenticationSuccessHandler {

	@Resource
	private INSCUserService inscUserService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		HttpSession session = request.getSession();
		String pws = request.getParameter("password") + "";
		String usercode = authentication.getName();
		session.setAttribute(usercode, pws);
		INSCUser user = null;
		if (StringUtils.isNotBlank(usercode)) {
			user = inscUserService.queryByUserCode(usercode);
		}

		session.setAttribute("insc_user", user);
		response.sendRedirect(request.getContextPath() + "/application");
	}

}
