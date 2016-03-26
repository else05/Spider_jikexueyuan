package org.spider.jikexueyuan.entity;

import java.util.Date;

/**
 * Created by Else05 on 2016/3/20.
 */
public class KnowledgeHierarchy {
    private String id ;
    private String description ; // 描述
    private Integer totalTime ; // 该体系下课程总时间
    private Integer totalCourse ; // 所有课程数量
    private Integer totalJoin ; // 所有加入的人数
    private String knowledgeUrl ; // 该体系的url
    private String picUrl ; // 体系的图片url
    private Date modifyDate ; // 最后一次修改时间
    private boolean isDel ;
    private Date createDate ; // 数据保存时间

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Integer totalTime) {
        this.totalTime = totalTime;
    }

    public Integer getTotalCourse() {
        return totalCourse;
    }

    public void setTotalCourse(Integer totalCourse) {
        this.totalCourse = totalCourse;
    }

    public Integer getTotalJoin() {
        return totalJoin;
    }

    public void setTotalJoin(Integer totalJoin) {
        this.totalJoin = totalJoin;
    }

    public String getKnowledgeUrl() {
        return knowledgeUrl;
    }

    public void setKnowledgeUrl(String knowledgeUrl) {
        this.knowledgeUrl = knowledgeUrl;
    }

    public String getPicUrl() {
        return picUrl;
    }

    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    public boolean isDel() {
        return isDel;
    }

    public void setDel(boolean del) {
        isDel = del;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
