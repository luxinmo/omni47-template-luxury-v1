import { useState, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ImageCropperDialog } from './ImageCropperDialog';
import { cn } from '@/lib/utils';

interface LogoUploaderProps {
  /** Current logo URL (or null if none). */
  currentLogoUrl: string | null;
  /** Called with the cropped blob URL after the user confirms the crop. */
  onLogoChange: (url: string, blob: Blob) => void;
  /** Icon shown when no logo is set. */
  fallbackIcon?: React.ReactNode;
  /** Avatar size preset. */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Label for the upload button. Defaults to "Upload logo". */
  uploadLabel?: string;
  /** Label for the change button. Defaults to "Change logo". */
  changeLabel?: string;
}

const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-20 w-20',
  lg: 'h-28 w-28',
};

/**
 * Reusable circular logo uploader with crop & zoom dialog.
 *
 * This component does NOT handle storage uploads — it returns the cropped
 * blob URL and Blob via `onLogoChange`, so the parent can decide how to
 * persist it (Supabase Storage, local state, etc.).
 *
 * Usage:
 * ```tsx
 * <LogoUploader
 *   currentLogoUrl={agency.logoUrl}
 *   onLogoChange={(url, blob) => handleUpload(url, blob)}
 *   fallbackIcon={<Building2 className="h-8 w-8 text-muted-foreground" />}
 *   size="lg"
 * />
 * ```
 */
export function LogoUploader({
  currentLogoUrl,
  onLogoChange,
  fallbackIcon,
  size = 'md',
  className,
  uploadLabel = 'Upload logo',
  changeLabel = 'Change logo',
}: LogoUploaderProps) {
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleCropComplete = (croppedImageUrl: string, blob: Blob) => {
    onLogoChange(croppedImageUrl, blob);
    setSelectedImage(null);
  };

  return (
    <>
      <div className={cn('relative group', className)}>
        <Avatar className={cn(sizeClasses[size], 'cursor-pointer')}>
          <AvatarImage src={currentLogoUrl || undefined} />
          <AvatarFallback className="bg-primary/10">
            {fallbackIcon}
          </AvatarFallback>
        </Avatar>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 rounded-full bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="h-5 w-5 text-white" />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Accessible upload button */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className="mt-2"
      >
        <Upload className="h-4 w-4 mr-2" />
        {currentLogoUrl ? changeLabel : uploadLabel}
      </Button>

      {selectedImage && (
        <ImageCropperDialog
          open={showCropper}
          onOpenChange={setShowCropper}
          imageSrc={selectedImage}
          onCropComplete={handleCropComplete}
          aspectRatio={1}
          circularCrop={true}
          title="Adjust logo"
        />
      )}
    </>
  );
}
