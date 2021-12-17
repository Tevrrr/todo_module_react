/** @format */

import React, { useState} from 'react';

const useFeatch = (callback) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const featching = async () => {
		try {
			setIsLoading(true);
			await callback();
		} catch (e) {
			setError(e.message);
		} finally {
			setIsLoading(false);
		}
	};
	return [featching, isLoading, error];
};

export default useFeatch;
