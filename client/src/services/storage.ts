class Storage {
	set = (key: string, data: any): void => {
		localStorage.setItem(key, JSON.stringify(data));
	};

	get = (key: string): any => {
		try {
			return JSON.parse(localStorage.getItem(key as string) ?? "null");
		} catch (err) {
			return null;
		}
	};

	remove = (key: any): void => {
		localStorage.removeItem(key);
	};

	removeMultiple = (keys: string[]) => {
		keys.forEach((key) => localStorage.removeItem(key));
	};

	clear = (): void => {
		localStorage.clear();
	};
}

export default new Storage();
