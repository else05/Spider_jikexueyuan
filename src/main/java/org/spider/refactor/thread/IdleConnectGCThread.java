package org.spider.refactor.thread;

import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spider.refactor.utils.ConnectionUtils;

import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

/**
 * Created by Else05 on 2016/3/31.
 */
public class IdleConnectGCThread implements Callable<Boolean> {
    private static Logger logger = LoggerFactory.getLogger(IdleConnectGCThread.class) ;
    private static boolean idleConnectGCStatus = false ;
    @Override
    public Boolean call() {
        PoolingHttpClientConnectionManager pool = null ;
        List<PoolingHttpClientConnectionManager> poolList = null ;
        synchronized (IdleConnectGCThread.class) {
            // 防止线程重复运行
            if(!idleConnectGCStatus){
                logger.warn("{} --> HttpCllient连接池回收线程已经启动，请勿重复执行..." , Thread.currentThread().getName()) ;
                return false ;
            }
            idleConnectGCStatus = true ;
            while (true){
                try {
                    Thread.currentThread().wait(10 * 60 * 60); // 因为并发量不就，所以设置为5分钟
                } catch (InterruptedException e) {
                    logger.error("{} --> HttpCllient连接池回收线程wait()方法执行异常 :{}",Thread.currentThread().getName(), e ) ;
                }
                poolList = ConnectionUtils.getPoolList() ;
                for (int i = 0; i < poolList.size(); i++) {
                    pool = poolList.get(i) ;
                    if (pool != null && pool instanceof PoolingHttpClientConnectionManager) {
                        // 关闭无效连接
                        pool.closeExpiredConnections();
                        // 关闭10分钟内不活动的连接
                        pool.closeIdleConnections(10 , TimeUnit.MINUTES);
                        logger.info("{} --> HttpCllient连接池回收线程执行第{}个连接池" , Thread.currentThread().getName() , (i+1) ) ;
                    }else{
                        logger.info("{} --> HttpCllient连接池回收线程没有回收第{}个连接池" , Thread.currentThread().getName()  , (i+1) ) ;
                    }
                }
            }
//            return true ;
        }
    }
}
