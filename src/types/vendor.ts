// src/types/vendor.ts
export type VendorMenu = {
  id: string;
  name: string;
  description?: string;
  images?: string[];
};

export type Vendor = {
  id: string;
  approved: boolean;

  name: string;
  category?: string;

  prefecture?: string;
  city?: string;

  profileImage?: string | null;
  representative?: string;

  availableDays?: string[];

  needsElectricity?: boolean;
  needsWater?: boolean;
  usesFire?: boolean;

  menus?: VendorMenu[];

  phone?: string;
  email?: string;
  note?: string | null;
};