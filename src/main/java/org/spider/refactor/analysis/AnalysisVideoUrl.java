package org.spider.refactor.analysis;

import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.CloseableHttpClient;

/**
 * Created by Else05 on 2016/3/29.
 */
public class AnalysisVideoUrl {
    private HttpClientContext httpClientContext ;

    public AnalysisVideoUrl() {
        this.httpClientContext = HttpClientContext.create() ;
    }

    public String[] analysisUrl(CloseableHttpClient client , HttpUriRequest httpUriRequest) {

return new String[0] ;
    }
}
