import { defineBasicLoader } from 'vue-router/experimental';

import dataJSON from '@data/data_normalized.json';
import type { MouserChiefMap } from '../types/index';

export const useMouserChiefs = defineBasicLoader(async (): Promise<MouserChiefMap> => dataJSON);
