package org.spider.jikexueyuan.analysis;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
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

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;

/**
 * Created by Else05 on 2016/3/23.
 */
public class AnalysisCourse {
    @Autowired
    private CookieList cookieList ;
    @Autowired
    private CustomRequestHeader requestHeader ;

    public void course(String urlSrc) {
        BasicCookieStore cookieStore = new BasicCookieStore();
        cookieStore.addCookies(cookieList.getCookieArray());
        CloseableHttpClient client = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpGet get = requestHeader.getHttpGet(urlSrc);

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
                    System.out.println(new String(doc1.select("div.video-list .lesson-box>ul>li.on h2>a").text().getBytes("iso8859-1"),"utf8")) ;
                    System.out.println(doc1.select("#palyer-box source").attr("src")) ;
                } catch (URISyntaxException e1) {
                    e1.printStackTrace();
                }

                knowledgeList.add(new String(e.select("div.pathlist-txt>h2").text().getBytes("iso8859-1"),"utf8"));
            }
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
    }
}
