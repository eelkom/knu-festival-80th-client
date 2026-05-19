type RollingPaperToastProps = {
  message: string;
};

export default function RollingPaperToast({ message }: RollingPaperToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed left-1/2 top-[166px] z-[200] flex w-[calc(100%-40px)] max-w-[335px] -translate-x-1/2 items-center gap-4 rounded-[10px] bg-black/70 px-5 py-2.5 font-wanted-sans text-[14px] font-medium leading-[1.4] text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
    >
      <span
        aria-hidden="true"
        className="flex size-[26px] shrink-0 items-center justify-center rounded-full border border-[#ff3d3d] bg-[#ff3d3d] text-[18px] font-bold leading-none text-white"
      >
        !
      </span>
      <span className="min-w-0 flex-1 whitespace-pre-line">{message}</span>
    </div>
  );
}
