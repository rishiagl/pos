import { useCallback, useEffect, useState } from "react";

export const LimitedLetterTextarea = ({ rows, value, setValue, limit, placeholder, className }) => {
    const [{ content, letterCount }, setContent] = useState({
      content: value,
      letterCount: 0
    });
  
    const setFormattedContent = useCallback(
      text => {
        if (text.length > limit) {
          setContent({
            content: text.slice(0, limit),
            letterCount: limit
          });
        } else {
          setContent({ content: text, letterCount: text.length });
          setValue(text)
        }
      },
      [limit, setContent]
    );
  
    useEffect(() => {
      setFormattedContent(content);
    }, []);
  
    return (
      <>
        <textarea
          rows={rows}
          onChange={event => setFormattedContent(event.target.value)}
          value={content}
          placeholder={placeholder}
          className={className}
        />
      </>
    );
  };