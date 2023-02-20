import { useEffect, useState } from 'react';

export default function useSessionStorage(
	key,
	initialValue,
	deferSaving = 500
) {
	//set it to be the initial value
	const [value, setValue] = useState(() => {
		if (typeof window !== 'undefined') {
			//try to get value from session storage when useState is first called
			try {
				const valueFromSession = JSON.parse(
					window.sessionStorage.getItem(key)
				);
				//if the value from current session exists return it otherwise return the initial value
				return valueFromSession ?? initialValue;
			} catch (_) {
				//return the initial value if there is an error
				return initialValue;
			}
		} else {
			//if server-rendered Node.js, Deno or Bun environment return the initial value
			/* NOTE if initialValue is different from the one from localStorage there will be a Hydration mismatch warning since the value rendered on the server will be different from the one from localStorage, so fix it up by adding attribute suppressHydrationWarning   with a value of true to the parent of the  affected ReactDOM node, the content rendered on the server and that on the client(ie the Browser) are expected to differ
			 */
			return initialValue;
		}
	});
	/***
	 * 
	  save the value to session storage storage any time the value changes
	  it should always run in cases where we set the initial value
	  The initial value is first set on the server and there no value with the corresponding key in localStorage, when the page is first mounted, the initializer will run and see that the value in localStorage with the key is null, so set it just return the initial Value
	  If the value changed, the value will be set to sessionStorage
	  this effect will run on first render and when the value changes
	 */
	useEffect(() => {
		let timerId = window.setTimeout(() => {
			window.sessionStorage.setItem(key, JSON.stringify(value));
		}, deferSaving);

		//clean up the timer if the dep values changes or the component is unmounting, to stop the current timer with the given ID  from running
		return () => {
			window.clearTimeout(timerId);
		};
	}, [value, deferSaving, key]);

	return [value, setValue];
}