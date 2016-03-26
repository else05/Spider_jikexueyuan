package org.spider.jikexueyuan.requestPacking;

import org.apache.http.client.methods.HttpGet;
import org.springframework.stereotype.Component;

/**
 * Created by Else05 on 2016/3/23.
 */
@Component
public class CustomRequestHeader {
    private HttpGet httpGet ;

    public CustomRequestHeader() {
    }

    public CustomRequestHeader(String url) {
        HttpGet get = new HttpGet(url);
        get.setHeader("Host","www.jikexueyuan.com") ;
        get.setHeader("Referer","www.jikexueyuan.com") ;
        get.setHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36") ;
        this.httpGet =  get ;
    }

    public HttpGet getHttpGet(String url) {
        HttpGet get = new HttpGet(url);
        get.setHeader("Host","www.jikexueyuan.com") ;
        get.setHeader("Referer","www.jikexueyuan.com") ;
        get.setHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36") ;
        return get ;
    }

    public HttpGet getHttpGet() {
        return httpGet;
    }

    public void setHttpGet(HttpGet httpGet) {
        this.httpGet = httpGet;
    }
}
