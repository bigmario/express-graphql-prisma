export function buildFilters(search: string, columns: string[]) {
  const filterList = search.split(' ');
  const filtersBuilt = [];

  for (const column of columns) {
    for (const filter of filterList) {
      filtersBuilt.push({
        [column]: { contains: filter },
      });
    }
  }

  return filtersBuilt;
}

export function buildIDFilters(search: string, columns: string[]) {
  const filterList = search.split(',');
  const filtersBuilt = [];

  for (const column of columns) {
    for (const filter of filterList) {
      filtersBuilt.push({
        [column]: parseInt(filter),
      });
    }
  }

  return filtersBuilt;
}
