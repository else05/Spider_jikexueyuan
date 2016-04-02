package org.spider.refactor.thread;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.CloseableHttpClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spider.refactor.utils.ConnectionUtils;

import java.io.File;
import java.io.RandomAccessFile;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.channels.ReadableByteChannel;
import java.util.concurrent.Callable;

/**
 * Created by Else05 on 2016/4/1.
 */
public class DownloadCallable implements Callable<Boolean> {
    private static Logger logger = LoggerFactory.getLogger(DownloadCallable.class) ;
    /**
     * 已经设置好请求头
     */
    private HttpUriRequest http ;
    private CloseableHttpClient client ;
    /**
     * 里面包含cookie
     */
    private HttpClientContext context ;
    /**
     * 保存文件的路径 如：Z:/video/xxxx.mp4
     */
    private File saveFile ;

    /**
     * 文件写入起点
     */
    private long position ;
    /**
     * 文件写入的终点
     */
    private long count ;

    public DownloadCallable(HttpUriRequest http, CloseableHttpClient client,
                            HttpClientContext context, File saveFile,
                            long position, long count) {
        this.http = http;
        this.client = client;
        this.context = context;
        this.saveFile = saveFile;
        this.position = position;
        this.count = count;
    }

    @Override
    public Boolean call() throws Exception {
        CloseableHttpResponse response = client.execute(http, context);
        int statusCode = response.getStatusLine().getStatusCode();
        if (statusCode != 206) {
            logger.warn("[{}]线程下载请求返回的状态码有误(！=206),下载中止::\n\t状态码：{}\n\tURL:{}",
                    Thread.currentThread().getName() , statusCode , http.getURI().toString());
            response.close();
            return false ;
        }
        HttpEntity entity = response.getEntity();
        // 返回内容不是视频
        if (!entity.getContentType().getValue().matches("video")) {
            logger.warn("[{}]线程下载请求返回的内容不是视频,下载中止::\n\t类型：{}\n\tURL:{}",
                    Thread.currentThread().getName() , entity.getContentType().getValue() , http.getURI().toString());
            response.close();
            return false ;
        }

//        Header[] headers = response.getHeaders("Content-Range");
        Header firstHeader = response.getFirstHeader("Content-Range");
        // 因为多线程下载的视频有时会出错，所以验证一下Content-Range
        boolean b = ConnectionUtils.checkRange(firstHeader, position, count);
        if (!b) {
            logger.warn("[{}]线程下载请求返回的Content-Range与预期有误差，下载中止：：\n\t预期：{}\n\t实际：{}"
            ,Thread.currentThread().getName() , http.getFirstHeader("Range") , firstHeader) ;
            response.close();
            return false ;
        }

        // 使用nio中的通道保存文件
        ReadableByteChannel inChannel = Channels.newChannel(entity.getContent());
        FileChannel outChannel = new RandomAccessFile(saveFile, "rwd").getChannel();
        long writeBytes = outChannel.transferFrom(inChannel, position, count);
        response.close();
        logger.info("[{}]线程下载::\n\t预期字节：{}\n\t实际字节：{}\n\t写入字节：{}\n\t路径：{}\n\tURL:{}",
            Thread.currentThread().getName(),(count - position) , firstHeader , writeBytes , saveFile.getAbsolutePath() , http.getURI().toString() ) ;
        return true;
    }

    public HttpUriRequest getHttp() {
        return http;
    }

    public void setHttp(HttpUriRequest http) {
        this.http = http;
    }

    public CloseableHttpClient getClient() {
        return client;
    }

    public void setClient(CloseableHttpClient client) {
        this.client = client;
    }

    public HttpClientContext getContext() {
        return context;
    }

    public void setContext(HttpClientContext context) {
        this.context = context;
    }

    public File getSaveFile() {
        return saveFile;
    }

    public void setSaveFile(File saveFile) {
        this.saveFile = saveFile;
    }

    public long getPosition() {
        return position;
    }

    public void setPosition(long position) {
        this.position = position;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
