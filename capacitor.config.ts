import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.agecalculator',
  appName: 'Age Calculator',
  webDir: 'dist',
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
    },
    Camera: {
      androidPermissions: ['CAMERA', 'READ_EXTERNAL_STORAGE']
    }
  }
};

export default config;
