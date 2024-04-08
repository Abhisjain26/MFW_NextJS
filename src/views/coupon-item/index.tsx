'use client';

export interface CouponItem {
  mainTitle: string;
  subTitles: Array<string>;
  data?: Array<string | number | object>;
  values: Array<string>;
  emptyText: string;
  offerType: string;
}

export const CouponItem = ({
  mainTitle,
  subTitles,
  data,
  offerType,
  values,
  emptyText
}: CouponItem) => {
  const filteredData = data?.filter(
    (coupon) => coupon['offer_type'].value === offerType
  );
  const dateText = 'date';

  return (
    <div className="mb-6">
      <h2 className="text-xl mb-5">{mainTitle}</h2>
      <div>
        <table className="text-xs w-full">
          <thead className="bg-gray-200">
            <tr className="hidden w-full text-left lg:table-row">
              {subTitles.map((subTitle, index) => (
                <th key={index} className="p-3 font-medium">
                  {subTitle}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData.map((coupon, i) => (
                <tr
                  key={i}
                  className="flex flex-col lg:table-row odd:bg-gray-50 even:bg-gray-25"
                >
                  {subTitles.map((subTitle, index) => (
                    <td
                      key={index}
                      className="p-3 table-row before:w-1/2 before:content-[attr(data-label)] before:float-left lg:before:content-[''] lg:table-cell"
                      data-label={subTitle}
                    >
                      <span>
                        {values[index] == 'amount'
                          ? coupon[values[index]] +
                            ' ' +
                            coupon['currency'].label
                          : values[index].includes(dateText)
                          ? coupon[values[index]].slice(0, 10)
                          : coupon[values[index]]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="flex flex-col bg-gray-50 lg:table-row">
                <td
                  colSpan={4}
                  className="px-2 py-3 text-center text-secondary"
                >
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
