export const canvas2webp = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob != null ? resolve(blob) : reject(null)),
      "image/webp",
      0.9
    );
  });
};

export const file2img = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) =>
      e.target != null && typeof e.target.result === "string"
        ? resolve(e.target.result)
        : reject("onload error");
  });
};
