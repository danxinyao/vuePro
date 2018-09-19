var proxyApi = 'www.baidu.com' // 代理服务器
// 先清空 build 文件夹下的文件
var buildFolder = 'dist'
var fs = require('fs')
var path = require('path')
var buildPath = './' + buildFolder + '/'
var folder_exists = fs.existsSync(buildPath)

if (!folder_exists) {
    fs.mkdirSync(buildFolder)
}
else {
    var dirList = fs.readdirSync(buildPath)
    dirList.forEach(function (fileName) {
        fs.unlinkSync(buildPath + fileName)
    })
    console.log("clearing " + buildPath)
}

// readfile
// 先把index.html里面关于style和js的hash值都删除掉，避免在使用 npm run dev 的时候，路径还是压缩后的路径
fs.readFile('index.html','utf-8',function (err, data) {
    if (err) {
        console.log("clear hash error")
    } else {
        var devhtml = data.replace(/((?:href|src)="[^"]+\.)(\w{20}\.)(js|css)/g, '$1$3')
        fs.writeFileSync('index.html',devhtml)
    }
})
// 在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
// 如果要配置插件，需要在导出的对象中，挂载一个 plugins 节点
var htmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

// 检测重用模块
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

// 独立样式文件

const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 在命令行 输入  “PRODUCTION=1 webpack --progress” 就会打包压缩，并且注入md5戳 到 d.html里面

var production = process.env.PRODUCTION
// 会将所有的样式文件打包成一个单独的style.css
var extractCSS = new ExtractTextPlugin({
    filename: production ? 'style.[chunkhash].css' : 'style.css',
    disable: false,
    allChunks: true
})
var HtmlWebpackPlugin = new htmlWebpackPlugin({
    filename: '../index.html', // 会生成d.html在根目录下,并注入脚本
    template: 'index.tpl',
    inject: true //此参数必须加上，不加不注入
})
var plugins = [
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    extractCSS,
    HtmlWebpackPlugin,
    // 自动分析重用模块并且打包单独文件
    new CommonsChunkPlugin(production ? 'vendor' : 'vendor'),
    function () {
        return this.plugin('done', function (stats) {
            var content
            //这里可以拿到hash值   参考：http://webpack.github.io/docs/long-term-caching.html
            content = JSON.stringify(stats.toJson().assetsByChunkName, null, 2)
            console.log('版本是：'+JSON.stringify(stats.toJson().hash))
            return fs.writeFileSync(buildFolder + '/assets.json', content)
        })
    }
]
/*plugins.push(new htmlWebpackPlugin({
    filename: '../index.html', // 会生成d.html在根目录下,并注入脚本
    template: 'index.tpl',
    inject: true //此参数必须加上，不加不注入
}))*/
// 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供 要打包 的文件的 入口 和 出口文件，此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个 配置对象，然后根据这个对象，进行打包构建
//发生编译时，压缩，版本控制
var devtool = false, //是否开启source-map
    devServer = {} //代理设置
if(process.env.PRODUCTION) {
  console.log('wuxin-压缩...')
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    beautify: true,
    comments: false,
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true,
      collapse_vars: true,
      reduce_vars: true
    }
  }))
  devtool = "#source-map" //生产环境不开启source-map
  devServer = {}
}else {
  console.log('代理...')
  devtool = "#eval-source-map"
  devServer = {
    historyApiFallback: true,
    host: 'localhost',
    proxy: {
        '/Api/*': proxyApi,
        '/api/*': proxyApi,
        '/ImageTemp/*': proxyApi,
        '/Import/*': proxyApi,
        '/ImportImage/*': proxyApi,
        '/Export/*': proxyApi,
        '/Upload/*': proxyApi
    },
  }
}


module.exports = {
  entry: path.join(__dirname, './src/main.js'), // 入口文件
  output: { // 指定输出选项
    path: path.join(__dirname, './dist'), // 输出路径
    publicPath: '/' + buildFolder + '/',
    filename: production ? '[name].[chunkhash].js' : '[name].js' // 指定输出文件的名称
  },
  plugins: plugins,
  devtool: devtool,
  devServer: devServer,
/*  plugins: [ // 所有webpack  插件的配置节点
    new htmlWebpackPlugin({
      template: path.join(__dirname, './index.html'), // 指定模板文件路径
      filename: 'index.html' // 设置生成的内存页面的名称
    })
  ],*/
  module: { // 配置所有第三方loader 模块的
    rules: [ // 第三方模块的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理 CSS 文件的 loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
      // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
      { 
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: extractCSS
        }
      } // 处理 .vue 文件的 loader
    ]
  },
  resolve: {
    alias: { // 修改 Vue 被导入时候的包的路径
        'src': path.resolve(__dirname, 'src'),
        'assets': path.resolve(__dirname, 'src/assets'),
        'views': path.resolve(__dirname, 'src/views'),
    }
  }
}