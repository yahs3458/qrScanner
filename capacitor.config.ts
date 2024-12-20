import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'digitalSignature.ionic.starter',
  appName: 'qrScanner',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
