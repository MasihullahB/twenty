import { useContext } from 'react';
import { useRecoilState } from 'recoil';

import { FieldMetadataType } from '~/generated-metadata/graphql';

import { FieldContext } from '../../contexts/FieldContext';
import { entityFieldsFamilySelector } from '../../states/selectors/entityFieldsFamilySelector';
import { assertFieldMetadata } from '../../types/guards/assertFieldMetadata';
import { isFieldRating } from '../../types/guards/isFieldRating';

export const RATING_LEVELS_NB = 5;

export const useRatingField = () => {
  const { entityId, fieldDefinition, hotkeyScope } = useContext(FieldContext);

  assertFieldMetadata(
    FieldMetadataType.Probability,
    isFieldRating,
    fieldDefinition,
  );

  const fieldName = fieldDefinition.metadata.fieldName;

  const [fieldValue, setFieldValue] = useRecoilState<number | null>(
    entityFieldsFamilySelector({
      entityId: entityId,
      fieldName: fieldName,
    }),
  );

  const rating = Math.ceil((fieldValue ?? 0) * RATING_LEVELS_NB);

  return {
    fieldDefinition,
    rating,
    setFieldValue,
    hotkeyScope,
  };
};
