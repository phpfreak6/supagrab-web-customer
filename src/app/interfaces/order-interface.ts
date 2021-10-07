export interface OrderInterface {
	customer_id: string,
	sub_total: number,
	shipping_charge: number,
	tax_percentage: number,
	tax_amount: number,
	coupon_applied: false,
	coupon_code: string,
	coupon_discount_percent: string,
	coupon_discount_amount: number,
	grand_total: number,
	status: string,
	created_at: Date,
	updated_at: Date,
	deleted_at: string,
	_id: string,
	address: {
		first_name: string,
		last_name: string,
		phone: string,
		email: string,
		address: string,
		city: string,
		state: string,
		country: string,
		pincode: number,
		created_at: Date,
		updated_at: Date,
		deleted_at: string,
		_id: string
	},
	products: [{
		user_id: string,
		product_id: string,
		product_detail: {
			department_id: string,
			category_id: string,
			product_price: number,
			ratings_avg: string,
			ratings_cnt: string,
			status: string,
			deletedAt: string,
			createdAt: Date,
			updatedAt: Date,
			_id: string,
			product_title: string,
			product_slug: string,
			attributes: [],
			reviews: [],
			ratings: [],
			images: [],
			__v: number
		},
		product_price: number,
		qty: number,
		status: string,
		created_at: Date,
		updated_at: Date,
		deleted_at: Date,
		_id: string
	}],
	customer_details: {
		customer_id: string,
		first_name: string,
		last_name: string,
		email: string,
		profilePic: string,
		contact_number: string,
		gender: string,
		_id: string
	},
	__v: number,
	payment: {
		razorpay_order_id: string,
		razorpay_payment_id: string,
		razorpay_signature: string,
		razorpay_options: {
			key: string,
			amount: number,
			currency: string,
			name: string,
			description: string,
			image: string,
			order_id: string,
			prefill: {
				name: string,
				email: string,
				contact: string
			},
			notes: {
				address: string
			},
			theme: {
				color: string
			},
			modal: {
				escape: false
			},
			response: {
				razorpay_payment_id: string,
				razorpay_order_id: string,
				razorpay_signature: string,
				org_logo: string,
				org_name: string,
				checkout_logo: string,
				custom_branding: boolean
			}
		},
		razorpay_response: {
			razorpay_payment_id: string,
			razorpay_order_id: string,
			razorpay_signature: string,
			org_logo: string,
			org_name: string,
			checkout_logo: string,
			custom_branding: false
		},
		payment_document: {
			id: string,
			entity: string,
			amount: number,
			currency: string,
			status: string,
			order_id: string,
			invoice_id: string,
			international: boolean,
			method: string,
			amount_refunded: number,
			refund_status: string,
			captured: boolean,
			description: string,
			card_id: string,
			bank: string,
			wallet: string,
			vpa: string,
			email: string,
			contact: string,
			notes: {
				address: string
			},
			fee: number,
			tax: number,
			error_code: string,
			error_description: string,
			error_source: string,
			error_step: string,
			error_reason: string,
			acquirer_data: {
				auth_code: number
			},
			created_at: number
		},
		transaction_id: string,
		payment_mode: string,
		amount: number,
		currency: string,
		order_id: string,
		transaction_status: string,
		created_at: Date,
		updated_at: Date,
		deleted_at: Date,
		_id: string
	}
}
