import React from "react";
import { Dialog } from "@/components/ui/Dialog";

interface ConfirmDialogProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
}

export function ConfirmDialog({
  visible,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
}: ConfirmDialogProps) {
  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      title={title}
      description={description}
      confirmLabel={confirmLabel}
      cancelLabel="Cancel"
      onConfirm={onConfirm}
      variant="destructive"
    />
  );
}
