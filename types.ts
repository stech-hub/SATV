
export enum Category {
  NEWS = 'News',
  ENTERTAINMENT = 'Entertainment',
  SPORTS = 'Sports',
  KIDS = 'Kids',
  DOCUMENTARY = 'Documentary',
  MUSIC = 'Music',
  LIBERIA = 'Liberia & Africa',
  LOCAL = 'Local'
}

export interface Channel {
  id: string;
  name: string;
  category: Category;
  url: string;
  logo: string;
  description: string;
  isLive: boolean;
}

export interface AppState {
  currentChannel: Channel | null;
  searchQuery: string;
  selectedCategory: Category | 'All';
  favorites: string[];
}
