import { z } from 'zod';

export const MouserChiefMapSchema = z
  .record(
    z.string(),
    z.array(
      z.object({
        beganTenure: z.string(),
        endedTenure: z.string(),
        timeInOffice: z.string(),
        primeMinisters: z.array(z.string()).nonempty('List must contain at least one entry'),
      }),
    ),
  )
  .refine((entries) => Object.keys(entries).length > 0, {
    message: 'Map must contain at least one entry',
  });

export type MouserChiefMap = z.output<typeof MouserChiefMapSchema>;

// export const MouserChiefMapSchema2 = z
//   .record(
//     z.string(),
//     z.array(
//       z.object({
//         beganTenure: z.string(),
//         endedTenure: z.string(),
//         timeInOffice: z.string(),
//         primeMinisters: z.array(z.string()).nonempty('List must contain at least one entry'),
//       }),
//     ),
//   )
//   .refine((entries) => Object.keys(entries).length > 0, {
//     message: 'Map must contain at least one entry',
//   })
//   .transform((entries) => new Map(Object.entries(entries)));
// export type MouserChiefMap2 = z.output<typeof MouserChiefMapSchema2>;
