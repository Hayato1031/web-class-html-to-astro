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
  const domain = import.meta.env.PUBLIC_MICROCMS_SERVICE_DOMAIN;
  const apiKey = import.meta.env.PUBLIC_MICROCMS_API_KEY;
  if (!domain || !apiKey) throw new Error('microCMSの公開設定がありません。PUBLIC_MICROCMS_SERVICE_DOMAINとPUBLIC_MICROCMS_API_KEYを設定してください。');
  return { domain, apiKey };
}

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function fetchCMSNews(options: { timeout?: number; retries?: number } = {}): Promise<CMSNews[]> {
  const { domain, apiKey } = getConfig();
  const timeout = options.timeout ?? 8000;
  const retries = options.retries ?? 2;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeout);
  const contents: CMSNews[] = [];
    let offset = 0;
    let totalCount = 0;
    try {
      do {
        const response = await fetch(`https://${domain}.microcms.io/api/v1/news?limit=100&offset=${offset}`, { headers: { 'X-MICROCMS-API-KEY': apiKey }, signal: controller.signal });
        if (!response.ok) throw new Error(`microCMSの記事取得に失敗しました（HTTP ${response.status}）。`);
        const page = await response.json() as CMSResponse;
        if (!Array.isArray(page.contents) || typeof page.totalCount !== 'number') throw new Error('microCMSの応答形式が想定と異なります。');
        contents.push(...page.contents);
        totalCount = page.totalCount;
        offset += page.contents.length;
        if (page.contents.length === 0 && offset < totalCount) throw new Error('microCMSのページ取得が途中で停止しました。');
      } while (offset < totalCount);
      return contents;
    } catch (error) {
      lastError = error instanceof DOMException && error.name === 'AbortError' ? new Error('microCMSの取得がタイムアウトしました。') : error;
      if (attempt < retries) await wait(400 * (attempt + 1));
    } finally {
      window.clearTimeout(timer);
    }
  }
  throw lastError instanceof Error ? lastError : new Error('microCMSの記事取得に失敗しました。');
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
