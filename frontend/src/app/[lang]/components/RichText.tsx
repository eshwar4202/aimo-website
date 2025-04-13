import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    body?: string;
    content?: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  // Use 'content' if it exists, otherwise fall back to 'body'
  const textToRender = data.content || data.body;

  return (
    <section className="rich-text py-6 dark:bg-black dark:text-gray-50">
      {textToRender && (
        <Markdown children={textToRender} remarkPlugins={[remarkGfm]} />
      )}
    </section>
  );
}

