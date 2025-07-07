export const sanitizeContent = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  function extractTextWithLineBreaks(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent.replace(/&nbsp;/g, ' ').trim();
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'BR') {
        return '\n'; 
      }
      if (node.tagName === 'DIV' || node.tagName === 'P') {
        return (
          Array.from(node.childNodes).map(extractTextWithLineBreaks).join('') +
          '\n'
        );
      }
      return Array.from(node.childNodes)
        .map(extractTextWithLineBreaks)
        .join('');
    }
    return '';
  }

  return extractTextWithLineBreaks(tempDiv).trim();
}
