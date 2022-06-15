const includeProject = (prjName, project) => { 
  return(
    [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: prjName,
          path: `${__dirname}/node_modules/@atooni/${project}/src/docs/`
        }
      }
    ]
  )
}

const sitePlugins = ([
  {
    resolve: `@atooni/gatsby-theme-ziosite`
  },
  // Use the postcss plugin to configure tailwind as a post processor
  {
    resolve: `gatsby-plugin-postcss`,
    options: {
      postCssPlugins: [
        require(`tailwindcss`)
      ]
    }
  },  
  // Configure the file system plugin for generated docs
]).concat(
  includeProject('zmx', 'zio-metrics-connectors')
  //includeProject('zio1', 'zio-core'),
  //includeProject('zio2', 'zio-core-2')
)

const config = { 
  siteMetadata: {
    title: "ZIO Metrics Connectors"
  },
  plugins: sitePlugins
}

module.exports = config;  