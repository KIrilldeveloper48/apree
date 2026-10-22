export function getTaskCreatedAtLabel(createdAt: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(createdAt));
}
