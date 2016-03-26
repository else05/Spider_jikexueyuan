package org.spider.jikexueyuan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.spider.jikexueyuan.vo.CookieList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Else05 on 2016/3/18.
 */
@Controller
public class First {
    @Autowired
    private CookieList cookieList ;
    private static Logger logger = LogManager.getLogger(First.class.getName());
    @RequestMapping("/first")
    public String first(){
        return "ok";
    }

    @RequestMapping(value = "/" ,method = RequestMethod.GET)
    public String loginPage() {
        return "login";
    }

    @RequestMapping(value = "/verify" ,method = RequestMethod.GET)
    public void verify(HttpServletResponse pageResponse) {
        BasicCookieStore cookieStore = new BasicCookieStore();
        CloseableHttpClient httpClient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpPost httpPost = new HttpPost("http://passport.jikexueyuan.com/sso/verify");
        httpPost.setHeader("Host","passport.jikexueyuan.com");
        httpPost.setHeader("Referer","passport.jikexueyuan.com/sso/login");
        httpPost.setHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36");
        CloseableHttpResponse response = null ;

        try {
            response = httpClient.execute(httpPost);
            cookieList.setCookies(cookieStore.getCookies());
            HttpEntity entity = response.getEntity();

            logger.info("\n ==========/verify=======");
//            logger.info(EntityUtils.toString(entity));

            entity.writeTo(pageResponse.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                httpPost.releaseConnection();
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/check" ,method = RequestMethod.POST)
    public void check(String verify , HttpServletResponse pageResponse) {
        BasicCookieStore cookieStore = new BasicCookieStore();
        cookieStore.addCookies(cookieList.getCookieArray());
        CloseableHttpClient httpClient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpPost httpPost = new HttpPost("http://passport.jikexueyuan.com/check/verify?is_ajax=1");
        httpPost.setHeader("Host","passport.jikexueyuan.com");
        httpPost.setHeader("Referer","passport.jikexueyuan.com/sso/login");
        httpPost.setHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36");
        CloseableHttpResponse response = null ;
        try {
            response = httpClient.execute(httpPost);
            HttpEntity entity = response.getEntity();
            logger.info("\n ==========/check=======");
            logger.info(EntityUtils.toString(entity));
            entity.writeTo(pageResponse.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                httpPost.releaseConnection();
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
//        response.
//        return "login";
    }

    @RequestMapping(value = "login",method = RequestMethod.POST)
    public String login(String account , String password , String verify,HttpServletResponse pageResponse) {
//        pageResponse.setCharacterEncoding("utf-8");
        BasicCookieStore cookieStore = new BasicCookieStore();
        cookieStore.addCookies(cookieList.getCookieArray());
        CloseableHttpClient httpClient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpPost httpPost = new HttpPost("http://passport.jikexueyuan.com/submit/login?is_ajax=1&client=www");
        httpPost.setHeader("Host","passport.jikexueyuan.com");
        httpPost.setHeader("Referer","passport.jikexueyuan.com/sso/login");
        httpPost.setHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36");

//        HttpPost httpPost = this.getPost("http://passport.jikexueyuan.com/submit/login?is_ajax=1&client=www");

        ArrayList<NameValuePair> nameValuePairs = new ArrayList<>();
        nameValuePairs.add(new BasicNameValuePair("expire","7")) ;
        nameValuePairs.add(new BasicNameValuePair("referer", "http://www.jikexueyuan.com/"));
        nameValuePairs.add(new BasicNameValuePair("uname", account));
        nameValuePairs.add(new BasicNameValuePair("password", password));
        nameValuePairs.add(new BasicNameValuePair("verify", verify));

        try {
            httpPost.setEntity(new UrlEncodedFormEntity(nameValuePairs,"UTF-8"));
            CloseableHttpResponse response = httpClient.execute(httpPost);
            HttpEntity entity = response.getEntity();

            logger.info("\n ==========/login=======");
            String s = EntityUtils.toString(entity);
            logger.info(new String(s.getBytes(),"utf-8"));
            cookieList.setCookies(cookieStore.getCookies());
            ObjectMapper mapper = new ObjectMapper();
            Map<String,String> map = mapper.readValue(s, Map.class);
            if (map != null && "登录成功".equals(map.get("msg"))) {
                return "";
            }
//            entity.writeTo(pageResponse.getOutputStream());
        } catch (IOException e) {
            httpPost.releaseConnection();
            try {
                httpClient.close();
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            e.printStackTrace();
        }
        return "redirect:/";
    }



    @RequestMapping("cookie")
    @ResponseBody
    public List<Cookie> cookie(){
        return cookieList.getCookies() ;
    }

    @RequestMapping("index")
    public void index(HttpServletResponse pageResponse) {
        BasicCookieStore cookieStore = new BasicCookieStore();
        cookieStore.addCookies(cookieList.getCookieArray());
        CloseableHttpClient httpClient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();

        HttpGet httpGet = this.getGet("http://www.jikexueyuan.com/path/");

        CloseableHttpResponse response = null;
        try {
            response = httpClient.execute(httpGet);
            logger.info("================index============");
            Document document = Jsoup.parse(EntityUtils.toString(response.getEntity()));
            Elements select = document.select("#pager div.pathlist-box>.pathlist-one");
//            document.charset("utf-8");
//            logger.info();
//            response.getEntity().writeTo(pageResponse.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            httpGet.releaseConnection();
            try {
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

    private HttpPost getPost(String url) {
        HttpPost httpPost = new HttpPost(url);
        httpPost.setHeader("Host","www.jikexueyuan.com") ;
        httpPost.setHeader("Referer","www.jikexueyuan.com") ;
        httpPost.setHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36") ;
        return httpPost ;
    }

    private HttpGet getGet(String url) {
        HttpGet httpGet = new HttpGet(url);
        httpGet.setHeader("Host","www.jikexueyuan.com") ;
        httpGet.setHeader("Referer","www.jikexueyuan.com") ;
        httpGet.setHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36") ;
        return httpGet ;
    }
}
