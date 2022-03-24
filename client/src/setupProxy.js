const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/users", "/badges", "/admin", "/upload", "/images"], {
      target: "http://0xpersona.club",
      changeOrigin: true,
      autoRewrite: true
    })
  );
//   app.listen(3000);
};
