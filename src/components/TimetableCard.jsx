export default function StatCard({ icon: Icon, label, value, sublabel, tint }) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tint}`}>
                <Icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-xl font-semibold text-slate-900">{value}</p>
                {sublabel && <p className="text-xs text-slate-400">{sublabel}</p>}
            </div>
        </div>
    );
}