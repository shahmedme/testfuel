import Beta from "components/Beta";

export default function withBeta(component: any, isBeta: boolean, config: any) {
	return isBeta ? <Beta key={config.key}>{component}</Beta> : component;
}
