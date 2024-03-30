import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
   
  import type { MultiFileRouter, OurFileRouter } from "@/app/api/uploadthing/core";
   
  export const UploadButton = generateUploadButton<OurFileRouter>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
  export const UploadMultiButton = generateUploadButton<MultiFileRouter>({url:`/api/uploadthing-multi`});
  export const UploadMultiDropzone = generateUploadDropzone<MultiFileRouter>({url:`/api/uploadthing-multi`});