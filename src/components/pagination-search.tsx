import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { PaginationProps } from '@theme/components/types';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Link, Button } from '@theme/components';
import usePagination from '@akinon/next/hooks/use-pagination';
import { useLocalization } from '@akinon/next/hooks';
import { useRouter } from '@akinon/next/hooks';
import { useInView } from 'react-intersection-observer';
import ListPage from '@theme/views/category/category-info';

export const PaginationSearch = (props: PaginationProps) => {
  const { t } = useLocalization();
  const router = useRouter();
  const {
    total,
    limit,
    currentPage,
    numberOfPages,
    containerClassName,
    prevClassName,
    pageClassName,
    nextClassName,
    moreButtonClassName,
    threshold = 1,
    type = 'list',
    onPageChange,
    direction,
    render
  } = props;

  const pagination = usePagination(total, limit, currentPage, numberOfPages);
  const {
    total: paginationTotal,
    limit: paginationLimit,
    page,
    pageList,
    prev,
    next,
    last,
    setTotal,
    setLimit
  } = pagination;

  const [paginationItems, setPaginationItems] = useState([]);
  const showNext = currentPage * paginationLimit < paginationTotal;
  const { ref, inView } = useInView({ threshold: 0.75 });
  const [prevPage, setPrevPage] = useState(page);
  const [nextPage, setNextPage] = useState(page);
  // const lastpage = {}

  const createListItems = useCallback(() => {
    setPaginationItems([]);
    const delta = 2;
    const startPage = Math.max(Number(page) - delta, 1);
    const endPage = Math.min(Number(page) + delta, numberOfPages);

    setPaginationItems((prev) => [
      ...prev,
      {
        page: pageList[0].page,
        url: pageList[0].url
      }
    ]);

    if (delta < startPage) {
      setPaginationItems((prev) => [...prev, { page: '...', url: '#' }]);
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i === 1) continue;

      setPaginationItems((prev) => [
        ...prev,
        {
          page: pageList[i - 1]?.page,
          url: pageList[i - 1]?.url
        }
      ]);
    }

    if (endPage < numberOfPages - threshold) {
      setPaginationItems((prev) => [...prev, { page: '...', url: '#' }]);
    }

    if (page < numberOfPages - delta) {
      setPaginationItems((prev) => [
        ...prev,
        {
          page: pageList[pageList.length - threshold].page,
          url: pageList[pageList.length - threshold].url
        }
      ]);
    }
  }, [numberOfPages, page, pageList, threshold]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();

    const newUrl = new URL(url, window.location.origin);
    const page = newUrl.searchParams.get('page');

    if (page === '1') {
      newUrl.searchParams.delete('page');
    }

    router.push(newUrl.pathname + newUrl.search, undefined);
  };

  const handlePageChange = () => {
    let changingPage;

    if (direction === 'prev') {
      changingPage = Number(type !== 'list' ? prevPage : page) - 1;
      setPrevPage(changingPage);
    } else {
      changingPage = Number(type !== 'list' ? nextPage : page) + 1;
      setNextPage(changingPage);
    }

    onPageChange(changingPage);
  };

  useEffect(() => {
    if (inView) {
      handlePageChange();
    }
  }, [inView]);

  useEffect(() => {
    if (type === 'list') {
      createListItems();
    }
  }, []);

  useEffect(() => {
    if (total && total !== paginationTotal) {
      setTotal(total);
    }
  }, [total, paginationTotal, setTotal]);

  useEffect(() => {
    if (limit && limit !== paginationLimit) {
      setLimit(limit);
    }
  }, [limit, paginationLimit, setLimit]);

  if (render) {
    return <>{render(pagination)}</>;
  }

  return direction === 'prev' && type !== 'list' ? (
    <>
      {Number(prevPage) !== 1 && (
        <div className="flex justify-center items-center">
          <Button
            className={twMerge('px-5', moreButtonClassName)}
            onClick={() => handlePageChange()}
          >
            {t('category.pagination.load_previous_page')}
          </Button>
        </div>
      )}
    </>
  ) : (
    <>
      {type === 'more' && (
        <div className="flex justify-center items-center">
          <Button
            className={twMerge(
              'px-5',
              Number(nextPage) === Number(last)
                ? 'bg-gray-600 border-gray-600 pointer-events-none'
                : 'bg-black',
              moreButtonClassName
            )}
            onClick={() => handlePageChange()}
            disabled={Number(nextPage) === Number(last)}
          >
            {t('category.pagination.more')}
          </Button>
        </div>
      )}

      {type === 'infinite' && Number(nextPage) !== last && (
        <div ref={ref}></div>
      )}

      {(type === 'infinite' || type === 'more') &&
        Number(nextPage) === last && (
          <p className="text-center mt-8">
            {t('category.pagination.shown_items')}
          </p>
        )}

      {type === 'list' && (
        <ul
          className={twMerge(
            'flex mt-8 mb-4 justify-between items-center',
            containerClassName
          )}
        >
          <div className='flex justify-end w-6/12'>
            <div className='pagination_next'>
              {showNext && next && (
                <li>
                  <Link
                    onClick={(e) => handleClick(e, next)}
                    href={next}
                    className={twMerge(
                      'flex cursor-pointer text-xs px-2',
                      nextClassName
                    )}
                  >
                    <span className="hidden lg:inline-block me-4">
                      {t('category.pagination.next')}
                    </span>
                  </Link>
                </li>
              )}
            </div>
          </div>
          <div className='flex'>
            {prev && (
              <li>
                <Link
                  onClick={(e) => handleClick(e, prev)}
                  href={prev}
                  className={twMerge(
                    'flex cursor-pointer text-sm px-2',
                    prevClassName
                  )}
                >
                  <span className="hidden lg:inline-block ms-2 pagination_text_color">
                    Page
                  </span>
                </Link>
              </li>
            )}
            {paginationItems.map((item, i) => (

              <li key={i} className='pagination_count_number pagination_text_color'>
                {item?.url != '#' && Number(page) === Number(item?.page) ? (
                  <Link
                    onClick={(e) => handleClick(e, item.url)}
                    href={item.url}
                    className={twMerge(
                      clsx(
                        'text-xm px-2 cursor-pointer',
                        { 'pointer-events-none': item.url === null },
                        Number(page) === Number(item?.page)
                          ? 'pagination_text_color'
                          : 'pagination_text_color'
                      ),
                      pageClassName
                    )}
                  >
                    {item?.page}
                  </Link>
                ) : (
                  <span
                    className="cursor-default text-xs flex items-center justify-center pagination_text_color"
                    style={{ display: Number(page) === Number(item?.page) ? 'block' : 'none' }}
                  >
                    {item?.page}
                  </span>
                )}
              </li>
            ))}
            <li className="hidden pagination_text_color lg:inline-block mx-2">
              of
            </li>
            <li className='cursor-default pagination_text_color font-semibold px-1 text-black-800 text-xs flex items-center justify-center'>{paginationItems[paginationItems.length - 1]?.page ? paginationItems[paginationItems.length - 1].page : ''}</li>
          </div>
        </ul>
      )}

    </>
  );
};
