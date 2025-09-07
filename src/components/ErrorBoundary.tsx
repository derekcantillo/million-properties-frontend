'use client'

import React, { Component, type ReactNode } from 'react'

interface ErrorBoundaryState {
	hasError: boolean
	error?: Error
}

interface ErrorBoundaryProps {
	children: ReactNode
	fallback?: ReactNode
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error }
	}

	override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
		this.props.onError?.(error, errorInfo)
	}

	override render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}

			return (
				<div className="flex min-h-screen items-center justify-center bg-gray-50">
					<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
						<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
							<svg
								className="h-6 w-6 text-red-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
								/>
							</svg>
						</div>
						<div className="mt-4 text-center">
							<h3 className="text-lg font-medium text-gray-900">
								Something went wrong
							</h3>
							<p className="mt-2 text-sm text-gray-500">
								We're sorry, but something unexpected happened. Please try
								refreshing the page.
							</p>
							<div className="mt-6">
								<button
									onClick={() => window.location.reload()}
									className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
								>
									Refresh page
								</button>
							</div>
						</div>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}
