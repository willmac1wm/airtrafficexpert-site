import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.openstars.emulator',
  appName: 'OpenSTARS',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'capacitor'
  },
  ios: {
    contentInset: 'always'
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      overlay: true,
    }
  }
};

export default config;
