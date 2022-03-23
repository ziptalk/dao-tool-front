const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/users", "/badges", "/admin", "/upload", "/images"], {
      target: "http://3.34.139.169:8080",
      changeOrigin: true,
      autoRewrite: true
    })
  );
//   app.listen(3000);
};
