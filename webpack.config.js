module.exports = (webpackConfig, env) => {
  // 别名配置
  webpackConfig.resolve.alias = {
    '@': `${__dirname}/src`,
    '@questions': `${__dirname}/src/routes/questions`,
    '@user': `${__dirname}/src/routes/user`,
    '@marking': `${__dirname}/src/routes/marking`,
    '@grade': `${__dirname}/src/routes/grade`,
    '@exam': `${__dirname}/src/routes/exam`,
    '@components': `${__dirname}/src/components`
    
  }
  return webpackConfig
}