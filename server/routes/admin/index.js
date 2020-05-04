module.exports = app => {
    const express = require("express");
    const jwt = require("jsonwebtoken");
    const assert = require("http-assert");
    const AdminUser = require("../../models/AdminUser");
    const authMiddleware = require("../../middleware/auth");
    const resourceMiddleware = require("../../middleware/resource");
    const router = express.Router({
        mergeParams: true
    });

    // 创建
    router.post("/", async (req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    });

    // 更新
    router.put("/:id", async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });

    // 删除
    router.delete("/:id", async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id);
        res.send({
            success: true
        });
    });

    // 获取
    router.get("/", async (req, res) => {
        const queryOptions = {};
        if (req.Model.modelName === "Category") {
            queryOptions.populate = "parent";
        }
        const items = await req.Model.find().setOptions(queryOptions);
        res.send(items);
    });

    // 获取详情
    router.get("/:id", async (req, res) => {
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    });

    // 资源控制
    app.use("/admin/api/rest/:resource", authMiddleware(), resourceMiddleware(), router);

    // 上传
    const path = require("path");
    const multer = require("multer");
    const upload = multer({ dest: path.join(__dirname, "../", "../", "uploads") });
    app.post("/admin/api/upload", authMiddleware(), upload.single("file"), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    });

    // 登录
    app.post("/admin/api/login", async (req, res) => {
        const { username, password } = req.body;

        // query user info
        const user = await AdminUser.findOne({ username }).select("+password");
        assert(user, 422, { message: "用户不存在" });

        // valid password
        const isValid = require("md5")(password) === user.password;
        assert(isValid, 422, { message: "密码错误" });

        // return token
        const token = jwt.sign({ id: user._id }, app.get("secret"));

        res.send({ token });
    });

    // 错误处理
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
    });
};
