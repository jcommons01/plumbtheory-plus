import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.plumbtheory.app',
  appName: 'plumbtheory',
  webDir: 'out',
  server: {
    url: 'https://plumbtheory.co.uk/', // Replace this with your real site!
    cleartext: true, // Allow HTTP if needed (optional)
  },
};

export default config;
