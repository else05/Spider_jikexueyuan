package org.spider.refactor.analysis;

import org.apache.commons.codec.StringDecoder;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Else05 on 2016/3/29.
 */
@Component
public class AnalysisCourse {

    /**
     * @param pageString 网页
     * @param select  父类选择器  ，语法和jquery选择器.find()相同
     * @param nameSelect 名字选择器  比如：text@div.container>div -> 会调用text()   attr@div.container>div -> 调用attr()
     * @param namePro  .attr()方法对应属性
     * @param valSelect 值（url）选择器  比如：text@div.container>div -> 会调用text()   attr@div.container>div -> 调用attr()
     * @param valPro  .attr()方法对应属性
     */
    public Map<String, String> analysisPage(String pageString , String select, String nameSelect , String namePro , String valSelect , String valPro ){
        Document document = Jsoup.parse(pageString);
        Elements elements = document.select(select);
        HashMap<String , String> returnMap = new HashMap<>(elements.size());
        Element element = null ;
        String[] nameArr = null ;
        String[] valArr = null ;
        String key = null ;
        String val = null ;
        for (int i = 0; i < elements.size(); i++) {
            element = elements.get(i) ;
            nameArr = nameSelect.split("@");
            valArr = valSelect.split("@");
            if ("text".equals(nameArr[0])) {
                key = element.select(nameArr[1]).text() ;
            }else{
                key = element.select(nameArr[1]).attr(namePro) ;
            }
            if ("text".equals(nameArr[0])) {
                val = element.select(valArr[1]).text() ;
            }else{
                val = element.select(valArr[1]).attr(valPro) ;
            }
            returnMap.put(key, val);
        }
        return returnMap ;
    }

    /**
     * @param pageString
     * @param map  里面要包含 select，nameSelect，namePro，valSelect，valPro,  格式和上面的方法analysisPage（xx）相同
     * @return
     * @throws Exception
     */
    public Map<String, String> analysisPage(String pageString , Map<String , String> map) throws Exception {
        if (map == null || map.size() < 3 || map.size() > 5) {
            throw new Exception("[analysisPage]解析参数Maper不正确！") ;
        }

        Document document = Jsoup.parse(pageString);
        Elements elements = document.select(map.get("select"));
        HashMap<String , String> returnMap = new HashMap<>(elements.size());
        Element element = null ;
        String[] nameArr = null ;
        String[] valArr = null ;
        String key = null ;
        String val = null ;
        for (int i = 0; i < elements.size(); i++) {
            element = elements.get(i) ;
            nameArr = map.get("nameSelect").split("@");
            valArr = map.get("valSelect").split("@");
            if ("text".equals(nameArr[0])) {
                key = element.select(nameArr[1]).text() ;
            }else if("".equals(nameArr[1].trim())){
                key = element.attr(map.get("namePro")) ;
            }else{
                key = element.select(nameArr[1]).attr(map.get("namePro")) ;
            }
            if ("text".equals(valArr[0])) {
                val = element.select(valArr[1]).text() ;
            }else if("".equals(valArr[1].trim())){
                val = element.attr(map.get("valPro")) ;
            }else{
                val = element.select(valArr[1]).attr(map.get("valPro")) ;
            }
            returnMap.put(key, val);
        }
        return returnMap ;
    }
}
