package com.cn.hnust.commen;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanMap;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 对Bean进行操作的相关工具方法
 *
 */
public class BeanUtils {
	
	private static ObjectMapper objectMapper = new ObjectMapper(); 
	/**
	 * 将Bean对象转换成Map对象，将忽略掉值为null或size=0的属性
	 * 
	 * @param obj
	 *            对象
	 * @return 若给定对象为null则返回size=0的map对象
	 */
	public static Map<String, Object> toMap(Object obj) {
		Map<String, Object> map = new HashMap<String, Object>();
		if (obj == null) {
			return map;
		}
		BeanMap beanMap = new BeanMap(obj);
		Iterator<?> it = beanMap.keyIterator();
		while (it.hasNext()) {
			String name = it.next().toString();
			Object value = beanMap.get(name);
			// 转换时会将类名也转换成属性，此处去掉
			if (value != null && !name.equals("class")) {
				map.put(name, value);
			}
		}
		return map;
	}

	/**
	 * 该方法将给定的所有对象参数列表转换合并生成一个Map，对于同名属性，依次由后面替换前面的对象属性
	 * 
	 * @param objs
	 *            对象列表
	 * @return 对于值为null的对象将忽略掉
	 */
	public static Map<String, Object> toMap(Object... objs) {
		Map<String, Object> map = new HashMap<String, Object>();
		for (Object object : objs) {
			if (object != null) {
				map.putAll(toMap(object));
			}
		}
		return map;
	}

	/**
	 * 获取接口的泛型类型，如果不存在则返回null
	 * 
	 * @param clazz
	 * @return
	 */
	public static Class<?> getGenericClass(Class<?> clazz) {
		Type t = clazz.getGenericSuperclass();
		if (t instanceof ParameterizedType) {
			Type[] p = ((ParameterizedType) t).getActualTypeArguments();
			return ((Class<?>) p[0]);
		}
		return null;
	}
	
	public static Object instanceFromJSONStr(String jsonstr, int index, Class<?> clazz) {
		JSONArray ja=JSONArray.fromObject(jsonstr);
		return JSONObject.toBean(ja.getJSONObject(index),clazz);
	}
	/** 
     * javaBean,list,array convert to json string 
     */  
    public static String obj2json(Object obj) throws Exception{  
        return objectMapper.writeValueAsString(obj);  
    }  
      
    /** 
     * json string convert to javaBean 
     */  
    public static <T> T json2pojo(String jsonStr,Class<T> clazz) throws Exception{  
        return objectMapper.readValue(jsonStr, clazz);  
    }
    
    /**
     * 判断对象所有属性是否为空，如果全为空则返回true，某个属性不为空则返回false
     */
    public static boolean isNullForObject(Object obj) throws Exception{  
    	for (Field f : obj.getClass().getDeclaredFields()) {
		    f.setAccessible(true);
			if (f.get(obj) != null && !"null".equals(f.get(obj)) && !"".equals(f.get(obj))) { //判断字段是否为空，并且对象属性中的基本都会转为对象类型来判断
			   	return false;
			}
		}
    	return true;
    }
    
}