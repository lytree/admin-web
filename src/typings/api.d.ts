// 后端接口返回的数据类型

/** 后端返回的用户权益相关类型 */
declare namespace ApiAuth {
	/** 返回的token和刷新token */
	interface UserInfo {
		id: string;
		username: string;
		nickname?: string;
		userPhone?: string;
		userEmail?: string;
		userProfiles?: string;
		isRememberLogin?: boolean;
		token: string;
	}
}

/** 后端返回的路由相关类型 */
declare namespace ApiRoute {
	/** 后端返回的路由数据类型 */
	interface Route {
		/** 动态路由 */
		routes: AuthRoute.Route[];
		/** 路由首页对应的key */
		home: AuthRoute.RouteKey;
	}
}

declare namespace ApiDemo {
	interface DataWithAdapter {
		dataId: string;
		dataName: string;
	}
}
declare namespace PageInfo {
	interface Page<T> {
		content: T[];
		hasContent: boolean;
		hasNext: boolean;
		hasPrevious: boolean;
		isEmpty: boolean;
		isFirst: boolean;
		isLast: boolean;
		page: number;
		pages: number;
		rpp: number;
		total: number;
	}
}
