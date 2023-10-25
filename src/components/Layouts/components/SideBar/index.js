import classNames from "classnames/bind";
import styles from './SideBar.module.scss'
import MenuItem from "~/components/Popper/Menu/MenuItem";
import Menu from "~/components/Popper/Menu";
import config from '~/config/configRoutes';
import { HomeActiveIcon, HomeIcon, LiveActiveIcon, LiveIcon, UserGroupActiveIcon, UserGroupIcon } from "~/components/Icon";
import Following from "~/pages/Following";

const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />}></MenuItem>
                <MenuItem title="Following" to={config.routes.following} icon={<UserGroupIcon />} activeIcon={<UserGroupActiveIcon />}></MenuItem>
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />}></MenuItem>
            </Menu>
        </aside>
    );
}

export default Sidebar;