package org.spider.refactor.vo;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * 各个课程的jsoup解析的映射
 * Created by Else05 on 2016/4/3.
 */
@Component
public class SelectMapper {
    /**
     * 职业课程
     */
    private Map<String , String> zhiyeMap ;
    private Map<String , String> zhiyeMap2 ; // 职业课程二级
    /**
     * 知识体系
     */
    private Map<String , String> pathMap ;
    private Map<String , String> pathMap2 ;
    /**
     * 精品系列
     */
    private Map<String , String> xilieMap ;
    private Map<String , String> xilieMap2 ;
    /**
     * 播放页面中所有子课程
     */
    private Map<String , String> pageMap ;
    /**
     * 播放页面中的播放地址和课程名
     */
    private Map<String , String> singleSelectMap ;

    public SelectMapper() {
        this.zhiyeMap = new HashMap(4) ;
        this.zhiyeMap.put("select","section#container>div.wrap>div.lesson-overview") ;
        this.zhiyeMap.put("nameSelect" , "text@div.overview-text>h2>a[jktag]") ;
        this.zhiyeMap.put("namePro","") ;
        this.zhiyeMap.put("valSelect","attr@div.overview-text>h2>a[jktag]") ;
        this.zhiyeMap.put("valPro","href") ;
        this.zhiyeMap2 = new HashMap(4) ;
        this.zhiyeMap2.put("select","#container>div.wrap>section.lesson-list>div.bd section.lesson-unit>.table.lesson-step>tbody>tr>td>a[jktag]") ;
        this.zhiyeMap2.put("nameSelect" , "text@span") ;
        this.zhiyeMap2.put("namePro","") ;
        this.zhiyeMap2.put("valSelect","attr@") ;// 因为网页结构原因，这里表示取当前元素的attr属性
        this.zhiyeMap2.put("valPro","href") ;

        this.pathMap = new HashMap(4) ;
        this.pathMap.put("select","div#pager>.newlesson-list>.pathlist>.pathlist-box>a.pathlist-one") ;
        this.pathMap.put("nameSelect" , "text@div.pathlist-txt>h2") ;
        this.pathMap.put("namePro","") ;
        this.pathMap.put("valSelect","attr@") ;// 因为网页结构原因，这里表示取当前元素的attr属性
        this.pathMap.put("valPro","href") ;
        this.pathMap2 = new HashMap(4) ;
        this.pathMap2.put("select","#container>div.wrap>div.pathstage .stagewidth.lesson-list>ul.cf>li") ;
        this.pathMap2.put("nameSelect" , "text@.lesson-infor>h2.lesson-info-h2>a[jktag]") ;
        this.pathMap2.put("namePro","") ;
        this.pathMap2.put("valSelect","attr@") ;// 因为网页结构原因，这里表示取当前元素的attr属性
        this.pathMap2.put("valPro","href") ;

        this.xilieMap = new HashMap(4) ;
        this.xilieMap.put("select" , "section#container div#table>div.lesson-card") ;
        this.xilieMap.put("nameSelect" , "text@h2") ;
        this.xilieMap.put("namePro","") ;
        this.xilieMap.put("valSelect" , "attr@div.describe a.btn.btn-def[jktag]") ;
        this.xilieMap.put("valPro" , "href") ;
        this.xilieMap2 = new HashMap(4) ;
        this.xilieMap2.put("select" , "#container>div.wrap>div.lessons.details-list .lesson-item>a[jktag]") ;
        this.xilieMap2.put("nameSelect" , "text@dl>dt.title") ;
        this.xilieMap2.put("namePro","") ;
        this.xilieMap2.put("valSelect" , "attr@") ;// 因为网页结构原因，这里表示取当前元素的attr属性
        this.xilieMap2.put("valPro" , "href") ;

        this.singleSelectMap = new HashedMap(4) ;
        this.singleSelectMap.put("select", "div.#palyer-box .videobox.player-video");
        this.singleSelectMap.put("nameSelect" ,"text@#pager .video-list>.lesson-box>ul>li.on>.text-box>h2>a[jktag]") ;
        this.singleSelectMap.put("namePro" ,"") ;
        this.singleSelectMap.put("valSelect" ,"attr@video>source") ;
        this.singleSelectMap.put("valPro" ,"src") ;

        this.pageMap = new HashedMap(4) ;
        this.pageMap.put("select" ,"#pager .video-list>.lesson-box>ul>li") ;
        this.pageMap.put("nameSelect" ,"text@div.text-box>h2>a") ;
        this.pageMap.put("namePro" ,"") ;
        this.pageMap.put("valSelect" ,"attr@div.text-box>h2>a") ;
        this.pageMap.put("valPro" ,"href") ;
    }

    public Map<String, String> getMapper(String which) {
        Map<String , String > map = null ;
        switch (which) {
            case "zhiyeMap":
                map = this.zhiyeMap ;
                break;
            case "zhiyeMap2":
                map = this.zhiyeMap2 ;
                break;
            case "pathMap":
                map = this.pathMap ;
                break;
            case "pathMap2":
                map = this.pathMap2 ;
                break;
            case "xilieMap":
                map = this.xilieMap ;
                break;
            case "xilieMap2":
                map = this.xilieMap2 ;
                break;
            case "pageMap":
                map = this.pageMap ;
                break;
            case "singleSelectMap":
                map = this.singleSelectMap ;
                break;
        }
        return map;
    }

    public Map<String, String> getZhiyeMap() {
        return zhiyeMap;
    }

    public void setZhiyeMap(Map<String, String> zhiyeMap) {
        this.zhiyeMap = zhiyeMap;
    }

    public Map<String, String> getPathMap() {
        return pathMap;
    }

    public void setPathMap(Map<String, String> pathMap) {
        this.pathMap = pathMap;
    }

    public Map<String, String> getXilieMap() {
        return xilieMap;
    }

    public void setXilieMap(Map<String, String> xilieMap) {
        this.xilieMap = xilieMap;
    }

    public Map<String, String> getPageMap() {
        return pageMap;
    }

    public void setPageMap(Map<String, String> pageMap) {
        this.pageMap = pageMap;
    }

    public Map<String, String> getSingleSelectMap() {
        return singleSelectMap;
    }

    public void setSingleSelectMap(Map<String, String> singleSelectMap) {
        this.singleSelectMap = singleSelectMap;
    }

    public Map<String, String> getZhiyeMap2() {
        return zhiyeMap2;
    }

    public void setZhiyeMap2(Map<String, String> zhiyeMap2) {
        this.zhiyeMap2 = zhiyeMap2;
    }

    public Map<String, String> getPathMap2() {
        return pathMap2;
    }

    public void setPathMap2(Map<String, String> pathMap2) {
        this.pathMap2 = pathMap2;
    }

    public Map<String, String> getXilieMap2() {
        return xilieMap2;
    }

    public void setXilieMap2(Map<String, String> xilieMap2) {
        this.xilieMap2 = xilieMap2;
    }
}
