import React, { useEffect } from 'react';
import withBaseComponent from '../../hocs/withBaseComponent';
import { showMenu } from '../../store/app/appSlice';
import { createSearchParams } from 'react-router-dom';

import { MENU } from '../../ultils/contants';
import Swal from 'sweetalert2';
import { logout } from '../../store/user/userSlice';
import { useSelector } from 'react-redux';
import { getCurrent } from '../../store/user/asyncActions';
import path from '../../ultils/path';

const Menu = ({ dispatch, navigate, location }) => {
    const { userData, isLoggedIn } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getCurrent());
    }, [dispatch]);

    const handleClickItemMenu = itemMenu => {
        if ((!isLoggedIn && itemMenu.id === 4) || itemMenu.id === 5 || itemMenu.id === 6) {
            Swal.fire({
                title: 'Please log in first !',
                confirmButtonText: 'Oki',
                showCancelButton: true,
                icon: 'error',
            }).then(rs => {
                if (rs.isConfirmed) {
                    navigate({
                        pathname: `/${path.LOGIN}`,
                        search: createSearchParams({ redirect: location.pathname }).toString(),
                    });
                    dispatch(showMenu());
                }
            });
            return;
        }
        if (isLoggedIn && itemMenu.id === 12) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You want to log out !',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes !',
            }).then(rs => {
                if (rs.isConfirmed) {
                    dispatch(logout());
                    dispatch(showMenu());
                }
            });
            return;
        }
        navigate(itemMenu.path);
        dispatch(showMenu());
    };

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={`bg-gray-800 min-h-screen full sm:w-[400px] text-white p-4  animate-slide-right`}
        >
            <div className="flex justify-between items-center border-b border-blue-50 h-full">
                <span className="text-[18px] uppercase">Menu</span>
                <span onClick={() => dispatch(showMenu())} className="p-4 cursor-pointer">
                    X
                </span>
            </div>
            <div>
                {+userData?.role === 1998
                    ? MENU.map(menu => (
                          <div
                              key={menu.id}
                              onClick={() => handleClickItemMenu(menu)}
                              className="flex items-center gap-2 p-2 text-[16px] uppercase font-light my-[10px] cursor-pointer"
                          >
                              <span>{menu.icon}</span>
                              <span>{menu.name}</span>
                          </div>
                      ))
                    : MENU.map(
                          menu =>
                              menu.role === 2001 && (
                                  <div
                                      key={menu.id}
                                      onClick={() => handleClickItemMenu(menu)}
                                      className="flex items-center gap-2 p-2 text-[16px] uppercase font-light my-[10px] cursor-pointer"
                                  >
                                      <span>{menu.icon}</span>
                                      <span>{menu.name}</span>
                                  </div>
                              ),
                      )}
            </div>
        </div>
    );
};

export default withBaseComponent(Menu);
