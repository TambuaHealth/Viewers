import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { NavBar, Svg, Icon, IconButton, Dropdown } from '../';

function Header({ children, menuOptions, isReturnEnabled, onClickReturnButton, isSticky, WhiteLabeling }) {
  const { t } = useTranslation('Header');
  const [fullScreen, setFullScreen] = useState(false);

  // TODO: this should be passed in as a prop instead and the react-router-dom
  // dependency should be dropped
  const onClickReturn = () => {
    if (isReturnEnabled && onClickReturnButton) {
      onClickReturnButton()
    }
  };

  const toggleFullScreen = () => {
    if (!fullScreen) openFullScreen();
    else closeFullScreen();
    setTimeout(() => setFullScreen(!fullScreen), 500);
  };

  const openFullScreen = () => {
    const elem = document.getElementById('root');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  const closeFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }

  const CustomLogo = (React) => {
    return WhiteLabeling.createLogoComponentFn(React)
  }

  return (
    <NavBar className='justify-between border-b-4 border-black' isSticky={isSticky}>
      <div className="flex justify-between flex-1">
        <div className="flex items-center">
          {/* // TODO: Should preserve filter/sort
              // Either injected service? Or context (like react router's `useLocation`?) */}
          <div
            className={classNames("inline-flex items-center mr-3", isReturnEnabled && 'cursor-pointer')}
            onClick={onClickReturn}
          >
            {isReturnEnabled && <Icon name="chevron-left" className="w-8 text-primary-active" />}
            <div className="ml-4">{WhiteLabeling ? CustomLogo(React) : <Svg name="logo-ohif" />}</div>
          </div>
        </div>
        <div className="flex items-center">{children}</div>
        <div className="flex items-center">
          <span className="mr-3 text-lg text-common-light">
            {t('INVESTIGATIONAL USE ONLY')}
          </span>
          <Dropdown id="options" showDropdownIcon={false} list={menuOptions}>
            <IconButton
              id={"options-settings-icon"}
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
            >
              <Icon name="settings" />
            </IconButton>
          </Dropdown>

          <IconButton
            id={'fullscreen'}
            variant="text"
            color="inherit"
            size="medium"
            className="text-primary-active"
            onClick={toggleFullScreen}
          >
            <Icon name={ fullScreen ? "tool-exit-fullscreen" : "tool-enter-fullscreen" } />
          </IconButton>
        </div>
      </div>
    </NavBar>
  );
}

Header.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    })
  ),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isReturnEnabled: PropTypes.bool,
  isSticky: PropTypes.bool,
  onClickReturnButton: PropTypes.func,
  WhiteLabeling: PropTypes.element,
  fullScreen: PropTypes.bool,
};

Header.defaultProps = {
  isReturnEnabled: true,
  isSticky: false,
  fullScreen: false,
};

export default Header;
