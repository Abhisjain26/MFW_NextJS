'use client';

import { useEffect, useState } from 'react';
import { Button, Input, LoaderSpinner, Select } from '@theme/components';
import { twMerge } from 'tailwind-merge';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DynamicForm from './dynamic-form';
import {
  AllFieldClassesType,
  FieldPropertiesType,
  FormField,
  FormPropertiesType,
  Schema
} from '@akinon/next/types';

export function GenerateFormFields({
  schema,
  allFieldClasses,
  fieldProperties,
  formProperties,
  submitButtonText
}: {
  schema: Schema;
  allFieldClasses?: AllFieldClassesType;
  fieldProperties: FieldPropertiesType[];
  formProperties: FormPropertiesType;
  submitButtonText: string;
}) {
  const [fields, setFields] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const generateValidationSchema = () => {
    const schemaObject = {};

    Object.keys(schema).forEach((key) => {
      const item = schema[key];

      if (item.validators) {
        const { validators } = item;
        let fieldSchema;

        if (item.input_type === 'integer') {
          fieldSchema = yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable();
        } else {
          fieldSchema = yup.string();
        }

        if (validators.required) {
          fieldSchema = fieldSchema.required();
        }

        if (validators.min_length !== undefined) {
          fieldSchema = fieldSchema.min(validators.min_length);
        }

        if (validators.max_length !== undefined) {
          fieldSchema = fieldSchema.max(validators.max_length);
        }

        if (validators.min_value !== undefined) {
          fieldSchema = fieldSchema.min(validators.min_value);
        }

        if (validators.max_value !== undefined) {
          fieldSchema = fieldSchema.max(validators.max_value);
        }

        schemaObject[item.key] = fieldSchema;
      }
    });

    return yup.object().shape(schemaObject);
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormField>({
    resolver: yupResolver(generateValidationSchema())
  });

  useEffect(() => {
    const sortedFields = Object.keys(schema)
      .map((key) => {
        const item = schema[key];

        fieldProperties.find((fieldProperty) => {
          if (fieldProperty.key === item.key) {
            item.class = fieldProperty.className;
            item.attributes = fieldProperty.attributes;
            item.labelClass = fieldProperty.labelClassName;
            item.wrapperClass = fieldProperty.wrapperClassName;
          }
        });

        return item;
      })
      .sort((a, b) => a.order - b.order);

    setFields(sortedFields);
    setIsLoading(false);
  }, [schema, fieldProperties]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      fetch(formProperties.actionUrl, {
        method: 'POST',
        body: formData
      });
    } catch (error) {
      console.error('Form submit error:', error);
    }
  };

  const generateField = (field: FormField) => {
    const inputType = field.input_type;

    if (!inputType) {
      return null;
    }

    switch (inputType) {
      case 'text':
      case 'email':
        return (
          <div
            className={twMerge(
              allFieldClasses?.wrapperClassName,
              field.wrapperClass
            )}
            key={field.id}
          >
            <label
              htmlFor={field.id}
              className={twMerge(
                allFieldClasses?.labelClassName,
                field.labelClass
              )}
            >
              {field.label}
            </label>
            <Input
              id={field.id}
              type={inputType === 'text' ? 'text' : 'email'}
              className={twMerge(allFieldClasses?.className, field.class)}
              name={field.key}
              {...field.attributes}
              error={errors[field.key]}
              {...register(field.key)}
            />
          </div>
        );

      case 'integer':
        return (
          <div
            className={twMerge(
              allFieldClasses?.wrapperClassName,
              field.wrapperClass
            )}
            key={field.id}
          >
            <label
              htmlFor={field.id}
              className={twMerge(
                allFieldClasses?.labelClassName,
                field.labelClass
              )}
            >
              {field.label}
            </label>
            <Input
              id={field.id}
              type="number"
              className={twMerge(allFieldClasses?.className, field?.class)}
              name={field.key}
              {...field.attributes}
              error={errors[field.key]}
              {...register(field.key, { valueAsNumber: true })}
            />
          </div>
        );

      case 'text_area':
        return (
          <div
            className={twMerge(
              allFieldClasses?.wrapperClassName,
              field.wrapperClass
            )}
            key={field.id}
          >
            <label
              htmlFor={field.id}
              className={twMerge(
                allFieldClasses?.labelClassName,
                field.labelClass
              )}
            >
              {field.label}
            </label>
            <textarea
              id={field.id}
              className={twMerge(allFieldClasses?.className, field.class)}
              name={field.key}
              {...field.attributes}
              {...register(field.key)}
            />
            {errors[field.key] && (
              <span className="mt-1 text-sm text-error">
                {errors[field.key].message}
              </span>
            )}
          </div>
        );

      case 'date':
      case 'datetime':
        return (
          <div
            className={twMerge(
              allFieldClasses?.wrapperClassName,
              field.wrapperClass
            )}
            key={field.id}
          >
            <label
              htmlFor={field.id}
              className={twMerge(
                allFieldClasses?.labelClassName,
                field.labelClass
              )}
            >
              {field.label}
            </label>
            <Input
              id={field.id}
              type={inputType === 'date' ? 'date' : 'datetime-local'}
              className={twMerge(allFieldClasses?.className, field?.class)}
              name={field.key}
              {...field.attributes}
              error={errors[field.key]}
              {...register(field.key)}
            />
          </div>
        );

      case 'integer_range':
        return (
          <div
            className={twMerge(
              allFieldClasses?.wrapperClassName,
              field.wrapperClass
            )}
            key={field.id}
          >
            <label
              htmlFor={field.id}
              className={twMerge(
                allFieldClasses?.labelClassName,
                field.labelClass
              )}
            >
              {field.label}
            </label>
            <Select
              id={field.id}
              className={twMerge(allFieldClasses?.className, field?.class)}
              name={field.key}
              {...field.attributes}
              options={field.choices.map((choice) => ({
                value: choice,
                label: choice
              }))}
              {...field.attributes}
              error={errors[field.key]}
              {...register(field.key)}
            />
          </div>
        );

      case 'file':
      case 'image':
        return (
          <div
            className={twMerge(
              allFieldClasses?.wrapperClassName,
              field.wrapperClass
            )}
            key={field.id}
          >
            <label
              htmlFor={field.id}
              className={twMerge(
                allFieldClasses?.labelClassName,
                field.labelClass
              )}
            >
              {field.label}
            </label>
            <Input
              id={field.id}
              type="file"
              className={twMerge(allFieldClasses?.className, field?.class)}
              name={field.key}
              {...field.attributes}
              error={errors[field.key]}
              {...register(field.key)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <DynamicForm
        className={formProperties.className}
        onSubmit={handleSubmit(onSubmit)}
      >
        {loading ? (
          <LoaderSpinner />
        ) : (
          <>
            {fields.map((field: FormField) => generateField(field))}
            <Button type="submit" className="w-full">
              {submitButtonText}
            </Button>
          </>
        )}
      </DynamicForm>
    </div>
  );
}
