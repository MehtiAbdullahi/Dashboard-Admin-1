function getVisiblePages(currentPage, totalPages, maxVisiblePages) {
  const pagesCount = Math.min(totalPages, maxVisiblePages);

  let startPage = currentPage - Math.floor(pagesCount / 2);

  startPage = Math.max(1, startPage);

  let endPage = startPage + pagesCount - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pagesCount + 1);
  }

  const pages = [];

  for (let page = startPage; page <= endPage; page++) {
    pages.push(page);
  }

  return pages;
}

export default getVisiblePages;
