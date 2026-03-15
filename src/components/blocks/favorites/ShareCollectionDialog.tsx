/**
 * SHARE COLLECTION DIALOG
 * Modal dialog for sharing a saved property collection via link or email.
 * Origin: FavoritesPage (planned feature)
 */

import { useState } from "react";
import { X, Copy, Mail, Check } from "lucide-react";

interface ShareCollectionDialogProps {
  open?: boolean;
  onClose?: () => void;
  shareUrl?: string;
  propertyCount?: number;
}

const ShareCollectionDialog = ({
  open = true,
  onClose,
  shareUrl = "https://prestigeestates.com/collection/abc123",
  propertyCount = 6,
}: ShareCollectionDialogProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="bg-white rounded-sm p-6 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-medium text-neutral-900">Share Collection</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[14px] font-light mb-6 text-neutral-500">
          Share your collection of {propertyCount} saved properties with friends or your advisor.
        </p>

        {/* Copy link */}
        <div className="flex gap-2 mb-4">
          <input
            readOnly
            value={shareUrl}
            className="flex-1 text-[13px] px-3 py-2.5 border border-neutral-200 bg-neutral-50 text-neutral-700 rounded-sm focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="shrink-0 px-4 py-2.5 text-[12px] tracking-[0.1em] uppercase font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors rounded-sm flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        {/* Email share */}
        <button className="w-full flex items-center justify-center gap-2 text-[12px] tracking-[0.1em] uppercase font-light py-2.5 border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors rounded-sm">
          <Mail className="w-4 h-4" /> Share via Email
        </button>
      </div>
    </div>
  );
};

export default ShareCollectionDialog;
