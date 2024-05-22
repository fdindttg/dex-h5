
let config = {};


//测试
let MOBILE_URL = 'https://tetherv.xyz'
let BASE_DOMAIN = 'admin.tetherv.xyz'
let PC_URL = 'https://tetherv.xyz'
let DOWNLOAD_URL = ''
let KF_URL = 'https://t.me/exbess'



if (process.env.NODE_ENV == 'production') { //生产环境
    config = {
        // ajax地址
        baseUrl: 'https://' + BASE_DOMAIN,
        // 图片地址 （暂时无用）
        imgUrl: 'https://' + BASE_DOMAIN + '/storage',
        // socket地址
        socketUrl: 'wss://' + BASE_DOMAIN + '/ws1',
        socketUrl1: 'wss://' + BASE_DOMAIN + '/ws2',
        // pc端地址
        pcUrl:'https://tetherv.xyz',
        // 下载地址
        downloadUrl:DOWNLOAD_URL,
        // 客服地址
        kfUrl:KF_URL,
        // app名称
        appName: 'tetherv',
        // 版本
        version: '1.0.0',
        // 移动端地址
        mobile: MOBILE_URL
    };
} else { //开发环境
    config = {
        baseUrl: 'https://admin.tetherv.xyz',
        imgUrl: 'https://admin.tetherv.xyz/upload',
        socketUrl: 'wss://admin.tetherv.xyz/ws1',
        socketUrl1: 'wss://admin.tetherv.xyz/ws2',
        // pc端地址
        pcUrl:'https://web.colorfulgroup.xyz',
        // 下载地址
        downloadUrl:DOWNLOAD_URL,
        // 客服地址
        kfUrl:KF_URL,
        // app名称
        appName: '本地开发',
        // 版本
        version: '0.0.0',
        // 移动端地址
        mobile: 'https://h5.colorfulgroup.xyz'
    }
    // config = {
    //     // ajax地址
    //     baseUrl: 'https://server.7coin.in',
    //     // 图片地址 （暂时无用）
    //     imgUrl: 'https://server.7coin.in/upload',
    //     // socket地址
    //     socketUrl: 'wss://server.7coin.in:2346/',
    //     socketUrl1: 'wss://server.7coin.in:2348/',
    //     // pc端地址
    //     pcUrl:'https://www.7coin.in',
    //     // app名称
    //     appName: '7COIN test',
    //     // 版本
    //     version: '1.0.0',
    //     // 移动端地址
    //     mobile: 'https://h5.7coin.in'
    // };
}
export default config;