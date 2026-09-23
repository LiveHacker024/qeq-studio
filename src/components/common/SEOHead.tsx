import React, { useEffect } from 'react';
import { Product } from '../../types';
import { BUSINESS_INFO } from '../../data/initialConfig';
import { getAssetUrl } from '../../utils/assetUrl';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  image?: string;
  product?: Product;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'QeQ STUDIO | Luxury Handmade Press-On Nails',
  description = 'Handmade press-on nails by QeQ STUDIO. Normal Collection (3 Packs × 24 Nails = 72 Nails Total at ₹249) and Premium Collection (1 Premium Pack = 10 Nails at ₹299).',
  canonicalUrl = window.location.href,
  image,
  product
}) => {
  const resolvedImage = getAssetUrl(image || (product ? product.thumbnail : '/assets/logo/logo-3d.png'));

  useEffect(() => {
    // Update Document Title
    document.title = title.includes('QeQ STUDIO') ? title : `${title} | QeQ STUDIO`;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph tags
    const updateOG = (prop: string, content: string) => {
      let tag = document.querySelector(`meta[property="${prop}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', prop);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOG('og:title', title);
    updateOG('og:description', description);
    updateOG('og:image', resolvedImage.startsWith('http') ? resolvedImage : window.location.origin + resolvedImage);
    updateOG('og:url', canonicalUrl);

    // Inject JSON-LD Schema
    const schemaScriptId = 'qeq-structured-data';
    let scriptTag = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaScriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (product) {
      const prodImg = getAssetUrl(product.thumbnail);
      const productSchema: Record<string, any> = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        image: [prodImg.startsWith('http') ? prodImg : window.location.origin + prodImg],
        description: product.description,
        sku: product.sku,
        brand: {
          '@type': 'Brand',
          name: BUSINESS_INFO.brandName
        },
        offers: {
          '@type': 'Offer',
          url: window.location.href,
          priceCurrency: 'INR',
          price: product.price,
          availability: (product.stock ?? 1) > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition'
        }
      };
      scriptTag.text = JSON.stringify(productSchema);
    } else {
      const sameAsUrls = [BUSINESS_INFO.instagramUrl];
      if (BUSINESS_INFO.hasWhatsapp && BUSINESS_INFO.whatsappUrl) {
        sameAsUrls.push(BUSINESS_INFO.whatsappUrl);
      }

      const logoUrl = getAssetUrl('/assets/logo/company-logo.jpeg');
      const organizationSchema: Record<string, any> = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: BUSINESS_INFO.brandName,
        url: window.location.origin,
        logo: logoUrl.startsWith('http') ? logoUrl : window.location.origin + logoUrl,
        sameAs: sameAsUrls
      };

      if (BUSINESS_INFO.hasWhatsapp && BUSINESS_INFO.whatsappNumber) {
        organizationSchema.contactPoint = {
          '@type': 'ContactPoint',
          telephone: BUSINESS_INFO.whatsappNumber,
          contactType: 'customer service'
        };
      }
      scriptTag.text = JSON.stringify(organizationSchema);
    }
  }, [title, description, canonicalUrl, resolvedImage, product]);

  return null;
};
