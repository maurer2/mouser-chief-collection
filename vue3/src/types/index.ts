import type { z } from 'zod';

import type { MouserChiefMapSchema } from '../schemas/mouser-chiefs';

export type MouserChiefMap = z.infer<typeof MouserChiefMapSchema>;
export type MouserChiefDetails = MouserChiefMap[string][number];
