export const getStatusColor = (status: string) => {
	switch (status) {
		case 'LAUNCHED':
			return 'bg-green-500/20 text-green-500';
		case 'SUCCESS':
			return 'bg-green-500/20 text-green-500';
		case 'FAILED':
			return 'bg-red-500/20 text-red-500';
		case 'PENDING':
			return 'bg-yellow-500/20 text-yellow-500';
		default:
			return 'bg-gray-500/20 text-gray-500';
	}
}