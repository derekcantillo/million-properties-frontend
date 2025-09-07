import type { locales } from '@/lib/i18n/config';

export type Locale = (typeof locales)[number];

export interface TranslationKeys {
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    view: string;
    search: string;
    filter: string;
    clear: string;
    next: string;
    previous: string;
    close: string;
    open: string;
    yes: string;
    no: string;
  };
  navigation: {
    home: string;
    properties: string;
    about: string;
    contact: string;
    login: string;
    logout: string;
    profile: string;
    dashboard: string;
    settings: string;
  };
  property: {
    title: string;
    properties: string;
    type: string;
    status: string;
    price: string;
    location: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    description: string;
    features: string;
    images: string;
    contact_agent: string;
    schedule_visit: string;
    save_favorite: string;
    share: string;
    types: {
      apartment: string;
      house: string;
      condo: string;
      townhouse: string;
      land: string;
      commercial: string;
    };
    statuses: {
      available: string;
      sold: string;
      rented: string;
      pending: string;
      'off-market': string;
    };
  };
  search: {
    title: string;
    placeholder: string;
    filters: string;
    min_price: string;
    max_price: string;
    property_type: string;
    bedrooms_min: string;
    bathrooms_min: string;
    area_min: string;
    area_max: string;
    results: string;
    no_results: string;
    clear_filters: string;
  };
  auth: {
    login: string;
    register: string;
    logout: string;
    email: string;
    password: string;
    confirm_password: string;
    forgot_password: string;
    remember_me: string;
    dont_have_account: string;
    already_have_account: string;
    sign_up: string;
    sign_in: string;
  };
  errors: {
    something_went_wrong: string;
    page_not_found: string;
    unauthorized: string;
    forbidden: string;
    server_error: string;
    network_error: string;
    validation_error: string;
    required_field: string;
    invalid_email: string;
    password_too_short: string;
    passwords_dont_match: string;
  };
  meta: {
    site_name: string;
    site_description: string;
    home_title: string;
    properties_title: string;
    about_title: string;
    contact_title: string;
  };
}
