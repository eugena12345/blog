export const sanitizeContent = (html) => {
  // Создаем временный DOM-элемент для анализа HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Рекурсивно обходим все дочерние элементы и собираем текст
  function extractTextWithLineBreaks(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // Удаляем &nbsp; и заменяем их на обычные пробелы
      return node.textContent.replace(/&nbsp;/g, ' ').trim();
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'BR') {
        return '\n'; // Заменяем <br> на перенос строки
      }
      if (node.tagName === 'DIV' || node.tagName === 'P') {
        // Для блочных элементов добавляем перенос строки после содержимого
        return (
          Array.from(node.childNodes).map(extractTextWithLineBreaks).join('') +
          '\n'
        );
      }
      // Для остальных элементов рекурсивно обрабатываем их содержимое
      return Array.from(node.childNodes)
        .map(extractTextWithLineBreaks)
        .join('');
    }
    return '';
  }

  // Извлекаем текст с учетом переносов строк
  return extractTextWithLineBreaks(tempDiv).trim();
}
