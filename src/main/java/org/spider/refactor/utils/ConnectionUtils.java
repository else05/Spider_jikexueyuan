package org.spider.refactor.utils;

import org.apache.http.Header;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.HttpRequest;
import org.apache.http.NoHttpResponseException;
import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.cookie.CookieSpec;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.protocol.HttpContext;
import org.springframework.util.StringUtils;

import javax.net.ssl.SSLException;
import javax.net.ssl.SSLHandshakeException;
import java.io.IOException;
import java.io.InterruptedIOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 配置HttpClient4.5 连接池
 * Created by Else05 on 2016/3/30.
 */
public class ConnectionUtils {
    private static volatile CloseableHttpClient client;
    private static volatile BasicCookieStore cookieStore;
    /**
     * 连接池列表
     * 保存已经实例的连接池对象，方便自定义的GC线程进行连接回收操作
     */
    private static List<PoolingHttpClientConnectionManager> poolList = new ArrayList<>(16);

    public ConnectionUtils() throws Exception {
        throw new Exception("静态工具类禁止实例");
    }

    public static RequestConfig getRequestConfig() {
        // 配置超时为30秒，如果不配置 ，连接会等待很久
        return RequestConfig.custom()
                .setConnectionRequestTimeout(30000)
                .setConnectTimeout(30000)
                .setCookieSpec(CookieSpecs.STANDARD_STRICT)
                .build();
    }

    /**
     * 取得连接池
     *
     * @return
     */
    public static PoolingHttpClientConnectionManager getPool() {
        // 实例一个连接池
        PoolingHttpClientConnectionManager poolCM = new PoolingHttpClientConnectionManager();
        // 设置最大连接为200
        poolCM.setMaxTotal(200);
        // 设置每个路由最大连接数为20
        poolCM.setDefaultMaxPerRoute(20);
//        poolCM.setMaxPerRoute();
        poolList.add(poolCM);
        return poolCM;
    }

    public static HttpRequestRetryHandler getHttpRequestRetryHandler() {
        return new HttpRequestRetryHandler() {
            @Override
            public boolean retryRequest(IOException e, int i, HttpContext httpContext) {
                if (i >= 5) {// 如果已经重试了5次，就放弃
                    return false;
                }
                if (e instanceof NoHttpResponseException) {// 如果服务器丢掉了连接，那么就重试
                    return true;
                }
                if (e instanceof SSLHandshakeException) {// 不要重试SSL握手异常
                    return false;
                }
                if (e instanceof InterruptedIOException) {// 超时
                    return false;
                }
                if (e instanceof UnknownHostException) {// 目标服务器不可达
                    return false;
                }
                if (e instanceof ConnectTimeoutException) {// 连接被拒绝
                    return false;
                }
                if (e instanceof SSLException) {// ssl握手异常
                    return false;
                }
                HttpClientContext adapt = HttpClientContext.adapt(httpContext);
                HttpRequest request = adapt.getRequest();
                // 如果请求是幂等的，就再次尝试
                if (!(request instanceof HttpEntityEnclosingRequest)) {
                    return true;
                }
                return false;
            }
        };
    }

    public static CloseableHttpClient getNewHttpClient(RequestConfig requestConfig,
                                                       HttpRequestRetryHandler httpRequestRetryHandler,
                                                       PoolingHttpClientConnectionManager poolCM) {
        // 根据传入的参数返回一个HttpClient
        return HttpClientBuilder.create()
                .setDefaultRequestConfig(requestConfig)
                .setRetryHandler(httpRequestRetryHandler)
                .setConnectionManager(poolCM).build();
    }

    public static CloseableHttpClient getHttpClient() {
        if (client == null) {
            synchronized (ConnectionUtils.class) {
                if (client == null) {
                    client = HttpClientBuilder.create()
                            .setDefaultRequestConfig(ConnectionUtils.getRequestConfig())
                            .setRetryHandler(ConnectionUtils.getHttpRequestRetryHandler())
                            .setConnectionManager(ConnectionUtils.getPool())
                            .build();
                }
            }
        }
        return client;
    }

    public static BasicCookieStore getCookieStore() {
        if (cookieStore == null) {
            synchronized (ConnectionUtils.class) {
                if (cookieStore == null) {
                    cookieStore = new BasicCookieStore();
                }
            }
        }
        return cookieStore;
    }

//    public static BasicCookieStore setCookieStore(BasicCookieStore cookieStore , ) {
//        if (cookieStore == null) {
//            synchronized (ConnectionUtils.class) {
//                if (cookieStore == null) {
//                    cookieStore = new BasicCookieStore() ;
//                }
//            }
//        }
//        return cookieStore ;
//    }

    public static List<PoolingHttpClientConnectionManager> getPoolList() {
        return poolList;
    }

    public static HttpRequestBase setHeaders(Map<String, String> map, HttpRequestBase httpRequestBase) {
        if (map == null || map.size() == 0) {
            return httpRequestBase;
        }
        for (Map.Entry<String, String> entry : map.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            if (StringUtils.isEmpty(key) || StringUtils.isEmpty(value)) {
                continue;
            }
            httpRequestBase.setHeader(key, value);
        }
        return httpRequestBase;
    }

    public static void setPoolList(List<PoolingHttpClientConnectionManager> poolList) {
        ConnectionUtils.poolList = poolList;
    }


    /**
     * 根据响应头中的Content-Range 判断返回的字节和请求需要返回的字节是否匹配
     * 比如：Content-Range:bytes 0-11424777/11424778
     *
     * @return
     */
    public static boolean checkRange(Header header, long start, long end) {
        String value = header.getValue();
        if (value == null || value.trim().length() == 0) {
            return false;
        }
        String[] split = value.split("\\D+");
        if (split.length != 3) {
            return false;
        }
        return Long.getLong(split[0]) == start && Long.getLong(split[1]) == end ? true : false;
    }

    public static HttpUriRequest getHttp(boolean isPost, String url, String host, String referer) {
        HttpUriRequest http = null;
        if (isPost) {
            http = new HttpPost(url);
        } else {
            http = new HttpGet(url);
        }
        http.setHeader("Host", StringUtils.isEmpty(host) ? "www.jikexueyuan.com" : host);
        http.setHeader("Referer", StringUtils.isEmpty(referer) ? "http://www.jikexueyuan.com/" : referer);
        http.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36");
        return http;
    }
}
