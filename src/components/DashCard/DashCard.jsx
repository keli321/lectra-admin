import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashCard({ headerIcon, heading, number, note }) {
  const hasRecords = Number(number) > 0;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{heading}</p>

          <p className="mt-3 text-4xl font-bold text-slate-900">{number}</p>

          <p
            className={`mt-3 text-sm ${
              hasRecords ? "text-teal-700" : "text-slate-500"
            }`}
          >
            {note}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-lg text-teal-700">
          <FontAwesomeIcon icon={headerIcon} />
        </div>
      </div>
    </article>
  );
}