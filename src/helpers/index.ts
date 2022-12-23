import {toast} from "react-toastify";
export const fileToBase64 = (file: File | Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
     resolve(reader.result as string);
    };

    reader.readAsDataURL(file);
    reader.onerror = reject;
  });