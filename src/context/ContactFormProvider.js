import { createContext, useContext, useState } from 'react';

const ContactFormikContext = createContext(null);
//THe display name for React Dev tools
ContactFormikContext.displayName = 'ContactFormikProvider';

export default function ContactFormProvider({ children }) {
	return (
		<ContactFormikContext.Provider value={null}>
			{children}
		</ContactFormikContext.Provider>
	);
}
