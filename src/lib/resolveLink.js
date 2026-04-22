/**
 * Resolves a Storyblok multilink field value to a usable href string.
 * Handles both legacy string values and the multilink object format.
 */
export function resolveLink(link) {
  if (!link) return null;
  if (typeof link === 'string') return link || null;
  if (link.linktype === 'story') {
    const slug = link.cached_url || link.story?.full_slug;
    if (!slug) return null;
    return slug.startsWith('/') ? slug : `/${slug}`;
  }
  if (link.linktype === 'email') return `mailto:${link.email}`;
  return link.url || link.cached_url || null;
}
