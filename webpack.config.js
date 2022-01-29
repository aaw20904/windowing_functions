const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPLugin = require("css-minimizer-webpack-plugin");

module.exports={
    entry:{
        "index":"./src/index.js",
    },

    output:{
        clean:true,
        filename:"[name].js",
        path:path.resolve(__dirname,"dist"),
        assetModuleFilename:"res/[hash][ext][query]"
    },

    plugins:[
        new HtmlWebpackPlugin({
            chunks:["index"],
            filename:"index.html",
            template:"./src/index.html"
        }),
        new MiniCssExtractPlugin()
    ],
    devtool:"source-map",

 module:{
      rules:[
            {
                test:/\.js$/,
                enforce:"pre",
                use:["source-map-loader"]
            },

            {
                test:/bckg-.+\.(jpg|svg)$/,
                type:"asset/resource"
            },
            
            {
                test:/favicon\.(ico)$/,
                type:"asset/resource"
            },

            {
                 test:/fnt-.+\.(woff|woff2|ttf|eot)$/,
                 type:"asset/resource"
            },

           {
                test:/\.(sa|sc|c)ss$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader','postcss-loader','sass-loader'],
           }

        ]
  },

  optimization:{
      minimize:true,
      minimizer:[ new CssMinimizerPLugin()]
  },

  devServer:{
      hot:true,
      port:9000
  }




}