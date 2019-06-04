module.exports = {
    entry: {
        components: [
            __dirname + `/src/components/Carousel.js`,
            __dirname + `/src/components/Footer.js`,
            __dirname + `/src/components/Guides.js`,
            __dirname + `/src/components/Subfooter.js`,
            __dirname + `/src/components/Copywright.js`,
            __dirname + `/src/components/AboutCollapsibleMenu.js`,
            __dirname + `/src/components/CarouselItem.js`,
            __dirname + `/src/components/HelpCollapsibleMenu.js`,
            __dirname + `/src/components/MainFooter.js`,
            __dirname + `/src/components/MainMenu.js`,
            __dirname + `/src/components/SocialFooter.js`,
            __dirname + '/src/components/NextArrow.js',
            __dirname + '/src/components/PrevArrow.js',
            __dirname + `/src/index.js`
        ],
        // renderer: __dirname + `/src/index.js`
    },
    output: {
        filename: '[name]-bundle.js',
        path: __dirname + '/public'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 25000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ],
    }
};