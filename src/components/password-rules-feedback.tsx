import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useLocalization } from '@akinon/next/hooks';

interface passwordType {
  password: string;
  isVisible: boolean;

}

const PasswordRulesFeedback = (Props: passwordType) => {
  const { password, isVisible } = Props;
  const { t } = useLocalization();

  const rules = [
    {
      rule: /.{6,}/,
      description: 'auth.register.form.input_constraints.password_length',
    },
    {
      rule: /[A-Z]/,
      description: 'auth.register.form.input_constraints.uppercase_letter',
    },
    {
      rule: /[a-z]/,
      description: 'auth.register.form.input_constraints.lower_case',
    },
    {
      rule: /[0-9]/,
      description: 'auth.register.form.input_constraints.numeric_character',
    },
    {
      rule: /[^a-zA-Z0-9\s]/,
      description: 'auth.register.form.input_constraints.special_character',
    },
  ];

  const passwordCheck = password && rules.some((item) => !password.match(item.rule));

  return (
    <ul className={twMerge(
      'hidden text-xs absolute z-10 bg-gray-100 mt-3 top-full left-0 p-2 xs:p-3',
      'after:content-empty after:absolute after:block after:w-0 after:border-[15px] after:border-solid after:border-transparent after:border-b-gray-100 after:border-t-0 after:-top-3',
      isVisible ? 'flex flex-col' : !passwordCheck ? 'hidden' : '',
    )}>
      {rules.map((item, index) => (
        <li
          key={index}
          className={twMerge(
            password.match(item.rule) ? 'valid text-success' : 'invalid text-error',
          )}
        >
          {t(`${item.description}`)}
        </li>
      ))}
    </ul>
  );
};

export default PasswordRulesFeedback;
