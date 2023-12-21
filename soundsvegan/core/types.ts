export type NavItem = {
  label: string;
  url: string;
  external?: boolean;
  children?: NavItem[];
};

export type Nav = {
  mainNavigation: NavItem[];
};
