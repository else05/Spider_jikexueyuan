package org.spider.jikexueyuan.download;

import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.channels.ReadableByteChannel;
import java.util.concurrent.Callable;

/**
 * 有返回值的线程，方便判断是否下载完成
 * Created by Else05 on 2016/3/26.
 */
public class DownloadCallable implements Callable<String> {

    private static Logger logger = LogManager.getLogger(DownloadCallable.class) ;
    /**
     * 保存的文件路径
     */
    private File file ;
    /**
     * 开始下载位置
     */
    private long start ;
    /**
     * 结束下载位置
     */
    private long end ;
    /**
     * 下载地址
     */
    private URL url ;
    /**
     * 该文件总长度
     */
    private long totalLength ;

    public DownloadCallable(File file, long totalLength, long start, long end, URL url) {
        this.file = file;
        this.start = start;
        this.end = end;
        this.url = url;
        this.totalLength = totalLength;
    }

    @Override
    public String call() throws Exception {
        HttpURLConnection conn = null;
        StringBuilder returnSrc = new StringBuilder();;
        try {
            conn = (HttpURLConnection)url.openConnection();
            conn.setRequestProperty("Host","www.jikexueyuan.com");
            conn.setRequestProperty("Referer","www.jikexueyuan.com");
            conn.setRequestProperty("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36");
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Range" , "bytes=" + start + "-" + end);

//            conn.setConnectTimeout();

            // 状态码为206才支持多线程下载
            if (conn.getResponseCode() == 206) {
                InputStream inputStream = conn.getInputStream();

                ReadableByteChannel inChannel = Channels.newChannel(inputStream);


                RandomAccessFile randomAccessFile = new RandomAccessFile(file, "rwd");
                randomAccessFile.setLength(totalLength);
                randomAccessFile.seek(start);
                FileChannel outChannel = randomAccessFile.getChannel();

                long writeCount = 0L ;
                synchronized (DownloadCallable.class) { // 下载的文件会出现花屏，加个同步看一下
                    writeCount = outChannel.transferFrom(inChannel, start, (end - start));
                }

                MultithreadingDownload.threadPerformCount.getAndIncrement() ;

                returnSrc.append("线程 ").append(Thread.currentThread().getName()).append(" 下载: ").append(file.getAbsolutePath()).append(" 位置： ")
                        .append(start).append("--->").append(end).append(" 预计下载： ").append(end - start).append(", 实际下载：").append(writeCount) ;
//                logger.info(returnSrc.toString());
                inChannel.close();
                outChannel.close();
                randomAccessFile.close();
                inputStream.close();
            } else {
                returnSrc.append("\n线程 ").append(Thread.currentThread().getName()).append(" 返回网络状态码（下载失败）：").append(conn.getResponseCode())
                        .append("  【本地路径：").append(file.getAbsolutePath())
                .append(" 【下载地址：").append(url.toString());
                logger.info(returnSrc);
            }
        } catch (IOException e) {
            logger.error(e);
        }
        return returnSrc.toString() ;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public long getStart() {
        return start;
    }

    public void setStart(long start) {
        this.start = start;
    }

    public long getEnd() {
        return end;
    }

    public void setEnd(long end) {
        this.end = end;
    }

    public URL getUrl() {
        return url;
    }

    public void setUrl(URL url) {
        this.url = url;
    }

    public long getTotalLength() {
        return totalLength;
    }

    public void setTotalLength(long totalLength) {
        this.totalLength = totalLength;
    }
}
