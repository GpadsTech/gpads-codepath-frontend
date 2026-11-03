import React from 'react';
import {AVATARS} from './avatarOptions';
export function PixelAvatar({avatarId='nova', size=120, showCard=true, equippedItem=''}) {
 const a = AVATARS.find(x=>x.id===avatarId) || AVATARS[0];
 return <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label={'Avatar '+a.name} shapeRendering="crispEdges" style={{imageRendering:'pixelated',flexShrink:0}}>
 {showCard && <><rect width="32" height="32" rx="2" fill="#202239"/><path d="M0 25H32V32H0Z" fill="#30304e"/><path d="M3 5H6V6H3ZM26 8H28V9H26ZM5 21H6V23H5Z" fill="#74609e"/></>}
 <ellipse cx="16" cy="30" rx="11" ry="1" fill="#111224"/>
 {a.style==='long' && <path d="M8 9H24V26H21V28H8Z" fill={a.hair}/>}
 <path d="M11 22H21V24H25V31H7V24H11Z" fill={a.shirt}/>
 <path d="M7 26H10V31H7ZM22 26H25V31H22Z" fill="#14182b" opacity=".25"/>
 <path d="M14 19H18V24H14Z" fill={a.skin}/><path d="M14 20H18V22H14Z" fill="#482b37" opacity=".3"/>
 <path d="M10 9H22V18H20V21H12V18H10Z" fill={a.skin}/>
 <path d="M8 12H10V17H8ZM22 12H24V17H22Z" fill={a.skin}/>
 <path d="M9 8H11V6H21V8H23V13H21V10H17V9H13V11H9Z" fill={a.hair}/>
 {a.style==='curly' && <path d="M8 8H10V5H14V4H18V5H22V7H24V11H21V9H18V10H15V8H12V11H8Z" fill={a.hair}/>}
 {a.style==='quiff' && <path d="M9 9V5H13V3H20V4H23V8H20V10H16V8H12V11H9Z" fill={a.hair}/>}
 {a.style==='undercut' && <><path d="M9 8H11V5H21V6H23V9H17V10H11V12H9Z" fill={a.hair}/><path d="M9 12H10V17H9ZM22 11H23V17H22Z" fill={a.hair} opacity=".5"/></>}
 {a.style==='afro' && <path d="M7 6H9V4H12V3H20V4H23V6H25V11H23V14H21V10H11V14H9V11H7Z" fill={a.hair}/>}
 {a.style==='mohawk' && <><path d="M14 2H18V4H20V9H14Z" fill={a.hair}/><path d="M9 10H11V15H9ZM21 10H23V15H21Z" fill={a.hair} opacity=".5"/></>}
 {a.style==='buns' && <path d="M6 6H11V11H6ZM21 6H26V11H21ZM9 8H23V12H20V10H12V12H9Z" fill={a.hair}/>}
 {a.style==='bob' && <path d="M8 9H10V6H22V9H24V21H21V11H17V10H12V12H11V21H8Z" fill={a.hair}/>}
 <path d="M12 13H14V16H12ZM18 13H20V16H18Z" fill="#232135"/>
 <path d="M12 13H13V14H12ZM18 13H19V14H18Z" fill="#fff"/>
 <path d="M15 18H18V19H15Z" fill="#824450"/><path d="M11 17H13V18H11ZM20 17H22V18H20Z" fill="#e78884" opacity=".45"/>
 {a.beard && <path d="M11 17H13V19H19V17H21V20H19V22H13V20H11Z" fill={a.hair}/>}
 {a.glasses && <path d="M10 13H15V16H10ZM17 13H22V16H17ZM15 14H17" fill="none" stroke="#202137" strokeWidth=".7"/>}
 <path d="M12 24H14V26H18V24H20V26H18V28H14V26H12Z" fill="#fff" opacity=".6"/>
 <path d="M20 27H22V29H20Z" fill="#fff"/>
 {equippedItem==='Óculos Tech' && <path d="M10 13H15V16H10ZM17 13H22V16H17ZM15 14H17" fill="none" stroke="#0c1021"/>}
 </svg>;
}
export default PixelAvatar;
