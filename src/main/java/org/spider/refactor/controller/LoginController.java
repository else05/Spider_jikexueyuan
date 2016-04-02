package org.spider.refactor.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spider.refactor.utils.ConnectionUtils;
import org.spider.refactor.utils.ParamCheck;
import org.spider.refactor.vo.Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Map;

/**
 * Created by Else05 on 2016/4/2.
 */
@Controller
public class LoginController {
    private CloseableHttpClient client = ConnectionUtils.getHttpClient();
    BasicCookieStore cookieStore = ConnectionUtils.getCookieStore() ;
    private static Logger logger = LoggerFactory.getLogger(LoginController.class) ;
    @RequestMapping(value = "/" , method = RequestMethod.GET)
    public String loginPage(){
        return "loginPage";
    }

    @RequestMapping("/")
    @ResponseBody
    public Result loginPage(String account , String password , String verify){
        if (ParamCheck.isEmpty(account, password , verify)) {
            return new Result("请求参数不能有空！",false);
        }

//        CloseableHttpClient client = ConnectionUtils.getHttpClient() ;
//        BasicCookieStore cookieStore = ConnectionUtils.getCookieStore() ;
        // 以下只是获取cookie
        HttpPost httpPost = new HttpPost("http://passport.jikexueyuan.com/sso/verify");
        httpPost.setHeader("Host","passport.jikexueyuan.com");
        httpPost.setHeader("Referer","passport.jikexueyuan.com/sso/login");
        httpPost.setHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36");
        HttpClientContext context = new HttpClientContext();
        context.setCookieStore(cookieStore);
        CloseableHttpResponse response = null;
        try {
            response = client.execute(httpPost, context);
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            this.closeConnect(response , httpPost.getURI().toString());
            httpPost.releaseConnection();
        }


        ArrayList<NameValuePair> nameValuePairs = new ArrayList<>();
        nameValuePairs.add(new BasicNameValuePair("expire","7")) ;
        nameValuePairs.add(new BasicNameValuePair("referer", "http://www.jikexueyuan.com/"));
        nameValuePairs.add(new BasicNameValuePair("uname", account));
        nameValuePairs.add(new BasicNameValuePair("password", password));
        nameValuePairs.add(new BasicNameValuePair("verify", verify));

        String s = null ;
        try {
            httpPost.setURI(new URI("http://passport.jikexueyuan.com/submit/login?is_ajax=1&client=www"));
            httpPost.setEntity(new UrlEncodedFormEntity(nameValuePairs,"UTF-8"));
            response = client.execute(httpPost, context);
            HttpEntity entity = response.getEntity();
            logger.info("\n==========/login=======");
            s = EntityUtils.toString(entity);
            logger.info(new String(s.getBytes(),"utf-8"));
            ObjectMapper mapper = new ObjectMapper();
            Map<String,String> map = mapper.readValue(s, Map.class);
            if (map != null && "登录成功".equals(map.get("msg"))) {
                return new Result("登陆成功！",true);
            }
        } catch (Exception e) {
            logger.error("登录请求异常,{}",e);
        }finally {
            this.closeConnect(response , httpPost.getURI().toString());
            httpPost.releaseConnection();
        }

        return new Result("登陆失败！" + s,false);
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
