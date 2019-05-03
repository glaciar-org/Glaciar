import { NbMenuItem } from '@nebular/theme'

export const MENU_ITEMS: NbMenuItem[] = [

  { title: '',  home: false,  },

  { title: 'IoT Dashboard',        icon: 'nb-home',    link: '/pages/iot-dashboard',  },
  { title: 'Miscellaneous',        icon: 'nb-shuffle',    
    children: [
      { title: '404',              link: '/pages/miscellaneous/404',     },
      { title: 'pablo',            link: '/pages/miscellaneous/pablo',   },
    ],
  },
  { title: 'Auth',    icon: 'nb-locked',    
    children: [
      { title: 'Login',            link: '/auth/login',                  },
      { title: 'Register',         link: '/auth/register',               },
      { title: 'Request Password', link: '/auth/request-password',       },
      { title: 'Reset Password',   link: '/auth/reset-password',         },
    ],
  },

]
