import React from 'react';
import './header.scss';
import {LOCALES, TLanguage} from '../../i18n/locale';
import {translate} from '../../i18n/translate';
import {useDispatch, useSelector} from 'react-redux';
import {updateLanguage} from '../../store/reducers/i18n/i18n.action';
import {IStore} from '../../store/store';

const HeaderComponent = () => {
	const listOfLocales: Array<string> = Object.values(LOCALES);
	const i18 = useSelector((store: IStore) => store.i18nReducer);
	const selectedValue = i18.selectedLanguage;
	const dispatch = useDispatch();
	const changeLanguageHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		const langShort = event.target.value as TLanguage;
		dispatch(updateLanguage(langShort));
	}
	return (
		<header className='header__component navbar navbar-expand-md'>
			<div className='container'>
				<img className='navbar-brand' src='https://uploads-ssl.webflow.com/615f40af7a135839ad16cf09/615f40af7a1358d94716cf4e_logo2.svg' alt='centime-logo'/>
				<div className='d-flex'>
					<span data-testid='language-label'>{translate('Change Language')}: </span>
					<select data-testid='change-language' id='changeLanguage' className='form-control' value={selectedValue} onChange={event => changeLanguageHandler(event)}>
						{listOfLocales.map(lang => <option key={lang} value={lang}>{lang}</option>)}
					</select>
				</div>
			</div>
		</header>
	);
};

export default HeaderComponent;
