package org.spider.refactor.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.sf.json.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spider.refactor.analysis.AnalysisCourse;
import org.spider.refactor.utils.ConnectionUtils;
import org.spider.refactor.vo.Result;
import org.spider.refactor.vo.SelectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Else05 on 2016/4/2.
 */
@Controller
public class AnalysisController {
    @Autowired
    private SelectMapper mapper ;
    @Autowired
    private AnalysisCourse analysisCourse ;

    private CloseableHttpClient client = ConnectionUtils.getHttpClient();
    BasicCookieStore cookieStore = ConnectionUtils.getCookieStore() ;
    private static Logger logger = LoggerFactory.getLogger(AnalysisController.class) ;

    /**
     * @param type  1.职业路径课程  2.知识体系课程  3.精品系列课程
     * @return
     */
    @RequestMapping("list")
    @ResponseBody
    public Result list(Integer type) {
        if (type == null || type < 0 || type > 2) {
            return new Result("请求参数错误！", false);
        }
        // 三大类课程
        String[] url = {
                "http://ke.jikexueyuan.com/zhiye/",
                "http://www.jikexueyuan.com/path/",
                "http://ke.jikexueyuan.com/xilie/"
        } ;
        // jsoup选择器映射参数  （根据些参数返回对应的映射map）
        String[] mapArr = {
                "zhiyeMap" ,
                "pathMap" ,
                "xilieMap"
        } ;

        // 注意 referer 要加上http://  （http://www.xxxx.com/）   而host则不用加 （www.xxxx.com）
        HttpUriRequest http = ConnectionUtils.getHttp(false, url[type], type == 1 ? "www.jikexueyuan.com" : "ke.jikexueyuan.com" ,null);
        HttpClientContext context = new HttpClientContext();
        context.setCookieStore(cookieStore);

        Result result = this.sendRequest(http, context, mapArr[type]);
        if (type == 2) { // 处理职业课程中的分页数据
            HttpPost post = (HttpPost) ConnectionUtils.getHttp(true,
                    "http://ke.jikexueyuan.com/xilie/more", type == 1 ? "www.jikexueyuan.com" : "ke.jikexueyuan.com",
                    null);

            Map<String, String> stringMap = this.zhiyeReadMore(post, context, result.getMap());
            result.setMap(stringMap);
        }

        return result ;
    }

    /**
     * 根据参数请求页面并返回解析后的数据
     * @param http
     * @param context
     * @param mapperType
     * @return
     */
    private Result sendRequest(HttpUriRequest http , HttpClientContext context ,String mapperType ) {
        Map<String, String> map = null ;
        CloseableHttpResponse res = null ;
        try {
            res = client.execute(http, context);
            HttpEntity entity = res.getEntity();
            int statusCode = res.getStatusLine().getStatusCode();
            if (statusCode != 200) {
                logger.warn("请求失败！\n\tURL:{}\n\t状态码：{}",http.getURI().toString(),statusCode);
                return new Result("请求失败！" , false ) ;
            }
            String page = EntityUtils.toString(entity);
            map = analysisCourse.analysisPage(page, mapper.getMapper(mapperType));
        } catch (IOException e) {
            logger.error("访问{}出现错误",http.getURI().toString(), e);
        } catch (Exception e) {
            logger.error("",e);
        }finally {
            this.closeConnect(res , http.getURI().toString());
        }
        return new Result("" , true , map) ;
    }

    /**
     * 把职业中的所有分页数据读取出来
     * @param post
     * @param context
     * @param resultMap
     * @return
     */
    private Map<String , String> zhiyeReadMore(HttpPost post ,HttpClientContext context, Map resultMap) {
        ArrayList<NameValuePair> nameValuePairs = new ArrayList<>(2);
        CloseableHttpResponse res = null ;
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String , LinkedHashMap> map = null ;
        for (int i = 0; true; i++) {
            post.releaseConnection();
            nameValuePairs.clear();
            nameValuePairs.add(new BasicNameValuePair("page",Integer.toString(i))) ;
            nameValuePairs.add(new BasicNameValuePair("type", "1"));
            try {
                post.setEntity(new UrlEncodedFormEntity(nameValuePairs));
                res = client.execute(post, context);
                int statusCode = res.getStatusLine().getStatusCode();
                if (statusCode != 200) {
                    logger.warn("职业课程“读取更多”返回状态码错误,将跳过该链接！\n\tURL:{}\n\t状态码：{}",post.getURI().toString() , statusCode) ;
                    continue;
                }
                HttpEntity entity = res.getEntity();
                String s = EntityUtils.toString(entity);
                map = objectMapper.readValue(s, Map.class);
            } catch (Exception e) {
                logger.error("职业课程“读取更多”错误",e);
            }finally {
                this.closeConnect(res ,"");
            }
            Map data = map.get("data");
            Integer is_end = (Integer)data.get("is_end");
            List<LinkedHashMap> list = (ArrayList)data.get("info");
            LinkedHashMap<String , String> mapTem = null ;
            for (int j = 0; j < list.size(); j++) {
                mapTem = list.get(j) ;
                resultMap.put(mapTem.get("title") , "http://ke.jikexueyuan.com/xilie/" +  mapTem.get("id")) ;
            }

            if (is_end != 0) {
                break;
            }
        }
        return resultMap ;
    }

    public CloseableHttpClient getClient() {
        return client;
    }

    public void setClient(CloseableHttpClient client) {
        this.client = client;
    }

    public BasicCookieStore getCookieStore() {
        return cookieStore;
    }

    public void setCookieStore(BasicCookieStore cookieStore) {
        this.cookieStore = cookieStore;
    }

    public static Logger getLogger() {
        return logger;
    }

    public static void setLogger(Logger logger) {
        AnalysisController.logger = logger;
    }

    public SelectMapper getMapper() {
        return mapper;
    }

    public void setMapper(SelectMapper mapper) {
        this.mapper = mapper;
    }

    public AnalysisCourse getAnalysisCourse() {
        return analysisCourse;
    }

    public void setAnalysisCourse(AnalysisCourse analysisCourse) {
        this.analysisCourse = analysisCourse;
    }
    public void closeConnect(CloseableHttpResponse response, String url) {
        if (response != null) {
            try {
                response.close();
            } catch (IOException e) {
                logger.error("关闭连接异常,URL:{}", url);
            }
        }
    }
}
