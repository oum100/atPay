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
      EN:'Product',
      TH:'สินค้า',
      JP: 'ホーム',
      VN: 'Trang chủ'
    },
    icon: 'mdi-home',
    to: '/',
    roles: [],
  },
  {
    title:{
      EN:'Service',
      TH:'บริการ',
      JP: 'ホーム',
      VN: 'Trang chủ'
    },
    icon: 'mdi-information',
    to: '/about',
    roles: [],
    children: [
        {
            title:{
            EN:'Consulting',
            TH:'ให้คำปรึกษา',
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
            TH:'ดูแลหลังการขาย',
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
      EN:'Customer',
      TH:'ลูกค้าของเรา',
      JP: 'ホーム',
      VN: 'Trang chủ'
    },
    icon: 'mdi-briefcase',
    to: '/page2',
    roles: [],
  },
  // {
  //   title:{
  //     EN:'Partner',
  //     TH:'พันธ์มิตร',
  //     JP: 'ホーム',
  //     VN: 'Trang chủ'
  //   },
  //   icon: 'mdi-handshake',
  //   to: '/page2',
  //   roles: [],
  // },  
  // {
  //   title:{
  //     EN:'Kiosk',
  //     TH:'คีย์ออส',
  //     JP: 'ホーム',
  //     VN: 'Trang chủ'
  //   },
  //   icon: 'mdi-briefcase',
  //   to: '/page2',
  //   roles: [],
  // },  
]