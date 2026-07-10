import { defineBasicLoader, reroute } from 'vue-router/experimental';

import dataJSON from '@data/data_normalized.json';
import type { MouserChiefMap } from '../types/index';
import { mouserChiefMapSchema } from '../schemas/mouser-chiefs';

export const useMouserChiefs = defineBasicLoader(async (to): Promise<MouserChiefMap> => {
  const result = mouserChiefMapSchema.safeParse(dataJSON);

  if (!result.success) {
    reroute({ name: 'server-error' });
  }

  const entries = result.data;
  const mouserChiefNames = new Set(Object.keys(entries));

  // ignore root page (entry undefined) and not found page (entry not in list)
  const { entry } = to.params;

  if (typeof entry === 'string' && !mouserChiefNames.has(entry)) {
    // keep invalid url but remove leading slash: https://router.vuejs.org/guide/essentials/dynamic-matching.html#Catch-all-404-Not-found-Route
    reroute({ name: 'not-found', params: { pathMatch: to.path.slice(1).split('/') } });
  }

  return entries;
});
