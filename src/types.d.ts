declare type Nullable<T> = T | null

interface IContentfulEntry {
	sys: {
		space: {
			type: string
			linkType: string
			id: string
		}
		id: string
		type: 'Entry'
		createdAt: string
		updatedAt: string
		environment: {
			sys: {
				id: string
				type: string
				linkType: string
			}
		}
		version: string
		revision: number
		contentType: {
			sys: {
				type: string
				linkType: string
				id: string
			}
		}
		locale: string
	}
}

interface IPostRaw extends IContentfulEntry {
	fields: {
		id: number
		title: string
		text: string
		date: string
	}
}

interface IEntryResponse<T extends IContentfulEntry> {
	sys: {
		type: string
	}
	total: number
	limit: number
	items: T[]
}

declare interface PostState {
	map: any
	// map: Record<string, IPostRaw>
	items: string[]
	loading: boolean
	error: Nullable<string>
	total: Nullable<number>
}

declare interface AppState {
	posts: PostState
	login: LoginState
}

declare namespace STORE {
	interface MyPayload1 {
		x: number
	}
}

declare interface LoginState {
	isAuthorized: boolean
	error: Nullable<string>
}

declare interface LoginPayload {
	login: string
	password: string
}
