import { site } from '@/lib/content';

export function SkillsGrid() {
  return (
    <dl className="mt-10 grid overflow-hidden rounded-2xl border border-line bg-line [gap:1px] sm:grid-cols-2 lg:grid-cols-3">
      {site.skills.map((group) => (
        <div key={group.group} className="bg-bg p-5 sm:p-6">
          <dt className="label">{group.group}</dt>
          <dd className="mt-3">
            <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-[15px]">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
