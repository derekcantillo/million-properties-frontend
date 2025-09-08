/**
 * Formats a number as a property price with K (thousands) and M (millions) notation
 * @param value - The number to format
 * @returns Formatted string (e.g., "$1.5M" for 1500000)
 */
export const formatPropertyPrice = (value: number): string => {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		notation: 'standard',
		maximumFractionDigits: 1
	})

	if (value >= 1000000) {
		return formatter.format(value / 1000000).replace('$', '$') + 'M'
	}
	if (value >= 1000) {
		return formatter.format(value / 1000).replace('$', '$') + 'K'
	}
	return formatter.format(value)
}
