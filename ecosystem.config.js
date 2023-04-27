module.exports = {
  apps: [
    {
      name: 'ls',
      port: '3001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        API_HOST: 'https://lsapi.online.dev.fyunshan.com',
      },
    },
  ],
}
