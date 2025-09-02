import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onSubmit: (config: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onSubmit }: ArticleParamsFormProps) => {
	const [stateButtonType, setStateButtonType] = useState<boolean>(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const ref = useRef<HTMLElement>(null);

	function handleClickOutside(e: Event) {
		if (ref.current && ref.current.contains(e.target as HTMLElement)) {
			return;
		} else {
			setStateButtonType(false);
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	function handleClick() {
		setStateButtonType(!stateButtonType);
	}
	function handleFontChange(option: OptionType) {
		setArticleState({ ...articleState, fontFamilyOption: option });
	}
	function handleRadioChange(option: OptionType) {
		setArticleState({ ...articleState, fontSizeOption: option });
	}
	function handleFontColorChange(option: OptionType) {
		setArticleState({ ...articleState, fontColor: option });
	}
	function handleBackgroundColorChange(option: OptionType) {
		setArticleState({ ...articleState, backgroundColor: option });
	}
	function handleContentWidthChange(option: OptionType) {
		setArticleState({ ...articleState, contentWidth: option });
	}
	function handleReset() {
		setArticleState(defaultArticleState);
		onSubmit(defaultArticleState);
	}
	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		onSubmit(articleState);
	}

	return (
		<>
			<ArrowButton isOpen={stateButtonType} onClick={handleClick} />
			<aside
				ref={ref}
				className={clsx(styles.container, {
					[styles.container_open]: stateButtonType,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} as={'h2'} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						onChange={handleFontChange}
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						placeholder='Выбирете шрифт'
					/>
					<RadioGroup
						onChange={handleRadioChange}
						name={'fontSize'}
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						title='Размер шрифта'
					/>
					<Select
						onChange={handleFontColorChange}
						selected={articleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						placeholder='Выбирете цвет шрифта'
					/>
					<Separator />
					<Select
						onChange={handleBackgroundColorChange}
						selected={articleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						placeholder='Выбирете цвет фона'
					/>
					<Select
						onChange={handleContentWidthChange}
						selected={articleState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						placeholder='Выбирете ширину контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
