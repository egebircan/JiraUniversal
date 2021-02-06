const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')

const isDev = process.env.NODE_ENV !== 'production'

const nextConfig = {
  env: {
    API_URL: isDev ? 'http://localhost:8000' : 'https://api.example.com/v1/'
  },
  pwa: {
    dest: 'public',
    disable: isDev
  },
  typescript: {
    ignoreBuildErrors: true
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/.*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
    ]
  }
}

module.exports = withPlugins([], withPWA(nextConfig))
