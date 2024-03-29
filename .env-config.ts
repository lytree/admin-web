/** 请求环境配置 */
type ServiceEnv = Record<EnvType, EnvConfig>;

/** 环境配置 */
const serviceEnvConfig: ServiceEnv = {
  dev: {
    url: 'http://127.0.0.1:9000',
    proxy: '/api'
  },
  test: {
    url: 'http://127.0.0.1:9000',
    proxy: '/api'
  },
  prod: {
    url: '/',
    proxy: '/'
  }
};

/**
 * 获取环境配置
 * @param env 环境描述
 */
export function getEnvConfig(env: ImportMetaEnv) {
  const { VITE_ENV_TYPE = 'dev' } = env;

  const envConfig = serviceEnvConfig[VITE_ENV_TYPE];

  return envConfig;
}
