package org.spider.jikexueyuan.controller;

import org.apache.http.Header;
import org.apache.http.NameValuePair;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.junit.Test;

import java.net.CookiePolicy;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by Else05 on 2016/3/18.
 */
public class FirstTest {

    @Test
    public void first() throws Exception {
        ArrayList<Cookie> cookies = new ArrayList<>();
        System.out.println(cookies.size());
    }

}