import { z } from 'zod';

export const PageValidator = z.object({
  name: z.string().min(1, { message: 'プロジェクト名は必須です' }).max(30, {
    message: 'ページ名は30字以上入力することはできません',
  }),
  path: z
    .string()
    .min(1, {
      message: 'パスは必須です',
    })
    .max(200, { message: 'パスは200字以上入力することはできません' }),
  projectId: z.string(),
  level: z.number(),
});

export const PageEditValidator = PageValidator.omit({
  projectId: true,
  level: true,
});
