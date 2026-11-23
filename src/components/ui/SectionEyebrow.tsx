export default function SectionEyebrow({ label, tag }: { label: string; tag?: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-medium text-white/80">
      <span className="w-1.5 h-1.5 rounded-full bg-white" />
      {label}
      {tag && <span className="px-2 py-0.5 rounded-full border border-white/10 text-white/50">{tag}</span>}
    </div>
  )
}
