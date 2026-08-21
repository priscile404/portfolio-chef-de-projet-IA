import { content } from '../data/content';

/** Lien mailto avec objet pre-rempli, et corps optionnel. */
export function mailtoHref(body: string = content.mail.body): string {
  const params = new URLSearchParams({ subject: content.mail.subject });
  if (body) params.set('body', body);
  return `mailto:${content.mail.address}?${params.toString().replace(/\+/g, '%20')}`;
}
