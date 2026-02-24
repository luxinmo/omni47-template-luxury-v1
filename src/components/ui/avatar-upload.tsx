import { useState, useRef, useCallback } from "react";
import { Camera, X, Check, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarUploadProps {
  value?: string;
  initials?: string;
  onChange?: (url: string | undefined) => void;
  size?: number;
  variant?: "person" | "company";
  className?: string;
}

const AvatarUpload = ({
  value,
  initials,
  onChange,
  size = 80,
  variant = "person",
  className,
}: AvatarUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      setPreview(url);
    },
    [],
  );

  const confirmCrop = () => {
    if (preview) {
      onChange?.(preview);
      setPreview(null);
    }
  };

  const cancelCrop = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  const removeAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(undefined);
  };

  const displayInitials =
    initials ||
    (variant === "company" ? "CO" : "?");

  const iconSize = size * 0.35;

  // Crop preview modal
  if (preview) {
    return (
      <div className={cn("relative inline-flex flex-col items-center gap-3", className)}>
        <div
          className="rounded-full overflow-hidden border-2 border-primary"
          style={{ width: size, height: size }}
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cancelCrop}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-muted hover:bg-accent transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
          <button
            type="button"
            onClick={confirmCrop}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Check className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative inline-block cursor-pointer group", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => inputRef.current?.click()}
      style={{ width: size, height: size }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      <div
        className={cn(
          "w-full h-full rounded-full flex items-center justify-center overflow-hidden transition-all",
          value
            ? "ring-2 ring-border"
            : "bg-muted ring-1 ring-border",
        )}
      >
        {value ? (
          <img src={value} alt="Avatar" className="w-full h-full object-cover" />
        ) : variant === "company" ? (
          <Building2
            style={{ width: iconSize, height: iconSize }}
            className="text-muted-foreground"
          />
        ) : (
          <span
            className="font-semibold text-muted-foreground select-none"
            style={{ fontSize: size * 0.32 }}
          >
            {displayInitials}
          </span>
        )}
      </div>

      {/* Hover overlay */}
      <div
        className={cn(
          "absolute inset-0 rounded-full flex items-center justify-center bg-foreground/40 transition-opacity",
          hovering ? "opacity-100" : "opacity-0",
        )}
      >
        <Camera className="text-white" style={{ width: iconSize, height: iconSize }} />
      </div>

      {/* Remove button */}
      {value && hovering && (
        <button
          type="button"
          onClick={removeAvatar}
          className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-sm"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default AvatarUpload;
