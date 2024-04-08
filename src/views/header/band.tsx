import 'server-only';

import { UserMenu } from './user-menu';
import ActionMenu from './action-menu';

import HeaderBandText from '@theme/widgets/header-band-text';
import { LanguageSelect } from '@theme/components';
import { CurrencySelect } from 'components/currency-select';

export default function HeaderBand() {
  return (
    <div className="contents text-xs">
      <div className="hidden justify-start sm:inline-flex sm:gap-x-5 sm:header-grid-area-band-l">
        <LanguageSelect className="bg-transparent w-11 px-0 text-sm" />
        <CurrencySelect className="bg-transparent w-12 px-0 text-sm" />
      </div>

      {/* <div className="header-grid-area-nav bg-gray-100 h-auto p-3 sm:header-grid-area-band-m sm:h-9 sm:py-0">
        <div className="text-center overflow-ellipsis line-clamp-2 h-full flex items-center justify-center">
          <HeaderBandText />
        </div>
      </div> */}

      <div className="header-grid-area-main-r h-full pr-4 sm:header-grid-area-band-r sm:pr-0">
        <div className="flex items-center justify-end h-full">
          <UserMenu isMobile={false} />
          <ActionMenu />
        </div>
      </div>
    </div>
  );
}
