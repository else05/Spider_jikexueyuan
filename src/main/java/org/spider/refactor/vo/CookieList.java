package org.spider.refactor.vo;

import org.apache.http.cookie.Cookie;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Else05 on 2016/3/30.
 */
@Component
public class CookieList {
    private List<Cookie> cookieList ;

    public CookieList() {
        this.cookieList = new ArrayList<>();
    }

    public CookieList(List<Cookie> cookieList) {
        this.cookieList = cookieList;
    }

    public List<Cookie> getCookieList() {
        return cookieList;
    }

    public void setCookieList(List<Cookie> cookieList) {
        this.cookieList = cookieList;
    }

    public Cookie[] getCookieArr() {
        return cookieList.toArray(new Cookie[cookieList.size()]) ;
    }
}
