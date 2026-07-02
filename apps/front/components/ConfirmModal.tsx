interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  variant?: "primary" | "danger";
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmText,
  variant = "primary",
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const buttonColors = {
    primary: "bg-blue-800 hover:bg-blue-950",
    danger: "bg-red-600 hover:bg-red-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-full transition-colors ${buttonColors[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}