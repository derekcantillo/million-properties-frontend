'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { PropertyType, PropertyStatus } from '@/types';

export function useI18n() {
  const t = useTranslations();
  const locale = useLocale();

  const translatePropertyType = (type: PropertyType): string => {
    return t(`property.types.${type}`);
  };

  const translatePropertyStatus = (status: PropertyStatus): string => {
    return t(`property.statuses.${status}`);
  };

  const formatPrice = (price: number, currency = 'USD'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(price);
  };

  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  };

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat(locale).format(number);
  };

  return {
    t,
    locale,
    translatePropertyType,
    translatePropertyStatus,
    formatPrice,
    formatDate,
    formatNumber,
  };
}
