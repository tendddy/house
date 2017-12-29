package com.cn.hnust.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.cn.hnust.commen.BeanUtils;
import com.cn.hnust.commen.StringUtil;
import com.cn.hnust.pojo.Code;
import com.cn.hnust.pojo.Loudong;
import com.cn.hnust.pojo.Loufang;
import com.cn.hnust.pojo.Loupan;
import com.cn.hnust.pojo.PagingParams;
import com.cn.hnust.pojo.PlatformModel;
import com.cn.hnust.service.ICodeService;
import com.cn.hnust.service.ILoudongService;
import com.cn.hnust.service.ILoufangService;
import com.cn.hnust.service.ILoupanService;

@Controller
@RequestMapping("/")
public class houseController {
	@Resource
	private ILoupanService loupanService;
	@Resource
	private ILoudongService loudongService;
	@Resource
	private ILoufangService loufangService;
	@Resource
	private ICodeService codeService;
	
	@RequestMapping(value = "/initInfo", method = RequestMethod.GET,produces="application/json;charset=UTF-8")
	@ResponseBody
	public String initInfo(@RequestParam(value = "parentcode") String parentcode){
		Map<String,String> parm = new HashMap<>();
		parm.put("parentcode", parentcode);
		List<Code> codes = codeService.getCodeInfo(parm);
		Object returnJson = JSONObject.toJSONStringWithDateFormat(codes, "yyyy-MM-dd HH:mm:ss", SerializerFeature.WriteDateUseDateFormat).toString();
		return returnJson.toString();
	}
	
	@RequestMapping(value = "/initDanyuan", method = RequestMethod.GET,produces="application/json;charset=UTF-8")
	@ResponseBody
	public String initDanyuan(@RequestParam(value = "loudongId") String loudongId,@RequestParam(value = "tabIndex") String tabIndex){
		List<String> codes = new ArrayList<>();
		Map<String, Object> parm = new HashMap<>();
		parm.put("loudongid", loudongId);
		parm.put("tabIndex", tabIndex);
		codes = loufangService.selectByPrimaryKey4Danyuan(parm);
		Object returnJson = JSONObject.toJSONStringWithDateFormat(codes, "yyyy-MM-dd HH:mm:ss", SerializerFeature.WriteDateUseDateFormat).toString();
		return returnJson.toString();
	}
	
	@RequestMapping(value = "loupanInfo", method = RequestMethod.GET)
	public ModelAndView loupanInfo(@RequestParam(value = "loupanId", required = true) String loupanId,@RequestParam(value = "tabIndex", required = true) String tabIndex) {
		ModelAndView mav = new ModelAndView("loudong");
		Map<String, Object> parm = new HashMap<>();
		parm.put("id", loupanId);
		parm.put("tabIndex", tabIndex);
		mav.addObject("loupanmingcheng", loupanService.getLoupanById(parm).getLoupanmingcheng());
		mav.addObject("loupanId", loupanId);
		mav.addObject("tabIndex", tabIndex);
		return mav;
	}
	
	@RequestMapping(value = "loudongInfo", method = RequestMethod.GET)
	public ModelAndView loudongInfo(@RequestParam(value = "loudongId", required = true) String loudongId,@RequestParam(value = "tabIndex", required = true) String tabIndex) {
		ModelAndView mav = new ModelAndView("loufang");
		mav.addObject("loudongId", loudongId);
		mav.addObject("tabIndex", tabIndex);
		return mav;
	}
	
	@RequestMapping(value = "/queryLoupan", method = RequestMethod.GET,produces="application/json;charset=UTF-8")
	@ResponseBody
	public Map<String,Object> queryLoupan(@ModelAttribute PagingParams para,@ModelAttribute PlatformModel platformModel){
		Loupan queryLoupan = new Loupan();
		Map<String, Object> maps = new HashMap<String, Object>();
		if(!StringUtil.isEmpty(platformModel.getCity())) {
			queryLoupan.setLoupanchengshi(platformModel.getCity());
		}else {
			maps.put("total", 0);
			maps.put("rows", null);
			return maps;
		}
		if(!StringUtil.isEmpty(platformModel.getQuyu())) {
			queryLoupan.setLoupanquyu(platformModel.getQuyu());
		}
		if(!StringUtil.isEmpty(platformModel.getLoupanname())) {
			queryLoupan.setLoupanmingcheng(platformModel.getLoupanname());
		}
		if(!StringUtil.isEmpty(platformModel.getJiage())) {
			queryLoupan.setJiagequjian(platformModel.getJiage());
		}
		if(!StringUtil.isEmpty(platformModel.getMianji())) {
			queryLoupan.setMianjiqujian(platformModel.getMianji());
		}
		if(!StringUtil.isEmpty(platformModel.getZongjia())) {
			queryLoupan.setZongjiaqujian(platformModel.getZongjia());
		}
		if(!StringUtil.isEmpty(platformModel.getTabIndex())) {
			queryLoupan.setTabIndex(platformModel.getTabIndex());
		}
		Map<String, Object> map = BeanUtils.toMap(queryLoupan,para);
		maps.put("total", loupanService.selectByEntityCount(map));
		maps.put("rows", loupanService.getLoupanInfo(map));
		return maps;
	}
	
	@RequestMapping(value = "/queryLoudong", method = RequestMethod.GET,produces="application/json;charset=UTF-8")
	@ResponseBody
	public Map<String,Object> queryLoudong(@ModelAttribute PagingParams para,@ModelAttribute PlatformModel platformModel){
		Loudong queryLoudong = new Loudong();
		if(!StringUtil.isEmpty(platformModel.getJiage())) {
			queryLoudong.setJiagequjian(platformModel.getJiage());
		}
		if(!StringUtil.isEmpty(platformModel.getMianji())) {
			queryLoudong.setMianjiqujian(platformModel.getMianji());
		}
		if(!StringUtil.isEmpty(platformModel.getZongjia())) {
			queryLoudong.setZongjiaqujian(platformModel.getZongjia());
		}
		if(!StringUtil.isEmpty(platformModel.getLoupanid())) {
			queryLoudong.setLoupanid(platformModel.getLoupanid());
		}
		if(!StringUtil.isEmpty(platformModel.getTabIndex())) {
			queryLoudong.setTabIndex(platformModel.getTabIndex());
		}
		Map<String, Object> map = BeanUtils.toMap(queryLoudong,para);
		Map<String, Object> maps = new HashMap<String, Object>();
		maps.put("total", loudongService.selectByEntityCount(map));
		maps.put("rows", loudongService.getLoudongInfo(map));
		return maps;
	}
	
	@RequestMapping(value = "/queryLoufang", method = RequestMethod.GET,produces="application/json;charset=UTF-8")
	@ResponseBody
	public Map<String,Object> queryLoufang(@ModelAttribute PagingParams para,@ModelAttribute PlatformModel platformModel){
		Loufang queryLoufang = new Loufang();
		if(!StringUtil.isEmpty(platformModel.getJiage())) {
			queryLoufang.setJiagequjian(platformModel.getJiage());
		}
		if(!StringUtil.isEmpty(platformModel.getMianji())) {
			queryLoufang.setMianjiqujian(platformModel.getMianji());
		}
		if(!StringUtil.isEmpty(platformModel.getZongjia())) {
			queryLoufang.setZongjiaqujian(platformModel.getZongjia());
		}
		if(!StringUtil.isEmpty(platformModel.getLoudongId())) {
			queryLoufang.setLoudongid(platformModel.getLoudongId());
		}
		if(!StringUtil.isEmpty(platformModel.getDanyuan())) {
			queryLoufang.setLoufangdanyuan(platformModel.getDanyuan());
		}
		if(!StringUtil.isEmpty(platformModel.getLoufangzhuangtai())) {
			queryLoufang.setLoufangzhuangtai(platformModel.getLoufangzhuangtai());
		}
		if(!StringUtil.isEmpty(platformModel.getTabIndex())) {
			queryLoufang.setTabIndex(platformModel.getTabIndex());
		}
		Map<String, Object> map = BeanUtils.toMap(queryLoufang,para);
		Map<String, Object> maps = new HashMap<String, Object>();
		maps.put("total", loufangService.selectByEntityCount(map));
		maps.put("rows", loufangService.getloufangInfo(map));
		return maps;
	}
}
