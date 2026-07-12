import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const TYPE_LABELS: Record<string, string> = {
  'case-study': 'Case Study',
  writing: 'Writing',
  video: 'Video',
  podcast: 'Podcast',
  research: 'Research',
  speaking: 'Speaking',
  'indigenous-engagement': 'Indigenous Engagement',
};

const STORY_TYPES = ['writing', 'video', 'podcast'];

/** All published posts, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Featured case studies, ordered by featuredRank (1 = big slot, 2-4 = stacked). */
export function featuredPosts(posts: Post[]): Post[] {
  return posts
    .filter((p) => p.data.featured && p.data.featuredRank)
    .sort((a, b) => (a.data.featuredRank ?? 99) - (b.data.featuredRank ?? 99))
    .slice(0, 4);
}

/** Pure storytelling posts: every type is writing/video/podcast. */
export function storytellingPosts(posts: Post[]): Post[] {
  return posts.filter((p) => p.data.types.every((t) => STORY_TYPES.includes(t)));
}

/** Research & Indigenous Engagement posts (non-speaking), for the home stacked rows. */
export function researchRowPosts(posts: Post[], excludeId?: string): Post[] {
  return posts.filter(
    (p) =>
      p.id !== excludeId &&
      !p.data.types.includes('speaking') &&
      (p.data.types.includes('research') || p.data.types.includes('indigenous-engagement'))
  );
}

/** Speaking & Leadership posts. */
export function speakingPosts(posts: Post[]): Post[] {
  return posts.filter((p) => p.data.types.includes('speaking'));
}

/** Where a post's card should link: out to the published piece, or to its hosted page. */
export function postHref(post: Post): string {
  return post.data.externalLink ?? `/blog/${post.id}/`;
}

export function isExternal(post: Post): boolean {
  return Boolean(post.data.externalLink);
}

/** "Case Study", "Podcast · Indigenous Engagement", ... */
export function tagLabel(post: Post): string {
  return post.data.types.map((t) => TYPE_LABELS[t]).join(' · ');
}

export function youtubeThumb(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function shortDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function longDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
