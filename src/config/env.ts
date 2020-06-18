const NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = NODE_ENV === 'production'

export { isProd }
