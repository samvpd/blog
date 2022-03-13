export interface IData {
	fields: {
		title: string
		text: string
		date: string
		id: number
	}
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
	metadata: {
		tags: []
	}
}

export interface ISinglePost {
	title: string
	text: string
	date: string
	id: number
}
