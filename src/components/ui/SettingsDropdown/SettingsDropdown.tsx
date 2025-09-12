'use client'

import React from 'react'
import { ChevronRightIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import {
	Typography,
	TypographyVariant,
	TypographyWeight,
	TypographyTextColor,
	TypographyFontFamily,
	useSettingsDropdown
} from '@/components/ui'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'

export const SettingsDropdown = () => {
	const t = useTranslations()
	const {
		dropdownRef,
		isOpen,
		handleOpen,
		resolvedTheme,
		activeSubmenu,
		handleBackClick,
		handleOptionClick,
		handleSubOptionClick,
		settingsOptions,
		getSubmenuValueActive,
		getSubMenuOptions
	} = useSettingsDropdown()

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={handleOpen}
				className={cn(
					'flex h-10 w-10 cursor-pointer items-center justify-center',
					'rounded-lg border border-white/20 bg-white/10',
					'backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-white/20'
				)}
				aria-label={t('common.settings')}
			>
				<Cog6ToothIcon className="h-5 w-5 text-white" />
			</button>

			{isOpen && (
				<div
					className={cn(
						'absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-lg border shadow-xl',
						{
							'border-gray-700 bg-gray-800': resolvedTheme === 'dark',
							'border-gray-200 bg-white': resolvedTheme === 'light'
						}
					)}
				>
					{activeSubmenu ? (
						<div className="py-2">
							<button
								onClick={handleBackClick}
								className={cn(
									'flex w-full cursor-pointer items-center space-x-3 px-4 py-3 transition-colors duration-200',
									{
										'hover:bg-gray-700': resolvedTheme === 'dark',
										'hover:bg-gray-50': resolvedTheme === 'light'
									}
								)}
							>
								<ChevronRightIcon
									className={cn(
										'h-4 w-4 rotate-180',
										resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
									)}
								/>
								<Typography
									variant={TypographyVariant.SPAN}
									weight={TypographyWeight.MEDIUM}
									textColor={TypographyTextColor.SECONDARY}
									fontFamily={TypographyFontFamily.CAIRO}
								>
									{t('common.back')}
								</Typography>
							</button>

							<div
								className={cn(
									'border-t pt-2',
									resolvedTheme === 'dark'
										? 'border-gray-700'
										: 'border-gray-200'
								)}
							>
								{activeSubmenu &&
									getSubMenuOptions(activeSubmenu).map(option => {
										const isActive =
											getSubmenuValueActive(activeSubmenu) === option.value
										return (
											<button
												key={option.value}
												onClick={() =>
													handleSubOptionClick('language', option.value)
												}
												className={cn(
													'flex w-full items-center space-x-3 px-4 py-3 transition-colors duration-200',
													'cursor-pointer',
													{
														'bg-blue-900/20':
															isActive && resolvedTheme === 'dark'
													},
													{
														'bg-blue-50': isActive && resolvedTheme === 'light'
													},
													{
														'hover:bg-gray-700': resolvedTheme === 'dark'
													},
													{
														'hover:bg-gray-50': resolvedTheme === 'light'
													}
												)}
											>
												<span className="text-lg">{option.emoji}</span>
												<Typography
													variant={TypographyVariant.SPAN}
													weight={TypographyWeight.NORMAL}
													textColor={
														isActive
															? TypographyTextColor.PRIMARY
															: TypographyTextColor.SECONDARY
													}
													fontFamily={TypographyFontFamily.CAIRO}
												>
													{option.label}
												</Typography>
												{isActive && (
													<div className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
												)}
											</button>
										)
									})}
							</div>
						</div>
					) : (
						<div className="py-2">
							{settingsOptions.map(option => (
								<button
									key={option.id}
									onClick={() => handleOptionClick(option.id)}
									className={cn(
										'flex w-full cursor-pointer items-center justify-between px-4 py-3 transition-colors duration-200',
										{
											'hover:bg-gray-700': resolvedTheme === 'dark',
											'hover:bg-gray-50': resolvedTheme === 'light'
										}
									)}
								>
									<div className="flex items-center space-x-3">
										<span className="text-lg">{option.emoji}</span>
										<Typography
											variant={TypographyVariant.SPAN}
											weight={TypographyWeight.NORMAL}
											textColor={TypographyTextColor.PRIMARY}
											fontFamily={TypographyFontFamily.CAIRO}
										>
											{option.label}
										</Typography>
									</div>
									<div className="flex items-center space-x-2">
										<Typography
											variant={TypographyVariant.SMALL}
											weight={TypographyWeight.NORMAL}
											textColor={TypographyTextColor.MUTED}
											fontFamily={TypographyFontFamily.CAIRO}
										>
											{option.currentValue}
										</Typography>
										<ChevronRightIcon
											className={cn('h-4 w-4', {
												'text-gray-500': resolvedTheme === 'dark',
												'text-gray-400': resolvedTheme === 'light'
											})}
										/>
									</div>
								</button>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	)
}
