import pdfToText from 'react-pdftotext';

export default function BanksDashboardPage() {
  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const file = files[0];
    pdfToText(file)
      .then((text) => console.log(text))
      .catch((error) => console.error('Failed to extract text from pdf'));
  };

  return (
    <div className="max-w-screen-lg mx-auto w-full py-8 flex flex-col gap-4">
      <input
        tabIndex={-1}
        type="file"
        onChange={onFileChange}
        accept=".pdf"
        className="absolute top-0 left-0 opacity-0"
      />
    </div>
  );
}
