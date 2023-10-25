import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);



function Search() {

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounce = useDebounce(searchValue, 500)

    const inputRef = useRef();

    useEffect(() => {

        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounce)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchValue(res.data);
                setLoading(false);
            }).catch(() => {
                setLoading(false)
            })
    }, [debounce])

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false)

    }

    return (
        <HeadlessTippy
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>
                            Account
                        </h4>
                        {searchResult.map((result) =>
                        (<AccountItem key={result.id} data />
                        ))}

                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >

            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder='Search accounts and videos'
                    spellCheck={false}
                    onChange={(e) => setSearchResult(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />

                {!!searchValue && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;