package org.spider.refactor.vo;

import org.springframework.stereotype.Component;

/**
 * 保存要返回的数据,最终会转成json作为返回的数据
 * Created by Else05 on 2016/4/2.
 */
@Component
public class Result {
    private String msg ;
    private boolean status ;

    public Result(String msg, boolean status) {
        this.msg = msg;
        this.status = status;
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
}
