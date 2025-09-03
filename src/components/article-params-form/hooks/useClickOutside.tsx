import { RefObject, useEffect } from 'react';

export const useClickOutside = (
	ref: RefObject<HTMLElement>,
	handleOnClickOutside: (event: MouseEvent | TouchEvent) => void
) => {
	useEffect(() => {
		const listener = (e: MouseEvent | TouchEvent) => {
			if (
				ref.current !== null &&
				ref.current.contains(e.target as HTMLElement)
			) {
				return;
			}
			handleOnClickOutside(e);
		};
		document.addEventListener('mousedown', listener);
		document.removeEventListener('touchstart', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handleOnClickOutside]);
};
