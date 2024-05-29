import dynamic from 'next/dynamic';
import { getFlatPageData } from '@akinon/next/data/server';
import { withSegmentDefaults } from '@akinon/next/hocs/server';
import { PageProps } from '@akinon/next/types';

// Import 'server-only' if needed

async function Page({ params }: PageProps<{ pk: number }>) {
  const data = await getFlatPageData({ pk: params.pk });
  const url = data.flat_page.url;

  // Dynamically import the component based on the URL
  if (url === '/about-us') {
    const AboutComponent = await import('@theme/widgets/about/about-us');
    const AboutECommerceComponent = await import('@theme/widgets/about/about-ecommerce');
    const AboutCoFounderComponent = await import('@theme/widgets/about/about-cofounder');
    return (<>
      <AboutComponent.default />
      <AboutECommerceComponent.default />
      <AboutCoFounderComponent.default />
    </>
    );
  } else if (url === '/digital-health') {
    const DigitalContent = await import('@theme/widgets/digital-health/digital-info');
    const DigitalSecondContent = await import('@theme/widgets/digital-health/digital-second');
    const DigitalThirdContent = await import('@theme/widgets/digital-health/digital-third');
    return (
      <>
        <DigitalContent.default />
        <DigitalSecondContent.default />
        <DigitalThirdContent.default />
      </>
    )
  } else if (url === '/logistics') {
    const LogisticsContent = await import('@theme/widgets/logistics/logistics-info');
    return (
      <>
        <LogisticsContent.default />
      </>
    );
  } else if (url === '/fintech') {
    const FintechContent = await import('@theme/widgets/fintech/fintech-info');
    return (
      <>
        <FintechContent.default />
      </>
    );
  } else if (url === '/entertainment') {
    const EntertanimnetContent = await import('@theme/widgets/entertainment/entertainment-content');
    return (
      <>
        <EntertanimnetContent.default />
      </>
    )
  } else if (url === '/join-mall-for-women') {
    const JoinMallForWomenContent = await import('@theme/widgets/join-mall-fow-women/join-mall-content');
    return (
      <>
        <JoinMallForWomenContent.default />
      </>
    )
  } else if (url === '/entry-tanent') {
    const EntryTenantTopContent = await import('@theme/widgets/entry-tenant/entry-tenant-top-content');
    const EntryTenantContent = await import('@theme/widgets/entry-tenant/entry-tanent-content');
    return (
      <>
        <EntryTenantTopContent.default />
        <EntryTenantContent.default />
      </>
    )
  }
  else if (url === '/key-tanent') {
    const KeyTenantTopContent = await import('@theme/widgets/key-tenant/key-tenant-top-content');
    const KeyTenantContent = await import('@theme/widgets/key-tenant/key-tanent-content');
    return (
      <>
        <KeyTenantTopContent.default />
        <KeyTenantContent.default />
      </>
    )
  }

  // If the URL doesn't match any special case, render the default content
  return (
    <div className="container mx-auto py-6">
      <div
        className="mx-auto prose prose-headings:text-primary"
        dangerouslySetInnerHTML={{ __html: data.flat_page.content }}
      />
    </div>
  );
}

export default withSegmentDefaults(Page, { segmentType: 'page' });
