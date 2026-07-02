import { StorageSlotName } from './storage.constants';

export interface StorageUploadResult {
  fileId: string;
  key: string;
  url: string;
  size: number;
  mimeType: string;
}

export interface StorageProvider {
  upload(args: {
    buffer: Buffer;
    key: string;
    contentType: string;
    cacheControl: string;
  }): Promise<{ url: string }>;
  delete(args: { key: string }): Promise<void>;
}

export interface UploadContext {
  slot: StorageSlotName;
  ownerId: number;
  entityType?: string | null;
  entityId?: number | null;
}
