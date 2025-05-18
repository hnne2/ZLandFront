module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: 'node_modules/nuxi/bin/nuxi.js',
      args: 'dev',
      env: {
        HOST: '0.0.0.0',
        PORT: 3000
      }
    }
  ]
}

