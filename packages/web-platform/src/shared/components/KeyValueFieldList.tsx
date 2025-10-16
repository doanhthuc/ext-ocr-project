import type { Control, FieldValues } from 'react-hook-form';

import { Button, Select } from 'antd';
import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';

import type { KeyValueFieldListFormData } from '~shared/schemas';

import { IconArrowDown01Sharp, IconPlusSign } from '~icons';
import { useTranslation } from '~shared/hooks/useTranslation';
import { cn } from '~shared/utils/cn.util';

import { DeleteConfirmModal } from './DeleteConfirmModal';
import { FieldModal } from './FieldModal';
import { LabeledInputField } from './LabeledInputField';

export type FieldData = {
  /** Unique identifier for the field */
  id: string;
  /** Label for the field */
  label: string;
  /** Value of the field */
  value: string;
};

export type KeyValueFieldListProps<
  TFieldValues extends FieldValues = KeyValueFieldListFormData,
> = {
  /** Array of field data to display (used when not using react-hook-form) */
  fields?: Array<FieldData>;
  /** Current selected template */
  selectedTemplate?: string;
  /** Available templates for the dropdown */
  templates?: Array<{ label: string; value: string }>;
  /** Callback when add new field button is clicked - receives the new label name */
  onAddField?: (labelName: string) => void;
  /** Callback when template is changed */
  onTemplateChange?: (template: string) => void;
  /** Callback when a field label is edited - receives field id and new label name */
  onEditField?: (fieldId: string, newLabelName: string) => void;
  /** Callback when a field is deleted */
  onDeleteField?: (fieldId: string) => void;
  /** Callback when a field value changes */
  onFieldChange?: (fieldId: string, value: string) => void;
  /** Additional class name for the container */
  className?: string;
  /** React Hook Form control object (optional) */
  control?: Control<TFieldValues>;
  /** Field name for the fields array in react-hook-form (default: 'fields') */
  fieldsName?: 'fields';
};

export function KeyValueFieldList<
  TFieldValues extends FieldValues = KeyValueFieldListFormData,
>({
  fields: propFields = [],
  selectedTemplate = 'Template Bill Restaurant',
  templates = [],
  onAddField,
  onTemplateChange,
  onEditField,
  onDeleteField,
  onFieldChange,
  className,
  control,
  fieldsName = 'fields',
}: KeyValueFieldListProps<TFieldValues>) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingFieldIndex, setEditingFieldIndex] = useState<number | null>(
    null
  );
  const [editingFieldLabel, setEditingFieldLabel] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingFieldIndex, setDeletingFieldIndex] = useState<number | null>(
    null
  );

  // Use react-hook-form's useFieldArray if control is provided
  const fieldArray = control
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useFieldArray({
        control,
        name: fieldsName as never,
      })
    : null;

  // Determine which fields to use (react-hook-form or prop-based)
  const fields = fieldArray?.fields ?? propFields;

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setEditingFieldIndex(null);
    setEditingFieldLabel('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (index: number) => {
    const field = fields[index] as FieldData;
    if (field) {
      setModalMode('edit');
      setEditingFieldIndex(index);
      setEditingFieldLabel(field.label);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFieldIndex(null);
    setEditingFieldLabel('');
  };

  const handleConfirmModal = (labelName: string) => {
    if (modalMode === 'create') {
      if (fieldArray) {
        // React Hook Form approach
        const newId = `field-${Date.now()}`;
        fieldArray.append({ id: newId, label: labelName, value: '' } as never);
      } else {
        // Traditional callback approach
        onAddField?.(labelName);
      }
    } else if (modalMode === 'edit' && editingFieldIndex !== null) {
      if (fieldArray) {
        // React Hook Form approach
        const field = fields[editingFieldIndex] as FieldData;
        fieldArray.update(editingFieldIndex, {
          ...field,
          label: labelName,
        } as never);
      } else {
        // Traditional callback approach
        const field = fields[editingFieldIndex] as FieldData;
        onEditField?.(field.id, labelName);
      }
    }
    handleCloseModal();
  };

  const handleOpenDeleteModal = (index: number) => {
    setDeletingFieldIndex(index);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingFieldIndex(null);
  };

  const handleConfirmDelete = () => {
    if (deletingFieldIndex !== null) {
      if (fieldArray) {
        // React Hook Form approach
        fieldArray.remove(deletingFieldIndex);
      } else {
        // Traditional callback approach
        const field = fields[deletingFieldIndex] as FieldData;
        onDeleteField?.(field.id);
      }
    }
    handleCloseDeleteModal();
  };

  const deletingField =
    deletingFieldIndex !== null
      ? (fields[deletingFieldIndex] as FieldData)
      : null;

  return (
    <div
      className={cn(
        'flex size-full flex-col gap-4 rounded-xl border border-border-light bg-white p-4',
        className
      )}
    >
      {/* Header with Action Buttons */}
      <div className="flex items-start gap-2.5">
        {/* Add New Field Button */}
        <Button
          type="default"
          onClick={handleOpenCreateModal}
          icon={<IconPlusSign className="size-5" />}
          className={cn(
            'rounded-4xl hover:bg-gray-4 hover:border-border-secondary hover:text-text-dark'
          )}
        >
          {t('ocr.field.addNew')}
        </Button>

        {/* Template Selector Dropdown */}
        <Select
          value={selectedTemplate}
          onChange={onTemplateChange}
          options={templates}
          suffixIcon={<IconArrowDown01Sharp className="size-5" />}
          className={cn(
            'min-w-[200px]',
            '[&_.ant-select-selector]:rounded-4xl [&_.ant-select-selector]:border-border-secondary'
          )}
        />
      </div>

      {/* Fields List */}
      {fields.map((field, index) => {
        const fieldData = field as FieldData;

        // React Hook Form approach
        if (control) {
          return (
            <LabeledInputField
              key={fieldData.id || `field-${index}`}
              label={fieldData.label}
              placeholder="-"
              control={control}
              name={`${fieldsName}.${index}.value` as never}
              onEdit={() => handleOpenEditModal(index)}
              onDelete={() => handleOpenDeleteModal(index)}
            />
          );
        }

        // Traditional callback approach
        return (
          <LabeledInputField
            key={fieldData.id}
            label={fieldData.label}
            value={fieldData.value}
            placeholder="-"
            onEdit={() => handleOpenEditModal(index)}
            onDelete={() => handleOpenDeleteModal(index)}
            onChange={e => onFieldChange?.(fieldData.id, e.target.value)}
          />
        );
      })}

      {/* Empty State */}
      {fields.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="font-archivo text-sm text-text-placeholder">
            No fields added yet. Click &quot;{t('ocr.field.addNew')}&quot; to
            get started.
          </p>
        </div>
      )}

      {/* Field Modal */}
      <FieldModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        mode={modalMode}
        initialValue={editingFieldLabel}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        itemName={deletingField?.label}
      />
    </div>
  );
}
