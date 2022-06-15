const includeProject = (prjName, project) => { 
  return(
    [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: prjName,
          path: `${__dirname}/node_modules/@atooni/${project}/src/docs/`
        }
      },
      {
        resolve: `gatsby-plugin-page-creator`,
        options: {
          path: `${__dirname}/node_modules/@atooni/${project}/src/docs/`
        }
      },
    ]
  )
}

const sitePlugins = ([
  // The only plugin we want to see in here is the ZIO theme 
  {
    resolve: `@atooni/gatsby-theme-ziosite`
  },
  // Configure the file system plugin for generated docs
]).concat(
  includeProject('zmx', 'zio-metrics-connectors'),
  includeProject('zio1', 'zio-core'),
  includeProject('zio2', 'zio-core-2')
)

const config = { 
  siteMetadata: {
    title: "ZIO Metrics Connectors"
  },
  plugins: sitePlugins
}

module.exports = config;  