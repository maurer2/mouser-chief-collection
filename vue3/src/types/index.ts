import type { z } from 'zod';

import type { mouserChiefMapSchema } from '../schemas/mouser-chiefs';

export type MouserChiefMap = z.infer<typeof mouserChiefMapSchema>;
export type MouserChiefDetails = MouserChiefMap[string][number];
