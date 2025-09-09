/**
 * Formats a number as a currency with full dollar notation (commas and decimals)
 * @param value - The number to format
 * @returns Formatted string (e.g., "$1,234,567.89" for 1234567.89)
 */
export const formatCurrency = (value: number): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(value)
}

/**
 * Formats a number as a currency with decimals when needed
 * @param value - The number to format
 * @param showDecimals - Whether to show decimal places (default: false)
 * @returns Formatted string (e.g., "$1,234,567.89" or "$1,234,567")
 */
export const formatCurrencyDetailed = (
	value: number,
	showDecimals: boolean = false
): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: showDecimals ? 2 : 0,
		maximumFractionDigits: showDecimals ? 2 : 0
	}).format(value)
}

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

/**
 * Formats a number with commas as thousands separator (no currency symbol)
 * @param value - The number to format
 * @returns Formatted string (e.g., "1,234,567" for 1234567)
 */
export const formatNumber = (value: number): string => {
	return new Intl.NumberFormat('en-US').format(value)
}
