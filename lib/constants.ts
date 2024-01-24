import * as z from 'zod';

export const formSchema = z.object({
    category: z.string().min(2).max(12),
});