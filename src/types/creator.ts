export type CreatorWork = {
  id?: string;
  title?: string;
  description?: string;
  images?: string[];
};

export type Creator = {
  id: string;

  approved?: boolean;

  name: string;
  category?: string;
  prefecture: string;
  city: string;
  profileImage?: string | null;

  activityAreas: string[];
  styles: string[];
  tags: string[];

  acceptsCommission: boolean;
  acceptsWorkshop: boolean;
  acceptsExhibition: boolean;
  onlineAvailable: boolean;

  instagram?: string | null;
  otherLink?: string | null;
  note?: string | null;

  works: CreatorWork[];
};