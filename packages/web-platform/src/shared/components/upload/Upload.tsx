import { Upload as AntUpload, UploadProps as AntUploadProps } from 'antd';

import { useNotification } from '~shared/hooks/useNotification';
import { FileExt } from '~shared/types/file.type';
import { isValidFileExt } from '~shared/utils/file.util';

type UploadProps<T> = AntUploadProps<T> & {
  allowExts?: Array<FileExt> | '*';
  hideInvalidInList?: boolean;
};

export function Upload<T>({
  children,
  allowExts = '*',
  hideInvalidInList = false,
  beforeUpload,
  ...rest
}: UploadProps<T>) {
  const { showError } = useNotification();

  const handleBeforeUpload: AntUploadProps['beforeUpload'] = (file, files) => {
    const INVALID_VALUE = hideInvalidInList ? AntUpload.LIST_IGNORE : false;

    if (!isValidFileExt(file.name, allowExts)) {
      showError('File type not allowed');
      return INVALID_VALUE;
    }

    beforeUpload?.(file, files);
  };

  return (
    <AntUpload {...rest} beforeUpload={handleBeforeUpload}>
      {children}
    </AntUpload>
  );
}
