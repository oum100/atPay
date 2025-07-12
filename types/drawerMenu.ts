export type SupportedLang = 'EN' | 'TH' | 'JP' | 'VN'


// types/menu.ts
export interface MenuItem {
  title: Record<SupportedLang, string>
  icon: string;
  to?: string;
  roles?: string[];
  children?: MenuItem[];
}
  
export const menuItems: MenuItem[] = [
  {
    title: {
      EN:'Dashboard',
      TH:'แดชบอร์ด',
      JP: 'ホーム',
      VN: 'Trang chủ'
    },
    icon: 'mdi-billboard',
    to: '/dashboard',
    roles: [],
  },
  {
    title:{
      EN:'About Us',
      TH:'เกี่ยวกับเรา',
      JP: 'ホーム',
      VN: 'Trang chủ'
    },
    icon: 'mdi-information',
    to: '/about',
    roles: [],
  },    
  {
    title:{
      EN:'Service',
      TH:'บริการ',
      JP: 'ホーム',
      VN: 'Trang chủ'
    },
    icon: 'mdi-briefcase',
    roles: [],
    children: [
      {
        title:{
          EN:'Consulting',
          TH:'บริการให้คำปรึกษา',
          JP: 'ホーム',
          VN: 'Trang chủ'  
        },
        icon: 'mdi-account-tie',
        to: '/services/consulting',
        roles: [],
      },
      {
        title:{
          EN:'Support',
          TH:'หลัการขาย',
          JP: 'ホーム',
          VN: 'Trang chủ'    
        },
        icon: 'mdi-lifebuoy',
        to: '/services/support',
        roles: [],
      },
    ],
  },
  {
    title:{
      EN:'Other',
      TH:'อื่นๆ',
      JP: 'ホーム',
      VN: 'Trang chủ'
    },
    icon: 'mdi-view-dashboard',
    to: '/dashboard',
    roles: ['user', 'admin'],
  },
  {
    title:{
      EN:'Management',
      TH:'การบริหารจัดการ',
      JP: 'ホーム',
      VN: 'Trang chủ'
    },
    icon: 'mdi-cog',
    roles: ['admin'],
    children: [
      {
        title:{
          EN:'User',
          TH:'ผู้ใช้งาน',
          JP: 'ホーム',
          VN: 'Trang chủ'
        },
        icon: 'mdi-account-multiple',
        to: '/management/users',
        roles: ['admin'],
      },
      {
        title:{
          EN:'Settgin',
          TH:'ตั้งค่า',
          JP: 'ホーム',
          VN: 'Trang chủ'        
        },
        icon: 'mdi-settings',
        to: '/management/settings',
        roles: ['admin'],
      },
    ],
  },
  {
    title:{
      EN:'Report',
      TH:'รายงาน',
      JP: 'ホーム',
      VN: 'Trang chủ'
    },
    icon: 'mdi-chart-bar',
    to: '/reports',
    roles: ['user', 'admin'],
  },
];
  