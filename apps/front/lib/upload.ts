import { api } from "@/guards/api";

export type StorageSlot =
  | "avatar"
  | "logo"
  | "banner"
  | "postagem"
  | "projeto_foto"
  | "projeto_banner"
  | "processo_foto";

export interface UploadImageResult {
  fileId: string;
  key: string;
  url: string;
  size: number;
  mimeType: string;
}

/**
 * Envia uma imagem para o backend (que comprime com sharp e grava no R2/local).
 * Retorna a URL pública já pronta para uso em payloads de criação/edição.
 *
 * Fluxo recomendado:
 *   1. Usuário escolhe arquivo (ImageUploadBox).
 *   2. Antes de salvar a entidade, chame uploadImage() e use a URL retornada.
 *   3. Envie o payload JSON normal com a URL preenchida.
 */
export async function uploadImage(
  file: File,
  slot: StorageSlot,
  entityId?: number,
): Promise<UploadImageResult> {
  const formData = new FormData();
  formData.append("file", file);

  const params = new URLSearchParams({ slot });
  if (entityId != null) params.set("entityId", String(entityId));

  const { data } = await api.post<UploadImageResult>(
    `/storage/upload?${params.toString()}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 30000,
    },
  );

  return data;
}
