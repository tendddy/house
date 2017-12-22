package com.common.httpClient;

import java.io.File;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpConnectionManager;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.MultiThreadedHttpConnectionManager;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.FilePartSource;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.methods.multipart.StringPart;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.httpclient.util.IdleConnectionTimeoutThread;

/* *
 *类名：HttpProtocolHandler
 *功能：HttpClient方式访问
 *详细：获取远程HTTP数据
 *版本：3.3
 *日期：2012-08-17
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class HttpProtocolHandler {

	private static String DEFAULT_CHARSET = "GBK";

	/** 连接超时时间，由bean factory设置，缺省为8秒钟 */
	private int defaultConnectionTimeout = 8000;

	/** 回应超时时间, 由bean factory设置，缺省为30秒钟 */
	private int defaultSoTimeout = 30000;

	/** 闲置连接超时时间, 由bean factory设置，缺省为60秒钟 */
	private int defaultIdleConnTimeout = 60000;

	private int defaultMaxConnPerHost = 30;

	private int defaultMaxTotalConn = 80;

	/** 默认等待HttpConnectionManager返回连接超时（只有在达到最大连接数时起作用）：1秒 */
	private static final long defaultHttpConnectionManagerTimeout = 3 * 1000;

	/**
	 * HTTP连接管理器，该连接管理器必须是线程安全的.
	 */
	private HttpConnectionManager connectionManager;

	private static HttpProtocolHandler httpProtocolHandler = new HttpProtocolHandler();

	/**
	 * 工厂方法
	 * 
	 * @return
	 */
	public static HttpProtocolHandler getInstance() {
		return httpProtocolHandler;
	}

	/**
	 * 私有的构造方法
	 */
	private HttpProtocolHandler() {

		// 创建一个线程安全的HTTP连接池
		connectionManager = new MultiThreadedHttpConnectionManager();
		connectionManager.getParams().setDefaultMaxConnectionsPerHost(
				defaultMaxConnPerHost);
		connectionManager.getParams().setMaxTotalConnections(
				defaultMaxTotalConn);

		IdleConnectionTimeoutThread ict = new IdleConnectionTimeoutThread();
		ict.addConnectionManager(connectionManager);
		ict.setConnectionTimeout(defaultIdleConnTimeout);

		ict.start();
	}

	/**
	 * 执行Http请求
	 * 
	 * @param request
	 *            请求数据
	 * @param strParaFileName
	 *            文件类型的参数名
	 * @param strFilePath
	 *            文件路径
	 * @return
	 * @throws HttpException
	 *             , IOException
	 */
	public HttpResponse execute(HttpRequest request, String strParaFileName,String strFilePath) throws HttpException, IOException {
		HttpClient httpclient = new HttpClient(connectionManager);

		// 设置连接超时
		int connectionTimeout = defaultConnectionTimeout;
		if (request.getConnectionTimeout() > 0) {
			connectionTimeout = request.getConnectionTimeout();
		}
		httpclient.getHttpConnectionManager().getParams().setConnectionTimeout(connectionTimeout);

		// 设置回应超时
		int soTimeout = defaultSoTimeout;
		if (request.getTimeout() > 0) {
			soTimeout = request.getTimeout();
		}
		httpclient.getHttpConnectionManager().getParams().setSoTimeout(soTimeout);

		// 设置等待ConnectionManager释放connection的时间
		httpclient.getParams().setConnectionManagerTimeout(defaultHttpConnectionManagerTimeout);

		String charset = request.getCharset();
		charset = charset == null ? DEFAULT_CHARSET : charset;
		HttpMethod method = null;

		// get模式且不带上传文件
		if (request.getMethod().equals(HttpRequest.METHOD_GET)) {
			method = new GetMethod(request.getUrl());
			method.getParams().setCredentialCharset(charset);

			// parseNotifyConfig会保证使用GET方法时，request一定使用QueryString
			method.setQueryString(request.getQueryString());

		} else if (strParaFileName.equals("") && strFilePath.equals("")) {
			// post模式且不带上传文件
			method = new PostMethod(request.getUrl());
			((PostMethod) method).addParameters(request.getParameters());
			method.addRequestHeader("Content-Type",
					"application/x-www-form-urlencoded; text/html; charset="
							+ charset);

		} else {
			// post模式且带上传文件
			method = new PostMethod(request.getUrl());
			List<Part> parts = new ArrayList<Part>();
			for (int i = 0; i < request.getParameters().length; i++) {
				parts.add(new StringPart(request.getParameters()[i].getName(),
						request.getParameters()[i].getValue(), charset));
			}
			// 增加文件参数，strParaFileName是参数名，使用本地文件
			parts.add(new FilePart(strParaFileName, new FilePartSource(
					new File(strFilePath))));

			// 设置请求体
			((PostMethod) method).setRequestEntity(new MultipartRequestEntity(
					parts.toArray(new Part[0]), new HttpMethodParams()));
		}

		// 设置Http Header中的User-Agent属性
		method.addRequestHeader("User-Agent", "Mozilla/4.0");
		HttpResponse response = new HttpResponse();

		try {
			httpclient.executeMethod(method);
			if (request.getResultType().equals(HttpResultType.STRING)) {
				response.setStringResult(method.getResponseBodyAsString());
			} else if (request.getResultType().equals(HttpResultType.BYTES)) {
				response.setByteResult(method.getResponseBody());
			}
			response.setResponseHeaders(method.getResponseHeaders());
		} catch (UnknownHostException ex) {

			return null;
		} catch (IOException ex) {

			return null;
		} catch (Exception ex) {

			return null;
		} finally {
			method.releaseConnection();
		}
		return response;
	}

	/**
	 * 暴露简单接口
	 * 
	 * @param url
	 * @param param
	 *            Map<String,Object>
	 * @param method
	 *            HttpRequest.METHOD_POST
	 * @return
	 * @throws IOException 
	 * @throws HttpException 
	 */
	public String execute(String url, Map<String, Object> param, String method) throws HttpException, IOException {
		HttpRequest request = new HttpRequest(HttpResultType.STRING);
		request.setCharset("UTF-8");
		request.setMethod(method);
		request.setUrl(url);
		
		if (!param.isEmpty()) {
			HttpResponse response = new HttpResponse();
			int objectLength = param.size();
			NameValuePair[] parametersArray = new NameValuePair[objectLength];

			Set<String> keySet =  param.keySet();
			List<String> keyList = new ArrayList<String>(keySet);
			for (int i = 0; i < keyList.size(); i++) {
				NameValuePair nvp = new NameValuePair();
				nvp.setName(keyList.get(i));
				nvp.setValue(param.get(keyList.get(i)).toString());
				parametersArray[i] = nvp;
			}
			request.setParameters(parametersArray);
			response = this.execute(request, "", "");
			return response.getStringResult();
		}
		return null;
	}

	private static void t2() {

		NameValuePair v1 = new NameValuePair("version","v1.0");
		NameValuePair v2 = new NameValuePair("charset","1");
		NameValuePair v3 = new NameValuePair("systemid","1608110001");
		NameValuePair v4 = new NameValuePair("businesstype","10000000");
		NameValuePair v5 = new NameValuePair("msgseqno","20160830180502000001");
		NameValuePair v6 = new NameValuePair("accountnumber","5KC0hIdSP6Bn5QUrxC9INRG9J7UYflFG");
		NameValuePair v7 = new NameValuePair("accountname","ttL72Bux/00=");
		NameValuePair v8 = new NameValuePair("accountnumber","5KC0hIdSP6Bn5QUrxC9INRG9J7UYflFG");
		NameValuePair v9 = new NameValuePair("identificationtype","01");
		NameValuePair v10 = new NameValuePair("identificationnumber","/9rpvZMSy1vzIg0GhLA2Anqv4D0u89Wt");
		NameValuePair v11 = new NameValuePair("phonenumber","roLGyIZK4eXTZ9YR8zap1Q==");
		NameValuePair v12 = new NameValuePair("cardtype","10");
		NameValuePair v13 = new NameValuePair("validdate","");
		NameValuePair v14 = new NameValuePair("cvn2","");
		NameValuePair v15 = new NameValuePair("orderid","");
		NameValuePair v16 = new NameValuePair("orderpayfee","");
		NameValuePair v17 = new NameValuePair("custominfo","");
		NameValuePair v18 = new NameValuePair("fronturl","");
		NameValuePair v19 = new NameValuePair("receiveurl","");
		NameValuePair v20 = new NameValuePair("reserved","");
		NameValuePair v21 = new NameValuePair("signmsg","Eguw6umh+mIyF1oJMA9877QHnxD0txHcGi46bXofmSbZ+bd3rUx6gjEPt7ebiDAFR9w4KjBR96lyhpGwn9u8sj0hMs3Lcii1Mub5g+Drqi0qECr85H/K0UyAqTf0sPEhkBHcLLxjAnvAXR+a3hLZImjzGQooJpJlOWNJngBOsW4=");

		HttpRequest request = new HttpRequest(HttpResultType.STRING);
		request.setUrl("http://demo.shang-lian.com/bankcardVerify.html");
		request.setMethod(HttpRequest.METHOD_POST);
		request.setParameters(new NameValuePair[]{v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19,v20,v21});
		request.setCharset("UTF-8");
		
		try {
			HttpResponse response = HttpProtocolHandler.getInstance().execute(request, "", "");
			System.out.println(response.getStringResult());
		} catch (HttpException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private static void  t3(){
		Map<String,Object> param = new HashMap<String, Object>();
		    param.put("version","v1.0");//
			param.put("charset","1");//
			param.put("systemid","1608110001");//
			param.put("businesstype","10000000");//
			param.put("msgseqno","20160830180502000001");//
			param.put("accountnumber","5KC0hIdSP6Bn5QUrxC9INRG9J7UYflFG");//
			param.put("accountname","ttL72Bux/00=");//
			param.put("accountnumber","5KC0hIdSP6Bn5QUrxC9INRG9J7UYflFG");//
			param.put("identificationtype","01");//
			param.put("identificationnumber","/9rpvZMSy1vzIg0GhLA2Anqv4D0u89Wt");//
			param.put("phonenumber","roLGyIZK4eXTZ9YR8zap1Q==");//
			param.put("cardtype","10");//
			param.put("validdate","");//
			param.put("cvn2","");//
			param.put("orderid","");//
			param.put("orderpayfee","");//
			param.put("custominfo","");//
			param.put("fronturl","");//
			param.put("receiveurl","");//
			param.put("reserved","");//
			param.put("signmsg","Eguw6umh+mIyF1oJMA9877QHnxD0txHcGi46bXofmSbZ+bd3rUx6gjEPt7ebiDAFR9w4KjBR96lyhpGwn9u8sj0hMs3Lcii1Mub5g+Drqi0qECr85H/K0UyAqTf0sPEhkBHcLLxjAnvAXR+a3hLZImjzGQooJpJlOWNJngBOsW4=");

			
			try {
				String aa = HttpProtocolHandler.getInstance().execute("http://demo.shang-lian.com/bankcardVerify.html", param, "POST");
			
				System.out.println(aa);
			} catch (IOException e) {
				e.printStackTrace();
			}
	}
	public static void main(String[] args) {
		t3();
	}
}
