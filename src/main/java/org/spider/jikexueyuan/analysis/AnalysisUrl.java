package org.spider.jikexueyuan.analysis;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.spider.jikexueyuan.requestPacking.CustomRequestHeader;
import org.spider.jikexueyuan.vo.CookieList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

/**
 * Created by Else05 on 2016/3/23.
 */
@Component
public class AnalysisUrl {
    @Autowired
    private CookieList cookieList;
    @Autowired
    private CustomRequestHeader customRequestHeader;

    /**
     * 解析视频播放页面，把该页面中的所有课程视频地址解析出来
     *
     * @param pageUrl
     * @return List<String[]> 0 为标题 ，1 为视频url
     * @throws IOException
     * @throws URISyntaxException
     */
    public List<String[]> getVideoUrl(String pageUrl) throws IOException, URISyntaxException {
        BasicCookieStore cookieStore = new BasicCookieStore();
        cookieStore.addCookies(cookieList.getCookieArray());
        CloseableHttpClient client = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpGet get = customRequestHeader.getHttpGet(pageUrl);

        CloseableHttpResponse response = null;
        response = client.execute(get);
        HttpEntity entity = response.getEntity();

        String s = EntityUtils.toString(entity);
        Document doc = Jsoup.parse(s);
        Elements select = doc.select("div.video-list .lesson-box>ul>li");
//        ArrayList knowledgeList = new ArrayList<String>(select.size());
        response.close();

        HttpEntity en = null;
        String sr = null;
        CloseableHttpResponse res = null;
        Document doc1 = null;
//        HashMap<String, Object> urlMap = new HashMap<>();
        String[] urlArr = null ;
        List<String[]> urlList = new ArrayList<>();
        System.out.println("=======解析视频地址=======");
        for (Element e : select) {
            String url = e.select("div.text-box>h2>a").attr("href");
            get.releaseConnection();
            // 改变连接
            get.setURI(new URI(url));
            res = client.execute(get);
            en = res.getEntity();
            sr = EntityUtils.toString(en);
            doc1 = Jsoup.parse(sr);

            urlArr = new String[2];
            // 取视频的标题
            urlArr[0] = new String(doc1.select("div.video-list .lesson-box>ul>li.on h2>a").text().getBytes("iso8859-1"), "utf8");
            // 取出视频url
            urlArr[1] = doc1.select("#palyer-box source").attr("src");
            urlList.add(urlArr);
            res.close();
        }
        get.releaseConnection();
        client.close();
        return urlList;
    }

    /**
     * 解析知识体系中该页面的课程地址
     * @param pageUrl
     * @return
     * @throws IOException
     */
    public List<String[]> getKnowledgeUrl(String pageUrl) throws IOException {
        BasicCookieStore cookieStore = new BasicCookieStore();
        cookieStore.addCookies(cookieList.getCookieArray());
        CloseableHttpClient client = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpClientContext httpClientContext = new HttpClientContext();
        HttpGet get = customRequestHeader.getHttpGet(pageUrl);

        CloseableHttpResponse response = null;
        response = client.execute(get);
        HttpEntity entity = response.getEntity();
        String s = EntityUtils.toString(entity);
        Document doc = Jsoup.parse(s);
        Elements select = doc.select("#pager div.pathstage.mar-t30");
        Element e1 = null;
        ArrayList<String[]> urlList = new ArrayList<>();
        String[] urlArr = null ;
        System.out.println("======知识体系中的课程========");
        for (Element e : select) {
            Elements select1 = e.select("div.stagebox ul>li");
            for (int i = 0; i < select1.size(); i++) {
                e1 = select1.get(i);
//                urlArr = null ;
                urlArr = new String[2] ;

                urlArr[0] = new String(e1.select("div.lessonimg-box img").attr("title").getBytes("iso8859-1"), "utf8") ;
                urlArr[1] = e1.select("div.lessonimg-box>a").attr("href") ;

                urlList.add(urlArr);
            }
        }
        response.close();
        get.releaseConnection();
        client.close();

        return urlList;

    }

    /**
     * 解析系列课程中该页面的课程地址
     * @param pageUrl
     * @return
     * @throws IOException
     */
    public List<String[]> getSeriesUrl(String pageUrl) throws IOException {
        BasicCookieStore cookieStore = new BasicCookieStore();
        cookieStore.addCookies(cookieList.getCookieArray());
        CloseableHttpClient client = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpGet get = customRequestHeader.getHttpGet(pageUrl , "ke.jikexueyuan.com");
//        HttpGet get = new HttpGet(pageUrl);

        CloseableHttpResponse response = null;
        response = client.execute(get);
        HttpEntity entity = response.getEntity();
        String s = EntityUtils.toString(entity);
        Document doc = Jsoup.parse(s);
        Elements select = doc.select("div.lessons.details-list>.inner-layout>div.lesson-item");
        ArrayList<String[]> urlList = new ArrayList<>();
        String[] urlArr = null ;
        System.out.println("======系列课程中的数据========");
//        String url = null ;
        for (Element e : select) {
//            url = e.select("a[jktag]").attr("href");
            urlArr = new String[2] ;

            urlArr[0] = new String(e.select("dl>dt.title").text()) ;
            urlArr[1] = e.select("a[jktag]").attr("href") ;
            urlList.add(urlArr);
        }
        response.close();
        get.releaseConnection();
        client.close();

        return urlList;

    }
}
