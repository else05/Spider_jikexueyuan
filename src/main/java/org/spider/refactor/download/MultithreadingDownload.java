package org.spider.refactor.download;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spider.refactor.thread.DownloadCallable;
import org.spider.refactor.utils.ConnectionUtils;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * Created by Else05 on 2016/3/30.
 */
@Component
public class MultithreadingDownload {
//    @Autowired
//    private CookieList cookieList;

    /**
     * 多线程下载的线程池
     */
    private ExecutorService threadPool;

    private CloseableHttpClient client;
    private BasicCookieStore cookieStore;

    private static Logger logger = LoggerFactory.getLogger(MultithreadingDownload.class);

    public MultithreadingDownload() {
        this.client = ConnectionUtils.getHttpClient();
        this.cookieStore = new BasicCookieStore();
        // 线程池大小为CPU核心数*2
        this.threadPool = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors() * 2);
    }

    public void download(String savePath, String url, int threadNum , Header[] headers , Cookie[] cookies) {

//        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(20); // 这里不能这样写，否则每执行一次就会实例一个线程池，会造成线程过多

        // 替换 \/|:*?<> ,windows中方件中不允许的字符
        Path path = Paths.get(savePath.replaceAll("\\|/|:|\\||\\*|\\?|<|>"," "));
        if(Files.notExists(path.getParent())){
            try {
                Files.createDirectories(path.getParent());
            } catch (IOException e) {
                logger.error("创建文件路径{}失败，任务中止：：\n\tURL:{}" , path.getParent() ,url);
                return;
            }
        }
//        HttpGet httpGet = (HttpGet)ConnectionUtils.setHeaders(headerMap,new HttpGet(url));
        HttpGet httpGet = new HttpGet(url);
        httpGet.setHeaders(headers);

        HttpClientContext httpClientContext = new HttpClientContext();
//        cookieStore.clear();
        logger.info("当前cookieStore大小：{}\n\t{}",cookieStore.getCookies().size(),cookieStore.getCookies().toString());
        cookieStore.addCookies(cookies);
        httpClientContext.setCookieStore(cookieStore);
        CloseableHttpResponse response = null;
        int statusCode = 0;
        HttpEntity entity = null;
        long contentLength = 0L;
        try {
            response = client.execute(httpGet, httpClientContext);
            statusCode = response.getStatusLine().getStatusCode();
            entity = response.getEntity();
            contentLength = entity.getContentLength();
        } catch (IOException e) {
            logger.warn("多线程下载请求返回的状态码有误(!=206),操作中止::\n\tURL:{}\n\t状态码：{}", url, statusCode);
        } finally {
            this.closeConnect(response , url);
        }

        if (statusCode != 206) {
            logger.warn("多线程下载请求返回的状态码有误(!=206),操作中止::\n\tURL:{}\n\t状态码：{}", url, statusCode);
            return;
        }
        if (contentLength == 0) {
            logger.warn("多线程下载请求返回的内容长度有误(==0),操作中止::\n\t长度：{}\n\t状态码：{}\n\tURL:{}", contentLength, url, statusCode);
            return;
        }

        long start = 0L;
        long end = 0L;
        long block = contentLength % threadNum == 0 ? contentLength / threadNum : contentLength / threadNum + 1;

        for (int i = 0; i < threadNum; i++) {
            start = i * block;
            end = start + (block - 1);
            httpGet.setHeader("Range","bytes=" + start + "-" + (end - start));
            Future<Boolean> future = threadPool.submit(
                    new DownloadCallable(httpGet , client ,httpClientContext ,
                            path.toFile() ,start ,end)
            );
// TODO        这里设置 Context会覆盖HttpClient中的数据吗？
        }
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

    public CloseableHttpClient getClient() {
        return client;
    }

    public BasicCookieStore getCookieStore() {
        return cookieStore;
    }

    public void setCookieStore(BasicCookieStore cookieStore) {
        this.cookieStore = cookieStore;
    }

    public void setClient(CloseableHttpClient client) {
        this.client = client;
    }
}
