package com.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.regex.Pattern;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class ModelUtil {

	public static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public static final SimpleDateFormat ymd = new SimpleDateFormat("yyyy-MM-dd");
	
	public static String splitString(String value,String key){
		String[] arr = value.split(";");
		for(String str : arr){
			String[] oarr = str.split("=");
			if(key.equalsIgnoreCase(oarr[0]) && oarr.length > 1){
				return oarr[1];
			}else{
				continue;
			}
		}
		return "";
	}
	
	/**
	 * java 转换成xml
	 * @param obj 对象实例
	 * @return String xml字符串
	 */
	public static String toXml(Object obj){
		XStream xstream=new XStream();
		//如果没有这句，xml中的根元素会是<包.类名>；或者说：注解根本就没生效，所以的元素名就是类的属性
		xstream.processAnnotations(obj.getClass()); //通过注解方式的，一定要有这句话
		return xstream.toXML(obj);
	}
	
	/**
	 * 将传入xml文本转换成Java对象
	 * @param xmlStr
	 * @param cls  xml对应的class类
	 * @return T   xml对应的class类的实例对象
	 * 
	 * 调用的方法实例：PersonBean person=XmlUtil.toBean(xmlStr, PersonBean.class);
	 */
	@SuppressWarnings("unchecked")
	public static <T> T  toBean(String xmlStr,Class<T> cls){
		//注意：不是new Xstream(); 否则报错：java.lang.NoClassDefFoundError: org/xmlpull/v1/XmlPullParserFactory
		XStream xstream=new XStream(new DomDriver());
		xstream.processAnnotations(cls);
		return (T) xstream.fromXML(xmlStr);			
	}
	
	public static Date conbertStringToDate(String str){
		Date date = new Date();
		try {
			date = sdf.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
	public static Date conbertStringToNyrDate(String str){
		Date date = new Date();
		try {
			date = ymd.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	/**
	 * 判断str是否为数字，正整数 包含0
	 * @param str
	 * @return
	 */
	public static boolean isNumeric(String str){ 
	    Pattern pattern = Pattern.compile("^\\d+$"); 
	    return pattern.matcher(str).matches();    
	 }
	/**
	 * 当前日期增加一天
	 * @return
	 */
	public static Date nowDateAddOneDay(Date date){
		try {
			Calendar c = Calendar.getInstance();
			c.setTime(date);
	        c.add(Calendar.DAY_OF_MONTH, 1);
	        date =(Date) c.getTime();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return date;
	}
	
	/**
	 * 当前日期增加一年
	 * @return
	 */
	public static Date nowDateAddOneYear(Date date){
		try {
			Calendar curr = Calendar.getInstance();
			curr.setTime(date);
			curr.set(Calendar.YEAR,curr.get(Calendar.YEAR)+1);
			date=curr.getTime();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return date;
	}
	
	/**
	 * 日期比较
	 * @param date1
	 * @param date2
	 * @return 1 前面日期大 0 相等 -1 后面日期大
	 */
	 public static int compareDate(Date date1, Date date2) {
	        try {
	            if (date1.getTime() > date2.getTime()) {
	                return 1;
	            } else if (date1.getTime() < date2.getTime()) {
	                return -1;
	            } else {
	                return 0;
	            }
	        } catch (Exception exception) {
	            exception.printStackTrace();
	        }
	        return 0;
	    }

	/**
	 * 判断str是否为浮点数
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isFloatNumber(String str) {
		Pattern pattern = Pattern.compile("^(-?\\d+)(\\.\\d+)?$");
		return pattern.matcher(str).matches();
	}
	
	/** 
     * 根据身份编号获取性别 
     *  
     * @param idCard 
     *            身份编号 
     * @return 性别 0-男，1-女
     */  
    public static int getGenderByIdCard(String idCard) {  
        int sGender = 0;  
        if (18 == idCard.length()) {
        	String sCardNum = idCard.substring(16, 17);  
            if (Integer.parseInt(sCardNum) % 2 != 0) {  
                sGender = 0;  
            } else {  
                sGender = 1;  
            }  
        }  
        return sGender;  
    }  
}
