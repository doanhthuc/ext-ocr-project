import { Avatar, Button, UploadProps } from 'antd';

import { Upload } from '~shared/components/upload/Upload';
import { useMergeState } from '~shared/hooks/useMergeState';
import { toBase64 } from '~shared/utils/file.util';

type UploadAvatarProps = {
  value?: string;
  onChange?: (value?: string) => void;
};

export function UploadAvatar({
  value: outerValue,
  onChange,
}: UploadAvatarProps) {
  const [value, setValue] = useMergeState({ value: outerValue });

  const handleCustomRequest: UploadProps['customRequest'] = async ({
    file,
  }) => {
    const base64 = await toBase64(file);
    setValue(base64);
    onChange?.(base64);
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar size={64} src={value} />
      <Upload
        showUploadList={false}
        customRequest={handleCustomRequest}
        allowExts={['jpg', 'jpeg', 'png']}
      >
        <Button size="small">Upload</Button>
      </Upload>
    </div>
  );
}
