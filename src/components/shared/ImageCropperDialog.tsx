import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { canvasToPngBlob, renderSquareCroppedCanvas } from '@/lib/image/crop';

interface ImageCropperDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string, blob: Blob) => void;
  aspectRatio?: number;
  circularCrop?: boolean;
  title?: string;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  const cropSize = 90;
  return centerCrop(
    makeAspectCrop(
      { unit: '%', width: cropSize },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export function ImageCropperDialog({
  open,
  onOpenChange,
  imageSrc,
  onCropComplete,
  aspectRatio = 1,
  circularCrop = true,
  title = 'Adjust image',
}: ImageCropperDialogProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lastPreviewUrlRef = useRef<string | null>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspectRatio));
  };

  const handleReset = () => {
    setScale(1);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, aspectRatio));
    }
  };

  const canRender = !!imgRef.current && !!completedCrop;

  const renderFinal = async () => {
    if (!imgRef.current || !completedCrop) return null;
    const canvas = renderSquareCroppedCanvas(imgRef.current, completedCrop, {
      zoom: scale,
      outputSize: 512,
    });
    const blob = await canvasToPngBlob(canvas);
    const url = URL.createObjectURL(blob);
    return { url, blob };
  };

  // Live preview — must match final avatar exactly.
  useEffect(() => {
    let cancelled = false;
    const update = async () => {
      if (!canRender) return;
      const result = await renderFinal();
      if (!result || cancelled) return;
      if (lastPreviewUrlRef.current) URL.revokeObjectURL(lastPreviewUrlRef.current);
      lastPreviewUrlRef.current = result.url;
      setPreviewUrl(result.url);
    };
    const t = window.setTimeout(update, 120);
    return () => { cancelled = true; window.clearTimeout(t); };
  }, [canRender, completedCrop?.x, completedCrop?.y, completedCrop?.width, completedCrop?.height, scale]);

  useEffect(() => {
    return () => {
      if (lastPreviewUrlRef.current) URL.revokeObjectURL(lastPreviewUrlRef.current);
    };
  }, []);

  const handleSave = async () => {
    const result = await renderFinal();
    if (result) {
      onCropComplete(result.url, result.blob);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg" aria-describedby="crop-dialog-description">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription id="crop-dialog-description" className="sr-only">
            Adjust and crop the selected image
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Crop Area */}
          <div className="relative flex items-center justify-center bg-muted/50 rounded-lg overflow-hidden min-h-[300px]">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              circularCrop={circularCrop}
              className="max-h-[300px]"
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop preview"
                style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
                onLoad={onImageLoad}
                className="max-h-[300px] object-contain"
              />
            </ReactCrop>
          </div>

          {/* Final Preview */}
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">Final preview</div>
            <div className="h-16 w-16 rounded-full overflow-hidden [clip-path:circle(50%)] bg-muted flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Final avatar preview"
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-muted-foreground/20" />
              )}
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-4">
            <ZoomOut className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[scale]}
              onValueChange={([value]) => setScale(value)}
              min={0.5}
              max={3}
              step={0.1}
              className="flex-1"
            />
            <ZoomIn className="h-4 w-4 text-muted-foreground" />
            <Button variant="ghost" size="icon" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
