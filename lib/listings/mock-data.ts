export type ListingStatus = 'active' | 'reserved' | 'sold' | 'archived' | 'removed';

export type ListingRecord = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  size: string;
  condition: string;
  isFree: boolean;
  priceCents: number | null;
  whatsappPhone: string;
  status: ListingStatus;
  imageUrl: string;
  schoolName: string;
};

const MOCK_LISTINGS: ListingRecord[] = [
  {
    id: 'listing-001',
    ownerId: 'owner-001',
    title: 'Polo oficial azul marinho',
    description: 'Pouco uso, sem manchas. Tamanho 8 anos.',
    size: '8 anos',
    condition: 'Muito bom',
    isFree: false,
    priceCents: 1200,
    whatsappPhone: '+351911000111',
    status: 'active',
    imageUrl:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=960&q=80',
    schoolName: 'Colegio Exemplo',
  },
  {
    id: 'listing-002',
    ownerId: 'owner-002',
    title: 'Calcas de fato treino',
    description: 'Modelo unissexo, elasticos em bom estado.',
    size: '10 anos',
    condition: 'Bom',
    isFree: true,
    priceCents: null,
    whatsappPhone: '+351922000333',
    status: 'reserved',
    imageUrl:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=960&q=80',
    schoolName: 'Colegio Exemplo',
  },
  {
    id: 'listing-003',
    ownerId: 'owner-003',
    title: 'Casaco impermeavel',
    description: 'Usado durante um periodo curto, muito estimado.',
    size: '12 anos',
    condition: 'Bom',
    isFree: false,
    priceCents: 1800,
    whatsappPhone: '+351934000555',
    status: 'sold',
    imageUrl:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=960&q=80',
    schoolName: 'Colegio Exemplo',
  },
];

const VISIBLE_STATUS: ListingStatus[] = ['active', 'reserved'];

export async function getVisibleListings(): Promise<ListingRecord[]> {
  return MOCK_LISTINGS.filter((listing) => VISIBLE_STATUS.includes(listing.status));
}

export async function getAllListings(): Promise<ListingRecord[]> {
  return [...MOCK_LISTINGS];
}

export async function getVisibleListingById(
  id: string,
): Promise<ListingRecord | null> {
  const listing = MOCK_LISTINGS.find((item) => item.id === id);
  if (!listing) return null;
  if (!VISIBLE_STATUS.includes(listing.status)) return null;
  return listing;
}

export function formatListingPrice(
  isFree: boolean,
  priceCents: number | null,
): string {
  if (isFree) return 'Gratis';
  if (priceCents === null) return 'Preco a combinar';

  return `${(priceCents / 100).toFixed(2)} EUR`;
}

export function getStatusLabel(status: ListingStatus): string {
  if (status === 'active') return 'Ativo';
  if (status === 'reserved') return 'Reservado';
  if (status === 'sold') return 'Vendido';
  if (status === 'archived') return 'Arquivado';
  return 'Removido';
}
