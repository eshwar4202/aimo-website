interface HighlightedTextProps {
  text: string;
  tag: string;
  className?: string;
  color?: string;
}

export default function HighlightedText({
  text,
  tag,
  className,
  color,
}: HighlightedTextProps) {
  const tempText = text.split(" ");
  let result = [];

  const Tag = tag || 'span'; // Default to 'span' if no tag is provided

  tempText.forEach((word: string, index: number) => {
    if (word.includes("[")) {
      // Extract highlighted text
      const highlight = word.replace("[", "").replace("]", "");
      result.push(
        <span
          key={index}
          className={`${color ? color : ""} ${className ? className : ""}`}
        >
          {highlight}
        </span>
      );
    } else {
      result.push(<>{word} </>);
    }
  });

  return <Tag className={className}>{result}</Tag>;
}

