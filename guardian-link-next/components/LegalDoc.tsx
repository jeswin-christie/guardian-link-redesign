import Link from 'next/link';
import type { ReactNode } from 'react';
import { Rich } from './primitives';

export type Block =
  | { type: 'h2' | 'h3' | 'p'; text: string }
  | { type: 'li'; text: string; ordered?: boolean }
  | { type: 'table'; rows: string[][] };

export type LegalJson = { title: string; subtitle?: string | null; updated?: string; blocks: Block[] };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60);

/** Renders a policy from content/legal/*.json: groups list items, adds heading anchors and a table of contents. */
export default function LegalDoc({ doc }: { doc: LegalJson }) {
  const out: ReactNode[] = [];
  const toc: { id: string; text: string }[] = [];
  const used = new Set<string>();
  let list: { ordered: boolean; items: string[] } | null = null;

  const flush = () => {
    if (!list) return;
    const Tag = list.ordered ? 'ol' : 'ul';
    out.push(<Tag key={`l${out.length}`}>{list.items.map((t, i) => <li key={i}><Rich text={t} /></li>)}</Tag>);
    list = null;
  };

  doc.blocks.forEach((b, i) => {
    if (b.type === 'li') {
      const ordered = !!b.ordered;
      if (list && list.ordered !== ordered) flush();
      if (!list) list = { ordered, items: [] };
      list.items.push(b.text);
      return;
    }
    flush();
    if (b.type === 'h2') {
      let id = slug(b.text) || `s${i}`;
      while (used.has(id)) id += '-x';
      used.add(id);
      toc.push({ id, text: b.text });
      out.push(<h2 key={i} id={id}>{b.text}</h2>);
    } else if (b.type === 'h3') {
      out.push(<h3 key={i}><Rich text={b.text} /></h3>);
    } else if (b.type === 'p') {
      out.push(<p key={i}><Rich text={b.text} /></p>);
    } else if (b.type === 'table') {
      const single = b.rows.length === 1 && b.rows[0].length === 1;
      out.push(single
        ? <div key={i} className="doc__callout"><Rich text={b.rows[0][0]} /></div>
        : <table key={i}><tbody>{b.rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci}><Rich text={c} /></td>)}</tr>)}</tbody></table>);
    }
  });
  flush();

  return (
    <section className="panel doc" data-section="doc">
      <aside className="doc__toc" data-lenis-prevent>
        {toc.length > 1 && (
          <>
            <h5>On this page</h5>
            {toc.map((t) => <a key={t.id} href={`#${t.id}`}>{t.text}</a>)}
          </>
        )}
        <h5 style={{ marginTop: 28 }}>Legal</h5>
        <Link href="/legal/">All policies</Link>
      </aside>
      <article className="doc__body">{out}</article>
    </section>
  );
}
