/** @format */

import { useMemo } from 'react';

const useSortedLines = (lines, sort) => {
	const sortedLines = useMemo(() => {
		return [...lines].sort((a, b) => {
			if (typeof a[sort] == 'string')
				return a[sort].localeCompare(b[sort]);
			else if (typeof a[sort] == 'boolean') {
				if (!a[sort] && b[sort]) return -1;
			} else {
				if (a[sort] < b[sort]) return -1;
				else if (a[sort] > b[sort]) return 1;
				else return 0;
			}
		});
	}, [lines, sort]);

	return sortedLines;
};

const useLines = (lines, sort, query, startIndex, endIndex) => {
	const sortedLines = useSortedLines(lines, sort);
	const sortedAndSearchedTodoList = useMemo(() => {
		return sortedLines.filter((item, i) => {
			if (i >= startIndex && i < endIndex) {
				if (!query) return item;
				else if (item.title.toLowerCase().includes(query.toLowerCase()))
					return item;
			}
		});
	}, [lines, sortedLines, query, startIndex]);

	return sortedAndSearchedTodoList;
};

export { useLines, useSortedLines };
