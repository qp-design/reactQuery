const {override, fixBabelImports, addPostcssPlugins} = require('customize-cra');

/* 把大包的build文件夹名称改成prod-bigscreen-web*/
const path = require('path')
const paths = require('react-scripts/config/paths')
paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  addPostcssPlugins([
    require('postcss-px-to-viewport')({
      viewportWidth: 1280, // (Number) The width of the viewport.
      viewportHeight: 800, // (Number) The height of the viewport.
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false // (Boolean) Allow px to be converted in media queries.
    })
  ])
);
