package org.spider.jikexueyuan.vo;

import org.apache.http.cookie.Cookie;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Else05 on 2016/3/19.
 */
@Component
public class CookieList {
    private List<Cookie> cookies ;

    public List<Cookie> getCookies() {
        return cookies;
    }

    public void setCookies(List<Cookie> cookies) {
        this.cookies = cookies;
    }

    public Cookie[] getCookieArray() {
        if (cookies == null) {
            return new Cookie[2] ;
        }
        return cookies.toArray(new Cookie[cookies.size()]);
    }

//    @Override
//    public String toString() {
//        if (cookies == null || cookies.size() == 0) {
//            return super.toString() ;
//        }
//        for (Cookie cookie : cookies) {
//            System.out.println(cookie.getName() + ": " + cookie.getValue());
//        }
//        return super.toString();
//    }
}
