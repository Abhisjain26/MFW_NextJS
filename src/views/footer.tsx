import 'server-only';

import FooterCopyright from '@theme/widgets/footer-copyright';
import FooterInfo from '@theme/widgets/footer-info';
import FooterMenu from '@theme/widgets/footer-menu';
import FooterSubscription from '@theme/widgets/footer-subscription';
import FooterBackground from '../../public/images/footer/footer_background.svg';


export default function Footer() {
  const backgroundImageUrl = FooterBackground.src;

  return (
    <div className='lg:pt-5 lg:border-t lg:border-gray' style={{
      backgroundImage: `url(${FooterBackground.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100%'
    }}>
      <div className="container px-9 pb-0 pt-5 mx-auto md:flex md:flex-wrap lg:pb-16 lg:px-0">
        <div>
          {/* <FooterInfo /> */}
          <FooterMenu />
        </div>
        {/* <FooterSubscription /> */}
        <FooterCopyright />
      </div>
    </div>
  );
}
