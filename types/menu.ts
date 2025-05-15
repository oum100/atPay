// types/menu.ts
export interface MenuItem {
    title: string;
    icon: string;
    to?: string;
    roles?: string[];
    children?: MenuItem[];
  }
  
  export const menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'mdi-home',
      to: '/dashboard',
      roles: [],
    },
    {
      title: 'About Us',
      icon: 'mdi-information',
      to: '/about',
      roles: [],
    },    
    {
      title: 'Services',
      icon: 'mdi-briefcase',
      roles: [],
      children: [
        {
          title: 'Consulting',
          icon: 'mdi-account-tie',
          to: '/services/consulting',
          roles: [],
        },
        {
          title: 'Support',
          icon: 'mdi-lifebuoy',
          to: '/services/support',
          roles: [],
        },
      ],
    },
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/dashboard',
      roles: ['user', 'admin'],
    },
    {
      title: 'Management',
      icon: 'mdi-cog',
      roles: ['admin'],
      children: [
        {
          title: 'Users',
          icon: 'mdi-account-multiple',
          to: '/management/users',
          roles: ['admin'],
        },
        {
          title: 'Settings',
          icon: 'mdi-settings',
          to: '/management/settings',
          roles: ['admin'],
        },
      ],
    },
    {
      title: 'Reports',
      icon: 'mdi-chart-bar',
      to: '/reports',
      roles: ['user', 'admin'],
    },
  ];
  