export const canvas2webp = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob != null ? resolve(blob) : reject(null)),
      "image/webp",
      0.9
    );
  });
};
