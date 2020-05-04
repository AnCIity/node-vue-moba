module.exports = app => {
    const mongoose = require("mongoose");

    mongoose
        .connect("mongodb://wzuser:wzuser@127.0.0.1:27017/node-vue-moba", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("数据库连接成功"))
        .catch(() => console.log("数据库连接失败"));
};
