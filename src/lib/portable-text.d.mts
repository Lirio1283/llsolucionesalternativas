export function escapeHtml(value?: unknown): string;
export function safeLink(value: unknown): string | null;
export function imageUrl(ref: string | undefined, project: string, dataset: string, width?: number): string | null;
export function renderPortableText(blocks?: any[], config?: {project?: string; dataset?: string}): string;
