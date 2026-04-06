/**
 * Re-export canonical types from @sahabah/shared-types so that all existing
 * client imports (`from '../types'`, `from '@/types'`) keep working without
 * modification while types are now defined in one place.
 *
 * To add client-only types that don't belong in shared-types, add them below
 * the re-export block.
 */
export type {
  Companion,
  CompanionCategory,
  RelType,
  ConversionEra,
  Language,
  SortField,
  FilterState,
  CompareState,
  RadarMetric,
  ConnectionEdge,
  InsightDataPoint,
  CompanionsApiResponse,
} from '@sahabah/shared-types';
