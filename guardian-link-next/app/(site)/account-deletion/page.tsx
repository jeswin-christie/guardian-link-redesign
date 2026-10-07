import PageHero from '@/components/PageHero';
import LegalDoc from '@/components/LegalDoc';
import { JsonLd } from '@/components/primitives';
import { DELETION } from '@/lib/legal';
import { pageMetadata, pageSchema } from '@/lib/meta';

export const metadata = pageMetadata('account-deletion');

export default function AccountDeletion() {
  return (
    <>
      <JsonLd data={pageSchema('account-deletion')} />
      <PageHero
        size="short"
        scale="lg"
        eyebrow="Account"
        lines={['How to Delete', 'Your Account']}
        sub={<div className="doc__meta"><span>{DELETION.updated}</span></div>}
        image="homw-block-3-highshield.webp"
      />
      <LegalDoc doc={DELETION} />
    </>
  );
}
