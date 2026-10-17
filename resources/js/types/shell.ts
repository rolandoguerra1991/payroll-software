export type IconName =
    | 'alert'
    | 'arrow-right'
    | 'briefcase'
    | 'building'
    | 'calendar'
    | 'check'
    | 'clock'
    | 'close'
    | 'dashboard'
    | 'download'
    | 'logout'
    | 'menu'
    | 'moon'
    | 'search'
    | 'sun'
    | 'trending-up'
    | 'user'
    | 'users'
    | 'wallet';

export type NavigationItem = {
    label: string;
    href: string;
    icon: IconName;
};

export type SidebarUser = {
    name: string;
    role: string;
};
