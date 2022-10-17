import Beta from "components/Beta";

export default function withBeta(component: any, isBeta: boolean) {
	return isBeta ? <Beta>{component}</Beta> : component;
}
