export const canvas2webp = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob != null ? resolve(blob) : reject(null)), 'image/webp', 0.9);
  });
};

export const file2img = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) =>
      e.target != null && typeof e.target.result === 'string'
        ? resolve(e.target.result)
        : reject('onload error');
  });
};

export const file2optiFile = (
  file: File,
  wide: number,
  quality: number,
  format: 'webp' | 'jpg' | 'png',
): Promise<File> => {
  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async (e) => {
      if (e.target != null && typeof e.target.result === 'string') {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const el = document.createElement('canvas');
          if (img.width >= img.height) {
            if (img.width > wide) {
              el.width = wide;
              el.height = img.height * (wide / img.width);
            } else {
              el.width = img.width;
              el.height = img.height;
            }
          } else {
            if (img.height > wide) {
              el.height = wide;
              el.width = img.width * (wide / img.height);
            } else {
              el.width = img.width;
              el.height = img.height;
            }
          }
          const ctx = el.getContext('2d');
          if (ctx != null) {
            ctx.drawImage(img, 0, 0, el.width, el.height);
            ctx.canvas.toBlob(
              (blob) => {
                if (blob != null) {
                  const res = new File([blob], file.name.replace(/\.[^.]+$/, ''), {
                    lastModified: Date.now(),
                    type: `image/${format}`,
                  });
                  resolve(res);
                } else {
                  reject({ message: 'blob error' });
                }
              },
              `image/${format}`,
              quality,
            );
          } else {
            reject({ message: 'ctx error' });
          }
        };
        img.onerror = () => reject({ message: 'image error' });
      } else {
        reject({ message: 'file read error' });
      }
    };
    reader.onerror = () => reject({ message: 'file read error' });
  });
};

export const file2optiDataurl = (
  file: File,
  wide: number,
  quality: number,
  format: 'webp' | 'jpg' | 'png',
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async (e) => {
      if (e.target != null && typeof e.target.result === 'string') {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const el = document.createElement('canvas');

          if (img.width >= img.height) {
            if (img.width > wide) {
              el.width = wide;
              el.height = img.height * (wide / img.width);
            } else {
              el.width = img.width;
              el.height = img.height;
            }
          } else {
            if (img.height > wide) {
              el.height = wide;
              el.width = img.width * (wide / img.height);
            } else {
              el.width = img.width;
              el.height = img.height;
            }
          }
          const ctx = el.getContext('2d');
          if (ctx != null) {
            ctx.drawImage(img, 0, 0, el.width, el.height);
            resolve(ctx.canvas.toDataURL(`image/${format}`, quality));
          } else {
            reject({ message: 'ctx error' });
          }
        };
        img.onerror = () => reject({ message: 'image error' });
      } else {
        reject({ message: 'file read error' });
      }
    };
    reader.onerror = () => reject({ message: 'file read error' });
  });
};
