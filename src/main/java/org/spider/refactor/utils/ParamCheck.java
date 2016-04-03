package org.spider.refactor.utils;

/**
 * Created by Else05 on 2016/4/2.
 */
public class ParamCheck {
    public static boolean isEmpty(String ... args) {
        if (args == null || args.length == 0) {
            return true ;
        }
        String s = null ;
        for (int i = 0; i < args.length; i++) {
            s = args[i] ;
            if (s == null || "".equals(s.trim())) {
                return true ;
            }
        }
        return false ;
    }
}
