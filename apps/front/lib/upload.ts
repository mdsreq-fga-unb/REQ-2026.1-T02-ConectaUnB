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

  try {
    const { data } = await api.post<UploadImageResult>(
      `/storage/upload?${params.toString()}`,
      formData,
      {
        timeout: 30000,
      },
    );

    return data;
  } catch (error) {
    const status = (error as { response?: { status?: number } }).response?.status;

    if (slot === "avatar" && status === 404) {
      const localFormData = new FormData();
      localFormData.append("file", file);
      if (entityId != null) localFormData.append("entityId", String(entityId));

      const localResponse = await fetch("/api/uploads/avatar", {
        method: "POST",
        body: localFormData,
      });

      if (!localResponse.ok) {
        throw error;
      }

      const data = (await localResponse.json()) as {
        url?: string;
        linkFoto?: string;
      };

      const localUrl = data.url ?? data.linkFoto;
      if (!localUrl) {
        throw error;
      }

      return {
        fileId: "",
        key: `perfil:${entityId ?? "me"}`,
        url: localUrl,
        size: file.size,
        mimeType: file.type,
      };
    }

    throw error;
  }
}
