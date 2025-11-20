import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentBreadcrumb extends Struct.ComponentSchema {
  collectionName: 'components_component_breadcrumbs';
  info: {
    displayName: 'Breadcrumb';
  };
  attributes: {
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentCard extends Struct.ComponentSchema {
  collectionName: 'components_component_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    icon: Schema.Attribute.Component<'component.svg-code', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface ComponentClientInputs extends Struct.ComponentSchema {
  collectionName: 'components_component_client_inputs';
  info: {
    displayName: 'ClientInput';
  };
  attributes: {
    points: Schema.Attribute.Component<'component.svg-code', true>;
    title: Schema.Attribute.String;
    year_of_experience: Schema.Attribute.Component<'component.svg-code', false>;
  };
}

export interface ComponentContactForm extends Struct.ComponentSchema {
  collectionName: 'components_component_contact_forms';
  info: {
    displayName: 'contact-form';
  };
  attributes: {
    ctaButton: Schema.Attribute.Component<'component.cta-btn', false>;
    fields: Schema.Attribute.Component<'component.form-field', true>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ComponentContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_component_contact_infos';
  info: {
    displayName: 'contact-info';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    statItem: Schema.Attribute.Component<'component.feature', true>;
  };
}

export interface ComponentContactSection extends Struct.ComponentSchema {
  collectionName: 'components_component_contact_sections';
  info: {
    displayName: 'contact-section';
  };
  attributes: {
    form_block: Schema.Attribute.Component<'component.contact-form', false>;
    info_block: Schema.Attribute.Component<'component.contact-info', false>;
  };
}

export interface ComponentCtaBtn extends Struct.ComponentSchema {
  collectionName: 'components_component_cta_btns';
  info: {
    displayName: 'Button';
  };
  attributes: {
    svg_code: Schema.Attribute.Text;
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentDropdownItems extends Struct.ComponentSchema {
  collectionName: 'components_component_dropdown_items';
  info: {
    displayName: 'link_item';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentEstimationStrategy extends Struct.ComponentSchema {
  collectionName: 'components_component_estimation_strategies';
  info: {
    displayName: 'Estimation Strategy';
  };
  attributes: {
    strategy_item: Schema.Attribute.Component<'component.strategies', true>;
    title: Schema.Attribute.String;
  };
}

export interface ComponentFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_component_faq_items';
  info: {
    displayName: 'FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.RichText;
    icon: Schema.Attribute.Component<'component.cta-btn', true>;
    question: Schema.Attribute.Text;
  };
}

export interface ComponentFeature extends Struct.ComponentSchema {
  collectionName: 'components_component_features';
  info: {
    displayName: 'Statistics\u00A0';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    icon: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ComponentFormField extends Struct.ComponentSchema {
  collectionName: 'components_component_form_fields';
  info: {
    displayName: 'form-field';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String;
    options: Schema.Attribute.JSON;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    type: Schema.Attribute.Enumeration<
      ['text', 'email', 'textarea', 'number', 'select', 'file', 'radio']
    >;
  };
}

export interface ComponentImageWithPoints extends Struct.ComponentSchema {
  collectionName: 'components_component_image_with_points';
  info: {
    displayName: 'ImageWithPoints';
  };
  attributes: {
    badge: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    points: Schema.Attribute.Component<'component.cta-btn', true>;
    sub_title: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ComponentLastestBlog extends Struct.ComponentSchema {
  collectionName: 'components_component_lastest_blogs';
  info: {
    displayName: 'Latest Blog';
  };
  attributes: {
    badge: Schema.Attribute.String;
    ctaButton: Schema.Attribute.Component<'component.cta-btn', false>;
    title: Schema.Attribute.String;
  };
}

export interface ComponentLinkGroup extends Struct.ComponentSchema {
  collectionName: 'components_component_link_groups';
  info: {
    displayName: 'link-group';
  };
  attributes: {
    group_title: Schema.Attribute.String;
    linkItem: Schema.Attribute.Component<'component.dropdown-items', true>;
    url: Schema.Attribute.String;
  };
}

export interface ComponentLodSection extends Struct.ComponentSchema {
  collectionName: 'components_component_lod_sections';
  info: {
    displayName: 'lod-section';
  };
  attributes: {
    badge: Schema.Attribute.String;
    tabs: Schema.Attribute.Component<'component.tabs', true>;
    title: Schema.Attribute.Text;
  };
}

export interface ComponentMapsection extends Struct.ComponentSchema {
  collectionName: 'components_component_mapsections';
  info: {
    displayName: 'Mapsection';
  };
  attributes: {
    border: Schema.Attribute.String;
    height: Schema.Attribute.Integer;
    loading: Schema.Attribute.Enumeration<['lazy', 'eager']>;
    mapUrl: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    width: Schema.Attribute.Integer;
  };
}

export interface ComponentMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_component_menu_items';
  info: {
    displayName: 'menu_item';
  };
  attributes: {
    dropdownIcon: Schema.Attribute.Component<'component.cta-btn', true>;
    dropdownItem: Schema.Attribute.Component<'component.link-group', true>;
    has_dropdown: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    menuType: Schema.Attribute.Enumeration<['megamenu', 'submenu']>;
    url: Schema.Attribute.String;
  };
}

export interface ComponentRating extends Struct.ComponentSchema {
  collectionName: 'components_component_ratings';
  info: {
    displayName: 'Rating';
  };
  attributes: {
    svg_icon: Schema.Attribute.Text;
    type: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      >;
  };
}

export interface ComponentRunningBannerLogo extends Struct.ComponentSchema {
  collectionName: 'components_component_running_banner_logos';
  info: {
    displayName: 'ImageWithBadge';
  };
  attributes: {
    badge: Schema.Attribute.String;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface ComponentSample extends Struct.ComponentSchema {
  collectionName: 'components_component_samples';
  info: {
    displayName: 'Sample';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    sample_image: Schema.Attribute.Component<
      'component.running-banner-logo',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface ComponentSeo extends Struct.ComponentSchema {
  collectionName: 'components_component_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.Text;
    ogTags: Schema.Attribute.RichText;
    schemaMarkup: Schema.Attribute.JSON;
    twitterTags: Schema.Attribute.RichText;
  };
}

export interface ComponentServiceOverview extends Struct.ComponentSchema {
  collectionName: 'components_component_service_overviews';
  info: {
    displayName: 'service-overview';
  };
  attributes: {
    description: Schema.Attribute.Text;
    estimation_footer: Schema.Attribute.Text;
    estimation_Strategy: Schema.Attribute.Component<
      'component.estimation-strategy',
      false
    >;
    service_Item: Schema.Attribute.Component<'component.services', true>;
  };
}

export interface ComponentServices extends Struct.ComponentSchema {
  collectionName: 'components_component_services';
  info: {
    displayName: 'services';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentServicesInclude extends Struct.ComponentSchema {
  collectionName: 'components_component_services_includes';
  info: {
    displayName: 'Services Include';
  };
  attributes: {
    badge: Schema.Attribute.String;
    features: Schema.Attribute.Component<'component.feature', true>;
    title: Schema.Attribute.Text;
  };
}

export interface ComponentSoftwareProficiency extends Struct.ComponentSchema {
  collectionName: 'components_component_software_proficiencies';
  info: {
    displayName: 'software Proficiency';
  };
  attributes: {
    badge: Schema.Attribute.String;
    logo: Schema.Attribute.Component<'component.running-banner-logo', true>;
    title: Schema.Attribute.String;
  };
}

export interface ComponentStats extends Struct.ComponentSchema {
  collectionName: 'components_component_stats';
  info: {
    displayName: 'stats';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ComponentStrategies extends Struct.ComponentSchema {
  collectionName: 'components_component_strategies';
  info: {
    displayName: 'strategies';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Component<'component.svg-code', false>;
    title: Schema.Attribute.String;
  };
}

export interface ComponentSvgCode extends Struct.ComponentSchema {
  collectionName: 'components_component_svg_codes';
  info: {
    displayName: 'svg_icon';
  };
  attributes: {
    icon: Schema.Attribute.Text;
    text: Schema.Attribute.Text;
    url: Schema.Attribute.String;
  };
}

export interface ComponentTabs extends Struct.ComponentSchema {
  collectionName: 'components_component_tabs';
  info: {
    displayName: 'Tabs';
  };
  attributes: {
    points: Schema.Attribute.Component<'component.cta-btn', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ComponentWhatWeServe extends Struct.ComponentSchema {
  collectionName: 'components_component_what_we_serves';
  info: {
    displayName: 'what_We_Serve';
  };
  attributes: {
    badge: Schema.Attribute.String;
    feature_section: Schema.Attribute.Component<'component.feature', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedAboutFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_about_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    badge: Schema.Attribute.String;
    ctaButton: Schema.Attribute.Component<'component.cta-btn', false>;
    description: Schema.Attribute.Text;
    faqitem: Schema.Attribute.Component<'component.faq-item', true>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedAboutWhyWeChoose extends Struct.ComponentSchema {
  collectionName: 'components_shared_about_why_we_chooses';
  info: {
    displayName: 'Why We Choose';
  };
  attributes: {
    badge: Schema.Attribute.String;
    bg_image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    ctaButton: Schema.Attribute.Component<'component.cta-btn', false>;
    features: Schema.Attribute.Component<'component.feature', true>;
    main_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    side_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    years_of_experience: Schema.Attribute.Component<
      'component.svg-code',
      false
    >;
  };
}

export interface SharedHeroHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    badge: Schema.Attribute.String;
    breadcrumb: Schema.Attribute.Component<'component.breadcrumb', true>;
    ctaButton: Schema.Attribute.Component<'component.cta-btn', false>;
    description: Schema.Attribute.Text;
    images: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    slug: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedHomeAboutUs extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_about_uses';
  info: {
    displayName: 'about_us';
  };
  attributes: {
    badge: Schema.Attribute.String;
    ctaButton: Schema.Attribute.Component<'component.cta-btn', false>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    statistic: Schema.Attribute.Component<'component.feature', true>;
    title: Schema.Attribute.String;
    years_of_experience: Schema.Attribute.Component<'component.cta-btn', false>;
  };
}

export interface SharedHomeClientType extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_client_types';
  info: {
    displayName: 'client_type';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface SharedHomeKeyPoints extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_key_points';
  info: {
    displayName: 'key_points';
  };
  attributes: {
    badge: Schema.Attribute.String;
    ctaButton: Schema.Attribute.Component<'component.cta-btn', false>;
    key_services: Schema.Attribute.Component<'shared-home.services', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedHomeOurTeam extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_our_teams';
  info: {
    displayName: 'Our Team';
  };
  attributes: {
    badge: Schema.Attribute.String;
    member: Schema.Attribute.Component<'component.card', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedHomeRecentProjects extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_recent_projects';
  info: {
    displayName: 'Recent Projects';
  };
  attributes: {
    badge: Schema.Attribute.String;
    cardDescription: Schema.Attribute.String;
    cardHeading: Schema.Attribute.String;
    ctaButton: Schema.Attribute.Component<'component.cta-btn', false>;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    svg_icon: Schema.Attribute.Component<'component.svg-code', false>;
  };
}

export interface SharedHomeServices extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_services';
  info: {
    displayName: 'Services';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    link: Schema.Attribute.String;
    points: Schema.Attribute.Component<'component.cta-btn', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedHomeTestimonialCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_testimonial_cards';
  info: {
    displayName: 'testimonial_card';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    name: Schema.Attribute.String;
    quote_icon: Schema.Attribute.Component<'component.svg-code', true>;
    rating: Schema.Attribute.Component<'component.rating', false>;
    role: Schema.Attribute.String;
  };
}

export interface SharedHomeTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_testimonials';
  info: {
    displayName: 'Testimonials';
  };
  attributes: {
    badge: Schema.Attribute.String;
    testimonial_card: Schema.Attribute.Component<
      'shared-home.testimonial-card',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SharedHomeWhyWeChoose extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_why_we_chooses';
  info: {
    displayName: 'Why We Choose';
  };
  attributes: {
    badge: Schema.Attribute.String;
    ctaButton: Schema.Attribute.Component<'component.cta-btn', false>;
    features: Schema.Attribute.Component<'component.feature', true>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    stats: Schema.Attribute.Component<'component.stats', true>;
    subHeading: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'component.breadcrumb': ComponentBreadcrumb;
      'component.card': ComponentCard;
      'component.client-inputs': ComponentClientInputs;
      'component.contact-form': ComponentContactForm;
      'component.contact-info': ComponentContactInfo;
      'component.contact-section': ComponentContactSection;
      'component.cta-btn': ComponentCtaBtn;
      'component.dropdown-items': ComponentDropdownItems;
      'component.estimation-strategy': ComponentEstimationStrategy;
      'component.faq-item': ComponentFaqItem;
      'component.feature': ComponentFeature;
      'component.form-field': ComponentFormField;
      'component.image-with-points': ComponentImageWithPoints;
      'component.lastest-blog': ComponentLastestBlog;
      'component.link-group': ComponentLinkGroup;
      'component.lod-section': ComponentLodSection;
      'component.mapsection': ComponentMapsection;
      'component.menu-item': ComponentMenuItem;
      'component.rating': ComponentRating;
      'component.running-banner-logo': ComponentRunningBannerLogo;
      'component.sample': ComponentSample;
      'component.seo': ComponentSeo;
      'component.service-overview': ComponentServiceOverview;
      'component.services': ComponentServices;
      'component.services-include': ComponentServicesInclude;
      'component.software-proficiency': ComponentSoftwareProficiency;
      'component.stats': ComponentStats;
      'component.strategies': ComponentStrategies;
      'component.svg-code': ComponentSvgCode;
      'component.tabs': ComponentTabs;
      'component.what-we-serve': ComponentWhatWeServe;
      'shared-about.faq': SharedAboutFaq;
      'shared-about.why-we-choose': SharedAboutWhyWeChoose;
      'shared-hero.hero': SharedHeroHero;
      'shared-home.about-us': SharedHomeAboutUs;
      'shared-home.client-type': SharedHomeClientType;
      'shared-home.key-points': SharedHomeKeyPoints;
      'shared-home.our-team': SharedHomeOurTeam;
      'shared-home.recent-projects': SharedHomeRecentProjects;
      'shared-home.services': SharedHomeServices;
      'shared-home.testimonial-card': SharedHomeTestimonialCard;
      'shared-home.testimonials': SharedHomeTestimonials;
      'shared-home.why-we-choose': SharedHomeWhyWeChoose;
    }
  }
}
