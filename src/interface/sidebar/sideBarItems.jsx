import React from 'react';
import './sideBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChessBoard, 
  faCircleQuestion, 
  faGear, 
  faNewspaper, 
  faPalette, 
  faSun, 
  faUser,
  faEllipsis
} from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {
    return (
        <>
            <div className='title'>
                <ul className='items'>
                  <h1><span>Chess.io</span></h1>
                  <li>
                    <FontAwesomeIcon 
                      icon={faChessBoard}
                      id='icon-one'
                    /> 
                    <span>Play</span>
                  </li>
                  <li>
                    <FontAwesomeIcon 
                      icon={faUser}
                      id='icon-two'
                    /> 
                    <span>Social</span>
                  </li>
                  <li>
                    <FontAwesomeIcon 
                      icon={faPalette}
                      id='icon-three'
                    /> 
                    <span>Theme</span>
                  </li>
                  <li>
                    <FontAwesomeIcon 
                      icon={faNewspaper}
                      id='icon-four'
                    /> 
                    <span>News</span>
                  </li>
                </ul>
                <div className='btn-side'>
                    <button className='sign-up'>Sign up</button>
                    <button className='login'>Login</button>
                    <input className='input-box' placeholder='Search'/>
                </div>
                <div className='options'>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <div className='icons-support'>
                    <ul className='support'>
                        <li>
                          <FontAwesomeIcon icon={faSun} /> <span>Light UI</span>
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faGear} /> <span>Settings</span>
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCircleQuestion} /> <span>Help</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}