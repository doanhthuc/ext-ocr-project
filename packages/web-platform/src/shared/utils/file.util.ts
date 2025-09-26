export function getFileExt(fileName: string) {
  const trailingFileName = fileName.trim();

  const lastDotIndex = trailingFileName.lastIndexOf('.');

  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return null;
  }

  return trailingFileName.slice(lastDotIndex + 1).toLowerCase() || null;
}

export function isValidFileExt(
  fileName: string,
  allowedExts: Array<string> | '*'
) {
  const ext = getFileExt(fileName);

  if (allowedExts === '*') {
    return true;
  }

  if (!ext) {
    return false;
  }

  return allowedExts.includes(ext);
}

export function formatBytes(bytes = 0, decimals = 2) {
  if (bytes == 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function toBase64(file: Blob | string | File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };

    reader.onerror = error => {
      reject(error);
    };

    if (typeof file === 'string') {
      // Convert string to Blob
      const blob = new Blob([file], { type: 'text/plain' });
      reader.readAsDataURL(blob);
    } else {
      reader.readAsDataURL(file);
    }
  });
}
