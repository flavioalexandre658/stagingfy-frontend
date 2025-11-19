export type KnowledgeSourceType = "text" | "document" | "url" | "faqs";

export type KnowledgeSourceConfig = {
  questions?: string[];
  answer?: string;
  sent_count?: number;
  last_used_at?: string | null;
  fileType?: string;
  mimeType?: string;
  originalName?: string;
  originalSize?: number;
  processedSize?: number;
  type?: string;
  status?: string;
  isParent?: boolean;
  autoCrawl?: boolean;
  lastCrawled?: string;
  excludePaths?: string[];
  numberOfLinks?: number;
  includeOnlyPaths?: string[];
  previous_mark?: string;
  // Website scraping specific fields
  originalUrl?: string;
  scrapingMethod?: string;
  sourceType?: string;
}

export interface KnowledgeSource {
  id: string;
  agent_id: string;
  type: KnowledgeSourceType;
  name: string;
  config: KnowledgeSourceConfig;
  s3_url: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  created_at: string;
  updated_at: string;
}
