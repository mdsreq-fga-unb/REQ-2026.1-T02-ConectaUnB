export type StorageSlotName =
  | 'avatar'
  | 'logo'
  | 'banner'
  | 'postagem'
  | 'projeto_foto'
  | 'projeto_banner'
  | 'processo_foto';

export interface StorageSlot {
  name: StorageSlotName;
  width: number;
  height: number;
  fit: 'cover' | 'inside';
  maxSizeBytes: number;
  single: boolean;
}

export const STORAGE_SLOTS: Record<StorageSlotName, StorageSlot> = {
  avatar: {
    name: 'avatar',
    width: 256,
    height: 256,
    fit: 'cover',
    maxSizeBytes: 2 * 1024 * 1024,
    single: true,
  },
  logo: {
    name: 'logo',
    width: 256,
    height: 256,
    fit: 'inside',
    maxSizeBytes: 2 * 1024 * 1024,
    single: true,
  },
  banner: {
    name: 'banner',
    width: 1280,
    height: 400,
    fit: 'cover',
    maxSizeBytes: 3 * 1024 * 1024,
    single: true,
  },
  postagem: {
    name: 'postagem',
    width: 1080,
    height: 1080,
    fit: 'inside',
    maxSizeBytes: 4 * 1024 * 1024,
    single: false,
  },
  projeto_foto: {
    name: 'projeto_foto',
    width: 1080,
    height: 720,
    fit: 'cover',
    maxSizeBytes: 3 * 1024 * 1024,
    single: true,
  },
  projeto_banner: {
    name: 'projeto_banner',
    width: 1280,
    height: 400,
    fit: 'cover',
    maxSizeBytes: 3 * 1024 * 1024,
    single: true,
  },
  processo_foto: {
    name: 'processo_foto',
    width: 1080,
    height: 720,
    fit: 'cover',
    maxSizeBytes: 3 * 1024 * 1024,
    single: true,
  },
};

export const ALLOWED_INPUT_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

export const OUTPUT_MIME = 'image/webp';
export const OUTPUT_EXT = 'webp';

export const DEFAULT_UPLOAD_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const DEFAULT_PERFIL_STORAGE_QUOTA_BYTES = 50 * 1024 * 1024;
export const CACHE_CONTROL_IMMUTABLE = 'public, max-age=31536000, immutable';
