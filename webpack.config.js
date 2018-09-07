// 由于 webpack 是基于Node进行构建的，所有，webpack的配置文件中，任何合法的Node代码都是支持的
var path = require('path')
var buildFloder = 'dist'
var fs = require('fs')
var buildPath = './' + buildFloder + '/'
var folder_exists = fs.existsSync(buildPath)
if(!folder_exists) {
  fs.mkdirSync(buildPath)
}else {
  var dirList = fs.readdirSync(buildPath)
  console.log(dirList)
  dirList.forEach(function(fileName) {
    fs.unlinkSync(buildPath + fileName)
  })
  console.log("clearimg" + buildPath)

}
fs.readFileSync('index.html','utf-8',function (err, data) {
    if (err) {
        console.log("clear hash error")
    } else {
        var devhtml = data.replace(/((?:href|src)="[^"]+\.)(\w{20}\.)(js|css)/g, '$1$3')
        fs.writeFileSync('index.html',devhtml)
    }
})
var webpack = require('webpack')

// 检测重用模块
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
// 独立样式文件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// 在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
// 如果要配置插件，需要在导出的对象中，挂载一个 plugins 节点
var htmlWebpackPlugin = require('html-webpack-plugin')
// 会将所有的样式文件打包成一个单独的style.css
var extractCSS = new ExtractTextPlugin({
    filename: 'style.[chunkhash].css',
    disable: false,
    allChunks: true
})
// 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供 要打包 的文件的 入口 和 出口文件，此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个 配置对象，然后根据这个对象，进行打包构建
module.exports = {
  entry: path.join(__dirname, './src/main.js'), // 入口文件
  output: { // 指定输出选项
    path: path.join(__dirname, './dist'), // 输出路径
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js' // 指定输出文件的名称
  },
  plugins: [ // 所有webpack  插件的配置节点
    new htmlWebpackPlugin({
      template: path.join(__dirname, './index.tpl'), // 指定模板文件路径
      filename: '../index.html', // 设置生成的内存页面的名称
      inject: true //此参数必须加上，不加不注入
    }),
    new CommonsChunkPlugin('vendor'),
    extractCSS
  ],
  module: { // 配置所有第三方loader 模块的
    rules: [ // 第三方模块的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理 CSS 文件的 loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=76310&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
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