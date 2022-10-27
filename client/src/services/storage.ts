class Storage {
	TF_TEMP_DATA = "temp";
	TF_APP_CONFIG = "app";

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

	getAppConfig = (...keys: string[]): any => {
		const appConfig = this.get(this.TF_APP_CONFIG);

		if (keys.length === 1) {
			return appConfig?.[keys[0]];
		} else if (keys.length > 1) {
			return keys.map((key: string) => appConfig?.[key]);
		}

		return this.get(this.TF_APP_CONFIG) ?? {};
	};

	setAppConfig = (data: any) => {
		let tempData = this.get(this.TF_APP_CONFIG) ?? {};
		this.set(this.TF_APP_CONFIG, { ...tempData, ...data });
	};

	updateAppConfig = (data: any): void => {
		let tempData = this.get(this.TF_APP_CONFIG) ?? {};
		this.set(this.TF_APP_CONFIG, { ...tempData, ...data });
	};

	getTempData = (): any => {
		return this.get(this.TF_TEMP_DATA) ?? {};
	};

	setTempData = (data: any) => {
		let tempData = this.get(this.TF_TEMP_DATA) ?? {};
		this.set(this.TF_TEMP_DATA, { ...tempData, ...data });
	};

	removeTempData = (key?: string) => {
		if (key) {
			let tempData = this.get(this.TF_TEMP_DATA) ?? {};
			delete tempData[key];
			this.set(this.TF_TEMP_DATA, tempData);
		} else {
			this.remove(this.TF_TEMP_DATA);
		}
	};
}

export default new Storage();
