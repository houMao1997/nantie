// module.exports = {
//   devServer: {
//     // 设置代理
//     proxy: {
//       '/api': {
//         target: 'https://bbs.csdn.net/topics/392551212',
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': '/api'
//         }
//       }
//     }
//   }
// };
module.exports = {
  devServer: {
    proxy: 'https://bbs.csdn.net/topics/392551212'
  },
  
}