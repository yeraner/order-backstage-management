const { override, fixBabelImports,addDecoratorsLegacy,addLessLoader  } = 
require('customize-cra');
// const modifyVars = require('./theme')
module.exports = override(
      addDecoratorsLegacy(),//装饰器
       fixBabelImports('import', {
         libraryName: 'antd',
         libraryDirectory: 'es',
         style: 'css',
       }),
      //  addLessLoader({
      //     lessOptions:{
      //       javascriptEnabled: true,
      //       modifyVars
      //     }
      //    }),
     );