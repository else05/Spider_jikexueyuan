package org.spider.refactor.vo;

import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * 保存要返回的数据,最终会转成json作为返回的数据
 * Created by Else05 on 2016/4/2.
 */
//@Component
public class Result {
    private String msg ;
    private boolean status ;
    private Map<String , String> map ;

    public Result(String msg, boolean status) {
        this.msg = msg;
        this.status = status;
    }

    public Result(String msg, boolean status, Map<String, String> map) {
        this.msg = msg;
        this.status = status;
        this.map = map;
    }

    public void mergeMap(Result result){
        if (result == null || result.getMap() == null || result.getMap().size() == 0) {
            return;
        }
        this.mergeMap(result.getMap());
    }

    public void mergeMap(Map<String ,String> map){
        if (map == null || map.size() == 0) {
            return;
        }

        if (this.map == null || this.map.size() == 0) {
            this.map = map ;
        }else{
            this.map.putAll(map);
        }
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Map<String, String> getMap() {
        return map;
    }

    public void setMap(Map<String, String> map) {
        this.map = map;
    }
}
