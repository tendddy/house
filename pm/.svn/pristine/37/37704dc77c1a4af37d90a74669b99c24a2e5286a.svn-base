package com.cninsure.core.dao.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.cninsure.core.dao.BaseDao;
import com.cninsure.core.dao.constants.SqlId;
import com.cninsure.core.dao.domain.Identifiable;
import com.cninsure.core.exception.DaoException;
import com.cninsure.core.utils.BeanUtils;
import com.cninsure.core.utils.StringUtil;
import com.cninsure.core.utils.UUIDUtils;

/**
 * 基础Dao接口实现类，实现改类的子类必须设置泛型类型
 */
public abstract class BaseDaoImpl<T, PK extends Serializable> implements BaseDao<T, PK> {

	private Class<T> entityClass;

	@SuppressWarnings("unchecked")
	public BaseDaoImpl() {
		Type genType = getClass().getGenericSuperclass();
		Type[] params = ((ParameterizedType) genType).getActualTypeArguments();
		entityClass = (Class<T>) params[0];
	}

	@Autowired(required = true)
	protected SqlSession sqlSessionTemplate;

	public static final String SQLNAME_SEPARATOR = "_";

	/**
	 * @fields sqlNamespace SqlMapping命名空间
	 */
	private String sqlNamespace = getDefaultSqlNamespace();

	/**
	 * 获取泛型类型的实体对象类全名
	 */
	protected String getDefaultSqlNamespace() {
		Class<?> genericClass = BeanUtils.getGenericClass(this.getClass());
		return genericClass == null ? null : genericClass.getName();
	}

	/**
	 * 获取SqlMapping命名空间
	 * 
	 * @return SqlMapping命名空间
	 */
	public String getSqlNamespace() {
		return sqlNamespace;
	}

	/**
	 * 设置SqlMapping命名空间。 以改变默认的SqlMapping命名空间， 不能滥用此方法随意改变SqlMapping命名空间。
	 * 
	 * @param sqlNamespace
	 *            SqlMapping命名空间
	 */
	public void setSqlNamespace(String sqlNamespace) {
		this.sqlNamespace = sqlNamespace;
	}

	/**
	 * 将SqlMapping命名空间与给定的SqlMapping名组合在一起。
	 * 
	 * @param sqlName
	 *            SqlMapping名
	 * @return 组合了SqlMapping命名空间后的完整SqlMapping名
	 */
	protected String getSqlName(String sqlName) {
		return sqlNamespace + SQLNAME_SEPARATOR + sqlName;
	}

	/**
	 * 生成主键值。 默认使用{@link UUIDUtils#create()}方法 如果需要生成主键，需要由子类重写此方法根据需要的方式生成主键值。
	 * 
	 * @param entity
	 *            要持久化的对象
	 */
	protected String generateId() {
		return UUIDUtils.create();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#selectOne(java.io.Serializable)
	 */
	@Override
	public <V extends T> V selectOne(T query) {
		Assert.notNull(query);
		try {
			Map<String, Object> params = BeanUtils.toMap(query);
			return sqlSessionTemplate.selectOne(getSqlName(SqlId.SQL_SELECT_ONE), params);
		} catch (Exception e) {
			throw new DaoException(String.format("查询一条记录出错！语句：%s", getSqlName(SqlId.SQL_SELECT_ONE)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#selectById(java.io.Serializable)
	 */
	@Override
	public <V extends T> V selectById(PK id) {
		Assert.notNull(id);
		try {
			return sqlSessionTemplate.selectOne(getSqlName(SqlId.SQL_SELECT_BY_ID), id);
		} catch (Exception e) {
			throw new DaoException(String.format("根据ID查询对象出错！语句：%s", getSqlName(SqlId.SQL_SELECT_BY_ID)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#selectList(java.io.Serializable)
	 */
	@Override
	public <V extends T> List<V> selectList(T query) {
		try {
			Map<String, Object> params = BeanUtils.toMap(query);
			return sqlSessionTemplate.selectList(getSqlName(SqlId.SQL_SELECT), params);
		} catch (Exception e) {
			throw new DaoException(String.format("查询对象列表出错！语句：%s", getSqlName(SqlId.SQL_SELECT)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#selectAll()
	 */
	@Override
	public <V extends T> List<V> selectAll() {
		try {
			return sqlSessionTemplate.selectList(getSqlName(SqlId.SQL_SELECT));
		} catch (Exception e) {
			throw new DaoException(String.format("查询所有对象列表出错！语句：%s", getSqlName(SqlId.SQL_SELECT)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#selectMap(java.io.Serializable,
	 * java.lang.String)
	 */
	@Override
	public <K, V extends T> Map<K, V> selectMap(T query, String mapKey) {
		Assert.notNull(mapKey, "[mapKey] - must not be null!");
		try {
			Map<String, Object> params = BeanUtils.toMap(query);
			return sqlSessionTemplate.selectMap(getSqlName(SqlId.SQL_SELECT), params, mapKey);
		} catch (Exception e) {
			throw new DaoException(String.format("查询对象Map时出错！语句：%s", getSqlName(SqlId.SQL_SELECT)), e);
		}
	}

	/**
	 * 设置分页
	 * 
	 * @param pageInfo
	 *            分页信息
	 * @return SQL分页参数对象
	 */
	protected RowBounds getRowBounds(Pageable pageable) {
		RowBounds bounds = RowBounds.DEFAULT;
		if (null != pageable) {
			bounds = new RowBounds(pageable.getOffset(), pageable.getPageSize());
		}
		return bounds;
	}

	/**
	 * 获取分页查询参数
	 * 
	 * @param query
	 *            查询对象
	 * @param pageable
	 *            分页对象
	 * @return Map 查询参数
	 */
	protected Map<String, Object> getParams(T query, Pageable pageable) {
		Map<String, Object> params = BeanUtils.toMap(query, getRowBounds(pageable));
		if (pageable != null && pageable.getSort() != null) {
			String sorting = pageable.getSort().toString();
			params.put("sorting", sorting.replace(":", ""));
		}
		return params;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#selectList(com.cninsure.dao.domain.
	 * Identifiable, org.springframework.data.domain.Pageable)
	 */
	@Override
	public <V extends T> List<V> selectList(T query, Pageable pageable) {
		try {
			return sqlSessionTemplate.selectList(getSqlName(SqlId.SQL_SELECT), getParams(query, pageable));
		} catch (Exception e) {
			throw new DaoException(String.format("根据分页对象查询列表出错！语句:%s", getSqlName(SqlId.SQL_SELECT)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#selectPageList(com.cninsure.dao.domain
	 * .Identifiable, org.springframework.data.domain.Pageable)
	 */
	@Override
	public <V extends T> Page<V> selectPageList(T query, Pageable pageable) {
		try {
			List<V> contentList = sqlSessionTemplate.selectList(getSqlName(SqlId.SQL_SELECT),
					getParams(query, pageable));
			return new PageImpl<V>(contentList, pageable, this.selectCount(query));
		} catch (Exception e) {
			throw new DaoException(String.format("根据分页对象查询列表出错！语句:%s", getSqlName(SqlId.SQL_SELECT)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cninsure.dao.BaseDao#selectMap(com.cninsure.dao.domain.Identifiable ,
	 * java.lang.String, org.springframework.data.domain.Pageable)
	 */
	@Override
	public <K, V extends T> Map<K, V> selectMap(T query, String mapKey, Pageable pageable) {
		try {
			return sqlSessionTemplate.selectMap(getSqlName(SqlId.SQL_SELECT), getParams(query, pageable), mapKey);
		} catch (Exception e) {
			throw new DaoException(String.format("根据分页对象查询列表出错！语句:%s", getSqlName(SqlId.SQL_SELECT)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#selectCount()
	 */
	@Override
	public Long selectCount() {
		try {
			return sqlSessionTemplate.selectOne(getSqlName(SqlId.SQL_SELECT_COUNT));
		} catch (Exception e) {
			throw new DaoException(String.format("查询对象总数出错！语句：%s", getSqlName(SqlId.SQL_SELECT_COUNT)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#selectCount(java.io.Serializable)
	 */
	@Override
	public Long selectCount(T query) {
		try {
			Map<String, Object> params = BeanUtils.toMap(query);
			return sqlSessionTemplate.selectOne(getSqlName(SqlId.SQL_SELECT_COUNT), params);
		} catch (Exception e) {
			throw new DaoException(String.format("查询对象总数出错！语句：%s", getSqlName(SqlId.SQL_SELECT_COUNT)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#insert(java.io.Serializable)
	 */
	@Override
	public void insert(T entity) {
		Assert.notNull(entity);
		try {
			if (Identifiable.class.isAssignableFrom(entityClass)) {
				Identifiable ientity = (Identifiable) entity;
				if (StringUtil.isEmpty(ientity.getId())) {
					ientity.setId(this.generateId());
				}
			}
			sqlSessionTemplate.insert(getSqlName(SqlId.SQL_INSERT), entity);
		} catch (Exception e) {
			throw new DaoException(String.format("添加对象出错！语句：%s", getSqlName(SqlId.SQL_INSERT)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#delete(java.io.Serializable)
	 */
	@Override
	public int delete(T query) {
		Assert.notNull(query);
		try {
			Map<String, Object> params = BeanUtils.toMap(query);
			return sqlSessionTemplate.delete(getSqlName(SqlId.SQL_DELETE), params);
		} catch (Exception e) {
			throw new DaoException(String.format("删除对象出错！语句：%s", getSqlName(SqlId.SQL_DELETE)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#deleteById(java.io.Serializable)
	 */
	@Override
	public int deleteById(PK id) {
		Assert.notNull(id);
		try {
			return sqlSessionTemplate.delete(getSqlName(SqlId.SQL_DELETE_BY_ID), id);
		} catch (Exception e) {
			throw new DaoException(String.format("根据ID删除对象出错！语句：%s", getSqlName(SqlId.SQL_DELETE_BY_ID)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#deleteAll()
	 */
	@Override
	public int deleteAll() {
		try {
			return sqlSessionTemplate.delete(getSqlName(SqlId.SQL_DELETE));
		} catch (Exception e) {
			throw new DaoException(String.format("删除所有对象出错！语句：%s", getSqlName(SqlId.SQL_DELETE)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#updateById(java.io.Serializable)
	 */
	@Override
	public int updateById(T entity) {
		Assert.notNull(entity);
		try {
			return sqlSessionTemplate.update(getSqlName(SqlId.SQL_UPDATE_BY_ID), entity);
		} catch (Exception e) {
			throw new DaoException(String.format("根据ID更新对象出错！语句：%s", getSqlName(SqlId.SQL_UPDATE_BY_ID)), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#updateByIdSelective(java.io.Serializable)
	 */
	@Override
	@Transactional
	public int updateByIdSelective(T entity) {
		Assert.notNull(entity);
		try {
			return sqlSessionTemplate.update(getSqlName(SqlId.SQL_UPDATE_BY_ID_SELECTIVE), entity);
		} catch (Exception e) {
			throw new DaoException(String.format("根据ID更新对象某些属性出错！语句：%s", getSqlName(SqlId.SQL_UPDATE_BY_ID_SELECTIVE)),
					e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#deleteByIdInBatch(java.util.List)
	 */
	@Override
	@Transactional
	public void deleteByIdInBatch(List<PK> idList) {
		if (idList == null || idList.isEmpty())
			return;
		for (PK id : idList) {
			this.deleteById(id);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#updateInBatch(java.util.List)
	 */
	@Override
	@Transactional
	public void updateInBatch(List<T> entityList) {
		if (entityList == null || entityList.isEmpty())
			return;
		for (T entity : entityList) {
			this.updateByIdSelective(entity);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cninsure.dao.BaseDao#insertInBatch(java.util.List)
	 */
	@Override
	public void insertInBatch(List<T> entityList) {
		if (entityList == null || entityList.isEmpty())
			return;
		for (T entity : entityList) {
			this.insert(entity);
		}
	}

	/**
	 * 根据配置文件id，查询集合
	 * 
	 * @param sql
	 * @param obj
	 * @return
	 */
	public <V extends T> List<V> queryList(String sql, Object obj) {
		try {
			return sqlSessionTemplate.selectList(sql, obj);
		} catch (Exception e) {
			throw new DaoException(String.format("查询列表出错！语句:%s", sql), e);
		}
	}

	/**
	 * 根据配置文件id，查询对象
	 * 
	 * @param sql
	 * @param obj
	 * @return
	 */
	public Object queryObj(String sql, Object obj) {
		try {
			return sqlSessionTemplate.selectOne(sql, obj);
		} catch (Exception e) {
			throw new DaoException(String.format("查询对象出错！语句:%s", sql), e);
		}
	}

	/**
	 * 根据配置文件id，查询对象
	 * 
	 * @param sql
	 * @param obj
	 * @return
	 */
	public List<Map<String, Object>> queryListObj(String sql, Object obj) {
		try {
			return sqlSessionTemplate.selectList(sql, obj);
		} catch (Exception e) {
			throw new DaoException(String.format("查询对象出错！语句:%s", sql), e);
		}
	}

	/**
	 * 根据配置文件id，执行语句
	 * 
	 * @param sql
	 * @param obj
	 * @return
	 */
	public int saveObj(String sql, Object obj) {
		try {
			return sqlSessionTemplate.update(sql, obj);
		} catch (Exception e) {
			throw new DaoException(String.format("查询对象出错！语句:%s", sql), e);
		}
	}

	/**
	 * 根据配置文件id，查询对象
	 * 
	 * @param sql
	 * @param obj
	 * @return
	 */
	public Map<String, Object> queryMap(String sql, Object obj) {
		try {
			return sqlSessionTemplate.selectMap(sql, obj, "id");
		} catch (Exception e) {
			throw new DaoException(String.format("查询对象出错！语句:%s", sql), e);
		}
	}
}
