import { getFormData } from '@akinon/next/data/server';
import { t } from '@akinon/next/utils/server-translation';
import { GenerateFormFields } from '@theme/components/generate-form-fields';

export default async function Page({ params }) {
  const data = await getFormData({ pk: params.pk });
  const { schema, is_active, name, pk } = data;

  if (!is_active) {
    return null;
  }

  return (
    <div className="relative">
      <div className="bg-[#f7f7f7] h-[245px] w-full">
        <h1 className="text-[30px] text-center pt-14">{name}</h1>
      </div>
      <GenerateFormFields
        schema={schema}
        allFieldClasses={{
          className:
            'border border-[#d4d4d4] text-[#4a4f54] mt-1.5 h-[38px] p-2.5 text-xs outline-none focus:border-black',
          labelClassName: 'text-[#4a4f54] text-xs',
          wrapperClassName: 'flex flex-col mb-6'
        }}
        fieldProperties={[
          {
            key: 'address',
            className: 'h-[58px]'
          },
          {
            key: 'dropdown',
            className: 'w-full',
            attributes: {
              placeholder: 'Please select'
            }
          }
        ]}
        formProperties={{
          actionUrl: `/api/form/${pk}/`,
          className:
            'w-[calc(100%-36px)] md:w-[570px] px-[18px] py-[60px] md:p-[100px] border border-[#cbc8c8] border-t-[3px] border-t-[#e95151] mx-auto -mt-[100px] bg-white mb-14',
        }}
        submitButtonText={t('form.form_page.submit_button_text')}
      />
    </div>
  );
}
