package com.cn.hnust.commen;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.SortedMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.net.URLCodec;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringEscapeUtils;

public class StringUtil {
	/**
	 * UTF-8的三个字节的BOM
	 */
	public static final byte[] BOM = new byte[] { (byte) 239, (byte) 187, (byte) 191 };

	/**
	 * 十六进制字符
	 */
	public static final char HexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

	/**
	 * 获取指定字符串的MD5摘要
	 */
	public static byte[] md5(String src) {
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			byte[] md = md5.digest(src.getBytes());
			return md;
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 获取指定二进制数组的MD5摘要
	 */
	public static byte[] md5(byte[] src) {
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			byte[] md = md5.digest(src);
			return md;
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 将字符串进行md5摘要，然后输出成十六进制形式
	 */
	public static String md5Hex(String src) {
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			byte[] md = md5.digest(src.getBytes());
			return hexEncode(md);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 将字符串进行MD5摘要，输出成BASE64形式
	 */
	public static String md5Base64(String str) {
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			return base64Encode(md5.digest(str.getBytes()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 将十六制进表示MD5摘要转换成BASE64格式
	 */
	public static String md5Base64FromHex(String md5str) {
		char[] cs = md5str.toCharArray();
		byte[] bs = new byte[16];
		for (int i = 0; i < bs.length; i++) {
			char c1 = cs[i * 2];
			char c2 = cs[i * 2 + 1];
			byte m1 = 0;
			byte m2 = 0;
			for (byte k = 0; k < 16; k++) {
				if (HexDigits[k] == c1) {
					m1 = k;
				}
				if (HexDigits[k] == c2) {
					m2 = k;
				}
			}
			bs[i] = (byte) (m1 << 4 | 0x0 + m2);

		}
		String newstr = base64Encode(bs);
		return newstr;
	}

	/**
	 * 将十六制进表示MD5摘要转换成BASE64格式
	 */
	public static String md5HexFromBase64(String base64str) {
		return hexEncode(base64Decode(base64str));
	}

	/**
	 * 将二进制数组转换成十六进制表示
	 */
	public static String hexEncode(byte[] bs) {
		return new String(new Hex().encode(bs));
	}

	/**
	 * 将字符串转换成十六进制表示
	 */
	public static byte[] hexDecode(String str) {
		try {
			if (str.endsWith("\n")) {
				str = str.substring(0, str.length() - 1);
			}
			char[] cs = str.toCharArray();
			return Hex.decodeHex(cs);
		} catch (DecoderException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 将字节数组转换成二制形式字符串
	 */
	public static String byteToBin(byte[] bs) {
		char[] cs = new char[bs.length * 9];
		for (int i = 0; i < bs.length; i++) {
			byte b = bs[i];
			int j = i * 9;
			cs[j] = (b >>> 7 & 1) == 1 ? '1' : '0';
			cs[j + 1] = (b >>> 6 & 1) == 1 ? '1' : '0';
			cs[j + 2] = (b >>> 5 & 1) == 1 ? '1' : '0';
			cs[j + 3] = (b >>> 4 & 1) == 1 ? '1' : '0';
			cs[j + 4] = (b >>> 3 & 1) == 1 ? '1' : '0';
			cs[j + 5] = (b >>> 2 & 1) == 1 ? '1' : '0';
			cs[j + 6] = (b >>> 1 & 1) == 1 ? '1' : '0';
			cs[j + 7] = (b & 1) == 1 ? '1' : '0';
			cs[j + 8] = ',';
		}
		return new String(cs);
	}

	/**
	 * 转换字节数组为十六进制字串
	 */

	public static String byteArrayToHexString(byte[] b) {
		StringBuffer resultSb = new StringBuffer();
		for (int i = 0; i < b.length; i++) {
			resultSb.append(byteToHexString(b[i]));
			resultSb.append(" ");
		}
		return resultSb.toString();
	}

	/**
	 * 字节转换为十六进制字符串
	 */
	private static String byteToHexString(byte b) {
		int n = b;
		if (n < 0) {
			n = 256 + n;
		}
		int d1 = n / 16;
		int d2 = n % 16;
		return HexDigits[d1] + "" + HexDigits[d2];
	}

	/**
	 * 判断指定的二进制数组是否是一个UTF-8字符串
	 */
	public static boolean isUTF8(byte[] bs) {
		if (StringUtil.hexEncode(ArrayUtils.subarray(bs, 0, 3)).equals("efbbbf")) {// BOM标志
			return true;
		}
		int lLen = bs.length;
		for (int i = 0; i < lLen;) {
			byte b = bs[i++];
			if (b >= 0) {
				continue;// >=0 is normal ascii
			}
			if (b < (byte) 0xc0 || b > (byte) 0xfd) {
				return false;
			}
			int c = b > (byte) 0xfc ? 5 : b > (byte) 0xf8 ? 4 : b > (byte) 0xf0 ? 3 : b > (byte) 0xe0 ? 2 : 1;
			if (i + c > lLen) {
				return false;
			}
			for (int j = 0; j < c; ++j, ++i) {
				if (bs[i] >= (byte) 0xc0) {
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * 返回二进制数组的BASE64编码结果
	 */
	public static String base64Encode(byte[] b) {
		if (b == null) {
			return null;
		}
		return Base64.encodeBase64String(b);
	}

	/**
	 * 将 BASE64 编码的字符串进行解码
	 */
	public static byte[] base64Decode(String s) {
		if (s != null) {
			Base64.decodeBase64(s);
		}
		return null;
	}

	/**
	 * 将字符串转换成可以在JAVA表达式中直接使用的字符串，处理一些转义字符
	 */
	public static String javaEncode(String txt) {
		if (txt == null || txt.length() == 0) {
			return txt;
		}
		txt = replaceEx(txt, "\\", "\\\\");
		txt = replaceEx(txt, "\r\n", "\n");
		txt = replaceEx(txt, "\r", "\\r");
		txt = replaceEx(txt, "\t", "\\t");
		txt = replaceEx(txt, "\n", "\\n");
		txt = replaceEx(txt, "\"", "\\\"");
		txt = replaceEx(txt, "\'", "\\\'");
		return txt;
	}

	/**
	 * 将StringUtil.javaEncode()处理过的字符还原
	 */
	public static String javaDecode(String txt) {
		if (txt == null || txt.length() == 0) {
			return txt;
		}
		txt = replaceEx(txt, "\\\\", "\\");
		txt = replaceEx(txt, "\\n", "\n");
		txt = replaceEx(txt, "\\r", "\r");
		txt = replaceEx(txt, "\\\"", "\"");
		txt = replaceEx(txt, "\\\'", "\'");
		return txt;
	}

	/**
	 * 将一个字符串按照指下的分割字符串分割成数组。分割字符串不作正则表达式处理，<br>
	 * String类的split方法要求以正则表达式分割字符串，有时较为不便，可以转为采用本方法。
	 */
	public static String[] splitEx(String str, String spilter) {
		if (str == null) {
			return null;
		}
		if (spilter == null || spilter.equals("") || str.length() < spilter.length()) {
			String[] t = { str };
			return t;
		}
		List<String> al = new ArrayList<String>();
		char[] cs = str.toCharArray();
		char[] ss = spilter.toCharArray();
		int length = spilter.length();
		int lastIndex = 0;
		for (int i = 0; i <= str.length() - length;) {
			boolean notSuit = false;
			for (int j = 0; j < length; j++) {
				if (cs[i + j] != ss[j]) {
					notSuit = true;
					break;
				}
			}
			if (!notSuit) {
				al.add(str.substring(lastIndex, i));
				i += length;
				lastIndex = i;
			} else {
				i++;
			}
		}
		if (lastIndex <= str.length()) {
			al.add(str.substring(lastIndex, str.length()));
		}
		String[] t = new String[al.size()];
		for (int i = 0; i < al.size(); i++) {
			t[i] = (String) al.get(i);
		}
		return t;
	}

	/**
	 * 将一个字符串中的指定片段全部替换，替换过程中不进行正则处理。<br>
	 * 使用String类的replaceAll时要求片段以正则表达式形式给出，有时较为不便，可以转为采用本方法。
	 */
	public static String replaceEx(String str, String subStr, String reStr) {
		if (str == null) {
			return null;
		}
		if (subStr == null || subStr.equals("") || subStr.length() > str.length() || reStr == null) {
			return str;
		}
		StringBuffer sb = new StringBuffer();
		int lastIndex = 0;
		while (true) {
			int index = str.indexOf(subStr, lastIndex);
			if (index < 0) {
				break;
			} else {
				sb.append(str.substring(lastIndex, index));
				sb.append(reStr);
			}
			lastIndex = index + subStr.length();
		}
		sb.append(str.substring(lastIndex));
		return sb.toString();
	}

	/**
	 * 不区分大小写的全部替换，替换时使用了正则表达式。
	 */
	public static String replaceAllIgnoreCase(String source, String oldstring, String newstring) {
		Pattern p = Pattern.compile(oldstring, Pattern.DOTALL | Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(source);
		return m.replaceAll(newstring);
	}

	/**
	 * 以指定编码进行URL编码
	 */
	public static String urlEncode(String str, String charset) {
		try {
			return new URLCodec().encode(str, charset);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 以指定编码进行URL解码
	 */
	public static String urlDecode(String str, String charset) {
		try {
			return new URLCodec().decode(str, charset);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 对字符串进行HTML编码
	 */
	public static String htmlEncode(String txt) {
		return StringEscapeUtils.escapeHtml4(txt);
	}

	/**
	 * 对字符串进行HTML解码
	 */
	public static String htmlDecode(String txt) {
		txt = replaceEx(txt, "&#8226;", "·");
		return StringEscapeUtils.unescapeHtml4(txt);
	}

	/**
	 * 替换字符串中的双引号
	 */
	public static String quotEncode(String txt) {
		if (txt == null || txt.length() == 0) {
			return txt;
		}
		txt = replaceEx(txt, "&", "&amp;");
		txt = replaceEx(txt, "\"", "&quot;");
		return txt;
	}

	/**
	 * 还原通过StringUtil.quotEncode()编码的字符串
	 */
	public static String quotDecode(String txt) {
		if (txt == null || txt.length() == 0) {
			return txt;
		}
		txt = replaceEx(txt, "&quot;", "\"");
		txt = replaceEx(txt, "&amp;", "&");
		return txt;
	}

	/**
	 * Javascript中escape的JAVA实现
	 */
	public static String escape(String src) {
		char j;
		StringBuffer sb = new StringBuffer();
		sb.ensureCapacity(src.length() * 6);
		for (int i = 0; i < src.length(); i++) {
			j = src.charAt(i);
			if (Character.isDigit(j) || Character.isLowerCase(j) || Character.isUpperCase(j)) {
				sb.append(j);
			} else if (j < 256) {
				sb.append("%");
				if (j < 16) {
					sb.append("0");
				}
				sb.append(Integer.toString(j, 16));
			} else {
				sb.append("%u");
				sb.append(Integer.toString(j, 16));
			}
		}
		return sb.toString();
	}

	/**
	 * Javascript中unescape的JAVA实现
	 */
	public static String unescape(String src) {
		StringBuffer sb = new StringBuffer();
		sb.ensureCapacity(src.length());
		int lastPos = 0, pos = 0;
		char ch;
		while (lastPos < src.length()) {
			pos = src.indexOf("%", lastPos);
			if (pos == lastPos) {
				if (src.charAt(pos + 1) == 'u') {
					ch = (char) Integer.parseInt(src.substring(pos + 2, pos + 6), 16);
					sb.append(ch);
					lastPos = pos + 6;
				} else {
					ch = (char) Integer.parseInt(src.substring(pos + 1, pos + 3), 16);
					sb.append(ch);
					lastPos = pos + 3;
				}
			} else {
				if (pos == -1) {
					sb.append(src.substring(lastPos));
					lastPos = src.length();
				} else {
					sb.append(src.substring(lastPos, pos));
					lastPos = pos;
				}
			}
		}
		return sb.toString();
	}

	/**
	 * 在一字符串左边填充若干指定字符，使其长度达到指定长度
	 */
	public static String leftPad(String srcString, char c, int length) {
		if (srcString == null) {
			srcString = "";
		}
		int tLen = srcString.length();
		int i, iMax;
		if (tLen >= length)
			return srcString;
		iMax = length - tLen;
		StringBuffer sb = new StringBuffer();
		for (i = 0; i < iMax; i++) {
			sb.append(c);
		}
		sb.append(srcString);
		return sb.toString();
	}

	/**
	 * 将长度超过length的字符串截取length长度，若不足，则返回原串
	 */
	public static String subString(String src, int length) {
		if (src == null) {
			return null;
		}
		int i = src.length();
		if (i > length) {
			return src.substring(0, length);
		} else {
			return src;
		}
	}

	/**
	 * 将长度超过length的字符串截取length长度，若不足，则返回原串。<br>
	 * 其中ASCII字符只算半个长度单位。
	 */
	public static String subStringEx(String src, int length) {
		length = length * 2;
		if (src == null) {
			return null;
		}
		int k = lengthEx(src);
		if (k > length) {
			int m = 0;
			boolean unixFlag = false;
			String osname = System.getProperty("os.name").toLowerCase();
			if (osname.indexOf("sunos") > 0 || osname.indexOf("solaris") > 0 || osname.indexOf("aix") > 0) {
				unixFlag = true;
			}
			try {
				byte[] b = src.getBytes("Unicode");
				for (int i = 2; i < b.length; i += 2) {
					byte flag = b[i + 1];
					if (unixFlag) {
						flag = b[i];
					}
					if (flag == 0) {
						m++;
					} else {
						m += 2;
					}
					if (m > length) {
						return src.substring(0, (i - 2) / 2);
					}
				}
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
				throw new RuntimeException("执行方法getBytes(\"Unicode\")时出错！");
			}
		}
		return src;
	}

	/**
	 * 获得字符串的长度，其中ASCII字符算1个长度单位,非ASCII字符算两个长度单位
	 */
	public static int lengthEx(String src) {
		int length = 0;
		boolean unixFlag = false;
		String osname = System.getProperty("os.name").toLowerCase();
		if (osname.indexOf("sunos") > 0 || osname.indexOf("solaris") > 0 || osname.indexOf("aix") > 0) {
			unixFlag = true;
		}
		try {
			byte[] b = src.getBytes("Unicode");
			for (int i = 2; i < b.length; i += 2) {
				byte flag = b[i + 1];
				if (unixFlag) {
					flag = b[i];
				}
				if (flag == 0) {
					length++;
				} else {
					length += 2;
				}
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			throw new RuntimeException("执行方法getBytes(\"Unicode\")时出错！");
		}
		return length;
	}

	/**
	 * 计算输入字符串的字节长度
	 * 
	 * @author zhangjinquan 11180
	 * @createdate 2013-01-15
	 * @param str
	 * @return
	 */
	public static int getByteLength(String str) {
		if (null == str) {
			return 4;
		}
		int len = str.length();
		int byteLen = 0;
		for (int i = 0; i < len; i++) {
			if (str.charAt(i) > 255) {
				byteLen += 2;
			} else {
				byteLen += 1;
			}
		}
		return byteLen;
	}

	/**
	 * 右侧字节截取替换
	 * 
	 * @author zhangjinquan 11180
	 * @createdate 2013-01-15
	 * @param str
	 * @param len
	 * @param padChar
	 * @return
	 */
	public static String rPadByte(String str, int len, String padChar) {
		if (null == str) {
			return str;
		}

		int preSublen = 0;
		String substr = "";
		int strlen = str.length();
		for (int i = 0; i < strlen; i++) {
			substr = str.substring(0, i + 1);
			int sublen = getByteLength(substr);
			if (sublen > len) {
				substr = str.substring(0, i);
				break;
			}
			preSublen = sublen;
		}

		if ((null == padChar) || ("".equals(padChar))) {
			return substr;
		}

		for (int i = 0; i < (len - preSublen); i++) {
			substr += padChar;
		}
		return substr;
	}

	/**
	 * 左侧字节截取替换
	 * 
	 * @author zhangjinquan 11180
	 * @createdate 2013-01-15
	 * @param str
	 * @param len
	 * @param padChar
	 * @return
	 */
	public static String lPadByte(String str, int len, String padChar) {
		if (null == str) {
			return str;
		}

		int preSublen = 0;
		String substr = "";
		int strlen = str.length();
		for (int i = 0; i < strlen; i++) {
			substr = str.substring(strlen - i, strlen);
			int sublen = getByteLength(substr);
			if (sublen > len) {
				substr = str.substring(strlen - i + 1, strlen);
				break;
			}
			preSublen = sublen;
		}

		if ((null == padChar) || ("".equals(padChar))) {
			return substr;
		}

		for (int i = 0; i < (len - preSublen); i++) {
			substr = padChar + substr;
		}
		return substr;
	}

	/**
	 * 在一字符串右边填充若干指定字符，使其长度达到指定长度
	 */
	public static String rightPad(String srcString, char c, int length) {
		if (srcString == null) {
			srcString = "";
		}
		int tLen = srcString.length();
		int i, iMax;
		if (tLen >= length)
			return srcString;
		iMax = length - tLen;
		StringBuffer sb = new StringBuffer();
		sb.append(srcString);
		for (i = 0; i < iMax; i++) {
			sb.append(c);
		}
		return sb.toString();
	}

	/**
	 * 清除字符右边的空格
	 */
	public static String rightTrim(String src) {
		if (src != null) {
			char[] chars = src.toCharArray();
			for (int i = chars.length - 1; i >= 0; i--) {
				if (chars[i] == ' ' || chars[i] == '\t' || chars[i] == '\r') {
					continue;
				} else {
					return src.substring(0, i + 1);
				}
			}
			return "";// 说明全是空格
		}
		return src;
	}

	/**
	 * 历遍所有字符集，看哪种字符集下可以正确转化
	 */
	public static void printStringWithAnyCharset(String str) {
		SortedMap<String, Charset> map = Charset.availableCharsets();
		Object[] keys = map.keySet().toArray();
		for (int i = 0; i < keys.length; i++) {
			for (int j = 0; j < keys.length; j++) {
				System.out.print("\t");
				try {
					System.out.println("From " + keys[i] + " To " + keys[j] + ":" + new String(str.getBytes(keys[i].toString()), keys[j].toString()));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * 半角转全角，转除英文字母之外的字符
	 */
	public static String toSBC(String input) {
		char[] c = input.toCharArray();
		for (int i = 0; i < c.length; i++) {
			if (c[i] == 32) {
				c[i] = (char) 12288;
				continue;
			}
			if ((c[i] > 64 && c[i] < 91) || (c[i] > 96 && c[i] < 123)) {
				continue;
			}

			if (c[i] < 127)
				c[i] = (char) (c[i] + 65248);
		}
		return new String(c);
	}

	/**
	 * 半角转全角，转所有能转为全角的字符，包括英文字母
	 */
	public static String toNSBC(String input) {
		char[] c = input.toCharArray();
		for (int i = 0; i < c.length; i++) {
			if (c[i] == 32) {
				c[i] = (char) 12288;
				continue;
			}

			if (c[i] < 127)
				c[i] = (char) (c[i] + 65248);
		}
		return new String(c);
	}

	/**
	 * 全角转半角的函数
	 * 
	 * 全角空格为12288，半角空格为32 <br>
	 * 其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
	 */
	public static String toDBC(String input) {
		char[] c = input.toCharArray();
		for (int i = 0; i < c.length; i++) {
			if (c[i] == 12288) {
				c[i] = (char) 32;
				continue;
			}
			if (c[i] > 65280 && c[i] < 65375)
				c[i] = (char) (c[i] - 65248);
		}
		return new String(c);
	}

	public static final Pattern PTitle = Pattern.compile("<title>(.+?)</title>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL);

	/**
	 * 从一段html文本中提取出<title>标签内容
	 */
	public static String getHtmlTitle(String html) {
		Matcher m = PTitle.matcher(html);
		if (m.find()) {
			return m.group(1).trim();
		}
		return null;
	}

	public static Pattern patternHtmlTag = Pattern.compile("<[^<>]+>", Pattern.DOTALL);

	/**
	 * 清除HTML文本中所有标签
	 */
	public static String clearHtmlTag(String html) {
		String text = patternHtmlTag.matcher(html).replaceAll("");
		if (isEmpty(text)) {
			return "";
		}
		text = StringUtil.htmlDecode(html);
		return text.replaceAll("[\\s　]{2,}", " ");
	}

	/**
	 * 首字母大写
	 */
	public static String capitalize(String str) {
		int strLen;
		if (str == null || (strLen = str.length()) == 0) {
			return str;
		}
		return new StringBuffer(strLen).append(Character.toTitleCase(str.charAt(0))).append(str.substring(1)).toString();
	}

	/**
	 * 字符串是否为空，null或空字符串时返回true,其他情况返回false
	 */
	public static boolean isEmpty(String str) {
		return str == null || str.trim().length() == 0 || "null".equalsIgnoreCase(str.trim());
	}

	/**
	 * 字符串是否为空，null或空字符串时返回true,其他情况返回false
	 */
	public static boolean isEmpty(Object str) {
		return str == null || "".equals(str.toString().trim()) || "null".equalsIgnoreCase(str.toString().trim());
	}

	/**
	 * 字符串是否不为空，null或空字符串时返回false,其他情况返回true
	 */
	public static boolean isNotEmpty(String str) {
		return !StringUtil.isEmpty(str);
	}

	/**
	 * 字符串为空时返回defaultString，否则返回原串
	 */
	public static final String noNull(String string, String defaultString) {
		return isEmpty(string) ? defaultString : string;
	}

	/**
	 * 字符串为空时返回defaultString，否则返回空字符串
	 */
	public static final String noNull(String string) {
		return noNull(string, "");
	}

	/**
	 * 将一个数组拼成一个字符串，数组项之间以逗号分隔
	 */
	public static String join(Object[] arr) {
		return join(arr, ",");
	}

	/**
	 * 将一个二维数组拼成一个字符串，第二维以逗号分隔，第一维以换行分隔
	 */
	public static String join(Object[][] arr) {
		return join(arr, "\n", ",");
	}

	/**
	 * 将一个数组以指定的分隔符拼成一个字符串
	 */
	public static String join(Object[] arr, String spliter) {
		if (arr == null) {
			return null;
		}
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < arr.length; i++) {
			// 2011-1-20 更改，当arr[i]为空时不能加入到sb中
			if (StringUtil.isNotEmpty(String.valueOf(arr[i]))) {
				if (i != 0) {
					sb.append(spliter);
				}
				sb.append(arr[i]);
			}
		}
		return sb.toString();
	}

	/**
	 * 将一个二维数组拼成一个字符串，第二维以指定的spliter2参数分隔，第一维以换行spliter1分隔
	 */
	public static String join(Object[][] arr, String spliter1, String spliter2) {
		if (arr == null) {
			return null;
		}
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < arr.length; i++) {
			if (i != 0) {
				sb.append(spliter2);
			}
			sb.append(join(arr[i], spliter2));
		}
		return sb.toString();
	}

	/**
	 * 将一个List拼成一个字符串，数据项之间以逗号分隔
	 */
	public static String join(List<?> list) {
		return join(list, ",");
	}

	/**
	 * 将一个List拼成一个字符串，数据项之间以指定的参数spliter分隔
	 */
	public static String join(List<?> list, String spliter) {
		if (list == null) {
			return null;
		}
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < list.size(); i++) {
			if (i != 0) {
				sb.append(spliter);
			}
			sb.append(list.get(i));
		}
		return sb.toString();
	}

	/**
	 * 计算一个字符串中某一子串出现的次数
	 */
	public static int count(String str, String findStr) {
		int lastIndex = 0;
		int length = findStr.length();
		int count = 0;
		int start = 0;
		while ((start = str.indexOf(findStr, lastIndex)) >= 0) {
			lastIndex = start + length;
			count++;
		}
		return count;
	}

	public static final Pattern PLetterOrDigit = Pattern.compile("^\\w*$", Pattern.CASE_INSENSITIVE | Pattern.DOTALL);

	public static final Pattern PLetter = Pattern.compile("^[A-Za-z]*$", Pattern.CASE_INSENSITIVE | Pattern.DOTALL);

	public static final Pattern PDigit = Pattern.compile("^\\d*$", Pattern.CASE_INSENSITIVE | Pattern.DOTALL);

	/**
	 * 判断字符串是否全部由数字或字母组成
	 */
	public static boolean isLetterOrDigit(String str) {
		return PLetterOrDigit.matcher(str).find();
	}
 
	/**
	 * 判断字符串是否全部字母组成
	 */
	public static boolean isLetter(String str) {
		return PLetter.matcher(str).find();
	}

	/**
	 * 判断字符串是否全部由数字组成
	 */
	public static boolean isDigit(String str) {
		if (StringUtil.isEmpty(str)) {
			return false;
		}
		return PDigit.matcher(str).find();
	}

	private static Pattern chinesePattern = Pattern.compile("[^\u4e00-\u9fa5]+", Pattern.CASE_INSENSITIVE | Pattern.DOTALL);

	/**
	 * 判断字符串中是否含有中文字符
	 */
	public static boolean containsChinese(String str) {
		if (!chinesePattern.matcher(str).matches()) {
			return true;
		}
		return false;
	}

	private static Pattern idPattern = Pattern.compile("[\\w\\s\\_\\.\\,]*", Pattern.CASE_INSENSITIVE | Pattern.DOTALL);

	/**
	 * 检查ID，防止SQL注入，主要是在删除时传入多个ID时使用
	 */
	public static boolean checkID(String str) {
		if (StringUtil.isEmpty(str)) {
			return true;
		}
		if (idPattern.matcher(str).matches()) {
			return true;
		}
		return false;
	}

	/**
	 * 得到URL的文件扩展名
	 */
	public static String getURLExtName(String url) {
		if (isEmpty(url)) {
			return null;
		}
		int index1 = url.indexOf('?');
		if (index1 == -1) {
			index1 = url.length();
		}
		int index2 = url.lastIndexOf('.', index1);
		if (index2 == -1) {
			return null;
		}
		int index3 = url.indexOf('/', 8);
		if (index3 == -1) {
			return null;
		}
		String ext = url.substring(index2 + 1, index1);
		if (ext.matches("[^\\/\\\\]*")) {
			return ext;
		}
		return null;
	}

	/**
	 * 得到URL的文件名
	 */
	public static String getURLFileName(String url) {
		if (isEmpty(url)) {
			return null;
		}
		int index1 = url.indexOf('?');
		if (index1 == -1) {
			index1 = url.length();
		}
		int index2 = url.lastIndexOf('/', index1);
		if (index2 == -1 || index2 < 8) {
			return null;
		}
		String ext = url.substring(index2 + 1, index1);
		return ext;
	}

	/**
	 * 去掉XML字符串中的非法字符, 在XML中0x00-0x20 都会引起一定的问题
	 */
	public static String clearForXML(String str) {
		char[] cs = str.toCharArray();
		char[] ncs = new char[cs.length];
		int j = 0;
		for (int i = 0; i < cs.length; i++) {
			if (cs[i] > 0xFFFD) {
				continue;
			} else if (cs[i] < 0x20 && cs[i] != '\t' & cs[i] != '\n' & cs[i] != '\r') {
				continue;
			}
			ncs[j++] = cs[i];
		}
		ncs = ArrayUtils.subarray(ncs, 0, j);
		return new String(ncs);
	}

	public static boolean isMail(String mail) {
		if (isEmpty(mail)) {
			return false;
		}
		Pattern pattern = Pattern.compile("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");
		Matcher matcher = pattern.matcher(mail);
		return matcher.matches();
	}

	public static boolean isMobileNO(String mobiles) {
		if (isEmpty(mobiles)) {
			return false;
		}
		Pattern p = Pattern.compile("^[1][3-8][0-9]{9}$");
		Matcher m = p.matcher(mobiles);
		boolean flag = m.matches();
		System.out.println(flag);
		return m.matches();
	}

	public static boolean isPasword(String password) {
		if (isEmpty(password) || (password.length() < 6 || password.length() > 16)) {
			return false;
		}
		int num = 0;
		num = Pattern.compile("\\d").matcher(password).find() ? num + 1 : num;
		num = Pattern.compile("[a-z]").matcher(password).find() ? num + 1 : num;
		num = Pattern.compile("[A-Z]").matcher(password).find() ? num + 1 : num;
		num = Pattern.compile("[-.!@#$%^&*()+?><]").matcher(password).find() ? num + 1 : num;
		if (num >= 2) {
			return true;
		}
		return false;
	}

	/**
	 * 转化输入字符串中的特殊字符为HTML编码字符串
	 * 
	 * @param str
	 * @return
	 */
	public static String escapeSpecialLetter(String str) {
		if (null == str) {
			return str;
		}
		return str.replaceAll("\\&(?!#)", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39;").replaceAll("!", "&#33;")
				.replaceAll(":", "&#58;").replaceAll("\\\\", "&#92;").replaceAll("/", "&#47;").replaceAll("%", "&#37;").replaceAll("\\(", "&#40").replaceAll("\\)", "&#41").replaceAll("=", "&#61;");
	}

	/**
	 * 清除带有UTF-8排版用空格C2A0,是 UTF8里的排版用空格,和头尾空格trim()
	 */
	public static String trim(String src) {
		if (src != null && src.contains(" ")) {
			src = src.replaceAll(" ", " ");
		}
		return src.trim();
	}

	/**
	 * 
	 * @Title: isInteger
	 * @Description: 判断字符串中是否是非负整数
	 * @return boolean 返回类型
	 * @author yt
	 */
	public static boolean isInteger(String value) {
		try {
			int val = Integer.parseInt(value);
			if (val >= 0) {
				return true;
			} else {
				return false;
			}
		} catch (NumberFormatException e) {
			return false;
		}
	}

	public static String notNull(String a) {
		if (isEmpty(a)) {
			a = "";
		}
		return a;
	}

	/**
	 * 格式化小数点
	 * 
	 * @param f
	 * @param length
	 * @return
	 */
	public static String DecimalFormat(double f, int length) {
		if (f == 0) {
			return "0";
		}
		BigDecimal b = new BigDecimal(f);
		return b.setScale(length, BigDecimal.ROUND_HALF_UP).toString();
	}

	/**
	 * 方差计算
	 * 
	 * @param f
	 * @param length
	 * @return
	 */
	public static double Variance(String param, int length) {
		try {
			if (StringUtil.isEmpty(param) || "-".equals(param)) {
				return 0;
			}

			Double d1 = Double.parseDouble(param);
			if (d1 > 0) {
				BigDecimal b = new BigDecimal(Math.log(d1));
				return b.setScale(length, BigDecimal.ROUND_HALF_UP).doubleValue();

			} else {
				return 0;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	/**
	 * 方差计算
	 * 
	 * @param f
	 * @param length
	 * @return
	 */
	public static double divide(double d1, double d2, int length) {
		try {
			if (d2 == 0) {
				return 0;
			}

			return new BigDecimal(d1).divide(new BigDecimal(d2), length, BigDecimal.ROUND_HALF_UP).doubleValue();

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	/**
	 * 方差计算
	 * 
	 * @param f
	 * @param length
	 * @return
	 */
	public static int dividetoint(double d1, double d2) {
		try {
			if (d2 == 0) {
				return 0;
			}

			return new BigDecimal(d1).divide(new BigDecimal(d2), 0, BigDecimal.ROUND_HALF_UP).intValue();

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
}
