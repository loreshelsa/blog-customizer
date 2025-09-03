import { CSSProperties, useState } from 'react';
import styles from './styles/index.module.scss';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import clsx from 'clsx';

export const App = () => {
	const [config, setConfig] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': config.fontFamilyOption.value,
					'--font-size': config.fontSizeOption.value,
					'--font-color': config.fontColor.value,
					'--container-width': config.contentWidth.value,
					'--bg-color': config.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={setConfig} />
			<Article />
		</main>
	);
};
