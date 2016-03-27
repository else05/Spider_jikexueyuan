package org.spider.jikexueyuan.controller;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.spider.jikexueyuan.analysis.AnalysisCourse;
import org.spider.jikexueyuan.analysis.AnalysisUrl;
import org.spider.jikexueyuan.download.MultithreadingDownload;
import org.spider.jikexueyuan.vo.CookieList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Else05 on 2016/3/20.
 */
@Controller
public class KnowledgeController {
    @Autowired
    private CookieList cookieList ;
    @Autowired
    private AnalysisUrl analysisUrl ;
    @Autowired
    private AnalysisCourse analysisCourse ; // 测试功能

    @Autowired
    private MultithreadingDownload multithreadingDownload ;

    private static Logger logger = LogManager.getLogger(KnowledgeController.class) ;

    @RequestMapping("knowledge")
    public String toKnowledge(Map<String,Object> map) {
        BasicCookieStore cookieStore = new BasicCookieStore();
        cookieStore.addCookies(cookieList.getCookieArray());
        CloseableHttpClient client = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpGet get = this.getGet("http://www.jikexueyuan.com/path/");

        CloseableHttpResponse response = null ;
        try {
            response = client.execute(get);
            HttpEntity entity = response.getEntity();
            String s = EntityUtils.toString(entity);
            Document doc = Jsoup.parse(s);
            Elements select = doc.select("#pager div.pathlist-box>.pathlist-one");
            ArrayList knowledgeList = new ArrayList<String>(select.size());
            for (Element e : select) {
                System.out.println("======知识体系数据========");
                System.out.println("\n" + new String(e.select("div.pathlist-txt>h2").text().getBytes("iso8859-1"),"utf8"));
                System.out.println("\n" + e.select("img").attr("src"));
                System.out.println("\n" + e.attr("href"));
                knowledgeList.add(new String(e.select("div.pathlist-txt>h2").text().getBytes("iso8859-1"),"utf8"));
            }
            map.put("list", knowledgeList);
//            select.attr()
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            get.releaseConnection();
            try {
                client.close();
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        }
        return "download";
    }

    @RequestMapping("path/android")
    public String toAndroid(Map<String,Object> map) {
        BasicCookieStore cookieStore = new BasicCookieStore();
        cookieStore.addCookies(cookieList.getCookieArray());
        CloseableHttpClient client = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpGet get = this.getGet("http://www.jikexueyuan.com/path/android");

        CloseableHttpResponse response = null ;
        try {
            response = client.execute(get);
            HttpEntity entity = response.getEntity();
            String s = EntityUtils.toString(entity);
            Document doc = Jsoup.parse(s);
            Elements select = doc.select("#pager div.pathstage.mar-t30");
            ArrayList knowledgeList = new ArrayList<String>(select.size());
            Element e1 = null ;
            for (Element e : select) {
                System.out.println("======知识体系数据========");
                Elements select1 = e.select("div.stagebox ul>li");
//                for (Element e1 : select1) {
//                    System.out.println("\n" + new String(e1.select("div.lessonimg-box img").attr("title").getBytes("iso8859-1"),"utf8"));
//                    System.out.println("\n" + e1.select("div.lessonimg-box>a").attr("href"));
//                    System.out.println("\n" + e1.select("div.lessonimg-box img").attr("src"));
//                }
                for (int i = 0; i < select1.size(); i++) {
                    e1 = select1.get(i);
                    System.out.println("\n" + (i + 1) + new String(e1.select("div.lessonimg-box img").attr("title").getBytes("iso8859-1"),"utf8"));
                    System.out.println("\n" + e1.select("div.lessonimg-box>a").attr("href"));
                    System.out.println("\n" + e1.select("div.lessonimg-box img").attr("src"));
                }

//                System.out.println("\n" + new String(e.select("div.stagebox").text().getBytes("iso8859-1"),"utf8"));
//                System.out.println("\n" + e.select("img").attr("src"));
//                System.out.println("\n" + e.attr("href"));
                knowledgeList.add(new String(e.select("div.pathlist-txt>h2").text().getBytes("iso8859-1"),"utf8"));
            }
            map.put("list", knowledgeList);
//            select.attr()
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            get.releaseConnection();
            try {
                client.close();
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        }
        return "download";
    }

    @RequestMapping("video")
    public String toVideo(Map<String,Object> map) {
        BasicCookieStore cookieStore = new BasicCookieStore();
        cookieStore.addCookies(cookieList.getCookieArray());
        CloseableHttpClient client = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        analysisCourse.series("http://ke.jikexueyuan.com/xilie");
        HttpGet get = this.getGet("http://www.jikexueyuan.com/course/636.html");

        CloseableHttpResponse response = null ;
        try {
            response = client.execute(get);
            HttpEntity entity = response.getEntity();
            String s = EntityUtils.toString(entity);
            Document doc = Jsoup.parse(s);
            Elements select = doc.select("div.video-list .lesson-box>ul>li");
            ArrayList knowledgeList = new ArrayList<String>(select.size());

            HttpEntity en = null ;
            String sr = null ;
            CloseableHttpResponse res = null ;
            Document doc1 = null ;
            for (Element e : select) {
                System.out.println("======知识体系数据========");
                String url = e.select("div.text-box>h2>a").attr("href");
                get.releaseConnection();
                try {
                    get.setURI(new URI(url)) ;
                    res = client.execute(get);
                    en = res.getEntity() ;
                    sr = EntityUtils.toString(en) ;
                    doc1 = Jsoup.parse(sr) ;
//                    Pattern c = Pattern.compile("http://cv.*mp4");
//                    Matcher matcher = c.matcher(sr);
                    System.out.println(new String(doc1.select("div.video-list .lesson-box>ul>li.on h2>a").text().getBytes("iso8859-1"),"utf8")) ;
                    System.out.println(doc1.select("#palyer-box source").attr("src")) ;
                } catch (URISyntaxException e1) {
                    e1.printStackTrace();
                }

//                System.out.println("\n" + new String(e.select("div.stagebox").text().getBytes("iso8859-1"),"utf8"));
//                System.out.println("\n" + e.select("img").attr("src"));
//                System.out.println("\n" + e.attr("href"));
                knowledgeList.add(new String(e.select("div.pathlist-txt>h2").text().getBytes("iso8859-1"),"utf8"));
            }
            map.put("list", knowledgeList);
//            select.attr()
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            get.releaseConnection();
            try {
                client.close();
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        }
        return "download";
    }

    @RequestMapping("analysis")
    @ResponseBody
    public String unitTest(String url) {
        List<String[]> knowledgeUrl = null;
//        List<String[]> seriesUrl = null;
        String pathSrc = "G:/new/download/";
        try {
//            seriesUrl = analysisUrl.getSeriesUrl(url); // 下载系列课程
            knowledgeUrl = analysisUrl.getKnowledgeUrl(url); // 下载知识体系
            int i_ = 0;

            String[] urlArr = null ;
            String[] u = null ;
            for (int i = 0; i < knowledgeUrl.size(); i++) {
                urlArr = knowledgeUrl.get(i) ;

//                i_++;
//                if (i_ > 2) {
//                    break;
//                }
                List<String[]> videoUrl = analysisUrl.getVideoUrl(urlArr[1]);

                for (int j = 0; j < videoUrl.size() ; j++) {
                    u = videoUrl.get(j) ;
                    Path path = Paths.get(pathSrc + (i + 1) + "." + urlArr[0].replace(":"," ") + "/" + (j + 1) + "." + u[0].replace(":"," ") + ".mp4");
                    if(Files.notExists(path.getParent())){
                        Files.createDirectories(path.getParent());
                    }
                    logger.info("当前下载任务：" + path.toString() + " --> " + u[1] ) ;
                    if (Files.exists(path)) {
                        logger.info(path.toString() + " 已存在，跳过...");
                    }else{
                        multithreadingDownload.download(path.toFile(),this.getLength(u[1]),20,new URL(u[1]));
                    }
                }
            }
        } catch (IOException e) {
            logger.error(e);
        } catch (URISyntaxException e) {
            logger.error(e);
        }
        return "开始执行任务..";
    }

    private long getLength(String url) throws IOException {
        URLConnection urlConnection = new URL(url).openConnection();
        return urlConnection.getContentLength();
    }

    private HttpGet getGet(String url) {
        HttpGet httpGet = new HttpGet(url);
        httpGet.setHeader("Host","www.jikexueyuan.com") ;
        httpGet.setHeader("Referer","www.jikexueyuan.com") ;
        httpGet.setHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36") ;
        return httpGet ;
    }

    public CookieList getCookieList() {
        return cookieList;
    }

    public void setCookieList(CookieList cookieList) {
        this.cookieList = cookieList;
    }

    public AnalysisUrl getAnalysisUrl() {
        return analysisUrl;
    }

    public void setAnalysisUrl(AnalysisUrl analysisUrl) {
        this.analysisUrl = analysisUrl;
    }

    public AnalysisCourse getAnalysisCourse() {
        return analysisCourse;
    }

    public void setAnalysisCourse(AnalysisCourse analysisCourse) {
        this.analysisCourse = analysisCourse;
    }

    public MultithreadingDownload getMultithreadingDownload() {
        return multithreadingDownload;
    }

    public void setMultithreadingDownload(MultithreadingDownload multithreadingDownload) {
        this.multithreadingDownload = multithreadingDownload;
    }
}
