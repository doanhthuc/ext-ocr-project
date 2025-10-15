import { Button, Select } from 'antd';
import { useState } from 'react';

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

export type KeyValueFieldListProps = {
  /** Array of field data to display */
  fields?: Array<FieldData>;
  /** Current selected template */
  selectedTemplate?: string;
  /** Available templates for the dropdown */
  templates?: Array<{ value: string; label: string }>;
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
};

export function KeyValueFieldList({
  fields = [],
  selectedTemplate = 'Template Bill Restaurant',
  templates = [],
  onAddField,
  onTemplateChange,
  onEditField,
  onDeleteField,
  onFieldChange,
  className,
}: KeyValueFieldListProps) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [editingFieldLabel, setEditingFieldLabel] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingFieldId, setDeletingFieldId] = useState<string | null>(null);

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setEditingFieldId(null);
    setEditingFieldLabel('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (fieldId: string) => {
    const field = fields.find(f => f.id === fieldId);
    if (field) {
      setModalMode('edit');
      setEditingFieldId(fieldId);
      setEditingFieldLabel(field.label);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFieldId(null);
    setEditingFieldLabel('');
  };

  const handleConfirmModal = (labelName: string) => {
    if (modalMode === 'create') {
      onAddField?.(labelName);
    } else if (modalMode === 'edit' && editingFieldId) {
      onEditField?.(editingFieldId, labelName);
    }
    handleCloseModal();
  };

  const handleOpenDeleteModal = (fieldId: string) => {
    setDeletingFieldId(fieldId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingFieldId(null);
  };

  const handleConfirmDelete = () => {
    if (deletingFieldId) {
      onDeleteField?.(deletingFieldId);
    }
    handleCloseDeleteModal();
  };

  const deletingField = fields.find(f => f.id === deletingFieldId);

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
      {fields.map(field => (
        <LabeledInputField
          key={field.id}
          label={field.label}
          value={field.value}
          placeholder="-"
          onEdit={() => handleOpenEditModal(field.id)}
          onDelete={() => handleOpenDeleteModal(field.id)}
          onChange={e => onFieldChange?.(field.id, e.target.value)}
        />
      ))}

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
