export interface CMSNews {
  id: string;
  title?: string;
  date?: string;
  publishedAt?: string;
  category?: string;
  summary?: string;
  body?: string;
}

interface CMSResponse { contents: CMSNews[]; totalCount: number; }

function getConfig() {
  const domain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = import.meta.env.MICROCMS_API_KEY;
  if (!domain || !apiKey) throw new Error('microCMSのビルド設定がありません。MICROCMS_SERVICE_DOMAINとMICROCMS_API_KEYを.envに設定してください。');
  return { domain, apiKey };
}

export async function fetchCMSNews(): Promise<CMSNews[]> {
  const { domain, apiKey } = getConfig();
  const contents: CMSNews[] = [];
  let offset = 0;
  let totalCount = 0;
  do {
    const response = await fetch(`https://${domain}.microcms.io/api/v1/news?limit=100&offset=${offset}`, { headers: { 'X-MICROCMS-API-KEY': apiKey } });
    if (!response.ok) throw new Error(`microCMSの記事取得に失敗しました（HTTP ${response.status}）。設定とAPI権限を確認してください。`);
    let page: CMSResponse;
    try { page = await response.json() as CMSResponse; } catch { throw new Error('microCMSの応答を読み取れませんでした。API設定を確認してください。'); }
    if (!Array.isArray(page.contents) || typeof page.totalCount !== 'number') throw new Error('microCMSの応答形式が想定と異なります。news APIの設定を確認してください。');
    contents.push(...page.contents);
    totalCount = page.totalCount;
    offset += page.contents.length;
    if (page.contents.length === 0 && offset < totalCount) throw new Error('microCMSのページ取得が途中で停止しました。API応答を確認してください。');
  } while (offset < totalCount);
  return contents;
}

export function cmsArticleDate(article: CMSNews): string {
  return article.date || article.publishedAt || '';
}

export function cmsArticleCategory(article: CMSNews): string {
  return article.category || 'お知らせ';
}

export function formatCMSDate(article: CMSNews): string {
  const value = cmsArticleDate(article);
  if (!value) return '日付未設定';
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? value.slice(0, 10) : parsed.toISOString().slice(0, 10);
}
