import { cn } from '~shared/utils/cn.util';

export type SubscribeButtonProps = {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function SubscribeButton({
  onClick,
  loading = false,
  disabled = false,
  children,
  className,
}: SubscribeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'w-full flex items-center justify-center gap-1 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200',
        'bg-blue-600 text-white border-2 border-transparent',
        'shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),inset_0px_-2px_0px_0px_rgba(16,24,40,0.05),inset_0px_0px_0px_1px_rgba(16,24,40,0.18)]',
        'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600',
        className
      )}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
