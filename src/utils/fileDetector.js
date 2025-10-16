export const getFileTypeFromUrl = (url) => {
  const extension = url.split('.').pop().split('?')[0].toLowerCase();
  if (extension === 'pdf') {
    return 'pdf';
  } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
    return 'image';
  } else if (['doc', 'docx'].includes(extension)) {
    return 'docx';
  } else if (['xls', 'xlsx'].includes(extension)) {
    return 'excel';
  }
  return 'unsupported';
};