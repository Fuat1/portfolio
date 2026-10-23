import { absoluteUrl, site } from './content';

const personId = absoluteUrl('/#person');

/** schema.org Person + ProfilePage for the home page. */
export function profilePageJsonLd() {
  const { profile } = site;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
        jobTitle: profile.role,
        description: profile.positioning,
        url: absoluteUrl('/'),
        email: `mailto:${profile.email}`,
        sameAs: [profile.linkedin, profile.github],
        address: { '@type': 'PostalAddress', addressCountry: 'MK' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: site.education.school },
        knowsLanguage: ['tr', 'en', 'mk'],
        knowsAbout: site.skills.filter((group) => group.group !== 'Languages').flatMap((group) => group.items),
      },
      {
        '@type': 'ProfilePage',
        '@id': absoluteUrl('/'),
        url: absoluteUrl('/'),
        name: `${profile.name} · ${profile.role}`,
        inLanguage: 'en',
        dateModified: new Date().toISOString(),
        mainEntity: { '@id': personId },
      },
    ],
  };
}
