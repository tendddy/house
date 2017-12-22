package com.cninsure.system.security;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.SecurityMetadataSource;
import org.springframework.security.access.intercept.AbstractSecurityInterceptor;
import org.springframework.security.access.intercept.InterceptorStatusToken;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class SecurityDefaultInterceptor extends AbstractSecurityInterceptor implements Filter {
	private String loginPath = "/login";
	private long failureTime = 1000;

	private FilterInvocationSecurityMetadataSource securityMetadataSource;

	public SecurityDefaultInterceptor(String loginPath) {
		if (StringUtils.isNoneBlank(loginPath)) {
			this.loginPath = loginPath;
		}
	}

	public FilterInvocationSecurityMetadataSource getSecurityMetadataSource() {
		return securityMetadataSource;
	}

	public void setSecurityMetadataSource(FilterInvocationSecurityMetadataSource securityMetadataSource) {
		this.securityMetadataSource = securityMetadataSource;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httprequest = (HttpServletRequest) request;
		HttpSession session = httprequest.getSession();
		System.out.println(httprequest.getPathInfo());
		// System.out.println(failureTime);
		if (httprequest.getPathInfo() == null) {
			request.getRequestDispatcher("/auth/sign").forward(request, response);
			return;
		}
		// 登录页面不做验证
		if (loginPath.equals(httprequest.getPathInfo())) {
			request.getRequestDispatcher(httprequest.getPathInfo()).forward(request, response);
			return;
		} else if (httprequest.getPathInfo().startsWith("/mobile/")) {
			// 直接跳过的地址
			if (httprequest.getPathInfo().startsWith("/mobile/login/")
					|| httprequest.getPathInfo().startsWith("/mobile/pay/callback")
					|| httprequest.getPathInfo().startsWith("/mobile/registered/")
					|| httprequest.getPathInfo().startsWith("/mobile/basedata/my/generalSetting/")) {
				request.getRequestDispatcher(httprequest.getPathInfo()).forward(request, response);
				return;
			}
			String token = httprequest.getHeader("token");
			if (null == token || "".equals(token)) {
				System.out.println("token 不存在");
				request.getRequestDispatcher("/mobile/login/loginstatus?status=" + "1000").forward(request, response);
				return;
			} else {
				@SuppressWarnings("unchecked")
				Map<String, Object> obj = (Map<String, Object>) session.getAttribute(token);
				if (null == obj) {
					System.out.println("object 不存在");
					request.getRequestDispatcher("/mobile/login/loginstatus?status=" + "2000").forward(request,
							response);
					return;
				} else {
					JSONObject jsonContext = JSONObject.fromObject(obj.get("permissions"));
					JSONArray jsonArray = JSONArray.fromObject(jsonContext.getString("context"));
					// 得到最后活动时间
					long lastActiveTime = (long) obj.get("lastActiveTime");
					long nowTime = System.currentTimeMillis();
					if (nowTime - lastActiveTime > failureTime) {
						System.out.println("超时了，重新登录");
						request.getRequestDispatcher("/mobile/login/loginstatus?status=" + "3000").forward(request,
								response);
						// 清空SESSION令牌
						session.removeAttribute(token);
						return;
					} else {
						if (containsURL(jsonArray, httprequest.getPathInfo())) {
							obj.put("lastActiveTime", nowTime);
							session.setAttribute(token, obj);
							request.getRequestDispatcher(httprequest.getPathInfo()).forward(request, response);
							return;
						} else {
							System.out.println("非法请求");
							request.getRequestDispatcher("/mobile/login/loginstatus?status=" + "4000").forward(request,
									response);
							return;
						}
					}
				}
			}
		} else {
			FilterInvocation fi = new FilterInvocation(request, response, chain);
			InterceptorStatusToken token = super.beforeInvocation(fi);
			try {
				fi.getChain().doFilter(fi.getRequest(), fi.getResponse());
			} finally {
				super.afterInvocation(token, null);
			}
		}
	}

	private boolean containsURL(JSONArray jsonArray, String path) {
		boolean result = false;
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject jsonObject = JSONObject.fromObject(jsonArray.get(i));
			String addresscode = jsonObject.getString("addresscode");
			if (path.startsWith("/mobile/" + addresscode)) {
				result = true;
			}
		}
		return result;
	}

	@Override
	public Class<?> getSecureObjectClass() {
		return FilterInvocation.class;
	}

	@Override
	public SecurityMetadataSource obtainSecurityMetadataSource() {
		return this.securityMetadataSource;
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

	@Override
	public void destroy() {
	}

	public long getFailureTime() {
		return failureTime;
	}

	public void setFailureTime(long failureTime) {
		this.failureTime = failureTime;
	}

}
