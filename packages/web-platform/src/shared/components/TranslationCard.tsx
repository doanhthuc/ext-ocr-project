import { IconCopy, IconShare, IconSpeaker } from '~/assets/icons';
import { cn } from '~shared/utils/cn.util';

export type TranslationCardProps = {
  /**
   * The language of the translated text
   */
  language: string;

  /**
   * The translated text content
   */
  text: string;

  /**
   * Callback when copy button is clicked
   */
  onCopy?: () => void;

  /**
   * Callback when share button is clicked
   */
  onShare?: () => void;

  /**
   * Callback when speaker/audio button is clicked
   */
  onSpeak?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether the card is in a loading state
   */
  loading?: boolean;
};

export function TranslationCard({
  language,
  text,
  onCopy,
  onShare,
  onSpeak,
  className,
  loading = false,
}: TranslationCardProps) {
  return (
    <div
      className={cn(
        // Base container matching Figma design
        'w-full max-w-[496px] bg-[#2970FF] rounded-[20px] p-[18px] pb-[20px] text-white',
        'flex flex-col gap-4',
        loading && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {/* Language Label */}
      <div className="text-xs font-semibold leading-[18px]">{language}</div>

      {/* Text Content */}
      <div className="text-base font-normal leading-6 flex-1 min-h-[72px]">
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-white/20 rounded w-full"></div>
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
          </div>
        ) : (
          text
        )}
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-10">
        {/* Copy Icon */}
        <button
          onClick={onCopy}
          disabled={loading}
          className="w-6 h-6 flex items-center justify-center text-white hover:text-white/80 transition-colors disabled:opacity-50"
          aria-label="Copy text"
        >
          <IconCopy className="w-4 h-4" />
        </button>

        {/* Share Icon */}
        <button
          onClick={onShare}
          disabled={loading}
          className="w-6 h-6 flex items-center justify-center text-white hover:text-white/80 transition-colors disabled:opacity-50"
          aria-label="Share text"
        >
          <IconShare className="w-[17.5px] h-[19px]" />
        </button>

        {/* Speaker Icon - positioned to the right */}
        <button
          onClick={onSpeak}
          disabled={loading}
          className="w-6 h-6 flex items-center justify-center text-white hover:text-white/80 transition-colors disabled:opacity-50 ml-auto"
          aria-label="Read text aloud"
        >
          <IconSpeaker className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
}
