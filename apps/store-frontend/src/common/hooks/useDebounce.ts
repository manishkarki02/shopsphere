import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);
	return debouncedValue;
}

type SomeFunction = (...args: string[]) => string | void;
type Timer = ReturnType<typeof setTimeout>;

export function useDebounceLegacy<Func extends SomeFunction>(
	func: Func,

	delay: number,
) {
	const [timer, setTimer] = useState<Timer>();

	const debouncedFunction = ((...args) => {
		const newTimer = setTimeout(() => {
			func(...args);
		}, delay);

		clearTimeout(timer);

		setTimer(newTimer);
	}) as Func;

	return debouncedFunction;
}
