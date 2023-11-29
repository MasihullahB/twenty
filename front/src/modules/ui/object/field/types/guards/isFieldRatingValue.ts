import { z } from 'zod';

import { FieldRatingValue } from '../FieldMetadata';

export const isFieldRatingValue = (
  fieldValue: unknown,
): fieldValue is FieldRatingValue =>
  z.number().min(0).max(1).safeParse(fieldValue).success;
