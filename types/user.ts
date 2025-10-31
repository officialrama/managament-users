export type User = {
  id: number | string;
  name: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
  company?: { name?: string };
  address?: { city?: string; street?: string };
  avatarUrl?: string;
}
