import { Button } from '@/shared/components/shadcnui/ui/button';
import React, { ChangeEvent } from 'react';

export const UploadBankStatement = ({
  id,
  onFileChange,
}: {
  id: string;
  onFileChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const fileUploadRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Button variant={'secondary'} onClick={() => fileUploadRef.current?.click()}>
        <svg
          className="!size-6"
          viewBox="0 0 24 24"
          fill="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="m14.335 3.652 1.944-1.434a9.955 9.955 0 0 0-5.78-2.206L10.466.01a9.956 9.956 0 0 0-.464-.01H10a9.972 9.972 0 0 0-6.845 2.709A9.973 9.973 0 0 0 0 10a9.973 9.973 0 0 0 2.586 6.708A9.972 9.972 0 0 0 10 20.002v-.002a9.965 9.965 0 0 0 6.708-2.586A9.973 9.973 0 0 0 20 9.999c.002-.6-.05-1.2-.156-1.792L17.69 9.793v.205a7.67 7.67 0 0 1-2.255 5.437 5.602 5.602 0 0 1-.278.263 7.668 7.668 0 0 1-5.156 1.992c-.13 0-.257 0-.385-.01v.002a7.676 7.676 0 0 1-5.053-2.247l.002-.002A7.664 7.664 0 0 1 2.31 10m0-.019a7.671 7.671 0 0 1 2.254-5.417l.001.002a7.662 7.662 0 0 1 5.432-2.256 7.651 7.651 0 0 1 .387.01 7.65 7.65 0 0 1 3.95 1.333m4.776 2.221a10.031 10.031 0 0 0-1.198-1.988l-7.91 5.832-3.807-2.386v2.87L10 12.589l9.11-6.715z"
            fill="#4D9D46"
          ></path>
        </svg>
        Загрузить выписку из Сбербанка
      </Button>

      <input
        tabIndex={-1}
        ref={fileUploadRef}
        type="file"
        id={id}
        onChange={onFileChange}
        accept=".pdf"
        className="absolute top-0 left-0 opacity-0"
      />
    </>
  );
};
