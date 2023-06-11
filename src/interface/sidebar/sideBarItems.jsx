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
  faUser 
} from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {
    return (
        <div className='side-bar-container'>
            <div className='title'>
                <ul className='items'>
                  <h1>Chess.io</h1>
                  <li>
                    <FontAwesomeIcon 
                      icon={faChessBoard}
                      id='icon-one'
                    /> Play</li>
                  <li>
                    <FontAwesomeIcon 
                      icon={faUser}
                      id='icon-two'
                    /> Social</li>
                  <li>
                    <FontAwesomeIcon 
                      icon={faPalette}
                      id='icon-three'
                    /> Themes</li>
                  <li>
                    <FontAwesomeIcon 
                      icon={faNewspaper}
                      id='icon-four'
                    /> News</li>
                </ul>
                <div className='btn-side'>
                    <button className='sign-up'>Sign up</button>
                    <button className='login'>Login</button>
                    <input className='input-box' placeholder='Search'/>
                </div>
                <div className='icons-support'>
                    <ul className='support'>
                        <li>
                          <FontAwesomeIcon icon={faSun} /> Light UI
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faGear} /> Settings
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCircleQuestion} /> Help
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}